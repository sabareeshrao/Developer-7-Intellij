#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COURSE_FILE = ROOT / "curriculum" / "course.json"
SITE = ROOT / "_site"

PROJECT_FILES = [
    "pom.xml", ".java-version", ".gitignore",
    "src/main/java/com/atlasgrid/geoops/GeoOpsApplication.java",
    "src/main/java/com/atlasgrid/geoops/project/domain/GeoProject.java",
    "src/main/java/com/atlasgrid/geoops/project/api/CreateProjectRequest.java",
    "src/main/java/com/atlasgrid/geoops/project/application/ProjectService.java",
    "src/main/java/com/atlasgrid/geoops/project/api/ProjectController.java",
    "src/main/resources/application.yml",
    "src/main/java/com/atlasgrid/geoops/tools/preflight/PreflightResult.java",
    "src/test/java/com/atlasgrid/geoops/GeoOpsApplicationTests.java",
    ".github/workflows/ci.yml",
]

def normalize_sentence(text):
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()

def validate_course(course):
    stages = course.get("stages") or []
    if not stages:
        raise SystemExit("course has no stages")
    seen = {}
    for stage_index, stage in enumerate(stages, 1):
        for step_index, step in enumerate(stage.get("steps") or [], 1):
            why = (step.get("why") or "").strip()
            if len(why) < 45:
                raise SystemExit(f"Step {stage_index}.{step_index} explanation is too short")
            if not step.get("highlight"):
                raise SystemExit(f"Step {stage_index}.{step_index} has no highlight")
            if not step.get("software"):
                raise SystemExit(f"Step {stage_index}.{step_index} has no software")
            if not (step.get("action") or {}).get("action"):
                raise SystemExit(f"Step {stage_index}.{step_index} has no simulator action")
            action_name = (step.get("action") or {}).get("action")
            if step.get("software") == "intellij" and action_name in {"createFile", "setCode", "typeCode", "replaceCode"}:
                highlight = step.get("highlight") or {}
                if highlight.get("kind") != "code":
                    raise SystemExit(
                        f"Step {stage_index}.{step_index} edits code but does not use an explicit code-line highlight"
                    )
                if not (highlight.get("lines") or highlight.get("line") or highlight.get("text") or highlight.get("selector")):
                    raise SystemExit(
                        f"Step {stage_index}.{step_index} code highlight has no line/text/selector target"
                    )
            for sentence in re.split(r"(?<=[.!?])\s+", why):
                key = normalize_sentence(sentence)
                if len(key) < 32:
                    continue
                if key in seen:
                    raise SystemExit(
                        f"Repeated explanation sentence in step {stage_index}.{step_index}; "
                        f"already used in step {seen[key]}: {sentence}"
                    )
                seen[key] = f"{stage_index}.{step_index}"

def language_for(path):
    return {".java":"java",".xml":"xml",".yml":"yaml",".yaml":"yaml",".md":"markdown"}.get(Path(path).suffix.lower(),"text")

def build_tree(paths):
    root = {}
    for path in paths:
        parts = path.split("/")
        cursor = root
        for part in parts[:-1]:
            cursor = cursor.setdefault(part, {})
        cursor[parts[-1]] = None
    def convert(node, prefix=""):
        out = []
        for name in sorted(node):
            child = node[name]
            path = f"{prefix}/{name}" if prefix else name
            if child is None:
                out.append({"name":name,"path":path,"type":"file","language":language_for(path)})
            else:
                out.append({"name":name,"path":path,"type":"folder","open":True,"children":convert(child,path)})
        return out
    return convert(root)

def load_project_files():
    files = {}
    for relative in PROJECT_FILES:
        path = ROOT / relative
        if not path.exists():
            raise SystemExit(f"Missing project file: {relative}")
        files[relative] = {"language":language_for(relative),"content":path.read_text(encoding="utf-8")}
    return files

def write_player_data(course):
    SITE.mkdir(parents=True, exist_ok=True)
    (SITE / "lessons.js").write_text("window.COURSE = " + json.dumps(course, indent=2) + ";\n", encoding="utf-8")
    project_dir = SITE / "project-data"
    project_dir.mkdir(parents=True, exist_ok=True)
    files = load_project_files()
    paths = list(files)
    parts = [dict() for _ in range(8)]
    for index, path in enumerate(paths):
        parts[index % 8][path] = files[path]
    for index, part in enumerate(parts, 1):
        text = "window.FULL_PROJECT_PARTS=window.FULL_PROJECT_PARTS||[];window.FULL_PROJECT_PARTS.push(" + json.dumps(part) + ");\n"
        (project_dir / f"part-{index:02d}.js").write_text(text, encoding="utf-8")
    meta = {
        "project":{"name":"GeoOps","sdk":"Java 17","languageLevel":"17"},
        "tree":build_tree(paths),
        "initialFile":"src/main/java/com/atlasgrid/geoops/GeoOpsApplication.java",
        "problems":[],"breakpoints":[],"runConfigurations":[],
        "maven":{},"spring":{},"jpa":{},
        "git":{"branch":"main","changes":[],"history":[]},
        "database":{},"tests":{},"terminal":"","console":"","visibleFeatures":[]
    }
    index_js = (
        "window.FULL_PROJECT_META=" + json.dumps(meta) + ";\n"
        "window.buildFullProjectPackage=function(){"
        "const files=Object.assign({},...(window.FULL_PROJECT_PARTS||[]));"
        "return {apps:{intellij_idea:{...window.FULL_PROJECT_META,files}}};"
        "};\n"
    )
    (project_dir / "index.js").write_text(index_js, encoding="utf-8")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--validate-only", action="store_true")
    args = parser.parse_args()
    course = json.loads(COURSE_FILE.read_text(encoding="utf-8"))
    validate_course(course)
    print("Curriculum validation passed: unique narration and action/highlight coverage confirmed.")
    if not args.validate_only:
        write_player_data(course)
        print(f"Wrote downstream player data to {SITE}")

if __name__ == "__main__":
    main()
