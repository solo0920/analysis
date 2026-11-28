#!/usr/bin/env node
// 產生 site/version.json，供部署後檢查實際上線的 commit。
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "../..");
const out = path.join(root, "site", "version.json");

function gitSha() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch (error) {
    return "";
  }
}

const sha = process.env.WORKERS_CI_COMMIT_SHA
  || process.env.GITHUB_SHA
  || process.env.CF_PAGES_COMMIT_SHA
  || gitSha()
  || "dev";
const branch = process.env.WORKERS_CI_BRANCH || process.env.GITHUB_REF_NAME || process.env.CF_PAGES_BRANCH || "";
const builtAt = new Date().toISOString();

fs.writeFileSync(out, JSON.stringify({ sha, branch, builtAt }, null, 2) + "\n");
console.log("version.json: " + sha + (branch ? " (" + branch + ")" : ""));
