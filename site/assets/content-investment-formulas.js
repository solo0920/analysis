/* 投資學 — 公式庫
   依證券投資分析人員考試投資學科目常見的計算題、觀念題與模型題整理。
   每筆公式獨立成資料；投資學公式總表頁讀取這份資料，章節頁則保留各自的
   比例公式綁定。公式一律使用 KaTeX，latex 欄位只放數學式，不與程式計算混用。 */

window.INVESTMENT_FORMULA_LIBRARY = {
  meta: {
    title: "投資學公式庫",
    note: "優先級 A 為基礎且常考，B 為第二階段補強；這是複習建議，不是官方命題排名。"
  },
  categories: [
    {
      id: "time-value",
      order: 2,
      title: "02 貨幣時間價值",
      description: "現值、終值、年金與有效利率；債券評價與資本預算的共同基礎。",
      entries: [
        {
          id: "tvm.pv",
          name: "現值（PV）",
          latex: String.raw`PV=\frac{FV}{(1+r)^n}`,
          note: "把未來現金流折現到今天；折現率與期數的期間單位要一致。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-07",
          variables: [["PV", "現值"], ["FV", "未來值"], ["r", "每期折現率"], ["n", "期數"]]
        },
        {
          id: "tvm.fv",
          name: "終值（FV）",
          latex: String.raw`FV=PV(1+r)^n`,
          note: "單筆資金以複利成長到未來的價值。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-07",
          variables: [["FV", "未來值"], ["PV", "現值"], ["r", "每期利率"], ["n", "期數"]]
        },
        {
          id: "tvm.pva",
          name: "普通年金現值",
          latex: String.raw`PVA=PMT\times\frac{1-(1+r)^{-n}}{r}`,
          note: "每期期末定額給付的現值；期初年金要再乘 (1+r)。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-07",
          variables: [["PVA", "年金現值"], ["PMT", "每期給付"], ["r", "每期利率"], ["n", "期數"]]
        },
        {
          id: "tvm.perpetuity",
          name: "永續年金現值",
          latex: String.raw`PV=\frac{PMT}{r}`,
          note: "沒有到期日、每期給付固定；零成長股利模型是它的應用。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-08",
          variables: [["PV", "現值"], ["PMT", "每期給付"], ["r", "每期折現率"]]
        },
        {
          id: "tvm.ear",
          name: "有效年利率（EAR）",
          latex: String.raw`EAR=\left(1+\frac{r}{m}\right)^m-1`,
          note: "名目利率相同時，複利次數 m 越多，有效年利率越高。",
          priority: "A",
          examSkill: "計算與比較",
          chapterId: "investment-07",
          variables: [["r", "名目年利率"], ["m", "每年複利次數"]]
        }
      ]
    },
    {
      id: "return-risk",
      order: 3,
      title: "03 投資報酬與風險",
      description: "持有期間報酬、平均報酬、期望值、變異數、共變異數與兩資產組合；投資學計算題的地基。",
      entries: [
        {
          id: "risk.hpr",
          name: "持有期間報酬率（HPR）",
          latex: String.raw`\text{HPR}=\frac{P_1-P_0+D}{P_0}`,
          note: "分子包含資本利得與期間現金股利；分母是期初投入價格。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-08",
          variables: [["P_0", "期初價格"], ["P_1", "期末價格"], ["D", "期間現金股利"]]
        },
        {
          id: "risk.arithmetic",
          name: "算術平均報酬率",
          latex: String.raw`\bar R=\frac{1}{n}\sum_{i=1}^{n}R_i`,
          note: "單期報酬的簡單平均；適合估計下一期的期望報酬。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-03",
          variables: [["R_i", "第 i 期報酬率"], ["n", "期數"]]
        },
        {
          id: "risk.geometric",
          name: "幾何平均報酬率",
          latex: String.raw`\left[\prod_{i=1}^{n}(1+R_i)\right]^{1/n}-1`,
          note: "衡量長期複合成長；波動越大，幾何平均通常越低於算術平均。",
          priority: "A",
          examSkill: "計算與比較",
          chapterId: "investment-03",
          variables: [["R_i", "第 i 期報酬率"], ["n", "期數"]]
        },
        {
          id: "risk.expected",
          name: "期望報酬率",
          latex: String.raw`E(R)=\sum_i p_iR_i`,
          note: "以情境機率加權的報酬率；機率合計必須為 1。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["p_i", "第 i 個情境機率"], ["R_i", "第 i 個情境報酬率"]]
        },
        {
          id: "risk.variance",
          name: "報酬變異數",
          latex: String.raw`\sigma^2=\sum_i p_i[R_i-E(R)]^2`,
          note: "衡量報酬偏離期望值的程度；單位是報酬率的平方。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["p_i", "情境機率"], ["R_i", "情境報酬率"], ["E(R)", "期望報酬率"]]
        },
        {
          id: "risk.std",
          name: "報酬標準差",
          latex: String.raw`\sigma=\sqrt{\sigma^2}`,
          note: "把變異數開根號，單位與報酬率相同，較容易解釋。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["\\sigma^2", "報酬變異數"]]
        },
        {
          id: "risk.cov",
          name: "共變異數",
          latex: String.raw`\operatorname{Cov}(R_i,R_j)=E[(R_i-E(R_i))(R_j-E(R_j))]`,
          note: "衡量兩個報酬率同向或反向變動的程度；正負號比大小更重要。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["R_i", "資產 i 報酬率"], ["R_j", "資產 j 報酬率"]]
        },
        {
          id: "risk.corr",
          name: "相關係數",
          latex: String.raw`\rho_{ij}=\frac{\operatorname{Cov}(R_i,R_j)}{\sigma_i\sigma_j}`,
          note: "標準化後的共變異數，介於 -1 與 1 之間。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["\\operatorname{Cov}(R_i,R_j)", "共變異數"], ["\\sigma_i", "資產 i 標準差"], ["\\sigma_j", "資產 j 標準差"]]
        },
        {
          id: "risk.portfolio-return",
          name: "兩資產組合期望報酬",
          latex: String.raw`E(R_p)=w_1E(R_1)+w_2E(R_2)`,
          note: "組合期望報酬是各資產期望報酬的加權平均。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-04",
          variables: [["w_1", "資產 1 權重"], ["w_2", "資產 2 權重"], ["E(R_1)", "資產 1 期望報酬"], ["E(R_2)", "資產 2 期望報酬"]]
        },
        {
          id: "risk.portfolio-variance",
          name: "兩資產組合變異數",
          latex: String.raw`\sigma_p^2=w_1^2\sigma_1^2+w_2^2\sigma_2^2+2w_1w_2\operatorname{Cov}(R_1,R_2)`,
          note: "權重平方、個別變異數與共變異數；相關係數越低，分散效果越明顯。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-04",
          variables: [["w_1", "資產 1 權重"], ["w_2", "資產 2 權重"], ["\\sigma_1^2", "資產 1 變異數"], ["\\sigma_2^2", "資產 2 變異數"], ["\\operatorname{Cov}(R_1,R_2)", "兩資產共變異數"]]
        }
      ]
    },
    {
      id: "portfolio-theory",
      order: 4,
      title: "04 投資組合理論",
      description: "最小變異數組合、組合 Beta 與分散投資的計算；銜接 CAPM 的必要步驟。",
      entries: [
        {
          id: "portfolio.min-variance",
          name: "最小變異數權重",
          latex: String.raw`w_1=\frac{\sigma_2^2-\operatorname{Cov}_{12}}{\sigma_1^2+\sigma_2^2-2\operatorname{Cov}_{12}}`,
          note: "兩資產最小變異數組合的權重；結果可能出現負權重（放空）。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-04",
          variables: [["\\sigma_1^2", "資產 1 變異數"], ["\\sigma_2^2", "資產 2 變異數"], ["\\operatorname{Cov}_{12}", "兩資產共變異數"]]
        },
        {
          id: "portfolio.beta",
          name: "組合 Beta",
          latex: String.raw`\beta_p=\sum_i w_i\beta_i`,
          note: "組合 Beta 是成分資產 Beta 的加權平均；用來衡量組合的系統風險。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-04",
          variables: [["w_i", "資產 i 權重"], ["\\beta_i", "資產 i Beta"]]
        }
      ]
    },
    {
      id: "asset-pricing",
      order: 5,
      title: "05 資產定價模型",
      description: "Beta、CAPM／SML、市場風險溢酬、證券特徵線、CML、APT 與 Treynor–Black 主動組合。",
      entries: [
        {
          id: "capm.beta",
          name: "Beta",
          latex: String.raw`\beta_i=\frac{\operatorname{Cov}(R_i,R_m)}{\sigma_m^2}`,
          note: "個別資產報酬對市場報酬的敏感度；市場組合 Beta 為 1。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-05",
          variables: [["\\operatorname{Cov}(R_i,R_m)", "資產 i 與市場共變異數"], ["\\sigma_m^2", "市場報酬變異數"]]
        },
        {
          id: "capm.required",
          name: "CAPM 必要報酬率（SML）",
          latex: String.raw`E(R_i)=R_f+\beta_i[E(R_m)-R_f]`,
          note: "證券市場線：預期報酬高於 SML 為低估，低於 SML 為高估。",
          priority: "A",
          examSkill: "計算與判斷",
          chapterId: "investment-05",
          variables: [["R_f", "無風險利率"], ["\\beta_i", "資產 i Beta"], ["E(R_m)", "市場期望報酬"]]
        },
        {
          id: "capm.mrp",
          name: "市場風險溢酬",
          latex: String.raw`E(R_m)-R_f`,
          note: "投資人承擔市場風險所要求的額外報酬。",
          priority: "A",
          examSkill: "解釋",
          chapterId: "investment-05",
          variables: [["E(R_m)", "市場期望報酬"], ["R_f", "無風險利率"]]
        },
        {
          id: "capm.scl",
          name: "證券特徵線",
          latex: String.raw`R_i-R_f=\alpha_i+\beta_i(R_m-R_f)+\varepsilon_i`,
          note: "超額報酬對市場超額報酬的回歸；α 為 Jensen α，ε 為非系統風險。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-05",
          variables: [["\\alpha_i", "Jensen α"], ["\\beta_i", "資產 i Beta"], ["\\varepsilon_i", "殘差項"]]
        },
        {
          id: "capm.cml",
          name: "資本市場線（CML）",
          latex: String.raw`E(R_p)=R_f+\frac{E(R_m)-R_f}{\sigma_m}\sigma_p`,
          note: "效率組合的期望報酬與總風險關係；橫軸是標準差，不是 Beta。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-04",
          variables: [["E(R_p)", "效率組合期望報酬"], ["\\sigma_p", "組合標準差"], ["\\sigma_m", "市場標準差"]]
        },
        {
          id: "capm.apt",
          name: "套利定價理論（APT）",
          latex: String.raw`E(R_i)=R_f+\beta_{i1}\lambda_1+\beta_{i2}\lambda_2+\cdots+\beta_{ik}\lambda_k`,
          note: "多因子模型；λ 為因子風險溢酬，CAPM 可視為只有市場因子的特例。",
          priority: "B",
          examSkill: "解釋與比較",
          chapterId: "investment-05",
          variables: [["\\beta_{ik}", "第 k 因子敏感度"], ["\\lambda_k", "第 k 因子風險溢酬"]]
        },
        {
          id: "capm.treynor-black",
          name: "Treynor–Black 主動組合權重",
          latex: String.raw`w_i^*=\frac{\alpha_i/\sigma_{\varepsilon_i}^2}{\sum_j\alpha_j/\sigma_{\varepsilon_j}^2}`,
          note: "主動權重與 α 成正比、與非系統風險變異數成反比；再與市場組合混合。",
          priority: "B",
          examSkill: "解釋",
          chapterId: "investment-17",
          variables: [["\\alpha_i", "資產 i 的 α"], ["\\sigma_{\\varepsilon_i}^2", "資產 i 非系統風險變異數"]]
        }
      ]
    },
    {
      id: "equity-valuation",
      order: 6,
      title: "06 股票評價與成長模型",
      description: "零成長、Gordon 成長、股利成長率、必要報酬、PVGO、EV 與自由現金流。",
      entries: [
        {
          id: "equity.zero-growth",
          name: "零成長股利模型",
          latex: String.raw`P_0=\frac{D}{r}`,
          note: "股利固定不成長時的理論價格；等於永續年金現值。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-08",
          variables: [["D", "每期固定股利"], ["r", "必要報酬率"]]
        },
        {
          id: "equity.gordon",
          name: "Gordon 成長模型",
          latex: String.raw`P_0=\frac{D_1}{r-g}`,
          note: "要求 r>g，且股利成長率與折現率假設要一致。",
          priority: "A",
          examSkill: "計算與判斷",
          chapterId: "investment-08",
          variables: [["D_1", "下一期股利"], ["r", "必要報酬率"], ["g", "股利成長率"]]
        },
        {
          id: "equity.d1",
          name: "預期股利",
          latex: String.raw`D_1=D_0(1+g)`,
          note: "從最近一期股利推下一期股利；別把 D_0 直接代入 Gordon 公式。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-08",
          variables: [["D_0", "最近一期股利"], ["g", "股利成長率"]]
        },
        {
          id: "equity.growth",
          name: "股利成長率",
          latex: String.raw`g=b\times ROE`,
          note: "b 為盈餘保留率；ROE 高於必要報酬率時，成長才創造價值。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-08",
          variables: [["b", "盈餘保留率"], ["ROE", "股東權益報酬率"]]
        },
        {
          id: "equity.required-return",
          name: "股東必要報酬率",
          latex: String.raw`r=\frac{D_1}{P_0}+g`,
          note: "股利收益率加上資本利得成長率；可由市場價格反推。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-08",
          variables: [["D_1", "下一期股利"], ["P_0", "目前股價"], ["g", "股利成長率"]]
        },
        {
          id: "equity.pvgo",
          name: "成長機會現值（PVGO）",
          latex: String.raw`\text{PVGO}=P_0-\frac{E_1}{r}`,
          note: "市價超過「不成長」價值的部分；PVGO 可正可負。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-08",
          variables: [["P_0", "目前股價"], ["E_1", "下一期每股盈餘"], ["r", "必要報酬率"]]
        },
        {
          id: "equity.ev",
          name: "企業價值（EV）",
          latex: String.raw`EV=\text{市值}+\text{負債}-\text{現金}`,
          note: "衡量整體企業價值；常與 EBITDA 搭配使用。",
          priority: "B",
          examSkill: "解釋與比較",
          chapterId: "investment-08",
          variables: [["市值", "權益市值"], ["負債", "總負債"], ["現金", "現金及約當現金"]]
        },
        {
          id: "equity.fcfe",
          name: "股權自由現金流（FCFE）",
          latex: String.raw`\text{FCFE}=\text{NI}+\text{NCC}-\Delta\text{NWC}-\text{CapEx}+\text{Net borrowing}`,
          note: "歸屬股東的自由現金流；折現率用股東必要報酬率。",
          priority: "B",
          examSkill: "解釋與計算",
          chapterId: "investment-08",
          variables: [["NI", "本期淨利"], ["NCC", "非現金費用"], ["NWC", "淨營運資金"], ["CapEx", "資本支出"]]
        },
        {
          id: "equity.fcff",
          name: "企業自由現金流（FCFF）",
          latex: String.raw`\text{FCFF}=\text{EBIT}(1-T)+\text{Dep}-\text{CapEx}-\Delta\text{NWC}`,
          note: "歸屬全體資本提供者的自由現金流；折現率用 WACC。",
          priority: "B",
          examSkill: "解釋與計算",
          chapterId: "investment-08",
          variables: [["EBIT", "息前稅前淨利"], ["T", "所得稅率"], ["Dep", "折舊與攤銷"], ["NWC", "淨營運資金"]]
        }
      ]
    },
    {
      id: "bond-analysis",
      order: 7,
      title: "07 債券分析",
      description: "債券價格、零息債券、當期收益率、Macaulay／修正存續期間、凸性與價格近似。",
      entries: [
        {
          id: "bond.price",
          name: "債券價格",
          latex: String.raw`P=\sum_{t=1}^{n}\frac{C}{(1+y)^t}+\frac{F}{(1+y)^n}`,
          note: "票息年金現值加上面額現值；y 與付息頻率的期間單位要一致。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-07",
          variables: [["C", "每期票息"], ["F", "面額"], ["y", "每期殖利率"], ["n", "期數"]]
        },
        {
          id: "bond.zero",
          name: "零息債券價格",
          latex: String.raw`P=\frac{F}{(1+y)^n}`,
          note: "期間不付息，價格完全來自面額折現；存續期間等於到期日。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-07",
          variables: [["F", "面額"], ["y", "每期殖利率"], ["n", "期數"]]
        },
        {
          id: "bond.current-yield",
          name: "當期收益率",
          latex: String.raw`\text{Current Yield}=\frac{C}{P}`,
          note: "只看票息與市價，不含資本利得或損失。",
          priority: "A",
          examSkill: "計算與比較",
          chapterId: "investment-07",
          variables: [["C", "年票息"], ["P", "債券市價"]]
        },
        {
          id: "bond.macaulay",
          name: "Macaulay 存續期間",
          latex: String.raw`D_M=\frac{\sum_t t\cdot PV(CF_t)}{P}`,
          note: "以現值加權的平均到期時間；零息債券的 D_M 等於到期日。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-07",
          variables: [["t", "期數"], ["PV(CF_t)", "第 t 期現金流現值"], ["P", "債券價格"]]
        },
        {
          id: "bond.modified",
          name: "修正存續期間",
          latex: String.raw`D_{\text{mod}}=\frac{D_M}{1+y/m}`,
          note: "把 Macaulay 存續期間換成價格對殖利率的敏感度。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-07",
          variables: [["D_M", "Macaulay 存續期間"], ["y", "殖利率"], ["m", "每年付息次數"]]
        },
        {
          id: "bond.duration-approx",
          name: "存續期間價格近似",
          latex: String.raw`\frac{\Delta P}{P}\approx-D_{\text{mod}}\Delta y`,
          note: "利率小幅變動時可用；利率大幅變動要加上凸性修正。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-07",
          variables: [["D_{\\text{mod}}", "修正存續期間"], ["\\Delta y", "殖利率變動"]]
        },
        {
          id: "bond.convexity",
          name: "凸性",
          latex: String.raw`\text{Convexity}=\frac{1}{P}\sum_t\frac{t(t+1)CF_t}{(1+y)^{t+2}}`,
          note: "衡量存續期間對利率變動的變化；定義要與殖利率慣例一致。",
          priority: "B",
          examSkill: "解釋",
          chapterId: "investment-07",
          variables: [["CF_t", "第 t 期現金流"], ["P", "債券價格"], ["y", "每期殖利率"]]
        },
        {
          id: "bond.convexity-approx",
          name: "凸性修正價格近似",
          latex: String.raw`\frac{\Delta P}{P}\approx-D_{\text{mod}}\Delta y+\frac{1}{2}\text{Convexity}(\Delta y)^2`,
          note: "正凸性對投資人有利：利率上升時跌得較少，利率下降時漲得較多。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-07",
          variables: [["D_{\\text{mod}}", "修正存續期間"], ["\\text{Convexity}", "凸性"], ["\\Delta y", "殖利率變動"]]
        }
      ]
    },
    {
      id: "derivatives",
      order: 8,
      title: "08 衍生性金融商品與 Greeks",
      description: "遠期與期貨價格、期貨避險口數、選擇權到期損益、買賣權平價，以及 Delta、Gamma、Theta、Vega、Rho。",
      entries: [
        {
          id: "deriv.forward-price",
          name: "遠期／期貨理論價格（連續複利）",
          latex: String.raw`F_0=S_0e^{(r-q)T}`,
          note: "持有成本高於持有收益時，期貨價格高於現貨；q 為連續持有收益率。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-10",
          variables: [["S_0", "現貨價格"], ["r", "無風險利率"], ["q", "持有收益率"], ["T", "到期時間"]]
        },
        {
          id: "deriv.forward-discrete",
          name: "遠期／期貨理論價格（離散近似）",
          latex: String.raw`F_0\approx S_0(1+r-q)^T`,
          note: "離散年化近似；考試若給年化利率與持有成本，常用這個形式。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-10",
          variables: [["S_0", "現貨價格"], ["r", "無風險利率"], ["q", "持有收益率"], ["T", "到期時間"]]
        },
        {
          id: "deriv.futures-hedge",
          name: "股價指數期貨避險口數",
          latex: String.raw`N^*=\frac{\beta V_A}{V_F}`,
          note: "V_A 為現貨組合市值、V_F 為每口期貨契約價值；調整目標 Beta 時分子改為 (β*−β)。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-10",
          variables: [["\\beta", "現貨組合 Beta"], ["V_A", "現貨組合市值"], ["V_F", "每口期貨契約價值"]]
        },
        {
          id: "deriv.call-payoff",
          name: "買權到期價值",
          latex: String.raw`\max(S_T-K,0)`,
          note: "到期時履約價值不為負；買方最大損失為權利金。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-09",
          variables: [["S_T", "到期股價"], ["K", "履約價"]]
        },
        {
          id: "deriv.put-payoff",
          name: "賣權到期價值",
          latex: String.raw`\max(K-S_T,0)`,
          note: "到期時股價低於履約價才有履約價值。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-09",
          variables: [["S_T", "到期股價"], ["K", "履約價"]]
        },
        {
          id: "deriv.put-call-parity",
          name: "買賣權平價",
          latex: String.raw`C-P=S_0-Ke^{-rT}`,
          note: "歐式選擇權、無股利假設；可用來推另一邊的合理價格。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-09",
          variables: [["C", "買權價格"], ["P", "賣權價格"], ["S_0", "現貨價格"], ["K", "履約價"], ["r", "無風險利率"], ["T", "到期時間"]]
        },
        {
          id: "greeks.delta",
          name: "Delta（價格敏感度）",
          latex: String.raw`\Delta_C=N(d_1),\qquad \Delta_P=N(d_1)-1`,
          note: "標的價格變動 1 單位時，選擇權價格的變動量；也常用於 Delta 避險。",
          priority: "A",
          examSkill: "解釋與避險",
          chapterId: "investment-09",
          variables: [["\\Delta_C", "買權 Delta"], ["\\Delta_P", "賣權 Delta"], ["N(d_1)", "標準常態累積機率"]]
        },
        {
          id: "greeks.gamma",
          name: "Gamma（Delta 敏感度）",
          latex: String.raw`\Gamma=\frac{\partial\Delta}{\partial S}`,
          note: "標的價格變動時 Delta 的變化幅度；價平且接近到期時通常最大。",
          priority: "A",
          examSkill: "解釋與避險",
          chapterId: "investment-09",
          variables: [["\\Gamma", "Gamma"], ["\\Delta", "Delta"], ["S", "標的價格"]]
        },
        {
          id: "greeks.theta",
          name: "Theta（時間衰減）",
          latex: String.raw`\Theta=\frac{\partial V}{\partial t}`,
          note: "時間經過對選擇權價值的影響；買方通常為負，須注意時間方向定義。",
          priority: "A",
          examSkill: "解釋",
          chapterId: "investment-09",
          variables: [["\\Theta", "Theta"], ["V", "選擇權價值"], ["t", "時間"]]
        },
        {
          id: "greeks.vega",
          name: "Vega（波動率敏感度）",
          latex: String.raw`\text{Vega}=\frac{\partial V}{\partial\sigma}`,
          note: "隱含波動率變動對選擇權價格的影響；買方通常受益於波動率上升。",
          priority: "A",
          examSkill: "解釋與避險",
          chapterId: "investment-09",
          variables: [["\\text{Vega}", "Vega"], ["V", "選擇權價值"], ["\\sigma", "隱含波動率"]]
        },
        {
          id: "greeks.rho",
          name: "Rho（利率敏感度）",
          latex: String.raw`\text{Rho}=\frac{\partial V}{\partial r}`,
          note: "無風險利率變動對選擇權價格的影響；通常到期日越長越敏感。",
          priority: "A",
          examSkill: "解釋",
          chapterId: "investment-09",
          variables: [["\\text{Rho}", "Rho"], ["V", "選擇權價值"], ["r", "無風險利率"]]
        }
      ]
    },
    {
      id: "risk-management",
      order: 9,
      title: "09 風險管理",
      description: "VaR、CVaR／ES、最小變異數避險比率、追蹤誤差與最大回撤。",
      entries: [
        {
          id: "risk.var",
          name: "風險值（VaR）",
          latex: String.raw`VaR_\alpha=-(\mu+z_\alpha\sigma)`,
          note: "在信賴水準下，特定期間內的最大可能損失；z_α 為對應的標準常態分位數，正負號慣例要統一。",
          priority: "A",
          examSkill: "計算與解釋",
          chapterId: "investment-03",
          variables: [["\\mu", "期望報酬"], ["\\sigma", "報酬標準差"], ["z_\\alpha", "標準常態分位數"]]
        },
        {
          id: "risk.es",
          name: "條件風險值（CVaR／ES）",
          latex: String.raw`ES_\alpha=E[-R\mid R\le -VaR_\alpha]`,
          note: "損失超過 VaR 時的平均損失；比 VaR 更能反映尾端風險。",
          priority: "B",
          examSkill: "解釋",
          chapterId: "investment-03",
          variables: [["R", "報酬率"], ["VaR_\\alpha", "風險值"]]
        },
        {
          id: "risk.hedge-ratio",
          name: "最小變異數避險比率",
          latex: String.raw`h^*=\rho\frac{\sigma_S}{\sigma_F}`,
          note: "現貨與期貨報酬的相關係數乘以標準差比值；完全避險時需再換算口數。",
          priority: "A",
          examSkill: "計算",
          chapterId: "investment-10",
          variables: [["\\rho", "現貨與期貨報酬相關係數"], ["\\sigma_S", "現貨報酬標準差"], ["\\sigma_F", "期貨報酬標準差"]]
        },
        {
          id: "risk.tracking-error",
          name: "追蹤誤差",
          latex: String.raw`\text{TE}=\sigma(R_p-R_b)`,
          note: "主動報酬的標準差；資訊比率以它為分母。",
          priority: "B",
          examSkill: "計算與解釋",
          chapterId: "investment-17",
          variables: [["R_p", "投資組合報酬"], ["R_b", "基準報酬"]]
        },
        {
          id: "risk.max-drawdown",
          name: "最大回撤（MDD）",
          latex: String.raw`\text{MDD}=\max_t\frac{\text{Peak}_t-\text{Trough}_t}{\text{Peak}_t}`,
          note: "從高點到低點的最大損失幅度；常用來描述尾部風險與復原難度。",
          priority: "B",
          examSkill: "解釋",
          chapterId: "investment-17",
          variables: [["\\text{Peak}_t", "第 t 期前高點"], ["\\text{Trough}_t", "後續低點"]]
        }
      ]
    },
    {
      id: "performance",
      order: 10,
      title: "10 績效評估",
      description: "夏普、索提諾、崔納、Jensen α、資訊比率與最大回撤已列在 01 財務分析的風險調整績效分類；本區補充 M 平方指標，不重複列公式。",
      entries: [
        {
          id: "performance.m2",
          name: "M 平方指標（M-squared）",
          latex: String.raw`M^2=R_p^*-R_m`,
          note: "把投資組合調整到與市場相同總風險後的報酬，再與市場報酬比較。",
          priority: "B",
          examSkill: "解釋與比較",
          chapterId: "investment-17",
          variables: [["R_p^*", "調整後組合報酬"], ["R_m", "市場報酬"]]
        }
      ]
    },
    {
      id: "capital-structure",
      order: 11,
      title: "11 資本預算與資本結構",
      description: "NPV、IRR、獲利指數、WACC、營運槓桿、財務槓桿、總槓桿與 MM 命題。",
      entries: [
        {
          id: "budget.npv",
          name: "淨現值（NPV）",
          latex: String.raw`NPV=\sum_{t=1}^{n}\frac{CF_t}{(1+r)^t}-I_0`,
          note: "NPV 大於 0 代表投資增加價值；折現率用計畫風險對應的必要報酬率。",
          priority: "A",
          examSkill: "計算與判斷",
          variables: [["CF_t", "第 t 期現金流"], ["r", "折現率"], ["I_0", "期初投資"]]
        },
        {
          id: "budget.irr",
          name: "內部報酬率（IRR）",
          latex: String.raw`0=\sum_{t=0}^{n}\frac{CF_t}{(1+IRR)^t}`,
          note: "使 NPV 為 0 的折現率；與 NPV 結論可能因規模或現金流方向而衝突。",
          priority: "A",
          examSkill: "計算與解釋",
          variables: [["CF_t", "第 t 期現金流"], ["IRR", "內部報酬率"]]
        },
        {
          id: "budget.pi",
          name: "獲利指數（PI）",
          latex: String.raw`PI=\frac{PV(\text{未來現金流})}{I_0}`,
          note: "PI 大於 1 代表值得投資；常用於資本限額下的排序。",
          priority: "B",
          examSkill: "計算與比較",
          variables: [["PV(\\text{未來現金流})", "未來現金流現值"], ["I_0", "期初投資"]]
        },
        {
          id: "capital.wacc",
          name: "加權平均資金成本（WACC）",
          latex: String.raw`WACC=w_Er_E+w_Dr_D(1-T_c)`,
          note: "以目標資本結構加權；負債成本要考慮利息費用抵稅效果。",
          priority: "A",
          examSkill: "計算與解釋",
          variables: [["w_E", "權益比重"], ["r_E", "權益成本"], ["w_D", "負債比重"], ["r_D", "負債成本"], ["T_c", "公司所得稅率"]]
        },
        {
          id: "capital.dol",
          name: "營運槓桿程度（DOL）",
          latex: String.raw`DOL=\frac{\%\Delta EBIT}{\%\Delta Sales}`,
          note: "衡量銷售變動對 EBIT 的放大效果；固定營業成本越高，DOL 越大。",
          priority: "A",
          examSkill: "計算與解釋",
          variables: [["EBIT", "息前稅前淨利"], ["Sales", "銷售額"]]
        },
        {
          id: "capital.dfl",
          name: "財務槓桿程度（DFL）",
          latex: String.raw`DFL=\frac{EBIT}{EBIT-I}`,
          note: "衡量 EBIT 變動對 EPS 的放大效果；利息費用越高，財務風險越大。",
          priority: "A",
          examSkill: "計算與解釋",
          variables: [["EBIT", "息前稅前淨利"], ["I", "利息費用"]]
        },
        {
          id: "capital.dtl",
          name: "總槓桿程度（DTL）",
          latex: String.raw`DTL=DOL\times DFL`,
          note: "銷售變動對 EPS 的總放大效果；等於營運槓桿乘財務槓桿。",
          priority: "A",
          examSkill: "計算與解釋",
          variables: [["DOL", "營運槓桿程度"], ["DFL", "財務槓桿程度"]]
        },
        {
          id: "capital.mm",
          name: "MM 命題（含稅）",
          latex: String.raw`V_L=V_U+T_cD`,
          note: "含公司稅的 MM 第一命題：負債利息抵稅增加企業價值；破產成本未納入。",
          priority: "B",
          examSkill: "解釋",
          variables: [["V_L", "有負債企業價值"], ["V_U", "無負債企業價值"], ["T_c", "公司所得稅率"], ["D", "負債金額"]]
        }
      ]
    }
  ]
};
