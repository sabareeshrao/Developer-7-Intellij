# AI Context — Developer-7-Intellij / GeoOps

This repository is the simulator-backed rebuild of `Developer-7`.

## Current learning state

**Set 3 — 3/387+ — complete**

The implementation grows cumulatively. Do not reset the project between sets and do not copy future features backward.

## Set order

Follow the original `sabareeshrao/Developer-7` order.

Current sequence:

1. Development Environment
2. System.exit() and Process Boundaries
3. Project Methodology / Agile-Scrum
4. StringBuilder / StringBuffer
5. OOP in Enterprise Projects
6. final keyword
7. real-world final use case
8. static methods
9. equals() / hashCode()
10. == vs .equals()

Continue the original order beyond that.

## Ownership

- `sabareeshrao/Experiment-VS-Code` owns the reusable player and simulator software.
- This repository owns GeoOps source, curriculum, generated player data, documentation, and GitHub Pages deployment.
- `MASTER_SOFTWARE_REF` pins the validated master snapshot.

## Mandatory simulator rules

Read `docs/SIMULATION_UI_RULES.md` and `docs/EXPLANATION_STYLE.md` before adding lessons.

For IntelliJ source-building steps:

```text
createFile with empty content
        ↓
typeCode with real source
        ↓
exact code-line highlight
```

Never place completed source directly into a non-empty `createFile` lesson action.

For IntelliJ terminal commands:

```text
typeTerminal
        ↓
visible command typing
        ↓
.terminalCommandFocus
        ↓
yellow command boundary
```

Only the current forward/replay step animates. Historical replay must stay silent.

## Explanation rule

Use compact `•` bullet lines with no blank gaps.

Assume zero prior knowledge when a technical term first appears.

Teach in this order:

```text
problem → why it exists → simple meaning → technical term → GeoOps code/tool → effect
```

Do not recycle full explanation sentences.

## Set 2 project state

Set 2 adds:

- `PreflightResult`
- `DatasetPreflightValidator`
- `GeoOpsPreflightCli`
- `DatasetPreflightValidatorTest`
- process exit codes 0 / 2 / 3 / 4 / 5
- Spring Boot graceful shutdown

`System.exit()` is restricted to the standalone CLI outer boundary. Normal web controller/service code does not terminate the JVM.

## Next set

Set 3 establishes the GeoOps Agile/Scrum delivery workflow using the same project and repository history.

## Set 3 project state

GeoOps now has an inspectable Agile/Scrum delivery workflow with 2-week sprints.

The repository process is:

```text
Backlog → Ready → Sprint Planning → feature branch → Pull Request
        → Review + GitHub Actions → merge → Done
        → Sprint Review → Retrospective
```

Set 3 repository evidence:

- `docs/process/AGILE-WORKFLOW.md`
- `docs/process/DEFINITION-OF-DONE.md`
- `docs/process/SPRINT-001.md`
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/pull_request_template.md`
- `docs/sets/SET-003-PROJECT-METHODOLOGY.md`

The simulation must make the issue, feature branch, PR description, CI check, peer review, merge state, closed story, and local-main synchronization visibly real on their owning developer surfaces.

## Next set

Set 4 follows the original Developer-7 order: StringBuilder / StringBuffer.
