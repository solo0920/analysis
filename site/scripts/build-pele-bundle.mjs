#!/usr/bin/env node
/* 重建樹搖後的 Pele flowchart bundle（site/assets/vendor/pele-flow.min.js）。
   需要網路與 npm；網站本身不需要 npm 或建置步驟。
   使用方式：node site/scripts/build-pele-bundle.mjs */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const PELE_VERSION = "1.10.0";
const ESBUILD_VERSION = "0.25.10";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const output = path.join(root, "site", "assets", "vendor", "pele-flow.min.js");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "pele-bundle-"));

const entry = [
  'import { register, mount, render } from "pele/core";',
  'import flowchart from "pele/diagrams/flowchart";',
  "register(flowchart);",
  "window.PeleFlow = { mount, render };"
].join("\n");

try {
  fs.writeFileSync(path.join(temp, "entry.js"), entry, "utf8");
  fs.writeFileSync(path.join(temp, "package.json"), JSON.stringify({ private: true }), "utf8");

  execFileSync("npm", [
    "install",
    "--prefix", temp,
    "--no-audit",
    "--no-fund",
    "--silent",
    "pele@" + PELE_VERSION,
    "esbuild@" + ESBUILD_VERSION
  ], { stdio: "inherit" });

  execFileSync(path.join(temp, "node_modules", ".bin", "esbuild"), [
    path.join(temp, "entry.js"),
    "--bundle",
    "--minify",
    "--format=iife",
    "--global-name=PeleFlowBundle",
    "--outfile=" + output,
    "--log-level=error"
  ], { stdio: "inherit" });

  const bytes = fs.readFileSync(output);
  const gzip = zlib.gzipSync(bytes);
  console.log(
    "已產生 " + path.relative(root, output) +
    "（" + Math.round(bytes.length / 1024) + " KB，gzip " +
    Math.round(gzip.length / 1024) + " KB；Pele " + PELE_VERSION + "）"
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
