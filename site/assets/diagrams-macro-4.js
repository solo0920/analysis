/* 總體經濟學 — 模型圖（第 9 章菲利浦曲線、第 10 章外匯、第 11 章金融體系） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-09#2": {
    sectionTitle: "第3節 菲利浦曲線",
    title: "菲利浦曲線：短期取捨與長期垂直",
    caption: "短期菲利浦曲線 SRPC 為負斜率，失業率越低、通膨越高。預期通膨上升會使 SRPC 上移到 SRPC₁，同樣失業率下通膨更高。長期而言預期會調整到實際通膨，失業率回到自然失業率 uₙ，長期曲線 LRPC 為垂直線。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-phillips-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-phillips-title">菲利浦曲線短期與長期圖</title>
  <defs>
    <marker id="dg-phillips-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="566" y="326">失業率 u</text>
  <text class="dg-label" x="78" y="24">通膨率 π</text>
  <line class="dg-curve" x1="110" y1="90" x2="560" y2="260"></line>
  <text class="dg-label-sm" x="452" y="256">SRPC₀</text>
  <line class="dg-curve-alt" x1="110" y1="60" x2="560" y2="230"></line>
  <text class="dg-label-sm" x="452" y="226">SRPC₁</text>
  <line class="dg-curve-soft" x1="340" y1="50" x2="340" y2="296"></line>
  <text class="dg-label-sm" x="348" y="62">LRPC</text>
  <line class="dg-arrow" x1="280" y1="154" x2="280" y2="124" marker-end="url(#dg-phillips-arrow)"></line>
  <text class="dg-label-sm" x="290" y="148">πᵉ↑</text>
  <circle class="dg-point" cx="280" cy="154" r="4"></circle>
  <text class="dg-label-sm" x="248" y="146">A</text>
  <circle class="dg-point" cx="280" cy="124" r="4"></circle>
  <text class="dg-label-sm" x="288" y="120">B</text>
  <circle class="dg-point" cx="340" cy="177" r="4.5"></circle>
  <text class="dg-label-sm" x="348" y="172">E₀</text>
  <circle class="dg-point" cx="340" cy="147" r="4.5"></circle>
  <text class="dg-label-sm" x="348" y="142">E₁</text>
  <text class="dg-label-sm" x="326" y="320">uₙ</text>
</svg>`,
    variables: [
      ["π", "通膨率", "縱軸；物價上漲率。"],
      ["u", "失業率", "橫軸；實際失業率。"],
      ["πᵉ", "預期通膨率", "決定短期菲利浦曲線的位置。"],
      ["uₙ", "自然失業率", "長期菲利浦曲線所在的失業率，也稱非加速通膨失業率。"]
    ],
    parameters: [
      ["β", "通膨對失業的反應", "β 越大，短期曲線越陡。"],
      ["ε", "供給衝擊", "油價等成本衝擊會使短期曲線移動。"],
      ["預期調整", "長期調整機制", "預期通膨追上實際通膨後，失業率回到 uₙ。"]
    ],
    note: "短期政策可以在通膨與失業之間取捨；長期無法用通膨換取更低的失業率。停滯性通膨是供給衝擊使 SRPC 上移的結果。本圖只畫預期通膨上升造成的上移；實務上供給衝擊與預期變動可能同時發生。"
  },

  "macro-10#1": {
    sectionTitle: "第2節 匯率之決定",
    title: "外匯供需與均衡匯率",
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

  "macro-10#3": {
    sectionTitle: "第4節 匯率制度與央行外匯干預政策",
    title: "央行買匯干預：外匯需求右移",
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

  "macro-11#0": {
    sectionTitle: "第1節 金融體系",
    title: "金融體系的資金流向：直接金融與間接金融",
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
});
