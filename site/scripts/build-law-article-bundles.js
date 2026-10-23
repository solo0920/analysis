#!/usr/bin/env node
// 從完整法規全文資料，產生各章節專用的法規分包。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const assetsDir = path.resolve(__dirname, "../assets");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(assetsDir, "content-law-articles.js"), "utf8"), context);
const data = context.window.LAW_ARTICLES || {};
Object.keys(data).forEach(function (chapterId) {
  const file = "content-law-articles-" + chapterId + ".js";
  fs.writeFileSync(path.join(assetsDir, file), "// 法規全文（" + chapterId + "）：章節頁專用分包。\nwindow.LAW_ARTICLES = " + JSON.stringify({ [chapterId]: data[chapterId] }, null, 2) + ";\n");
  console.log(chapterId, fs.statSync(path.join(assetsDir, file)).size);
});
