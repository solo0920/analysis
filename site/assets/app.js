/* =========================================================
   分析師備考站 — hash router, search, progress, theme
   No build step, no dependencies.
   ========================================================= */

(function () {
  "use strict";

  let content = window.EXAM_CONTENT;
  let diagrams = {};
  let nobelData = window.NOBEL_DATA || { meta: {}, groups: [], rows: [] };
  let nobelDiagrams = window.NOBEL_DIAGRAMS || {};
  let macroEvolution = window.MACRO_EVOLUTION || { meta: {}, stages: [] };
  let practiceData = window.PAST_EXAMS || { meta: {}, subjects: [], sessions: [], questions: [] };
  let writtenData = window.PAST_EXAMS_WRITTEN || { meta: {}, questions: [] };
  let writtenLayouts = window.WRITTEN_LAYOUTS || {};
  let macroCurrentData = window.MACRO_CURRENT_EVENTS || { meta: {}, events: [] };
  let forecastData = window.EXAM_FORECAST || { meta: {}, directions: [], questions: [], integrated: [], formulas: { macro: [], investment: [], accounting: [], law: [] }, sensitivity: null, indicators: [], strategy: [] };
  let forecastAnswers = window.EXAM_FORECAST_ANSWERS || {};
  let practiceSubjects = [];
  let practiceSessions = [];
  let practiceQuestions = [];
  let writtenQuestions = [];
  let examSolutionBatches = [];
  let macroCurrentEvents = [];
  let pastExamStats = null;

  const forecastLegacyQuestionMap = new Map();
  const examSolutionSectionMap = new Map();
  const examQuestionMap = new Map();
  const macroCurrentEventMap = new Map();
  const practiceSessionMap = new Map();
  const practiceSubjectMap = new Map();
  const practiceChapterStats = new Map();
  const practiceSectionQuestions = new Map();
  const practiceSubjectQuestionTotals = new Map();
  const writtenQuestionMap = new Map();
  const writtenChapterStats = new Map();
  const writtenSectionQuestions = new Map();
  const writtenSubjectQuestionTotals = new Map();

  const main = document.getElementById("main");
  const header = document.querySelector(".site-header");
  const readingProgress = document.getElementById("reading-progress");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  const subjectMap = new Map();
  const chapterMap = new Map();
  const allChapters = [];
  const sourceMap = new Map();
  let totalSections = 0;
  let totalTerms = 0;

  function currentChapterId() {
    const parts = (location.hash || "").replace(/^#/, "").split("?")[0].split("/").filter(Boolean);
    return parts[0] === "chapter" ? (parts[1] || "") : "";
  }

  function resolveWrittenData() {
    const direct = window.PAST_EXAMS_WRITTEN;
    if (direct && Array.isArray(direct.questions) && direct.questions.length > 100) {
      window.PAST_EXAMS_WRITTEN_FULL = direct;
      return direct;
    }
    if (window.PAST_EXAMS_WRITTEN_FULL) return window.PAST_EXAMS_WRITTEN_FULL;
    return direct || { meta: {}, questions: [] };
  }

  function resolvePracticeData() {
    const direct = window.PAST_EXAMS;
    if (direct && Array.isArray(direct.questions) && direct.questions.length > 1000) {
      window.PAST_EXAMS_FULL = direct;
      return direct;
    }
    if (window.PAST_EXAMS_FULL) return window.PAST_EXAMS_FULL;
    const bundles = window.PAST_EXAMS_YEAR_BUNDLES || {};
    const keys = Object.keys(bundles);
    if (!keys.length) return direct || { meta: {}, subjects: [], sessions: [], questions: [] };
    const subjects = [];
    const sessions = [];
    const questions = [];
    const subjectSeen = new Set();
    const sessionSeen = new Set();
    const questionSeen = new Set();
    keys.sort().forEach(function (key) {
      const bundle = bundles[key] || {};
      (bundle.subjects || []).forEach(function (subject) {
        if (subjectSeen.has(subject.id)) return;
        subjectSeen.add(subject.id);
        subjects.push(subject);
      });
      (bundle.sessions || []).forEach(function (session) {
        if (sessionSeen.has(session.id)) return;
        sessionSeen.add(session.id);
        sessions.push(session);
      });
      (bundle.questions || []).forEach(function (question) {
        if (questionSeen.has(question.id)) return;
        questionSeen.add(question.id);
        questions.push(question);
      });
    });
    return {
      meta: (bundles[keys[0]] || {}).meta || {},
      subjects: subjects,
      sessions: sessions,
      questions: questions
    };
  }

  function hydrateData() {
    content = window.EXAM_CONTENT;
    diagrams = Object.assign(
      {},
      window.MACRO_DIAGRAMS || {},
      window.INVESTMENT_DIAGRAMS || {},
      window.ACCOUNTING_DIAGRAMS || {}
    );
    const mermaidDiagrams = window.MERMAID_DIAGRAMS || {};
    const mermaidStaticSvgs = window.MERMAID_STATIC_SVGS || {};
    const mermaidRelated = window.MERMAID_RELATED || {};
    Object.keys(mermaidDiagrams).forEach(function (key) {
      const entry = mermaidDiagrams[key];
      if (!diagrams[key] && entry.createDiagram) {
        diagrams[key] = {
          sectionTitle: entry.sectionTitle || "",
          kicker: entry.kicker || "Mermaid 推導圖",
          title: entry.title || entry.shortTitle || key,
          caption: entry.caption || entry.note || "",
          svg: mermaidStaticSvgs[key] || "",
          svgIsMermaid: true,
          variables: entry.variables || [],
          parameters: entry.parameters || [],
          note: entry.note || ""
        };
      }
      if (diagrams[key]) {
        diagrams[key].mermaid = entry;
      }
    });
    Object.keys(mermaidRelated).forEach(function (key) {
      if (diagrams[key]) {
        diagrams[key].related = mermaidRelated[key];
      }
    });
    nobelData = window.NOBEL_DATA || { meta: {}, groups: [], rows: [] };
    nobelDiagrams = window.NOBEL_DIAGRAMS || {};
    macroEvolution = window.MACRO_EVOLUTION || { meta: {}, stages: [] };
    const chapterId = currentChapterId();
    const chapterData = chapterId && window.CHAPTER_DATA ? window.CHAPTER_DATA[chapterId] : null;
    practiceData = chapterData && chapterData.past ? chapterData.past : resolvePracticeData();
    writtenData = chapterData && chapterData.written ? chapterData.written : resolveWrittenData();
    writtenLayouts = window.WRITTEN_LAYOUTS || {};
    macroCurrentData = window.MACRO_CURRENT_EVENTS || { meta: {}, events: [] };
    forecastData = window.EXAM_FORECAST || { meta: {}, directions: [], questions: [], integrated: [], formulas: { macro: [], investment: [], accounting: [], law: [] }, sensitivity: null, indicators: [], strategy: [] };
    forecastAnswers = window.EXAM_FORECAST_ANSWERS || {};
    practiceSubjects = Array.isArray(practiceData.subjects) ? practiceData.subjects : [];
    practiceSessions = Array.isArray(practiceData.sessions) ? practiceData.sessions : [];
    practiceQuestions = Array.isArray(practiceData.questions) ? practiceData.questions : [];
    writtenQuestions = Array.isArray(writtenData.questions) ? writtenData.questions : [];
    examSolutionBatches = chapterData && Array.isArray(chapterData.solutions)
      ? chapterData.solutions
      : (Array.isArray(window.EXAM_SOLUTIONS) ? window.EXAM_SOLUTIONS : []);
    macroCurrentEvents = Array.isArray(macroCurrentData.events) ? macroCurrentData.events : [];
    pastExamStats = window.PAST_EXAM_STATS || null;

    forecastLegacyQuestionMap.clear();
    examSolutionSectionMap.clear();
    examQuestionMap.clear();
    macroCurrentEventMap.clear();
    practiceSessionMap.clear();
    practiceSubjectMap.clear();
    practiceChapterStats.clear();
    practiceSectionQuestions.clear();
    practiceSubjectQuestionTotals.clear();
    writtenQuestionMap.clear();
    writtenChapterStats.clear();
    writtenSectionQuestions.clear();
    writtenSubjectQuestionTotals.clear();
    subjectMap.clear();
    chapterMap.clear();
    allChapters.length = 0;
    sourceMap.clear();

    (forecastData.questions || []).forEach(function (question) {
      (question.legacyIds || [question.id]).forEach(function (legacyId) {
        forecastLegacyQuestionMap.set(legacyId, question.id);
      });
    });

    macroCurrentEvents.forEach(function (event) {
      macroCurrentEventMap.set(event.id, event);
    });
    practiceSessions.forEach(function (session) {
      practiceSessionMap.set(session.id, session);
    });
    practiceSubjects.forEach(function (subject) {
      practiceSubjectMap.set(subject.id, subject);
    });
    practiceQuestions.forEach(function (question) {
      const subjectId = question.subject;
      practiceSubjectQuestionTotals.set(subjectId, (practiceSubjectQuestionTotals.get(subjectId) || 0) + 1);
      const sourceIds = Array.isArray(question.sourceIds) && question.sourceIds.length
        ? Array.from(new Set(question.sourceIds))
        : (question.sourceId ? [question.sourceId] : []);
      const sourceRefs = Array.isArray(question.sourceRefs) && question.sourceRefs.length
        ? question.sourceRefs
        : sourceIds.map(function (sourceId) { return { chapterId: sourceId, sectionIndex: 1 }; });
      sourceRefs.forEach(function (ref) {
        let stats = practiceChapterStats.get(ref.chapterId);
        if (!stats) {
          stats = { count: 0, sessions: new Map() };
          practiceChapterStats.set(ref.chapterId, stats);
        }
        stats.count += 1;
        stats.sessions.set(question.sessionId, (stats.sessions.get(question.sessionId) || 0) + 1);
        const sectionKey = ref.chapterId + "#" + ref.sectionIndex;
        if (!practiceSectionQuestions.has(sectionKey)) {
          practiceSectionQuestions.set(sectionKey, []);
        }
        practiceSectionQuestions.get(sectionKey).push(question);
      });
    });
    writtenQuestions.forEach(function (question) {
      examQuestionMap.set(question.id, question);
      writtenQuestionMap.set(question.id, question);
      writtenSubjectQuestionTotals.set(question.subject, (writtenSubjectQuestionTotals.get(question.subject) || 0) + 1);
      const sourceIds = Array.isArray(question.sourceIds) && question.sourceIds.length
        ? Array.from(new Set(question.sourceIds))
        : (question.sourceId ? [question.sourceId] : []);
      sourceIds.forEach(function (chapterId) {
        let stats = writtenChapterStats.get(chapterId);
        if (!stats) {
          stats = { count: 0, sessions: new Map() };
          writtenChapterStats.set(chapterId, stats);
        }
        stats.count += 1;
        stats.sessions.set(question.sessionId, (stats.sessions.get(question.sessionId) || 0) + 1);
      });
    });
    practiceQuestions.forEach(function (question) {
      examQuestionMap.set(question.id, question);
    });
    if (pastExamStats && pastExamStats.practice) {
      Object.keys(pastExamStats.practice.subjects || {}).forEach(function (subjectId) {
        practiceSubjectQuestionTotals.set(subjectId, pastExamStats.practice.subjects[subjectId]);
      });
      if (!practiceQuestions.length) {
        Object.keys(pastExamStats.practice.chapters || {}).forEach(function (chapterId) {
          const stats = pastExamStats.practice.chapters[chapterId];
          practiceChapterStats.set(chapterId, {
            count: stats.count || 0,
            sessions: new Map(Object.keys(stats.sessions || {}).map(function (sessionId) { return [sessionId, stats.sessions[sessionId]]; }))
          });
        });
      }
    }
    if (pastExamStats && pastExamStats.written) {
      Object.keys(pastExamStats.written.subjects || {}).forEach(function (subjectId) {
        writtenSubjectQuestionTotals.set(subjectId, pastExamStats.written.subjects[subjectId]);
      });
      if (!writtenQuestions.length) {
        Object.keys(pastExamStats.written.chapters || {}).forEach(function (chapterId) {
          const stats = pastExamStats.written.chapters[chapterId];
          writtenChapterStats.set(chapterId, {
            count: stats.count || 0,
            sessions: new Map(Object.keys(stats.sessions || {}).map(function (sessionId) { return [sessionId, stats.sessions[sessionId]]; }))
          });
        });
      }
    }
    examSolutionBatches.forEach(function (batch) {
      const sections = batch && batch.sections ? batch.sections : {};
      Object.keys(sections).forEach(function (sectionKey) {
        const source = sections[sectionKey] || {};
        let entry = examSolutionSectionMap.get(sectionKey);
        if (!entry) {
          entry = { focus: "", strategies: [], examples: [] };
          examSolutionSectionMap.set(sectionKey, entry);
        }
        if (!entry.focus && source.focus) {
          entry.focus = source.focus;
        }
        if (Array.isArray(source.strategies)) {
          source.strategies.forEach(function (strategy) {
            if (entry.strategies.indexOf(strategy) === -1) {
              entry.strategies.push(strategy);
            }
          });
        }
        if (Array.isArray(source.examples)) {
          source.examples.forEach(function (example) {
            entry.examples.push(Object.assign({}, example, {
              year: example.year || batch.year
            }));
          });
        }
      });
    });
    examSolutionSectionMap.forEach(function (entry, sectionKey) {
      const normalizedKey = sectionKey.replace("::", "#");
      entry.examples.forEach(function (example) {
        const question = writtenQuestionMap.get(example.questionId);
        if (!question) {
          return;
        }
        const list = writtenSectionQuestions.get(normalizedKey) || [];
        if (list.some(function (item) { return item.id === question.id; })) {
          return;
        }
        list.push(question);
        writtenSectionQuestions.set(normalizedKey, list);
      });
    });

    if (content && Array.isArray(content.subjects)) {
      content.subjects.forEach(function (subject) {
        subject.chapters.forEach(function (chapter, index) {
          chapter.subjectId = subject.id;
          chapter.subjectName = subject.name;
          chapter.subjectClass = subject.colorClass;
          chapter.indexInSubject = index;
          chapter.prevId = index > 0 ? subject.chapters[index - 1].id : null;
          chapter.nextId = index < subject.chapters.length - 1 ? subject.chapters[index + 1].id : null;
          chapterMap.set(chapter.id, chapter);
          allChapters.push(chapter);
        });
        subjectMap.set(subject.id, subject);
      });
      (content.sources || []).forEach(function (source) {
        sourceMap.set(source.id, source);
      });
    }
    totalSections = allChapters.reduce(function (count, chapter) {
      return count + chapter.sections.length;
    }, 0);
    totalTerms = allChapters.reduce(function (count, chapter) {
      return count + chapter.sections.reduce(function (sectionCount, section) {
        return sectionCount + section.terms.length;
      }, 0);
    }, 0);
  }

  hydrateData();

  if (!content || !Array.isArray(content.subjects) || !main) {
    return;
  }

  const PROGRESS_KEY = "analyst-prep-progress-v2";
  const THEME_KEY = "analyst-theme";
  const PRACTICE_PROGRESS_KEY = "analyst-past-exam-progress-v1";

  let progress = loadProgress();
  try {
    /* 投資學章節已重建；清掉舊版進度，避免舊章節 ID 對應到新章節。 */
    window.localStorage.removeItem("analyst-prep-progress-v1");
  } catch (error) {
    /* localStorage 可能被停用；不影響本次瀏覽。 */
  }
  let sectionObserver = null;
  let toastTimer = null;
  let practiceState = null;
  let writtenState = null;

  const searchOverlay = document.getElementById("search-overlay");
  const searchOpenButton = document.getElementById("search-open");
  const searchCloseButton = document.getElementById("search-close");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchPastLoadButton = document.getElementById("search-past-load");
  let pastSearchLoaded = false;
  const toastElement = document.getElementById("toast");

  const searchState = {
    index: [],
    fuzzyDocuments: [],
    results: [],
    active: -1
  };
  const fuzzyState = {
    index: null,
    status: "idle",
    promise: null,
    generation: 0
  };
  let miniSearchPromise = null;

  /* ----------------------------- utilities ----------------------------- */

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function renderKatex(tex, displayMode) {
    const source = String(tex == null ? "" : tex).trim();
    if (!source) {
      return "";
    }
    if (window.katex && typeof window.katex.renderToString === "function") {
      try {
        return window.katex.renderToString(source, {
          displayMode: Boolean(displayMode),
          throwOnError: true,
          strict: "ignore",
          trust: false
        });
      } catch (error) {
        if (window.console && typeof console.warn === "function") {
          console.warn("KaTeX render failed:", source, error);
        }
      }
    }
    return '<span class="katex-fallback">' + escapeHtml(source) + "</span>";
  }

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/\s+/g, "");
  }

  function chapterNumber(chapter) {
    return padNumber(chapter.number);
  }

  function chapterLabel(chapter) {
    return chapter.label || "第 " + chapter.number + " 章";
  }

  function sectionDisplayTitle(section) {
    return String(section && section.title ? section.title : "")
      .replace(/^第\s*[0-9０-９一二三四五六七八九十百]+\s*節\s*[：:、.．\-—]?\s*/, "")
      .trim();
  }

  function chapterPartLabel(chapter) {
    return chapter.partTitle || "";
  }

  function getSubject(subjectId) {
    return subjectMap.get(subjectId) || null;
  }

  function getChapter(chapterId) {
    return chapterMap.get(chapterId) || null;
  }

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(list) ? list : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(progress)));
    } catch (error) {
      /* localStorage may be disabled; progress still works for this page view. */
    }
  }

  function subjectProgress(subject) {
    const total = subject.chapters.length;
    const done = subject.chapters.filter(function (chapter) {
      return progress.has(chapter.id);
    }).length;
    return {
      done: done,
      total: total,
      percent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }

  function subjectTerms(subject) {
    return subject.chapters.reduce(function (count, chapter) {
      return count + chapter.sections.reduce(function (sectionCount, section) {
        return sectionCount + section.terms.length;
      }, 0);
    }, 0);
  }

  function subjectSections(subject) {
    return subject.chapters.reduce(function (count, chapter) {
      return count + chapter.sections.length;
    }, 0);
  }

  function isFocusSection(subject, section) {
    return Boolean(subject && (subject.id === "investment" || /^學習重點/.test(section.title)));
  }

  function subjectUnitLabel(subject, short) {
    if (subject.id === "investment") {
      return short ? "重點" : "個重點";
    }
    if (subject.id === "accounting") {
      return short ? "單元" : "個單元";
    }
    return "節";
  }

  function toast(message) {
    if (!toastElement) {
      return;
    }
    window.clearTimeout(toastTimer);
    toastElement.textContent = message;
    toastElement.classList.add("show");
    toastTimer = window.setTimeout(function () {
      toastElement.classList.remove("show");
    }, 2200);
  }

  function parseRoute() {
    const raw = window.location.hash.replace(/^#/, "");
    const pieces = raw.split("?");
    const parts = pieces[0].split("/").filter(Boolean);
    return {
      parts: parts,
      query: new URLSearchParams(pieces[1] || "")
    };
  }

  /* ----------------------------- progress UI ----------------------------- */

  function renderProgress(subject) {
    const state = subjectProgress(subject);
    return [
      '<div class="progress-wrap">',
      '  <div class="progress-track" role="progressbar" aria-label="' + escapeHtml(subject.name) + '完成進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + state.percent + '">',
      '    <div class="progress-fill" data-progress-fill="' + escapeHtml(subject.id) + '" style="width:' + state.percent + '%"></div>',
      '  </div>',
      '  <span class="progress-text" data-progress-text="' + escapeHtml(subject.id) + '">' + state.done + ' / ' + state.total + ' 章</span>',
      '</div>'
    ].join("");
  }

  function updateProgressDisplays() {
    document.querySelectorAll("[data-progress-fill]").forEach(function (fill) {
      const subject = getSubject(fill.dataset.progressFill);
      if (!subject) {
        return;
      }
      const state = subjectProgress(subject);
      fill.style.width = state.percent + "%";
      const track = fill.closest(".progress-track");
      if (track) {
        track.setAttribute("aria-valuenow", String(state.percent));
      }
    });

    document.querySelectorAll("[data-progress-text]").forEach(function (label) {
      const subject = getSubject(label.dataset.progressText);
      if (!subject) {
        return;
      }
      const state = subjectProgress(subject);
      label.textContent = state.done + " / " + state.total + " 章";
    });

    document.querySelectorAll("[data-complete-btn]").forEach(function (button) {
      const done = progress.has(button.dataset.completeBtn);
      button.textContent = done ? "✓ 已完成" : "標記本章完成";
      button.classList.toggle("is-done", done);
      button.setAttribute("aria-pressed", done ? "true" : "false");
    });

    document.querySelectorAll("[data-done-pill]").forEach(function (pill) {
      pill.hidden = !progress.has(pill.dataset.donePill);
    });
  }

  function toggleChapter(chapterId) {
    const wasDone = progress.has(chapterId);
    if (wasDone) {
      progress.delete(chapterId);
    } else {
      progress.add(chapterId);
    }
    saveProgress();
    updateProgressDisplays();
    toast(wasDone ? "已取消完成標記" : "已標記本章完成");
  }

  /* ----------------------------- render helpers ----------------------------- */

  function renderTerms(terms) {
    return '<dl class="term-grid">' + terms.map(function (term) {
      return [
        '<div class="term-card">',
        "  <dt>" + renderInlineMath(term[0]) + "</dt>",
        "  <dd>" + renderInlineMath(term[1]) + "</dd>",
        "</div>"
      ].join("");
    }).join("") + "</dl>";
  }

  function diagramSortParts(key) {
    const suffix = key.slice(key.indexOf("#") + 1);
    return suffix.split("-").map(function (part) {
      return parseInt(part, 10);
    });
  }

  function getDiagrams(chapterId, sectionIndex) {
    const baseKey = chapterId + "#" + sectionIndex;
    return Object.keys(diagrams).filter(function (key) {
      return key === baseKey || key.indexOf(baseKey + "-") === 0;
    }).sort(function (a, b) {
      const aParts = diagramSortParts(a);
      const bParts = diagramSortParts(b);
      const length = Math.max(aParts.length, bParts.length);
      for (let index = 0; index < length; index += 1) {
        const aValue = index < aParts.length ? aParts[index] : -1;
        const bValue = index < bParts.length ? bParts[index] : -1;
        if (aValue !== bValue) {
          return aValue - bValue;
        }
      }
      return 0;
    }).map(function (key) {
      return diagrams[key];
    });
  }

  function getDiagram(chapterId, sectionIndex) {
    return diagrams[chapterId + "#" + sectionIndex] || null;
  }

  function modelSectionFormula(chapter, section) {
    const entry = formulaTexFor(chapter, section);
    if (!entry) return "";
    return typeof entry === "string" ? entry : (entry.tex || "");
  }

  function macroModelGroups() {
    const subject = getSubject("macro");
    if (!subject) {
      return [];
    }

    return subject.chapters.map(function (chapter) {
      const entries = [];
      chapter.sections.forEach(function (section, index) {
        getDiagrams(chapter.id, index).forEach(function (diagram, diagramIndex) {
          entries.push({
            anchor: "model-" + chapter.id + "-" + index + (diagramIndex ? "-" + (diagramIndex + 1) : ""),
            section: section,
            sectionIndex: index,
            diagram: diagram
          });
        });
      });

      return {
        chapter: chapter,
        entries: entries
      };
    });
  }

  function countMacroModels(groups) {
    return groups.reduce(function (count, group) {
      return count + group.entries.length;
    }, 0);
  }

  function nobelModelGroups() {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const groups = Array.isArray(nobelData.groups) ? nobelData.groups : [];

    return groups.map(function (group) {
      const groupRows = rows.filter(function (row) {
        return row.group === group.id;
      }).sort(function (a, b) {
        return a.year - b.year;
      });

      return {
        id: group.id,
        title: group.title,
        description: group.description,
        rows: groupRows,
        years: groupRows.map(function (row) { return row.year; }),
        diagram: nobelDiagrams[group.id] || null
      };
    }).filter(function (group) {
      return group.rows.length > 0;
    });
  }

  function nobelGroupsWithDiagrams() {
    return nobelModelGroups().filter(function (group) {
      return Boolean(group.diagram);
    });
  }

  function countNobelModels(groups) {
    return groups.filter(function (group) {
      return Boolean(group.diagram);
    }).length;
  }

  function nobelYearSpan(group) {
    if (!group.years.length) {
      return "";
    }
    if (group.years.length === 1) {
      return String(group.years[0]);
    }
    return group.years[0] + "–" + group.years[group.years.length - 1];
  }

  function renderNobelFormula(value) {
    return String(value || "").split(/(\$[^$]*\$)/g).map(function (segment) {
      if (/^\$[^$]*\$$/.test(segment)) {
        return renderKatex(segment.slice(1, -1), false);
      }
      return escapeHtml(segment);
    }).join("");
  }

  function renderNobelRichText(value) {
    return String(value || "").split(/(\$[^$]*\$)/g).map(function (segment) {
      if (/^\$[^$]*\$$/.test(segment)) {
        return '<span class="nobel-inline-math">' + renderKatex(segment.slice(1, -1), false) + "</span>";
      }
      return escapeHtml(segment);
    }).join("");
  }

  /* 17 組模型各只內嵌一份 SVG；複製前先為內部 ID 加上模型後綴，
     避免跨模組出現重複 ID，並同步更新 aria-labelledby 與 marker 參照。 */
  function scopeNobelSvg(svg, suffix) {
    const scoped = String(svg || "").replace(/\bid="([^"]+)"/g, function (_, id) {
      return 'id="' + id + "--" + suffix + '"';
    });
    return scoped
      .replace(/aria-labelledby="([^"]+)"/g, function (_, ids) {
        return 'aria-labelledby="' + ids.split(/\s+/).filter(Boolean).map(function (id) {
          return id + "--" + suffix;
        }).join(" ") + '"';
      })
      .replace(/url\(#([^)]+)\)/g, function (_, id) {
        return "url(#" + id + "--" + suffix + ")";
      })
      .replace(/\bhref="#([^"]+)"/g, function (_, id) {
        return 'href="#' + id + "--" + suffix + '"';
      });
  }

  function renderNobelYearChips(group, currentYear) {
    const bodyId = "nobel-year-body-" + group.id;
    return [
      '<div class="nobel-year-chips" aria-label="同組屆別，切換此模組的屆別資料">',
      group.rows.map(function (row) {
        const isCurrent = row.year === currentYear;
        return [
          '<button type="button" class="nobel-year-chip' + (isCurrent ? " is-current" : "") + '"',
          ' data-nobel-year-chip="' + row.year + '"',
          ' aria-controls="' + bodyId + '"',
          ' aria-pressed="' + (isCurrent ? "true" : "false") + '"',
          isCurrent ? ' aria-current="true"' : "",
          ">" + row.year + "</button>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderNobelModelDetails(diagram) {
    const tables = [
      renderDiagramTable("變數說明", diagram.variables),
      renderDiagramTable("參數說明", diagram.parameters)
    ].join("");
    if (!tables.trim()) {
      return "";
    }
    return [
      '<details class="nobel-model-details" open>',
      "  <summary>變數與參數</summary>",
      '  <div class="diagram-tables">' + tables + "</div>",
      diagram.note ? '  <p class="diagram-note">' + renderInlineMath(diagram.note) + "</p>" : "",
      "</details>"
    ].join("");
  }

  function renderNobelYearDataBody(row, index, group, groupIndex) {
    return [
      '<div class="nobel-year-heading">',
      '  <a class="nobel-year-link" href="#/nobel?year=' + encodeURIComponent(row.year) + '" aria-label="' + escapeHtml(row.year + " 年，前往 " + (group ? group.title : "對應模型圖")) + '">' + row.year + "</a>",
      '  <span class="nobel-year-sequence">第 ' + (index + 1) + " 屆</span>",
      "</div>",
      group ? '  <p class="nobel-year-group-label">模型 ' + padNumber(groupIndex + 1) + " · " + escapeHtml(group.title) + "</p>" : "",
      '  <dl class="nobel-entry-fields">',
      '    <div><dt>得主</dt><dd class="nobel-laureates">' + escapeHtml(row.laureates) + "</dd></div>",
      '    <div><dt>主要理論／研究領域</dt><dd>' + escapeHtml(row.field) + "</dd></div>",
      '    <div><dt>代表模型／關鍵公式</dt><dd class="nobel-formula">' + renderNobelFormula(row.formula) + "</dd></div>",
      '    <div><dt>核心假說與結論</dt><dd>' + renderNobelRichText(row.conclusion) + "</dd></div>",
      "  </dl>"
    ].join("");
  }

  function nobelRowForYear(year) {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    return rows.filter(function (row) {
      return row.year === Number(year);
    })[0] || null;
  }

  function renderNobelModule(group, groupIndex, groupCount) {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const currentRow = group.rows[0] || null;
    const currentYear = currentRow ? currentRow.year : "";
    const rowIndex = currentRow ? rows.indexOf(currentRow) : -1;
    const titleId = "nobel-year-model-" + group.id + (currentYear ? "-" + currentYear : "");
    const bodyId = "nobel-year-body-" + group.id;
    const diagram = group.diagram;
    const left = [
      '  <div class="nobel-year-model-main">',
      '    <div class="nobel-year-model-head">',
      '      <p class="eyebrow">諾貝爾模型 ' + padNumber(groupIndex + 1) + "／" + padNumber(groupCount) + " · " + group.rows.length + " 屆</p>",
      '      <h3 id="' + titleId + '">' + escapeHtml(group.title) + "</h3>",
      "    </div>",
      '    <p class="nobel-group-description">' + escapeHtml(group.description || "") + "</p>",
      renderNobelYearChips(group, currentYear),
      '    <div class="nobel-year-data">',
      '      <span class="nobel-group-anchor" id="nobel-group-' + group.id + '" aria-hidden="true"></span>',
      '      <div class="nobel-year-data-body" id="' + bodyId + '" data-nobel-year-body>',
      currentRow ? renderNobelYearDataBody(currentRow, rowIndex, group, groupIndex) : "",
      "      </div>",
      "    </div>",
      diagram ? '    <div class="diagram-canvas nobel-year-canvas">' + scopeNobelSvg(diagram.svg, group.id) + "</div>" : "",
      diagram ? '    <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>' : "",
      "  </div>"
    ].join("");
    const side = diagram
      ? [
        '  <figcaption>' + escapeHtml(diagram.caption) + "</figcaption>",
        '  <div class="nobel-year-model-side">',
        renderNobelModelDetails(diagram),
        "  </div>"
      ].join("")
      : "";
    return [
      '<article class="nobel-module" id="nobel-module-' + group.id + '" data-nobel-group="' + group.id + '" data-nobel-view-year="' + currentYear + '">',
      '  <figure class="nobel-year-figure nobel-module-figure model-diagram" aria-labelledby="' + titleId + '">',
      left,
      side,
      "  </figure>",
      "</article>"
    ].join("");
  }

  function renderNobelYearJump(groups) {
    const period = nobelData.meta && nobelData.meta.period ? nobelData.meta.period : "1969–2026";
    const rows = (Array.isArray(nobelData.rows) ? nobelData.rows : []).slice().sort(function (a, b) {
      return a.year - b.year;
    });
    const groupTitles = new Map(groups.map(function (group) {
      return [group.id, group.title];
    }));

    return [
      '<div class="nobel-year-jump">',
      '  <label class="nobel-year-jump-label" for="nobel-year-select">',
      '    <span class="eyebrow">依年份快速跳轉</span>',
      "    <strong>選擇年份，跳到所屬模型</strong>",
      "  </label>",
      '  <div class="nobel-year-jump-field">',
      '    <select id="nobel-year-select" data-nobel-year-select aria-describedby="nobel-year-select-hint">',
      '      <option value="">選擇年份（' + escapeHtml(period) + "）</option>",
      rows.map(function (row) {
        const modelTitle = groupTitles.get(row.group) || "";
        return '<option value="' + row.year + '">' + escapeHtml(row.year + " · " + modelTitle + "｜" + row.laureates) + "</option>";
      }).join(""),
      "    </select>",
      '    <p class="nobel-year-jump-hint" id="nobel-year-select-hint">選項依年份排序，顯示所屬模型與得主；選取後切換該模型並捲動。</p>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderNobelModules() {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const groups = nobelModelGroups();
    const period = nobelData.meta && nobelData.meta.period ? nobelData.meta.period : "1969–2026";

    return [
      '<div class="nobel-year-list" id="nobel-table" role="region" aria-label="17 組諾貝爾經濟學獎模型；每組預設第一屆，左右 1:1 呈現屆別資料與模型圖">',
      '  <p class="nobel-year-list-caption">' + escapeHtml(period) + " 年 " + rows.length + " 屆諾貝爾經濟學獎依 " + groups.length + " 組代表模型整理；每組預設顯示第一屆，上方年份選單可跳到包含該年份的模型。</p>",
      groups.map(function (group, groupIndex) {
        return renderNobelModule(group, groupIndex, groups.length);
      }).join(""),
      "</div>"
    ].join("");
  }

  function setNobelModuleYear(module, year, options) {
    const opts = options || {};
    if (!module) {
      return false;
    }
    const groups = nobelModelGroups();
    const groupIndex = groups.findIndex(function (group) {
      return group.id === module.dataset.nobelGroup;
    });
    if (groupIndex === -1) {
      return false;
    }
    const group = groups[groupIndex];
    const row = group.rows.filter(function (item) {
      return item.year === Number(year);
    })[0];
    if (!row) {
      return false;
    }
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const index = rows.indexOf(row);
    const body = module.querySelector("[data-nobel-year-body]");
    if (body) {
      body.innerHTML = renderNobelYearDataBody(row, index, group, groupIndex);
    }
    module.dataset.nobelViewYear = String(year);
    const title = module.querySelector(".nobel-year-model-head h3");
    if (title) {
      title.id = "nobel-year-model-" + group.id + "-" + year;
      const figure = title.closest("figure");
      if (figure) {
        figure.setAttribute("aria-labelledby", title.id);
      }
    }
    module.querySelectorAll("[data-nobel-year-chip]").forEach(function (item) {
      const isCurrent = Number(item.dataset.nobelYearChip) === Number(year);
      item.classList.toggle("is-current", isCurrent);
      item.setAttribute("aria-pressed", isCurrent ? "true" : "false");
      if (isCurrent) {
        item.setAttribute("aria-current", "true");
      } else {
        item.removeAttribute("aria-current");
      }
    });
    if (opts.syncSelect) {
      const select = document.querySelector("[data-nobel-year-select]");
      if (select) {
        select.value = String(year);
      }
    }
    return true;
  }

  function handleNobelClick(event) {
    const chip = event.target.closest("[data-nobel-year-chip]");
    if (!chip) {
      return false;
    }
    event.preventDefault();
    const year = Number(chip.dataset.nobelYearChip);
    const module = chip.closest("[data-nobel-group]");
    if (!module || !year) {
      return true;
    }
    setNobelModuleYear(module, year, { syncSelect: true });
    return true;
  }

  function handleNobelChange(event) {
    const select = event.target.closest("[data-nobel-year-select]");
    if (!select) {
      return false;
    }
    const year = Number(select.value);
    const row = year ? nobelRowForYear(year) : null;
    if (!row) {
      return true;
    }
    const module = document.getElementById("nobel-module-" + row.group);
    if (!module) {
      return true;
    }
    setNobelModuleYear(module, year, { syncSelect: false });
    module.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function renderDiagramTable(title, rows) {
    if (!Array.isArray(rows) || !rows.length) {
      return "";
    }
    return [
      '<div class="diagram-table">',
      "  <table>",
      "    <caption>" + escapeHtml(title) + "</caption>",
      "    <thead><tr><th>符號</th><th>名稱</th><th>說明</th></tr></thead>",
      "    <tbody>" + rows.map(function (row) {
        return '<tr><td class="diagram-symbol">' + renderInlineMath(row[0]) + "</td><td>" + renderInlineMath(row[1]) + "</td><td>" + renderInlineMath(row[2]) + "</td></tr>";
      }).join("") + "</tbody>",
      "  </table>",
      "</div>"
    ].join("");
  }

  function renderDiagram(diagram, options) {
    const opts = options || {};
    const split = Boolean(opts.split);
    const mmd = diagram.mermaid && opts.mermaid !== false ? diagram.mermaid : null;
    const variablesTable = renderDiagramTable("變數說明", diagram.variables);
    const parametersTable = renderDiagramTable("參數說明", diagram.parameters);
    const compareBar = mmd ? [
      '    <div class="diagram-compare-bar">',
      '      <div class="diagram-view-toggle" role="group" aria-label="圖表格式">',
      '        <button type="button" data-mermaid-view="svg" aria-pressed="true" aria-label="顯示 SVG 圖表" title="顯示原本的 SVG">SVG</button>',
      '        <button type="button" data-mermaid-view="mmd" aria-pressed="false" aria-label="顯示 MMD 圖表" title="用 Pele 渲染 MMD">MMD</button>',
      "      </div>",
      '      <span class="diagram-compare-hint">目前顯示 SVG</span>',
      '      <div class="diagram-tools">',
      '        <button type="button" class="diagram-tool-btn" data-mermaid-copy="' + escapeHtml(mmd.key) + '">複製 .mmd</button>',
      '        <button type="button" class="diagram-tool-btn" data-mermaid-download="' + escapeHtml(mmd.key) + '">下載 .mmd</button>',
      "      </div>",
      "    </div>"
    ].join("") : "";
    const svgPanelClass = diagram.svgIsMermaid
      ? "diagram-canvas diagram-canvas-mermaid diagram-canvas-static"
      : "diagram-canvas diagram-canvas-legacy";
    const codePanelId = mmd
      ? "mmd-code-" + (mmd.slug || String(mmd.key).replace(/[^a-z0-9]+/gi, "-"))
      : "";
    const codeToggle = mmd ? [
      '<button type="button" class="diagram-code-toggle" data-mermaid-code-toggle="' + escapeHtml(mmd.key) + '" aria-expanded="false" aria-controls="' + escapeHtml(codePanelId) + '">',
      '<span aria-hidden="true">&lt;/&gt;</span> 顯示 MMD 碼',
      "</button>"
    ].join("") : "";
    const codePanel = mmd ? [
      '      <aside class="diagram-code-panel" id="' + escapeHtml(codePanelId) + '" data-mermaid-code-panel hidden>',
      '        <div class="diagram-code-head">',
      "          <span>MMD 原始碼</span>",
      "          <code>" + escapeHtml(mmd.file || "") + "</code>",
      "        </div>",
      "        <pre><code>" + escapeHtml(mmd.source || "") + "</code></pre>",
      "      </aside>"
    ].join("") : "";
    const relatedBlock = Array.isArray(diagram.related) && diagram.related.length ? [
      '  <div class="diagram-related">',
      '    <span class="diagram-related-label">相關圖表</span>',
      diagram.related.map(function (item) {
        return '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + "</a>";
      }).join(""),
      "  </div>"
    ].join("") : "";
    const visual = mmd ? [
      '  <div class="diagram-visual diagram-compare" data-mermaid-key="' + escapeHtml(mmd.key) + '">',
      compareBar,
      '    <div class="diagram-compare-stage" data-mermaid-stage>',
      '      <div class="diagram-compare-body">',
      '        <div class="' + svgPanelClass + '" data-mermaid-panel="svg">' + diagram.svg + "</div>",
      '        <div class="diagram-canvas diagram-canvas-mermaid" data-mermaid-panel="mmd" hidden aria-live="polite"></div>',
      "      </div>",
      codePanel,
      "    </div>",
      '    <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>',
      "  </div>"
    ].join("") : [
      '  <div class="diagram-visual">',
      '    <div class="diagram-canvas">' + diagram.svg + "</div>",
      '    <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>',
      "  </div>"
    ].join("");
    const side = split && variablesTable
      ? '  <div class="diagram-side">' + variablesTable + "</div>"
      : "";
    const belowTables = split ? parametersTable : variablesTable + parametersTable;
    return [
      '<figure class="model-diagram' + (split ? " has-split-layout" : "") + '">',
      '  <div class="diagram-head' + (mmd ? " has-code-toggle" : "") + '">',
      "    <div>",
      '      <p class="diagram-kicker">' + escapeHtml(diagram.kicker || "模型圖") + "</p>",
      "      <h3>" + escapeHtml(diagram.title) + "</h3>",
      "    </div>",
      codeToggle,
      "  </div>",
      '  <div class="diagram-layout' + (split ? " is-split" : "") + '">',
      visual,
      side,
      "  </div>",
      "  <figcaption>" + renderInlineMath(diagram.caption) + "</figcaption>",
      diagram.formula ? '  <div class="diagram-formula"><span class="diagram-formula-label">模型式</span><span class="ratio-math">' + renderKatex(diagram.formula, true) + "</span></div>" : "",
      belowTables ? '  <div class="diagram-tables">' + belowTables + "</div>" : "",
      diagram.note ? '  <p class="diagram-note">' + renderInlineMath(diagram.note) + "</p>" : "",
      relatedBlock,
      "</figure>"
    ].join("");
  }

  function formulaTexFor(chapter, section) {
    const formulas = window.FORMULA_TEX || {};
    return chapter ? formulas[chapter.id + "::" + section.title] || null : null;
  }

  function renderSectionExamSources(chapter, sectionIndex) {
    if (!chapter) {
      return "";
    }
    const key = chapter.id + "#" + sectionIndex;
    const sortQuestions = function (a, b) {
      return (a.year - b.year) || (a.session - b.session) || (a.number - b.number);
    };
    const choiceList = (practiceSectionQuestions.get(key) || []).slice().sort(sortQuestions);
    const writtenList = (writtenSectionQuestions.get(key) || []).slice().sort(sortQuestions);
    if (!choiceList.length && !writtenList.length) {
      return "";
    }
    const choiceSeen = new Set();
    const choiceLinks = choiceList.filter(function (question) {
      if (choiceSeen.has(question.id)) {
        return false;
      }
      choiceSeen.add(question.id);
      return true;
    }).map(function (question) {
      const session = practiceSessionMap.get(question.sessionId) || {};
      return '<a class="section-exam-link" href="#/past-exams?question=' + encodeURIComponent(question.id) + '">' +
        '<span>' + escapeHtml(session.label || question.sessionId) + '</span>' +
        '<strong>第 ' + question.number + ' 題</strong></a>';
    }).join("");
    const writtenSeen = new Set();
    const writtenLinks = writtenList.filter(function (question) {
      if (writtenSeen.has(question.id)) {
        return false;
      }
      writtenSeen.add(question.id);
      return true;
    }).map(function (question) {
      const session = practiceSessionMap.get(question.sessionId) || {};
      return '<a class="section-exam-link is-written" href="#/past-exams/written?question=' + encodeURIComponent(question.id) + '">' +
        '<span>' + escapeHtml(session.label || question.sessionId) + '</span>' +
        '<strong>第 ' + question.number + ' 題 · 申論</strong></a>';
    }).join("");
    const subjectId = chapter.subjectId;
    const choiceRate = practicePercentText(choiceList.length, practiceSubjectQuestionCount(subjectId));
    const writtenRate = practicePercentText(writtenList.length, writtenSubjectQuestionCount(subjectId));
    return [
      '<div class="section-exam-sources">',
      '  <div class="section-exam-head">',
      "    <strong>本節出處題目</strong>",
      '    <div class="section-exam-stats">',
      "      <span>選擇題 <strong>" + choiceList.length + "</strong> 題 頻率 <strong>" + choiceRate + "</strong></span>",
      "      <span>申論題 <strong>" + writtenList.length + "</strong> 題 頻率 <strong>" + writtenRate + "</strong></span>",
      "    </div>",
      "  </div>",
      '  <div class="section-exam-links">' + choiceLinks + writtenLinks + "</div>",
      "</div>"
    ].join("");
  }

  function examSolutionFor(chapter, sectionIndex) {
    if (!chapter) {
      return null;
    }
    return examSolutionSectionMap.get(chapter.id + "::" + sectionIndex) || null;
  }

  function renderSolutionExample(example, index) {
    const question = examQuestionMap.get(example.questionId);
    if (!question) {
      return "";
    }
    const isChoice = Array.isArray(question.options) && question.options.length > 0;
    const session = practiceSessionMap.get(question.sessionId) || {};
    const sessionLabel = session.label || (question.year + " 年第 " + question.session + " 次");
    const kind = question.kind || (isChoice ? "選擇題" : "計算／申論");
    const steps = Array.isArray(example.steps) ? example.steps : [];
    const correctOptions = isChoice
      ? question.answer.map(function (letter) {
          const optionIndex = "ABCD".indexOf(letter);
          return optionIndex >= 0 && question.options[optionIndex] ? letter + "：" + question.options[optionIndex] : letter;
        }).join("；")
      : "";
    const options = isChoice
      ? '<ol class="worked-example-options">' + question.options.map(function (text, optionIndex) {
          const letter = "ABCD"[optionIndex];
          const correct = question.answer.indexOf(letter) !== -1;
          return '<li' + (correct ? ' class="is-correct"' : "") + '><span class="worked-example-letter">' + letter + '</span><span>' + renderInlineMath(text) + '</span></li>';
        }).join("") + "</ol>"
      : "";
    const referenceAnswer = !isChoice && Array.isArray(question.answer) && question.answer.length
      ? '<details class="worked-example-reference"><summary>完整參考解答（本站）</summary><div class="worked-example-reference-body">' + question.answer.map(function (text) {
          return '<div class="written-answer-block">' + renderWrittenAnswer(text) + "</div>";
        }).join("") + "</div></details>"
      : "";
    const questionLink = isChoice
      ? "#/past-exams?question=" + encodeURIComponent(question.id)
      : "#/past-exams/written?question=" + encodeURIComponent(question.id);
    return [
      '<details class="worked-example"' + (index === 0 ? " open" : "") + ">",
      '  <summary class="worked-example-summary">',
      '    <span class="worked-example-number">例 ' + (index + 1) + "</span>",
      '    <span class="worked-example-title">' + escapeHtml(sessionLabel) + " · 第 " + question.number + " 題</span>",
      '    <span class="worked-example-kind">' + escapeHtml(kind) + "</span>",
      "  </summary>",
      '  <div class="worked-example-body">',
      '    <p class="worked-example-stem">' + renderInlineMath(question.stem) + "</p>",
      options,
      isChoice ? '    <p class="worked-example-answer"><strong>答案</strong> ' + escapeHtml(correctOptions) + "</p>" : "",
      isChoice ? renderPastExamAnalysis(question) : "",
      steps.length
        ? '    <div class="worked-example-steps"><h4>解題步驟</h4><ol>' + steps.map(function (step) {
            return "<li>" + renderWrittenAnswer(step) + "</li>";
          }).join("") + "</ol></div>"
        : "",
      example.takeaway ? '    <div class="worked-example-note"><strong>帶走這一句</strong><p>' + renderWrittenAnswer(example.takeaway) + "</p></div>" : "",
      example.trap ? '    <div class="worked-example-trap"><strong>易錯點</strong><p>' + renderWrittenAnswer(example.trap) + "</p></div>" : "",
      referenceAnswer,
      '    <div class="worked-example-footer"><a class="text-link" href="' + questionLink + '">在題庫中開啟題目 →</a><span>' + escapeHtml(question.note || "本站參考解答（非官方）") + "</span></div>",
      "  </div>",
      "</details>"
    ].join("");
  }

  function renderSectionSolutions(chapter, sectionIndex) {
    const solution = examSolutionFor(chapter, sectionIndex);
    if (!solution) {
      return "";
    }
    const strategies = Array.isArray(solution.strategies) ? solution.strategies : [];
    const examples = (Array.isArray(solution.examples) ? solution.examples : []).filter(function (example) {
      return examQuestionMap.has(example.questionId);
    });
    if (!solution.focus && !strategies.length && !examples.length) {
      return "";
    }
    return [
      '<div class="section-solutions">',
      '  <div class="subheading">解題方法</div>',
      solution.focus ? '  <p class="solution-focus">' + renderWrittenAnswer(solution.focus) + "</p>" : "",
      strategies.length
        ? '  <ol class="solution-strategy">' + strategies.map(function (step) {
            return "<li>" + renderWrittenAnswer(step) + "</li>";
          }).join("") + "</ol>"
        : "",
      examples.length
        ? '  <div class="subheading">考古題解題</div><div class="worked-examples">' + examples.map(renderSolutionExample).join("") + "</div>"
        : "",
      "</div>"
    ].join("");
  }

  function renderTableCell(cell) {
    const text = String(cell == null ? "" : cell);
    if (text.indexOf("難以取得超額報酬") === 0) {
      return '<span class="table-mark is-negative" aria-hidden="true">✕</span>' + renderInlineMath(text);
    }
    if (text.indexOf("仍可能取得超額報酬") === 0) {
      return '<span class="table-mark is-positive" aria-hidden="true">○</span>' + renderInlineMath(text);
    }
    return renderInlineMath(text);
  }

  function renderSectionTable(table) {
    if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows)) {
      return "";
    }
    if (!table.columns.length || !table.rows.length) {
      return "";
    }
    const title = table.title || "比較表";
    const compact = Array.isArray(table.columns) && table.columns.length <= 2 ? " is-compact" : "";
    return [
      '<div class="section-table">',
      '  <h3 class="section-table-title">' + escapeHtml(title) + "</h3>",
      '  <div class="ratio-table-wrap comparison-table-wrap">',
      '    <table class="ratio-table comparison-table' + compact + '" aria-label="' + escapeHtml(title) + '">',
      '      <thead><tr>' + table.columns.map(function (column) {
        return '<th scope="col">' + escapeHtml(column) + "</th>";
      }).join("") + "</tr></thead>",
      "      <tbody>" + table.rows.map(function (row) {
        return "<tr>" + row.map(function (cell, cellIndex) {
          if (cellIndex === 0) {
            return '<th scope="row">' + renderInlineMath(cell) + "</th>";
          }
          return '<td data-label="' + escapeHtml(table.columns[cellIndex] || "") + '">' + renderTableCell(cell) + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody>",
      "    </table>",
      "  </div>",
      table.note ? '  <p class="section-table-note">' + renderInlineMath(table.note) + "</p>" : "",
      "</div>"
    ].join("");
  }

  function renderSectionSubsections(section) {
    const subsections = Array.isArray(section.subsections) ? section.subsections : [];
    if (!subsections.length) {
      return "";
    }
    return '<div class="section-subsections">' + subsections.map(function (sub, index) {
      const body = Array.isArray(sub.body) ? sub.body : [];
      return [
        '<section class="section-subsection">',
        '  <h3 class="section-subsection-title">' + escapeHtml(sub.title || "補充 " + (index + 1)) + "</h3>",
        body.length ? '  <div class="section-body">' + body.map(function (text) {
          return "<p>" + renderInlineMath(text) + "</p>";
        }).join("") + "</div>" : "",
        sub.table ? renderSectionTable(sub.table) : "",
        sub.formula ? '  <div class="formula formula-katex" role="note">' + renderKatex(sub.formula, true) + "</div>" : "",
        "</section>"
      ].join("");
    }).join("") + "</div>";
  }

  function renderSection(section, index, subject, chapter) {
    const sectionId = "section-" + (index + 1);
    const focus = isFocusSection(subject, section);
    const kicker = focus ? "學習重點 " : "";
    const sectionDiagrams = chapter ? getDiagrams(chapter.id, index) : [];
    const formulaEntry = chapter ? formulaTexFor(chapter, section) : null;
    const formulaTex = typeof formulaEntry === "string" ? formulaEntry : (formulaEntry && formulaEntry.tex ? formulaEntry.tex : "");
    const ratioFormulas = chapter && subject.id === "investment"
      ? investmentRatioFormulas().filter(function (entry) {
          return entry.chapterId === chapter.id && entry.sectionTitle === section.title;
        })
      : [];
    const linkedRatio = section.ratioFormulaId
      ? investmentRatioFormulas().find(function (entry) {
          return entry.id === section.ratioFormulaId;
        })
      : null;
    return [
      '<section class="section-block" id="' + sectionId + '" data-section-index="' + index + '">',
      '  <div class="section-kicker">' + kicker + padNumber(index + 1) + "</div>",
      "  <h2>" + escapeHtml(sectionDisplayTitle(section)) + "</h2>",
      '  <div class="section-body">' + section.body.map(function (paragraph) {
        return "<p>" + renderInlineMath(paragraph) + "</p>";
      }).join("") + "</div>",
      renderSectionTable(section.table),
      renderSectionSubsections(section),
      sectionDiagrams.map(renderDiagram).join(""),
      '  <div class="subheading">名詞速查</div>',
      renderTerms(section.terms),
      formulaTex
        ? '  <div class="formula formula-katex" role="note">' + renderKatex(formulaTex, true) + (formulaEntry && formulaEntry.note ? '<p class="formula-note">' + escapeHtml(formulaEntry.note) + "</p>" : "") + "</div>"
        : section.formula
          ? '  <div class="formula" role="note">' + escapeHtml(section.formula) + "</div>"
          : linkedRatio
            ? '  <div class="formula formula-math" role="note">' + ratioFormulaMarkup(linkedRatio) + "</div>"
            : "",
      ratioFormulas.length
        ? '  <div class="ratio-inline"><div class="subheading">比率公式總表</div><p class="ratio-inline-note">以下公式與投資學頁面的比率列表共用同一份資料。</p>' + renderRatioFormulaTables(ratioFormulas, { showChapter: false }) + "</div>"
        : "",
      renderSectionSolutions(chapter, index + 1),
      '  <div class="exam-box">',
      "    <h3>考試重點</h3>",
      "    <ul>" + section.points.map(function (point) {
        return "<li>" + renderInlineMath(point) + "</li>";
      }).join("") + "</ul>",
      "  </div>",
      section.memory ? '  <div class="memory-card"><span class="memory-label">記憶</span><p>' + renderInlineMath(section.memory) + "</p></div>" : "",
      renderSectionExamSources(chapter, index + 1),
      "</section>"
    ].join("");
  }

  function renderChapterRefs(chapter) {
    const refs = (chapter.sourceIds || []).map(function (sourceId) {
      return sourceMap.get(sourceId);
    }).filter(Boolean);

    if (!refs.length) {
      return "";
    }

    return [
      '<section class="chapter-refs">',
      "  <h2>本章資料來源</h2>",
      '  <ul class="ref-list">' + refs.map(function (ref) {
        return [
          "<li>",
          '<a href="' + escapeHtml(ref.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(ref.name) + "</a>",
          "<span>— " + escapeHtml(ref.note) + "</span>",
          "</li>"
        ].join("");
      }).join("") + "</ul>",
      "</section>"
    ].join("");
  }

  function renderChapterNav(chapter) {
    const previous = chapter.prevId ? getChapter(chapter.prevId) : null;
    const next = chapter.nextId ? getChapter(chapter.nextId) : null;

    if (!previous && !next) {
      return "";
    }

    return [
      '<nav class="chapter-nav" aria-label="上一章與下一章">',
      previous
        ? '<a class="prev" href="#/chapter/' + escapeHtml(previous.id) + '"><small>← 上一章</small><strong>' + escapeHtml(previous.title) + "</strong></a>"
        : "<span></span>",
      next
        ? '<a class="next" href="#/chapter/' + escapeHtml(next.id) + '"><small>下一章 →</small><strong>' + escapeHtml(next.title) + "</strong></a>"
        : "<span></span>",
      "</nav>"
    ].join("");
  }

  function renderPageHead(eyebrow, title, description) {
    return [
      '<header class="page-head">',
      '  <p class="eyebrow">' + escapeHtml(eyebrow) + "</p>",
      "  <h1>" + escapeHtml(title) + "</h1>",
      '  <p class="lede">' + escapeHtml(description) + "</p>",
      "</header>"
    ].join("");
  }

  function renderModelAtlasCard(subject) {
    const groups = macroModelGroups();
    const total = countMacroModels(groups);
    const withModels = groups.filter(function (group) {
      return group.entries.length > 0;
    }).length;
    const nobelGroups = nobelGroupsWithDiagrams();
    const nobelTotal = countNobelModels(nobelGroups);
    const nobelYears = Array.isArray(nobelData.rows) ? nobelData.rows.length : 0;

    return [
      '<a class="subject-written-cta" href="#/models/macro">',
      '  <div>',
      '    <p class="eyebrow">模型索引</p>',
      '    <strong>總體經濟模型總覽</strong>',
      "    <span>涵蓋 " + subject.chapters.length + " 章、共 " + total + " 張章節模型圖（" + withModels + " 章含模型）；諾貝爾經濟學獎 17 組模型與 58 屆資料另見諾貝爾模型頁。</span>",
      "  </div>",
      "</a>"
    ].join("");
  }

  function macroEvolutionModelIndex() {
    const index = new Map();
    macroModelGroups().forEach(function (group) {
      group.entries.forEach(function (entry) {
        index.set(entry.anchor, {
          group: group,
          entry: entry
        });
      });
    });
    return index;
  }

  function shortMacroModelTitle(title) {
    return String(title || "").split("：")[0].trim();
  }

  function macroEvolutionNobelRow(year) {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    return rows.find(function (row) {
      return Number(row.year) === Number(year);
    }) || null;
  }

  function renderMacroEvolution(options) {
    const opts = options || {};
    const headingTag = opts.headingTag === "h1" ? "h1" : "h2";
    const meta = macroEvolution.meta || {};
    const stages = Array.isArray(macroEvolution.stages) ? macroEvolution.stages : [];
    if (!stages.length) {
      return "";
    }

    const modelIndex = macroEvolutionModelIndex();
    const nobelYears = new Set();
    let nodeCount = 0;
    let nodeNumber = 0;

    stages.forEach(function (stage) {
      (Array.isArray(stage.nodes) ? stage.nodes : []).forEach(function (node) {
        nodeCount += 1;
        (Array.isArray(node.nobelYears) ? node.nobelYears : []).forEach(function (year) {
          nobelYears.add(Number(year));
        });
      });
    });

    const stageMarkup = stages.map(function (stage, stageIndex) {
      const nodes = Array.isArray(stage.nodes) ? stage.nodes : [];
      const cards = nodes.map(function (node) {
        nodeNumber += 1;
        const number = padNumber(nodeNumber);
        const modelLinks = (Array.isArray(node.modelAnchors) ? node.modelAnchors : []).map(function (anchor) {
          const match = modelIndex.get(anchor);
          if (!match) {
            return "";
          }
          const chapter = match.group.chapter;
          const entry = match.entry;
          const fullTitle = entry.diagram && entry.diagram.title ? entry.diagram.title : anchor;
          const shortTitle = shortMacroModelTitle(fullTitle);
          const label = fullTitle + "（" + chapter.title + " · " + sectionDisplayTitle(entry.section) + "）";
          return [
            '<a class="evolution-model-chip" href="#/models/macro?model=' + encodeURIComponent(anchor) + '"',
            ' title="' + escapeHtml(fullTitle) + '"',
            ' aria-label="在模型總覽查看：' + escapeHtml(label) + '">',
            '<span class="evolution-model-name">' + escapeHtml(shortTitle) + "</span>",
            "</a>"
          ].join("");
        }).join("");

        const nobelLinks = (Array.isArray(node.nobelYears) ? node.nobelYears : []).map(function (year) {
          const row = macroEvolutionNobelRow(year);
          if (!row) {
            return "";
          }
          return [
            '<a class="evolution-nobel-chip" href="#/nobel?year=' + encodeURIComponent(row.year) + '"',
            ' aria-label="' + escapeHtml(row.year + " 諾貝爾經濟學獎：" + row.laureates + "；" + row.field) + '">',
            '<span class="evolution-nobel-year">' + escapeHtml(row.year) + "</span>",
            '<span class="evolution-nobel-body">',
            '<span class="evolution-nobel-name">' + escapeHtml(row.laureates) + "</span>",
            '<span class="evolution-nobel-field">' + escapeHtml(row.field) + "</span>",
            "</span>",
            "</a>"
          ].join("");
        }).join("");

        const chapterLinks = (Array.isArray(node.chapterRefs) ? node.chapterRefs : []).map(function (ref) {
          const chapter = chapterMap.get(ref.chapterId);
          if (!chapter) {
            return "";
          }
          const sectionIndex = Number.isInteger(ref.sectionIndex) ? ref.sectionIndex : null;
          const href = "#/chapter/" + encodeURIComponent(chapter.id) + (sectionIndex === null ? "" : "?section=" + (sectionIndex + 1));
          const labelText = ref.label || chapterLabel(chapter) + " " + chapter.title;
          return '<a href="' + href + '">' + escapeHtml(labelText) + " →</a>";
        }).join("");

        return [
          '<article class="evolution-card" id="evolution-' + escapeHtml(node.id) + '">',
          '  <div class="evolution-card-head">',
          '    <span class="evolution-card-index">' + number + "</span>",
          '    <div class="evolution-card-title">',
          '      <div class="evolution-card-kicker">',
          '        <span class="evolution-kind">' + escapeHtml(node.kind || "學派") + "</span>",
          '        <span class="evolution-card-period">' + escapeHtml(node.period || "") + "</span>",
          "      </div>",
          "      <h3>" + escapeHtml(node.school) + "</h3>",
          node.english ? '      <p class="evolution-card-en">' + escapeHtml(node.english) + "</p>" : "",
          "    </div>",
          "  </div>",
          '  <p class="evolution-founders"><span>提出者</span>' + escapeHtml(node.founders) + "</p>",
          '  <p class="evolution-summary">' + escapeHtml(node.summary) + "</p>",
          modelLinks ? '  <div class="evolution-models"><span class="evolution-label">代表模型</span><div class="evolution-chip-list">' + modelLinks + "</div></div>" : "",
          nobelLinks ? '  <div class="evolution-nobels"><span class="evolution-label">諾貝爾里程碑</span><div class="evolution-nobel-list">' + nobelLinks + "</div></div>" : "",
          chapterLinks ? '  <footer class="evolution-card-foot">' + chapterLinks + "</footer>" : "",
          "</article>"
        ].join("");
      }).join("");

      return [
        '<li class="evolution-stage">',
        '  <div class="evolution-marker">',
        '    <span class="evolution-year">' + escapeHtml(stage.year) + "</span>",
        '    <span class="evolution-period">' + escapeHtml(stage.period || "") + "</span>",
        "  </div>",
        '  <div class="evolution-stage-body">',
        '    <div class="evolution-stage-head">',
        '      <span class="evolution-stage-index">階段 ' + padNumber(stageIndex + 1) + "</span>",
        "      <h3>" + escapeHtml(stage.era) + "</h3>",
        "      <p>" + escapeHtml(stage.transition || "") + "</p>",
        "    </div>",
        '    <div class="evolution-cards">' + cards + "</div>",
        "  </div>",
        "</li>"
      ].join("");
    }).join("");

    return [
      '<section class="macro-evolution" id="macro-evolution" aria-labelledby="macro-evolution-heading">',
      '  <div class="macro-evolution-head">',
      '    <div class="macro-evolution-intro">',
      '      <p class="eyebrow">' + escapeHtml(meta.eyebrow || "思想演進") + "</p>",
      "      <" + headingTag + ' id="macro-evolution-heading">' + escapeHtml(meta.title || "總體經濟學學派演進圖") + "</" + headingTag + ">",
      "      <p>" + escapeHtml(meta.description || "") + "</p>",
      "    </div>",
      '    <div class="evolution-meta" role="group" aria-label="圖表規模">',
      "      <span>" + nodeCount + " 個節點</span>",
      "      <span>" + nobelYears.size + " 個諾貝爾里程碑</span>",
      "    </div>",
      "  </div>",
      '  <div class="evolution-legend" role="group" aria-label="圖例">',
      '    <span><i class="legend-dot legend-school" aria-hidden="true"></i>學派／理論節點</span>',
      '    <span><i class="legend-dot legend-model" aria-hidden="true"></i>模型連結</span>',
      '    <span><i class="legend-dot legend-nobel" aria-hidden="true"></i>諾貝爾里程碑</span>',
      "  </div>",
      '  <ol class="evolution-track">' + stageMarkup + "</ol>",
      '  <p class="evolution-note"><strong>閱讀說明：</strong>' + escapeHtml(meta.note || "") + ' <a href="#/sources">資料來源 →</a></p>',
      "</section>"
    ].join("");
  }

  function renderMacroEvolutionCta() {
    const meta = macroEvolution.meta || {};
    const stages = Array.isArray(macroEvolution.stages) ? macroEvolution.stages : [];
    let nodeCount = 0;
    const nobelYears = new Set();
    stages.forEach(function (stage) {
      (Array.isArray(stage.nodes) ? stage.nodes : []).forEach(function (node) {
        nodeCount += 1;
        (Array.isArray(node.nobelYears) ? node.nobelYears : []).forEach(function (year) {
          nobelYears.add(Number(year));
        });
      });
    });
    return [
      '<a class="subject-written-cta" href="#/macro/evolution">',
      '  <div>',
      '    <p class="eyebrow">' + escapeHtml(meta.eyebrow || "思想演進") + "</p>",
      '    <strong>' + escapeHtml(meta.title || "總體經濟學學派演進圖") + "</strong>",
      "    <span>從古典學派到新制成長，依時間整理主要理論、" + nodeCount + " 個節點、" + nobelYears.size + " 個諾貝爾里程碑、代表模型與提出者。</span>",
      "  </div>",
      "</a>"
    ].join("");
  }

  function renderNobelCta() {
    const nobelGroups = nobelGroupsWithDiagrams();
    const nobelYears = Array.isArray(nobelData.rows) ? nobelData.rows.length : 0;
    return [
      '<a class="subject-written-cta" href="#/nobel">',
      '  <div>',
      '    <p class="eyebrow">諾貝爾經濟學獎</p>',
      '    <strong>17 組諾貝爾經濟學獎模型</strong>',
      "    <span>收錄 " + nobelYears + " 屆年份與得主，以及 " + nobelGroups.length + " 組模型圖；可依年份跳到所屬模型，或用屆別晶片切換屆別資料。</span>",
      "  </div>",
      "</a>"
    ].join("");
  }

  function renderMacroEvolutionPage() {
    return [
      '<div class="page subject-macro">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/macro">總體經濟學</a><span>/</span>',
      "    <span>學派演進圖</span>",
      "  </nav>",
      renderMacroEvolution({ headingTag: "h1" }),
      '  <div class="chapter-actions">',
      '    <a class="btn" href="#/subject/macro">← 回總體經濟學</a>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderSubjectCard(subject) {
    const progressState = subjectProgress(subject);
    const preview = subject.chapters.slice(0, 3).map(function (chapter) {
      return "<li>" + escapeHtml(chapter.title) + "</li>";
    }).join("");

    return [
      '<a class="subject-card ' + escapeHtml(subject.colorClass) + '" href="#/subject/' + escapeHtml(subject.id) + '">',
      '  <div class="subject-card-top">',
      '    <span class="subject-badge">考試科目</span>',
      "  </div>",
      "  <h2>" + escapeHtml(subject.name) + "</h2>",
      "  <p>" + renderInlineMath(subject.tagline) + "</p>",
      '  <ul class="subject-card-list">' + preview + "<li>…共 " + subject.chapters.length + " 章</li></ul>",
      '  <div class="subject-card-foot">',
      renderProgress(subject),
      '    <span class="subject-card-arrow">查看章節 →</span>',
      "  </div>",
      "</a>"
    ].join("");
  }

  function renderChapterRow(chapter, subject) {
    const done = progress.has(chapter.id);
    return [
      '<a class="chapter-row ' + escapeHtml(subject.colorClass) + '" href="#/chapter/' + escapeHtml(chapter.id) + '">',
      '  <div class="chapter-num"><strong>' + chapterNumber(chapter) + "</strong></div>",
      "  <div>",
      "    <h2>" + escapeHtml(chapter.title) + "</h2>",
      "    <p>" + renderInlineMath(chapter.summary) + "</p>",
      "  </div>",
      '  <div class="chapter-row-side">',
      renderChapterExamStats(chapter, subject),
      '    <span class="done-pill" data-done-pill="' + escapeHtml(chapter.id) + '"' + (done ? "" : " hidden") + ">✓ 已完成</span>",
      "  </div>",
      "</a>"
    ].join("");
  }

  function ratioFormulaMarkup(entry) {
    if (entry && entry.latex) {
      return '<span class="ratio-math">' + renderKatex(entry.latex, false) + "</span>";
    }
    return escapeHtml(entry ? entry.formula : "");
  }

  function investmentRatioFormulas() {
    return (Array.isArray(window.INVESTMENT_RATIO_FORMULAS) ? window.INVESTMENT_RATIO_FORMULAS : []).filter(function (entry) {
      return entry && entry.category && entry.name && entry.formula;
    });
  }

  function ratioFormulaSectionIndex(entry) {
    const chapter = getChapter(entry.chapterId);
    if (!chapter) {
      return -1;
    }
    return chapter.sections.findIndex(function (section) {
      return section.title === entry.sectionTitle;
    });
  }

  function ratioFormulaLink(entry) {
    const chapter = getChapter(entry.chapterId);
    if (!chapter) {
      return "—";
    }
    const sectionIndex = ratioFormulaSectionIndex(entry);
    const suffix = sectionIndex >= 0 ? "?section=" + (sectionIndex + 1) : "";
    return '<a class="ratio-source" href="#/chapter/' + encodeURIComponent(chapter.id) + suffix + '">' + escapeHtml(chapterLabel(chapter) + " " + chapter.title) + "</a>";
  }

  function groupRatioFormulas(entries) {
    const groups = [];
    entries.forEach(function (entry) {
      let group = groups.find(function (item) {
        return item.category === entry.category;
      });
      if (!group) {
        group = { category: entry.category, entries: [] };
        groups.push(group);
      }
      group.entries.push(entry);
    });
    return groups;
  }

  function renderRatioFormulaTables(entries, options) {
    const opts = options || {};
    const showChapter = opts.showChapter !== false;
    return groupRatioFormulas(entries).map(function (group) {
      return [
        '<section class="ratio-group">',
        '<h3>' + escapeHtml(group.category) + "</h3>",
        '<div class="ratio-table-wrap">',
        '<table class="ratio-table">',
        '<thead><tr><th scope="col">比率</th><th scope="col">公式</th><th scope="col">說明</th>' + (showChapter ? '<th scope="col">對應章節</th>' : "") + "</tr></thead>",
        "<tbody>",
        group.entries.map(function (entry) {
          return [
            "<tr>",
            '<th scope="row">' + escapeHtml(entry.name) + "</th>",
            '<td class="ratio-formula" data-label="公式">' + ratioFormulaMarkup(entry) + "</td>",
            '<td data-label="說明">' + renderInlineMath(entry.note) + "</td>",
            showChapter ? '<td data-label="對應章節">' + ratioFormulaLink(entry) + "</td>" : "",
            "</tr>"
          ].join("");
        }).join(""),
        "</tbody></table></div></section>"
      ].join("");
    }).join("");
  }

  function renderInvestmentRatioOverview() {
    const entries = investmentRatioFormulas();
    if (!entries.length) {
      return "";
    }
    return [
      '<section class="ratio-overview" id="ratio-formulas" aria-labelledby="ratio-formulas-heading">',
      '<div class="ratio-overview-head">',
      "<div>",
      '<p class="eyebrow">財務分析 · 比率總表</p>',
      '<h2 id="ratio-formulas-heading">比例分析公式列表</h2>',
      "<p>流動性、償債能力、經營效率、獲利能力、市場價值、盈餘品質、杜邦分析、風險調整績效與市場時機，共 " + entries.length + " 條。所有公式與對應章節共用同一份資料；修改公式資料，本頁與章節頁會同步更新。</p>",
      "</div>",
      '<div class="ratio-overview-actions">',
      '<a class="btn btn-small" href="#/chapter/investment-14?section=2">財務分析 →</a>',
      '<a class="btn btn-small" href="#/chapter/investment-17?section=2">績效指標 →</a>',
      "</div>",
      "</div>",
      '<div class="ratio-groups">' + renderRatioFormulaTables(entries, { showChapter: true }) + "</div>",
      '<p class="ratio-note">比率需與同業、歷史趨勢與產業特性一起解讀；分子分母的期間與單位要一致。平均數通常以期初與期末平均計算。</p>',
      "</section>"
    ].join("");
  }

  function investmentOptionPriorities() {
    return (Array.isArray(window.INVESTMENT_OPTION_PRIORITIES) ? window.INVESTMENT_OPTION_PRIORITIES : []).filter(function (item) {
      return item && item.topic && item.goal;
    });
  }

  function renderOptionFormulaList(item) {
    const formulas = Array.isArray(item.formulas) ? item.formulas : [];
    if (!formulas.length) {
      return "";
    }
    return [
      '<div class="option-formulas">',
      formulas.map(function (formula) {
        return [
          '<div class="option-formula">',
          '<span class="option-formula-label">' + escapeHtml(formula.label) + "</span>",
          '<span class="ratio-math">' + renderKatex(formula.latex, false) + "</span>",
          "</div>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderOptionVariables(item) {
    const variables = Array.isArray(item.variables) ? item.variables : [];
    if (!variables.length) {
      return "";
    }
    return [
      '<div class="option-variables">',
      '  <p class="option-variables-title">變數定義</p>',
      '  <dl class="option-variable-list">',
      variables.map(function (variable) {
        return "<dt>" + renderKatex(variable.symbol, false) + "</dt><dd>" + renderInlineMath(variable.definition) + "</dd>";
      }).join(""),
      "  </dl>",
      "</div>"
    ].join("");
  }

  function renderOptionPriorityCard(item) {
    const hasFormulas = Array.isArray(item.formulas) && item.formulas.length > 0;
    const definitions = Array.isArray(item.definitions) ? item.definitions : [];
    const assumptions = Array.isArray(item.assumptions) ? item.assumptions : [];
    return [
      '<article class="option-card' + (hasFormulas ? "" : " is-lite") + '">',
      '  <div class="option-card-head">',
      '    <span class="priority-badge">' + escapeHtml(item.priority) + "</span>",
      "    <div>",
      "      <h3>" + escapeHtml(item.topic) + "</h3>",
      '      <p class="option-card-goal">' + renderInlineMath(item.goal) + "</p>",
      "    </div>",
      "  </div>",
      '  <p class="option-card-summary">' + renderInlineMath(item.summary || "") + "</p>",
      definitions.length
        ? '<div class="option-definition"><p class="option-section-label">模型定義</p>' + definitions.map(function (paragraph) {
            return "<p>" + renderInlineMath(paragraph) + "</p>";
          }).join("") + "</div>"
        : "",
      renderOptionFormulaList(item),
      renderOptionVariables(item),
      assumptions.length
        ? '<div class="option-assumptions"><p class="option-section-label">假設與限制</p><ul>' + assumptions.map(function (paragraph) {
            return "<li>" + renderInlineMath(paragraph) + "</li>";
          }).join("") + "</ul></div>"
        : "",
      item.note ? '  <p class="option-note">' + renderInlineMath(item.note) + "</p>" : "",
      "</article>"
    ].join("");
  }

  function renderOptionPrioritySection() {
    const items = investmentOptionPriorities();
    if (!items.length) {
      return "";
    }
    return [
      '<section class="option-priority" id="option-priorities" aria-labelledby="option-priorities-heading">',
      '  <div class="option-priority-head">',
      "    <div>",
      '      <p class="eyebrow">選擇權評價 · 準備順序</p>',
      '      <h2 id="option-priorities-heading">選擇權評價優先順序</h2>',
      "      <p>先練到期損益，再算二項式與 Black-Scholes，最後用買賣權平價推價格；三項式樹、蒙地卡羅與 Heston 則分別整理公式、模型定義與假設限制。</p>",
      "    </div>",
      '    <a class="btn btn-small" href="#/chapter/investment-09?section=3">選擇權章節 →</a>',
      "  </div>",
      '  <div class="priority-table-wrap">',
      '    <table class="priority-table">',
      '      <thead><tr><th scope="col">優先順序</th><th scope="col">內容</th><th scope="col">目標</th></tr></thead>',
      "      <tbody>" + items.map(function (item) {
        return '<tr><td class="priority-rank">' + escapeHtml(item.priority) + "</td><td><strong>" + escapeHtml(item.topic) + "</strong></td><td>" + escapeHtml(item.goal) + "</td></tr>";
      }).join("") + "</tbody>",
      "    </table>",
      "  </div>",
      '  <div class="option-cards">' + items.map(renderOptionPriorityCard).join("") + "</div>",
      "</section>"
    ].join("");
  }

  function investmentFormulaLibrary() {
    const library = window.INVESTMENT_FORMULA_LIBRARY;
    return library && Array.isArray(library.categories) ? library : { meta: {}, categories: [] };
  }

  function investmentTechnicalIndicators() {
    const library = window.INVESTMENT_TECHNICAL_INDICATORS;
    return library && Array.isArray(library.categories) ? library : { meta: {}, categories: [] };
  }

  function formulaLibraryEntryCount(library) {
    return (library && Array.isArray(library.categories) ? library.categories : []).reduce(function (sum, category) {
      return sum + (Array.isArray(category.entries) ? category.entries.length : 0);
    }, 0);
  }

  function formulaLibraryPriorityBadge(priority) {
    const value = String(priority || "").toUpperCase();
    const className = value === "A" ? "is-a" : value === "B" ? "is-b" : "is-c";
    return '<span class="priority-badge ' + className + '">' + escapeHtml(value || "—") + "</span>";
  }

  function formulaLibraryChapterLink(entry) {
    const chapter = entry && entry.chapterId ? getChapter(entry.chapterId) : null;
    if (!chapter) {
      return "—";
    }
    return '<a class="text-link" href="#/chapter/' + escapeHtml(chapter.id) + '">' + escapeHtml(chapterLabel(chapter) + " " + chapter.title) + "</a>";
  }

  function renderFormulaVariableSymbol(symbol) {
    const text = String(symbol || "");
    if (/[\\_^]/.test(text) || /^[A-Za-z]+$/.test(text)) {
      return renderKatex(text, false);
    }
    return escapeHtml(text);
  }

  function renderFormulaLibrary(library) {
    const categories = (library && Array.isArray(library.categories) ? library.categories : []).slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
    return categories.map(function (category) {
      const entries = Array.isArray(category.entries) ? category.entries : [];
      return [
        '<section class="formula-library-group" id="formula-category-' + escapeHtml(category.id) + '">',
        '  <div class="formula-library-head">',
        "    <div>",
        "      <h3>" + escapeHtml(category.title) + "</h3>",
        category.description ? "      <p>" + escapeHtml(category.description) + "</p>" : "",
        "    </div>",
        '    <span class="formula-library-count">' + entries.length + " 條</span>",
        "  </div>",
        '  <div class="ratio-table-wrap">',
        '    <table class="ratio-table formula-library-table">',
        '      <thead><tr><th scope="col">指標</th><th scope="col">公式</th><th scope="col">說明</th><th scope="col">優先級</th><th scope="col">對應章節</th></tr></thead>',
        "      <tbody>" + entries.map(function (entry) {
          const variables = Array.isArray(entry.variables) && entry.variables.length
            ? '<span class="formula-vars">' + entry.variables.map(function (variable) {
                return renderFormulaVariableSymbol(variable[0]) + "：" + escapeHtml(variable[1]);
              }).join("、") + "</span>"
            : "";
          const limitations = entry.limitations ? '<span class="formula-limit">限制：' + renderInlineMath(entry.limitations) + "</span>" : "";
          const parameters = entry.parameters ? '<span class="formula-param">參數：' + renderInlineMath(entry.parameters) + "</span>" : "";
          return [
            "<tr>",
            '<th scope="row"><span class="formula-name">' + escapeHtml(entry.name) + "</span>" + parameters + "</th>",
            '<td class="ratio-formula" data-label="公式">' + ratioFormulaMarkup(entry) + variables + "</td>",
            '<td data-label="說明">' + escapeHtml(entry.note || "") + limitations + "</td>",
            '<td data-label="優先級">' + formulaLibraryPriorityBadge(entry.priority) + "</td>",
            '<td data-label="對應章節">' + formulaLibraryChapterLink(entry) + "</td>",
            "</tr>"
          ].join("");
        }).join("") + "</tbody>",
        "    </table>",
        "  </div>",
        "</section>"
      ].join("");
    }).join("");
  }

  function renderInvestmentFormulasCard() {
    const ratioCount = investmentRatioFormulas().length;
    const optionCount = investmentOptionPriorities().length;
    const libraryCount = formulaLibraryEntryCount(investmentFormulaLibrary());
    return [
      '<a class="subject-written-cta" href="#/investment/formulas">',
      '  <div>',
      '    <p class="eyebrow">投資學 · 公式與比率</p>',
      '    <strong>投資學公式總表</strong>',
      '    <span>比例分析 ' + ratioCount + " 條、核心公式 " + libraryCount + " 條與選擇權評價 " + optionCount + " 項，集中整理成獨立頁面。</span>",
      '  </div>',
      '  <span class="subject-written-cta-arrow">查看 →</span>',
      '</a>'
    ].join("");
  }

  function renderInvestmentTechnicalCard() {
    const technicalCount = formulaLibraryEntryCount(investmentTechnicalIndicators());
    return [
      '<a class="subject-written-cta" href="#/investment/technical">',
      '  <div>',
      '    <p class="eyebrow">投資學 · 技術分析</p>',
      '    <strong>技術分析 50 指標</strong>',
      '    <span>趨勢、動能、波動率與通道、成交量與資金流、支撐壓力與複合指標，共 ' + technicalCount + " 種，已整理成獨立頁面。</span>",
      '  </div>',
      '  <span class="subject-written-cta-arrow">查看 →</span>',
      '</a>'
    ].join("");
  }

  function renderInvestmentFormulasPage() {
    const ratioCount = investmentRatioFormulas().length;
    const optionCount = investmentOptionPriorities().length;
    const coreLibraryCount = formulaLibraryEntryCount(investmentFormulaLibrary());
    return [
      '<div class="page subject-investment">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/investment">投資學</a><span>/</span>',
      "    <span>公式總表</span>",
      "  </nav>",
      renderPageHead("投資學 · 公式與比率", "投資學公式總表", "比例分析 " + ratioCount + " 條、核心公式 " + coreLibraryCount + " 條與選擇權評價 " + optionCount + " 項集中在一頁；技術分析 50 指標另設獨立頁面，公式與對應章節共用同一份資料。"),
      ratioCount ? renderInvestmentRatioOverview() : "",
      '<section class="formula-library-block" id="formula-library">',
      '  <div class="section-heading">',
      "    <div>",
      '      <p class="eyebrow">核心公式</p>',
      "      <h2>投資學核心公式庫</h2>",
      "      <p>依貨幣時間價值、投資報酬與風險、投資組合、資產定價、股票評價、債券分析、衍生性商品、風險管理、績效評估與資本結構分類；優先級 A 為基礎常考，B 為第二階段補強。</p>",
      "    </div>",
      "  </div>",
      coreLibraryCount ? renderFormulaLibrary(investmentFormulaLibrary()) : "",
      "</section>",
      optionCount ? renderOptionPrioritySection() : "",
      '  <div class="chapter-actions">',
      '    <a class="btn" href="#/investment/technical">技術分析 50 指標 →</a>',
      '    <a class="btn" href="#/subject/investment">← 回投資學</a>',
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderInvestmentTechnicalPage() {
    const technicalCount = formulaLibraryEntryCount(investmentTechnicalIndicators());
    return [
      '<div class="page subject-investment">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/investment">投資學</a><span>/</span>',
      "    <span>技術分析 50 指標</span>",
      "  </nav>",
      renderPageHead("投資學 · 技術分析", "技術分析 50 指標", "依趨勢、動能、波動率與通道、成交量與資金流、支撐壓力與複合指標分類，共 " + technicalCount + " 種；公式以一般股票日線資料為基礎，參數與平滑方式可能因軟體而異。"),
      '<section class="formula-library-block" id="technical-indicators">',
      '  <div class="section-heading">',
      "    <div>",
      '      <p class="eyebrow">技術分析</p>',
      "      <h2>技術分析 50 指標</h2>",
      "      <p>以下指標與對應章節共用同一份資料；技術指標是輔助判斷工具，不宜單獨作為買賣決策依據。</p>",
      "    </div>",
      "  </div>",
      technicalCount ? renderFormulaLibrary(investmentTechnicalIndicators()) : "",
      "</section>",
      '  <div class="chapter-actions">',
      '    <a class="btn" href="#/investment/formulas">← 回公式總表</a>',
      '    <a class="btn" href="#/subject/investment">← 回投資學</a>',
      "  </div>",
      "</div>"
    ].join("");
  }

  /* ----------------------------- past exam practice ----------------------------- */

  function comparePracticeSessions(a, b) {
    return (a.year - b.year) || (a.session - b.session);
  }

  function comparePracticeSessionsDesc(a, b) {
    return (b.year - a.year) || (b.session - a.session);
  }

  function loadPracticeAnswers() {
    const answers = new Map();
    try {
      const raw = window.localStorage.getItem(PRACTICE_PROGRESS_KEY);
      if (!raw) {
        return answers;
      }
      const saved = JSON.parse(raw);
      Object.keys(saved).forEach(function (id) {
        if (typeof saved[id] === "string" && /^[A-D]$/.test(saved[id])) {
          answers.set(id, saved[id]);
        }
      });
    } catch (error) {
      /* localStorage 可能被停用；不影響本次瀏覽。 */
    }
    return answers;
  }

  function savePracticeAnswers() {
    if (!practiceState) {
      return;
    }
    try {
      const saved = {};
      practiceState.answers.forEach(function (value, key) {
        saved[key] = value;
      });
      window.localStorage.setItem(PRACTICE_PROGRESS_KEY, JSON.stringify(saved));
    } catch (error) {
      /* localStorage 可能被停用；不影響本次瀏覽。 */
    }
  }

  function ensurePracticeState() {
    if (practiceState) {
      return;
    }
    const route = parseRoute();
    const requestedYear = route.query.get("year");
    const requestedSession = route.query.get("session");
    const questionId = route.query.get("question") || "";
    let targetYear = /^\d{3}$/.test(requestedYear || "") ? Number(requestedYear) : null;
    if (!targetYear && requestedYear !== "all") {
      const match = questionId.match(/^(\d{3})/);
      if (match) targetYear = Number(match[1]);
    }
    const allSessions = practiceSessions.slice().sort(comparePracticeSessions);
    const yearSessions = targetYear
      ? allSessions.filter(function (session) { return session.year === targetYear; })
      : allSessions;
    const latest = yearSessions.length ? yearSessions[yearSessions.length - 1] : allSessions[allSessions.length - 1];
    const validSession = requestedSession && (requestedSession === "all" || yearSessions.some(function (session) { return session.id === requestedSession; }));
    practiceState = {
      year: requestedYear === "all" ? "all" : (targetYear || (latest ? latest.year : "all")),
      session: requestedYear === "all" ? "all" : (validSession ? requestedSession : (latest ? latest.id : "all")),
      subject: "all",
      keyword: "",
      mode: "practice",
      index: 0,
      selected: null,
      revealed: false,
      answers: loadPracticeAnswers(),
      browsePage: 0,
      browseRevealed: new Set(),
      browseAll: false
    };
    practiceLoadCurrent(practiceFilteredQuestions());
  }

  function practiceFocusQuestion(questionId) {
    if (!practiceState || !questionId) {
      return;
    }
    const question = practiceQuestions.find(function (item) { return item.id === questionId; });
    if (!question) {
      return;
    }
    practiceState.year = question.year;
    practiceState.session = question.sessionId;
    practiceState.subject = question.subject;
    practiceState.keyword = "";
    practiceState.mode = "practice";
    practiceState.browsePage = 0;
    const questions = practiceFilteredQuestions();
    const index = questions.findIndex(function (item) { return item.id === question.id; });
    practiceState.index = index >= 0 ? index : 0;
    practiceLoadCurrent(questions);
  }

  function practiceSessionsForYear() {
    if (!practiceState) {
      return [];
    }
    return practiceSessions.filter(function (session) {
      return practiceState.year === "all" || session.year === practiceState.year;
    }).sort(comparePracticeSessionsDesc);
  }

  function practiceSyncSession() {
    if (!practiceState) {
      return;
    }
    const sessions = practiceSessionsForYear();
    const exists = sessions.some(function (session) {
      return session.id === practiceState.session;
    });
    if (practiceState.session !== "all" && !exists) {
      practiceState.session = "all";
    }
  }

  function practiceFilteredQuestions() {
    if (!practiceState) {
      return [];
    }
    const keyword = String(practiceState.keyword || "").replace(/\s+/g, "").toLowerCase();
    return practiceQuestions.filter(function (question) {
      if (practiceState.year !== "all" && question.year !== practiceState.year) {
        return false;
      }
      if (practiceState.subject !== "all" && question.subject !== practiceState.subject) {
        return false;
      }
      if (practiceState.session !== "all" && question.sessionId !== practiceState.session) {
        return false;
      }
      if (keyword) {
        const haystack = (question.stem + " " + question.options.join(" ")).replace(/\s+/g, "").toLowerCase();
        if (haystack.indexOf(keyword) === -1) {
          return false;
        }
      }
      return true;
    });
  }

  function practiceLoadCurrent(questions) {
    if (!practiceState) {
      return;
    }
    if (!questions.length) {
      practiceState.index = 0;
      practiceState.selected = null;
      practiceState.revealed = false;
      return;
    }
    if (practiceState.index < 0) {
      practiceState.index = 0;
    }
    if (practiceState.index >= questions.length) {
      practiceState.index = questions.length - 1;
    }
    const question = questions[practiceState.index];
    practiceState.selected = practiceState.answers.get(question.id) || null;
    practiceState.revealed = practiceState.answers.has(question.id);
  }

  function practiceResetCursor(questions) {
    if (!practiceState) {
      return;
    }
    practiceState.index = 0;
    practiceState.browsePage = 0;
    practiceLoadCurrent(questions);
  }

  function practiceIsCorrect(question, selected) {
    return Boolean(question && selected && question.answer.indexOf(selected) !== -1);
  }

  function practiceAnswerText(answer) {
    const letters = Array.isArray(answer) ? answer : [];
    if (letters.length >= 4) {
      return "官方公告：A–D 均給分";
    }
    if (letters.length > 1) {
      return "官方接受：" + letters.join("、");
    }
    return "官方答案：" + (letters[0] || "—");
  }

  function practiceScore(questions) {
    let answered = 0;
    let correct = 0;
    questions.forEach(function (question) {
      if (practiceState.answers.has(question.id)) {
        answered += 1;
        if (practiceIsCorrect(question, practiceState.answers.get(question.id))) {
          correct += 1;
        }
      }
    });
    return { answered: answered, correct: correct };
  }

  function practiceSubjectBadge(subject) {
    const label = subject && (subject.short || subject.name) ? (subject.short || subject.name) : "題目";
    const colorClass = subject && subject.colorClass ? subject.colorClass : "";
    return '<span class="past-exam-badge ' + escapeHtml(colorClass) + '">' + escapeHtml(label) + "</span>";
  }

  function practiceChapterStatsFor(chapterId) {
    return practiceChapterStats.get(chapterId) || { count: 0, sessions: new Map() };
  }

  function practiceSubjectQuestionCount(subjectId) {
    return practiceSubjectQuestionTotals.get(subjectId) || 0;
  }

  function writtenChapterStatsFor(chapterId) {
    return writtenChapterStats.get(chapterId) || { count: 0, sessions: new Map() };
  }

  function writtenSubjectQuestionCount(subjectId) {
    return writtenSubjectQuestionTotals.get(subjectId) || 0;
  }

  function practicePercentText(count, total) {
    if (!total) {
      return "0.0%";
    }
    return (Math.round((count / total) * 1000) / 10).toFixed(1) + "%";
  }

  function practiceChapterSessionEntries(chapterId) {
    const stats = practiceChapterStatsFor(chapterId);
    return Array.from(stats.sessions.entries()).map(function (entry) {
      return {
        session: practiceSessionMap.get(entry[0]) || { id: entry[0], label: entry[0] },
        count: entry[1]
      };
    }).sort(function (a, b) {
      return comparePracticeSessionsDesc(a.session, b.session);
    });
  }

  function renderPracticeQuestionOrigin(question, session) {
    const sourceIds = question && Array.isArray(question.sourceIds) && question.sourceIds.length
      ? Array.from(new Set(question.sourceIds))
      : (question && question.sourceId ? [question.sourceId] : []);
    const chapters = sourceIds.map(getChapter).filter(Boolean);
    const sessionLabel = session && session.label ? session.label : (question.year + " 年第 " + question.session + " 次");
    if (!chapters.length) {
      return '<div class="past-exam-origin is-unclassified"><span class="past-exam-origin-label">出處</span><span>未分類</span><span class="past-exam-origin-meta">' + escapeHtml(sessionLabel) + "</span></div>";
    }
    const event = question && question.eventId ? macroCurrentEventMap.get(question.eventId) : null;
    return [
      '<div class="past-exam-origin">',
      '  <span class="past-exam-origin-label">出處</span>',
      chapters.map(function (chapter) {
        return '<a href="#/chapter/' + escapeHtml(chapter.id) + '">' + escapeHtml(chapterLabel(chapter)) + " " + escapeHtml(chapter.title) + "</a>";
      }).join('<span class="past-exam-origin-sep">、</span>'),
      event ? '  <a class="past-exam-origin-current" href="#/macro-current?event=' + escapeHtml(event.id) + '">時事：' + escapeHtml(event.title) + "</a>" : "",
      '  <span class="past-exam-origin-meta">' + escapeHtml(sessionLabel) + "</span>",
      "</div>"
    ].join("");
  }

  function renderChapterExamStats(chapter, subject) {
    const choiceStats = practiceChapterStatsFor(chapter.id);
    const writtenStats = writtenChapterStatsFor(chapter.id);
    const choiceTotal = practiceSubjectQuestionCount(subject.id);
    const writtenTotal = writtenSubjectQuestionCount(subject.id);
    const choiceRate = practicePercentText(choiceStats.count, choiceTotal);
    const writtenRate = practicePercentText(writtenStats.count, writtenTotal);
    const title = "107–115 年：選擇題 " + choiceStats.count + " 題（" + choiceRate + "）、申論題 " + writtenStats.count + " 題（" + writtenRate + "）；跨章節題目會重複計入各章。";
    return [
      '<div class="chapter-exam-stats" title="' + escapeHtml(title) + '">',
      '  <span class="chapter-exam-stat">選擇題 <strong class="exam-count">' + choiceStats.count + '</strong> 題 頻率 <strong class="exam-rate">' + choiceRate + "</strong></span>",
      '  <span class="chapter-exam-stat">申論題 <strong class="exam-count">' + writtenStats.count + '</strong> 題 頻率 <strong class="exam-rate">' + writtenRate + "</strong></span>",
      "</div>"
    ].join("");
  }

  function renderChapterExamSourceBlock(chapter) {
    const choiceStats = practiceChapterStatsFor(chapter.id);
    const writtenStats = writtenChapterStatsFor(chapter.id);
    const choiceRate = practicePercentText(choiceStats.count, practiceSubjectQuestionCount(chapter.subjectId));
    const writtenRate = practicePercentText(writtenStats.count, writtenSubjectQuestionCount(chapter.subjectId));
    return [
      '<section class="chapter-exam-sources" id="chapter-exam-sources" aria-labelledby="chapter-exam-sources-heading">',
      '  <div class="chapter-exam-sources-head">',
      "    <div>",
      '      <p class="eyebrow">考古題出處</p>',
      '      <h2 id="chapter-exam-sources-heading">本章出題紀錄</h2>',
      "    </div>",
      '    <div class="chapter-exam-totals">',
      '      <div class="chapter-exam-total"><strong>' + choiceStats.count + "</strong><span>選擇題 · " + choiceRate + "</span></div>",
      '      <div class="chapter-exam-total"><strong>' + writtenStats.count + "</strong><span>申論題 · " + writtenRate + "</span></div>",
      "    </div>",
      "  </div>",
      "  <p class=\"chapter-exam-note\">以 107–115 年選擇題與計算／申論題的章節出處統計；頻率分別以該科選擇題數與申論題數為分母；跨章節題目會重複計入各章。題目已依節次列在本章各節的「本節出處題目」，可直接點選進入該題。</p>",
      '  <a class="text-link" href="#/past-exams">前往考古題練習庫 →</a>',
      "</section>"
    ].join("");
  }

  function practiceSummaryText() {
    const questions = practiceFilteredQuestions();
    const sessionCount = new Set(questions.map(function (question) {
      return question.sessionId;
    })).size;
    const yearLabel = practiceState.year === "all" ? "全部年度" : practiceState.year + " 年";
    const subject = practiceState.subject === "all" ? null : practiceSubjectMap.get(practiceState.subject);
    const subjectLabel = subject ? (subject.short || subject.name) : "全部科目";
    const session = practiceState.session === "all" ? null : practiceSessionMap.get(practiceState.session);
    const sessionLabel = session ? session.label : "全部次別";
    const keywordLabel = practiceState.keyword ? " · 關鍵字「" + escapeHtml(practiceState.keyword) + "」" : "";
    return "<strong>" + questions.length + "</strong> 題 · " + sessionCount + " 次考試 · " +
      escapeHtml(yearLabel) + " · " + escapeHtml(subjectLabel) + " · " + escapeHtml(sessionLabel) + keywordLabel;
  }

  function practiceRefreshFilters() {
    const target = document.getElementById("past-exam-filters");
    if (target) {
      target.innerHTML = renderPracticeFilters();
    }
  }

  function practiceRefreshSummary() {
    const target = document.getElementById("past-exam-filter-summary");
    if (target) {
      target.innerHTML = practiceSummaryText();
    }
  }

  function practiceRefreshPanel(preserveScroll) {
    const target = document.getElementById("past-exam-panel");
    if (!target) {
      return;
    }
    const scrollY = window.scrollY;
    target.innerHTML = renderPracticePanel();
    if (preserveScroll) {
      window.scrollTo({ top: scrollY, behavior: "auto" });
    }
  }

  function practiceScrollToPanel() {
    const target = document.getElementById("past-exam-panel");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderPracticeModeToggle() {
    return [
      '<div class="past-exam-mode-toggle" role="group" aria-label="顯示模式">',
      '  <button class="past-exam-chip' + (practiceState.mode === "practice" ? " is-active" : "") + '" type="button" data-practice-mode="practice" aria-pressed="' + (practiceState.mode === "practice") + '">練習模式</button>',
      '  <button class="past-exam-chip' + (practiceState.mode === "browse" ? " is-active" : "") + '" type="button" data-practice-mode="browse" aria-pressed="' + (practiceState.mode === "browse") + '">題目瀏覽</button>',
      "</div>"
    ].join("");
  }

  function renderPracticeFilters() {
    ensurePracticeState();
    practiceSyncSession();
    const years = Array.from(new Set(practiceSessions.map(function (session) {
      return session.year;
    }))).sort(function (a, b) { return b - a; });
    const sessions = practiceSessionsForYear();
    const yearButtons = [
      '<button class="past-exam-chip' + (practiceState.year === "all" ? " is-active" : "") + '" type="button" data-practice-year="all" aria-pressed="' + (practiceState.year === "all") + '">全部年度</button>'
    ].concat(years.map(function (year) {
      return '<button class="past-exam-chip' + (practiceState.year === year ? " is-active" : "") + '" type="button" data-practice-year="' + year + '" aria-pressed="' + (practiceState.year === year) + '">' + year + " 年</button>";
    })).join("");
    const subjectButtons = [
      '<button class="past-exam-chip' + (practiceState.subject === "all" ? " is-active" : "") + '" type="button" data-practice-subject="all" aria-pressed="' + (practiceState.subject === "all") + '">全部科目</button>'
    ].concat(practiceSubjects.map(function (subject) {
      return '<button class="past-exam-chip' + (practiceState.subject === subject.id ? " is-active" : "") + '" type="button" data-practice-subject="' + escapeHtml(subject.id) + '" aria-pressed="' + (practiceState.subject === subject.id) + '">' + escapeHtml(subject.short || subject.name) + "</button>";
    })).join("");
    const sessionOptions = [
      '<option value="all"' + (practiceState.session === "all" ? " selected" : "") + ">全部次別</option>"
    ].concat(sessions.map(function (session) {
      return '<option value="' + escapeHtml(session.id) + '"' + (practiceState.session === session.id ? " selected" : "") + ">" + escapeHtml(session.label) + "</option>";
    })).join("");

    return [
      '<div class="past-exam-filter-row">',
      '  <span class="past-exam-filter-label">年度</span>',
      '  <div class="past-exam-chips">' + yearButtons + "</div>",
      "</div>",
      '<div class="past-exam-filter-row">',
      '  <span class="past-exam-filter-label">科目</span>',
      '  <div class="past-exam-chips">' + subjectButtons + "</div>",
      "</div>",
      '<div class="past-exam-filter-row past-exam-filter-row-session">',
      '  <span class="past-exam-filter-label">次別</span>',
      '  <div class="past-exam-session-tools">',
      '    <select class="past-exam-select" data-practice-session aria-label="選擇考試次別">' + sessionOptions + "</select>",
      '    <label class="past-exam-search-wrap">',
      '      <span class="sr-only">搜尋題幹或選項</span>',
      '      <input class="past-exam-search" type="search" data-practice-search value="' + escapeHtml(practiceState.keyword) + '" placeholder="搜尋題幹或選項…" autocomplete="off">',
      "    </label>",
      "  </div>",
      "</div>",
      '<div class="past-exam-filter-summary" id="past-exam-filter-summary">' + practiceSummaryText() + "</div>"
    ].join("");
  }

  function renderPracticeSourceLinks(session, compact) {
    if (!session || !session.questionUrl) {
      return "";
    }
    const links = [
      '<a href="' + escapeHtml(session.questionUrl) + '" target="_blank" rel="noopener noreferrer">原始試題 PDF</a>'
    ];
    if (!compact && session.answerUrl) {
      links.push('<a href="' + escapeHtml(session.answerUrl) + '" target="_blank" rel="noopener noreferrer">選擇題解答 PDF</a>');
    }
    return '<div class="past-exam-source-links"><span>' + escapeHtml(session.sourceName || "歷屆試題") + "</span>" + links.join("") + "</div>";
  }

  function renderPracticeOption(question, letter, text, selected, revealed) {
    const isCorrect = question.answer.indexOf(letter) !== -1;
    const classes = ["past-exam-option"];
    if (!revealed && selected === letter) {
      classes.push("is-selected");
    }
    if (revealed && isCorrect) {
      classes.push("is-correct");
    }
    if (revealed && selected === letter && !isCorrect) {
      classes.push("is-wrong");
    }
    return [
      '<button class="' + classes.join(" ") + '" type="button" data-practice-option="' + letter + '" aria-pressed="' + (selected === letter) + '">',
      '  <span class="past-exam-option-letter">' + letter + "</span>",
      '  <span class="past-exam-option-text">' + renderInlineMath(text) + "</span>",
      "</button>"
    ].join("");
  }

  function pastExamExplanationFor(question) {
    const data = window.PAST_EXAM_EXPLANATIONS || {};
    const explanation = data[question.id];
    return explanation && explanation.options ? explanation : null;
  }

  function ensurePastExamExplanations() {
    if (window.PAST_EXAM_EXPLANATIONS) {
      return Promise.resolve();
    }
    if (typeof window.__loadExplanations === "function") {
      return window.__loadExplanations();
    }
    return Promise.resolve();
  }

  function fallbackOptionAnalysis(question, letter) {
    const correct = question.answer.indexOf(letter) !== -1;
    return correct
      ? "此選項符合題意，為官方答案。"
      : "此選項與題意不符；本題官方答案為 " + question.answer.join("、") + "。";
  }

  function renderPastExamAnalysis(question) {
    if (!Array.isArray(question.options) || !question.options.length) {
      return "";
    }
    const explanation = pastExamExplanationFor(question);
    const summary = explanation && explanation.summary
      ? explanation.summary
      : "本題官方答案為 " + question.answer.join("、") + "。";
    const explanationNotice = explanation
      ? ""
      : '<div class="past-exam-analysis-notice"><span>完整解析尚未載入；目前先顯示官方答案與基本說明。</span><button class="btn btn-small" type="button" data-practice-load-explanations>載入完整解析</button></div>';
    const items = question.options.map(function (text, index) {
      const letter = "ABCD"[index];
      const correct = question.answer.indexOf(letter) !== -1;
      const analysis = explanation && explanation.options && explanation.options[letter]
        ? explanation.options[letter]
        : fallbackOptionAnalysis(question, letter);
      return [
        '<li class="' + (correct ? "is-correct" : "") + '">',
        '  <span class="past-exam-analysis-letter">' + letter + "</span>",
        '  <div class="past-exam-analysis-body">',
        '    <span class="past-exam-analysis-tag">' + (correct ? "正解" : "非正解") + "</span>",
        "    <p>" + renderInlineMath(analysis) + "</p>",
        "  </div>",
        "</li>"
      ].join("");
    }).join("");
    return [
      '<section class="past-exam-analysis" aria-label="選項分析">',
      '  <div class="past-exam-analysis-head"><h3>選項分析</h3><span>本站參考解析（非官方）</span></div>',
      explanationNotice,
      '  <p class="past-exam-analysis-summary">' + renderInlineMath(summary) + "</p>",
      '  <ul class="past-exam-analysis-list">' + items + "</ul>",
      "</section>"
    ].join("");
  }

  function renderPracticeMode(questions) {
    const question = questions[practiceState.index];
    const session = practiceSessionMap.get(question.sessionId) || {};
    const subject = practiceSubjectMap.get(question.subject) || { short: question.subject, colorClass: "" };
    const selected = practiceState.selected;
    const revealed = practiceState.revealed;
    const correct = practiceIsCorrect(question, selected);
    const score = practiceScore(questions);
    const nextDisabled = practiceState.index >= questions.length - 1;
    const progressPercent = Math.round(((practiceState.index + 1) / questions.length) * 100);
    const feedback = revealed ? [
      '<div class="past-exam-feedback ' + (correct ? "is-correct" : "is-wrong") + '">',
      "  <strong>" + (selected ? (correct ? "答對了。" : "答錯了。") : "已顯示答案。") + "</strong>",
      "  <span>" + escapeHtml(practiceAnswerText(question.answer)) + "</span>",
      question.answer.length > 1 ? '  <span class="past-exam-feedback-note">' + (question.answer.length >= 4 ? "本題官方公告 A–D 均給分。" : "本題官方接受多個答案；選到任一個都算答對。") + "</span>" : "",
      "</div>"
    ].join("") : "";
    const primaryAction = revealed
      ? '<button class="btn btn-primary" type="button" data-practice-next ' + (nextDisabled ? "disabled" : "") + ">" + (nextDisabled ? "已完成" : "下一題") + "</button>"
      : '<button class="btn btn-primary" type="button" data-practice-submit ' + (selected ? "" : "disabled") + ">看答案</button>";
    const actions = [
      primaryAction,
      '<button class="btn" type="button" data-practice-prev ' + (practiceState.index === 0 ? "disabled" : "") + ">上一題</button>",
      revealed ? '<button class="btn btn-small" type="button" data-practice-retry>重新作答</button>' : "",
      revealed && nextDisabled ? '<button class="btn btn-small" type="button" data-practice-restart>回到第一題</button>' : "",
      '<button class="btn btn-small" type="button" data-practice-reset-range>清除本範圍紀錄</button>'
    ].join("");

    return [
      '<div class="past-exam-toolbar">',
      renderPracticeModeToggle(),
      '<div class="past-exam-score">已答 <strong>' + score.answered + "</strong> / " + questions.length + " · 答對 <strong>" + score.correct + "</strong></div>",
      "</div>",
      '<article class="past-exam-card">',
      '  <div class="past-exam-card-head">',
      practiceSubjectBadge(subject),
      "    <span>" + escapeHtml(session.label || "歷屆試題") + " · 第 " + question.number + " 題</span>",
      '    <span class="past-exam-progress-text">' + (practiceState.index + 1) + " / " + questions.length + "</span>",
      "  </div>",
      '  <div class="past-exam-progress" role="progressbar" aria-label="本範圍作答進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progressPercent + '">',
      '    <div class="past-exam-progress-fill" style="width:' + progressPercent + '%"></div>',
      "  </div>",
      '  <h2 class="past-exam-stem">' + renderInlineMath(question.stem) + "</h2>",
      renderPracticeQuestionOrigin(question, session),
      '  <div class="past-exam-options" role="group" aria-label="選擇題選項">',
      question.options.map(function (text, index) {
        return renderPracticeOption(question, "ABCD"[index], text, selected, revealed);
      }).join(""),
      "  </div>",
      feedback,
      revealed ? renderPastExamAnalysis(question) : "",
      '  <div class="past-exam-actions">' + actions + "</div>",
      renderPracticeSourceLinks(session, false),
      "</article>"
    ].join("");
  }

  function renderPracticeBrowseCard(question) {
    const session = practiceSessionMap.get(question.sessionId) || {};
    const subject = practiceSubjectMap.get(question.subject) || { short: question.subject, colorClass: "" };
    const revealed = practiceState.browseAll || practiceState.browseRevealed.has(question.id);
    const options = question.options.map(function (text, index) {
      const letter = "ABCD"[index];
      const correct = revealed && question.answer.indexOf(letter) !== -1;
      return '<li' + (correct ? ' class="is-correct"' : "") + '><span class="past-exam-option-letter">' + letter + "</span><span>" + renderInlineMath(text) + "</span></li>";
    }).join("");
    const answer = revealed
      ? '<div class="past-exam-browse-answer"><strong>' + escapeHtml(practiceAnswerText(question.answer)) + "</strong>" +
        (question.answer.length > 1 ? '<span>' + (question.answer.length >= 4 ? "官方公告 A–D 均給分。" : "官方接受多個答案。") + "</span>" : "") + "</div>"
      : "";
    return [
      '<article class="past-exam-browse-card" id="past-exam-' + escapeHtml(question.id) + '">',
      '  <div class="past-exam-card-head">',
      practiceSubjectBadge(subject),
      "    <span>" + escapeHtml(session.label || "歷屆試題") + " · 第 " + question.number + " 題</span>",
      "  </div>",
      '  <h3 class="past-exam-browse-stem">' + renderInlineMath(question.stem) + "</h3>",
      renderPracticeQuestionOrigin(question, session),
      '  <ol class="past-exam-browse-options">' + options + "</ol>",
      answer,
      revealed ? renderPastExamAnalysis(question) : "",
      '  <div class="past-exam-browse-actions">',
      '    <button class="btn btn-small" type="button" data-practice-reveal="' + escapeHtml(question.id) + '">' + (revealed ? "收起答案" : "顯示答案") + "</button>",
      renderPracticeSourceLinks(session, true),
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderPracticeBrowse(questions) {
    const pageSize = 20;
    const pageCount = Math.max(1, Math.ceil(questions.length / pageSize));
    if (practiceState.browsePage >= pageCount) {
      practiceState.browsePage = pageCount - 1;
    }
    if (practiceState.browsePage < 0) {
      practiceState.browsePage = 0;
    }
    const start = practiceState.browsePage * pageSize;
    const pageQuestions = questions.slice(start, start + pageSize);
    const score = practiceScore(questions);
    const pagination = pageCount > 1 ? [
      '<div class="past-exam-pagination">',
      '  <button class="btn btn-small" type="button" data-practice-page="prev" ' + (practiceState.browsePage === 0 ? "disabled" : "") + ">上一頁</button>",
      "  <span>第 " + (practiceState.browsePage + 1) + " / " + pageCount + " 頁</span>",
      '  <button class="btn btn-small" type="button" data-practice-page="next" ' + (practiceState.browsePage >= pageCount - 1 ? "disabled" : "") + ">下一頁</button>",
      "</div>"
    ].join("") : "";

    return [
      '<div class="past-exam-toolbar">',
      renderPracticeModeToggle(),
      '<div class="past-exam-toolbar-actions">',
      '  <button class="btn btn-small" type="button" data-practice-browse-all>' + (practiceState.browseAll ? "收起全部答案" : "展開全部答案") + "</button>",
      '  <span class="past-exam-score">已答 <strong>' + score.answered + "</strong> / " + questions.length + " · 答對 <strong>" + score.correct + "</strong></span>",
      "</div>",
      "</div>",
      '<div class="past-exam-browse-list">' + pageQuestions.map(renderPracticeBrowseCard).join("") + "</div>",
      pagination,
      '<div class="past-exam-browse-foot"><button class="btn btn-small" type="button" data-practice-reset-range>清除本範圍紀錄</button></div>'
    ].join("");
  }

  function renderPracticeEmpty() {
    return [
      '<div class="past-exam-empty">',
      "  <h2>目前篩選沒有題目</h2>",
      "  <p>換一個年度、科目或次別，或清除搜尋關鍵字再試一次。</p>",
      '  <button class="btn btn-primary" type="button" data-practice-clear>清除篩選</button>',
      "</div>"
    ].join("");
  }

  function renderPracticePanel() {
    ensurePracticeState();
    const questions = practiceFilteredQuestions();
    if (!questions.length) {
      return renderPracticeEmpty();
    }
    if (practiceState.index >= questions.length) {
      practiceState.index = 0;
      practiceLoadCurrent(questions);
    }
    return practiceState.mode === "browse" ? renderPracticeBrowse(questions) : renderPracticeMode(questions);
  }

  function renderEventSourceLinks(event) {
    const chapters = (event.sourceIds || []).map(getChapter).filter(Boolean);
    return chapters.map(function (chapter) {
      return '<a href="#/chapter/' + escapeHtml(chapter.id) + '">' + escapeHtml(chapterLabel(chapter)) + " " + escapeHtml(chapter.title) + "</a>";
    }).join('<span class="past-exam-origin-sep">、</span>');
  }

  function renderMacroCurrentFormulas(event) {
    const formulas = macroCurrentData.formulasById && macroCurrentData.formulasById[event.id];
    if (!Array.isArray(formulas) || !formulas.length) {
      return "";
    }
    return [
      '<div class="macro-current-formulas">',
      "  <h3>公式</h3>",
      formulas.map(function (formula) {
        return [
          '<div class="macro-current-formula">',
          '  <span class="macro-current-formula-name">' + escapeHtml(formula.name || "公式") + "</span>",
          '  <div class="macro-current-formula-math">' + renderKatex(formula.latex || "", true) + "</div>",
          formula.note ? "  <p>" + renderExplicitMathText(formula.note) + "</p>" : "",
          "</div>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function macroNewsItemsForEvent(eventId) {
    const items = macroCurrentData.top20 && Array.isArray(macroCurrentData.top20.items)
      ? macroCurrentData.top20.items
      : [];
    return items.filter(function (item) {
      return item.eventId === eventId;
    }).sort(function (a, b) {
      return a.rank - b.rank;
    });
  }

  function renderMacroNewsSummary(event) {
    const items = macroNewsItemsForEvent(event.id);
    if (!items.length) {
      return "";
    }
    return [
      '<div class="macro-current-news">',
      "  <h3>近兩年新聞摘要</h3>",
      "  <ul>",
      items.map(function (item) {
        return [
          "<li>",
          '  <span class="macro-current-news-rank">#' + String(item.rank || "").padStart(2, "0") + "</span>",
          '  <div class="macro-current-news-line">',
          '    <span class="macro-current-news-meta">' + escapeHtml([item.period, item.category].filter(Boolean).join(" · ")) + "</span>",
          "    <strong>" + escapeHtml(item.title || "") + "</strong>",
          "  </div>",
          '  <p class="macro-current-news-summary">' + renderExplicitMathText(item.summary || "") + "</p>",
          "</li>"
        ].join("");
      }).join(""),
      "  </ul>",
      "</div>"
    ].join("");
  }

  function renderMacroCurrentSynthesis() {
    const data = macroCurrentData.top20;
    if (!data) {
      return "";
    }
    const themes = Array.isArray(data.themes) ? data.themes : [];
    const essays = Array.isArray(data.essays) ? data.essays : [];
    const references = Array.isArray(data.references) ? data.references : [];
    return [
      '<div class="macro-current-synthesis" id="macro-current-synthesis">',
      '  <div class="macro-current-synthesis-head">',
      '    <p class="eyebrow">考前整合</p>',
      "    <h3>8 大主題與 5 題綜合申論</h3>",
      "    <p>TOP 20 的新聞摘要已整合至上方對應的 15 個主題卡；以下把重複出現的考點收斂成 8 大主題，並用 5 題申論串起跨章節架構。</p>",
      "  </div>",
      themes.length ? [
        '  <div class="macro-current-synthesis-themes">',
        '    <div class="macro-top20-theme-grid">',
        themes.map(function (theme) {
          return [
            '<article class="macro-top20-theme">',
            '  <span class="macro-top20-theme-priority">優先級 ' + String(theme.priority || "").padStart(2, "0") + "</span>",
            "  <h4>" + escapeHtml(theme.title || "") + "</h4>",
            "  <p>" + renderExplicitMathText(theme.text || "") + "</p>",
            "</article>"
          ].join("");
        }).join(""),
        "    </div>",
        "  </div>"
      ].join("") : "",
      essays.length ? [
        '  <div class="macro-current-synthesis-essays">',
        "    <h4>綜合申論</h4>",
        '    <div class="macro-top20-essay-list">',
        essays.map(function (essay, index) {
          return [
            '<article class="macro-top20-essay">',
            '  <span class="macro-top20-essay-num">申論 ' + (index + 1) + "</span>",
            "  <h4>" + escapeHtml(essay.title || "") + "</h4>",
            "  <p><strong>答題方向</strong> " + renderExplicitMathText(essay.answer || "") + "</p>",
            "</article>"
          ].join("");
        }).join(""),
        "    </div>",
        "  </div>"
      ].join("") : "",
      data.note ? '  <p class="macro-top20-note">' + renderExplicitMathText(data.note) + "</p>" : "",
      references.length ? [
        '  <div class="macro-top20-refs"><span>參考資料</span>',
        references.map(function (ref) {
          return '<a href="' + escapeHtml(ref.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(ref.label) + "</a>";
        }).join(""),
        "  </div>"
      ].join("") : "",
      "</div>"
    ].join("");
  }

  function renderMacroCurrentEvents() {
    const meta = macroCurrentData.meta || {};
    return [
      '<div class="page macro-current-page">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/exam-forecast">考前猜題</a><span>/</span>',
      '    <span>重要時事與總經政策</span>',
      '  </nav>',
      '  <section class="macro-current-hero">',
      '    <p class="eyebrow">考前猜題 · 近二年時事</p>',
      '    <h1>' + escapeHtml(meta.title || "近二年重要國際金融時事與總經政策") + '</h1>',
      '    <p class="lede">' + escapeHtml(meta.note || "") + '</p>',
      '    <div class="macro-current-actions">',
      '      <a class="btn btn-primary" href="#/exam-forecast">回考前猜題</a>',
      '      <a class="btn" href="#/past-exams">回考古題練習庫</a>',
      '      <a class="btn" href="#/past-exams/written">練計算／申論題</a>',
      '    </div>',
      '  </section>',
      '  <div class="macro-current-section-head">',
      '    <p class="eyebrow">15 個主題深入整理</p>',
      "    <h2>時事主題與考試框架</h2>",
      "  </div>",
      '  <div class="macro-current-list">' + macroCurrentEvents.map(function (event) {
        return [
          '<article class="macro-current-card" id="macro-event-' + escapeHtml(event.id) + '">',
          '  <div class="macro-current-card-head">',
          '    <span class="macro-current-period">' + escapeHtml(event.period || "") + '</span>',
          '    <h2>' + escapeHtml(event.title) + '</h2>',
          '  </div>',
          '  <div class="macro-current-summary">' + event.summary.map(function (text) {
            return '<p>' + renderInlineMath(text) + '</p>';
          }).join("") + '</div>',
          renderMacroNewsSummary(event),
          renderMacroCurrentFormulas(event),
          '  <div class="macro-current-points"><h3>考試重點</h3><ul>' + event.points.map(function (point) {
            return '<li>' + renderInlineMath(point) + '</li>';
          }).join("") + '</ul></div>',
          '  <div class="macro-current-sources"><span>對應章節</span>' + renderEventSourceLinks(event) + '</div>',
          Array.isArray(event.references) && event.references.length
            ? '  <div class="macro-current-references"><span>參考資料</span>' + event.references.map(function (ref) {
                return '<a href="' + escapeHtml(ref.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(ref.label) + "</a>";
              }).join("") + "</div>"
            : "",
          '</article>'
        ].join("");
      }).join("") + '</div>',
      renderMacroCurrentSynthesis(),
      '</div>'
    ].join("");
  }

  function forecastPriorityClass(priority) {
    if (priority === "最高") {
      return "is-top";
    }
    if (priority === "高") {
      return "is-high";
    }
    return "is-mid";
  }

  function forecastLevelLabel(question) {
    if (question.level === "多層" && Array.isArray(question.levels) && question.levels.length) {
      return question.levels.length > 1 ? question.levels.join("＋") : question.levels[0];
    }
    return question.level || "基礎";
  }

  function renderForecastAnswerBlock(answerId) {
    const paragraphs = forecastAnswers[answerId];
    if (!Array.isArray(paragraphs) || !paragraphs.length) {
      return "";
    }
    return '<details class="forecast-answer"><summary>完整參考解答</summary><div class="forecast-answer-body">' + paragraphs.map(function (paragraph) {
      return "<p>" + renderInlineMath(paragraph) + "</p>";
    }).join("") + "</div></details>";
  }

  function forecastFormulaEntries(question) {
    const refs = question && question.topic && forecastData.topicFormulas ? forecastData.topicFormulas[question.topic] : null;
    if (!Array.isArray(refs) || !refs.length) {
      return [];
    }
    const library = forecastData.formulas && forecastData.formulas[question.subject];
    const byName = new Map((Array.isArray(library) ? library : []).map(function (formula) {
      return [formula.name, formula];
    }));
    return refs.map(function (ref) {
      if (typeof ref === "string") {
        return byName.get(ref) || null;
      }
      return ref && ref.latex ? ref : null;
    }).filter(Boolean);
  }

  function renderForecastQuestionFormulas(question) {
    const formulas = forecastFormulaEntries(question);
    if (!formulas.length) {
      return "";
    }
    return [
      '<details class="forecast-question-formulas">',
      '  <summary>本題公式 <span>' + formulas.length + "</span></summary>",
      '  <div class="forecast-question-formula-list">',
      formulas.map(function (formula) {
        return [
          '<div class="forecast-question-formula">',
          '  <span class="forecast-question-formula-name">' + escapeHtml(formula.name || "公式") + "</span>",
          '  <div class="forecast-formula-math">' + renderInlineMath("\\(" + (formula.latex || "") + "\\)") + "</div>",
          formula.note ? "  <p>" + renderExplicitMathText(formula.note) + "</p>" : "",
          "</div>"
        ].join("");
      }).join(""),
      "  </div>",
      "</details>"
    ].join("");
  }

  function renderForecastSeries(question) {
    const parts = Array.isArray(question.parts) ? question.parts : [];
    const meta = [];
    if (question.topic) {
      meta.push('<span><strong>主題</strong> ' + escapeHtml(question.topic) + "</span>");
    }
    if (question.seriesTitle) {
      meta.push('<span><strong>系列</strong> ' + escapeHtml(question.seriesTitle) + "</span>");
    }
    const chapters = Array.isArray(question.chapters) ? question.chapters : [];
    const chapterLinks = chapters.map(function (chapterId) {
      const chapter = getChapter(chapterId);
      return chapter ? '<a href="#/chapter/' + encodeURIComponent(chapter.id) + '">' + escapeHtml(chapter.title) + "</a>" : "";
    }).filter(Boolean).join("");
    if (chapterLinks) {
      meta.push('<span class="forecast-related-chapters"><strong>相關章節</strong> ' + chapterLinks + "</span>");
    }
    const event = question.eventId ? macroCurrentEventMap.get(question.eventId) : null;
    if (event) {
      meta.push('<span><strong>相關時事</strong> <a href="#/macro-current?event=' + encodeURIComponent(event.id) + '">' + escapeHtml(event.title) + "</a></span>");
    }
    return [
      '<details class="forecast-question forecast-series" id="forecast-' + escapeHtml(question.id) + '" data-level="多層" data-levels="' + escapeHtml((question.levels || []).join(" ")) + '" data-topic="' + escapeHtml(question.topic || "") + '" data-type="' + escapeHtml(question.type) + '">',
      '  <summary>',
      '    <span class="forecast-question-num">' + String(question.number).padStart(2, "0") + "</span>",
      '    <span class="forecast-question-title">' + escapeHtml(question.title) + "</span>",
      '    <span class="forecast-level is-series">' + escapeHtml(forecastLevelLabel(question)) + '</span>',
      '    <span class="forecast-chip">多部分題組</span>',
      '    <span class="forecast-priority ' + forecastPriorityClass(question.priority) + '">' + escapeHtml(question.priority) + "</span>",
      "  </summary>",
      '  <div class="forecast-question-body">',
      '    <p class="forecast-scenario">' + renderInlineMath(question.scenario) + "</p>",
      '    <div class="forecast-question-meta">' + meta.join("") + "</div>",
      (question.scoring || question.trap) ? '    <div class="forecast-exam-tip"><div><strong>得分關鍵</strong><p>' + renderInlineMath(question.scoring || "") + '</p></div><div><strong>易錯點</strong><p>' + renderInlineMath(question.trap || "") + "</p></div></div>" : "",
      renderForecastQuestionFormulas(question),
      '    <div class="forecast-series-parts">',
      parts.map(function (part, index) {
        return [
          '      <article class="forecast-series-part">',
          '        <div class="forecast-part-head"><span class="forecast-part-label">Part ' + String.fromCharCode(65 + index) + '</span><span class="forecast-level ' + (part.level === "進階" ? "is-advanced" : "") + '">' + escapeHtml(part.level) + '</span><h4>' + escapeHtml(part.title) + "</h4></div>",
          '        <p class="forecast-scenario">' + renderInlineMath(part.scenario) + "</p>",
          '        <div class="forecast-ask"><h4>可能問法</h4><ul>' + (part.ask || []).map(function (item) {
            return "<li>" + renderInlineMath(item) + "</li>";
          }).join("") + "</ul></div>",
          '        <div class="forecast-focus"><strong>作答方向</strong><p>' + renderInlineMath(part.focus || "") + "</p></div>",
          renderForecastAnswerBlock(part.answerId || part.id),
          "      </article>"
        ].join("");
      }).join(""),
      "    </div>",
      "  </div>",
      "</details>"
    ].join("");
  }

  function renderForecastQuestion(question) {
    if (Array.isArray(question.parts) && question.parts.length > 1) {
      return renderForecastSeries(question);
    }
    const priorityClass = forecastPriorityClass(question.priority);
    const asks = Array.isArray(question.ask) ? question.ask : [];
    const level = forecastLevelLabel(question);
    const levelClass = level === "進階" ? " is-advanced" : "";
    const chapters = Array.isArray(question.chapters) ? question.chapters : [];
    const chapterLinks = chapters.map(function (chapterId) {
      const chapter = getChapter(chapterId);
      if (!chapter) {
        return "";
      }
      return '<a href="#/chapter/' + encodeURIComponent(chapter.id) + '">' + escapeHtml(chapter.title) + "</a>";
    }).filter(Boolean).join("");
    const event = question.eventId ? macroCurrentEventMap.get(question.eventId) : null;
    return [
      '<details class="forecast-question" id="forecast-' + escapeHtml(question.id) + '" data-level="' + escapeHtml(level) + '" data-levels="' + escapeHtml(level) + '" data-topic="' + escapeHtml(question.topic || "") + '" data-type="' + escapeHtml(question.type) + '">',
      '  <summary>',
      '    <span class="forecast-question-num">' + String(question.number).padStart(2, "0") + "</span>",
      '    <span class="forecast-question-title">' + escapeHtml(question.title) + "</span>",
      '    <span class="forecast-level' + levelClass + '">' + escapeHtml(level) + "</span>",
      '    <span class="forecast-chip">' + escapeHtml(question.type) + "</span>",
      '    <span class="forecast-priority ' + priorityClass + '">' + escapeHtml(question.priority) + "</span>",
      "  </summary>",
      '  <div class="forecast-question-body">',
      '    <p class="forecast-scenario">' + renderInlineMath(question.scenario) + "</p>",
      '    <div class="forecast-question-meta">',
      question.topic ? '      <span><strong>主題</strong> ' + escapeHtml(question.topic) + "</span>" : "",
      question.seriesTitle ? '      <span><strong>系列</strong> ' + escapeHtml(question.seriesTitle) + "</span>" : "",
      chapterLinks ? '      <span class="forecast-related-chapters"><strong>相關章節</strong> ' + chapterLinks + "</span>" : "",
      event ? '      <span><strong>相關時事</strong> <a href="#/macro-current?event=' + encodeURIComponent(event.id) + '">' + escapeHtml(event.title) + "</a></span>" : "",
      "    </div>",
      '    <div class="forecast-ask"><h4>可能問法</h4><ul>' + asks.map(function (item) {
        return "<li>" + renderInlineMath(item) + "</li>";
      }).join("") + "</ul></div>",
      '    <div class="forecast-focus"><strong>作答方向</strong><p>' + renderInlineMath(question.focus) + "</p></div>",
      renderForecastQuestionFormulas(question),
      (question.scoring || question.trap) ? '    <div class="forecast-exam-tip"><div><strong>得分關鍵</strong><p>' + renderInlineMath(question.scoring || "") + '</p></div><div><strong>易錯點</strong><p>' + renderInlineMath(question.trap || "") + "</p></div></div>" : "",
      renderForecastAnswerBlock(question.answerId || question.id),
      "  </div>",
      "</details>"
    ].join("");
  }

  function renderForecastFormulaGroup(title, formulas) {
    return [
      '<div class="forecast-formula-group">',
      '  <h3>' + escapeHtml(title) + "</h3>",
      '  <dl class="forecast-formula-list">' + (formulas || []).map(function (formula) {
        return [
          "<div>",
          "  <dt>" + escapeHtml(formula.name) + "</dt>",
          '  <dd><span class="forecast-formula-math">' + renderInlineMath("\\(" + formula.latex + "\\)") + "</span>",
          "  <small>" + renderInlineMath(formula.note || "") + "</small></dd>",
          "</div>"
        ].join("");
      }).join("") + "</dl>",
      "</div>"
    ].join("");
  }

  function renderForecastSensitivityNotes(items) {
    const notes = Array.isArray(items) ? items : [];
    return notes.length ? '<ul class="forecast-sensitivity-notes">' + notes.map(function (item) {
      return "<li>" + renderInlineMath(item) + "</li>";
    }).join("") + "</ul>" : "";
  }

  function renderDcfSensitivity(dcf) {
    if (!dcf || !Array.isArray(dcf.rows) || !Array.isArray(dcf.columns)) {
      return "";
    }
    return [
      '<article class="forecast-sensitivity-card">',
      '  <h3>' + escapeHtml(dcf.title || "DCF 敏感度") + "</h3>",
      dcf.note ? '  <p class="forecast-sensitivity-note">' + renderInlineMath(dcf.note) + "</p>" : "",
      '  <div class="forecast-table-wrap"><table class="forecast-table forecast-sensitivity-table"><thead><tr>',
      dcf.columns.map(function (column) {
        return "<th>" + escapeHtml(column) + "</th>";
      }).join(""),
      "</tr></thead><tbody>",
      dcf.rows.map(function (row, rowIndex) {
        return "<tr><th scope=\"row\">" + escapeHtml(row.label) + "</th>" + (row.values || []).map(function (value, colIndex) {
          const isBase = rowIndex === dcf.baseRow && colIndex === dcf.baseCol;
          return "<td" + (isBase ? ' class="is-base"' : "") + ">" + escapeHtml(value) + "</td>";
        }).join("") + "</tr>";
      }).join(""),
      "</tbody></table></div>",
      renderForecastSensitivityNotes(dcf.highlights),
      "</article>"
    ].join("");
  }

  function renderBondSensitivity(bond) {
    if (!bond || !Array.isArray(bond.rows) || !Array.isArray(bond.columns)) {
      return "";
    }
    return [
      '<article class="forecast-sensitivity-card">',
      '  <h3>' + escapeHtml(bond.title || "債券敏感度") + "</h3>",
      bond.note ? '  <p class="forecast-sensitivity-note">' + renderInlineMath(bond.note) + "</p>" : "",
      '  <div class="forecast-table-wrap"><table class="forecast-table forecast-sensitivity-table"><thead><tr>',
      bond.columns.map(function (column) {
        return "<th>" + escapeHtml(column) + "</th>";
      }).join(""),
      "</tr></thead><tbody>",
      bond.rows.map(function (row, rowIndex) {
        return "<tr" + (rowIndex === bond.baseRow ? ' class="is-base-row"' : "") + "><th scope=\"row\">" + escapeHtml(row.label) + "</th>" + (row.values || []).map(function (value) {
          return "<td>" + escapeHtml(value) + "</td>";
        }).join("") + "</tr>";
      }).join(""),
      "</tbody></table></div>",
      renderForecastSensitivityNotes(bond.highlights),
      "</article>"
    ].join("");
  }

  function renderForecastSensitivitySection(sensitivity) {
    if (!sensitivity) {
      return "";
    }
    const hasDcf = sensitivity.dcf && Array.isArray(sensitivity.dcf.rows);
    const hasBond = sensitivity.bond && Array.isArray(sensitivity.bond.rows);
    if (!hasDcf && !hasBond) {
      return "";
    }
    return [
      '<section class="forecast-section forecast-sensitivity" id="forecast-sensitivity">',
      '  <div class="forecast-section-head"><div><p class="eyebrow">敏感度分析</p><h2>兩個最常考的計算題：DCF 與債券</h2><p>' + renderInlineMath(sensitivity.intro || "") + "</p></div><span>2 組</span></div>",
      '  <div class="forecast-sensitivity-grid">',
      hasDcf ? renderDcfSensitivity(sensitivity.dcf) : "",
      hasBond ? renderBondSensitivity(sensitivity.bond) : "",
      "  </div>",
      "  </section>"
    ].join("");
  }

  function renderExamForecastPage(activeSubject) {
    const subjectFilter = activeSubject === "macro" || activeSubject === "investment" || activeSubject === "accounting" || activeSubject === "law" ? activeSubject : "all";
    const showAll = subjectFilter === "all";
    const meta = forecastData.meta || {};
    const questions = Array.isArray(forecastData.questions) ? forecastData.questions : [];
    const integrated = Array.isArray(forecastData.integrated) ? forecastData.integrated : [];
    const indicators = Array.isArray(forecastData.indicators) ? forecastData.indicators : [];
    const strategy = Array.isArray(forecastData.strategy) ? forecastData.strategy : [];
    const sensitivity = forecastData.sensitivity || null;
    const formulas = forecastData.formulas || {};
    const subjectDefs = [
      { id: "macro", name: "總體經濟學" },
      { id: "investment", name: "投資學" },
      { id: "accounting", name: "會計學" },
      { id: "law", name: "證券法規" }
    ];
    const subjectCounts = {};
    subjectDefs.forEach(function (subject) {
      subjectCounts[subject.id] = questions.filter(function (question) { return question.subject === subject.id; }).length;
    });
    const visibleSubjects = showAll ? subjectDefs : subjectDefs.filter(function (subject) { return subject.id === subjectFilter; });
    const formulaCount = subjectDefs.reduce(function (sum, subject) {
      return sum + (Array.isArray(formulas[subject.id]) ? formulas[subject.id].length : 0);
    }, 0);
    const visibleFormulaCount = showAll ? formulaCount : (Array.isArray(formulas[subjectFilter]) ? formulas[subjectFilter].length : 0);
    const filterQuestions = showAll ? questions : questions.filter(function (question) { return question.subject === subjectFilter; });
    const filterTypes = Array.from(new Set(filterQuestions.map(function (question) { return question.type; }).filter(Boolean))).sort(function (a, b) { return a.localeCompare(b, "zh-Hant"); });
    const filterTopics = Array.from(new Set(filterQuestions.map(function (question) { return question.topic; }).filter(Boolean))).sort(function (a, b) { return a.localeCompare(b, "zh-Hant"); });
    const allParts = [];
    questions.forEach(function (question) {
      if (Array.isArray(question.parts) && question.parts.length) {
        question.parts.forEach(function (part) { allParts.push(part); });
      } else {
        allParts.push({ level: question.level });
      }
    });
    const totalParts = allParts.length;
    const totalQuestions = questions.length;
    const coverageRows = subjectDefs.map(function (subject) {
      const info = getSubject(subject.id);
      return {
        id: subject.id,
        name: subject.name,
        chapters: info ? info.chapters.length : 0,
        mcq: practiceSubjectQuestionCount(subject.id),
        written: writtenSubjectQuestionCount(subject.id),
        forecast: subjectCounts[subject.id]
      };
    });
    const formulaGroups = visibleSubjects.filter(function (subject) {
      return Array.isArray(formulas[subject.id]) && formulas[subject.id].length > 0;
    }).map(function (subject) {
      return renderForecastFormulaGroup(subject.name, formulas[subject.id]);
    }).join("");
    return [
      '<div class="page forecast-page">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span><span>考前猜題</span>',
      "  </nav>",
      '  <section class="forecast-hero">',
      '    <p class="eyebrow">考前猜題 · ' + escapeHtml(meta.examPeriod || "2026 年 12 月") + "</p>",
      "    <h1>" + escapeHtml(meta.title || "考前猜題") + "</h1>",
      '    <p class="lede">' + escapeHtml(meta.subtitle || "") + "</p>",
      '    <p class="forecast-disclaimer">' + escapeHtml(meta.note || "") + "</p>",
      "  </section>",
      renderMacroCurrentEventsCard(),
      '  <nav class="forecast-tabs" aria-label="考前猜題科目">',
      '    <a class="forecast-tab' + (showAll ? " is-active" : "") + '" href="#/exam-forecast"' + (showAll ? ' aria-current="page"' : "") + '>全部 ' + totalQuestions + ' 題組</a>',
      subjectDefs.map(function (subject) {
        return '    <a class="forecast-tab' + (subjectFilter === subject.id ? " is-active" : "") + '" href="#/exam-forecast?subject=' + subject.id + '"' + (subjectFilter === subject.id ? ' aria-current="page"' : "") + '>' + escapeHtml(subject.name) + " " + subjectCounts[subject.id] + " 題組</a>";
      }).join("\n"),
      "  </nav>",
      '  <section class="forecast-filter-bar" data-forecast-filter-bar aria-label="考前猜題篩選">',
      '    <label class="forecast-filter-search"><span>搜尋</span><input type="search" data-forecast-search placeholder="主題、題型或關鍵字…" autocomplete="off"></label>',
      '    <label><span>程度</span><select data-forecast-level><option value="all">全部</option><option value="基礎">基礎</option><option value="進階">進階</option></select></label>',
      '    <label><span>題型</span><select data-forecast-type><option value="all">全部</option>' + filterTypes.map(function (type) { return '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + "</option>"; }).join("") + "</select></label>",
      '    <label><span>主題</span><select data-forecast-topic><option value="all">全部</option>' + filterTopics.map(function (topic) { return '<option value="' + escapeHtml(topic) + '">' + escapeHtml(topic) + "</option>"; }).join("") + "</select></label>",
      '    <button class="btn btn-small" type="button" data-forecast-clear>清除</button>',
      '    <span class="forecast-filter-count" data-forecast-filter-count>顯示 ' + filterQuestions.length + ' / ' + filterQuestions.length + ' 題組</span>',
      "  </section>",
      '  <section class="forecast-directions">' + (forecastData.directions || []).map(function (item) {
        return [
          '<article class="forecast-direction">',
          "  <h2>" + escapeHtml(item.title) + "</h2>",
          "  <p>" + renderInlineMath(item.text) + "</p>",
          "</article>"
        ].join("");
      }).join("") + "</section>",
      showAll ? [
        '  <section class="forecast-section" id="forecast-coverage">',
        '    <div class="forecast-section-head"><div><p class="eyebrow">覆蓋檢查</p><h2>四科章節、考古題與解答覆蓋</h2><p>確認每個科目都有章節重點、考古題解析與考前猜題。</p></div><span>4 科</span></div>',
        '    <div class="forecast-table-wrap"><table class="forecast-table"><thead><tr><th>科目</th><th>章節</th><th>選擇題</th><th>計算／申論</th><th>考前猜題（題組）</th></tr></thead><tbody>',
        coverageRows.map(function (row) {
          return "<tr><td>" + escapeHtml(row.name) + "</td><td>" + row.chapters + "</td><td>" + row.mcq + "</td><td>" + row.written + "</td><td>" + row.forecast + "</td></tr>";
        }).join(""),
        "</tbody></table></div>",
        '    <p class="forecast-count-note">3,710 題選擇題均有逐選項解析；348 題計算／申論均有參考解答；73 個章節均有名詞、重點與考古題出處。四科考前猜題合計 ' + totalQuestions + ' 題組、' + totalParts + ' 個部分。</p>',
        "  </section>"
      ].join("") : "",
      visibleSubjects.map(function (subject) {
        const subjectQuestions = questions.filter(function (question) { return question.subject === subject.id; });
        const levelDefs = [
          { id: "基礎", label: "基礎題" },
          { id: "進階", label: "進階題" },
          { id: "多層", label: "多部分題組" }
        ];
        const levels = levelDefs.filter(function (level) {
          return subjectQuestions.some(function (question) { return (question.level || "基礎") === level.id; });
        });
        return [
          '  <section class="forecast-section forecast-subject" id="forecast-subject-' + subject.id + '">',
          '    <div class="forecast-section-head"><div><p class="eyebrow">科目題庫</p><h2>' + escapeHtml(subject.name) + "：" + subjectQuestions.length + ' 題組</h2><p>' + ((subject.id === "accounting" || subject.id === "law") ? "此為重點 " + subjectQuestions.length + " 題組，未涵蓋全部章節；請搭配章節與考古題複習。" : "依主題與 level 分組；多部分題組包含基礎與進階兩個部分，數字為教學假設。") + '</p></div><span>' + subjectQuestions.length + " 題組</span></div>",
          levels.map(function (level) {
            const levelQuestions = subjectQuestions.filter(function (question) { return (question.level || "基礎") === level.id; });
            return [
              '    <div class="forecast-level-block">',
              '      <div class="forecast-level-head"><h3>' + escapeHtml(level.label) + '</h3><span>' + levelQuestions.length + ' 題組</span></div>',
              '      <div class="forecast-question-list">' + levelQuestions.map(renderForecastQuestion).join("") + "</div>",
              "    </div>"
            ].join("");
          }).join(""),
          "  </section>"
        ].join("");
      }).join(""),
      (showAll || subjectFilter === "investment") ? renderForecastSensitivitySection(sensitivity) : "",
      showAll ? [
        '  <section class="forecast-section" id="forecast-integrated">',
        '    <div class="forecast-section-head"><div><p class="eyebrow">整合題</p><h2>如果只練 6 題，先練這些</h2><p>把多個章節串成一個完整案例，適合申論與計算混合題。</p></div><span>' + integrated.length + " 組</span></div>",
        '    <div class="forecast-integrated-grid">' + integrated.map(function (item) {
          return [
            '<article class="forecast-integrated-card">',
            '  <div class="forecast-integrated-head"><span>' + String(item.number).padStart(2, "0") + "</span><h3>" + escapeHtml(item.title) + '</h3><em class="forecast-priority ' + forecastPriorityClass(item.priority) + '">' + escapeHtml(item.priority) + "</em></div>",
            "  <ol>" + (item.steps || []).map(function (step) {
              return "<li>" + renderInlineMath(step) + "</li>";
            }).join("") + "</ol>",
            '  <p class="forecast-why"><strong>為什麼優先</strong> ' + renderInlineMath(item.why || "") + "</p>",
            "</article>"
          ].join("");
        }).join("") + "</div>",
        "  </section>"
      ].join("") : "",
      formulaGroups ? [
        '  <section class="forecast-section" id="forecast-formulas">',
        '    <div class="forecast-section-head"><div><p class="eyebrow">公式</p><h2>考前整合公式</h2><p>同一主題的基礎、進階與變形放在一起；先確認變數定義與單位，再代入數字。</p></div><span>' + visibleFormulaCount + " 條</span></div>",
        '    <div class="forecast-formula-grid">' + formulaGroups + "</div>",
        "  </section>"
      ].join("") : [
        '  <div class="notice"><strong>本科提示：</strong>證券法規以條文、程序、構成要件與案例適用為主，不另列公式；請搭配考古題逐選項解析複習。</div>'
      ].join(""),
      '  <section class="forecast-section" id="forecast-indicators">',
      '    <div class="forecast-section-head"><div><p class="eyebrow">時事</p><h2>考前要追蹤的數字</h2><p>截至 ' + escapeHtml(meta.updated || "") + "；考試前請更新官方數據，不要死背單一價格。</p></div><span>" + indicators.length + " 項</span></div>",
      '    <div class="forecast-table-wrap"><table class="forecast-table"><thead><tr><th>主題</th><th>參考值</th><th>考試要會分析什麼</th></tr></thead><tbody>' + indicators.map(function (item) {
        return "<tr><td>" + escapeHtml(item.name) + "</td><td>" + escapeHtml(item.value) + "</td><td>" + renderInlineMath(item.read) + "</td></tr>";
      }).join("") + "</tbody></table></div>",
      "  </section>",
      '  <section class="forecast-section" id="forecast-strategy">',
      '    <div class="forecast-section-head"><div><p class="eyebrow">準備順序</p><h2>時間有限時這樣練</h2><p>先拿計算題基本分，再做跨章節整合，最後限時寫申論。</p></div></div>',
      '    <div class="forecast-strategy-grid">' + strategy.map(function (item, index) {
        return '<article class="forecast-strategy-card"><span>' + String(index + 1).padStart(2, "0") + "</span><h3>" + escapeHtml(item.title) + "</h3><p>" + renderInlineMath(item.text) + "</p></article>";
      }).join("") + "</div>",
      "  </section>",
      '  <div class="notice"><strong>再次提醒：</strong>' + escapeHtml(meta.note || "") + "</div>",
      "</div>"
    ].join("");
  }

  function renderMacroCurrentEventsCard() {
    return [
      '<a class="subject-written-cta" href="#/macro-current">',
      '  <div>',
      '    <p class="eyebrow">近二年時事 · 總經政策</p>',
      '    <strong>重要國際金融時事與臺灣政策</strong>',
      '    <span>安倍三箭、Fed FOMC 與利率、全球物價、公債市場、黃金、加密貨幣與穩定幣、AI 生產力、歐債與臺灣政策，整理成可答題的總經框架。</span>',
      '  </div>',
      '  <span class="subject-written-cta-arrow">查看時事整理 →</span>',
      '</a>'
    ].join("");
  }

  function ensureWrittenState() {
    if (writtenState) {
      return;
    }
    writtenState = {
      year: "all",
      subject: "all",
      session: "all",
      open: new Set()
    };
  }

  const WRITTEN_SUBJECT_SHORT = {
    law: "證券法規",
    investment: "投資學",
    accounting: "會計",
    macro: "總體"
  };

  function writtenSessionEntry(question) {
    const known = practiceSessionMap.get(question.sessionId);
    if (known) {
      return known;
    }
    return {
      id: question.sessionId,
      year: question.year,
      session: question.session,
      label: question.year + " 年第 " + question.session + " 次"
    };
  }

  function writtenSessionList() {
    const seen = new Set();
    const sessions = [];
    writtenQuestions.forEach(function (question) {
      if (seen.has(question.sessionId)) {
        return;
      }
      seen.add(question.sessionId);
      sessions.push(writtenSessionEntry(question));
    });
    return sessions.sort(comparePracticeSessionsDesc);
  }

  function writtenSessionLabel(sessionId) {
    const known = practiceSessionMap.get(sessionId);
    if (known) {
      return known.label;
    }
    const question = writtenQuestions.find(function (item) {
      return item.sessionId === sessionId;
    });
    return question ? question.year + " 年第 " + question.session + " 次" : sessionId;
  }

  function writtenSubjectEntry(subjectId) {
    const known = practiceSubjectMap.get(subjectId);
    if (known) {
      return known;
    }
    const base = (content.subjects || []).find(function (subject) {
      return subject.id === subjectId;
    }) || {};
    return {
      id: subjectId,
      name: base.name || subjectId,
      short: WRITTEN_SUBJECT_SHORT[subjectId] || base.name || subjectId,
      colorClass: base.colorClass || ""
    };
  }

  function writtenSubjectList() {
    const order = ["law", "investment", "accounting", "macro"];
    const ids = [];
    writtenQuestions.forEach(function (question) {
      if (ids.indexOf(question.subject) === -1) {
        ids.push(question.subject);
      }
    });
    return ids.sort(function (a, b) {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    }).map(writtenSubjectEntry);
  }

  function writtenSessionsForYear() {
    ensureWrittenState();
    return writtenSessionList().filter(function (session) {
      return writtenState.year === "all" || session.year === writtenState.year;
    });
  }

  function writtenSyncSession() {
    ensureWrittenState();
    const sessions = writtenSessionsForYear();
    const exists = sessions.some(function (session) {
      return session.id === writtenState.session;
    });
    if (writtenState.session !== "all" && !exists) {
      writtenState.session = "all";
    }
  }

  function writtenFilteredQuestions() {
    ensureWrittenState();
    return writtenQuestions.filter(function (question) {
      if (writtenState.year !== "all" && question.year !== writtenState.year) {
        return false;
      }
      if (writtenState.subject !== "all" && question.subject !== writtenState.subject) {
        return false;
      }
      if (writtenState.session !== "all" && question.sessionId !== writtenState.session) {
        return false;
      }
      return true;
    });
  }

  function writtenSummaryText() {
    const questions = writtenFilteredQuestions();
    const sessionCount = new Set(questions.map(function (question) {
      return question.sessionId;
    })).size;
    const yearLabel = writtenState.year === "all" ? "全部年度" : writtenState.year + " 年";
    const subject = writtenState.subject === "all" ? null : writtenSubjectEntry(writtenState.subject);
    const subjectLabel = subject ? (subject.short || subject.name) : "全部科目";
    const sessionLabel = writtenState.session === "all" ? "全部次別" : writtenSessionLabel(writtenState.session);
    return "<strong>" + questions.length + "</strong> 題 · " + sessionCount + " 次考試 · " +
      escapeHtml(yearLabel) + " · " + escapeHtml(subjectLabel) + " · " + escapeHtml(sessionLabel) + " · 完整參考解答";
  }

  function renderWrittenFilters() {
    ensureWrittenState();
    writtenSyncSession();
    const years = Array.from(new Set(writtenQuestions.map(function (question) { return question.year; }))).sort(function (a, b) { return b - a; });
    const subjects = writtenSubjectList();
    const sessions = writtenSessionsForYear();
    const sessionOptions = [
      '<option value="all"' + (writtenState.session === "all" ? " selected" : "") + ">全部次別</option>"
    ].concat(sessions.map(function (session) {
      return '<option value="' + escapeHtml(session.id) + '"' + (writtenState.session === session.id ? " selected" : "") + ">" + escapeHtml(session.label) + "</option>";
    })).join("");
    return [
      '<div class="written-filter-shell" id="written-filters">',
      '  <div class="past-exam-filter-row"><span class="past-exam-filter-label">年度</span>',
      '    <div class="past-exam-chips">',
      '      <button class="past-exam-chip' + (writtenState.year === "all" ? " is-active" : "") + '" type="button" data-written-year="all" aria-pressed="' + (writtenState.year === "all") + '">全部年度</button>',
      years.map(function (year) {
        return '<button class="past-exam-chip' + (writtenState.year === year ? " is-active" : "") + '" type="button" data-written-year="' + year + '" aria-pressed="' + (writtenState.year === year) + '">' + year + ' 年</button>';
      }).join(""),
      '    </div>',
      '  </div>',
      '  <div class="past-exam-filter-row"><span class="past-exam-filter-label">科目</span>',
      '    <div class="past-exam-chips">',
      '      <button class="past-exam-chip' + (writtenState.subject === "all" ? " is-active" : "") + '" type="button" data-written-subject="all" aria-pressed="' + (writtenState.subject === "all") + '">全部科目</button>',
      subjects.map(function (subject) {
        return '<button class="past-exam-chip' + (writtenState.subject === subject.id ? " is-active" : "") + '" type="button" data-written-subject="' + escapeHtml(subject.id) + '" aria-pressed="' + (writtenState.subject === subject.id) + '">' + escapeHtml(subject.short || subject.name) + '</button>';
      }).join(""),
      '    </div>',
      '  </div>',
      '  <div class="past-exam-filter-row past-exam-filter-row-session">',
      '    <span class="past-exam-filter-label">次別</span>',
      '    <div class="past-exam-session-tools">',
      '      <select class="past-exam-select" data-written-session aria-label="選擇考試次別">' + sessionOptions + '</select>',
      '    </div>',
      '  </div>',
      '  <div class="written-filter-summary">' + writtenSummaryText() + '</div>',
      '</div>'
    ].join("");
  }

  function escapeTexText(text) {
    return String(text).replace(/\\/g, "\\textbackslash{}").replace(/([{}%#&_~^])/g, "\\$1");
  }

  function clauseToTex(clause) {
    let tex = String(clause);
    [
      ["gY", "g_Y"], ["gA", "g_A"], ["gK", "g_K"], ["gN", "g_N"], ["gL", "g_L"],
      ["βU", "\\beta_U"], ["βL", "\\beta_L"], ["βp", "\\beta_p"], ["βi", "\\beta_i"], ["βm", "\\beta_m"],
      ["rf", "r_f"], ["RY", "R_Y"], ["Rm", "R_m"], ["Rp", "R_p"], ["Ri", "R_i"], ["Rj", "R_j"],
      ["Yd", "Y_d"], ["Tp", "T_p"], ["Ms", "M_s"], ["Md", "M_d"]
    ].forEach(function (pair) {
      tex = tex.split(pair[0]).join(pair[1]);
    });
    const monetaryContext = /(貨幣|M1A|M1B|通貨|存款|儲蓄|準貨幣|準備|乘數|流動性|央行|中間目標|防衛貨幣)/.test(tex);
    const performanceContext = /(Sharpe|Jensen|績效|衡量|α)/.test(tex);
    if (/M2/.test(tex) && performanceContext && !monetaryContext) {
      tex = tex.split("M2").join("M^2");
    } else if (/M1A|M1B|M2/.test(tex) && monetaryContext) {
      tex = tex.split("M1A").join("M_{1A}").split("M1B").join("M_{1B}").split("M2").join("M_2").split("M1").join("M_1");
    }
    [
      "TFP", "CAPM", "SML", "CML", "APT", "EPS", "ROE", "ROA", "EBIT", "EBITDA", "WACC",
      "NPV", "IRR", "DOL", "DFL", "DTL", "FCFE", "FCFF", "YTM", "VaR", "CVaR", "ETF",
      "GDP", "GNP", "NNP", "MPC", "MPS", "PDI", "LGD", "ECL", "OCI", "NWC", "CapEx", "DPS", "BVPS"
    ].forEach(function (word) {
      tex = tex.replace(new RegExp("\\b" + word + "\\b", "g"), "\\text{" + word + "}");
    });
    const greek = {
      "α": "\\alpha ", "β": "\\beta ", "γ": "\\gamma ", "δ": "\\delta ", "ε": "\\varepsilon ",
      "θ": "\\theta ", "λ": "\\lambda ", "μ": "\\mu ", "π": "\\pi ", "ρ": "\\rho ",
      "σ": "\\sigma ", "τ": "\\tau ", "φ": "\\phi ", "ω": "\\omega ",
      "Δ": "\\Delta ", "Σ": "\\sum ", "Π": "\\Pi ", "Ω": "\\Omega "
    };
    Object.keys(greek).forEach(function (key) {
      tex = tex.split(key).join(greek[key]);
    });
    tex = tex
      .replace(/＝/g, "=")
      .replace(/＋/g, "+")
      .replace(/−/g, "-")
      .replace(/×/g, "\\times ")
      .replace(/÷/g, "\\div ")
      .replace(/≈/g, "\\approx ")
      .replace(/≤/g, "\\le ")
      .replace(/≥/g, "\\ge ")
      .replace(/≠/g, "\\ne ")
      .replace(/∞/g, "\\infty ")
      .replace(/∈/g, "\\in ");
    tex = tex.replace(/√\(([^()]*)\)/g, "\\sqrt{$1}").replace(/√([A-Za-z0-9.]+)/g, "\\sqrt{$1}");
    tex = tex.replace(/\^\(([^()]*)\)/g, "^{$1}").replace(/\^(\\(?:[A-Za-z]+)|[A-Za-z0-9.]+)/g, "^{$1}");
    tex = tex.replace(/_\(([^()]*)\)/g, "_{$1}");
    tex = tex.replace(/%/g, "\\%").replace(/\$/g, "\\$").replace(/&/g, "\\&").replace(/#/g, "\\#");
    tex = tex.replace(/([\u3400-\u9fff\u3000-\u303f\uff00-\uffef]+)/g, function (chunk) {
      return "\\text{" + escapeTexText(chunk) + "}";
    });
    return tex;
  }

  function autoMathProseToHtml(text) {
    const source = String(text == null ? "" : text);
    const mathIndicator = /[＝＋−×÷≈≤≥≠√^_]|[αβγδεθλμπρστφωΔΣΠΩ]|\d+\s*%|[A-Za-z0-9)]\s*[=+\-*/]\s*[0-9A-Za-z(]|[A-Za-z]\s*[+\-*/]\s*[A-Za-z0-9(]/;
    return source.split(/([；。！？，])/).map(function (part) {
      if (!part) {
        return "";
      }
      if (/^[；。！？，]$/.test(part)) {
        return escapeHtml(part);
      }
      const cjkCount = (part.match(/[\u3400-\u9fff]/g) || []).length;
      if (part.length > 240 || (part.length > 72 && cjkCount >= 24) || !mathIndicator.test(part) || /[\uE000-\uF8FF\u0300-\u036F]/.test(part)) {
        return escapeHtml(part);
      }
      return '<span class="written-answer-math">' + renderKatex(clauseToTex(part), false) + "</span>";
    }).join("");
  }

  function renderWrittenAnswerText(text) {
    const source = String(text == null ? "" : text);
    const parts = [];
    const pattern = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;
    let last = 0;
    let match;
    while ((match = pattern.exec(source))) {
      if (match.index > last) {
        parts.push(autoMathProseToHtml(source.slice(last, match.index)));
      }
      const display = match[1] !== undefined;
      const tex = display ? match[1] : match[2];
      parts.push('<span class="written-answer-math' + (display ? " is-display" : "") + '">' + renderKatex(tex, display) + "</span>");
      last = pattern.lastIndex;
    }
    if (last < source.length) {
      parts.push(autoMathProseToHtml(source.slice(last)));
    }
    return parts.join("");
  }

  function splitWrittenTableRow(line) {
    return String(line || "").trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (cell) {
      return cell.trim();
    });
  }

  function isWrittenTableStart(lines, index) {
    if (index + 1 >= lines.length) {
      return false;
    }
    const head = lines[index].trim();
    const separator = lines[index + 1].trim();
    return head.indexOf("|") !== -1 && /\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?/.test(separator);
  }

  function renderWrittenTable(lines, start) {
    const header = splitWrittenTableRow(lines[start]);
    const rows = [];
    let index = start + 2;
    while (index < lines.length && lines[index].indexOf("|") !== -1 && lines[index].trim()) {
      rows.push(splitWrittenTableRow(lines[index]));
      index += 1;
    }
    const headHtml = header.map(function (cell) {
      return "<th>" + renderWrittenAnswerText(cell) + "</th>";
    }).join("");
    const bodyHtml = rows.map(function (row) {
      return "<tr>" + header.map(function (_, cellIndex) {
        return "<td>" + renderWrittenAnswerText(row[cellIndex] || "") + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return {
      html: '<div class="written-answer-table-wrap"><table class="written-answer-table"><thead><tr>' + headHtml + "</tr></thead><tbody>" + bodyHtml + "</tbody></table></div>",
      next: index
    };
  }

  function renderWrittenAnswer(text) {
    const source = String(text == null ? "" : text).replace(/\r\n?/g, "\n");
    const lines = source.split("\n");
    const blocks = [];
    let textLines = [];
    function flushText() {
      if (!textLines.length) {
        return;
      }
      blocks.push(textLines.map(function (line) {
        return renderWrittenAnswerText(line);
      }).join("<br>"));
      textLines = [];
    }
    let index = 0;
    while (index < lines.length) {
      if (isWrittenTableStart(lines, index)) {
        flushText();
        const table = renderWrittenTable(lines, index);
        blocks.push(table.html);
        index = table.next;
        continue;
      }
      textLines.push(lines[index]);
      index += 1;
    }
    flushText();
    return blocks.join("");
  }

  function renderInlineMath(text) {
    return renderWrittenAnswer(text).replace(/class="written-answer-math/g, 'class="inline-math');
  }

  function splitWrittenStemParagraphs(text) {
    let source = String(text == null ? "" : text).replace(/\r\n?/g, "\n").trim();
    if (!source) {
      return [];
    }
    const mathSegments = [];
    source = source.replace(/\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)/g, function (segment) {
      const token = "@@MATH" + mathSegments.length + "@@";
      mathSegments.push(segment);
      return token;
    });
    source = source.replace(/([。；：])\s*(?=(?:請問|試問|請回答|請計算|試求|請說明|請編製|請列出|請依|作答)[：:])/g, "$1\n");
    const marker = /(?=\([0-9]{1,2}\)|（[0-9]{1,2}）|\([A-Da-d]\)|（[A-Da-d]）|●|•|※|[一二三四五六七八九十]+、)/g;
    const parts = source.split(/\n+/).reduce(function (items, line) {
      return items.concat(line.split(marker));
    }, []).map(function (part) {
      return part.trim();
    }).filter(Boolean);

    function packSentences(value) {
      const sentences = value.match(/[^。！？]+[。！？]?/g) || [value];
      const packed = [];
      let current = "";
      sentences.forEach(function (sentence) {
        const clean = sentence.trim();
        if (!clean) {
          return;
        }
        if (!current) {
          current = clean;
        } else if (current.length + clean.length <= 150) {
          current += clean;
        } else {
          packed.push(current);
          current = clean;
        }
      });
      if (current) {
        packed.push(current);
      }
      return packed;
    }

    const paragraphs = [];
    parts.forEach(function (part) {
      const semicolonParts = part.length > 60 && /；/.test(part) ? part.split(/；+/) : [part];
      semicolonParts.forEach(function (piece) {
        const clean = piece.trim();
        if (!clean) {
          return;
        }
        packSentences(clean).forEach(function (sentence) {
          paragraphs.push(sentence);
        });
      });
    });
    const restored = paragraphs.map(function (paragraph) {
      return paragraph.replace(/@@MATH(\d+)@@/g, function (match, index) {
        return mathSegments[Number(index)] || match;
      });
    });
    return restored.length ? restored : [source];
  }

  function renderExplicitMathText(text) {
    const source = String(text == null ? "" : text);
    const parts = [];
    const pattern = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;
    let last = 0;
    let match;
    while ((match = pattern.exec(source))) {
      if (match.index > last) {
        parts.push(escapeHtml(source.slice(last, match.index)));
      }
      const display = match[1] !== undefined;
      const tex = display ? match[1] : match[2];
      parts.push('<span class="inline-math">' + renderKatex(tex, display) + '</span>');
      last = pattern.lastIndex;
    }
    if (last < source.length) {
      parts.push(escapeHtml(source.slice(last)));
    }
    return parts.join("");
  }

  function renderWrittenTableBlock(block) {
    const columns = Array.isArray(block.columns) ? block.columns : [];
    const rows = Array.isArray(block.rows) ? block.rows : [];
    const compact = columns.length <= 2 ? " is-compact" : "";
    const head = columns.length
      ? '<thead><tr>' + columns.map(function (cell) {
        return '<th scope="col">' + renderInlineMath(cell) + '</th>';
      }).join("") + '</tr></thead>'
      : "";
    const body = rows.map(function (row) {
      return '<tr>' + row.map(function (cell, index) {
        const tag = block.rowHeader && index === 0 ? "th" : "td";
        const scope = tag === "th" ? ' scope="row"' : "";
        return '<' + tag + scope + '>' + renderInlineMath(cell == null ? "" : cell) + '</' + tag + '>';
      }).join("") + '</tr>';
    }).join("");
    return [
      '<div class="written-table-wrap">',
      block.caption ? '<p class="written-table-caption">' + renderInlineMath(block.caption) + '</p>' : "",
      '<table class="written-table' + compact + '">',
      head,
      '<tbody>' + body + '</tbody>',
      '</table>',
      block.note ? '<p class="written-table-note">' + renderInlineMath(block.note) + '</p>' : "",
      '</div>'
    ].join("");
  }

  function renderWrittenBlock(block) {
    if (!block || !block.type) {
      return "";
    }
    if (block.type === "table") {
      return renderWrittenTableBlock(block);
    }
    if (block.type === "plain") {
      return '<p class="written-stem-p">' + renderExplicitMathText(block.text || "") + '</p>';
    }
    if (block.type === "formula") {
      return '<div class="written-stem-formula">' + renderKatex(block.tex || "", true) + '</div>';
    }
    if (block.type === "list") {
      const tag = block.ordered ? "ol" : "ul";
      return '<' + tag + ' class="written-stem-list">' + (block.items || []).map(function (item) {
        return '<li>' + renderInlineMath(item) + '</li>';
      }).join("") + '</' + tag + '>';
    }
    if (block.type === "note") {
      return '<p class="written-stem-note">' + renderInlineMath(block.text || "") + '</p>';
    }
    return '<p class="written-stem-p">' + renderInlineMath(block.text || "") + '</p>';
  }

  function renderWrittenStem(question) {
    const layout = writtenLayouts[question.id];
    if (Array.isArray(layout) && layout.length) {
      return '<div class="written-stem-body">' + layout.map(renderWrittenBlock).join("") + '</div>';
    }
    const paragraphs = splitWrittenStemParagraphs(question.stem);
    return '<div class="written-stem-body">' + paragraphs.map(function (paragraph) {
      const sub = /^(?:\([0-9]{1,2}\)|（[0-9]{1,2}）|\([A-Da-d]\)|（[A-Da-d]）|[0-9]{1,2}[.)、]|[一二三四五六七八九十]+、)/.test(paragraph);
      return '<p class="written-stem-p' + (sub ? " is-sub" : "") + '">' + renderInlineMath(paragraph) + '</p>';
    }).join("") + '</div>';
  }

  function renderWrittenCard(question) {
    const session = writtenSessionEntry(question);
    const subject = writtenSubjectEntry(question.subject);
    const open = writtenState.open.has(question.id);
    const answers = Array.isArray(question.answer) ? question.answer : [String(question.answer || "")];
    return [
      '<article class="written-card" id="written-' + escapeHtml(question.id) + '">',
      '  <div class="past-exam-card-head">',
      practiceSubjectBadge(subject),
      '    <span>' + escapeHtml(session.label || "") + ' · 第 ' + question.number + ' 題</span>',
      '    <span class="written-kind">' + escapeHtml(question.kind || "計算／申論") + '</span>',
      '    <span class="written-reference">參考解答</span>',
      '  </div>',
      '  <div class="written-stem">' + renderWrittenStem(question) + '</div>',
      renderPracticeQuestionOrigin(question, session),
      '  <div class="written-actions">',
      '    <button class="btn btn-small" type="button" data-written-toggle="' + escapeHtml(question.id) + '">' + (open ? "收起解答" : "顯示參考解答") + '</button>',
      session.questionUrl ? '    <a class="text-link" href="' + escapeHtml(session.questionUrl) + '" target="_blank" rel="noopener noreferrer">原始試題 PDF →</a>' : "",
      '  </div>',
      open ? '  <div class="written-answer">' + answers.map(function (text) {
        return '<div class="written-answer-block">' + renderWrittenAnswer(text) + '</div>';
      }).join("") + '<p class="written-answer-note">' + escapeHtml(question.note || "本站參考解答（非官方）") + '</p></div>' : "",
      '</article>'
    ].join("");
  }

  function renderWrittenExams(questionId) {
    ensureWrittenState();
    if (questionId) {
      writtenState.year = "all";
      writtenState.subject = "all";
      writtenState.session = "all";
      writtenState.open.add(questionId);
    }
    const questions = writtenFilteredQuestions();
    const years = Array.from(new Set(writtenQuestions.map(function (q) { return q.year; }))).sort(function (a, b) { return a - b; });
    return [
      '<div class="page written-page">',
      '  <section class="past-exam-hero written-hero">',
      '    <div class="past-exam-hero-copy">',
      '      <p class="eyebrow">考古題 · 計算與申論</p>',
      '      <h1>計算題與申論題</h1>',
      '      <p class="lede">收錄 107–115 年四個專業科目的計算題與申論題。107–115 年 348 題計算與申論題均已提供完整參考解答；官方解答 PDF 只有選擇題答案，並非官方公告。</p>',
      '      <div class="past-exam-hero-actions">',
      '        <a class="btn btn-primary" href="#/past-exams">回選擇題練習</a>',
      '      </div>',
      '    </div>',
      '    <aside class="past-exam-stats" aria-label="計算與申論題規模">',
      '      <div class="past-exam-stat"><strong>' + writtenQuestions.length + '</strong><span>題</span></div>',
      '      <div class="past-exam-stat"><strong>' + new Set(writtenQuestions.map(function (q) { return q.sessionId; })).size + '</strong><span>考試次別</span></div>',
      '      <div class="past-exam-stat"><strong>4</strong><span>專業科目</span></div>',
      '      <div class="past-exam-stat"><strong>' + (years.length ? years[0] + "–" + years[years.length - 1] : "") + '</strong><span>年度</span></div>',
      '    </aside>',
      '  </section>',
      renderWrittenFilters(),
      '<div class="written-list" id="written-list">' + (questions.length ? questions.map(renderWrittenCard).join("") : '<div class="past-exam-empty"><h2>目前沒有符合的題目</h2><p>換一個年度、科目或次別再試。</p></div>') + '</div>',
      '  <div class="notice"><strong>解答說明：</strong>申論與計算題沒有官方公告解答；題卡均標示「參考解答」，107–115 年 348 題均已提供完整參考解答；若與補習班、教材或官方答案不同，請以官方與正式教材為準。</div>',
      '</div>'
    ].join("");
  }

  function renderPastExamYearOverview() {
    const years = Array.from(new Set(practiceSessions.map(function (session) {
      return session.year;
    }))).sort(function (a, b) { return b - a; });
    return '<div class="past-exam-year-grid">' + years.map(function (year) {
      const sessions = practiceSessions.filter(function (session) {
        return session.year === year;
      }).sort(comparePracticeSessionsDesc);
      const questions = practiceQuestions.filter(function (question) {
        return question.year === year;
      });
      const yearStats = pastExamStats && pastExamStats.practice && pastExamStats.practice.years ? pastExamStats.practice.years[year] : null;
      const counts = practiceSubjects.map(function (subject) {
        const count = yearStats && yearStats.subjects
          ? (yearStats.subjects[subject.id] || 0)
          : questions.filter(function (question) { return question.subject === subject.id; }).length;
        return (subject.short || subject.name) + " " + count;
      }).join(" · ");
      const total = yearStats ? yearStats.count : questions.length;
      return [
        '<button class="past-exam-year-card" type="button" data-practice-year-jump="' + year + '">',
        '  <span class="past-exam-year-label">' + year + " 年</span>",
        "  <strong>" + total + " 題</strong>",
        "  <span>" + sessions.length + " 次考試 · " + sessions.map(function (session) { return escapeHtml(session.shortLabel || session.label); }).join("、") + "</span>",
        '  <span class="past-exam-year-counts">' + escapeHtml(counts) + "</span>",
        "</button>"
      ].join("");
    }).join("") + "</div>";
  }

  function renderPastExams(questionId) {
    ensurePracticeState();
    if (questionId) {
      practiceFocusQuestion(questionId);
    }
    if (!practiceQuestions.length) {
      return [
        '<div class="page past-exam-page">',
        renderPageHead("歷屆試題", "考古題練習庫", "練習題資料尚未載入。"),
        '<div class="notice">請確認 <code>assets/content-past-exams.js</code> 已正確載入。</div>',
        "</div>"
      ].join("");
    }
    const meta = practiceData.meta || {};
    const years = Array.from(new Set(practiceSessions.map(function (session) {
      return session.year;
    }))).sort(function (a, b) { return a - b; });
    const yearRange = years.length > 1 ? years[0] + "–" + years[years.length - 1] : String(years[0] || "");
    const officialUrl = meta.officialPageUrl || "https://www.sfi.org.tw/Node?id=217";
    const stat = function (value, label) {
      return '<div class="past-exam-stat"><strong>' + value + "</strong><span>" + label + "</span></div>";
    };

    return [
      '<div class="page past-exam-page">',
      '  <section class="past-exam-hero">',
      '    <div class="past-exam-hero-copy">',
      '      <p class="eyebrow">歷屆試題 · 依年度練習</p>',
      "      <h1>考古題練習庫</h1>",
      '      <p class="lede">' + escapeHtml(meta.scopeNote || "依考試年度與科目整理歷屆選擇題，先作答再看答案。") + "</p>",
      '      <div class="past-exam-hero-actions">',
      '        <button class="btn btn-primary" type="button" data-practice-start>開始練習</button>',
      '        <a class="btn" href="#/past-exams/written">計算／申論題</a>',
      '        <a class="btn" href="' + escapeHtml(officialUrl) + '" target="_blank" rel="noopener noreferrer">證基會考題下載</a>',
      "      </div>",
      "    </div>",
      '    <aside class="past-exam-stats" aria-label="練習庫規模">',
      stat((pastExamStats && pastExamStats.practice && pastExamStats.practice.total) || practiceQuestions.length, "選擇題"),
      stat(practiceSessions.length, "考試次別"),
      stat(practiceSubjects.length, "專業科目"),
      stat(yearRange, "收錄年度"),
      "    </aside>",
      "  </section>",
      '  <section class="past-exam-filter-shell" id="past-exam-filters">' + renderPracticeFilters() + "</section>",
      '  <section class="past-exam-panel" id="past-exam-panel">' + renderPracticePanel() + "</section>",
      '  <section class="past-exam-overview">',
      '    <div class="section-heading">',
      "      <div>",
      '        <p class="eyebrow">年度一覽</p>',
      "        <h2>依考試年份挑選</h2>",
      "        <p>先選年度，再縮小到科目或單一次別；練習紀錄只存在你的瀏覽器。</p>",
      "      </div>",
      "    </div>",
      renderPastExamYearOverview(),
      "  </section>",
      '  <div class="notice past-exam-notice"><strong>範圍與來源：</strong>' + escapeHtml(meta.sourceNote || "") + ' <a href="#/sources">資料來源</a></div>',
      '  <div class="notice"><strong>作答說明：</strong>' + escapeHtml(meta.disclaimer || "") + "</div>",
      "</div>"
    ].join("");
  }

  function handleWrittenClick(event) {
    if (!document.getElementById("written-list")) {
      return false;
    }
    const year = event.target.closest("[data-written-year]");
    if (year) {
      event.preventDefault();
      ensureWrittenState();
      writtenState.year = year.dataset.writtenYear === "all" ? "all" : Number(year.dataset.writtenYear);
      writtenSyncSession();
      render();
      return true;
    }
    const subject = event.target.closest("[data-written-subject]");
    if (subject) {
      event.preventDefault();
      ensureWrittenState();
      writtenState.subject = subject.dataset.writtenSubject;
      render();
      return true;
    }
    const toggle = event.target.closest("[data-written-toggle]");
    if (toggle) {
      event.preventDefault();
      ensureWrittenState();
      const id = toggle.dataset.writtenToggle;
      if (writtenState.open.has(id)) {
        writtenState.open.delete(id);
      } else {
        writtenState.open.add(id);
      }
      const card = document.getElementById("written-" + id);
      const question = writtenQuestions.find(function (item) { return item.id === id; });
      if (card && question) {
        card.outerHTML = renderWrittenCard(question);
      }
      return true;
    }
    return false;
  }

  function handlePracticeClick(event) {
    if (!practiceState) {
      return false;
    }
    const yearJump = event.target.closest("[data-practice-year-jump]");
    if (yearJump) {
      event.preventDefault();
      const targetYear = String(yearJump.dataset.practiceYearJump);
      if (String(practiceState.year) !== targetYear) {
        window.location.hash = "#/past-exams?year=" + targetYear;
        return true;
      }
      practiceState.session = "all";
      practiceState.subject = "all";
      practiceState.keyword = "";
      practiceResetCursor(practiceFilteredQuestions());
      practiceRefreshFilters();
      practiceRefreshPanel();
      practiceScrollToPanel();
      return true;
    }

    const yearButton = event.target.closest("[data-practice-year]");
    if (yearButton) {
      event.preventDefault();
      const targetYear = yearButton.dataset.practiceYear === "all" ? "all" : String(yearButton.dataset.practiceYear);
      if (String(practiceState.year) !== targetYear) {
        window.location.hash = "#/past-exams?year=" + targetYear;
        return true;
      }
      practiceState.session = "all";
      practiceResetCursor(practiceFilteredQuestions());
      practiceRefreshFilters();
      practiceRefreshPanel();
      return true;
    }

    const subjectButton = event.target.closest("[data-practice-subject]");
    if (subjectButton) {
      event.preventDefault();
      practiceState.subject = subjectButton.dataset.practiceSubject;
      practiceResetCursor(practiceFilteredQuestions());
      practiceRefreshFilters();
      practiceRefreshPanel();
      return true;
    }

    const modeButton = event.target.closest("[data-practice-mode]");
    if (modeButton) {
      event.preventDefault();
      practiceState.mode = modeButton.dataset.practiceMode;
      if (practiceState.mode === "practice") {
        practiceLoadCurrent(practiceFilteredQuestions());
      }
      practiceRefreshPanel();
      return true;
    }

    const optionButton = event.target.closest("[data-practice-option]");
    if (optionButton) {
      event.preventDefault();
      if (!practiceState.revealed) {
        practiceState.selected = optionButton.dataset.practiceOption;
        practiceRefreshPanel();
      }
      return true;
    }

    const submitButton = event.target.closest("[data-practice-submit]");
    if (submitButton) {
      event.preventDefault();
      if (!practiceState.selected) {
        return true;
      }
      const questions = practiceFilteredQuestions();
      const question = questions[practiceState.index];
      const reveal = function () {
        if (question) {
          practiceState.answers.set(question.id, practiceState.selected);
          practiceState.revealed = true;
          savePracticeAnswers();
          practiceRefreshPanel();
        }
      };
      if (question && !window.PAST_EXAM_EXPLANATIONS) {
        submitButton.disabled = true;
        toast("解析載入中…");
        ensurePastExamExplanations().then(reveal).catch(function () {
          submitButton.disabled = false;
          toast("解析載入失敗，先顯示基本答案。");
          reveal();
        });
      } else {
        reveal();
      }
      return true;
    }

    const nextButton = event.target.closest("[data-practice-next]");
    if (nextButton) {
      event.preventDefault();
      const questions = practiceFilteredQuestions();
      if (practiceState.index < questions.length - 1) {
        practiceState.index += 1;
        practiceLoadCurrent(questions);
        practiceRefreshPanel();
      }
      return true;
    }

    const prevButton = event.target.closest("[data-practice-prev]");
    if (prevButton) {
      event.preventDefault();
      if (practiceState.index > 0) {
        practiceState.index -= 1;
        practiceLoadCurrent(practiceFilteredQuestions());
        practiceRefreshPanel();
      }
      return true;
    }

    const retryButton = event.target.closest("[data-practice-retry]");
    if (retryButton) {
      event.preventDefault();
      const question = practiceFilteredQuestions()[practiceState.index];
      if (question) {
        practiceState.answers.delete(question.id);
        savePracticeAnswers();
        practiceState.selected = null;
        practiceState.revealed = false;
        practiceRefreshPanel();
      }
      return true;
    }

    const restartButton = event.target.closest("[data-practice-restart]");
    if (restartButton) {
      event.preventDefault();
      practiceState.index = 0;
      practiceLoadCurrent(practiceFilteredQuestions());
      practiceRefreshPanel();
      return true;
    }

    const resetRangeButton = event.target.closest("[data-practice-reset-range]");
    if (resetRangeButton) {
      event.preventDefault();
      if (!window.confirm("確定要清除目前篩選範圍的作答紀錄嗎？")) {
        return true;
      }
      practiceFilteredQuestions().forEach(function (question) {
        practiceState.answers.delete(question.id);
      });
      savePracticeAnswers();
      practiceResetCursor(practiceFilteredQuestions());
      practiceRefreshPanel();
      return true;
    }

    const revealButton = event.target.closest("[data-practice-reveal]");
    if (revealButton) {
      event.preventDefault();
      const id = revealButton.dataset.practiceReveal;
      const reveal = function () {
        practiceState.browseRevealed.add(id);
        practiceRefreshPanel(true);
      };
      if (practiceState.browseRevealed.has(id)) {
        practiceState.browseRevealed.delete(id);
        practiceRefreshPanel(true);
      } else if (!window.PAST_EXAM_EXPLANATIONS) {
        revealButton.disabled = true;
        toast("解析載入中…");
        ensurePastExamExplanations().then(reveal).catch(function () {
          revealButton.disabled = false;
          toast("解析載入失敗，先顯示基本答案。");
          reveal();
        });
      } else {
        reveal();
      }
      return true;
    }

    const loadExplanationsButton = event.target.closest("[data-practice-load-explanations]");
    if (loadExplanationsButton) {
      event.preventDefault();
      loadExplanationsButton.disabled = true;
      toast("解析載入中…");
      ensurePastExamExplanations().then(function () {
        practiceRefreshPanel(true);
      }).catch(function () {
        loadExplanationsButton.disabled = false;
        toast("解析載入失敗，請稍後再試。");
      });
      return true;
    }

    const browseAllButton = event.target.closest("[data-practice-browse-all]");
    if (browseAllButton) {
      event.preventDefault();
      practiceState.browseAll = !practiceState.browseAll;
      practiceRefreshPanel(true);
      return true;
    }

    const pageButton = event.target.closest("[data-practice-page]");
    if (pageButton) {
      event.preventDefault();
      const questions = practiceFilteredQuestions();
      const pageCount = Math.max(1, Math.ceil(questions.length / 20));
      if (pageButton.dataset.practicePage === "prev" && practiceState.browsePage > 0) {
        practiceState.browsePage -= 1;
      } else if (pageButton.dataset.practicePage === "next" && practiceState.browsePage < pageCount - 1) {
        practiceState.browsePage += 1;
      }
      practiceRefreshPanel();
      practiceScrollToPanel();
      return true;
    }

    const startButton = event.target.closest("[data-practice-start]");
    if (startButton) {
      event.preventDefault();
      const questions = practiceFilteredQuestions();
      if (!questions.length) {
        return true;
      }
      practiceState.mode = "practice";
      const firstUnanswered = questions.findIndex(function (question) {
        return !practiceState.answers.has(question.id);
      });
      practiceState.index = firstUnanswered >= 0 ? firstUnanswered : 0;
      practiceLoadCurrent(questions);
      practiceRefreshPanel();
      practiceScrollToPanel();
      return true;
    }

    const clearButton = event.target.closest("[data-practice-clear]");
    if (clearButton) {
      event.preventDefault();
      practiceState.year = "all";
      practiceState.subject = "all";
      practiceState.session = "all";
      practiceState.keyword = "";
      practiceResetCursor(practiceFilteredQuestions());
      practiceRefreshFilters();
      practiceRefreshPanel();
      return true;
    }

    return false;
  }

  function handlePracticeChange(event) {
    if (!practiceState) {
      return false;
    }
    const select = event.target.closest("[data-practice-session]");
    if (!select) {
      return false;
    }
    practiceState.session = select.value;
    practiceResetCursor(practiceFilteredQuestions());
    practiceRefreshPanel();
    practiceRefreshSummary();
    return true;
  }

  function handleWrittenChange(event) {
    if (!document.getElementById("written-list")) {
      return false;
    }
    const select = event.target.closest("[data-written-session]");
    if (!select) {
      return false;
    }
    ensureWrittenState();
    writtenState.session = select.value;
    render();
    return true;
  }

  function handlePracticeInput(event) {
    if (!practiceState) {
      return false;
    }
    const input = event.target.closest("[data-practice-search]");
    if (!input) {
      return false;
    }
    practiceState.keyword = input.value;
    practiceState.index = 0;
    practiceState.browsePage = 0;
    practiceLoadCurrent(practiceFilteredQuestions());
    practiceRefreshSummary();
    practiceRefreshPanel();
    return true;
  }

  const homeFaqs = [
    {
      question: "這個網站適合誰？",
      answer: "適合準備證券投資分析人員考試的考生，以及需要快速複習總體經濟學、投資學、會計學與證券法規的人。"
    },
    {
      question: "網站包含哪些科目與章節？",
      answer: "四科共 73 章、230 個學習單元、1,519 張名詞卡：總體經濟學 13 章、投資學 16 章、會計學 23 章、證券法規 21 章。"
    },
    {
      question: "有考古題與完整解答嗎？",
      answer: "有。收錄 107–115 年 29 次考試、3,710 題選擇題與 348 題計算／申論題；選擇題提供逐選項解析，計算／申論題提供完整參考解答。"
    },
    {
      question: "公式與法規如何呈現？",
      answer: "公式以本地 KaTeX 排版；法規收錄 15 部、1,507 條官方條文，並在資料來源頁列出官方連結、版本與查核日期。"
    },
    {
      question: "可以離線或用手機閱讀嗎？",
      answer: "可以。本站是靜態 HTML，支援手機與 file:// 直接開啟；練習紀錄只存在瀏覽器的 localStorage。"
    },
    {
      question: "內容是最新的嗎？",
      answer: "內容更新至 2026-10-24；考試範圍、法規與時事數據仍應以主管機關及官方公告為準。"
    }
  ];

  function renderHome() {
    const forecastCounts = forecastData.meta && forecastData.meta.counts ? forecastData.meta.counts : {};
    const forecastSeries = Number(forecastCounts.series) || (Array.isArray(forecastData.questions) ? forecastData.questions.length : 97);
    const forecastParts = Number(forecastCounts.parts) || 118;
    return [
      '<div class="page">',
      '  <section class="hero">',
      '    <div class="hero-grid">',
      '      <div class="hero-copy">',
      '        <p class="eyebrow">證券投資分析人員 · 考試備考</p>',
      "        <h1>把 <em>總體經濟</em>、<em>投資學</em><br>與 <em>會計學</em>、<em>證券法規</em><br>變成考試地圖。</h1>",
      '        <p class="lede">' + escapeHtml(content.meta.description) + "</p>",
      '        <div class="hero-actions">',
      '          <a class="btn btn-primary" href="#/subject/macro">前往總體經濟</a>',
      '          <a class="btn" href="#/subject/investment">前往投資學</a>',
      '          <a class="btn" href="#/subject/accounting">前往會計學</a>',
      '          <a class="btn" href="#/subject/law">前往證券法規</a>',
      "        </div>",
      "      </div>",
      '      <aside class="hero-aside">',
      '        <div class="exam-card">',
      '          <p class="eyebrow">考試資訊</p>',
      "          <h2>" + escapeHtml(content.meta.examName) + "</h2>",
      "          <p>以章節為骨架，將名詞、公式與考試重點壓縮成可以反覆複習的筆記。</p>",
      '          <ul class="exam-meta">',
      "            <li><span>主要科目</span><strong>" + escapeHtml(content.meta.subjectsLabel) + "</strong></li>",
      "            <li><span>章節範圍</span><strong>" + allChapters.length + " 章 / " + totalSections + " 個學習單元</strong></li>",
      "            <li><span>內容來源</span><strong>臺灣官方 + 繁體中文資料</strong></li>",
      "            <li><span>更新日期</span><strong>" + escapeHtml(content.meta.updated) + "</strong></li>",
      "          </ul>",
      "        </div>",
      "      </aside>",
      "    </div>",
      '    <div class="hero-stats">',
      '      <div class="stat"><strong>' + content.subjects.length + "</strong><span>主要科目</span></div>",
      '      <div class="stat"><strong>' + allChapters.length + "</strong><span>章節</span></div>",
      '      <div class="stat"><strong>' + totalSections + "</strong><span>學習單元</span></div>",
      '      <div class="stat"><strong>' + totalTerms + "</strong><span>名詞卡</span></div>",
      "    </div>",
      "  </section>",
      '  <section class="home-section">',
      '    <div class="section-heading">',
      "      <div>",
      '        <p class="eyebrow">科目</p>',
      "        <h2>四個科目，一條準備主線</h2>",
      "        <p>先建立總體框架，再進入投資學的金融體系、商品與分析工具，用會計學的分錄與報表把數字落回企業，最後用證券法規補足市場實務與自律規範；四科交會的地方，往往就是考題所在。</p>",
      "      </div>",
      "    </div>",
      '    <div class="subject-grid">' + content.subjects.map(renderSubjectCard).join("") + "</div>",
      "  </section>",
      '  <section class="home-section">',
      '    <div class="home-cta-grid">',
      '      <a class="subject-written-cta" href="#/past-exams">',
      '        <div>',
      '          <p class="eyebrow">歷屆試題</p>',
      '          <strong>用考古題練習庫檢查吸收程度</strong>',
      "          <span>收錄 107–115 年共 29 次、3,710 題選擇題；可依年度、科目與考試次別篩選，先作答再看答案，練習紀錄只存在你的瀏覽器。</span>",
      '          <span class="subject-written-cta-note">4 科 · 9 個年度 · 29 次考試</span>',
      "        </div>",
      '        <span class="subject-written-cta-arrow">開始練考古題 →</span>',
      "      </a>",
      '      <a class="subject-written-cta" href="#/exam-forecast">',
      '        <div>',
      '          <p class="eyebrow">考前猜題</p>',
      '          <strong>用考前猜題抓命題方向</strong>',
      "          <span>2026 年 12 月四科 " + forecastSeries + " 題組／" + forecastParts + " 個部分；附完整參考解答、38 條整合公式與 2 組敏感度分析，可依科目、程度、題型與主題篩選。</span>",
      '          <span class="subject-written-cta-note">4 科 · ' + forecastSeries + " 題組 · " + forecastParts + " 個部分</span>",
      "        </div>",
      '        <span class="subject-written-cta-arrow">查看考前猜題 →</span>',
      "      </a>",
      "    </div>",
      "  </section>",
      '  <section class="home-section">',
      '    <div class="section-heading">',
      "      <div>",
      '        <p class="eyebrow">學習流程</p>',
      "        <h2>怎麼用這個網站準備</h2>",
      "        <p>不要從第一頁硬背；先看地圖，再用名詞與考點收斂。</p>",
      "      </div>",
      "    </div>",
      '    <div class="howto">' + content.studySteps.map(function (step, index) {
        return [
          '<article class="step-card">',
          '  <span class="step-number">' + (index + 1) + "</span>",
          "  <h3>" + escapeHtml(step.title) + "</h3>",
          "  <p>" + escapeHtml(step.text) + "</p>",
          "</article>"
        ].join("");
      }).join("") + "</div>",
      "  </section>",
      '  <section class="home-section" id="faq">',
      '    <div class="section-heading">',
      "      <div>",
      '        <p class="eyebrow">常見問題</p>',
      "        <h2>關於這個備考站</h2>",
      "        <p>考試範圍、內容來源、考古題與使用方式。</p>",
      "      </div>",
      "    </div>",
      '    <div class="home-faq">' + homeFaqs.map(function (faq) {
        return [
          "<details>",
          "  <summary>" + escapeHtml(faq.question) + "</summary>",
          "  <p>" + escapeHtml(faq.answer) + "</p>",
          "</details>"
        ].join("");
      }).join("") + "</div>",
      "  </section>",
      '  <section class="home-section">',
      '    <div class="notice">',
      "      <strong>公式與內容校對：</strong>" + escapeHtml(content.meta.formulaNote) + ' <a href="#/sources">查看資料來源</a>',
      "    </div>",
      "  </section>",
      "</div>"
    ].join("");
  }

  function renderSubject(subject) {
    const unitLabel = subjectUnitLabel(subject, true);
    const partGroups = subject.parts
      ? subject.parts.map(function (part) {
          return {
            number: part.number,
            title: part.title,
            page: part.page,
            chapters: subject.chapters.filter(function (chapter) {
              return chapter.part === part.number;
            })
          };
        })
      : [{ number: null, title: "", page: "", chapters: subject.chapters }];

    const partMarkup = partGroups.map(function (group) {
      return [
        '<section class="part-block">',
        group.title
          ? '<div class="part-heading"><div><h2>' + escapeHtml(group.title) + "</h2></div>" + (group.page ? '<span class="part-page">' + escapeHtml(group.page) + "</span>" : "") + "</div>"
          : "",
        '  <div class="chapter-list">' + group.chapters.map(function (chapter) {
          return renderChapterRow(chapter, subject);
        }).join("") + "</div>",
        "</section>"
      ].join("");
    }).join("");

    return [
      '<div class="page ' + escapeHtml(subject.colorClass) + '">',
      '  <section class="subject-hero">',
      "    <div>",
      '      <p class="eyebrow">' + escapeHtml(subject.name) + " · " + subject.chapters.length + " 章</p>",
      "      <h1>" + escapeHtml(subject.name) + "</h1>",
      '      <p class="lede">' + renderInlineMath(subject.description) + "</p>",
      "    </div>",
      '    <aside class="subject-hero-panel">',
      renderProgress(subject),
      "      <p>完成章節會自動保存在此瀏覽器；不需要登入，也不會上傳。</p>",
      '      <div class="subject-mini-stats">',
      "        <div><strong>" + subject.chapters.length + "</strong><span>章</span></div>",
      "        <div><strong>" + subjectSections(subject) + "</strong><span>" + unitLabel + "</span></div>",
      "        <div><strong>" + subjectTerms(subject) + "</strong><span>名詞卡</span></div>",
      "      </div>",
      "    </aside>",
      "  </section>",
      subject.id === "macro"
        ? '<div class="subject-cta-grid">' + renderModelAtlasCard(subject) + renderMacroEvolutionCta() + renderNobelCta() + "</div>"
        : "",
      subject.id === "investment" ? renderInvestmentFormulasCard() : "",
      subject.id === "investment" ? renderInvestmentTechnicalCard() : "",
      subject.id === "accounting" ? '<div class="notice"><strong>IFRS 版本查核：</strong>2026 年考試仍請以金管會當年度認可之 IFRS 正體中文版為準。IASB 發布之 IFRS 18「財務報表之表達與揭露」自 2027-01-01 起適用；金管會規劃臺灣公開發行公司於 117 會計年度（2028 年）接軌，符合條件者可於認可後提前適用。IFRS 19 自 2027-01-01 起適用，屬符合條件子公司之減少揭露選項。本章節以現行教材與 IFRS 9／15／16／10 等為主，考前請再核對 <a href="https://www.sfb.gov.tw/ch/home.jsp?id=931&amp;parentpath=0%2C2%2C929" target="_blank" rel="noopener noreferrer">金管會 IFRS 推動情形</a>。</div>' : "",
      '  <div class="subject-parts">' + partMarkup + "</div>",
      subject.note
        ? '  <div class="notice"><strong>目錄說明：</strong>' + escapeHtml(subject.note) + "</div>"
        : "",
      '  <div class="notice">',
      "    <strong>提示：</strong>若某章的名詞或公式與你手上的教材不同，先確認版本與定義，再以主管機關公告或正式教材為準。",
      "  </div>",
      "</div>"
    ].join("");
  }

  function mermaidLabEntries() {
    const source = window.MERMAID_DIAGRAMS || {};
    return Object.keys(source).map(function (key) {
      return source[key];
    }).filter(function (entry) {
      return entry && diagrams[entry.key];
    }).sort(function (a, b) {
      return (Number(a.order) || 0) - (Number(b.order) || 0);
    });
  }

  function renderMermaidLab() {
    const entries = mermaidLabEntries();
    if (!entries.length) {
      return renderNotFound();
    }

    const existingCount = entries.filter(function (entry) { return !entry.createDiagram; }).length;
    const newCount = entries.filter(function (entry) { return entry.createDiagram; }).length;
    const index = entries.map(function (entry) {
      return '<a href="#/lab/mermaid?diagram=' + encodeURIComponent(entry.slug) + '">' +
        escapeHtml(entry.shortTitle || entry.key) + "</a>";
    }).join("");

    function renderLabCard(entry) {
      const diagram = diagrams[entry.key];
      const subject = getSubject(entry.subject);
      const chapter = getChapter(entry.chapterId);
      return [
        '<article class="mermaid-lab-card" id="mermaid-' + escapeHtml(entry.slug) + '">',
        '  <div class="mermaid-lab-card-head">',
        "    <div>",
        '      <p class="eyebrow">' + escapeHtml(subject ? subject.name : entry.subjectName) + " · " + escapeHtml(entry.chapterTitle || entry.chapterId) + "</p>",
        "      <h2>" + escapeHtml(entry.shortTitle || entry.title || entry.key) + "</h2>",
        "    </div>",
        '    <div class="mermaid-lab-card-meta">',
        "      <span>" + escapeHtml(entry.sectionTitle || "") + "</span>",
        chapter ? '<a class="text-link" href="#/chapter/' + escapeHtml(chapter.id) + "?section=" + (Number(entry.section) + 1) + '">回原章節 →</a>' : "",
        "    </div>",
        "  </div>",
        renderDiagram(Object.assign({}, diagram, { mermaid: entry })),
        "</article>"
      ].join("");
    }

    const subjectOrder = ["macro", "accounting", "investment"];
    const groups = subjectOrder.map(function (subjectId) {
      const subject = getSubject(subjectId);
      const groupEntries = entries.filter(function (entry) { return entry.subject === subjectId; });
      if (!groupEntries.length) return "";
      return [
        '<section class="mermaid-lab-group" aria-labelledby="mermaid-group-' + escapeHtml(subjectId) + '">',
        '  <div class="mermaid-lab-group-head">',
        '    <h2 id="mermaid-group-' + escapeHtml(subjectId) + '">' + escapeHtml(subject ? subject.name : subjectId) + "</h2>",
        "    <span>" + groupEntries.length + " 張</span>",
        "  </div>",
        '  <div class="mermaid-lab-list">' + groupEntries.map(renderLabCard).join("") + "</div>",
        "</section>"
      ].join("");
    }).join("");

    return [
      '<div class="page mermaid-lab">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      "    <span>Mermaid × Pele 圖表</span>",
      "  </nav>",
      '  <header class="page-head">',
      '    <p class="eyebrow">Mermaid × Pele · 第 2–5 步完成</p>',
      "    <h1>" + entries.length + " 張 Mermaid 圖表的 SVG／MMD 對照</h1>",
      '    <p class="lede">流程、樹狀與推導步驟改用 Mermaid；既有手繪 SVG 保留為 SVG 版，新推導圖另有建置時產生的靜態 SVG。連續函數曲線與精確座標圖仍保留原本手繪 SVG。</p>',
      "  </header>",
      '  <div class="mermaid-lab-intro">',
      "    <p><strong>轉換範圍：</strong>" + existingCount + " 張既有流程／樹狀圖，加上 " + newCount + " 張新推導圖（總體模型地圖、CAPM／SML、債券利率風險、選擇權定價、Black–Scholes）。每張圖上方可切換「SVG」與「MMD」；MMD 只在切換時才載入 Pele。右上角 <strong>◈</strong> 可切換全站風格，網站 CSS 與 Pele 會同步套用。31 張量化曲線圖與 1 張速查表保留原 SVG／表格，並以 32 組「相關圖表」連到 MMD 地圖或總覽。</p>",
      '    <span class="mermaid-lab-style-hint"><span aria-hidden="true">◈</span>右上角切換全站風格</span>',
      "  </div>",
      '  <nav class="mermaid-lab-index" aria-label="Mermaid 圖表索引">' + index + "</nav>",
      '  <div class="notice"><strong>輸出：</strong>每張圖的「複製 .mmd」與「下載 .mmd」可直接帶到其他網頁或應用程式；來源檔同步放在 <code>site/diagrams/mermaid/</code>（<a href="diagrams/mermaid/manifest.json" target="_blank" rel="noopener">manifest.json</a>）。T 字帳／速查表保留表格，連續函數曲線圖保留手繪 SVG。</div>',
      groups,
      "</div>"
    ].join("");
  }

  function renderMacroModels() {
    const subject = getSubject("macro");
    if (!subject) {
      return renderNotFound();
    }

    const groups = macroModelGroups();
    const total = countMacroModels(groups);
    const chaptersWithModels = groups.filter(function (group) {
      return group.entries.length > 0;
    }).length;

    const jumpLinks = groups.map(function (group) {
      const chapter = group.chapter;
      const label = chapterLabel(chapter) + " " + chapter.title;
      const emptyClass = group.entries.length ? "" : ' class="is-empty"';
      return [
        "<a" + emptyClass,
        ' href="#/models/macro?chapter=' + encodeURIComponent(chapter.id) + '"',
        ' aria-label="' + escapeHtml(label + "（" + group.entries.length + " 張模型）") + '">',
        escapeHtml(chapterLabel(chapter)),
        " <span>" + group.entries.length + "</span>",
        "</a>"
      ].join("");
    }).join("");

    const chapterSections = groups.map(function (group) {
      const chapter = group.chapter;
      const eyebrow = [chapterPartLabel(chapter), chapterLabel(chapter)].filter(Boolean).join(" · ");
      const entries = group.entries.map(function (entry) {
        return [
          '<article class="models-entry" id="' + escapeHtml(entry.anchor) + '">',
          '  <div class="models-entry-ref">',
          '    <span class="eyebrow">' + padNumber(entry.sectionIndex + 1) + "</span>",
          '    <a href="#/chapter/' + escapeHtml(chapter.id) + "?section=" + (entry.sectionIndex + 1) + '">' + escapeHtml(sectionDisplayTitle(entry.section)) + "</a>",
          "  </div>",
          renderDiagram(Object.assign({}, entry.diagram, {
            formula: entry.diagram.formula || modelSectionFormula(chapter, entry.section)
          }), { split: true }),
          "</article>"
        ].join("");
      }).join("");

      return [
        '<section class="models-chapter" id="models-' + escapeHtml(chapter.id) + '">',
        '  <div class="models-chapter-head">',
        "    <div>",
        '      <p class="eyebrow">' + escapeHtml(eyebrow) + "</p>",
        "      <h2>" + escapeHtml(chapterLabel(chapter) + " " + chapter.title) + "</h2>",
        "    </div>",
        '    <div class="models-chapter-side">',
        '      <span class="models-badge">' + group.entries.length + " 張模型</span>",
        '      <a class="text-link" href="#/chapter/' + escapeHtml(chapter.id) + '">讀本章 →</a>',
        "    </div>",
        "  </div>",
        entries || '  <p class="models-empty">本章以概念與制度說明為主，沒有獨立的模型圖；完整內容請見本章。</p>',
        "</section>"
      ].join("");
    }).join("");

    return [
      '<div class="page subject-macro">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/macro">' + escapeHtml(subject.name) + "</a><span>/</span>",
      "    <span>模型總覽</span>",
      "  </nav>",
      '  <header class="chapter-head models-head">',
      "    <div>",
      '      <p class="eyebrow">總體模型總覽</p>',
      "      <h1>總體經濟模型總覽</h1>",
      '      <p class="lede">把 ' + subject.chapters.length + " 章用到的 " + total + " 張章節模型圖集中在同一頁；諾貝爾經濟學獎的 17 組代表模型與 58 屆資料已整合至「歷年諾貝爾經濟學獎」頁面。</p>",
      '      <div class="models-summary">',
      "        <span><strong>" + total + "</strong> 章節模型</span>",
      "        <span><strong>" + chaptersWithModels + "</strong> 章含模型</span>",
      "        <span><strong>" + subject.chapters.length + "</strong> 章</span>",
      "      </div>",
      "    </div>",
      '    <div class="chapter-head-side">',
      '      <a class="btn btn-small" href="#/subject/macro">← 回總經首頁</a>',
      '      <a class="btn btn-small" href="#/nobel">諾貝爾 17 組模型 →</a>',
      "    </div>",
      "  </header>",
      '  <div class="notice models-binding">',
      "    <strong>同步更新：</strong>本頁與各章模型圖共用同一份模型資料，不另存副本；諾貝爾經濟學獎模型與年表已整合至「歷年諾貝爾經濟學獎」，可從頁首或下方連結前往。",
      "  </div>",
      '  <nav class="models-jump" aria-label="模型章節快速跳轉">',
      '    <p class="eyebrow">模型快速跳轉</p>',
      jumpLinks,
      "  </nav>",
      '  <div class="models-list">' + chapterSections + "</div>",
      '  <footer class="models-foot">',
      "    <p>共 " + total + " 張章節模型圖；諾貝爾經濟學獎 17 組模型與 58 屆資料請見 <a href=\"#/nobel\">諾貝爾模型頁</a>。各章的概念、名詞與考試重點仍以章節頁為完整版本。</p>",
      '    <a href="#/models/macro">↑ 回到頂端</a>',
      "  </footer>",
      "</div>"
    ].join("");
  }

  function renderNobelPage() {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const groups = nobelModelGroups();
    const diagramGroups = groups.filter(function (group) {
      return Boolean(group.diagram);
    });
    const meta = nobelData.meta || {};
    const firstYear = rows.length ? rows[0].year : "";
    const lastYear = rows.length ? rows[rows.length - 1].year : "";
    const period = meta.period || (firstYear + "–" + lastYear);

    if (!rows.length) {
      return renderNotFound();
    }

    const modelJumpLinks = groups.map(function (group, index) {
      return [
        '<a href="#/nobel?group=' + encodeURIComponent(group.id) + '"',
        ' title="' + escapeHtml(group.title) + '"',
        ' aria-label="' + escapeHtml("諾貝爾模型 " + padNumber(index + 1) + " " + group.title + "，共 " + group.rows.length + " 屆") + '">',
        "諾貝爾 " + padNumber(index + 1),
        ' <span>' + group.rows.length + " 屆</span>",
        "</a>"
      ].join("");
    }).join("");

    return [
      '<div class="page subject-macro nobel-page">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/macro">總體經濟學</a><span>/</span>',
      "    <span>歷年諾貝爾經濟學獎</span>",
      "  </nav>",
      '  <header class="chapter-head nobel-head">',
      "    <div>",
      '      <p class="eyebrow">諾貝爾經濟學獎 · ' + escapeHtml(period) + "</p>",
      "      <h1>歷年諾貝爾經濟學獎</h1>",
      '      <p class="lede">完整整合 ' + rows.length + " 屆資料的得主、主要理論、代表模型與核心結論，依 " + diagramGroups.length + " 組代表模型分組呈現：每組預設顯示第一屆，上方年份下拉可快速跳到包含該年份的模型，屆別晶片可在同一模組切換屆別資料。</p>",
      '      <div class="models-summary">',
      "        <span><strong>" + rows.length + "</strong> 屆資料</span>",
      "        <span><strong>" + diagramGroups.length + "</strong> 組模型</span>",
      "        <span><strong>" + escapeHtml(period) + "</strong> 年</span>",
      "      </div>",
      "    </div>",
      '    <div class="chapter-head-side">',
      '      <a class="btn btn-small" href="#/subject/macro">← 總經首頁</a>',
      '      <a class="btn btn-small btn-primary" href="#/models/macro">模型總覽 →</a>',
      "    </div>",
      "  </header>",
      '  <div class="notice nobel-source-note">',
      "    <strong>資料說明：</strong>" + escapeHtml(meta.sourceNote || "表格依使用者提供之整理建檔；年份、得主與學說請以官方公告為準。"),
      meta.officialUrl
        ? ' <a href="' + escapeHtml(meta.officialUrl) + '" target="_blank" rel="noopener noreferrer">諾貝爾獎官方獎項頁 ↗</a>'
        : "",
      "  </div>",
      '  <div class="notice nobel-formula-note">',
      "    <strong>閱讀方式：</strong>每一組模型是一張左右 1:1 的卡片：左側是模型標題、說明、屆別晶片、目前屆別的得主與複習公式，以及 SVG 模型圖（2025 屆公式已依官方科學背景修正）；右側是圖說與變數／參數。上方年份下拉會切換所屬模型的屆別並捲動到該模型；晶片只切換屆別資料，不跳頁、不改變畫面位置。畫面上的公式以 KaTeX 排版，同一組圖可能對應多個屆別，但不代表所有獎項共用同一條方程式。",
      "  </div>",
      '  <section class="nobel-table-section" aria-labelledby="nobel-table-heading">',
      '    <div class="section-heading nobel-section-heading">',
      "      <div>",
      '        <p class="eyebrow">17 組代表模型 · ' + escapeHtml(period) + "</p>",
      '        <h2 id="nobel-table-heading">17 組模型與歷屆得主</h2>',
      "      </div>",
      '      <span class="nobel-table-hint">每組預設第一屆；用上方年份下拉跳到所屬模型，或點屆別晶片在原地切換屆別資料。</span>',
      "    </div>",
      renderNobelYearJump(groups),
      '    <nav class="models-jump nobel-model-jump" id="nobel-models" aria-label="諾貝爾模型圖索引">',
      '      <p class="eyebrow">' + diagramGroups.length + " 組模型圖索引</p>",
      modelJumpLinks,
      "    </nav>",
      renderNobelModules(),
      "  </section>",
      '  <footer class="models-foot">',
      "    <p>共 " + rows.length + " 屆、 " + diagramGroups.length + " 組模型；每組預設第一屆，桌機左右 1:1、900px 以下單欄，官方年份與得主仍以諾貝爾獎官網為準。</p>",
      '    <a href="#/subject/macro">← 回總體經濟學</a>',
      "  </footer>",
      "</div>"
    ].join("");
  }

  function getLawArticleData(chapterId) {
    const data = window.LAW_ARTICLES || {};
    return data[chapterId] || null;
  }

  function formatLawDate(value) {
    return /^\d{8}$/.test(String(value || ""))
      ? String(value).slice(0, 4) + "-" + String(value).slice(4, 6) + "-" + String(value).slice(6, 8)
      : String(value || "");
  }

  function renderLawSource(source) {
    const articles = Array.isArray(source.articles) ? source.articles : [];
    const articleCount = articles.filter(function (article) {
      return article.type === "article";
    }).length;
    const rows = articles.map(function (article) {
      if (article.type === "heading") {
        return '<h3 class="law-chapter-heading">' + escapeHtml(article.text) + "</h3>";
      }
      return [
        '<article class="law-article">',
        '  <div class="law-article-no">' + escapeHtml(article.no) + "</div>",
        '  <div class="law-article-text">' + escapeHtml(article.text).replace(/\r?\n/g, "<br>") + "</div>",
        "</article>"
      ].join("");
    }).join("");

    return [
      '<section class="law-source">',
      '  <div class="law-source-head">',
      '    <span class="law-source-badge">官方全文</span>',
      '    <span class="law-source-title">' + escapeHtml(source.name) + "</span>",
      '    <span class="law-source-count">' + articleCount + " 條</span>",
      "  </div>",
      '  <div class="law-source-body">',
      '    <div class="law-source-meta">',
      '      <span>來源：<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">全國法規資料庫</a></span>',
      source.updated ? "      <span>法規異動：" + escapeHtml(formatLawDate(source.updated)) + "</span>" : "",
      "    </div>",
      '    <div class="law-article-list">' + (rows || '<p class="law-empty-note">目前沒有可顯示的條文。</p>') + "</div>",
      "  </div>",
      "</section>"
    ].join("");
  }

  function renderLawExternal(item) {
    return [
      '<article class="law-external-card">',
      '  <div class="law-external-head">',
      '    <span class="law-source-badge is-external">' + escapeHtml(item.badge || "官方連結") + "</span>",
      "    <h3>" + escapeHtml(item.name) + "</h3>",
      "  </div>",
      "  <p>" + escapeHtml(item.summary || "") + "</p>",
      item.note ? '  <p class="law-external-note">' + escapeHtml(item.note) + "</p>" : "",
      '  <a class="law-external-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">前往官方頁面查詢 <span aria-hidden="true">↗</span></a>',
      "</article>"
    ].join("");
  }

  function renderLawArticles(chapter) {
    const data = getLawArticleData(chapter.id);
    if (!data) {
      return "";
    }

    const official = Array.isArray(data.official) ? data.official : [];
    const external = Array.isArray(data.external) ? data.external : [];
    if (!official.length && !external.length) {
      return "";
    }

    const heading = official.length ? "法規全文" : "法規全文與官方連結";
    const note = official.length
      ? "以下條文由全國法規資料庫 Open API 匯入（資料更新 2026-10-08，含「（刪除）」條文列），依條號順序直接顯示；條文以官方網站最新公告為準。"
      : "本頁屬於公會自律規範或概括法規，依本站資料政策提供官方查詢連結與複習摘要，不逐條轉錄；實際內容以主管機關與公會最新公告為準。";

    return [
      '<section class="section-block law-fulltext" id="section-fulltext">',
      '  <div class="section-kicker">法規全文</div>',
      "  <h2>" + heading + "</h2>",
      '  <p class="law-fulltext-note">' + escapeHtml(note) + "</p>",
      '  <div class="law-source-list">' + official.map(renderLawSource).join("") + "</div>",
      external.length
        ? '  <div class="law-external-list">' + external.map(renderLawExternal).join("") + "</div>"
        : "",
      "</section>"
    ].join("");
  }

  function renderChapter(chapter) {
    const subject = getSubject(chapter.subjectId);
    if (!subject) {
      return renderNotFound();
    }

    const done = progress.has(chapter.id);
    const tocItems = chapter.sections.map(function (section, index) {
      return [
        "<li>",
        '<a href="#/chapter/' + escapeHtml(chapter.id) + "?section=" + (index + 1) + '"',
        ' data-scroll-to="section-' + (index + 1) + '"',
        ' data-chapter-id="' + escapeHtml(chapter.id) + '"',
        ' data-section="' + (index + 1) + '">',
        escapeHtml(sectionDisplayTitle(section)),
        "</a>",
        "</li>"
      ].join("");
    }).concat(getLawArticleData(chapter.id) ? [
      "<li>",
      '<a href="#/chapter/' + escapeHtml(chapter.id) + '?section=fulltext"',
      ' data-scroll-to="section-fulltext"',
      ' data-chapter-id="' + escapeHtml(chapter.id) + '"',
      ' data-section="fulltext">法規全文</a>',
      "</li>"
    ] : []).join("");

    return [
      '<div class="page ' + escapeHtml(subject.colorClass) + '">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/' + escapeHtml(subject.id) + '">' + escapeHtml(subject.name) + "</a><span>/</span>",
      "    <span>" + escapeHtml(chapterLabel(chapter)) + "</span>",
      "  </nav>",
      '  <header class="chapter-head">',
      "    <div>",
      '      <p class="eyebrow">' + escapeHtml(subject.name) + (chapterPartLabel(chapter) ? " · " + escapeHtml(chapterPartLabel(chapter)) : "") + " · " + escapeHtml(chapterLabel(chapter)) + "</p>",
      "      <h1>" + escapeHtml(chapter.title) + "</h1>",
      '      <p class="lede">' + renderInlineMath(chapter.summary) + "</p>",
      "    </div>",
      '    <div class="chapter-head-side">',
      '      <button class="btn btn-small' + (done ? " is-done" : "") + '" type="button" data-complete-btn="' + escapeHtml(chapter.id) + '" aria-pressed="' + (done ? "true" : "false") + '">' + (done ? "✓ 已完成" : "標記本章完成") + "</button>",
      "    </div>",
      "  </header>",
      '  <div class="chapter-layout">',
      '    <aside class="chapter-toc">',
      "      <h2>本章導覽</h2>",
      '      <ul class="toc-list">' + tocItems + "</ul>",
      '      <div class="toc-progress">' + renderProgress(subject) + "</div>",
      "    </aside>",
      '    <article class="chapter-content">',
      '      <div class="chapter-summary"><strong>本章摘要：</strong>' + renderInlineMath(chapter.summary) + "</div>",
      renderChapterExamSourceBlock(chapter),
      chapter.note
        ? '      <div class="notice chapter-note"><strong>單元說明：</strong>' + escapeHtml(chapter.note) + "</div>"
        : "",
      chapter.sections.map(function (section, index) {
        return renderSection(section, index, subject, chapter);
      }).join(""),
      renderLawArticles(chapter),
      renderChapterRefs(chapter),
      renderChapterNav(chapter),
      '      <div class="chapter-actions">',
      '        <button class="btn btn-primary btn-small' + (done ? " is-done" : "") + '" type="button" data-complete-btn="' + escapeHtml(chapter.id) + '" aria-pressed="' + (done ? "true" : "false") + '">' + (done ? "✓ 已完成" : "標記本章完成") + "</button>",
      '        <button class="btn btn-small" type="button" data-action="copy-link">複製本章連結</button>',
      '        <button class="btn btn-small" type="button" data-action="print">列印 / 存 PDF</button>',
      subject.id === "macro" ? '        <a class="btn btn-small" href="#/models/macro?chapter=' + escapeHtml(chapter.id) + '">模型總覽</a>' : "",
      subject.id === "investment" && chapter.id === "investment-15" ? '        <a class="btn btn-small" href="#/investment/technical">技術分析 50 指標 →</a>' : "",
      "      </div>",
      "    </article>",
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderSources() {
    const groups = content.sourceGroups.map(function (group) {
      const items = content.sources.filter(function (source) {
        return source.group === group.name;
      });
      return [
        '<section class="source-group">',
        "  <h2>" + escapeHtml(group.name) + "</h2>",
        '  <p class="lede">' + escapeHtml(group.description) + "</p>",
        '  <ul class="source-list">' + items.map(function (source) {
          return [
            '<li class="source-item">',
            '  <a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.name) + "</a>",
            "  <p>" + escapeHtml(source.note) + "</p>",
            '  <span class="source-domain">' + escapeHtml(source.domain) + "</span>",
            "</li>"
          ].join("");
        }).join("") + "</ul>",
        "</section>"
      ].join("");
    }).join("");

    return [
      '<div class="page">',
      renderPageHead("來源與校對", "資料來源", "總體經濟學、投資學與會計學各自依不同目錄建構；內容以臺灣官方網站與繁體中文公開資料為主，每個章節頁面也會列出該章主要參考來源。"),
      '  <div class="notice">',
      "    <strong>公式校對：</strong>" + escapeHtml(content.meta.formulaNote),
      "  </div>",
      '  <div class="notice">',
      "    <strong>核對進度：</strong>截至 2026-10-24，諾貝爾年表 58 屆的年份與得主已對照官方 API（0 筆不一致），2026 屆學說概念已對照官方 popular information，2019–2020 屆公式與學說方向亦已對照官方科學背景（概念式）；投資學與總體經濟學 29 條公式已完成公開教材逐條核對（#27 BIS CIP、#28 SEC NAV 另經官方交叉核對）；21 張既有總體模型圖已完成公開教材逐條核對，全部為「通過（教材）」，B15 另經 CBC 官方外匯頁輔助，B12 的臺灣景氣指標以國發會頁面輔助；另有 2 張新增國民所得教學圖（國民所得會計帳流程圖、NFIA 觀念圖）與會計學 7 張教學流程圖（會計循環、主要財務報表架構、借記／貸記常用項目、交易到報表流程、財務分析總架構、杜邦分析、四表連結）為教學示意，已通過結構與章節綁定驗證，尚未逐條教材核對；投資學另有 32 條比例分析公式，集中於單一來源並與對應章節綁定，另有 7 項選擇權評價優先順序；會計公式 A1–A12 已完成核對（A1、A3、A4、A8、A12 依 IFRS 官方摘要，A5、A7 依 IFRS 9／16 準則本文，A2、A6、A9–A11 依公開教材）；會計代表性分錄與報表勾稽已檢查，各章例題逐題重算與諾貝爾其他屆公式仍待官方或教材逐條核對。",
      "  </div>",
      groups,
      '  <div class="notice">',
      "    <strong>免責聲明：</strong>" + escapeHtml(content.meta.disclaimer),
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderAbout() {
    return [
      '<div class="page">',
      renderPageHead("操作指南", "使用說明", "這是一個純靜態的考試複習網站：沒有帳號、沒有廣告，完成進度只存在你的瀏覽器。"),
      '  <div class="prose">',
      "    <h2>這個網站是什麼</h2>",
      "    <p>總體經濟學依《證券投資分析人員考試概要》的目錄整理；投資學依《投資學》目錄的 16 章整理；會計學依《會計學》目錄的 23 章整理；證券交易相關法規與實務依測驗範圍整理為 21 章、21 節。四個科目各自獨立，不互相混用章節。全站共 " + content.subjects.length + " 個科目、" + allChapters.length + " 章、" + totalSections + " 個學習單元。每個章節包含核心概念、名詞速查、考試重點、記憶句與關鍵公式。</p>",
      "    <h2>怎麼使用</h2>",
      "    <ol>",
      "      <li>先從科目頁看章節地圖，確認章節的順序。</li>",
      "      <li>進入章節後，先讀「核心概念」，再用名詞卡補足定義。</li>",
      "      <li>讀完一個單元，只看「考試重點」與「一句話記憶」，測試自己能否回想。</li>",
      "      <li>把公式抄一次，確認每個符號的意義與適用條件。</li>",
      "      <li>用「總體經濟模型總覽」跨章比較模型；需要完整說明時，再回到所屬章節。</li>",
      "      <li>完成一章後按「標記本章完成」，回頭看科目進度。</li>",
      "    </ol>",
      "    <h2>內容製作與校對</h2>",
      "    <ul>",
      "      <li>總體經濟學的章節、節名與頁碼以 <code>documents/gross_economics_contents.md</code> 為依據，共 13 章、49 個來源節次（另加 1 個補充單元，共 50 節）。</li>",
      "      <li>投資學的章名與順序以 <code>documents/investment_contents.md</code> 為依據；該目錄只提供章名，頁面上的「學習重點」是本站編寫的複習單元，不冒充原書節名。</li>",
      "      <li>會計學的章名、順序與頁碼以 <code>documents/accounting_toc.md</code> 為依據；有列節名的章節照原節名呈現，未列節名的章節以「學習重點」標示，不冒充原書節名。第 23 章來源註明原書章號印為 22，本站依順序列為第 23 章。財務分析總架構、杜邦分析與四表連結的圖表內容另參考 <code>documents/accounting_contents.md</code>。</li>",
      "      <li>四個科目的來源目錄不同：總體經濟學使用 <code>gross_economics_contents.md</code>（第 11–13 章為金融市場）；投資學使用 <code>investment_contents.md</code>；會計學章節使用 <code>accounting_toc.md</code>、財務分析圖表使用 <code>accounting_contents.md</code>；證券法規使用 <code>securities_law_contents.md</code>；不以其中一科的章節補另一科。</li>",
      "      <li>依投資學來源目錄，章號由第十一章直接跳到第十三章；本站保留原始編號，不自行補章。</li>",
      "      <li>總體經濟學另設「模型總覽」（#/models/macro），依 13 章集中 29 張章節圖（含 1 張國民所得流程圖、1 張 NFIA 觀念圖、1 張 MMD 總體模型地圖與 5 張學派模型補充）；「歷年諾貝爾經濟學獎」（#/nobel）則以 17 張模型模組呈現 58 屆資料，每組左右 1:1 排列屆別資料、模型圖與變數／參數，兩頁共用同一份模型資料。</li>",
      "      <li>「考古題練習庫」（#/past-exams）收錄 107–115 年共 29 次、3,710 題選擇題；可依年度、科目與次別篩選，先作答再看答案。練習紀錄只存在瀏覽器，換裝置不會同步；申論題與計算題請點原始試題連結。</li>",
      "      <li>名詞與公式以臺灣官方網站（主計總處、中央銀行、金管會、證交所、期交所等）與繁體中文公開資料交叉核對。</li>",
      "      <li>同一公式若在不同來源有不同符號定義，應先確認假設與適用條件，再以官方或正式教材為準。</li>",
      "      <li>可將同一節內容交給 ChatGPT、Gemini 或 Claude 做獨立比較，特別檢查定義、公式符號、適用條件與數值例子；跨模型一致不代表一定正確，仍要回到原始來源。</li>",
      "      <li>若發現錯誤，請以主管機關公告與正式教材為最終依據。</li>",
      "    </ul>",
      "    <h2>進度與隱私</h2>",
      "    <p>章節完成進度與考古題作答紀錄只儲存在瀏覽器的 localStorage，不會傳送到任何伺服器。清除瀏覽器資料，或按下方按鈕，即可重置。</p>",
      '    <p><button class="btn btn-small" type="button" data-action="reset-progress">清除章節進度</button> <button class="btn btn-small" type="button" data-action="reset-practice-progress">清除考古題紀錄</button></p>',
      "    <h2>免責聲明</h2>",
      "    <p>" + escapeHtml(content.meta.disclaimer) + "</p>",
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderNotFound() {
    return [
      '<div class="page">',
      renderPageHead("錯誤", "找不到這個頁面", "網址可能已經改變，或這個章節不存在。"),
      '  <a class="btn btn-primary" href="#/">回到首頁</a>',
      "</div>"
    ].join("");
  }

  /* ----------------------------- app render ----------------------------- */

  function updateNav(route) {
    const active = {
      home: route.parts.length === 0,
      macro: (route.parts[0] === "models" && route.parts[1] === "macro") || route.parts[0] === "nobel" || (route.parts[0] === "macro" && route.parts[1] === "evolution"),
      investment: route.parts[0] === "investment" && route.parts[1] === "formulas",
      accounting: false,
      law: false,
      "past-exams": route.parts[0] === "past-exams",
      "exam-forecast": route.parts[0] === "exam-forecast",
      "mermaid-lab": route.parts[0] === "lab" && route.parts[1] === "mermaid",
      sources: route.parts[0] === "sources",
      about: route.parts[0] === "about"
    };

    if (route.parts[0] === "subject") {
      active[route.parts[1]] = true;
    }

    if (route.parts[0] === "chapter") {
      const chapter = getChapter(route.parts[1]);
      if (chapter) {
        active[chapter.subjectId] = true;
      }
    }

    document.querySelectorAll(".main-nav a").forEach(function (link) {
      if (active[link.dataset.nav]) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function setupSectionObserver() {
    if (sectionObserver) {
      sectionObserver.disconnect();
      sectionObserver = null;
    }

    const sections = document.querySelectorAll(".section-block");
    if (!sections.length) {
      return;
    }

    const tocLinks = document.querySelectorAll(".toc-list a");
    if (tocLinks.length) {
      tocLinks[0].classList.add("active");
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(function (link) {
            const isActive = link.dataset.scrollTo === id;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    }, {
      rootMargin: "-18% 0px -68% 0px",
      threshold: [0, 0.1, 0.5]
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  function updateReadingProgress() {
    if (!header || !readingProgress) {
      return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    readingProgress.style.width = percent + "%";
  }

  const DEFAULT_DESCRIPTION = "證券投資分析人員考試備考站：總體經濟學、投資學、會計學與證券法規的章節筆記、名詞、KaTeX 公式、1,507 條法規、107–115 年 3,710 題考古題與考前猜題。";

  function routeDescription(route) {
    const parts = route.parts || [];
    if (!parts.length) {
      return DEFAULT_DESCRIPTION;
    }
    if ((parts[0] === "macro" && parts[1] === "evolution") || (parts[0] === "subject" && parts[1] === "macro" && route.query.get("evolution"))) {
      return "總體經濟學學派演進圖：6 階段、10 節點、23 個模型連結與 15 個諾貝爾里程碑。";
    }
    if (parts[0] === "subject" && getSubject(parts[1])) {
      const subject = getSubject(parts[1]);
      return subject.name + "：" + subject.chapters.length + " 章、" + subjectSections(subject) + " 個學習單元；名詞、考試重點、公式與考古題。";
    }
    if (parts[0] === "investment" && parts[1] === "formulas") {
      return "投資學公式總表：32 條比例分析、66 條核心公式、7 項選擇權評價與 30 條 KaTeX 公式。";
    }
    if (parts[0] === "investment" && (parts[1] === "technical" || parts[1] === "technical-indicators")) {
      return "技術分析 50 指標：5 類指標、公式、參數、限制與章節連結。";
    }
    if (parts[0] === "lab" && parts[1] === "mermaid") {
      return "Mermaid × Pele 圖表總覽：17 張流程／樹狀／推導圖的 SVG／MMD 對照、.mmd 下載、全站風格與相關圖表連結。";
    }
    if (parts[0] === "models" && parts[1] === "macro") {
      return "總體經濟模型總覽：29 張章節模型圖、模型定義、變數、限制與 KaTeX 公式。";
    }
    if (parts[0] === "nobel") {
      return "17 組諾貝爾經濟學獎模型、58 屆年份與得主、KaTeX 公式與屆別切換。";
    }
    if (parts[0] === "chapter" && getChapter(parts[1])) {
      const chapter = getChapter(parts[1]);
      return chapterLabel(chapter) + " " + chapter.title + "：" + chapter.subjectName + "的名詞、考試重點、公式與考古題。";
    }
    if (parts[0] === "past-exams" && parts[1] === "written") {
      return "107–115 年 348 題計算／申論題，附完整參考解答、章節出處與題意檢核。";
    }
    if (parts[0] === "past-exams") {
      return "107–115 年 29 次、3,710 題選擇題，逐選項解析與年度／科目／次別篩選。";
    }
    if (parts[0] === "macro-current") {
      return "15 個近二年總經時事、20 則美國重大經濟新聞摘要、KaTeX 公式與考試框架。";
    }
    if (parts[0] === "exam-forecast") {
      return "2026 年 12 月四科 97 題組／118 個部分考前猜題，含完整解答、38 條整合公式與敏感度分析。";
    }
    if (parts[0] === "sources") {
      return "29 個資料來源、官方連結、版本與查核紀錄。";
    }
    if (parts[0] === "about") {
      return "使用說明：章節閱讀、考古題練習、進度儲存與隱私。";
    }
    return DEFAULT_DESCRIPTION;
  }

  function setMetaContent(selector, value) {
    const node = document.head.querySelector(selector);
    if (node) {
      node.setAttribute("content", value);
    }
  }

  function updatePageMeta(route, title) {
    const description = routeDescription(route);
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[name="twitter:title"]', title);
  }

  function render() {
    const route = parseRoute();
    let html = "";
    let title = content.meta.title;
    const examBrand = "證券投資分析人員考試｜" + content.meta.title;

    if (route.parts.length === 0) {
      html = renderHome();
      title = "證券投資分析人員考試｜分析師備考站：總體經濟、投資學、會計學、證券法規";
    } else if ((route.parts[0] === "macro" && route.parts[1] === "evolution") || (route.parts[0] === "subject" && route.parts[1] === "macro" && route.query.get("evolution"))) {
      html = renderMacroEvolutionPage();
      title = "總體經濟學學派演進圖｜" + examBrand;
    } else if (route.parts[0] === "subject" && getSubject(route.parts[1])) {
      const subject = getSubject(route.parts[1]);
      html = renderSubject(subject);
      title = subject.name + "｜" + examBrand;
    } else if (route.parts[0] === "investment" && route.parts[1] === "formulas") {
      html = renderInvestmentFormulasPage();
      title = "投資學公式總表｜" + examBrand;
    } else if (route.parts[0] === "investment" && (route.parts[1] === "technical" || route.parts[1] === "technical-indicators")) {
      html = renderInvestmentTechnicalPage();
      title = "技術分析 50 指標｜" + examBrand;
    } else if (route.parts[0] === "lab" && route.parts[1] === "mermaid") {
      html = renderMermaidLab();
      title = "Mermaid × Pele 圖表總覽｜" + examBrand;
    } else if (route.parts[0] === "models" && route.parts[1] === "macro") {
      html = renderMacroModels();
      title = "總體經濟模型總覽｜" + examBrand;
    } else if (route.parts[0] === "nobel") {
      html = renderNobelPage();
      title = "歷年諾貝爾經濟學獎｜" + examBrand;
    } else if (route.parts[0] === "chapter" && getChapter(route.parts[1])) {
      const chapter = getChapter(route.parts[1]);
      html = renderChapter(chapter);
      title = chapterLabel(chapter) + " " + chapter.title + "｜" + examBrand;
    } else if (route.parts[0] === "past-exams" && route.parts[1] === "written") {
      html = renderWrittenExams(route.query.get("question"));
      title = "計算題與申論題｜" + examBrand;
    } else if (route.parts[0] === "past-exams") {
      html = renderPastExams(route.query.get("question"));
      title = "考古題練習庫｜" + examBrand;
    } else if (route.parts[0] === "macro-current") {
      html = renderMacroCurrentEvents();
      title = "近二年重要國際金融時事與總經政策｜" + examBrand;
    } else if (route.parts[0] === "exam-forecast") {
      const forecastSubject = route.query.get("subject");
      const forecastLabel = { macro: "總體經濟學", investment: "投資學", accounting: "會計學", law: "證券法規" }[forecastSubject];
      html = renderExamForecastPage(forecastSubject);
      title = (forecastLabel || "2026 年 12 月") + "考前猜題｜" + examBrand;
    } else if (route.parts[0] === "sources") {
      html = renderSources();
      title = "資料來源｜" + examBrand;
    } else if (route.parts[0] === "about") {
      html = renderAbout();
      title = "使用說明｜" + examBrand;
    } else {
      html = renderNotFound();
      title = "找不到頁面｜" + examBrand;
    }

    if (window.MermaidLab) {
      window.MermaidLab.reset();
    }
    main.innerHTML = html;
    document.title = title;
    updatePageMeta(route, title);
    updateNav(route);
    updateProgressDisplays();
    setupSectionObserver();
    closeMobileMenu();

    if (route.parts[0] === "lab" && route.parts[1] === "mermaid" && route.query.get("diagram")) {
      const slug = route.query.get("diagram") || "";
      window.requestAnimationFrame(function () {
        const target = /^[a-z0-9-]+$/.test(slug) ? document.getElementById("mermaid-" + slug) : null;
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "exam-forecast" && route.query.get("question")) {
      const questionId = route.query.get("question");
      window.requestAnimationFrame(function () {
        const targetId = forecastLegacyQuestionMap.get(questionId) || questionId;
        const target = document.getElementById("forecast-" + targetId);
        if (target) {
          target.open = true;
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    if (route.parts[0] === "models" && route.parts[1] === "macro" && route.query.get("model")) {
      const modelAnchor = route.query.get("model") || "";
      window.requestAnimationFrame(function () {
        const target = /^model-macro-\d+-\d+(?:-\d+)?$/.test(modelAnchor) ? document.getElementById(modelAnchor) : null;
        if (target) {
          target.classList.remove("is-targeted");
          void target.offsetWidth;
          target.classList.add("is-targeted");
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.setTimeout(function () {
            target.classList.remove("is-targeted");
          }, 2600);
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "models" && route.parts[1] === "macro" && route.query.get("chapter")) {
      const modelChapterId = route.query.get("chapter");
      window.requestAnimationFrame(function () {
        const target = document.getElementById("models-" + modelChapterId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "nobel" && route.query.get("group")) {
      const groupId = route.query.get("group");
      window.requestAnimationFrame(function () {
        const target = document.getElementById("nobel-module-" + groupId) || document.getElementById("nobel-group-" + groupId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "nobel" && route.query.get("year")) {
      const year = Number(route.query.get("year"));
      window.requestAnimationFrame(function () {
        const row = nobelRowForYear(year);
        const target = row ? document.getElementById("nobel-module-" + row.group) : null;
        if (target) {
          setNobelModuleYear(target, year, { syncSelect: true });
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "nobel" && (route.query.get("table") || route.query.get("models"))) {
      const targetId = route.query.get("table") ? "nobel-table" : "nobel-models";
      window.requestAnimationFrame(function () {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else if (route.parts[0] === "past-exams" && route.parts[1] === "written" && route.query.get("question")) {
      const writtenId = route.query.get("question");
      window.requestAnimationFrame(function () {
        const target = document.getElementById("written-" + writtenId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else if (route.parts[0] === "past-exams" && route.query.get("question")) {
      window.requestAnimationFrame(function () {
        const target = document.getElementById("past-exam-panel");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else if (route.parts[0] === "macro-current" && route.query.get("event")) {
      const eventId = route.query.get("event") || "";
      window.requestAnimationFrame(function () {
        const target = document.getElementById("macro-event-" + eventId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "chapter" && route.query.get("section")) {
      const sectionId = "section-" + route.query.get("section");
      window.requestAnimationFrame(function () {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    window.requestAnimationFrame(updateReadingProgress);
  }

  /* ----------------------------- search ----------------------------- */
  /* 精確子字串搜尋優先；MiniSearch 只在第一次開啟搜尋時 lazy load，作為核心索引的模糊補位。 */

  function loadMiniSearch() {
    if (window.MiniSearch) {
      return Promise.resolve(window.MiniSearch);
    }
    if (miniSearchPromise) {
      return miniSearchPromise;
    }
    miniSearchPromise = new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = (window.__ASSET_BASE__ || "assets/") + "vendor/minisearch.min.js";
      script.async = true;
      script.onload = function () {
        if (window.MiniSearch) {
          resolve(window.MiniSearch);
        } else {
          miniSearchPromise = null;
          reject(new Error("MiniSearch 載入後找不到 MiniSearch"));
        }
      };
      script.onerror = function () {
        miniSearchPromise = null;
        reject(new Error("無法載入 MiniSearch"));
      };
      document.head.appendChild(script);
    });
    return miniSearchPromise;
  }

  function ensureFuzzySearch() {
    if (fuzzyState.index) {
      return Promise.resolve(fuzzyState.index);
    }
    if (fuzzyState.promise) {
      return fuzzyState.promise;
    }
    const generation = fuzzyState.generation;
    fuzzyState.status = "loading";
    fuzzyState.promise = loadMiniSearch().then(function (MiniSearchCtor) {
      if (generation !== fuzzyState.generation) {
        return null;
      }
      const documents = searchState.fuzzyDocuments || [];
      if (!documents.length) {
        fuzzyState.status = "ready";
        fuzzyState.promise = null;
        return null;
      }
      const index = new MiniSearchCtor({
        fields: ["title", "sub", "text"],
        storeFields: ["type", "typeClass", "title", "sub", "href"],
        searchOptions: {
          prefix: true,
          fuzzy: 0.2,
          combineWith: "AND",
          boost: { title: 2, sub: 1.2 }
        }
      });
      index.addAll(documents);
      if (generation !== fuzzyState.generation) {
        return null;
      }
      fuzzyState.index = index;
      fuzzyState.status = "ready";
      fuzzyState.promise = null;
      return index;
    }).catch(function (error) {
      if (generation === fuzzyState.generation) {
        fuzzyState.status = "error";
        fuzzyState.promise = null;
      }
      throw error;
    });
    return fuzzyState.promise;
  }

  function performFuzzySearch(query, limit) {
    if (!fuzzyState.index) {
      return [];
    }
    return fuzzyState.index.search(query, {
      limit: Math.max(0, limit || 24)
    }).map(function (result) {
      return {
        id: result.id,
        type: result.type || "相似",
        typeClass: result.typeClass || "",
        title: result.title || "",
        sub: result.sub || "",
        href: result.href || "",
        fuzzy: true
      };
    }).filter(function (result) {
      return Boolean(result.href);
    });
  }

  function warmFuzzySearch() {
    if (fuzzyState.index || fuzzyState.status === "loading") {
      return;
    }
    ensureFuzzySearch().then(function (index) {
      if (index && searchOverlay && !searchOverlay.hidden && searchInput && searchInput.value.trim()) {
        renderSearchResults(searchInput.value);
      }
    }).catch(function (error) {
      if (window.console && typeof console.warn === "function") {
        console.warn("Fuzzy search unavailable:", error);
      }
    });
  }

  function appendPastExamSearchIndex() {
    if (pastSearchLoaded) return;
    const data = Array.isArray(window.PAST_EXAM_SEARCH_INDEX) ? window.PAST_EXAM_SEARCH_INDEX : [];
    const subjectNames = { macro: "總體經濟學", investment: "投資學", accounting: "會計學", law: "證券法規" };
    data.forEach(function (question) {
      searchState.index.push({
        id: "past-" + question.id,
        type: "考古",
        typeClass: "",
        title: String(question.stem || "").slice(0, 90),
        sub: (question.year || "") + " 年 · " + (subjectNames[question.subject] || question.subject) + " · 考古題",
        text: [question.stem].concat(question.options || []).join(" "),
        href: "#/past-exams?question=" + encodeURIComponent(question.id),
        nTitle: normalize(String(question.stem || "")),
        nSub: normalize((question.year || "") + " " + (subjectNames[question.subject] || question.subject)),
        nText: normalize([question.stem].concat(question.options || []).join(" "))
      });
    });
    pastSearchLoaded = true;
    if (searchPastLoadButton) searchPastLoadButton.hidden = true;
  }

  function buildSearchIndex() {
    const index = [];
    fuzzyState.index = null;
    fuzzyState.status = "idle";
    fuzzyState.promise = null;
    fuzzyState.generation += 1;

    allChapters.forEach(function (chapter) {
      index.push({
        type: "章",
        typeClass: "",
        title: chapterLabel(chapter) + " " + chapter.title,
        sub: chapter.subjectName + (chapter.partTitle ? " · " + chapter.partTitle : "") + " · " + chapter.sections.length + " " + subjectUnitLabel({ id: chapter.subjectId }),
        text: chapter.title + " " + chapter.summary,
        href: "#/chapter/" + chapter.id,
        chapterId: chapter.id,
        sectionIndex: null
      });

      chapter.sections.forEach(function (section, sectionIndex) {
        index.push({
          type: isFocusSection({ id: chapter.subjectId }, section) ? "重點" : "節",
          typeClass: "",
          title: sectionDisplayTitle(section),
          sub: chapter.subjectName + " · " + chapterLabel(chapter) + " " + chapter.title,
          text: sectionDisplayTitle(section) + " " + section.body.join(" ") + (section.table ? " " + section.table.title + " " + section.table.columns.join(" ") + " " + section.table.rows.map(function (row) { return row.join(" "); }).join(" ") : ""),
          href: "#/chapter/" + chapter.id + "?section=" + (sectionIndex + 1),
          chapterId: chapter.id,
          sectionIndex: sectionIndex + 1
        });

        section.terms.forEach(function (term) {
          index.push({
            type: "名詞",
            typeClass: "term",
            title: term[0],
            sub: chapter.title + " · " + sectionDisplayTitle(section),
            text: term[1],
            href: "#/chapter/" + chapter.id + "?section=" + (sectionIndex + 1),
            chapterId: chapter.id,
            sectionIndex: sectionIndex + 1
          });
        });
      });
    });

    (forecastData.questions || []).forEach(function (question) {
      const subject = getSubject(question.subject);
      index.push({
        type: "考前",
        typeClass: "",
        title: question.title,
        sub: (subject ? subject.name : question.subject) + " · " + question.topic + " · " + question.level,
        text: Array.isArray(question.parts)
          ? question.parts.map(function (part) { return [part.title, part.scenario].concat(part.ask || []).join(" "); }).join(" ")
          : [question.scenario].concat(question.ask || []).join(" "),
        href: "#/exam-forecast?subject=" + question.subject + "&question=" + encodeURIComponent(question.id)
      });
    });

    searchState.fuzzyDocuments = index.map(function (entry, entryIndex) {
      return Object.assign({}, entry, {
        id: "core-" + entryIndex
      });
    });
    searchState.index = searchState.fuzzyDocuments.map(function (entry) {
      return Object.assign({}, entry, {
        nTitle: normalize(entry.title),
        nSub: normalize(entry.sub),
        nText: normalize(entry.text)
      });
    });
    if (Array.isArray(window.PAST_EXAM_SEARCH_INDEX) && window.PAST_EXAM_SEARCH_INDEX.length) {
      pastSearchLoaded = false;
      appendPastExamSearchIndex();
    }
  }

  function performSearch(query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      return [];
    }

    return searchState.index.map(function (entry) {
      let score = 99;
      if (entry.nTitle.indexOf(normalizedQuery) !== -1) {
        score = 0;
      } else if (entry.nSub.indexOf(normalizedQuery) !== -1) {
        score = 1;
      } else if (entry.nText.indexOf(normalizedQuery) !== -1) {
        score = 2;
      }
      return { entry: entry, score: score };
    }).filter(function (item) {
      return item.score < 99;
    }).sort(function (a, b) {
      return a.score - b.score || a.entry.title.localeCompare(b.entry.title, "zh-Hant");
    }).slice(0, 24).map(function (item) {
      return item.entry;
    });
  }

  function searchHref(result) {
    if (result.href) {
      return result.href;
    }
    return "#/chapter/" + result.chapterId + (result.sectionIndex ? "?section=" + result.sectionIndex : "");
  }

  function renderSearchResults(query) {
    if (!searchResults) {
      return;
    }

    const trimmed = query.trim();
    if (!trimmed) {
      searchState.results = [];
      searchState.active = -1;
      const macroSubject = getSubject("macro");
      const macroModelTotal = countMacroModels(macroModelGroups());
      const nobelTotal = countNobelModels(nobelGroupsWithDiagrams());
      const nobelYears = Array.isArray(nobelData.rows) ? nobelData.rows.length : 0;
      searchResults.innerHTML = [
        '<div class="search-group-label">快速前往</div>',
        '<a class="search-result" href="#/subject/macro"><span class="result-type">科目</span><span><strong>總體經濟學</strong><small>國民所得、貨幣、政策、成長與開放經濟</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/macro/evolution"><span class="result-type">圖解</span><span><strong>總體經濟學學派演進圖</strong><small>古典、凱因斯、貨幣、新古典、新凱因斯與現代研究前沿</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/subject/investment"><span class="result-type">科目</span><span><strong>投資學</strong><small>金融體系、利率與各類金融工具</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/subject/accounting"><span class="result-type">科目</span><span><strong>會計學</strong><small>現金與存貨、金融資產、報表分析與資本預算</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/past-exams"><span class="result-type">題庫</span><span><strong>考古題練習庫</strong><small>107–115 年選擇題；進入後可用題幹關鍵字搜尋</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/models/macro"><span class="result-type">模型</span><span><strong>總體經濟模型總覽</strong><small>' + macroModelTotal + ' 張章節模型圖，依 ' + (macroSubject ? macroSubject.chapters.length : 13) + ' 章整理；諾貝爾 17 組模型另見模型頁</small></span><span class="result-arrow">→</span></a>',
        '<a class="search-result" href="#/nobel"><span class="result-type">年表</span><span><strong>歷年諾貝爾經濟學獎</strong><small>' + nobelYears + ' 屆得主、代表模型與 ' + nobelTotal + ' 組 SVG 圖解</small></span><span class="result-arrow">→</span></a>',
        '<div class="search-group-label">試試這些名詞</div>',
        '<button class="search-result" type="button" data-query="GDP"><span class="result-type term">名詞</span><span><strong>GDP</strong><small>國內生產毛額</small></span><span class="result-arrow">→</span></button>',
        '<button class="search-result" type="button" data-query="菲利浦曲線"><span class="result-type term">名詞</span><span><strong>菲利浦曲線</strong><small>通膨與失業的短期取捨</small></span><span class="result-arrow">→</span></button>',
        '<button class="search-result" type="button" data-query="存續期間"><span class="result-type term">名詞</span><span><strong>存續期間</strong><small>債券價格對利率的敏感度</small></span><span class="result-arrow">→</span></button>',
        '<button class="search-result" type="button" data-query="存貨"><span class="result-type term">名詞</span><span><strong>存貨</strong><small>成本流動、評價與錯誤影響</small></span><span class="result-arrow">→</span></button>',
        '<button class="search-result" type="button" data-query="每股盈餘"><span class="result-type term">名詞</span><span><strong>每股盈餘</strong><small>基本與稀釋每股盈餘</small></span><span class="result-arrow">→</span></button>'
      ].join("");
      return;
    }

    const exactResults = performSearch(trimmed);
    const canFuzzy = trimmed.length >= 2;
    if (canFuzzy && exactResults.length < 3 && fuzzyState.status === "idle") {
      warmFuzzySearch();
    }

    let fuzzyResults = [];
    if (canFuzzy && exactResults.length < 3 && fuzzyState.index) {
      const exactIds = new Set(exactResults.map(function (result) { return result.id; }).filter(Boolean));
      const limit = Math.max(0, 24 - exactResults.length);
      fuzzyResults = performFuzzySearch(trimmed, limit).filter(function (result) {
        return !result.id || !exactIds.has(result.id);
      });
    }

    const results = exactResults.concat(fuzzyResults);
    searchState.results = results;
    searchState.active = results.length ? 0 : -1;

    if (!results.length) {
      const loading = canFuzzy && (fuzzyState.status === "loading" || fuzzyState.status === "idle");
      searchResults.innerHTML = '<div class="search-empty">找不到「' + escapeHtml(trimmed) + '」相關的章節或名詞。<br>試試較短的關鍵字，例如 GDP、利率、匯率。' +
        (loading ? '<br><span class="search-fuzzy-loading">正在建立模糊搜尋…</span>' : "") + "</div>";
      return;
    }

    let resultIndex = 0;
    function renderResult(result) {
      const active = resultIndex === 0 ? " is-active" : "";
      resultIndex += 1;
      return [
        '<a class="search-result' + active + '" href="' + searchHref(result) + '">',
        '  <span class="result-type ' + escapeHtml(result.typeClass) + '">' + escapeHtml(result.type) + "</span>",
        "  <span><strong>" + escapeHtml(result.title) + "</strong><small>" + escapeHtml(result.sub) + "</small></span>",
        '  <span class="result-arrow" aria-hidden="true">→</span>',
        "</a>"
      ].join("");
    }

    const exactMarkup = exactResults.map(renderResult).join("");
    const fuzzyMarkup = fuzzyResults.map(renderResult).join("");
    const fuzzyLabel = fuzzyResults.length
      ? '<div class="search-group-label">' + (exactResults.length ? "相似結果（模糊搜尋）" : "找不到完全符合，以下是相似結果") + "</div>"
      : "";
    const loadingNote = !fuzzyResults.length && canFuzzy && exactResults.length < 3 &&
      (fuzzyState.status === "loading" || fuzzyState.status === "idle")
      ? '<div class="search-fuzzy-loading">正在建立模糊搜尋…</div>'
      : "";
    searchResults.innerHTML = exactMarkup + fuzzyLabel + fuzzyMarkup + loadingNote;
  }

  function moveSearchActive(delta) {
    const links = Array.from(searchResults.querySelectorAll(".search-result[href]"));
    if (!links.length) {
      return;
    }
    searchState.active = (searchState.active + delta + links.length) % links.length;
    links.forEach(function (link, index) {
      link.classList.toggle("is-active", index === searchState.active);
    });
    links[searchState.active].scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    if (!searchOverlay || !searchInput) {
      return;
    }
    searchOverlay.hidden = false;
    document.body.classList.add("search-open");
    if (searchPastLoadButton && pastSearchLoaded) searchPastLoadButton.hidden = true;
    searchInput.value = "";
    renderSearchResults("");
    warmFuzzySearch();
    window.setTimeout(function () {
      searchInput.focus();
    }, 40);
  }

  function closeSearch() {
    if (!searchOverlay || !searchInput) {
      return;
    }
    searchOverlay.hidden = true;
    document.body.classList.remove("search-open");
    searchInput.value = "";
    searchState.results = [];
    searchState.active = -1;
    if (searchResults) {
      searchResults.innerHTML = "";
    }
  }

  function activateSearchResult() {
    const links = searchResults.querySelectorAll(".search-result[href]");
    if (!links.length) {
      return;
    }
    const active = links[searchState.active] || links[0];
    if (active) {
      closeSearch();
      active.click();
    }
  }

  /* ----------------------------- theme / menu ----------------------------- */

  function updateThemeButton() {
    if (!themeToggle) {
      return;
    }
    const dark = document.documentElement.dataset.theme === "dark";
    themeToggle.innerHTML = '<span aria-hidden="true">' + (dark ? "☀" : "◐") + "</span>";
    themeToggle.setAttribute("aria-label", dark ? "切換淺色模式" : "切換深色模式");
    themeToggle.title = dark ? "切換淺色模式" : "切換深色模式";
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      /* ignore storage errors */
    }
    updateThemeButton();
  }

  function closeMobileMenu() {
    if (!mainNav || !menuToggle) {
      return;
    }
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    if (!mainNav || !menuToggle) {
      return;
    }
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  /* ----------------------------- events ----------------------------- */

  function copyCurrentLink() {
    const url = window.location.href;
    const done = function () {
      toast("已複製本章連結");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {
        fallbackCopy(url, done);
      });
    } else {
      fallbackCopy(url, done);
    }
  }

  function fallbackCopy(text, done) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      done();
    } catch (error) {
      toast("複製失敗，請手動複製網址");
    }
    document.body.removeChild(input);
  }

  function resetProgress() {
    if (!window.confirm("確定要清除所有章節的完成進度嗎？此動作無法復原。")) {
      return;
    }
    progress = new Set();
    saveProgress();
    updateProgressDisplays();
    toast("已清除章節進度");
  }

  function resetPracticeProgress() {
    if (!window.confirm("確定要清除所有考古題作答紀錄嗎？此動作無法復原。")) {
      return;
    }
    if (practiceState) {
      practiceState.answers.clear();
      practiceState.selected = null;
      practiceState.revealed = false;
      practiceState.browseRevealed.clear();
      practiceState.browseAll = false;
      savePracticeAnswers();
      if (document.getElementById("past-exam-panel")) {
        practiceRefreshPanel();
      }
    } else {
      try {
        window.localStorage.removeItem(PRACTICE_PROGRESS_KEY);
      } catch (error) {
        /* localStorage 可能被停用。 */
      }
    }
    toast("已清除考古題紀錄");
  }

  function applyForecastFilters() {
    const bar = document.querySelector("[data-forecast-filter-bar]");
    if (!bar) return;
    const keyword = (bar.querySelector("[data-forecast-search]")?.value || "").trim().toLowerCase();
    const level = bar.querySelector("[data-forecast-level]")?.value || "all";
    const type = bar.querySelector("[data-forecast-type]")?.value || "all";
    const topic = bar.querySelector("[data-forecast-topic]")?.value || "all";
    let visible = 0;
    const cards = Array.from(document.querySelectorAll(".forecast-question"));
    cards.forEach(function (card) {
      const levels = (card.dataset.levels || card.dataset.level || "").split(" ");
      const haystack = (card.textContent || "").toLowerCase();
      const ok = (!keyword || haystack.indexOf(keyword) !== -1) &&
        (level === "all" || levels.indexOf(level) !== -1) &&
        (type === "all" || card.dataset.type === type) &&
        (topic === "all" || card.dataset.topic === topic);
      card.hidden = !ok;
      if (ok) visible += 1;
    });
    const count = bar.querySelector("[data-forecast-filter-count]");
    if (count) count.textContent = "顯示 " + visible + " / " + cards.length + " 題組";
  }

  function bindEvents() {
    window.addEventListener("hashchange", function () {
      closeSearch();
      hydrateData();
      practiceState = null;
      writtenState = null;
      render();
      updateReadingProgress();
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMobileMenu);
    }

    if (mainNav) {
      mainNav.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          closeMobileMenu();
        }
      });
    }

    if (searchOpenButton) {
      searchOpenButton.addEventListener("click", openSearch);
    }

    if (searchCloseButton) {
      searchCloseButton.addEventListener("click", closeSearch);
    }

    if (searchOverlay) {
      searchOverlay.addEventListener("click", function (event) {
        if (event.target === searchOverlay) {
          closeSearch();
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        renderSearchResults(searchInput.value);
      });

      searchInput.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveSearchActive(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveSearchActive(-1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          activateSearchResult();
        } else if (event.key === "Escape") {
          event.preventDefault();
          closeSearch();
        }
      });
    }

    if (searchPastLoadButton) {
      searchPastLoadButton.addEventListener("click", function () {
        if (pastSearchLoaded) return;
        searchPastLoadButton.disabled = true;
        searchPastLoadButton.textContent = "考古題索引載入中…";
        const load = typeof window.__loadPastSearch === "function" ? window.__loadPastSearch() : Promise.resolve();
        load.then(function () {
          appendPastExamSearchIndex();
          searchPastLoadButton.textContent = "已載入考古題搜尋";
          renderSearchResults(searchInput.value);
        }).catch(function () {
          searchPastLoadButton.disabled = false;
          searchPastLoadButton.textContent = "考古題索引載入失敗，重試";
        });
      });
    }

    if (searchResults) {
      searchResults.addEventListener("click", function (event) {
        const suggestion = event.target.closest("[data-query]");
        if (suggestion) {
          event.preventDefault();
          searchInput.value = suggestion.dataset.query;
          renderSearchResults(suggestion.dataset.query);
          searchInput.focus();
          return;
        }
        if (event.target.closest("a")) {
          closeSearch();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      const target = event.target;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const isSearchOpen = searchOverlay && !searchOverlay.hidden;

      if (event.key === "Escape") {
        if (isSearchOpen) {
          closeSearch();
        } else {
          closeMobileMenu();
        }
        return;
      }

      if (!typing && (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"))) {
        event.preventDefault();
        openSearch();
      }
    });

    main.addEventListener("click", function (event) {
      if (handleNobelClick(event)) {
        return;
      }
      if (handleWrittenClick(event)) {
        return;
      }
      if (handlePracticeClick(event)) {
        return;
      }

      const completeButton = event.target.closest("[data-complete-btn]");
      if (completeButton) {
        event.preventDefault();
        toggleChapter(completeButton.dataset.completeBtn);
        return;
      }

      const scrollLink = event.target.closest("[data-scroll-to]");
      if (scrollLink) {
        event.preventDefault();
        const target = document.getElementById(scrollLink.dataset.scrollTo);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (scrollLink.dataset.chapterId && scrollLink.dataset.section) {
            try {
              window.history.replaceState(null, "", "#/chapter/" + scrollLink.dataset.chapterId + "?section=" + scrollLink.dataset.section);
            } catch (error) {
              /* ignore history errors */
            }
          }
        }
        return;
      }

      const clearForecast = event.target.closest("[data-forecast-clear]");
      if (clearForecast) {
        const bar = clearForecast.closest("[data-forecast-filter-bar]");
        if (bar) {
          bar.querySelectorAll("input, select").forEach(function (field) {
            field.value = field.tagName === "SELECT" ? "all" : "";
          });
          applyForecastFilters();
        }
        return;
      }

      const action = event.target.closest("[data-action]");
      if (!action) {
        return;
      }

      if (action.dataset.action === "copy-link") {
        event.preventDefault();
        copyCurrentLink();
      } else if (action.dataset.action === "print") {
        event.preventDefault();
        window.print();
      } else if (action.dataset.action === "reset-progress") {
        event.preventDefault();
        resetProgress();
      } else if (action.dataset.action === "reset-practice-progress") {
        event.preventDefault();
        resetPracticeProgress();
      }
    });

    main.addEventListener("change", function (event) {
      if (handleNobelChange(event)) {
        return;
      }
      if (handleWrittenChange(event)) {
        return;
      }
      handlePracticeChange(event);
    });

    main.addEventListener("input", function (event) {
      handlePracticeInput(event);
      if (event.target.closest("[data-forecast-filter-bar]")) applyForecastFilters();
    });

    main.addEventListener("change", function (event) {
      if (event.target.closest("[data-forecast-filter-bar]")) applyForecastFilters();
    });
  }

  /* ----------------------------- init ----------------------------- */

  window.__softRefreshApp = function () {
    hydrateData();
    practiceState = null;
    writtenState = null;
    buildSearchIndex();
    render();
    updateReadingProgress();
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  function init() {
    buildSearchIndex();
    bindEvents();
    updateThemeButton();
    render();
    updateReadingProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
