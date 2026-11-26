# 分析師備考站

證券投資分析人員考試的靜態備考網站，分成總體經濟學、投資學、會計學與證券交易相關法規與實務四個科目。沒有前端框架、沒有後端；內容、SVG 模型圖與 KaTeX 公式都內嵌在 `site/assets/`，可直接開啟。建置與驗證由 Node 腳本執行，部署由 Cloudflare Workers Builds 自動完成。

## 線上網站

<https://analysis.ragdemo.win/>

## 部署架構

```text
git push origin main
  → Cloudflare Workers Builds
  → bash site/scripts/verify.sh
  → npx wrangler deploy
  → Cloudflare Worker static assets
  → https://analysis.ragdemo.win
```

GitHub 只作為原始碼托管與 push 觸發，不部署 GitHub Pages，也不做鏡像。Cloudflare 的 Worker 設定由根目錄 `wrangler.toml` 管理，靜態檔案目錄為 `site/`。

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

內容修改後先跑快速檢查：

```bash
node site/scripts/validate-content.js
node site/scripts/check-js-syntax.js
```

commit 前跑完整流程：

```bash
bash site/scripts/verify.sh
```

`verify.sh` 會依序完成核心 bundle、靜態落地頁、JavaScript 語法、內容、SEO 驗證，最後產生 `site/version.json`。目前內容驗證為 195,435 項、失敗 0。

## 部署流程

1. commit 並 push 到 `main`。
2. Cloudflare Workers Builds 自動執行 `bash site/scripts/verify.sh`。
3. 驗證通過後執行 `npx wrangler deploy`，部署 `site/`。
4. 用 `bash site/scripts/check-live.sh` 比對正式站 `/version.json` 與目前 commit。
5. 若需要回復舊版，在 Cloudflare Deployments 選擇前一個版本 Rollback。

Cloudflare Build 設定應為：

| 設定 | 值 |
| --- | --- |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `bash site/scripts/verify.sh` |
| Deploy command | `npx wrangler deploy` |
| Node version | `NODE_VERSION=22` |

GitHub Repository Settings → Pages 應設為 **None／停用**，避免又回到 GitHub Pages 鏡像。

## 授權

本專案的程式碼、網站版面、建置腳本與驗證腳本採用 [MIT License](LICENSE)，著作權人為 Solomon Lee。

MIT 授權僅涵蓋本專案自行撰寫的程式與文件。下列內容不在此授權範圍內，仍屬原權利人或各自來源所有：

- 歷屆考古題、官方試題與解答：著作權屬原命題／公告單位。
- 法規條文與主管機關公告：依全國法規資料庫與各機關規定使用。
- 第三方套件與素材（KaTeX、MiniSearch、Pele 等）：依其隨附授權（見 `site/vendor/` 內的 LICENSE 檔）。
- 各教科書、來源教材的引用與整理：著作權屬原作者與出版商。

轉載、商業使用或大量重製上述內容前，請自行確認來源授權。
