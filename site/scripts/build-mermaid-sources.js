#!/usr/bin/env node
/* 由 site/diagrams/mermaid/manifest.json 產生 site/assets/diagrams-mermaid.js。
   使用方式：node site/scripts/build-mermaid-sources.js */

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const sourceDir = path.join(root, "site", "diagrams", "mermaid");
const manifestPath = path.join(sourceDir, "manifest.json");
const outputPath = path.join(root, "site", "assets", "diagrams-mermaid.js");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (!manifest || !Array.isArray(manifest.diagrams)) {
  throw new Error("manifest.json 缺少 diagrams 陣列");
}

const entries = {};
manifest.diagrams.forEach(function (diagram) {
  if (!diagram || !diagram.key || !diagram.file) {
    throw new Error("manifest 的 diagram 缺少 key 或 file");
  }
  if (entries[diagram.key]) {
    throw new Error("manifest 的 diagram key 重複：" + diagram.key);
  }
  const filePath = path.join(sourceDir, diagram.file);
  if (!fs.existsSync(filePath)) {
    throw new Error("找不到 Mermaid 來源：" + diagram.file);
  }
  const source = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
  if (!source) {
    throw new Error("Mermaid 來源是空的：" + diagram.file);
  }
  entries[diagram.key] = Object.assign({}, diagram, {
    source: source + "\n"
  });
});

const header = [
  "/* 自動產生，請勿直接編輯。",
  "   來源：site/diagrams/mermaid/*.mmd 與 manifest.json",
  "   產生：node site/scripts/build-mermaid-sources.js */",
  ""
].join("\n");

const related = manifest.related && typeof manifest.related === "object" ? manifest.related : {};
fs.writeFileSync(
  outputPath,
  header +
    "window.MERMAID_DIAGRAMS = " + JSON.stringify(entries, null, 2) + ";\n\n" +
    "window.MERMAID_RELATED = " + JSON.stringify(related, null, 2) + ";\n",
  "utf8"
);

console.log("已產生 " + path.relative(root, outputPath) + "（" + Object.keys(entries).length + " 張圖、" + Object.keys(related).length + " 組相關連結）");
