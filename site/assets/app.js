/* =========================================================
   分析師備考站 — hash router, search, progress, theme
   No build step, no dependencies.
   ========================================================= */

(function () {
  "use strict";

  const content = window.EXAM_CONTENT;
  const diagrams = Object.assign(
    {},
    window.MACRO_DIAGRAMS || {},
    window.INVESTMENT_DIAGRAMS || {},
    window.ACCOUNTING_DIAGRAMS || {}
  );
  const nobelData = window.NOBEL_DATA || { meta: {}, groups: [], rows: [] };
  const nobelDiagrams = window.NOBEL_DIAGRAMS || {};
  const macroEvolution = window.MACRO_EVOLUTION || { meta: {}, stages: [] };
  const practiceData = window.PAST_EXAMS || { meta: {}, subjects: [], sessions: [], questions: [] };
  const writtenData = window.PAST_EXAMS_WRITTEN || { meta: {}, questions: [] };
  const writtenLayouts = window.WRITTEN_LAYOUTS || {};
  const macroCurrentData = window.MACRO_CURRENT_EVENTS || { meta: {}, events: [] };
  const forecastData = window.EXAM_FORECAST || { meta: {}, directions: [], sections: [], integrated: [], formulas: { macro: [], investment: [] }, indicators: [], strategy: [] };
  const practiceSubjects = Array.isArray(practiceData.subjects) ? practiceData.subjects : [];
  const practiceSessions = Array.isArray(practiceData.sessions) ? practiceData.sessions : [];
  const practiceQuestions = Array.isArray(practiceData.questions) ? practiceData.questions : [];
  const writtenQuestions = Array.isArray(writtenData.questions) ? writtenData.questions : [];
  const examSolutionBatches = Array.isArray(window.EXAM_SOLUTIONS) ? window.EXAM_SOLUTIONS : [];
  const examSolutionSectionMap = new Map();
  const examQuestionMap = new Map();
  const macroCurrentEvents = Array.isArray(macroCurrentData.events) ? macroCurrentData.events : [];
  const macroCurrentEventMap = new Map();
  macroCurrentEvents.forEach(function (event) {
    macroCurrentEventMap.set(event.id, event);
  });
  const practiceSessionMap = new Map();
  const practiceSubjectMap = new Map();
  practiceSessions.forEach(function (session) {
    practiceSessionMap.set(session.id, session);
  });
  practiceSubjects.forEach(function (subject) {
    practiceSubjectMap.set(subject.id, subject);
  });
  const practiceChapterStats = new Map();
  const practiceSectionQuestions = new Map();
  const practiceSubjectQuestionTotals = new Map();
  const writtenQuestionMap = new Map();
  const writtenChapterStats = new Map();
  const writtenSectionQuestions = new Map();
  const writtenSubjectQuestionTotals = new Map();
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
  const main = document.getElementById("main");
  const header = document.querySelector(".site-header");
  const readingProgress = document.getElementById("reading-progress");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (!content || !Array.isArray(content.subjects) || !main) {
    return;
  }

  const subjectMap = new Map();
  const chapterMap = new Map();
  const allChapters = [];

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

  const sourceMap = new Map(content.sources.map(function (source) {
    return [source.id, source];
  }));

  const totalSections = allChapters.reduce(function (count, chapter) {
    return count + chapter.sections.length;
  }, 0);

  const totalTerms = allChapters.reduce(function (count, chapter) {
    return count + chapter.sections.reduce(function (sectionCount, section) {
      return sectionCount + section.terms.length;
    }, 0);
  }, 0);

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
  const toastElement = document.getElementById("toast");

  const searchState = {
    index: [],
    results: [],
    active: -1
  };

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

  function getDiagrams(chapterId, sectionIndex) {
    const baseKey = chapterId + "#" + sectionIndex;
    return Object.keys(diagrams).filter(function (key) {
      return key === baseKey || key.indexOf(baseKey + "-") === 0;
    }).map(function (key) {
      return diagrams[key];
    });
  }

  function getDiagram(chapterId, sectionIndex) {
    return diagrams[chapterId + "#" + sectionIndex] || null;
  }

  function macroModelGroups() {
    const subject = getSubject("macro");
    if (!subject) {
      return [];
    }

    return subject.chapters.map(function (chapter) {
      const entries = chapter.sections.map(function (section, index) {
        const diagram = getDiagram(chapter.id, index);
        return diagram ? {
          anchor: "model-" + chapter.id + "-" + index,
          section: section,
          sectionIndex: index,
          diagram: diagram
        } : null;
      }).filter(Boolean);

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

  /* 年表每一列都會內嵌同一圖組的 SVG；複製前先為內部 ID 加上年度後綴，
     避免同一頁出現重複 ID，並同步更新 aria-labelledby 與 marker 參照。 */
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
    return [
      '<div class="nobel-year-chips" aria-label="同組屆別">',
      group.rows.map(function (row) {
        const isCurrent = row.year === currentYear;
        return [
          '<a class="nobel-year-chip' + (isCurrent ? " is-current" : "") + '"',
          ' href="#/nobel?year=' + row.year + '"',
          isCurrent ? ' aria-current="true"' : "",
          ">" + row.year + "</a>"
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
      '<details class="nobel-model-details">',
      "  <summary>變數與參數</summary>",
      '  <div class="diagram-tables">' + tables + "</div>",
      diagram.note ? '  <p class="diagram-note">' + renderInlineMath(diagram.note) + "</p>" : "",
      "</details>"
    ].join("");
  }

  function renderNobelYearModel(group, groupIndex, groupCount, currentYear, isFirst) {
    const titleId = "nobel-year-model-" + group.id + "-" + currentYear;
    const firstYear = group.rows.length ? group.rows[0].year : currentYear;
    return [
      '<figure class="nobel-year-figure model-diagram' + (isFirst ? " is-group-first" : " is-group-repeat") + '" aria-labelledby="' + titleId + '">',
      '  <div class="nobel-year-model-head">',
      '    <p class="eyebrow">諾貝爾模型 ' + padNumber(groupIndex + 1) + "／" + padNumber(groupCount) + " · " + group.rows.length + " 屆</p>",
      '    <h3 id="' + titleId + '">' + escapeHtml(group.title) + "</h3>",
      "  </div>",
      isFirst ? '  <p class="nobel-group-description">' + escapeHtml(group.description || "") + "</p>" : "",
      renderNobelYearChips(group, currentYear),
      '  <div class="diagram-canvas nobel-year-canvas">' + scopeNobelSvg(group.diagram.svg, group.id + "-" + currentYear) + "</div>",
      '  <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>',
      "  <figcaption>" + escapeHtml(group.diagram.caption) + "</figcaption>",
      isFirst
        ? renderNobelModelDetails(group.diagram)
        : '  <p class="nobel-model-repeat">完整變數與參數說明見 <a href="#/nobel?year=' + firstYear + '">' + firstYear + " 年</a>同組圖。</p>",
      "</figure>"
    ].join("");
  }

  function renderNobelTable() {
    const rows = Array.isArray(nobelData.rows) ? nobelData.rows : [];
    const groups = nobelModelGroups();
    const groupEntries = new Map(groups.map(function (group, index) {
      return [group.id, { group: group, index: index }];
    }));
    const period = nobelData.meta && nobelData.meta.period ? nobelData.meta.period : "1969–2026";

    return [
      '<div class="nobel-table-wrap nobel-ledger-wrap" id="nobel-table" role="region" aria-label="歷年諾貝爾經濟學獎年表，左側為屆別資料、右側為對應模型圖" tabindex="0">',
      '  <table class="nobel-table nobel-year-table">',
      "    <caption>" + escapeHtml(period) + " 年歷屆諾貝爾經濟學獎：左側屆別資料、右側代表模型圖</caption>",
      "    <thead><tr><th scope=\"col\">屆別與得主資料</th><th scope=\"col\">該屆代表模型圖</th></tr></thead>",
      "    <tbody>" + rows.map(function (row, index) {
        const groupEntry = groupEntries.get(row.group) || null;
        const group = groupEntry ? groupEntry.group : null;
        const groupIndex = groupEntry ? groupEntry.index : -1;
        const isFirst = Boolean(group && group.rows.length && group.rows[0].year === row.year);
        return [
          '<tr id="nobel-' + row.year + '" class="nobel-year-row" data-nobel-group="' + escapeHtml(row.group) + '">',
          '  <td class="nobel-year-data">',
          isFirst && group ? '    <span class="nobel-group-anchor" id="nobel-group-' + escapeHtml(group.id) + '" aria-hidden="true"></span>' : "",
          '    <div class="nobel-year-heading">',
          '      <a class="nobel-year-link" href="#/nobel?group=' + encodeURIComponent(row.group) + '" aria-label="' + escapeHtml(row.year + " 年，前往 " + (group ? group.title : "對應模型圖")) + '">' + row.year + "</a>",
          '      <span class="nobel-year-sequence">第 ' + (index + 1) + " 屆</span>",
          "    </div>",
          group ? '    <p class="nobel-year-group-label">模型 ' + padNumber(groupIndex + 1) + " · " + escapeHtml(group.title) + "</p>" : "",
          '    <dl class="nobel-entry-fields">',
          '      <div><dt>得主</dt><dd class="nobel-laureates">' + escapeHtml(row.laureates) + "</dd></div>",
          '      <div><dt>主要理論／研究領域</dt><dd>' + escapeHtml(row.field) + "</dd></div>",
          '      <div><dt>代表模型／關鍵公式</dt><dd class="nobel-formula">' + renderNobelFormula(row.formula) + "</dd></div>",
          '      <div><dt>核心假說與結論</dt><dd>' + renderNobelRichText(row.conclusion) + "</dd></div>",
          "    </dl>",
          "  </td>",
          '  <td class="nobel-year-model-cell">',
          group && group.diagram
            ? renderNobelYearModel(group, groupIndex, groups.length, row.year, isFirst)
            : '    <p class="models-empty">此屆尚無獨立模型圖；左側年表資料仍保留。</p>',
          "  </td>",
          "</tr>"
        ].join("");
      }).join("") + "</tbody>",
      "  </table>",
      "</div>"
    ].join("");
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

  function renderDiagram(diagram) {
    return [
      '<figure class="model-diagram">',
      '  <div class="diagram-head">',
      '    <p class="diagram-kicker">' + escapeHtml(diagram.kicker || "模型圖") + "</p>",
      "    <h3>" + escapeHtml(diagram.title) + "</h3>",
      "  </div>",
      '  <div class="diagram-canvas">' + diagram.svg + "</div>",
      '  <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>',
      "  <figcaption>" + renderInlineMath(diagram.caption) + "</figcaption>",
      '  <div class="diagram-tables">',
      renderDiagramTable("變數說明", diagram.variables),
      renderDiagramTable("參數說明", diagram.parameters),
      "  </div>",
      diagram.note ? '  <p class="diagram-note">' + renderInlineMath(diagram.note) + "</p>" : "",
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
    return [
      '<div class="section-table">',
      '  <h3 class="section-table-title">' + escapeHtml(title) + "</h3>",
      '  <div class="ratio-table-wrap comparison-table-wrap">',
      '    <table class="ratio-table comparison-table" aria-label="' + escapeHtml(title) + '">',
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
      "    <span>涵蓋 " + subject.chapters.length + " 章、共 " + total + " 張章節模型圖（" + withModels + " 章含模型）；另收錄 " + nobelYears + " 屆諾貝爾經濟學獎年表與 " + nobelTotal + " 組模型圖。</span>",
      "  </div>",
      '  <span class="subject-written-cta-arrow">查看模型總覽 →</span>',
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
      "    <span>" + escapeHtml(meta.description || "") + "</span>",
      '    <span class="subject-written-cta-note">' + nodeCount + " 個節點 · " + nobelYears.size + " 個諾貝爾里程碑</span>",
      "  </div>",
      '  <span class="subject-written-cta-arrow">查看演進圖 →</span>',
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
      '    <strong>歷年諾貝爾經濟學獎年表</strong>',
      "    <span>收錄 " + nobelYears + " 屆年份與得主，以及 " + nobelGroups.length + " 組模型圖；可依屆別與圖組跳轉。</span>",
      "  </div>",
      '  <span class="subject-written-cta-arrow">查看年表 →</span>',
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
      renderOptionFormulaList(item),
      renderOptionVariables(item),
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
      "      <p>先練到期損益，再算二項式與 Black-Scholes，最後用買賣權平價推價格；三項式、蒙地卡羅與 Heston 先理解用途。</p>",
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
        category.description ? "      <p>" + renderInlineMath(category.description) + "</p>" : "",
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
    const libraryCount = formulaLibraryEntryCount(investmentFormulaLibrary()) + formulaLibraryEntryCount(investmentTechnicalIndicators());
    return [
      '<a class="subject-written-cta" href="#/investment/formulas">',
      '  <div>',
      '    <p class="eyebrow">投資學 · 公式與比率</p>',
      '    <strong>投資學公式總表</strong>',
      '    <span>比例分析 ' + ratioCount + " 條、核心與技術指標公式 " + libraryCount + " 條，以及選擇權評價 " + optionCount + " 項，均已整理成獨立頁面。</span>",
      '  </div>',
      '  <span class="subject-written-cta-arrow">查看 →</span>',
      '</a>'
    ].join("");
  }

  function renderInvestmentFormulasPage() {
    const ratioCount = investmentRatioFormulas().length;
    const optionCount = investmentOptionPriorities().length;
    const coreLibraryCount = formulaLibraryEntryCount(investmentFormulaLibrary());
    const technicalCount = formulaLibraryEntryCount(investmentTechnicalIndicators());
    return [
      '<div class="page subject-investment">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/investment">投資學</a><span>/</span>',
      "    <span>公式總表</span>",
      "  </nav>",
      renderPageHead("投資學 · 公式與比率", "投資學公式總表", "比例分析 " + ratioCount + " 條、核心公式 " + coreLibraryCount + " 條、技術分析指標 " + technicalCount + " 條與選擇權評價 " + optionCount + " 項集中在一頁；公式與對應章節共用同一份資料。"),
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
      '<section class="formula-library-block" id="technical-indicators">',
      '  <div class="section-heading">',
      "    <div>",
      '      <p class="eyebrow">技術分析</p>',
      "      <h2>技術分析 50 指標</h2>",
      "      <p>依趨勢、動能、波動率與通道、成交量與資金流、支撐壓力與複合指標分類；公式以一般股票日線資料為基礎，參數與平滑方式可能因軟體而異。</p>",
      "    </div>",
      "  </div>",
      technicalCount ? renderFormulaLibrary(investmentTechnicalIndicators()) : "",
      "</section>",
      '  <div class="chapter-actions">',
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
    const latest = practiceSessions.slice().sort(comparePracticeSessions).pop();
    practiceState = {
      year: latest ? latest.year : "all",
      session: latest ? latest.id : "all",
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

  const pastExamExplanationMap = new Map(Object.entries(window.PAST_EXAM_EXPLANATIONS || {}));

  function pastExamExplanationFor(question) {
    const explanation = pastExamExplanationMap.get(question.id);
    return explanation && explanation.options ? explanation : null;
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

  function renderMacroCurrentEvents() {
    const meta = macroCurrentData.meta || {};
    return [
      '<div class="page macro-current-page">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span>',
      '    <a href="#/subject/macro">總體經濟學</a><span>/</span>',
      '    <span>重要時事與總經政策</span>',
      '  </nav>',
      '  <section class="macro-current-hero">',
      '    <p class="eyebrow">總體經濟學 · 近二年時事</p>',
      '    <h1>' + escapeHtml(meta.title || "近二年重要國際金融時事與總經政策") + '</h1>',
      '    <p class="lede">' + escapeHtml(meta.note || "") + '</p>',
      '    <div class="macro-current-actions">',
      '      <a class="btn btn-primary" href="#/past-exams">回考古題練習庫</a>',
      '      <a class="btn" href="#/subject/macro">回總體經濟學</a>',
      '      <a class="btn" href="#/exam-forecast">12 月考前猜題</a>',
      '    </div>',
      '  </section>',
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

  function renderForecastQuestion(question) {
    const priorityClass = forecastPriorityClass(question.priority);
    const asks = Array.isArray(question.ask) ? question.ask : [];
    return [
      '<details class="forecast-question" id="forecast-' + escapeHtml(question.id) + '">',
      '  <summary>',
      '    <span class="forecast-question-num">' + String(question.number).padStart(2, "0") + "</span>",
      '    <span class="forecast-question-title">' + escapeHtml(question.title) + "</span>",
      '    <span class="forecast-chip">' + escapeHtml(question.type) + "</span>",
      '    <span class="forecast-priority ' + priorityClass + '">' + escapeHtml(question.priority) + "</span>",
      "  </summary>",
      '  <div class="forecast-question-body">',
      '    <p class="forecast-scenario">' + renderInlineMath(question.scenario) + "</p>",
      '    <div class="forecast-ask"><h4>可能問法</h4><ul>' + asks.map(function (item) {
        return "<li>" + renderInlineMath(item) + "</li>";
      }).join("") + "</ul></div>",
      '    <div class="forecast-focus"><strong>作答方向</strong><p>' + renderInlineMath(question.focus) + "</p></div>",
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

  function renderExamForecastPage() {
    const meta = forecastData.meta || {};
    const sections = Array.isArray(forecastData.sections) ? forecastData.sections : [];
    const integrated = Array.isArray(forecastData.integrated) ? forecastData.integrated : [];
    const macroFormulas = forecastData.formulas && Array.isArray(forecastData.formulas.macro) ? forecastData.formulas.macro : [];
    const investmentFormulas = forecastData.formulas && Array.isArray(forecastData.formulas.investment) ? forecastData.formulas.investment : [];
    const indicators = Array.isArray(forecastData.indicators) ? forecastData.indicators : [];
    const strategy = Array.isArray(forecastData.strategy) ? forecastData.strategy : [];
    const counts = meta.counts || {};
    const formulaCount = macroFormulas.length + investmentFormulas.length;
    return [
      '<div class="page forecast-page">',
      '  <nav class="breadcrumb" aria-label="麵包屑">',
      '    <a href="#/">首頁</a><span>/</span><span>考前猜題</span>',
      "  </nav>",
      '  <section class="forecast-hero">',
      '    <p class="eyebrow">考前猜題 · ' + escapeHtml(meta.examPeriod || "2026 年 12 月") + "</p>",
      "    <h1>" + escapeHtml(meta.title || "考前猜題") + "</h1>",
      '    <p class="lede">' + escapeHtml(meta.subtitle || "") + "</p>",
      '    <div class="forecast-stats">',
      '      <div><strong>' + (counts.macro || 20) + '</strong><span>總體經濟題</span></div>',
      '      <div><strong>' + (counts.investment || 20) + '</strong><span>投資學題</span></div>',
      '      <div><strong>' + (counts.integrated || integrated.length) + '</strong><span>跨章節整合</span></div>',
      '      <div><strong>' + (counts.formulas || formulaCount) + '</strong><span>必背公式</span></div>',
      "    </div>",
      '    <div class="forecast-actions">',
      '      <a class="btn btn-primary" href="#/past-exams/written">練計算／申論題</a>',
      '      <a class="btn" href="#/macro-current">看總經時事</a>',
      "    </div>",
      '    <p class="forecast-disclaimer">' + escapeHtml(meta.note || "") + "</p>",
      "  </section>",
      '  <section class="forecast-directions">' + (forecastData.directions || []).map(function (item) {
        return [
          '<article class="forecast-direction">',
          "  <h2>" + escapeHtml(item.title) + "</h2>",
          "  <p>" + renderInlineMath(item.text) + "</p>",
          "</article>"
        ].join("");
      }).join("") + "</section>",
      sections.map(function (section) {
        const questions = Array.isArray(section.questions) ? section.questions : [];
        return [
          '<section class="forecast-section" id="forecast-' + escapeHtml(section.id) + '">',
          '  <div class="forecast-section-head"><div><p class="eyebrow">' + escapeHtml(section.id === "macro" ? "總體經濟學" : "投資學") + "</p><h2>" + escapeHtml(section.title) + "</h2><p>" + escapeHtml(section.subtitle || "") + "</p></div><span>" + questions.length + " 題</span></div>",
          '  <div class="forecast-question-list">' + questions.map(renderForecastQuestion).join("") + "</div>",
          "</section>"
        ].join("");
      }).join(""),
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
      "  </section>",
      '  <section class="forecast-section" id="forecast-formulas">',
      '    <div class="forecast-section-head"><div><p class="eyebrow">公式</p><h2>考前必背公式</h2><p>先確認變數定義與單位，再代入數字。</p></div><span>' + formulaCount + " 條</span></div>",
      '    <div class="forecast-formula-grid">',
      renderForecastFormulaGroup("總體經濟學", macroFormulas),
      renderForecastFormulaGroup("投資學", investmentFormulas),
      "    </div>",
      "  </section>",
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
      open: new Set()
    };
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
      return true;
    });
  }

  function renderWrittenFilters() {
    ensureWrittenState();
    const years = Array.from(new Set(writtenQuestions.map(function (question) { return question.year; }))).sort(function (a, b) { return b - a; });
    const subjects = practiceSubjects.length ? practiceSubjects : [];
    return [
      '<div class="written-filter-shell" id="written-filters">',
      '  <div class="past-exam-filter-row"><span class="past-exam-filter-label">年度</span>',
      '    <button class="past-exam-chip' + (writtenState.year === "all" ? " is-active" : "") + '" type="button" data-written-year="all">全部年度</button>',
      years.map(function (year) {
        return '<button class="past-exam-chip' + (writtenState.year === year ? " is-active" : "") + '" type="button" data-written-year="' + year + '">' + year + ' 年</button>';
      }).join(""),
      '  </div>',
      '  <div class="past-exam-filter-row"><span class="past-exam-filter-label">科目</span>',
      '    <button class="past-exam-chip' + (writtenState.subject === "all" ? " is-active" : "") + '" type="button" data-written-subject="all">全部科目</button>',
      subjects.map(function (subject) {
        return '<button class="past-exam-chip' + (writtenState.subject === subject.id ? " is-active" : "") + '" type="button" data-written-subject="' + escapeHtml(subject.id) + '">' + escapeHtml(subject.short || subject.name) + '</button>';
      }).join(""),
      '  </div>',
      '  <div class="written-filter-summary"><strong>' + writtenFilteredQuestions().length + '</strong> 題 · 107–115 年 · 完整參考解答</div>',
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
    const session = practiceSessionMap.get(question.sessionId) || { label: question.sessionId };
    const subject = practiceSubjectMap.get(question.subject) || { short: question.subject, colorClass: "" };
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
      '<div class="written-list" id="written-list">' + (questions.length ? questions.map(renderWrittenCard).join("") : '<div class="past-exam-empty"><h2>目前沒有符合的題目</h2><p>換一個年度或科目再試。</p></div>') + '</div>',
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
      const counts = practiceSubjects.map(function (subject) {
        const count = questions.filter(function (question) {
          return question.subject === subject.id;
        }).length;
        return (subject.short || subject.name) + " " + count;
      }).join(" · ");
      return [
        '<button class="past-exam-year-card" type="button" data-practice-year-jump="' + year + '">',
        '  <span class="past-exam-year-label">' + year + " 年</span>",
        "  <strong>" + questions.length + " 題</strong>",
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
      stat(practiceQuestions.length, "選擇題"),
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
      practiceState.year = Number(yearJump.dataset.practiceYearJump);
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
      practiceState.year = yearButton.dataset.practiceYear === "all" ? "all" : Number(yearButton.dataset.practiceYear);
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
      if (question) {
        practiceState.answers.set(question.id, practiceState.selected);
        practiceState.revealed = true;
        savePracticeAnswers();
        practiceRefreshPanel();
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
      if (practiceState.browseRevealed.has(id)) {
        practiceState.browseRevealed.delete(id);
      } else {
        practiceState.browseRevealed.add(id);
      }
      practiceRefreshPanel(true);
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

  function renderHome() {
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
      '    <a class="subject-written-cta forecast-cta" href="#/exam-forecast">',
      '      <div>',
      '        <p class="eyebrow">考前猜題 · 2026 年 12 月</p>',
      '        <strong>總體經濟學 × 投資學：40 題命題預測</strong>',
      '        <span>美國公債、Fed、AI、原油、黃金、法國財政、台灣政策與匯率，整理成計算題、申論題與 6 組跨章節整合。</span>',
      '        <span class="subject-written-cta-note">2 科 · 40 題 · 6 組整合 · 16 條公式</span>',
      '      </div>',
      '      <span class="subject-written-cta-arrow">查看考前猜題 →</span>',
      '    </a>',
      '  </section>',
      '  <section class="home-section">',
      '    <a class="subject-written-cta" href="#/past-exams">',
      '      <div>',
      '        <p class="eyebrow">歷屆試題</p>',
      '        <strong>用考古題練習庫檢查吸收程度</strong>',
      "        <span>收錄 107–115 年共 29 次、3,710 題選擇題；可依年度、科目與考試次別篩選，先作答再看答案，練習紀錄只存在你的瀏覽器。</span>",
      '        <span class="subject-written-cta-note">4 科 · 9 個年度 · 29 次考試</span>',
      "      </div>",
      '      <span class="subject-written-cta-arrow">開始練考古題 →</span>',
      "    </a>",
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
      subject.id === "macro" ? renderModelAtlasCard(subject) : "",
      subject.id === "macro" ? renderMacroCurrentEventsCard() : "",
      subject.id === "macro" ? renderMacroEvolutionCta() : "",
      subject.id === "macro" ? renderNobelCta() : "",
      subject.id === "investment" ? renderInvestmentFormulasCard() : "",
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
    const nobelGroups = nobelGroupsWithDiagrams();
    const nobelTotal = countNobelModels(nobelGroups);
    const grandTotal = total + nobelTotal;
    const nobelYears = Array.isArray(nobelData.rows) ? nobelData.rows.length : 0;

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
    }).join("") + [
      '<a href="#/models/macro?chapter=nobel"',
      ' aria-label="歷年諾貝爾經濟學獎模型（' + nobelTotal + ' 組）">',
      "諾貝爾獎 <span>" + nobelTotal + "</span>",
      "</a>"
    ].join("");

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
          renderDiagram(entry.diagram),
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

    const nobelSections = nobelGroups.map(function (group, index) {
      return [
        '<article class="models-entry" id="model-' + escapeHtml(group.id) + '">',
        '  <div class="models-entry-ref">',
        '    <span class="eyebrow">諾貝爾模型 ' + padNumber(index + 1) + " · " + escapeHtml(nobelYearSpan(group)) + "</span>",
        '    <a href="#/nobel?group=' + encodeURIComponent(group.id) + '">' + escapeHtml(group.title) + "</a>",
        '    <span class="nobel-entry-years">' + group.rows.length + " 屆</span>",
        "  </div>",
        renderDiagram(group.diagram),
        "</article>"
      ].join("");
    }).join("");

    const nobelSection = [
      '<section class="models-chapter models-nobel" id="models-nobel">',
      '  <div class="models-chapter-head">',
      "    <div>",
      '      <p class="eyebrow">諾貝爾經濟學獎 · ' + escapeHtml(nobelData.meta.period || "1969–2026") + "</p>",
      "      <h2>歷年諾貝爾經濟學獎模型</h2>",
      "    </div>",
      '    <div class="models-chapter-side">',
      '      <span class="models-badge">' + nobelTotal + " 組模型</span>",
      '      <a class="text-link" href="#/nobel">完整年表 →</a>',
      "    </div>",
      "  </div>",
      '  <p class="models-nobel-intro">從 ' + nobelYears + ' 屆年表整理出 ' + nobelTotal + " 組代表模型：表格保留每屆得主、代表公式與結論，圖組則把同一分析家族放在一起。這些圖與年表頁共用同一份資料。</p>",
      nobelSections,
      "</section>"
    ].join("");

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
      '      <p class="lede">把 ' + subject.chapters.length + " 章用到的 " + total + " 張章節模型圖，以及 " + nobelYears + " 屆諾貝爾經濟學獎整理出的 " + nobelTotal + " 組模型圖集中在同一頁；每張圖的標題、圖說、變數、參數與 SVG 都和來源頁共用同一份資料。</p>",
      '      <div class="models-summary">',
      "        <span><strong>" + total + "</strong> 章節模型</span>",
      "        <span><strong>" + nobelTotal + "</strong> 諾貝爾模型</span>",
      "        <span><strong>" + subject.chapters.length + "</strong> 章</span>",
      "        <span><strong>" + nobelYears + "</strong> 屆年表</span>",
      "      </div>",
      "    </div>",
      '    <div class="chapter-head-side">',
      '      <a class="btn btn-small" href="#/subject/macro">← 回總經首頁</a>',
      "    </div>",
      "  </header>",
      '  <div class="notice models-binding">',
      "    <strong>同步更新：</strong>本頁與各章模型圖、諾貝爾獎年表共用同一份模型資料，不另存副本；修改任一模型的 SVG、圖說、變數或參數後，重新載入章節頁、年表頁與本頁即可看到同步結果。",
      "  </div>",
      '  <nav class="models-jump" aria-label="模型章節與諾貝爾獎快速跳轉">',
      '    <p class="eyebrow">模型快速跳轉</p>',
      jumpLinks,
      "  </nav>",
      '  <div class="models-list">' + chapterSections + nobelSection + "</div>",
      '  <footer class="models-foot">',
      "    <p>共 " + grandTotal + " 張模型圖（" + total + " 張章節模型＋" + nobelTotal + " 組諾貝爾模型）；各章的概念、名詞與考試重點仍以章節頁為完整版本。</p>",
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
      '      <p class="lede">保留 ' + rows.length + " 屆年表的得主、主要理論、代表模型與核心結論，並把 " + diagramGroups.length + " 組 SVG 模型圖併入同一份年表：每一列左側是該屆資料，右側是對應模型圖；圖組與模型總覽共用同一份資料。</p>",
      '      <div class="models-summary">',
      "        <span><strong>" + rows.length + "</strong> 屆年表</span>",
      "        <span><strong>" + diagramGroups.length + "</strong> 組模型圖</span>",
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
      "    <strong>閱讀方式：</strong>年表每一列左側保留屆別欄位與複習公式（2025 屆已依官方科學背景修正），右側顯示該屆對應的 SVG 模型圖；畫面上的公式以 KaTeX 排版。同一組圖可能對應多個屆別，重複列會標示同組屆別與完整變數、參數說明的所在年份，不代表所有獎項共用同一條方程式。",
      "  </div>",
      '  <section class="nobel-table-section" aria-labelledby="nobel-table-heading">',
      '    <div class="section-heading nobel-section-heading">',
      "      <div>",
      '        <p class="eyebrow">歷屆得主與代表模型 · ' + escapeHtml(period) + "</p>",
      '        <h2 id="nobel-table-heading">完整年表與模型圖</h2>',
      "      </div>",
      '      <span class="nobel-table-hint">每一列左側是該屆得主、領域、公式與結論，右側是對應模型圖；點右側屆別可跳到同組其他年份。</span>',
      "    </div>",
      '    <nav class="models-jump nobel-model-jump" id="nobel-models" aria-label="諾貝爾模型圖索引">',
      '      <p class="eyebrow">' + diagramGroups.length + " 組模型圖索引</p>",
      modelJumpLinks,
      "    </nav>",
      renderNobelTable(),
      "  </section>",
      '  <footer class="models-foot">',
      "    <p>共 " + rows.length + " 屆、 " + diagramGroups.length + " 組模型圖；年表每一列都對應一組模型圖，官方年份與得主仍以諾貝爾獎官網為準。</p>",
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
      subject.id === "investment" && chapter.id === "investment-15" ? '        <a class="btn btn-small" href="#/investment/formulas">技術指標公式 →</a>' : "",
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
      "    <strong>核對進度：</strong>截至 2026-10-22，諾貝爾年表 58 屆的年份與得主已對照官方 API（0 筆不一致），2026 屆學說概念已對照官方 popular information，2019–2020 屆公式與學說方向亦已對照官方科學背景（概念式）；投資學與總體經濟學 29 條公式已完成公開教材逐條核對（#27 BIS CIP、#28 SEC NAV 另經官方交叉核對）；21 張既有總體模型圖已完成公開教材逐條核對，全部為「通過（教材）」，B15 另經 CBC 官方外匯頁輔助，B12 的臺灣景氣指標以國發會頁面輔助；另有 1 張新增國民所得會計帳流程圖與會計學 7 張教學流程圖（會計循環、主要財務報表架構、借記／貸記常用項目、交易到報表流程、財務分析總架構、杜邦分析、四表連結）為教學示意，已通過結構與章節綁定驗證，尚未逐條教材核對；投資學另有 32 條比例分析公式，集中於單一來源並與對應章節綁定，另有 5 項選擇權評價優先順序；會計公式 A1–A12 已完成核對（A1、A3、A4、A8、A12 依 IFRS 官方摘要，A5、A7 依 IFRS 9／16 準則本文，A2、A6、A9–A11 依公開教材）；會計代表性分錄與報表勾稽已檢查，各章例題逐題重算與諾貝爾其他屆公式仍待官方或教材逐條核對。",
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
      "      <li>總體經濟學另設「模型總覽」（#/models/macro），依 13 章集中 22 張章節圖（含 1 張教學流程圖），並加入諾貝爾經濟學獎的 17 組模型圖；另有「歷年諾貝爾經濟學獎」（#/nobel）逐年雙欄年表，左側為該屆資料、右側為對應模型圖。三個視圖共用同一份模型資料，修改後重新載入即可看到同步結果。</li>",
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

  function render() {
    const route = parseRoute();
    let html = "";
    let title = content.meta.title;

    if (route.parts.length === 0) {
      html = renderHome();
      title = "總體經濟學、投資學、會計學與證券法規｜" + content.meta.title;
    } else if ((route.parts[0] === "macro" && route.parts[1] === "evolution") || (route.parts[0] === "subject" && route.parts[1] === "macro" && route.query.get("evolution"))) {
      html = renderMacroEvolutionPage();
      title = "總體經濟學學派演進圖｜總體經濟學｜" + content.meta.title;
    } else if (route.parts[0] === "subject" && getSubject(route.parts[1])) {
      const subject = getSubject(route.parts[1]);
      html = renderSubject(subject);
      title = subject.name + "｜" + content.meta.title;
    } else if (route.parts[0] === "investment" && route.parts[1] === "formulas") {
      html = renderInvestmentFormulasPage();
      title = "投資學公式總表｜投資學｜" + content.meta.title;
    } else if (route.parts[0] === "models" && route.parts[1] === "macro") {
      html = renderMacroModels();
      title = "總體經濟模型總覽｜總體經濟學｜" + content.meta.title;
    } else if (route.parts[0] === "nobel") {
      html = renderNobelPage();
      title = "歷年諾貝爾經濟學獎｜總體經濟學｜" + content.meta.title;
    } else if (route.parts[0] === "chapter" && getChapter(route.parts[1])) {
      const chapter = getChapter(route.parts[1]);
      html = renderChapter(chapter);
      title = chapterLabel(chapter) + " " + chapter.title + "｜" + chapter.subjectName + "｜" + content.meta.title;
    } else if (route.parts[0] === "past-exams" && route.parts[1] === "written") {
      html = renderWrittenExams(route.query.get("question"));
      title = "計算題與申論題｜" + content.meta.title;
    } else if (route.parts[0] === "past-exams") {
      html = renderPastExams(route.query.get("question"));
      title = "考古題練習庫｜" + content.meta.title;
    } else if (route.parts[0] === "macro-current") {
      html = renderMacroCurrentEvents();
      title = "近二年重要國際金融時事與總經政策｜總體經濟學｜" + content.meta.title;
    } else if (route.parts[0] === "exam-forecast") {
      html = renderExamForecastPage();
      title = "2026 年 12 月考前猜題｜總體經濟學 × 投資學｜" + content.meta.title;
    } else if (route.parts[0] === "sources") {
      html = renderSources();
      title = "資料來源｜" + content.meta.title;
    } else if (route.parts[0] === "about") {
      html = renderAbout();
      title = "使用說明｜" + content.meta.title;
    } else {
      html = renderNotFound();
      title = "找不到頁面｜" + content.meta.title;
    }

    main.innerHTML = html;
    document.title = title;
    updateNav(route);
    updateProgressDisplays();
    setupSectionObserver();
    closeMobileMenu();

    if (route.parts[0] === "models" && route.parts[1] === "macro" && route.query.get("model")) {
      const modelAnchor = route.query.get("model") || "";
      window.requestAnimationFrame(function () {
        const target = /^model-macro-\d+-\d+$/.test(modelAnchor) ? document.getElementById(modelAnchor) : null;
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
        const target = document.getElementById("nobel-group-" + groupId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    } else if (route.parts[0] === "nobel" && route.query.get("year")) {
      const year = route.query.get("year");
      window.requestAnimationFrame(function () {
        const target = document.getElementById("nobel-" + year);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
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

  function buildSearchIndex() {
    const index = [];

    allChapters.forEach(function (chapter) {
      index.push({
        type: "章",
        typeClass: "",
        title: chapterLabel(chapter) + " " + chapter.title,
        sub: chapter.subjectName + (chapter.partTitle ? " · " + chapter.partTitle : "") + " · " + chapter.sections.length + " " + subjectUnitLabel({ id: chapter.subjectId }),
        text: chapter.title + " " + chapter.summary,
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
            chapterId: chapter.id,
            sectionIndex: sectionIndex + 1
          });
        });
      });
    });

    searchState.index = index.map(function (entry) {
      return Object.assign({}, entry, {
        nTitle: normalize(entry.title),
        nSub: normalize(entry.sub),
        nText: normalize(entry.text)
      });
    });
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
        '<a class="search-result" href="#/models/macro"><span class="result-type">模型</span><span><strong>總體經濟模型總覽</strong><small>' + (macroModelTotal + nobelTotal) + ' 張模型圖（' + macroModelTotal + ' 章節＋' + nobelTotal + ' 諾貝爾），依 ' + (macroSubject ? macroSubject.chapters.length : 13) + ' 章與 ' + nobelYears + ' 屆年表整理</small></span><span class="result-arrow">→</span></a>',
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

    const results = performSearch(trimmed);
    searchState.results = results;
    searchState.active = results.length ? 0 : -1;

    if (!results.length) {
      searchResults.innerHTML = '<div class="search-empty">找不到「' + escapeHtml(trimmed) + '」相關的章節或名詞。<br>試試較短的關鍵字，例如 GDP、利率、匯率。</div>';
      return;
    }

    searchResults.innerHTML = results.map(function (result, index) {
      return [
        '<a class="search-result' + (index === 0 ? " is-active" : "") + '" href="' + searchHref(result) + '">',
        '  <span class="result-type ' + escapeHtml(result.typeClass) + '">' + escapeHtml(result.type) + "</span>",
        "  <span><strong>" + escapeHtml(result.title) + "</strong><small>" + escapeHtml(result.sub) + "</small></span>",
        '  <span class="result-arrow" aria-hidden="true">→</span>',
        "</a>"
      ].join("");
    }).join("");
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
    searchInput.value = "";
    renderSearchResults("");
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

  function bindEvents() {
    window.addEventListener("hashchange", function () {
      closeSearch();
      render();
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
      handlePracticeChange(event);
    });

    main.addEventListener("input", function (event) {
      handlePracticeInput(event);
    });
  }

  /* ----------------------------- init ----------------------------- */

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
