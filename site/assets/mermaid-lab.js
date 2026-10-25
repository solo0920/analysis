/* Mermaid × Pele Pilot runtime.
   1. 只在讀者切到「MMD」時才載入 Pele flowchart bundle；「SVG」使用原本的靜態圖。
   2. 右上角全站風格切換器會同步套用網站 CSS 與 Pele CSS，並 destroy／重新 mount 已開啟的 Pele 圖表。
   3. .mmd 可直接複製或下載，方便帶到其他網頁或應用程式。 */

(function () {
  "use strict";

  const STYLE_KEY = "analyst-pele-style";
  const SITE_STYLE_KEY = "analyst-site-style";
  const DEFAULT_STYLE = "paper";
  const STYLES = {
    paper: { label: "紙感", note: "沿用網站色票" },
    blueprint: { label: "藍圖", note: "深藍網格與等寬字" },
    mono: { label: "極簡", note: "黑白線稿" },
    contrast: { label: "高對比", note: "黑底螢光重點" },
    forest: { label: "森林", note: "鼠尾草綠與樹皮色" },
    ocean: { label: "海洋", note: "海水藍與珊瑚橘" },
    sunset: { label: "夕陽", note: "陶土橘與暮色紫" },
    sakura: { label: "櫻花", note: "玫瑰粉與奶油白" },
    terminal: { label: "終端機", note: "黑底綠字與掃描格" },
    lavender: { label: "薰衣草", note: "柔和紫與奶油色" }
  };
  const STYLE_THEME_COLORS = {
    paper: { light: "#0f5c5c", dark: "#0f1719" },
    blueprint: { light: "#eef4fa", dark: "#081a2b" },
    mono: { light: "#f7f7f4", dark: "#121212" },
    contrast: { light: "#ffffff", dark: "#000000" },
    forest: { light: "#f2f5ec", dark: "#0b1a10" },
    ocean: { light: "#eef7f8", dark: "#071c24" },
    sunset: { light: "#fdf2ec", dark: "#1b1019" },
    sakura: { light: "#fdf2f4", dark: "#1e1118" },
    terminal: { light: "#f0f7f1", dark: "#030b06" },
    lavender: { light: "#f5f1fb", dark: "#130f1c" }
  };

  const PALETTE_STYLES = ["forest", "ocean", "sunset", "sakura", "lavender"];

  function palettePeleCss(style) {
    return `
[data-pele-style="${style}"] .diagram-canvas-mermaid .pele {
  --pele-bg: transparent;
  --pele-fg: var(--ink);
  --pele-muted: var(--muted);
  --pele-line: var(--line-strong);
  --pele-surface: var(--surface);
  --pele-surface-alt: var(--surface-2);
  --pele-border: var(--line-strong);
  --pele-accent: var(--accent);
  --pele-critical: var(--danger);
  --pele-font: var(--font-sans);
  --pele-font-mono: var(--font-mono);
  --pele-radius: var(--radius);
  --pele-node-fill: var(--surface);
  --pele-node-stroke: var(--line-strong);
  --pele-node-stroke-width: 1.4px;
  --pele-accent-fill: var(--accent-soft);
  --pele-accent-stroke: var(--accent);
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: var(--gold-soft);
  --pele-outcome-stroke: var(--gold);
  --pele-label: var(--ink);
  --pele-accent-label: var(--accent-ink);
  --pele-outcome-label: var(--ink);
  --pele-cluster-fill: var(--surface-2);
  --pele-cluster-opacity: 0.65;
  --pele-cluster-stroke: var(--line);
  --pele-cluster-label: var(--muted);
  --pele-cluster-dash: 4 4;
  --pele-edge: var(--line-strong);
  --pele-marker: var(--line-strong);
  background: transparent;
}
`;
  }

  const PRESET_CSS = {
    paper: "",
    blueprint: `
[data-pele-style="blueprint"][data-theme="light"] .diagram-canvas-mermaid .pele {
  --pele-bg: #eef4fa;
  --pele-fg: #0b2740;
  --pele-muted: #527a9c;
  --pele-line: #8fb3d1;
  --pele-surface: #f8fbff;
  --pele-surface-alt: #eaf2fa;
  --pele-border: #8fb3d1;
  --pele-accent: #0b5f8a;
  --pele-critical: #a33a32;
  --pele-font: var(--font-mono);
  --pele-font-mono: var(--font-mono);
  --pele-radius: 0px;
  --pele-node-fill: #f8fbff;
  --pele-node-stroke: #8fb3d1;
  --pele-node-stroke-width: 1.4px;
  --pele-accent-fill: #d7eaf8;
  --pele-accent-stroke: #0b5f8a;
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: #f7e3c8;
  --pele-outcome-stroke: #a05a00;
  --pele-label: #0b2740;
  --pele-accent-label: #08496b;
  --pele-outcome-label: #6b3d00;
  --pele-cluster-fill: #eaf2fa;
  --pele-cluster-opacity: 0.92;
  --pele-cluster-stroke: #b8cfe3;
  --pele-cluster-label: #527a9c;
  --pele-cluster-dash: 4 4;
  --pele-edge: #8fb3d1;
  --pele-marker: #8fb3d1;
  background-color: #eef4fa;
  background-image: linear-gradient(rgba(11, 95, 138, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 95, 138, 0.09) 1px, transparent 1px);
  background-size: 24px 24px;
}
[data-pele-style="blueprint"][data-theme="dark"] .diagram-canvas-mermaid .pele {
  --pele-bg: #081a2b;
  --pele-fg: #d9ecff;
  --pele-muted: #8eb8dd;
  --pele-line: #5d93c4;
  --pele-surface: #0e2740;
  --pele-surface-alt: #0a2036;
  --pele-border: #3e6f9e;
  --pele-accent: #67c7ff;
  --pele-critical: #ff8c7a;
  --pele-font: var(--font-mono);
  --pele-font-mono: var(--font-mono);
  --pele-radius: 0px;
  --pele-node-fill: #0e2740;
  --pele-node-stroke: #5d93c4;
  --pele-node-stroke-width: 1.4px;
  --pele-accent-fill: #123c5c;
  --pele-accent-stroke: #67c7ff;
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: #3a2a12;
  --pele-outcome-stroke: #ffb86b;
  --pele-label: #d9ecff;
  --pele-accent-label: #eaf7ff;
  --pele-outcome-label: #ffe3bd;
  --pele-cluster-fill: #0b2238;
  --pele-cluster-opacity: 0.92;
  --pele-cluster-stroke: #3e6f9e;
  --pele-cluster-label: #8eb8dd;
  --pele-cluster-dash: 4 4;
  --pele-edge: #5d93c4;
  --pele-marker: #5d93c4;
  background-color: #081a2b;
  background-image: linear-gradient(rgba(103, 199, 255, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 199, 255, 0.09) 1px, transparent 1px);
  background-size: 24px 24px;
}
`,
    mono: `
[data-pele-style="mono"] .diagram-canvas-mermaid .pele {
  --pele-bg: transparent;
  --pele-fg: var(--ink);
  --pele-muted: var(--muted);
  --pele-line: var(--ink);
  --pele-surface: transparent;
  --pele-surface-alt: transparent;
  --pele-border: var(--ink);
  --pele-accent: var(--ink);
  --pele-critical: var(--danger);
  --pele-font: var(--font-mono);
  --pele-font-mono: var(--font-mono);
  --pele-radius: 0px;
  --pele-node-fill: transparent;
  --pele-node-stroke: var(--ink);
  --pele-node-stroke-width: 1.2px;
  --pele-accent-fill: transparent;
  --pele-accent-stroke: var(--ink);
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: transparent;
  --pele-outcome-stroke: var(--ink);
  --pele-label: var(--ink);
  --pele-accent-label: var(--ink);
  --pele-outcome-label: var(--ink);
  --pele-cluster-fill: transparent;
  --pele-cluster-opacity: 1;
  --pele-cluster-stroke: var(--line-strong);
  --pele-cluster-label: var(--muted);
  --pele-cluster-dash: 3 3;
  --pele-edge: var(--line-strong);
  --pele-marker: var(--line-strong);
  background: transparent;
}
`,
    contrast: `
[data-pele-style="contrast"][data-theme="light"] .diagram-canvas-mermaid .pele {
  --pele-bg: #ffffff;
  --pele-fg: #000000;
  --pele-muted: #333333;
  --pele-line: #000000;
  --pele-surface: #ffffff;
  --pele-surface-alt: #f5f5f5;
  --pele-border: #000000;
  --pele-accent: #000000;
  --pele-critical: #c00000;
  --pele-radius: 2px;
  --pele-node-fill: #ffffff;
  --pele-node-stroke: #000000;
  --pele-node-stroke-width: 2px;
  --pele-accent-fill: #ffe600;
  --pele-accent-stroke: #000000;
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: #00e5ff;
  --pele-outcome-stroke: #000000;
  --pele-label: #000000;
  --pele-accent-label: #000000;
  --pele-outcome-label: #000000;
  --pele-cluster-fill: #f5f5f5;
  --pele-cluster-opacity: 1;
  --pele-cluster-stroke: #000000;
  --pele-cluster-label: #000000;
  --pele-cluster-dash: 5 4;
  --pele-edge: #000000;
  --pele-marker: #000000;
  background: #ffffff;
}
[data-pele-style="contrast"][data-theme="dark"] .diagram-canvas-mermaid .pele {
  --pele-bg: #000000;
  --pele-fg: #ffffff;
  --pele-muted: #ffe600;
  --pele-line: #ffffff;
  --pele-surface: #111111;
  --pele-surface-alt: #000000;
  --pele-border: #ffffff;
  --pele-accent: #ffe600;
  --pele-critical: #ff5252;
  --pele-radius: 2px;
  --pele-node-fill: #111111;
  --pele-node-stroke: #ffffff;
  --pele-node-stroke-width: 2px;
  --pele-accent-fill: #ffe600;
  --pele-accent-stroke: #ffe600;
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: #00e5ff;
  --pele-outcome-stroke: #00e5ff;
  --pele-label: #ffffff;
  --pele-accent-label: #000000;
  --pele-outcome-label: #000000;
  --pele-cluster-fill: #111111;
  --pele-cluster-opacity: 1;
  --pele-cluster-stroke: #ffe600;
  --pele-cluster-label: #ffe600;
  --pele-cluster-dash: 5 4;
  --pele-edge: #ffffff;
  --pele-marker: #ffffff;
  background: #000000;
}
`,
    terminal: `
[data-pele-style="terminal"] .diagram-canvas-mermaid .pele {
  --pele-bg: var(--surface-2);
  --pele-fg: var(--ink);
  --pele-muted: var(--muted);
  --pele-line: var(--line-strong);
  --pele-surface: var(--surface);
  --pele-surface-alt: var(--surface-2);
  --pele-border: var(--line-strong);
  --pele-accent: var(--accent);
  --pele-critical: var(--danger);
  --pele-font: var(--font-mono);
  --pele-font-mono: var(--font-mono);
  --pele-radius: 0px;
  --pele-node-fill: var(--surface);
  --pele-node-stroke: var(--line-strong);
  --pele-node-stroke-width: 1.4px;
  --pele-accent-fill: var(--accent-soft);
  --pele-accent-stroke: var(--accent);
  --pele-accent-stroke-width: 2px;
  --pele-outcome-fill: var(--gold-soft);
  --pele-outcome-stroke: var(--gold);
  --pele-label: var(--ink);
  --pele-accent-label: var(--accent-ink);
  --pele-outcome-label: var(--ink);
  --pele-cluster-fill: var(--surface-2);
  --pele-cluster-opacity: 0.9;
  --pele-cluster-stroke: var(--line-strong);
  --pele-cluster-label: var(--accent);
  --pele-cluster-dash: 2 2;
  --pele-edge: var(--line-strong);
  --pele-marker: var(--accent);
  background-color: var(--surface-2);
  background-image: linear-gradient(var(--style-grid, rgba(0, 255, 102, 0.05)) 1px, transparent 1px), linear-gradient(90deg, var(--style-grid, rgba(0, 255, 102, 0.05)) 1px, transparent 1px);
  background-size: 24px 24px;
}
`
  };

  PALETTE_STYLES.forEach(function (style) {
    PRESET_CSS[style] = palettePeleCss(style);
  });

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
      const saved = window.localStorage.getItem(SITE_STYLE_KEY) ||
        window.localStorage.getItem(STYLE_KEY);
      return STYLES[saved] ? saved : DEFAULT_STYLE;
    } catch (error) {
      return DEFAULT_STYLE;
    }
  }

  function saveStyle(name) {
    try {
      window.localStorage.setItem(SITE_STYLE_KEY, name);
      window.localStorage.setItem(STYLE_KEY, name);
    } catch (error) {
      /* file:// 或隱私模式可能停用 localStorage */
    }
  }

  function updateThemeColor(name) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const pair = STYLE_THEME_COLORS[name] || STYLE_THEME_COLORS.paper;
    meta.setAttribute("content", dark ? pair.dark : pair.light);
  }

  function updateMenuState() {
    const menu = document.getElementById("pele-style-menu");
    if (!menu) return;
    menu.querySelectorAll("[data-pele-style-option]").forEach(function (button) {
      const active = button.getAttribute("data-pele-style-option") === currentStyle;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("is-active", active);
    });
    const toggle = document.getElementById("pele-style-toggle");
    if (toggle && STYLES[currentStyle]) {
      const label = "切換全站風格（目前：" + STYLES[currentStyle].label + "）";
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }
  }

  function applyStyle(name, options) {
    const opts = options || {};
    const next = STYLES[name] ? name : DEFAULT_STYLE;
    currentStyle = next;
    document.documentElement.setAttribute("data-site-style", next);
    document.documentElement.setAttribute("data-pele-style", next);
    ensureStyleElement().textContent = PRESET_CSS[next] || "";
    updateThemeColor(next);
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
    const fontFamily = document.documentElement.getAttribute("data-site-style") === "blueprint" && mono ? mono : sans;
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
      element.innerHTML = '<p class="mermaid-error">MMD 圖表渲染失敗：' + escapeHtml(error.message) + "</p>";
    }
  }

  function codeParts(compare) {
    const figure = compare && compare.closest(".model-diagram");
    return {
      figure: figure,
      panel: figure && figure.querySelector("[data-mermaid-code-panel]"),
      stage: figure && figure.querySelector("[data-mermaid-stage]"),
      toggle: figure && figure.querySelector("[data-mermaid-code-toggle]")
    };
  }

  function setCodeOpen(compare, open) {
    const parts = codeParts(compare);
    if (!parts.panel || !parts.stage || !parts.toggle) return;
    parts.panel.hidden = !open;
    parts.stage.classList.toggle("is-code-open", open);
    parts.toggle.setAttribute("aria-expanded", open ? "true" : "false");
    parts.toggle.innerHTML = open
      ? '<span aria-hidden="true">&lt;/&gt;</span> 收合 MMD 碼'
      : '<span aria-hidden="true">&lt;/&gt;</span> 顯示 MMD 碼';
  }

  function toggleCode(button) {
    const figure = button.closest(".model-diagram");
    const compare = figure && figure.querySelector("[data-mermaid-key]");
    if (!compare) return;
    const panel = figure.querySelector("[data-mermaid-code-panel]");
    const open = Boolean(panel && panel.hidden);
    setCodeOpen(compare, open);
    if (open) {
      const mmdButton = compare.querySelector('[data-mermaid-view="mmd"]');
      if (mmdButton && mmdButton.getAttribute("aria-pressed") !== "true") {
        showMmd(compare);
      }
    }
  }

  function setView(compare, view) {
    compare.querySelectorAll("[data-mermaid-view]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-mermaid-view") === view ? "true" : "false");
    });
    const svgPanel = compare.querySelector('[data-mermaid-panel="svg"]');
    const mmdPanel = compare.querySelector('[data-mermaid-panel="mmd"]');
    const hint = compare.querySelector(".diagram-compare-hint");
    if (svgPanel) svgPanel.hidden = view !== "svg";
    if (mmdPanel) mmdPanel.hidden = view !== "mmd";
    if (hint) {
      hint.textContent = view === "mmd" ? "目前顯示 MMD（Pele）" : "目前顯示 SVG";
    }
  }

  async function showMmd(compare) {
    const key = compare.getAttribute("data-mermaid-key");
    const panel = compare.querySelector('[data-mermaid-panel="mmd"]');
    if (!panel) return;
    setView(compare, "mmd");
    if (mounts.has(panel) || loadingPanels.has(panel)) return;
    loadingPanels.add(panel);
    panel.innerHTML = '<p class="mermaid-loading">正在載入 Pele 並渲染 MMD 圖表…</p>';
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

  function showSvg(compare) {
    const panel = compare.querySelector('[data-mermaid-panel="mmd"]');
    setView(compare, "svg");
    setCodeOpen(compare, false);
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
    const codeButton = event.target.closest("[data-mermaid-code-toggle]");
    if (codeButton) {
      toggleCode(codeButton);
      return;
    }

    const viewButton = event.target.closest("[data-mermaid-view]");
    if (viewButton) {
      const compare = viewButton.closest("[data-mermaid-key]");
      if (!compare) return;
      if (viewButton.getAttribute("data-mermaid-view") === "mmd") {
        showMmd(compare);
      } else {
        showSvg(compare);
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
    if (window.MutationObserver) {
      new MutationObserver(function () {
        updateThemeColor(currentStyle);
      }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
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
