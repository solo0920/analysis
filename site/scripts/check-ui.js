#!/usr/bin/env node
// 以 Chrome DevTools Protocol 檢查主要路由在 390／1280 與深淺主題的 runtime 狀態。
// 使用前先啟動 Chrome：--headless=new --remote-debugging-port=9223
"use strict";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(argv) {
  const args = { base: "http://127.0.0.1:8765", cdp: "http://127.0.0.1:9223", quick: false, remote: false, only: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--base") args.base = argv[++i];
    else if (argv[i] === "--cdp") args.cdp = argv[++i];
    else if (argv[i] === "--quick") args.quick = true;
    else if (argv[i] === "--remote") args.remote = true;
    else if (argv[i] === "--only") {
      args.only = String(argv[++i] || "").split(",").map(function (name) {
        return name.trim();
      }).filter(Boolean);
    }
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

async function checkPracticeNext(send, events, args) {
  let failures = 0;
  for (const viewport of [
    { width: 1280, height: 1000, mobile: false, theme: "light" },
    { width: 390, height: 900, mobile: true, theme: "dark" }
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile
    });
    events.length = 0;
    await send("Page.navigate", { url: urlFor(args.base, "/#/past-exams?question=108Q2-macro-11") });
    const ready = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector(".past-exam-actions [data-practice-next]"))`);
    await evaluate(send, `document.documentElement.setAttribute("data-theme", ${JSON.stringify(viewport.theme)})`);
    await sleep(200);
    const order = await evaluate(send, `(() => {
      const actions = document.querySelector(".past-exam-actions");
      const buttons = actions ? Array.from(actions.querySelectorAll(":scope > button")) : [];
      const submit = actions && actions.querySelector("[data-practice-submit]");
      const next = actions && actions.querySelector("[data-practice-next]");
      const prev = actions && actions.querySelector("[data-practice-prev]");
      return {
        submitIndex: buttons.indexOf(submit),
        nextIndex: buttons.indexOf(next),
        prevIndex: buttons.indexOf(prev),
        nextDisabled: Boolean(next && next.disabled),
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    })()`);
    const problems = [];
    if (!ready) problems.push("actions missing");
    if (order.submitIndex < 0) problems.push("submit missing");
    if (order.nextIndex !== order.submitIndex + 1) problems.push("next not after submit");
    if (order.prevIndex !== order.nextIndex + 1) problems.push("prev not after next");
    if (order.nextDisabled) problems.push("next disabled");
    if (order.overflow > 1) problems.push("overflow " + order.overflow);
    const beforeStem = await evaluate(send, `document.querySelector(".past-exam-stem") ? document.querySelector(".past-exam-stem").textContent : ""`);
    await evaluate(send, `document.querySelector("[data-practice-next]").click()`);
    const advanced = await waitFor(send, `document.querySelector(".past-exam-stem") && document.querySelector(".past-exam-stem").textContent !== ${JSON.stringify(beforeStem)}`);
    if (!advanced) problems.push("next did not advance");
    if (problems.length) failures += 1;
    console.log((problems.length ? "FAIL" : "ok  ") + " practice next order " + viewport.width + "px " + viewport.theme +
      (problems.length ? " — " + problems.join("; ") : ""));
  }
  return failures;
}

async function checkPracticeSidebar(send, events, args) {
  let failures = 0;
  for (const viewport of [
    { width: 1280, height: 1000, mobile: false, theme: "light" },
    { width: 1280, height: 1000, mobile: false, theme: "dark" },
    { width: 390, height: 900, mobile: true, theme: "light" },
    { width: 390, height: 900, mobile: true, theme: "dark" }
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile
    });
    events.length = 0;
    await send("Page.navigate", { url: urlFor(args.base, "/#/past-exams") });
    const ready = await waitFor(send, `document.readyState === "complete" && document.querySelectorAll("#past-exam-search-results [data-past-open]").length > 0 && Boolean(document.querySelector("#past-exam-panel .past-exam-actions"))`);
    await evaluate(send, `document.documentElement.setAttribute("data-theme", ${JSON.stringify(viewport.theme)})`);
    await sleep(300);
    const initial = await evaluate(send, `(() => {
      const layout = document.querySelector("#past-exam-search-layout");
      const sidebar = document.querySelector("#past-exam-search-results-panel");
      const panel = document.querySelector("#past-exam-panel");
      const results = document.querySelectorAll("#past-exam-search-results [data-past-open]");
      const active = document.querySelectorAll("#past-exam-search-results .past-exam-search-result.is-active");
      const sidebarRect = sidebar ? sidebar.getBoundingClientRect() : null;
      const panelRect = panel ? panel.getBoundingClientRect() : null;
      return {
        layoutVisible: Boolean(layout && !layout.hidden && getComputedStyle(layout).display !== "none"),
        sidebarInside: Boolean(sidebar && sidebar.contains(document.querySelector("#past-exam-search-results"))),
        title: document.querySelector("#past-exam-sidebar-title") ? document.querySelector("#past-exam-sidebar-title").textContent.trim() : "",
        status: document.querySelector("#past-exam-search-status") ? document.querySelector("#past-exam-search-status").textContent.trim() : "",
        resultCount: results.length,
        activeCount: active.length,
        activeId: active[0] ? active[0].dataset.pastOpen : "",
        panelQuestion: Boolean(panel && panel.querySelector(".past-exam-stem")),
        panelStem: panel && panel.querySelector(".past-exam-stem") ? panel.querySelector(".past-exam-stem").textContent : "",
        smallCount: document.querySelectorAll("#past-exam-search-results small").length,
        sidebarLeft: sidebarRect ? sidebarRect.left : -1,
        panelLeft: panelRect ? panelRect.left : -1,
        sidebarTop: sidebarRect ? sidebarRect.top : -1,
        panelTop: panelRect ? panelRect.top : -1,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        katexErrors: document.querySelectorAll(".katex-error").length
      };
    })()`);
    const problems = [];
    if (!ready) problems.push("page not ready");
    if (!initial.layoutVisible) problems.push("layout hidden");
    if (!initial.sidebarInside) problems.push("sidebar does not contain questions");
    if (initial.title !== "題目列表") problems.push("sidebar title " + initial.title);
    if (!initial.status.includes("共")) problems.push("sidebar status " + initial.status);
    if (!initial.resultCount) problems.push("question list empty");
    if (initial.activeCount !== 1) problems.push("active question count " + initial.activeCount);
    if (!initial.panelQuestion) problems.push("practice panel missing");
    if (initial.smallCount) problems.push("sidebar metadata count " + initial.smallCount);
    if (viewport.width > 900) {
      if (!(initial.sidebarLeft < initial.panelLeft)) problems.push("sidebar is not left of panel");
    } else if (!(initial.sidebarTop < initial.panelTop)) {
      problems.push("sidebar is not above panel");
    }
    if (initial.overflow > 1) problems.push("overflow " + initial.overflow);
    if (initial.katexErrors) problems.push("katex errors " + initial.katexErrors);

    if (viewport.width > 900) {
      const hover = await evaluate(send, `(() => {
        const buttons = Array.from(document.querySelectorAll("#past-exam-search-results [data-past-open]"));
        const index = buttons.findIndex((button) => !button.classList.contains("is-active"));
        if (index < 0) return null;
        const button = buttons[index];
        const rect = button.getBoundingClientRect();
        const style = getComputedStyle(button);
        return {
          index,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          border: style.borderTopColor,
          outline: style.outlineStyle
        };
      })()`);
      if (!hover) {
        problems.push("hover target missing");
      } else {
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: hover.x, y: hover.y, button: "none" });
        await sleep(200);
        const hovered = await evaluate(send, `(() => {
          const button = document.querySelectorAll("#past-exam-search-results [data-past-open]")[${hover.index}];
          const style = getComputedStyle(button);
          return { border: style.borderTopColor, outline: style.outlineStyle, active: button.classList.contains("is-active") };
        })()`);
        if (hovered.border !== hover.border) problems.push("hover border " + hovered.border);
        if (hovered.outline !== "none") problems.push("hover outline " + hovered.outline);
        if (hovered.active) problems.push("hover marked active");
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1, button: "none" });
      }
    }

    const questionIds = await evaluate(send, `(() => {
      const buttons = document.querySelectorAll("#past-exam-search-results [data-past-open]");
      return {
        first: buttons[0] ? buttons[0].dataset.pastOpen : "",
        second: buttons[1] ? buttons[1].dataset.pastOpen : ""
      };
    })()`);
    const secondId = questionIds.second;
    if (!questionIds.first || !secondId) {
      problems.push("question ids missing");
    } else {
      const beforeStem = initial.panelStem;
      await evaluate(send, `document.querySelectorAll("#past-exam-search-results [data-past-open]")[0].focus()`);
      await evaluate(send, `document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true }))`);
      const movedDown = await waitFor(send, `document.querySelector("#past-exam-search-results .past-exam-search-result.is-active") && document.querySelector("#past-exam-search-results .past-exam-search-result.is-active").dataset.pastOpen === ${JSON.stringify(secondId)} && document.querySelector("#past-exam-panel .past-exam-stem") && document.querySelector("#past-exam-panel .past-exam-stem").textContent !== ${JSON.stringify(beforeStem)}`, 5000);
      await evaluate(send, `document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true, cancelable: true }))`);
      const movedUp = await waitFor(send, `document.querySelector("#past-exam-search-results .past-exam-search-result.is-active") && document.querySelector("#past-exam-search-results .past-exam-search-result.is-active").dataset.pastOpen === ${JSON.stringify(questionIds.first)} && document.querySelector("#past-exam-panel .past-exam-stem") && document.querySelector("#past-exam-panel .past-exam-stem").textContent === ${JSON.stringify(beforeStem)}`, 5000);
      if (!movedDown) problems.push("ArrowDown did not select next");
      if (!movedUp) problems.push("ArrowUp did not select previous");

      await evaluate(send, `document.querySelectorAll("#past-exam-search-results [data-past-open]")[1].click()`);
      const selected = await waitFor(send, `document.querySelector("#past-exam-search-results .past-exam-search-result.is-active") && document.querySelector("#past-exam-search-results .past-exam-search-result.is-active").dataset.pastOpen === ${JSON.stringify(secondId)} && document.querySelector("#past-exam-panel .past-exam-stem") && document.querySelector("#past-exam-panel .past-exam-stem").textContent !== ${JSON.stringify(beforeStem)}`, 5000);
      if (!selected) problems.push("question did not open");
    }

    await evaluate(send, `(() => {
      const input = document.querySelector("#past-exam-search-input");
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, "存續期間");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()`);
    const searchReady = await waitFor(send, `document.querySelectorAll("#past-exam-search-results [data-past-open]").length > 0`, 10000);
    const search = await evaluate(send, `({
      title: document.querySelector("#past-exam-sidebar-title") ? document.querySelector("#past-exam-sidebar-title").textContent.trim() : "",
      count: document.querySelectorAll("#past-exam-search-results [data-past-open]").length,
      panelQuestion: Boolean(document.querySelector("#past-exam-panel .past-exam-stem")),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      katexErrors: document.querySelectorAll(".katex-error").length
    })`);
    if (!searchReady) problems.push("search results missing");
    if (search.title !== "搜尋結果") problems.push("search title " + search.title);
    if (!search.count) problems.push("search count 0");
    if (!search.panelQuestion) problems.push("search practice panel missing");
    if (search.overflow > 1) problems.push("search overflow " + search.overflow);
    if (search.katexErrors) problems.push("search katex errors " + search.katexErrors);

    const searchFirstId = await evaluate(send, `(() => {
      const button = document.querySelector("#past-exam-search-results [data-past-open]");
      return button ? button.dataset.pastOpen : "";
    })()`);
    if (!searchFirstId) {
      problems.push("search result missing");
    } else {
      await evaluate(send, `document.querySelector("#past-exam-search-results [data-past-open]").click()`);
      const selected = await waitFor(send, `document.querySelector("#past-exam-search-results .past-exam-search-result.is-active") && document.querySelector("#past-exam-search-results .past-exam-search-result.is-active").dataset.pastOpen === ${JSON.stringify(searchFirstId)}`, 5000);
      if (!selected) problems.push("search result did not open");
    }

    await evaluate(send, `document.querySelector("[data-past-search-clear]").click()`);
    const restored = await waitFor(send, `document.querySelector("#past-exam-sidebar-title") && document.querySelector("#past-exam-sidebar-title").textContent.trim() === "題目列表" && document.querySelectorAll("#past-exam-search-results [data-past-open]").length > 0`, 5000);
    const afterClear = await evaluate(send, `({
      inputValue: document.querySelector("#past-exam-search-input").value,
      activeCount: document.querySelectorAll("#past-exam-search-results .past-exam-search-result.is-active").length,
      panelQuestion: Boolean(document.querySelector("#past-exam-panel .past-exam-stem")),
      overflow: document.documentElement.scrollWidth - window.innerWidth
    })`);
    if (!restored) problems.push("search clear did not restore list");
    if (afterClear.inputValue) problems.push("search input not cleared");
    if (afterClear.activeCount !== 1) problems.push("clear active count " + afterClear.activeCount);
    if (!afterClear.panelQuestion) problems.push("clear practice panel missing");
    if (afterClear.overflow > 1) problems.push("clear overflow " + afterClear.overflow);

    if (problems.length) failures += 1;
    console.log((problems.length ? "FAIL" : "ok  ") + " practice sidebar " + viewport.width + "px " + viewport.theme +
      (problems.length ? " — " + problems.join("; ") : ""));
  }
  return failures;
}

async function checkWrittenSearchSidebar(send, events, args) {
  let failures = 0;
  for (const viewport of [
    { width: 1280, height: 1000, mobile: false, theme: "light" },
    { width: 1280, height: 1000, mobile: false, theme: "dark" },
    { width: 390, height: 900, mobile: true, theme: "light" },
    { width: 390, height: 900, mobile: true, theme: "dark" }
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile
    });
    events.length = 0;
    await send("Page.navigate", { url: urlFor(args.base, "/#/past-exams/written") });
    const inputReady = await waitFor(send, `document.readyState === "complete" && Boolean(document.querySelector("#written-search-input"))`);
    await evaluate(send, `document.documentElement.setAttribute("data-theme", ${JSON.stringify(viewport.theme)})`);
    const allReady = await waitFor(send, `document.querySelectorAll("#written-search-results [data-written-open]").length >= 300`, 10000);
    await sleep(300);
    const initial = await evaluate(send, `(() => {
      const layout = document.querySelector("#written-search-layout");
      const sidebar = document.querySelector("#written-search-results-panel");
      const detail = document.querySelector("#written-search-detail");
      const results = document.querySelectorAll("#written-search-results [data-written-open]");
      const active = document.querySelectorAll("#written-search-results .past-exam-search-result.is-active");
      const sidebarRect = sidebar ? sidebar.getBoundingClientRect() : null;
      const detailRect = detail ? detail.getBoundingClientRect() : null;
      return {
        layoutVisible: Boolean(layout && !layout.hidden && getComputedStyle(layout).display !== "none"),
        sidebarInside: Boolean(sidebar && sidebar.contains(document.querySelector("#written-search-results"))),
        listExists: Boolean(document.querySelector("#written-list")),
        detailCard: Boolean(detail && detail.querySelector(".written-card")),
        answerVisible: Boolean(detail && detail.querySelector(".written-answer")),
        toggleLabel: detail && detail.querySelector("[data-written-toggle]") ? detail.querySelector("[data-written-toggle]").textContent.trim() : "",
        smallCount: document.querySelectorAll("#written-search-results small").length,
        resultCount: results.length,
        activeCount: active.length,
        activeId: active[0] ? active[0].dataset.writtenOpen : "",
        detailId: detail && detail.querySelector(".written-card") ? detail.querySelector(".written-card").id : "",
        title: document.querySelector("#written-sidebar-title") ? document.querySelector("#written-sidebar-title").textContent.trim() : "",
        status: document.querySelector("#written-search-status") ? document.querySelector("#written-search-status").textContent.trim() : "",
        sidebarLeft: sidebarRect ? sidebarRect.left : -1,
        detailLeft: detailRect ? detailRect.left : -1,
        sidebarTop: sidebarRect ? sidebarRect.top : -1,
        detailTop: detailRect ? detailRect.top : -1,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        katexErrors: document.querySelectorAll(".katex-error").length
      };
    })()`);
    const problems = [];
    if (!inputReady) problems.push("search input missing");
    if (!allReady) problems.push("all questions missing");
    if (!initial.layoutVisible) problems.push("layout hidden");
    if (!initial.sidebarInside) problems.push("sidebar does not contain questions");
    if (initial.listExists) problems.push("legacy written list exists");
    if (!initial.detailCard) problems.push("detail card missing");
    if (!initial.answerVisible) problems.push("default answer hidden");
    if (initial.toggleLabel !== "收起解答") problems.push("default answer toggle " + initial.toggleLabel);
    if (initial.smallCount) problems.push("sidebar metadata count " + initial.smallCount);
    if (initial.resultCount < 300) problems.push("question count " + initial.resultCount);
    if (initial.activeCount !== 1) problems.push("active question count " + initial.activeCount);
    if (initial.title !== "題目列表") problems.push("sidebar title " + initial.title);
    if (!initial.status.includes("共")) problems.push("sidebar status " + initial.status);
    if (viewport.width > 900) {
      if (!(initial.sidebarLeft < initial.detailLeft)) problems.push("sidebar is not left of detail");
    } else if (!(initial.sidebarTop < initial.detailTop)) {
      problems.push("sidebar is not above detail");
    }
    if (initial.overflow > 1) problems.push("overflow " + initial.overflow);
    if (initial.katexErrors) problems.push("katex errors " + initial.katexErrors);

    if (viewport.width > 900) {
      const hover = await evaluate(send, `(() => {
        const buttons = Array.from(document.querySelectorAll("#written-search-results [data-written-open]"));
        const index = buttons.findIndex((button) => !button.classList.contains("is-active"));
        if (index < 0) return null;
        const button = buttons[index];
        const rect = button.getBoundingClientRect();
        const style = getComputedStyle(button);
        return {
          index,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          border: style.borderTopColor,
          outline: style.outlineStyle
        };
      })()`);
      if (!hover) {
        problems.push("hover target missing");
      } else {
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: hover.x, y: hover.y, button: "none" });
        await sleep(200);
        const hovered = await evaluate(send, `(() => {
          const button = document.querySelectorAll("#written-search-results [data-written-open]")[${hover.index}];
          const style = getComputedStyle(button);
          return { border: style.borderTopColor, outline: style.outlineStyle, active: button.classList.contains("is-active") };
        })()`);
        if (hovered.border !== hover.border) problems.push("hover border " + hovered.border);
        if (hovered.outline !== "none") problems.push("hover outline " + hovered.outline);
        if (hovered.active) problems.push("hover marked active");
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1, button: "none" });
      }
    }

    const initialIds = await evaluate(send, `(() => {
      const buttons = document.querySelectorAll("#written-search-results [data-written-open]");
      return {
        first: buttons[0] ? buttons[0].dataset.writtenOpen : "",
        second: buttons[1] ? buttons[1].dataset.writtenOpen : ""
      };
    })()`);
    const initialSecondId = initialIds.second;
    if (!initialIds.first || !initialSecondId) {
      problems.push("question ids missing");
    } else {
      await evaluate(send, `document.querySelectorAll("#written-search-results [data-written-open]")[0].focus()`);
      await evaluate(send, `document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true }))`);
      const movedDown = await waitFor(send, `document.querySelector("#written-search-results .past-exam-search-result.is-active") && document.querySelector("#written-search-results .past-exam-search-result.is-active").dataset.writtenOpen === ${JSON.stringify(initialSecondId)} && document.querySelector("#written-search-detail .written-card") && document.querySelector("#written-search-detail .written-card").id === ${JSON.stringify("written-" + initialSecondId)}`, 5000);
      await evaluate(send, `document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true, cancelable: true }))`);
      const movedUp = await waitFor(send, `document.querySelector("#written-search-results .past-exam-search-result.is-active") && document.querySelector("#written-search-results .past-exam-search-result.is-active").dataset.writtenOpen === ${JSON.stringify(initialIds.first)} && document.querySelector("#written-search-detail .written-card") && document.querySelector("#written-search-detail .written-card").id === ${JSON.stringify("written-" + initialIds.first)}`, 5000);
      if (!movedDown) problems.push("ArrowDown did not select next");
      if (!movedUp) problems.push("ArrowUp did not select previous");

      await evaluate(send, `document.querySelectorAll("#written-search-results [data-written-open]")[1].click()`);
      const selected = await waitFor(send, `document.querySelector("#written-search-detail .written-card") && document.querySelector("#written-search-detail .written-card").id === ${JSON.stringify("written-" + initialSecondId)}`, 5000);
      const after = await evaluate(send, `(() => {
        const active = document.querySelector("#written-search-results .past-exam-search-result.is-active");
        return {
          activeCount: document.querySelectorAll("#written-search-results .past-exam-search-result.is-active").length,
          activeId: active ? active.dataset.writtenOpen : "",
          detailId: document.querySelector("#written-search-detail .written-card") ? document.querySelector("#written-search-detail .written-card").id : ""
        };
      })()`);
      if (!selected) problems.push("selected detail missing");
      if (after.activeCount !== 1) problems.push("active after click " + after.activeCount);
      if (after.activeId !== initialSecondId) problems.push("active id after click " + after.activeId);
      if (after.detailId !== "written-" + initialSecondId) problems.push("detail id after click " + after.detailId);
    }

    await evaluate(send, `(() => {
      const input = document.querySelector("#written-search-input");
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, "存續期間");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()`);
    const resultsReady = await waitFor(send, `document.querySelectorAll("#written-search-results [data-written-open]").length > 1`, 10000);
    await sleep(300);
    const search = await evaluate(send, `(() => {
      const results = document.querySelectorAll("#written-search-results [data-written-open]");
      const active = document.querySelectorAll("#written-search-results .past-exam-search-result.is-active");
      return {
        resultCount: results.length,
        activeCount: active.length,
        detailCard: Boolean(document.querySelector("#written-search-detail .written-card")),
        answerVisible: Boolean(document.querySelector("#written-search-detail .written-answer")),
        title: document.querySelector("#written-sidebar-title") ? document.querySelector("#written-sidebar-title").textContent.trim() : "",
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        katexErrors: document.querySelectorAll(".katex-error").length
      };
    })()`);
    if (!resultsReady) problems.push("search results missing");
    if (search.resultCount < 2) problems.push("search result count " + search.resultCount);
    if (search.activeCount !== 1) problems.push("search active count " + search.activeCount);
    if (!search.detailCard) problems.push("search detail missing");
    if (!search.answerVisible) problems.push("search default answer hidden");
    if (search.title !== "搜尋結果") problems.push("search title " + search.title);
    if (search.overflow > 1) problems.push("search overflow " + search.overflow);
    if (search.katexErrors) problems.push("search katex errors " + search.katexErrors);

    const searchSecondId = await evaluate(send, `(() => {
      const buttons = document.querySelectorAll("#written-search-results [data-written-open]");
      return buttons[1] ? buttons[1].dataset.writtenOpen : "";
    })()`);
    if (!searchSecondId) {
      problems.push("second search result missing");
    } else {
      await evaluate(send, `document.querySelectorAll("#written-search-results [data-written-open]")[1].click()`);
      const selected = await waitFor(send, `document.querySelector("#written-search-detail .written-card") && document.querySelector("#written-search-detail .written-card").id === ${JSON.stringify("written-" + searchSecondId)}`, 5000);
      if (!selected) problems.push("selected search detail missing");
    }

    await evaluate(send, `document.querySelector("[data-written-search-clear]").click()`);
    const restored = await waitFor(send, `document.querySelectorAll("#written-search-results [data-written-open]").length >= 300`, 5000);
    const afterClear = await evaluate(send, `({
      inputValue: document.querySelector("#written-search-input").value,
      title: document.querySelector("#written-sidebar-title") ? document.querySelector("#written-sidebar-title").textContent.trim() : "",
      activeCount: document.querySelectorAll("#written-search-results .past-exam-search-result.is-active").length,
      detailCards: document.querySelectorAll("#written-search-detail .written-card").length,
      answerVisible: Boolean(document.querySelector("#written-search-detail .written-answer")),
      overflow: document.documentElement.scrollWidth - window.innerWidth
    })`);
    if (!restored) problems.push("search clear did not restore all questions");
    if (afterClear.inputValue) problems.push("search input not cleared");
    if (afterClear.title !== "題目列表") problems.push("clear title " + afterClear.title);
    if (afterClear.activeCount !== 1) problems.push("clear active count " + afterClear.activeCount);
    if (afterClear.detailCards !== 1) problems.push("clear detail count " + afterClear.detailCards);
    if (!afterClear.answerVisible) problems.push("clear default answer hidden");
    if (afterClear.overflow > 1) problems.push("clear overflow " + afterClear.overflow);

    if (problems.length) failures += 1;
    console.log((problems.length ? "FAIL" : "ok  ") + " written search sidebar " + viewport.width + "px " + viewport.theme +
      (problems.length ? " — " + problems.join("; ") : ""));
  }
  return failures;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const connection = await connect(args.cdp);
  const { ws, send, events } = connection;
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });

  const viewports = args.quick
    ? [{ width: 1280, height: 1000, mobile: false, theme: "light" }]
    : [
        { width: 1280, height: 1000, mobile: false, theme: "light" },
        { width: 1280, height: 1000, mobile: false, theme: "dark" },
        { width: 390, height: 900, mobile: true, theme: "light" },
        { width: 390, height: 900, mobile: true, theme: "dark" }
      ];
  const routes = args.only
    ? ROUTES.filter(function (route) { return args.only.indexOf(route.name) !== -1; })
    : ROUTES;
  const results = [];
  let failed = 0;

  if (!routes.length) {
    console.error("No routes matched --only: " + args.only.join(","));
    process.exit(1);
  }

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

  if (args.only) {
    if (args.only.indexOf("written-exams") !== -1 || args.only.indexOf("written-search") !== -1) {
      failed += await checkWrittenSearchSidebar(send, events, args);
    }
    if (args.only.indexOf("past-exams") !== -1 || args.only.indexOf("past-search") !== -1 || args.only.indexOf("past-exam") !== -1) {
      failed += await checkPracticeSidebar(send, events, args);
    }
    if (args.only.indexOf("past-exam") !== -1) {
      failed += await checkPracticeNext(send, events, args);
    }
    ws.close();
    if (failed) {
      console.error("UI checks failed: " + failed);
      process.exit(1);
    }
    console.log("UI checks passed: " + results.length + " route/viewport/theme checks");
    return;
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
  const pastSearchReady = await waitFor(send, `document.querySelectorAll("#past-exam-search-results [data-past-open]").length > 0`, 10000);
  const pastSearchState = await evaluate(send, `({
    count: document.querySelectorAll("#past-exam-search-results [data-past-open]").length,
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
      sidebar: document.querySelector("#past-exam-search-results"),
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
      sameSidebar: document.querySelector("#past-exam-search-results") === window.__filterRefs.sidebar,
      samePanel: document.querySelector("#past-exam-panel") === window.__filterRefs.panel,
      scrollY: window.scrollY,
      flicker: window.__filterFlicker
    };
  })()`);
  const filterProblems = [];
  if (!filterReady) filterProblems.push("year filter not ready");
  if (!filterAfter.sameKids || !filterAfter.sameSearch || !filterAfter.sameRows || !filterAfter.sameSidebar || !filterAfter.samePanel) filterProblems.push("DOM was replaced");
  if (filterAfter.flicker.routing) filterProblems.push("route loader class");
  if (filterAfter.flicker.loader) filterProblems.push("route loader visible");
  if (filterAfter.flicker.mainMutations) filterProblems.push("main children mutated " + filterAfter.flicker.mainMutations);
  if (Math.abs(filterAfter.scrollY - filterBefore.scrollY) > 1) filterProblems.push("scroll jump " + filterBefore.scrollY + "→" + filterAfter.scrollY);
  if (filterProblems.length) failed += 1;
  console.log((filterProblems.length ? "FAIL" : "ok  ") + " past search no-flicker" +
    (filterProblems.length ? " — " + filterProblems.join("; ") : ""));

  failed += await checkPracticeSidebar(send, events, args);

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
  const writtenSearchReady = await waitFor(send, `document.querySelectorAll("#written-search-results [data-written-open]").length > 0`, 10000);
  const writtenSearchState = await evaluate(send, `({
    count: document.querySelectorAll("#written-search-results [data-written-open]").length,
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
      results: document.querySelector("#written-search-results"),
      detail: document.querySelector("#written-search-detail")
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
      sameResults: document.querySelector("#written-search-results") === window.__writtenRefs.results,
      sameDetail: document.querySelector("#written-search-detail") === window.__writtenRefs.detail,
      flicker: window.__writtenFlicker
    };
  })()`);
  if (!writtenFilterReady) writtenProblems.push("written filter not ready");
  if (!writtenFlickerAfter.sameKids || !writtenFlickerAfter.sameSearch || !writtenFlickerAfter.sameRows || !writtenFlickerAfter.sameResults || !writtenFlickerAfter.sameDetail) writtenProblems.push("written DOM was replaced");
  if (writtenFlickerAfter.flicker.routing) writtenProblems.push("written route loader class");
  if (writtenFlickerAfter.flicker.loader) writtenProblems.push("written route loader visible");
  if (writtenFlickerAfter.flicker.mainMutations) writtenProblems.push("written main children mutated " + writtenFlickerAfter.flicker.mainMutations);
  if (writtenProblems.length) failed += 1;
  console.log((writtenProblems.length ? "FAIL" : "ok  ") + " written search no-flicker " + writtenSearchState.count +
    (writtenProblems.length ? " — " + writtenProblems.join("; ") : ""));

  failed += await checkWrittenSearchSidebar(send, events, args);
  failed += await checkPracticeNext(send, events, args);

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
