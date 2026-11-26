# Cloudflare Worker 部署

## 架構

```text
git push origin main
  → Cloudflare Workers Builds
  → bash site/scripts/verify.sh
  → npx wrangler deploy
  → Worker static assets（site/）
  → https://analysis.ragdemo.win
```

GitHub 只作為原始碼托管與 push 觸發；不部署 GitHub Pages，也不做鏡像。GitHub Pages 已停用。

## Cloudflare Build 設定

| 設定 | 值 |
| --- | --- |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `bash site/scripts/verify.sh` |
| Deploy command | `npx wrangler deploy` |
| Variables and secrets | `NODE_VERSION=22` |
| Build watch paths | 目前 `*`；可縮小為 `site/**`、`wrangler.toml`、`site/scripts/**` |

## `wrangler.toml`

```toml
name = "analysis"
compatibility_date = "2026-11-26"

[assets]
directory = "./site"
not_found_handling = "404-page"
```

## 建置與驗證

`verify.sh` 會：

1. 建置 `content-core-bundle.js`
2. 產生 82 個靜態落地頁與 `sitemap.xml`
3. 平行檢查 JavaScript 語法與內容
4. 驗證 SEO
5. 檢查站內連結
6. 產生 `site/version.json`

目前基準：內容 195,435 項、SEO 605 項、站內連結 2,713 條、完整流程約 2.4 秒。

## 版本確認

```bash
bash site/scripts/check-live.sh
```

會檢查首頁、`robots.txt`、`sitemap.xml`、章節索引、核心 bundle、404，並比對 `/version.json` 的 commit SHA 與目前 `main`。

## 快取

`site/_headers`：

- HTML／JS：`public, max-age=0, must-revalidate`
- `/version.json`：`no-store`
- KaTeX 字型：7 天
- `og-cover.png`：1 天

## 開發檔排除

`site/.assetsignore` 排除：

```text
scripts/
README.md
SOURCES.md
```

避免驗證腳本與文件被當成 static assets 上傳。

## 404

`wrangler.toml` 的 `not_found_handling = "404-page"` 會使用 `site/404.html`。404 頁使用站點根路徑載入樣式，不自動導回，HTTP 狀態維持 404。

## 網域

- 正式站：`https://analysis.ragdemo.win`
- `analysis.solo4study.workers.dev` 與預覽 URL 已關閉，避免重複內容。
- HTTP 會 301 轉 HTTPS，HSTS 已啟用。

## Rollback

Cloudflare → Workers & Pages → `analysis` → Deployments → 選擇前一個成功版本 → Rollback。  
Rollback 後執行 `bash site/scripts/check-live.sh` 確認版本。

## 手動維運項目

以下設定目前只能在 Cloudflare dashboard 調整：

- Build watch paths 縮小
- 部署成功／失敗通知
- Cache Rules（若需要更細的快取策略）
- Workers Builds 的 API token 權限（目前 Wrangler OAuth 沒有 Builds Configuration Edit）

## 常見問題

**`/version.json` 404**  
確認 Build command 是 `bash site/scripts/verify.sh`，且部署已完成。

**正式站是舊版**  
先看 Cloudflare Deployments 是否成功；再用 `check-live.sh` 比對版本。必要時 purge cache 或確認 `_headers` 是否生效。

**`workers.dev` 仍可開啟**  
在 Cloudflare Worker 的 Domains & Routes 關閉 workers.dev，或使用 API 將 subdomain `enabled` 設為 false。
