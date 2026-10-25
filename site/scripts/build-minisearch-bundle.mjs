#!/usr/bin/env node
/* 重建 MiniSearch 瀏覽器 bundle（site/assets/vendor/minisearch.min.js）。
   只在第一次開啟搜尋面板時才載入，不影響初始頁面。
   使用方式：node site/scripts/build-minisearch-bundle.mjs（需網路與 npm） */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const MINISEARCH_VERSION = "7.2.0";
const ESBUILD_VERSION = "0.25.10";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const output = path.join(root, "site", "assets", "vendor", "minisearch.min.js");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "minisearch-bundle-"));

try {
  fs.writeFileSync(path.join(temp, "entry.js"), [
    'import MiniSearch from "minisearch";',
    "window.MiniSearch = MiniSearch;"
  ].join("\n"), "utf8");
  fs.writeFileSync(path.join(temp, "package.json"), JSON.stringify({ private: true }), "utf8");

  execFileSync("npm", [
    "install",
    "--prefix", temp,
    "--no-audit",
    "--no-fund",
    "--silent",
    "minisearch@" + MINISEARCH_VERSION,
    "esbuild@" + ESBUILD_VERSION
  ], { stdio: "inherit" });

  execFileSync(path.join(temp, "node_modules", ".bin", "esbuild"), [
    path.join(temp, "entry.js"),
    "--bundle",
    "--minify",
    "--format=iife",
    "--outfile=" + output,
    "--log-level=error"
  ], { stdio: "inherit" });

  const bytes = fs.readFileSync(output);
  const gzip = zlib.gzipSync(bytes);
  console.log(
    "已產生 " + path.relative(root, output) +
    "（" + Math.round(bytes.length / 1024) + " KB，gzip " +
    Math.round(gzip.length / 1024) + " KB；MiniSearch " + MINISEARCH_VERSION + "）"
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
