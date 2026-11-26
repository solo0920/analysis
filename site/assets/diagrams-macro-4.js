/* 總體經濟學 — 模型圖（第 10 章菲利浦曲線、第 11 章外匯、第 12 章金融體系） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-10#2": {
    sectionTitle: "第3節 菲利浦曲線",
    title: "菲利浦曲線：短期取捨、預期上移與長期垂直",
    kicker: "學派模型 · 貨幣學派",
    formula: String.raw`\pi=\pi^e-\beta(u-u_n)+\varepsilon`,
    caption: "短期菲利浦曲線 SRPC 為負斜率：失業率越低、通膨越高。圖中設 uₙ=5%、β=0.5、ε=0；SRPC₀ 對應 πᵉ=4%，SRPC₁ 對應 πᵉ=6%。E₀=(5%,4%)、E₁=(5%,6%) 在自然失業率上；A=(3%,5%)、B=(3%,7%) 顯示相同失業率下，預期通膨上升使 SRPC 整條上移。長期預期追上實際通膨後，失業率回到 uₙ，LRPC 為垂直線。",
    svg: `
<svg viewBox="0 0 680 420" role="img" aria-labelledby="dg-phillips-title dg-phillips-desc" style="max-width:680px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-phillips-title">菲利浦曲線：短期取捨、預期上移與長期垂直線</title>
  <desc id="dg-phillips-desc">橫軸為失業率 u（%），縱軸為通膨率 π（%）。短期菲利浦曲線 SRPC₀ 與 SRPC₁ 為負斜率平行線；預期通膨由 4% 升至 6% 使 SRPC 上移。E₀、E₁ 在自然失業率 uₙ=5% 上，A、B 在 u=3% 上。長期菲利浦曲線 LRPC 為 u=5% 的垂直線。</desc>
  <defs>
    <marker id="dg-phillips-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-panel" x="16" y="16" width="648" height="388" rx="14"></rect>
  <text class="dg-label" x="88" y="38">通膨率 π（%）</text>
  <text class="dg-label" x="348" y="398" text-anchor="middle">失業率 u（%）</text>

  <g class="dg-grid">
    <line x1="88" y1="48" x2="88" y2="328"></line>
    <line x1="140" y1="48" x2="140" y2="328"></line>
    <line x1="192" y1="48" x2="192" y2="328"></line>
    <line x1="244" y1="48" x2="244" y2="328"></line>
    <line x1="296" y1="48" x2="296" y2="328"></line>
    <line x1="348" y1="48" x2="348" y2="328"></line>
    <line x1="400" y1="48" x2="400" y2="328"></line>
    <line x1="452" y1="48" x2="452" y2="328"></line>
    <line x1="504" y1="48" x2="504" y2="328"></line>
    <line x1="556" y1="48" x2="556" y2="328"></line>
    <line x1="608" y1="48" x2="608" y2="328"></line>
    <line x1="88" y1="48" x2="608" y2="48"></line>
    <line x1="88" y1="83" x2="608" y2="83"></line>
    <line x1="88" y1="118" x2="608" y2="118"></line>
    <line x1="88" y1="153" x2="608" y2="153"></line>
    <line x1="88" y1="188" x2="608" y2="188"></line>
    <line x1="88" y1="223" x2="608" y2="223"></line>
    <line x1="88" y1="258" x2="608" y2="258"></line>
    <line x1="88" y1="293" x2="608" y2="293"></line>
    <line x1="88" y1="328" x2="608" y2="328"></line>
  </g>

  <line class="dg-axis" x1="88" y1="328" x2="608" y2="328"></line>
  <line class="dg-axis" x1="88" y1="328" x2="88" y2="48"></line>

  <text class="dg-label-xs" x="88" y="346" text-anchor="middle">0</text>
  <text class="dg-label-xs" x="140" y="346" text-anchor="middle">1</text>
  <text class="dg-label-xs" x="192" y="346" text-anchor="middle">2</text>
  <text class="dg-label-xs" x="244" y="346" text-anchor="middle">3</text>
  <text class="dg-label-xs" x="296" y="346" text-anchor="middle">4</text>
  <text class="dg-label-xs" x="348" y="346" text-anchor="middle">5</text>
  <text class="dg-label-xs" x="400" y="346" text-anchor="middle">6</text>
  <text class="dg-label-xs" x="452" y="346" text-anchor="middle">7</text>
  <text class="dg-label-xs" x="504" y="346" text-anchor="middle">8</text>
  <text class="dg-label-xs" x="556" y="346" text-anchor="middle">9</text>
  <text class="dg-label-xs" x="608" y="346" text-anchor="middle">10</text>

  <text class="dg-label-xs" x="80" y="297" text-anchor="end">1</text>
  <text class="dg-label-xs" x="80" y="262" text-anchor="end">2</text>
  <text class="dg-label-xs" x="80" y="227" text-anchor="end">3</text>
  <text class="dg-label-xs" x="80" y="192" text-anchor="end">4</text>
  <text class="dg-label-xs" x="80" y="157" text-anchor="end">5</text>
  <text class="dg-label-xs" x="80" y="122" text-anchor="end">6</text>
  <text class="dg-label-xs" x="80" y="87" text-anchor="end">7</text>
  <text class="dg-label-xs" x="80" y="52" text-anchor="end">8</text>

  <line class="dg-curve-soft" x1="348" y1="48" x2="348" y2="328"></line>
  <text class="dg-label-sm" x="356" y="62">LRPC：u = uₙ = 5%</text>

  <line class="dg-curve" x1="88" y1="100.5" x2="608" y2="275.5"></line>
  <text class="dg-label-sm" x="470" y="220">SRPC₀（πᵉ=4%）</text>

  <line class="dg-curve-alt" x1="140" y1="48" x2="608" y2="205.5"></line>
  <text class="dg-label-sm" x="470" y="150">SRPC₁（πᵉ=6%）</text>

  <circle class="dg-point" cx="348" cy="188" r="4.5"></circle>
  <text class="dg-label-sm" x="356" y="204">E₀（5, 4）</text>
  <circle class="dg-point" cx="348" cy="118" r="4.5"></circle>
  <text class="dg-label-sm" x="356" y="134">E₁（5, 6）</text>
  <circle class="dg-point" cx="244" cy="153" r="4.5"></circle>
  <text class="dg-label-sm" x="214" y="149" text-anchor="end">A（3, 5）</text>
  <circle class="dg-point" cx="244" cy="83" r="4.5"></circle>
  <text class="dg-label-sm" x="214" y="79" text-anchor="end">B（3, 7）</text>

  <line class="dg-arrow" x1="420" y1="206" x2="420" y2="148" marker-end="url(#dg-phillips-arrow)"></line>
  <text class="dg-label-sm" x="430" y="182">πᵉ 上升</text>

  <text class="dg-label-xs" x="88" y="374">uₙ=5%、β=0.5、ε=0；πᵉ 由 4% 升至 6%</text>
</svg>`,
    variables: [
      ["\\(\\pi\\)", "通膨率", "縱軸；物價上漲率（%）。"],
      ["\\(u\\)", "失業率", "橫軸；實際失業率（%）。"],
      ["\\(\\pi^e\\)", "預期通膨率", "決定短期菲利浦曲線的位置；圖中由 4% 升至 6%。"],
      ["\\(u_n\\)", "自然失業率", "長期菲利浦曲線所在的失業率；圖中為 5%。"]
    ],
    parameters: [
      ["\\(\\beta\\)", "通膨對失業的反應", "β 越大，短期曲線越陡；圖中 β=0.5。"],
      ["\\(\\varepsilon\\)", "供給衝擊", "油價等成本衝擊會使短期曲線移動；圖中設 ε=0。"],
      ["\\(\\pi^e\\) 變動", "預期調整", "預期通膨上升使 SRPC 整條上移，長期失業率仍回到 uₙ。"]
    ],
    note: "圖為線性模型示意，不是離散資料插值；實際 SRPC 可能凸向原點，斜率也會隨制度與期間改變。圖中數值僅為教學示例。"
  },

  "macro-11#1": {
    sectionTitle: "第2節 匯率之決定",
    title: "外匯供需與均衡匯率",
    formula: String.raw`D(e)=S(e)`,
    caption: "縱軸為直接報價的匯率 e（新臺幣兌 1 美元），橫軸為外匯數量。外匯需求線向下、供給線向上，交點決定均衡匯率 e₀。外資流入或出口增加使外匯供給右移到 S₁，均衡匯率由 e₀ 下降到 e₁，代表新臺幣升值。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-fx-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-fx-title">外匯供需與均衡匯率圖</title>
  <defs>
    <marker id="dg-fx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="530" y="326">外匯數量 Q</text>
  <text class="dg-label" x="78" y="24">匯率 e</text>
  <line class="dg-curve" x1="110" y1="90" x2="560" y2="260"></line>
  <text class="dg-label" x="470" y="282">外匯需求 D</text>
  <line class="dg-curve-alt" x1="110" y1="260" x2="560" y2="90"></line>
  <text class="dg-label" x="470" y="82">外匯供給 S₀</text>
  <line class="dg-curve-soft" x1="180" y1="260" x2="590" y2="111"></line>
  <text class="dg-label" x="500" y="136">S₁</text>
  <line class="dg-arrow" x1="216" y1="220" x2="286" y2="220" marker-end="url(#dg-fx-arrow)"></line>
  <text class="dg-label-sm" x="216" y="210">外資流入／出口增加</text>
  <line class="dg-guide" x1="70" y1="175" x2="335" y2="175"></line>
  <line class="dg-guide" x1="373.68" y1="189.61" x2="373.68" y2="300"></line>
  <line class="dg-guide" x1="70" y1="189.61" x2="373.68" y2="189.61"></line>
  <circle class="dg-point" cx="335" cy="175" r="4.5"></circle>
  <text class="dg-label" x="306" y="170">E₀</text>
  <circle class="dg-point" cx="373.68" cy="189.61" r="4.5"></circle>
  <text class="dg-label" x="381" y="205">E₁</text>
  <text class="dg-label-sm" x="42" y="181">e₀</text>
  <text class="dg-label-sm" x="42" y="196">e₁</text>
</svg>`,
    variables: [
      ["e", "匯率", "直接報價：1 單位外幣可換多少本國貨幣。"],
      ["Q", "外匯數量", "外匯市場的交易量。"],
      ["D", "外匯需求", "進口、對外投資與償債等用途。"],
      ["S", "外匯供給", "出口、外資流入與海外所得匯回等來源。"]
    ],
    parameters: [
      ["本國利率", "相對報酬", "本國利率上升吸引資金流入，外匯供給增加、e 下降。"],
      ["外國利率", "相對報酬", "外國利率上升使資金外流，外匯需求增加、e 上升。"],
      ["預期匯率", "預期心理", "預期本國貨幣升值會提前帶來資金流入。"],
      ["央行干預", "政策變數", "央行買賣外匯會直接移動需求或供給曲線。"]
    ],
    note: "直接報價下，e 上升代表本國貨幣貶值、外幣升值；e 下降代表本國貨幣升值。遠期匯率另受兩國利差與預期影響。本圖只畫供給右移以隔離單一效果；實務上外資流入、出口與利率變動常同時影響供需兩條曲線。"
  },

  "macro-11#3": {
    sectionTitle: "第4節 匯率制度與央行外匯干預政策",
    title: "央行買匯干預：外匯需求右移",
    formula: String.raw`\text{固定匯率}+\text{資本自由移動}+\text{獨立貨幣政策}\le2`,
    caption: "央行在外匯市場買入美元時，外匯需求由 D₀ 右移到 D₁，均衡匯率由 e₀ 上升到 e₁，新臺幣貶值。若央行賣出美元，則是外匯供給增加，均衡匯率下降、新臺幣升值。未沖銷干預還會影響國內貨幣供給。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-intervention-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-intervention-title">央行外匯干預示意圖</title>
  <defs>
    <marker id="dg-intervention-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="530" y="326">外匯數量 Q</text>
  <text class="dg-label" x="78" y="24">匯率 e</text>
  <line class="dg-curve" x1="110" y1="90" x2="560" y2="260"></line>
  <text class="dg-label" x="474" y="282">D₀</text>
  <line class="dg-curve-alt" x1="110" y1="60" x2="560" y2="230"></line>
  <text class="dg-label" x="474" y="226">D₁</text>
  <line class="dg-curve-soft" x1="110" y1="260" x2="560" y2="90"></line>
  <text class="dg-label" x="474" y="82">外匯供給 S</text>
  <line class="dg-arrow" x1="189" y1="120" x2="269" y2="120" marker-end="url(#dg-intervention-arrow)"></line>
  <text class="dg-label-sm" x="180" y="110">央行買匯</text>
  <line class="dg-guide" x1="70" y1="175" x2="335" y2="175"></line>
  <line class="dg-guide" x1="70" y1="160" x2="374.71" y2="160"></line>
  <line class="dg-guide" x1="374.71" y1="160" x2="374.71" y2="300"></line>
  <circle class="dg-point" cx="335" cy="175" r="4.5"></circle>
  <text class="dg-label" x="306" y="170">E₀</text>
  <circle class="dg-point" cx="374.71" cy="160" r="4.5"></circle>
  <text class="dg-label" x="383" y="156">E₁</text>
  <text class="dg-label-sm" x="42" y="181">e₀</text>
  <text class="dg-label-sm" x="42" y="166">e₁</text>
</svg>`,
    variables: [
      ["e", "匯率", "直接報價；央行買匯使 e 上升。"],
      ["D、S", "外匯需求與供給", "央行干預直接移動其中一條曲線。"],
      ["外匯存底", "央行持有外幣資產", "買匯會增加外匯存底，同時釋出新臺幣。"],
      ["貨幣供給", "國內流動性", "未沖銷的買匯會使貨幣供給增加。"]
    ],
    parameters: [
      ["干預方向", "買匯或賣匯", "買匯阻升（或促貶）、賣匯阻貶（或促升）。"],
      ["沖銷政策", "貨幣政策搭配", "以發行定存單等方式沖銷，可減輕對貨幣供給的影響。"],
      ["匯率制度", "固定或浮動", "制度不同，央行干預的頻率與目的不同。"]
    ],
    note: "央行干預通常用於平滑短期波動或累積外匯存底，但難以長期對抗市場趨勢；未沖銷干預會與貨幣政策目標衝突。本圖只畫央行買匯造成的需求右移；實際干預時，民間外匯供給與需求可能同時變動，圖為教學上的單一衝擊。"
  },

  "macro-12#0": {
    sectionTitle: "第1節 金融體系",
    title: "金融體系的資金流向：直接金融與間接金融",
    formula: String.raw`\text{剩餘單位}\to\text{金融市場或中介}\to\text{不足單位}`,
    caption: "資金從剩餘單位流向不足單位，有兩條路徑：直接金融透過金融市場（股票、債券），間接金融透過金融中介（存款、放款）。中介提供期限轉換、風險分攤與資訊生產，並收取利差作為報酬。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-system-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-system-title">金融體系資金流向圖</title>
  <defs>
    <marker id="dg-system-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="30" y="120" width="170" height="88" rx="12"></rect>
  <text class="dg-label" x="115" y="154" text-anchor="middle">資金剩餘單位</text>
  <text class="dg-label-sm" x="115" y="180" text-anchor="middle">家庭、儲蓄者</text>
  <rect class="dg-box" x="440" y="120" width="170" height="88" rx="12"></rect>
  <text class="dg-label" x="525" y="154" text-anchor="middle">資金不足單位</text>
  <text class="dg-label-sm" x="525" y="180" text-anchor="middle">企業、政府</text>
  <rect class="dg-box" x="220" y="38" width="200" height="66" rx="12"></rect>
  <text class="dg-label" x="320" y="66" text-anchor="middle">金融市場</text>
  <text class="dg-label-sm" x="320" y="88" text-anchor="middle">直接金融：股票、債券</text>
  <rect class="dg-box" x="220" y="224" width="200" height="66" rx="12"></rect>
  <text class="dg-label" x="320" y="252" text-anchor="middle">金融中介</text>
  <text class="dg-label-sm" x="320" y="274" text-anchor="middle">間接金融：存款、放款</text>
  <line class="dg-arrow" x1="200" y1="140" x2="216" y2="104" marker-end="url(#dg-system-arrow)"></line>
  <line class="dg-arrow" x1="424" y1="104" x2="440" y2="140" marker-end="url(#dg-system-arrow)"></line>
  <line class="dg-arrow" x1="200" y1="188" x2="216" y2="224" marker-end="url(#dg-system-arrow)"></line>
  <line class="dg-arrow" x1="424" y1="224" x2="440" y2="188" marker-end="url(#dg-system-arrow)"></line>
  <line class="dg-arrow" x1="525" y1="228" x2="525" y2="212" marker-end="url(#dg-system-arrow)" stroke-dasharray="6 5"></line>
  <text class="dg-label-sm" x="536" y="246">利息、股利、還本</text>
  <line class="dg-arrow" x1="115" y1="228" x2="115" y2="212" marker-end="url(#dg-system-arrow)" stroke-dasharray="6 5"></line>
  <text class="dg-label-sm" x="62" y="246">所得回流</text>
</svg>`,
    variables: [
      ["S", "儲蓄（資金供給）", "剩餘單位提供的可貸資金。"],
      ["I", "投資（資金需求）", "不足單位籌措的資金用途。"],
      ["D", "存款", "間接金融下，資金進入中介的憑證。"],
      ["L", "放款", "中介將資金貸放給需求者。"]
    ],
    parameters: [
      ["交易成本", "市場摩擦", "中介以規模經濟降低搜尋與簽約成本。"],
      ["資訊不對稱", "逆選擇與道德風險", "中介與市場揭露可降低資訊問題。"],
      ["監理制度", "法規與存款保險", "維持金融穩定與投資人保護。"]
    ],
    note: "直接金融與間接金融不是互斥，而是互補；同一筆資金可能同時經過市場與中介。"
  }
,
  "macro-10#2-2": {
    sectionTitle: "第3節 菲利浦曲線",
    kicker: "學派模型 · 新凱因斯",
    title: "新凱因斯模型：NKPC 與 Taylor 規則",
    caption: "左圖 NKPC 以 β=1、κ=0.5、Eπ=2%（NKPC₀）與 3%（NKPC₁）繪製：π=βEπ+κy=Eπ+0.5y。預期通膨上升使整條線由 NKPC₀ 上移到 NKPC₁；A→B 顯示同一產出缺口 y=1% 下，通膨由 2.5% 升至 3.5%。右圖 Taylor 規則以 r*=1%、π*=2%、φπ=1.5、y=0 繪製：i=1+π+1.5(π−2)=2.5π−2；π*=2% 時 i*=3%。虛線為 φπ=−0.5 的較弱反應，實質利率隨通膨下降，不滿足 Taylor 原則。",
    formula: String.raw`\pi_t=\beta E_t\pi_{t+1}+\kappa y_t,\qquad i_t=r^*+\pi_t+\phi_\pi(\pi_t-\pi^*)+\phi_y y_t`,
    svg: `
<svg viewBox="0 0 680 420" role="img" aria-labelledby="dg-nkpc-title dg-nkpc-desc" style="max-width:680px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nkpc-title">新凱因斯菲利浦曲線與 Taylor 規則</title>
  <desc id="dg-nkpc-desc">左圖為 NKPC：橫軸產出缺口 y，縱軸通膨率 π；預期通膨由 2% 升至 3% 使 NKPC 由 NKPC₀ 上移到 NKPC₁。右圖為 Taylor 規則：橫軸通膨率 π，縱軸政策利率 i；實線 φπ=1.5 通過 π*=2%、i*=3%，虛線 φπ=−0.5 為較弱反應。</desc>
  <defs>
    <marker id="dg-nkpc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-panel" x="16" y="16" width="316" height="388" rx="14"></rect>
  <rect class="dg-panel" x="348" y="16" width="316" height="388" rx="14"></rect>

  <text class="dg-label" x="174" y="36" text-anchor="middle">NKPC：π = Eπ + κy</text>
  <text class="dg-label" x="64" y="54">通膨率 π（%）</text>
  <text class="dg-label" x="184" y="342" text-anchor="middle">產出缺口 y（%）</text>

  <g class="dg-grid">
    <line x1="64" y1="64" x2="64" y2="304"></line>
    <line x1="104" y1="64" x2="104" y2="304"></line>
    <line x1="144" y1="64" x2="144" y2="304"></line>
    <line x1="184" y1="64" x2="184" y2="304"></line>
    <line x1="224" y1="64" x2="224" y2="304"></line>
    <line x1="264" y1="64" x2="264" y2="304"></line>
    <line x1="304" y1="64" x2="304" y2="304"></line>
    <line x1="64" y1="64" x2="304" y2="64"></line>
    <line x1="64" y1="104" x2="304" y2="104"></line>
    <line x1="64" y1="144" x2="304" y2="144"></line>
    <line x1="64" y1="184" x2="304" y2="184"></line>
    <line x1="64" y1="224" x2="304" y2="224"></line>
    <line x1="64" y1="264" x2="304" y2="264"></line>
    <line x1="64" y1="304" x2="304" y2="304"></line>
  </g>

  <line class="dg-axis" x1="64" y1="304" x2="304" y2="304"></line>
  <line class="dg-axis" x1="64" y1="304" x2="64" y2="64"></line>

  <text class="dg-label-xs" x="64" y="322" text-anchor="middle">-2</text>
  <text class="dg-label-xs" x="104" y="322" text-anchor="middle">-1</text>
  <text class="dg-label-xs" x="144" y="322" text-anchor="middle">0</text>
  <text class="dg-label-xs" x="184" y="322" text-anchor="middle">1</text>
  <text class="dg-label-xs" x="224" y="322" text-anchor="middle">2</text>
  <text class="dg-label-xs" x="264" y="322" text-anchor="middle">3</text>
  <text class="dg-label-xs" x="304" y="322" text-anchor="middle">4</text>

  <text class="dg-label-xs" x="56" y="268" text-anchor="end">1</text>
  <text class="dg-label-xs" x="56" y="228" text-anchor="end">2</text>
  <text class="dg-label-xs" x="56" y="188" text-anchor="end">3</text>
  <text class="dg-label-xs" x="56" y="148" text-anchor="end">4</text>
  <text class="dg-label-xs" x="56" y="108" text-anchor="end">5</text>
  <text class="dg-label-xs" x="56" y="68" text-anchor="end">6</text>

  <line class="dg-curve" x1="64" y1="264" x2="304" y2="144"></line>
  <line class="dg-curve-alt" x1="64" y1="224" x2="304" y2="104"></line>
  <text class="dg-label-sm" x="240" y="215">NKPC₀</text>
  <text class="dg-label-sm" x="240" y="118">NKPC₁</text>

  <circle class="dg-point" cx="184" cy="204" r="4"></circle>
  <text class="dg-label-sm" x="176" y="200" text-anchor="end">A</text>
  <circle class="dg-point" cx="184" cy="164" r="4"></circle>
  <text class="dg-label-sm" x="176" y="160" text-anchor="end">B</text>
  <line class="dg-arrow" x1="184" y1="198" x2="184" y2="170" marker-end="url(#dg-nkpc-arrow)"></line>
  <text class="dg-label-sm" x="194" y="186">Eπ↑</text>

  <text class="dg-label-xs" x="64" y="368">κ=0.5；Eπ=2%→3%；y∈[−2,4]</text>

  <text class="dg-label" x="506" y="36" text-anchor="middle">Taylor 規則</text>
  <text class="dg-label" x="396" y="54">政策利率 i（%）</text>
  <text class="dg-label" x="516" y="342" text-anchor="middle">通膨率 π（%）</text>

  <g class="dg-grid">
    <line x1="396" y1="64" x2="396" y2="304"></line>
    <line x1="436" y1="64" x2="436" y2="304"></line>
    <line x1="476" y1="64" x2="476" y2="304"></line>
    <line x1="516" y1="64" x2="516" y2="304"></line>
    <line x1="556" y1="64" x2="556" y2="304"></line>
    <line x1="596" y1="64" x2="596" y2="304"></line>
    <line x1="636" y1="64" x2="636" y2="304"></line>
    <line x1="396" y1="64" x2="636" y2="64"></line>
    <line x1="396" y1="94" x2="636" y2="94"></line>
    <line x1="396" y1="124" x2="636" y2="124"></line>
    <line x1="396" y1="154" x2="636" y2="154"></line>
    <line x1="396" y1="184" x2="636" y2="184"></line>
    <line x1="396" y1="214" x2="636" y2="214"></line>
    <line x1="396" y1="244" x2="636" y2="244"></line>
    <line x1="396" y1="274" x2="636" y2="274"></line>
    <line x1="396" y1="304" x2="636" y2="304"></line>
  </g>

  <line class="dg-axis" x1="396" y1="304" x2="636" y2="304"></line>
  <line class="dg-axis" x1="396" y1="304" x2="396" y2="64"></line>

  <text class="dg-label-xs" x="396" y="322" text-anchor="middle">0</text>
  <text class="dg-label-xs" x="436" y="322" text-anchor="middle">1</text>
  <text class="dg-label-xs" x="476" y="322" text-anchor="middle">2</text>
  <text class="dg-label-xs" x="516" y="322" text-anchor="middle">3</text>
  <text class="dg-label-xs" x="556" y="322" text-anchor="middle">4</text>
  <text class="dg-label-xs" x="596" y="322" text-anchor="middle">5</text>
  <text class="dg-label-xs" x="636" y="322" text-anchor="middle">6</text>

  <text class="dg-label-xs" x="388" y="278" text-anchor="end">1</text>
  <text class="dg-label-xs" x="388" y="248" text-anchor="end">2</text>
  <text class="dg-label-xs" x="388" y="218" text-anchor="end">3</text>
  <text class="dg-label-xs" x="388" y="188" text-anchor="end">4</text>
  <text class="dg-label-xs" x="388" y="158" text-anchor="end">5</text>
  <text class="dg-label-xs" x="388" y="128" text-anchor="end">6</text>
  <text class="dg-label-xs" x="388" y="98" text-anchor="end">7</text>
  <text class="dg-label-xs" x="388" y="68" text-anchor="end">8</text>

  <line class="dg-curve-soft" x1="396" y1="244" x2="636" y2="154"></line>
  <line class="dg-curve" x1="428" y1="304" x2="556" y2="64"></line>
  <line class="dg-curve" x1="404" y1="82" x2="430" y2="82"></line>
  <text class="dg-label-sm" x="438" y="86">φπ=1.5</text>
  <line class="dg-curve-soft" x1="404" y1="106" x2="430" y2="106"></line>
  <text class="dg-label-sm" x="438" y="110">φπ=−0.5</text>

  <line class="dg-guide" x1="476" y1="214" x2="476" y2="304"></line>
  <line class="dg-guide" x1="396" y1="214" x2="476" y2="214"></line>
  <circle class="dg-point" cx="476" cy="214" r="4.5"></circle>
  <text class="dg-label-sm" x="484" y="230">E*</text>
  <text class="dg-label-sm" x="484" y="292">π*=2%</text>
  <text class="dg-label-sm" x="404" y="208">i*=3%</text>

  <text class="dg-label-xs" x="396" y="368">r*=1%、π*=2%、y=0</text>
</svg>`,
    variables: [
      ["\\(\\pi_t\\)", "當期通膨率", "NKPC 的左邊；物價上漲率。"],
      ["\\(E_t\\pi_{t+1}\\)", "預期通膨", "廠商與家計對下一期通膨的預期。"],
      ["\\(y_t\\)", "產出缺口", "實際產出相對潛在產出的偏離（%）。"],
      ["\\(i_t\\)", "名目政策利率", "央行設定的短期利率。"],
      ["\\(r^*\\)", "中性實質利率", "長期均衡的實質利率；圖中設 1%。"],
      ["\\(\\pi^*\\)", "通膨目標", "央行的目標通膨率；圖中設 2%。"]
    ],
    parameters: [
      ["\\(\\beta\\)", "折現因子", "未來通膨在 NKPC 中的權重；圖中設 β=1，故截距等於 Eπ。"],
      ["\\(\\kappa\\)", "菲利浦曲線斜率", "產出缺口對通膨的敏感度；圖中設 0.5。"],
      ["\\(\\phi_\\pi\\)", "通膨反應係數", "Taylor 規則對通膨缺口的反應；圖中實線 1.5、虛線 −0.5。"],
      ["\\(\\phi_y\\)", "產出反應係數", "Taylor 規則對產出缺口的反應；圖中設 0。"]
    ],
    note: "圖為線性模型示意，不是離散資料插值；NKPC 圖設 β=1 以簡化截距，實際 β<1 時截距為 βEπ。NKPC 的斜率與 Taylor 規則係數會隨模型設定與期間改變；實際央行也會考慮金融穩定、匯率與不確定性。"
  },
  "macro-11#1-2": {
    sectionTitle: "第2節 匯率之決定",
    kicker: "學派模型 · 開放經濟",
    title: "Mundell-Fleming：IS-LM-BP 與資本移動",
    caption: "Mundell-Fleming 模型把 IS-LM 擴充到開放經濟：IS* 是商品市場均衡，LM* 是貨幣市場均衡，BP 是國際收支均衡。資本完全移動時，BP 為水平線 i=i*。浮動匯率下，財政擴張推高所得與進口，造成升值與淨出口下降，效果被抵銷；貨幣擴張使利率下降、資本外流與貶值，淨出口增加，效果放大。固定匯率下，央行必須干預維持匯率，貨幣政策失去獨立性，財政政策效果較大。",
    formula: String.raw`Y=C(Y-T)+I(i)+G+NX(e),\qquad \frac{M}{P}=L(i,Y),\qquad i=i^*`,
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-mundell-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-mundell-title">Mundell-Fleming：IS-LM-BP 模型</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="558" y="326">所得 Y</text>
  <text class="dg-label" x="78" y="24">利率 i</text>
  <line class="dg-curve" x1="112" y1="92" x2="560" y2="252"></line>
  <line class="dg-curve-alt" x1="112" y1="252" x2="560" y2="92"></line>
  <line class="dg-curve-soft" x1="86" y1="170" x2="590" y2="170"></line>
  <text class="dg-label-sm" x="526" y="274">IS*</text>
  <text class="dg-label-sm" x="526" y="78">LM*</text>
  <text class="dg-label-sm" x="508" y="162">BP：i=i*</text>
  <line class="dg-guide" x1="336" y1="170" x2="336" y2="300"></line>
  <line class="dg-guide" x1="70" y1="170" x2="336" y2="170"></line>
  <circle class="dg-point" cx="336" cy="170" r="4.5"></circle>
  <text class="dg-label-sm" x="344" y="164">E</text>
  <text class="dg-label-sm" x="324" y="320">Y*</text>
  <text class="dg-label-sm" x="44" y="176">i*</text>
  <text class="dg-label-sm" x="84" y="54">資本完全移動</text>
</svg>`,
    variables: [
      ["Y", "所得與產出", "商品市場均衡的產出水準。"],
      ["i", "本國利率", "貨幣市場與國際資本移動共同決定。"],
      ["e", "匯率", "直接報價；e 上升代表本國貨幣貶值。"],
      ["G", "政府支出", "財政政策工具。"],
      ["T", "稅收", "影響可支配所得。"],
      ["M/P", "實質貨幣供給", "由央行決定。"],
      ["L(i,Y)", "貨幣需求", "利率與所得的函數。"],
      ["NX(e)", "淨出口", "匯率貶值通常改善淨出口。"],
      ["i^*", "國外利率", "資本完全移動下的國際利率。"]
    ],
    parameters: [
      ["資本移動程度", "BP 斜率", "完全移動時 BP 水平；不完全移動時向上。"],
      ["匯率制度", "浮動或固定", "決定政策效果與央行干預。"],
      ["經濟規模", "小型開放經濟", "本國利率不影響國際利率。"],
      ["價格水準", "短期固定", "Mundell-Fleming 多為短期分析。"],
      ["政策可信度", "預期與風險溢酬", "影響資本流動與匯率反應。"]
    ],
    note: "Mundell-Fleming 是短期、價格固定的開放經濟模型；長期仍須考慮物價、工資與經常帳調整。圖中的 BP 水平線對應資本完全移動。"
  }
});
