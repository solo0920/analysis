# Mermaid × Pele Pilot

這裡是第 1 步 Pilot 的 Mermaid 母檔。網站執行時會讀取 `manifest.json` 與這些 `.mmd`，由 `site/scripts/build-mermaid-sources.js` 產生 `site/assets/diagrams-mermaid.js`；切到「MMD」時才用 Pele 即時 render。

## 檔案

| 檔案 | 掛載 key | 用途 |
| --- | --- | --- |
| `macro-gdp-to-pdi.mmd` | `macro-01#2` | 三面法 GDP → GNI → NNP → NI → PI → PDI |
| `accounting-cycle.mmd` | `accounting-14#0` | 會計循環 11 步驟 |
| `accounting-revenue-to-ratios.mmd` | `accounting-15#0` | 營業收入 → 毛利 → 營業利益 → 稅前淨利 → 淨利 → 比率 |
| `investment-dupont.mmd` | `investment-14#2` | ROE 三因子杜邦分析 |

## 使用方式

1. 修改 `.mmd` 或 `manifest.json`。
2. 執行：

   ```bash
   node site/scripts/build-mermaid-sources.js
   ```

3. 重新整理 `#/lab/mermaid` 或任一掛載章節，切到「MMD」檢查。

## 帶到其他網頁或應用程式

- 每個 `.mmd` 都是標準 Mermaid 12.1 語法，可直接貼到支援 Mermaid 的編輯器、文件或應用程式。
- `classDef` 使用固定色 fallback，因此在一般 Mermaid 環境也有基本配色；網站會再用 `:::accent`／`:::outcome` 與 CSS 變數覆寫成站內色票。
- 網站上的「複製 .mmd」與「下載 .mmd」按鈕直接使用同一份來源，不需要另外維護副本。
- 右上角 ◈ 會同步切換全站 CSS 與 Pele 圖表；風格名稱（紙感／藍圖／極簡／高對比／森林／海洋／夕陽／櫻花／終端機／薰衣草）與網站一致。

## 注意事項

- Pele 目前不支援 `classDef fill:var(--...)`，會產生語法錯誤；請保留固定色 fallback，或把主題交給外部 CSS。
- 這 4 張圖是流程／樹狀圖；連續函數曲線、精確座標、T 字帳與速查表仍保留原本 SVG 或 HTML 表格。
- Pilot 尚未替換原章節的預設圖；預設仍顯示 SVG。
