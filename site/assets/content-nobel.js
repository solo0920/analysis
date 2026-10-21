/* 歷年諾貝爾經濟學獎 — 年表與模型圖組資料
   來源：使用者提供之《諾貝爾經濟學獎歷年學說》；表格主體保留，2019–2020 公式與學說方向已對照官方科學背景、2025 公式已依官方科學背景修正、2026 公式與學說已對照官方資料；2019–2026 每年至少一篇代表論文完成全文抽查（2026 為 Hall 1978；Woodford 2003 專書未逐條）。
   此檔需在 app.js 之前載入，且與 diagrams-nobel.js 共用圖組 ID。 */

window.NOBEL_DATA = {
  "meta": {
    "title": "歷年諾貝爾經濟學獎",
    "english": "Nobel Prize in Economic Sciences",
    "period": "1969–2026",
    "sourceNote": "表格依使用者提供之《諾貝爾經濟學獎歷年學說》整理；2025 屆公式已依官方科學背景修正；2019 屆 RCT／平均因果效果、2020 屆共同價值／勝者魔咒、2021 LATE 公式與 2022–2024 學說方向亦已對照官方科學背景（2019、2020 網站公式為概念式）；58 屆年份與得主已於 2026-10-20 對照諾貝爾獎官方 API，結果 0 筆不一致。2026 屆官方獎項說明為 Robert E. Hall 與 Michael Woodford「for microeconomic foundations of macroeconomic stabilisation」；其公式與學說概念已對照官方 popular information 與 2026 年科學背景（Hall 隨機漫步、Woodford 三方程式模型與新凱因斯菲利浦曲線；前瞻指引、可信度與透明度亦有官方依據）；2019–2026 每年至少一篇代表論文已完成全文抽查（2026 為 Hall 1978；Woodford 2003 專書未逐條），其餘屆未逐條對照原始論文。",
    "officialUrl": "https://www.nobelprize.org/prizes/economic-sciences/"
  },
  "groups": [
    {
      "id": "nobel-01",
      "title": "動態總體計量與政策模擬",
      "description": "以時間序列、聯立方程與衝擊反應描述景氣波動，並模擬政策效果的動態傳導。"
    },
    {
      "id": "nobel-02",
      "title": "一般均衡與福利經濟",
      "description": "從個人偏好、市場清算與福利條件推導一般均衡，討論效率與分配。"
    },
    {
      "id": "nobel-03",
      "title": "投入產出與國民會計",
      "description": "以產業間流量與國民帳戶衡量整體經濟結構，建立可比較的總體資料基礎。"
    },
    {
      "id": "nobel-04",
      "title": "貨幣、自然利率與預期",
      "description": "貨幣供給、自然利率、預期形成與菲利浦曲線的長短期關係。"
    },
    {
      "id": "nobel-05",
      "title": "線性規劃與影子價格",
      "description": "在資源限制下求最適配置，並以影子價格衡量稀缺資源的邊際價值。"
    },
    {
      "id": "nobel-06",
      "title": "國際貿易與開放經濟",
      "description": "要素稟賦、規模經濟、資本流動與匯率制度如何塑造貿易與總體政策。"
    },
    {
      "id": "nobel-07",
      "title": "成長、創新與氣候",
      "description": "技術進步、創造性破壞、所得分配與氣候外部性如何影響長期成長。"
    },
    {
      "id": "nobel-08",
      "title": "資產組合、Q 與資產定價",
      "description": "風險分散、系統性風險、Tobin Q、衍生性商品定價與資產價格的可預測性。"
    },
    {
      "id": "nobel-09",
      "title": "資訊不對稱、契約與機制設計",
      "description": "隱藏資訊、誘因相容、契約與拍賣制度如何處理逆向選擇與道德風險。"
    },
    {
      "id": "nobel-10",
      "title": "賽局、配對與市場設計",
      "description": "策略互動、重複賽局合作、穩定配對與沒有價格市場的配置機制。"
    },
    {
      "id": "nobel-11",
      "title": "行為經濟學與有限理性",
      "description": "有限理性、損失趨避、心理帳戶與推力如何改變標準理性選擇的預測。"
    },
    {
      "id": "nobel-12",
      "title": "勞動、發展與性別",
      "description": "勞動轉移、搜尋摩擦與女性勞動參與的長期變化。"
    },
    {
      "id": "nobel-13",
      "title": "銀行、流動性與金融危機",
      "description": "銀行的流動性轉換、擠兌風險與金融危機對實體經濟的傳染。"
    },
    {
      "id": "nobel-14",
      "title": "因果推論、計量與實驗",
      "description": "選擇偏誤、隨機對照試驗、自然實驗與政策效果的因果辨識。"
    },
    {
      "id": "nobel-15",
      "title": "制度、公共選擇與管制",
      "description": "制度、利益團體、公共選擇與管制如何影響長期繁榮與資源配置。"
    },
    {
      "id": "nobel-16",
      "title": "生命週期、消費與福利",
      "description": "消費平滑、生命週期儲蓄、需求系統與福利／可行能力的衡量。"
    },
    {
      "id": "nobel-17",
      "title": "新凱因斯穩定政策與消費隨機漫步",
      "description": "Hall 的消費隨機漫步與 Woodford 的新凱因斯動態模型，連結預期、價格僵固與穩定政策。"
    }
  ],
  "rows": [
    {
      "year": 1969,
      "laureates": "Ragnar Frisch, Jan Tinbergen",
      "field": "動態經濟模型與計量經濟學",
      "formula": "$Y_t = f(Y_{t-1}, X_t, \\epsilon_t)$",
      "conclusion": "將數學與統計方法導入經濟學，建立巨觀衝擊與景氣循環之定量分析基礎。",
      "group": "nobel-01"
    },
    {
      "year": 1970,
      "laureates": "Paul A. Samuelson",
      "field": "靜態與動態經濟分析",
      "formula": "$\\max U(x) \\text{ s.t. } p \\cdot x \\le I$",
      "conclusion": "將數學嚴謹性引入經濟理論，建立顯性偏好理論與數理經濟學基礎。",
      "group": "nobel-02"
    },
    {
      "year": 1971,
      "laureates": "Simon Kuznets",
      "field": "經濟成長與國民所得實證分析",
      "formula": "$Gini = f(\\text{GDP per capita})$ (庫茲涅茨倒U曲線)",
      "conclusion": "提出經濟發展初期所得不平等上升、達到峰值後隨經濟成熟而下降的假說。",
      "group": "nobel-07"
    },
    {
      "year": 1972,
      "laureates": "Kenneth J. Arrow, John R. Hicks",
      "field": "一般均衡理論與福利經濟學",
      "formula": "$Y = C(Y) + I(r) + G, \\ M/P = L(Y, r)$ (IS-LM)",
      "conclusion": "證明不可能定理（阿羅）；建構 IS-LM 模型奠定總體分析架構（希克斯）。",
      "group": "nobel-02"
    },
    {
      "year": 1973,
      "laureates": "Wassily Leontief",
      "field": "投入產出分析 (Input-Output Analysis)",
      "formula": "$(I - A)X = F$",
      "conclusion": "建立各產業間互相依賴的線性投入產出模型，用於結構性經濟預測。",
      "group": "nobel-03"
    },
    {
      "year": 1974,
      "laureates": "Gunnar Myrdal, Friedrich Hayek",
      "field": "貨幣理論、景氣波動與制度分析",
      "formula": "$M \\uparrow \\implies r < r_{nat} \\implies \\text{錯置投資}$",
      "conclusion": "價格機制是分散資訊傳播的最佳手段（海耶克）；累積因果論（繆達爾）。",
      "group": "nobel-04"
    },
    {
      "year": 1975,
      "laureates": "Leonid Kantorovich, Tjalling C. Koopmans",
      "field": "資源最佳分配理論",
      "formula": "$\\max c^T x \\text{ s.t. } Ax \\le b$",
      "conclusion": "開發線性規劃方法，透過影子價格（Shadow Price）實現稀缺資源的最適配置。",
      "group": "nobel-05"
    },
    {
      "year": 1976,
      "laureates": "Milton Friedman",
      "field": "貨幣數量論與恆常所得假說",
      "formula": "$MV = PQ \\ \\mid \\ C = a Y_p$",
      "conclusion": "通貨膨脹本質上是貨幣現象；短期菲利浦曲線成立，但長期無替換關係。",
      "group": "nobel-04"
    },
    {
      "year": 1977,
      "laureates": "Bertil Ohlin, James E. Meade",
      "field": "國際貿易與國際資本流動",
      "formula": "$EX_i = f(\\text{Factor Abundance}_i)$ (H-O模型)",
      "conclusion": "各國會出口相對密集使用其豐沛生產要素的商品（赫克歇爾-俄林模型）。",
      "group": "nobel-06"
    },
    {
      "year": 1978,
      "laureates": "Herbert A. Simon",
      "field": "組織決策過程與有限理性",
      "formula": "$\\max U \\longrightarrow \\text{Satisfaction Threshold}$",
      "conclusion": "人類認知能力有限，經濟決策追求的是「滿意」（Satisficing）而非「極致最佳化」。",
      "group": "nobel-11"
    },
    {
      "year": 1979,
      "laureates": "Theodore W. Schultz, W. Arthur Lewis",
      "field": "發展經濟學與人力資本",
      "formula": "$Y_{agri} \\to L_{mfg} \\text{ at } w = \\bar{w}$ (劉易斯轉折點)",
      "conclusion": "發展中國家農業剩餘勞動力可轉移至現代工業；農業人力資本投資是突破貧窮之關鍵。",
      "group": "nobel-12"
    },
    {
      "year": 1980,
      "laureates": "Lawrence R. Klein",
      "field": "巨觀計量模型與景氣預測",
      "formula": "$Y_t = \\sum \\beta_i X_{it} + e_t$",
      "conclusion": "建構大型聯立方程組計量模型，用以模擬經濟政策與預測景氣循環波動。",
      "group": "nobel-01"
    },
    {
      "year": 1981,
      "laureates": "James Tobin",
      "field": "資產組合選擇與投資理論",
      "formula": "$q = \\frac{\\text{企業市場價值}}{\\text{重置成本}}$ (托賓 Q)",
      "conclusion": "金融市場影響實體經濟；當 $q > 1$ 時企業擴大實體資本投資才有實質回報。",
      "group": "nobel-08"
    },
    {
      "year": 1982,
      "laureates": "George J. Stigler",
      "field": "產業結構與政府管制經濟學",
      "formula": "$U_{regulator} = f(\\text{Industry Support})$",
      "conclusion": "提出「管制捕獲理論」，政府管制常被被管制的利益團體捕獲並轉向為其謀利。",
      "group": "nobel-15"
    },
    {
      "year": 1983,
      "laureates": "Gerard Debreu",
      "field": "一般均衡理論的公理化嚴謹證明",
      "formula": "$p \\cdot (x_i - e_i) \\le 0 \\implies \\sum x_i = \\sum e_i$",
      "conclusion": "利用拓樸學與凸集合理論，成功證明完全競價市場下必定存在競爭均衡解。",
      "group": "nobel-02"
    },
    {
      "year": 1984,
      "laureates": "Richard Stone",
      "field": "國民經濟會計體系 (SNA)",
      "formula": "$GDP = C + I + G + (X - M)$",
      "conclusion": "建立全球統一的國民帳戶統計標準，為總體經濟數據測量奠定根本基石。",
      "group": "nobel-03"
    },
    {
      "year": 1985,
      "laureates": "Franco Modigliani",
      "field": "生命週期假說與公司金融",
      "formula": "$C = \\alpha W + \\beta Y \\ \\mid \\ V_U = V_L$ (MM定理)",
      "conclusion": "個人透過儲蓄平滑一生消費（生命週期假說）；完美市場下資本結構不影響企業價值。",
      "group": "nobel-16"
    },
    {
      "year": 1986,
      "laureates": "James M. Buchanan Jr.",
      "field": "公共選擇理論 (Public Choice)",
      "formula": "$\\max U_{politician}(Votes, Power)$",
      "conclusion": "將經濟學「自利人」假設延伸至政治學，政治家與官員行為本質亦為追求個人效益最大化。",
      "group": "nobel-15"
    },
    {
      "year": 1987,
      "laureates": "Robert M. Solow",
      "field": "新古典經濟成長理論",
      "formula": "$Y = A K^\\alpha L^{1-\\alpha}$ (索洛成長模型)",
      "conclusion": "長期經濟持續成長的最終驅動力源於技術進步（索洛殘差 $A$），而非資本累積。",
      "group": "nobel-07"
    },
    {
      "year": 1988,
      "laureates": "Maurice Allais",
      "field": "市場理論與不確定性決策",
      "formula": "$V(R) \\neq \\sum p_i U(x_i)$ (阿萊悖論)",
      "conclusion": "揭示人類在面對確定性效應時，選擇行為違背傳統期望效應理論的獨立性公理。",
      "group": "nobel-11"
    },
    {
      "year": 1989,
      "laureates": "Trygve Haavelmo",
      "field": "計量經濟學的機率基礎",
      "formula": "$y_t = \\beta x_t + \\epsilon_t, \\ \\epsilon_t \\sim N(0, \\sigma^2)$",
      "conclusion": "證明經濟理論假設必須透過機率論與隨機模型（Stochastic Model）進行經驗檢定。",
      "group": "nobel-01"
    },
    {
      "year": 1990,
      "laureates": "Harry M. Markowitz, William F. Sharpe, Merton H. Miller",
      "field": "現代金融資產定價與投資組合理論",
      "formula": "$E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$ (CAPM)",
      "conclusion": "提出投資組合分散風險（馬科維茨）；資產預期報酬僅由系統性風險 $\\beta$ 決定（夏普）。",
      "group": "nobel-08"
    },
    {
      "year": 1991,
      "laureates": "Ronald H. Coase",
      "field": "交易成本與產權理論",
      "formula": "$\\text{If } TC = 0 \\implies \\text{Efficient Allocation}$",
      "conclusion": "科斯定理：若交易成本為零且產權界定清晰，無論初始權利歸誰，市場私下協商均能達最適。",
      "group": "nobel-09"
    },
    {
      "year": 1992,
      "laureates": "Gary S. Becker",
      "field": "微觀經濟行為延伸至非市場範疇",
      "formula": "$U = U(C, T, H)$",
      "conclusion": "將經濟學分析範式擴展至婚姻、犯罪、家庭、歧視與人力資本投資等領域。",
      "group": "nobel-15"
    },
    {
      "year": 1993,
      "laureates": "Robert W. Fogel, Douglass C. North",
      "field": "新經濟史學 (Cliometrics) 與制度變遷",
      "formula": "$\\text{Institutional Change} \\to TC \\downarrow \\to \\text{Growth}$",
      "conclusion": "產權演進與制度變遷是長期經濟興衰的關鍵；以計量方法重構歷史經濟發展過程。",
      "group": "nobel-15"
    },
    {
      "year": 1994,
      "laureates": "John C. Harsanyi, John F. Nash Jr., Reinhard Selten",
      "field": "非合作賽局理論 (Game Theory)",
      "formula": "$u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*)$ (納許均衡)",
      "conclusion": "奠定現代賽局分析基礎，證明非合作賽局中均衡解的存在性，適用於不完全資訊環境。",
      "group": "nobel-10"
    },
    {
      "year": 1995,
      "laureates": "Robert E. Lucas Jr.",
      "field": "理性預期假說與巨觀分析",
      "formula": "$E_t[P_{t+1}] = P_{t+1}^e$ (盧卡斯批判)",
      "conclusion": "經濟主體會充分利用資訊形成預期，政府若試圖利用歷史經驗推導政策，政策將因預期調整而失效。",
      "group": "nobel-04"
    },
    {
      "year": 1996,
      "laureates": "James A. Mirrlees, William Vickrey",
      "field": "不對稱資訊下的激勵機制設計",
      "formula": "$\\max \\int U(c, l) f(n) dn \\text{ s.t. Incentive}$",
      "conclusion": "設計最適所得稅與拍賣機制，如何在隱蔽資訊下達成效率與公平的平衡。",
      "group": "nobel-09"
    },
    {
      "year": 1997,
      "laureates": "Robert C. Merton, Myron S. Scholes",
      "field": "金融衍生性商品定價",
      "formula": "$C = S_0 N(d_1) - K e^{-rt} N(d_2)$ (Black-Scholes)",
      "conclusion": "推導出 Black-Scholes 選擇權定價公式，引發全球金融衍生性商品的爆發性發展與風險管理。",
      "group": "nobel-08"
    },
    {
      "year": 1998,
      "laureates": "Amartya Sen",
      "field": "福利經濟學與貧窮饑荒研究",
      "formula": "$W = f(\\text{Capabilities, Entitlements})$",
      "conclusion": "饑荒多非源於糧食絕對短缺，而是權利（Entitlements）分配不均與個體「可行能力」受限。",
      "group": "nobel-16"
    },
    {
      "year": 1999,
      "laureates": "Robert A. Mundell",
      "field": "最適貨幣區與開放總體經濟",
      "formula": "$Y = C + I + G + NX(e, Y)$ (Mundell-Fleming)",
      "conclusion": "提出「不可能三角」：資本自由流動、貨幣政策獨立性與固定匯率三者不可兼得。",
      "group": "nobel-06"
    },
    {
      "year": 2000,
      "laureates": "James J. Heckman, Daniel L. McFadden",
      "field": "微觀計量經濟學（選擇偏誤與離散選擇）",
      "formula": "$y_i^* = x_i \\beta + u_i$ (Heckman 兩階段法)",
      "conclusion": "解決觀察樣本非隨機抽樣導致的「樣本選擇偏誤」（Selection Bias）；建立多項離散選擇模型。",
      "group": "nobel-14"
    },
    {
      "year": 2001,
      "laureates": "George A. Akerlof, A. Michael Spence, Joseph E. Stiglitz",
      "field": "資訊不對稱市場理論",
      "formula": "$P_{market} = E[\\text{Quality}] \\implies \\text{劣幣驅逐良幣}$",
      "conclusion": "資訊不對稱引發逆向選擇（檸檬市場）與道德風險；可透過發送信號（Signaling）或篩選緩解。",
      "group": "nobel-09"
    },
    {
      "year": 2002,
      "laureates": "Daniel Kahneman, Vernon L. Smith",
      "field": "行為經濟學與實驗經濟學",
      "formula": "$V(x) = v(x) \\cdot w(p)$ (前景理論)",
      "conclusion": "人類對損失比收益更敏感（損失趨避），選擇行為普遍偏離傳統古典經濟學的完全理性假設。",
      "group": "nobel-11"
    },
    {
      "year": 2003,
      "laureates": "Robert F. Engle III, Clive W.J. Granger",
      "field": "金融時間序列分析（ARCH 與協整）",
      "formula": "$\\sigma_t^2 = \\alpha_0 + \\sum \\alpha_i \\epsilon_{t-i}^2$ (ARCH模型)",
      "conclusion": "開發 ARCH 模型刻畫金融波動叢聚現象（Engle）；提出協整方法處理非平穩時間序列（Granger）。",
      "group": "nobel-01"
    },
    {
      "year": 2004,
      "laureates": "Finn E. Kydland, Edward C. Prescott",
      "field": "動態總體經濟學與實質景氣循環",
      "formula": "$\\max \\sum \\beta^t U(c_t, l_t) \\text{ s.t. Tech Shocks}$",
      "conclusion": "政策承諾具有「時間不一致性」；景氣循環波動主要來自技術供給衝擊而非貨幣需求衝擊。",
      "group": "nobel-04"
    },
    {
      "year": 2005,
      "laureates": "Robert J. Aumann, Thomas C. Schelling",
      "field": "賽局理論在衝突與合作中的應用",
      "formula": "$V_i = (1-\\delta) \\sum_{t=0}^{\\infty} \\delta^t u_i(t)$",
      "conclusion": "重複賽局分析（無名氏定理）解釋了為何在缺乏外部強制力時，長期互動仍可維持合作與威脅可信度。",
      "group": "nobel-10"
    },
    {
      "year": 2006,
      "laureates": "Edmund S. Phelps",
      "field": "總體經濟政策中的跨期抉擇",
      "formula": "$\\pi_t = \\pi_t^e - \\gamma(u_t - u_n)$",
      "conclusion": "通膨與失業率僅存在短期替代；若考慮通膨預期調整，長期失業率必定歸於自然失業率。",
      "group": "nobel-04"
    },
    {
      "year": 2007,
      "laureates": "Leonid Hurwicz, Eric S. Maskin, Roger B. Myerson",
      "field": "機制設計理論 (Mechanism Design)",
      "formula": "$\\theta \\to M(g(\\theta)) = g(\\theta)$ (激勵相容)",
      "conclusion": "解構如何設計制度規則（如拍賣或投票），使個體在追求自利行為時同時達到整體最適目標。",
      "group": "nobel-09"
    },
    {
      "year": 2008,
      "laureates": "Paul Krugman",
      "field": "新貿易理論與新經濟地理學",
      "formula": "$\\text{Trade} = f(\\text{Scale Economies, Monopolistic})$",
      "conclusion": "規模經濟與消費者偏好樣態多樣性，解釋了為何產業結構相似的發達國家之間依然進行大量貿易。",
      "group": "nobel-06"
    },
    {
      "year": 2009,
      "laureates": "Elinor Ostrom, Oliver E. Williamson",
      "field": "經濟治理（公共池塘資源與企業邊界）",
      "formula": "$\\text{Governing the Commons without State/Market}$",
      "conclusion": "社群自治規則能有效防止公地悲劇（Ostrom）；企業本質是降低市場交易成本的治理結構（Williamson）。",
      "group": "nobel-15"
    },
    {
      "year": 2010,
      "laureates": "Peter A. Diamond, Dale T. Mortensen, Christopher A. Pissarides",
      "field": "勞動市場的搜尋與配對摩擦",
      "formula": "$u \\cdot v = f(\\text{Matching Friction})$ (DMP模型)",
      "conclusion": "建立 DMP 配對理論，解釋市場中搜尋成本與資訊摩擦如何導致「失業人口」與「職缺缺口」同時並存。",
      "group": "nobel-12"
    },
    {
      "year": 2011,
      "laureates": "Thomas J. Sargent, Christopher A. Sims",
      "field": "總體經濟因果關係之實證分析",
      "formula": "$Y_t = A Y_{t-1} + B \\epsilon_t$ (SVAR模型)",
      "conclusion": "開發結構性向量自迴歸（SVAR），精確測量貨幣政策與財政政策變動對總體經濟的動態衝擊與傳導。",
      "group": "nobel-01"
    },
    {
      "year": 2012,
      "laureates": "Alvin E. Roth, Lloyd S. Shapley",
      "field": "穩定配對理論與市場設計實踐",
      "formula": "$\\text{Deferred Acceptance Algorithm}$",
      "conclusion": "開發蓋爾-沙普利算法，在缺乏貨幣價格機制的市場（如醫學生實習配對、器官捐贈）實現穩定配對。",
      "group": "nobel-10"
    },
    {
      "year": 2013,
      "laureates": "Eugene F. Fama, Lars Peter Hansen, Robert J. Shiller",
      "field": "資產價格實證分析",
      "formula": "$P_t = \\sum \\frac{E_t[D_{t+k}]}{(1+r)^k}$",
      "conclusion": "股票短期價格近乎不可預測（Fama 效率市場假說）；但長期價格具有可預測性與均值回歸特徵（Shiller）。",
      "group": "nobel-08"
    },
    {
      "year": 2014,
      "laureates": "Jean Tirole",
      "field": "市場力量與大企業調控管制",
      "formula": "$\\max \\text{Welfare } \\text{s.t. Informational Asymmetry}$",
      "conclusion": "打破單一管制框架，針對寡頭壟斷與雙邊平台（平台經濟）提出靈活的微分專屬動態監管政策。",
      "group": "nobel-15"
    },
    {
      "year": 2015,
      "laureates": "Angus Deaton",
      "field": "消費、貧窮與社會福利分析",
      "formula": "$w_i = \\alpha_i + \\sum \\gamma_{ij} \\ln p_j + \\beta_i \\ln(X/P)$",
      "conclusion": "提出近乎完美需求系統（AIDS），打破總體消費與微觀個體選擇間的藩籬，精確測量生活水準與貧窮。",
      "group": "nobel-16"
    },
    {
      "year": 2016,
      "laureates": "Oliver Hart, Bengt Holmström",
      "field": "契約理論 (Contract Theory)",
      "formula": "$\\max E[U] \\text{ s.t. Incomplete Contract}$",
      "conclusion": "不完全契約理論：現實中契約難以涵蓋所有未來情境，剩餘控制權（Residual Control）應配置給最高效益者。",
      "group": "nobel-09"
    },
    {
      "year": 2017,
      "laureates": "Richard H. Thaler",
      "field": "行為經濟學（心理帳戶與推力）",
      "formula": "$U = f(\\text{Mental Accounting, Present Bias})$",
      "conclusion": "揭示人類存在心理帳戶、自我控制缺乏與偏見，提出「推力」（Nudge）透過環境微調引導最佳抉擇。",
      "group": "nobel-11"
    },
    {
      "year": 2018,
      "laureates": "William D. Nordhaus, Paul M. Romer",
      "field": "氣候變遷與內生技術創新",
      "formula": "$Y = A(H) K^\\alpha L^{1-\\alpha} \\ \\mid \\text{DICE Model}$",
      "conclusion": "將技術創新內生化為研發投資成果（Romer）；建立 DICE 模型將全球氣候變遷負外在性納入總體成長。",
      "group": "nobel-07"
    },
    {
      "year": 2019,
      "laureates": "Abhijit Banerjee, Esther Duflo, Michael Kremer",
      "field": "緩解全球貧窮的實驗性方法",
      "formula": "$ATE = E[Y_i(1) - Y_i(0)]$（RCT 可識別；概念式）",
      "conclusion": "將「隨機對照試驗」（RCT）引入發展經濟學，以實驗方法估計教育、醫療、信貸等介入的因果效果；官方背景也指出微型貸款的效果不如原先預期。",
      "group": "nobel-14"
    },
    {
      "year": 2020,
      "laureates": "Paul R. Milgrom, Robert B. Wilson",
      "field": "拍賣理論改進與新型拍賣格式發明",
      "formula": "$E[V \\mid \\text{win}] < E[V \\mid \\text{own signal}]$（勝者魔咒；概念式）",
      "conclusion": "Wilson 分析共同價值拍賣的「勝者魔咒」：得標者的條件期望值低於自己的信號；Milgrom 擴展至私有與共同價值，並參與設計同步多輪拍賣（SMRA）、組合時鐘拍賣等新格式，應用於電信頻段等互補性標的。",
      "group": "nobel-09"
    },
    {
      "year": 2021,
      "laureates": "David Card, Joshua D. Angrist, Guido W. Imbens",
      "field": "實證勞動經濟學與因果關係推論",
      "formula": "$ATE_{LATE} = \\frac{E[Y\\mid Z=1] - E[Y\\mid Z=0]}{E[D\\mid Z=1] - E[D\\mid Z=0]}$",
      "conclusion": "利用自然實驗、雙重差分法（DID）與工具變數法（LATE），奠定現代計量經濟學的因果推論革命。",
      "group": "nobel-14"
    },
    {
      "year": 2022,
      "laureates": "Ben S. Bernanke, Douglas W. Diamond, Philip H. Dybvig",
      "field": "銀行機制與金融危機研究",
      "formula": "$V_{bank} = \\text{Liquidity Transformation}$",
      "conclusion": "提出 Diamond-Dybvig 模型，說明銀行提供流動性轉換但天然存在擠兌風險；Bernanke 的實證研究則說明銀行倒閉會急劇加深經濟衰退。",
      "group": "nobel-13"
    },
    {
      "year": 2023,
      "laureates": "Claudia Goldin",
      "field": "女性勞動市場成果之歷史演進",
      "formula": "$FLFP = f(\\text{Structure, Pill, Greedy Jobs})$",
      "conclusion": "揭示女性勞動參與率呈現 U 型曲線；以長工時、缺乏時間彈性與育兒懲罰解釋當代男女薪資差距（「貪婪工作」為後續綜合用語）。",
      "group": "nobel-12"
    },
    {
      "year": 2024,
      "laureates": "Daron Acemoglu, Simon Johnson, James A. Robinson",
      "field": "制度如何形成並影響國家繁榮",
      "formula": "$\\text{Growth} = f(\\text{Inclusive Institutions})$",
      "conclusion": "包容性政治與經濟制度（保護產權、法治）能持續驅動創新與繁榮；抽取性制度則導致國家衰敗。",
      "group": "nobel-15"
    },
    {
      "year": 2025,
      "laureates": "Joel Mokyr, Philippe Aghion, Peter Howitt",
      "field": "創新驅動成長與熊彼特創造性破壞",
      "formula": "$g = \\lambda(\\gamma - 1) \\approx \\lambda \\ln(\\gamma)$ (創造性破壞模型)",
      "conclusion": "以創新到達率（創造性破壞率）λ 與創新步幅 γ 描述長期成長（g = λ(γ−1) ≈ λ ln γ）；結合知識擴散文化（Mokyr）與新舊技術更替（Aghion & Howitt），解釋技術創新如何實現持續成長。",
      "group": "nobel-07"
    },
    {
      "year": 2026,
      "laureates": "Robert E. Hall, Michael Woodford",
      "field": "總體經濟穩定政策的微觀基礎 (Microeconomic Foundations of Macroeconomic Stabilisation)",
      "formula": "$C_{t+1} = C_t + \\epsilon_{t+1} \\ \\mid \\ \\pi_t = \\beta E_t \\pi_{t+1} + \\kappa x_t$ (新凱因斯框架)",
      "conclusion": "提出消費隨機漫步假說（Hall；隨機漫步式為無趨勢簡化，原文允許趨勢）；建立新凱因斯動態總體模型，證明央行預期管理與前瞻指引在價格僵固下對穩定景氣具決定性作用（Woodford）。",
      "group": "nobel-17"
    }
  ]
};
