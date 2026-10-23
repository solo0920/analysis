# 資料來源與校對

本網站以臺灣官方網站與繁體中文公開資料為主。維基百科只用於名詞初步核對，不取代官方公告、統計或正式教材。

## 章節權威來源

| 科目 | 檔案 | 使用範圍 | 注意事項 |
| --- | --- | --- | --- |
| 總體經濟學 | `documents/gross_economics_contents.md` | Parts 1–2，第 1–13 章、49 個來源節次（另加 1 個補充單元，共 50 節） | 章名、節名、順序、頁碼依來源；Part 起始頁來源未提供，故留空 |
| 投資學 | `documents/investment_contents.md` | Parts 1–5，16 章（第 1–11、13–17 章） | 只提供 Part、章名與 Part 起始頁；沒有節名，也沒有各章頁碼 |
| 會計學 | `documents/accounting_toc.md` | 第 1–23 章，其中第 1–7、12–15、20 章共 41 個具名節次 | 章名、順序與頁碼依來源；未列節名的章節以「學習重點」標示。財務分析圖表內容另參考 `documents/accounting_contents.md` |
| 證券交易相關法規與實務 | `documents/ExamScope.md`、`documents/securities_law_contents.md`、全國法規資料庫 Open API | 21 章、21 節；14 頁官方全文、7 頁連結摘要 | 官方 15 部法規、1,507 條逐條呈現；公會自律規範與「其他主管機關法令」以官方連結與摘要呈現 |

總體經濟學來源的 Part 2「金融市場」（第 11–13 章）屬總體經濟學科目，由總體經濟學內容使用；投資學仍只依 `investment_contents.md` 的 Parts 1–5，兩份目錄不互相補洞。投資學來源沒有第十二章，網站保留原始編號跳號，不自行補章；章內的「學習重點」是本站編寫的複習單元，不是原書節名。會計學章節依 `accounting_toc.md` 建構，未列節名的章節同樣以「學習重點」標示；第 23 章來源註明原書章號印刷為 22，網站依順序列為第 23 章並保留註記。財務分析總架構、杜邦分析與四表連結的圖表內容另參考 `accounting_contents.md`，分別掛在 `accounting-15#0`、`accounting-15#1` 與 `accounting-23#1`。

## 歷屆考古題

| 來源 | 範圍 | 注意事項 |
| --- | --- | --- |
| 證基會歷屆試題下載頁 <https://www.sfi.org.tw/Node?id=217> | 證券投資分析人員歷屆試題與選擇題解答 | 官方頁面目前保留近期試題；115 年第 1、2 次直接連結官方 PDF，較早年度以公開鏡像取得同一份試題。 |
| 證基會 115 年第 1 次試題／解答 | `https://examweb.sfi.org.tw/Download/02/04.pdf`、`04a.pdf` | 115 年第 1 次四個專業科目試題與選擇題解答；練習庫保留原始 PDF 連結。 |
| 證基會 115 年第 2 次試題／解答 | `https://examweb.sfi.org.tw/Download/01/04.pdf`、`04a.pdf` | 115 年第 2 次四個專業科目試題與選擇題解答；練習庫保留原始 PDF 連結。 |
| 公開題庫鏡像（宸浩） | `https://lidapon.azurewebsites.net/files/E1/{year}Q{session}.pdf` 與 `...a.pdf` | 107–114 年試題的公開鏡像；107–108 年解答另見下一列，109–114 年解答為 `...a.pdf`。只用於取得與官方公告相同的 PDF，答案仍以證基會公告的選擇題解答為準。 |
| 公開解答文字版（高點） | `https://www.gocharter.com.tw/csia/image/CSIA_{year}Q{session}_Answer.pdf` | 107–108 年選擇題解答文字版 PDF；與使用者提供之 MD／JSON 轉錄檔及原始 JPG 解答抽查核對。 |

收錄範圍為 107–115 年共 29 次筆試、四個專業科目、3,710 題選擇題：法規 910、投資學 924、會計 882、總體 994。年度分布為 107 年 497、108 年 511、109 年 525、110 年 385、111 年 378、112 年 385、113 年 392、114 年 385、115 年 252。107 年有 4 次考試，108 年有 4 次，109 年有 4 次，110–114 年各有 3 次，115 年有 2 次。

題目與選擇題解答由 PDF 擷取後整理為 `window.PAST_EXAMS`，每題保留考試次別、年度、科目、題號、題幹、四個選項與官方可接受答案。答案以證基會公告為準；若官方公告多個可接受答案，`answer` 會保留全部字母，例如 108Q3 法規第 28 題為 C、D，108Q3 會計第 28 題為 B、D，109Q1 法規第 30 題為 B、D，112Q3 投資學第 16 題與 112Q3 會計第 15 題為 A–D 均給分，114Q1 總體第 14 題為 B、C。申論題與計算題沒有官方選擇題解答，本站提供參考解答並標示「本站參考解答（非官方）」，同時保留該次考試的原始試題 PDF；解題過程另整合進各科對應章節，章節例題以 `questionId` 連結題庫，不重複存放題幹與答案。

107–108 年已納入：選擇題解答由使用者提供之 MD／JSON 逐題轉錄檔匯入，並與公開解答 PDF 及原始 JPG 解答抽查核對；上述兩題多答案已依原始解答保留。

### 計算／申論題

107–115 年計算與申論題取自證基會公告試題 PDF；官方解答 PDF 只有選擇題答案，107–115 年 348 題均已改為完整「參考解答」。這些解答不是官方公告答案，題目與解答仍以原始試題及正式教材為準。解題資料以 `window.EXAM_SOLUTIONS` 依年度（載入順序 115→107）整合進章節，以 `chapterId::sectionIndex` 為鍵，合計 347 節次、601 個例題（348 題計算／申論＋253 題代表選擇題）；每個例題以 `questionId` 連結既有題庫，不重複存放題幹與答案。

題目著作權屬原命題單位；本站僅為個人考試複習整理，不主張題目著作權。證基會官方頁面、試題 PDF 與解答 PDF 仍是最終依據。

## 諾貝爾經濟學獎年表

| 來源 | 範圍 | 注意事項 |
| --- | --- | --- |
| 使用者提供之《諾貝爾經濟學獎歷年學說》 | 1969–2026，共 58 屆、17 個模型圖組 | 年表欄位與理論依提供檔案保留；2025 公式已依官方科學背景修正（移除無依據的 Q 因子）；58 屆年份與得主已於 2026-10-20 對照諾貝爾獎官方 API，0 筆不一致 |
| 諾貝爾獎官方獎項頁 | <https://www.nobelprize.org/prizes/economic-sciences/> | 作為年份、得主與官方說明的優先查證來源；年份與得主已核對，公式與學說未逐條核對前仍視為複習整理，不宣稱官方認證 |
| 諾貝爾獎官方 API | <https://api.nobelprize.org/2.1/nobelPrizes?limit=100&nobelPrizeCategory=eco&sort=desc> | 以程式比對 58 屆年份、得主與官方 motivation；2026 屆為 Robert E. Hall 與 Michael Woodford。 |
| 諾貝爾獎 2026 科學背景 | <https://www.nobelprize.org/uploads/2026/10/advanced-economicsciencesprize2026.pdf> | 確認 Hall 的隨機漫步（式 12：E_t{c_{t+1}} = c_t）、Woodford 三方程式模型、新凱因斯菲利浦曲線（式 15）與前瞻指引／可信度；代表論文 Hall (1978) 已完成全文抽查、Woodford (2003) 書目已核對；Woodford 全文仍待查。 |
| 諾貝爾獎 2025 科學背景 | <https://www.nobelprize.org/uploads/2025/10/advanced-economicsciencesprize2025.pdf> | 確認 Mokyr 知識擴散與 Aghion & Howitt 創造性破壞；式 (9) 支持網站修正後的成長式 g = λ(γ−1) ≈ λ ln(γ)。 |
| 諾貝爾獎 2019–2024 科學背景 | [2019](https://www.nobelprize.org/uploads/2019/10/advanced-economicsciencesprize2019.pdf)／[2020](https://www.nobelprize.org/uploads/2020/09/advanced-economicsciencesprize2020.pdf)／[2021](https://www.nobelprize.org/uploads/2021/10/advanced-economicsciencesprize2021.pdf)／[2022](https://www.nobelprize.org/uploads/2022/10/advanced-economicsciencesprize2022.pdf)／[2023](https://www.nobelprize.org/uploads/2023/10/advanced-economicsciencesprize2023.pdf)／[2024](https://www.nobelprize.org/uploads/2024/10/advanced-economicsciencesprize2024.pdf) | 2019 確認 RCT 與平均因果效果（網站 ATE 為概念式）；2020 確認共同價值、勝者魔咒、SMRA／組合時鐘拍賣（網站公式為概念式）；2021 LATE 公式逐式一致；2022 Diamond–Dybvig、2023 Goldin、2024 Acemoglu–Johnson–Robinson 的官方式與網站概念式方向一致；2019–2026 每年至少一篇代表論文已完成全文抽查；其餘代表論文全文仍待查。 |

年表頁與模型總覽的諾貝爾區共用 `window.NOBEL_DATA` 與 `window.NOBEL_DIAGRAMS`；年表保留 58 列，每一列左側是該屆得主、領域、公式與結論，右側直接顯示對應模型圖，17 個圖組以 `nobel-01`–`nobel-17` 對應。2026 屆列為 `nobel-17`，官方公告為 Robert E. Hall 與 Michael Woodford「for microeconomic foundations of macroeconomic stabilisation」；年表保留消費隨機漫步與新凱因斯穩定政策架構的複習摘述，相關概念與公式已對照官方 popular information 及 2026 年科學背景（Hall 隨機漫步、Woodford 三方程式模型與新凱因斯菲利浦曲線；前瞻指引、可信度與透明度），2019–2026 代表原始論文書目已核對；2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall 1978；Woodford 2003 專書未逐條），其餘全文仍待逐條核對。2025 屆原式 `g = λ ln(γ) Q` 的 Q 因子無官方依據，已依官方科學背景式 (9) 改為 `g = λ(γ−1) ≈ λ ln(γ)`；Aghion & Howitt (1992) 已完成全文抽查，λ 為創新到達率、γ 為創新步幅。2019 屆 RCT／平均因果效果與 2020 屆共同價值／勝者魔咒亦已對照官方科學背景；2019、2020 網站公式為複習用概念式。2021 LATE 公式與 2022–2024 的官方學說方向亦已核對；2022–2024 網站公式為複習用概念式，未逐式等同官方模型。

## 公式排版

| 名稱 | 版本／網址 | 用途 |
| --- | --- | --- |
| KaTeX | 0.19.0，<https://katex.org/> | 將學習單元公式、比例分析公式、選擇權公式與諾貝爾年表公式排版為 HTML／MathML；檔案放在 `site/assets/katex/`，包含 JS、CSS、字型與 MIT 授權。 |

全站目前有 118 個含公式的學習單元，集中在 `site/assets/content-formula-tex.js` 的 `window.FORMULA_TEX`；比例分析 32 條、選擇權 13 條與諾貝爾 58 屆公式也全部改用 KaTeX 渲染。公式不依賴 CDN，`file://` 可離線顯示。

變數的數字下標一律寫成 `P_0`、`D_1`、`E_2`；上標寫在整個變數後，例如 `\sigma_p^2`、`w_1^2`、`\sigma_1^2`。共變異數與變異數使用 `\operatorname{Cov}`、`\operatorname{Var}`，不使用斜體 `Cov`、`Var`。驗證器以本地 KaTeX 0.19.0 實際編譯 118/118 筆正式公式、2,695 個行內公式與 176 個區塊公式，並檢查 Unicode 上下標、raw `Cov`／`Var`、raw 數字下標（如 `P0`）與重複跳脫反斜線。

## 官方與繁體中文來源

### 統計與總體資料

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 行政院主計總處 | <https://www.dgbas.gov.tw/> | 國民所得、物價、經濟成長與政府統計。 |
| 中華民國統計資訊網 | <https://www.stat.gov.tw/> | 總體統計資料庫、物價指數與國民所得統計。 |
| 中央銀行 | <https://www.cbc.gov.tw/> | 貨幣政策、利率、匯率、外匯存底與金融統計。 |
| 中央銀行金融知識網 | <https://knowledge.cbc.gov.tw/> | 貨幣、銀行、利率與金融政策的入門說明。 |
| 國家發展委員會 | <https://www.ndc.gov.tw/> | 景氣對策信號、景氣指標與經濟發展政策。 |
| 勞動部 | <https://www.mol.gov.tw/> | 勞動力、失業率、就業與勞動市場統計。 |
| 財政部 | <https://www.mof.gov.tw/> | 財政收支、租稅與政府債務相關資料。 |
| 經濟部統計處 | <https://www.moea.gov.tw/Mns/dos/home/Home.aspx> | 產業生產、外銷訂單、批發零售與產業經濟統計。 |

### 金融監理與市場

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 金融監督管理委員會 | <https://www.fsc.gov.tw/> | 金融監理、銀行保險證券政策與消費者保護。 |
| 金融監督管理委員會證券期貨局 | <https://www.sfb.gov.tw/> | 證券、期貨與投信投顧市場的監理法規。 |
| 中央存款保險公司 | <https://www.cdic.gov.tw/> | 存款保險、金融穩定與存款人權益保障。 |
| 臺灣證券交易所 | <https://www.twse.com.tw/zh/> | 集中市場交易、上市證券與市場統計。 |
| 公開資訊觀測站 | <https://mops.twse.com.tw/> | 上市櫃公司財務報表、重大訊息與股東會資料。 |
| 證交所投資人知識網 | <https://investoredu.twse.com.tw/> | 股票、債券、ETF 與投資風險教育。 |
| 證券櫃檯買賣中心 | <https://www.tpex.org.tw/> | 店頭市場、興櫃與債券市場相關資訊。 |
| 臺灣期貨交易所 | <https://www.taifex.com.tw/cht/index> | 期貨與選擇權商品、交易制度與保證金資訊。 |

### 證券法規全文

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 全國法規資料庫 Open API（法律） | <https://law.moj.gov.tw/api/ch/law/json> | 證券交易法、公司法、證券投資信託及顧問法等法律全文；本次匯入資料更新日為 2026-10-08。 |
| 全國法規資料庫 Open API（命令） | <https://law.moj.gov.tw/api/ch/order/json> | 施行細則、設置標準、管理規則、基金管理辦法、全權委託管理辦法、境外基金管理辦法等法規命令全文；本次匯入資料更新日為 2026-10-08。 |
| 證券暨期貨法令判解查詢系統 | <https://www.selaw.com.tw/Chinese/LegalSystemInquiry/LawSystemQueryList/8103> | 投信投顧法規、公會自律規範與函釋查詢；用於自律規範頁面的官方連結。 |

官方全文頁面共 14 頁、15 部法規、1,507 條條文列（含 133 條「（刪除）」列）；`law-01` 同時包含證券交易法與施行細則。公會自律規範（操作辦法、會員自律公約、廣告及營業活動行為規範、經理守則、投顧從業人員行為準則、證券投資分析人員行為準則）與「其他主管機關頒訂之法令」依使用者決定，以官方連結與摘要呈現，不逐字轉錄。

### 會計準則與監理

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 財團法人中華民國會計研究發展基金會 | <https://www.ardf.org.tw/> | 臺灣 IFRS 正體中文翻譯、會計準則解釋與會計專業資源。 |
| IFRS Foundation | <https://www.ifrs.org/> | IFRS 準則原文、修訂與教育資源；用於核對國際會計準則。 |
| 全國法規資料庫 | <https://law.moj.gov.tw/> | 商業會計法、公司法、證券交易法與所得稅法等法規。 |
| 公司治理中心 | <https://cgc.twse.com.tw/> | 公司治理評鑑、董事會運作與永續治理資訊。 |
| 財政部賦稅署 | <https://www.dot.gov.tw/> | 營利事業所得稅、扣繳、稅務申報與稅法解釋。 |

### 考試與教育資源

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 中華民國證券投資信託暨顧問商業同業公會 | <https://www.sitca.org.tw/index_pc.aspx> | 共同基金、投信投顧業務與境內外基金資訊。 |
| 證券暨期貨市場發展基金會 | <https://www.sfi.org.tw/> | 證券期貨專業測驗、培訓與考試資訊。 |
| 證基會歷屆試題下載 | <https://www.sfi.org.tw/Node?id=217> | 證券投資分析人員歷屆試題與選擇題解答；115 年第 1、2 次直接連結官方 PDF。 |
| 歷屆試題公開鏡像（宸浩） | <https://lidapon.azurewebsites.net/files/E1/109Q1.pdf> | 107–114 年試題 PDF 的公開鏡像；107–108 年解答另連結公開文字版 PDF；答案仍以證基會公告為準。 |
| 公開解答文字版（高點） | <https://www.gocharter.com.tw/csia/image/CSIA_107Q1_Answer.pdf> | 107–108 年選擇題解答文字版 PDF；用於核對與轉錄。 |
| 國家教育研究院樂詞網 | <https://terms.naer.edu.tw/> | 中英文專業名詞對照與學術名詞查詢。 |
| 國立臺灣大學開放式課程 | <https://ocw.aca.ntu.edu.tw/> | 經濟學、投資學與財務相關公開課程資源。 |

### 繁體中文百科

| 名稱 | 網址 | 用途 |
| --- | --- | --- |
| 維基百科（繁體中文） | <https://zh.wikipedia.org/zh-tw/> | 名詞初步核對與延伸閱讀；不取代官方資料。 |

## 公式校對原則

1. **先定義符號，再檢查公式。** 每個公式都要能回答：符號代表什麼、期間單位是什麼、利率是年利率還是每期利率、報酬是算術還是幾何。
2. **先確認適用條件。** 例如高登模型要求 `g < r`；賣權買權平價的基本版本假設歐式選擇權且無股利；CAPM 以系統風險為定價風險。
3. **優先對照官方與教材。** 臺灣官方統計與金融監理資料優先；名詞可查國家教育研究院樂詞網；維基百科只做初步核對。
4. **跨模型比對只當輔助。** ChatGPT、Gemini、Claude 可能同時犯錯；跨模型一致不代表正確，仍要回到原始來源。
5. **記錄版本與日期。** 模型名稱、版本、提問日期與實際回答都要留下，否則無法重現。
6. **比率公式要寫清楚分子、分母與平均方式。** 例如速動資產是否排除預付費用、ROA 分子是否加回利息、週轉率是否用平均餘額；不同教材可能不同，不能只背名稱。

## 模型圖原則

1. **模型圖與流程圖是概念示意，不是原始教材掃圖。** 模型曲線的斜率、位置與移動方向用於說明模型，流程圖的節點與箭頭用於說明處理順序；兩者都不代表實際數值、實證估計或特定企業的帳務流程。
2. **先確認曲線方向與移動原因。** 例如 IS 向下、LM 向上；AD 向下、SRAS 向上、LRAS 垂直；菲利浦曲線短期向下、長期垂直。
3. **每個圖都要列出變數與參數。** 模型圖的變數是模型內生決定的量（如 Y、i、P），參數是影響曲線斜率或位置的外生條件（如 MPC、h、rr）；流程圖的「變數」是流程節點或代號，「參數」是貫穿流程的會計基礎、假設或規則。
4. **移動方向要和文字敘述一致。** 圖上的箭頭、E₀→E₁、Y₀→Y₁ 必須與圖說和公式方向相同。
5. **維持可及性與離線可用。** 使用 inline SVG，包含 `<title>`、`role="img"` 與 `aria-labelledby`；不得載入外部圖片。窄螢幕可在圖表區塊內水平滑動，並保留可讀的最小寬度。
6. **優先對照官方與教材。** 臺灣官方網站、央行與主計總處說明、繁體中文教材優先；跨模型回答只做輔助。

## 高風險公式檢查點

| 科目／章 | 公式或主題 | 檢查點 |
| --- | --- | --- |
| 總體 Ch1 | `GDP = C + I + G + X − M` | 支出面 GDP；X 為出口、M 為進口，淨出口可為負。 |
| 總體 Ch2 | `Y = 1/(1 − MPC) × A₀` | 封閉、無稅、無進口、物價固定的簡單模型；若有定額稅，A₀ 內含 `−c1t0`；MPC 介於 0 與 1。 |
| 總體 Ch5 | `M = m × B；m = 1 ÷ rr` | 最簡單模型假設無超額準備、無現金流失；實際貨幣乘數更複雜。 |
| 總體 Ch9 | `π = πᵉ − β(u − uₙ) + ε` | 預期 augmented 菲利浦曲線；β > 0，uₙ 為自然失業率。 |
| 總體 Ch10 | `開放經濟乘數 = 1 ÷ (1 − MPC + MPM)` | 進口為所得的函數；MPM 為邊際進口傾向；此式為實質匯率正規化為 1、無稅的簡化式。 |
| 投資 Ch3 | `HPR = (P₁ − P₀ + D₁) ÷ P₀` | D₁ 為期間現金收益；未考慮稅與交易成本。 |
| 投資 Ch3 | `σ² = Σ pᵢ × [Rᵢ − E(R)]²` | 機率加權；標準差為變異數平方根。 |
| 投資 Ch4 | `σₚ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂` | 兩資產；ρ 為相關係數，不是共變異數。 |
| 投資 Ch5 | `E(Rᵢ) = R_f + βᵢ × [E(R_m) − R_f]` | CAPM；β 衡量系統風險；市場風險溢酬為正時，β 越大要求報酬越高。 |
| 投資 Ch7 | `P = Σ C/(1+y)ᵗ + F/(1+y)ⁿ` | C 為每期票息、y 為每期殖利率、n 為期數；分子分母期間單位要一致。 |
| 投資 Ch7 | 修正存續期間與凸性 | `Δy` 用小數表示；1 個百分點 = 0.01；存續期間衡量小幅利率變動的線性近似。 |
| 投資 Ch8 | `P₀ = D₁ ÷ (r − g)` | 高登成長模型；要求 `r > g`，且股利固定成長。 |
| 投資 Ch9 | `C + K/(1+r)ᵀ = P + S₀` | 歐式、無股利、相同履約價與到期日、無套利；美式或含股利時需調整。 |
| 投資 Ch10 | `F₀ = S₀ × e^{(r−q)T}` | 連續複利；r 為無風險利率（持有成本）、q 為契約期間平均收益率；不另計儲存成本與便利收益。離散版本為等價形式，不是近似。 |
| 投資 Ch10 | `避險契約數 ≈ (β目標 − β現貨) × 現貨部位價值 ÷ 每口期貨契約價值` | 股票指數期貨避險；負值代表賣出期貨；全數避險至 β目標=0、期貨 β≈1 時，賣出契約數為 `β現貨 × 現貨價值 ÷ 契約價值`；基差風險仍在。 |
| 投資 Ch14 | `ROE = 淨利率 × 總資產週轉率 × 權益乘數` | 杜邦分解；權益乘數 = 總資產 ÷ 股東權益。 |
| 投資 Ch17 | Sharpe／Treynor／Jensen α | Sharpe 用總風險 σ；Treynor 用系統風險 β；Jensen α 是相對 CAPM 的超額報酬。 |
| 總體 Ch12 | `實質利率 ≈ 名目利率 − 預期通膨率` | 費雪方程式近似式；精確式為 `1 + 名目利率 = (1 + 實質利率) × (1 + 預期通膨率)`，高通膨時差距加大。 |
| 總體 Ch12 | `(1 + y_n)ⁿ = (1 + y₁)(1 + f₂)…(1 + f_n)` | 期限結構的即期與遠期利率關係；`f` 為隱含遠期利率，期間單位須一致。 |
| 總體 Ch12 | `D* = D ÷ (1 + y/k)；ΔP/P ≈ −D* × Δy + ½ × 凸性 × (Δy)²` | `Δy` 用小數表示；1 個百分點 = 0.01；凸性項修正大幅利率變動的非線性誤差。 |
| 總體 Ch13 | `P = Σₜ₌₁ⁿ C ÷ (1+y)ᵗ + F ÷ (1+y)ⁿ` | 債券價格；C 為每期票息、F 為面額、y 為每期殖利率、n 為期數。與投資 Ch7 定義相同。 |
| 總體 Ch13 | `遠期匯率 ≈ 即期匯率 × (1 + 本國利率) ÷ (1 + 外國利率)` | 直接報價下的利率平價近似；報價方向、到期日與期間單位須一致；CIP 是無套利基準，實際市場可能有基差。 |
| 總體 Ch13 | `NAV = (基金資產總值 − 負債) ÷ 受益權單位數` | 共同基金淨資產價值；資產須以市價評價，負債與單位數的計算時點須一致。 |
| 總體 Ch13 | `買權 = max(S_T − K, 0)；賣權 = max(K − S_T, 0)；F₀ = S₀ × e^{(r−q)T}` | 選擇權到期內在價值（未扣權利金）與期貨理論價；買方風險有限、賣方風險可能很大；期貨式採連續複利。 |
| 會計 Ch1 | `到期值 = 面額 ×（1 + 票面利率 × 期間）；貼現息 = 到期值 × 貼現率 × 貼現期間` | 票據貼現；期間單位要一致，有追索權貼現通常列借款。 |
| 會計 Ch2 | `NRV = 估計售價 − 完成成本 − 銷售費用；期末存貨 = min（成本, NRV）` | 存貨評價；IFRS 允許價值回升時迴轉，但以原認列損失為上限。 |
| 會計 Ch3 | `直線法折舊 =（成本 − 殘值）÷ 耐用年限；減損 = 帳面金額 − 可回收金額` | 不動產、廠房及設備；可回收金額為公允價值減出售成本與使用價值較高者。 |
| 會計 Ch4 | `利息收入 = 期初總帳面金額 × 有效利率（信用減損資產改用攤銷後成本）` | 按攤銷後成本衡量之債券投資；IFRS 9.5.4.1；折價攤銷增加帳面金額、溢價攤銷減少。 |
| 會計 Ch6 | `發行價格 = Σ 票面利息 ÷（1 + 市場利率）^t + 面額 ÷（1 + 市場利率）^n；利息費用 = 期初帳面金額 × 有效利率（市場利率調整發行成本後）` | 公司債；票面利率算現金利息，有效利率算利息費用。 |
| 會計 Ch9 | `使用權資產 = 租賃負債 + 預付租賃款 − 租賃誘因 + 初始直接成本 + 復原成本估計` | IFRS 16.24(a)–(d)；折現率優先採租賃隱含利率；復原成本需認列相應負債。 |
| 會計 Ch10 | `遞延所得稅 = 暫時性差異 × 預期適用稅率` | 所得稅；遞延所得稅資產需評估可回收性。 |
| 會計 Ch15 | `ROE = 淨利率 × 總資產週轉率 × 權益乘數` | 杜邦分解；週轉率分子分母期間要一致。 |
| 會計 Ch20 | `WACC = W_d × r_d ×（1 − T）+ W_e × r_e（無特別股版本）` | 加權平均資金成本；債務成本用稅後利率，權重宜採市場價值。 |
| 會計 Ch21 | `NPV = −CF₀ + Σ CFₜ ÷（1 + r）ᵗ；營業現金流 =（收入 − 現金費用）×（1 − T）+ 折舊 × T` | 資本預算；沉沒成本不相關，機會成本與侵蝕效果才相關。 |
| 會計 Ch23 | `基本 EPS =（淨利 − 特別股股利）÷ 加權平均流通在外普通股股數` | 每股盈餘；股票股利與股票分割追溯調整股數，稀釋效果才納入。 |

2026-10-20 官方／教材核對：A1（IAS 7）、A3（IAS 2）、A4（IAS 16／IAS 36）、A8（IAS 12）、A12（IAS 33）與網站公式一致；A5 依 IFRS 9.5.4.1 確認有效利率乘總帳面金額、信用減損資產改用攤銷後成本；A7 依 IFRS 16.24(a)–(d) 補入復原成本估計；A2、A6、A9–A11 依公開教材逐式核對。分錄與報表勾稽另以 OpenStax《Principles of Accounting, Volume 1》作外部教材，重算零用金、備抵壞帳、公司債、庫藏股、股票股利、現金流量表、存貨錯誤與保留盈餘／EPS 的代表性分錄與跨表勾稽（未計入網站 29 個來源）；另抽查租賃、收入分攤、遞延所得稅、合併商譽與資本預算，各章例題逐題重算仍待。

教材來源：A2 [三民輔考「應收帳款」](https://www.3people.com.tw/%E7%9F%A5%E8%AD%98/%E6%87%89%E6%94%B6%E5%B8%B3%E6%AC%BE/%E5%85%AC%E8%81%B7%E8%80%83%E8%A9%A6-%E9%AB%98%E6%99%AE%E5%88%9D%E3%80%81%E5%9C%B0%E7%89%B9-%E8%B2%A1%E7%A8%85%E8%A1%8C%E6%94%BF/75abcb35-1c2e-4b7c-9e44-81fe9cfd3f56)；A6 [OpenStax 10.2 Bond Valuation](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation)；A9 [OpenStax 6.6 DuPont](https://openstax.org/books/principles-finance/pages/6-6-profitability-ratios-and-the-dupont-method)；A10 [OpenStax 17.3 WACC](https://openstax.org/books/principles-finance/pages/17-3-calculating-the-weighted-average-cost-of-capital)；A11 [OpenStax 16.2 NPV](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method) 與 [Ole Miss FIN 331 Ch9](http://faculty.bus.olemiss.edu/rvanness/Courses/Fin%20331/Chapter%209.pdf)。

### 2026-10-20 投資學與總體經濟學公式核對

- 範圍：`documents/content_review_checklist.md` 第二節 #1–#29。
- 結果：29 條全部為「通過（教材）」；#27 另以 BIS 官方 CIP 定義、#28 另以 SEC Investor.gov 官方 NAV 定義交叉核對。
- 判定條件：數學式、變數定義、期間單位與假設均與來源一致；網站 `formula` 欄已補上原先省略的假設。逐條精確式與等價說明見 `documents/content_review_checklist.md` 第二節與 `documents/reviews/2026-10-20-official-verification.md` 第 3 節。
- 限制：「通過（教材）」表示已對上公開教材或課程講義，不是官方對本站全部內容的認證；教材未涵蓋的推論仍以來源式為準。

| 公式群組 | 條目 | 主要來源 | 結果 |
| --- | --- | --- | --- |
| 總體所得與乘數 | #1–#3 | OpenStax Macro 3e 6.1／14.4／Appendix B；MIT 14.02 Spring 2023 PS2 | 通過（教材） |
| 總體 IS-LM／菲利浦曲線／開放經濟 | #4–#6 | Hanover College IS-LM；LibreTexts 31.37；MIT 14.02 Lecture 12／Open Economy handout | 通過（教材） |
| 投資報酬／風險／CAPM | #7–#11 | OpenStax Finance 15.1／15.3；LibreTexts 8.2；MIT 15.401 Sample Final | 通過（教材） |
| 債券／股利／選擇權／期貨／避險 | #12–#17 | OpenStax Finance 10.2／11.2；MIT 15.401 Lecture 4／Recitation 5／Lecture 8；FIU/Hull Ch5；Case Western Ch3／CSUN | 通過（教材） |
| 杜邦／績效／費雪／期限結構／存續期間／債券／FX／NAV／選擇權 | #18–#29 | OpenStax Finance 6.6／15.4／7.4／10.2／20.3；MIT 15.401 Lecture 4／Recitation 5；SMU Ch3；BIS Box A；SEC Investor.gov | 通過（教材）；#27、#28 另經官方交叉核對 |

網站 formula 欄的補強重點：簡單乘數與貨幣乘數的模型假設、IS-LM 的封閉經濟與物價固定、開放經濟的 `ε=1` 與無稅簡化、債券票息與殖利率的同週期單位、高登模型的 `r>g`、賣權買權平價的歐式／無股利條件、期貨的連續複利與契約期間平均收益率、避險的目標 β 與負值方向、存續期間的 Macaulay 年數與付息頻率、遠期匯率的直接報價與無套利條件、NAV 的同一評價時點，以及選擇權到期內在價值與權利金的區分。

### 2026-10-20 總體模型圖核對

- 範圍：`site/assets/diagrams-macro*.js` 的 21 張既有章節模型圖（不含 2026-10-22 新增的 `macro-01#2` 國民所得會計帳流程圖）。
- 結果：21/21 對上公開教材或課程講義，全部為「通過（教材）」；B15 另以 CBC 官方外匯頁交叉核對，B12 的臺灣景氣指標以國發會頁面輔助。
- 判定條件：曲線方向、移動方向、變數／參數、圖說與假設均與來源一致；概念示意圖不宣稱是原始教材掃圖。
- 限制：「通過（教材）」不是官方對本站全部內容的認證；B6–B8 採傳統向上 LM，B12 的國發會頁面可直接查閱，B20 的 15.415 PDF 為圖像式。逐條紀錄見 `documents/reviews/2026-10-20-official-verification.md` 第 5 節。

| 來源群組 | 對應模型圖 | 網址 |
| --- | --- | --- |
| OpenStax《Principles of Macroeconomics 3e》 | B1、B2、B4、B9、B10、B12、B14、B15、B17 | [1.3](https://openstax.org/books/principles-macroeconomics-3e/pages/1-3-how-economists-use-theories-and-models-to-understand-economic-issues)／[Appendix B](https://openstax.org/books/principles-macroeconomics-3e/pages/b-the-expenditure-output-model)／[14.4](https://openstax.org/books/principles-macroeconomics-3e/pages/14-4-how-banks-create-money)／[11.2](https://openstax.org/books/principles-macroeconomics-3e/pages/11-2-building-a-model-of-aggregate-demand-and-aggregate-supply)／[11.3](https://openstax.org/books/principles-macroeconomics-3e/pages/11-3-shifts-in-aggregate-supply)／[10.4](https://openstax.org/books/principles-macroeconomics-3e/pages/10-4-the-national-saving-and-investment-identity)／[6.3](https://openstax.org/books/principles-macroeconomics-3e/pages/6-3-tracking-real-gdp-over-time)／[16.2](https://openstax.org/books/principles-macroeconomics-3e/pages/16-2-demand-and-supply-shifts-in-foreign-exchange-markets) |
| CORE Econ《The Economy 2.0》 | B3 | [5.8 Government austerity policy and the paradox of thrift](https://books.core-econ.org/the-economy/macroeconomics/05-macroeconomic-policy-08-government-austerity.html) |
| Lardbucket《Finance, Banking, and Money》 | B4、B18 | [15.1 完整貨幣乘數](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s18-01-a-more-sophisticated-money-mul.html)／[6.1 利率風險結構](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s09-the-economics-of-interest-rate.html) |
| Mishkin 貨幣銀行學講義 | B5、B8、B16 | [流動性偏好](http://home.cerge-ei.cz/pstankov/teaching/VSE/Reading/Mishkin4.1.pdf)／[IS-LM 政策有效性](https://www.ssc.wisc.edu/~mchinn/mishkin_ch24.pdf)／[金融體系](https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/mish2b.htm) |
| MIT 14.02、Solow、15.401、15.415 課程講義 | B5、B11、B13、B20、B21 | [14.02 Lec. 4](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1sWJWc4iYESuo4fu0vAqT8aS-KuSosPpq_transcript.pdf)／[Lec. 9](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1m8XRqp-AVdS64CW-PlvQDH2AYNFPQguV_transcript.pdf)／[Solow notes](https://economics.mit.edu/sites/default/files/inline-files/Lecture%201-2%2C%202%20and%203%20-%20The%20Solow%20Growth%20Model.pdf)／[15.401 Lec. 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf)／[15.415 Lec. 5](https://web.mit.edu/15.415e/www/lecture05.pdf)／[15.401 Rec. 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf) |
| LibreTexts、Saylor | B6、B7、B8 | [LibreTexts 31.37 IS-LM](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)／[Saylor ECON302-6.2](https://resources.saylor.org/wwwresources/archived/site/wp-content/uploads/2011/07/ECON302-6.2.pdf) |
| OpenStax《Principles of Finance》 | B16、B18、B19 | [1.5](https://openstax.org/books/principles-finance/pages/1-5-markets-and-participants)／[10.3](https://openstax.org/books/principles-finance/pages/10-3-using-the-yield-curve)／[10.4](https://openstax.org/books/principles-finance/pages/10-4-risks-of-interest-rates-and-default) |
| 中央銀行、國發會 | B15、B12 | [CBC 外匯](https://www.cbc.gov.tw/en/np-444-2.html)／[國發會景氣指標簡介](https://www.ndc.gov.tw/nc_335_2235) |

已套用修正：B1 補註 I／S 為輔助恆等式；B2 加註 AE 斜率一般式；B4 完整貨幣乘數；B5 將 k、h 改為敏感度；B8 修正 MPC／b 註記並限定 h 變動；B9 補 SRAS₁；B10 修正 SRAS 平坦度；B13、B14 補同時移動提醒；B15 移除絕對說法並補 CBC 依據；B16 移除貨幣供給、改為民間儲蓄＋國外流入；B17 補政府公債風險；B21 移除與到期價值無關的參數。

### 2026-10-22 國民所得會計帳流程圖

- 範圍：`site/assets/diagrams-macro.js` 的 `macro-01#2`，掛在 macro-01 第3節「其他國民所得衡量工具」。
- 內容：上方以生產面、支出面、所得面三面法等價得到 GDP；下方依序呈現 GDP + NFIA → GNI、−D → NNP、−NIT → NI、調整 CIT／URE／SSC／TR／INT → PI、−Tp → PDI，最後拆分為 C 與 S。
- 依據：以本站 macro-01 第3節的公式、名詞卡與常用國民所得會計教材概念整理；GNP 與 GNI 在多數教材同義，圖中以 GNI 為主並註明 GNP ≈ GNI。
- 檢查：SVG 結構、章節綁定、`dg-ni-*` 跨圖 ID 唯一性、變數／參數表與 1280px／390px、深淺主題、`file://` 均通過；0 水平溢出、0 console errors、0 `.katex-error`。
- 限制：本圖為教學示意，未逐條對照公開教材；不取代 2026-10-20 對 21 張既有模型圖的教材核對。

### 2026-10-22 會計學教學流程圖

- 範圍：`site/assets/diagrams-accounting.js` 的 `accounting-14#0`，掛在 accounting-14 第1節「財務報表與一般公認會計原則」。
- 內容：交易與事項→原始憑證→日記帳→過帳→分類帳→調整前試算表→調整分錄→調整後試算表→財務報表→結帳分錄→結帳後試算表，並以回箭頭表示下一會計期間；圖中含中英文名詞、借貸平衡與權責發生基礎等會計基礎。
- 依據：以本站 accounting-14 與會計學章節的公式、名詞卡及常用會計循環教材概念整理；不逐條引用特定教材。
- 檢查：SVG 結構、`dg-acc-*` 跨圖 ID 唯一性、`title`／`desc`、章節綁定、變數／參數表、1280px／390px、深淺主題與 `file://` 均通過；0 水平溢出、0 console errors、0 `.katex-error`。
- 限制：本圖為教學示意，未逐條對照公開教材；不取代 2026-10-20 對 21 張既有模型圖的教材核對。

### 2026-10-22 會計學基本報表與借貸流程圖

- 範圍：`site/assets/diagrams-accounting.js` 的 `accounting-14#0-2` 主要財務報表架構、`accounting-14#0-3` 借記／貸記常用項目、`accounting-14#0-4` 從交易到財務報表流程，與既有 `accounting-14#0` 會計循環圖同掛在 accounting-14 第1節「財務報表與一般公認會計原則」。
- 內容：主要財務報表架構圖列出資產負債表、綜合損益表、權益變動表、現金流量表與附註，標示 NI→權益、期末權益→BS、期末現金→BS 三個勾稽點；借記／貸記圖以 T 字帳整理常用科目、正常餘額、減項與六個分錄例示；交易到報表圖以兩列流程呈現交易→憑證→分錄→過帳→試算→調整→報表→結帳，並附現金銷貨、賒購設備、折舊與應計薪資四個例示。
- 依據：以本站 accounting-14 的財務報表、借貸法則與會計循環內容，以及常用會計學教材概念整理；不逐條引用特定教材。
- 檢查：SVG 結構、`dg-acc-fs-*`／`dg-acc-dr-*`／`dg-acc-flow-*` 跨圖 ID 唯一性、`title`／`desc`、章節綁定、變數／參數表、同一節次多圖渲染、1280px／390px、深淺主題與 `file://` 均通過；0 頁面水平溢出、0 console errors、0 `.katex-error`。
- 限制：三張圖為教學示意，未逐條對照特定教材；不取代 2026-10-20 對 21 張既有模型圖的教材核對。

### 2026-10-22 會計學財務分析圖表

- 範圍：`site/assets/diagrams-accounting.js` 的 `accounting-15#0` 財務分析總架構、`accounting-15#1` 杜邦分析與 `accounting-23#1` 四大財務報表連結。
- 內容：財務分析總架構由營業收入→毛利→營業利益→稅前淨利→本期淨利，並標示營收成長率、毛利率、營業利益率、利息保障倍數、有效稅率、淨利率與淨利衍生比率；杜邦分析呈現三階段與五階段 ROE 拆解；四表連結呈現 NI→保留盈餘→權益→資產負債表→現金流量表的勾稽。
- 依據：以 `documents/accounting_contents.md` 的三段圖表文字為來源，並以本站 accounting-15 與 accounting-23 的公式、名詞卡及常用財務分析教材概念整理。
- 檢查：SVG 結構、`dg-acc-fin-*`／`dg-acc-dupont-*`／`dg-acc-stmt-*` 跨圖 ID 唯一性、`title`／`desc`、章節綁定、變數／參數表、1280px／390px、深淺主題與 `file://` 均通過；0 水平溢出、0 console errors、0 `.katex-error`。
- 限制：三張圖為教學示意，未逐條對照特定教材；不取代 2026-10-20 對 21 張既有模型圖的教材核對。

## 高風險模型圖檢查點

| 科目／章 | 模型圖 | 檢查點 |
| --- | --- | --- |
| 總體 Ch1 | 兩部門循環流量 | 家計與廠商方向、要素市場與商品市場、三面法 GDP。 |
| 總體 Ch1 | 國民所得會計帳流程圖 | 三面法等價→GDP；GDP + NFIA→GNI；−D→NNP；−NIT→NI；NI −CIT −URE −SSC +TR +INT→PI；−Tp→PDI = C + S。注意 GNP≈GNI、PI 稅前、PDI 稅後。 |
| 總體 Ch2 | 簡單凱因斯 AE/45° | 無比例稅、無進口時 AE 斜率為 MPC；一般式為 MPC(1 − t) − MPM。自發支出↑使 AE 上移，均衡所得依乘數增加。 |
| 總體 Ch2 | 節儉的矛盾 | 自發消費↓使 AE 下移，均衡所得下降。 |
| 總體 Ch5 | 存款貨幣創造 | ΔD = ΔR × 1 ÷ rr；rr↑使貨幣乘數下降。 |
| 總體 Ch5 | 流動性偏好 | Md 向下；Y↑使 Md 右移、i↑；Ms 為垂直線。k、h 是 Md/P = kY − hi 的敏感度係數，不是固定彈性。 |
| 總體 Ch6 | IS-LM | IS 向下、LM 向上；交點為商品與貨幣市場同時均衡。 |
| 總體 Ch6 | 政策有效性 | LM 陡峭（h 小）時財政效果小、貨幣效果大；LM 平坦（h 大）時相反。若斜率由 k 造成，財政與貨幣效果可能同時變小，不能直接把陡峭 LM 解讀成貨幣政策一定更有效。 |
| 總體 Ch7 | AD-AS | AD 向下、SRAS 向上、LRAS 垂直；AD 右移後 SRAS 左移到 SRAS₁，長期回到自然產出。 |
| 總體 Ch7 | 需求與供給衝擊 | 需求衝擊使 P、Y 同向；供給衝擊使 P↑、Y↓。 |
| 總體 Ch8 | Solow 成長 | sf(k) 與 (n + δ)k 交點決定 k*；s↑使 k*↑，長期成長率由技術進步決定。 |
| 總體 Ch9 | 菲利浦曲線 | 短期負斜率；πᵉ↑使 SRPC 上移；長期垂直於 uₙ。 |
| 總體 Ch10 | 外匯供需 | 直接報價；外匯供給↑使 e↓（本國貨幣升值）。 |
| 總體 Ch10 | 央行干預 | 買匯使外匯需求↑、e↑；賣匯方向相反。 |
| 總體 Ch12 | 可貸資金 | 供給為民間儲蓄＋國外流入，需求為投資＋政府借款；政府赤字↑使需求右移、r↑，可能排擠民間投資。不要把貨幣供給列為供給。 |
| 總體 Ch12 | 利率風險結構 | 公司債殖利率高於同期限政府公債；信用價差反映違約、流動性與租稅差異。「政府公債（無風險）」是考試慣例，實務仍有通膨、流動性與再投資風險。 |
| 總體 Ch12 | 收益率曲線 | 正常、平坦、倒掛的形狀與預期、期限溢酬的關係。 |
| 總體 Ch12 | 存續期間與凸性 | 價格與殖利率反向；切線為存續期間近似；凸性修正非線性誤差。 |
| 總體 Ch13 | 選擇權到期內在價值 | 買權與賣權的分段形狀、履約價 K、權利金的角色；圖形是到期內在價值，未扣權利金。 |
| 會計 Ch14 | 會計循環流程圖 | 交易→憑證→日記帳→過帳→分類帳→調整前試算表→調整分錄→調整後試算表→財務報表→結帳分錄→結帳後試算表；借貸平衡、權責發生基礎、虛實帳戶。 |
| 會計 Ch15 | 財務分析總架構 | 營業收入→毛利→營業利益→稅前淨利→本期淨利；每個節點連到對應比率，淨利再連到 EPS、P/E、BVPS、P/B、ROA、ROE 與保留盈餘比率。注意 P/E、P/B 需要市價，EPS、BVPS 的股數定義不同。 |
| 會計 Ch15 | 杜邦分析 | 三階段 ROE = 淨利率 × 總資產週轉率 × 權益乘數；五階段再拆稅務效率與利息負擔。注意平均餘額、同期間與槓桿風險。 |
| 會計 Ch23 | 四大財務報表連結 | NI→保留盈餘→權益→資產負債表；資產負債表現金＝現金流量表期末現金；CFO 由 NI 調整非現金項目與營運資金變動。 |

## 跨模型比對流程

1. 從 `documents/content_review_checklist.md` 選一個章節與公式。
2. 把「公式、每個符號的定義、期間單位、假設條件」一起貼給 ChatGPT、Gemini 或 Claude，不要只貼一行公式。
3. 要求每個模型指出：公式是否正確、符號是否有歧義、適用條件是否缺漏，並提供可查證的來源。
4. 將回答貼回 checklist，標記「同意／不同意／待查」，再回到官方或教材確認。
5. 只有完成來源確認後，才修改網站內容；修改後執行 `node site/scripts/validate-content.js`。

## 目前校對狀態

- 已完成：章節界線與來源目錄比對（總體 2 個 Part／13 章／50 節；投資 5 個 Part／16 章／52 個學習重點；會計 23 章／41 個具名節次＋23 個補充學習重點；證券法規 21 章／21 節、官方 15 部法規 1,507 條；不補第十二章）。
- 已完成：115→107 年考古題批次核對。下載 29 次考試的官方／公開試題與選擇題解答 PDF，以文字層全量比對 3,710 題選擇題與 348 題計算／申論題，再將公式密集、表格型、低相似度與答案異常頁面轉成 300 dpi 影像逐題目視核對。選擇題答案與證基會公告逐題比對，單一答案題全部一致；多答案題保留官方可接受答案；更正 `107Q4-law-20` C→A。另修正 `107Q4-macro-written-2` 的 `K_0=1000`→`K_0=100`、`109Q1-macro-written-2` 的 `Md P`→`M^d/P`、`110Q1-macro-written-3` 的 Unicode 數學斜體、`111Q1-macro-written-2` 的 `dY`→`Y_d`、`111Q3-macro-written-1` 的 SRAS／Okun 缺項、`112Q1-investment-26` 遺失的 `√12`、`112Q3-macro-written-1` 的 `AK0.5N0.5`→`A K^{0.5}N^{0.5}`、`113Q2-macro-written-2` 的 `dY`／`Md`／`Ms`、`113Q3-investment-written-2`／`-3` 的共變異數下標、`114Q1-macro-written-2` 的 `Α𝐾0.3𝑁0.7`→`A K^{0.3}N^{0.7}`、`114Q2-investment-written-1` 的 `E(rS)`／`σS` 下標，以及 `111Q2-accounting-28`、`113Q1-accounting-12`、`113Q1-accounting-27` 的 Wingdings 圓圈數字。`107Q2-macro-written-1` 的 `+P`、`108Q1-macro-written-2` 的 `M/P_0`、各表格型題目的數值均確認與原題一致，僅版面被壓平。已同步更新 `107Q4-macro-written-2` 與 `114Q1-macro-written-2` 的章節解題步驟。靜態稽核 4,770 個可轉換子句、0 編譯失敗；33 個全域頁面狀態＋8 個修正題目 390px 狀態，0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 114,357 項、失敗 0。
- 已完成：計算／申論題結構化版型。新增 `site/assets/content-written-layouts.js` 與 `renderWrittenStem()`，支援段落、清單、獨立公式與表格；首批 49 個表格／多層資料題，包含投資學樹狀值、基金績效、避險與持股表，會計財務比率、報表、銀行調節表、設備與存貨表，以及總體國際收支、國民所得帳、殖利率與所得分配表。表格以 `written-table-wrap` 包住，桌面保留欄列，390px 可在表格區內水平滑動，頁面本身不溢出；其餘題目依 `(1)`、`(2)`、`●`、中文序号自動分段。驗證器新增版型 ID、區塊類型、表格欄列數、清單、公式與文字 KaTeX 檢查；49 個版型題在 390px 與 33 個全域 QA 狀態均 0 水平溢出、0 console errors、0 `.katex-error`；驗證器 117,083 項、失敗 0。
- 已完成：公式結構、符號重複、缺漏與明顯單位問題的內部檢查。
- 已完成：全站 KaTeX 上下標與運算子修正；118/118 筆正式公式、2,695 個行內公式與 176 個區塊公式均以本地 KaTeX 實編譯通過，`\sigma_p^2`、`w_1^2`、`\sigma_1^2`、`\operatorname{Cov}_{12}` 與 `P_0`、`D_1`、`E_2` 等標記已統一。投資學第 6 章新增弱式／半強式／強式效率市場比較表，「難以取得超額報酬」前綴紅色 ✕、「仍可能取得超額報酬」前綴綠色 ○；桌面版 5 欄 4 列、390px 改為卡片堆疊。另移除全站「第 X 篇」標示，投資學首頁的公式區塊移成 `#/investment/formulas` 獨立頁面，由投資學首頁的「投資學公式總表」卡片進入；Chrome CDP 在 1280px／390px、深淺主題與 `file://` 實測 33 個頁面狀態並實際點擊投資學首頁的公式總表連結；各節與各章出題統計已區分選擇題與申論題，章節列右側顯示兩種題數與頻率，並移除章節列下方的單元數量列；另完成全站 CTA 卡片一致性檢查（首頁科目卡、考古題 CTA、總體模型總覽、近二年時事、學派演進圖與諾貝爾獎年表均為整張卡片可點擊；計算／申論 CTA 已從各科目首頁移除，題目仍保留在 `#/past-exams/written`），0 頁面水平溢出、0 console errors、0 `.katex-error`；新增投資學核心公式庫 66 條（10 類）與技術分析指標 50 種（5 類），每筆均有 KaTeX 公式、變數、優先級與章節連結檢查；驗證器 114,349 項、失敗 0。
- 已完成：修正 7 個含私人使用字元或合併符號的計算／申論題題幹（107Q4 總體、108Q1 會計／總體、109Q3 投資學兩題、114Q1 會計、115Q2 總體），恢復生產函數、勞動供給、變異數、避險損益、β 與梭羅成長模型公式；行內公式字級提高至 1.06em、參考解答 1.08em、比例與正式公式 1.04em。Chrome CDP 33 個頁面狀態 0 頁面水平溢出、0 console errors、0 `.katex-error`；靜態稽核 4,790 個可轉換子句、0 編譯失敗。
- 已完成：全站數學式自動 KaTeX 化；`renderWrittenAnswer()` 會把正文、名詞、考試重點、記憶卡、解題策略、參考解答、章節摘要、科目說明、圖表說明與考古題題幹／選項中未標記的數學子句自動轉成 KaTeX，靜態稽核 4,790 個可轉換子句、0 編譯失敗；長度超過 240 字元的表格型題幹維持原樣。Chrome CDP 在 1280px／390px、深淺主題與 `file://` 實測 33 個頁面狀態，0 水平溢出、0 console errors、0 `.katex-error`。
- 已完成：總體經濟學學派演進圖移成獨立頁 `#/macro/evolution`；總體經濟學首頁保留一張整張可點擊的 CTA，顯示節點數與諾貝爾里程碑數；舊網址 `#/subject/macro?evolution=1` 仍可開啟獨立頁。Chrome CDP 在 1280px／390px、深淺主題與 `file://` 實測 6 階段、10 節點、19 個模型連結與 15 個諾貝爾里程碑，0 水平溢出、0 console errors、0 `.katex-error`。
- 已完成：投資學與總體經濟學 29 條公式的公開教材逐條核對（#27 BIS CIP、#28 SEC NAV 另以官方資料交叉核對）；網站 `formula` 欄已補上期間單位與適用假設，狀態為「通過（教材）」。
- 已完成：21 張既有總體模型圖的結構、變數／參數表、內部方向檢查與公開教材逐條核對；21/21 為「通過（教材）」，B15 另獲 CBC 官方外匯頁輔助。另完成 `macro-01#2` 國民所得會計帳流程圖與會計學 7 張教學流程圖的結構、章節綁定、變數／參數表與跨圖 ID 檢查；內容均為教學示意，尚未逐條對照公開教材。
- 已完成：投資學 9 張教學圖與會計學 7 張教學流程圖的章節綁定、SVG 結構、變數／參數表與跨圖 ID 唯一性檢查；內容為依教材概念繪製的教學示意，尚未逐條對照公開教材。
- 已完成：會計學新增 3 張財務分析教學圖——`accounting-15#0` 財務分析總架構、`accounting-15#1` 三階段／五階段杜邦分析、`accounting-23#1` 四大財務報表連結；圖表內容取自 `documents/accounting_contents.md`，並補入 14 張相關名詞卡。驗證器 90,373 項、失敗 0。
- 已完成：會計學新增 3 張基礎教學圖——`accounting-14#0-2` 主要財務報表架構、`accounting-14#0-3` 借記／貸記常用項目、`accounting-14#0-4` 從交易到財務報表流程；三張圖與既有 `accounting-14#0` 會計循環圖掛在同一節次並依序顯示。圖表為 inline SVG，含中英文名詞、`title`／`desc`、變數／參數表與示意提醒；同一節次多圖以後綴鍵值支援。驗證器 90,511 項、失敗 0。
- 已完成：以 GPT-6 Luna、Gemini 4 Argon Contributor、Claude Haiku 5.5 完成 29 條公式與 21 張既有模型圖的跨模型初審；記錄見 `documents/content_review_checklist.md` 與 `documents/reviews/`。
- 已完成：58 屆諾貝爾年表、17 組模型圖、2026 屆 `nobel-17` 與跨頁資料綁定的內部結構檢查；投資學 32 條比例分析公式集中於 `window.INVESTMENT_RATIO_FORMULAS`，投資學頁與 investment-14／17 及 investment-04 的 Sharpe 公式共用；32 條全部以 KaTeX 排版。投資學頁另有 5 項選擇權評價優先順序、13 條 KaTeX 公式與 36 項變數定義，二項式（含 Put）、Black-Scholes 與買賣權平價公式亦以 KaTeX 顯示；證券交易相關法規與實務已依 21 項測驗範圍建檔 21 章、21 節；官方 15 部法規逐條匯入 1,507 條，公會自律規範與其他法令以官方連結與摘要呈現；總體經濟學派演進圖集中於 `window.MACRO_EVOLUTION`，6 階段、10 節點、19 個模型連結與 15 個諾貝爾里程碑，模型與諾貝爾資料均回指既有來源；107–115 年考古題集中於 `window.PAST_EXAMS`，29 次、3,710 題，四科與年度總數、題號連續、答案字母、來源連結與 73 章出處分布均納入驗證；107–115 年章節解題集中於各 `content-exam-solutions-*.js` 的 `window.EXAM_SOLUTIONS`，347 節次、601 個例題（348 題計算／申論＋253 題代表選擇題）與題庫連結亦納入驗證；驗證器 90,511 項、失敗 0；另完成 `macro-01#2` 流程圖、投資學 9 張教學圖與會計學 7 張教學流程圖的結構與章節綁定檢查。
- 已完成：macro-01 第3節「其他國民所得衡量工具」新增 `GDP → GNI → NNP → NI → PI → PDI` 七行 KaTeX 推導、`PDI = C + S`、16 張中英文名詞卡與 `macro-01#2` 三面法→PDI 流程圖；內容以常用國民所得會計教材公式整理，並非官方統計手冊的逐條轉錄。1280px／390px、深淺主題與 `file://` 實測 0 水平溢出、0 console errors、0 `.katex-error`；模型總覽 39 張 SVG（22 張總體章節圖＋17 組諾貝爾圖）。
- 學派演進圖的階段分期、提出者與摘要為教學整理，未宣稱單一官方來源；諾貝爾年份、得主與研究領域沿用 58 屆年表，模型名稱沿用 21 張既有模型圖，兩者仍以原資料為單一來源。
- 已完成：以諾貝爾獎官方 API 比對 1969–2026 共 58 屆的年份與得主，0 筆不一致；2026 屆官方公告為 Robert E. Hall 與 Michael Woodford「for microeconomic foundations of macroeconomic stabilisation」。
- 已完成：2026 屆公式與學說對照諾貝爾官方 popular information 與 2026 年科學背景；Hall 的隨機漫步、Woodford 的三方程式模型與新凱因斯菲利浦曲線方向一致，前瞻指引、可信度與透明度亦有官方依據。
- 已完成：2019–2020 屆公式與學說方向對照官方科學背景；2019 ATE 與 2020 勝者魔咒以概念式呈現，2020 原「max Revenue」已修正為勝者魔咒條件，並改寫拍賣格式與結論。
- 已完成：2025 屆公式依官方科學背景修正；原式 `g = λ ln(γ) Q` 的 Q 因子無官方依據，改為 `g = λ(γ−1) ≈ λ ln(γ)`，概念與 Mokyr、Aghion & Howitt 的官方說明一致。
- 已完成：2021 LATE 公式逐式對照官方科學背景；2022–2024 官方式與網站概念式方向一致（Diamond–Dybvig、Goldin、Acemoglu–Johnson–Robinson），2022–2024 仍以概念式呈現。
- 官方核對紀錄：`documents/reviews/2026-10-20-official-verification.md`（諾貝爾 API、2021–2026 科學背景、2026 popular information、IFRS 摘要／準則本文、29 條投資／總體公式教材核對、21 張總體模型圖教材核對、BIS CIP 與 SEC NAV 官方交叉核對、CBC 外匯與國發會景氣指標輔助、26 個來源連結檢查）。
- 已完成：會計學 23 章與證券法規 21 章內容建檔、首頁與導覽加入第四科目、29 個來源清單、搜尋索引與章節頁單元標示；結構驗證通過。
- 已完成：會計公式 A1–A12 核對；A1、A3、A4、A8、A12 對照 IFRS 官方摘要，A5、A7 對照 IFRS 9.5.4.1 與 IFRS 16.24 準則本文（A7 補入復原成本估計），A2、A6、A9–A11 對照公開教材。
- 已完成：諾貝爾頁整合為逐年雙欄（左側屆別資料、右側對應模型圖）；58 列皆有 SVG，重複圖組的內部 ID 已加上年度後綴，390px 改為上下堆疊。
- 已完成：107–115 年考古題練習庫，29 次考試、3,710 題選擇題；題目與官方解答由 PDF 擷取後逐題檢查四個選項、答案字母與題號連續性。115 年第 1、2 次連結證基會官方 PDF；107–114 年試題連結公開鏡像，107–108 年解答連結公開文字版 PDF。特殊答案已固定檢查：108Q3 法規第 28 題 C、D；108Q3 會計第 28 題 B、D；109Q1 法規第 30 題 B、D；112Q3 投資學第 16 題與會計第 15 題 A–D 均給分；114Q1 總體第 14 題 B、C。109Q4 投資學第 11–13 題的共享表格另做修正與固定檢查：第 11 題選項不再殘留題組說明，第 12、13 題題幹都附上經濟情境、機率、股利與股價資料。107Q4 投資學第 12–19 題的共享表格已附入各題題幹，第 11 題頁尾「請」已清除；107Q1 總體第 20 題的符號字型公式已轉為可讀文字，108Q1 會計第 5 題的貝他符號亦已轉為 β。114Q1 投資學第 4–7 題與 115Q2 投資學第 11–15 題也有同類題組資料，已移到對應題幹；112Q2 投資學、114Q2 會計與 115Q2 投資學的題組標記，以及 11 題頁尾「請續背面作答」均已清除。Chrome CDP 在 1280px／390px 與 `file://` 檢查篩選、作答、看答案、換題、瀏覽、全部展開、年度切換與搜尋，0 水平溢出、0 console errors；驗證器總檢查數 81,476、失敗 0。另已完成全部 3,710 題的章節出處建檔：每題的 `sourceId` 指向同一科目的章節，科目頁章節列顯示出題次數與頻率，章節頁列出該章出現的年份與考試次別；出處依題幹、選項與章節內容比對，並以法規名稱、專有名詞與常見題型校正，作為複習導覽，不代表官方命題分類。 另補強考古題延伸名詞與時事內容：歐債危機／PIIGS／馬斯垂克條約、對等關稅、黃金儲備、美國國債、穩定幣、純網銀、一般目的技術、特別預算、TDR、融資自備款、借券成本、補充保費、ESG ETF、FTSE 臺灣指數、VaR、查核意見、法定盈餘公積、董事提名、第一上市（-KY）等；名詞卡總數 1,208。另新增 107–115 年 348 題計算／申論題，全部提供完整參考解答與 9 個總經時事主題，題目與時事均標示章節出處。
- 已完成：107–115 年計算／申論題與代表性選擇題解題過程整合進各科章節；`window.EXAM_SOLUTIONS` 以 `chapterId::sectionIndex` 為鍵，共 347 節次、601 個例題（348 題計算／申論＋253 題代表選擇題），計算／申論例題標示「本站參考解答（非官方）」並以 `questionId` 連結題庫；驗證器 89,852 項、失敗 0，Chrome CDP 於 1280px／390px 抽查各年代表章節，0 水平溢出、0 console errors。
- 已完成：全站繁體中文掃描；未發現簡體字，並將臺灣相關用字統一為「臺灣／臺幣」、佔比用字改為「佔」。英文僅保留得主姓名、專有名詞、公式、縮寫與技術名稱。
- 待完成：諾貝爾年表的年份與得主已完成官方比對，2019–2021、2025、2026 屆公式與學說方向已對照官方科學背景，2022–2024 學說方向已核對；2019–2026 代表原始論文書目已核對，2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall 1978；Woodford 2003 專書未逐條）；其餘全文、其他屆公式、學說摘述與模型圖仍待原始文獻逐條核對。29 條投資／總體公式與 21 張既有模型圖已完成公開教材核對；新增的 `macro-01#2` 國民所得會計帳流程圖與會計學 7 張教學流程圖為教學示意，尚未逐條教材核對，不影響諾貝爾與會計其他待查項目。
- 待完成：會計各章例題的逐題重算；代表性分錄與報表勾稽已於 review 第 2.1 節檢查。A1–A12 公式已完成官方或教材核對，但未逐題重算前仍保持複習整理定位，不宣稱全部內容官方認證。
- 待完成：精確指定的 Claude Sonnet 5.5／Gemini 4 Argon／GPT-6.1 Sol 端點仍待授權後補跑。
- 最後更新：2026-10-22。
