// 路由分包載入器：先載入共用科目內容，再依目前 hash 載入考古題、圖表、法規全文等大型資料。
// 不使用 fetch，維持 file:// 可直接開啟；跨分包導覽時載入缺少的資料後原地重新整理。

(function () {
  "use strict";

  const bundles = {
    core: ["content-core-bundle.js"],
    app: ["diagrams-mermaid.js", "diagrams-mermaid-static.js", "mermaid-lab.js", "katex/katex.min.js", "app.js"],
    pastAll: ["content-past-exams.js"],
    pastWritten: ["content-past-exams-written.js", "content-written-layouts.js"],
    explanations: ["content-past-exams-explanations.js"],
    pastSearch: ["content-past-exam-search.js"],
    diagrams: [
      "diagrams-macro.js",
      "diagrams-macro-2.js",
      "diagrams-macro-3.js",
      "diagrams-macro-4.js",
      "diagrams-macro-5.js",
      "diagrams-investment.js",
      "diagrams-accounting.js"
    ],
    diagramsInvestment: ["diagrams-investment.js"],
    diagramsAccounting: ["diagrams-accounting.js"],
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
    macroCurrent: ["content-macro-current.js"]
  };

  const loaded = new Set();
  const basePath = (function () {
    const script = document.currentScript;
    const src = script && script.getAttribute("src") ? script.getAttribute("src") : "assets/bootstrap.js";
    return src.replace(/bootstrap\.js(?:\?.*)?$/, "");
  })();
  window.__ASSET_BASE__ = basePath;

  function routeParts() {
    return (location.hash || "").replace(/^#/, "").split("?")[0].split("/").filter(Boolean);
  }

  function routeQuery() {
    const raw = (location.hash || "").split("?")[1] || "";
    return new URLSearchParams(raw);
  }

  function parseHash(hash) {
    const raw = String(hash || "").replace(/^#/, "");
    const pieces = raw.split("?");
    return {
      parts: pieces[0].split("/").filter(Boolean),
      query: new URLSearchParams(pieces[1] || "")
    };
  }

  function practiceYearForQuery(query) {
    const explicit = query.get("year");
    if (explicit === "all") return "all";
    if (/^\d{3}$/.test(explicit || "")) return explicit;
    const question = query.get("question") || "";
    const match = question.match(/^(\d{3})/);
    return match ? match[1] : "115";
  }

  function requiredBundlesFor(parts, query) {
    const top = parts[0] || "";
    const list = ["core"];
    if (top === "past-exams") {
      if (parts[1] === "written") {
        list.push("pastWritten");
      } else {
        const year = practiceYearForQuery(query);
        list.push(year === "all" ? "pastAll" : "pastYear:" + year);
      }
    } else if (top === "chapter") {
      const chapterId = parts[1] || "";
      const subjectId = chapterId.split("-")[0];
      list.push("chapter:" + chapterId);
      if (subjectId === "macro") list.push("macroDiagrams");
      else if (subjectId === "investment") list.push("diagramsInvestment");
      else if (subjectId === "accounting") list.push("diagramsAccounting");
      else if (subjectId === "law") list.push("lawArticle:" + chapterId);
      else list.push("diagrams");
    } else if (top === "lab" && parts[1] === "mermaid") {
      list.push("diagrams");
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

  function requiredBundles() {
    return requiredBundlesFor(routeParts(), routeQuery());
  }

  function filesForBundle(name) {
    if (name.indexOf("chapter:") === 0) {
      return ["content-chapter-data-" + name.slice("chapter:".length) + ".js"];
    }
    if (name.indexOf("pastYear:") === 0) {
      return ["content-past-exams-year-" + name.slice("pastYear:".length) + ".js"];
    }
    if (name.indexOf("lawArticle:") === 0) {
      return ["content-law-articles-" + name.slice("lawArticle:".length) + ".js"];
    }
    return bundles[name] || [];
  }

  function loadFiles(files) {
    return new Promise(function (resolve, reject) {
      if (!files.length) {
        resolve();
        return;
      }
      let remaining = files.length;
      let settled = false;
      files.forEach(function (file) {
        const script = document.createElement("script");
        script.src = basePath + file;
        // async=false：瀏覽器可平行下載，但依插入順序執行，保留 content.js／app.js 的依賴順序。
        script.async = false;
        script.onload = function () {
          remaining -= 1;
          if (remaining === 0 && !settled) {
            settled = true;
            resolve();
          }
        };
        script.onerror = function () {
          if (!settled) {
            settled = true;
            reject(new Error("無法載入 " + file));
          }
        };
        document.body.appendChild(script);
      });
    });
  }

  async function loadBundle(name) {
    if (loaded.has(name)) return;
    const files = filesForBundle(name);
    await loadFiles(files);
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
      const loadedNames = required.concat("app");
      const files = [];
      const seen = new Set();
      loadedNames.forEach(function (name) {
        filesForBundle(name).forEach(function (file) {
          if (!seen.has(file)) {
            seen.add(file);
            files.push(file);
          }
        });
      });
      await loadFiles(files);
      loadedNames.forEach(function (name) { loaded.add(name); });
      window.__LAZY_LOADED_BUNDLES = Array.from(loaded);
      try {
        sessionStorage.removeItem("lazy-retry:" + location.hash);
      } catch (error) {
        /* file:// 或隱私模式可能停用 sessionStorage */
      }
      hideLoader();
    } catch (error) {
      let attempt = 0;
      try {
        attempt = Number(sessionStorage.getItem("lazy-retry:" + location.hash) || 0);
      } catch (storageError) {
        attempt = 0;
      }
      if (attempt < 2) {
        try {
          sessionStorage.setItem("lazy-retry:" + location.hash, String(attempt + 1));
        } catch (storageError) {
          /* 無法儲存時仍重試一次 */
        }
        showLoader("網路不穩，重新載入…");
        location.reload();
        return;
      }
      const node = document.getElementById("route-loader");
      if (node) {
        node.hidden = false;
        node.textContent = "資料載入失敗，請重新整理頁面。";
      }
      console.error(error);
    }
  }

  window.__loadExplanations = function () {
    return loadBundle("explanations");
  };

  window.__loadPastSearch = function () {
    return loadBundle("pastSearch");
  };

  const prefetched = new Set();
  function prefetchHref(href) {
    if (!href || href.indexOf("#/") !== 0) return;
    if (navigator.connection && (navigator.connection.saveData || /(^|-)2g$/.test(navigator.connection.effectiveType || ""))) return;
    const route = parseHash(href);
    const names = requiredBundlesFor(route.parts, route.query);
    names.forEach(function (name) {
      if (loaded.has(name)) return;
      filesForBundle(name).forEach(function (file) {
        if (prefetched.has(file)) return;
        prefetched.add(file);
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = basePath + file;
        document.head.appendChild(link);
      });
    });
  }

  document.addEventListener("mouseover", function (event) {
    const link = event.target.closest('a[href^="#/"]');
    if (link) prefetchHref(link.getAttribute("href"));
  });
  document.addEventListener("focusin", function (event) {
    const link = event.target.closest('a[href^="#/"]');
    if (link) prefetchHref(link.getAttribute("href"));
  });

  let transitionLoading = false;

  window.addEventListener("hashchange", function (event) {
    const required = requiredBundles();
    const missing = required.filter(function (name) { return !loaded.has(name); });
    if (!missing.length) return;
    event.stopImmediatePropagation();
    if (transitionLoading) return;
    transitionLoading = true;
    showLoader("載入頁面資料…");
    Promise.all(missing.map(loadBundle)).then(function () {
      transitionLoading = false;
      hideLoader();
      if (typeof window.__softRefreshApp === "function") {
        window.__softRefreshApp();
      } else {
        location.reload();
      }
    }).catch(function (error) {
      transitionLoading = false;
      console.error(error);
      location.reload();
    });
  });

  boot();
})();
