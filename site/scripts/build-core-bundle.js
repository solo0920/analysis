#!/usr/bin/env node
// 將核心科目資料合併成單一 bundle；有 esbuild 時順便 minify。
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const assetsDir = path.resolve(__dirname, "../assets");
const files = [
  "content-macro.js", "content-macro-2.js", "content-macro-3.js",
  "content-investment.js", "content-investment-formulas.js", "content-investment-technical.js",
  "content-accounting.js", "content-accounting-2.js", "content-law.js",
  "content-chapter-supplements.js", "content-law-deepdive.js", "content-law-deepdive-2.js",
  "content-law-quickread.js", "content-formula-tex.js", "content.js",
  "content-exam-forecast.js", "content-exam-forecast-answers.js", "content-past-exam-stats.js"
];
const source = files.map(function (file) {
  return "/* " + file + " */\n;(function(){\n" + fs.readFileSync(path.join(assetsDir, file), "utf8") + "\n})();\n";
}).join("\n");
const temp = path.join(assetsDir, ".core-bundle.source.js");
fs.writeFileSync(temp, source);
const out = path.join(assetsDir, "content-core-bundle.js");
const result = spawnSync("npx", ["--yes", "esbuild", temp, "--minify", "--charset=utf8", "--outfile=" + out], { stdio: "inherit" });
if (result.status !== 0) {
  fs.writeFileSync(out, "// 由 build-core-bundle.js 產生（未 minify）\n" + source);
}
fs.rmSync(temp, { force: true });
console.log("core bundle", out, fs.statSync(out).size);
