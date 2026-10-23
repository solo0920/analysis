#!/usr/bin/env node
// 從完整考古題／申論題／章節解題資料，產生章節頁使用的科目分包。
// 使用方式：node site/scripts/build-past-subject-bundles.js

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const siteDir = path.resolve(__dirname, "..");
const assetsDir = path.join(siteDir, "assets");
const subjects = ["macro", "investment", "accounting", "law"];

function load(files, key) {
  const context = { window: {} };
  vm.createContext(context);
  files.forEach(function (file) {
    vm.runInContext(fs.readFileSync(path.join(assetsDir, file), "utf8"), context, { filename: file });
  });
  return context.window[key];
}

const past = load(["content-past-exams.js"], "PAST_EXAMS");
const written = load(["content-past-exams-written.js"], "PAST_EXAMS_WRITTEN");
const solutions = load([115, 114, 113, 112, 111, 110, 109, 108, 107].map(function (year) {
  return "content-exam-solutions-" + year + ".js";
}), "EXAM_SOLUTIONS");

subjects.forEach(function (subject) {
  const pastSubject = {
    meta: past.meta,
    subjects: (past.subjects || []).filter(function (item) { return item.id === subject; }),
    sessions: past.sessions || [],
    questions: (past.questions || []).filter(function (item) { return item.subject === subject; })
  };
  const writtenSubject = {
    meta: written.meta,
    questions: (written.questions || []).filter(function (item) { return item.subject === subject; })
  };
  fs.writeFileSync(
    path.join(assetsDir, "content-past-exams-" + subject + ".js"),
    "// 考古題（" + subject + "）：章節頁專用分包；由 build-past-subject-bundles.js 產生。\nwindow.PAST_EXAMS = " + JSON.stringify(pastSubject, null, 2) + ";\n"
  );
  fs.writeFileSync(
    path.join(assetsDir, "content-past-exams-written-" + subject + ".js"),
    "// 計算／申論題（" + subject + "）：章節頁專用分包；由 build-past-subject-bundles.js 產生。\nwindow.PAST_EXAMS_WRITTEN = " + JSON.stringify(writtenSubject, null, 2) + ";\n"
  );

  const solutionSubject = solutions.map(function (batch) {
    return {
      year: batch.year,
      label: batch.label,
      sections: Object.fromEntries(Object.entries(batch.sections || {}).filter(function (entry) {
        return entry[0].indexOf(subject + "-") === 0;
      }))
    };
  }).filter(function (batch) { return Object.keys(batch.sections).length > 0; });
  fs.writeFileSync(
    path.join(assetsDir, "content-exam-solutions-" + subject + ".js"),
    "// 章節解題（" + subject + "）：章節頁專用分包；由 build-past-subject-bundles.js 產生。\nwindow.EXAM_SOLUTIONS = " + JSON.stringify(solutionSubject, null, 2) + ";\n"
  );
  console.log(subject + ": " + pastSubject.questions.length + " 選擇題、" + writtenSubject.questions.length + " 申論題、" + solutionSubject.reduce(function (sum, batch) { return sum + Object.keys(batch.sections).length; }, 0) + " 解題節次");
});
