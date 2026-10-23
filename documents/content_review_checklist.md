# 內容與公式複核清單

建立：2026-10-20；更新：2026-10-22（加入會計學與證券法規、首頁第四科目；全站 73 章、200 個學習單元；諾貝爾 58 屆年份與得主完成官方 API 比對；2019–2020 公式與學說方向、2021 LATE 公式與 2022–2024 學說方向完成核對；2025 公式修正、2026 公式完成官方科學背景核對，2019–2026 每年至少一篇代表原始論文完成全文抽查；會計公式 A1–A12 完成 IFRS 官方摘要／準則本文與公開教材核對，代表性分錄與報表勾稽完成；投資學與總體經濟學 29 條公式完成公開教材核對，#27、#28 另以官方資料交叉核對；投資學 32 條比例分析公式集中於單一來源並與對應章節綁定，全部以 KaTeX 排版；投資學頁另有 5 項選擇權評價優先順序與 KaTeX 公式；公式頁 1280px／390px／`file://` QA 通過；證券交易相關法規與實務 21 章、23 節完成建檔，官方 15 部法規逐條匯入 1,507 條，自律規範與其他法令以連結摘要呈現；驗證器 5,245 項（後續擴充至 117,083 項）；118 個學習單元改用 KaTeX 排版；比例公式 29 條分數改用 `\dfrac`，分子分母與表格文字同級；總體經濟學首頁新增學派演進圖（6 階段、10 節點、19 個模型連結、15 個諾貝爾里程碑），模型與諾貝爾資料均回指既有來源；會計學新增 7 張教學流程圖（`accounting-14#0`、`accounting-14#0-2`、`accounting-14#0-3`、`accounting-14#0-4`、`accounting-15#0`、`accounting-15#1`、`accounting-23#1`），驗證器 114,349 項、失敗 0；全站 KaTeX 上下標與 118/118 筆公式實編譯通過；投資學第 6 章新增效率市場三形式比較表，桌面 5 欄、390px 卡片堆疊；移除全站「第 X 篇」標示，投資學公式區塊移成 `#/investment/formulas` 獨立頁面，新增投資學核心公式 66 條與技術分析指標 50 種；總體經濟學學派演進圖移成 `#/macro/evolution` 獨立頁，總體經濟學首頁保留整張可點擊 CTA；各節與各章出題統計區分選擇題與申論題，章節列下方不再顯示單元數量列；全站未標記數學式自動轉 KaTeX；修正 7 個破損題幹並提高公式字級）

用途：在修改章節、名詞或公式後，留下可重現的校對紀錄。官方公告、統計與正式教材是最終依據；ChatGPT、Gemini、Claude 只作為獨立比對的輔助。

官方核對紀錄：`documents/reviews/2026-10-20-official-verification.md`（諾貝爾 API、2021–2026 科學背景、2026 popular information、IFRS 摘要、投資／總體公式教材核對、21 張模型圖教材核對、代表性會計分錄與報表勾稽、BIS CIP 與 SEC NAV 官方交叉核對、26 個來源連結檢查）。

## 一、章節界線檢查

| 檢查項目 | 結果 | 備註 |
| --- | --- | --- |
| 總體經濟學使用 `documents/gross_economics_contents.md` 的 Parts 1–2 | ☑ 通過 | 第 1–13 章；49 個來源節次＋1 個景氣訊號燈＋6 個進階補給＝56 節 |
| 總體經濟學 Part 2「金融市場」第 11–13 章完整出現 | ☑ 通過 | 歸屬總體經濟學科目，不與投資學共用 |
| 投資學只使用 `documents/investment_contents.md` 的 Parts 1–5 | ☑ 通過 | 16 章、48 個學習重點（45 個來源重點＋3 個測驗範圍補充） |
| 投資學保留第十一章到第十三章的編號跳號 | ☑ 通過 | 不得自行補第十二章 |
| 投資學沒有總體經濟學的任何章節 | ☑ 通過 | 含 Parts 1–2 的總體章節皆不得混入 |
| 投資學章內單元標為「學習重點」而非官方「第 N 節」 | ☑ 通過 | 來源沒有節名 |
| 投資學比例分析公式列表 | ☑ 通過 | 32 條集中於 `window.INVESTMENT_RATIO_FORMULAS`；`#/investment/formulas` 顯示 32 條，investment-14 顯示 26 條、investment-17 顯示 6 條，investment-04 以 `ratioFormulaId` 引用 Sharpe；29 條分數以 `\dfrac` 排版，分子與分母跟表格文字同級；390px 改為卡片堆疊 |
| 選擇權評價優先順序 | ☑ 通過 | 5 項集中於 `window.INVESTMENT_OPTION_PRIORITIES`；買賣權損益、二項式、Black-Scholes、買賣權平價與進階模型用途；`#/investment/formulas` 顯示 5 列、5 卡、13 條 KaTeX 公式與 36 項變數定義 |
| 投資學頁碼只顯示篇起始頁 | ☑ 通過 | 來源沒有各章頁碼 |
| 會計學使用 `documents/accounting_toc.md` 的第 1–23 章 | ☑ 通過 | 來源列出的 23 章完整出現，頁碼依來源；財務分析圖表內容另參考 `documents/accounting_contents.md` |
| 會計學有來源節名的章節逐節比對 | ☑ 通過 | 第 1–7、12–15、20 章共 41 節；標題為「第N節 …」 |
| 會計學未列節名的章節以「學習重點」標示 | ☑ 通過 | 第 8–11、16–19、21–23 章共 23 個補充單元（第 19 章增加外匯風險分析） |
| 會計學第 23 章保留來源章號印刷錯誤的註記 | ☑ 通過 | 原書印為 22，本站依順序列為第 23 章 |
| 會計學沒有混入總體或投資章節 | ☑ 通過 | 章節 ID 皆以 `accounting-` 開頭 |
| 首頁、導覽、搜尋與來源頁已加入會計學與證券法規 | ☑ 通過 | 首頁 4 張科目卡；導覽 6 個連結；搜尋索引與 26 個來源 |
| 證券交易相關法規與實務 | ☑ 通過 | 依 `ExamScope.md` 與 `documents/securities_law_contents.md` 建檔 21 章、23 節；14 頁官方全文（15 部法規、1,507 條），7 頁自律規範／其他法令連結摘要 |
| 測驗範圍補充 | ☑ 通過 | 總體 Ch8 景氣訊號燈；投資 Ch7 利率期限結構、Ch8 交易制度、Ch16 客戶風險態度與稅負；會計 Ch19 外匯風險 |
| 會計學公式與分錄 | 通過（代表項目） | A1–A12 公式均已核對（A1、A3–A5、A7、A8、A12 依 IFRS 官方；A2、A6、A9–A11 依公開教材）；代表性分錄與報表勾稽已檢查（review 2.1）；各章例題逐題重算仍待 |
| `node site/scripts/validate-content.js` 通過 | ☑ 通過 | 失敗數應為 0 |
| 總體經濟學模型圖掛在正確的章節與節次 | ☑ 通過 | 22 張（含 1 張教學流程圖）；`chapterId#sectionIndex` 與 `sectionTitle` 一致 |
| 每張模型圖與教學流程圖都有變數表、參數表與示意提醒 | ☑ 通過 | `variables`、`parameters` 皆為 `[符號, 名稱, 說明]` |
| 模型圖與教學流程圖為 inline SVG，沒有外部圖片或腳本 | ☑ 通過 | 需有 `viewBox`、`role="img"`、`aria-labelledby`、`<title>` |
| 模型圖與教學流程圖在窄螢幕可在區塊內水平滑動 | ☑ 通過 | 390px 實測頁面無水平溢出，且顯示滑動提示 |
| 總體經濟模型總覽頁 | ☑ 通過 | `#/models/macro` 依 13 章分組、22 張章節圖（含 1 張教學流程圖）；沒有模型的章節仍列出 |
| 會計學教學流程圖掛在正確章節與節次 | ☑ 通過 | 7 張（`accounting-14#0`、`accounting-14#0-2`、`accounting-14#0-3`、`accounting-14#0-4`、`accounting-15#0`、`accounting-15#1`、`accounting-23#1`）；同一節次允許多張圖，`chapterId#sectionIndex` 與 `sectionTitle` 一致 |
| 章節教學圖總數 | ☑ 通過 | 38 張（總體 22、投資 9、會計 7） |
| 模型總覽與章節頁共用同一份模型資料 | ☑ 通過 | 兩邊皆讀取 `window.MACRO_DIAGRAMS`；修改後重新載入同步 |
| 諾貝爾年表 58 屆、1969–2026 完整出現 | ☑ 通過 | 2026 屆已納入；58 屆年份與得主已對照諾貝爾獎官方 API，0 筆不一致 |
| 17 組諾貝爾模型與年表映射 | ☑ 通過 | `nobel-01`–`nobel-17` 均有圖；2026 屆對應 `nobel-17`，無缺圖或孤兒圖 |
| 諾貝爾頁與模型總覽共用同一份資料 | ☑ 通過 | 兩邊皆讀取 `window.NOBEL_DATA` 與 `window.NOBEL_DIAGRAMS` |
| 諾貝爾年表與模型圖整合 | ☑ 通過 | 58 列逐年雙欄，左側屆別資料、右側對應 SVG；17 組各有一個首屆錨點，58 份 SVG 的內部 ID 皆唯一 |
| 全站中文為臺灣繁體中文 | ☑ 通過 | 簡體字掃描為 0；臺灣相關用字統一為「臺灣／臺幣」，佔比用字改為「佔」 |
| 2026 屆官方資訊 | ☑ 年份、得主、公式與學說概念通過；代表原始論文書目已核對，全文待查 | 官方 API 確認得主與動機；popular information 與 2026 科學背景確認 Hall 隨機漫步、Woodford 三方程式模型、新凱因斯菲利浦曲線、前瞻指引與可信度；Hall (1978)、Woodford (2003) 書目已核對 |

## 二、公式比對紀錄

填寫方式：

- 「目前寫法（數學主式）」記錄網站公式的數學主式；網站 `formula` 欄另附期間單位與適用假設。
- 「官方／教材依據」記錄網站、頁面標題、查詢日期或教材版本。
- 三個模型欄位記錄「同意／不同意／待查」；不同意者保留理由，同意者的完整理由見 `documents/reviews/`。
- 「判定」填「通過」、「通過（教材）」、「通過（官方）」、「修正」或「待查」；「通過（教材）」表示已對上公開教材／課程講義，不等同官方認證。
- 若模型與官方來源衝突，以官方來源為準，並在備註說明。

> 2026-10-20 跨模型比對：ChatGPT（GPT-6 Luna）、Gemini（Gemini 4 Argon Contributor）、Claude（Claude Haiku 5.5）。模型回答只作輔助；三欄僅記判定，完整理由見 `documents/reviews/`，不同意者保留理由。本輪已另完成 29 條公式的公開教材逐條核對，最終判定以來源為準。
>
> 2026-10-20 內部一致性：本表「目前寫法」保留數學主式；網站各章的 `formula` 欄已補上期間單位與適用假設。已核對樣式差異項，數學意義一致。

| # | 科目／章 | 項目 | 目前寫法（數學主式） | 官方／教材依據 | ChatGPT | Gemini | Claude | 判定 | 修正或備註 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 總體 Ch1 | GDP 支出面 | `GDP = C + I + G + X − M` | [OpenStax Macro 3e 6.1](https://openstax.org/books/principles-macroeconomics-3e/pages/6-1-measuring-the-size-of-the-economy-gross-domestic-product) | 同意 | 同意 | 同意 | 通過（教材） | 支出面恆等式逐式一致；GDP 為期間流量，C、I、G 為國內最終支出，I 含存貨變動；X−M 為淨出口，可為負。 |
| 2 | 總體 Ch2 | 簡單凱因斯乘數 | `Y = 1/(1 − MPC) × A₀` | [MIT 14.02 Spring 2023 PS2](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/mit14_02_s23_pset2.pdf)；[OpenStax Macro 3e Appendix B](https://openstax.org/books/principles-macroeconomics-3e/pages/b-the-expenditure-output-model) | 同意 | 同意 | 同意 | 通過（教材） | MIT 式 `Y=[c0−c1t0+G+I]/(1−c1)`、`dY/dG=1/(1−c1)`；網站 A₀ 為自發支出，對應 T=0 的封閉、無進口、物價固定模型。若有定額稅，A₀ 內含 `−c1t0`；有進口或所得稅時乘數較小。 |
| 3 | 總體 Ch5 | 簡單貨幣乘數 | `M = m × B；m = 1 ÷ rr` | [OpenStax Macro 3e 14.4](https://openstax.org/books/principles-macroeconomics-3e/pages/14-4-how-banks-create-money) | 同意 | 同意 | 同意 | 通過（教材） | 來源以「貨幣乘數=1/準備率」及超額準備變動示範存款創造；網站 `M=m×B` 是準備貨幣版本，等價於 B=R、M=D 的簡單模型。假設無超額準備、無現金流失、銀行貸出全部超額準備；B 為準備貨幣。 |
| 4 | 總體 Ch6 | IS-LM 均衡 | `IS：Y = C(Y−T) + I(i) + G；LM：M/P = L(Y,i)` | [Hanover College IS-LM notes](https://vault.hanover.edu/~eiriksson/classes/214/files/EC214ISLMalgebraically.pdf)；[LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model) | 同意 | 同意 | 同意 | 通過（教材） | Hanover 式 `Y=C+I+G`、`C=C0+CY(Y−T)`、`I=I0−Irr`、`M/P=L0−Lii+LyY`，並明示封閉經濟；LibreTexts 明示物價固定。網站以 i 取代 r、I(i) 取代 I(r)，在封閉經濟、物價固定、預期通膨為零時等價；未含國外部門。 |
| 5 | 總體 Ch9 | 菲利浦曲線 | `π = πᵉ − β(u − uₙ) + ε` | [MIT 14.02 Lecture 12](https://web.mit.edu/14.02/www/S04/lecture12.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `π_t=π_t^e−α(u_t−u_n)`；網站 β=α>0、ε 為供給衝擊，ε=0 時逐式一致。這是短期預期增廣菲利浦曲線；長期 u=u_n，不存在永久失業—通膨取捨。 |
| 6 | 總體 Ch10 | 開放經濟乘數 | `1 ÷ (1 − MPC + MPM)` | [MIT 14.02 Open Economy handout](https://web.mit.edu/14.02/www/krugman/exchange.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `Y=ZZ0/(1−c1+εm1)`，ε 為實質匯率、m1 為邊際進口傾向；網站 `1/(1−MPC+MPM)` 是 ε=1、無稅的簡化式。ε≠1 時分母應為 `1−MPC+ε×MPM`；模型假設物價與匯率給定。 |
| 7 | 投資 Ch3 | 持有期間報酬 | `HPR = (P₁ − P₀ + D₁) ÷ P₀` | [OpenStax Finance 15.1](https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset) | 同意 | 同意 | 同意 | 通過（教材） | 來源總報酬率=股利收益率+資本利得率，等價於 `(P1−P0+D1)/P0`；D1 為期間現金收益，P0>0，未計稅費；報酬與現金收益採同一期間。 |
| 8 | 投資 Ch3 | 報酬變異數 | `σ² = Σ pᵢ × [Rᵢ − E(R)]²` | [LibreTexts 8.2](https://biz.libretexts.org/Courses/Aurora_University/Principles_of_Financial_Management/08%3A_Valuation_of_Financial_AssetsRisk_and_Return/8.02%3A_Measuring_Risk_and_Expected_Return) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `σ²=Σp(s)[r(s)−E(r)]²`；p 合計 1，`E(R)=ΣpR`；此為報酬分布之母體變異數，標準差為平方根；報酬與機率同一期間。 |
| 9 | 投資 Ch4 | 兩資產組合變異數 | `σₚ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂` | [LibreTexts 8.2](https://biz.libretexts.org/Courses/Aurora_University/Principles_of_Financial_Management/08%3A_Valuation_of_Financial_AssetsRisk_and_Return/8.02%3A_Measuring_Risk_and_Expected_Return)；[MIT 15.401 Sample Final](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/f8870d5f537f04e75e7ecc243416e02a_MIT15_401F08_final.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `σp²=w1²σ1²+w2²σ2²+2w1w2σ1σ2ρ12`；w1+w2=1，ρ12 為相關係數（非共變異數）；允許放空時權重可為負。 |
| 10 | 投資 Ch5 | CAPM | `E(Rᵢ) = R_f + βᵢ × [E(R_m) − R_f]` | [OpenStax Finance 15.3](https://openstax.org/books/principles-finance/pages/15-3-the-capital-asset-pricing-model-capm) | 同意 | 同意 | 同意 | 通過（教材） | CAPM 逐式一致；`E(Rm)−Rf` 為市場風險溢酬，βi 衡量系統風險；報酬頻率需一致，CAPM 假設無稅費、可無風險借貸、市場組合有效等。 |
| 11 | 投資 Ch5 | Beta | `βᵢ = Cov(Rᵢ, R_m) ÷ Var(R_m)` | [MIT 15.401 Sample Final](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/f8870d5f537f04e75e7ecc243416e02a_MIT15_401F08_final.pdf)；[OpenStax Finance 15.3](https://openstax.org/books/principles-finance/pages/15-3-the-capital-asset-pricing-model-capm) | 同意 | 同意 | 同意 | 通過（教材） | `βi=Cov(Ri,Rm)/Var(Rm)`，即 Ri 對 Rm 的迴歸斜率；Cov 與 Var 用同一報酬頻率；市場 β=1。 |
| 12 | 投資 Ch7 | 債券價格 | `P = Σ C/(1+y)ᵗ + F/(1+y)ⁿ` | [OpenStax Finance 10.2](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation) | 同意 | 同意 | 同意 | 通過（教材） | 來源債券價格=票息年金現值+面額現值；C 與 y 必須同為每期單位，n 為期數，F 為面額；假設無違約、無嵌入選擇權、YTM 固定。 |
| 13 | 投資 Ch7 | 存續期間與凸性 | `ΔP/P ≈ −D* × Δy + ½ × 凸性 × (Δy)²；D* = D ÷ (1 + y/k)` | [MIT 15.401 Lecture 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `D*=D/(1+y/k)`、`ΔP/P≈−D*Δy+½×凸性×(Δy)²`；D 為 Macaulay 年數，y 為年化殖利率，k 為每年付息次數；Δy 用小數；為小幅變動近似，忽略高階項。 |
| 14 | 投資 Ch8 | 高登成長模型 | `P₀ = D₁ ÷ (r − g)` | [OpenStax Finance 11.2](https://openstax.org/books/principles-finance/pages/11-2-dividend-discount-models-ddms) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `P0=D1/(r−g)`；D1 為下一期股利，r 為要求報酬，g 為固定股利成長率，且 r>g；無限到期、無額外成長階段。 |
| 15 | 投資 Ch9 | 賣權買權平價 | `C + K/(1+r)ᵀ = P + S₀` | [MIT 15.401 Recitation 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `C+K/(1+r)^T=P+S0`；歐式、無股利、相同 K 與到期日、無套利。美式或含股利時需調整，不能直接套用。 |
| 16 | 投資 Ch10 | 期貨理論價格 | `F₀ = S₀ × e^{(r−q)T}` | [FIU/Hull Ch5](https://faculty.fiu.edu/~dupoyetb/Financial_Risk_Mgt/lectures/Ch05.pdf)；[MIT 15.401 Lecture 8](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/a66f697aaeb23b8cfd2bda020172feb5_MIT15_401F08_lec08.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `F0=S0e^{(r−q)T}`；q 為契約期間平均收益率（連續複利），r 為 T 年期無風險利率；T 以年計、連續複利；不另計儲存成本與便利收益，無套利。 |
| 17 | 投資 Ch10 | 期貨避險契約數 | `N ≈ (β目標 − β現貨) × 現貨部位價值 ÷ 每口期貨契約價值` | [Case Western Ch3](https://faculty.weatherhead.case.edu/phr/textbook/chapter3ps.pdf)；[CSUN Finance 436](http://www.csun.edu/~zz1802/Finance%20436/Web-Stuff-1/Review-Notes-I.pdf) | 同意 | 同意 | 同意 | 通過（教材） | Case Western 全額避險式 `Hedge Ratio=β×S(0)/F(0)`，即 `N*=β×組合價值÷期貨契約價值`；CSUN 例題以 β=1.10、N*=7.12、目標 β=0.55 示範調整。一般式 `N=(β目標−β現貨)×現貨價值÷期貨契約價值`；全數避險 β目標=0、期貨 β≈1 時化為 `β現貨×...`；負值代表賣出期貨，基差風險仍在。 |
| 18 | 投資 Ch14 | 杜邦分解 | `ROE = 淨利率 × 總資產週轉率 × 權益乘數` | [OpenStax Finance 6.6](https://openstax.org/books/principles-finance/pages/6-6-profitability-ratios-and-the-dupont-method) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `ROE=淨利率×總資產週轉率×權益乘數`；權益乘數=平均總資產÷平均權益；分子分母同一期間。 |
| 19 | 投資 Ch17 | Sharpe 比率 | `(Rₚ − R_f) ÷ σₚ` | [OpenStax Finance 15.4](https://openstax.org/books/principles-finance/pages/15-4-applications-in-performance-measurement) | 同意 | 同意 | 同意 | 通過（教材） | `Sharpe=(Rp−Rf)/σp`；Rp 為期間平均報酬，σp 為總風險標準差，Rf 取同期限；同報酬頻率、事後評估；數值越高越好，可為負。 |
| 20 | 投資 Ch17 | Treynor 比率 | `(Rₚ − R_f) ÷ βₚ` | [OpenStax Finance 15.4](https://openstax.org/books/principles-finance/pages/15-4-applications-in-performance-measurement) | 同意 | 同意 | 同意 | 通過（教材） | `Treynor=(Rp−Rf)/βp`；βp 為系統風險，Rf 取同期限；同報酬頻率、事後評估；分子可負，βp 不可為零。 |
| 21 | 投資 Ch17 | Jensen α | `Rₚ − [R_f + βₚ(R_m − R_f)]` | [OpenStax Finance 15.4](https://openstax.org/books/principles-finance/pages/15-4-applications-in-performance-measurement) | 同意 | 同意 | 同意 | 通過（教材） | `Jensen α=Rp−[Rf+βp(Rm−Rf)]`；以 CAPM 為基準，α>0 表示調整系統風險後的正超額報酬；同報酬頻率、事後評估。 |
| 22 | 總體 Ch12 | 費雪方程式 | `實質利率 ≈ 名目利率 − 預期通膨率` | [OpenStax Finance 7.4](https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance) | 同意 | 同意 | 同意 | 通過（教材） | 精確式 `1+i=(1+R)(1+h)`，網站近似 `R≈i−h`；i 名目、R 實質、h 預期通膨，同週期且用小數；h 越大近似誤差越大。 |
| 23 | 總體 Ch12 | 期限結構遠期利率 | `(1 + y_n)ⁿ = (1 + y₁)(1 + f₂)…(1 + f_n)` | [SMU Financial Mathematics Ch3](http://www.mysmu.edu/faculty/yktse/fma/s_fma_3.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 來源 `(1+iSt)^t=(1+iF1)…(1+iFt)`；網站 y_n 為 n 期即期年化利率、f_t 為第 t 期一年期隱含遠期利率；採相同複利與期間單位，無套利。 |
| 24 | 總體 Ch12 | 修正存續期間 | `D* = D ÷ (1 + y/k)` | [MIT 15.401 Lecture 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf) | 同意 | 同意 | 同意 | 通過（教材） | `D*=D/(1+y/k)`；D 為 Macaulay 存續期間（年），y 為年化殖利率，k 為每年付息次數；若 y 已為每期利率，分母改 `1+y`；Δy 用小數。 |
| 25 | 總體 Ch12 | 存續期間與凸性 | `ΔP/P ≈ −D* × Δy + ½ × 凸性 × (Δy)²` | [MIT 15.401 Lecture 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf) | 同意 | 同意 | 同意 | 通過（教材） | `ΔP/P≈−D*Δy+½×凸性×(Δy)²`；Δy 用小數，凸性與 y/k 同週期；小變動近似，忽略高階項。 |
| 26 | 總體 Ch13 | 債券價格 | `P = Σ C/(1+y)ᵗ + F/(1+y)ⁿ` | [OpenStax Finance 10.2](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation) | 同意 | 同意 | 同意 | 通過（教材） | 與投資 Ch7 同式；C、y 同為每期單位，n 為期數，F 為面額；假設無違約、無嵌入選擇權、YTM 固定。 |
| 27 | 總體 Ch13 | 遠期匯率 | `遠期匯率 ≈ 即期匯率 × (1 + 本國利率) ÷ (1 + 外國利率)` | [BIS Quarterly Review, Box A](https://www.bis.org/publications/qr-201609/covered-interest-parity-lost-understanding-cross-currency-basis) | 同意 | 同意 | 同意 | 通過（教材） | BIS 以直接報價（USD/外幣）定義 `F/S=(1+r)/(1+r*)`；網站移項為 `F≈S(1+r)/(1+r*)`，在相同到期日、無交易成本、無套利時成立。實際市場可能有基差，故用「≈」；此列另以官方資料交叉核對。 |
| 28 | 總體 Ch13 | 基金淨資產價值 | `NAV = (基金資產總值 − 負債) ÷ 受益權單位數` | [SEC Investor.gov NAV](https://www.investor.gov/introduction-investing/investing-basics/glossary/net-asset-value) | 同意 | 同意 | 同意 | 通過（教材） | SEC 官方定義 NAV=總資產−總負債；每單位 NAV 再除以流通在外單位數。資產按市價、負債與單位數同一評價時點；申購費與費用另計。此列另以官方資料交叉核對。 |
| 29 | 總體 Ch13 | 選擇權到期內在價值與期貨理論價 | `買權 max(S_T − K, 0)；賣權 max(K − S_T, 0)；F₀ = S₀ × e^{(r−q)T}` | [MIT 15.401 Recitation 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf)；[OpenStax Finance 20.3](https://openstax.org/books/principles-finance/pages/20-3-exchange-rates-and-risk)；[FIU/Hull Ch5](https://faculty.fiu.edu/~dupoyetb/Financial_Risk_Mgt/lectures/Ch05.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 買權 `max(ST−K,0)`、賣權 `max(K−ST,0)` 為到期內在價值，未扣權利金；買方損益=到期內在價值−權利金，賣方相反（OpenStax 所稱 payoff 已含權利金，兩者名詞不同）。期貨式同 #16：連續複利、q 為契約期間平均收益率、不另計儲存成本與便利收益。 |

> 小結：29 條公式已於 2026-10-20 完成逐條核對，全部改為「通過（教材）」；#27 另以 BIS 官方 CIP 定義、#28 另以 SEC Investor.gov 官方 NAV 定義交叉核對。通過條件是數學式、變數定義、期間單位與假設都與來源一致；網站公式已補上原本省略的假設。此狀態表示「教材／課程講義已對上」，不是官方對本站全部內容的認證。

### 會計學公式清單（內部建檔，尚未跨模型比對）

| # | 科目／章 | 項目 | 網站公式 | 官方／教材依據 | 判定 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | 會計 Ch1 | 約當現金 | `自取得日起到期日 ≤ 3 個月，且價值變動風險很小` | [IAS 7 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/) | 通過 | 官方摘要確認短期、高流動性與價值變動風險很小；三個月門檻依 IAS 7.7 |
| A2 | 會計 Ch1 | 票據貼現 | `到期值 = 面額 ×（1 + 票面利率 × 期間）；貼現息 = 到期值 × 貼現率 × 貼現期間` | [三民輔考「應收帳款」](https://www.3people.com.tw/%E7%9F%A5%E8%AD%98/%E6%87%89%E6%94%B6%E5%B8%B3%E6%AC%BE/%E5%85%AC%E8%81%B7%E8%80%83%E8%A9%A6-%E9%AB%98%E6%99%AE%E5%88%9D%E3%80%81%E5%9C%B0%E7%89%B9-%E8%B2%A1%E7%A8%85%E8%A1%8C%E6%94%BF/75abcb35-1c2e-4b7c-9e44-81fe9cfd3f56) | 通過 | 教材核對：到期值＝面額＋到期利息；貼現息＝到期值×貼現率×貼現期間；期間單位要一致；不附息票據到期值＝面額 |
| A3 | 會計 Ch2 | 存貨淨變現價值 | `NRV = 估計售價 − 完成成本 − 銷售費用；期末存貨 = min（成本, NRV）` | [IAS 2 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/) | 通過 | 官方摘要確認成本與 NRV 孰低及 NRV 定義 |
| A4 | 會計 Ch3 | 折舊與減損 | `直線法折舊 =（成本 − 殘值）÷ 耐用年限；減損 = 帳面金額 − 可回收金額` | [IAS 16 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/)；[IAS 36 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/) | 通過 | 官方摘要確認折舊與減損；直線法為計算方法，可回收金額取兩者較高 |
| A5 | 會計 Ch4 | 攤銷後成本利息 | `利息收入 = 期初總帳面金額 × 有效利率（信用減損資產改用攤銷後成本）` | [IFRS 9 準則本文](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2026/issued/ifrs9.html) | 通過 | IFRS 9.5.4.1：原則上以有效利率乘總帳面金額；信用減損資產改用攤銷後成本。折價攤銷增帳面、溢價攤銷減帳面 |
| A6 | 會計 Ch6 | 公司債發行價格 | `Σ 票面利息 ÷（1 + 市場利率）^t + 面額 ÷（1 + 市場利率）^n` | [OpenStax《Principles of Finance》10.2 Bond Valuation](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation) | 通過 | 教材核對：債券價格＝票面利息年金現值＋面額現值；市場利率採 YTM；半年付息需將利率與期數調整 |
| A7 | 會計 Ch9 | 使用權資產 | `使用權資產 = 租賃負債 + 預付租賃款 − 租賃誘因 + 初始直接成本 + 復原成本估計` | [IFRS 16 準則本文](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2026/issued/ifrs16.html) | 通過 | IFRS 16.24(a)–(d)：租賃負債、預付租賃款減租賃誘因、初始直接成本、除役與復原成本估計。原公式漏列復原成本，已補入 |
| A8 | 會計 Ch10 | 遞延所得稅 | `遞延所得稅 = 暫時性差異 × 預期適用稅率` | [IAS 12 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-12-income-taxes/) | 通過 | 官方摘要確認暫時性差異與預期適用稅率；遞延所得稅資產需評估可回收性 |
| A9 | 會計 Ch15 | 杜邦分解 | `ROE = 淨利率 × 總資產週轉率 × 權益乘數` | [OpenStax《Principles of Finance》6.6 DuPont](https://openstax.org/books/principles-finance/pages/6-6-profitability-ratios-and-the-dupont-method) | 通過 | 教材核對：ROE＝淨利率×總資產週轉率×權益乘數；權益乘數＝平均總資產÷平均權益 |
| A10 | 會計 Ch20 | WACC | `WACC = W_d × r_d ×（1 − T）+ W_e × r_e` | [OpenStax《Principles of Finance》17.3 WACC](https://openstax.org/books/principles-finance/pages/17-3-calculating-the-weighted-average-cost-of-capital) | 通過 | 教材核對：無特別股時的 WACC；若有特別股需加 W_p×r_p；權重宜採市場價值 |
| A11 | 會計 Ch21 | NPV 與營業現金流 | `NPV = −CF₀ + Σ CFₜ ÷（1 + r）ᵗ；營業現金流 =（收入 − 現金費用）×（1 − T）+ 折舊 × T` | [OpenStax《Principles of Finance》16.2 NPV](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method)；[Ole Miss FIN 331 Ch9](http://faculty.bus.olemiss.edu/rvanness/Courses/Fin%20331/Chapter%209.pdf) | 通過 | 教材核對：NPV＝現金流入現值−現金流出現值；OCF 稅盾法＝(Sales−Costs)(1−T)+D×T；沉沒成本不相關 |
| A12 | 會計 Ch23 | 基本每股盈餘 | `（淨利 − 特別股股利）÷ 加權平均流通在外普通股股數` | [IAS 33 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-33-earnings-per-share/) | 通過 | 官方摘要確認分子為歸屬普通股權益持有人、分母為加權平均股數 |

> 小結：A1–A12 已於 2026-10-20 完成公式核對。A1、A3、A4、A5、A7、A8、A12 依 IFRS 官方摘要／準則本文；A2、A6、A9–A11 依公開教材（三民輔考、OpenStax《Principles of Finance》、Ole Miss FIN 331）。A10 為無特別股版本；A2、A6 的期間與付息頻率需依題目調整。代表性分錄與報表勾稽已檢查（review 2.1）；各章例題逐題重算仍待。

### 會計分錄與報表勾稽（2026-10-20）

- 已重算零用金撥補、備抵壞帳沖銷與收回、有追索權票據貼現、公司債溢價攤銷、庫藏股再發行、股票股利、現金流量表間接法、存貨錯誤跨期、保留盈餘與基本 EPS。
- 代表性數字：公司債面額 100,000、票面 5%、市場 4%、3 年，發行價 102,775.09；現金流量表 CFO 58、投資 −15、籌資 ＋10，現金淨增 53，期末現金 153 與資產負債表一致。
- 修正：存貨錯誤的跨期保留盈餘說明、股票股利的股本／資本公積說明、公司債有效利率、Ch20 EPS／WACC 與 Ch23 保留盈餘的簡化條件。
- 外部教材：OpenStax《Principles of Accounting, Volume 1》（未計入網站 26 個來源）；完整紀錄見 `documents/reviews/2026-10-20-official-verification.md` 第 2.1 節。
- 限制：各章例題尚未逐題重算；OpenStax 為美國 GAAP 教材，股票股利與公司債表達在 IFRS／臺灣實務可能有差異。

### 會計進階分錄與勾稽（2026-10-20）

- 租賃：期末給付 100,000、3 年、5%，租賃負債現值 272,324.80；加初始直接成本與復原成本後使用權資產 287,324.80；第 1 年利息 13,616.24。
- 收入：交易價格 100,000 按單獨售價 60,000／40,000 分攤；預收 100,000，交付第一項後合約負債剩 40,000。
- 遞延所得稅：會計利潤 100,000、稅上折舊多 20,000、稅率 20%，當期稅 16,000、DTL 4,000、所得稅費用 20,000。
- 合併商譽：對價 500＋NCI 50＋先前持有 30−可辨認淨資產 520＝60。
- 資本預算：OCF 44、NPV 66.79（r=10%、5 年）。
- 來源：IFRS 16／15／12／10／3 官方摘要、OpenStax Finance 16.2；完整紀錄見 `documents/reviews/2026-10-20-official-verification.md` 第 2.2 節。

## 三、模型圖比對紀錄

填寫方式：

- 「目前圖示重點」寫出曲線方向、均衡點與外生變數變動後的移動方向。
- 「官方／教材依據」記錄網站、頁面標題、查詢日期或教材版本；本節連結均於 2026-10-20 查閱。
- 三個模型欄位記錄「同意／不同意／待查」；不同意者保留理由，同意者的完整理由見 `documents/reviews/`。
- 「判定」填「通過（教材）」、「通過（官方）」、「修正」或「待查」；「通過（教材）」表示已對上公開教材／課程講義，不等同官方對本站全部內容的認證。
- 模型與官方來源衝突時，以官方來源為準，並在備註說明。
- 本輪 21 張圖已完成外部教材核對；B15 另獲 CBC 官方外匯頁輔助，B12 的臺灣景氣指標另以國發會頁面輔助。

> 2026-10-20 跨模型比對：ChatGPT（GPT-6 Luna）、Gemini（Gemini 4 Argon Contributor）、Claude（Claude Haiku 5.5）。模型回答只作輔助；三欄僅記判定，完整理由見 `documents/reviews/`，不同意者保留理由。本輪後續已完成 21 張圖的公開教材逐條核對，最終判定以來源為準。

| # | 科目／章 | 模型圖 | 目前圖示重點 | 官方／教材依據 | ChatGPT | Gemini | Claude | 判定 | 修正或備註 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 總體 Ch1 | 兩部門循環流量 | 家計與廠商、要素市場與商品市場、三面法 GDP | [OpenStax Macro 3e 1.3](https://openstax.org/books/principles-macroeconomics-3e/pages/1-3-how-economists-use-theories-and-models-to-understand-economic-issues) | 同意 | 同意 | 同意 | 通過（教材） | 教材確認家計／廠商、要素市場、商品市場與循環流量；圖未畫金融市場，I、S 僅為輔助恆等式，已補註記。 |
| 2 | 總體 Ch2 | 簡單凱因斯 AE/45° | 無比例稅／無進口時 AE 斜率為 MPC；自發支出↑使 AE 上移，Y₀→Y₁ | [OpenStax Macro 3e Appendix B](https://openstax.org/books/principles-macroeconomics-3e/pages/b-the-expenditure-output-model) | 同意 | 同意 | 同意 | 通過（教材） | 45° 線、AE 均衡、自發支出上移與乘數一致；AE 斜率已限定為無比例稅／無進口的 MPC，一般式為 MPC(1 − t) − MPM。 |
| 3 | 總體 Ch2 | 節儉的矛盾 | 自發消費↓使 AE 下移，均衡所得下降 | [CORE Econ 5.8](https://books.core-econ.org/the-economy/macroeconomics/05-macroeconomic-policy-08-government-austerity.html) | 同意 | 同意 | 同意 | 通過（教材） | CORE Econ 5.8 明確使用 paradox of thrift，並以自發消費下降、所得下降說明，與圖的平行下移一致。 |
| 4 | 總體 Ch5 | 存款貨幣創造 | 原始存款→放款→次級存款；ΔD = ΔR × 1 ÷ rr | [OpenStax Macro 3e 14.4](https://openstax.org/books/principles-macroeconomics-3e/pages/14-4-how-banks-create-money)；[Lardbucket 15.1](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s18-01-a-more-sophisticated-money-mul.html) | 不同意：廣義乘數應為(1+c)/(rr+e+c) | 不同意：含現金流失率c之完整貨幣乘數應為(1+c)/(rr+e+c)。 | 不同意：乘數公式有誤，標準應為(1+c)÷(rr+e+c)。 | 通過（教材） | 簡單乘數與完整 m₁ 式均一致；完整式為 (1 + c) ÷ (rr + e + c)，簡單模型的無超額準備、無現金流失假設已保留。 |
| 5 | 總體 Ch5 | 流動性偏好 | Md 向下；Y↑使 Md 右移、i↑；Ms 垂直 | [Mishkin Ch. 5 流動性偏好講義](http://home.cerge-ei.cz/pstankov/teaching/VSE/Reading/Mishkin4.1.pdf)；[MIT 14.02 Lec. 4](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1sWJWc4iYESuo4fu0vAqT8aS-KuSosPpq_transcript.pdf) | 同意 | 同意 | 同意 | 通過（教材） | Md 向下、Ms 垂直、Y↑使 Md 右移且 i↑一致；k、h 已改標敏感度係數，並補線性式 Md/P = kY − hi。 |
| 6 | 總體 Ch6 | IS-LM 均衡 | IS 向下、LM 向上，交點為同時均衡 | [LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)；[Saylor ECON302-6.2](https://resources.saylor.org/wwwresources/archived/site/wp-content/uploads/2011/07/ECON302-6.2.pdf) | 同意 | 同意 | 同意 | 通過（教材） | IS 向下、LM 向上、交點為商品與貨幣市場同時均衡；採傳統向上 LM 教材版本，並註明短期物價固定。 |
| 7 | 總體 Ch6 | 財政與貨幣政策移動 | IS 右移：Y↑、i↑；LM 右移：Y↑、i↓ | [LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)；[Saylor ECON302-6.2](https://resources.saylor.org/wwwresources/archived/site/wp-content/uploads/2011/07/ECON302-6.2.pdf) | 同意 | 同意 | 同意 | 通過（教材） | G↑使 IS 右移、Y↑且 i↑；M↑使 LM 右移、Y↑且 i↓，與教材政策比較一致。 |
| 8 | 總體 Ch6 | 政策有效性 | LM 陡峭（h 小）時財政效果小、貨幣效果大；LM 平坦（h 大）時相反 | [Mishkin Ch. 24 PPT](https://www.ssc.wisc.edu/~mchinn/mishkin_ch24.pdf)；[LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model) | 同意 | 同意 | 同意 | 通過（教材） | LM 陡（h 小）財政效果小、貨幣效果大；LM 平（h 大）相反。已修正 MPC／b 註記：b↑使 IS 平坦但財政效果小，MPC↑使乘數與財政效果變大，不能只看斜率；圖說限定為 h 變動，若由 k 造成陡峭 LM，財政與貨幣效果可能同時變小。 |
| 9 | 總體 Ch7 | AD-AS 均衡 | AD 向下、SRAS 向上、LRAS 垂直；長期回到 Yn | [OpenStax Macro 3e 11.2](https://openstax.org/books/principles-macroeconomics-3e/pages/11-2-building-a-model-of-aggregate-demand-and-aggregate-supply)；[11.3](https://openstax.org/books/principles-macroeconomics-3e/pages/11-3-shifts-in-aggregate-supply) | 同意 | 同意 | 同意 | 通過（教材） | AD 向下、SRAS 向上、LRAS 垂直、AD 右移使 P、Y 同升、長期回 Yn 一致；已補 SRAS₁ 虛線並改寫圖說，使長期調整可見。 |
| 10 | 總體 Ch7 | 需求與供給衝擊 | AD↑：P↑、Y↑；SRAS 左移：P↑、Y↓ | [OpenStax Macro 3e 11.3](https://openstax.org/books/principles-macroeconomics-3e/pages/11-3-shifts-in-aggregate-supply)；[11.2](https://openstax.org/books/principles-macroeconomics-3e/pages/11-2-building-a-model-of-aggregate-demand-and-aggregate-supply) | 不同意：SRAS越陡，供給衝擊造成的產出降幅越小 | 不同意：成本推動供給衝擊下，SRAS越陡則產出下降幅度越小而非越多。 | 不同意：SRAS越陡時產出降幅應較小，敘述相反。 | 通過（教材） | 需求衝擊使 P、Y 同升，供給衝擊使 P↑、Y↓（停滯性通膨）一致；SRAS 越平坦產出降幅越大已於前輪修正。 |
| 11 | 總體 Ch8 | Solow 成長 | sf(k) 與 (n + δ)k 交於 k*；s↑使 k*↑ | [MIT Solow lecture notes](https://economics.mit.edu/sites/default/files/inline-files/Lecture%201-2%2C%202%20and%203%20-%20The%20Solow%20Growth%20Model.pdf) | 同意 | 同意 | 同意 | 通過（教材） | sf(k)、(n + δ)k、穩態、s↑使 k* 上升、長期成長由技術進步決定均一致；含技術進步的損益兩平投資為 (n + δ + g)k。 |
| 12 | 總體 Ch8 | 景氣循環 | 趨勢線與擴張、高峰、衰退、谷底、復甦 | [OpenStax Macro 3e 6.3](https://openstax.org/books/principles-macroeconomics-3e/pages/6-3-tracking-real-gdp-over-time)；[國發會景氣指標簡介](https://www.ndc.gov.tw/nc_335_2235) | 同意 | 同意 | 同意 | 通過（教材） | 高峰、谷底、衰退、擴張與趨勢波動一致；國發會領先／同時／落後指標為臺灣官方輔助說明，頁面可直接查閱。 |
| 13 | 總體 Ch9 | 菲利浦曲線 | SRPC 負斜率；πᵉ↑使 SRPC 上移；LRPC 垂直 | [OpenStax Macro 3e 12.3](https://openstax.org/books/principles-macroeconomics-3e/pages/12-3-the-phillips-curve)；[13.2](https://openstax.org/books/principles-macroeconomics-3e/pages/13-2-the-policy-implications-of-the-neoclassical-perspective)；[MIT 14.02 Lec. 9](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1m8XRqp-AVdS64CW-PlvQDH2AYNFPQguV_transcript.pdf) | 同意 | 同意 | 同意 | 通過（教材） | SRPC 負斜率、πᵉ↑使 SRPC 上移、LRPC 垂直於 uₙ 一致；已補註明圖只隔離預期變動，供給衝擊可能同時發生。 |
| 14 | 總體 Ch10 | 外匯供需 | 直接報價；外匯供給↑使 e↓（本國貨幣升值） | [OpenStax Macro 3e 16.2](https://openstax.org/books/principles-macroeconomics-3e/pages/16-2-demand-and-supply-shifts-in-foreign-exchange-markets) | 同意 | 同意 | 同意 | 通過（教材） | 外匯需求向下、供給向上、供給右移使 e 下降（本國貨幣升值）一致；已補供需常同時移動的提醒。 |
| 15 | 總體 Ch10 | 央行外匯干預 | 央行買匯使需求↑、e↑；賣匯方向相反 | [OpenStax Macro 3e 16.2](https://openstax.org/books/principles-macroeconomics-3e/pages/16-2-demand-and-supply-shifts-in-foreign-exchange-markets)；[CBC 外匯](https://www.cbc.gov.tw/en/np-444-2.html) | 不同意：央行干預不僅限於短期平滑波動 | 同意 | 同意 | 通過（教材） | 央行買匯使需求右移、e↑；賣匯方向相反。CBC 官方外匯頁支持干預與秩序維持；已補單一衝擊提醒，並移除「只能平滑短期波動」的絕對說法。 |
| 16 | 總體 Ch11 | 金融體系資金流向 | 直接金融與間接金融兩條路徑、資金回流 | [Mishkin Ch. 2 notes](https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/mish2b.htm)；[OpenStax Finance 1.5](https://openstax.org/books/principles-finance/pages/1-5-markets-and-participants) | 同意 | 同意 | 同意 | 通過（教材） | 直接／間接金融、中介功能與利差一致；資金流程圖的方向與文字相符。 |
| 17 | 總體 Ch12 | 可貸資金市場 | 政府赤字↑使需求右移、r↑，可能排擠投資 | [OpenStax Macro 3e 10.4](https://openstax.org/books/principles-macroeconomics-3e/pages/10-4-the-national-saving-and-investment-identity) | 同意 | 同意 | 同意 | 通過（教材） | 以民間儲蓄＋國外流入為供給、投資＋政府借款為需求；赤字使需求右移、r↑、排擠投資一致。已移除不當的貨幣供給，並補兩種畫法不可混用的說明。 |
| 18 | 總體 Ch12 | 利率風險結構 | 公司債殖利率高於公債；信用價差 | [OpenStax Finance 10.4](https://openstax.org/books/principles-finance/pages/10-4-risks-of-interest-rates-and-default)；[Lardbucket 6.1](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s09-the-economics-of-interest-rate.html) | 同意 | 同意 | 同意 | 通過（教材） | 違約、流動性、租稅風險與信用價差一致；已補「政府公債（無風險）」為考試慣例，實務仍有通膨、流動性與再投資風險。 |
| 19 | 總體 Ch12 | 收益率曲線 | 正常、平坦、倒掛與預期、期限溢酬 | [OpenStax Finance 10.3](https://openstax.org/books/principles-finance/pages/10-3-using-the-yield-curve) | 同意 | 同意 | 同意 | 通過（教材） | 正常、平坦、倒掛與衰退領先訊號一致；曲線形狀與預期／期限溢酬說明相符。 |
| 20 | 總體 Ch12 | 存續期間與凸性 | 價格與殖利率反向；切線近似、凸性修正 | [MIT 15.401 Lec. 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf)；[MIT 15.415 Lec. 5](https://web.mit.edu/15.415e/www/lecture05.pdf) | 同意 | 同意 | 同意 | 通過（教材） | 價格與殖利率反向、切線為存續期間近似、凸性修正非線性誤差一致；ΔP/P ≈ −D*Δy + ½×凸性×(Δy)² 與講義方向相符。 |
| 21 | 總體 Ch13 | 選擇權到期價值 | 買權與賣權分段、履約價 K、權利金 | [MIT 15.401 Rec. 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf) | 同意 | 不同意：期貨理論價非選擇權到期價值圖參數，波動率亦不影響到期價值。 | 同意 | 通過（教材） | 買權 max(S_T − K, 0)、賣權 max(K − S_T, 0) 的到期分段一致；已保留權利金與到期內在價值的區分。 |

> 小結：21/21 張模型圖已完成公開教材核對，全部判定「通過（教材）」；B15 另獲 CBC 官方外匯頁輔助，B12 的臺灣景氣指標另以國發會頁面輔助。B1、B2、B4、B5、B8、B9、B10、B13、B14、B15、B16、B17、B21 已依核對結果修正文字或圖形（B4、B10、B15、B21 為前輪修正，其餘為本輪）。「通過（教材）」不是官方對本站全部內容的認證；諾貝爾其他屆與會計各章例題逐題重算仍待。

### 會計學教學流程圖（2026-10-22）

| 檢查項目 | 結果 | 備註 |
| --- | --- | --- |
| 章節綁定 | ☑ 通過 | `accounting-14#0` 第1節「財務報表與一般公認會計原則」；`sectionTitle` 與內容一致 |
| 流程順序 | ☑ 通過 | 交易與事項→原始憑證→日記帳→過帳→分類帳→調整前試算表→調整分錄→調整後試算表→財務報表→結帳分錄→結帳後試算表，回箭頭表示下一會計期間 |
| 中英文名詞 | ☑ 通過 | 每個節點均含中文與英文會計名詞；變數表另列 T、SD、J、GL、UTB、AJ、ATB、FS、CE、PCTB |
| SVG 結構與可及性 | ☑ 通過 | `dg-acc-*` 唯一 ID、`viewBox`、`role="img"`、`aria-labelledby`、`<title>`、`<desc>`；無外部圖片、腳本或連結 |
| 變數與參數表 | ☑ 通過 | 10 個流程節點、6 項會計基礎；皆為 `[符號, 名稱, 說明]`，無重複符號 |
| 窄螢幕與離線 | ☑ 通過 | 390px 頁面無水平溢出，圖表區可水平滑動（client 319／scroll 476）；1280px、深淺主題與 `file://` 均可讀 |
| 教材核對 | 教學示意 | 依本站會計章節與常用會計循環教材概念整理，未逐條對照特定教材；不列入 21 張既有模型圖的「通過（教材）」 |

> 2026-10-22 另新增 `accounting-14#0-2` 主要財務報表架構、`accounting-14#0-3` 借記／貸記常用項目、`accounting-14#0-4` 交易到報表流程三張同節次圖；四張圖依序渲染，檢查結果見第五節 QA 表。

### 會計學財務分析圖表（2026-10-22）

| 檢查項目 | 結果 | 備註 |
| --- | --- | --- |
| 章節綁定 | ☑ 通過 | `accounting-15#0` 第1節「財務報表分析之基本觀念及方法」、`accounting-15#1` 第2節「比率分析」、`accounting-23#1` 學習重點 2「跨報表整合與考前檢查」；`sectionTitle` 與內容一致 |
| 財務分析總架構 | ☑ 通過 | 營業收入→毛利→營業利益→稅前淨利→本期淨利；標示營收成長率、毛利率、營業利益率、利息保障倍數、有效稅率、淨利率與淨利衍生比率 |
| 杜邦分析 | ☑ 通過 | 三階段 ROE = 淨利率 × 總資產週轉率 × 權益乘數；五階段再拆稅務效率、利息負擔、本業獲利、資產效率與財務槓桿 |
| 四大財務報表連結 | ☑ 通過 | NI→保留盈餘→權益→資產負債表；資產負債表現金＝現金流量表期末現金；CFO 由 NI 調整非現金項目與營運資金變動 |
| SVG 結構與可及性 | ☑ 通過 | `dg-acc-fin-*`、`dg-acc-dupont-*`、`dg-acc-stmt-*` 唯一 ID；`viewBox`、`role="img"`、`aria-labelledby`、`<title>`、`<desc>`；無外部圖片、腳本或連結 |
| 變數與參數表 | ☑ 通過 | 三張圖合計 25 個變數、20 個參數；accounting-15 兩張圖 32 列、accounting-23 一張圖 13 列；皆為 `[符號, 名稱, 說明]`，符號不重複 |
| 名詞卡補充 | ☑ 通過 | accounting-15#1 新增 13 張比率名詞卡、accounting-23#1 新增 1 張權益變動表；全站名詞卡 1,233 |
| 窄螢幕與離線 | ☑ 通過 | 1280px／390px、深淺主題與 `file://` 均可讀；390px 頁面無水平溢出，圖表區可水平滑動（client 334／scroll 476）；0 console errors、0 `.katex-error` |
| 教材核對 | 教學示意 | 依 `documents/accounting_contents.md` 與本站會計章節概念整理，未逐條對照特定教材；不列入 21 張既有模型圖的「通過（教材）」 |

### 諾貝爾年表與圖組（內部檢查）

| 檢查項目 | 結果 | 備註 |
| --- | --- | --- |
| 年表屆數與年份連續性 | ☑ 通過 | 58 屆，1969–2026 連續；2026 屆存在 |
| 五欄內容保留 | ☑ 通過 | 年份、得主、領域、代表公式、結論；依提供檔案保留 |
| 17 組圖與年表映射 | ☑ 通過 | 每組 `nobel-XX` 都有年表列；每列都有存在的圖組 |
| 2026 屆模型 | ☑ 通過 | 對應 `nobel-17`；Hall 消費隨機漫步、Woodford 新凱因斯穩定政策架構 |
| 年表頁與模型總覽同步 | ☑ 通過 | 共用 `NOBEL_DATA`／`NOBEL_DIAGRAMS`，修改後重新載入同步 |
| 年表／圖組跳轉 | ☑ 通過 | `?year=`、`?group=`、`?table=`、`?models=` 與 `#/models/macro?chapter=nobel` |
| 390px 版面 | ☑ 通過 | 年表改為上下堆疊；頁面無水平溢出；模型圖在圖表區內可水平滑動 |
| 官方／原始文獻核對 | 部分通過 | 58 屆年份與得主已對照官方 API；2019–2020 公式與學說方向、2021 LATE 公式、2022–2024 學說方向、2025 公式修正、2026 公式與學說已對照官方科學背景（2019、2020 網站公式為概念式）；2019–2026 代表原始論文書目已核對；其餘屆公式、全文與模型圖仍待查，不得宣稱所有公式經官方認證 |

## 四、跨模型提問模板

把以下內容一起提供給每個模型，避免只問「這個公式對不對」：

```text
請檢查以下考試複習內容的公式與定義。請逐項回答：
1. 公式是否正確？
2. 每個符號的定義、期間單位與適用條件是否清楚？
3. 是否有常見的混淆或例外？
4. 請提供可查證的官方或繁體中文教材來源。

科目：
章節：
公式：
目前符號定義：
目前假設／適用條件：
網站上的說明：
```

追問時要求模型區分「定義錯誤」、「符號歧義」、「適用條件缺漏」與「單純教學簡化」，不要只給籠統的「正確／不正確」。

模型圖另用以下模板，要求模型檢查圖形而不是只背結論：

```text
請檢查以下總體經濟學模型圖。請逐項回答：
1. 曲線方向與均衡點是否正確？
2. 外生變數變動時，曲線移動方向與新均衡位置是否正確？
3. 變數與參數的區分是否正確、是否有漏列？
4. 圖說與公式是否一致？
5. 請提供可查證的官方或繁體中文教材來源。

科目：
章節：
模型圖：
目前圖示重點：
變數：
參數：
圖說：
```

## 五、實際複核紀錄

| 日期 | 科目／章 | 模型與版本 | 主要爭點 | 官方來源結論 | 後續動作 |
| --- | --- | --- | --- | --- | --- |
| 2026-10-20 | 投資／總體公式 29 條 | GPT-6 Luna／Gemini 4 Argon Contributor／Claude Haiku 5.5；公開教材與官方輔助來源 | 數學形式、符號定義、期間單位與經濟意義 | 三家模型均同意；另完成 29 條公開教材逐條核對（#27 BIS CIP、#28 SEC NAV 另經官方交叉核對） | 通過（教材）29/29；網站 formula 已補假設；見第二節與 review 第 3 節 |
| 2026-10-20 | 總體模型圖 21 張 | GPT-6 Luna／Gemini 4 Argon Contributor／Claude Haiku 5.5 | 曲線方向、移動方向、變數／參數、圖說一致性 | 多數同意；B1、B4、B10、B15、B21 有建議或不同意 | 已修正 B1、B4、B10、B15、B21；其後完成 21 張公開教材核對，全部「通過（教材）」，見 review 第 5 節 |
| 2026-10-20 | 總體模型圖 21 張 | 公開教材／課程講義＋CBC、國發會輔助 | 曲線方向、移動方向、變數／參數、圖說與假設 | 21/21 對上來源；B15 另獲 CBC 官方外匯頁輔助，B12 的臺灣景氣指標以國發會頁面輔助 | 通過（教材）；本輪另修正 B1、B2、B5、B8、B9、B13、B14、B16、B17 的文字或圖形 |
| 2026-10-20 | 21 張模型圖與來源頁最終 QA | Chrome CDP＋1280px／390px／`file://` | B9 的 SRAS₀／SRAS₁、B5／B8／B16／B17 修正文字、來源頁公告、水平溢出、console | 12 個頁面狀態；B9 在章節頁、模型總覽與 `file://` 均可見；390px 需在圖表區水平滑動，滑動後 SRAS₀／SRAS₁ 可讀；來源頁 26 項且含 21 張模型圖公告；模型總覽 38 張 SVG；諾貝爾頁 58 張 SVG；0 console errors | 通過；390px 無水平溢出 |
| 2026-10-20 | 15 張含縱軸標題的模型圖 | 瀏覽器預覽 | 左上角座標名稱壓到縱軸 | 已將標題移到縱軸頂端上方（y=24），與軸線保留間距 | 完成 |
| 2026-10-20 | 總體經濟模型總覽頁 | Chrome CDP 實際瀏覽器 | 13 章分組、21 張圖、章節跳轉與窄螢幕 | 13 章、21 張圖、2 個無模型章節；390px 頁面寬度 390、無水平溢出 | 完成 |
| 2026-10-20 | 模型資料綁定 | Chrome CDP 記憶體修改測試 | 修改模型標題與圖說後，章節頁與總覽頁是否同步 | 在 `MACRO_DIAGRAMS` 修改 `macro-12#4` 後，兩頁皆顯示新標題與圖說 | 通過；檔案結構仍以 diagrams-macro*.js 為唯一來源 |
| 2026-10-20 | 全站內容與模型圖 | 驗證腳本＋390px 實測 | 章節界線、模型圖結構、變數／參數、SVG 安全、諾貝爾年表、窄螢幕、繁體中文守門 | 內部結果：當時 2,945 項檢查、失敗 0；加入會計學後為 3,914 項；加入投資學比例公式檢查後為 4,428 項；加入選擇權優先順序檢查後為 4,497 項；加入證券法規與測驗範圍補充後為 4,992 項；加入法規全文資料檢查後為 5,007 項；加入 KaTeX 公式檢查後為 5,014 項、失敗 0；390px 頁面無水平溢出 | 通過；29 條公式與 21 張模型圖已完成教材核對，詳見 review 第 5 節 |
| 2026-10-20 | 諾貝爾年表 58 屆、17 組 | 驗證腳本＋瀏覽器預覽 | 年份連續性、2026 屆、圖組映射、年表／圖組跳轉 | 1969–2026 共 58 屆；17 組；2026 對應 `nobel-17`；`#/nobel` 與模型總覽可互相跳轉 | 通過；其他屆公式與原始文獻仍待查 |
| 2026-10-20 | 諾貝爾年表 58 屆 | 諾貝爾獎官方 API 程式比對 | 年份與得主是否與官方一致 | 58 屆年份與姓氏全部一致，0 筆不一致；2026 屆為 Robert E. Hall、Michael Woodford，官方動機為「for microeconomic foundations of macroeconomic stabilisation」 | 年份／得主通過；公式與學說見下列各列；模型圖仍待查 |
| 2026-10-20 | 諾貝爾 2026 公式與學說 | 諾貝爾官方 popular information＋2026 科學背景 PDF | Hall 消費隨機漫步、Woodford 新凱因斯模型 | 科學背景式 (12) E_t{c_{t+1}}=c_t 與式 (15) π_t=βE_tπ_{t+1}+κỹ_t 與網站公式一致；前瞻指引、可信度、透明度有官方依據 | 公式與概念通過；代表論文書目已核對，全文待查 |
| 2026-10-20 | 諾貝爾 2025 公式 | 2025 科學背景 PDF | Aghion & Howitt 創造性破壞成長式 | 官方式 (9)：Y_{t+1}/Y_t = 1 + z*(γ−1)；原式 g = λ ln(γ) Q 的 Q 因子無官方依據，已改為 g = λ(γ−1) ≈ λ ln(γ) | 修正；Mokyr 與 Aghion & Howitt 學說方向一致；原文待查 |
| 2026-10-20 | 諾貝爾 2019–2020 公式與概念 | 2019、2020 科學背景 PDF | RCT 平均因果效果、拍賣理論與勝者魔咒 | 2019 官方背景確認 RCT／平均因果效果，網站 ATE 為概念式；2020 確認共同價值、勝者魔咒、SMRA／組合時鐘拍賣，原 max Revenue 已改為勝者魔咒條件並修正結論 | 通過（概念式）；代表論文書目已核對，全文待查 |
| 2026-10-20 | 諾貝爾 2019–2020 頁面 | Chrome CDP＋390px／1280px | 58 列、公式渲染、窄螢幕、console | 58 列／58 公式／58 SVG；2019 ATE 與 2020 勝者魔咒、SMRA 文案顯示；390px 頁寬 390、無水平溢出；0 console errors | 通過 |
| 2026-10-20 | 諾貝爾 2021–2024 公式與概念 | 2021–2024 科學背景 PDF | LATE、Diamond–Dybvig、Goldin、Acemoglu–Johnson–Robinson | 2021 LATE 公式逐式一致；2022–2024 官方式與網站概念式方向一致；代表論文書目已核對 | 2021 通過；2022–2024 概念方向通過；全文待查 |
| 2026-10-20 | 諾貝爾 2019–2026 代表原始論文書目 | 官方科學背景 PDF References＋JSTOR | 作者、篇名、期刊、卷期、頁碼 | 8 屆代表論文書目一致；2021 官方 PDF 誤植為 61:467–476，已依期刊書目更正為 62(2):467–475 | 通過（書目）；2019–2026 每年至少一篇另完成全文抽查 |
| 2026-10-20 | 諾貝爾 2019–2026 每年代表論文全文抽查 | 公開論文 PDF | Banerjee 微型貸款、Milgrom–Weber 勝者魔咒、LATE、DD 資源限制、Goldin 勞動參與、Acemoglu 制度、Aghion–Howitt 成長、Hall 隨機漫步 | 微型貸款消費效果不顯著；勝者魔咒概念一致；LATE 逐式一致；DD 資源限制 \(t c_1+(1-t)c_2/R=1\)；Goldin 以長工時／時間彈性說明薪資差距；Acemoglu 以殖民死亡率作工具變數；Aghion–Howitt \(AGR=Aq(n)\ln\gamma\)；Hall 原文為 with trend | 通過（抽查）；網站已補 Hall 趨勢、Aghion 到達率與 Goldin 後續用語 |
| 2026-10-20 | Woodford (2003) NKPC 交叉核對 | Woodford 相關論文 PDF | 書中 chap. 3／5 的 NKPC 與網站三方程式 | 論文式 (4.3) \(\pi_t=\kappa\tilde{Y}_t+\beta E_t\pi_{t+1}\) 與網站 \(\pi_t=\beta E_t\pi_{t+1}+\kappa x_t\) 逐式一致 | 通過（論文交叉）；專書全文仍待 |
| 2026-10-20 | 諾貝爾 2019／2022／2023／2025／2026 文字修正頁面 | Chrome CDP＋1280px／390px | Hall 趨勢、Aghion λ、Goldin 後續用語、Bernanke 分工、微型貸款效果 | 五項文字均顯示；58 張 SVG；0 水平溢出、0 console errors | 通過 |
| 2026-10-20 | 諾貝爾跨頁資料綁定 | Chrome CDP 記憶體修改測試 | `#/nobel` 與 `#/models/macro` 是否共用同一份 `NOBEL_DIAGRAMS` | 修改 `nobel-17` 的記憶體標題與圖說後，兩個路由皆顯示新內容 | 通過；檔案仍以 `diagrams-nobel.js` 為唯一來源 |
| 2026-10-20 | 諾貝爾年表與模型圖整合 | Chrome CDP 實際瀏覽器＋DOM 稽核 | 58 列是否逐年雙欄、每列是否顯示對應 SVG、重複圖組的 ID 與跳轉 | 58 列／58 張 SVG／17 組首屆錨點；重複列出現在 41 列；內部 ID 229 個全部唯一；390px 頁面無水平溢出 | 通過；其他屆公式與原始文獻仍待查 |
| 2026-10-20 | 全站繁體中文 | OpenCC s2t 字元掃描＋瀏覽器文字檢查 | 是否仍有簡體字或英文介面標籤 | 無簡體字；臺灣相關用字統一為「臺灣／臺幣」；英文只留姓名、專有名詞、公式與縮寫 | 完成；後續新增內容沿用同一規則 |
| 2026-10-20 | 會計公式 A1、A3、A4、A8、A12 | IFRS 官方網站摘要 | 約當現金、存貨 NRV、折舊減損、遞延所得稅、基本 EPS | IAS 7、IAS 2、IAS 16／36、IAS 12、IAS 33 官方摘要與網站公式一致 | 通過；A5、A7 見下一列；分錄與勾稽見 review 2.1 |
| 2026-10-20 | 會計公式 A5、A7 | IFRS 9／IFRS 16 準則本文 | 有效利率法、使用權資產初始成本 | IFRS 9.5.4.1 確認原則上以有效利率乘總帳面金額、信用減損資產改用攤銷後成本；IFRS 16.24(a)–(d) 確認復原成本，A7 原公式漏列已補入 | 通過；A7 修正 |
| 2026-10-20 | 會計公式 A2、A6、A9–A11 | 三民輔考、OpenStax《Principles of Finance》、Ole Miss FIN 331 講義 | 票據貼現、公司債價格、杜邦、WACC、NPV/OCF | 公式逐式一致；A10 為無特別股版本，A6 半年付息需調整，A2 期間單位需一致 | 通過（教材）；分錄與勾稽見 review 2.1 |
| 2026-10-20 | 會計分錄與報表勾稽 | OpenStax《Principles of Accounting, Volume 1》＋IFRS | 零用金、備抵壞帳、票據貼現、公司債、庫藏股、股票股利、現金流量表、存貨錯誤、保留盈餘／EPS | 代表項目借貸平衡與跨表勾稽一致；公司債發行價 102,775.09、CFO 58、期末現金 153 與資產負債表一致；存貨錯誤兩期後回復 | 通過（代表項目）；已修正存貨錯誤、股票股利、公司債有效利率與 Ch20／Ch23 簡化條件 |
| 2026-10-20 | 會計分錄／報表頁面最終 QA | Chrome CDP＋1280px／390px／`file://` | 存貨跨期、股票股利、公司債有效利率、現金流量勾稽、EPS／保留盈餘、來源頁公告 | 9 個頁面狀態；0 缺失、0 水平溢出、0 console errors | 通過 |
| 2026-10-20 | 投資學比例分析公式列表 | Chrome CDP＋驗證腳本 | 32 條、9 類、investment-14／17 綁定、investment-04 Sharpe 引用、全部 LaTeX、390px 卡片 | `#/investment/formulas` 32 條；investment-14 26 條、investment-17 6 條；風險調整績效順序為夏普→索提諾→崔納→詹森→資訊；32 個 `.ratio-math`、29 個分數；1280px／390px 無水平溢出、0 console errors；修改 Sharpe 公式後公式總表頁、第 17 章與第 4 章同步 | 通過；公式集中於 `window.INVESTMENT_RATIO_FORMULAS` |
| 2026-10-20 | 投資學選擇權評價優先順序 | Chrome CDP＋驗證腳本 | 5 項順序、二項式、Black-Scholes、買賣權平價、進階模型用途、390px | `#/investment/formulas` 顯示 5 列、5 卡、13 條 KaTeX 公式（4 條分數）、36 項變數定義；1280px／390px 無水平溢出、0 console errors | 通過；集中於 `window.INVESTMENT_OPTION_PRIORITIES` |
| 2026-10-20 | 證券法規與測驗範圍補充 | 驗證腳本＋Chrome CDP | 4 科目、證券法規 21 頁（21 章／21 節）、macro-08／investment-07／08／16／accounting-19 補充 | 首頁 4 張科目卡；證券法規 21 頁（21 章、21 節）；5 個補充單元顯示；1280px／390px 無水平溢出、0 console errors | 通過；法規頁面依測驗範圍建立 |
| 2026-10-21 | 證券法規全文 | 全國法規資料庫 Open API＋驗證腳本＋Chrome CDP | 15 部官方來源、1,507 條、21 頁全文區塊、條文直接顯示、自律規範連結 | 14 頁官方全文、7 頁連結摘要；law-01 244 條、law-02 534 條；總數 1,507 條；21 頁 `.law-fulltext` 全部存在；全部條文直接顯示；1280px／390px 無水平溢出、0 console errors | 通過；官方全文以 2026-10-08 資料為準，自律規範與其他法令不逐條轉錄 |
| 2026-10-21 | 全站公式改用 KaTeX | KaTeX 0.19.0＋驗證腳本＋Chrome CDP | 115 個學習單元、比例 32 條、選擇權 13 條、諾貝爾 58 屆公式、`file://` 字型 | 115 筆 `FORMULA_TEX` 全部綁定；47 個含公式章節 × 2 寬度共 94 次檢查；0 `.katex-error`、0 fallback、0 水平溢出、0 console errors；比例 32 條、選擇權 13 條、諾貝爾 58 屆公式正常；`file://` 字型載入成功 | 通過；KaTeX 0.19.0 以本地檔案隨站附帶，不依賴 CDN |
| 2026-10-21 | 投資學比例公式字級 | Chrome CDP＋驗證腳本 | 32 條比例公式、29 條分數、1280px／390px／`file://` | 29 條 `\frac` 改為 `\dfrac`；分子／分母由 9.41px 提升至 13.44px，與表格其他欄位同級；investment-14 26 條、investment-17 6 條、investment-04 Sharpe 正常；0 `.katex-error`、0 fallback、0 水平溢出、0 console errors；驗證器 5,014 項、失敗 0 | 通過 |
| 2026-10-21 | 總體經濟學派演進圖 | 驗證腳本＋Chrome CDP＋1280px／390px／`file://` | 6 階段、10 節點、學派名稱／提出者、19 個模型連結、15 個諾貝爾里程碑、明暗主題、水平溢出、console | `#/macro/evolution` 顯示 6 階段、10 節點（古典、凱因斯、新古典綜合、貨幣、新古典／RBC、供給面、新凱因斯、開放總體、新制成長、制度金融實證）；19 個模型名稱連到 `#/models/macro?model=<anchor>`，實測目標頂端 90px 並高亮；15 個諾貝爾里程碑連到 `#/nobel?year=YYYY`；總體經濟學首頁保留 1 張演進圖 CTA，舊網址 `#/subject/macro?evolution=1` 仍可開啟；1280px／390px 頁面寬度等於視窗、0 console errors；驗證器 114,349 項、失敗 0 | 通過；模型與諾貝爾資料仍分別以 `MACRO_DIAGRAMS`、`NOBEL_DATA` 為單一來源 |
| 2026-10-20 | 會計進階分錄與勾稽 | IFRS 16／15／12／10／3 官方摘要＋OpenStax Finance 16.2 | 租賃現值、收入分攤、遞延所得稅、合併商譽、資本預算 | 租賃負債 272,324.80、使用權資產 287,324.80；收入分攤 60,000／40,000；當期稅 16,000＋DTL 4,000；商譽 60；OCF 44、NPV 66.79 | 通過（代表項目） |
| 2026-10-20 | 會計 A5／A7 公式頁與來源頁 | Chrome CDP＋390px／1280px | 公式更新、水平溢出、console、來源頁 26 項 | A5 顯示「期初總帳面金額…信用減損」；A7 顯示「復原成本估計」；390px 頁寬 390、無水平溢出；0 console errors；來源頁 26 項且進度公告為 A1–A12 | 通過 |
| 2026-10-20 | 投資／總體公式頁 | Chrome CDP＋1280px／390px／`file://` | 公式文字、期間單位與假設、水平溢出、console、來源與模型頁 | macro-02／05／06／09／10／12／13 與 investment-03／07／09／10／17 的公式文字一致；來源頁 26 項且核對進度含 29 條公式；模型總覽 14 組／38 張 SVG；諾貝爾頁 58 列／58 張 SVG；390px 頁面無水平溢出；0 console errors；`file://` 的 macro-13、investment-10、sources、models/macro、nobel 可讀，mobile macro-13 無水平溢出 | 通過 |
| 2026-10-20 | 會計學 23 章 | 驗證腳本＋Chrome CDP | 章節界線、41 節＋23 個學習重點、章號印刷註記、來源引用、繁中守門 | 23 章、64 單元、375 張名詞卡；驗證器 4,992 項、失敗 0；四個科目沒有互相混入 | 通過；公式已核對，代表性分錄與報表勾稽已檢查，例題逐題重算仍待 |
| 2026-10-20 | 首頁科目卡與導覽 | Chrome CDP 實際瀏覽器 | 首頁科目卡、導覽、搜尋、來源頁與會計章節 | 首頁 4 張科目卡（總體／投資／會計／證券法規）；導覽 6 個連結；搜尋「存貨」可找到會計章節與名詞；來源頁 26 項含「會計準則與監理」 | 通過 |
| 2026-10-20 | 會計章節頁 | Chrome CDP 實際瀏覽器 | 來源節次與補充單元的標示、章節頁顯示 | 第 1 章 6 節顯示「第 01–06 節」；第 8 章顯示「學習重點 01–02」並有單元說明；第 23 章顯示頁碼 P. 339 與原書章號註記 | 通過 |
| 2026-10-20 | 會計學 390px 與 `file://` | Chrome CDP＋本機 HTML | 四科目版面、會計章節、離線閱讀 | 390px 寬度下科目卡改為單欄、頁面無水平溢出；`file://…/index.html#/subject/accounting` 可顯示 23 章 | 通過 |
| 2026-10-22 | 會計學教學流程圖 | 驗證腳本＋Chrome CDP＋1280px／390px／`file://` | `accounting-14#0` 章節綁定、11 步流程、中英文名詞、SVG `title`／`desc`、變數／參數表、頁面溢出、console | 1 張圖、2 張表、16 列；`#/models/macro` 39 張 SVG；390px 圖表區 client 319／scroll 476，頁面無水平溢出；0 console errors、0 `.katex-error`；驗證器 90,222 項、失敗 0 | 通過；內容為教學示意，未逐條教材核對 |
| 2026-10-22 | 會計學財務分析圖表 | 驗證腳本＋Chrome CDP＋1280px／390px／`file://` | `accounting-15#0`、`accounting-15#1`、`accounting-23#1` 章節綁定、三張圖內容、中英文名詞、SVG `title`／`desc`、變數／參數表、名詞卡、頁面溢出、console、來源頁與使用說明文案 | accounting-15 兩張圖、32 列；accounting-23 一張圖、13 列；390px 圖表區 client 334／scroll 476，頁面無水平溢出；0 console errors、0 `.katex-error`；`#/models/macro` 39 張 SVG；`#/sources` 與 `#/about` 更新文案在 390px／1280px 正常；驗證器 90,373 項、失敗 0 | 通過；內容為教學示意，未逐條教材核對 |
| 2026-10-22 | 會計學基本報表與借貸流程圖 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | `accounting-14#0` 同一節次多圖渲染、主要財務報表架構、借記／貸記常用項目、交易到報表流程、SVG `title`／`desc`、變數／參數表、跨圖 ID、手機水平滑動、console | accounting-14 四張圖、64 列；1280px 四張圖表區皆 838／838；390px 圖表區 client 334／scroll 476 或 776，頁面 390／390 無水平溢出；深淺主題與 `file://` 均顯示四張圖；0 console errors、0 `.katex-error`；驗證器 90,511 項、失敗 0 | 通過；三張新圖為教學示意，未逐條教材核對 |
| 2026-10-22 | 全站 KaTeX 上下標與效率市場比較表 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | `investment-06#1` 表格 5 欄 4 列、弱式／半強式／強式資訊集、技術／基本／內線分析、紅色 ✕／綠色 ○ 標記、手機卡片化、公式上下標、console、`.katex-error`、頁面溢出 | 118/118 筆公式、2,695 個行內、176 個區塊公式實編譯；`investment-06` 表格桌面 5 欄 4 列、390px `thead` 隱藏且列為卡片；「難以取得超額報酬」前綴紅色 ✕、「仍可能取得超額報酬」前綴綠色 ○；12 個頁面狀態（investment-04／06／10、past-exams/written、深淺主題）0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 112,241 項、失敗 0 | 通過；表格內容為三種效率形式的教學整理 |
| 2026-10-22 | 移除「第 X 篇」與投資學公式總表頁 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 全站「第 X 篇」、科目頁篇章標題、章節頁／模型總覽／搜尋索引、`#/investment/formulas`、投資學首頁 CTA 樣式與整張卡片可點擊、總體首頁近二年時事與諾貝爾獎年表 CTA、比例 32 條、選擇權 5 項、頁面溢出、console、`.katex-error` | 全站 0 個「第 X 篇」；投資學首頁 1 個公式總表卡片，樣式與計算／申論 CTA 一致且整張可點擊，實際點擊後進入 `#/investment/formulas`；公式頁顯示 32 條比例公式與 5 項選擇權評價；27 個頁面狀態 0 水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；科目頁保留主題名稱與頁碼 |
| 2026-10-22 | 修正破損題幹與 KaTeX 字級 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 7 個含私人使用字元或合併符號的題幹、生產函數、勞動供給、變異數、避險損益、β、梭羅模型、行內／解答／比例公式字級、頁面溢出、console、`.katex-error` | 7 個題幹恢復可讀公式；行內公式 1.06em、參考解答 1.08em、比例與正式公式 1.04em；33 個頁面狀態 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；部分長公式在 390px 於公式區內水平滑動，頁面本身無溢出 |
| 2026-10-22 | 全站數學式自動 KaTeX 化 | 靜態稽核＋Chrome CDP＋1280px／390px／深淺主題／`file://` | `autoMathProseToHtml()`／`clauseToTex()`、正文、名詞、考試重點、記憶卡、解題策略、參考解答、章節摘要、科目說明、圖表說明、考古題題幹與選項、全形運算子、上下標、希臘字母、長題幹跳過、頁面溢出、console、`.katex-error` | 4,790 個可轉換子句、0 編譯失敗；1280px／390px、深淺主題與 `file://` 實測 33 個頁面狀態，0 水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；超過 240 字元的表格型題幹維持原樣，避免手機版溢出 |
| 2026-10-22 | 出題統計區分選擇題與申論題 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 章節列右側兩個 span、本節出處題目兩種統計、申論題連結、章節頁選擇題／申論題總計、移除單元數量列、頁面溢出、console、`.katex-error` | 章節列顯示「選擇題 N 題 頻率 X%」「申論題 N 題 頻率 X%」；本節出處題目同步顯示兩種統計與申論題連結；章節頁本章出題紀錄顯示兩種總計；章節列下方不再顯示「N 個重點」；33 個頁面狀態 0 水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；頻率分別以該科選擇題數與申論題數為分母 |
| 2026-10-22 | 各科目首頁移除計算／申論 CTA | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 總體、投資、會計、證券法規首頁的 87 題計算／申論 CTA、`#/past-exams/written` 仍保留、頁面溢出、console、`.katex-error` | 總體經濟學首頁 4 張 CTA、投資學首頁 1 張 CTA、會計與證券法規首頁 0 張計算／申論 CTA；`#/past-exams/written` 與考古題練習庫仍保留 87 題計算／申論；31 個頁面狀態 0 水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；各科目首頁只留科目相關 CTA |
| 2026-10-22 | 學派演進圖移成獨立頁 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | `#/macro/evolution`、總體經濟學首頁 CTA、舊網址 `#/subject/macro?evolution=1`、6 階段、10 節點、19 個模型連結、15 個諾貝爾里程碑、搜尋索引、頁面溢出、console、`.katex-error` | 總體經濟學首頁 1 張整張可點擊的演進圖 CTA；獨立頁完整顯示 6 階段、10 節點、19 個模型連結與 15 個諾貝爾里程碑；舊網址可開啟；31 個頁面狀態 0 水平溢出、0 console errors、0 `.katex-error`；驗證器 114,349 項、失敗 0 | 通過；模型與諾貝爾資料仍分別以 `MACRO_DIAGRAMS`、`NOBEL_DATA` 為單一來源 |
| 2026-10-22 | 投資學核心公式庫與技術分析 50 指標 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | `INVESTMENT_FORMULA_LIBRARY` 10 類 66 條、`INVESTMENT_TECHNICAL_INDICATORS` 5 類 50 種、KaTeX 編譯、優先級 A/B/C、章節連結、變數、參數與限制、390px 卡片、console、`.katex-error`、頁面溢出 | 15 個公式分組、116 個優先級標記、503 個 KaTeX 元素；1280px／390px、深淺主題與 `file://` 均 0 水平溢出、0 console errors、0 `.katex-error`；投資學第 15 章有「技術指標公式 →」連結；驗證器 114,349 項、失敗 0 | 通過；公式與技術指標為複習整理，非官方命題排名 |
| 2026-10-23 | 選擇題逐選項解析、申論題檢核與物價指數擴充 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 3,710 題 `PAST_EXAM_EXPLANATIONS` 覆蓋與 A–D 非空、 官方答案一致性、348 題計算／申論題題意檢核、72 題補強、`macro-01` 第 4 節拉氏／帕氏／GDP 平減指數公式、練習模式、瀏覽模式、章節範例、申論題表格、390px 溢出、console、`.katex-error` | 3,710 題逐選項解析完整；348 題逐題檢核，套用 72 題補強；拉氏／帕氏／GDP 平減指數 25 個 KaTeX 元素、0 編譯失敗；1280px／390px 與 `file://` 練習、瀏覽、章節範例、申論題表格 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 147,256 項、失敗 0 | 通過；解析為本站參考解析，非官方公告 |
| 2026-10-23 | 總經時事擴充至 15 主題 | 驗證腳本＋Chrome CDP＋1280px／390px／深淺主題／`file://` | 安倍三箭、FOMC 會員與決議、利率政策、世界物價與各國對策、美國公債買回與債務管理、黃金價格、美國加密貨幣監理、美元穩定幣與 GENIUS Act、15 張主題卡、20 個官方參考連結、KaTeX、390px 溢出、console、`.katex-error` | 15 個主題、20 個參考連結、20 個 KaTeX 元素；390px 與 1280px 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 147,469 項、失敗 0 | 通過；時事數字會變動，頁面已標示查證入口 |
| 2026-10-23 | 2026 年 12 月考前猜題頁 | 驗證腳本＋Chrome CDP＋1280px／390px／`file://` | Header 導覽、`#/exam-forecast`、總體 24 題、投資 24 題、會計 10 題、法規 10 題、68 題完整解答、6 組整合、28 條公式、8 項指標、四科切換、覆蓋檢查表、KaTeX、390px 表格滑動、console、`.katex-error` | 68 題、68 題完整解答、6 組整合、28 條公式、8 項指標；四科切換與覆蓋表正常；Header 導覽連結正常、首頁考前猜題區塊已移除；390px／1280px 與 `file://` 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 149,112 項、失敗 0 | 通過；模擬猜題非官方題目 |
| 2026-10-23 | 單一題庫整併與章節進階補給 | 驗證腳本＋Chrome CDP＋1280px／390px／`file://` | `content-exam-forecast.js` 單一題庫、level／topic／type、108 題解答、38 條整合公式、五個 tabs、相關章節／時事連結、DCF／債券敏感度、13 個章節補給、搜尋索引、390px 表格滑動、KaTeX、console | 108 題（總體 44、投資 44、會計 10、法規 10；基礎 68、進階 40）、108 題解答、38 條公式；5 個科目 tabs、章節連結正常；學習單元 200、名詞卡 1,310；390px／1280px 與 `file://` 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 151,755 項、失敗 0 | 通過；DCF 表格依題設重算 |

> 2026-10-20 備註：精確指定的 Claude Sonnet 5.5／Gemini 4 Argon／GPT-6.1 Sol 端點在此環境仍回傳未授權；改用同家族可存取的 GPT-6 Luna、Gemini 4 Argon Contributor、Claude Haiku 5.5 完成比對。模型回答只作輔助，已記錄於第二、三節與 `documents/reviews/`；沒有以模型回答取代官方查證。

## 六、修改後檢查

> 以下為每次修改後的重複檢查項目；2026-10-20 這一輪、2026-10-21 學派演進圖與 2026-10-22 會計學教學圖檢查已全部完成，結果見第五節。

- [x] 已更新對應的 `site/assets/content-*.js`。
- [x] 若修改模型圖或教學流程圖，已更新對應的 `site/assets/diagrams-macro*.js`、`site/assets/diagrams-investment.js`、`site/assets/diagrams-accounting.js` 或 `site/assets/diagrams-nobel.js`。
- [x] 已執行 `node site/scripts/validate-content.js`，失敗數為 0。
- [x] 已執行 `node --check` 檢查所有 JavaScript（含 `diagrams-macro*.js`、`diagrams-investment.js`、`diagrams-accounting.js`、`diagrams-nobel.js`、`content-nobel.js`）。
- [x] 已確認首頁、四個科目頁、受影響章節、`#/models/macro`、`#/nobel` 與 `#/sources` 可正常顯示。
- [x] 已確認會計學科目頁顯示 23 章、64 個學習單元，且第 1–7、12–15、20 章的節名與來源目錄一致。
- [x] 已確認會計學未列節名的章節顯示「學習重點」與單元說明，不冒充原書節名；第 23 章保留原書章號印刷註記。
- [x] 已確認首頁 4 張科目卡、導覽、搜尋與來源頁（26 項，含會計準則與監理）都已加入會計學與證券法規。
- [x] 已確認證券法規 21 頁（21 章、21 節）與 1,507 條官方全文，以及 macro-08／investment-07／investment-08／investment-16／accounting-19 的測驗範圍補充單元顯示正常。
- [x] 已確認來源頁的核對進度公告包含投資／總體 29 條公式、21 張既有總體模型圖、1 張新增國民所得會計帳流程圖、7 張會計學教學流程圖、會計 A1–A12 與代表性分錄／報表勾稽，且沒有把已完成項目誤列為待查。
- [x] 已用諾貝爾獎官方 API 核對 58 屆年份與得主，0 筆不一致；2026 屆為 Hall 與 Woodford。
- [x] 已對照 2026 屆官方 popular information，確認 Hall 消費變動不可預測與 Woodford 三方程式新凱因斯模型的概念方向。
- [x] 已用 2026 科學背景核對 Hall 隨機漫步（式 12）與 Woodford 新凱因斯菲利浦曲線（式 15）。
- [x] 已依 2025 科學背景修正創造性破壞成長式（移除無依據的 Q 因子）。
- [x] 已用 2021 科學背景核對 LATE 公式（IV estimand），逐式一致。
- [x] 已用 2022–2024 科學背景核對 Diamond–Dybvig、Goldin、Acemoglu–Johnson–Robinson 的概念方向。
- [x] 已用 IFRS 官方摘要核對會計公式 A1、A3、A4、A8、A12。
- [x] 已用 IFRS 9.5.4.1 與 IFRS 16.24 準則本文核對 A5、A7；A7 補入復原成本估計。
- [x] 已用三民輔考教材核對 A2 票據貼現公式。
- [x] 已用 OpenStax《Principles of Finance》核對 A6、A9、A10、A11 的 NPV 公式。
- [x] 已用 Ole Miss FIN 331 講義核對 A11 的稅盾法 OCF 公式。
- [x] 已用 OpenStax《Principles of Accounting, Volume 1》重算零用金、備抵壞帳、票據貼現、公司債、庫藏股、股票股利、現金流量表、存貨錯誤、保留盈餘與 EPS 的代表性分錄與跨表勾稽。
- [x] 已逐條核對投資／總體 29 條公式的數學式、變數定義、期間單位與假設；#27 BIS CIP、#28 SEC NAV 另以官方資料交叉核對。
- [x] 已逐條核對 21 張總體模型圖的曲線方向、移動方向、變數／參數、圖說與假設；全部為「通過（教材）」，B15 另以 CBC 官方外匯頁輔助。
- [x] 已補強網站 `formula` 欄的假設文字：簡單／貨幣乘數、IS-LM、開放經濟、債券、高登、賣權買權平價、期貨、避險、存續期間、遠期匯率、NAV 與選擇權到期內在價值。
- [x] 已確認 `#/investment/formulas` 顯示 32 條比例分析公式，且與 `investment-14`、`investment-17` 及 `investment-04` 的 Sharpe 公式共用 `window.INVESTMENT_RATIO_FORMULAS`；修改 Sharpe 公式後公式總表頁、第 17 章與第 4 章同步，32 條全部以 KaTeX 排版（29 條為分數），390px 改為卡片堆疊。
- [x] 已確認 `investment-06` 第 1 節顯示弱式／半強式／強式效率市場比較表：桌面版 5 欄 4 列，390px `thead` 隱藏並改為 3 張卡片；技術分析、基本分析、內線消息欄位與資訊集一致，「難以取得超額報酬」前綴紅色 ✕、「仍可能取得超額報酬」前綴綠色 ○，0 頁面水平溢出、0 console errors、0 `.katex-error`。
- [x] 已確認全站 118/118 筆正式公式、2,695 個行內公式與 176 個區塊公式均以本地 KaTeX 實編譯；`\sigma_p^2`、`w_1^2`、`\sigma_1^2`、`\operatorname{Cov}_{12}`、`P_0`、`D_1`、`E_2` 等上下標正確，無 raw Unicode 數學或 raw `Cov`／`Var`。
- [x] 已確認全站不再顯示「第 X 篇」；科目頁保留主題名稱與頁碼，章節頁、模型總覽、搜尋索引、首頁與使用說明均無「第 X 篇」，驗證器新增網站內容守門。
- [x] 已確認投資學首頁有「投資學公式總表」卡片，點擊進入 `#/investment/formulas`；公式頁顯示比例分析 32 條與選擇權評價 5 項，1280px／390px／深淺主題／`file://` 均正常，0 水平溢出、0 console errors、0 `.katex-error`。
- [x] 已確認 `#/investment/formulas` 顯示 `INVESTMENT_FORMULA_LIBRARY` 10 類 66 條核心公式（貨幣時間價值、報酬風險、投資組合、資產定價、股票評價、債券分析、衍生性商品與 Greeks、風險管理、績效、資本結構），每條有公式、變數、優先級與章節連結。
- [x] 已確認 `#/investment/formulas` 顯示 `INVESTMENT_TECHNICAL_INDICATORS` 5 類 50 種技術分析指標（趨勢、動能、波動率與通道、成交量與資金流、支撐壓力與複合指標），每條有公式、參數、限制與優先級；投資學第 15 章另有「技術指標公式 →」連結。
- [x] 已確認全站 CTA 卡片風格一致：首頁 4 張科目卡、考古題首頁 CTA、總體模型總覽、近二年時事、學派演進圖、諾貝爾獎年表與投資學公式總表 CTA 都是整張卡片可點擊。
- [x] 已確認四個科目首頁都不再顯示「87 題計算／申論」CTA；總體經濟學首頁 4 張科目 CTA、投資學首頁 1 張公式 CTA、會計與證券法規首頁 0 張；`#/past-exams/written` 與考古題練習庫仍保留 87 題計算／申論。
- [x] 已確認章節列右側為兩個 span：「選擇題 N 題 頻率 X%」與「申論題 N 題 頻率 X%」；本節出處題目同步顯示兩種統計並列出申論題連結；章節頁本章出題紀錄顯示選擇題／申論題兩種總計；章節列下方的「N 個重點」數量列已移除。
- [x] 已確認全站未標記的數學子句會自動轉成 KaTeX，涵蓋正文、名詞、考試重點、記憶卡、解題策略、參考解答、章節摘要、科目說明、圖表說明與考古題題幹／選項；4,790 個可轉換子句 0 編譯失敗，33 個頁面狀態 0 頁面水平溢出、0 console errors、0 `.katex-error`。
- [x] 已確認 7 個含私人使用字元或合併符號的題幹已恢復為可讀公式，包含 115Q2 梭羅成長模型 `\(Y=A L^{\alpha}K^{1-\alpha}\)`；並同步修正各年度解題中的 Solow／Cobb-Douglas 公式為勞動 L、資本 K；行內公式字級 1.06em、參考解答 1.08em、比例與正式公式 1.04em；長公式在 390px 於公式區內水平滑動，頁面本身無溢出。
- [x] 已確認 `#/investment/formulas` 顯示 5 項選擇權評價優先順序：買賣權到期損益、二項式、Black-Scholes、買賣權平價、三項式／蒙地卡羅／Heston；13 條公式以 KaTeX 顯示、36 項變數定義，390px 卡片堆疊。
- [x] 已確認模型總覽顯示 13 章、22 張章節圖（含 1 張教學流程圖）＋17 組諾貝爾模型，且沒有模型的章節仍會列出。
- [x] 已確認 `#/models/macro` 仍顯示 22 張總體章節圖＋17 組諾貝爾圖（39 張 SVG），沒有因新增會計流程圖而變動。
- [x] 已確認會計學第 14 章第 1 節顯示 4 張教學圖：`accounting-14#0` 會計循環、`accounting-14#0-2` 主要財務報表架構、`accounting-14#0-3` 借記／貸記常用項目、`accounting-14#0-4` 交易到報表流程；四張圖皆含中英文名詞、`title`／`desc`、變數／參數表與示意提醒，390px 可在圖表區水平滑動。
- [x] 已確認會計學第 15 章第 1、2 節與第 23 章第 2 節分別顯示財務分析總架構（`accounting-15#0`）、三階段／五階段杜邦分析（`accounting-15#1`）與四大財務報表連結（`accounting-23#1`）；三張圖皆含中英文名詞、`title`／`desc`、變數／參數表與示意提醒。
- [x] 已確認三張新圖在 1280px／390px、深淺主題與 `file://` 均可讀；390px 頁面無水平溢出、圖表區可水平滑動，0 console errors、0 `.katex-error`；`#/models/macro` 仍為 39 張 SVG。
- [x] 已確認 accounting-15#1 與 accounting-23#1 新增的 14 張比率／報表名詞卡顯示正常，全站名詞卡為 1,233 張；驗證器 90,511 項、失敗 0。
- [x] 已確認總體經濟學首頁的學派演進圖顯示 6 階段、10 個節點、19 個模型連結與 15 個諾貝爾里程碑；每個節點都有學派／理論名稱、提出者、摘要與延伸章節。
- [x] 已確認演進圖的模型名稱連到 `#/models/macro?model=<anchor>`，可捲動到指定模型卡並短暫高亮；諾貝爾里程碑連到 `#/nobel?year=YYYY`。
- [x] 已確認總體經濟學學派演進圖位於獨立頁 `#/macro/evolution`；總體經濟學首頁保留 1 張整張可點擊的演進圖 CTA，舊網址 `#/subject/macro?evolution=1` 仍可開啟；1280px／390px／`file://` 的明暗主題均正常，0 水平溢出、0 console errors。
- [x] 已確認演進圖的模型錨點存在於 21 張既有模型圖、諾貝爾年份存在於 58 屆年表，且 `MACRO_DIAGRAMS`／`NOBEL_DATA` 仍為單一來源；驗證器 5,245 項、失敗 0。
- [x] 已確認模型總覽的章節跳轉可捲動到指定章，且每張圖可連回所屬章節與節次。
- [x] 已確認總體章節的「模型總覽」按鈕會連到該章在總覽頁的位置。
- [x] 已用瀏覽器修改記憶體中的 `MACRO_DIAGRAMS`，確認章節頁與模型總覽同步顯示新標題與圖說。
- [x] 已確認模型圖的曲線方向、移動方向與圖說一致，並完成 21 張既有模型圖公開教材核對；另新增 macro-01#2 國民所得會計帳流程圖，已通過結構、章節綁定與 1280px／390px、深淺主題、`file://` 實測；B9 的 SRAS₁ 虛線已與 E_LR 對齊。
- [x] 已用 390px 寬度確認模型圖可在區塊內水平滑動，頁面沒有水平溢出；模型總覽同樣無水平溢出。
- [x] 已確認 `#/nobel` 顯示 58 屆、17 組模型圖與 2026 屆，且 `?group=`、`?year=`、`?table=`、`?models=` 都能捲動到目標。
- [x] 已確認 `#/models/macro?chapter=nobel` 可跳到諾貝爾區，總覽顯示 22 張章節圖（含 1 張教學流程圖）＋17 組諾貝爾模型。
- [x] 已用瀏覽器修改記憶體中的 `NOBEL_DIAGRAMS`，確認 `#/nobel` 與 `#/models/macro` 同步顯示新標題與圖說。
- [x] 已確認 390px 下諾貝爾年表改為上下堆疊、頁面無水平溢出，模型圖可在圖表區內水平滑動，`file://` 可直接開啟諾貝爾頁。
- [x] 已完成 115→107 年考古題批次核對：29 次考試、3,710 題選擇題與 348 題計算／申論題；選擇題答案與證基會公告逐題比對，單一答案題全部一致，多答案題保留官方可接受答案；更正 `107Q4-law-20` C→A，修正 `107Q4-macro-written-2` 的 `K_0=1000`→`K_0=100`、`109Q1-macro-written-2` 的 `Md P`→`M^d/P`、`110Q1-macro-written-3` 的 Unicode 數學斜體、`111Q1-macro-written-2` 的 `dY`→`Y_d`、`111Q3-macro-written-1` 的 SRAS／Okun 缺項、`112Q1-investment-26` 遺失的 `√12`、`112Q3-macro-written-1` 的 `AK0.5N0.5`→`A K^{0.5}N^{0.5}`、`113Q2-macro-written-2` 的 `dY`／`Md`／`Ms`、`113Q3-investment-written-2`／`-3` 的共變異數下標、`114Q1-macro-written-2` 的 `Α𝐾0.3𝑁0.7`→`A K^{0.3}N^{0.7}`、`114Q2-investment-written-1` 的 `E(rS)`／`σS` 下標，以及 `111Q2-accounting-28`、`113Q1-accounting-12`、`113Q1-accounting-27` 的 Wingdings 圓圈數字；同步更新 `107Q4-macro-written-2` 與 `114Q1-macro-written-2` 的章節解題步驟。靜態稽核 4,770 個可轉換子句、0 編譯失敗；33 個全域頁面狀態＋8 個修正題目 390px 狀態，0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 114,357 項、失敗 0。
- [x] 已完成 3,710 題選擇題逐選項解析與 348 題計算／申論題題意檢核；練習模式、瀏覽模式與章節範例皆可顯示，總體經濟學第 4 節新增拉氏／帕氏／GDP 平減指數 KaTeX 公式；1280px／390px 與 `file://` 0 頁面水平溢出、0 console errors、0 `.katex-error`；驗證器 147,256 項、失敗 0。
- [x] 已執行繁體中文掃描與驗證器的簡體字守門檢查，沒有發現簡體字。
- [x] 已在「實際複核紀錄」留下日期、來源與結論。
- [x] 已確認計算／申論題改用結構化版型：`content-written-layouts.js` 支援段落、清單、獨立公式與表格，首批 49 題套用表格／多層資料版型；其餘題目以 `(1)`、`(2)`、`●`、中文序号、句號、分號與「請問／試問」等提問語自動分段。表格在 390px 於 `written-table-wrap` 內水平滑動，頁面本身無水平溢出；49 個版型題與 33 個全域 QA 狀態均 0 水平溢出、0 console errors、0 `.katex-error`；驗證器新增版型 ID、區塊類型、表格欄列數、清單、公式與文字 KaTeX 檢查，共 117,083 項、失敗 0。
