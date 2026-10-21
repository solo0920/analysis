/* 以諾貝爾獎官方 API 比對年表年份與得主（需要網路）。
   用法：node site/scripts/verify-nobel-api.js
   只比對年份與得主姓氏；公式、學說摘述與模型圖不在本腳本範圍。 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const API_URL = "https://api.nobelprize.org/2.1/nobelPrizes?limit=100&nobelPrizeCategory=eco&sort=desc";
const dataFile = path.resolve(__dirname, "..", "assets", "content-nobel.js");

function surname(name) {
  return name.trim().replace(/\s+/g, " ").split(" ").pop().replace(/[.。]/g, "");
}

function surnames(names) {
  return names.split(/[,、;]/).map(surname).filter(Boolean).sort();
}

async function main() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(dataFile, "utf8"), sandbox, { filename: dataFile });
  const rows = sandbox.window.NOBEL_DATA.rows;
  const site = new Map(rows.map(function (row) { return [Number(row.year), row.laureates]; }));

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("官方 API 回應 " + response.status);
  }
  const payload = await response.json();
  const official = new Map(payload.nobelPrizes.map(function (prize) {
    return [Number(prize.awardYear), (prize.laureates || []).map(function (laureate) {
      return laureate.knownName.en;
    })];
  }));

  let failures = 0;
  const years = Array.from(new Set([...site.keys(), ...official.keys()])).sort(function (a, b) { return a - b; });
  years.forEach(function (year) {
    const our = site.get(year);
    const officialNames = official.get(year);
    if (!our || !officialNames) {
      console.log("缺少年份：" + year);
      failures += 1;
      return;
    }
    const expected = surnames(officialNames.join(",")).join("|");
    const actual = surnames(our).join("|");
    if (expected !== actual) {
      console.log("不一致 " + year + "：官方 " + officialNames.join("、") + "；網站 " + our);
      failures += 1;
    }
  });

  console.log("官方屆數：" + official.size + "；網站屆數：" + site.size + "；不一致：" + failures);
  if (failures > 0) {
    process.exit(1);
  }
  console.log("諾貝爾年表年份與得主比對通過（1969–" + Math.max.apply(null, years) + "）。");
}

main().catch(function (error) {
  console.error(String(error));
  process.exit(1);
});
