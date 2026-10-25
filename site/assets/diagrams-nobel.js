/* 歷年諾貝爾經濟學獎 — 模型圖組
   每個圖組對應多個年度；圖為考試複習用的概念示意，不代表單一官方公式。
   載入順序需在 app.js 之前，並與 content-nobel.js 的 group ID 對應。 */

window.NOBEL_DIAGRAMS = window.NOBEL_DIAGRAMS || {};

Object.assign(window.NOBEL_DIAGRAMS, {
  "nobel-01": {
    title: "動態總體計量模型：衝擊、傳導與政策反應",
    caption: "Frisch 與 Tinbergen 把動態聯立方程帶進景氣循環分析；Klein 建立大型總體計量模型；Haavelmo 強調機率基礎；Sargent 與 Sims 則以結構向量自迴歸追蹤政策衝擊。圖中基線假設沒有外生衝擊，衝擊後產出偏離基線，政策反應可部分抵銷衝擊。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-01-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-01-title">動態總體計量模型的衝擊反應路徑</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="42"></line>
  <text class="dg-label-sm" x="570" y="326">時間 t</text>
  <text class="dg-label-sm" x="78" y="30">產出 Yₜ</text>
  <line class="dg-guide" x1="245" y1="62" x2="245" y2="300"></line>
  <text class="dg-label-sm" x="253" y="76">外生衝擊 εₜ</text>
  <path class="dg-curve" d="M 90 235 C 170 226 250 220 320 205 S 470 170 590 135"></path>
  <path class="dg-curve-alt" d="M 90 235 C 160 234 210 232 245 232 C 280 232 295 274 330 272 C 410 264 500 230 590 210"></path>
  <path class="dg-curve-soft" d="M 90 235 C 160 234 210 232 245 232 C 290 232 310 255 345 250 C 430 238 510 195 590 165"></path>
  <text class="dg-label-sm" x="548" y="124">基線</text>
  <text class="dg-label-sm" x="500" y="232">未政策反應</text>
  <text class="dg-label-sm" x="500" y="184">政策抵銷</text>
  <circle class="dg-point" cx="245" cy="232" r="4"></circle>
</svg>`,
    variables: [
      ["Y_t", "產出／所得", "模型追蹤的總體活動水準"],
      ["X_t", "政策工具與外生變數", "利率、政府支出或外部景氣等"],
      ["ε_t", "外生衝擊", "使經濟偏離基線的隨機擾動"]
    ],
    parameters: [
      ["落後係數", "動態傳導", "前期產出對本期產出的影響"],
      ["衝擊持續性", "ε_t 的記憶", "衝擊衰減或延續的速度"],
      ["政策反應係數", "政策規則", "政策工具對衝擊的回應強度"]
    ],
    note: "此圖是衝擊反應路徑示意，不代表特定估計係數；實際模型需以資料估計並檢定。"
  },

  "nobel-02": {
    title: "一般均衡與福利：箱形圖中的交換效率",
    caption: "一般均衡把家計偏好、廠商技術與市場清算條件放在同一個系統中求解。圖中以 Edgeworth 箱形圖表示兩人的交換經濟：預算線通過初始稟賦 E，兩人的無異曲線在此相切；所有相切點連成契約曲線，代表帕雷托效率配置。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-02-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-02-title">Edgeworth 箱形圖與契約曲線</title>
  <rect class="dg-panel" x="130" y="55" width="400" height="250" rx="4"></rect>
  <path class="dg-curve" d="M 155 285 C 220 230 285 205 330 175 S 445 95 505 75"></path>
  <path class="dg-curve-soft" d="M 190 255 C 250 200 290 175 330 190 C 370 205 410 240 440 285"></path>
  <path class="dg-curve-soft" d="M 200 95 C 250 140 290 170 330 190 C 370 210 410 230 455 260"></path>
  <line class="dg-guide" x1="190" y1="260" x2="470" y2="120"></line>
  <circle class="dg-point" cx="330" cy="190" r="5"></circle>
  <text class="dg-label-sm" x="116" y="324">O<tspan class="dg-sub" dy="3">A</tspan></text>
  <text class="dg-label-sm" x="538" y="50">O<tspan class="dg-sub" dy="3">B</tspan></text>
  <text class="dg-label-sm" x="280" y="334">A 的消費組合 →</text>
  <text class="dg-label-sm" x="350" y="44">B 的消費組合 ←</text>
  <text class="dg-label-sm" x="395" y="102">契約曲線</text>
  <text class="dg-label-sm" x="408" y="148">預算線</text>
  <text class="dg-label" x="342" y="184">E</text>
</svg>`,
    variables: [
      ["x_A, y_A", "A 的消費組合", "家計 A 對兩種財貨的消費"],
      ["x_B, y_B", "B 的消費組合", "家計 B 對兩種財貨的消費"],
      ["p", "相對價格", "預算線斜率所反映的財貨交換比率"]
    ],
    parameters: [
      ["初始稟賦", "E 的位置", "兩人進入交換前的資源配置"],
      ["偏好", "無異曲線形狀", "邊際替代率與風險態度"],
      ["技術與資源", "可行配置集合", "生產可能與總資源限制"]
    ],
    note: "箱形圖為概念示意；契約曲線上的點均具帕雷托效率，但效率不必然代表分配公平。"
  },

  "nobel-03": {
    title: "投入產出與國民會計：產業間的流量網路",
    caption: "Leontief 用投入產出表描述各產業互相依賴的中間投入；Stone 則把國民所得、消費、投資與政府支出整合成可比較的 SNA。圖中的箭頭表示產業間交易與最終需求，任何一個部門的產出變動都會沿著網路傳導。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-03-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-03-title">投入產出與最終需求的流量圖</title>
  <defs>
    <marker id="dg-nobel-03-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="55" y="70" width="140" height="72" rx="10"></rect>
  <text class="dg-label" x="125" y="100" text-anchor="middle">農業</text>
  <text class="dg-label-sm" x="125" y="122" text-anchor="middle">初級生產</text>
  <rect class="dg-box" x="250" y="70" width="140" height="72" rx="10"></rect>
  <text class="dg-label" x="320" y="100" text-anchor="middle">工業</text>
  <text class="dg-label-sm" x="320" y="122" text-anchor="middle">中間財製造</text>
  <rect class="dg-box" x="445" y="70" width="140" height="72" rx="10"></rect>
  <text class="dg-label" x="515" y="100" text-anchor="middle">服務業</text>
  <text class="dg-label-sm" x="515" y="122" text-anchor="middle">生產性服務</text>
  <rect class="dg-box" x="250" y="248" width="140" height="62" rx="10"></rect>
  <text class="dg-label" x="320" y="276" text-anchor="middle">最終需求</text>
  <text class="dg-label-sm" x="320" y="298" text-anchor="middle">消費、投資、出口</text>
  <line class="dg-arrow" x1="195" y1="106" x2="242" y2="106" marker-end="url(#dg-nobel-03-arrow)"></line>
  <line class="dg-arrow" x1="390" y1="106" x2="437" y2="106" marker-end="url(#dg-nobel-03-arrow)"></line>
  <path class="dg-arrow" d="M 125 142 C 125 205 215 232 288 242" marker-end="url(#dg-nobel-03-arrow)"></path>
  <line class="dg-arrow" x1="320" y1="142" x2="320" y2="240" marker-end="url(#dg-nobel-03-arrow)"></line>
  <path class="dg-arrow" d="M 515 142 C 515 205 425 232 352 242" marker-end="url(#dg-nobel-03-arrow)"></path>
  <text class="dg-label-sm" x="207" y="96">中間投入</text>
  <text class="dg-label-sm" x="335" y="226">最終使用</text>
  <text class="dg-label" x="320" y="340" text-anchor="middle">(I − A)X = F</text>
</svg>`,
    variables: [
      ["X", "各部門產出向量", "每個產業的總產出"],
      ["A", "投入係數矩陣", "生產一單位產出所需的中間投入"],
      ["F", "最終需求向量", "消費、投資、政府支出與出口"]
    ],
    parameters: [
      ["技術係數", "A 的元素", "產業間的固定投入比例"],
      ["Leontief 反矩陣", "(I − A)⁻¹", "最終需求變動對總產出的乘數效果"],
      ["會計恆等式", "SNA 架構", "生產、所得與支出面的統計一致性"]
    ],
    note: "方塊是產業與最終需求的簡化；實際投入產出表通常有數十個部門與進口矩陣。"
  },

  "nobel-04": {
    title: "貨幣、自然利率與預期：長短期的兩張圖",
    caption: "左圖以可貸資金市場表示自然利率 r_n：儲蓄與投資在自然利率相等。右圖是菲利浦曲線：短期通膨與失業有替代關係，但預期調整後，長期曲線在自然失業率 u_n 垂直。Hayek 的自然利率、Friedman 的通膨預期、Lucas 的政策預期、Phelps 的長期垂直曲線與 Kydland–Prescott 的時間不一致，都沿著這個架構討論。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-04-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-04-title">自然利率與長短期菲利浦曲線</title>
  <line class="dg-axis" x1="50" y1="290" x2="300" y2="290"></line>
  <line class="dg-axis" x1="50" y1="290" x2="50" y2="55"></line>
  <line class="dg-axis" x1="350" y1="290" x2="600" y2="290"></line>
  <line class="dg-axis" x1="350" y1="290" x2="350" y2="55"></line>
  <text class="dg-label-sm" x="245" y="316">可貸資金 Q</text>
  <text class="dg-label-sm" x="58" y="44">利率 r</text>
  <text class="dg-label-sm" x="560" y="316">失業率 u</text>
  <text class="dg-label-sm" x="358" y="44">通膨 π</text>
  <line class="dg-curve" x1="75" y1="255" x2="275" y2="90"></line>
  <line class="dg-curve-alt" x1="75" y1="105" x2="275" y2="260"></line>
  <line class="dg-guide" x1="168.75" y1="285" x2="168.75" y2="177.66"></line>
  <line class="dg-guide" x1="55" y1="177.66" x2="168.75" y2="177.66"></line>
  <circle class="dg-point" cx="168.75" cy="177.66" r="4"></circle>
  <text class="dg-label-sm" x="242" y="84">儲蓄 S</text>
  <text class="dg-label-sm" x="242" y="252">投資 I</text>
  <text class="dg-label-sm" x="58" y="169">rₙ</text>
  <path class="dg-curve" d="M 370 100 C 420 130 455 165 510 195 S 565 225 590 240"></path>
  <line class="dg-curve-alt" x1="485" y1="85" x2="485" y2="285"></line>
  <text class="dg-label-sm" x="494" y="104">LRPC</text>
  <text class="dg-label-sm" x="500" y="158">SRPC</text>
  <text class="dg-label-sm" x="445" y="314">uₙ</text>
  <line class="dg-guide" x1="485" y1="285" x2="485" y2="180.26"></line>
  <circle class="dg-point" cx="485" cy="180.26" r="4"></circle>
  <text class="dg-label-sm" x="400" y="70">預期通膨 ↑</text>
  <path class="dg-arrow" d="M 455 82 C 465 120 470 150 480 178"></path>
</svg>`,
    variables: [
      ["r, r_n", "市場利率／自然利率", "資金供需與儲蓄—投資平衡的利率"],
      ["π, πᵉ", "通膨／預期通膨", "實際物價上漲率與主觀預期"],
      ["u, u_n", "失業／自然失業率", "景氣循環失業與長期均衡失業"]
    ],
    parameters: [
      ["儲蓄與投資彈性", "可貸資金曲線斜率", "利率對資金供需的反應"],
      ["預期調整速度", "菲利浦曲線移動", "通膨預期追上實際通膨的速度"],
      ["時間不一致性", "政策承諾", "政策制定者事後改變誘因的強度"]
    ],
    note: "此圖把多個貨幣與預期模型放在同一組概念圖中；不是說所有獎項共用同一個方程式。"
  },

  "nobel-05": {
    title: "線性規劃與影子價格：限制下的最適選擇",
    caption: "Kantorovich 與 Koopmans 把資源配置寫成線性規劃：在技術與資源限制下最大化目標函數。最適解通常落在可行區域的頂點；當某項資源放寬一單位時，目標函數增加的邊際價值就是影子價格，可用來判斷資源的稀缺程度。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-05-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-05-title">線性規劃的可行區域與影子價格</title>
  <line class="dg-axis" x1="80" y1="300" x2="600" y2="300"></line>
  <line class="dg-axis" x1="80" y1="300" x2="80" y2="55"></line>
  <text class="dg-label-sm" x="548" y="326">x₁</text>
  <text class="dg-label-sm" x="88" y="44">x₂</text>
  <polygon class="dg-panel" points="80,280 80,165 235,105 390,155 445,300 80,300"></polygon>
  <line class="dg-guide" x1="80" y1="165" x2="390" y2="155"></line>
  <line class="dg-guide" x1="235" y1="105" x2="445" y2="300"></line>
  <path class="dg-curve" d="M 150 300 L 330 120"></path>
  <path class="dg-curve-soft" d="M 220 300 L 400 120"></path>
  <circle class="dg-point" cx="235" cy="105" r="5"></circle>
  <text class="dg-label" x="246" y="98">最適解</text>
  <text class="dg-label-sm" x="400" y="135">等利潤線 cᵀx</text>
  <text class="dg-label-sm" x="300" y="86">資源限制 A x ≤ b</text>
  <text class="dg-label-sm" x="470" y="250">影子價格 λ</text>
  <path class="dg-arrow" d="M 465 238 L 420 188"></path>
</svg>`,
    variables: [
      ["x₁, x₂", "決策變數", "兩種商品或活動的生產數量"],
      ["c", "目標係數", "每單位活動帶來的利潤或效用"],
      ["b", "資源上限", "勞動、資本或原料的可用數量"]
    ],
    parameters: [
      ["A", "技術係數矩陣", "每單位活動消耗的資源"],
      ["可行區域", "限制條件的交集", "所有同時滿足資源限制的組合"],
      ["λ", "影子價格", "放寬一單位限制對目標值的邊際貢獻"]
    ],
    note: "圖為二維線性規劃示意；最適解可能落在頂點、邊界或整條等利潤線重合的邊上。"
  },

  "nobel-06": {
    title: "開放經濟：貿易利益與不可能三角",
    caption: "左圖用生產可能曲線與世界價格線說明比較利益：本國在生產點 P 專業化，透過貿易到達較高的消費點 C。右圖是 Mundell–Fleming 的不可能三角：資本自由流動、固定匯率與貨幣政策獨立三者最多同時達成兩項。Ohlin、Meade 與 Krugman 分別從要素稟賦、國際資本流動與規模經濟補充這個架構。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-06-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-06-title">貿易利益與不可能三角</title>
  <line class="dg-axis" x1="55" y1="290" x2="320" y2="290"></line>
  <line class="dg-axis" x1="55" y1="290" x2="55" y2="60"></line>
  <text class="dg-label-sm" x="270" y="316">商品 X</text>
  <text class="dg-label-sm" x="63" y="50">商品 Y</text>
  <path class="dg-curve" d="M 75 260 C 145 220 185 150 255 112 C 285 95 300 90 315 88"></path>
  <line class="dg-curve-alt" x1="80" y1="205" x2="310" y2="82"></line>
  <line class="dg-guide" x1="255" y1="112" x2="255" y2="290"></line>
  <line class="dg-guide" x1="55" y1="112" x2="255" y2="112"></line>
  <circle class="dg-point" cx="255" cy="112" r="4"></circle>
  <circle class="dg-point" cx="205" cy="138.15" r="4"></circle>
  <text class="dg-label-sm" x="263" y="108">P 生產</text>
  <text class="dg-label-sm" x="175" y="155">C 消費</text>
  <text class="dg-label-sm" x="215" y="78">世界價格線</text>
  <text class="dg-label-sm" x="72" y="276">PPF</text>
  <text class="dg-label" x="470" y="86" text-anchor="middle">不可能三角</text>
  <line class="dg-axis" x1="470" y1="105" x2="390" y2="270"></line>
  <line class="dg-axis" x1="470" y1="105" x2="550" y2="270"></line>
  <line class="dg-axis" x1="390" y1="270" x2="550" y2="270"></line>
  <text class="dg-label-sm" x="470" y="100" text-anchor="middle">資本自由流動</text>
  <text class="dg-label-sm" x="386" y="294" text-anchor="middle">固定匯率</text>
  <text class="dg-label-sm" x="554" y="294" text-anchor="middle">貨幣政策獨立</text>
  <text class="dg-label-sm" x="470" y="205" text-anchor="middle">只能選兩項</text>
  <text class="dg-label-sm" x="470" y="232" text-anchor="middle">放棄第三項</text>
</svg>`,
    variables: [
      ["X, Y", "兩種商品", "貿易模型的產出與消費組合"],
      ["P, C", "生產點／消費點", "專業化生產與貿易後的消費"],
      ["e, i", "匯率／利率", "開放經濟的政策工具與價格"]
    ],
    parameters: [
      ["要素稟賦", "比較利益來源", "勞動、資本與技術的相對豐裕程度"],
      ["世界價格", "貿易條件", "國際市場決定的交換比率"],
      ["資本移動性", "政策三角限制", "資本自由流動與匯率制度的一致性"]
    ],
    note: "左圖與右圖是兩個不同模型的概念示意；同一張圖用來說明開放經濟的兩個核心取捨。"
  },

  "nobel-07": {
    title: "成長、創新與氣候：技術迴路與外部性",
    caption: "Solow 指出長期成長主要來自技術進步；Romer 把研發與知識內生化；Nordhaus 的 DICE 模型把氣候損害回饋到產出；Aghion 與 Howitt 則以創造性破壞描述新技術取代舊技術。圖中研發提升技術 A，技術推動產出 Y，但產出也帶來排放 E 與氣候損害 D，形成負向回饋。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-07-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-07-title">研發、技術、產出與氣候損害的迴路</title>
  <defs>
    <marker id="dg-nobel-07-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="55" y="70" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="127" y="98" text-anchor="middle">研發與知識</text>
  <text class="dg-label-sm" x="127" y="119" text-anchor="middle">R＆D、教育</text>
  <rect class="dg-box" x="250" y="70" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="322" y="98" text-anchor="middle">技術 A</text>
  <text class="dg-label-sm" x="322" y="119" text-anchor="middle">生產力、創新</text>
  <rect class="dg-box" x="445" y="70" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="517" y="98" text-anchor="middle">產出 Y</text>
  <text class="dg-label-sm" x="517" y="119" text-anchor="middle">消費與投資</text>
  <rect class="dg-box" x="445" y="225" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="517" y="253" text-anchor="middle">排放 E</text>
  <text class="dg-label-sm" x="517" y="274" text-anchor="middle">溫室氣體</text>
  <rect class="dg-box" x="250" y="225" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="322" y="253" text-anchor="middle">氣候損害 D</text>
  <text class="dg-label-sm" x="322" y="274" text-anchor="middle">減損產出與福利</text>
  <rect class="dg-box" x="55" y="225" width="145" height="66" rx="10"></rect>
  <text class="dg-label" x="127" y="253" text-anchor="middle">政策</text>
  <text class="dg-label-sm" x="127" y="274" text-anchor="middle">碳價、補貼、研發</text>
  <line class="dg-arrow" x1="200" y1="103" x2="242" y2="103" marker-end="url(#dg-nobel-07-arrow)"></line>
  <line class="dg-arrow" x1="395" y1="103" x2="437" y2="103" marker-end="url(#dg-nobel-07-arrow)"></line>
  <line class="dg-arrow" x1="517" y1="136" x2="517" y2="217" marker-end="url(#dg-nobel-07-arrow)"></line>
  <line class="dg-arrow" x1="445" y1="258" x2="403" y2="258" marker-end="url(#dg-nobel-07-arrow)"></line>
  <path class="dg-arrow" d="M 322 225 C 322 170 390 145 437 128" marker-end="url(#dg-nobel-07-arrow)"></path>
  <path class="dg-arrow" d="M 127 225 C 127 180 220 160 242 145" marker-end="url(#dg-nobel-07-arrow)"></path>
  <text class="dg-label-sm" x="205" y="92">投資</text>
  <text class="dg-label-sm" x="400" y="92">採用</text>
  <text class="dg-label-sm" x="525" y="178">排放</text>
  <text class="dg-label-sm" x="355" y="178">損害回饋</text>
  <text class="dg-label-sm" x="135" y="190">政策矯正</text>
</svg>`,
    variables: [
      ["A", "技術水準", "研發、知識累積與創新採用"],
      ["Y", "產出", "受技術、資本與勞動影響的總產出"],
      ["E, D", "排放／氣候損害", "生產的外部成本與福利損失"]
    ],
    parameters: [
      ["研發報酬", "創新彈性", "研發投入轉化為技術進步的效率"],
      ["損害係數", "氣候回饋", "升溫對產出與效用的邊際傷害"],
      ["折現率", "跨期福利", "氣候政策評估中未來損害的現值權重"]
    ],
    note: "此圖是技術與氣候外部性的概念迴路；1971 庫茲涅茨曲線屬分配面假說，未畫在同一條路徑上。"
  },

  "nobel-08": {
    title: "資產組合、系統性風險與 Tobin Q",
    caption: "左圖是 Markowitz 的效率前緣與 Sharpe 的資本市場線：投資人可用分散降低非系統性風險，但無法消除系統性風險；市場組合 M 的預期報酬由 β 決定。右圖是 Tobin Q：當企業市場價值高於重置成本（q > 1），擴張實體投資才有吸引力。Merton–Scholes 的選擇權定價與 Fama–Hansen–Shiller 的資產價格實證，則分別處理衍生品與長期報酬的可預測性。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-08-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-08-title">效率前緣、資本市場線與 Tobin Q</title>
  <line class="dg-axis" x1="55" y1="290" x2="315" y2="290"></line>
  <line class="dg-axis" x1="55" y1="290" x2="55" y2="55"></line>
  <text class="dg-label-sm" x="250" y="316">風險 σ</text>
  <text class="dg-label-sm" x="63" y="44">E(R)</text>
  <path class="dg-curve" d="M 85 260 C 130 205 175 165 220 135 C 255 112 285 100 310 96"></path>
  <line class="dg-curve-alt" x1="60" y1="258" x2="305" y2="66.76"></line>
  <circle class="dg-point" cx="187.37" cy="158.58" r="5"></circle>
  <text class="dg-label-sm" x="196" y="147">M</text>
  <text class="dg-label-sm" x="246" y="134">效率前緣</text>
  <text class="dg-label-sm" x="252" y="92">CML</text>
  <text class="dg-label-sm" x="62" y="274">R<tspan class="dg-sub" dy="3">f</tspan></text>
  <text class="dg-label-sm" x="180" y="328">β 決定系統性風險補償</text>
  <line class="dg-axis" x1="370" y1="290" x2="610" y2="290"></line>
  <line class="dg-axis" x1="370" y1="290" x2="370" y2="55"></line>
  <text class="dg-label-sm" x="540" y="316">Tobin q</text>
  <text class="dg-label-sm" x="378" y="44">投資 I</text>
  <line class="dg-guide" x1="490" y1="290" x2="490" y2="65"></line>
  <path class="dg-curve" d="M 380 278 C 430 272 470 250 500 205 C 530 160 555 120 585 105"></path>
  <text class="dg-label-sm" x="497" y="82">q = 1</text>
  <text class="dg-label-sm" x="515" y="150">q &gt; 1 擴張</text>
  <text class="dg-label-sm" x="395" y="245">q &lt; 1 緊縮</text>
</svg>`,
    variables: [
      ["E(R), σ", "預期報酬／風險", "資產組合的報酬與標準差"],
      ["β", "系統性風險", "資產對市場組合波動的敏感度"],
      ["q", "Tobin Q", "企業市場價值除以重置成本"]
    ],
    parameters: [
      ["R_f", "無風險利率", "資本市場線的截距"],
      ["E(R_m)", "市場預期報酬", "市場組合的報酬"],
      ["重置成本", "實體資本成本", "q 的分母，影響投資誘因"]
    ],
    note: "左圖與右圖是兩個資產市場模型；Black–Scholes 的選擇權到期報酬圖另見第 13 章模型圖。"
  },

  "nobel-09": {
    title: "資訊不對稱、契約與機制設計：從檸檬市場到誘因相容",
    caption: "Akerlof 的檸檬市場說明隱藏品質會造成逆向選擇；Spence 的信號與 Stiglitz 的篩選可用來緩解資訊差距。Mirrlees–Vickrey、Hurwicz–Maskin–Myerson 與 Hart–Holmström 則把問題推進到最適契約與機制設計：制度必須讓自利個體願意揭露資訊、採取行動，並在效率與租金之間取捨。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-09-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-09-title">資訊不對稱、契約與機制設計</title>
  <defs>
    <marker id="dg-nobel-09-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="55" y="125" width="155" height="74" rx="10"></rect>
  <text class="dg-label" x="132" y="153" text-anchor="middle">隱藏資訊</text>
  <text class="dg-label-sm" x="132" y="176" text-anchor="middle">品質、類型、行動</text>
  <rect class="dg-box" x="260" y="65" width="145" height="64" rx="10"></rect>
  <text class="dg-label" x="332" y="92" text-anchor="middle">逆向選擇</text>
  <text class="dg-label-sm" x="332" y="113" text-anchor="middle">交易前隱藏類型</text>
  <rect class="dg-box" x="260" y="195" width="145" height="64" rx="10"></rect>
  <text class="dg-label" x="332" y="222" text-anchor="middle">道德風險</text>
  <text class="dg-label-sm" x="332" y="243" text-anchor="middle">交易後隱藏行動</text>
  <rect class="dg-box" x="455" y="65" width="145" height="64" rx="10"></rect>
  <text class="dg-label" x="527" y="92" text-anchor="middle">訊號／篩選</text>
  <text class="dg-label-sm" x="527" y="113" text-anchor="middle">揭露或測試類型</text>
  <rect class="dg-box" x="455" y="195" width="145" height="64" rx="10"></rect>
  <text class="dg-label" x="527" y="222" text-anchor="middle">契約／誘因</text>
  <text class="dg-label-sm" x="527" y="243" text-anchor="middle">獎酬與監督</text>
  <rect class="dg-panel" x="235" y="292" width="210" height="44" rx="8"></rect>
  <text class="dg-label-sm" x="340" y="319" text-anchor="middle">效率、租金與福利的取捨</text>
  <line class="dg-arrow" x1="210" y1="148" x2="252" y2="112" marker-end="url(#dg-nobel-09-arrow)"></line>
  <line class="dg-arrow" x1="210" y1="178" x2="252" y2="214" marker-end="url(#dg-nobel-09-arrow)"></line>
  <line class="dg-arrow" x1="405" y1="97" x2="447" y2="97" marker-end="url(#dg-nobel-09-arrow)"></line>
  <line class="dg-arrow" x1="405" y1="227" x2="447" y2="227" marker-end="url(#dg-nobel-09-arrow)"></line>
  <path class="dg-arrow" d="M 527 259 L 527 284" marker-end="url(#dg-nobel-09-arrow)"></path>
  <path class="dg-arrow" d="M 332 259 L 332 284" marker-end="url(#dg-nobel-09-arrow)"></path>
</svg>`,
    variables: [
      ["類型 θ", "隱藏資訊", "交易一方知道、另一方不知道的品質或成本"],
      ["行動 a", "隱藏行動", "簽約後難以觀察的努力程度"],
      ["契約", "誘因安排", "價格、獎酬、篩選或拍賣規則"]
    ],
    parameters: [
      ["資訊不對稱程度", "類型分布", "高品質與低品質出現的機率"],
      ["外部選項", "參與限制", "交易對手不簽約時可得的效用"],
      ["誘因相容", "自利下的揭露", "讓個體願意說真話或努力工作的條件"]
    ],
    note: "各獎項處理的資訊摩擦不同；此圖只整理共同邏輯。Coase 定理則指出交易成本為零時，產權初始分配不影響效率。"
  },

  "nobel-10": {
    title: "賽局、重複互動與合作：納許均衡與配對",
    caption: "Nash 提出非合作賽局的均衡概念；Harsanyi 與 Selten 把不完全資訊與動態策略納入分析；Aumann 與 Schelling 用重複賽局說明合作與可信威脅；Roth 與 Shapley 則把穩定配對演算法應用到醫學生實習與器官交換。左側報酬矩陣中，(背叛, 背叛) 是納許均衡，但重複互動可能讓 (合作, 合作) 成為可維持的結果。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-10-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-10-title">納許均衡報酬矩陣與重複賽局合作</title>
  <text class="dg-label-sm" x="235" y="52" text-anchor="middle">玩家 B</text>
  <text class="dg-label-sm" x="130" y="82" text-anchor="middle">合作</text>
  <text class="dg-label-sm" x="340" y="82" text-anchor="middle">背叛</text>
  <text class="dg-label-sm" x="48" y="160" transform="rotate(-90 48 160)">玩家 A</text>
  <text class="dg-label-sm" x="82" y="135" text-anchor="middle">合作</text>
  <text class="dg-label-sm" x="82" y="235" text-anchor="middle">背叛</text>
  <rect class="dg-panel" x="130" y="100" width="130" height="80" rx="4"></rect>
  <rect class="dg-panel" x="270" y="100" width="130" height="80" rx="4"></rect>
  <rect class="dg-panel" x="130" y="190" width="130" height="80" rx="4"></rect>
  <rect class="dg-box" x="270" y="190" width="130" height="80" rx="4"></rect>
  <text class="dg-label" x="195" y="134" text-anchor="middle">3, 3</text>
  <text class="dg-label-sm" x="195" y="156" text-anchor="middle">合作均衡</text>
  <text class="dg-label" x="335" y="134" text-anchor="middle">0, 5</text>
  <text class="dg-label-sm" x="335" y="156" text-anchor="middle">A 被利用</text>
  <text class="dg-label" x="195" y="224" text-anchor="middle">5, 0</text>
  <text class="dg-label-sm" x="195" y="246" text-anchor="middle">A 利用 B</text>
  <text class="dg-label" x="335" y="224" text-anchor="middle">1, 1</text>
  <text class="dg-label-sm" x="335" y="246" text-anchor="middle">納許均衡</text>
  <text class="dg-label-sm" x="430" y="128">重複賽局：</text>
  <text class="dg-label-sm" x="430" y="150">合作可被維持</text>
  <text class="dg-label-sm" x="430" y="174">若未來足夠重要</text>
  <path class="dg-arrow" d="M 430 192 C 470 210 500 220 535 230"></path>
  <text class="dg-label-sm" x="430" y="260">穩定配對／拍賣：</text>
  <text class="dg-label-sm" x="430" y="282">演算法與市場設計</text>
  <text class="dg-label-sm" x="430" y="304">處理無價格市場</text>
</svg>`,
    variables: [
      ["s_i", "玩家 i 的策略", "合作、背叛或其他行動"],
      ["u_i", "玩家 i 的報酬", "策略組合帶來的效用"],
      ["δ", "折現因子", "重複互動中未來報酬的權重"]
    ],
    parameters: [
      ["報酬結構", "賽局類型", "合作、協調或衝突的誘因"],
      ["資訊結構", "完全／不完全", "玩家是否知道對手類型與歷史"],
      ["配對規則", "市場設計", "穩定配對演算法的優先順序"]
    ],
    note: "報酬數字是囚徒困境的標準示意；不同賽局的均衡與合作條件可能完全不同。"
  },

  "nobel-11": {
    title: "有限理性與展望理論：參考點、損失趨避與滿意化",
    caption: "Simon 認為決策者受認知限制，追求「滿意」而非全域最佳；Allais 悖論顯示人們違反期望效用理論的獨立性公理；Kahneman 與 Tversky 的前景理論以參考點、損失趨避與機率加權描述選擇；Thaler 進一步把心理帳戶、現時偏誤與推力帶進政策設計。圖中的價值函數在獲利區凹、損失區凸，且損失斜率較陡。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-11-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-11-title">展望理論的價值函數與損失趨避</title>
  <line class="dg-axis" x1="80" y1="180" x2="590" y2="180"></line>
  <line class="dg-axis" x1="320" y1="305" x2="320" y2="50"></line>
  <text class="dg-label-sm" x="548" y="206">獲利</text>
  <text class="dg-label-sm" x="92" y="206">損失</text>
  <text class="dg-label-sm" x="330" y="46">價值 v(x)</text>
  <line class="dg-guide" x1="320" y1="70" x2="320" y2="292"></line>
  <path class="dg-curve" d="M 100 290 C 180 260 260 220 320 180 C 380 140 460 100 540 70"></path>
  <text class="dg-label-sm" x="330" y="168">參考點</text>
  <text class="dg-label-sm" x="150" y="250">損失區較陡</text>
  <text class="dg-label-sm" x="410" y="118">獲利區較平</text>
  <rect class="dg-panel" x="415" y="235" width="170" height="66" rx="8"></rect>
  <text class="dg-label-sm" x="500" y="258" text-anchor="middle">Simon：滿意化</text>
  <text class="dg-label-sm" x="500" y="280" text-anchor="middle">接受門檻以上的方案</text>
</svg>`,
    variables: [
      ["x", "相對於參考點的損益", "獲利或損失的金額"],
      ["v(x)", "主觀價值", "展望理論的價值函數"],
      ["p", "機率", "事件發生的主觀或客觀機率"]
    ],
    parameters: [
      ["λ", "損失趨避係數", "損失斜率相對獲利斜率的倍數"],
      ["參考點", "評價基準", "薪資、現狀或預期水準"],
      ["機率加權", "小機率與大機率", "人們對極端機率的過度或不足反應"]
    ],
    note: "此圖是行為經濟學的概念示意；不是所有有限理性行為都能用單一價值函數解釋。"
  },

  "nobel-12": {
    title: "勞動市場的三種摩擦：轉移、搜尋與性別參與",
    caption: "Lewis 與 Schultz 討論農業剩餘勞動轉移到現代部門的發展過程；Diamond、Mortensen 與 Pissarides 的 DMP 模型以搜尋與配對摩擦解釋失業與職缺同時存在；Goldin 則以歷史資料指出女性勞動參與率呈 U 型，並以「貪婪工作」與育兒懲罰解釋當代薪資差距。三張小圖分別示意這三個機制。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-12-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-12-title">勞動轉移、搜尋摩擦與女性勞動參與</title>
  <text class="dg-label-sm" x="125" y="44" text-anchor="middle">勞動轉移</text>
  <text class="dg-label-sm" x="320" y="44" text-anchor="middle">搜尋配對</text>
  <text class="dg-label-sm" x="520" y="44" text-anchor="middle">性別參與</text>
  <line class="dg-axis" x1="35" y1="290" x2="215" y2="290"></line>
  <line class="dg-axis" x1="35" y1="290" x2="35" y2="70"></line>
  <text class="dg-label-sm" x="80" y="82">農業</text>
  <text class="dg-label-sm" x="80" y="235">工業</text>
  <path class="dg-arrow" d="M 125 100 L 125 218"></path>
  <text class="dg-label-sm" x="135" y="155">剩餘勞動</text>
  <text class="dg-label-sm" x="48" y="170">w̄</text>
  <line class="dg-axis" x1="245" y1="290" x2="405" y2="290"></line>
  <line class="dg-axis" x1="245" y1="290" x2="245" y2="70"></line>
  <text class="dg-label-sm" x="320" y="316">失業 u</text>
  <text class="dg-label-sm" x="253" y="60">職缺 v</text>
  <path class="dg-curve" d="M 265 95 C 295 130 325 175 385 255"></path>
  <text class="dg-label-sm" x="330" y="150">Beveridge</text>
  <text class="dg-label-sm" x="330" y="170">曲線</text>
  <line class="dg-axis" x1="445" y1="290" x2="610" y2="290"></line>
  <line class="dg-axis" x1="445" y1="290" x2="445" y2="70"></line>
  <text class="dg-label-sm" x="520" y="316">發展階段</text>
  <text class="dg-label-sm" x="453" y="60">FLFP</text>
  <path class="dg-curve" d="M 465 120 C 500 210 540 250 585 135"></path>
  <text class="dg-label-sm" x="500" y="100">U 型</text>
</svg>`,
    variables: [
      ["L", "勞動數量", "農業與工業部門的就業移轉"],
      ["u, v", "失業／職缺", "搜尋市場中同時存在的閒置資源"],
      ["FLFP", "女性勞動參與率", "女性投入勞動市場的比例"]
    ],
    parameters: [
      ["工資差距", "部門間誘因", "農業與現代部門的工資差異"],
      ["配對效率", "搜尋摩擦", "失業者與職缺相遇的機率"],
      ["結構轉變", "服務業與教育", "影響女性參與的長期因素"]
    ],
    note: "三張小圖分別示意不同勞動市場機制，並非同一條計量模型；Goldin 的 U 型是歷史觀察，不是普遍定律。"
  },

  "nobel-13": {
    title: "銀行流動性轉換與擠兌：Diamond–Dybvig 的協調問題",
    caption: "銀行把可隨時提領的短期存款，轉換成長期、不易變現的貸款，這種流動性轉換提高了資源配置效率，卻也讓銀行暴露在擠兌風險。Diamond 與 Dybvig 證明，即使銀行資產本身健全，存款人對他人提款的預期仍可能形成自我實現的擠兌均衡；Bernanke 則研究銀行倒閉如何透過信用緊縮加深經濟衰退。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-13-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-13-title">銀行流動性轉換與擠兌風險</title>
  <defs>
    <marker id="dg-nobel-13-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="180" y="80" width="280" height="150" rx="12"></rect>
  <line class="dg-guide" x1="320" y1="92" x2="320" y2="218"></line>
  <text class="dg-label" x="250" y="110" text-anchor="middle">資產</text>
  <text class="dg-label" x="390" y="110" text-anchor="middle">負債</text>
  <text class="dg-label-sm" x="250" y="145" text-anchor="middle">長期貸款</text>
  <text class="dg-label-sm" x="250" y="168" text-anchor="middle">不易變現</text>
  <text class="dg-label-sm" x="390" y="145" text-anchor="middle">短期存款</text>
  <text class="dg-label-sm" x="390" y="168" text-anchor="middle">可隨時提領</text>
  <text class="dg-label-sm" x="320" y="200" text-anchor="middle">流動性轉換</text>
  <text class="dg-label-sm" x="70" y="120">存款人</text>
  <path class="dg-arrow" d="M 110 145 C 130 160 150 170 172 174" marker-end="url(#dg-nobel-13-arrow)"></path>
  <rect class="dg-box" x="500" y="80" width="105" height="62" rx="9"></rect>
  <text class="dg-label-sm" x="552" y="106" text-anchor="middle">資產賤售</text>
  <text class="dg-label-sm" x="552" y="126" text-anchor="middle">損失擴大</text>
  <path class="dg-arrow" d="M 460 135 C 475 125 486 115 492 108" marker-end="url(#dg-nobel-13-arrow)"></path>
  <text class="dg-label-sm" x="470" y="158">擠兌</text>
  <rect class="dg-box" x="500" y="210" width="105" height="62" rx="9"></rect>
  <text class="dg-label-sm" x="552" y="236" text-anchor="middle">信用緊縮</text>
  <text class="dg-label-sm" x="552" y="256" text-anchor="middle">加深衰退</text>
  <path class="dg-arrow" d="M 552 142 L 552 202" marker-end="url(#dg-nobel-13-arrow)"></path>
  <rect class="dg-panel" x="180" y="278" width="280" height="46" rx="9"></rect>
  <text class="dg-label-sm" x="320" y="306" text-anchor="middle">存款保險／最後貸款者：降低擠兌誘因</text>
</svg>`,
    variables: [
      ["存款", "短期負債", "存款人可隨時提取的請求權"],
      ["貸款", "長期資產", "銀行持有但不易快速變現的資產"],
      ["流動性", "變現能力", "銀行應付提款與資產處分的難易"]
    ],
    parameters: [
      ["清算成本", "資產賤售", "提前變現造成的價值損失"],
      ["存款人信心", "協調預期", "他人是否提款的預期"],
      ["存款保險", "政策工具", "降低擠兌誘因的制度安排"]
    ],
    note: "圖為銀行資產負債與擠兌傳染的概念示意；Diamond–Dybvig 的完整模型含兩期消費與多重均衡。"
  },

  "nobel-14": {
    title: "因果推論與隨機實驗：從選擇偏誤到 ATE",
    caption: "Heckman 與 McFadden 處理樣本選擇與離散選擇；Banerjee、Duflo 與 Kremer 把隨機對照試驗帶進發展經濟學；Card、Angrist 與 Imbens 則以自然實驗、雙重差分與工具變數估計政策效果。圖中隨機分派讓處理組與對照組在期望上可比，兩組結果之差即為平均處理效果 ATE。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-14-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-14-title">隨機分派、處理組與對照組的因果推論</title>
  <defs>
    <marker id="dg-nobel-14-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="245" y="55" width="150" height="58" rx="10"></rect>
  <text class="dg-label" x="320" y="80" text-anchor="middle">隨機分派</text>
  <text class="dg-label-sm" x="320" y="100" text-anchor="middle">RCT／自然實驗</text>
  <rect class="dg-box" x="90" y="170" width="170" height="70" rx="10"></rect>
  <text class="dg-label" x="175" y="198" text-anchor="middle">處理組</text>
  <text class="dg-label-sm" x="175" y="220" text-anchor="middle">D = 1</text>
  <rect class="dg-box" x="380" y="170" width="170" height="70" rx="10"></rect>
  <text class="dg-label" x="465" y="198" text-anchor="middle">對照組</text>
  <text class="dg-label-sm" x="465" y="220" text-anchor="middle">D = 0</text>
  <line class="dg-arrow" x1="280" y1="113" x2="190" y2="162" marker-end="url(#dg-nobel-14-arrow)"></line>
  <line class="dg-arrow" x1="360" y1="113" x2="450" y2="162" marker-end="url(#dg-nobel-14-arrow)"></line>
  <rect class="dg-panel" x="100" y="270" width="150" height="48" rx="8"></rect>
  <text class="dg-label-sm" x="175" y="300" text-anchor="middle">Y(1)</text>
  <rect class="dg-panel" x="390" y="270" width="150" height="48" rx="8"></rect>
  <text class="dg-label-sm" x="465" y="300" text-anchor="middle">Y(0)</text>
  <line class="dg-arrow" x1="175" y1="240" x2="175" y2="262" marker-end="url(#dg-nobel-14-arrow)"></line>
  <line class="dg-arrow" x1="465" y1="240" x2="465" y2="262" marker-end="url(#dg-nobel-14-arrow)"></line>
  <text class="dg-label-sm" x="320" y="300" text-anchor="middle">ATE = E[Y(1) − Y(0)]</text>
  <text class="dg-label-sm" x="320" y="330" text-anchor="middle">關鍵：處理組與對照組在期望上可比</text>
</svg>`,
    variables: [
      ["D", "處理變數", "是否接受政策、課程或補助"],
      ["Y(1), Y(0)", "潛在結果", "接受與未接受處理時的結果"],
      ["Z", "工具變數", "影響處理但不直接影響結果的外生變動"]
    ],
    parameters: [
      ["隨機分派", "識別策略", "讓處理組與對照組可比"],
      ["遵循率", "實際接受處理", "被分派者是否真的接受處理"],
      ["選擇偏誤", "觀察資料問題", "未處理者與處理者的先天差異"]
    ],
    note: "ATE 是概念式寫法；實際估計需考慮遵從率、外溢效果與樣本代表性。"
  },

  "nobel-15": {
    title: "制度、公共選擇與管制：繁榮的政治經濟學",
    caption: "Stigler 的管制捕獲、Buchanan 的公共選擇、North 與 Fogel 的制度變遷、Ostrom 與 Williamson 的治理、Tirole 的誘因管制，以及 Acemoglu、Johnson 與 Robinson 的包容性制度，共同把政治與制度放進經濟分析。圖中制度安排透過產權、法治與競爭影響投資與創新，利益團體則可能透過管制捕獲把資源移向自己。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-15-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-15-title">制度、利益團體與長期成長</title>
  <defs>
    <marker id="dg-nobel-15-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="55" y="90" width="155" height="72" rx="10"></rect>
  <text class="dg-label" x="132" y="118" text-anchor="middle">制度安排</text>
  <text class="dg-label-sm" x="132" y="140" text-anchor="middle">包容性／抽取性</text>
  <rect class="dg-box" x="260" y="55" width="150" height="64" rx="10"></rect>
  <text class="dg-label" x="335" y="82" text-anchor="middle">產權、法治</text>
  <text class="dg-label-sm" x="335" y="103" text-anchor="middle">契約與競爭</text>
  <rect class="dg-box" x="260" y="165" width="150" height="64" rx="10"></rect>
  <text class="dg-label" x="335" y="192" text-anchor="middle">投資與創新</text>
  <text class="dg-label-sm" x="335" y="213" text-anchor="middle">交易成本下降</text>
  <rect class="dg-box" x="455" y="105" width="145" height="70" rx="10"></rect>
  <text class="dg-label" x="527" y="133" text-anchor="middle">長期成長</text>
  <text class="dg-label-sm" x="527" y="155" text-anchor="middle">生產力與所得</text>
  <line class="dg-arrow" x1="210" y1="115" x2="252" y2="92" marker-end="url(#dg-nobel-15-arrow)"></line>
  <line class="dg-arrow" x1="210" y1="140" x2="252" y2="188" marker-end="url(#dg-nobel-15-arrow)"></line>
  <line class="dg-arrow" x1="410" y1="92" x2="447" y2="122" marker-end="url(#dg-nobel-15-arrow)"></line>
  <line class="dg-arrow" x1="410" y1="195" x2="447" y2="158" marker-end="url(#dg-nobel-15-arrow)"></line>
  <rect class="dg-panel" x="55" y="245" width="155" height="66" rx="10"></rect>
  <text class="dg-label-sm" x="132" y="270" text-anchor="middle">利益團體</text>
  <text class="dg-label-sm" x="132" y="292" text-anchor="middle">公共選擇、投票</text>
  <path class="dg-arrow" d="M 210 270 C 260 270 290 250 320 235" marker-end="url(#dg-nobel-15-arrow)"></path>
  <text class="dg-label-sm" x="260" y="286">管制捕獲</text>
  <text class="dg-label-sm" x="455" y="220">制度品質決定</text>
  <text class="dg-label-sm" x="455" y="242">成長能否持續</text>
</svg>`,
    variables: [
      ["制度", "規則與治理", "產權、法治、政治參與與市場競爭"],
      ["租金", "利益團體所得", "管制或特權帶來的超額報酬"],
      ["成長", "長期所得", "投資、創新與生產力累積的結果"]
    ],
    parameters: [
      ["包容性", "制度品質", "多數人能否參與並分享成長"],
      ["交易成本", "治理成本", "談判、執行契約與集體行動的成本"],
      ["政治限制", "利益團體影響力", "政策被少數人捕獲的程度"]
    ],
    note: "此圖把多個制度與公共選擇理論放在同一條因果鏈；各獎項的研究層次與方法並不相同。"
  },

  "nobel-16": {
    title: "生命週期、消費平滑與福利衡量",
    caption: "Modigliani 的生命週期假說認為個人會在工作期間儲蓄、退休後動用財富，使消費相對平滑；Deaton 的近乎完美需求系統（AIDS）把價格與所得連到個別商品支出；Sen 則以可行能力與權利取捨討論貧窮與饑荒。圖中以所得、消費與儲蓄的年齡路徑呈現生命週期核心，並不表示三個獎項使用同一條曲線。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-16-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-16-title">生命週期中的所得、消費與儲蓄</title>
  <line class="dg-axis" x1="70" y1="300" x2="600" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="55"></line>
  <text class="dg-label-sm" x="555" y="326">年齡</text>
  <text class="dg-label-sm" x="78" y="44">金額</text>
  <path class="dg-curve" d="M 95 260 C 180 235 230 165 300 135 C 380 105 440 150 520 270"></path>
  <path class="dg-curve-alt" d="M 95 235 C 190 220 260 185 330 170 C 420 150 500 175 565 205"></path>
  <line class="dg-guide" x1="390" y1="80" x2="390" y2="300"></line>
  <text class="dg-label-sm" x="398" y="96">退休</text>
  <text class="dg-label-sm" x="300" y="120">所得</text>
  <text class="dg-label-sm" x="470" y="192">消費</text>
  <text class="dg-label-sm" x="170" y="205">儲蓄</text>
  <text class="dg-label-sm" x="430" y="272">負儲蓄</text>
  <rect class="dg-panel" x="400" y="50" width="190" height="54" rx="8"></rect>
  <text class="dg-label-sm" x="495" y="72" text-anchor="middle">C = αW + βY</text>
  <text class="dg-label-sm" x="495" y="92" text-anchor="middle">生命週期消費函數</text>
</svg>`,
    variables: [
      ["C", "消費", "生命週期中的平滑消費水準"],
      ["Y", "所得", "工作期間的勞動所得"],
      ["W", "財富", "過去儲蓄與資產累積"]
    ],
    parameters: [
      ["α", "財富的消費傾向", "每單位財富帶來的消費"],
      ["β", "所得的消費傾向", "每單位所得帶來的消費"],
      ["折現率", "跨期偏好", "現在消費相對於未來消費的權重"]
    ],
    note: "圖以生命週期消費平滑為主；Sen 的可行能力與 Deaton 的需求系統是不同分析層次，表格保留各自內容。"
  },

  "nobel-17": {
    title: "消費隨機漫步與新凱因斯穩定政策",
    caption: "Hall 的消費隨機漫步認為，在理性預期與永久所得概念下，消費的變動主要來自未預期的衝擊，而不是可預測的所得變化。Woodford 的新凱因斯框架則以價格僵固、跨期 IS 與菲利浦曲線描述產出缺口與通膨，並強調央行預期管理與前瞻指引的效果。左圖是消費路徑，右圖是產出缺口—通膨的政策均衡。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-nobel-17-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nobel-17-title">消費隨機漫步與新凱因斯產出缺口模型</title>
  <line class="dg-axis" x1="45" y1="290" x2="300" y2="290"></line>
  <line class="dg-axis" x1="45" y1="290" x2="45" y2="55"></line>
  <text class="dg-label-sm" x="255" y="316">時間 t</text>
  <text class="dg-label-sm" x="53" y="44">消費 Cₜ</text>
  <path class="dg-curve" d="M 65 250 L 100 250 L 100 230 L 140 230 L 140 245 L 180 245 L 180 205 L 220 205 L 220 220 L 260 220 L 260 185 L 292 185"></path>
  <text class="dg-label-sm" x="105" y="214">隨機衝擊</text>
  <text class="dg-label-sm" x="70" y="278">C(t+1) = C(t) + ε(t+1)</text>
  <text class="dg-label-sm" x="205" y="170">永久所得</text>
  <line class="dg-axis" x1="350" y1="290" x2="610" y2="290"></line>
  <line class="dg-axis" x1="350" y1="290" x2="350" y2="55"></line>
  <text class="dg-label-sm" x="560" y="316">產出缺口 x</text>
  <text class="dg-label-sm" x="358" y="44">通膨 π</text>
  <path class="dg-curve" d="M 370 105 L 590 245"></path>
  <path class="dg-curve-alt" d="M 370 255 C 445 225 515 155 590 85"></path>
  <circle class="dg-point" cx="486.79" cy="179.32" r="5"></circle>
  <text class="dg-label-sm" x="385" y="96">IS</text>
  <text class="dg-label-sm" x="525" y="105">NKPC</text>
  <text class="dg-label-sm" x="496" y="166">均衡</text>
  <path class="dg-arrow" d="M 430 205 C 450 220 465 230 500 238"></path>
  <text class="dg-label-sm" x="410" y="250">政策利率／預期管理</text>
</svg>`,
    variables: [
      ["C_t", "第 t 期消費", "家計在當期的消費水準"],
      ["ε_t", "未預期衝擊", "使消費隨機漫步的新訊息"],
      ["π_t", "通膨率", "新凱因斯菲利浦曲線的物價變動"],
      ["x_t", "產出缺口", "實際產出偏離潛在產出的程度"]
    ],
    parameters: [
      ["β", "跨期折現因子", "未來效用或通膨預期的權重"],
      ["κ", "菲利浦曲線斜率", "產出缺口對通膨的影響"],
      ["政策規則", "利率反應", "央行對通膨與產出缺口調整利率的強度"]
    ],
    note: "2026 年屆別依提供表格納入；Hall 與 Woodford 的完整模型假設不同，圖為概念整合，官方公告與原始論文仍待核對。"
  }
});
