#!/usr/bin/env node
// 產生可供搜尋引擎與 AI 搜尋讀取的靜態落地頁；互動內容仍由 hash SPA 提供。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const siteDir = path.resolve(__dirname, "..");
const assetsDir = path.join(siteDir, "assets");
const BASE_URL = "https://solo0920.github.io/analysis";
const UPDATED = "2026-10-24";

function loadWindow(files) {
  const context = { window: {} };
  vm.createContext(context);
  files.forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(assetsDir, file), "utf8"), context, { filename: file });
  });
  return context.window;
}

const data = loadWindow(["content-core-bundle.js", "content-nobel.js", "content-macro-current.js"]);
const subjects = [
  { slug: "macro", data: data.MACRO_SUBJECT },
  { slug: "investment", data: data.INVESTMENT_SUBJECT },
  { slug: "accounting", data: data.ACCOUNTING_SUBJECT },
  { slug: "law", data: data.LAW_SUBJECT }
].filter(function (entry) { return entry.data; });
const forecast = data.EXAM_FORECAST;
const currentEvents = data.MACRO_CURRENT_EVENTS;
const nobel = data.NOBEL_DATA;
const stats = data.PAST_EXAM_STATS || { practice: { subjects: {}, years: {} }, written: { subjects: {} } };

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanText(value) {
  return String(value == null ? "" : value)
    .replace(/\\\(|\\\)|\\\[|\\\]/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatNumber(value) {
  return String(Number(value) || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function subjectStats(subject) {
  let sections = 0;
  let terms = 0;
  (subject.chapters || []).forEach(function (chapter) {
    (chapter.sections || []).forEach(function (section) {
      sections += 1;
      terms += Array.isArray(section.terms) ? section.terms.length : 0;
    });
  });
  return { chapters: (subject.chapters || []).length, sections: sections, terms: terms };
}

function prefix(depth) {
  return depth === 2 ? "../../" : "../";
}

function rootHref(depth, hash) {
  return prefix(depth) + "index.html" + (hash || "");
}

function subjectHref(depth, slug) {
  return depth === 2 ? "../" + slug + "/" : "subjects/" + slug + "/";
}

function staticHref(depth, slug) {
  return depth === 2 ? "../../" + slug + "/" : "../" + slug + "/";
}

function navHtml(depth) {
  return [
    '<nav class="landing-nav" aria-label="主要導覽">',
    '  <a href="' + rootHref(depth) + '">首頁</a>',
    '  <a href="' + subjectHref(depth, "macro") + '">總體經濟學</a>',
    '  <a href="' + subjectHref(depth, "investment") + '">投資學</a>',
    '  <a href="' + subjectHref(depth, "accounting") + '">會計學</a>',
    '  <a href="' + subjectHref(depth, "law") + '">證券法規</a>',
    '  <a href="' + staticHref(depth, "past-exams") + '">考古題</a>',
    '  <a href="' + staticHref(depth, "exam-forecast") + '">考前猜題</a>',
    "</nav>"
  ].join("");
}

function footerHtml(depth) {
  return [
    '<footer class="landing-footer">',
    '  <div class="landing-footer-inner">',
    "    <p><strong>分析師備考站</strong> — 證券投資分析人員考試的靜態備考筆記與題庫；內容以臺灣官方與繁體中文公開資料整理。</p>",
    '    <nav class="landing-footer-links" aria-label="頁尾導覽">',
    '      <a href="' + rootHref(depth) + '">首頁</a>',
    '      <a href="' + subjectHref(depth, "macro") + '">總體經濟學</a>',
    '      <a href="' + subjectHref(depth, "investment") + '">投資學</a>',
    '      <a href="' + subjectHref(depth, "accounting") + '">會計學</a>',
    '      <a href="' + subjectHref(depth, "law") + '">證券法規</a>',
    '      <a href="' + staticHref(depth, "past-exams") + '">考古題</a>',
    '      <a href="' + staticHref(depth, "exam-forecast") + '">考前猜題</a>',
    "    </nav>",
    '    <p class="landing-footer-copy">© 2026 分析師備考站 · 靜態網站，無追蹤、無廣告。內容僅供考試複習，不代表官方認證。</p>',
    "  </div>",
    "</footer>"
  ].join("");
}

function breadcrumbHtml(depth, label) {
  return [
    '<nav class="breadcrumb" aria-label="麵包屑">',
    '  <a href="' + rootHref(depth) + '">首頁</a><span>/</span>',
    "  <span>" + escapeHtml(label) + "</span>",
    "</nav>"
  ].join("");
}

function faqHtml(faqs) {
  if (!Array.isArray(faqs) || !faqs.length) {
    return "";
  }
  return [
    '<section class="landing-section">',
    "  <h2>常見問題</h2>",
    '  <div class="home-faq">',
    faqs.map(function (faq) {
      return [
        "<details>",
        "  <summary>" + escapeHtml(faq.question) + "</summary>",
        "  <p>" + escapeHtml(faq.answer) + "</p>",
        "</details>"
      ].join("");
    }).join(""),
    "  </div>",
    "</section>"
  ].join("");
}

function jsonLdForPage(options) {
  const canonical = options.canonical;
  const graph = [
    {
      "@type": "WebPage",
      "@id": canonical + "#webpage",
      "url": canonical,
      "name": options.title,
      "description": options.description,
      "inLanguage": "zh-Hant-TW"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首頁",
          "item": BASE_URL + "/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": options.label,
          "item": canonical
        }
      ]
    },
    {
      "@type": "LearningResource",
      "@id": canonical + "#resource",
      "name": options.label,
      "description": options.description,
      "url": canonical,
      "inLanguage": "zh-Hant-TW",
      "isAccessibleForFree": true,
      "learningResourceType": options.resourceType || "備考筆記與題庫",
      "educationalLevel": "證券投資分析人員考試",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "分析師備考站",
        "url": BASE_URL + "/"
      }
    }
  ];
  if (Array.isArray(options.faqs) && options.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": canonical + "#faq",
      "mainEntity": options.faqs.map(function (faq) {
        return {
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        };
      })
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function pageHtml(options) {
  const depth = options.depth;
  const assetPrefix = prefix(depth);
  return [
    "<!doctype html>",
    '<html lang="zh-Hant-TW">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    "  <title>" + escapeHtml(options.title) + "</title>",
    '  <meta name="description" content="' + escapeHtml(options.description) + '">',
    '  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    '  <meta name="author" content="分析師備考站">',
    '  <meta name="theme-color" content="#0f5c5c">',
    '  <link rel="canonical" href="' + options.canonical + '">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:locale" content="zh_TW">',
    '  <meta property="og:site_name" content="分析師備考站">',
    '  <meta property="og:title" content="' + escapeHtml(options.title) + '">',
    '  <meta property="og:description" content="' + escapeHtml(options.description) + '">',
    '  <meta property="og:url" content="' + options.canonical + '">',
    '  <meta property="og:image" content="' + BASE_URL + '/assets/og-cover.png">',
    '  <meta property="og:image:type" content="image/png">',
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    '  <meta property="og:image:alt" content="分析師備考站：證券投資分析人員考試備考">',
    '  <meta name="twitter:card" content="summary_large_image">',
    '  <meta name="twitter:title" content="' + escapeHtml(options.title) + '">',
    '  <meta name="twitter:description" content="' + escapeHtml(options.description) + '">',
    '  <meta name="twitter:image" content="' + BASE_URL + '/assets/og-cover.png">',
    '  <link rel="stylesheet" href="' + assetPrefix + 'assets/styles.css">',
    '  <link rel="icon" href="' + assetPrefix + 'assets/favicon.svg" type="image/svg+xml">',
    "  <script>",
    "    (function () {",
    "      try {",
    '        var saved = localStorage.getItem("analyst-theme");',
    '        var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;',
    '        document.documentElement.dataset.theme = saved || (dark ? "dark" : "light");',
    "      } catch (error) {",
    '        document.documentElement.dataset.theme = "light";',
    "      }",
    "    })();",
    "  </script>",
    '  <script type="application/ld+json">',
    jsonLdForPage(options),
    "  </script>",
    "</head>",
    "<body>",
    '<header class="landing-header">',
    '  <div class="landing-header-inner">',
    '    <a class="brand" href="' + rootHref(depth) + '">',
    '      <span class="brand-mark" aria-hidden="true">析</span>',
    '      <span class="brand-text"><strong>分析師備考站</strong><small>證券投資分析人員備考</small></span>',
    "    </a>",
    navHtml(depth),
    "  </div>",
    "</header>",
    '<main class="page landing-page">',
    breadcrumbHtml(depth, options.label),
    options.body,
    "</main>",
    footerHtml(depth),
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function writePage(relativePath, html) {
  const output = path.join(siteDir, relativePath, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
  return "site/" + relativePath + "/";
}

function subjectPage(subject, slug) {
  const statsForSubject = subjectStats(subject);
  const questions = Number((stats.practice.subjects || {})[slug]) || 0;
  const written = Number((stats.written.subjects || {})[slug]) || 0;
  const tagline = cleanText(subject.tagline || subject.description || "");
  const description = cleanText(subject.description || subject.tagline || "");
  const canonical = BASE_URL + "/subjects/" + slug + "/";
  const faqs = [
    {
      question: "這一科包含幾章？",
      answer: subject.name + "共 " + statsForSubject.chapters + " 章、" + statsForSubject.sections + " 個學習單元。"
    },
    {
      question: "有考古題可以練習嗎？",
      answer: "有。考古題練習庫收錄 107–115 年 " + formatNumber(questions) + " 題" + subject.name + "選擇題，並可搭配 " + formatNumber(written) + " 題計算／申論題。"
    },
    {
      question: "需要先讀完所有章節嗎？",
      answer: "不必。建議先看章節地圖與考試重點，再用名詞卡與考古題找出弱點；完整內容仍在互動版章節頁。"
    }
  ];
  const chapters = (subject.chapters || []).map(function (chapter) {
    const chapterStats = subjectStats({ chapters: [chapter] });
    return [
      '<article class="landing-chapter">',
      '  <div class="landing-chapter-head"><span>' + escapeHtml(String(chapter.number || "").padStart(2, "0")) + "</span><h3>" + escapeHtml(cleanText(chapter.title)) + "</h3></div>",
      "  <p>" + escapeHtml(cleanText(chapter.summary || "")) + "</p>",
      '  <div class="landing-chapter-meta"><span>' + chapterStats.sections + " 節</span><span>" + chapterStats.terms + ' 個名詞</span><a href="' + rootHref(2, "#/chapter/" + chapter.id) + '">閱讀章節 →</a></div>',
      "</article>"
    ].join("");
  }).join("");
  const body = [
    '<section class="landing-hero">',
    '  <p class="eyebrow">科目總覽 · 證券投資分析人員考試</p>',
    "  <h1>" + escapeHtml(subject.name) + "</h1>",
    '  <p class="lede">' + escapeHtml(description) + "</p>",
    '  <div class="landing-stats">',
    "    <div><strong>" + statsForSubject.chapters + "</strong><span>章</span></div>",
    "    <div><strong>" + statsForSubject.sections + "</strong><span>學習單元</span></div>",
    "    <div><strong>" + formatNumber(statsForSubject.terms) + "</strong><span>名詞卡</span></div>",
    "    <div><strong>" + formatNumber(questions) + "</strong><span>選擇題</span></div>",
    "  </div>",
    '  <div class="landing-actions">',
    '    <a class="btn btn-primary" href="' + rootHref(2, "#/subject/" + slug) + '">進入互動版 →</a>',
    '    <a class="btn" href="' + staticHref(2, "past-exams") + '">練考古題</a>',
    '    <a class="btn" href="' + staticHref(2, "exam-forecast") + '">看考前猜題</a>',
    "  </div>",
    "</section>",
    '<section class="landing-section">',
    '  <div class="section-heading"><div><p class="eyebrow">章節範圍</p><h2>' + statsForSubject.chapters + " 章完整目錄</h2><p>點章節可直接進入互動版，閱讀名詞、考試重點、公式與考古題。</p></div></div>",
    '  <div class="landing-chapter-list">' + chapters + "</div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>準備方式</h2>",
    '  <ol class="landing-steps">',
    "    <li><strong>先建立章節地圖：</strong>從目錄掌握先後順序，不從第一頁硬背。</li>",
    "    <li><strong>用名詞與考點收斂：</strong>每章先讀核心概念，再用名詞卡與考試重點確認定義。</li>",
    "    <li><strong>用考古題驗收：</strong>先作答再看解析，把錯題連回對應章節補強。</li>",
    "  </ol>",
    "</section>",
    faqHtml(faqs)
  ].join("");
  return {
    relativePath: "subjects/" + slug,
    html: pageHtml({
      depth: 2,
      title: subject.name + "｜證券投資分析人員考試備考筆記｜分析師備考站",
      description: subject.name + "：" + tagline + " 共 " + statsForSubject.chapters + " 章、" + statsForSubject.sections + " 個學習單元；含名詞、考試重點、公式與考古題。",
      canonical: canonical,
      label: subject.name,
      body: body,
      faqs: faqs
    })
  };
}

function pastExamsPage() {
  const practice = stats.practice || {};
  const written = stats.written || {};
  const years = Object.keys(practice.years || {}).sort();
  const subjectsMap = { macro: "總體經濟學", investment: "投資學", accounting: "會計學", law: "證券法規" };
  const yearItems = years.map(function (year) {
    const info = practice.years[year] || {};
    return [
      '<div class="landing-item">',
      "  <strong>" + year + " 年</strong>",
      "  <span>" + formatNumber(info.count || 0) + " 題選擇題</span>",
      "  <span>" + ((info.sessions && Object.keys(info.sessions).length) || 0) + " 次考試</span>",
      "</div>"
    ].join("");
  }).join("");
  const subjectItems = Object.keys(subjectsMap).map(function (key) {
    return [
      '<div class="landing-item">',
      "  <strong>" + subjectsMap[key] + "</strong>",
      "  <span>" + formatNumber((practice.subjects || {})[key] || 0) + " 題選擇題</span>",
      "  <span>" + formatNumber((written.subjects || {})[key] || 0) + " 題計算／申論</span>",
      "</div>"
    ].join("");
  }).join("");
  const faqs = [
    { question: "可以只看答案嗎？", answer: "可以。除了練習模式，也有瀏覽模式；第一次看答案時才會載入逐選項解析。" },
    { question: "練習紀錄會上傳嗎？", answer: "不會。作答紀錄只存在瀏覽器的 localStorage，不會送到任何伺服器。" },
    { question: "有計算／申論題嗎？", answer: "有。另收錄 107–115 年 348 題計算／申論題，附完整參考解答與章節出處。" }
  ];
  const body = [
    '<section class="landing-hero">',
    '  <p class="eyebrow">題庫總覽 · 證券投資分析人員考試</p>',
    "  <h1>考古題練習庫</h1>",
    '  <p class="lede">收錄 107–115 年 29 次考試、3,710 題選擇題與 348 題計算／申論題；可依年度、科目與考試次別篩選，先作答再看答案。</p>',
    '  <div class="landing-stats">',
    "    <div><strong>3,710</strong><span>選擇題</span></div>",
    "    <div><strong>348</strong><span>計算／申論</span></div>",
    "    <div><strong>29</strong><span>考試次別</span></div>",
    "    <div><strong>9</strong><span>年度</span></div>",
    "  </div>",
    '  <div class="landing-actions">',
    '    <a class="btn btn-primary" href="' + rootHref(1, "#/past-exams") + '">開始練考古題 →</a>',
    '    <a class="btn" href="' + rootHref(1, "#/past-exams/written") + '">練計算／申論題</a>',
    "  </div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>年度題數</h2>",
    '  <div class="landing-grid">' + yearItems + "</div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>科目分布</h2>",
    '  <div class="landing-grid">' + subjectItems + "</div>",
    "</section>",
    faqHtml(faqs)
  ].join("");
  return {
    relativePath: "past-exams",
    html: pageHtml({
      depth: 1,
      title: "考古題練習庫｜證券投資分析人員考試｜分析師備考站",
      description: "107–115 年 29 次、3,710 題選擇題與 348 題計算／申論題；逐選項解析、年度／科目／次別篩選與完整參考解答。",
      canonical: BASE_URL + "/past-exams/",
      label: "考古題練習庫",
      body: body,
      faqs: faqs,
      resourceType: "考古題庫"
    })
  };
}

function forecastPage() {
  const counts = (forecast && forecast.meta && forecast.meta.counts) || {};
  const items = [
    ["總體經濟學", counts.macro || 0],
    ["投資學", counts.investment || 0],
    ["會計學", counts.accounting || 0],
    ["證券法規", counts.law || 0]
  ].map(function (entry) {
    return '<div class="landing-item"><strong>' + entry[0] + "</strong><span>" + entry[1] + " 題組</span></div>";
  }).join("");
  const faqs = [
    { question: "考前猜題是官方題目嗎？", answer: "不是。這是依理論覆蓋率、時事關聯與跨章節命題價值整理的模擬猜題，不代表實際命中率。" },
    { question: "有完整解答嗎？", answer: "有。118 個部分都有完整參考解答，另含 38 條整合公式、6 組跨章節整合與 2 組敏感度分析。" },
    { question: "可以依科目篩選嗎？", answer: "可以。互動版提供全部／總體／投資／會計／法規分頁，以及關鍵字、程度、題型與主題篩選。" }
  ];
  const body = [
    '<section class="landing-hero">',
    '  <p class="eyebrow">考前總複習 · 2026 年 12 月</p>',
    "  <h1>考前猜題</h1>",
    '  <p class="lede">總體經濟學 × 投資學 × 會計學 × 證券法規：97 題組／118 個部分、38 條整合公式、6 組跨章節整合與 2 組敏感度分析。</p>',
    '  <div class="landing-stats">',
    "    <div><strong>97</strong><span>題組</span></div>",
    "    <div><strong>118</strong><span>部分</span></div>",
    "    <div><strong>38</strong><span>整合公式</span></div>",
    "    <div><strong>2</strong><span>敏感度分析</span></div>",
    "  </div>",
    '  <div class="landing-actions">',
    '    <a class="btn btn-primary" href="' + rootHref(1, "#/exam-forecast") + '">查看考前猜題 →</a>',
    '    <a class="btn" href="' + rootHref(1, "#/past-exams/written") + '">練計算／申論題</a>',
    "  </div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>四科題組</h2>",
    '  <div class="landing-grid">' + items + "</div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>怎麼使用</h2>",
    '  <ol class="landing-steps">',
    "    <li><strong>先做整合題：</strong>把多個章節串成完整案例，練習申論與計算混合題。</li>",
    "    <li><strong>再看主題題：</strong>依科目、程度與題型篩選，針對弱點補強。</li>",
    "    <li><strong>最後對答案：</strong>完整解答與公式都在互動版；考前請以官方公告更新時事數據。</li>",
    "  </ol>",
    "</section>",
    faqHtml(faqs)
  ].join("");
  return {
    relativePath: "exam-forecast",
    html: pageHtml({
      depth: 1,
      title: "2026 年 12 月考前猜題｜證券投資分析人員考試｜分析師備考站",
      description: "2026 年 12 月四科 97 題組／118 個部分考前猜題，含完整解答、38 條整合公式、6 組跨章節整合與 2 組敏感度分析。",
      canonical: BASE_URL + "/exam-forecast/",
      label: "考前猜題",
      body: body,
      faqs: faqs,
      resourceType: "考前猜題與解答"
    })
  };
}

function currentPage() {
  const events = (currentEvents && currentEvents.events) || [];
  const themes = (currentEvents && currentEvents.top20 && currentEvents.top20.themes) || [];
  const eventItems = events.map(function (event) {
    return '<div class="landing-item"><strong>' + escapeHtml(cleanText(event.title)) + "</strong><span>" + escapeHtml(cleanText(event.period || "")) + "</span></div>";
  }).join("");
  const themeItems = themes.map(function (theme) {
    return '<li><strong>' + escapeHtml(cleanText(theme.title)) + "：</strong>" + escapeHtml(cleanText(theme.text)) + "</li>";
  }).join("");
  const faqs = [
    { question: "這裡有幾個時事主題？", answer: "15 個近二年國際金融與臺灣總經政策主題，其中 12 個主題附有 KaTeX 公式。" },
    { question: "有美國重大經濟新聞的整理嗎？", answer: "有。20 則美國重大經濟新聞已精準摘要並分配至相關主題卡，另有 8 大主題與 5 題綜合申論。" },
    { question: "時事數字可以直接背嗎？", answer: "不建議。時事數字與政策會變動，頁面提供答題框架與查證入口；考前請更新官方資料。" }
  ];
  const body = [
    '<section class="landing-hero">',
    '  <p class="eyebrow">考前猜題 · 近二年時事</p>',
    "  <h1>近二年重要國際金融時事與總經政策</h1>",
    '  <p class="lede">整理 2024–2026 年常考的國際金融時事與臺灣政策，包含 15 個主題、20 則美國重大經濟新聞摘要、8 大主題與 5 題綜合申論。</p>',
    '  <div class="landing-stats">',
    "    <div><strong>15</strong><span>時事主題</span></div>",
    "    <div><strong>20</strong><span>新聞摘要</span></div>",
    "    <div><strong>8</strong><span>優先主題</span></div>",
    "    <div><strong>5</strong><span>綜合申論</span></div>",
    "  </div>",
    '  <div class="landing-actions">',
    '    <a class="btn btn-primary" href="' + rootHref(1, "#/macro-current") + '">查看完整時事 →</a>',
    '    <a class="btn" href="' + rootHref(1, "#/exam-forecast") + '">回考前猜題</a>',
    "  </div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>15 個時事主題</h2>",
    '  <div class="landing-grid">' + eventItems + "</div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>8 大優先主題</h2>",
    '  <ul class="landing-list">' + themeItems + "</ul>",
    "</section>",
    faqHtml(faqs)
  ].join("");
  return {
    relativePath: "macro-current",
    html: pageHtml({
      depth: 1,
      title: "近二年總經時事與美國重大經濟新聞｜證券投資分析人員考試｜分析師備考站",
      description: "15 個近二年國際金融與臺灣總經政策主題、20 則美國重大經濟新聞摘要、8 大主題、5 題綜合申論與 KaTeX 公式。",
      canonical: BASE_URL + "/macro-current/",
      label: "近二年總經時事",
      body: body,
      faqs: faqs,
      resourceType: "時事整理與考試框架"
    })
  };
}

function nobelPage() {
  const groups = (nobel && nobel.groups) || [];
  const rows = (nobel && nobel.rows) || [];
  const recent = rows.slice(-8).map(function (row) {
    return '<li><strong>' + row.year + "：</strong>" + escapeHtml(cleanText(row.laureates)) + " — " + escapeHtml(cleanText(row.field)) + "</li>";
  }).join("");
  const groupItems = groups.map(function (group) {
    return '<div class="landing-item"><strong>' + escapeHtml(cleanText(group.title)) + "</strong><span>" + escapeHtml(cleanText(group.description || "")) + "</span></div>";
  }).join("");
  const faqs = [
    { question: "諾貝爾頁有幾屆資料？", answer: "收錄 1969–2026 年共 58 屆，依 17 組代表模型整理。" },
    { question: "可以依年份跳到模型嗎？", answer: "可以。互動版提供年份下拉與屆別晶片，選取後切換所屬模型並顯示該屆得主、公式與屆別資料。" },
    { question: "2026 屆得主是誰？", answer: "2026 屆為 Robert E. Hall 與 Michael Woodford，官方獎項說明為「for microeconomic foundations of macroeconomic stabilisation」。" }
  ];
  const body = [
    '<section class="landing-hero">',
    '  <p class="eyebrow">諾貝爾經濟學獎 · 1969–2026</p>',
    "  <h1>17 組諾貝爾經濟學獎模型</h1>",
    '  <p class="lede">將 58 屆諾貝爾經濟學獎得主、主要理論與代表模型，整理成 17 組可切換屆別的模型卡；可依年份跳到所屬模型。</p>',
    '  <div class="landing-stats">',
    "    <div><strong>58</strong><span>屆年份</span></div>",
    "    <div><strong>17</strong><span>模型組</span></div>",
    "    <div><strong>2026</strong><span>最新屆</span></div>",
    "    <div><strong>Hall &amp; Woodford</strong><span>2026 得主</span></div>",
    "  </div>",
    '  <div class="landing-actions">',
    '    <a class="btn btn-primary" href="' + rootHref(1, "#/nobel") + '">查看諾貝爾模型 →</a>',
    '    <a class="btn" href="' + staticHref(1, "exam-forecast") + '">看考前猜題</a>',
    "  </div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>17 組代表模型</h2>",
    '  <div class="landing-grid">' + groupItems + "</div>",
    "</section>",
    '<section class="landing-section">',
    "  <h2>最近 8 屆</h2>",
    '  <ul class="landing-list">' + recent + "</ul>",
    "</section>",
    faqHtml(faqs)
  ].join("");
  return {
    relativePath: "nobel",
    html: pageHtml({
      depth: 1,
      title: "17 組諾貝爾經濟學獎模型｜58 屆年份與得主｜分析師備考站",
      description: "1969–2026 年 58 屆諾貝爾經濟學獎、17 組代表模型與屆別切換；收錄得主、主要理論、公式與 2026 Hall／Woodford。",
      canonical: BASE_URL + "/nobel/",
      label: "諾貝爾經濟學獎模型",
      body: body,
      faqs: faqs,
      resourceType: "諾貝爾經濟學獎模型整理"
    })
  };
}

const pages = [];
subjects.forEach(function (entry) {
  pages.push(subjectPage(entry.data, entry.slug));
});
pages.push(pastExamsPage());
pages.push(forecastPage());
pages.push(currentPage());
pages.push(nobelPage());

const written = pages.map(function (page) {
  return writePage(page.relativePath, page.html);
});
const urls = [
  { loc: BASE_URL + "/", priority: "1.0" },
  { loc: BASE_URL + "/subjects/macro/", priority: "0.9" },
  { loc: BASE_URL + "/subjects/investment/", priority: "0.9" },
  { loc: BASE_URL + "/subjects/accounting/", priority: "0.9" },
  { loc: BASE_URL + "/subjects/law/", priority: "0.9" },
  { loc: BASE_URL + "/past-exams/", priority: "0.8" },
  { loc: BASE_URL + "/exam-forecast/", priority: "0.8" },
  { loc: BASE_URL + "/macro-current/", priority: "0.8" },
  { loc: BASE_URL + "/nobel/", priority: "0.8" }
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls.map(function (entry) {
    return [
      "  <url>",
      "    <loc>" + entry.loc + "</loc>",
      "    <lastmod>" + UPDATED + "</lastmod>",
      "    <changefreq>weekly</changefreq>",
      "    <priority>" + entry.priority + "</priority>",
      "  </url>"
    ].join("\n");
  }).join("\n"),
  "</urlset>",
  ""
].join("\n");
fs.writeFileSync(path.join(siteDir, "sitemap.xml"), sitemap);
console.log("static landing pages", pages.length, written.join(", "));
console.log("sitemap", path.join(siteDir, "sitemap.xml"), urls.length, "urls");
