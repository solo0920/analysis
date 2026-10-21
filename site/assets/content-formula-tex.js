/* 公式資料 — KaTeX 語法
   鍵值為「章節 ID::節名」，由 app.js 的 formulaTexFor() 讀取。
   每筆 formula 以 KaTeX/LaTeX 撰寫；note 保留原公式中的假設或說明。 */

window.FORMULA_TEX = {
  "macro-01::第1節 國民所得與GDP": { tex: String.raw`GDP = C + I + G + (X - M)`, note: "" },
  "macro-01::第2節 GDP之計算": { tex: String.raw`GDP = C + I + G + X - M`, note: "" },
  "macro-01::第3節 其他國民所得衡量工具": { tex: String.raw`DI = PI - \text{個人直接稅}`, note: "" },
  "macro-01::第4節 物價指數與經濟成長率": { tex: String.raw`\text{實質 GDP} = \frac{\text{名目 GDP}}{\text{GDP 平減指數}/100}`, note: "" },

  "macro-02::第1節 均衡所得之決定": { tex: String.raw`Y = \frac{1}{1-MPC} \times A_0`, note: "A₀ 為自發性支出；封閉、無稅、無進口、物價固定的簡單模型。" },
  "macro-02::第2節 政府收支與反景氣循環之財政政策": { tex: String.raw`\begin{gathered}\text{政府支出乘數} = \frac{1}{1-MPC}\\\text{定額稅租稅乘數} = -\frac{MPC}{1-MPC}\end{gathered}`, note: "" },

  "macro-03::第2節 貨幣供給定義與貨幣數量": { tex: String.raw`M2 = M1B + \text{準貨幣}`, note: "" },
  "macro-04::第2節 銀行業之業務與經營": { tex: String.raw`\text{利差} \approx \text{放款利率} - \text{存款利率}`, note: "" },
  "macro-05::第1節 存款貨幣的創造與貨幣供給": { tex: String.raw`M = m \times B,\qquad m = \frac{1}{rr}`, note: "無超額準備、無現金流失；B 為準備貨幣。" },
  "macro-05::第2節 貨幣需求理論": { tex: String.raw`MV = PY`, note: "" },

  "macro-06::第1節 IS曲線與LM曲線": { tex: String.raw`\begin{gathered}IS:\quad Y = C(Y-T)+I(i)+G\\LM:\quad \frac{M}{P}=L(Y,i)\end{gathered}`, note: "封閉經濟、物價固定；i 為利率。" },
  "macro-06::第2節 總體經濟政策與IS-LM曲線": { tex: String.raw`\begin{gathered}\text{擴張財政：}IS \to \text{右}\\\text{擴張貨幣：}LM \to \text{右}\end{gathered}`, note: "" },
  "macro-06::第3節 IS-LM模型與總體經濟政策有效性": { tex: String.raw`\text{流動性陷阱：}LM \text{ 近乎水平}`, note: "貨幣政策效果有限。" },

  "macro-07::第1節 總供需曲線": { tex: String.raw`\begin{gathered}AD:\quad Y=C+I+G+NX\\LRAS:\quad Y=Y^*\end{gathered}`, note: "" },
  "macro-07::第2節 總供需均衡分析": { tex: String.raw`\text{產出缺口} = \frac{\text{實際產出}-\text{潛在產出}}{\text{潛在產出}} \times 100\%`, note: "" },
  "macro-08::第1節 經濟成長理論": { tex: String.raw`Y = A \times F(K,L)`, note: "" },

  "macro-09::第1節 勞動市場與失業": { tex: String.raw`\text{失業率} = \frac{\text{失業人口}}{\text{勞動力}} \times 100\%`, note: "" },
  "macro-09::第2節 通貨膨脹": { tex: String.raw`\text{實質利率} \approx \text{名目利率} - \text{通膨率}`, note: "事後實現；事前決策以預期通膨率取代。" },
  "macro-09::第3節 菲利浦曲線": { tex: String.raw`\pi = \pi^e - \beta(u-u_n)+\epsilon`, note: "" },

  "macro-10::第1節 外匯與匯率": { tex: String.raw`\text{實質匯率} = \frac{\text{名目匯率} \times P^*}{P}`, note: "" },
  "macro-10::第2節 匯率之決定": { tex: String.raw`i - i^* \approx \text{預期貶值率}`, note: "利率平價。" },
  "macro-10::第3節 國際收支帳": { tex: String.raw`\text{經常帳}+\text{資本帳}+\text{金融帳}+\text{誤差}=0`, note: "" },
  "macro-10::第4節 匯率制度與央行外匯干預政策": { tex: String.raw`\begin{gathered}\text{不可能三角：固定匯率、資本自由移動、獨立貨幣政策，}\\ \text{最多只能同時達成兩項}\end{gathered}`, note: "" },
  "macro-10::第5節 開放經濟之國民所得": { tex: String.raw`\text{開放經濟乘數} = \frac{1}{1-MPC+MPM}`, note: "實質匯率正規化為 1、無稅的簡化式；MPM 為邊際進口傾向。" },

  "macro-11::第1節 金融體系": { tex: String.raw`\text{資金剩餘單位} \to \text{金融市場／金融中介} \to \text{資金不足單位}`, note: "" },
  "macro-12::第1節 利率基本概念與利率類型": { tex: String.raw`\begin{gathered}\text{實質利率} \approx \text{名目利率} - \text{預期通膨率}\\1+\text{名目利率}=(1+\text{實質利率})(1+\text{預期通膨率})\end{gathered}`, note: "" },
  "macro-12::第2節 利率決定理論": { tex: String.raw`\text{可貸資金供給} = \text{可貸資金需求}`, note: "" },
  "macro-12::第3節 利率之風險結構": { tex: String.raw`\text{債券殖利率} \approx \text{無風險利率}+\text{違約風險溢酬}+\text{流動性溢酬}+\text{其他溢酬}`, note: "" },
  "macro-12::第4節 利率之期限結構理論": { tex: String.raw`(1+y_n)^n = (1+y_1)(1+f_2)\cdots(1+f_n)`, note: "y_n 為 n 期即期年化利率；f_t 為第 t 期一年期隱含遠期利率；相同複利與期間單位，無套利。" },
  "macro-12::第5節 利率風險管理": { tex: String.raw`\begin{gathered}D^* = \frac{D}{1+y/k}\\\text{價格變動率} \approx -D^*\Delta y + \frac{1}{2}\times\text{凸性}\times(\Delta y)^2\end{gathered}`, note: "D 為 Macaulay 存續期間（年）、y 為年化殖利率、k 為每年付息次數；Δy 與凸性採相同週期，Δy 用小數。" },

  "macro-13::第3節 債券市場": { tex: String.raw`P = \sum_{t=1}^{n}\frac{C}{(1+y)^t}+\frac{F}{(1+y)^n}`, note: "C 每期票息、F 面額、y 每期殖利率、n 期數。" },
  "macro-13::第4節 股票市場": { tex: String.raw`P_0 = \frac{D_1}{r-g}`, note: "D₁ 為下一期股利；r > g；股利固定成長。" },
  "macro-13::第5節 外匯市場": { tex: String.raw`\text{遠期匯率} \approx \text{即期匯率}\times\frac{1+\text{本國利率}}{1+\text{外國利率}}`, note: "直接報價、相同到期日、無交易成本、無套利的利率平價近似。" },
  "macro-13::第6節 共同基金": { tex: String.raw`NAV = \frac{\text{基金資產總值}-\text{負債}}{\text{受益權單位數}}`, note: "資產與負債按同一評價時點的市價計算。" },
  "macro-13::第7節 衍生性金融商品": { tex: String.raw`\begin{gathered}\text{買權到期內在價值}=\max(S_T-K,0)\\\text{賣權到期內在價值}=\max(K-S_T,0)\\F_0=S_0 e^{(r-q)T}\end{gathered}`, note: "未扣權利金；期貨理論價採連續複利；r 為無風險利率（持有成本）、q 為契約期間平均收益率（連續複利）。" },

  "investment-01::學習重點 1：金融體系與資金流動": { tex: String.raw`\text{資金剩餘單位} \to \text{金融市場／金融中介} \to \text{資金不足單位}`, note: "" },
  "investment-03::學習重點 1：報酬率的衡量": { tex: String.raw`HPR = \frac{P_1-P_0+D_1}{P_0}`, note: "D₁ 為期間現金收益；未計稅費。" },
  "investment-03::學習重點 2：風險的種類與衡量": { tex: String.raw`\sigma^2 = \sum p_i [R_i-E(R)]^2`, note: "" },
  "investment-03::學習重點 3：風險溢酬與風險趨避": { tex: String.raw`\text{風險溢酬} = \text{預期報酬} - \text{無風險利率}`, note: "" },
  "investment-04::學習重點 1：分散投資與投資組合報酬": { tex: String.raw`\begin{gathered}E(R_p)=w_1E(R_1)+w_2E(R_2)\\\sigma_p^2=w_1^2\sigma_1^2+w_2^2\sigma_2^2+2w_1w_2\rho_{12}\sigma_1\sigma_2\end{gathered}`, note: "" },

  "investment-05::學習重點 1：CAPM 的假設與市場投資組合": { tex: String.raw`E(R_i)=R_f+\beta_i[E(R_m)-R_f]`, note: "" },
  "investment-05::學習重點 2：證券市場線與必要報酬率": { tex: String.raw`\begin{gathered}\beta_i=\frac{\operatorname{Cov}(R_i,R_m)}{\operatorname{Var}(R_m)}\\\alpha=\text{實際報酬}-\text{CAPM 必要報酬}\end{gathered}`, note: "" },

  "investment-07::學習重點 1：債券價格與現金流": { tex: String.raw`P = \sum_{t=1}^{n}\frac{C}{(1+y)^t}+\frac{F}{(1+y)^n}`, note: "C 為每期票息、F 為面額、y 為每期殖利率、n 為期數。" },
  "investment-07::學習重點 2：債券收益率衡量": { tex: String.raw`\text{當期收益率}=\frac{\text{每年票面利息}}{\text{目前價格}}`, note: "" },
  "investment-07::學習重點 3：存續期間與利率風險": { tex: String.raw`\begin{gathered}\text{價格變動率}\approx -D^*\Delta y+\frac{1}{2}\times\text{凸性}\times(\Delta y)^2\\D^*=\frac{D}{1+y/k}\end{gathered}`, note: "D 為 Macaulay 存續期間（年）、y 為年化殖利率、k 為每年付息次數；Δy 與凸性採相同週期，Δy 用小數，1 個百分點 = 0.01。" },
  "investment-07::學習重點 4：利率期限結構": { tex: String.raw`(1+y_n)^n=(1+y_1)(1+f_2)\cdots(1+f_n)`, note: "y_n 為 n 期即期利率、f_t 為隱含遠期利率；無套利、相同複利單位。" },

  "investment-08::學習重點 2：股票評價": { tex: String.raw`P_0 = \frac{D_1}{r-g}`, note: "D₁ 為下一期股利；r > g；股利固定成長。" },
  "investment-08::學習重點 3：股票報酬與風險": { tex: String.raw`\text{股票報酬率}=\text{股利收益率}+\text{資本利得率}`, note: "" },
  "investment-09::學習重點 2：到期價值與損益": { tex: String.raw`\begin{gathered}\text{買權到期內在價值}=\max(S_T-K,0)\\\text{賣權到期內在價值}=\max(K-S_T,0)\end{gathered}`, note: "未扣權利金；損益 = 到期內在價值 − 權利金。" },
  "investment-09::學習重點 3：選擇權評價與策略": { tex: String.raw`C+\frac{K}{(1+r)^T}=P+S_0`, note: "歐式、無股利、相同 K 與到期日、無套利。" },

  "investment-10::學習重點 2：期貨價格與基差": { tex: String.raw`F_0=S_0 e^{(r-q)T}`, note: "連續複利；r 為無風險利率（持有成本）；q 為契約期間平均收益率（連續複利）；不另計儲存成本與便利收益。" },
  "investment-10::學習重點 3：避險與交易策略": { tex: String.raw`\text{避險契約數}\approx \frac{(\beta_{\text{目標}}-\beta_{\text{現貨}})\times\text{現貨部位價值}}{\text{每口期貨契約價值}}`, note: "負值代表賣出期貨；全數避險至 β目標 = 0、期貨 β ≈ 1 時，賣出契約數為 β現貨 × 現貨部位價值 ÷ 每口期貨契約價值。" },
  "investment-11::學習重點 1：交換契約": { tex: String.raw`\text{利率交換淨現金流}\approx(\text{浮動利率}-\text{固定利率})\times\text{名目本金}`, note: "" },

  "investment-14::學習重點 3：杜邦分析與盈餘品質": { tex: String.raw`ROE=\text{淨利率}\times\text{總資產週轉率}\times\text{權益乘數}`, note: "" },
  "investment-15::學習重點 2：常用技術指標": { tex: String.raw`\begin{gathered}MA_n=\frac{P_t+P_{t-1}+\cdots+P_{t-n+1}}{n}\\RSI=100-\frac{100}{1+RS},\quad RS=\frac{\text{平均漲幅}}{\text{平均跌幅}}\end{gathered}`, note: "" },
  "investment-17::學習重點 1：報酬率與績效衡量": { tex: String.raw`\text{超額報酬}=\text{投資組合報酬}-\text{基準報酬}`, note: "" },

  "accounting-01::第1節 現金與約當現金": { tex: String.raw`\text{約當現金}: \text{到期日} \le 3 \text{ 個月}`, note: "自取得日起算，且價值變動風險很小。" },
  "accounting-01::第2節 零用金制度": { tex: String.raw`\text{零用金基金定額}=\text{未撥補單據}+\text{現金盤點數}+\text{現金短溢}`, note: "" },
  "accounting-01::第3節 銀行往來調節表（銀行存款調節表）": { tex: String.raw`\begin{gathered}\text{銀行對帳單餘額}+\text{在途存款}-\text{未兌現支票}\pm\text{銀行錯誤}\\=\text{帳面餘額}+\text{銀行代收}-\text{手續費}-\text{退票}\pm\text{帳面錯誤}\end{gathered}`, note: "" },
  "accounting-01::第4節 應收帳款之取得與持有": { tex: String.raw`\text{應收帳款淨額}=\text{應收帳款總額}-\text{備抵損失}`, note: "" },
  "accounting-01::第5節 應收帳款之處分": { tex: String.raw`\text{融資撥款}=\text{應收帳款總額}-\text{手續費}-\text{貼現息}-\text{保留款}`, note: "" },
  "accounting-01::第6節 應收票據": { tex: String.raw`\begin{gathered}\text{到期值}=\text{面額}\times(1+\text{票面利率}\times\text{期間})\\\text{貼現息}=\text{到期值}\times\text{貼現率}\times\text{貼現期間}\end{gathered}`, note: "" },

  "accounting-02::第1節 存貨之定義與存貨盤存制度": { tex: String.raw`\text{期末存貨}=\text{期初存貨}+\text{進貨淨額}-\text{銷貨成本}`, note: "定期盤存制。" },
  "accounting-02::第2節 存貨成本認定及數量認定": { tex: String.raw`\text{存貨成本}=\text{買價}+\text{進口關稅}+\text{運費}+\text{保險}+\text{直接可歸屬成本}-\text{折扣}`, note: "" },
  "accounting-02::第3節 存貨成本評價": { tex: String.raw`\begin{gathered}NRV=\text{估計售價}-\text{完成至可銷售狀態成本}-\text{銷售費用}\\\text{期末存貨}=\min(\text{成本},NRV)\end{gathered}`, note: "" },
  "accounting-02::第4節 存貨成本估計方法": { tex: String.raw`\begin{gathered}\text{期末存貨}=\text{可供銷售商品成本}-\text{銷貨淨額}\times(1-\text{銷貨毛利率})\\\text{零售價法成本比率}=\frac{\text{可供銷售商品成本}}{\text{可供銷售商品零售價}}\end{gathered}`, note: "" },
  "accounting-02::第5節 存貨錯誤的影響": { tex: String.raw`\begin{gathered}\text{期末存貨高估}\to\text{本期銷貨成本低估}\to\text{本期淨利高估}\\\text{下期期初存貨高估}\to\text{下期淨利低估}\to\text{下期期末保留盈餘回復}\end{gathered}`, note: "若無其他錯誤。" },

  "accounting-03::第1節 不動產、廠房及設備之取得": { tex: String.raw`\text{成本}=\text{購買價格}+\text{直接可歸屬成本}+\text{除役成本現值}-\text{折扣}`, note: "" },
  "accounting-03::第2節 不動產、廠房及設備之持有": { tex: String.raw`\begin{gathered}\text{直線法折舊}=\frac{\text{成本}-\text{殘值}}{\text{耐用年限}}\\\text{減損損失}=\text{帳面金額}-\text{可回收金額}\end{gathered}`, note: "" },
  "accounting-03::第3節 不動產、廠房及設備之處分": { tex: String.raw`\text{處分損益}=\text{處分價款}-\text{處分日帳面金額}`, note: "" },
  "accounting-03::第4節 投資性不動產": { tex: String.raw`\text{公允價值變動損益}=\text{期末公允價值}-\text{期初帳面金額}`, note: "公允價值模式。" },
  "accounting-03::第5節 生物資產": { tex: String.raw`\text{公允價值減出售成本}=\text{公允價值}-\text{出售成本}`, note: "" },
  "accounting-03::第6節 無形資產": { tex: String.raw`\text{攤銷額}=\frac{\text{成本}-\text{殘值}}{\text{耐用年限}}`, note: "" },

  "accounting-04::第1節 投資之分類": { tex: String.raw`SPPI:\quad \text{合約現金流量}=\text{本金}+\text{本金餘額}\times\text{約定利率之利息}`, note: "" },
  "accounting-04::第2節 透過損益按公允價值衡量金融資產（FVTPL）": { tex: String.raw`\text{處分損益}=\text{處分價款}-\text{處分日公允價值}`, note: "" },
  "accounting-04::第3節 透過其他綜合損益按公允價值衡量金融資產（FVOCI）": { tex: String.raw`\begin{gathered}\text{債務工具處分：累計其他綜合損益轉入當期損益}\\\text{權益工具處分：累計其他綜合損益轉入保留盈餘}\end{gathered}`, note: "" },
  "accounting-04::第4節 按攤銷後成本衡量之債券投資": { tex: String.raw`\text{利息收入}=\text{期初總帳面金額}\times\text{有效利率}`, note: "信用減損資產改用攤銷後成本。" },
  "accounting-04::第5節 金融資產之減損及重分類": { tex: String.raw`ECL=\text{違約機率}\times\text{違約損失率}\times\text{違約暴險額}`, note: "" },

  "accounting-05::第1節 確定之流動負債": { tex: String.raw`\text{流動負債}`, note: "預期於報導期間後十二個月內清償，或主要為交易目的持有。" },
  "accounting-05::第2節 負債準備與或有負債": { tex: String.raw`\text{負債準備}=\text{最佳估計清償金額}`, note: "必要時折現。" },
  "accounting-06::第1節 公司債之發行與持有": { tex: String.raw`\begin{gathered}\text{發行價格}=\sum\frac{\text{票面利息}}{(1+\text{市場利率})^t}+\frac{\text{面額}}{(1+\text{市場利率})^n}\\\text{利息費用}=\text{期初帳面金額}\times\text{有效利率}\end{gathered}`, note: "市場利率調整發行成本後。" },
  "accounting-06::第2節 公司債債務之解除": { tex: String.raw`\text{清償損益}=\text{帳面金額}-\text{支付對價}`, note: "" },
  "accounting-06::第3節 其他長期負債之會計處理": { tex: String.raw`\text{租賃負債}=\text{租賃給付現值}`, note: "以租賃隱含利率或增額借款利率折現。" },

  "accounting-07::第1節 股東權益組成": { tex: String.raw`\text{權益}=\text{股本}+\text{資本公積}+\text{保留盈餘}+\text{其他權益}-\text{庫藏股}`, note: "" },
  "accounting-07::第2節 股份發行程序及會計處理": { tex: String.raw`\text{流通在外股數}=\text{已發行股數}-\text{庫藏股數}`, note: "" },
  "accounting-07::第3節 庫藏股票之會計處理": { tex: String.raw`\text{再發行差額先沖資本公積—庫藏股交易，不足再沖保留盈餘}`, note: "" },
  "accounting-07::第4節 保留盈餘與股利發放": { tex: String.raw`\text{每股股利}=\frac{\text{分配給普通股之股利}}{\text{流通在外普通股股數}}`, note: "" },

  "accounting-08::學習重點 1：五步法與合約辨認": { tex: String.raw`\text{交易價格}=\text{固定對價}+\text{變動對價估計（限制後）}-\text{應付客戶對價}`, note: "" },
  "accounting-08::學習重點 2：履約義務與收入認列": { tex: String.raw`\text{分攤交易價格}=\frac{\text{該履約義務單獨售價}}{\text{全部履約義務單獨售價}}\times\text{交易價格}`, note: "" },
  "accounting-09::學習重點 1：承租人會計": { tex: String.raw`\text{使用權資產}=\text{租賃負債}+\text{預付租賃款}-\text{租賃誘因}+\text{初始直接成本}+\text{復原成本估計}`, note: "" },
  "accounting-09::學習重點 2：出租人會計": { tex: String.raw`\text{租賃投資淨額}=\text{租賃給付現值}+\text{未保證殘值現值}`, note: "" },
  "accounting-10::學習重點 1：暫時性差異與課稅基礎": { tex: String.raw`\text{當期所得稅}=\text{課稅所得}\times\text{適用稅率}`, note: "" },
  "accounting-10::學習重點 2：遞延所得稅與表達": { tex: String.raw`\begin{gathered}\text{遞延所得稅}=\text{暫時性差異}\times\text{預期適用稅率}\\\text{所得稅費用}=\text{當期所得稅}+\text{遞延所得稅費用}\end{gathered}`, note: "" },

  "accounting-11::學習重點 1：員工福利與退休金": { tex: String.raw`\text{淨確定給付負債}=\text{確定給付義務現值}-\text{計畫資產公允價值}`, note: "" },
  "accounting-11::學習重點 2：股份基礎給付": { tex: String.raw`\begin{gathered}\text{累計酬勞成本}=\text{授予日公允價值}\times\text{估計最終既得數量}\times\text{既得期間比例}\\\text{本期成本}=\text{累計數}-\text{前期已認列}\end{gathered}`, note: "" },
  "accounting-12::第1節 會計政策變動與會計估計變動": { tex: String.raw`\text{政策變動累積影響數調整最早比較期間期初保留盈餘（稅後）}`, note: "" },
  "accounting-12::第2節 會計錯誤更正": { tex: String.raw`\text{更正分錄：調整期初保留盈餘及受影響資產負債科目（稅後）}`, note: "" },
  "accounting-13::第1節 現金流量表基本概念及組成": { tex: String.raw`\text{現金淨變動}=\text{營業活動現金流量}+\text{投資活動現金流量}+\text{籌資活動現金流量}`, note: "" },
  "accounting-13::第2節 現金流量表之編製": { tex: String.raw`\text{營業活動現金流量}=\text{淨利}+\text{非現金費用}-\text{非營業利益}+\text{非營業損失}\pm\text{營運資金變動}`, note: "" },

  "accounting-14::第1節 財務報表與一般公認會計原則": { tex: String.raw`\text{資產}=\text{負債}+\text{權益}`, note: "" },
  "accounting-15::第1節 財務報表分析之基本觀念及方法": { tex: String.raw`\text{共同比}=\frac{\text{各項目}}{\text{基準項目}}\times 100\%`, note: "" },
  "accounting-15::第2節 比率分析": { tex: String.raw`\begin{gathered}ROE=\text{淨利率}\times\text{總資產週轉率}\times\text{權益乘數}\\\text{權益乘數}=\frac{\text{總資產}}{\text{股東權益}}\end{gathered}`, note: "" },

  "accounting-16::學習重點 1：銷售百分比法與外部融資需求": { tex: String.raw`\text{外部融資需求}=\text{預估資產增加}-\text{自發性負債增加}-\text{保留盈餘增加}`, note: "" },
  "accounting-16::學習重點 2：預測報表與情境分析": { tex: String.raw`\text{保留盈餘增加}=\text{預估淨利}\times(1-\text{股利支付率})`, note: "" },
  "accounting-17::學習重點 1：控制與合併範圍": { tex: String.raw`\text{控制}=\text{對被投資者之權力}+\text{暴露於變動報酬}+\text{運用權力影響報酬}`, note: "" },
  "accounting-17::學習重點 2：合併程序與非控制權益": { tex: String.raw`\text{合併商譽}=\text{移轉對價}+\text{非控制權益}+\text{先前持有權益公允價值}-\text{可辨認淨資產公允價值}`, note: "" },
  "accounting-18::學習重點 1：舞弊型態與成因": { tex: String.raw`\text{舞弊風險}\approx\text{誘因或壓力}+\text{機會}+\text{合理化}`, note: "" },

  "accounting-19::學習重點 1：財務管理目標與代理問題": { tex: String.raw`\text{公司價值}=\text{未來自由現金流量現值}`, note: "" },
  "accounting-19::學習重點 2：貨幣時間價值與風險報酬": { tex: String.raw`\begin{gathered}PV=\frac{FV}{(1+r)^n}\\\text{永續年金 }PV=\frac{C}{r}\end{gathered}`, note: "" },
  "accounting-20::第1節 資本結構": { tex: String.raw`EPS=\frac{(\text{EBIT}-\text{利息})\times(1-\text{稅率})}{\text{流通在外股數}}`, note: "簡化式：無特別股、股數不變。" },
  "accounting-20::第2節 資金成本": { tex: String.raw`WACC=W_d r_d(1-T)+W_e r_e`, note: "無特別股版本。" },
  "accounting-21::學習重點 1：投資方案評估方法": { tex: String.raw`NPV=-CF_0+\sum_{t=1}^{n}\frac{CF_t}{(1+r)^t}`, note: "" },
  "accounting-21::學習重點 2：現金流估計與風險": { tex: String.raw`\text{營業現金流}=(\text{收入}-\text{現金費用})(1-T)+\text{折舊}\times T`, note: "" },
  "accounting-23::學習重點 1：每股盈餘與稀釋效果": { tex: String.raw`\text{基本 EPS}=\frac{\text{淨利}-\text{特別股股利}}{\text{加權平均流通在外普通股股數}}`, note: "" },
  "accounting-23::學習重點 2：跨報表整合與考前檢查": { tex: String.raw`\text{期末保留盈餘}=\text{期初保留盈餘}+\text{本期淨利}-\text{股利}`, note: "簡化式；前期損益調整、股票股利等另調整。" }
};
