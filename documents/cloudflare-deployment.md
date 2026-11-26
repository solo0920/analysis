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
6. 產生 `site/assets/asset-manifest.js`（157 個 JS 的 content hash）
7. 產生 `site/version.json`

目前基準：內容 195,435 項、SEO 605 項、站內連結 2,714 條、完整流程約 2.4 秒。

## 自動與手動檢查

| 檢查 | 執行時機 | 內容 |
| --- | --- | --- |
| `bash site/scripts/verify.sh` | Cloudflare build 自動 | JS 語法、內容、SEO、站內連結、`version.json` |
| `node site/scripts/check-ui.js` | 部署前手動 | Chrome CDP：390／1280、深淺主題、首頁／章節／考古題／複習題／搜尋／404、console errors、水平溢出 |
| `bash site/scripts/check-live.sh` | 部署後手動 | 正式站狀態、404、`version.json` 與 commit 比對 |
| axe／Lighthouse | 大幅改版手動 | 無障礙與效能 baseline |

Cloudflare build 環境不保證有 Chrome，因此 `check-ui.js` 沒有接入 `verify.sh`；UI 回歸仍需要在部署前手動跑，不能假設 CI 會把關。

## 社群預覽

`og-cover` 已由 `.png` 改為 `.jpg`，新檔名可繞過既有社群快取。若舊連結仍顯示舊圖，使用 Facebook Sharing Debugger、LinkedIn Post Inspector、X Card Validator 或 LINE 預覽工具重新抓取。

## 建議執行順序

1. Cloudflare 部署失敗通知（風險覆蓋最大）
2. 縮小 Build watch paths
3. Rollback drill（維護窗口執行）
4. Content hash＋長快取
5. 核心 bundle 分科、搜尋索引拆分

## 版本確認

```bash
bash site/scripts/check-live.sh
```

會檢查首頁、`robots.txt`、`sitemap.xml`、章節索引、核心 bundle、404，並比對 `/version.json` 的 commit SHA 與目前 `main`。

## 快取

`site/_headers`：

- HTML／CSS：`public, max-age=0, must-revalidate`
- `/assets/*.js`：`public, max-age=31536000, immutable`（bootstrap 以 `?v=<hash>` 載入）
- `bootstrap.js`／`asset-manifest.js`：例外 revalidate
- `/version.json`：`no-store`
- KaTeX 字型：7 天
- `og-cover.jpg`：1 天

Cloudflare 會把同一個 header 的多條規則合併；若 `/*` 已經設定 `Cache-Control`，較窄的規則要先寫 `! Cache-Control` 移除，再設定新值。`/version.json` 與字型目前都使用這個順序，新增規則時請沿用。

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

### Rollback drill

建議在維護窗口做一次，不要在內容編輯中途進行：

1. 記錄目前 `version.json` 的 SHA。
2. 在 Cloudflare Deployments 選前一個成功版本 Rollback。
3. 確認 `version.json` 變成舊 SHA，首頁與章節頁仍回 200。
4. 重新部署目前 `main`（New deployment 或 push 一個小 commit）。
5. 再跑 `check-live.sh`，確認版本回到最新。

## 手動維運項目

以下設定目前只能在 Cloudflare dashboard 調整：

- Build watch paths 縮小：Settings → Build → Include paths 設為 `site/**`、`wrangler.toml`、`site/scripts/**`；Exclude 保留 `node_modules/**`、`.git/`
- 部署成功／失敗通知：Cloudflare Notifications → Add → Workers Builds → 選擇 `analysis`，至少啟用失敗通知（Email／Webhook）
- Cache Rules（若需要更細的快取策略）
- Workers Builds 的 API token 權限（目前 Wrangler OAuth 沒有 Builds Configuration Edit）

## 常見問題

**`/version.json` 404**  
確認 Build command 是 `bash site/scripts/verify.sh`，且部署已完成。

**正式站是舊版**  
先看 Cloudflare Deployments 是否成功；再用 `check-live.sh` 比對版本。必要時 purge cache 或確認 `_headers` 是否生效。

**`workers.dev` 仍可開啟**  
在 Cloudflare Worker 的 Domains & Routes 關閉 workers.dev，或使用 API 將 subdomain `enabled` 設為 false。
