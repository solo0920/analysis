#!/usr/bin/env node
// 檢查靜態 HTML 的站內 href/src/srcset 與 CSS url() 是否有對應檔案。
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const siteDir = path.join(root, "site");
const problems = [];
let checked = 0;

function walk(dir, files, extension) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file, files, extension);
    } else if (entry.name.endsWith(extension)) {
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

function checkReference(file, raw) {
  const candidates = resolveTarget(file, raw);
  if (!candidates) {
    return;
  }
  checked += 1;
  const found = candidates.some(function (candidate) {
    return fs.existsSync(candidate) && fs.statSync(candidate).isFile();
  });
  if (!found) {
    problems.push(path.relative(root, file) + " -> " + raw);
  }
}

const htmlFiles = walk(siteDir, [], ".html");
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    checkReference(file, match[1]);
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    match[1].split(",").forEach(function (candidate) {
      const raw = candidate.trim().split(/\s+/)[0];
      if (raw) {
        checkReference(file, raw);
      }
    });
  }
}

const cssFiles = walk(siteDir, [], ".css");
for (const file of cssFiles) {
  const css = fs.readFileSync(file, "utf8");
  for (const match of css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
    checkReference(file, match[2]);
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
