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
const investmentDiagramFiles = ["diagrams-investment.js"];
const accountingDiagramFiles = ["diagrams-accounting.js"];
const nobelDiagramFiles = ["diagrams-nobel.js"];

function loadContent() {
  const context = { window: {} };
  vm.createContext(context);
  ["content-macro.js", "content-macro-2.js", "content-macro-3.js", "content-macro-evolution.js", "content-investment.js", "content-accounting.js", "content-accounting-2.js", "content-law.js", "content-law-articles.js", "content-formula-tex.js", "content.js", "content-nobel.js", "content-macro-current.js", "content-past-exams-written.js", "content-past-exams.js", "content-exam-solutions-115.js", "content-exam-solutions-114.js", "content-exam-solutions-113.js", "content-exam-solutions-112.js", "content-exam-solutions-111.js", "content-exam-solutions-110.js", "content-exam-solutions-109.js", "content-exam-solutions-108.js", "content-exam-solutions-107.js"].forEach(function (file) {
    const fullPath = path.join(siteDir, "assets", file);
    vm.runInContext(fs.readFileSync(fullPath, "utf8"), context, { filename: file });
  });
  diagramFiles.concat(investmentDiagramFiles, accountingDiagramFiles, nobelDiagramFiles).forEach(function (file) {
    const fullPath = path.join(siteDir, "assets", file);
    vm.runInContext(fs.readFileSync(fullPath, "utf8"), context, { filename: file });
  });
  return {
    content: context.window.EXAM_CONTENT,
    diagrams: context.window.MACRO_DIAGRAMS || {},
    investmentDiagrams: context.window.INVESTMENT_DIAGRAMS || {},
    accountingDiagrams: context.window.ACCOUNTING_DIAGRAMS || {},
    nobelData: context.window.NOBEL_DATA || { rows: [], groups: [], meta: {} },
    nobelDiagrams: context.window.NOBEL_DIAGRAMS || {},
    macroEvolution: context.window.MACRO_EVOLUTION || { meta: {}, stages: [] },
    ratioFormulas: context.window.INVESTMENT_RATIO_FORMULAS || [],
    optionPriorities: context.window.INVESTMENT_OPTION_PRIORITIES || [],
    lawArticles: context.window.LAW_ARTICLES || {},
    formulaTex: context.window.FORMULA_TEX || {},
    pastExams: context.window.PAST_EXAMS || { meta: {}, subjects: [], sessions: [], questions: [] },
    pastWritten: context.window.PAST_EXAMS_WRITTEN || { meta: {}, questions: [] },
    examSolutions: Array.isArray(context.window.EXAM_SOLUTIONS) ? context.window.EXAM_SOLUTIONS : [],
    macroCurrent: context.window.MACRO_CURRENT_EVENTS || { meta: {}, events: [] }
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
  const lines = read("documents/accounting_toc.md").split(/\r?\n/);
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
const investmentDiagrams = loaded.investmentDiagrams || {};
const accountingDiagrams = loaded.accountingDiagrams || {};
const nobelData = loaded.nobelData;
const nobelDiagrams = loaded.nobelDiagrams;
const macroEvolution = loaded.macroEvolution;
const ratioFormulas = loaded.ratioFormulas;
const optionPriorities = loaded.optionPriorities;
const lawArticles = loaded.lawArticles;
const formulaTex = loaded.formulaTex;
const pastExams = loaded.pastExams;
const pastWritten = loaded.pastWritten || { meta: {}, questions: [] };
const examSolutions = loaded.examSolutions || [];
const macroCurrent = loaded.macroCurrent || { meta: {}, events: [] };
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
const accountingChapterMap = {};
accounting.chapters.forEach(function (chapter) {
  accountingChapterMap[chapter.id] = chapter;
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
check(diagramKeys.length >= 22, "總體經濟學章節圖應至少 22 張（目前 " + diagramKeys.length + " 張）");

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

/* 投資學教學圖表：與總體模型圖共用相同的 SVG 結構與無障礙檢查。 */
const investmentDiagramKeys = Object.keys(investmentDiagrams);
check(investmentDiagramKeys.length >= 9, "投資學教學圖應至少 9 張（目前 " + investmentDiagramKeys.length + " 張）");

const rawInvestmentKeys = [];
investmentDiagramFiles.forEach(function (file) {
  const text = fs.readFileSync(path.join(siteDir, "assets", file), "utf8");
  const matches = text.match(/^\s{2}"(investment-\d+#\d+)":\s*\{/gm) || [];
  matches.forEach(function (match) {
    rawInvestmentKeys.push(match.trim().split('"')[1]);
  });
});
check(new Set(rawInvestmentKeys).size === rawInvestmentKeys.length, "投資學教學圖鍵值不得重複");
check(rawInvestmentKeys.length === investmentDiagramKeys.length, "投資學教學圖載入數量與檔案定義數量不一致（檔案 " + rawInvestmentKeys.length + "、載入 " + investmentDiagramKeys.length + "）");

investmentDiagramKeys.forEach(function (key) {
  const keyParts = key.split("#");
  check(keyParts.length === 2 && keyParts[0].indexOf("investment-") === 0, "投資學教學圖只能掛在投資學章節，鍵值格式：" + key);
  const chapter = investmentChapterMap[keyParts[0]];
  check(Boolean(chapter), "投資學教學圖指向不存在的章節：" + key);
  if (!chapter) {
    return;
  }
  const sectionIndex = Number(keyParts[1]);
  check(Number.isInteger(sectionIndex) && sectionIndex >= 0 && sectionIndex < chapter.sections.length, "投資學教學圖節次超出範圍：" + key);
  const section = chapter.sections[sectionIndex];
  if (!section) {
    return;
  }
  const diagram = investmentDiagrams[key];
  check(diagram.sectionTitle === section.title, "投資學教學圖節次標題不符：" + key + "（" + diagram.sectionTitle + "）");
  check(typeof diagram.title === "string" && diagram.title.length > 0, "投資學教學圖缺少標題：" + key);
  check(typeof diagram.caption === "string" && diagram.caption.length > 0, "投資學教學圖缺少圖說：" + key);
  const svg = String(diagram.svg || "").trim();
  check(svg.indexOf("<svg") === 0, "投資學教學圖缺少 SVG 開頭：" + key);
  check(svg.slice(-6) === "</svg>", "投資學教學圖 SVG 未正確結束：" + key);
  check(/viewBox="/.test(svg), "投資學教學圖 SVG 缺少 viewBox：" + key);
  check(/role="img"/.test(svg), "投資學教學圖 SVG 缺少 role=\"img\"：" + key);
  check(/aria-labelledby="/.test(svg), "投資學教學圖 SVG 缺少 aria-labelledby：" + key);
  check(/<title /.test(svg), "投資學教學圖 SVG 缺少 title：" + key);
  const labelledBy = svg.match(/aria-labelledby="([^"]+)"/);
  if (labelledBy) {
    labelledBy[1].split(/\s+/).forEach(function (id) {
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      check(new RegExp('id="' + escapedId + '"').test(svg), "投資學教學圖 aria-labelledby 指向不存在的 ID：" + key + "（" + id + "）");
    });
  }
  const idMatches = svg.match(/\bid="[^"]+"/g) || [];
  idMatches.forEach(function (match) {
    const id = match.slice(4, -1);
    check(svgIds.indexOf(id) === -1, "投資學教學圖 SVG ID 重複：" + key + "（" + id + "）");
    svgIds.push(id);
  });
  check(!/<script|javascript:|xlink:href|<image|<use /i.test(svg), "投資學教學圖 SVG 含不安全的標籤或外部參照：" + key);
  check(!/https?:\/\/(?!www\.w3\.org)/.test(svg), "投資學教學圖 SVG 含外部資源連結：" + key);
  ["variables", "parameters"].forEach(function (field) {
    const label = field === "variables" ? "變數" : "參數";
    const rows = diagram[field];
    check(Array.isArray(rows) && rows.length > 0, "投資學教學圖缺少" + label + "表：" + key);
    (rows || []).forEach(function (row) {
      check(Array.isArray(row) && row.length === 3 && row[0] && row[1] && row[2], "投資學教學圖" + label + "格式錯誤：" + key);
    });
  });
  const variableSymbols = (diagram.variables || []).map(function (row) { return row[0]; });
  (diagram.parameters || []).forEach(function (row) {
    check(variableSymbols.indexOf(row[0]) === -1, "投資學教學圖變數與參數符號重複：" + key + "（" + row[0] + "）");
  });
  check(typeof diagram.note === "string" && diagram.note.length > 0, "投資學教學圖缺少示意提醒：" + key);
});

/* 會計學教學流程圖：與總體模型圖、投資學教學圖共用相同的 SVG 結構與無障礙檢查。 */
const accountingDiagramKeys = Object.keys(accountingDiagrams);
check(accountingDiagramKeys.length >= 1, "會計學教學流程圖應至少 1 張（目前 " + accountingDiagramKeys.length + " 張）");

const rawAccountingKeys = [];
accountingDiagramFiles.forEach(function (file) {
  const text = fs.readFileSync(path.join(siteDir, "assets", file), "utf8");
  const matches = text.match(/^\s{2}"(accounting-\d+#\d+)":\s*\{/gm) || [];
  matches.forEach(function (match) {
    rawAccountingKeys.push(match.trim().split('"')[1]);
  });
});
check(new Set(rawAccountingKeys).size === rawAccountingKeys.length, "會計學教學流程圖鍵值不得重複");
check(rawAccountingKeys.length === accountingDiagramKeys.length, "會計學教學流程圖載入數量與檔案定義數量不一致（檔案 " + rawAccountingKeys.length + "、載入 " + accountingDiagramKeys.length + "）");
check(read("site/index.html").indexOf("assets/diagrams-accounting.js") !== -1, "index.html 未載入會計學教學流程圖資料檔");

accountingDiagramKeys.forEach(function (key) {
  const keyParts = key.split("#");
  check(keyParts.length === 2 && keyParts[0].indexOf("accounting-") === 0, "會計學教學流程圖只能掛在會計學章節，鍵值格式：" + key);
  const chapter = accountingChapterMap[keyParts[0]];
  check(Boolean(chapter), "會計學教學流程圖指向不存在的章節：" + key);
  if (!chapter) {
    return;
  }
  const sectionIndex = Number(keyParts[1]);
  check(Number.isInteger(sectionIndex) && sectionIndex >= 0 && sectionIndex < chapter.sections.length, "會計學教學流程圖節次超出範圍：" + key);
  const section = chapter.sections[sectionIndex];
  if (!section) {
    return;
  }
  const diagram = accountingDiagrams[key];
  check(diagram.sectionTitle === section.title, "會計學教學流程圖節次標題不符：" + key + "（" + diagram.sectionTitle + "）");
  check(diagram.kicker === "教學流程圖", "會計學教學流程圖應標示為教學流程圖：" + key);
  check(typeof diagram.title === "string" && diagram.title.length > 0, "會計學教學流程圖缺少標題：" + key);
  check(typeof diagram.caption === "string" && diagram.caption.length > 0, "會計學教學流程圖缺少圖說：" + key);
  const svg = String(diagram.svg || "").trim();
  check(svg.indexOf("<svg") === 0, "會計學教學流程圖缺少 SVG 開頭：" + key);
  check(svg.slice(-6) === "</svg>", "會計學教學流程圖 SVG 未正確結束：" + key);
  check(/viewBox="/.test(svg), "會計學教學流程圖 SVG 缺少 viewBox：" + key);
  check(/role="img"/.test(svg), "會計學教學流程圖 SVG 缺少 role=\"img\"：" + key);
  check(/aria-labelledby="/.test(svg), "會計學教學流程圖 SVG 缺少 aria-labelledby：" + key);
  check(/<title /.test(svg), "會計學教學流程圖 SVG 缺少 title：" + key);
  check(/<desc /.test(svg), "會計學教學流程圖 SVG 缺少 desc：" + key);
  const labelledBy = svg.match(/aria-labelledby="([^"]+)"/);
  if (labelledBy) {
    labelledBy[1].split(/\s+/).forEach(function (id) {
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      check(new RegExp('id="' + escapedId + '"').test(svg), "會計學教學流程圖 aria-labelledby 指向不存在的 ID：" + key + "（" + id + "）");
    });
  }
  const idMatches = svg.match(/\bid="[^"]+"/g) || [];
  idMatches.forEach(function (match) {
    const id = match.slice(4, -1);
    check(svgIds.indexOf(id) === -1, "會計學教學流程圖 SVG ID 重複：" + key + "（" + id + "）");
    svgIds.push(id);
  });
  check(!/<script|javascript:|xlink:href|<image|<use /i.test(svg), "會計學教學流程圖 SVG 含不安全的標籤或外部參照：" + key);
  check(!/https?:\/\/(?!www\.w3\.org)/.test(svg), "會計學教學流程圖 SVG 含外部資源連結：" + key);
  ["variables", "parameters"].forEach(function (field) {
    const label = field === "variables" ? "流程節點" : "會計基礎";
    const rows = diagram[field];
    check(Array.isArray(rows) && rows.length > 0, "會計學教學流程圖缺少" + label + "表：" + key);
    (rows || []).forEach(function (row) {
      check(Array.isArray(row) && row.length === 3 && row[0] && row[1] && row[2], "會計學教學流程圖" + label + "格式錯誤：" + key);
    });
  });
  const variableSymbols = (diagram.variables || []).map(function (row) { return row[0]; });
  (diagram.parameters || []).forEach(function (row) {
    check(variableSymbols.indexOf(row[0]) === -1, "會計學教學流程圖變數與參數符號重複：" + key + "（" + row[0] + "）");
  });
  check(typeof diagram.note === "string" && diagram.note.length > 0, "會計學教學流程圖缺少示意提醒：" + key);
});

const allSvgIds = new Map();
const duplicateSvgIds = [];
diagramKeys.concat(investmentDiagramKeys, accountingDiagramKeys).forEach(function (key) {
  const source = diagrams[key] || investmentDiagrams[key] || accountingDiagrams[key] || {};
  const idMatches = String(source.svg || "").match(/\bid="[^"]+"/g) || [];
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


/* 歷屆考古題練習庫：確認 107–115 年四個科目、29 次考試與 3,710 題的結構與答案。 */
const pastExamMeta = pastExams.meta || {};
const pastExamSubjects = Array.isArray(pastExams.subjects) ? pastExams.subjects : [];
const pastExamSessions = Array.isArray(pastExams.sessions) ? pastExams.sessions : [];
const pastExamQuestions = Array.isArray(pastExams.questions) ? pastExams.questions : [];
const pastExamSubjectIds = ["law", "investment", "accounting", "macro"];
const pastExamExpectedSubjectTotals = { law: 910, investment: 924, accounting: 882, macro: 994 };
const pastExamExpectedYearTotals = { 107: 497, 108: 511, 109: 525, 110: 385, 111: 378, 112: 385, 113: 392, 114: 385, 115: 252 };
const pastExamChapterMap = {};
content.subjects.forEach(function (subject) {
  subject.chapters.forEach(function (chapter) {
    pastExamChapterMap[chapter.id] = { chapter: chapter, subjectId: subject.id };
  });
});
const pastExamExpectedChapterTotals = {
  // law
  "law-01": 199, "law-02": 226, "law-03": 164, "law-04": 46, "law-05": 29, "law-06": 7,
  "law-07": 20, "law-08": 21, "law-09": 12, "law-10": 15, "law-11": 53, "law-12": 31,
  "law-13": 85, "law-14": 4, "law-15": 9, "law-16": 14, "law-17": 14, "law-18": 15,
  "law-19": 21, "law-20": 9, "law-21": 3,
  // investment
  "investment-01": 4, "investment-02": 14, "investment-03": 92, "investment-04": 107, "investment-05": 98, "investment-06": 21,
  "investment-07": 169, "investment-08": 102, "investment-09": 78, "investment-10": 107, "investment-11": 65, "investment-13": 14,
  "investment-14": 6, "investment-15": 44, "investment-16": 40, "investment-17": 28,
  // accounting
  "accounting-01": 89, "accounting-02": 79, "accounting-03": 109, "accounting-04": 33, "accounting-05": 55, "accounting-06": 82,
  "accounting-07": 50, "accounting-08": 23, "accounting-09": 19, "accounting-10": 56, "accounting-11": 15, "accounting-12": 10,
  "accounting-13": 75, "accounting-14": 8, "accounting-15": 98, "accounting-16": 20, "accounting-17": 33, "accounting-18": 3,
  "accounting-19": 21, "accounting-20": 30, "accounting-21": 11, "accounting-22": 3, "accounting-23": 41,
  // macro
  "macro-01": 52, "macro-02": 78, "macro-03": 43, "macro-04": 70, "macro-05": 128, "macro-06": 30,
  "macro-07": 53, "macro-08": 54, "macro-09": 97, "macro-10": 173, "macro-11": 28, "macro-12": 153,
  "macro-13": 108,
};
const pastExamChapterTotals = {};
const pastExamSessionMap = {};
const pastExamQuestionIds = new Set();
const pastExamQuestionKeys = new Set();
const pastExamSubjectTotals = { law: 0, investment: 0, accounting: 0, macro: 0 };
const pastExamYearTotals = {};
const pastExamSessionSubjectCounts = {};
const pastExamSessionQuestionCounts = {};
const pastExamTextIssues = [];
const pastExamOptionContextIssues = [];

check(pastExamSessions.length === 29, "考古題練習庫應有 29 次考試（目前 " + pastExamSessions.length + " 次）");
check(pastExamQuestions.length === 3710, "考古題練習庫應有 3,710 題（目前 " + pastExamQuestions.length + " 題）");
check(pastExamSubjects.length === 4, "考古題練習庫應有四個專業科目");
check(pastExamSubjects.map(function (subject) { return subject.id; }).join(",") === pastExamSubjectIds.join(","), "考古題科目順序應為 law、investment、accounting、macro");
check(pastExamMeta.sessionCount === 29, "考古題 meta.sessionCount 應為 29");
check(pastExamMeta.questionCount === 3710, "考古題 meta.questionCount 應為 3,710");
check(pastExamMeta.subjectCount === 4, "考古題 meta.subjectCount 應為 4");
check(JSON.stringify(pastExamMeta.years) === JSON.stringify([107, 108, 109, 110, 111, 112, 113, 114, 115]), "考古題年度應為 107–115");

const pastExamExpectedSessionIds = [
  "107Q1", "107Q2", "107Q3", "107Q4",
  "108Q1", "108Q2", "108Q3", "108Q4",
  "109Q1", "109Q2", "109Q3", "109Q4",
  "110Q1", "110Q2", "110Q3",
  "111Q1", "111Q2", "111Q3",
  "112Q1", "112Q2", "112Q3",
  "113Q1", "113Q2", "113Q3",
  "114Q1", "114Q2", "114Q3",
  "115Q1", "115Q2"
];
check(pastExamSessions.map(function (session) { return session.id; }).sort().join(",") === pastExamExpectedSessionIds.slice().sort().join(","), "考古題考試次別應為 107Q1–115Q2 共 29 次");

pastExamSessions.forEach(function (session) {
  check(typeof session.id === "string" && /^\d{3}Q\d$/.test(session.id), "考古題考試次別 ID 格式錯誤：" + session.id);
  check(!pastExamSessionMap[session.id], "考古題考試次別 ID 重複：" + session.id);
  pastExamSessionMap[session.id] = session;
  check(pastExamMeta.years.indexOf(session.year) !== -1, "考古題考試年度不在範圍內：" + session.id);
  check(Number.isInteger(session.session) && session.session >= 1 && session.session <= 4, "考古題考試次別編號錯誤：" + session.id);
  check(typeof session.label === "string" && session.label.length > 0, "考古題考試次別缺少標籤：" + session.id);
  check(typeof session.shortLabel === "string" && session.shortLabel.length > 0, "考古題考試次別缺少短標籤：" + session.id);
  check(typeof session.questionUrl === "string" && session.questionUrl.indexOf("https://") === 0, "考古題試題連結應為 https：" + session.id);
  check(typeof session.answerUrl === "string" && session.answerUrl.indexOf("https://") === 0, "考古題解答連結應為 https：" + session.id);
  check(typeof session.sourceName === "string" && session.sourceName.length > 0, "考古題考試次別缺少來源名稱：" + session.id);
  check(Number.isInteger(session.questionCount) && session.questionCount > 0, "考古題考試次別題數錯誤：" + session.id);
  pastExamSessionSubjectCounts[session.id] = { law: 0, investment: 0, accounting: 0, macro: 0 };
  pastExamSessionQuestionCounts[session.id] = 0;
});

pastExamQuestions.forEach(function (question) {
  check(Boolean(question) && typeof question === "object", "考古題題目資料格式錯誤");
  if (!question) {
    return;
  }
  check(typeof question.id === "string" && question.id.length > 0, "考古題題目缺少 ID");
  check(!pastExamQuestionIds.has(question.id), "考古題題目 ID 重複：" + question.id);
  pastExamQuestionIds.add(question.id);
  const questionKey = question.sessionId + "|" + question.subject + "|" + question.number;
  check(!pastExamQuestionKeys.has(questionKey), "考古題題目重複：" + questionKey);
  pastExamQuestionKeys.add(questionKey);
  const session = pastExamSessionMap[question.sessionId];
  check(Boolean(session), "考古題題目參照不存在的考試次別：" + question.sessionId);
  check(pastExamSubjectIds.indexOf(question.subject) !== -1, "考古題題目科目錯誤：" + question.id);
  const sourceIds = Array.isArray(question.sourceIds) && question.sourceIds.length
    ? Array.from(new Set(question.sourceIds))
    : (question.sourceId ? [question.sourceId] : []);
  check(typeof question.sourceId === "string" && sourceIds.indexOf(question.sourceId) !== -1, "考古題題目主要出處錯誤：" + question.id);
  sourceIds.forEach(function (sourceId) {
    const sourceInfo = pastExamChapterMap[sourceId];
    check(Boolean(sourceInfo) && sourceInfo.subjectId === question.subject, "考古題題目出處錯誤：" + question.id + " / " + sourceId);
    if (sourceInfo) {
      pastExamChapterTotals[sourceId] = (pastExamChapterTotals[sourceId] || 0) + 1;
    }
  });
  const sourceRefs = Array.isArray(question.sourceRefs) ? question.sourceRefs : [];
  check(sourceRefs.length === sourceIds.length, "考古題題目節次出處數量錯誤：" + question.id);
  check(JSON.stringify(sourceRefs.map(function (ref) { return ref.chapterId; }).sort()) === JSON.stringify(sourceIds.slice().sort()), "考古題題目章節與節次出處不一致：" + question.id);
  sourceRefs.forEach(function (ref) {
    const refInfo = pastExamChapterMap[ref.chapterId];
    check(Boolean(refInfo) && refInfo.subjectId === question.subject && Number.isInteger(ref.sectionIndex) && ref.sectionIndex >= 1 && ref.sectionIndex <= refInfo.chapter.sections.length, "考古題題目節次出處錯誤：" + question.id + " / " + ref.chapterId + "#" + ref.sectionIndex);
  });
  check(Number.isInteger(question.number) && question.number >= 1, "考古題題號錯誤：" + question.id);
  if (session) {
    check(question.year === session.year && question.session === session.session, "考古題題目的年度／次別與考試次別不一致：" + question.id);
  }
  check(typeof question.stem === "string" && question.stem.trim().length > 0, "考古題題幹為空：" + question.id);
  check(Array.isArray(question.options) && question.options.length === 4, "考古題選項應為四個：" + question.id);
  check(Array.isArray(question.answer) && question.answer.length >= 1 && question.answer.length <= 4, "考古題答案數量錯誤：" + question.id);
  if (Array.isArray(question.answer)) {
    check(new Set(question.answer).size === question.answer.length, "考古題答案不得重複：" + question.id);
    check(question.answer.every(function (letter) { return /^[A-D]$/.test(letter); }), "考古題答案字母錯誤：" + question.id);
  }
  if (Array.isArray(question.options)) {
    check(question.options.every(function (option) { return typeof option === "string" && option.trim().length > 0; }), "考古題選項不得為空：" + question.id);
    const optionText = question.options.join(" ");
    if (/依下列(?:資訊|資料)|(?:試|請)回答第\s*\d+|如下表所示|題組：|題為題組|請續背面作答/.test(optionText)) {
      pastExamOptionContextIssues.push(question.id);
    }
  }
  const text = String(question.stem || "") + " " + (Array.isArray(question.options) ? question.options.join(" ") : "");
  if (/請填應試號碼|專業科目|測驗試題|※\s*注意|請翻頁|請續背面作答|題組：|題為題組/.test(text)) {
    pastExamTextIssues.push(question.id);
  }
  if (session && pastExamSessionSubjectCounts[question.sessionId]) {
    pastExamSessionSubjectCounts[question.sessionId][question.subject] += 1;
    pastExamSessionQuestionCounts[question.sessionId] += 1;
  }
  if (pastExamSubjectIds.indexOf(question.subject) !== -1) {
    pastExamSubjectTotals[question.subject] += 1;
  }
  pastExamYearTotals[question.year] = (pastExamYearTotals[question.year] || 0) + 1;
});

check(pastExamTextIssues.length === 0, "考古題題幹或選項殘留頁首頁尾：" + pastExamTextIssues.join("、"));
check(pastExamOptionContextIssues.length === 0, "考古題選項不應包含共享題組說明：" + pastExamOptionContextIssues.join("、"));

pastExamSessions.forEach(function (session) {
  check(session.questionCount === pastExamSessionQuestionCounts[session.id], "考古題考試次別題數與題目數不一致：" + session.id);
  pastExamSubjectIds.forEach(function (subjectId) {
    check(session.counts && session.counts[subjectId] === pastExamSessionSubjectCounts[session.id][subjectId], "考古題科目題數不一致：" + session.id + " / " + subjectId);
    const numbers = pastExamQuestions.filter(function (question) {
      return question.sessionId === session.id && question.subject === subjectId;
    }).map(function (question) {
      return question.number;
    }).sort(function (a, b) { return a - b; });
    check(numbers.length === pastExamSessionSubjectCounts[session.id][subjectId], "考古題科目題目數量錯誤：" + session.id + " / " + subjectId);
    check(numbers.every(function (number, index) { return number === index + 1; }), "考古題題號應從 1 連續編號：" + session.id + " / " + subjectId);
  });
});

pastExamSubjectIds.forEach(function (subjectId) {
  check(pastExamSubjectTotals[subjectId] === pastExamExpectedSubjectTotals[subjectId], "考古題科目總題數錯誤：" + subjectId + "（" + pastExamSubjectTotals[subjectId] + "）");
});
Object.keys(pastExamExpectedYearTotals).forEach(function (year) {
  check(pastExamYearTotals[year] === pastExamExpectedYearTotals[year], "考古題年度總題數錯誤：" + year + "（" + pastExamYearTotals[year] + "）");
});
Object.keys(pastExamExpectedChapterTotals).forEach(function (chapterId) {
  check(pastExamChapterTotals[chapterId] === pastExamExpectedChapterTotals[chapterId], "考古題章節出處題數錯誤：" + chapterId + "（" + (pastExamChapterTotals[chapterId] || 0) + "）");
});

[
  ["108Q3-law-28", ["C", "D"]],
  ["108Q3-accounting-28", ["B", "D"]],
  ["109Q1-law-30", ["B", "D"]],
  ["112Q3-investment-16", ["A", "B", "C", "D"]],
  ["112Q3-accounting-15", ["A", "B", "C", "D"]],
  ["114Q1-macro-14", ["B", "C"]]
].forEach(function (entry) {
  const question = pastExamQuestions.find(function (item) { return item.id === entry[0]; });
  check(Boolean(question), "考古題特殊答案題目不存在：" + entry[0]);
  if (question) {
    check(JSON.stringify(question.answer) === JSON.stringify(entry[1]), "考古題特殊答案錯誤：" + entry[0] + "（" + question.answer.join(",") + "）");
  }
});

[
  {
    source: "107Q4-investment-11",
    sourceNeedles: ["依下列資訊"],
    targets: [
      "107Q4-investment-12", "107Q4-investment-13", "107Q4-investment-14", "107Q4-investment-15",
      "107Q4-investment-16", "107Q4-investment-17", "107Q4-investment-18", "107Q4-investment-19"
    ],
    targetNeedles: ["張先生", "Corr(X, Y) = 0.6", "資本市場線(CML)"]
  },
  {
    source: "109Q4-investment-11",
    sourceNeedles: ["依下列資訊"],
    targets: ["109Q4-investment-12", "109Q4-investment-13"],
    targetNeedles: ["如下表所示", "繁榮", "蕭條"]
  },
  {
    source: "114Q1-investment-04",
    sourceNeedles: ["依據下列"],
    targets: ["114Q1-investment-05", "114Q1-investment-06", "114Q1-investment-07"],
    targetNeedles: ["經濟情境", "繁榮", "蕭條"]
  },
  {
    source: "115Q2-investment-11",
    sourceNeedles: ["依據下列"],
    targets: ["115Q2-investment-12", "115Q2-investment-13", "115Q2-investment-14", "115Q2-investment-15"],
    targetNeedles: ["完美的債券市場", "甲債券", "乙債券"]
  }
].forEach(function (group) {
  const source = pastExamQuestions.find(function (item) { return item.id === group.source; });
  check(Boolean(source), "考古題共享題組來源題目不存在：" + group.source);
  if (source) {
    check(group.sourceNeedles.every(function (needle) {
      return source.options.every(function (option) { return option.indexOf(needle) === -1; });
    }), "考古題共享題組說明不應留在前一個選項：" + group.source);
  }
  group.targets.forEach(function (questionId) {
    const question = pastExamQuestions.find(function (item) { return item.id === questionId; });
    check(Boolean(question), "考古題共享題組題目不存在：" + questionId);
    if (question) {
      check(group.targetNeedles.every(function (needle) { return question.stem.indexOf(needle) !== -1; }), "考古題共享題組資料未附在題幹：" + questionId);
    }
  });
});

["115Q1", "115Q2"].forEach(function (sessionId) {
  const session = pastExamSessionMap[sessionId];
  check(Boolean(session), "考古題缺少 115 年官方試題次別：" + sessionId);
  if (session) {
    check(session.questionUrl.indexOf("https://examweb.sfi.org.tw/Download/") === 0, "115 年試題應連到證基會官方檔案：" + sessionId);
    check(session.answerUrl.indexOf("https://examweb.sfi.org.tw/Download/") === 0, "115 年解答應連到證基會官方檔案：" + sessionId);
  }
});
pastExamSessions.filter(function (session) { return session.year < 115; }).forEach(function (session) {
  check(session.questionUrl.indexOf("https://lidapon.azurewebsites.net/files/E1/") === 0, "107–114 年試題應連到公開鏡像：" + session.id);
});
pastExamSessions.filter(function (session) { return session.year === 107 || session.year === 108; }).forEach(function (session) {
  check(session.answerUrl.indexOf("https://www.gocharter.com.tw/csia/image/CSIA_") === 0, "107–108 年解答應連到公開文字版 PDF：" + session.id);
});

// 繁體中文守門：只列出不易與臺灣繁體用字混淆的簡體字。
// 英文仍可保留得主姓名、專有名詞、公式符號與國際通用縮寫。
const simplifiedGuard = /[国经济与为这说时间发现实体关风险资产负债银货币财税价额总结构变动边际弹预竞争垄断规报劳厂产业销费储贷汇数据统计图关键词页导设题复习资会计学务项响丰验检测试评类并对认确监审称损换据数权条来极样档检楼历残毕气汉济温湾满热爱状独狭获环齐长门问间闻队阳阴际随隐难顶顺须飞饭饮马鱼鸟鸡鸭鹰麦黄龙车转轮软轻载较辅辆输边达过运进远违连迟选递遗逻]/g;
const languageSurface = [
  JSON.stringify(content),
  JSON.stringify(diagrams),
  JSON.stringify(investmentDiagrams),
  JSON.stringify(accountingDiagrams),
  JSON.stringify(nobelData),
  JSON.stringify(nobelDiagrams),
  JSON.stringify(macroEvolution),
  read("site/assets/content-macro-evolution.js"),
  read("site/index.html"),
  read("site/assets/app.js"),
  read("site/assets/content-past-exams.js"),
  read("site/assets/content-past-exams-written.js"),
  read("site/assets/content-macro-current.js"),
  JSON.stringify(pastExams),
  JSON.stringify(pastWritten),
  JSON.stringify(examSolutions),
  JSON.stringify(macroCurrent),
  read("site/README.md"),
  read("site/SOURCES.md"),
  read("documents/content_review_checklist.md")
].join("\n");
const simplifiedMatches = Array.from(new Set(languageSurface.match(simplifiedGuard) || []));
check(simplifiedMatches.length === 0, "全站中文不得含簡體字，發現：" + simplifiedMatches.join("、"));

/* 計算／申論題與近二年總經時事 */
const writtenQuestions = Array.isArray(pastWritten.questions) ? pastWritten.questions : [];
const writtenMeta = pastWritten.meta || {};
const writtenSessionMap = {};
const writtenIds = new Set();
const writtenGroupCounts = {};
check(writtenQuestions.length === 348, "計算／申論題應有 348 題（目前 " + writtenQuestions.length + " 題）");
check(writtenMeta.sessionCount === 29, "計算／申論題 meta.sessionCount 應為 29");
check(writtenMeta.questionCount === 348, "計算／申論題 meta.questionCount 應為 348");
check(JSON.stringify(writtenMeta.years) === JSON.stringify([107, 108, 109, 110, 111, 112, 113, 114, 115]), "計算／申論題年度應為 107–115");
writtenQuestions.forEach(function (question) {
  check(Boolean(question) && typeof question === "object", "計算／申論題資料格式錯誤");
  if (!question) {
    return;
  }
  check(typeof question.id === "string" && question.id.length > 0, "計算／申論題缺少 ID");
  check(!writtenIds.has(question.id), "計算／申論題 ID 重複：" + question.id);
  writtenIds.add(question.id);
  const session = pastExamSessionMap[question.sessionId];
  check(Boolean(session), "計算／申論題參照不存在的考試次別：" + question.sessionId);
  check(pastExamSubjectIds.indexOf(question.subject) !== -1, "計算／申論題科目錯誤：" + question.id);
  check(Number.isInteger(question.number) && question.number >= 1 && question.number <= 3, "計算／申論題題號錯誤：" + question.id);
  check(typeof question.stem === "string" && question.stem.trim().length > 0, "計算／申論題題幹為空：" + question.id);
  check(Array.isArray(question.answer) && question.answer.length > 0 && question.answer.every(function (text) { return typeof text === "string" && text.trim().length > 0; }), "計算／申論題缺少參考解答：" + question.id);
  check(Array.isArray(question.sourceIds) && question.sourceIds.length > 0, "計算／申論題缺少出處：" + question.id);
  if (Array.isArray(question.sourceIds)) {
    question.sourceIds.forEach(function (chapterId) {
      const sourceInfo = pastExamChapterMap[chapterId];
      check(Boolean(sourceInfo) && sourceInfo.subjectId === question.subject, "計算／申論題出處錯誤：" + question.id + " / " + chapterId);
    });
  }
  if (session) {
    check(question.year === session.year && question.session === session.session, "計算／申論題年度／次別不一致：" + question.id);
  }
  const groupKey = question.sessionId + "|" + question.subject;
  writtenGroupCounts[groupKey] = (writtenGroupCounts[groupKey] || 0) + 1;
});
pastExamSessions.forEach(function (session) {
  const sessionId = session.id;
  pastExamSubjectIds.forEach(function (subjectId) {
    check(writtenGroupCounts[sessionId + "|" + subjectId] === 3, "計算／申論題每科每次應有 3 題：" + sessionId + " / " + subjectId);
  });
});

/* 年度考古題解題資料 */
const allExamQuestionMap = new Map();
pastExamQuestions.forEach(function (question) {
  allExamQuestionMap.set(question.id, question);
});
writtenQuestions.forEach(function (question) {
  allExamQuestionMap.set(question.id, question);
});
const solutionBatches = Array.isArray(examSolutions) ? examSolutions : [];
const solutionSectionKeys = new Set();
const solutionQuestionIds = new Set();
const solutionBatchStats = {};
const solutionYears = new Set();
check(solutionBatches.length >= 1, "考古題解題資料應至少有一個年度批次");
solutionBatches.forEach(function (batch) {
  check(Boolean(batch) && typeof batch === "object", "考古題解題批次格式錯誤");
  if (!batch) {
    return;
  }
  check(Number.isInteger(batch.year) && batch.year >= 107 && batch.year <= 115, "考古題解題批次年度錯誤：" + batch.year);
  check(typeof batch.label === "string" && batch.label.length > 0, "考古題解題批次缺少年度標籤：" + batch.year);
  check(!solutionYears.has(batch.year), "考古題解題年度批次重複：" + batch.year);
  solutionYears.add(batch.year);
  check(Boolean(batch.sections) && typeof batch.sections === "object" && !Array.isArray(batch.sections), "考古題解題批次缺少章節資料：" + batch.year);
  const batchStats = { sections: 0, examples: 0 };
  solutionBatchStats[batch.year] = batchStats;
  Object.keys(batch.sections || {}).forEach(function (sectionKey) {
    const match = sectionKey.match(/^([a-z]+-\d+)::(\d+)$/);
    check(Boolean(match), "考古題解題章節鍵格式錯誤：" + sectionKey);
    if (!match) {
      return;
    }
    const chapterId = match[1];
    const sectionIndex = Number(match[2]);
    const sourceInfo = pastExamChapterMap[chapterId];
    check(Boolean(sourceInfo), "考古題解題章節不存在：" + sectionKey);
    if (sourceInfo) {
      check(sectionIndex >= 1 && sectionIndex <= sourceInfo.chapter.sections.length, "考古題解題節次不存在：" + sectionKey);
    }
    check(!solutionSectionKeys.has(batch.year + "|" + sectionKey), "考古題解題章節重複：" + batch.year + " / " + sectionKey);
    solutionSectionKeys.add(batch.year + "|" + sectionKey);
    batchStats.sections += 1;
    const solution = batch.sections[sectionKey];
    check(Boolean(solution) && typeof solution === "object", "考古題解題章節內容格式錯誤：" + sectionKey);
    if (!solution) {
      return;
    }
    check(typeof solution.focus === "string" && solution.focus.trim().length > 0, "考古題解題缺少章節重點：" + sectionKey);
    check(Array.isArray(solution.strategies) && solution.strategies.length > 0 && solution.strategies.every(function (text) {
      return typeof text === "string" && text.trim().length > 0;
    }), "考古題解題缺少解題策略：" + sectionKey);
    check(Array.isArray(solution.examples) && solution.examples.length > 0, "考古題解題缺少例題：" + sectionKey);
    (Array.isArray(solution.examples) ? solution.examples : []).forEach(function (example, index) {
      const label = sectionKey + " 例題 " + (index + 1);
      check(Boolean(example) && typeof example === "object", "考古題例題格式錯誤：" + label);
      if (!example) {
        return;
      }
      check(typeof example.questionId === "string" && example.questionId.length > 0, "考古題例題缺少題目 ID：" + label);
      const question = allExamQuestionMap.get(example.questionId);
      check(Boolean(question), "考古題例題參照不存在的題目：" + example.questionId);
      check(!solutionQuestionIds.has(example.questionId), "考古題例題重複引用：" + example.questionId);
      solutionQuestionIds.add(example.questionId);
      batchStats.examples += 1;
      check(Array.isArray(example.steps) && example.steps.length >= 2 && example.steps.length <= 6 && example.steps.every(function (text) {
        return typeof text === "string" && text.trim().length > 0;
      }), "考古題例題解題步驟應為 2–6 條：" + example.questionId);
      check(typeof example.takeaway === "string" && example.takeaway.trim().length > 0, "考古題例題缺少帶走一句：" + example.questionId);
      if (example.trap !== undefined) {
        check(typeof example.trap === "string" && example.trap.trim().length > 0, "考古題例題易錯點格式錯誤：" + example.questionId);
      }
      if (question && sourceInfo) {
        check(question.subject === sourceInfo.subjectId, "考古題例題科目與章節不一致：" + example.questionId);
        const questionSourceIds = Array.isArray(question.sourceIds) ? question.sourceIds : [];
        const questionSourceRefs = Array.isArray(question.sourceRefs) ? question.sourceRefs : [];
        const belongsToChapter = questionSourceIds.indexOf(chapterId) !== -1 || questionSourceRefs.some(function (ref) {
          return ref.chapterId === chapterId;
        });
        check(belongsToChapter, "考古題例題章節歸屬錯誤：" + example.questionId + " / " + sectionKey);
      }
    });
  });
});
const solutionExpectedByYear = {
  115: { sections: 81, examples: 142, written: 24 },
  114: { sections: 47, examples: 83, written: 36 },
  113: { sections: 32, examples: 52, written: 36 },
  112: { sections: 35, examples: 48, written: 36 },
  111: { sections: 27, examples: 48, written: 36 },
  110: { sections: 29, examples: 48, written: 36 },
  109: { sections: 33, examples: 60, written: 48 },
  108: { sections: 30, examples: 60, written: 48 },
  107: { sections: 33, examples: 60, written: 48 }
};
Object.keys(solutionExpectedByYear).forEach(function (year) {
  const expected = solutionExpectedByYear[year];
  const stats = solutionBatchStats[year] || { sections: 0, examples: 0 };
  check(stats.sections === expected.sections, year + " 年解題資料應有 " + expected.sections + " 個章節／節次（目前 " + stats.sections + " 個）");
  check(stats.examples === expected.examples, year + " 年解題資料應有 " + expected.examples + " 個例題（目前 " + stats.examples + " 個）");
  const yearWritten = writtenQuestions.filter(function (question) { return question.year === Number(year); });
  check(yearWritten.length === expected.written, year + " 年計算／申論題應有 " + expected.written + " 題（目前 " + yearWritten.length + " 題）");
  yearWritten.forEach(function (question) {
    check(solutionQuestionIds.has(question.id), year + " 年計算／申論題未收錄解題：" + question.id);
  });
});

const currentEvents = Array.isArray(macroCurrent.events) ? macroCurrent.events : [];
const currentEventIds = new Set();
check(currentEvents.length >= 8, "總經時事應至少有 8 個主題（目前 " + currentEvents.length + " 個）");
currentEvents.forEach(function (event) {
  check(Boolean(event) && typeof event === "object", "總經時事資料格式錯誤");
  if (!event) {
    return;
  }
  check(typeof event.id === "string" && event.id.length > 0, "總經時事缺少 ID");
  check(!currentEventIds.has(event.id), "總經時事 ID 重複：" + event.id);
  currentEventIds.add(event.id);
  check(typeof event.title === "string" && event.title.trim().length > 0, "總經時事缺少標題：" + event.id);
  check(Array.isArray(event.summary) && event.summary.length > 0, "總經時事缺少摘要：" + event.id);
  check(Array.isArray(event.points) && event.points.length > 0, "總經時事缺少考試重點：" + event.id);
  check(Array.isArray(event.sourceIds) && event.sourceIds.length > 0, "總經時事缺少出處：" + event.id);
  if (Array.isArray(event.sourceIds)) {
    event.sourceIds.forEach(function (chapterId) {
      const sourceInfo = pastExamChapterMap[chapterId];
      check(Boolean(sourceInfo) && sourceInfo.subjectId === "macro", "總經時事出處錯誤：" + event.id + " / " + chapterId);
    });
  }
});
pastExamQuestions.forEach(function (question) {
  if (question.eventId) {
    check(currentEventIds.has(question.eventId), "考古題時事出處不存在：" + question.id + " / " + question.eventId);
  }
});
writtenQuestions.forEach(function (question) {
  if (question.eventId) {
    check(currentEventIds.has(question.eventId), "計算／申論題時事出處不存在：" + question.id + " / " + question.eventId);
  }
});

console.log("科目：" + content.subjects.length);
console.log("章節：" + allChapters.length + "（總體經濟學 " + macro.chapters.length + "、投資學 " + investment.chapters.length + "、會計學 " + accounting.chapters.length + "、證券法規 " + law.chapters.length + "）");
console.log("學習單元：" + totalSections + "（總體經濟學 " + macroSections + " 節、投資學 " + investmentSections + " 個重點、會計學 " + accountingSections + " 個單元、證券法規 " + lawSections + " 節）");
console.log("名詞卡：" + totalTerms);
console.log("章節圖：" + diagramKeys.length + "（總體經濟學；含 1 張教學流程圖）");
console.log("教學圖：" + (investmentDiagramKeys.length + accountingDiagramKeys.length) + "（投資學 " + investmentDiagramKeys.length + "、會計學 " + accountingDiagramKeys.length + "）");
console.log("諾貝爾年表：" + nobelRows.length + " 屆、 " + nobelDiagramKeys.length + " 組模型圖");
console.log("學派演進圖：" + evolutionStages.length + " 個階段、 " + evolutionNodes.length + " 個節點、 " + evolutionModelLinkCount + " 個模型連結、 " + evolutionNobelYears.size + " 個諾貝爾里程碑");
console.log("資料來源：" + content.sources.length);
console.log("法規條文：" + lawOfficialArticleCount + "（官方 " + lawOfficialSources + " 部；" + lawOfficialPages + " 頁全文、" + lawExternalPages + " 頁連結摘要）");
console.log("KaTeX 公式：" + formulaSections.length + " 個學習單元（" + formulaTexKeys.length + " 筆資料）");
console.log("考古題：" + pastExamSessions.length + " 次、 " + pastExamQuestions.length + " 題（107–115 年）");
console.log("計算／申論題：" + writtenQuestions.length + " 題（107–115 年）");
console.log("總經時事：" + currentEvents.length + " 個主題");
console.log("檢查項目：" + checks.length + "，失敗：" + failures.length);

if (failures.length > 0) {
  console.error("\n驗證失敗：");
  failures.forEach(function (failure) {
    console.error("- " + failure);
  });
  process.exit(1);
}

console.log("驗證通過：總體經濟學第 1–2 篇（13 章、50 節）、投資學第 1–5 篇（16 章、52 個重點）、會計學（23 章、41 個具名節次與 23 個補充學習重點）、證券法規（21 章、21 節、1,507 條官方全文）、" + (diagramKeys.length + investmentDiagramKeys.length + accountingDiagramKeys.length) + " 張章節教學圖（總體 " + diagramKeys.length + "、投資 " + investmentDiagramKeys.length + "、會計 " + accountingDiagramKeys.length + "）、118 個 KaTeX 公式、諾貝爾年表（1969–2026）與 107–115 年 3,710 題考古題練習庫結構一致。");
