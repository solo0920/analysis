#!/usr/bin/env node
/* 為 Mermaid 推導圖產生靜態 SVG fallback。
   來源：site/diagrams/mermaid/manifest.json 中 createDiagram + generatedSvg 的項目。
   產物：site/assets/diagrams-mermaid-static.js 與 site/diagrams/mermaid/static/*.svg
   使用方式：node site/scripts/build-mermaid-static.mjs（需網路與 npm） */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PELE_VERSION = "1.10.0";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const sourceDir = path.join(root, "site", "diagrams", "mermaid");
const staticDir = path.join(sourceDir, "static");
const output = path.join(root, "site", "assets", "diagrams-mermaid-static.js");
const manifest = JSON.parse(fs.readFileSync(path.join(sourceDir, "manifest.json"), "utf8"));
const entries = (manifest.diagrams || []).filter(function (entry) {
  return entry.createDiagram && entry.generatedSvg;
});
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "pele-static-"));

try {
  fs.writeFileSync(path.join(temp, "package.json"), JSON.stringify({ private: true }), "utf8");
  execFileSync("npm", [
    "install",
    "--prefix", temp,
    "--no-audit",
    "--no-fund",
    "--silent",
    "pele@" + PELE_VERSION
  ], { stdio: "inherit" });

  const pelePath = path.join(temp, "node_modules", "pele", "dist", "pele.js");
  const pele = await import("file://" + pelePath);
  fs.mkdirSync(staticDir, { recursive: true });
  const svgs = {};

  entries.forEach(function (entry) {
    const source = fs.readFileSync(path.join(sourceDir, entry.file), "utf8");
    const result = pele.render(source, {
      idPrefix: "static-" + entry.slug,
      fontFamily: "Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif",
      fontSize: 14,
      padding: 10,
      maxWidth: 760
    });
    svgs[entry.key] = result.svg;
    fs.writeFileSync(path.join(staticDir, entry.slug + ".svg"), result.svg, "utf8");
    console.log(entry.key, Math.round(result.width) + "x" + Math.round(result.height), result.svg.length + " bytes");
  });

  const header = [
    "/* 自動產生，請勿直接編輯。",
    "   來源：site/diagrams/mermaid/manifest.json 的 createDiagram 項目。",
    "   產生：node site/scripts/build-mermaid-static.mjs */",
    ""
  ].join("\n");
  fs.writeFileSync(
    output,
    header + "window.MERMAID_STATIC_SVGS = " + JSON.stringify(svgs, null, 2) + ";\n",
    "utf8"
  );
  console.log("已產生 " + path.relative(root, output) + "（" + entries.length + " 張靜態 SVG）");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
