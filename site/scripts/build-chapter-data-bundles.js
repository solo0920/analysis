#!/usr/bin/env node
// 從完整考古題／申論題／章節解題資料，產生各章節專用的精簡資料分包。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const assetsDir = path.resolve(__dirname, "../assets");
function load(files, key) {
  const context = { window: {} };
  vm.createContext(context);
  files.forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(assetsDir, file), "utf8"), context, { filename: file });
  });
  return context.window[key];
}

const contentFiles = [
  "content-macro.js", "content-macro-2.js", "content-macro-3.js",
  "content-investment.js", "content-accounting.js", "content-accounting-2.js",
  "content-law.js", "content-chapter-supplements.js", "content-law-deepdive.js",
  "content-law-deepdive-2.js", "content-law-quickread.js", "content.js"
];
const content = load(contentFiles, "EXAM_CONTENT");
const past = load(["content-past-exams.js"], "PAST_EXAMS");
const written = load(["content-past-exams-written.js"], "PAST_EXAMS_WRITTEN");
const solutions = load([115, 114, 113, 112, 111, 110, 109, 108, 107].map(function (year) {
  return "content-exam-solutions-" + year + ".js";
}), "EXAM_SOLUTIONS");

const chapters = [];
(content.subjects || []).forEach(function (subject) {
  (subject.chapters || []).forEach(function (chapter) { chapters.push(chapter); });
});

chapters.forEach(function (chapter) {
  const pastQuestions = (past.questions || []).filter(function (question) {
    const ids = Array.isArray(question.sourceIds) ? question.sourceIds : [];
    const refs = Array.isArray(question.sourceRefs) ? question.sourceRefs : [];
    return ids.indexOf(chapter.id) !== -1 || refs.some(function (ref) { return ref.chapterId === chapter.id; });
  });
  const writtenQuestions = (written.questions || []).filter(function (question) {
    return (question.sourceIds || []).indexOf(chapter.id) !== -1;
  });
  const chapterSolutions = solutions.map(function (batch) {
    return {
      year: batch.year,
      label: batch.label,
      sections: Object.fromEntries(Object.entries(batch.sections || {}).filter(function (entry) {
        return entry[0].indexOf(chapter.id + "::") === 0;
      }))
    };
  }).filter(function (batch) { return Object.keys(batch.sections).length > 0; });
  const pastPayload = {
    meta: past.meta,
    subjects: past.subjects || [],
    sessions: past.sessions || [],
    questions: pastQuestions
  };
  const writtenPayload = { meta: written.meta, questions: writtenQuestions };
  const file = "content-chapter-data-" + chapter.id + ".js";
  fs.writeFileSync(path.join(assetsDir, file),
    "// 章節專用資料（" + chapter.id + "）：考古題／申論題／解題；由 build-chapter-data-bundles.js 產生。\n" +
    "window.CHAPTER_DATA = window.CHAPTER_DATA || {};\n" +
    "window.CHAPTER_DATA[" + JSON.stringify(chapter.id) + "] = {\n" +
    "  past: " + JSON.stringify(pastPayload, null, 2) + ",\n" +
    "  written: " + JSON.stringify(writtenPayload, null, 2) + ",\n" +
    "  solutions: " + JSON.stringify(chapterSolutions, null, 2) + "\n" +
    "};\n" +
    "window.PAST_EXAMS = window.CHAPTER_DATA[" + JSON.stringify(chapter.id) + "].past;\n" +
    "window.PAST_EXAMS_WRITTEN = window.CHAPTER_DATA[" + JSON.stringify(chapter.id) + "].written;\n" +
    "window.EXAM_SOLUTIONS = window.CHAPTER_DATA[" + JSON.stringify(chapter.id) + "].solutions;\n");
  console.log(chapter.id, pastQuestions.length, writtenQuestions.length, chapterSolutions.length, fs.statSync(path.join(assetsDir, file)).size);
});
