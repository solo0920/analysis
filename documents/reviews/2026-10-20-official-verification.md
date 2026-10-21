# 官方來源核對紀錄（2026-10-20）

本紀錄保存 2026-10-20 實際執行過的官方來源核對，供後續重跑與追蹤。網站內容仍是考試複習整理；未列為「通過」的項目一律保留「待查」。

## 1. 諾貝爾經濟學獎年表

- 官方 API：<https://api.nobelprize.org/2.1/nobelPrizes?limit=100&nobelPrizeCategory=eco&sort=desc>
- 重現指令：`node site/scripts/verify-nobel-api.js`
- 比對範圍：1969–2026 年表的年份與得主姓氏。
- 結果：官方 58 屆、網站 58 屆、不一致 0 筆。
- 2026 屆：Robert E. Hall、Michael Woodford；官方動機「for microeconomic foundations of macroeconomic stabilisation」。
- 2026 屆官方 popular information：<https://www.nobelprize.org/prizes/economic-sciences/2026/popular-information/>
  - Hall：消費變動不可預測，消費取決於對未來所得的預期（隨機漫步概念）。
  - Woodford：三方程式新凱因斯模型、價格僵固、預期與自然利率、產出缺口。
- 2026 年科學背景 PDF：<https://www.nobelprize.org/uploads/2026/10/advanced-economicsciencesprize2026.pdf>
  - 解析方式：以 macOS Swift／PDFKit 擷取 PDF 文字（57 頁），再搜尋方程式與關鍵詞。
  - Hall：式 (12) `E_t{c_{t+1}} = c_t`，即隨機漫步／martingale；與網站 `C_{t+1} = C_t + ε_{t+1}` 一致。
  - Woodford：三方程式模型；式 (15) `π_t = βE_tπ_{t+1} + κỹ_t`，與網站 `π_t = βE_tπ_{t+1} + κx_t` 一致（`x_t` 為產出缺口）。
  - 前瞻指引、可信度與透明度的討論見科學背景，支持網站 2026 屆結論。

### 2025 屆公式修正

- 2025 年科學背景 PDF：<https://www.nobelprize.org/uploads/2025/10/advanced-economicsciencesprize2025.pdf>
- 官方式 (9)：`Y_{t+1}/Y_t = 1 + z*(γ−1)`；淨成長率為 `z*(γ−1)`，對數近似為 `z* ln γ`。
- 網站原式 `g = λ ln(γ) Q` 的 `Q` 因子無官方依據；已改為 `g = λ(γ−1) ≈ λ ln(γ)`，其中 λ 為創造性破壞率、γ 為創新步幅。
- 概念：Mokyr 的知識擴散與 Aghion & Howitt 的創造性破壞均與官方說明一致。
- 限制：Aghion & Howitt (1992) 原文未逐條核對。

### 2019–2020 屆核對

- 2019 科學背景：<https://www.nobelprize.org/uploads/2019/10/advanced-economicsciencesprize2019.pdf>
  - 官方背景說明明確以隨機對照試驗（RCT）估計因果效果；隨機分派可移除選擇偏誤，並估計平均因果效果。
  - 網站 `ATE = E[Y_i(1) − Y_i(0)]` 是標準潛在結果定義，官方背景未列出同名方程式；以「概念式、RCT 可識別」標示。
  - 官方背景也指出微型貸款的效果不如原先預期；網站結論已由「解決貧窮陷阱」改為「估計教育、醫療、信貸等介入的因果效果」。
- 2020 科學背景：<https://www.nobelprize.org/uploads/2020/09/advanced-economicsciencesprize2020.pdf>
  - 官方背景確認共同價值、勝者魔咒（得標者的條件期望值低於其信號）、私有與共同價值，以及同步多輪拍賣（SMRA）、組合時鐘拍賣等新格式。
  - 網站原式 `max Revenue under Common Values` 不是官方方程式，且官方強調賣方未必以最大收入為目標；已改為 `E[V|win] < E[V|own signal]`（勝者魔咒，概念式），並將結論改為 SMRA／組合時鐘拍賣與互補性標的。
- 限制：2019、2020 網站公式為複習用概念式，未宣稱逐式等同官方模型；兩屆代表原始論文書目已核對，全文仍未逐條核對。

### 2021–2024 屆核對

- 2021 科學背景：<https://www.nobelprize.org/uploads/2021/10/advanced-economicsciencesprize2021.pdf>
  - 官方式：`(E[Y|Z=1]−E[Y|Z=0])/(E[D|Z=1]−E[D|Z=0])`，即 IV estimand，識別 complier 的 LATE。
  - 網站 `ATE_{LATE}` 公式逐式一致；自然實驗、DID 與 IV 的方向一致。
- 2022 科學背景：<https://www.nobelprize.org/uploads/2022/10/advanced-economicsciencesprize2022.pdf>
  - 官方 Diamond–Dybvig 模型：資源限制 `λc_1 + (1−λ)c_2/R = 1`；銀行契約 `r_1 = c_1^*`、`r_2 = c_2^*`、`1 < r_1 < r_2 < R`；模型有多重均衡與擠兌。
  - 網站 `V_bank = Liquidity Transformation` 是概念式，方向與官方流動性／期限轉換說明一致，不是原文方程式。
- 2023 科學背景：<https://www.nobelprize.org/uploads/2023/10/advanced-economicsciencesprize2023.pdf>
  - 官方：女性勞動參與率呈 U 型；結構轉變、避孕藥、育兒與職場缺乏彈性（網站以「貪婪工作」概括）是關鍵因素。
  - 網站 `FLFP = f(...)` 是概念式，方向一致。
- 2024 科學背景：<https://www.nobelprize.org/uploads/2024/10/advanced-economicsciencesprize2024.pdf>
  - 官方：以殖民經驗作自然實驗，說明包容性／抽取性制度與長期繁榮；政治制度影響經濟制度與經濟結果。
  - 網站 `Growth = f(Inclusive Institutions)` 是概念式，方向一致。
- 限制：2022–2024 網站公式是複習用概念式，未宣稱逐式等同官方模型；四屆代表論文書目已核對，2021–2024 每年至少一篇完成全文抽查，其餘論文全文仍待。

### 1.1 代表原始論文書目核對（2026-10-20）

- 方法：從各屆官方科學背景 PDF 的 References 擷取代表論文，核對作者、年份、篇名、期刊、卷期與頁碼；只核對書目，未讀全文。
- 用途：建立後續追原始論文的清單，不把「書目一致」寫成「全文已驗證」。

| 屆 | 代表原始論文 | 官方依據 | 結果 |
| --- | --- | --- | --- |
| 2019 | Banerjee, Duflo, Glennerster & Kinnan (2015), “The Miracle of Microfinance? Evidence from a Randomized Evaluation,” *AEJ: Applied* 7(1), 22–53. | [2019 科學背景](https://www.nobelprize.org/uploads/2019/10/advanced-economicsciencesprize2019.pdf) | 書目一致；全文未逐條 |
| 2020 | Milgrom & Weber (1982), “A Theory of Auctions and Competitive Bidding,” *Econometrica* 50, 1089–1122. | [2020 科學背景](https://www.nobelprize.org/uploads/2020/09/advanced-economicsciencesprize2020.pdf) | 書目一致；全文未逐條 |
| 2021 | Imbens & Angrist (1994), “Identification and Estimation of Local Average Treatment Effects,” *Econometrica* 62(2), 467–475. | [2021 科學背景](https://www.nobelprize.org/uploads/2021/10/advanced-economicsciencesprize2021.pdf)；[JSTOR 2951620](https://www.jstor.org/stable/2951620) | 官方 PDF 誤植為 61:467–476，已依期刊書目更正；全文未逐條 |
| 2022 | Diamond & Dybvig (1983), “Bank Runs, Deposit Insurance, and Liquidity,” *Journal of Political Economy* 91, 401–419. | [2022 科學背景](https://www.nobelprize.org/uploads/2022/10/advanced-economicsciencesprize2022.pdf) | 書目一致；全文未逐條 |
| 2023 | Goldin (1990), *Understanding the Gender Gap*；Goldin (2006), “The Quiet Revolution That Transformed Women’s Employment, Education, and Family,” *AER* 96(2), 1–21. | [2023 科學背景](https://www.nobelprize.org/uploads/2023/10/advanced-economicsciencesprize2023.pdf) | 書目一致；全文未逐條 |
| 2024 | Acemoglu, Johnson & Robinson (2001), “The Colonial Origins of Comparative Development: An Empirical Investigation,” *AER* 91, 1369–1401；同作者 (2002), “Reversal of Fortune,” *QJE* 117, 1231–1294. | [2024 科學背景](https://www.nobelprize.org/uploads/2024/10/advanced-economicsciencesprize2024.pdf) | 書目一致；全文未逐條 |
| 2025 | Aghion & Howitt (1992), “A Model of Growth Through Creative Destruction,” *Econometrica* 60(2), 323–351. | [2025 科學背景](https://www.nobelprize.org/uploads/2025/10/advanced-economicsciencesprize2025.pdf) | 書目一致；全文未逐條 |
| 2026 | Hall (1978), “Stochastic Implications of the Life Cycle-Permanent Income Hypothesis: Theory and Evidence,” *JPE* 86(6), 971–987；Woodford (2003), *Interest and Prices*（專書）. | [2026 科學背景](https://www.nobelprize.org/uploads/2026/10/advanced-economicsciencesprize2026.pdf) | 書目一致；全文未逐條 |

### 1.2 原始論文全文抽查（2026-10-20）

- 範圍：只抽查可公開取得全文的 Hall (1978)、Aghion & Howitt (1992)、Imbens & Angrist (1994)、Diamond & Dybvig (1983)；其餘屆仍只完成書目與官方背景核對。

| 屆 | 論文與原文重點 | 與網站對照 | 結果 |
| --- | --- | --- | --- |
| 2019 | [Banerjee, Duflo, Glennerster & Kinnan (2015)](https://www.isid.ac.in/~tridip/Teaching/DevelopmentMicroeconomics/Readings/Banerjee&Duflo&Glennerster&Kinnan_AEJAppliedEconomics2015.pdf)：52 個社區、微型貸款 take-up 增加 8.4 個百分點；小型事業投資與利潤增加，但消費未顯著增加；健康、教育、女性賦權無顯著變化。 | 網站「效果不如原先預期」與原文摘要一致；ATE 為概念式。 | 方向一致；全文抽查。 |
| 2020 | [Milgrom & Weber (1982)](https://www.cs.princeton.edu/courses/archive/spr09/cos444/papers/milgrom_weber82.pdf)：共同價值拍賣中，得標者平均會高估價值，即 winner's curse。 | 網站 \(E[V\mid\text{win}]<E[V\mid\text{own signal}]\) 是概念化不等式。 | 概念方向一致；非原文方程式。 |
| 2021 | [Imbens & Angrist (1994)](https://raw.githubusercontent.com/Mixtape-Sessions/Instrumental-Variables/main/Readings/Lecture3/Angrist_Imbens_1994.pdf)：以工具變數識別 complier 的 LATE，IV estimand 與網站公式相同。 | 網站 \(ATE_{LATE}=(E[Y|Z=1]-E[Y|Z=0])/(E[D|Z=1]-E[D|Z=0])\)。 | 逐式一致；另更正官方 PDF 的頁碼誤植。 |
| 2022 | [Diamond & Dybvig (1983)](https://www.bu.edu/econ/files/2012/01/DD83jpe.pdf)：資源限制 \(t c_1+(1-t)c_2/R=1\)，最適條件 \(u'(c_1)=pR u'(c_2)\)，模型有多重均衡與擠兌。 | 網站以 \(V_{bank}=\text{Liquidity Transformation}\) 作概念式，未列資源限制。 | 概念方向一致；網站已把 Bernanke 的實證與 DD 模型分開表述。 |
| 2023 | [Goldin (2006)](https://www.nber.org/system/files/working_papers/w11953/w11953.pdf)：quiet revolution 與女性勞動參與 U 型；[Goldin (2014)](https://paulgp.com/speeches/goldin_2014_aea.pdf)：長工時與時間彈性不足造成薪資差距。 | 網站以 U 型、長工時、時間彈性與育兒懲罰說明；「貪婪工作」是後續綜合用語。 | 方向一致；網站已補「後續綜合用語」。 |
| 2024 | [Acemoglu, Johnson & Robinson (2001)](https://economics.mit.edu/sites/default/files/publications/colonial-origins-of-comparative-development.pdf)：以歐洲殖民者死亡率作工具變數，估計制度對人均所得的長期效果。 | 網站 \(\text{Growth}=f(\text{Inclusive Institutions})\) 是概念式。 | 方向一致；全文抽查。 |
| 2025 | [Aghion & Howitt (1992)](https://web.econ.ku.dk/dalgaard/growth/growth07/AghionHowitt.pdf)：平均成長率 \(AGR=Aq(n)\ln\gamma\)，變異數 \(VGR=Aq(n)(\ln\gamma)^2\)。 | 網站 \(g=\lambda(\gamma-1)\approx\lambda\ln\gamma\)，其中 \(\lambda\) 對應創新到達率 \(Aq(n)\)。 | 小步幅近似一致；網站已改稱「創新到達率（創造性破壞率）」。 |
| 2026 | [Hall (1978)](http://drphilipshaw.com/Hall%201978%20JPE.pdf)：原文為隨機漫步「with trend」，近似式 \(c_{t+1}=\lambda_t c_t+\epsilon_{t+1}/u''(C_t)\) 加高階項。 | 網站 \(C_{t+1}=C_t+\epsilon_{t+1}\) 是官方背景的無趨勢簡化。 | 方向一致；網站已補「無趨勢簡化，原文允許趨勢」。 |

- Woodford (2003) 專書：未取得全書全文；以 Woodford 相關論文 [Capital-NKPC](https://www.columbia.edu/~mw2230/Capital-NKPC.pdf) 的式 (4.3) `π_t=κỸ_t+βE_tπ_{t+1}` 與書中 chap. 3／5 的 NKPC 對照，網站 `π_t=βE_tπ_{t+1}+κx_t` 逐式一致（x 為產出缺口）；專書全文仍待。
- 整體限制：官方 API、popular information 與科學背景確認年份、得主、公式與學說概念；2019–2026 每年至少一篇代表論文完成全文抽查（Woodford 2003 專書與其他論文全文仍未逐條），其他屆公式、結論與 17 組模型圖仍未逐條對照。

## 2. 會計公式（IFRS 官方摘要／準則本文／公開教材）

| 項目 | 準則 | 官方依據 | 結果 |
| --- | --- | --- | --- |
| A1 約當現金 | IAS 7 | [IAS 7 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/) | 通過；三個月門檻依 IAS 7.7 |
| A3 存貨淨變現價值 | IAS 2 | [IAS 2 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/) | 通過；成本與 NRV 孰低 |
| A4 折舊與減損 | IAS 16／IAS 36 | [IAS 16 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/)；[IAS 36 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/) | 通過；減損與可回收金額定義一致 |
| A8 遞延所得稅 | IAS 12 | [IAS 12 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-12-income-taxes/) | 通過；暫時性差異與預期適用稅率 |
| A12 基本每股盈餘 | IAS 33 | [IAS 33 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-33-earnings-per-share/) | 通過；分子、分母架構一致 |
| A5 攤銷後成本利息 | IFRS 9.5.4.1 | [IFRS 9 準則本文](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2026/issued/ifrs9.html) | 通過；原則上以有效利率乘總帳面金額，信用減損資產改用攤銷後成本；網站公式已據此精確化 |
| A7 使用權資產 | IFRS 16.24 | [IFRS 16 準則本文](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2026/issued/ifrs16.html) | 通過；成本包含租賃負債、預付租賃款減誘因、初始直接成本、除役與復原成本估計；網站原公式漏列復原成本，已補入 |
| A2 票據貼現 | 臺灣考試教材 | [三民輔考「應收帳款」](https://www.3people.com.tw/%E7%9F%A5%E8%AD%98/%E6%87%89%E6%94%B6%E5%B8%B3%E6%AC%BE/%E5%85%AC%E8%81%B7%E8%80%83%E8%A9%A6-%E9%AB%98%E6%99%AE%E5%88%9D%E3%80%81%E5%9C%B0%E7%89%B9-%E8%B2%A1%E7%A8%85%E8%A1%8C%E6%94%BF/75abcb35-1c2e-4b7c-9e44-81fe9cfd3f56) | 通過（教材）；到期值、貼現息公式一致；期間單位需一致，不附息票據到期值＝面額 |
| A6 公司債發行價格 | 公開教材 | [OpenStax 10.2 Bond Valuation](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation) | 通過（教材）；票面利息現值＋面額現值；半年付息需調整利率與期數 |
| A9 杜邦分解 | 公開教材 | [OpenStax 6.6 DuPont](https://openstax.org/books/principles-finance/pages/6-6-profitability-ratios-and-the-dupont-method) | 通過（教材）；ROE＝淨利率×總資產週轉率×權益乘數 |
| A10 WACC | 公開教材 | [OpenStax 17.3 WACC](https://openstax.org/books/principles-finance/pages/17-3-calculating-the-weighted-average-cost-of-capital) | 通過（教材）；無特別股版本；若有特別股需加 W_p×r_p |
| A11 NPV／OCF | 公開教材 | [OpenStax 16.2 NPV](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method)；[Ole Miss FIN 331 Ch9](http://faculty.bus.olemiss.edu/rvanness/Courses/Fin%20331/Chapter%209.pdf) | 通過（教材）；NPV 與稅盾法 OCF 公式一致 |

- 代表性分錄與報表勾稽已於 2.1 檢查；待查：各章例題的逐題完整計算；A1–A12 公式已完成官方或教材核對。
- 限制：A2、A6、A9–A11 為公開教材核對，不是 IFRS 官方立場；A10 為無特別股版本，A6 的付息頻率與 A2 的期間單位需依題目調整。
- 教材連結檢查（2026-10-20）：三民輔考、OpenStax 10.2／6.6／17.3／16.2、Ole Miss FIN 331 Ch9 皆回 HTTP 200。

### 2.1 分錄與報表勾稽（2026-10-20）

- 範圍：零用金、備抵壞帳、有追索權票據貼現、公司債、庫藏股、股票股利、現金流量表、存貨錯誤與保留盈餘／EPS 的代表性分錄與跨表勾稽。
- 外部教材：[OpenStax《Principles of Accounting, Volume 1: Financial Accounting》](https://openstax.org/books/principles-financial-accounting/pages/index)（本節外部檢核教材，未計入網站 26 個資料來源）；除列與衡量條件另對照 [IFRS 9](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2026/issued/ifrs9.html)。
- 方法：以代表性數字重算借貸平衡、帳面金額與跨表連結；不以模型回答代替計算。

| 項目 | 重算結果 | 來源 | 判定 |
| --- | --- | --- | --- |
| 零用金撥補 | 基金 1,000；現金 200、單據 780、短溢 20。撥補：借費用 780、借現金短溢 20、貸現金 800；基金仍為 1,000。 | [OpenStax 8.4](https://openstax.org/books/principles-financial-accounting/pages/8-4-define-the-purpose-and-use-of-a-petty-cash-fund-and-prepare-petty-cash-journal-entries) | 通過 |
| 備抵壞帳沖銷與收回 | AR 100、備抵 5、淨額 95；沖銷 3 後 AR 97、備抵 2、淨額仍 95；收回 2 先恢復應收與備抵，再收款 2，淨額因收款降至 93。 | [OpenStax 9.2](https://openstax.org/books/principles-financial-accounting/pages/9-2-account-for-uncollectible-accounts-using-the-balance-sheet-and-income-statement-approaches) | 通過 |
| 有追索權票據貼現 | 借現金、借貼現息、貸短期借款；票據留帳。拒付時公司代償銀行後，將票據轉回應收帳款並認列相關利息或損失。 | IFRS 9 除列條件；網站第 1 章第 6 節 | 通過；文字已補「公司代償銀行後」 |
| 公司債溢價發行 | 面額 100,000、票面 5%、市場 4%、3 年：價格 102,775.09；第 1 年利息費用 4,111.00、票息 5,000、溢價攤銷 889.00、帳面 101,886.09；第 3 年回到 100,000。 | [OpenStax 13.2](https://openstax.org/books/principles-financial-accounting/pages/13-2-compute-amortization-of-long-term-liabilities-using-the-effective-interest-method)；[13.3](https://openstax.org/books/principles-financial-accounting/pages/13-3-prepare-journal-entries-to-reflect-the-life-cycle-of-bonds) | 通過；公式改以有效利率表達 |
| 庫藏股買回與再發行 | 買回 1,000 股 @20＝20,000；再發行 600 股 @26，成本 12,000，差額 3,600 貸資本公積；再發行 400 股 @15，成本 8,000，差額 2,000 先沖資本公積 3,600，剩 1,600。 | [OpenStax 14.2](https://openstax.org/books/principles-financial-accounting/pages/14-2-analyze-and-record-transactions-for-the-issuance-and-repurchase-of-stock) | 通過 |
| 股票股利 | 10,000 股、面額 10、配股 10%：面額法借保留盈餘 10,000、貸股本 10,000；公允價值法（市價 25）借保留盈餘 25,000、貸股本 10,000、貸資本公積 15,000。 | [OpenStax 14.3](https://openstax.org/books/principles-financial-accounting/pages/14-3-record-transactions-and-the-effects-on-financial-statements-for-cash-dividends-property-dividends-stock-dividends-and-stock-splits) | 修正後通過；網站已加註兩種方法 |
| 現金流量表間接法 | 淨利 50＋折舊 20−處分利益 5−AR 增加 10−存貨增加 5＋AP 增加 8＝CFO 58；投資 −30＋15＝−15；籌資 ＋20−10＝＋10；現金淨增 53；期初 100→期末 153，等於資產負債表現金。 | [OpenStax 16.3](https://openstax.org/books/principles-financial-accounting/pages/16-3-prepare-the-statement-of-cash-flows-using-the-indirect-method)；[16.4](https://openstax.org/books/principles-financial-accounting/pages/16-4-prepare-the-completed-statement-of-cash-flows-using-the-indirect-method)；[2.1](https://openstax.org/books/principles-financial-accounting/pages/2-1-describe-the-income-statement-statement-of-owners-equity-balance-sheet-and-statement-of-cash-flows-and-how-they-interrelate) | 通過；網站已補期末現金勾稽句 |
| 存貨錯誤跨期 | 期末存貨高估 10：第 1 年 COGS 少 10、淨利多 10、期末 RE 多 10；第 2 年期初存貨多 10、COGS 多 10、淨利少 10；若無其他錯誤，第 2 年期末 RE 回復正確。 | [ibrain 存貨錯誤例題](https://www.ibrain.com.tw/Audition/FilePath/DOC//41899.pdf)；[會計問答網](https://askaccounting.tw/t/topic/2272) | 修正後通過；原「保留盈餘仍可能錯誤」已改 |
| 保留盈餘與基本 EPS | 期初 RE 80＋淨利 50−股利 10＝120；基本 EPS＝（淨利 100−特別股股利 10）÷加權平均股數 90＝1.00。前期損益調整、股票股利與股數變動需另調整。 | [OpenStax 14.4](https://openstax.org/books/principles-financial-accounting/pages/14-4-compare-and-contrast-owners-equity-versus-retained-earnings)；[14.5](https://openstax.org/books/principles-financial-accounting/pages/14-5-discuss-the-applicability-of-earnings-per-share-as-a-method-to-measure-performance) | 通過；Ch23 保留盈餘公式已加簡化條件 |
| 借貸平衡與會計恆等式 | 上表各分錄借方合計等於貸方合計；資產＝負債＋權益。 | [OpenStax 3.1](https://openstax.org/books/principles-financial-accounting/pages/3-1-describe-principles-assumptions-and-concepts-of-accounting-and-their-relationship-to-financial-statements)；[3.2](https://openstax.org/books/principles-financial-accounting/pages/3-2-define-and-describe-the-expanded-accounting-equation-and-its-relationship-to-analyzing-transactions) | 通過 |

- 已修正：
  - 存貨錯誤：原「下一期部分反轉、保留盈餘仍可能錯誤」改為「兩期淨利影響相互抵銷；若無其他錯誤，下期期末保留盈餘回復正確」。
  - 股票股利：原「保留盈餘轉入股本與資本公積」改為「轉入股本；採公允價值法時，超過面額部分另計資本公積」。
  - 公司債：利息費用由「期初帳面金額 × 市場利率」改為「有效利率（市場利率調整發行成本後）」。
  - Ch20 EPS 加註「無特別股、股數不變」；WACC 加註「無特別股版本」；Ch23 保留盈餘加註簡化條件。
- 限制：OpenStax 為美國 GAAP 教材；股票股利、公司債溢價／折價的表達在 IFRS 與臺灣考試實務可能有差異，網站以 IFRS 與臺灣考試慣例為主，並保留方法差異。各章例題逐題重算仍待完成。

### 2.2 進階會計分錄與勾稽（2026-10-20）

- 範圍：租賃、收入分攤、遞延所得稅、合併商譽與資本預算。
- 方法：以代表性數字重算現值、分攤、稅額與商譽，確認借貸平衡與報表連結。

| 項目 | 重算結果 | 來源 | 判定 |
| --- | --- | --- | --- |
| 承租人租賃 | 期末給付 100,000、3 年、5%：租賃負債現值 272,324.80；加初始直接成本 10,000 與復原成本 5,000，使用權資產 287,324.80；年折舊 95,774.93；第 1 年利息 13,616.24、期末負債 185,941.04。 | [IFRS 16 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/) | 通過；使用權資產與租賃負債分開攤銷 |
| 收入分攤 | 交易價格 100,000；兩項履約義務單獨售價 60,000、40,000；分攤 60,000、40,000；預收 100,000，交付第一項後合約負債剩 40,000。 | [IFRS 15 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/) | 通過 |
| 遞延所得稅 | 會計利潤 100,000、稅上折舊多 20,000、稅率 20%：課稅所得 80,000、當期稅 16,000、遞延所得稅負債 4,000、所得稅費用 20,000。 | [IAS 12 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ias-12-income-taxes/) | 通過；DTL 與當期稅分開表達 |
| 合併商譽 | 移轉對價 500＋NCI 50＋先前持有權益 30−可辨認淨資產 520＝商譽 60；NCI 列權益。 | [IFRS 10 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-10-consolidated-financial-statements/)；[IFRS 3 官方摘要](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-3-business-combinations/) | 通過；NCI 可按公允價值或比例份額衡量，商譽金額會不同 |
| 資本預算 | 收入 80、現金成本 30、折舊 20、稅率 20%、r=10%、5 年：OCF 44、NPV 66.79。 | [OpenStax Finance 16.2](https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method) | 通過；NPV 用現金流，不用會計淨利 |

- 限制：上表為代表性數字，未涵蓋租賃修改、可變租賃給付、虧損合約、合併內部交易與多期資本預算；各章例題仍待逐題重算。

## 3. 投資學與總體經濟學公式（公開教材／官方輔助）

- 核對日期：2026-10-20。
- 範圍：`documents/content_review_checklist.md` 第二節 #1–#29。
- 結果：29/29 通過（教材）；#27 另以 BIS 官方 CIP 定義、#28 另以 SEC Investor.gov 官方 NAV 定義交叉核對。
- 判定條件：數學式、每個符號的定義、期間單位與適用假設都與來源一致。網站 `formula` 欄已補上原先省略的假設；若來源使用等價但不同符號，於下表說明。
- 名詞約定：網站所稱「到期內在價值」是到期時未扣權利金的價值；OpenStax 20.3 所稱 payoff 已含權利金，兩者不是同一個名詞。

### 3.1 來源

- 總體 GDP、乘數與貨幣創造：[OpenStax Macro 3e 6.1](https://openstax.org/books/principles-macroeconomics-3e/pages/6-1-measuring-the-size-of-the-economy-gross-domestic-product)、[14.4](https://openstax.org/books/principles-macroeconomics-3e/pages/14-4-how-banks-create-money)、[Appendix B](https://openstax.org/books/principles-macroeconomics-3e/pages/b-the-expenditure-output-model)；[MIT 14.02 Spring 2023 PS2](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/mit14_02_s23_pset2.pdf)。
- 總體 IS-LM、菲利浦曲線與開放經濟：[Hanover College IS-LM notes](https://vault.hanover.edu/~eiriksson/classes/214/files/EC214ISLMalgebraically.pdf)；[LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)；[MIT 14.02 Lecture 12](https://web.mit.edu/14.02/www/S04/lecture12.pdf)；[MIT 14.02 Open Economy handout](https://web.mit.edu/14.02/www/krugman/exchange.pdf)。
- 投資報酬、風險、CAPM 與績效：[OpenStax Finance 15.1](https://openstax.org/books/principles-finance/pages/15-1-risk-and-return-to-an-individual-asset)、[15.3](https://openstax.org/books/principles-finance/pages/15-3-the-capital-asset-pricing-model-capm)、[15.4](https://openstax.org/books/principles-finance/pages/15-4-applications-in-performance-measurement)；[LibreTexts 8.2](https://biz.libretexts.org/Courses/Aurora_University/Principles_of_Financial_Management/08%3A_Valuation_of_Financial_AssetsRisk_and_Return/8.02%3A_Measuring_Risk_and_Expected_Return)；[MIT 15.401 Sample Final](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/f8870d5f537f04e75e7ecc243416e02a_MIT15_401F08_final.pdf)。
- 債券、股利、選擇權、期貨與避險：[OpenStax Finance 10.2](https://openstax.org/books/principles-finance/pages/10-2-bond-valuation)、[11.2](https://openstax.org/books/principles-finance/pages/11-2-dividend-discount-models-ddms)、[20.3](https://openstax.org/books/principles-finance/pages/20-3-exchange-rates-and-risk)；[MIT 15.401 Lecture 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf)、[Recitation 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf)、[Lecture 8](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/a66f697aaeb23b8cfd2bda020172feb5_MIT15_401F08_lec08.pdf)；[FIU/Hull Ch5](https://faculty.fiu.edu/~dupoyetb/Financial_Risk_Mgt/lectures/Ch05.pdf)；[Case Western Ch3](https://faculty.weatherhead.case.edu/phr/textbook/chapter3ps.pdf)；[CSUN Finance 436](http://www.csun.edu/~zz1802/Finance%20436/Web-Stuff-1/Review-Notes-I.pdf)。
- 費雪、期限結構、杜邦、NAV 與遠期匯率：[OpenStax Finance 7.4](https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance)、[6.6](https://openstax.org/books/principles-finance/pages/6-6-profitability-ratios-and-the-dupont-method)；[SMU Financial Mathematics Ch3](http://www.mysmu.edu/faculty/yktse/fma/s_fma_3.pdf)；[BIS Quarterly Review, Box A](https://www.bis.org/publications/qr-201609/covered-interest-parity-lost-understanding-cross-currency-basis)；[SEC Investor.gov NAV](https://www.investor.gov/introduction-investing/investing-basics/glossary/net-asset-value)。

### 3.2 逐條對照

| # | 項目 | 網站式 | 來源式 | 結果／等價說明 |
| --- | --- | --- | --- | --- |
| 1 | GDP 支出面 | `GDP = C + I + G + X − M` | `GDP = C + I + G + (X − M)`（OpenStax 6.1） | 逐式一致；GDP 為期間流量，X−M 為淨出口，可為負。 |
| 2 | 簡單凱因斯乘數 | `Y = 1/(1−MPC) × A₀` | `Y = [c0 − c1t0 + G + I]/(1−c1)`；`dY/dG = 1/(1−c1)`（MIT PS2） | 在 T=0、封閉、無進口、物價固定時，`A₀=c0+I+G` 且兩式一致；若 t0≠0，A₀ 內含 `−c1t0`；有進口或所得稅時乘數較小。 |
| 3 | 簡單貨幣乘數 | `M = m × B；m = 1 ÷ rr` | `ΔD = ΔR × (1/rr)`；貨幣乘數 `1/準備率`（OpenStax 14.4） | 令 B=R、M=D，即與來源的存款創造式等價；假設無超額準備、無現金流失、銀行貸出全部超額準備。 |
| 4 | IS-LM 均衡 | `IS：Y = C(Y−T) + I(i) + G；LM：M/P = L(Y,i)` | `Y=C+I+G`、`C=C0+CY(Y−T)`、`I=I0−Irr`、`M/P=L0−Lii+LyY`（Hanover；LibreTexts 物價固定） | 封閉經濟、物價固定、預期通膨為零時，網站的 i 與來源的 r 同義；未含國外部門。 |
| 5 | 菲利浦曲線 | `π = πᵉ − β(u − uₙ) + ε` | `π_t = π_t^e − α(u_t − u_n)`（MIT Lecture 12） | 令 β=α>0、ε 為供給衝擊；ε=0 時逐式一致。短期預期增廣曲線；長期 u=u_n。 |
| 6 | 開放經濟乘數 | `1 ÷ (1 − MPC + MPM)` | `Y = ZZ0/(1 − c1 + εm1)`（MIT Open Economy） | 令 ε=1、無稅、MPM=m1 時逐式一致；ε≠1 時分母應為 `1−MPC+ε×MPM`。 |
| 7 | 持有期間報酬 | `HPR = (P₁ − P₀ + D₁) ÷ P₀` | 總報酬率=股利收益率+資本利得率（OpenStax 15.1） | 逐式等價；D₁ 為期間現金收益，未計稅費，報酬與現金收益同週期。 |
| 8 | 報酬變異數 | `σ² = Σ pᵢ[Rᵢ − E(R)]²` | `σ² = Σ p(s)[r(s) − E(r)]²`（LibreTexts 8.2） | 逐式一致；p 合計 1，E(R)=ΣpR；母體變異數，標準差為平方根。 |
| 9 | 兩資產組合變異數 | `σₚ² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρ₁₂σ₁σ₂` | 同式（LibreTexts 8.2；MIT Sample Final） | 逐式一致；ρ₁₂ 為相關係數不是共變異數；w₁+w₂=1，放空時權重可為負。 |
| 10 | CAPM | `E(Rᵢ) = R_f + βᵢ[E(R_m) − R_f]` | 同式（OpenStax 15.3） | 逐式一致；報酬頻率需一致，市場風險溢酬為 `E(Rm)−Rf`。 |
| 11 | Beta | `βᵢ = Cov(Rᵢ,R_m) ÷ Var(R_m)` | 同式（MIT Sample Final；OpenStax 15.3） | 逐式一致；即 Ri 對 Rm 的迴歸斜率；Cov 與 Var 同頻率。 |
| 12 | 債券價格 | `P = Σ C/(1+y)ᵗ + F/(1+y)ⁿ` | 票息年金現值＋面額現值（OpenStax 10.2） | 逐式一致；C 與 y 必須同為每期單位，n 為期數，F 為面額；無違約、無嵌入選擇權。 |
| 13 | 存續期間與凸性 | `ΔP/P ≈ −D*Δy + ½×凸性×(Δy)²；D* = D/(1+y/k)` | 同式（MIT Lecture 4） | 逐式一致；D 為 Macaulay 年數、y 為年化殖利率、k 為每年付息次數；Δy 用小數；小幅變動近似。 |
| 14 | 高登成長模型 | `P₀ = D₁ ÷ (r − g)` | 同式（OpenStax 11.2） | 逐式一致；D₁ 為下一期股利、r 為要求報酬、g 為固定成長率，且 r>g；無限到期。 |
| 15 | 賣權買權平價 | `C + K/(1+r)ᵀ = P + S₀` | 同式（MIT Recitation 5） | 逐式一致；歐式、無股利、相同 K 與到期日、無套利；美式或含股利時需調整。 |
| 16 | 期貨理論價格 | `F₀ = S₀ × e^{(r−q)T}` | 同式（FIU/Hull Ch5） | 逐式一致；連續複利，q 為契約期間平均收益率，r 為 T 年期無風險利率；不另計儲存成本與便利收益。 |
| 17 | 期貨避險契約數 | `N ≈ (β目標 − β現貨) × 現貨部位價值 ÷ 每口期貨契約價值` | 全額避險 `Hedge Ratio = β×S(0)/F(0)`（Case Western）；CSUN 以 β=1.10、N*=7.12、目標 β=0.55 示範 | 全數避險且期貨 β≈1 時，賣出契約數為 `β現貨×現貨價值÷契約價值`，與來源逐式一致；一般式為目標 β 的直接延伸；負值代表賣出期貨。 |
| 18 | 杜邦分解 | `ROE = 淨利率 × 總資產週轉率 × 權益乘數` | 同式（OpenStax 6.6） | 逐式一致；權益乘數=平均總資產÷平均權益；分子分母同期。 |
| 19 | Sharpe 比率 | `(Rₚ − R_f) ÷ σₚ` | 同式（OpenStax 15.4） | 逐式一致；σp 為總風險，Rf 取同期限；同頻率、事後評估。 |
| 20 | Treynor 比率 | `(Rₚ − R_f) ÷ βₚ` | 同式（OpenStax 15.4） | 逐式一致；βp 為系統風險，Rf 同期限；βp 不可為零。 |
| 21 | Jensen α | `Rₚ − [R_f + βₚ(R_m − R_f)]` | 同式（OpenStax 15.4） | 逐式一致；以 CAPM 為基準，α>0 為調整系統風險後的正超額報酬。 |
| 22 | 費雪方程式 | `實質利率 ≈ 名目利率 − 預期通膨率` | `1+i=(1+R)(1+h)`（OpenStax 7.4） | 精確式展開後為 `R≈i−h`；h 用小數，h 越大近似誤差越大。 |
| 23 | 期限結構遠期利率 | `(1+y_n)ⁿ = (1+y₁)(1+f₂)…(1+f_n)` | `(1+iSt)^t = (1+iF1)…(1+iFt)`（SMU Ch3） | 逐式一致；y_n 為 n 期即期年化利率、f_t 為隱含遠期利率；同複利與期間單位。 |
| 24 | 修正存續期間 | `D* = D ÷ (1 + y/k)` | 同式（MIT Lecture 4） | 逐式一致；D 為 Macaulay 年數、y 為年化殖利率、k 為每年付息次數；若 y 為每期利率，分母改 1+y。 |
| 25 | 存續期間與凸性 | `ΔP/P ≈ −D*Δy + ½×凸性×(Δy)²` | 同式（MIT Lecture 4） | 逐式一致；Δy 用小數，凸性與 y/k 同週期；忽略高階項。 |
| 26 | 債券價格（總體） | `P = Σ C/(1+y)ᵗ + F/(1+y)ⁿ` | 同式（OpenStax 10.2） | 與投資 Ch7 同式；C、y 同為每期單位，n 為期數，F 為面額。 |
| 27 | 遠期匯率 | `F ≈ S × (1+r)/(1+r*)` | `F/S = (1+r)/(1+r*)`（BIS Box A，直接報價 USD/外幣） | 移項後逐式一致；相同到期日、無交易成本、無套利；實際市場可能有基差，故網站用「≈」。 |
| 28 | 基金淨資產價值 | `NAV = (基金資產總值 − 負債) ÷ 受益權單位數` | NAV=總資產−總負債；每單位再除以流通在外單位數（SEC Investor.gov） | 逐式一致；資產按市價、負債與單位數同一評價時點；申購費與費用另計。 |
| 29 | 選擇權到期內在價值與期貨理論價 | `買權 max(S_T−K,0)；賣權 max(K−S_T,0)；F₀ = S₀e^{(r−q)T}` | 選擇權到期報酬（MIT Recitation 5；OpenStax 20.3）；期貨式同 FIU/Hull Ch5 | 選擇權兩式為到期內在價值，未扣權利金；買方損益=內在價值−權利金。期貨式與 #16 相同。OpenStax 的 payoff 已含權利金，名詞不可混用。 |

### 3.3 共同限制

- 「通過（教材）」只表示已對上公開教材或課程講義，不代表官方對本站全部內容的認證；#27、#28 的官方交叉核對也只涵蓋該條公式。
- 少數來源使用等價的離散形式或不同符號（例如 MIT 15.401 的期貨離散式、IS-LM 的 `r` 與 `i`），已在表中說明，沒有把等價式誤記為逐字相同。
- 21 張總體模型圖已另於第 5 節完成公開教材核對，全部為「通過（教材）」；這不影響本節 29 條公式的判定，也不代表官方認證整站。
- 尚未完成：諾貝爾其他屆原始論文與模型圖、會計各章例題逐題重算。這些項目仍保留「待查」，不因本次 29 條公式或 21 張模型圖通過而自動通過。
- 逐條來源連結、變數定義與網站修正備註見 `documents/content_review_checklist.md` 第二、三節；網站公式文字見 `site/assets/content-macro*.js` 與 `site/assets/content-investment.js`。

## 4. 資料來源連結檢查

- 檢查日期：2026-10-20。
- 範圍：`site/assets/content.js` 的 26 個來源首頁。
- 結果：26 個網址仍保留；以 Node `fetch` 檢查時 21 個直接回 200；其餘 5 個為站方防爬或本機連線限制（行政院主計總處、中華民國統計資訊網、國家教育研究院樂詞網、國立臺灣大學開放式課程、投信投顧公會）。以 `curl -k` 重試時，前 3 個與投信投顧公會回 200，臺大 OCW 回 403；這些不是內容連結被刪除。
- 已更新：投信投顧公會首頁由 `https://www.sitca.org.tw/` 改為 `https://www.sitca.org.tw/index_pc.aspx`（`curl` 回 200）。
- 建議：政府網站憑證鏈與站方防爬規則可能讓自動檢查失敗；網站上的外部連結仍以瀏覽器開啟為準。
- 另於本次核對取得諾貝爾 2019、2020 科學背景 PDF 與 2020 advanced information 頁面；不列入 26 個網站來源計數。

## 5. 總體經濟學 21 張模型圖（教材／官方輔助）

- 檢查日期：2026-10-20。
- 範圍：`site/assets/diagrams-macro*.js` 的 21 張章節模型圖；逐張比對曲線方向、移動方向、變數／參數、圖說與假設。
- 結果：21/21 對上公開教材或課程講義，網站判定為「通過（教材）」；B15 另以 CBC 官方外匯頁交叉核對，B12 的臺灣景氣指標以國發會頁面輔助。這不是官方對本站全部內容的認證。
- 方法：以官方公告與正式教材優先，其次為大學課程講義；跨模型回答只作輔助，不作為判定依據。

| # | 圖 | 官方／教材依據 | 核對重點 | 結果與修正 |
| --- | --- | --- | --- | --- |
| 1 | B1 兩部門循環流量（`macro-01#0`） | [OpenStax Macro 3e 1.3](https://openstax.org/books/principles-macroeconomics-3e/pages/1-3-how-economists-use-theories-and-models-to-understand-economic-issues) | 家計與廠商、要素市場、商品市場、三面法 GDP | 一致；補註 I、S 是輔助恆等式，圖未另畫金融市場。 |
| 2 | B2 簡單凱因斯 AE/45°（`macro-02#0`） | [OpenStax Macro 3e Appendix B](https://openstax.org/books/principles-macroeconomics-3e/pages/b-the-expenditure-output-model) | 45° 線、AE 均衡、自發支出上移、乘數 | 一致；AE 斜率限定為無比例稅／無進口的 MPC，一般式為 MPC(1 − t) − MPM。 |
| 3 | B3 節儉的矛盾（`macro-02#2`） | [CORE Econ 5.8](https://books.core-econ.org/the-economy/macroeconomics/05-macroeconomic-policy-08-government-austerity.html) | 自發消費下降、AE 下移、所得下降、paradox of thrift | 一致；CORE Econ 5.8 明確使用 paradox of thrift 並說明所得下降機制。 |
| 4 | B4 存款貨幣創造（`macro-05#0`） | [OpenStax Macro 3e 14.4](https://openstax.org/books/principles-macroeconomics-3e/pages/14-4-how-banks-create-money)；[Lardbucket 15.1](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s18-01-a-more-sophisticated-money-mul.html) | 原始存款、放款、次級存款、簡單與完整貨幣乘數 | 一致；完整式為 (1 + c) ÷ (rr + e + c)，簡單模型假設已保留。 |
| 5 | B5 流動性偏好（`macro-05#1`） | [Mishkin Ch. 5 流動性偏好講義](http://home.cerge-ei.cz/pstankov/teaching/VSE/Reading/Mishkin4.1.pdf)；[MIT 14.02 Lec. 4](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1sWJWc4iYESuo4fu0vAqT8aS-KuSosPpq_transcript.pdf) | Md 向下、Ms 垂直、Y↑使 Md 右移、i↑ | 一致；k、h 改標敏感度係數，並補線性式 Md/P = kY − hi。 |
| 6 | B6 IS-LM 均衡（`macro-06#0`） | [LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)；[Saylor ECON302-6.2](https://resources.saylor.org/wwwresources/archived/site/wp-content/uploads/2011/07/ECON302-6.2.pdf) | IS 向下、LM 向上、交點為同時均衡 | 一致；採傳統向上 LM 教材版本，並註明短期物價固定。 |
| 7 | B7 財政與貨幣政策移動（`macro-06#1`） | [LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model)；[Saylor ECON302-6.2](https://resources.saylor.org/wwwresources/archived/site/wp-content/uploads/2011/07/ECON302-6.2.pdf) | IS 右移使 Y↑、i↑；LM 右移使 Y↑、i↓ | 一致。 |
| 8 | B8 政策有效性（`macro-06#2`） | [Mishkin Ch. 24 PPT](https://www.ssc.wisc.edu/~mchinn/mishkin_ch24.pdf)；[LibreTexts 31.37](https://socialsci.libretexts.org/Bookshelves/Economics/Introductory_Comprehensive_Economics/Economics_-_Theory_Through_Applications/31%3A_Toolkit/31.37%3A_The_IS-LM_Model) | LM 斜率與財政／貨幣政策效果 | 一致；已修正 MPC／b 註記，圖說限定為 h 變動造成的 LM 斜率差異；若由 k 造成陡峭 LM，財政與貨幣效果可能同時變小。 |
| 9 | B9 AD-AS 均衡（`macro-07#0`） | [OpenStax Macro 3e 11.2](https://openstax.org/books/principles-macroeconomics-3e/pages/11-2-building-a-model-of-aggregate-demand-and-aggregate-supply)；[11.3](https://openstax.org/books/principles-macroeconomics-3e/pages/11-3-shifts-in-aggregate-supply) | AD 向下、SRAS 向上、LRAS 垂直、AD 右移、長期回 Yn | 一致；已補 SRAS₁ 虛線，讓長期 SRAS 左移與 E_LR 可見。 |
| 10 | B10 需求與供給衝擊（`macro-07#1`） | [OpenStax Macro 3e 11.3](https://openstax.org/books/principles-macroeconomics-3e/pages/11-3-shifts-in-aggregate-supply)；[11.2](https://openstax.org/books/principles-macroeconomics-3e/pages/11-2-building-a-model-of-aggregate-demand-and-aggregate-supply) | AD 右移、SRAS 左移、停滯性通膨 | 一致；SRAS 越平坦產出降幅越大已於前輪修正。 |
| 11 | B11 Solow 成長（`macro-08#0`） | [MIT Solow lecture notes](https://economics.mit.edu/sites/default/files/inline-files/Lecture%201-2%2C%202%20and%203%20-%20The%20Solow%20Growth%20Model.pdf) | sf(k)、(n + δ)k、穩態、儲蓄率效果 | 一致；含技術進步的損益兩平投資為 (n + δ + g)k，長期成長由技術進步決定。 |
| 12 | B12 景氣循環（`macro-08#1`） | [OpenStax Macro 3e 6.3](https://openstax.org/books/principles-macroeconomics-3e/pages/6-3-tracking-real-gdp-over-time)；[國發會景氣指標簡介](https://www.ndc.gov.tw/nc_335_2235) | 趨勢線、擴張、高峰、衰退、谷底、復甦、領先／同時／落後指標 | 一致；OpenStax 確認循環階段，國發會頁面輔助臺灣指標說明。 |
| 13 | B13 菲利浦曲線（`macro-09#2`） | [OpenStax Macro 3e 12.3](https://openstax.org/books/principles-macroeconomics-3e/pages/12-3-the-phillips-curve)；[13.2](https://openstax.org/books/principles-macroeconomics-3e/pages/13-2-the-policy-implications-of-the-neoclassical-perspective)；[MIT 14.02 Lec. 9](https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-spring-2023/1m8XRqp-AVdS64CW-PlvQDH2AYNFPQguV_transcript.pdf) | SRPC 負斜率、πᵉ↑使 SRPC 上移、LRPC 垂直 | 一致；已補註明圖只隔離預期變動，供給衝擊可能同時發生。 |
| 14 | B14 外匯供需（`macro-10#1`） | [OpenStax Macro 3e 16.2](https://openstax.org/books/principles-macroeconomics-3e/pages/16-2-demand-and-supply-shifts-in-foreign-exchange-markets) | 外匯需求向下、供給向上、供給右移使 e↓ | 一致；已補供需常同時移動的提醒。 |
| 15 | B15 央行外匯干預（`macro-10#3`） | [OpenStax Macro 3e 16.2](https://openstax.org/books/principles-macroeconomics-3e/pages/16-2-demand-and-supply-shifts-in-foreign-exchange-markets)；[CBC 外匯](https://www.cbc.gov.tw/en/np-444-2.html) | 央行買匯使需求右移、e↑；賣匯反向 | 一致；CBC 官方頁確認央行在市場失序時進場維持秩序，已補單一衝擊提醒。 |
| 16 | B16 金融體系資金流向（`macro-11#0`） | [Mishkin Ch. 2 notes](https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/mish2b.htm)；[OpenStax Finance 1.5](https://openstax.org/books/principles-finance/pages/1-5-markets-and-participants) | 直接金融、間接金融、中介功能、資金回流 | 一致。 |
| 17 | B17 可貸資金市場（`macro-12#1`） | [OpenStax Macro 3e 10.4](https://openstax.org/books/principles-macroeconomics-3e/pages/10-4-the-national-saving-and-investment-identity) | 供給與需求的組成、政府赤字、利率上升、排擠效果 | 一致；移除不當的貨幣供給，改為民間儲蓄＋國外流入，並補兩種畫法不可混用的說明。 |
| 18 | B18 利率風險結構（`macro-12#2`） | [OpenStax Finance 10.4](https://openstax.org/books/principles-finance/pages/10-4-risks-of-interest-rates-and-default)；[Lardbucket 6.1](https://2012books.lardbucket.org/books/finance-banking-and-money-v1.0/s09-the-economics-of-interest-rate.html) | 違約、流動性、租稅風險、信用價差 | 一致；已補政府公債仍有通膨、流動性與再投資風險。 |
| 19 | B19 收益率曲線（`macro-12#3`） | [OpenStax Finance 10.3](https://openstax.org/books/principles-finance/pages/10-3-using-the-yield-curve) | 正常、平坦、倒掛與衰退領先訊號 | 一致。 |
| 20 | B20 存續期間與凸性（`macro-12#4`） | [MIT 15.401 Lec. 4](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/df418b972d36cd53ae5c375b8af61e53_MIT15_401F08_lec04.pdf)；[MIT 15.415 Lec. 5](https://web.mit.edu/15.415e/www/lecture05.pdf) | 價格與殖利率反向、切線近似、凸性修正 | 一致；ΔP/P ≈ −D*Δy + ½×凸性×(Δy)² 與講義方向相符。 |
| 21 | B21 選擇權到期價值（`macro-13#6`） | [MIT 15.401 Rec. 5](https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/d0734e7fec7b333f1255a6dc3dff389c_MIT15_401F08_rec05.pdf) | 買權與賣權到期分段、履約價、權利金 | 一致；保留到期內在價值與權利金的區分。 |

### 5.1 已套用的修正

- B1：補註 I、S 為輔助恆等式，圖只畫要素市場與商品市場。
- B2：AE 斜率加註一般式 MPC(1 − t) − MPM，避免把 MPC 當成所有情況下的斜率。
- B4（前輪）：完整貨幣乘數改為 (1 + c) ÷ (rr + e + c)。
- B5：k、h 由「彈性」改為「敏感度」，並補線性貨幣需求式。
- B8：修正 MPC／b 註記；b↑使 IS 平坦但財政效果小，MPC↑使乘數與財政效果變大；圖說限定 h 變動。
- B9：補 SRAS₁ 虛線與長期調整圖說，將原 SRAS 標為 SRAS₀。
- B10（前輪）：SRAS 越平坦，供給衝擊造成產出下降越多。
- B13、B14：補註供需或衝擊可能同時移動，圖為單一效果隔離。
- B15（前輪）：移除「只能平滑短期波動」的絕對說法；本輪補 CBC 官方依據與單一衝擊提醒。
- B16：可貸資金供給改為民間儲蓄＋國外流入，移除貨幣供給；補兩種畫法不可混用的說明。
- B17：保留「政府公債（無風險）」考試慣例，補通膨、流動性與再投資風險。
- B21（前輪）：參數只留 K 與權利金，移除與到期價值無關的波動率、到期時間與期貨理論價。

### 5.2 共同限制

- 「通過（教材）」只表示已對上公開教材或課程講義，不代表官方對本站全部內容的認證。
- B6–B8 採傳統向上傾斜 LM。MIT 14.02 現行講義的 LM 接近水平，因此不以它作為向上 LM 的依據；改用 LibreTexts 31.37、Saylor ECON302-6.2 與 Mishkin Ch. 24。
- B3 的 CORE Econ 5.8 是公開教科書，不是官方公告；其對 paradox of thrift 的用語與機制與圖一致。
- B12 的國發會頁面可直接查閱；本文以 OpenStax 的循環階段與國發會領先／同時／落後指標說明交叉核對。
- B20 的 MIT 15.415 Lecture 5 PDF 為圖像式，未能抽取公式文字；以 MIT 15.401 Lecture 4 的存續期間／凸性內容與標準公式交叉核對。
- B15 的 CBC 頁面只確認央行在市場失序時進場維持秩序，不逐一證明圖中曲線斜率或干預規模。
- 精確指定的 Claude Sonnet 5.5／Gemini 4 Argon／GPT-6.1 Sol 端點仍未授權；本輪沿用同家族可存取模型，且模型回答不取代來源查證。
- 諾貝爾其他屆原始論文與模型圖、會計各章例題逐題重算仍待查，不因本節 21 張圖通過而自動通過。

## 6. 尚未完成

- 會計各章例題的逐題重算；代表性分錄與報表勾稽已於第 2.1 節檢查（A1–A12 公式已完成官方或公開教材核對）。
- 諾貝爾年表其他屆公式、結論與模型圖的原始論文核對（2019–2021、2025、2026 屆已完成官方科學背景比對；2022–2024 屆完成概念方向核對）。

## 7. 重現指令

```bash
node site/scripts/validate-content.js
for f in site/assets/*.js; do node --check "$f"; done
node site/scripts/verify-nobel-api.js
```

### 7.1 2026-10-20／21 執行結果

- `validate-content.js`：5,245 項檢查、0 失敗（2026-10-21 加入法規全文、KaTeX 公式與學派演進圖檢查）。
- `node --check site/assets/*.js`：全部通過。
- `verify-nobel-api.js`：58 屆、0 筆不一致（需網路）。
- 諾貝爾 2019–2026 代表原始論文書目：8 屆逐筆核對作者、篇名、期刊、卷期與頁碼；2021 官方 PDF 誤植為 61:467–476，已依期刊書目更正為 62(2):467–475。另抽查 2019–2026 每年至少一篇代表論文全文（Banerjee 2015、Milgrom & Weber 1982、Imbens & Angrist 1994、Diamond & Dybvig 1983、Goldin 2006／2014、Acemoglu et al. 2001、Aghion & Howitt 1992、Hall 1978），網站已補 Hall 趨勢項、Aghion 創新到達率與 Goldin 後續用語；其餘全文仍未逐條核對。
- 瀏覽器 QA（Chrome CDP，12 個頁面狀態）：1280px 與 390px 測 macro-05／06／07／12、`#/sources`、`#/models/macro`、`#/nobel`；B5、B8、B16、B17 的修正文字已顯示；B9 的 `SRAS₀`／`SRAS₁` 在章節頁、模型總覽與 `file://` 均可見，390px 需在圖表區水平滑動，滑動後兩個標籤可讀；來源頁 26 項且核對進度含 21 張模型圖；模型總覽 38 張 SVG（21 張章節圖＋17 組諾貝爾圖），諾貝爾頁 58 列／58 張 SVG；390px 無水平溢出，console errors 為 0。
- `file://` QA：macro-07 可讀，B9 的兩個 SRAS 標籤正常，頁面無水平溢出。
- 會計 QA（Chrome CDP，9 個 `file://` 頁面狀態）：1280px／390px 測 accounting-02／06／07／13／20／23 與 `#/sources`；存貨跨期、股票股利、公司債有效利率、現金流量勾稽、EPS／保留盈餘簡化條件與來源頁公告皆顯示；0 缺失、0 水平溢出、0 console errors。
- 會計進階重算：租賃負債 272,324.80／使用權資產 287,324.80、收入分攤 60,000／40,000、當期稅 16,000＋DTL 4,000、商譽 60、OCF 44／NPV 66.79；借貸平衡與報表連結一致。
- 諾貝爾文字 QA：1280px／390px 檢查 2026「無趨勢簡化」、2025「創新到達率」、2023「後續綜合用語」、2022「Bernanke 的實證研究」、2019「效果不如原先預期」均顯示；58 張 SVG；0 水平溢出、0 console errors。
- 投資學比例公式 QA：1280px／390px 測 `#/subject/investment`、`#/chapter/investment-14`、`#/chapter/investment-17` 與 `#/chapter/investment-04`；32 條、9 類；investment-14 26 條、investment-17 6 條；風險調整績效順序為夏普→索提諾→崔納→詹森→資訊；32 個 `.ratio-math`、29 個 LaTeX 分數，無殘留 `\frac`、`\text` 或大括號；0 缺失、0 水平溢出、0 console errors；390px 改為卡片堆疊；在記憶體修改 Sharpe 公式後，投資學頁、第 17 章與第 4 章同步顯示。
- 投資學選擇權評價優先順序 QA：1280px／390px 測 `#/subject/investment`；5 列、5 張卡片、13 條 KaTeX 公式（4 條分數）、36 項變數定義，優先順序為買賣權到期損益→二項式→Black-Scholes→買賣權平價→三項式／蒙地卡羅／Heston；0 缺失、0 水平溢出、0 console errors。
- 證券法規與測驗範圍補充 QA：首頁 1280px／390px 顯示 4 張科目卡；`#/subject/law` 顯示 21 章、21 節；`law-01`–`law-21` 共 21 頁全部正常；macro-08 景氣訊號燈、investment-07 利率期限結構、investment-08 交易制度、investment-16 客戶風險態度與稅負、accounting-19 外匯風險等補充單元均顯示；0 水平溢出、0 console errors。
- 證券法規全文 QA（2026-10-21）：全國法規資料庫 Open API（2026-10-08 資料）匯入 15 部官方法規、1,507 條；14 頁顯示官方逐條全文，7 頁顯示自律規範或主管機關連結與摘要。`law-01` 有 244 條（證券交易法 229＋施行細則 15）、`law-02` 有 534 條；21 頁的 `.law-fulltext` 全部存在；條文直接顯示、無需點擊；`law-14`–`law-18`、`law-20` 與 `law-21` 的連結與摘要正常；1280px／390px 無水平溢出、0 console errors。
- KaTeX 公式 QA（2026-10-21）：全站 115 個含公式的學習單元改用 `window.FORMULA_TEX`；KaTeX 0.19.0 以本地 JS、CSS 與字型隨站附帶。47 個含公式章節在 1280px／390px 共 94 次頁面檢查：115 個 `.formula-katex` 全部渲染，0 個 `.katex-error`、0 個 fallback、0 水平溢出、0 console errors；比例分析 32 條、選擇權 13 條、諾貝爾 58 屆公式均正常；`file://` 下 `KaTeX_Main` 字型載入成功。

## 8. 相關文件

- `site/SOURCES.md`
- `documents/content_review_checklist.md`
- `site/README.md`
