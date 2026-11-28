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
  "content-chapter-supplements.js", "content-exam-gap-supplements.js", "content-law-deepdive.js", "content-law-deepdive-2.js",
  "content-law-quickread.js", "content-formula-tex.js", "content.js",
  "content-exam-forecast.js", "content-exam-forecast-answers.js", "content-past-exam-stats.js"
];
const source = files.map(function (file) {
  return "/* " + file + " */\n;(function(){\n" + fs.readFileSync(path.join(assetsDir, file), "utf8") + "\n})();\n";
}).join("\n");
const temp = path.join(assetsDir, ".core-bundle.source.js");
fs.writeFileSync(temp, source);
const out = path.join(assetsDir, "content-core-bundle.js");
const esbuildArgs = [temp, "--minify", "--charset=utf8", "--outfile=" + out];
const localEsbuild = path.resolve(__dirname, "../../node_modules/.bin/esbuild");
const command = fs.existsSync(localEsbuild) ? localEsbuild : "npx";
const args = fs.existsSync(localEsbuild)
  ? esbuildArgs
  : ["--yes", "esbuild@0.28.2", ...esbuildArgs];

if (command === "npx") {
  console.warn("local esbuild not found; falling back to npx (run npm ci to avoid the download)");
}

const result = spawnSync(command, args, {
  stdio: "inherit",
  timeout: 120000
});
fs.rmSync(temp, { force: true });

if (result.error || result.status !== 0) {
  console.error("esbuild failed; core bundle was not generated.");
  console.error("Run npm ci, then retry: node site/scripts/build-core-bundle.js");
  process.exit(1);
}

console.log("core bundle", out, fs.statSync(out).size);
