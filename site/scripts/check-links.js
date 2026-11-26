#!/usr/bin/env node
// 檢查靜態 HTML 的站內 href/src 是否有對應檔案。
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const siteDir = path.join(root, "site");
const problems = [];
let checked = 0;

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file, files);
    } else if (entry.name.endsWith(".html")) {
      files.push(file);
    }
  }
  return files;
}

function isExternal(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value);
}

function resolveTarget(sourceFile, raw) {
  const value = raw.split("#")[0].split("?")[0].trim();
  if (!value || isExternal(value)) {
    return null;
  }
  let target = value.startsWith("/")
    ? path.join(siteDir, value)
    : path.resolve(path.dirname(sourceFile), value);
  try {
    target = decodeURIComponent(target);
  } catch (error) {
    /* keep original */
  }
  const candidates = [];
  if (value.endsWith("/")) {
    candidates.push(path.join(target, "index.html"));
  } else {
    candidates.push(target);
    if (!path.extname(target)) {
      candidates.push(target + ".html");
      candidates.push(path.join(target, "index.html"));
    }
  }
  return candidates;
}

const files = walk(siteDir, []);
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const matches = html.matchAll(/\b(?:href|src)="([^"]+)"/g);
  for (const match of matches) {
    const raw = match[1];
    const candidates = resolveTarget(file, raw);
    if (!candidates) {
      continue;
    }
    checked += 1;
    const found = candidates.some(function (candidate) {
      return fs.existsSync(candidate) && fs.statSync(candidate).isFile();
    });
    if (!found) {
      problems.push(path.relative(root, file) + " -> " + raw);
    }
  }
}

console.log("Links checked: " + checked + ", broken: " + problems.length);
if (problems.length) {
  problems.slice(0, 30).forEach(function (problem) {
    console.error(problem);
  });
  if (problems.length > 30) {
    console.error("... and " + (problems.length - 30) + " more");
  }
  process.exit(1);
}
