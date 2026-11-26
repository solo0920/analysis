# 效能優化 Backlog

目前正式站是 Cloudflare Worker static assets；以下為尚未完成、需要較大架構調整的效能項目。

## 1. Content-hash 靜態資產與長快取

**現況**：HTML／JS 使用固定檔名，`Cache-Control: public, max-age=0, must-revalidate`。  
**影響**：重複訪客仍需 revalidate；無法使用 `immutable` 長快取。  
**建議**：建置時產生 content hash 檔名與 manifest，HTML／bootstrap 依 manifest 載入；`/assets/*` 設 `max-age=31536000, immutable`。  
**工作量**：1–2 天。  
**風險**：需同步 `index.html`、`bootstrap.js`、動態 bundle 與 `file://` 載入。

## 2. 核心 bundle 分科

**現況**：`content-core-bundle.js` 869KB（gzip 269KB），每頁載入全部科目。  
**影響**：章節頁首次載入包含非目前科目的內容。  
**建議**：拆成 shared index＋per-subject bundle；章節頁只載入該科，搜尋／科目頁再補載。  
**工作量**：1–2 天。  
**風險**：`EXAM_CONTENT.subjects`、header、搜尋與名詞索引需同步調整。

## 3. 搜尋索引拆分

**現況**：`content-past-exam-search.js` 1.49MB（gzip 437KB），背景載入。  
**影響**：首次開啟搜尋或背景載入時傳輸量較大。  
**建議**：依年度／科目拆分，搜尋時按需載入並合併結果。  
**工作量**：1 天。  
**風險**：MiniSearch 索引、bigram fuzzy 與排序需保持不變。

## 4. Sitemap per-page lastmod

**現況**：所有 URL 使用同一個 commit 日期。  
**影響**：無法反映單頁實際更新。  
**建議**：以章節內容檔的最後 commit 日期或 build manifest 產生 per-page lastmod。  
**工作量**：半天。  
**風險**：低。

## 5. Lighthouse 效能預算

**現況**：上次 mobile Lighthouse 88、LCP 3.6s（遷移前）。  
**建議**：建立 mobile／desktop baseline，設定 LCP、CLS、TBT 預算；每次大幅改版重跑。  
**工作量**：1 小時（每次量測）。  
**風險**：低。

## 已完成的小型效能項目

- `og-cover` 由 294KB PNG 改為 163KB JPEG。
- KaTeX 字型快取 7 天。
- `/version.json` no-store。
- JS 語法檢查改單一 Node 進程，`verify.sh` 約 2.4 秒。
- 站內連結檢查 2,713 條、0 斷鏈。
