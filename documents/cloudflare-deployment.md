# Cloudflare Worker 部署

## 架構

```text
git push origin main
  → GitHub Actions（.github/workflows/deploy.yml）
  → npm ci
  → bash site/scripts/verify.sh
  → npx wrangler deploy
  → Worker static assets（site/）
  → https://analysis.ragdemo.win
```

GitHub 托管原始碼並執行建置與驗證；Cloudflare 只托管 Worker 與 static assets。Cloudflare Workers Builds 的 Git 自動部署已停用，避免同一個 push 重複建置與部署。不部署 GitHub Pages，也不做鏡像；GitHub Pages 已停用。

## GitHub Actions 設定

| 設定 | 值 |
| --- | --- |
| Workflow | `.github/workflows/deploy.yml` |
| Trigger | push `main`、`workflow_dispatch` |
| Runner | `ubuntu-latest` |
| Node version | 22（`actions/setup-node`，npm cache） |
| Build command | `npm ci && bash site/scripts/verify.sh` |
| Deploy command | `npx wrangler deploy` |
| Secret | `CLOUDFLARE_API_TOKEN` |
| Variable | `CLOUDFLARE_ACCOUNT_ID` |

`CLOUDFLARE_API_TOKEN` 使用 Cloudflare「Edit Cloudflare Workers」範本，至少需要 `Workers Scripts:Edit` 與 `Account Settings:Read`，範圍限定 `analysis` Worker 所在帳號。

首次設定：

```bash
gh variable set CLOUDFLARE_ACCOUNT_ID --body <account-id>
gh secret set CLOUDFLARE_API_TOKEN
```

設定完成後，在 Cloudflare Dashboard → Workers & Pages → `analysis` → Settings → Build 停用 Git 自動部署（Disconnect Git repository 或關閉 automatic deployments）。Worker、網域、`wrangler.toml` 與 static assets 設定不變。

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
2. 產生 83 個靜態落地頁與 `sitemap.xml`
3. 平行檢查 JavaScript 語法與內容
4. 驗證 SEO
5. 檢查站內連結
6. 產生 `site/assets/asset-manifest.js`（158 個 JS 的 content hash）
7. 產生 `site/version.json`

目前基準：內容 196,603 項、SEO 612 項、站內連結 2,810 條、完整流程約 1.6 秒（本機，已安裝 `node_modules`）。

`package.json`／`package-lock.json` 固定 `wrangler@4.169.0` 與 `esbuild@0.28.2`。`build-core-bundle.js` 優先使用本地 `node_modules/.bin/esbuild`；找不到時才退回 `npx`，並加上 120 秒 timeout，失敗即停止，不再靜默產生未 minify 的 bundle。

## 自動與手動檢查

| 檢查 | 執行時機 | 內容 |
| --- | --- | --- |
| `bash site/scripts/verify.sh` | GitHub Actions 自動 | JS 語法、內容、SEO、站內連結、`version.json` |
| `node site/scripts/check-ui.js` | 部署前手動 | Chrome CDP：390／1280、深淺主題、首頁／章節／考古題／複習題／搜尋／404、console errors、水平溢出 |
| `bash site/scripts/check-live.sh` | 部署後手動 | 正式站狀態、404、`version.json` 與 commit 比對 |
| axe／Lighthouse | 大幅改版手動 | 無障礙與效能 baseline |

GitHub Actions runner 不保證有 Chrome，因此 `check-ui.js` 沒有接入 `verify.sh`；UI 回歸仍需要在部署前手動跑，不能假設 CI 會把關。

## 社群預覽

`og-cover` 已由 `.png` 改為 `.jpg`，新檔名可繞過既有社群快取。若舊連結仍顯示舊圖，使用 Facebook Sharing Debugger、LinkedIn Post Inspector、X Card Validator 或 LINE 預覽工具重新抓取。

## 建議執行順序

1. GitHub Actions 失敗通知（GitHub 通知設定 → Actions）
2. 確認 Cloudflare Workers Builds 的 Git 自動部署已停用
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
content-*.js（僅建置用原始檔）
content-exam-solutions-*.js
```

避免驗證腳本、文件與只供建置的原始檔被當成 static assets 上傳（約 2.7MB）；runtime bundle 仍保留。

## 安全 headers

`site/_headers` 的 `/*` 規則包含：

```text
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
```

HSTS 由 Cloudflare 維護；CSP 因為站內有 inline script／style，暫不啟用嚴格政策。

## 404

`wrangler.toml` 的 `not_found_handling = "404-page"` 會使用 `site/404.html`。404 頁使用站點根路徑載入樣式，不自動導回，HTTP 狀態維持 404。

## 網域

- 正式站：`https://analysis.ragdemo.win`
- `analysis.solo4study.workers.dev` 與預覽 URL 已關閉，避免重複內容。
- HTTP 會 301 轉 HTTPS，HSTS 已啟用。

## Rollback

Cloudflare → Workers & Pages → `analysis` → Deployments → 選擇前一個成功版本 → Rollback。  
Rollback 後執行 `bash site/scripts/check-live.sh` 確認版本。

也可以從 GitHub Actions 重新執行舊 commit 的 `Deploy` workflow，或對 `main` 執行 `gh workflow run Deploy` 重新部署目前版本。

### Rollback drill

建議在維護窗口做一次，不要在內容編輯中途進行：

1. 記錄目前 `version.json` 的 SHA。
2. 在 Cloudflare Deployments 選前一個成功版本 Rollback。
3. 確認 `version.json` 變成舊 SHA，首頁與章節頁仍回 200。
4. 重新部署目前 `main`（`gh workflow run Deploy` 或 push 一個小 commit）。
5. 再跑 `check-live.sh`，確認版本回到最新。

## 手動維運項目

- GitHub Actions secret／variable：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
- Cloudflare Workers Builds：停用 Git 自動部署，避免與 GitHub Actions 重複建置
- GitHub Actions 失敗通知：Settings → Notifications 或 repository watch 設定
- Cache Rules（若需要更細的快取策略）
- Cloudflare 部署成功／失敗通知：Notifications → Add → Workers → 選擇 `analysis`

## 常見問題

**`/version.json` 404**  
確認 GitHub Actions 的 `Deploy` workflow 已成功，且 `wrangler deploy` 已上傳 `site/version.json`。

**正式站是舊版**  
先看 GitHub Actions 與 Cloudflare Deployments 是否成功；再用 `check-live.sh` 比對版本。必要時 purge cache 或確認 `_headers` 是否生效。

**GitHub Actions 部署失敗**  
確認 repository secret `CLOUDFLARE_API_TOKEN` 與 variable `CLOUDFLARE_ACCOUNT_ID` 已設定，token 具備 `Workers Scripts:Edit` 與 `Account Settings:Read`。

**GitHub Actions 一直排隊**  
Actions 的 `created_at` 與 `run_started_at` 可看出排隊時間。這個 repo 2026-11-25 的舊 Pages workflow 正常約 29–39 秒完成；曾有一次在 GitHub 端排隊 27 分鐘，但 runner 內只跑 24 秒。若遇到長時間排隊，可 Cancel 後 Re-run，或在本機執行 `npm ci && bash site/scripts/verify.sh && npx wrangler deploy` 直接部署。Workflow 已設 `concurrency: cancel-in-progress` 與 15 分鐘 timeout。

**`workers.dev` 仍可開啟**  
在 Cloudflare Worker 的 Domains & Routes 關閉 workers.dev，或使用 API 將 subdomain `enabled` 設為 false。
