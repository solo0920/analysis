# 分析師備考站

證券投資分析人員考試的靜態備考網站，分成總體經濟學、投資學、會計學與證券交易相關法規與實務四個科目。沒有前端框架、沒有後端；內容、SVG 模型圖與 KaTeX 公式都內嵌在 `site/assets/`，可直接開啟。建置與驗證由 Node 腳本執行，部署由 GitHub Actions 建置後發佈至 Cloudflare Workers。

## 線上網站

<https://analysis.ragdemo.win/>

## 部署架構

```text
git push origin main
  → GitHub Actions（Deploy workflow）
  → npm ci
  → bash site/scripts/verify.sh
  → npx wrangler deploy
  → Cloudflare Worker static assets
  → https://analysis.ragdemo.win
```

GitHub 托管原始碼並執行建置與驗證；Cloudflare 只托管 Worker 與靜態資產，不再執行 Git 自動建置。Cloudflare 的 Worker 設定由根目錄 `wrangler.toml` 管理，靜態檔案目錄為 `site/`。

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `site/` | 實際發佈的靜態網站；`site/index.html` 是入口 |
| `site/assets/` | 內容模組、圖表、樣式與離線 KaTeX |
| `site/scripts/` | 建置、內容驗證、版本標記與上線檢查腳本，不會被瀏覽器載入 |
| `wrangler.toml` | Cloudflare Worker 名稱、compatibility date 與 static assets 設定 |
| `documents/` | 來源目錄、校對紀錄與系統架構文件 |

網站架構與資料流見 [`documents/architecture.md`](documents/architecture.md)，內容與來源說明見 [`site/README.md`](site/README.md)。

## 本機預覽

建議使用靜態伺服器：

```bash
python3 -m http.server 8765 --directory site
```

開啟 <http://localhost:8765/>。也可以直接開啟 `site/index.html`；網站使用相對路徑與 hash 路由，`file://` 可正常閱讀，只有外部資料來源連結需要網路。

## 開發與驗證

先安裝固定版本的建置工具：

```bash
npm ci
```

內容修改後先跑快速檢查：

```bash
node site/scripts/validate-content.js
node site/scripts/check-js-syntax.js
node site/scripts/check-links.js
```

commit 前跑完整流程：

```bash
bash site/scripts/verify.sh
```

`verify.sh` 會依序完成核心 bundle、靜態落地頁、JavaScript 語法、內容、SEO、站內連結驗證，最後產生 `site/version.json`。目前內容驗證為 195,435 項、失敗 0，站內連結 2,774 條、失敗 0。

需要瀏覽器 runtime 檢查時，先啟動本機伺服器與 Chrome，再執行：

```bash
python3 -m http.server 8765 --directory site
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9223 \
  --user-data-dir=/tmp/analysis-chrome about:blank
node site/scripts/check-ui.js
```

`check-ui.js` 會檢查首頁、章節、考古題、複習題與搜尋在 390／1280、深淺主題下的 `.katex-error`、水平溢出與 console errors。

## 部署流程

1. commit 並 push 到 `main`。
2. GitHub Actions 的 `Deploy` workflow 執行 `npm ci` 與 `bash site/scripts/verify.sh`。
3. 驗證通過後執行 `npx wrangler deploy`，部署 `site/`。
4. 用 `bash site/scripts/check-live.sh` 比對正式站 `/version.json` 與目前 commit。
5. 若需要回復舊版，在 Cloudflare Deployments 選擇前一個版本 Rollback，或從 GitHub Actions 重新執行舊 commit 的 workflow。

GitHub Actions 設定：

| 設定 | 值 |
| --- | --- |
| Workflow | `.github/workflows/deploy.yml` |
| Trigger | push `main`、`workflow_dispatch` |
| Runner | `ubuntu-latest` |
| Node version | `22`（`actions/setup-node`，npm cache） |
| Build | `npm ci && bash site/scripts/verify.sh` |
| Deploy | `npx wrangler deploy` |
| Secret | `CLOUDFLARE_API_TOKEN` |
| Variable | `CLOUDFLARE_ACCOUNT_ID` |

`CLOUDFLARE_API_TOKEN` 使用 Cloudflare「Edit Cloudflare Workers」範本，至少需要 `Workers Scripts:Edit` 與 `Account Settings:Read`。Cloudflare Workers Builds 的 Git 自動部署應停用，避免同一個 push 重複建置與部署。

`package.json` / `package-lock.json` 固定 `wrangler@4.169.0` 與 `esbuild@0.28.2`；`build-core-bundle.js` 優先使用本地 `node_modules/.bin/esbuild`，避免每次建置透過 `npx` 重新下載。

2026-11-28 實測：第一次 GitHub Actions 部署 26 秒（job 23 秒），第二次 20 秒（job 17 秒）；其中 `npm ci` 約 5–6 秒、`verify.sh` 約 2 秒、`wrangler deploy` 約 5 秒。GitHub Repository Settings → Pages 已停用（Pages API 回 404），避免又回到 GitHub Pages 鏡像。

## 授權

本專案的程式碼、網站版面、建置腳本與驗證腳本採用 [MIT License](LICENSE)，著作權人為 Solomon Lee。

MIT 授權僅涵蓋本專案自行撰寫的程式與文件。下列內容不在此授權範圍內，仍屬原權利人或各自來源所有：

- 歷屆考古題、官方試題與解答：著作權屬原命題／公告單位。
- 法規條文與主管機關公告：依全國法規資料庫與各機關規定使用。
- 第三方套件與素材（KaTeX、MiniSearch、Pele 等）：依其隨附授權（見 `site/vendor/` 內的 LICENSE 檔）。
- 各教科書、來源教材的引用與整理：著作權屬原作者與出版商。

轉載、商業使用或大量重製上述內容前，請自行確認來源授權。
