"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "_site");
const course = JSON.parse(fs.readFileSync(path.join(root, "curriculum", "course.json"), "utf8"));
const mime = { ".html":"text/html", ".js":"application/javascript", ".css":"text/css", ".json":"application/json" };

const flat = [];
(course.stages || []).forEach((stage, stageIndex) => {
  (stage.steps || []).forEach((step, stepIndex) => flat.push({ ...step, stageIndex, stepIndex, global: flat.length + 1 }));
});

function findStep(stageIndex, action, occurrence = 0) {
  const hits = flat.filter(s => s.stageIndex === stageIndex && s.action?.action === action);
  assert(hits[occurrence], `Missing stage ${stageIndex + 1} action ${action} occurrence ${occurrence}`);
  return hits[occurrence];
}

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const relative = pathname === "/" ? "/index.html" : pathname;
  const file = path.resolve(site, "." + relative);
  if (!file.startsWith(site + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control":"no-store" });
    res.end(data);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless:true });
    const page = await browser.newPage({ viewport:{ width:1440, height:900 } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));

    await page.addInitScript(() => {
      if (window !== window.top) return;
      window.__courseSeekDone = 0;
      window.addEventListener("message", event => {
        if (event.data?.type === "SIM_SEEK_DONE" && event.data.app === "intellij_idea") window.__courseSeekDone++;
      });
    });

    const ide = () => page.frames().find(frame => frame.url().includes("/simulator/intellij/index.html"));

    async function openStep(step) {
      await page.goto(`${base}/player.html?step=${step.global}`);
      await page.waitForFunction(
        n => document.querySelector("#stepTitle")?.textContent.startsWith(n + "."),
        step.global
      );
      if (step.software === "intellij") {
        await page.waitForFunction(() => window.__courseSeekDone > 0);
        await page.waitForTimeout(120);
      }
    }

    const junit = findStep(0, "runJUnit");
    await openStep(junit);
    await ide().waitForSelector(".ij-tests-tool");
    const junitUi = await ide().evaluate(() => ({
      active: document.querySelector(".bottomTab.active")?.dataset.bottom,
      summary: document.querySelector(".ij-test-summary")?.innerText || "",
      suite: document.querySelector(".ij-test-suite")?.innerText || "",
      visible: !!document.querySelector(".ij-tests-tool")
    }));
    assert.equal(junitUi.active, "tests", "JUnit must own the Tests tool window: " + JSON.stringify(junitUi));
    assert(junitUi.visible && /passed/.test(junitUi.summary), "JUnit result UI is missing: " + JSON.stringify(junitUi));

    const maven = findStep(0, "runMavenGoal");
    await openStep(maven);
    await ide().waitForSelector(".processBar");
    const mavenUi = await ide().evaluate(() => {
      const console = document.querySelector(".toolConsole");
      return {
        active: document.querySelector(".bottomTab.active")?.dataset.bottom,
        process: document.querySelector(".processName")?.innerText || "",
        console: console?.innerText || "",
        whiteSpace: console ? getComputedStyle(console).whiteSpace : ""
      };
    });
    assert.equal(mavenUi.active, "run", "Maven build must own Run: " + JSON.stringify(mavenUi));
    assert(mavenUi.process.includes("Maven clean verify"), "Maven process label is wrong: " + JSON.stringify(mavenUi));
    assert(mavenUi.console.includes("\n") && mavenUi.console.includes("BUILD SUCCESS"), "Maven output lost multiline console fidelity: " + JSON.stringify(mavenUi));
    assert(["pre","pre-wrap"].includes(mavenUi.whiteSpace), "Maven console is not preformatted: " + JSON.stringify(mavenUi));

    const springRun = findStep(1, "runSpringBootApp");
    await openStep(springRun);
    await ide().waitForSelector(".ij-services-tool");
    const springUi = await ide().evaluate(() => {
      const console = document.querySelector(".ij-service-console");
      return {
        active: document.querySelector(".bottomTab.active")?.dataset.bottom,
        testsActive: document.querySelector('[data-bottom="tests"]')?.classList.contains("active") || false,
        card: document.querySelector(".ij-service-card")?.innerText || "",
        console: console?.innerText || "",
        whiteSpace: console ? getComputedStyle(console).whiteSpace : ""
      };
    });
    assert.equal(springUi.active, "services", "Spring Boot must own Services: " + JSON.stringify(springUi));
    assert(!springUi.testsActive, "Spring Boot output leaked under Tests: " + JSON.stringify(springUi));
    assert(springUi.card.includes("GeoOpsApplication") && springUi.card.includes("Running") && springUi.card.includes("localhost:8080"), "Spring service card is not GeoOps-realistic: " + JSON.stringify(springUi));
    assert(springUi.console.includes("\n") && springUi.console.includes("Tomcat started on port 8080") && springUi.console.includes("Started GeoOpsApplication"), "Spring logs lost line structure: " + JSON.stringify(springUi));
    assert(["pre","pre-wrap"].includes(springUi.whiteSpace), "Spring console is not preformatted: " + JSON.stringify(springUi));

    const springStop = findStep(1, "stopSpringBootApp");
    await openStep(springStop);
    await ide().waitForSelector(".ij-services-tool");
    const stopUi = await ide().evaluate(() => ({
      active: document.querySelector(".bottomTab.active")?.dataset.bottom,
      card: document.querySelector(".ij-service-card")?.innerText || "",
      console: document.querySelector(".ij-service-console")?.innerText || ""
    }));
    assert.equal(stopUi.active, "services", "Stopping Spring Boot must remain in Services: " + JSON.stringify(stopUi));
    assert(stopUi.card.includes("Stopped"), "Services card did not show Stopped: " + JSON.stringify(stopUi));
    assert(stopUi.console.includes("Spring Boot application stopped"), "Spring stop console message is missing: " + JSON.stringify(stopUi));

    const terminal = findStep(1, "typeTerminal");
    await openStep(terminal);
    await ide().waitForSelector(".terminalCommandFocus");
    const terminalUi = await ide().evaluate(() => {
      const focus = document.querySelector(".terminalCommandFocus");
      const style = getComputedStyle(focus);
      return {
        active: document.querySelector(".bottomTab.active")?.dataset.bottom,
        command: focus?.innerText || "",
        outlineWidth: parseFloat(style.outlineWidth) || 0,
        outlineColor: style.outlineColor,
        exit: document.querySelector(".ij-exit-code")?.innerText || ""
      };
    });
    assert.equal(terminalUi.active, "terminal", "CLI command must own Terminal: " + JSON.stringify(terminalUi));
    assert(terminalUi.command.includes("GeoOpsPreflightCli"), "CLI command is not visibly focused: " + JSON.stringify(terminalUi));
    assert(terminalUi.outlineWidth >= 2 && /rgb\(255, 212, 0\)/.test(terminalUi.outlineColor), "Terminal command lost the yellow boundary: " + JSON.stringify(terminalUi));
    assert(terminalUi.exit.includes("exit 2"), "First failing CLI run must visibly report exit 2: " + JSON.stringify(terminalUi));

    const typed = flat.find(s => s.stageIndex === 0 && s.action?.action === "typeCode" && s.action?.data?.file?.endsWith("GeoOpsApplication.java"));
    assert(typed, "Could not find the GeoOpsApplication typeCode step");
    await openStep(typed);
    await ide().evaluate(() => {
      window.__typingLengths = [];
      const code = document.querySelector("#code");
      const record = () => {
        const n = (code?.innerText || "").length;
        if (!window.__typingLengths.length || window.__typingLengths.at(-1) !== n) window.__typingLengths.push(n);
      };
      record();
      window.__typingObserver = new MutationObserver(record);
      window.__typingObserver.observe(code, { subtree:true, childList:true, characterData:true });
    });
    const beforeSeek = await page.evaluate(() => window.__courseSeekDone);
    await page.locator("#replayBtn").click();
    await page.waitForFunction(before => window.__courseSeekDone > before, beforeSeek);
    await page.waitForTimeout(100);
    const typing = await ide().evaluate(() => {
      window.__typingObserver?.disconnect();
      return {
        lengths: window.__typingLengths || [],
        finalText: document.querySelector("#code")?.innerText || "",
        focusedLines: document.querySelectorAll(".codeLine.focus").length,
        scrollLeft: document.querySelector("#editorWrap")?.scrollLeft || 0
      };
    });
    const increasing = typing.lengths.filter((n, i, a) => i === 0 || n !== a[i-1]);
    assert(increasing.length >= 3, "typeCode replay did not visibly animate through multiple text lengths: " + JSON.stringify(typing));
    assert(typing.finalText.includes("SpringApplication.run"), "typeCode did not finish the expected GeoOps source: " + JSON.stringify(typing));
    assert(typing.focusedLines > 0, "typeCode did not leave the typed code focused: " + JSON.stringify(typing));
    assert(typing.scrollLeft < 40, "typeCode replay jumped the editor horizontally: " + JSON.stringify(typing));

    assert.equal(errors.length, 0, "Browser page errors: " + errors.join(" | "));
    console.log(JSON.stringify({
      ok:true,
      checked:{
        junit:junit.global,
        maven:maven.global,
        springRun:springRun.global,
        springStop:springStop.global,
        terminal:terminal.global,
        typeCode:typed.global
      }
    }));
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
