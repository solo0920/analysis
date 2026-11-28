#!/usr/bin/env node
// 以 Chrome DevTools Protocol 檢查主要路由在 390／1280 與深淺主題的 runtime 狀態。
// 使用前先啟動 Chrome：--headless=new --remote-debugging-port=9223
"use strict";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(argv) {
  const args = { base: "http://127.0.0.1:8765", cdp: "http://127.0.0.1:9223", quick: false, remote: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--base") args.base = argv[++i];
    else if (argv[i] === "--cdp") args.cdp = argv[++i];
    else if (argv[i] === "--quick") args.quick = true;
    else if (argv[i] === "--remote") args.remote = true;
  }
  args.base = args.base.replace(/\/$/, "");
  args.remote = args.remote || args.base.startsWith("https://");
  return args;
}

async function connect(cdp) {
  const targets = await (await fetch(cdp + "/json/list")).json();
  const page = targets.find((target) => target.type === "page") || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.method) events.push(message);
    if (message.id && pending.has(message.id)) {
      const entry = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
      else entry.resolve(message.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, { resolve, reject });
    ws.send(JSON.stringify({ id: next, method, params }));
  });
  return { ws, send, events };
}

async function evaluate(send, expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(send, expression, timeout = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      if (await evaluate(send, expression)) return true;
    } catch (error) {
      /* page may still be navigating */
    }
    await sleep(100);
  }
  return false;
}

function urlFor(base, route) {
  const stamp = Date.now();
  if (route.includes("#")) {
    const [path, hash] = route.split("#");
    const separator = path.includes("?") ? "&" : "?";
    return base + path + separator + "v=" + stamp + "#" + hash;
  }
  const separator = route.includes("?") ? "&" : "?";
  return base + route + separator + "v=" + stamp;
}

const ROUTES = [
  { name: "home", path: "/#/", selector: ".hero", expect: null },
  { name: "subject", path: "/#/subject/macro", selector: ".subject-hero", expect: null },
  { name: "chapter", path: "/#/chapter/macro-10?section=3", selector: "#section-3 .model-diagram", expect: 2 },
  { name: "past-exams", path: "/#/past-exams", selector: ".past-exam-hero", expect: null },
  { name: "past-search", path: "/#/past-exams?year=all", selector: "#past-exam-search-input", expect: 1 },
  { name: "past-exam", path: "/#/past-exams?question=108Q2-macro-11", selector: "[data-practice-option]", expect: 4 },
  { name: "written-exams", path: "/#/past-exams/written", selector: ".written-page", expect: null },
  { name: "written-search", path: "/#/past-exams/written", selector: "#written-search-input", expect: 1 },
  { name: "written-exam", path: "/#/past-exams/written?question=107Q3-accounting-written-5", selector: "#written-107Q3-accounting-written-5", expect: 1 },
  { name: "review", path: "/#/review", selector: ".review-hero", expect: null },
  { name: "exam-forecast", path: "/#/exam-forecast?subject=accounting", selector: ".forecast-page", expect: null },
  { name: "nobel", path: "/#/nobel?group=nobel-17", selector: "#nobel-module-nobel-17", expect: 1 },
  { name: "models-macro", path: "/#/models/macro?chapter=macro-10", selector: "#models-macro-10", expect: 1 },
  { name: "macro-current", path: "/#/macro-current?event=fed-2025", selector: "#macro-event-fed-2025", expect: 1 }
];

const CONTENT_CHECKS = [
  { name: "nobel-2026-nkpc", path: "/#/nobel?group=nobel-17", selector: "#nobel-module-nobel-17", contains: "產出缺口 ỹ" },
  { name: "accounting-107Q3", path: "/#/past-exams/written?question=107Q3-accounting-written-5", selector: "#written-107Q3-accounting-written-5", contains: "1,059,600" },
  { name: "accounting-109Q3", path: "/#/past-exams/written?question=109Q3-accounting-written-1", selector: "#written-109Q3-accounting-written-1", contains: "11,067,062" },
  { name: "accounting-109Q1", path: "/#/past-exams/written?question=109Q1-accounting-written-1", selector: "#written-109Q1-accounting-written-1", contains: "97,000" },
  { name: "accounting-115Q1", path: "/#/chapter/accounting-02?section=5", selector: "#section-5 .section-solutions", contains: "51,000" },
  { name: "macro-06-taylor", path: "/#/chapter/macro-06?section=5", selector: "#section-5 .section-subsections", contains: "泰勒法則參數", minKatex: 20 },
  { name: "macro-02-classical", path: "/#/chapter/macro-02", selector: "#section-5", contains: "古典模型", minKatex: 20 }
];

function checkPage(send, events, route, selector, expectedCount) {
  const errors = events
    .filter((event) => event.method === "Runtime.exceptionThrown")
    .map((event) => event.params.exceptionDetails.text)
    .concat(events.filter((event) => event.method === "Log.entryAdded" && event.params.entry.level === "error").map((event) => (event.params.entry.text || "") + (event.params.entry.url ? " (" + event.params.entry.url + ")" : "")))
    .concat(events.filter((event) => event.method === "Runtime.consoleAPICalled" && event.params.type === "error").map((event) => (event.params.args || []).map((arg) => arg.value || arg.description || "").join(" ")));
  const state = evaluate(send, `(() => {
    const target = document.querySelector(${JSON.stringify(selector)});
    return {
      selector: Boolean(target),
      count: document.querySelectorAll(${JSON.stringify(selector)}).length,
      katexErrors: document.querySelectorAll(".katex-error").length,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      title: document.title
    };
  })()`);
  return Promise.resolve(state).then((value) => ({ ...value, errors, expectedCount }));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const connection = await connect(args.cdp);
  const { ws, send, events } = connection;
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Network.enable");
  if (args.remote) {
    await send("Network.setCacheDisabled", { cacheDisabled: true });
  }

  const viewports = args.quick
    ? [{ width: 1280, height: 1000, mobile: false, theme: "light" }]
    : [
        { width: 1280, height: 1000, mobile: false, theme: "light" },
        { width: 1280, height: 1000, mobile: false, theme: "dark" },
        { width: 390, height: 900, mobile: true, theme: "light" },
        { width: 390, height: 900, mobile: true, theme: "dark" }
      ];
  const routes = ROUTES;
  const results = [];
  let failed = 0;

  for (const viewport of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile
    });
    for (const route of routes) {
      let state;
      let problems = [];
      let ready = false;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        events.length = 0;
        await send("Page.navigate", { url: urlFor(args.base, route.path) });
        ready = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector(${JSON.stringify(route.selector)}))`);
        await evaluate(send, `document.documentElement.setAttribute("data-theme", ${JSON.stringify(viewport.theme)})`);
        await sleep(200);
        state = await checkPage(send, events, route, route.selector, route.expect);
        problems = [];
        if (!ready || !state.selector) problems.push("selector missing");
        if (state.expectedCount !== null && state.count !== state.expectedCount) problems.push("count " + state.count + " != " + state.expectedCount);
        if (state.katexErrors) problems.push("katex errors " + state.katexErrors);
        if (state.overflow > 1) problems.push("overflow " + state.overflow);
        if (state.errors.length) problems.push("console errors: " + state.errors.join(" | "));
        const networkOnly = problems.length > 0 && problems.every(function (problem) {
          return problem.indexOf("console errors:") === 0 && /ERR_(CONNECTION_RESET|ABORTED|FAILED)/.test(problem);
        });
        if (!networkOnly) break;
        await sleep(400);
      }
      if (problems.length) failed += 1;
      results.push({ viewport, route: route.name, problems, state });
      console.log(
        (problems.length ? "FAIL" : "ok  ") +
        " " + route.name + " " + viewport.width + "px " + viewport.theme +
        (problems.length ? " — " + problems.join("; ") : "")
      );
    }
  }

  // Content assertions for recently audited formulas and accounting examples.
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const check of CONTENT_CHECKS) {
    events.length = 0;
    await send("Page.navigate", { url: urlFor(args.base, check.path) });
    const ready = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector(${JSON.stringify(check.selector)}))`);
    const state = await evaluate(send, `({
      contains: document.body.textContent.includes(${JSON.stringify(check.contains)}),
      katex: document.querySelectorAll(".katex").length,
      katexErrors: document.querySelectorAll(".katex-error").length,
      overflow: document.documentElement.scrollWidth - window.innerWidth
    })`);
    const problems = [];
    if (!ready) problems.push("selector missing");
    if (!state.contains) problems.push("text missing: " + check.contains);
    if (check.minKatex && state.katex < check.minKatex) problems.push("katex count " + state.katex + " < " + check.minKatex);
    if (state.katexErrors) problems.push("katex errors " + state.katexErrors);
    if (state.overflow > 1) problems.push("overflow " + state.overflow);
    if (problems.length) failed += 1;
    console.log((problems.length ? "FAIL" : "ok  ") + " content " + check.name + (problems.length ? " — " + problems.join("; ") : ""));
  }

  // Search overlay smoke check at desktop light.
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });
  events.length = 0;
  await send("Page.navigate", { url: urlFor(args.base, "/#/") });
  await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector("#search-open"))`);
  await evaluate(send, `document.querySelector("#search-open").click()`);
  await waitFor(send, `!document.querySelector("#search-overlay").hidden`);
  await evaluate(send, `(() => {
    const input = document.querySelector("#search-input");
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "菲利浦曲線");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  const searchReady = await waitFor(send, `document.querySelectorAll("#search-results .search-result").length > 0`, 8000);
  const searchCount = await evaluate(send, `document.querySelectorAll("#search-results .search-result").length`);
  if (!searchReady || searchCount === 0) failed += 1;
  console.log((searchReady && searchCount ? "ok  " : "FAIL") + " search results " + searchCount);

  // Regression: past-exam stems with \(...\) must render as KaTeX inside search results.
  await evaluate(send, `(() => {
    const input = document.querySelector("#search-input");
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "有關");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  const mathReady = await waitFor(send, `Array.from(document.querySelectorAll("#search-results .search-result")).some((el) => el.textContent.includes("M") && el.textContent.includes("敘述"))`, 10000);
  await sleep(300);
  const mathState = await evaluate(send, `(() => {
    const result = Array.from(document.querySelectorAll("#search-results .search-result")).find((el) => el.textContent.includes("M") && el.textContent.includes("敘述"));
    return result ? {
      katex: result.querySelectorAll(".katex").length,
      errors: result.querySelectorAll(".katex-error").length
    } : { katex: 0, errors: 0 };
  })()`);
  const mathProblems = [];
  if (!mathReady) mathProblems.push("result missing");
  if (mathState.katex < 2) mathProblems.push("katex count " + mathState.katex);
  if (mathState.errors) mathProblems.push("katex errors " + mathState.errors);
  if (mathProblems.length) failed += 1;
  console.log((mathProblems.length ? "FAIL" : "ok  ") + " search katex " + mathState.katex + (mathProblems.length ? " — " + mathProblems.join("; ") : ""));

  // Past-exam fuzzy search: question-bank-only results must respect the filter scope.
  events.length = 0;
  await send("Page.navigate", { url: urlFor(args.base, "/#/past-exams?year=all") });
  const pastSearchInputReady = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector("#past-exam-search-input"))`);
  await evaluate(send, `(() => {
    const input = document.querySelector("#past-exam-search-input");
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "存續期間");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  const pastSearchReady = await waitFor(send, `document.querySelectorAll("#past-exam-search-results [data-past-search-open]").length > 0`, 10000);
  const pastSearchState = await evaluate(send, `({
    count: document.querySelectorAll("#past-exam-search-results [data-past-search-open]").length,
    status: document.querySelector("#past-exam-search-status").textContent,
    scope: document.querySelector("#past-exam-search-scope").textContent,
    sections: document.querySelectorAll(".past-exam-page > .past-exam-filter-shell").length,
    merged: Boolean(document.querySelector("#past-exam-filters #past-exam-search-input")) &&
      Boolean(document.querySelector("#past-exam-filters #past-exam-filter-rows")),
    katexErrors: document.querySelectorAll(".katex-error").length,
    overflow: document.documentElement.scrollWidth - window.innerWidth
  })`);
  const pastSearchProblems = [];
  if (!pastSearchInputReady) pastSearchProblems.push("input missing");
  if (!pastSearchReady) pastSearchProblems.push("results missing");
  if (pastSearchState.sections !== 1 || !pastSearchState.merged) pastSearchProblems.push("search/filter sections not merged");
  if (pastSearchState.katexErrors) pastSearchProblems.push("katex errors " + pastSearchState.katexErrors);
  if (pastSearchState.overflow > 1) pastSearchProblems.push("overflow " + pastSearchState.overflow);
  if (pastSearchProblems.length) failed += 1;
  console.log((pastSearchProblems.length ? "FAIL" : "ok  ") + " past search results " + pastSearchState.count +
    (pastSearchProblems.length ? " — " + pastSearchProblems.join("; ") : ""));

  // Filter changes must mutate in place: no route loader, no #main replacement, no scroll jump.
  const filterBefore = await evaluate(send, `(() => {
    const main = document.querySelector("#main");
    window.__filterRefs = {
      kids: Array.from(main.children),
      search: document.querySelector("#past-exam-search-input"),
      rows: document.querySelector("#past-exam-filter-rows"),
      panel: document.querySelector("#past-exam-panel")
    };
    window.__filterFlicker = { routing: false, loader: false, mainMutations: 0 };
    new MutationObserver(() => {
      if (document.documentElement.classList.contains("is-routing")) window.__filterFlicker.routing = true;
      const loader = document.getElementById("route-loader");
      if (loader && !loader.hidden) window.__filterFlicker.loader = true;
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true });
    new MutationObserver((records) => {
      records.forEach((record) => {
        if (Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some((node) => node.nodeType === 1)) {
          window.__filterFlicker.mainMutations += 1;
        }
      });
    }).observe(main, { childList: true });
    return { scrollY: window.scrollY };
  })()`);
  await evaluate(send, `document.querySelector('[data-practice-year="113"]').click()`);
  const filterReady = await waitFor(send, `document.querySelector('[data-practice-year="113"]').classList.contains("is-active") && !document.querySelector("#past-exam-filter-rows").classList.contains("is-loading")`, 10000);
  const filterAfter = await evaluate(send, `(() => {
    const main = document.querySelector("#main");
    return {
      sameKids: main.children.length === window.__filterRefs.kids.length &&
        Array.from(main.children).every((element, index) => element === window.__filterRefs.kids[index]),
      sameSearch: document.querySelector("#past-exam-search-input") === window.__filterRefs.search,
      sameRows: document.querySelector("#past-exam-filter-rows") === window.__filterRefs.rows,
      samePanel: document.querySelector("#past-exam-panel") === window.__filterRefs.panel,
      scrollY: window.scrollY,
      flicker: window.__filterFlicker
    };
  })()`);
  const filterProblems = [];
  if (!filterReady) filterProblems.push("year filter not ready");
  if (!filterAfter.sameKids || !filterAfter.sameSearch || !filterAfter.sameRows || !filterAfter.samePanel) filterProblems.push("DOM was replaced");
  if (filterAfter.flicker.routing) filterProblems.push("route loader class");
  if (filterAfter.flicker.loader) filterProblems.push("route loader visible");
  if (filterAfter.flicker.mainMutations) filterProblems.push("main children mutated " + filterAfter.flicker.mainMutations);
  if (Math.abs(filterAfter.scrollY - filterBefore.scrollY) > 1) filterProblems.push("scroll jump " + filterBefore.scrollY + "→" + filterAfter.scrollY);
  if (filterProblems.length) failed += 1;
  console.log((filterProblems.length ? "FAIL" : "ok  ") + " past search no-flicker" +
    (filterProblems.length ? " — " + filterProblems.join("; ") : ""));

  // Written-exam fuzzy search and in-place filters.
  events.length = 0;
  await send("Page.navigate", { url: urlFor(args.base, "/#/past-exams/written") });
  const writtenSearchInputReady = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector("#written-search-input"))`);
  await evaluate(send, `(() => {
    const input = document.querySelector("#written-search-input");
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "存續期間");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  })()`);
  const writtenSearchReady = await waitFor(send, `document.querySelectorAll("#written-search-results [data-written-search-open]").length > 0`, 10000);
  const writtenSearchState = await evaluate(send, `({
    count: document.querySelectorAll("#written-search-results [data-written-search-open]").length,
    sections: document.querySelectorAll(".written-page > .past-exam-filter-shell").length,
    merged: Boolean(document.querySelector("#written-filters #written-search-input")) &&
      Boolean(document.querySelector("#written-filters #written-filter-rows")),
    katexErrors: document.querySelectorAll(".katex-error").length,
    overflow: document.documentElement.scrollWidth - window.innerWidth
  })`);
  const writtenProblems = [];
  if (!writtenSearchInputReady) writtenProblems.push("input missing");
  if (!writtenSearchReady) writtenProblems.push("results missing");
  if (writtenSearchState.sections !== 1 || !writtenSearchState.merged) writtenProblems.push("search/filter sections not merged");
  if (writtenSearchState.katexErrors) writtenProblems.push("katex errors " + writtenSearchState.katexErrors);
  if (writtenSearchState.overflow > 1) writtenProblems.push("overflow " + writtenSearchState.overflow);

  const writtenFlickerBefore = await evaluate(send, `(() => {
    const main = document.querySelector("#main");
    window.__writtenRefs = {
      kids: Array.from(main.children),
      search: document.querySelector("#written-search-input"),
      rows: document.querySelector("#written-filter-rows"),
      list: document.querySelector("#written-list")
    };
    window.__writtenFlicker = { routing: false, loader: false, mainMutations: 0 };
    new MutationObserver(() => {
      if (document.documentElement.classList.contains("is-routing")) window.__writtenFlicker.routing = true;
      const loader = document.getElementById("route-loader");
      if (loader && !loader.hidden) window.__writtenFlicker.loader = true;
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true });
    new MutationObserver((records) => {
      records.forEach((record) => {
        if (Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some((node) => node.nodeType === 1)) {
          window.__writtenFlicker.mainMutations += 1;
        }
      });
    }).observe(main, { childList: true });
    return true;
  })()`);
  await evaluate(send, `document.querySelector('[data-written-subject="investment"]').click()`);
  const writtenFilterReady = await waitFor(send, `document.querySelector('[data-written-subject="investment"]').classList.contains("is-active") && document.querySelector("#written-filter-summary").textContent.includes("投資學")`, 10000);
  const writtenFlickerAfter = await evaluate(send, `(() => {
    const main = document.querySelector("#main");
    return {
      sameKids: main.children.length === window.__writtenRefs.kids.length &&
        Array.from(main.children).every((element, index) => element === window.__writtenRefs.kids[index]),
      sameSearch: document.querySelector("#written-search-input") === window.__writtenRefs.search,
      sameRows: document.querySelector("#written-filter-rows") === window.__writtenRefs.rows,
      sameList: document.querySelector("#written-list") === window.__writtenRefs.list,
      flicker: window.__writtenFlicker
    };
  })()`);
  if (!writtenFilterReady) writtenProblems.push("written filter not ready");
  if (!writtenFlickerAfter.sameKids || !writtenFlickerAfter.sameSearch || !writtenFlickerAfter.sameRows || !writtenFlickerAfter.sameList) writtenProblems.push("written DOM was replaced");
  if (writtenFlickerAfter.flicker.routing) writtenProblems.push("written route loader class");
  if (writtenFlickerAfter.flicker.loader) writtenProblems.push("written route loader visible");
  if (writtenFlickerAfter.flicker.mainMutations) writtenProblems.push("written main children mutated " + writtenFlickerAfter.flicker.mainMutations);
  if (writtenProblems.length) failed += 1;
  console.log((writtenProblems.length ? "FAIL" : "ok  ") + " written search no-flicker " + writtenSearchState.count +
    (writtenProblems.length ? " — " + writtenProblems.join("; ") : ""));

  // 404 page only when testing a remote origin (local Python server has its own 404).
  if (args.remote) {
    events.length = 0;
    await send("Page.navigate", { url: urlFor(args.base, "/this-path-does-not-exist") });
    const ready = await waitFor(send, `document.readyState === "complete" && document.body.innerText.includes("找不到這個頁面")`);
    const state = await evaluate(send, `({ katexErrors: document.querySelectorAll(".katex-error").length, overflow: document.documentElement.scrollWidth - window.innerWidth })`);
    const problems = [];
    if (!ready) problems.push("404 body missing");
    if (state.katexErrors) problems.push("katex errors " + state.katexErrors);
    if (state.overflow > 1) problems.push("overflow " + state.overflow);
    if (problems.length) failed += 1;
    console.log((problems.length ? "FAIL" : "ok  ") + " 404 page" + (problems.length ? " — " + problems.join("; ") : ""));
  }

  ws.close();
  if (failed) {
    console.error("UI checks failed: " + failed);
    process.exit(1);
  }
  console.log("UI checks passed: " + results.length + " route/viewport/theme checks");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
