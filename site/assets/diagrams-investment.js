/* 投資學教學圖表：掛載鍵為 chapterId#sectionIndex，與總體經濟學模型圖共用渲染管線。 */
window.INVESTMENT_DIAGRAMS = {
  "investment-04#0": {
    sectionTitle: "學習重點 1：分散投資與投資組合報酬",
    title: "兩資產投資組合的風險報酬曲線",
    caption: "橫軸為組合標準差 σ_p，縱軸為組合預期報酬 E(R_p)。相同兩資產、只改變相關係數：ρ=1 時組合落在直線上；ρ<1 時曲線向左彎，代表相同報酬下風險較低；ρ=−1 時可組合出零風險部位。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-port-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-port-title">兩資產投資組合的風險報酬曲線</title>
  <line class="dg-axis" x1="70" y1="300" x2="610" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="40"></line>
  <text class="dg-label-sm" x="610" y="322" text-anchor="end">組合標準差 σ</text>
  <text class="dg-label-sm" x="62" y="34" text-anchor="end">E(R)</text>
  <line class="dg-curve-alt" x1="130" y1="245" x2="520" y2="75"></line>
  <path class="dg-curve" d="M130 245 C 200 205 330 115 520 75"></path>
  <path class="dg-curve-soft" d="M130 245 L70 222 L520 75"></path>
  <circle class="dg-point" cx="130" cy="245" r="5"></circle>
  <circle class="dg-point" cx="520" cy="75" r="5"></circle>
  <circle class="dg-point" cx="226" cy="189" r="4"></circle>
  <text class="dg-label-sm" x="130" y="268" text-anchor="middle">資產 A（低風險）</text>
  <text class="dg-label-sm" x="520" y="62" text-anchor="middle">資產 B（高風險）</text>
  <line class="dg-guide" x1="210" y1="170" x2="226" y2="189"></line>
  <text class="dg-label-sm" x="100" y="166">最小變異數組合</text>
  <line class="dg-curve-alt" x1="82" y1="82" x2="112" y2="82"></line>
  <text class="dg-label-sm" x="120" y="86">ρ = 1（直線）</text>
  <line class="dg-curve" x1="82" y1="104" x2="112" y2="104"></line>
  <text class="dg-label-sm" x="120" y="108">ρ = 0.2（向左彎）</text>
  <line class="dg-curve-soft" x1="82" y1="126" x2="112" y2="126"></line>
  <text class="dg-label-sm" x="120" y="130">ρ = −1（可零風險）</text>
</svg>`,
    variables: [
      ["E(R_p)", "組合預期報酬", "各資產預期報酬的加權平均。"],
      ["σ_p", "組合標準差", "衡量組合報酬的波動，受權重、個別風險與相關係數影響。"],
      ["w_1, w_2", "資產權重", "w_1 + w_2 = 1。"],
      ["ρ_12", "相關係數", "兩資產報酬同向變動的程度，介於 −1 與 1。"]
    ],
    parameters: [
      ["E(R_1), E(R_2)", "兩資產預期報酬", "曲線端點的高低由兩資產預期報酬決定。"],
      ["σ_1, σ_2", "兩資產標準差", "曲線端點的水平位置由個別風險決定。"],
      ["ρ = 1, 0.2, −1", "示意相關係數", "三條曲線分別對應完全正相關、低度正相關與完全負相關。"]
    ],
    note: "本圖為示意，未按實際數值繪製；實務上資產間多為正相關，分散效果有限。ρ=−1 的零風險組合需兩資產完全負相關，現實中幾乎不存在。"
  },
  "investment-04#1": {
    sectionTitle: "學習重點 2：效率前緣與最適投資組合",
    title: "效率前緣、最小變異數組合與資本配置線",
    caption: "效率前緣是可行組合中「相同風險下報酬最高」的上半段；最低點為最小變異數組合（GMV）。加入無風險資產後，資本配置線（CAL）從 R_f 出發，與效率前緣相切於 T。T 左側代表貸出，右側代表借入。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-inv-eff-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-eff-title">效率前緣、最小變異數組合與資本配置線</title>
  <line class="dg-axis" x1="70" y1="310" x2="610" y2="310"></line>
  <line class="dg-axis" x1="70" y1="310" x2="70" y2="40"></line>
  <text class="dg-label-sm" x="610" y="332" text-anchor="end">組合標準差 σ</text>
  <text class="dg-label-sm" x="62" y="34" text-anchor="end">E(R)</text>
  <line class="dg-guide" x1="300" y1="310" x2="300" y2="160"></line>
  <line class="dg-guide" x1="70" y1="160" x2="300" y2="160"></line>
  <text class="dg-label-sm" x="64" y="164" text-anchor="end">E(R(T))</text>
  <text class="dg-label-sm" x="300" y="326" text-anchor="middle">σ(T)</text>
  <path class="dg-curve-soft" d="M215 225 C 290 257 400 285 540 296"></path>
  <path class="dg-curve" d="M215 225 C 215 215 262 181.8 300 160 C 342 137 460 85 575 52"></path>
  <line class="dg-curve-alt" x1="70" y1="285" x2="550" y2="24"></line>
  <circle class="dg-point" cx="70" cy="285" r="5"></circle>
  <circle class="dg-point" cx="215" cy="225" r="5"></circle>
  <circle class="dg-point" cx="300" cy="160" r="5"></circle>
  <circle class="dg-point" cx="165" cy="233" r="4"></circle>
  <circle class="dg-point" cx="430" cy="89" r="4"></circle>
  <text class="dg-label-sm" x="58" y="289" text-anchor="end">R<tspan class="dg-sub" dy="3">f</tspan></text>
  <text class="dg-label-sm" x="205" y="248" text-anchor="end">GMV（最小變異數）</text>
  <text class="dg-label-sm" x="315" y="182">T（市場投資組合）</text>
  <line class="dg-guide" x1="312" y1="176" x2="303" y2="162"></line>
  <text class="dg-label-sm" x="360" y="142">效率前緣</text>
  <line class="dg-guide" x1="402" y1="136" x2="420" y2="108"></line>
  <text class="dg-label-sm" x="505" y="36">CAL</text>
  <text class="dg-label-sm" x="140" y="222">貸出</text>
  <text class="dg-label-sm" x="440" y="104">借入</text>
</svg>`,
    variables: [
      ["E(R_p)", "組合預期報酬", "CAL 與效率前緣的縱軸。"],
      ["σ_p", "組合標準差", "總風險；CAL 的橫軸。"],
      ["R_f", "無風險利率", "CAL 的起點，代表完全不承擔風險。"],
      ["T", "切點投資組合", "CAL 與效率前緣的切點，即市場投資組合。"]
    ],
    parameters: [
      ["A", "風險趨避係數", "決定投資人選 CAL 上的哪一點。"],
      ["E(R_m), σ_m", "市場組合報酬與風險", "決定 CAL 的斜率與切點位置。"],
      ["w", "風險性資產比重", "w<1 為貸出，w>1 為借入。"]
    ],
    note: "效率前緣下半段雖然可行，但被上半段支配，因此不是效率組合。CAL 只有在存在無風險資產、且可自由借貸時才成立；切點 T 是理論上的市場投資組合。"
  },
  "investment-04#2": {
    sectionTitle: "學習重點 3：系統風險與分散極限",
    title: "分散化：非系統風險與系統風險",
    caption: "隨著持股數增加，個別公司的非系統風險會因分散而下降；但市場共同的系統風險不會消失，組合風險最終趨近系統風險水準。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-div-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-div-title">分散化：非系統風險與系統風險</title>
  <line class="dg-axis" x1="70" y1="310" x2="610" y2="310"></line>
  <line class="dg-axis" x1="70" y1="310" x2="70" y2="70"></line>
  <text class="dg-label-sm" x="610" y="334" text-anchor="end">持股數 N</text>
  <text class="dg-label-sm" x="80" y="60" text-anchor="start">組合風險 σ</text>
  <line class="dg-guide" x1="70" y1="232" x2="610" y2="232"></line>
  <path class="dg-curve" d="M80 90 C 140 150 220 195 320 215 C 420 230 500 232 590 232"></path>
  <line class="dg-guide" x1="175" y1="232" x2="185" y2="232"></line>
  <line class="dg-guide" x1="175" y1="158" x2="185" y2="158"></line>
  <line class="dg-guide" x1="180" y1="158" x2="180" y2="232"></line>
  <text class="dg-label-sm" x="185" y="208">非系統風險</text>
  <text class="dg-label-sm" x="185" y="226">（可分散）</text>
  <text class="dg-label-sm" x="430" y="254">系統風險（不可分散）</text>
  <text class="dg-label-sm" x="96" y="116">分散化效果</text>
  <text class="dg-label-sm" x="80" y="330" text-anchor="middle">1</text>
  <text class="dg-label-sm" x="174" y="330" text-anchor="middle">10</text>
  <text class="dg-label-sm" x="278" y="330" text-anchor="middle">20</text>
  <text class="dg-label-sm" x="382" y="330" text-anchor="middle">30</text>
</svg>`,
    variables: [
      ["N", "持股數", "投資組合中的證券數量。"],
      ["σ_p", "組合標準差", "總風險，隨 N 增加而下降並趨近系統風險。"],
      ["σ_sys", "系統風險", "市場共同風險，無法靠分散消除。"],
      ["σ_unsys", "非系統風險", "個別公司風險，可透過分散降低。"]
    ],
    parameters: [
      ["ρ_avg", "平均相關係數", "相關性越低，分散效果越好。"],
      ["N*", "有效分散門檻", "實務上約 20–30 檔可分散大部分非系統風險。"]
    ],
    note: "本圖為示意，曲線位置取決於資產間平均相關係數；分散只能降低非系統風險，不能把總風險降到零。"
  },
  "investment-05#1": {
    sectionTitle: "學習重點 2：證券市場線與必要報酬率",
    title: "證券市場線（SML）：β 與必要報酬",
    caption: "SML 描述系統風險 β 與必要報酬的線性關係，斜率為市場風險溢酬 E(R_m)−R_f。位於 SML 上方的資產，預期報酬高於必要報酬（α>0，可能被低估）；下方則相反。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-sml-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-sml-title">證券市場線：β 與必要報酬</title>
  <line class="dg-axis" x1="70" y1="300" x2="610" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="50"></line>
  <text class="dg-label-sm" x="610" y="338" text-anchor="end">系統風險 β</text>
  <text class="dg-label-sm" x="62" y="44" text-anchor="end">E(R<tspan dy="3.5" font-size="9.5">i</tspan><tspan dy="-3.5">)</tspan></text>
  <line class="dg-curve" x1="70" y1="250" x2="540" y2="70"></line>
  <line class="dg-guide" x1="410" y1="80" x2="410" y2="200"></line>
  <circle class="dg-point" cx="70" cy="250" r="5"></circle>
  <circle class="dg-point" cx="305" cy="160" r="5"></circle>
  <circle class="dg-point" cx="410" cy="80" r="5"></circle>
  <circle class="dg-point" cx="410" cy="200" r="5"></circle>
  <text class="dg-label-sm" x="58" y="254" text-anchor="end">R<tspan dy="3.5" font-size="9.5">f</tspan></text>
  <text class="dg-label-sm" x="318" y="138">M（β=1）</text>
  <text class="dg-label-sm" x="505" y="58">SML</text>
  <text class="dg-label-sm" x="422" y="76">α &gt; 0（低估）</text>
  <text class="dg-label-sm" x="422" y="216">α &lt; 0（高估）</text>
  <text class="dg-label-sm" x="305" y="320" text-anchor="middle">1</text>
  <text class="dg-label-sm" x="540" y="320" text-anchor="middle">2</text>
  <text class="dg-label-sm" x="64" y="164" text-anchor="end">E(R<tspan dy="3.5" font-size="9.5">m</tspan><tspan dy="-3.5">)</tspan></text>
</svg>`,
    variables: [
      ["β_i", "系統風險", "資產報酬對市場報酬的敏感度。"],
      ["E(R_i)", "必要報酬", "CAPM 依 β 決定的均衡預期報酬。"],
      ["R_f", "無風險利率", "β=0 時的報酬。"],
      ["E(R_m)", "市場預期報酬", "β=1 時的報酬。"],
      ["α", "超額報酬", "實際預期報酬減去 CAPM 必要報酬。"]
    ],
    parameters: [
      ["MRP", "市場風險溢酬", "E(R_m) − R_f，SML 的斜率。"],
      ["β_m", "市場 β", "市場投資組合的 β 固定為 1。"]
    ],
    note: "SML 的橫軸是 β（系統風險），不是標準差 σ；後者用於 CML。CAPM 的實證限制包括市場投資組合難以觀察與 β 不穩定。"
  },
  "investment-07#2": {
    sectionTitle: "學習重點 3：存續期間與利率風險",
    title: "債券價格與殖利率：存續期間近似與凸性",
    caption: "債券價格與殖利率呈反向且凸向原點的關係。修正存續期間給出 y₀ 處的切線，只適合小幅利率變動；利率變動越大，實際價格因凸性而高於切線估計。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-bond-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-bond-title">債券價格與殖利率：存續期間近似與凸性</title>
  <line class="dg-axis" x1="80" y1="300" x2="600" y2="300"></line>
  <line class="dg-axis" x1="80" y1="300" x2="80" y2="60"></line>
  <text class="dg-label-sm" x="600" y="338" text-anchor="end">殖利率 y</text>
  <text class="dg-label-sm" x="62" y="44" text-anchor="end">價格 P</text>
  <line class="dg-guide" x1="80" y1="180" x2="590" y2="180"></line>
  <line class="dg-guide" x1="80" y1="60" x2="590" y2="60"></line>
  <text class="dg-label-sm" x="72" y="64" text-anchor="end">115</text>
  <text class="dg-label-sm" x="72" y="184" text-anchor="end">100</text>
  <text class="dg-label-sm" x="72" y="304" text-anchor="end">85</text>
  <path class="dg-curve" d="M80 84 C 170 105 260 148 330 170 C 400 185 490 215 580 238"></path>
  <line class="dg-curve-soft" x1="80" y1="90" x2="580" y2="250"></line>
  <line class="dg-guide" x1="330" y1="170" x2="330" y2="300"></line>
  <circle class="dg-point" cx="330" cy="170" r="5"></circle>
  <text class="dg-label-sm" x="430" y="176">實際價格（含凸性）</text>
  <text class="dg-label-sm" x="120" y="150">切線：存續期間近似</text>
  <text class="dg-label-sm" x="410" y="262">凸性：實際價格高於切線</text>
  <text class="dg-label-sm" x="338" y="292">y₀</text>
  <text class="dg-label-sm" x="80" y="322" text-anchor="middle">2%</text>
  <text class="dg-label-sm" x="205" y="322" text-anchor="middle">4%</text>
  <text class="dg-label-sm" x="330" y="322" text-anchor="middle">6%</text>
  <text class="dg-label-sm" x="455" y="322" text-anchor="middle">8%</text>
  <text class="dg-label-sm" x="580" y="322" text-anchor="middle">10%</text>
</svg>`,
    variables: [
      ["P", "債券價格", "未來現金流的現值。"],
      ["y", "殖利率", "市場要求的每期報酬率。"],
      ["D*", "修正存續期間", "價格對利率的一階敏感度。"],
      ["C", "凸性", "價格對利率的二階敏感度。"]
    ],
    parameters: [
      ["F", "面額", "到期償還的本金。"],
      ["c", "票面利率", "決定每期票息。"],
      ["n", "期數", "距離到期的期數。"]
    ],
    note: "切線近似只在 Δy 很小時準確；利率上升時，存續期間會高估價格跌幅，利率下降時則低估價格漲幅。凸性越大，這個差異越明顯。"
  },
  "investment-09#1": {
    sectionTitle: "學習重點 2：到期價值與損益",
    title: "買權與賣權的到期損益圖",
    caption: "左圖為買權買方、右圖為賣權買方。履約價格 K 固定，損益為到期內在價值減去權利金。買權在 S_T 超過 K+C₀ 後轉為獲利；賣權在 S_T 低於 K−P₀ 後轉為獲利。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-optpay-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-optpay-title">買權與賣權的到期損益圖</title>
  <rect class="dg-panel" x="25" y="18" width="290" height="304" rx="12"></rect>
  <rect class="dg-panel" x="325" y="18" width="290" height="304" rx="12"></rect>
  <text class="dg-label" x="170" y="46" text-anchor="middle">買權買方（Long Call）</text>
  <text class="dg-label" x="470" y="46" text-anchor="middle">賣權買方（Long Put）</text>
  <line class="dg-axis" x1="55" y1="285" x2="295" y2="285"></line>
  <line class="dg-axis" x1="55" y1="285" x2="55" y2="60"></line>
  <line class="dg-axis" x1="350" y1="285" x2="590" y2="285"></line>
  <line class="dg-axis" x1="350" y1="285" x2="350" y2="60"></line>
  <line class="dg-guide" x1="55" y1="235" x2="285" y2="235"></line>
  <line class="dg-guide" x1="350" y1="235" x2="580" y2="235"></line>
  <line class="dg-guide" x1="165" y1="235" x2="165" y2="285"></line>
  <line class="dg-guide" x1="460" y1="235" x2="460" y2="285"></line>
  <path class="dg-curve" d="M55 267 L165 267 L275 67"></path>
  <path class="dg-curve-alt" d="M350 63 L460 263 L570 263"></path>
  <circle class="dg-point" cx="183" cy="235" r="4"></circle>
  <circle class="dg-point" cx="445" cy="235" r="4"></circle>
  <text class="dg-label-sm" x="285" y="305" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="585" y="305" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="48" y="66" text-anchor="end">損益</text>
  <text class="dg-label-sm" x="343" y="66" text-anchor="end">損益</text>
  <text class="dg-label-sm" x="165" y="303" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="460" y="303" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="205" y="218">損益兩平</text>
  <text class="dg-label-sm" x="458" y="220">損益兩平</text>
  <text class="dg-label-sm" x="62" y="280">−C₀</text>
  <text class="dg-label-sm" x="357" y="280">−P₀</text>
  <text class="dg-label-sm" x="48" y="239" text-anchor="end">0</text>
  <text class="dg-label-sm" x="343" y="239" text-anchor="end">0</text>
</svg>`,
    variables: [
      ["S_T", "到期標的價格", "到期日標的資產的市場價格。"],
      ["K", "履約價格", "買權或賣權約定買賣標的的價格。"],
      ["C_0", "買權權利金", "買方期初支付的成本。"],
      ["P_0", "賣權權利金", "買方期初支付的成本。"]
    ],
    parameters: [
      ["r", "無風險利率", "影響權利金的折現與時間價值。"],
      ["T", "到期期間", "距到期日的時間。"],
      ["π", "損益", "到期內在價值減去權利金。"]
    ],
    note: "買權買方最大損失為權利金 C₀，最大獲利無限；賣權買方最大損失為權利金 P₀，最大獲利為 K−P₀。圖中未考慮交易成本與提前履約。"
  },
  "investment-09#3": {
    sectionTitle: "學習重點 4：Black–Scholes 定價與 Greeks",
    title: "掩護性買權與保護性賣權的損益",
    caption: "左圖為持有股票並賣出買權（掩護性買權），上方獲利被權利金與履約價封頂；右圖為持有股票並買入賣權（保護性賣權），下方損失被履約價限制。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-strategy-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-strategy-title">掩護性買權與保護性賣權的損益</title>
  <rect class="dg-panel" x="25" y="18" width="290" height="304" rx="12"></rect>
  <rect class="dg-panel" x="325" y="18" width="290" height="304" rx="12"></rect>
  <text class="dg-label" x="170" y="46" text-anchor="middle">掩護性買權（Covered Call）</text>
  <text class="dg-label" x="470" y="46" text-anchor="middle">保護性賣權（Protective Put）</text>
  <text class="dg-label-sm" x="170" y="64" text-anchor="middle">持有股票＋賣出買權</text>
  <text class="dg-label-sm" x="470" y="64" text-anchor="middle">持有股票＋買入賣權</text>
  <line class="dg-axis" x1="55" y1="285" x2="295" y2="285"></line>
  <line class="dg-axis" x1="55" y1="285" x2="55" y2="75"></line>
  <line class="dg-axis" x1="350" y1="285" x2="590" y2="285"></line>
  <line class="dg-axis" x1="350" y1="285" x2="350" y2="75"></line>
  <line class="dg-guide" x1="55" y1="120" x2="285" y2="120"></line>
  <line class="dg-guide" x1="350" y1="240" x2="580" y2="240"></line>
  <line class="dg-guide" x1="176" y1="120" x2="176" y2="285"></line>
  <line class="dg-guide" x1="449" y1="240" x2="449" y2="285"></line>
  <path class="dg-curve" d="M55 258 L176 93 L275 93"></path>
  <path class="dg-curve-alt" d="M350 264 L449 264 L570 99"></path>
  <circle class="dg-point" cx="156" cy="120" r="4"></circle>
  <circle class="dg-point" cx="467" cy="240" r="4"></circle>
  <text class="dg-label-sm" x="285" y="305" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="585" y="305" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="48" y="81" text-anchor="end">損益</text>
  <text class="dg-label-sm" x="343" y="81" text-anchor="end">損益</text>
  <text class="dg-label-sm" x="176" y="303" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="449" y="303" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="190" y="108">獲利上限</text>
  <text class="dg-label-sm" x="380" y="254">損失有限</text>
  <text class="dg-label-sm" x="185" y="138">損益兩平</text>
  <text class="dg-label-sm" x="48" y="124" text-anchor="end">0</text>
  <text class="dg-label-sm" x="455" y="225" text-anchor="end">損益兩平</text>
  <text class="dg-label-sm" x="343" y="244" text-anchor="end">0</text>
  <text class="dg-label-sm" x="62" y="274">−S₀＋C₀</text>
  <text class="dg-label-sm" x="357" y="278">−S₀−P₀＋K</text>
</svg>`,
    variables: [
      ["S_T", "到期標的價格", "到期日股票的市場價格。"],
      ["S_0", "期初股價", "建立策略時的股票價格。"],
      ["K", "履約價格", "買權或賣權約定的履約價。"],
      ["C_0, P_0", "權利金", "買權與賣權的期初價格。"]
    ],
    parameters: [
      ["r", "無風險利率", "影響權利金的時間價值。"],
      ["T", "到期期間", "策略持有至到期的時間。"],
      ["π", "策略損益", "到期總價值減去期初成本。"]
    ],
    note: "掩護性買權以放棄上方漲幅換取權利金，適合盤整偏多；保護性賣權像買保險，最大損失有限但需支付權利金。圖為到期日損益，未考慮交易成本。"
  },
  "investment-09#3-3": {
    sectionTitle: "學習重點 4：Black–Scholes 定價與 Greeks",
    kicker: "公式概念圖",
    title: "Black–Scholes 公式概念圖：現貨項、履約成本項與風險中立機率",
    caption: "買權價格可拆成「現貨價 × N(d₁)」的標的物價值項，減去「履約價折現 × N(d₂)」的履約成本項；賣權則相反。陰影只代表 N(d₂)／N(−d₂) 的風險中立價內機率；N(d₁) 是現貨項權重／Delta，不是同一塊面積。",
    svg: `
<svg viewBox="0 0 760 520" role="img" aria-labelledby="dg-bs-concept-title dg-bs-concept-desc" style="max-width:760px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-bs-concept-title">Black–Scholes 公式概念圖</title>
  <desc id="dg-bs-concept-desc">買權價格拆成現貨價乘 N(d₁) 的標的物價值項，減去履約價折現乘 N(d₂) 的履約成本項；賣權價格則是履約價折現乘 N(−d₂) 減去現貨價乘 N(−d₁)。圖中陰影代表風險中立下的價內機率 N(d₂) 或 N(−d₂)；N(d₁)、N(−d₁) 是現貨項權重／Delta，不是同一塊面積。</desc>
  <defs>
    <marker id="dg-bs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head-soft" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <rect class="dg-panel" x="16" y="16" width="356" height="488" rx="14"></rect>
  <rect class="dg-panel" x="388" y="16" width="356" height="488" rx="14"></rect>

  <text class="dg-label dg-label-strong" x="194" y="46" text-anchor="middle">買權 Call</text>
  <text class="dg-label-sm" x="194" y="68" text-anchor="middle">C = S₀N(d₁) − K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5"> N(d₂)</tspan></text>
  <text class="dg-label dg-label-strong" x="566" y="46" text-anchor="middle">賣權 Put</text>
  <text class="dg-label-sm" x="566" y="68" text-anchor="middle">P = K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5"> N(−d₂) − S₀N(−d₁)</tspan></text>

  <line class="dg-axis" x1="44" y1="330" x2="344" y2="330" marker-end="url(#dg-bs-arrow)"></line>
  <line class="dg-axis" x1="44" y1="330" x2="44" y2="96" marker-end="url(#dg-bs-arrow)"></line>
  <line class="dg-axis" x1="416" y1="330" x2="716" y2="330" marker-end="url(#dg-bs-arrow)"></line>
  <line class="dg-axis" x1="416" y1="330" x2="416" y2="96" marker-end="url(#dg-bs-arrow)"></line>
  <text class="dg-label-sm" x="344" y="350" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="716" y="350" text-anchor="end">S(T)</text>
  <text class="dg-label-sm" x="35" y="210" text-anchor="middle" transform="rotate(-90 35 210)">f(S(T))</text>
  <text class="dg-label-sm" x="407" y="210" text-anchor="middle" transform="rotate(-90 407 210)">f(S(T))</text>

  <path class="dg-curve" d="M48 326 C 90 326 105 300 122 240 C 140 176 162 138 190 132 C 218 138 240 176 258 240 C 275 300 290 326 336 326"></path>
  <path class="dg-curve" d="M420 326 C 462 326 477 300 494 240 C 512 176 534 138 562 132 C 590 138 612 176 630 240 C 647 300 662 326 708 326"></path>

  <path class="dg-area-accent" d="M250 214.1 C 252.8 222.2 255.4 230.8 258 240 C 275 300 290 326 336 326 L250 326 Z"></path>
  <line class="dg-guide" x1="250" y1="214.1" x2="250" y2="330"></line>
  <text class="dg-label-sm" x="250" y="350" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="285" y="250" text-anchor="middle">N(d₂)</text>
  <text class="dg-label-xs" x="285" y="265" text-anchor="middle">風險中立價內機率</text>
  <line class="dg-arrow-line" x1="285" y1="270" x2="275" y2="292" marker-end="url(#dg-bs-arrow)"></line>

  <path class="dg-area-accent" d="M420 326 C 462 326 477 300 494 240 C 496 233.1 498 226.4 500 220.1 L500 326 Z"></path>
  <line class="dg-guide" x1="500" y1="220.1" x2="500" y2="330"></line>
  <text class="dg-label-sm" x="500" y="350" text-anchor="middle">K</text>
  <text class="dg-label-sm" x="455" y="300" text-anchor="middle">N(−d₂)</text>
  <text class="dg-label-xs" x="455" y="315" text-anchor="middle">風險中立價內機率</text>

  <rect class="dg-callout-accent" x="50" y="82" width="150" height="36" rx="8"></rect>
  <text class="dg-label-sm" x="125" y="98" text-anchor="middle">S₀N(d₁)</text>
  <text class="dg-label-xs" x="125" y="111" text-anchor="middle">現貨項權重／Delta</text>
  <line class="dg-arrow-line" x1="160" y1="118" x2="185" y2="130" marker-end="url(#dg-bs-arrow)"></line>

  <rect class="dg-callout-strike" x="210" y="82" width="150" height="36" rx="8"></rect>
  <text class="dg-label-sm" x="285" y="98" text-anchor="middle">K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5"> N(d₂)</tspan></text>
  <text class="dg-label-xs" x="285" y="111" text-anchor="middle">履約成本項</text>
  <line class="dg-arrow-line" x1="285" y1="118" x2="251" y2="222" marker-end="url(#dg-bs-arrow)"></line>

  <rect class="dg-callout-strike" x="410" y="82" width="150" height="36" rx="8"></rect>
  <text class="dg-label-sm" x="485" y="98" text-anchor="middle">K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5"> N(−d₂)</tspan></text>
  <text class="dg-label-xs" x="485" y="111" text-anchor="middle">履約價折現項</text>
  <line class="dg-arrow-line" x1="485" y1="118" x2="498" y2="216" marker-end="url(#dg-bs-arrow)"></line>

  <rect class="dg-callout-accent" x="580" y="82" width="150" height="36" rx="8"></rect>
  <text class="dg-label-sm" x="655" y="98" text-anchor="middle">S₀N(−d₁)</text>
  <text class="dg-label-xs" x="655" y="111" text-anchor="middle">標的物價值項（權重）</text>
  <line class="dg-arrow-line" x1="620" y1="118" x2="600" y2="190" marker-end="url(#dg-bs-arrow)"></line>

  <rect class="dg-callout" x="40" y="370" width="308" height="54" rx="10"></rect>
  <text class="dg-label-sm" x="194" y="392" text-anchor="middle">買權 = 現貨項 − 履約成本</text>
  <text class="dg-label-xs" x="194" y="408" text-anchor="middle">S₀N(d₁) − K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5">N(d₂)</tspan></text>

  <rect class="dg-callout" x="412" y="370" width="308" height="54" rx="10"></rect>
  <text class="dg-label-sm" x="566" y="392" text-anchor="middle">賣權 = 履約價折現 − 標的物價值</text>
  <text class="dg-label-xs" x="566" y="408" text-anchor="middle">K e<tspan class="dg-sup" dy="-5">−rT</tspan><tspan dy="5">N(−d₂) − S₀N(−d₁)</tspan></text>

  <text class="dg-label-xs" x="380" y="462" text-anchor="middle">陰影是風險中立下的價內機率 N(d₂)／N(−d₂)；N(d₁)／N(−d₁) 是現貨項權重，不是同一塊面積。</text>
  <text class="dg-label-xs" x="380" y="480" text-anchor="middle">折現只作用在履約價 K；S₀ 已經是現值。</text>
</svg>`,
    variables: [
      ["S₀", "期初價格", "目前標的物現貨價格。"],
      ["K", "履約價", "到期時買賣標的的約定價格。"],
      ["N(d₁)", "現貨項權重", "風險中立測度下標的物價值項的權重，也是買權 Delta。"],
      ["N(d₂)", "履約項權重", "風險中立測度下履約價成本項的權重；可解讀為到期價內的風險中立機率。"],
      ["N(−d₁)", "賣權現貨權重", "由 N(−d₁)=1−N(d₁) 得到；賣權標的物項的累積機率值，也是賣權 Delta 絕對值的來源。"],
      ["N(−d₂)", "賣權履約權重", "由 N(−d₂)=1−N(d₂) 得到；賣權履約價折現項的累積機率值。"]
    ],
    parameters: [
      ["r", "利率", "連續複利無風險利率，用於履約價折現。"],
      ["T", "到期", "距到期年數，也是履約價折現與 d₁、d₂ 的時間基礎。"],
      ["σ", "波動", "標的報酬的年化波動率。"],
      ["d₁、d₂", "中間值", "整合現貨價、履約價、利率、波動率與到期時間的中間變數。"]
    ],
    note: "此圖為公式概念示意：陰影代表風險中立下的價內機率 N(d₂)／N(−d₂)；N(d₁)／N(−d₁) 是現貨項權重／Delta，不是同一塊面積，也不應直接解讀為單純的獲利機率。折現只作用在履約價 K，現貨價 S₀ 已是現在價值。"
  },
  "investment-15#2": {
    sectionTitle: "學習重點 3：型態分析與風險控制",
    title: "頭肩頂型態、頸線與目標價",
    caption: "頭肩頂是常見的反轉型態：左肩、頭部、右肩依序出現，頸線連接兩次回檔低點。價格跌破頸線後，理論目標價約等於頭部到頸線的垂直距離。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-inv-pattern-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-inv-pattern-title">頭肩頂型態、頸線與目標價</title>
  <line class="dg-axis" x1="60" y1="300" x2="610" y2="300"></line>
  <line class="dg-axis" x1="60" y1="300" x2="60" y2="60"></line>
  <text class="dg-label-sm" x="610" y="322" text-anchor="end">時間</text>
  <text class="dg-label-sm" x="52" y="54" text-anchor="end">股價</text>
  <path class="dg-curve" d="M80 250 L120 210 L165 120 L210 170 L260 155 L320 80 L380 160 L430 125 L470 190 L520 245 L570 260"></path>
  <line class="dg-guide" x1="80" y1="178" x2="590" y2="148"></line>
  <line class="dg-guide" x1="470" y1="247" x2="590" y2="247"></line>
  <line class="dg-guide" x1="320" y1="80" x2="320" y2="164"></line>
  <circle class="dg-point" cx="165" cy="120" r="4"></circle>
  <circle class="dg-point" cx="320" cy="80" r="5"></circle>
  <circle class="dg-point" cx="430" cy="125" r="4"></circle>
  <circle class="dg-point" cx="451" cy="156" r="5"></circle>
  <text class="dg-label-sm" x="165" y="108" text-anchor="middle">左肩</text>
  <text class="dg-label-sm" x="320" y="68" text-anchor="middle">頭部</text>
  <text class="dg-label-sm" x="430" y="113" text-anchor="middle">右肩</text>
  <text class="dg-label-sm" x="500" y="138">頸線（支撐）</text>
  <text class="dg-label-sm" x="465" y="282">目標價（頭部至頸線）</text>
  <text class="dg-label-sm" x="330" y="200">型態高度</text>
  <line class="dg-guide" x1="425" y1="230" x2="449" y2="170"></line>
  <text class="dg-label-sm" x="420" y="235" text-anchor="end">跌破頸線</text>
</svg>`,
    variables: [
      ["P", "股價", "技術分析的主要觀察對象。"],
      ["頸線", "支撐線", "連接左肩與右肩回檔低點的水準。"],
      ["頭部", "最高點", "型態中的最高價位。"],
      ["目標價", "量測目標", "頸線減去頭部至頸線的垂直距離。"],
      ["V", "成交量", "確認突破或跌破是否有效。"]
    ],
    parameters: [
      ["H", "型態高度", "頭部至頸線的垂直距離。"],
      ["V*", "確認量", "突破時高於平均的成交量水準。"]
    ],
    note: "型態分析是機率而非保證；跌破頸線需成交量確認，停損常設在頸線上方或右肩上方。目標價僅供參考，不代表一定會到達。"
  }
};
