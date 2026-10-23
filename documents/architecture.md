# 分析師備考站 — 系統架構

更新：2026-10-24

本專案是**純靜態單頁網站**。`site/index.html` 只提供固定外殼，所有頁面由 `site/assets/app.js` 依 hash route 渲染到 `#main`。內容以 `window.*` 全域物件在瀏覽器載入，沒有後端、資料庫或執行時 API 請求；效能分包檔由 Node 建置腳本事先產生，瀏覽器端不需要建置。

## 1. 系統概覽

```mermaid
flowchart TB
  subgraph Browser["瀏覽器（file:// 或靜態伺服器）"]
    direction TB
    Shell["index.html<br/>固定外殼、導覽、搜尋對話框"]
    subgraph Data["全域資料層（window.*）"]
      direction TB
      Macro["content-macro.js<br/>content-macro-2.js<br/>content-macro-3.js<br/>MACRO_SUBJECT"]
      Evolution["content-macro-evolution.js<br/>MACRO_EVOLUTION"]
      Investment["content-investment.js<br/>INVESTMENT_SUBJECT<br/>INVESTMENT_RATIO_FORMULAS<br/>INVESTMENT_OPTION_PRIORITIES"]
      Accounting["content-accounting.js<br/>content-accounting-2.js<br/>ACCOUNTING_SUBJECT"]
      Law["content-law.js<br/>LAW_SUBJECT"]
      LawArticles["content-law-articles.js<br/>LAW_ARTICLES"]
      Formula["content-formula-tex.js<br/>FORMULA_TEX"]
      Aggregate["content.js<br/>EXAM_CONTENT<br/>EXAM_SOURCES"]
      MacroDiagrams["diagrams-macro*.js<br/>MACRO_DIAGRAMS"]
      Nobel["content-nobel.js<br/>NOBEL_DATA"]
      NobelDiagrams["diagrams-nobel.js<br/>NOBEL_DIAGRAMS"]
    end
    App["app.js<br/>Hash Router · View Renderers<br/>Search · Progress · Theme · Deep Links"]
    Katex["assets/katex/<br/>離線 KaTeX"]
    Styles["assets/styles.css<br/>響應式、明暗主題、列印"]
    Views["#main 渲染結果<br/>首頁／科目／章節／模型總覽／諾貝爾／來源"]
    Store[("localStorage<br/>analyst-prep-progress-v2<br/>analyst-theme")]
  end

  Sources["documents/*.md<br/>來源目錄與章節界線"]
  Official["官方網站與 API<br/>全國法規資料庫 · 諾貝爾 API · IFRS 等"]
  Validate["scripts/validate-content.js<br/>Node vm 載入內容並檢查"]
  Verify["scripts/verify-nobel-api.js<br/>線上比對年份與得主"]

  Sources --> Macro
  Sources --> Investment
  Sources --> Accounting
  Sources --> Law
  Official -.->|核對| Law
  Official -.->|核對| Nobel

  Macro --> Aggregate
  Investment --> Aggregate
  Accounting --> Aggregate
  Law --> Aggregate
  Aggregate --> App
  Evolution --> App
  LawArticles --> App
  Formula --> App
  MacroDiagrams --> App
  Nobel --> App
  NobelDiagrams --> App

  Evolution -.->|錨點存在檢查| MacroDiagrams
  Evolution -.->|年份存在檢查| Nobel

  Shell -->|提供掛載點| App
  Shell --> Styles
  Shell --> Katex
  App -->|innerHTML| Views
  Styles --> Views
  Katex --> App
  App <--> Store

  Validate -.->|開發時讀取| Aggregate
  Validate -.->|讀取模型圖| MacroDiagrams
  Validate -.->|讀取公式| Formula
  Validate -.->|比對目錄| Sources
  Verify -.->|讀取| Nobel
  Verify -.->|HTTPS| Official

  classDef client fill:#e8f4f2,stroke:#0f5c5c,color:#123;
  classDef data fill:#f7f1e3,stroke:#a67c00,color:#332;
  classDef source fill:#f4f4f4,stroke:#777,color:#222;
  classDef tooling fill:#f0eef8,stroke:#5b4b8a,color:#221;
  class Shell,App,Views,Store client;
  class Macro,Evolution,Investment,Accounting,Law,LawArticles,Formula,Aggregate,MacroDiagrams,Nobel,NobelDiagrams data;
  class Sources,Official source;
  class Validate,Verify tooling;
```

## 2. 載入順序與分包

`index.html` 先載入 `bootstrap.js`；bootstrap 依目前 hash 決定需要的 bundle，下載完成後才載入 KaTeX 與 `app.js`。首頁與考前猜題只需要核心 bundle；章節、年度考古題、法規全文、圖表與搜尋索引再按路由載入。所有 script 使用 `async=false`：可平行下載，但依插入順序執行。

```mermaid
flowchart LR
  HTML["index.html"] --> B["bootstrap.js<br/>路由判斷／載入缺少 bundle"]
  B --> Core["content-core-bundle.js<br/>科目內容＋考前猜題＋統計"]
  Core --> App["katex.min.js → app.js"]
  B -.->|章節| Chapter["content-chapter-data-<id>.js"]
  B -.->|年度| Year["content-past-exams-year-YYYY.js"]
  B -.->|全部年度| All["content-past-exams.js"]
  B -.->|法規| Law["content-law-articles-<id>.js"]
  B -.->|圖表| Diagrams["diagrams-*.js"]
  B -.->|按需| Search["content-past-exam-search.js"]
```

核心 bundle 由 `build-core-bundle.js` 合併並以 esbuild minify（`--charset=utf8`）；年度、章節、法規與搜尋索引分別由 `build-practice-year-bundles.js`、`build-chapter-data-bundles.js`、`build-law-article-bundles.js`、`build-past-search-index.js` 產生。

## 3. 執行時請求與跨 bundle 切換

```mermaid
sequenceDiagram
  autonumber
  actor U as 使用者
  participant H as index.html
  participant B as bootstrap.js
  participant D as 全域資料
  participant A as app.js
  participant S as localStorage

  U->>H: 開啟 index.html#/chapter/law-01
  H->>B: 載入 bootstrap.js
  B->>B: requiredBundlesFor(hash)
  B->>D: 載入核心、章節、法規全文、圖表、KaTeX、app.js
  A->>D: hydrateData() 建立科目／章節／練習索引
  A->>A: renderChapter()
  A->>S: 讀取進度與主題
  U->>B: 點擊年度或另一章節（hashchange）
  B->>B: 只載入缺少的 bundle
  B->>A: __softRefreshApp()
  A->>D: 重新 hydrate，不重新載入頁面
  A->>A: render() 新路由
```

跨 bundle 導覽不再 `location.reload()`；bootstrap 以 `stopImmediatePropagation()` 暫停 app 對舊資料的 render，待缺少 bundle 載入後呼叫 `window.__softRefreshApp()`。章節資料註冊於 `window.CHAPTER_DATA`、年度資料註冊於 `window.PAST_EXAMS_YEAR_BUNDLES`，因此切回已載入的章節或年度仍能取得正確資料。載入失敗時保留重試與最後的整頁重新載入 fallback。

## 4. 路由與視圖

| Hash route | 渲染函式 | 主要資料來源 |
| --- | --- | --- |
| `#/` | `renderHome()` | `EXAM_CONTENT` |
| `#/subject/:id` | `renderSubject()` | 科目內容、模型圖、學派演進圖、投資學公式 |
| `#/chapter/:id` | `renderChapter()` | 章節內容、KaTeX、法規全文、模型圖、`CHAPTER_DATA` |
| `#/past-exams` | `renderPastExams()` | 年度分包、`PAST_EXAMS_YEAR_BUNDLES`、統計 |
| `#/past-exams/written` | `renderWrittenExams()` | `PAST_EXAMS_WRITTEN`、版型 |
| `#/exam-forecast` | `renderExamForecastPage()` | 核心 `EXAM_FORECAST`、`EXAM_FORECAST_ANSWERS` |
| `#/investment/formulas` | `renderInvestmentFormulasPage()` | 投資學公式庫與技術指標 |
| `#/macro-current` | `renderMacroCurrentEvents()` | `MACRO_CURRENT_EVENTS` |
| `#/models/macro` | `renderMacroModels()` | `MACRO_DIAGRAMS`、`NOBEL_DATA`、`NOBEL_DIAGRAMS` |
| `#/nobel` | `renderNobelPage()` | `NOBEL_DATA`、`NOBEL_DIAGRAMS` |
| `#/sources` | `renderSources()` | `EXAM_CONTENT.sources` |
| `#/about` | `renderAbout()` | 靜態說明與 `localStorage` 進度 |

深層連結由 `render()` 在寫入 `#main` 後處理：

- `#/subject/macro?evolution=1` → `#macro-evolution`
- `#/models/macro?model=model-macro-06-0` → 指定 `.models-entry`，短暫加上 `.is-targeted`
- `#/models/macro?chapter=nobel` → `#models-nobel`
- `#/nobel?year=YYYY` → `#nobel-YYYY`
- `#/nobel?group=nobel-XX` → `#nobel-group-nobel-XX`
- `#/nobel?table=1` → `#nobel-table`
- `#/nobel?models=1` → `#nobel-models`
- `#/chapter/:id?section=N` → `#section-N`

## 5. 資料契約與單一來源

| 全域物件 | 定義檔案 | 用途 |
| --- | --- | --- |
| `window.EXAM_CONTENT` | `content.js` | 四科目聚合、首頁文案、來源清單、學習流程 |
| `window.MACRO_SUBJECT` | `content-macro*.js` | 總體經濟學 13 章與 50 個學習單元 |
| `window.INVESTMENT_SUBJECT` | `content-investment.js` | 投資學 16 章與 48 個學習重點 |
| `window.ACCOUNTING_SUBJECT` | `content-accounting*.js` | 會計學 23 章與 64 個單元 |
| `window.LAW_SUBJECT` | `content-law.js` | 證券法規 21 章、21 節 |
| `window.LAW_ARTICLES` | `content-law-articles.js` | 15 部官方 1,507 條法規全文與外部法令摘要 |
| `window.FORMULA_TEX` | `content-formula-tex.js` | 以「章節 ID::節名」綁定的 KaTeX 公式 |
| `window.INVESTMENT_RATIO_FORMULAS` | `content-investment.js` | 投資學 32 條比例分析公式的單一來源 |
| `window.INVESTMENT_OPTION_PRIORITIES` | `content-investment.js` | 7 項選擇權評價優先順序與 30 條公式 |
| `window.MACRO_DIAGRAMS` | `diagrams-macro*.js` | 21 張總體章節模型圖，鍵為 `chapterId#sectionIndex` |
| `window.MACRO_EVOLUTION` | `content-macro-evolution.js` | 6 階段、10 節點、模型錨點與諾貝爾年份 |
| `window.NOBEL_DATA` | `content-nobel.js` | 58 屆諾貝爾年表、17 個圖組 |
| `window.NOBEL_DIAGRAMS` | `diagrams-nobel.js` | 17 組諾貝爾模型 SVG |
| `window.EXAM_FORECAST` | `content-exam-forecast.js` | 97 題組／118 個部分、系列標籤與整合公式 |
| `window.PAST_EXAM_STATS` | `content-past-exam-stats.js` | 章節／年度／科目題數統計（核心） |
| `window.PAST_EXAMS_YEAR_BUNDLES` | `content-past-exams-year-*.js` | 已載入年度題庫，供年度切換合併 |
| `window.CHAPTER_DATA` | `content-chapter-data-*.js` | 各章考古題／申論題／解題 |
| `window.PAST_EXAM_SEARCH_INDEX` | `content-past-exam-search.js` | 3,710 題考古題搜尋索引（按需） |
| `window.LAW_ARTICLES` | `content-law-articles-*.js` | 法規全文；章節分包載入時合併 |

單一來源規則：

- 章節頁與模型總覽都讀同一份 `MACRO_DIAGRAMS`；模型總覽不複製內容。
- 學派演進圖不複製模型名稱或諾貝爾得主，而是用錨點與年份反查 `MACRO_DIAGRAMS`、`NOBEL_DATA`。
- 諾貝爾年表頁與模型總覽的諾貝爾區都讀同一份 `NOBEL_DATA`、`NOBEL_DIAGRAMS`。
- 投資學比例公式與選擇權公式各自只有一份資料，章節頁與科目頁共用。
- 驗證腳本以 Node `vm` 載入同一批 `site/assets/*.js`，不維護第二套內容模型。
- 模組化資料維持「單一來源」：年度與章節分包只是同一份完整題庫的切片；搜尋索引由完整題庫產生，不改寫題目。

## 6. 驗證與開發工具

```mermaid
flowchart LR
  Sources["documents/*.md<br/>章節目錄與界線"] --> Validate["validate-content.js"]
  Assets["site/assets/*.js<br/>content、diagrams、formula"] --> Validate
  Validate --> Checks["154,272 項結構檢查<br/>章節／公式／模型／法規／分包／繁中守門"]
  Checks -->|失敗| Fail["非 0 結束碼<br/>列出失敗訊息"]
  Checks -->|通過| Pass["結束碼 0<br/>可提交"]
  Nobel["content-nobel.js"] --> Verify["verify-nobel-api.js"]
  API["Nobel Prize API"] --> Verify
  Verify --> Result["年份與得主比對結果"]
```

- `validate-content.js`：離線執行，檢查章節界線、來源引用、公式綁定、模型圖、學派演進圖、法規全文與繁體中文守門。
- `verify-nobel-api.js`：需要網路，只比對諾貝爾年表的年份與得主，不檢查公式或模型圖。
- 這兩個腳本只在開發／驗證時執行，不會被 `index.html` 載入，也不會增加瀏覽器執行時負擔。

## 7. GitHub Pages 部署

```mermaid
flowchart LR
  Dev["推送 main"] --> Actions["GitHub Actions<br/>pages.yml"]
  Actions --> Checkout["checkout"]
  Checkout --> Configure["configure-pages"]
  Configure --> Upload["upload-pages-artifact<br/>path: site"]
  Upload --> Deploy["deploy-pages"]
  Deploy --> Live["GitHub Pages<br/>solo0920.github.io/analysis/"]
```

- `site/` 是唯一的發佈目錄；`documents/`、`specs/`、`.specify/` 與驗證腳本不會進入 Pages artifact。
- `site/.nojekyll` 停用 Jekyll 處理；workflow 以 `include-hidden-files: true` 將它納入 artifact。
- `site/404.html` 將未知路徑導回站點根目錄。
- 所有 CSS、JavaScript、SVG 與 KaTeX 字型都使用相對路徑，因此可在 `/analysis/` 子路徑下運作。
- 推送 `main` 或手動執行 workflow 都會重新部署；`site/**` 與 workflow 檔變更才會觸發自動部署。

## 8. 倉庫目錄分層

| 目錄 | 角色 | 瀏覽器執行時載入 |
| --- | --- | --- |
| `site/` | 靜態網站、內容模組、圖表、樣式與驗證腳本 | 是（`site/scripts/` 除外） |
| `documents/` | 來源目錄、校對紀錄、官方核對與架構文件 | 否 |
| `specs/` | 功能規格與需求文件 | 否 |
| `.specify/` | Spec Kit 工作流程、範本與整合設定 | 否 |
| `research/` | 研究資料與摘要 | 否 |

## 9. 設計限制

- 執行時無建置步驟、無框架、無後端；分包檔由 Node 腳本事先產生，`file://` 可直接開啟。
- 所有內容與 SVG 都內嵌在 JavaScript 或分包檔，執行時不 `fetch` 本地資料；跨 bundle 切換以動態 `<script>` 載入。
- 只有外部來源連結與 `verify-nobel-api.js` 需要網路。
- 進度與主題存在 `localStorage`；清除瀏覽器資料即重置。
- 模型圖是概念示意，不提供互動拖曳或數值模擬。
- 官方公告與正式教材仍是最終依據；網站驗證通過不代表官方認證。
