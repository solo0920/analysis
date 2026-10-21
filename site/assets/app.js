/* =========================================================
   分析師備考站 — hash router, search, progress, theme
   No build step, no dependencies.
   ========================================================= */

(function () {
  "use strict";

  const content = window.EXAM_CONTENT;
  const diagrams = window.MACRO_DIAGRAMS || {};
  const nobelData = window.NOBEL_DATA || { meta: {}, groups: [], rows: [] };
  const nobelDiagrams = window.NOBEL_DIAGRAMS || {};
  const macroEvolution = window.MACRO_EVOLUTION || { meta: {}, stages: [] };
  const practiceData = window.PAST_EXAMS || { meta: {}, subjects: [], sessions: [], questions: [] };
  const writtenData = window.PAST_EXAMS_WRITTEN || { meta: {}, questions: [] };
  const macroCurrentData = window.MACRO_CURRENT_EVENTS || { meta: {}, events: [] };
  const practiceSubjects = Array.isArray(practiceData.subjects) ? practiceData.subjects : [];
  const practiceSessions = Array.isArray(practiceData.sessions) ? practiceData.sessions : [];
  const practiceQuestions = Array.isArray(practiceData.questions) ? practiceData.questions : [];
  const writtenQuestions = Array.isArray(writtenData.questions) ? writtenData.questions : [];
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
    if (!chapter.partTitle) {
      return "";
    }
    return "第 " + chapter.part + " 篇 " + chapter.partTitle;
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
        "  <dt>" + escapeHtml(term[0]) + "</dt>",
        "  <dd>" + escapeHtml(term[1]) + "</dd>",
        "</div>"
      ].join("");
    }).join("") + "</dl>";
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
      diagram.note ? '  <p class="diagram-note">' + escapeHtml(diagram.note) + "</p>" : "",
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
        return '<tr><td class="diagram-symbol">' + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td><td>" + escapeHtml(row[2]) + "</td></tr>";
      }).join("") + "</tbody>",
      "  </table>",
      "</div>"
    ].join("");
  }

  function renderDiagram(diagram) {
    return [
      '<figure class="model-diagram">',
      '  <div class="diagram-head">',
      '    <p class="diagram-kicker">模型圖</p>',
      "    <h3>" + escapeHtml(diagram.title) + "</h3>",
      "  </div>",
      '  <div class="diagram-canvas">' + diagram.svg + "</div>",
      '  <p class="diagram-scroll-hint">圖表較寬，可左右滑動查看。</p>',
      "  <figcaption>" + escapeHtml(diagram.caption) + "</figcaption>",
      '  <div class="diagram-tables">',
      renderDiagramTable("變數說明", diagram.variables),
      renderDiagramTable("參數說明", diagram.parameters),
      "  </div>",
      diagram.note ? '  <p class="diagram-note">' + escapeHtml(diagram.note) + "</p>" : "",
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
    const list = (practiceSectionQuestions.get(key) || []).slice().sort(function (a, b) {
      return (a.year - b.year) || (a.session - b.session) || (a.number - b.number);
    });
    if (!list.length) {
      return "";
    }
    const seen = new Set();
    const links = list.filter(function (question) {
      if (seen.has(question.id)) {
        return false;
      }
      seen.add(question.id);
      return true;
    }).map(function (question) {
      const session = practiceSessionMap.get(question.sessionId) || {};
      return '<a class="section-exam-link" href="#/past-exams?question=' + encodeURIComponent(question.id) + '">' +
        '<span>' + escapeHtml(session.label || question.sessionId) + '</span>' +
        '<strong>第 ' + question.number + ' 題</strong></a>';
    }).join("");
    return [
      '<div class="section-exam-sources">',
      '  <div class="section-exam-head"><strong>本節出處題目</strong><span>' + list.length + ' 題</span></div>',
      '  <div class="section-exam-links">' + links + '</div>',
      "</div>"
    ].join("");
  }

  function renderSection(section, index, subject, chapter) {
    const sectionId = "section-" + (index + 1);
    const focus = isFocusSection(subject, section);
    const kicker = focus ? "學習重點 " : "";
    const diagram = chapter ? getDiagram(chapter.id, index) : null;
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
        return "<p>" + escapeHtml(paragraph) + "</p>";
      }).join("") + "</div>",
      diagram ? renderDiagram(diagram) : "",
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
      '  <div class="exam-box">',
      "    <h3>考試重點</h3>",
      "    <ul>" + section.points.map(function (point) {
        return "<li>" + escapeHtml(point) + "</li>";
      }).join("") + "</ul>",
      "  </div>",
      section.memory ? '  <div class="memory-card"><span class="memory-label">記憶</span><p>' + escapeHtml(section.memory) + "</p></div>" : "",
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
      '<aside class="model-atlas" aria-labelledby="model-atlas-heading">',
      "  <div>",
      '    <p class="eyebrow">模型索引</p>',
      '    <h2 id="model-atlas-heading">總體經濟模型總覽</h2>',
      "    <p>涵蓋 " + subject.chapters.length + " 章、共 " + total + " 張章節模型圖（" + withModels + " 章含模型）；另收錄 " + nobelYears + " 屆諾貝爾經濟學獎年表與 " + nobelTotal + " 組模型圖。章節頁、模型總覽與學派演進圖共用同一份模型資料，不另存副本。</p>",
      "  </div>",
      '  <div class="model-atlas-actions">',
      '    <a class="btn btn-primary" href="#/models/macro">查看模型總覽 →</a>',
      '    <a class="btn" href="#/subject/macro?evolution=1">學派演進圖 →</a>',
      '    <a class="btn" href="#/nobel">諾貝爾獎年表 →</a>',
      "  </div>",
      "</aside>"
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

  function renderMacroEvolution() {
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
      '      <h2 id="macro-evolution-heading">' + escapeHtml(meta.title || "總體經濟學學派演進圖") + "</h2>",
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

  function renderSubjectCard(subject) {
    const progressState = subjectProgress(subject);
    const preview = subject.chapters.slice(0, 3).map(function (chapter) {
      return "<li>" + escapeHtml(chapterLabel(chapter)) + " " + escapeHtml(chapter.title) + "</li>";
    }).join("");

    return [
      '<article class="subject-card ' + escapeHtml(subject.colorClass) + '">',
      '  <div class="subject-card-top">',
      '    <span class="subject-badge">考試科目</span>',
      "  </div>",
      "  <h2>" + escapeHtml(subject.name) + "</h2>",
      "  <p>" + escapeHtml(subject.tagline) + "</p>",
      '  <ul class="subject-card-list">' + preview + "<li>…共 " + subject.chapters.length + " 章</li></ul>",
      '  <div class="subject-card-foot">',
      renderProgress(subject),
      '    <a class="text-link" href="#/subject/' + escapeHtml(subject.id) + '">查看章節 →</a>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderChapterRow(chapter, subject) {
    const done = progress.has(chapter.id);
    const unitLabel = " " + subjectUnitLabel(subject);
    return [
      '<a class="chapter-row ' + escapeHtml(subject.colorClass) + '" href="#/chapter/' + escapeHtml(chapter.id) + '">',
      '  <div class="chapter-num"><strong>' + chapterNumber(chapter) + "</strong></div>",
      "  <div>",
      "    <h2>" + escapeHtml(chapter.title) + "</h2>",
      "    <p>" + escapeHtml(chapter.summary) + "</p>",
      "  </div>",
      '  <div class="chapter-row-side">',
      renderChapterExamStats(chapter, subject),
      '    <span class="section-count">' + chapter.sections.length + unitLabel + "</span>",
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
            '<td data-label="說明">' + escapeHtml(entry.note) + "</td>",
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
        return "<dt>" + renderKatex(variable.symbol, false) + "</dt><dd>" + escapeHtml(variable.definition) + "</dd>";
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
      '      <p class="option-card-goal">' + escapeHtml(item.goal) + "</p>",
      "    </div>",
      "  </div>",
      '  <p class="option-card-summary">' + escapeHtml(item.summary || "") + "</p>",
      renderOptionFormulaList(item),
      renderOptionVariables(item),
      item.note ? '  <p class="option-note">' + escapeHtml(item.note) + "</p>" : "",
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
    const stats = practiceChapterStatsFor(chapter.id);
    const total = practiceSubjectQuestionCount(subject.id);
    const rate = practicePercentText(stats.count, total);
    const title = "107–115 年共 " + stats.count + " 題，占本科 " + total + " 題的 " + rate + "；出現在 " + stats.sessions.size + " 次考試。";
    return [
      '<div class="chapter-exam-stats" title="' + escapeHtml(title) + '">',
      '  <span class="chapter-exam-count">出題 <strong>' + stats.count + "</strong> 題</span>",
      '  <span class="chapter-exam-rate">頻率 <strong>' + rate + "</strong></span>",
      "</div>"
    ].join("");
  }

  function renderChapterExamSourceBlock(chapter) {
    const stats = practiceChapterStatsFor(chapter.id);
    const total = practiceSubjectQuestionCount(chapter.subjectId);
    const rate = practicePercentText(stats.count, total);
    return [
      '<section class="chapter-exam-sources" id="chapter-exam-sources" aria-labelledby="chapter-exam-sources-heading">',
      '  <div class="chapter-exam-sources-head">',
      "    <div>",
      '      <p class="eyebrow">考古題出處</p>',
      '      <h2 id="chapter-exam-sources-heading">本章出題紀錄</h2>',
      "    </div>",
      '    <div class="chapter-exam-total"><strong>' + stats.count + "</strong><span>題 · " + rate + "</span></div>",
      "  </div>",
      "  <p class=\"chapter-exam-note\">以 107–115 年選擇題的章節出處統計；頻率為本章出處標記數占該科題數的比例；跨章節題目會重複計入各章。題目已依節次列在本章各節的「本節出處題目」，可直接點選進入該題。</p>",
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
      '  <span class="past-exam-option-text">' + escapeHtml(text) + "</span>",
      "</button>"
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
      '  <h2 class="past-exam-stem">' + escapeHtml(question.stem) + "</h2>",
      renderPracticeQuestionOrigin(question, session),
      '  <div class="past-exam-options" role="group" aria-label="選擇題選項">',
      question.options.map(function (text, index) {
        return renderPracticeOption(question, "ABCD"[index], text, selected, revealed);
      }).join(""),
      "  </div>",
      feedback,
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
      return '<li' + (correct ? ' class="is-correct"' : "") + '><span class="past-exam-option-letter">' + letter + "</span><span>" + escapeHtml(text) + "</span></li>";
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
      '  <h3 class="past-exam-browse-stem">' + escapeHtml(question.stem) + "</h3>",
      renderPracticeQuestionOrigin(question, session),
      '  <ol class="past-exam-browse-options">' + options + "</ol>",
      answer,
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
            return '<p>' + escapeHtml(text) + '</p>';
          }).join("") + '</div>',
          '  <div class="macro-current-points"><h3>考試重點</h3><ul>' + event.points.map(function (point) {
            return '<li>' + escapeHtml(point) + '</li>';
          }).join("") + '</ul></div>',
          '  <div class="macro-current-sources"><span>對應章節</span>' + renderEventSourceLinks(event) + '</div>',
          '</article>'
        ].join("");
      }).join("") + '</div>',
      '</div>'
    ].join("");
  }

  function renderMacroCurrentEventsCard() {
    return [
      '<a class="macro-current-cta" href="#/macro-current">',
      '  <div>',
      '    <p class="eyebrow">近二年時事 · 總經政策</p>',
      '    <h2>重要國際金融時事與臺灣政策</h2>',
      '    <p>美國對等關稅、聯準會、國債與黃金、穩定幣、AI 生產力、歐債與臺灣貨幣政策，整理成可答題的總經框架。</p>',
      '  </div>',
      '  <span class="macro-current-cta-arrow">查看時事整理 →</span>',
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

  function writtenCountForSubject(subjectId) {
    return writtenQuestions.filter(function (question) {
      return question.subject === subjectId;
    }).length;
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
      '  <div class="written-filter-summary"><strong>' + writtenFilteredQuestions().length + '</strong> 題 · 107–115 年 · 依題目顯示答題指引或參考解答</div>',
      '</div>'
    ].join("");
  }

  function renderWrittenAnswer(text) {
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
      parts.push('<span class="written-answer-math' + (display ? " is-display" : "") + '">' + renderKatex(tex, display) + "</span>");
      last = pattern.lastIndex;
    }
    if (last < source.length) {
      parts.push(escapeHtml(source.slice(last)));
    }
    return parts.join("");
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
      '    <span class="written-reference">' + (question.answerType === "guide" ? "答題指引" : "參考解答") + '</span>',
      '  </div>',
      '  <h3 class="written-stem">' + escapeHtml(question.stem) + '</h3>',
      renderPracticeQuestionOrigin(question, session),
      '  <div class="written-actions">',
      '    <button class="btn btn-small" type="button" data-written-toggle="' + escapeHtml(question.id) + '">' + (open ? "收起解答" : (question.answerType === "guide" ? "顯示答題指引" : "顯示參考解答")) + '</button>',
      session.questionUrl ? '    <a class="text-link" href="' + escapeHtml(session.questionUrl) + '" target="_blank" rel="noopener noreferrer">原始試題 PDF →</a>' : "",
      '  </div>',
      open ? '  <div class="written-answer">' + answers.map(function (text) {
        return '<p>' + renderWrittenAnswer(text) + '</p>';
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
      '      <p class="lede">收錄 107–115 年四個專業科目的計算題與申論題。目前 109–113 年十六次（192 題）已改為完整參考解答，其餘年度分批補齊；未完成完整解題的題目先標示答題指引。官方解答 PDF 只有選擇題答案，並非官方公告。</p>',
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
      '  <div class="notice"><strong>解答說明：</strong>申論與計算題沒有官方公告解答；題卡會標示「答題指引」或「參考解答」，109–113 年十六次（192 題）已提供完整參考解答，其餘年度依批次補齊。若與補習班、教材或官方答案不同，請以官方與正式教材為準。</div>',
      '</div>'
    ].join("");
  }

  function renderSubjectWrittenCta(subject) {
    const count = writtenCountForSubject(subject.id);
    if (!count) {
      return "";
    }
    return [
      '<a class="subject-written-cta" href="#/past-exams/written">',
      '  <div>',
      '    <p class="eyebrow">107–115 計算與申論</p>',
      '    <strong>' + count + ' 題計算／申論</strong>',
      '    <span>依題目顯示答題指引或參考解答，點此查看。</span>',
      '  </div>',
      '  <span class="subject-written-cta-arrow">查看 →</span>',
      '</a>'
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
      '        <a class="btn" href="#/past-exams/written">計算／申論題（114–115）</a>',
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
      "        <h1>把 <em>總體經濟</em>、<em>投資學</em><br>與 <em>會計學</em>、<em>證券法規</em><br>讀成一張可以考試的地圖。</h1>",
      '        <p class="lede">' + escapeHtml(content.meta.description) + "</p>",
      '        <div class="hero-actions">',
      '          <a class="btn btn-primary" href="#/subject/macro">開始讀總體經濟</a>',
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
      '    <div class="past-exam-home-cta">',
      '      <div>',
      '        <p class="eyebrow">歷屆試題</p>',
      "        <h2>用考古題練習庫檢查吸收程度</h2>",
      "        <p>收錄 107–115 年共 29 次、3,710 題選擇題；可依年度、科目與考試次別篩選，先作答再看答案，練習紀錄只存在你的瀏覽器。</p>",
      "      </div>",
      '      <div class="past-exam-home-actions">',
      '        <a class="btn btn-primary" href="#/past-exams">開始練考古題</a>',
      '        <span class="past-exam-home-note">4 科 · 9 個年度 · 29 次考試</span>',
      "      </div>",
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
      '  <section class="home-section">',
      '    <div class="notice">',
      "      <strong>公式與內容校對：</strong>" + escapeHtml(content.meta.formulaNote) + ' <a href="#/sources">查看資料來源</a>',
      "    </div>",
      "  </section>",
      "</div>"
    ].join("");
  }

  function renderSubject(subject) {
    const progressState = subjectProgress(subject);
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
          ? '<div class="part-heading"><div><p class="eyebrow">第 ' + group.number + " 篇</p><h2>" + escapeHtml(group.title) + "</h2></div>" + (group.page ? '<span class="part-page">' + escapeHtml(group.page) + "</span>" : "") + "</div>"
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
      '      <p class="lede">' + escapeHtml(subject.description) + "</p>",
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
      subject.id === "macro" ? renderMacroEvolution() : "",
      renderSubjectWrittenCta(subject),
      subject.id === "investment" ? renderInvestmentRatioOverview() : "",
      subject.id === "investment" ? renderOptionPrioritySection() : "",
      '  <div class="section-heading subject-chapters-head">',
      "    <div>",
      '      <p class="eyebrow">章節地圖</p>',
      "      <h2>章節地圖</h2>",
      "      <p>依原始目錄的篇章與章節順序排列，點選章節即可進入該章的名詞與考試重點；右側出題次數與頻率依 107–115 年考古題的章節出處統計，頻率為該章出處標記數占本科題數的比例；跨章節題目會重複計入各章，因此各章頻率合計可能超過 100%。</p>",
      "    </div>",
      '    <span class="progress-text">目前完成 <span data-progress-text="' + escapeHtml(subject.id) + '">' + progressState.done + " / " + progressState.total + " 章</span></span>",
      "  </div>",
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
      '      <p class="lede">把第 1–2 篇、' + subject.chapters.length + " 章用到的 " + total + " 張章節模型圖，以及 " + nobelYears + " 屆諾貝爾經濟學獎整理出的 " + nobelTotal + " 組模型圖集中在同一頁；每張圖的標題、圖說、變數、參數與 SVG 都和來源頁共用同一份資料。</p>",
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
      '        <p class="eyebrow">歷屆得主 × 代表模型 · ' + escapeHtml(period) + "</p>",
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
      '      <p class="lede">' + escapeHtml(chapter.summary) + "</p>",
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
      '      <div class="chapter-summary"><strong>本章摘要：</strong>' + escapeHtml(chapter.summary) + "</div>",
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
      "    <strong>核對進度：</strong>截至 2026-10-20，諾貝爾年表 58 屆的年份與得主已對照官方 API（0 筆不一致），2026 屆學說概念已對照官方 popular information，2019–2020 屆公式與學說方向亦已對照官方科學背景（概念式）；投資學與總體經濟學 29 條公式已完成公開教材逐條核對（#27 BIS CIP、#28 SEC NAV 另經官方交叉核對）；21 張總體模型圖已完成公開教材逐條核對，全部為「通過（教材）」，B15 另經 CBC 官方外匯頁輔助，B12 的臺灣景氣指標以國發會頁面輔助；投資學另有 32 條比例分析公式，集中於單一來源並與對應章節綁定，另有 5 項選擇權評價優先順序；會計公式 A1–A12 已完成核對（A1、A3、A4、A8、A12 依 IFRS 官方摘要，A5、A7 依 IFRS 9／16 準則本文，A2、A6、A9–A11 依公開教材）；會計代表性分錄與報表勾稽已檢查，各章例題逐題重算與諾貝爾其他屆公式仍待官方或教材逐條核對。",
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
      "    <p>總體經濟學依《證券投資分析人員考試概要》第 1–2 篇的目錄整理；投資學依《投資學》目錄的第 1–5 篇整理；會計學依《會計學》目錄的 23 章整理；證券交易相關法規與實務依測驗範圍整理為 21 章、21 節。四個科目各自成篇，不互相混用章節。全站共 " + content.subjects.length + " 個科目、" + allChapters.length + " 章、" + totalSections + " 個學習單元。每個章節包含核心概念、名詞速查、考試重點、記憶句與關鍵公式。</p>",
      "    <h2>怎麼使用</h2>",
      "    <ol>",
      "      <li>先從科目頁看章節地圖，確認各篇與章節的順序。</li>",
      "      <li>進入章節後，先讀「核心概念」，再用名詞卡補足定義。</li>",
      "      <li>讀完一個單元，只看「考試重點」與「一句話記憶」，測試自己能否回想。</li>",
      "      <li>把公式抄一次，確認每個符號的意義與適用條件。</li>",
      "      <li>用「總體經濟模型總覽」跨章比較模型；需要完整說明時，再回到所屬章節。</li>",
      "      <li>完成一章後按「標記本章完成」，回頭看科目進度。</li>",
      "    </ol>",
      "    <h2>內容製作與校對</h2>",
      "    <ul>",
      "      <li>總體經濟學的章節、節名與頁碼以 <code>documents/gross_economics_contents.md</code> 為依據，涵蓋第 1 篇「總體經濟學」與第 2 篇「金融市場」，共 13 章、49 個來源節次（另加 1 個補充單元，共 50 節）。</li>",
      "      <li>投資學的篇章、章名與順序以 <code>documents/investment_contents.md</code> 為依據；該目錄只提供章名，頁面上的「學習重點」是本站編寫的複習單元，不冒充原書節名。</li>",
      "      <li>會計學的章名、順序與頁碼以 <code>documents/accounting_contents.md</code> 為依據；有列節名的章節照原節名呈現，未列節名的章節以「學習重點」標示，不冒充原書節名。第 23 章來源註明原書章號印為 22，本站依順序列為第 23 章。</li>",
      "      <li>四個科目的來源目錄不同：總體經濟學使用 <code>gross_economics_contents.md</code>（含第 2 篇金融市場）；投資學使用 <code>investment_contents.md</code>；會計學使用 <code>accounting_contents.md</code>；證券法規使用 <code>securities_law_contents.md</code>；不以其中一科的章節補另一科。</li>",
      "      <li>依投資學來源目錄，章號由第十一章直接跳到第十三章；本站保留原始編號，不自行補章。</li>",
      "      <li>總體經濟學另設「模型總覽」（#/models/macro），依 13 章集中 21 張章節模型圖，並加入諾貝爾經濟學獎的 17 組模型圖；另有「歷年諾貝爾經濟學獎」（#/nobel）逐年雙欄年表，左側為該屆資料、右側為對應模型圖。三個視圖共用同一份模型資料，修改後重新載入即可看到同步結果。</li>",
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
      macro: (route.parts[0] === "models" && route.parts[1] === "macro") || route.parts[0] === "nobel",
      investment: false,
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
      title = "總體經濟學 × 投資學 × 會計學 × 證券法規｜" + content.meta.title;
    } else if (route.parts[0] === "subject" && getSubject(route.parts[1])) {
      const subject = getSubject(route.parts[1]);
      html = renderSubject(subject);
      title = subject.name + "｜" + content.meta.title;
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

    if (route.parts[0] === "subject" && route.parts[1] === "macro" && route.query.get("evolution")) {
      window.requestAnimationFrame(function () {
        const target = document.getElementById("macro-evolution");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else if (route.parts[0] === "models" && route.parts[1] === "macro" && route.query.get("model")) {
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
        sub: chapter.subjectName + (chapter.partTitle ? " · 第 " + chapter.part + " 篇 " + chapter.partTitle : "") + " · " + chapter.sections.length + " " + subjectUnitLabel({ id: chapter.subjectId }),
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
          text: sectionDisplayTitle(section) + " " + section.body.join(" "),
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
        '<a class="search-result" href="#/subject/macro?evolution=1"><span class="result-type">圖解</span><span><strong>總體經濟學派演進圖</strong><small>古典、凱因斯、貨幣、新古典、新凱因斯與現代研究前沿</small></span><span class="result-arrow">→</span></a>',
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
