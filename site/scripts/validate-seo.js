#!/usr/bin/env node
/* SEO 驗證：確認 canonical、Open Graph、JSON-LD、Sitemap、robots.txt 與 llms.txt
   都指向正式網域，且靜態頁面與 Sitemap 一致。
   使用方式：node site/scripts/validate-seo.js */

"use strict";

const fs = require("fs");
const path = require("path");

const siteDir = path.resolve(__dirname, "..");
const origin = "https://analysis.ragdemo.win";
const failures = [];
const checks = [];

function check(condition, message) {
  checks.push(Boolean(condition));
  if (!condition) {
    failures.push(message);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(siteDir, relativePath), "utf8");
}

function walkIndexPages(directory) {
  const pages = [];
  fs.readdirSync(directory, { withFileTypes: true }).forEach(function (entry) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      pages.push.apply(pages, walkIndexPages(fullPath));
    } else if (entry.name === "index.html") {
      pages.push(fullPath);
    }
  });
  return pages;
}

function pageUrl(filePath) {
  const relative = path.relative(siteDir, path.dirname(filePath)).replace(/\\/g, "/");
  return origin + (relative ? "/" + relative + "/" : "/");
}

function parseJsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) {
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    return false;
  }
}

const indexHtml = read("index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
const llms = read("llms.txt");
const builder = read("scripts/build-static-landing-pages.js");
const notFound = read("404.html");

check(indexHtml.includes('<link rel="canonical" href="' + origin + '/">'), "首頁 canonical 不是正式網域");
check(indexHtml.includes('<meta property="og:url" content="' + origin + '/">'), "首頁 og:url 不是正式網域");
check(!indexHtml.includes("solo0920.github.io"), "首頁仍含 GitHub Pages 網域");
check(!indexHtml.includes('https://analysis.ragdemo.win/#/subject/'), "首頁 JSON-LD 科目 URL 仍使用 hash 路由");
check(indexHtml.includes("https://analysis.ragdemo.win/subjects/macro/"), "首頁 JSON-LD 缺少總體經濟學靜態頁");
check(indexHtml.includes("https://analysis.ragdemo.win/subjects/investment/"), "首頁 JSON-LD 缺少投資學靜態頁");
check(indexHtml.includes("https://analysis.ragdemo.win/subjects/accounting/"), "首頁 JSON-LD 缺少會計學靜態頁");
check(indexHtml.includes("https://analysis.ragdemo.win/subjects/law/"), "首頁 JSON-LD 缺少證券法規靜態頁");
const indexJsonLd = parseJsonLd(indexHtml);
check(indexJsonLd && typeof indexJsonLd === "object", "首頁 JSON-LD 無法解析");

check(robots.includes("Sitemap: " + origin + "/sitemap.xml"), "robots.txt 的 Sitemap 不是正式網域");
check(!robots.includes("solo0920.github.io"), "robots.txt 仍含 GitHub Pages 網域");
check(llms.includes(origin), "llms.txt 缺少正式網域");
check(!llms.includes("solo0920.github.io"), "llms.txt 仍含 GitHub Pages 網域");
check(builder.includes('const BASE_URL = "' + origin + '";'), "靜態頁產生器的 BASE_URL 不是正式網域");
check(builder.includes("function resolveUpdated()"), "靜態頁產生器沒有自動更新日期邏輯");
check(notFound.includes('location.hostname === "solo0920.github.io"'), "404 頁沒有依部署環境判斷 base path");

const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map(function (match) {
  return match[1];
});
check(sitemapUrls.length > 0, "Sitemap 沒有 URL");
check(sitemapUrls.every(function (url) { return url.indexOf(origin + "/") === 0; }), "Sitemap 含有非正式網域 URL");
const sitemapLastmods = Array.from(sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)).map(function (match) {
  return match[1];
});
check(sitemapLastmods.length === sitemapUrls.length, "Sitemap 的 lastmod 數量與 URL 不一致");
check(sitemapLastmods.every(function (value) { return /^\d{4}-\d{2}-\d{2}$/.test(value); }), "Sitemap 的 lastmod 格式錯誤");

const pages = walkIndexPages(siteDir);
const pageUrls = pages.map(pageUrl);
const missingFromSitemap = pageUrls.filter(function (url) { return !sitemapUrls.includes(url); });
const extraInSitemap = sitemapUrls.filter(function (url) { return !pageUrls.includes(url); });
check(missingFromSitemap.length === 0, "Sitemap 缺少靜態頁：" + missingFromSitemap.slice(0, 5).join("、"));
check(extraInSitemap.length === 0, "Sitemap 含有不存在的靜態頁：" + extraInSitemap.slice(0, 5).join("、"));

const titles = new Map();
pages.forEach(function (filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const url = pageUrl(filePath);
  const relative = path.relative(siteDir, filePath);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);
  const title = html.match(/<title>([^<]*)<\/title>/);
  const description = html.match(/<meta name="description" content="([^"]*)"/);
  check(Boolean(canonical && canonical[1] === url), relative + " canonical 不是自身網址");
  check(Boolean(ogUrl && ogUrl[1] === url), relative + " og:url 不是自身網址");
  check(Boolean(title && title[1].trim()), relative + " 缺少 title");
  check(Boolean(description && description[1].trim()), relative + " 缺少 description");
  check(!html.includes("solo0920.github.io"), relative + " 仍含 GitHub Pages 網域");
  const jsonLd = parseJsonLd(html);
  check(Boolean(jsonLd), relative + " 缺少或無法解析 JSON-LD");
  if (title && title[1]) {
    check(!titles.has(title[1]), relative + " title 與 " + titles.get(title[1]) + " 重複");
    titles.set(title[1], relative);
  }
});

console.log("SEO 檢查項目：" + checks.length + "，失敗：" + failures.length);
if (failures.length) {
  failures.forEach(function (failure) {
    console.error("- " + failure);
  });
  process.exit(1);
}
console.log("SEO 驗證通過：canonical、Open Graph、JSON-LD、Sitemap、robots.txt 與 llms.txt 一致；靜態頁 " + pages.length + " 頁。");
