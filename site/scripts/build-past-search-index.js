#!/usr/bin/env node
// 產生考古題全站搜尋索引（題幹全文；不含選項與答案）。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const assetsDir = path.resolve(__dirname, "../assets");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(assetsDir, "content-past-exams.js"), "utf8"), context);
const questions = (context.window.PAST_EXAMS && context.window.PAST_EXAMS.questions) || [];
const index = questions.map(function (question) {
  return {
    id: question.id,
    stem: question.stem,
    year: question.year,
    subject: question.subject,
    sessionId: question.sessionId
  };
});
fs.writeFileSync(path.join(assetsDir, "content-past-exam-search.js"), "// 考古題搜尋索引：題幹全文，預設背景載入。\nwindow.PAST_EXAM_SEARCH_INDEX = " + JSON.stringify(index) + ";\n");
console.log("search index", index.length, fs.statSync(path.join(assetsDir, "content-past-exam-search.js")).size);
