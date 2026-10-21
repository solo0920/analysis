# 分析師備考站

為「證券投資分析人員考試」整理的靜態學習網站，分成 **總體經濟學**、**投資學**、**會計學** 與 **證券交易相關法規與實務** 四個獨立科目，並附 **107–115 年歷屆考古題練習庫**。沒有建置流程、沒有框架、沒有後端；所有內容都內嵌在 JavaScript，直接開啟 `index.html` 也能閱讀。全站中文採臺灣繁體中文；英文只保留得主姓名、專有名詞、公式符號、縮寫與技術名稱。

## 章節來源與界線

| 科目 | 權威來源 | 範圍 | 章節呈現方式 |
| --- | --- | --- | --- |
| 總體經濟學 | `documents/gross_economics_contents.md` | Parts 1–2，第 1–13 章，49 個來源節次（另加 1 個補充單元，共 50 節） | 章名、節名、順序與頁碼依來源；Part 標題不顯示頁碼，因為來源未提供 |
| 投資學 | `documents/investment_contents.md` | Parts 1–5，共 16 個列出的章（第 1–11 章、第 13–17 章） | Part、章號與章名依來源；章內「學習重點」是本站複習單元 |
| 會計學 | `documents/accounting_contents.md` | 第 1–23 章，共 41 個具名節次 | 有列節名的章節照原節名呈現；未列節名的章節以「學習重點」標示 |
| 證券交易相關法規與實務 | `documents/test.md`、`documents/securities_law_contents.md`、全國法規資料庫 Open API | 21 章、21 節 | 14 頁提供官方逐條全文（15 部法規、1,507 條）；7 頁以自律規範或主管機關連結與摘要呈現 |
| 歷屆考古題練習庫 | 證基會歷屆試題下載、公開題庫鏡像 | 107–115 年、29 次考試、3,710 題選擇題 | 依年度／科目／次別篩選，提供練習與瀏覽模式；每題標示章節出處與考試次別，科目頁顯示各章出題次數與頻率；申論題、計算題連回原始試題 PDF |

四個科目各自成篇，不共用章節：

- 總體經濟學使用 `gross_economics_contents.md` 的 Parts 1–2（Part 1「總體經濟學」第 1–10 章、Part 2「金融市場」第 11–13 章）；Part 2 仍屬總體經濟學科目，不與投資學共用。
- 投資學只使用 `investment_contents.md` 的 Parts 1–5，不使用總體經濟學的章節（包含其 Part 1 與 Part 2）。
- 投資學來源沒有第十二章，網站保留第十一章到第十三章之間的編號跳號，不自行補章。
- 投資學來源只提供 Part 起始頁，沒有各章頁碼；畫面顯示的是 Part 頁碼，不是推測的章頁碼。
- 投資學來源沒有節名；章內單元標為「學習重點」，不冒充原書的「第 N 節」。
- 會計學使用 `accounting_contents.md` 的第 1–23 章；第 1–7、12–15、20 章有來源節名，依原順序呈現，其餘章節只列章名，章內單元標為「學習重點」。
- 會計學第 23 章來源註明原書章號印刷為 22，本站依順序列為第 23 章，並在章節與使用說明保留註記。
- 證券交易相關法規與實務依 `test.md` 的 21 項測驗範圍整理為 21 頁；官方 15 部法規逐條呈現（1,507 條），公會自律規範與「其他主管機關法令」以官方連結與摘要呈現；法規適用仍以全國法規資料庫與主管機關最新公告為準。
- 歷屆考古題練習庫收錄 107–115 年共 29 次筆試、四個專業科目的 3,710 題選擇題；題目與官方選擇題解答分開保存，練習時先作答再看答案；每題標示章節出處與考試次別，章節頁列出該章出現的年份／次別，科目頁顯示各章出題次數與頻率。申論題與計算題沒有官方選擇題解答，因此不臆造答案，只連回該次考試的原始試題 PDF。
- 考古題以證基會公告的選擇題解答為準；115 年第 1、2 次直接連結證基會官方檔案，107–114 年因官方頁面只保留近期試題，試題連結公開題庫鏡像；107–108 年解答連結公開文字版 PDF，109–114 年解答連結鏡像 PDF，並在每次考試保留試題與解答連結供對照。
- 107–108 年已納入自動練習庫：選擇題解答由使用者提供的逐題轉錄檔（MD／JSON）匯入，並與公開解答 PDF 及原始 JPG 解答抽查核對；兩題官方接受多個答案（108Q3 法規第 28 題 C、D；108Q3 會計第 28 題 B、D）已保留。
- 考古題出處以章節為單位：每題的 `sourceId` 指向同一科目的章節，題目卡可直接連到該章內容；章節頁列出 107–115 年出現的考試次別與題數。科目首頁的章節列顯示「出題次數」與「頻率」，頻率＝該章題數 ÷ 該科總題數。出處依題幹、選項與章節內容比對後建立，作為複習導覽，不代表官方命題分類。

目前規模：4 個科目、73 章、187 個學習單元、1,208 張名詞卡、118 組學習單元 KaTeX 公式（另含比例 32 條、選擇權 13 條、諾貝爾 58 屆）、1,507 條官方法規條文列（含刪除條文）、21 張總體經濟章節模型圖、32 條投資學比例分析公式、5 項選擇權評價優先順序、58 屆諾貝爾經濟學獎年表、17 組諾貝爾模型圖、1 個總體經濟學派演進圖（6 階段、10 個節點、19 個模型連結、15 個諾貝爾里程碑）、29 個資料來源、29 次考古題（3,710 題，全部標示章節出處與出題頻率），並有 1 個總體經濟模型總覽頁、1 個學派演進圖區塊、1 個諾貝爾獎年表頁與 1 個考古題練習庫。21 張模型圖與 29 條投資／總體公式已完成公開教材核對，狀態為「通過（教材）」；這不是官方認證整站。

## 檔案結構

```text
site/
├── index.html                  # 靜態外殼、導覽、搜尋與腳本載入順序
├── 404.html                    # GitHub Pages 未知路徑導回站點根目錄
├── .nojekyll                   # 停用 GitHub Pages 的 Jekyll 處理
├── README.md
├── SOURCES.md                  # 來源清單與校對原則
├── scripts/
│   ├── validate-content.js     # 章節界線、來源引用、模型圖與內容結構驗證
│   └── verify-nobel-api.js     # 諾貝爾官方 API 年份與得主比對（需網路）
└── assets/
    ├── app.js                  # hash routing、搜尋、進度、主題、考古題練習與列印
    ├── styles.css              # 響應式與明暗主題樣式
    ├── favicon.svg
    ├── content.js              # 考試資訊、29 個來源、四科目聚合
    ├── content-macro.js        # 總體經濟學第 1–5 章（第 1 篇）
    ├── content-macro-2.js      # 總體經濟學第 6–10 章（第 1 篇）
    ├── content-macro-3.js      # 總體經濟學第 11–13 章（第 2 篇）
    ├── content-macro-evolution.js # 總體經濟學派演進圖（6 階段、10 節點、15 個諾貝爾里程碑）
    ├── content-investment.js   # 投資學第 1–5 篇、16 章
    ├── content-accounting.js   # 會計學第 1–12 章
    ├── content-accounting-2.js # 會計學第 13–23 章
    ├── content-law.js          # 證券交易相關法規與實務 21 章、21 節
    ├── content-law-articles.js # 官方 15 部法規逐條全文（1,507 條）與自律規範／其他法令連結
    ├── content-formula-tex.js  # 118 個學習單元的 KaTeX 公式與說明
    ├── content-nobel.js        # 58 屆諾貝爾經濟學獎年表與 17 個圖組
    ├── content-past-exams.js   # 107–115 年、29 次、3,710 題考古題、章節出處與選擇題解答
    ├── diagrams-macro.js       # 總體模型圖：第 1、2、5 章
    ├── diagrams-macro-2.js     # 總體模型圖：第 5、6 章
    ├── diagrams-macro-3.js     # 總體模型圖：第 7、8 章
    ├── diagrams-macro-4.js     # 總體模型圖：第 9、10、11 章
    ├── diagrams-macro-5.js     # 總體模型圖：第 12、13 章
    ├── diagrams-nobel.js       # 諾貝爾圖組的 17 張 SVG 模型圖
    └── katex/                  # KaTeX 0.19.0 的 JS、CSS、字型與授權
```

系統分層、載入順序與資料流圖見 [`documents/architecture.md`](../documents/architecture.md)。

## 本機預覽

建議用靜態伺服器：

```bash
python3 -m http.server 8765 --directory site
```

開啟 <http://localhost:8765/>。

也可以直接開啟 `site/index.html`。內容全部內嵌，不需要 `fetch`，所以 `file://` 可正常顯示；只有外部資料來源連結需要網路。

## GitHub Pages

線上網站：<https://solo0920.github.io/analysis/>

`.github/workflows/pages.yml` 會在推送 `main` 時將 `site/` 上傳為 Pages artifact，再以 `actions/deploy-pages` 發佈。`site/.nojekyll` 停用 Jekyll 處理，`site/404.html` 會將未知路徑導回站點根目錄；所有資產使用相對路徑，可直接在 `/analysis/` 子路徑下運作。

Repository 的 Pages Source 已設為 **GitHub Actions**；若之後重新建立 Pages，請在 Repository Settings → Pages 將 Source 設為 **GitHub Actions**。

## 路由

- `#/`：首頁
- `#/subject/macro`：總體經濟學章節地圖（含學派演進圖）
- `#/subject/macro?evolution=1`：直接跳到總體經濟學頁的學派演進圖
- `#/subject/law`：證券交易相關法規與實務章節地圖
- `#/models/macro`：總體經濟模型總覽（13 章分組、21 張章節模型＋17 組諾貝爾模型）
- `#/models/macro?model=model-macro-06-0`：直接跳到模型總覽的指定模型卡，並短暫標示
- `#/models/macro?chapter=nobel`：直接跳到模型總覽的諾貝爾區
- `#/nobel`：歷年諾貝爾經濟學獎逐年雙欄年表（左側屆別資料、右側對應模型圖）
- `#/nobel?group=nobel-01`：跳到指定諾貝爾圖組的首屆列
- `#/nobel?year=2026`：跳到指定屆別
- `#/nobel?table=1`：跳到完整年表與模型圖
- `#/nobel?models=1`：跳到 17 組模型圖索引
- `#/subject/investment`：投資學第 1–5 篇章節地圖
- `#/subject/accounting`：會計學第 1–23 章章節地圖
- `#/past-exams`：歷屆考古題練習庫（107–115 年、29 次、3,710 題選擇題）
- `#/chapter/<id>`：章節內容
- `#/sources`：資料來源
- `#/about`：使用說明與進度重置

## 內容結構

```js
Subject {
  id, name, english, colorClass, tagline, description,
  parts?, note?, chapters
}

Chapter {
  id, number, label?, part?, partTitle?, title, page, summary,
  sourceIds, sections
}

Section {
  title, body, terms, points, memory, formula
}

MacroDiagramMap {
  "chapterId#sectionIndex": {
    sectionTitle, title, caption, svg, variables, parameters, note
  }
}

NobelData {
  meta: { title, english, period, sourceNote, officialUrl },
  groups: [{ id, title, description }],
  rows: [{ year, laureates, field, formula, conclusion, group }]
}

NobelDiagramMap {
  "nobel-XX": {
    title, caption, svg, variables, parameters, note
  }
}

InvestmentRatioFormula[] {
  { id, category, name, formula, latex, note, chapterId, sectionTitle }
}

InvestmentOptionPriority[] {
  { priority, topic, goal, summary, formulas: [{ label, latex }], variables: [{ symbol, definition }], note }
}

PastExamData {
  meta: { title, examName, updated, years, sessionCount, questionCount, subjectCount, scopeNote, sourceNote, officialPageUrl, disclaimer },
  subjects: [{ id, name, short, colorClass }],
  sessions: [{ id, year, session, label, shortLabel, sourceName, questionUrl, answerUrl, questionCount, counts }],
  questions: [{ id, sessionId, year, session, subject, number, stem, options, answer }]
}
```

- 考古題資料集中於 `site/assets/content-past-exams.js` 的 `window.PAST_EXAMS`；`answer` 是官方可接受答案的字母陣列，例如 `["B", "C"]` 代表 B、C 均給分，`["A", "B", "C", "D"]` 代表 A–D 均給分。練習時選到任一個官方可接受答案都算答對。
- 考古題練習進度存在 `localStorage` 的 `analyst-past-exam-progress-v1`，只記錄每題最後一次選擇的字母；不記錄個資、不送到後端。切換年度、科目、次別或搜尋時，練習與瀏覽模式會保留，按「開始練習」才切回練習模式並跳到目前範圍第一題未作答的題目。
- `terms` 是 `[名詞, 定義]` 陣列。
- `formula` 可為空字串；非空時由 `content-formula-tex.js` 的 KaTeX 公式資料渲染。
- **公式一律用 KaTeX**：118 個學習單元的公式集中於 `window.FORMULA_TEX`，以 `章節 ID::節名` 綁定；比例分析 32 條、選擇權 13 條與諾貝爾 58 屆的公式也由 KaTeX 渲染。KaTeX 0.19.0 已放在 `site/assets/katex/`，不依賴 CDN，`file://` 可離線顯示。
- **投資學比例公式只有一份**：`window.INVESTMENT_RATIO_FORMULAS` 同時供 `#/subject/investment` 的「比例分析公式列表」與對應章節使用：`investment-14` 顯示 26 條財務比率，`investment-17` 顯示 6 條風險調整績效與市場時機指標，`investment-04` 的 Sharpe 公式則以 `ratioFormulaId` 引用同一筆資料。每條公式以 `chapterId` 與 `sectionTitle` 綁定章節；修改名稱、公式、LaTeX、說明或綁定位置，投資學頁與章節頁會同步更新。驗證器會檢查章節／節次是否存在、公式是否重複，以及綁定節次不得另有 `formula` 字串，避免雙來源。比例公式的分數以 `\dfrac` 排版，避免 KaTeX 行內模式把分子、分母縮成 0.7 倍，讓公式文字與表格其他欄位同級。
- **選擇權評價優先順序只有一份**：`window.INVESTMENT_OPTION_PRIORITIES` 提供投資學頁面的 5 項準備順序、13 條 KaTeX 公式、36 項變數定義與說明；二項式（含 Put）、Black-Scholes、買賣權平價的公式與變數都從這份資料渲染。
- `variables` 與 `parameters` 都是 `[符號, 名稱, 說明]` 陣列；`svg` 為內嵌的 SVG 字串。
- 模型圖放在 `diagrams-macro*.js`，以「章節 ID#節次索引」對應。`sectionTitle` 由驗證器比對，避免節次搬動後把圖掛錯位置；模型圖只掛在總體經濟學章節。
- 模型圖是概念示意，不是原始教材的掃圖；SVG 直接內嵌，`file://` 也能顯示，不會發出外部圖片請求。
- **模型資料只有一份**：章節頁的 `renderSection()` 與 `#/models/macro` 的 `renderMacroModels()` 都透過 `getDiagram()`／`renderDiagram()` 讀取同一個 `window.MACRO_DIAGRAMS`，總覽頁不複製第二份內容。修改 `diagrams-macro*.js` 中的 SVG、標題、圖說、變數、參數或提醒後，重新載入章節頁與總覽頁都會同步；新增或移除模型圖也會自動反映在總覽頁。
- **學派演進圖只有一份**：`window.MACRO_EVOLUTION`（`content-macro-evolution.js`）只保存階段、學派名稱、提出者、摘要、模型錨點與諾貝爾年份；模型名稱由 `macroModelGroups()` 反查 `MACRO_DIAGRAMS`，諾貝爾年份、得主與領域由 `NOBEL_DATA` 反查，不另存副本。每個模型名稱連到 `#/models/macro?model=<anchor>`，路由會捲動到該模型卡並加上短暫高亮；每個諾貝爾里程碑連到 `#/nobel?year=YYYY`。修改模型圖或諾貝爾資料後，演進圖會同步更新；驗證器會檢查每個錨點與年份都存在。
- **諾貝爾資料只有一份**：年表頁的 `renderNobelPage()` 與模型總覽的諾貝爾區都讀取 `window.NOBEL_DATA` 與 `window.NOBEL_DIAGRAMS`；年表保留原始 58 列，每一列左側是該屆得主、領域、公式與結論，右側直接顯示對應模型圖，17 個圖組以 `nobel-XX` 對應。同一圖組重複出現在多列時，`renderNobelTable()` 會為每份 inline SVG 的內部 ID 加上年度後綴，避免重複 ID。修改任一圖組的 SVG、標題、圖說、變數或參數後，重新載入 `#/nobel` 與 `#/models/macro` 都會同步。
- 模型總覽頁依 13 章分組；沒有模型圖的章節仍會列出並顯示說明。每張模型圖都連回所屬章節與節次，方便交叉閱讀。
- 諾貝爾年表頁保留 1969–2026 的 58 屆與每屆公式，並整合為逐年雙欄：左欄保留屆別、得主、領域、公式與結論，右欄顯示該屆對應的 SVG 模型圖。2025 屆公式已依官方科學背景修正為 g = λ(γ−1) ≈ λ ln(γ)；2026 屆別已納入，年份、得主與官方獎項說明已對照諾貝爾獎官方 API，公式與學說已對照官方 popular information 與 2026 年科學背景；2019–2026 代表原始論文書目已核對；2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall；Woodford 2003 專書未逐條），其餘全文仍待逐條核對。年份可跳到對應圖組首屆，模型圖下方的屆別晶片可跳到同組其他年份；重複圖組只在首次出現時展開完整變數與參數。
- 總體經濟學與投資學都有 `parts`；總體經濟學的 Part 1、Part 2 由 `content-macro-3.js` 在載入時補上並依章號分組，投資學章節則直接帶有 `part` 資訊。
- 會計學沒有篇，章節直接掛在科目下；有來源節名的章節標題為「第N節 …」，補充單元標題為「學習重點 N：…」。
- 投資學章節有 `label`（例如「第一章」），總體經濟學與會計學章號直接來自來源的 `Chapter N`。
- `content-macro-2.js` 與 `content-macro-3.js` 依賴 `window.MACRO_SUBJECT` 已存在，載入順序不可顛倒；`content-accounting-2.js` 依賴 `window.ACCOUNTING_SUBJECT` 已存在；這三個檔案都必須在 `content.js` 之前載入。

## 驗證

```bash
node site/scripts/validate-content.js
for f in site/assets/*.js; do node --check "$f"; done
node site/scripts/verify-nobel-api.js   # 需網路；比對官方 API 的年份與得主
```

`validate-content.js` 會比對三份來源目錄的章號、章名、Part、順序、節次與頁碼，並檢查：

- 總體經濟學恰好 2 個 Part、13 章、50 節（49 個來源節次＋1 個景氣訊號燈補充）。
- 投資學恰好 5 個 Part、16 章、52 個學習重點（45 個來源重點＋7 個測驗範圍補充），且沒有自行補上第十二章。
- 會計學恰好 23 章、41 個具名節次與 23 個補充學習重點；有來源節名的章節逐節比對，未列節名的章節只允許「學習重點」單元。
- 會計學第 23 章保留來源章號印刷為 22 的註記。
- 四個科目沒有互相混入章節；證券法規為 21 章、21 節。
- 章節 ID 不重複、來源 ID 都存在、每個單元都有正文、名詞與考試重點。
- 21 張總體模型圖都掛在存在的章節與節次，且 `sectionTitle` 與內容一致。
- 每張模型圖都有標題、圖說、變數表、參數表與示意提醒；SVG 有 `viewBox`、`role="img"`、`aria-labelledby` 與 `<title>`，且不含外部圖片、腳本或外部連結。
- 模型圖鍵值不得重複；圖數量與檔案內定義的數量必須一致。
- 學派演進圖恰好 6 個階段、10 個學派／理論節點、19 個模型連結與 15 個不同的諾貝爾里程碑；每個節點都有學派名稱、提出者、摘要、模型錨點與延伸章節。
- 演進圖的模型錨點必須存在於 21 張總體模型圖，諾貝爾年份必須存在於 58 屆年表；節點 ID、階段 ID、模型錨點與章節節次都必須有效。
- 諾貝爾年表恰好 58 屆、1969–2026 連續年份，五個欄位齊全，且 2026 屆存在並對應 `nobel-17`。
- 17 組諾貝爾模型與 `NOBEL_DATA.groups` 一一對應，沒有缺圖或孤兒圖；每組都有標題、圖說、變數、參數與提醒。
- 年表每列都有有效的 `group`，且該組存在；每列都有對應模型圖、同組屆別晶片與首屆圖組錨點，年份與圖組可互相跳轉。
- SVG 內部 ID 不得重複，`aria-labelledby` 必須指向存在的 `<title>`；變數與參數的符號不得重複。因為總覽頁會同時載入 21 張章節圖與 17 組諾貝爾圖，驗證器另外檢查跨模型圖的 SVG ID 不得重複。
- 考古題恰好 29 次考試、3,710 題，四個科目總數為法規 910、投資學 924、會計 882、總體 994；年度總數為 107 年 497、108 年 511、109 年 525、110 年 385、111 年 378、112 年 385、113 年 392、114 年 385、115 年 252。
- 每題都有 `sourceId`，指向同一科目的 73 章之一；驗證器檢查 3,710 個出處都存在、科目相符，並固定檢查 73 章的出處題數。章節頁依出處列出 107–115 年的考試次別與題數，科目頁的章節列顯示出題次數與占該科題數的頻率。
- 每次考試的年度、次別、題數與四科分布一致；每題的 `sessionId`、年度、次別、科目與題號都存在，題號在每個考試／科目內從 1 連續編號，題目 ID 不重複。
- 每題都有四個非空選項，答案為 1–4 個不重複的 A–D 字母；`answer` 可含多個官方可接受答案。驗證器也檢查題幹與選項沒有殘留頁首、頁尾或「請填應試號碼」等 PDF 雜訊。
- 115 年第 1、2 次試題與解答連結證基會官方檔案；107–114 年試題連結公開鏡像，107–108 年解答連結公開文字版 PDF。特殊答案另做固定檢查：108Q3 法規第 28 題為 C、D；108Q3 會計第 28 題為 B、D；109Q1 法規第 30 題為 B、D；112Q3 投資學第 16 題與 112Q3 會計第 15 題為 A–D 均給分；114Q1 總體第 14 題為 B、C。
- 共享題組資料另做固定檢查：109Q4 投資學第 11 題的選項不得殘留第 12–13 題的「依下列資訊」與表格；第 12、13 題題幹必須含「如下表所示」及繁榮、蕭條等情境資料。114Q1 投資學第 5–7 題與 115Q2 投資學第 12–15 題也必須各自帶有前一題選項誤植的經濟情境或債券資料。
- 所有考古題題幹與選項禁止出現「題組：」、「題為題組」、「請續背面作答」或「如下表所示」等共享題組標記與頁尾雜訊；112Q2 投資學、114Q2 會計與 115Q2 投資學的題組標記已移除，11 題頁尾「請續背面作答」也已清除。
- 全站中文以臺灣繁體中文為準；英文只保留得主姓名、專有名詞、公式符號、縮寫與技術名稱。內容異動後以 `s2t` 字元掃描或人工複查確認沒有新增簡體字。
- 跨模型初審結果記錄在 `documents/content_review_checklist.md` 與 `documents/reviews/`；模型只作輔助，官方公告與正式教材仍是最終依據。

目前 `validate-content.js` 執行 61,888 項檢查，失敗數為 0（含四個科目章節界線、投資學比例公式綁定、118 個 KaTeX 公式綁定、學派演進圖的模型／諾貝爾綁定、法規全文資料綁定、107–115 年 3,710 題考古題結構／答案／來源連結、73 章出處分布與繁體中文守門檢查）。

諾貝爾年表的年份與得主另以 `site/scripts/verify-nobel-api.js` 對照官方 API；2026-10-20 執行結果為 58 屆、0 筆不一致。此檢查需要網路，不列入離線驗證；2025、2026 屆公式已對照官方科學背景，2019–2020 屆公式與學說方向、2021 LATE 公式與 2022–2024 學說方向亦已核對（2019、2020 網站公式為概念式），2019–2026 代表原始論文書目已核對；2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall；Woodford 2003 專書未逐條）；其餘屆公式、全文、學說摘述與模型圖仍待原始文獻逐條核對。

會計公式 A1–A12 已於 2026-10-20 完成核對：A1、A3、A4、A8、A12 對照 IFRS 官方摘要（IAS 7、IAS 2、IAS 16／36、IAS 12、IAS 33）；A5、A7 對照 IFRS 9.5.4.1 與 IFRS 16.24 準則本文（A7 補入復原成本估計）；A2、A6、A9–A11 對照公開教材。代表性分錄與報表勾稽已於 review 第 2.1 節檢查，另於第 2.2 節抽查租賃、收入分攤、遞延所得稅、合併商譽與資本預算；各章例題逐題重算仍待。完整紀錄見 `documents/reviews/2026-10-20-official-verification.md`。

投資學與總體經濟學 29 條公式亦已於 2026-10-20 完成公開教材逐條核對，全部記為「通過（教材）」；#27 另以 BIS 官方 CIP 定義、#28 另以 SEC Investor.gov 官方 NAV 定義交叉核對。網站 `formula` 欄已補上期間單位與適用假設，例如簡單乘數與貨幣乘數的模型條件、債券票息與殖利率的同週期單位、高登模型的 `r>g`、賣權買權平價的歐式／無股利條件、期貨的連續複利、避險的目標 β、存續期間的付息頻率，以及選擇權到期內在價值與權利金的區分。21 張總體模型圖亦已完成公開教材逐條核對，全部「通過（教材）」；B15 另以 CBC 官方外匯頁交叉核對，B12 的臺灣景氣指標以國發會頁面輔助。

2026-10-20 另以 Chrome CDP 在 1280px 與 390px 檢查 macro-05／06／07／12、`#/sources`、`#/models/macro` 與 `#/nobel`：B5、B8、B16、B17 的修正文字已顯示；B9 的 `SRAS₀`／`SRAS₁` 在章節頁與模型總覽均可見，390px 需在圖表區水平滑動，滑動後兩個標籤可讀；來源頁 26 項且核對進度含 21 張模型圖；模型總覽 38 張 SVG（21 張章節圖＋17 組諾貝爾圖），諾貝爾頁 58 列／58 張 SVG；390px 無水平溢出、0 console errors；`file://` 的 macro-07 可讀且 B9 標籤正常。另以 9 個 `file://` 會計頁面狀態檢查 accounting-02／06／07／13／20／23 與 `#/sources`：修正文字皆顯示，0 缺失、0 水平溢出、0 console errors。諾貝爾頁的 2026「無趨勢簡化」、2025「創新到達率」、2023「後續綜合用語」、2022「Bernanke 的實證研究」與 2019「效果不如原先預期」文字亦已在 1280px／390px 確認，58 張 SVG、0 水平溢出、0 console errors。投資學比例公式列表另在 1280px／390px 檢查 `#/subject/investment`、`#/chapter/investment-14`、`#/chapter/investment-17` 與 `#/chapter/investment-04`：32 條、9 類、0 水平溢出、0 console errors；390px 改為卡片堆疊；32 條公式全部以 KaTeX 排版（29 條為分數）；風險調整績效順序為夏普→索提諾→崔納→詹森→資訊；在記憶體修改 Sharpe 公式後，投資學頁、第 17 章與第 4 章同步顯示。另檢查選擇權評價優先順序：5 列、5 張卡片、13 條 KaTeX 公式（4 條分數）與 36 項變數定義，1280px／390px 均 0 水平溢出、0 console errors。最後以 Chrome CDP 檢查首頁與證券法規：首頁 4 張科目卡、證券法規 21 頁（21 章／21 節）；21 頁的法規全文區塊全部存在，官方全文頁共 1,507 條，law-01 有 244 條（證交法 229＋施行細則 15）、law-02 有 534 條；law-14–18、law-20 與 law-21 的官方連結與摘要正常；條文直接顯示、無需點擊；macro-08 景氣訊號燈、investment-07 利率期限結構、investment-08 交易制度、investment-16 客戶風險態度與稅負、accounting-19 外匯風險等補充單元均顯示；1280px／390px 無水平溢出、0 console errors。KaTeX QA：47 個含公式章節在 1280px／390px 共 94 次頁面檢查，115 個公式區塊全部渲染、0 個 `.katex-error`、0 個 fallback、0 水平溢出；比例公式 32 條、選擇權 13 條、諾貝爾 58 屆公式均正常；`file://` 字型載入成功。

比例公式的 29 條分數另於 2026-10-21 改以 `\dfrac` 排版，避免 KaTeX 行內模式把分子、分母縮成 0.7 倍；實測分子／分母由 9.41px 提升至 13.44px，與表格其他欄位同級。1280px／390px 與 `file://` 檢查 32 條公式（investment-14 26 條、investment-17 6 條、investment-04 Sharpe）均正常，0 水平溢出、0 console errors；加入學派演進圖檢查後，該次 `validate-content.js` 為 43,735 項、失敗 0。

2026-10-21 依 `documents/ExamScope.md` 補充投資學 APT／股價變動因素、利率水準、債券投資組合管理與國內衍生性商品，會計學 IFRS 7 揭露、可轉債拆分、資產負債／毛利／營業外／現金流分析、資金流程、財務槓桿與 IAS 24 關係人揭露，總體經濟貨幣流通速度與臺灣金融市場概況。Chrome CDP 抽查 12 個受影響章節與 law-01，1280px／390px：新增內容皆顯示、0 個 `.katex-error`、0 console errors、390px 無水平溢出；`validate-content.js` 該次 43,735 項、失敗 0。

2026-10-21 另以 Chrome CDP 在 1280px／390px／`file://` 檢查 `#/subject/macro` 的學派演進圖：6 階段、10 個節點、19 個模型連結、15 個諾貝爾里程碑；每個節點都有學派／理論名稱、提出者、摘要與延伸章節。模型名稱可跳到 `#/models/macro?model=<anchor>` 的指定模型卡並短暫高亮（實測 `model-macro-12-1` 目標頂端 90px）；諾貝爾里程碑可跳到 `#/nobel?year=YYYY`；`#/subject/macro?evolution=1` 可捲動到演進圖。明暗主題均正常，頁面無水平溢出，0 console errors。

2026-10-21 新增並擴充 `#/past-exams` 考古題練習庫：107–115 年、29 次、3,710 題，四個科目分別為法規 910、投資學 924、會計 882、總體 994 題。預設顯示 115 年第 2 次（126 題），可切換年度、科目、次別與關鍵字搜尋；練習模式提供選項選取、看答案、上一題／下一題、重新作答、範圍清除與即時得分，瀏覽模式每頁 20 題並可逐題或全部展開答案。作答紀錄存於 `localStorage` 的 `analyst-past-exam-progress-v1`；多答案題以官方可接受字母判定，例如 108Q3 法規第 28 題 C、D，108Q3 會計第 28 題 B、D，109Q1 法規第 30 題 B、D，112Q3 投資學第 16 題與會計第 15 題 A–D 均給分，114Q1 總體第 14 題 B、C。Chrome CDP 在 1280px／390px 與 `file://` 實測篩選、作答、看答案、換題、瀏覽、全部展開、年度切換與搜尋，均 0 水平溢出、0 console errors；`file://` 的 localStorage 也可寫入。驗證器新增 29 次／3,710 題、科目與年度總數、每題四選項、答案字母、題號連續、來源連結、特殊答案與共享題組檢查，總檢查數 61,888、失敗 0。另為全部 3,710 題建立章節出處：每題以 `sourceId` 連到對應章節，科目頁顯示各章出題次數與頻率，章節頁列出出現的年份與考試次別。109Q4 投資學第 11 題原本把第 12–13 題的表格說明併入選項 D，已將表格移到第 12、13 題題幹；114Q1 投資學第 4 題與 115Q2 投資學第 11 題也有同類題組資料，已移到對應題幹。107Q4 投資學第 12–19 題的共享表格已附入各題題幹，第 11 題頁尾「請」與 107Q1 總體第 20 題的符號字型公式均已修正；108Q1 會計第 5 題的貝他符號亦已轉為可讀文字。107–108 年已納入練習庫，解答由使用者提供的逐題轉錄檔匯入，並與公開解答 PDF 及原始 JPG 解答抽查核對。
2026-10-21 補強考古題延伸內容與出處：新增 macro-10 歐債危機／歐豬五國／馬斯垂克條約／對等關稅／黃金儲備／美國國債／ITA，macro-03 穩定幣，macro-11 純網銀，macro-08 一般目的技術（GPT），macro-02 特別預算，macro-04 聯準會主席，macro-12 美國國債；investment-08 臺灣存託憑證、融資自備款、借券成本與二代健保補充保費，investment-16 ESG ETF 與 FTSE 臺灣指數，investment-03 風險值（VaR）；accounting-05「很有可能」機率判斷、accounting-18 查核意見種類；law-01 財務報告申報期限／損害賠償時效／獨立董事補選，law-02 法定盈餘公積／董事提名／PE Fund，law-19 第一上市（-KY）。另將 13 題依補充內容調整到更合適的章節；名詞卡由 1,174 增至 1,208，驗證器 61,888 項、0 失敗，73 章在 390px 實測無水平溢出、0 console errors。

## 更新流程

1. 先更新 `documents/` 下的來源目錄。
2. 修改對應的 `site/assets/content-*.js`；不要用另一個科目的章節補洞。模型圖變更則修改 `site/assets/diagrams-macro*.js`，確認 `sectionTitle` 仍與節次相符。學派演進圖修改 `content-macro-evolution.js`；模型名稱與諾貝爾資料仍分別以 `diagrams-macro*.js`、`content-nobel.js` 為單一來源。諾貝爾年表修改 `content-nobel.js`，圖組修改 `diagrams-nobel.js`，維持 58 列與 17 組的對應。
3. 執行 `node site/scripts/validate-content.js`，確認差異都已被處理；再用 `node --check` 檢查所有 JavaScript。
4. 用瀏覽器檢查首頁、四個科目頁（總體含第 2 篇的第 11–13 章與學派演進圖）、至少一個含模型圖的總體章、`#/models/macro`、`#/models/macro?model=<anchor>` 的模型卡跳轉與高亮、`#/subject/macro?evolution=1`、`#/nobel`、`?group=`／`?year=`／`?table=`／`?models=` 跳轉、搜尋入口（含會計名詞）、`#/sources`、`#/past-exams` 的年度／科目／次別篩選與作答、`#/subject/investment` 的比例公式列表、`#/chapter/investment-14` 的綁定公式，一個會計章，以及證券法規章節。
5. 若修改模型圖，確認總覽頁與原章節顯示相同內容；可暫時修改記憶體中的 `MACRO_DIAGRAMS` 或 `NOBEL_DIAGRAMS`，切換路由檢查資料綁定。諾貝爾頁與模型總覽的諾貝爾區必須同步。
6. 在桌機與 390px 寬度檢查頁面沒有水平溢出；諾貝爾年表在窄螢幕改為上下堆疊，模型圖可在圖表區內滑動；並以 `file://` 開啟確認可閱讀。
7. 若修改公式或模型圖，依 `SOURCES.md` 與 `documents/content_review_checklist.md` 記錄校對結果；29 條投資／總體公式與 21 張總體模型圖已完成公開教材核對，其他屆諾貝爾原始文獻與會計各章例題未逐題重算前保持「待查」。

## 設計限制

- 靜態網站、無建置步驟、無外部套件。
- 模型圖是概念示意，用於理解曲線方向與移動，不提供互動拖曳、數值模擬或實證估計。
- 模型總覽頁是唯讀聚合視圖，不是另一份內容或線上編輯器；更新來源仍是 `diagrams-macro*.js`，變更後重新載入即可在章節頁與總覽頁看到同步結果。
- 窄螢幕下模型圖保留最小寬度，可在圖表區塊內水平滑動，並顯示「圖表較寬」提示；頁面本身不會水平溢出。
- 章節進度存在 `localStorage`，鍵名為 `analyst-prep-progress-v2`；考古題作答存在 `analyst-past-exam-progress-v1`；主題鍵名為 `analyst-theme`。投資學章節已重建，因此不使用舊版 `v1` 章節進度，避免舊章節 ID 對應到新章節。
- 不做即時行情、會員或後端同步；考古題練習是靜態題庫，答案與得分只存在瀏覽器，換裝置不會同步。
- 考古題收錄 107–115 年選擇題；107–108 年解答由使用者提供的逐題轉錄檔匯入，並與公開解答 PDF 及原始 JPG 解答抽查核對。申論題與計算題只連回原始試題，不提供自動評分或臆造答案。
- 諾貝爾年表以使用者提供的《諾貝爾經濟學獎歷年學說》為表格來源；58 屆年份與得主已於 2026-10-20 對照諾貝爾獎官方 API（0 筆不一致），2026 屆官方公告為 Hall 與 Woodford「for microeconomic foundations of macroeconomic stabilisation」。2019–2020 屆公式與學說方向、2021 LATE 公式與 2022–2024 學說方向已對照官方科學背景（2019、2020 網站公式為概念式），2025 屆公式已依官方科學背景修正，2026 屆公式與學說已對照官方 popular information 與科學背景；2019–2026 代表原始論文書目已核對；2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall；Woodford 2003 專書未逐條），其他屆公式、全文、學說摘述與模型圖仍待原始文獻逐條核對，未完成前不宣稱所有公式經官方認證。
- 會計學沒有模型圖，內容以分錄邏輯、公式與報表勾稽為主；23 章中第 8–11、16–19、21–23 章來源只列章名，章內單元標為「學習重點」，不冒充原書節名。會計公式 A1–A12 已核對：A1、A3、A4、A8、A12 依 IFRS 官方摘要，A5、A7 依 IFRS 9.5.4.1 與 IFRS 16.24，A2、A6、A9–A11 依公開教材；代表性分錄與報表勾稽已檢查，另抽查租賃、收入分攤、遞延所得稅、合併商譽與資本預算；各章例題逐題重算仍待。
- 投資學與總體經濟學 29 條公式與 21 張總體模型圖已於 2026-10-20 完成公開教材核對，狀態為「通過（教材）」；#27、#28 另以 BIS 與 SEC 官方資料交叉核對，B15 另以 CBC 官方外匯頁輔助。這不是官方對本站全部內容的認證；諾貝爾其他屆原始文獻與會計各章例題逐題重算仍待。
- 外部連結以臺灣官方與繁體中文資料為主；維基百科只用於名詞初步核對。
- 中文介面與內容採臺灣繁體中文；諾貝爾得主姓名、獎項英文名稱、公式符號、GDP／CAPM 等國際通用縮寫，以及教材原文術語保留原文，以便與官方資料對照。
