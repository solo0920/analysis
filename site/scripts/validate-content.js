#!/usr/bin/env node
/* 內容驗證：確認三個科目各自依來源目錄建構，且章節沒有互相混用。
   使用方式：node site/scripts/validate-content.js */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..", "..");
const siteDir = path.join(root, "site");
const failures = [];
const checks = [];

function check(condition, message) {
  checks.push({ ok: Boolean(condition), message: message });
  if (!condition) {
    failures.push(message);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const diagramFiles = [
  "diagrams-macro.js",
  "diagrams-macro-2.js",
  "diagrams-macro-3.js",
  "diagrams-macro-4.js",
  "diagrams-macro-5.js"
];
const nobelDiagramFiles = ["diagrams-nobel.js"];

function loadContent() {
  const context = { window: {} };
  vm.createContext(context);
  ["content-macro.js", "content-macro-2.js", "content-macro-3.js", "content-macro-evolution.js", "content-investment.js", "content-accounting.js", "content-accounting-2.js", "content-law.js", "content-law-articles.js", "content-formula-tex.js", "content.js", "content-nobel.js"].forEach(function (file) {
    const fullPath = path.join(siteDir, "assets", file);
    vm.runInContext(fs.readFileSync(fullPath, "utf8"), context, { filename: file });
  });
  diagramFiles.concat(nobelDiagramFiles).forEach(function (file) {
    const fullPath = path.join(siteDir, "assets", file);
    vm.runInContext(fs.readFileSync(fullPath, "utf8"), context, { filename: file });
  });
  return {
    content: context.window.EXAM_CONTENT,
    diagrams: context.window.MACRO_DIAGRAMS || {},
    nobelData: context.window.NOBEL_DATA || { rows: [], groups: [], meta: {} },
    nobelDiagrams: context.window.NOBEL_DIAGRAMS || {},
    macroEvolution: context.window.MACRO_EVOLUTION || { meta: {}, stages: [] },
    ratioFormulas: context.window.INVESTMENT_RATIO_FORMULAS || [],
    optionPriorities: context.window.INVESTMENT_OPTION_PRIORITIES || [],
    lawArticles: context.window.LAW_ARTICLES || {},
    formulaTex: context.window.FORMULA_TEX || {}
  };
}

function parseMacroSource() {
  const lines = read("documents/gross_economics_contents.md").split(/\r?\n/);
  const parts = [];
  const chapters = [];
  let currentPart = null;

  lines.forEach(function (line) {
    const partMatch = line.match(/^\s*\\?# PART (\d+)\s+(.+)$/);
    if (partMatch) {
      currentPart = {
        number: Number(partMatch[1]),
        title: partMatch[2].trim(),
        page: ""
      };
      parts.push(currentPart);
      return;
    }

    const chapterMatch = line.match(/^## Chapter (\d+)\s+(.+?)（P\.\s*(\d+)）/);
    if (chapterMatch) {
      if (!currentPart) {
        throw new Error("總體經濟學章節出現在 Part 之外：" + line);
      }
      chapters.push({
        number: Number(chapterMatch[1]),
        title: chapterMatch[2].trim(),
        page: "P. " + chapterMatch[3],
        part: currentPart.number,
        partTitle: currentPart.title,
        sections: []
      });
      return;
    }

    const sectionMatch = line.match(/^\* (第\d+節 .+)$/);
    if (sectionMatch) {
      if (chapters.length === 0) {
        throw new Error("總體經濟學節次出現在章節之外：" + line);
      }
      chapters[chapters.length - 1].sections.push(sectionMatch[1].trim());
    }
  });

  return { parts: parts, chapters: chapters };
}

function parseInvestmentSource() {
  const lines = read("documents/investment_contents.md").split(/\r?\n/);
  const parts = [];
  const chapters = [];
  let currentPart = null;

  lines.forEach(function (line) {
    const partMatch = line.match(/^## Part (\d+)\s+(.+?)（P\.\s*(\d+)）/);
    if (partMatch) {
      currentPart = {
        number: Number(partMatch[1]),
        title: partMatch[2].trim(),
        page: "P. " + partMatch[3]
      };
      parts.push(currentPart);
      return;
    }

    const chapterMatch = line.match(/^\* (第[一二三四五六七八九十百]+章)\s+(.+)$/);
    if (chapterMatch) {
      if (!currentPart) {
        throw new Error("投資學章節出現在 Part 之外：" + line);
      }
      chapters.push({
        label: chapterMatch[1].trim(),
        title: chapterMatch[2].trim(),
        part: currentPart.number,
        partTitle: currentPart.title,
        partPage: currentPart.page
      });
    }
  });

  return { parts: parts, chapters: chapters };
}

function parseAccountingSource() {
  const lines = read("documents/accounting_contents.md").split(/\r?\n/);
  const chapters = [];
  let currentChapter = null;

  lines.forEach(function (line) {
    const chapterMatch = line.match(/^## CHAPTER (\d+)\s+(.+?)（p\.\s*(\d+)）/);
    if (chapterMatch) {
      currentChapter = {
        number: Number(chapterMatch[1]),
        title: chapterMatch[2].trim(),
        page: chapterMatch[3],
        sections: []
      };
      chapters.push(currentChapter);
      return;
    }

    const sectionMatch = line.match(/^\* \*\*(\d+)\*\*\s+(.+?)（p\.\s*(\d+)）/);
    if (sectionMatch) {
      if (!currentChapter) {
        throw new Error("會計學節次出現在章節之外：" + line);
      }
      currentChapter.sections.push({
        number: Number(sectionMatch[1]),
        title: sectionMatch[2].trim(),
        page: sectionMatch[3]
      });
    }
  });

  return { chapters: chapters };
}

function normalizeAccountingTitle(value) {
  return String(value || "")
    .replace(/\(/g, "（")
    .replace(/\)/g, "）")
    .replace(/\s+/g, "")
    .trim();
}

const loaded = loadContent();
const content = loaded.content;
const diagrams = loaded.diagrams;
const nobelData = loaded.nobelData;
const nobelDiagrams = loaded.nobelDiagrams;
const macroEvolution = loaded.macroEvolution;
const ratioFormulas = loaded.ratioFormulas;
const optionPriorities = loaded.optionPriorities;
const lawArticles = loaded.lawArticles;
const formulaTex = loaded.formulaTex;
const macro = content.subjects.find(function (subject) { return subject.id === "macro"; });
const investment = content.subjects.find(function (subject) { return subject.id === "investment"; });
const accounting = content.subjects.find(function (subject) { return subject.id === "accounting"; });
const law = content.subjects.find(function (subject) { return subject.id === "law"; });
const macroSource = parseMacroSource();
const investmentSource = parseInvestmentSource();
const accountingSource = parseAccountingSource();

check(content.subjects.length === 4, "應有四個科目");
check(Boolean(macro), "應有總體經濟學科目");
check(Boolean(investment), "應有投資學科目");
check(Boolean(accounting), "應有會計學科目");
check(Boolean(law), "應有證券交易法規與實務科目");

const macroSections = macro.chapters.reduce(function (sum, chapter) { return sum + chapter.sections.length; }, 0);
const investmentSections = investment.chapters.reduce(function (sum, chapter) { return sum + chapter.sections.length; }, 0);
const accountingSections = accounting.chapters.reduce(function (sum, chapter) { return sum + chapter.sections.length; }, 0);
const lawSections = law.chapters.reduce(function (sum, chapter) { return sum + chapter.sections.length; }, 0);

check(macro.parts.length === macroSource.parts.length, "總體經濟學 Part 數應與來源一致（" + macroSource.parts.length + "）");
check(macro.chapters.length === macroSource.chapters.length, "總體經濟學章數應與來源一致（" + macroSource.chapters.length + "）");
check(macro.chapters.length === 13, "總體經濟學應為 Parts 1–2 的 13 章");
check(macroSections === 50, "總體經濟學應為 50 節");

macroSource.parts.forEach(function (expected, index) {
  const actual = macro.parts[index];
  check(Boolean(actual), "總體經濟學缺少 Part " + expected.number);
  if (!actual) {
    return;
  }
  check(actual.number === expected.number, "總體經濟學 Part 編號不符");
  check(actual.title === expected.title, "總體經濟學 Part 名稱不符：" + actual.title);
  check(actual.page === expected.page, "總體經濟學篇頁碼應依來源留空，目前為：" + actual.page);
});

macroSource.chapters.forEach(function (expected, index) {
  const actual = macro.chapters[index];
  check(Boolean(actual), "總體經濟學缺少第 " + expected.number + " 章");
  if (!actual) {
    return;
  }
  check(actual.number === expected.number, "總體經濟學第 " + expected.number + " 章章號不符");
  check(actual.title === expected.title, "總體經濟學第 " + expected.number + " 章章名不符：" + actual.title);
  check(actual.page === expected.page, "總體經濟學第 " + expected.number + " 章頁碼不符：" + actual.page);
  check(actual.part === expected.part, "總體經濟學第 " + expected.number + " 章 Part 歸屬不符");
  check(actual.partTitle === expected.partTitle, "總體經濟學第 " + expected.number + " 章 Part 名稱不符");
  check(
    actual.sections.slice(0, expected.sections.length).map(function (section) { return section.title; }).join("|") === expected.sections.join("|"),
    "總體經濟學第 " + expected.number + " 章節次不符"
  );
});

check(investment.parts.length === investmentSource.parts.length, "投資學 Part 數應與來源一致（" + investmentSource.parts.length + "）");
check(investment.chapters.length === investmentSource.chapters.length, "投資學章數應與來源一致（" + investmentSource.chapters.length + "）");
check(investment.chapters.length === 16, "投資學應為來源列出的 16 章");

investmentSource.parts.forEach(function (expected, index) {
  const actual = investment.parts[index];
  check(Boolean(actual), "投資學缺少 Part " + expected.number);
  if (!actual) {
    return;
  }
  check(actual.number === expected.number, "投資學 Part 編號不符");
  check(actual.title === expected.title, "投資學 Part 名稱不符：" + actual.title);
  check(actual.page === expected.page, "投資學篇頁碼不符：" + actual.page);
});

investmentSource.chapters.forEach(function (expected, index) {
  const actual = investment.chapters[index];
  check(Boolean(actual), "投資學缺少章節：" + expected.label);
  if (!actual) {
    return;
  }
  check(actual.label === expected.label, "投資學章號不符：" + actual.label);
  check(actual.title === expected.title, "投資學章名不符：" + actual.title);
  check(actual.part === expected.part, "投資學 " + expected.label + " 的 Part 歸屬不符");
  check(actual.partTitle === expected.partTitle, "投資學 " + expected.label + " 的 Part 名稱不符");
  check(actual.page === "第 " + expected.part + " 篇 · " + expected.partPage, "投資學 " + expected.label + " 的篇頁碼標示不符");
});

check(Array.isArray(ratioFormulas) && ratioFormulas.length >= 20, "投資學比例分析公式應至少 20 條（目前 " + ratioFormulas.length + " 條）");
const ratioIds = new Set();
const ratioNames = new Set();
const investmentChapterMap = {};
investment.chapters.forEach(function (chapter) {
  investmentChapterMap[chapter.id] = chapter;
});
ratioFormulas.forEach(function (entry) {
  check(Boolean(entry && typeof entry === "object"), "投資學比例公式資料格式錯誤");
  if (!entry || typeof entry !== "object") {
    return;
  }
  ["id", "category", "name", "formula", "note", "chapterId", "sectionTitle"].forEach(function (field) {
    check(typeof entry[field] === "string" && entry[field].trim().length > 0, "投資學比例公式缺少 " + field + "：" + (entry.name || entry.id || "未命名"));
  });
  check(!ratioIds.has(entry.id), "投資學比例公式 id 重複：" + entry.id);
  check(!ratioNames.has(entry.name), "投資學比例公式名稱重複：" + entry.name);
  ratioIds.add(entry.id);
  ratioNames.add(entry.name);
  check(!/undefined|NaN/.test(entry.formula || ""), "投資學比例公式含 undefined 或 NaN：" + entry.name);
  check(typeof entry.latex === "string" && entry.latex.trim().length > 0, "投資學比例公式缺少 LaTeX：" + entry.name);
  check(!/\$/.test(entry.latex || ""), "投資學比例公式的 LaTeX 不應含美元符號：" + entry.name);
  const chapter = investmentChapterMap[entry.chapterId];
  check(Boolean(chapter), "投資學比例公式指向不存在的投資學章節：" + entry.name + "（" + entry.chapterId + "）");
  if (!chapter) {
    return;
  }
  const section = chapter.sections.find(function (item) {
    return item.title === entry.sectionTitle;
  });
  check(Boolean(section), "投資學比例公式指向不存在的節次：" + entry.name + "（" + entry.sectionTitle + "）");
  if (section) {
    check(!section.formula, "投資學比例公式綁定節次不得另有 formula 字串，避免雙來源：" + entry.name);
  }
});

check(Array.isArray(optionPriorities) && optionPriorities.length === 5, "投資學選擇權評價優先順序應有 5 項");
const priorityNumbers = new Set();
optionPriorities.forEach(function (item) {
  check(Boolean(item && typeof item === "object"), "投資學選擇權優先順序資料格式錯誤");
  if (!item || typeof item !== "object") {
    return;
  }
  check(Number.isInteger(item.priority) && item.priority >= 1 && item.priority <= 5, "投資學選擇權優先順序編號錯誤：" + item.priority);
  check(!priorityNumbers.has(item.priority), "投資學選擇權優先順序編號重複：" + item.priority);
  priorityNumbers.add(item.priority);
  ["topic", "goal", "summary"].forEach(function (field) {
    check(typeof item[field] === "string" && item[field].trim().length > 0, "投資學選擇權優先順序缺少 " + field + "：" + (item.topic || item.priority));
  });
  check(Array.isArray(item.formulas), "投資學選擇權優先順序 formulas 應為陣列：" + item.topic);
  (item.formulas || []).forEach(function (formula) {
    check(Boolean(formula && typeof formula === "object"), "投資學選擇權公式格式錯誤：" + item.topic);
    if (!formula || typeof formula !== "object") {
      return;
    }
    check(typeof formula.label === "string" && formula.label.trim().length > 0, "投資學選擇權公式缺少 label：" + item.topic);
    check(typeof formula.latex === "string" && formula.latex.trim().length > 0, "投資學選擇權公式缺少 LaTeX：" + item.topic);
  });
  check(Array.isArray(item.variables) && item.variables.length > 0, "投資學選擇權優先順序缺少變數定義：" + item.topic);
  (item.variables || []).forEach(function (variable) {
    check(Boolean(variable && typeof variable === "object"), "投資學選擇權變數格式錯誤：" + item.topic);
    if (!variable || typeof variable !== "object") {
      return;
    }
    check(typeof variable.symbol === "string" && variable.symbol.trim().length > 0, "投資學選擇權變數缺少 symbol：" + item.topic);
    check(typeof variable.definition === "string" && variable.definition.trim().length > 0, "投資學選擇權變數缺少 definition：" + item.topic);
  });
});

check(accounting.chapters.length === accountingSource.chapters.length, "會計學章數應與來源一致（" + accountingSource.chapters.length + "）");
check(accounting.chapters.length === 23, "會計學應為來源列出的 23 章");

const accountingExplicitSourceSections = accountingSource.chapters.reduce(function (sum, chapter) {
  return sum + chapter.sections.length;
}, 0);
const accountingExpectedSections = accountingSource.chapters.reduce(function (sum, chapter) {
  return sum + Math.max(chapter.sections.length, 2);
}, 0);
check(accountingExplicitSourceSections === 41, "會計學來源應有 41 個具名節次");
const accountingSupplementalSections = 1;
check(accountingSections === accountingExpectedSections + accountingSupplementalSections, "會計學學習單元數應與來源節次及補充單元一致（預期 " + (accountingExpectedSections + accountingSupplementalSections) + "）");

accountingSource.chapters.forEach(function (expected, index) {
  const actual = accounting.chapters[index];
  check(Boolean(actual), "會計學缺少第 " + expected.number + " 章");
  if (!actual) {
    return;
  }
  check(actual.number === expected.number, "會計學第 " + expected.number + " 章章號不符");
  check(
    normalizeAccountingTitle(actual.title) === normalizeAccountingTitle(expected.title),
    "會計學第 " + expected.number + " 章章名不符：" + actual.title
  );
  check(actual.page === "P. " + expected.page, "會計學第 " + expected.number + " 章頁碼不符：" + actual.page);

  if (expected.sections.length > 0) {
    check(
      actual.sections.length === expected.sections.length,
      "會計學第 " + expected.number + " 章節次數應與來源一致（" + expected.sections.length + "）"
    );
    expected.sections.forEach(function (sourceSection, sectionIndex) {
      const actualSection = actual.sections[sectionIndex];
      const expectedTitle = "第" + sourceSection.number + "節 " + sourceSection.title;
      check(
        Boolean(actualSection) && normalizeAccountingTitle(actualSection.title) === normalizeAccountingTitle(expectedTitle),
        "會計學第 " + expected.number + " 章第 " + sourceSection.number + " 節名稱不符"
      );
    });
  } else {
    const supplementalCount = expected.number === 19 ? 3 : 2;
    check(actual.sections.length === supplementalCount, "會計學第 " + expected.number + " 章應有 " + supplementalCount + " 個補充學習重點");
    actual.sections.forEach(function (section) {
      check(/^學習重點 [123]：/.test(section.title), "會計學第 " + expected.number + " 章補充單元應標為學習重點");
    });
  }
});

check(accounting.chapters[22] && /22/.test(accounting.chapters[22].note || "") && /23/.test(accounting.chapters[22].note || ""), "會計學第 23 章應保留來源章號印刷錯誤的註記");

check(law.chapters.length === 21, "證券法規應為 21 章");
check(lawSections === 21, "證券法規應為 21 節");
check(law.chapters.every(function (chapter) { return chapter.id.indexOf("law-") === 0; }), "證券法規章節 ID 應以 law- 開頭");

const lawArticleKeys = Object.keys(lawArticles);
const lawChapterKeys = law.chapters.map(function (chapter) { return chapter.id; });
const lawOfficialSources = lawArticleKeys.reduce(function (sum, key) {
  return sum + ((lawArticles[key].official || []).length);
}, 0);
const lawOfficialPages = lawArticleKeys.filter(function (key) {
  return (lawArticles[key].official || []).length > 0;
}).length;
const lawExternalPages = lawArticleKeys.filter(function (key) {
  return (lawArticles[key].external || []).length > 0;
}).length;
const lawOfficialArticleCount = lawArticleKeys.reduce(function (sum, key) {
  return sum + (lawArticles[key].official || []).reduce(function (sourceSum, source) {
    return sourceSum + (source.articles || []).filter(function (article) { return article.type === "article"; }).length;
  }, 0);
}, 0);
const lawExternalLinkCount = lawArticleKeys.reduce(function (sum, key) {
  return sum + (lawArticles[key].external || []).length;
}, 0);
const lawArticleSourceOk = lawArticleKeys.every(function (key) {
  const entry = lawArticles[key] || {};
  const official = entry.official || [];
  const external = entry.external || [];
  return official.length > 0 || external.length > 0;
});
const lawOfficialSourceOk = lawArticleKeys.every(function (key) {
  return (lawArticles[key].official || []).every(function (source) {
    const articles = source.articles || [];
    return /law\.moj\.gov\.tw\/LawClass\/LawAll\.aspx\?pcode=/.test(source.url || "") &&
      articles.length > 0 &&
      articles.some(function (article) { return article.type === "article" && article.no && article.text; });
  });
});
const lawExternalSourceOk = lawArticleKeys.every(function (key) {
  return (lawArticles[key].external || []).every(function (item) {
    return /^https:\/\//.test(item.url || "") && item.name && item.summary;
  });
});

check(lawArticleKeys.length === 21, "證券法規應有 21 個法規全文資料頁");
check(lawChapterKeys.every(function (key) { return lawArticleKeys.indexOf(key) >= 0; }), "每個證券法規章節都應有對應的全文資料");
check(lawArticleSourceOk, "每個證券法規頁都應有官方全文或官方連結");
check(lawOfficialPages === 14, "應有 14 個頁面提供官方逐條全文");
check(lawOfficialSources === 15, "官方全文來源應為 15 部法規");
check(lawOfficialArticleCount === 1507, "官方全文條文總數應為 1,507 條");
check(lawOfficialSourceOk, "官方全文來源應指向全國法規資料庫並含條文");
check(lawExternalPages === 7, "應有 7 個頁面以自律規範或主管機關連結呈現");
check(lawExternalLinkCount === 10, "自律規範與其他法令連結應為 10 項");
check(lawExternalSourceOk, "自律規範與其他法令連結應有 https 網址、名稱與摘要");
check((lawArticles["law-01"].official || []).length === 2, "證券交易法頁應同時包含本法與施行細則");
check((lawArticles["law-01"].official || []).reduce(function (sum, source) {
  return sum + (source.articles || []).filter(function (article) { return article.type === "article"; }).length;
}, 0) === 244, "證券交易法與施行細則應有 244 條");
check((lawArticles["law-02"].official || []).reduce(function (sum, source) {
  return sum + (source.articles || []).filter(function (article) { return article.type === "article"; }).length;
}, 0) === 534, "公司法應有 534 條");
check((lawArticles["law-14"].external || []).length === 1, "全權委託操作辦法應以自律規範連結呈現");
check((lawArticles["law-21"].external || []).length === 4, "其他主管機關法令應提供 4 個官方查詢入口");

const formulaSections = [];
content.subjects.forEach(function (subject) {
  subject.chapters.forEach(function (chapter) {
    chapter.sections.forEach(function (section) {
      if (section.formula) {
        formulaSections.push({ key: chapter.id + "::" + section.title, formula: section.formula });
      }
    });
  });
});
const formulaTexKeys = Object.keys(formulaTex);
const formulaTexKeySet = new Set(formulaTexKeys);
const formulaSectionKeySet = new Set(formulaSections.map(function (entry) { return entry.key; }));
check(formulaSections.length === 118, "全站應有 118 個含公式的學習單元（目前 " + formulaSections.length + " 個）");
check(formulaTexKeys.length === 118, "KaTeX 公式資料應有 118 筆（目前 " + formulaTexKeys.length + " 筆）");
check(formulaSections.every(function (entry) { return formulaTexKeySet.has(entry.key); }), "每個含公式的學習單元都應有 KaTeX 公式");
check(formulaTexKeys.every(function (key) { return formulaSectionKeySet.has(key); }), "KaTeX 公式資料不得有對應不到學習單元的項目");
check(formulaTexKeys.every(function (key) {
  const entry = formulaTex[key];
  const tex = typeof entry === "string" ? entry : entry && entry.tex;
  return typeof tex === "string" && tex.trim().length > 0 && !/\$/.test(tex);
}), "KaTeX 公式應為非空 LaTeX，且不得使用美元符號");
check(ratioFormulas.every(function (entry) { return entry.latex && !/\$/.test(entry.latex); }), "比例公式應全部使用 KaTeX/LaTeX 語法");
check(optionPriorities.every(function (item) {
  return (item.formulas || []).every(function (formula) { return formula.latex && !/\$/.test(formula.latex); });
}), "選擇權公式應全部使用 KaTeX/LaTeX 語法");
check(!macro.chapters.some(function (chapter) { return chapter.id.indexOf("law-") === 0; }), "總體經濟學不得混入證券法規章節");
check(!investment.chapters.some(function (chapter) { return chapter.id.indexOf("law-") === 0; }), "投資學不得混入證券法規章節");
check(!accounting.chapters.some(function (chapter) { return chapter.id.indexOf("law-") === 0; }), "會計學不得混入證券法規章節");

check(!investment.chapters.some(function (chapter) { return chapter.number === 12; }), "投資學不得自行補上第十二章");
check(!investment.chapters.some(function (chapter) { return chapter.id.indexOf("macro-") === 0; }), "投資學不得混入總體經濟學章節");
check(!macro.chapters.some(function (chapter) { return chapter.id.indexOf("investment-") === 0; }), "總體經濟學不得混入投資學章節");
check(!macro.chapters.some(function (chapter) { return chapter.id.indexOf("macro-") !== 0; }), "總體經濟學章節 ID 應以 macro- 開頭");
check(!investment.chapters.some(function (chapter) { return chapter.id.indexOf("investment-") !== 0; }), "投資學章節 ID 應以 investment- 開頭");
check(!accounting.chapters.some(function (chapter) { return chapter.id.indexOf("accounting-") !== 0; }), "會計學章節 ID 應以 accounting- 開頭");
check(!accounting.chapters.some(function (chapter) { return chapter.id.indexOf("macro-") === 0 || chapter.id.indexOf("investment-") === 0; }), "會計學不得混入其他科目章節");
check(!macro.chapters.some(function (chapter) { return chapter.id.indexOf("accounting-") === 0; }), "總體經濟學不得混入會計學章節");
check(!investment.chapters.some(function (chapter) { return chapter.id.indexOf("accounting-") === 0; }), "投資學不得混入會計學章節");
check(macro.parts.map(function (part) { return part.number; }).join(",") === "1,2", "總體經濟學應包含 Part 1 與 Part 2");

const allChapters = content.subjects.reduce(function (all, subject) {
  return all.concat(subject.chapters);
}, []);
const chapterIds = allChapters.map(function (chapter) { return chapter.id; });
check(new Set(chapterIds).size === chapterIds.length, "章節 ID 不得重複");

const sourceIds = new Set(content.sources.map(function (source) { return source.id; }));
allChapters.forEach(function (chapter) {
  check(Array.isArray(chapter.sourceIds) && chapter.sourceIds.length > 0, chapter.id + " 缺少資料來源");
  (chapter.sourceIds || []).forEach(function (sourceId) {
    check(sourceIds.has(sourceId), chapter.id + " 引用不存在的來源：" + sourceId);
  });
  check(Array.isArray(chapter.sections) && chapter.sections.length > 0, chapter.id + " 缺少學習單元");
});

allChapters.forEach(function (chapter) {
  chapter.sections.forEach(function (section, index) {
    check(Array.isArray(section.body) && section.body.length > 0, chapter.id + " 第 " + (index + 1) + " 單元缺少正文");
    check(Array.isArray(section.terms) && section.terms.length > 0, chapter.id + " 第 " + (index + 1) + " 單元缺少名詞");
    check(Array.isArray(section.points) && section.points.length > 0, chapter.id + " 第 " + (index + 1) + " 單元缺少考試重點");
    (section.terms || []).forEach(function (term) {
      check(Array.isArray(term) && term.length === 2 && term[0] && term[1], chapter.id + " 有格式錯誤的名詞卡");
    });
    if (section.formula) {
      check(!/undefined|NaN/.test(section.formula), chapter.id + " 的公式含 undefined 或 NaN");
    }
    if (section.ratioFormulaId) {
      const linkedRatio = ratioFormulas.find(function (entry) {
        return entry.id === section.ratioFormulaId;
      });
      check(Boolean(linkedRatio), chapter.id + " 第 " + (index + 1) + " 單元引用不存在的比例公式：" + section.ratioFormulaId);
      check(!section.formula, chapter.id + " 第 " + (index + 1) + " 單元同時有 formula 與 ratioFormulaId，會形成雙來源");
    }
  });
});

const totalSections = allChapters.reduce(function (sum, chapter) { return sum + chapter.sections.length; }, 0);
const totalTerms = allChapters.reduce(function (sum, chapter) {
  return sum + chapter.sections.reduce(function (sectionSum, section) { return sectionSum + section.terms.length; }, 0);
}, 0);

const diagramKeys = Object.keys(diagrams);
check(diagramKeys.length >= 21, "總體經濟學模型圖應至少 21 張（目前 " + diagramKeys.length + " 張）");

const rawDiagramKeys = [];
diagramFiles.forEach(function (file) {
  const text = fs.readFileSync(path.join(siteDir, "assets", file), "utf8");
  const matches = text.match(/^\s{2}"(macro-\d+#\d+)":\s*\{/gm) || [];
  matches.forEach(function (match) {
    rawDiagramKeys.push(match.trim().split('"')[1]);
  });
});
check(new Set(rawDiagramKeys).size === rawDiagramKeys.length, "模型圖鍵值不得重複（含跨檔案）");
check(rawDiagramKeys.length === diagramKeys.length, "模型圖載入數量與檔案定義數量不一致（檔案 " + rawDiagramKeys.length + "、載入 " + diagramKeys.length + "）");

const macroChapterMap = {};
macro.chapters.forEach(function (chapter) {
  macroChapterMap[chapter.id] = chapter;
});

const svgIds = [];

diagramKeys.forEach(function (key) {
  const keyParts = key.split("#");
  check(keyParts.length === 2 && keyParts[0].indexOf("macro-") === 0, "模型圖只能掛在總體經濟學章節，鍵值格式：" + key);
  const chapter = macroChapterMap[keyParts[0]];
  check(Boolean(chapter), "模型圖指向不存在的總體經濟學章節：" + key);
  if (!chapter) {
    return;
  }
  const sectionIndex = Number(keyParts[1]);
  check(Number.isInteger(sectionIndex) && sectionIndex >= 0 && sectionIndex < chapter.sections.length, "模型圖節次超出範圍：" + key);
  const section = chapter.sections[sectionIndex];
  if (!section) {
    return;
  }
  const diagram = diagrams[key];
  check(diagram.sectionTitle === section.title, "模型圖節次標題不符：" + key + "（" + diagram.sectionTitle + "）");
  check(typeof diagram.title === "string" && diagram.title.length > 0, "模型圖缺少標題：" + key);
  check(typeof diagram.caption === "string" && diagram.caption.length > 0, "模型圖缺少圖說：" + key);
  const svg = String(diagram.svg || "").trim();
  check(svg.indexOf("<svg") === 0, "模型圖缺少 SVG 開頭：" + key);
  check(svg.slice(-6) === "</svg>", "模型圖 SVG 未正確結束：" + key);
  check(/viewBox="/.test(svg), "模型圖 SVG 缺少 viewBox：" + key);
  check(/role="img"/.test(svg), "模型圖 SVG 缺少 role=\"img\"：" + key);
  check(/aria-labelledby="/.test(svg), "模型圖 SVG 缺少 aria-labelledby：" + key);
  check(/<title /.test(svg), "模型圖 SVG 缺少 title：" + key);
  const labelledBy = svg.match(/aria-labelledby="([^"]+)"/);
  if (labelledBy) {
    labelledBy[1].split(/\s+/).forEach(function (id) {
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      check(new RegExp('id="' + escapedId + '"').test(svg), "模型圖 aria-labelledby 指向不存在的 ID：" + key + "（" + id + "）");
    });
  }
  const idMatches = svg.match(/\bid="[^"]+"/g) || [];
  idMatches.forEach(function (match) {
    const id = match.slice(4, -1);
    check(svgIds.indexOf(id) === -1, "模型圖 SVG ID 重複：" + key + "（" + id + "）");
    svgIds.push(id);
  });
  check(!/<script|javascript:|xlink:href|<image|<use /i.test(svg), "模型圖 SVG 含不安全的標籤或外部參照：" + key);
  check(!/https?:\/\/(?!www\.w3\.org)/.test(svg), "模型圖 SVG 含外部資源連結：" + key);
  ["variables", "parameters"].forEach(function (field) {
    const label = field === "variables" ? "變數" : "參數";
    const rows = diagram[field];
    check(Array.isArray(rows) && rows.length > 0, "模型圖缺少" + label + "表：" + key);
    (rows || []).forEach(function (row) {
      check(Array.isArray(row) && row.length === 3 && row[0] && row[1] && row[2], "模型圖" + label + "格式錯誤：" + key);
    });
  });
  const variableSymbols = (diagram.variables || []).map(function (row) { return row[0]; });
  (diagram.parameters || []).forEach(function (row) {
    check(variableSymbols.indexOf(row[0]) === -1, "模型圖變數與參數符號重複：" + key + "（" + row[0] + "）");
  });
  check(typeof diagram.note === "string" && diagram.note.length > 0, "模型圖缺少示意提醒：" + key);
});

const allSvgIds = new Map();
const duplicateSvgIds = [];
diagramKeys.forEach(function (key) {
  const idMatches = String(diagrams[key].svg || "").match(/\bid="[^"]+"/g) || [];
  idMatches.forEach(function (match) {
    const id = match.slice(4, -1);
    if (allSvgIds.has(id)) {
      duplicateSvgIds.push(id + "（" + allSvgIds.get(id) + "、" + key + "）");
    } else {
      allSvgIds.set(id, key);
    }
  });
});
check(duplicateSvgIds.length === 0, "模型總覽頁的 SVG ID 不得重複：" + duplicateSvgIds.join("、"));
check(allSvgIds.size > 0, "模型圖應包含可供 aria-labelledby 參照的 SVG ID");

/* 諾貝爾年表與圖組：表格保留 1969–2026 的連續屆別，圖組與年表共用 group ID。 */
const nobelRows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
const nobelGroups = Array.isArray(nobelData.groups) ? nobelData.groups : [];
const nobelDiagramKeys = Object.keys(nobelDiagrams);
const nobelGroupMap = {};
const nobelRowYears = [];

check(nobelRows.length >= 58, "諾貝爾年表應至少 58 屆（目前 " + nobelRows.length + " 屆）");
check(nobelRows.some(function (row) { return row.year === 2026; }), "諾貝爾年表應包含 2026 屆");
check(nobelData.meta && String(nobelData.meta.period || "").indexOf("2026") !== -1, "諾貝爾年表期間應標到 2026");

nobelGroups.forEach(function (group) {
  check(typeof group.id === "string" && /^nobel-\d+$/.test(group.id), "諾貝爾圖組 ID 格式錯誤：" + group.id);
  check(!nobelGroupMap[group.id], "諾貝爾圖組 ID 重複：" + group.id);
  nobelGroupMap[group.id] = group;
  check(typeof group.title === "string" && group.title.length > 0, "諾貝爾圖組缺少標題：" + group.id);
  check(typeof group.description === "string" && group.description.length > 0, "諾貝爾圖組缺少說明：" + group.id);
});

nobelRows.forEach(function (row, index) {
  check(Number.isInteger(row.year), "諾貝爾年表年份格式錯誤（第 " + (index + 1) + " 列）");
  check(typeof row.laureates === "string" && row.laureates.length > 0, "諾貝爾年表缺少得主：" + row.year);
  check(typeof row.field === "string" && row.field.length > 0, "諾貝爾年表缺少研究領域：" + row.year);
  check(typeof row.formula === "string" && row.formula.length > 0, "諾貝爾年表缺少代表模型／公式：" + row.year);
  check(typeof row.conclusion === "string" && row.conclusion.length > 0, "諾貝爾年表缺少核心結論：" + row.year);
  check(Boolean(nobelGroupMap[row.group]), "諾貝爾年表指向不存在的圖組：" + row.year + "（" + row.group + "）");
  check(nobelRowYears.indexOf(row.year) === -1, "諾貝爾年表年份重複：" + row.year);
  nobelRowYears.push(row.year);
});
check(nobelRows.length > 0 && nobelRows[0].year === 1969, "諾貝爾年表應從 1969 年開始");
if (nobelRows.length) {
  check(nobelRows[nobelRows.length - 1].year === 2026, "諾貝爾年表最後一屆應為 2026");
}
check(nobelRows.every(function (row, index) {
  return index === 0 || row.year === nobelRows[index - 1].year + 1;
}), "諾貝爾年表年份應連續");

check(nobelDiagramKeys.length === nobelGroups.length, "諾貝爾圖組數量與載入模型圖數量不一致（圖組 " + nobelGroups.length + "、模型圖 " + nobelDiagramKeys.length + "）");
const rawNobelDiagramKeys = [];
nobelDiagramFiles.forEach(function (file) {
  const text = fs.readFileSync(path.join(siteDir, "assets", file), "utf8");
  const matches = text.match(/^\s{2}"(nobel-\d+)":\s*\{/gm) || [];
  matches.forEach(function (match) {
    rawNobelDiagramKeys.push(match.trim().split('"')[1]);
  });
});
check(new Set(rawNobelDiagramKeys).size === rawNobelDiagramKeys.length, "諾貝爾模型圖鍵值不得重複");
check(rawNobelDiagramKeys.length === nobelDiagramKeys.length, "諾貝爾模型圖載入數量與檔案定義數量不一致（檔案 " + rawNobelDiagramKeys.length + "、載入 " + nobelDiagramKeys.length + "）");

nobelDiagramKeys.forEach(function (key) {
  check(/^nobel-\d+$/.test(key), "諾貝爾模型圖鍵值格式錯誤：" + key);
  check(Boolean(nobelGroupMap[key]), "諾貝爾模型圖沒有對應的圖組：" + key);
  const diagram = nobelDiagrams[key];
  check(typeof diagram.title === "string" && diagram.title.length > 0, "諾貝爾模型圖缺少標題：" + key);
  check(typeof diagram.caption === "string" && diagram.caption.length > 0, "諾貝爾模型圖缺少圖說：" + key);
  const svg = String(diagram.svg || "").trim();
  check(svg.indexOf("<svg") === 0, "諾貝爾模型圖缺少 SVG 開頭：" + key);
  check(svg.slice(-6) === "</svg>", "諾貝爾模型圖 SVG 未正確結束：" + key);
  check(/viewBox="/.test(svg), "諾貝爾模型圖 SVG 缺少 viewBox：" + key);
  check(/role="img"/.test(svg), "諾貝爾模型圖 SVG 缺少 role=\"img\"：" + key);
  check(/aria-labelledby="/.test(svg), "諾貝爾模型圖 SVG 缺少 aria-labelledby：" + key);
  check(/<title /.test(svg), "諾貝爾模型圖 SVG 缺少 title：" + key);
  const labelledBy = svg.match(/aria-labelledby="([^"]+)"/);
  if (labelledBy) {
    labelledBy[1].split(/\s+/).forEach(function (id) {
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      check(new RegExp('id="' + escapedId + '"').test(svg), "諾貝爾模型圖 aria-labelledby 指向不存在的 ID：" + key + "（" + id + "）");
    });
  }
  const idMatches = svg.match(/\bid="[^"]+"/g) || [];
  idMatches.forEach(function (match) {
    const id = match.slice(4, -1);
    check(!allSvgIds.has(id), "模型總覽頁的 SVG ID 不得重複：" + key + "（" + id + "）");
    if (!allSvgIds.has(id)) {
      allSvgIds.set(id, key);
    }
  });
  check(!/<script|javascript:|xlink:href|<image|<use /i.test(svg), "諾貝爾模型圖 SVG 含不安全的標籤或外部參照：" + key);
  check(!/https?:\/\/(?!www\.w3\.org)/.test(svg), "諾貝爾模型圖 SVG 含外部資源連結：" + key);
  ["variables", "parameters"].forEach(function (field) {
    const label = field === "variables" ? "變數" : "參數";
    const rows = diagram[field];
    check(Array.isArray(rows) && rows.length > 0, "諾貝爾模型圖缺少" + label + "表：" + key);
    (rows || []).forEach(function (row) {
      check(Array.isArray(row) && row.length === 3 && row[0] && row[1] && row[2], "諾貝爾模型圖" + label + "格式錯誤：" + key);
    });
  });
  const variableSymbols = (diagram.variables || []).map(function (row) { return row[0]; });
  (diagram.parameters || []).forEach(function (row) {
    check(variableSymbols.indexOf(row[0]) === -1, "諾貝爾模型圖變數與參數符號重複：" + key + "（" + row[0] + "）");
  });
  check(typeof diagram.note === "string" && diagram.note.length > 0, "諾貝爾模型圖缺少示意提醒：" + key);
});

nobelGroups.forEach(function (group) {
  const rows = nobelRows.filter(function (row) { return row.group === group.id; });
  check(rows.length > 0, "諾貝爾圖組沒有對應屆別：" + group.id);
  check(Boolean(nobelDiagrams[group.id]), "諾貝爾圖組缺少模型圖：" + group.id);
});

/* 總體經濟學學派演進圖：節點、模型錨點與諾貝爾年份都必須回指既有資料。 */
const macroModelAnchorSet = new Set(diagramKeys.map(function (key) {
  return "model-" + key.replace("#", "-");
}));
const evolutionStages = Array.isArray(macroEvolution.stages) ? macroEvolution.stages : [];
const evolutionNodes = [];
const evolutionStageIds = new Set();
const evolutionNodeIds = new Set();
const evolutionNobelYears = new Set();

check(Boolean(macroEvolution.meta && macroEvolution.meta.title && macroEvolution.meta.description && macroEvolution.meta.note), "學派演進圖缺少標題、說明或閱讀說明");
check(evolutionStages.length === 6, "學派演進圖應有 6 個階段（目前 " + evolutionStages.length + " 個）");

evolutionStages.forEach(function (stage, stageIndex) {
  const stageLabel = "學派演進圖第 " + (stageIndex + 1) + " 階段";
  check(typeof stage.id === "string" && stage.id.length > 0, stageLabel + "缺少 ID");
  check(!evolutionStageIds.has(stage.id), stageLabel + "的 ID 重複：" + stage.id);
  evolutionStageIds.add(stage.id);
  check(typeof stage.year === "string" && stage.year.length > 0, stageLabel + "缺少年份");
  check(typeof stage.period === "string" && stage.period.length > 0, stageLabel + "缺少期間");
  check(typeof stage.era === "string" && stage.era.length > 0, stageLabel + "缺少時代標題");
  check(typeof stage.transition === "string" && stage.transition.length > 0, stageLabel + "缺少演進說明");

  const nodes = Array.isArray(stage.nodes) ? stage.nodes : [];
  check(nodes.length > 0, stageLabel + "沒有學派節點");
  nodes.forEach(function (node) {
    evolutionNodes.push(node);
    const nodeLabel = stageLabel + "的節點";
    check(typeof node.id === "string" && node.id.length > 0, nodeLabel + "缺少 ID");
    check(!evolutionNodeIds.has(node.id), nodeLabel + " ID 重複：" + node.id);
    evolutionNodeIds.add(node.id);
    check(typeof node.kind === "string" && node.kind.length > 0, nodeLabel + "缺少節點類型");
    check(typeof node.school === "string" && node.school.length > 0, nodeLabel + "缺少學派名稱");
    check(typeof node.english === "string" && node.english.length > 0, nodeLabel + "缺少英文名稱");
    check(typeof node.period === "string" && node.period.length > 0, nodeLabel + "缺少期間");
    check(typeof node.founders === "string" && node.founders.length > 0, nodeLabel + "缺少提出者");
    check(typeof node.summary === "string" && node.summary.length > 0, nodeLabel + "缺少摘要");

    const anchors = Array.isArray(node.modelAnchors) ? node.modelAnchors : [];
    check(anchors.length > 0, nodeLabel + "沒有綁定模型");
    check(new Set(anchors).size === anchors.length, nodeLabel + "的模型錨點重複");
    anchors.forEach(function (anchor) {
      check(macroModelAnchorSet.has(anchor), nodeLabel + "引用不存在的模型錨點：" + anchor);
    });

    const years = Array.isArray(node.nobelYears) ? node.nobelYears : [];
    years.forEach(function (year) {
      check(nobelRowYears.indexOf(Number(year)) !== -1, nodeLabel + "引用不存在的諾貝爾年份：" + year);
      evolutionNobelYears.add(Number(year));
    });

    const refs = Array.isArray(node.chapterRefs) ? node.chapterRefs : [];
    check(refs.length > 0, nodeLabel + "沒有延伸閱讀章節");
    refs.forEach(function (ref) {
      const chapter = macroChapterMap[ref.chapterId];
      check(Boolean(chapter), nodeLabel + "引用不存在的章節：" + ref.chapterId);
      if (chapter) {
        check(Number.isInteger(ref.sectionIndex) && ref.sectionIndex >= 0 && ref.sectionIndex < chapter.sections.length, nodeLabel + "的章節節次超出範圍：" + ref.chapterId + " / " + ref.sectionIndex);
      }
      check(typeof ref.label === "string" && ref.label.length > 0, nodeLabel + "的延伸閱讀缺少標籤");
    });
  });
});

const evolutionModelLinkCount = evolutionNodes.reduce(function (sum, node) {
  return sum + (Array.isArray(node.modelAnchors) ? node.modelAnchors.length : 0);
}, 0);
check(evolutionNodes.length === 10, "學派演進圖應有 10 個學派／理論節點（目前 " + evolutionNodes.length + " 個）");
check(evolutionModelLinkCount === 19, "學派演進圖應有 19 個模型連結（目前 " + evolutionModelLinkCount + " 個）");
check(evolutionNobelYears.size === 15, "學派演進圖應包含 15 個不同的諾貝爾里程碑（目前 " + evolutionNobelYears.size + " 個）");
check(evolutionNodes.every(function (node) { return Array.isArray(node.modelAnchors) && node.modelAnchors.length > 0; }), "學派演進圖的每個節點都應綁定至少一個模型");

// 繁體中文守門：只列出不易與臺灣繁體用字混淆的簡體字。
// 英文仍可保留得主姓名、專有名詞、公式符號與國際通用縮寫。
const simplifiedGuard = /[国经济与为这说时间发现实体关风险资产负债银货币财税价额总结构变动边际弹预竞争垄断规报劳厂产业销费储贷汇数据统计图关键词页导设题复习资会计学务项响丰验检测试评类并对认确监审称损换据数权条来极样档检楼历残毕气汉济温湾满热爱状独狭获环齐长门问间闻队阳阴际随隐难顶顺须飞饭饮马鱼鸟鸡鸭鹰麦黄龙车转轮软轻载较辅辆输边达过运进远违连迟选递遗逻]/g;
const languageSurface = [
  JSON.stringify(content),
  JSON.stringify(diagrams),
  JSON.stringify(nobelData),
  JSON.stringify(nobelDiagrams),
  JSON.stringify(macroEvolution),
  read("site/assets/content-macro-evolution.js"),
  read("site/index.html"),
  read("site/assets/app.js"),
  read("site/README.md"),
  read("site/SOURCES.md"),
  read("documents/content_review_checklist.md")
].join("\n");
const simplifiedMatches = Array.from(new Set(languageSurface.match(simplifiedGuard) || []));
check(simplifiedMatches.length === 0, "全站中文不得含簡體字，發現：" + simplifiedMatches.join("、"));

console.log("科目：" + content.subjects.length);
console.log("章節：" + allChapters.length + "（總體經濟學 " + macro.chapters.length + "、投資學 " + investment.chapters.length + "、會計學 " + accounting.chapters.length + "、證券法規 " + law.chapters.length + "）");
console.log("學習單元：" + totalSections + "（總體經濟學 " + macroSections + " 節、投資學 " + investmentSections + " 個重點、會計學 " + accountingSections + " 個單元、證券法規 " + lawSections + " 節）");
console.log("名詞卡：" + totalTerms);
console.log("模型圖：" + diagramKeys.length + "（總體經濟學）");
console.log("諾貝爾年表：" + nobelRows.length + " 屆、 " + nobelDiagramKeys.length + " 組模型圖");
console.log("學派演進圖：" + evolutionStages.length + " 個階段、 " + evolutionNodes.length + " 個節點、 " + evolutionModelLinkCount + " 個模型連結、 " + evolutionNobelYears.size + " 個諾貝爾里程碑");
console.log("資料來源：" + content.sources.length);
console.log("法規條文：" + lawOfficialArticleCount + "（官方 " + lawOfficialSources + " 部；" + lawOfficialPages + " 頁全文、" + lawExternalPages + " 頁連結摘要）");
console.log("KaTeX 公式：" + formulaSections.length + " 個學習單元（" + formulaTexKeys.length + " 筆資料）");
console.log("檢查項目：" + checks.length + "，失敗：" + failures.length);

if (failures.length > 0) {
  console.error("\n驗證失敗：");
  failures.forEach(function (failure) {
    console.error("- " + failure);
  });
  process.exit(1);
}

console.log("驗證通過：總體經濟學第 1–2 篇（13 章、50 節）、投資學第 1–5 篇（16 章、52 個重點）、會計學（23 章、41 個具名節次與 23 個補充學習重點）、證券法規（21 章、21 節、1,507 條官方全文）、118 個 KaTeX 公式與諾貝爾年表（1969–2026）結構一致。");
