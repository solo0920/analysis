# Mermaid × Pele 圖表

這裡是第 2–5 步完成後的 Mermaid 母檔。網站執行時會讀取 `manifest.json` 與這些 `.mmd`，由 `site/scripts/build-mermaid-sources.js` 產生 `site/assets/diagrams-mermaid.js`；新推導圖的靜態 SVG fallback 由 `site/scripts/build-mermaid-static.mjs` 產生。切到「MMD」時才用 Pele 即時 render。

## 圖表清單（17 張）

### 既有流程／樹狀圖（12 張）

| 檔案 | 掛載 key | 用途 |
| --- | --- | --- |
| `macro-circular-flow.mmd` | `macro-01#0` | 兩部門循環流量 |
| `macro-gdp-to-gni.mmd` | `macro-01#0-2` | GDP → GNI（NFIA） |
| `macro-gdp-to-pdi.mmd` | `macro-01#2` | 三面法 GDP → PDI |
| `macro-deposit-creation.mmd` | `macro-05#0` | 存款貨幣創造 |
| `macro-financial-flow.mmd` | `macro-11#0` | 直接金融與間接金融 |
| `accounting-cycle.mmd` | `accounting-14#0` | 會計循環 11 步驟 |
| `accounting-statements-notes.mmd` | `accounting-14#0-2` | 四表一附註 |
| `accounting-transaction-to-statements.mmd` | `accounting-14#0-4` | 交易到財務報表 |
| `accounting-revenue-to-ratios.mmd` | `accounting-15#0` | 營業收入 → 淨利 → 比率 |
| `accounting-dupont.mmd` | `accounting-15#1` | 杜邦三階段／五階段 |
| `accounting-four-statements.mmd` | `accounting-23#1` | 四大財務報表連結 |
| `investment-dupont.mmd` | `investment-14#2` | ROE 三因子杜邦分析 |

### 新推導圖（5 張，含靜態 SVG fallback）

| 檔案 | 掛載 key | 用途 |
| --- | --- | --- |
| `macro-model-map.mmd` | `macro-06#0-2` | 古典 → 凱因斯 → IS-LM → AD-AS → Phillips → 新凱因斯 |
| `investment-capm-sml.mmd` | `investment-05#1-2` | 效率前緣 → CAL → 市場組合 → CAPM → SML → α |
| `investment-bond-risk.mmd` | `investment-07#2-2` | 債券價格 → 存續期間 → 凸性 → 價格近似 |
| `investment-option-pricing-map.mmd` | `investment-09#0` | 無套利 → 二項式 → 風險中立 → BS → Greeks |
| `investment-bs-derivation.mmd` | `investment-09#3-2` | Itô → BS PDE → 風險中立期望 → d1/d2 → Greeks |

## 使用方式

1. 修改 `.mmd` 或 `manifest.json`。
2. 重新產生來源資料：

   ```bash
   node site/scripts/build-mermaid-sources.js
   ```

3. 若修改到新推導圖（manifest 中 `createDiagram: true`），再產生靜態 SVG：

   ```bash
   node site/scripts/build-mermaid-static.mjs
   ```

4. 重新整理 `#/lab/mermaid` 或任一掛載章節，切到「MMD」檢查。

## 帶到其他網頁或應用程式

- 每個 `.mmd` 都是標準 Mermaid 12.1 語法，可直接貼到支援 Mermaid 的編輯器、文件或應用程式。
- `classDef` 使用固定色 fallback，因此在一般 Mermaid 環境也有基本配色；網站會再用 `:::accent`／`:::outcome` 與 CSS 變數覆寫成站內色票。
- 網站上的「複製 .mmd」與「下載 .mmd」按鈕直接使用同一份來源，不需要另外維護副本。
- 每張 MMD 模型圖右上角有「顯示 MMD 碼」按鈕；按下後在 MMD SVG 右側顯示原始碼，980px 以下改為上下堆疊。
- 新推導圖的靜態 SVG 另存於 `site/diagrams/mermaid/static/`，可單獨下載或檢查。
- 右上角 ◈ 會同步切換全站 CSS 與 Pele 圖表；風格名稱（紙感／藍圖／極簡／高對比／森林／海洋／夕陽／櫻花／終端機／薰衣草／Apple／Google／Microsoft／Amazon／Meta／Netflix／NVIDIA／Tesla／OpenAI／Anthropic）與網站一致。

## 注意事項

- Pele 目前不支援 `classDef fill:var(--...)`，會產生語法錯誤；請保留固定色 fallback，或把主題交給外部 CSS。
- 連續函數曲線、精確座標、T 字帳與速查表仍保留原本 SVG 或 HTML 表格；相關圖表會以「相關圖表」連到 MMD 地圖。
- 原章節的既有圖預設仍顯示 SVG；新推導圖的 SVG 版是建置時產生的靜態 Pele SVG。
