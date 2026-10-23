// 路由分包載入器：先載入共用科目內容，再依目前 hash 載入考古題、圖表、法規全文等大型資料。
// 不使用 fetch，維持 file:// 可直接開啟；跨分包導覽時以重新載入方式切換。

(function () {
  "use strict";

  const bundles = {
    core: [
      "content-macro.js",
      "content-macro-2.js",
      "content-macro-3.js",
      "content-investment.js",
      "content-investment-formulas.js",
      "content-investment-technical.js",
      "content-accounting.js",
      "content-accounting-2.js",
      "content-law.js",
      "content-chapter-supplements.js",
      "content-law-deepdive.js",
      "content-law-deepdive-2.js",
      "content-law-quickread.js",
      "content-formula-tex.js",
      "content.js",
      "content-exam-forecast.js",
      "content-exam-forecast-answers.js",
      "content-past-exam-stats.js"
    ],
    app: ["katex/katex.min.js", "app.js"],
    past: [
      "content-past-exams.js",
      "content-past-exams-written.js",
      "content-written-layouts.js",
      "content-exam-solutions-115.js",
      "content-exam-solutions-114.js",
      "content-exam-solutions-113.js",
      "content-exam-solutions-112.js",
      "content-exam-solutions-111.js",
      "content-exam-solutions-110.js",
      "content-exam-solutions-109.js",
      "content-exam-solutions-108.js",
      "content-exam-solutions-107.js"
    ],
    explanations: ["content-past-exams-explanations.js"],
    diagrams: [
      "diagrams-macro.js",
      "diagrams-macro-2.js",
      "diagrams-macro-3.js",
      "diagrams-macro-4.js",
      "diagrams-macro-5.js",
      "diagrams-investment.js",
      "diagrams-accounting.js"
    ],
    macroDiagrams: [
      "diagrams-macro.js",
      "diagrams-macro-2.js",
      "diagrams-macro-3.js",
      "diagrams-macro-4.js",
      "diagrams-macro-5.js"
    ],
    nobel: ["content-nobel.js", "diagrams-nobel.js"],
    evolution: ["content-macro-evolution.js"],
    macroSubject: ["content-macro-evolution.js", "content-nobel.js", "diagrams-nobel.js", "diagrams-macro.js", "diagrams-macro-2.js", "diagrams-macro-3.js", "diagrams-macro-4.js", "diagrams-macro-5.js"],
    macroCurrent: ["content-macro-current.js"],
    lawArticles: ["content-law-articles.js"]
  };

  const loaded = new Set();
  const basePath = (function () {
    const script = document.currentScript;
    const src = script && script.getAttribute("src") ? script.getAttribute("src") : "assets/bootstrap.js";
    return src.replace(/bootstrap\.js(?:\?.*)?$/, "");
  })();

  function routeParts() {
    return (location.hash || "").replace(/^#/, "").split("?")[0].split("/").filter(Boolean);
  }

  function requiredBundles() {
    const parts = routeParts();
    const top = parts[0] || "";
    const list = ["core"];
    if (top === "past-exams") {
      list.push("past");
      if (parts[1] !== "written") list.push("explanations");
    } else if (top === "chapter") {
      list.push("past", "diagrams");
      if ((parts[1] || "").indexOf("law-") === 0) list.push("lawArticles");
    } else if (top === "subject" && parts[1] === "macro") {
      list.push("macroSubject");
    } else if (top === "models" && parts[1] === "macro") {
      list.push("macroDiagrams", "nobel");
    } else if (top === "nobel") {
      list.push("nobel");
    } else if (top === "macro" && parts[1] === "evolution") {
      list.push("evolution");
    } else if (top === "macro-current") {
      list.push("macroCurrent");
    }
    return list;
  }

  function loadScript(file) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = basePath + file;
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("無法載入 " + file)); };
      document.body.appendChild(script);
    });
  }

  async function loadBundle(name) {
    if (loaded.has(name)) return;
    const files = bundles[name] || [];
    for (const file of files) {
      await loadScript(file);
    }
    loaded.add(name);
    window.__LAZY_LOADED_BUNDLES = Array.from(loaded);
  }

  function showLoader(text) {
    document.documentElement.classList.add("is-routing");
    let node = document.getElementById("route-loader");
    if (!node) {
      node = document.createElement("div");
      node.id = "route-loader";
      node.className = "route-loader";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      document.body.appendChild(node);
    }
    node.textContent = text || "載入中…";
    node.hidden = false;
  }

  function hideLoader() {
    document.documentElement.classList.remove("is-routing");
    const node = document.getElementById("route-loader");
    if (node) node.hidden = true;
  }

  async function boot() {
    showLoader("載入頁面資料…");
    try {
      const required = requiredBundles();
      for (const name of required) {
        await loadBundle(name);
      }
      await loadBundle("app");
      hideLoader();
    } catch (error) {
      const node = document.getElementById("route-loader");
      if (node) {
        node.hidden = false;
        node.textContent = "資料載入失敗，請重新整理頁面。";
      }
      console.error(error);
    }
  }

  window.addEventListener("hashchange", function () {
    const required = requiredBundles();
    const missing = required.some(function (name) { return !loaded.has(name); });
    if (missing) {
      showLoader("載入頁面資料…");
      location.reload();
    }
  });

  boot();
})();
