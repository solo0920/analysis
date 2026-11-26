# 效能優化 Backlog

目前正式站是 Cloudflare Worker static assets。**JS content hash＋長快取已完成**；下一階段是核心 bundle 分科與搜尋索引拆分。建議順序：**核心 bundle 分科 → 搜尋索引拆分**。

## 1. Content-hash 靜態資產與長快取（JS 已完成）

**現況**：`build-asset-manifest.js` 為 157 個 assets JS 產生 12 字元 SHA-256；`bootstrap.js` 以 `?v=<hash>` 載入 bundle，`/assets/*.js` 設 `immutable`。`bootstrap.js`／`asset-manifest.js` 保持 revalidate，CSS 仍 revalidate。
**影響**：核心 bundle、章節／年度分包、搜尋索引、app.js 與 vendor JS 已可長快取；CSS 仍每次 revalidate。
**剩餘建議**：若要把 CSS 也設長快取，需把 `styles.css`／`katex.min.css` 也加入版本化清單；目前先維持 revalidate，避免 HTML 引用舊檔。
**優先級**：JS 已完成；CSS 版本化為低優先。
**工作量**：CSS 0.5 天（可選）。
**風險**：低；`file://` 已確認不附加 query。

## 2. 核心 bundle 分科

**現況**：`content-core-bundle.js` 869KB（gzip 269KB），每頁載入全部科目。
**影響**：章節頁首次載入包含非目前科目的內容。
**建議**：content hash 已完成，可直接拆成 shared index＋per-subject bundle；章節頁只載入該科，搜尋／科目頁再補載。
**工作量**：1–2 天。
**風險**：`EXAM_CONTENT.subjects`、header、搜尋與名詞索引需同步調整。

## 3. 搜尋索引拆分

**現況**：`content-past-exam-search.js` 1.49MB（gzip 437KB），背景載入。
**影響**：首次開啟搜尋或背景載入時傳輸量較大。
**建議**：content hash 已完成，可直接依年度／科目拆分，搜尋時按需載入並合併結果。
**工作量**：1 天。
**風險**：MiniSearch 索引、bigram fuzzy 與排序需保持不變。

## 4. Sitemap per-page lastmod

**現況**：所有 URL 使用同一個 commit 日期。
**影響**：無法反映單頁實際更新。
**建議**：以章節內容檔的最後 commit 日期或 build manifest 產生 per-page lastmod。
**工作量**：半天。
**風險**：低。

## 5. Lighthouse 效能預算

**現況**：2026-11-26 量測 mobile 98／desktop 99，accessibility／best-practices／SEO 皆 100；mobile LCP 1.5s、CLS 0、TBT 140ms，desktop LCP 0.6s。
**建議**：以目前數值為 baseline，設定 LCP ≤2.0s、CLS ≤0.1、TBT ≤200ms 預算；每次大幅改版重跑。分數已很好，分科的主要效益是降低首次載入流量，不必為了分數急著做。
**工作量**：1 小時（每次量測）。
**風險**：低。

## 已完成的小型效能項目

- `og-cover` 由 294KB PNG 改為 163KB JPEG。
- KaTeX 字型快取 7 天。
- `/version.json` no-store。
- JS 語法檢查改單一 Node 進程，`verify.sh` 約 2.4 秒。
- 站內連結檢查 2,774 條、0 斷鏈。
- JS content hash：157 個檔案，`/assets/*.js` 長快取；bootstrap／manifest 例外。
- 建置用原始檔與 solutions 已由 `.assetsignore` 排除（約 2.7MB）。
- 安全 headers：Referrer-Policy、Permissions-Policy、X-Frame-Options、nosniff。
- 連結檢查擴充 `srcset` 與 CSS `url()`（2,774 條、0 斷鏈）。
