#!/usr/bin/env node
// 以單一 Node 進程檢查 .js；.mjs 仍交給 node --check 處理 ESM 語法。
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "../..");
let checked = 0;
let failed = 0;

function checkClassic(file) {
  checked += 1;
  try {
    new vm.Script(fs.readFileSync(file, "utf8"), { filename: file });
  } catch (error) {
    failed += 1;
    console.error(file + ": " + error.message);
  }
}

function checkModule(file) {
  checked += 1;
  try {
    execFileSync(process.execPath, ["--check", file], {
      stdio: ["ignore", "ignore", "pipe"]
    });
  } catch (error) {
    failed += 1;
    const detail = error.stderr ? error.stderr.toString().trim() : error.message;
    console.error(file + ": " + detail);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") {
      continue;
    }
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
    } else if (entry.name.endsWith(".mjs")) {
      checkModule(file);
    } else if (entry.name.endsWith(".js")) {
      checkClassic(file);
    }
  }
}

walk(path.join(root, "site"));
console.log("JS syntax: " + checked + " files, failed " + failed);
process.exit(failed ? 1 : 0);
