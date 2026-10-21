# 分析師備考站

證券投資分析人員考試的靜態備考網站，分成總體經濟學、投資學、會計學與證券交易相關法規與實務四個科目。沒有建置流程、沒有框架、沒有後端；內容、SVG 模型圖與 KaTeX 公式都內嵌在 `site/assets/`，可直接開啟或部署到任何靜態主機。

## 線上網站

<https://solo0920.github.io/analysis/>

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `site/` | 實際發佈的靜態網站；`site/index.html` 是入口 |
| `site/assets/` | 內容模組、圖表、樣式與離線 KaTeX |
| `site/scripts/` | 內容驗證與諾貝爾 API 比對腳本，不會被瀏覽器載入 |
| `documents/` | 來源目錄、校對紀錄與系統架構文件 |
| `.github/workflows/pages.yml` | 推送 `main` 後將 `site/` 發佈到 GitHub Pages |

網站架構與資料流見 [`documents/architecture.md`](documents/architecture.md)，內容與來源說明見 [`site/README.md`](site/README.md)。

## 本機預覽

建議使用靜態伺服器：

```bash
python3 -m http.server 8765 --directory site
```

開啟 <http://localhost:8765/>。也可以直接開啟 `site/index.html`；網站使用相對路徑與 hash 路由，`file://` 可正常閱讀，只有外部資料來源連結需要網路。

## GitHub Pages

`.github/workflows/pages.yml` 會在推送 `main` 時：

1.  checkout 專案；
2.  使用 `actions/configure-pages` 設定 Pages；
3.  將 `site/` 上傳為 Pages artifact；
4.  由 `actions/deploy-pages` 發佈。

`site/.nojekyll` 停用 Jekyll 處理；`site/404.html` 會將未知路徑導回站點根目錄。所有資產皆使用相對路徑，因此可直接在 `https://solo0920.github.io/analysis/` 子路徑下運作。

Repository 的 Pages Source 已設為 **GitHub Actions**；若之後重新建立 Pages，請在 Repository Settings → Pages 將 Source 設為 **GitHub Actions**。

## 驗證

```bash
node site/scripts/validate-content.js
for f in site/assets/*.js; do node --check "$f"; done
```

`validate-content.js` 目前執行 5,245 項檢查、失敗 0。諾貝爾年表的年份與得主可另外執行 `node site/scripts/verify-nobel-api.js` 對照官方 API（需要網路）。
