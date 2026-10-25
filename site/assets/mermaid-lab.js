/* Mermaid × Pele Pilot runtime.
   1. 只在讀者切到「新版 mmd」時才載入 Pele flowchart bundle。
   2. 右上角圖表風格切換器會即時注入 CSS，並 destroy／重新 mount 已開啟的 Pele 圖表。
   3. .mmd 可直接複製或下載，方便帶到其他網頁或應用程式。 */

(function () {
  "use strict";

  const STYLE_KEY = "analyst-pele-style";
  const DEFAULT_STYLE = "paper";
  const STYLES = {
    paper: { label: "紙感", note: "沿用網站色票" },
    blueprint: { label: "藍圖", note: "深藍網格與等寬字" },
    mono: { label: "極簡", note: "黑白線稿" },
    contrast: { label: "高對比", note: "黑底螢光重點" }
  };

  const PRESET_CSS = {
    paper: "",
    blueprint: [
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele {',
      '  --pele-bg: #081a2b;',
      '  --pele-fg: #d9ecff;',
      '  --pele-muted: #8eb8dd;',
      '  --pele-line: #5d93c4;',
      '  --pele-surface: #0e2740;',
      '  --pele-surface-alt: #0a2036;',
      '  --pele-border: #3e6f9e;',
      '  --pele-accent: #67c7ff;',
      '  --pele-critical: #ff8c7a;',
      '  --pele-font: var(--font-mono);',
      '  --pele-font-mono: var(--font-mono);',
      '  --pele-radius: 0px;',
      '  background-color: #081a2b;',
      '  background-image: linear-gradient(rgba(103, 199, 255, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 199, 255, 0.09) 1px, transparent 1px);',
      '  background-size: 24px 24px;',
      '}',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-cluster rect {',
      '  fill: #0b2238 !important;',
      '  fill-opacity: 0.92;',
      '  stroke: #3e6f9e !important;',
      '  stroke-dasharray: 4 4;',
      '}',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-cluster-label { fill: #8eb8dd !important; }',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node rect {',
      '  fill: #0e2740 !important;',
      '  stroke: #5d93c4 !important;',
      '}',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node.accent rect {',
      '  fill: #123c5c !important;',
      '  stroke: #67c7ff !important;',
      '}',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node.outcome rect {',
      '  fill: #3a2a12 !important;',
      '  stroke: #ffb86b !important;',
      '}',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node .pele-label { fill: #d9ecff !important; }',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node.accent .pele-label { fill: #eaf7ff !important; }',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-node.outcome .pele-label { fill: #ffe3bd !important; }',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-edge path { stroke: #5d93c4 !important; }',
      '[data-pele-style="blueprint"] .diagram-canvas-mermaid .pele-marker { fill: #5d93c4 !important; }'
    ].join("\n"),
    mono: [
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele {',
      '  --pele-bg: transparent;',
      '  --pele-fg: var(--ink);',
      '  --pele-muted: var(--muted);',
      '  --pele-line: var(--ink);',
      '  --pele-surface: transparent;',
      '  --pele-surface-alt: transparent;',
      '  --pele-border: var(--ink);',
      '  --pele-accent: var(--ink);',
      '  --pele-critical: var(--danger);',
      '  --pele-radius: 0px;',
      '  background: transparent;',
      '}',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-cluster rect {',
      '  fill: transparent !important;',
      '  stroke: var(--line-strong) !important;',
      '  stroke-dasharray: 3 3;',
      '}',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-cluster-label { fill: var(--muted) !important; }',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-node rect {',
      '  fill: transparent !important;',
      '  stroke: var(--ink) !important;',
      '  stroke-width: 1.2px !important;',
      '}',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-node.accent rect,',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-node.outcome rect {',
      '  fill: transparent !important;',
      '  stroke: var(--ink) !important;',
      '  stroke-width: 2px !important;',
      '}',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-node .pele-label { fill: var(--ink) !important; }',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-edge path { stroke: var(--line-strong) !important; }',
      '[data-pele-style="mono"] .diagram-canvas-mermaid .pele-marker { fill: var(--line-strong) !important; }'
    ].join("\n"),
    contrast: [
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele {',
      '  --pele-bg: #000000;',
      '  --pele-fg: #ffffff;',
      '  --pele-muted: #ffe600;',
      '  --pele-line: #ffffff;',
      '  --pele-surface: #111111;',
      '  --pele-surface-alt: #000000;',
      '  --pele-border: #ffffff;',
      '  --pele-accent: #ffe600;',
      '  --pele-critical: #ff5252;',
      '  --pele-radius: 2px;',
      '  background: #000000;',
      '}',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-cluster rect {',
      '  fill: #111111 !important;',
      '  stroke: #ffe600 !important;',
      '  stroke-dasharray: 5 4;',
      '}',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-cluster-label { fill: #ffe600 !important; }',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node rect {',
      '  fill: #111111 !important;',
      '  stroke: #ffffff !important;',
      '  stroke-width: 2px !important;',
      '}',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node.accent rect {',
      '  fill: #ffe600 !important;',
      '  stroke: #ffe600 !important;',
      '}',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node.outcome rect {',
      '  fill: #00e5ff !important;',
      '  stroke: #00e5ff !important;',
      '}',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node .pele-label { fill: #ffffff !important; }',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node.accent .pele-label,',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-node.outcome .pele-label { fill: #000000 !important; }',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-edge path { stroke: #ffffff !important; }',
      '[data-pele-style="contrast"] .diagram-canvas-mermaid .pele-marker { fill: #ffffff !important; }'
    ].join("\n")
  };

  const currentScript = document.currentScript;
  const scriptSrc = currentScript && currentScript.getAttribute("src")
    ? currentScript.getAttribute("src")
    : "assets/mermaid-lab.js";
  const basePath = scriptSrc.replace(/mermaid-lab\.js(?:\?.*)?$/, "");

  let currentStyle = DEFAULT_STYLE;
  let pelePromise = null;
  let styleElement = null;
  let menuOpen = false;
  const mounts = new Map();
  const loadingPanels = new Set();

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getEntry(key) {
    const all = window.MERMAID_DIAGRAMS || {};
    return all[key] || null;
  }

  function ensureStyleElement() {
    if (styleElement && document.head.contains(styleElement)) {
      return styleElement;
    }
    styleElement = document.getElementById("pele-style-runtime");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "pele-style-runtime";
      document.head.appendChild(styleElement);
    }
    return styleElement;
  }

  function readSavedStyle() {
    try {
      const saved = window.localStorage.getItem(STYLE_KEY);
      return STYLES[saved] ? saved : DEFAULT_STYLE;
    } catch (error) {
      return DEFAULT_STYLE;
    }
  }

  function saveStyle(name) {
    try {
      window.localStorage.setItem(STYLE_KEY, name);
    } catch (error) {
      /* file:// 或隱私模式可能停用 localStorage */
    }
  }

  function updateMenuState() {
    const menu = document.getElementById("pele-style-menu");
    if (!menu) return;
    menu.querySelectorAll("[data-pele-style-option]").forEach(function (button) {
      const active = button.getAttribute("data-pele-style-option") === currentStyle;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("is-active", active);
    });
  }

  function applyStyle(name, options) {
    const opts = options || {};
    const next = STYLES[name] ? name : DEFAULT_STYLE;
    currentStyle = next;
    document.documentElement.setAttribute("data-pele-style", next);
    ensureStyleElement().textContent = PRESET_CSS[next] || "";
    updateMenuState();
    if (opts.remount !== false) {
      remountAll();
    }
    if (opts.persist !== false) {
      saveStyle(next);
    }
  }

  function setMenuOpen(open) {
    const menu = document.getElementById("pele-style-menu");
    const toggle = document.getElementById("pele-style-toggle");
    if (!menu || !toggle) return;
    menuOpen = Boolean(open);
    menu.hidden = !menuOpen;
    toggle.setAttribute("aria-expanded", menuOpen ? "true" : "false");
    if (menuOpen) {
      const active = menu.querySelector('[data-pele-style-option][aria-pressed="true"]') ||
        menu.querySelector("[data-pele-style-option]");
      if (active) {
        active.focus();
      }
    }
  }

  function bindStyleMenu() {
    const menu = document.getElementById("pele-style-menu");
    const toggle = document.getElementById("pele-style-toggle");
    if (!menu || !toggle) return;

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setMenuOpen(!menuOpen);
    });

    menu.addEventListener("click", function (event) {
      const option = event.target.closest("[data-pele-style-option]");
      if (!option) return;
      applyStyle(option.getAttribute("data-pele-style-option"));
      setMenuOpen(false);
      toggle.focus();
    });

    document.addEventListener("click", function (event) {
      if (!menuOpen) return;
      if (event.target.closest("#pele-style-menu") || event.target.closest("#pele-style-toggle")) {
        return;
      }
      setMenuOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      toggle.focus();
    });
  }

  function ensurePele() {
    if (window.PeleFlow) {
      return Promise.resolve(window.PeleFlow);
    }
    if (pelePromise) {
      return pelePromise;
    }
    pelePromise = new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = basePath + "vendor/pele-flow.min.js";
      script.async = true;
      script.onload = function () {
        if (window.PeleFlow) {
          resolve(window.PeleFlow);
        } else {
          pelePromise = null;
          reject(new Error("Pele 載入後找不到 PeleFlow"));
        }
      };
      script.onerror = function () {
        pelePromise = null;
        reject(new Error("無法載入 " + script.src));
      };
      document.head.appendChild(script);
    });
    return pelePromise;
  }

  function mountOptions(element) {
    const style = window.getComputedStyle(element);
    const mono = style.getPropertyValue("--font-mono").trim() || undefined;
    const sans = style.getPropertyValue("--font-sans").trim() || style.fontFamily || undefined;
    const fontFamily = document.documentElement.getAttribute("data-pele-style") === "blueprint" && mono ? mono : sans;
    const fontFamilyMono = mono;
    return {
      fontFamily: fontFamily,
      fontFamilyMono: fontFamilyMono,
      fontSize: 14,
      padding: 10,
      autoDirection: false,
      zoom: {
        always: false,
        controls: true,
        labels: { zoomIn: "放大圖表", zoomOut: "縮小圖表", reset: "重設縮放" }
      }
    };
  }

  function destroyRecord(record) {
    if (!record || !record.instance) return;
    try {
      record.instance.destroy();
    } catch (error) {
      /* 已經被路由移除時仍可安全忽略 */
    }
  }

  function mountDiagram(element, key) {
    const entry = getEntry(key);
    if (!entry) return;
    const existing = mounts.get(element);
    if (existing) {
      destroyRecord(existing);
      mounts.delete(element);
    }
    element.innerHTML = "";
    element.removeAttribute("data-mermaid-error");
    try {
      const instance = window.PeleFlow.mount(element, entry.source, mountOptions(element));
      mounts.set(element, { element: element, key: key, instance: instance });
      if (instance.error) {
        element.setAttribute("data-mermaid-error", "true");
        console.warn("Pele render error:", key, instance.error);
      }
    } catch (error) {
      element.innerHTML = '<p class="mermaid-error">新版圖表渲染失敗：' + escapeHtml(error.message) + "</p>";
    }
  }

  function setView(compare, view) {
    compare.querySelectorAll("[data-mermaid-view]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-mermaid-view") === view ? "true" : "false");
    });
    const legacy = compare.querySelector('[data-mermaid-panel="legacy"]');
    const next = compare.querySelector('[data-mermaid-panel="new"]');
    const hint = compare.querySelector(".diagram-compare-hint");
    if (legacy) legacy.hidden = view !== "legacy";
    if (next) next.hidden = view !== "new";
    if (hint) {
      hint.textContent = view === "new" ? "目前顯示新版 Mermaid／Pele" : "目前顯示舊版手繪 SVG";
    }
  }

  async function showNew(compare) {
    const key = compare.getAttribute("data-mermaid-key");
    const panel = compare.querySelector('[data-mermaid-panel="new"]');
    if (!panel) return;
    setView(compare, "new");
    if (mounts.has(panel) || loadingPanels.has(panel)) return;
    loadingPanels.add(panel);
    panel.innerHTML = '<p class="mermaid-loading">正在載入 Pele 並渲染新版圖表…</p>';
    try {
      await ensurePele();
      if (panel.hidden || !document.documentElement.contains(panel)) return;
      mountDiagram(panel, key);
    } catch (error) {
      panel.innerHTML = '<p class="mermaid-error">Pele 載入失敗：' + escapeHtml(error.message) + "</p>";
    } finally {
      loadingPanels.delete(panel);
    }
  }

  function showLegacy(compare) {
    const panel = compare.querySelector('[data-mermaid-panel="new"]');
    setView(compare, "legacy");
    if (!panel) return;
    const record = mounts.get(panel);
    if (record) {
      destroyRecord(record);
      mounts.delete(panel);
      panel.innerHTML = "";
    }
  }

  function remountAll() {
    if (!mounts.size) return;
    const records = Array.from(mounts.values());
    records.forEach(destroyRecord);
    mounts.clear();
    records.forEach(function (record) {
      if (!document.documentElement.contains(record.element)) return;
      if (!record.element.offsetParent && record.element.getClientRects().length === 0) return;
      mountDiagram(record.element, record.key);
    });
  }

  function reset() {
    mounts.forEach(destroyRecord);
    mounts.clear();
  }

  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      }).catch(function () {
        return fallbackCopy(text);
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch (error) {
      return false;
    }
  }

  function downloadText(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "diagram.mmd";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1500);
  }

  function flashButton(button, text) {
    if (!button) return;
    if (!button.getAttribute("data-original-text")) {
      button.setAttribute("data-original-text", button.textContent);
    }
    button.textContent = text;
    button.disabled = true;
    window.setTimeout(function () {
      button.textContent = button.getAttribute("data-original-text");
      button.disabled = false;
    }, 1400);
  }

  function handleDocumentClick(event) {
    const viewButton = event.target.closest("[data-mermaid-view]");
    if (viewButton) {
      const compare = viewButton.closest("[data-mermaid-key]");
      if (!compare) return;
      if (viewButton.getAttribute("data-mermaid-view") === "new") {
        showNew(compare);
      } else {
        showLegacy(compare);
      }
      return;
    }

    const copyButton = event.target.closest("[data-mermaid-copy]");
    if (copyButton) {
      const entry = getEntry(copyButton.getAttribute("data-mermaid-copy"));
      if (!entry) return;
      copyText(entry.source).then(function (ok) {
        if (ok) {
          flashButton(copyButton, "已複製 .mmd");
        } else {
          downloadText(entry.file, entry.source);
          flashButton(copyButton, "已改為下載");
        }
      });
      return;
    }

    const downloadButton = event.target.closest("[data-mermaid-download]");
    if (downloadButton) {
      const entry = getEntry(downloadButton.getAttribute("data-mermaid-download"));
      if (!entry) return;
      downloadText(entry.file, entry.source);
      flashButton(downloadButton, "已下載 .mmd");
    }
  }

  function init() {
    bindStyleMenu();
    applyStyle(readSavedStyle(), { remount: false, persist: false });
    document.addEventListener("click", handleDocumentClick);
  }

  window.MermaidLab = {
    reset: reset,
    applyStyle: function (name) {
      applyStyle(name);
    },
    getStyle: function () {
      return currentStyle;
    },
    styles: Object.keys(STYLES).map(function (key) {
      return { id: key, label: STYLES[key].label, note: STYLES[key].note };
    })
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
