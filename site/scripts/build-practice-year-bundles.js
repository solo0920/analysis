#!/usr/bin/env node
// 產生考古題年度分包與輕量統計，供練習頁預設只載入最新年度。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const assetsDir = path.resolve(__dirname, "../assets");
function load(file, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(assetsDir, file), "utf8"), context, { filename: file });
  return context.window[key];
}
const past = load("content-past-exams.js", "PAST_EXAMS");
const written = load("content-past-exams-written.js", "PAST_EXAMS_WRITTEN");
const years = Array.from(new Set((past.sessions || []).map(function (session) { return session.year; }))).sort(function (a, b) { return a - b; });
const latestYear = years[years.length - 1];

years.forEach(function (year) {
  const payload = {
    meta: past.meta,
    subjects: past.subjects,
    sessions: past.sessions,
    questions: (past.questions || []).filter(function (question) { return question.year === year; })
  };
  const file = "content-past-exams-year-" + year + ".js";
  fs.writeFileSync(path.join(assetsDir, file), "// 考古題年度分包（" + year + "）：由 build-practice-year-bundles.js 產生。\nwindow.PAST_EXAMS = " + JSON.stringify(payload, null, 2) + ";\n");
  console.log(year, payload.questions.length, fs.statSync(path.join(assetsDir, file)).size);
});

const practice = {
  total: past.questions.length,
  subjects: {},
  chapters: {},
  sessions: {},
  years: {},
  latestYear: latestYear
};
(past.questions || []).forEach(function (question) {
  practice.subjects[question.subject] = (practice.subjects[question.subject] || 0) + 1;
  practice.sessions[question.sessionId] = (practice.sessions[question.sessionId] || 0) + 1;
  const ids = new Set(Array.isArray(question.sourceIds) && question.sourceIds.length ? question.sourceIds : (question.sourceId ? [question.sourceId] : []));
  (question.sourceRefs || []).forEach(function (ref) { ids.add(ref.chapterId); });
  ids.forEach(function (id) {
    const stats = practice.chapters[id] || (practice.chapters[id] = { count: 0, sessions: {} });
    stats.count += 1;
    stats.sessions[question.sessionId] = (stats.sessions[question.sessionId] || 0) + 1;
  });
  const yearStats = practice.years[question.year] || (practice.years[question.year] = { count: 0, subjects: {}, sessions: {} });
  yearStats.count += 1;
  yearStats.subjects[question.subject] = (yearStats.subjects[question.subject] || 0) + 1;
  yearStats.sessions[question.sessionId] = (yearStats.sessions[question.sessionId] || 0) + 1;
});
const writtenStats = { total: written.questions.length, subjects: {}, chapters: {} };
(written.questions || []).forEach(function (question) {
  writtenStats.subjects[question.subject] = (writtenStats.subjects[question.subject] || 0) + 1;
  (question.sourceIds || []).forEach(function (id) {
    const stats = writtenStats.chapters[id] || (writtenStats.chapters[id] = { count: 0, sessions: {} });
    stats.count += 1;
    stats.sessions[question.sessionId] = (stats.sessions[question.sessionId] || 0) + 1;
  });
});
const stats = { meta: { generated: "2026-10-23", note: "輕量統計，供科目頁與練習頁年度概況使用。" }, practice: practice, written: writtenStats };
fs.writeFileSync(path.join(assetsDir, "content-past-exam-stats.js"), "// 考古題章節統計（輕量資料；完整題庫由 bootstrap 按路由載入）\n\nwindow.PAST_EXAM_STATS = " + JSON.stringify(stats, null, 2) + ";\n");
console.log("stats", Object.keys(practice.years).length, "years, latest", latestYear);
