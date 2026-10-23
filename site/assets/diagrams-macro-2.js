/* 總體經濟學 — 模型圖（第 5 章貨幣需求、第 6 章 IS-LM） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-05#1": {
    sectionTitle: "第2節 貨幣需求理論",
    title: "流動性偏好：貨幣需求移動與利率",
    formula: String.raw`M/P=L(Y,i)`,
    caption: "貨幣供給 Ms 由央行決定，在圖上是垂直線；貨幣需求 Md 與利率反向。所得增加使 Md 由 Md₀ 右移到 Md₁，均衡利率由 i₀ 上升到 i₁。若央行增加貨幣供給使 Ms 右移，均衡利率則會下降。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-liquidity-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-liquidity-title">流動性偏好與利率決定</title>
  <defs>
    <marker id="dg-liquidity-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="540" y="326">實質貨幣數量 M/P</text>
  <text class="dg-label" x="78" y="24">利率 i</text>
  <line class="dg-curve" x1="120" y1="90" x2="560" y2="288"></line>
  <text class="dg-label" x="470" y="268">Md₀</text>
  <line class="dg-curve-alt" x1="210" y1="90" x2="590" y2="261"></line>
  <text class="dg-label" x="500" y="238">Md₁</text>
  <line class="dg-curve-soft" x1="330" y1="64" x2="330" y2="298"></line>
  <text class="dg-label-sm" x="338" y="78">Ms</text>
  <line class="dg-arrow" x1="164" y1="112" x2="254" y2="112" marker-end="url(#dg-liquidity-arrow)"></line>
  <text class="dg-label-sm" x="176" y="102">所得↑</text>
  <line class="dg-guide" x1="70" y1="184.5" x2="330" y2="184.5"></line>
  <line class="dg-guide" x1="70" y1="144" x2="330" y2="144"></line>
  <circle class="dg-point" cx="330" cy="184.5" r="4.5"></circle>
  <text class="dg-label" x="300" y="180">E₀</text>
  <circle class="dg-point" cx="330" cy="144" r="4.5"></circle>
  <text class="dg-label" x="300" y="140">E₁</text>
  <text class="dg-label-sm" x="42" y="190">i₀</text>
  <text class="dg-label-sm" x="42" y="150">i₁</text>
</svg>`,
    variables: [
      ["i", "利率", "縱軸；持有貨幣的機會成本。"],
      ["M/P", "實質貨幣數量", "橫軸；M 為名目貨幣供給，P 為物價。"],
      ["Md", "貨幣需求", "與利率反向；所得增加會使整條曲線右移。"],
      ["Ms", "貨幣供給", "由央行決定，圖上為垂直線。"]
    ],
    parameters: [
      ["k", "貨幣需求的所得敏感度", "線性設定 Md/P = kY − hi 中，k 衡量所得變動對實質貨幣需求的影響；不是固定不變的所得彈性。"],
      ["h", "貨幣需求的利率敏感度", "同一線性設定中，h 衡量利率變動的影響；h 越大，Md 越平坦，極大時可能出現流動性陷阱。"],
      ["Y", "所得", "Y 增加使 Md 右移、i 上升。"],
      ["P", "物價", "P 上升使實質貨幣供給 M/P 減少、利率上升。"]
    ],
    note: "流動性偏好理論由凱因斯提出：利率是放棄流動性的報酬。貨幣需求動機包括交易、預防與投機動機。k 與 h 是敏感度係數；所得彈性與利率彈性會隨 Y、i 改變，不應把 k、h 直接稱為彈性。"
  },

  "macro-06#0": {
    sectionTitle: "第1節 IS曲線與LM曲線",
    title: "IS-LM 模型：商品市場與貨幣市場同時均衡",
    kicker: "學派模型 · 凱因斯／新古典綜合",
    formula: String.raw`IS:\ Y=C(Y-T)+I(i)+G,\qquad LM:\ M/P=L(Y,i)`,
    caption: "IS 曲線代表商品市場均衡，利率越高、投資越少，均衡所得越低，因此斜率向下；LM 曲線代表貨幣市場均衡，所得越高、貨幣需求越大，利率越高，因此斜率向上。兩線交點 E 決定同時均衡的所得 Y* 與利率 i*。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-islm-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-islm-title">IS-LM 模型均衡圖</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="566" y="326">所得 Y</text>
  <text class="dg-label" x="78" y="24">利率 i</text>
  <line class="dg-curve" x1="110" y1="100" x2="560" y2="260"></line>
  <text class="dg-label" x="530" y="282">IS</text>
  <line class="dg-curve-alt" x1="110" y1="260" x2="560" y2="90"></line>
  <text class="dg-label" x="530" y="82">LM</text>
  <line class="dg-guide" x1="328.18" y1="177.58" x2="328.18" y2="300"></line>
  <line class="dg-guide" x1="70" y1="177.58" x2="328.18" y2="177.58"></line>
  <circle class="dg-point" cx="328.18" cy="177.58" r="4.5"></circle>
  <text class="dg-label" x="338" y="172">E</text>
  <text class="dg-label-sm" x="316" y="320">Y*</text>
  <text class="dg-label-sm" x="44" y="184">i*</text>
</svg>`,
    variables: [
      ["Y", "實質所得", "橫軸；商品市場與貨幣市場的共同產出水準。"],
      ["i", "利率", "縱軸；影響投資與貨幣需求。"],
      ["IS", "商品市場均衡", "Y = C(Y − T) + I(i) + G；利率越低，均衡所得越高。"],
      ["LM", "貨幣市場均衡", "M/P = L(Y, i)；所得越高，貨幣需求越大、利率越高。"],
      ["E", "同時均衡點", "IS 與 LM 的交點，決定 Y* 與 i*。"]
    ],
    parameters: [
      ["MPC", "邊際消費傾向", "MPC 越大，IS 越平坦（乘數效果越大）。"],
      ["b", "投資對利率的敏感度", "b 越大，投資對利率越敏感，IS 越平坦。"],
      ["k", "貨幣需求對所得的敏感度", "k 越大，LM 越陡。"],
      ["h", "貨幣需求對利率的敏感度", "h 越大，LM 越平坦。"]
    ],
    note: "IS-LM 是短期、價格固定模型；價格改變時要改用 AD-AS 分析。"
  },

  "macro-06#1": {
    sectionTitle: "第2節 總體經濟政策與IS-LM曲線",
    title: "財政政策與貨幣政策的移動效果",
    formula: String.raw`G\uparrow:\ IS\rightarrow\text{右},\qquad M\uparrow:\ LM\rightarrow\text{右}`,
    caption: "左圖：政府支出增加使 IS 右移到 IS₁，所得由 Y₀ 增加到 Y₁，但利率上升，可能排擠民間投資。右圖：央行增加貨幣供給使 LM 右移到 LM₁，所得增加且利率下降，對投資有利。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-policy-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-policy-title">財政政策與貨幣政策的IS-LM效果</title>
  <defs>
    <marker id="dg-policy-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-panel" x="20" y="20" width="286" height="316" rx="14"></rect>
  <rect class="dg-panel" x="334" y="20" width="286" height="316" rx="14"></rect>
  <text class="dg-label" x="163" y="48" text-anchor="middle">財政政策：G↑</text>
  <text class="dg-label" x="477" y="48" text-anchor="middle">貨幣政策：M↑</text>
  <line class="dg-axis" x1="56" y1="290" x2="284" y2="290"></line>
  <line class="dg-axis" x1="56" y1="290" x2="56" y2="70"></line>
  <line class="dg-axis" x1="370" y1="290" x2="598" y2="290"></line>
  <line class="dg-axis" x1="370" y1="290" x2="370" y2="70"></line>
  <text class="dg-label-sm" x="270" y="310">Y</text>
  <text class="dg-label-sm" x="34" y="84">i</text>
  <text class="dg-label-sm" x="584" y="310">Y</text>
  <text class="dg-label-sm" x="348" y="84">i</text>
  <line class="dg-curve" x1="60" y1="90" x2="280" y2="250"></line>
  <line class="dg-curve-alt" x1="110" y1="90" x2="284" y2="216"></line>
  <line class="dg-curve-soft" x1="60" y1="240" x2="280" y2="100"></line>
  <text class="dg-label-sm" x="256" y="272">IS₀</text>
  <text class="dg-label-sm" x="262" y="196">IS₁</text>
  <text class="dg-label-sm" x="250" y="96">LM</text>
  <line class="dg-arrow" x1="96" y1="80" x2="146" y2="80" marker-end="url(#dg-policy-arrow)"></line>
  <text class="dg-label-sm" x="152" y="84">G↑</text>
  <line class="dg-guide" x1="170" y1="170" x2="170" y2="290"></line>
  <line class="dg-guide" x1="196.87" y1="152.9" x2="196.87" y2="290"></line>
  <circle class="dg-point" cx="170" cy="170" r="4"></circle>
  <text class="dg-label-sm" x="132" y="164">E₀</text>
  <circle class="dg-point" cx="196.87" cy="152.9" r="4"></circle>
  <text class="dg-label-sm" x="204" y="148">E₁</text>
  <text class="dg-label-sm" x="160" y="310">Y₀</text>
  <text class="dg-label-sm" x="190" y="310">Y₁</text>
  <line class="dg-curve" x1="374" y1="90" x2="594" y2="250"></line>
  <line class="dg-curve-soft" x1="374" y1="240" x2="594" y2="100"></line>
  <line class="dg-curve-alt" x1="424" y1="240" x2="598" y2="129"></line>
  <text class="dg-label-sm" x="570" y="272">IS</text>
  <text class="dg-label-sm" x="564" y="96">LM₀</text>
  <text class="dg-label-sm" x="576" y="130">LM₁</text>
  <line class="dg-arrow" x1="410" y1="80" x2="460" y2="80" marker-end="url(#dg-policy-arrow)"></line>
  <text class="dg-label-sm" x="466" y="84">M↑</text>
  <line class="dg-guide" x1="484" y1="170" x2="484" y2="290"></line>
  <line class="dg-guide" x1="507.24" y1="186.9" x2="507.24" y2="290"></line>
  <circle class="dg-point" cx="484" cy="170" r="4"></circle>
  <text class="dg-label-sm" x="446" y="164">E₀</text>
  <circle class="dg-point" cx="507.24" cy="186.9" r="4"></circle>
  <text class="dg-label-sm" x="514" y="200">E₁</text>
  <text class="dg-label-sm" x="474" y="310">Y₀</text>
  <text class="dg-label-sm" x="499" y="310">Y₁</text>
</svg>`,
    variables: [
      ["Y", "所得", "政策變動後均衡所得的變化。"],
      ["i", "利率", "財政政策使利率上升；寬鬆貨幣政策使利率下降。"],
      ["IS", "商品市場均衡", "財政政策透過 IS 移動。"],
      ["LM", "貨幣市場均衡", "貨幣政策透過 LM 移動。"],
      ["E", "均衡點", "由 E₀ 移動到 E₁。"]
    ],
    parameters: [
      ["G", "政府支出", "G 增加使 IS 右移；減稅效果類似。"],
      ["T", "租稅", "T 減少使可支配所得增加，IS 右移。"],
      ["M/P", "實質貨幣供給", "M 增加使 LM 右移；P 下降也有相同方向的效果。"],
      ["b、h", "敏感度參數", "b 影響 IS 斜率，h 影響 LM 斜率，決定政策效果大小。"]
    ],
    note: "財政擴張可能排擠民間投資（crowding out）；貨幣擴張則透過利率下降刺激投資。實際效果取決於 IS 與 LM 的斜率。"
  },

  "macro-06#2": {
    sectionTitle: "第3節 IS-LM模型與總體經濟政策有效性",
    title: "LM 斜率與政策有效性：陡峭與平坦的比較",
    formula: String.raw`LM:\ M/P=L(i,Y)`,
    caption: "左圖 LM 陡峭（h 小）：財政擴張使利率大幅上升、排擠效果大，所得增加有限；貨幣擴張則效果大。右圖 LM 平坦（h 大，接近流動性陷阱）：財政擴張幾乎不推升利率，所得增加大；貨幣擴張效果小。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-effective-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-effective-title">LM斜率與政策有效性比較圖</title>
  <defs>
    <marker id="dg-effective-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-panel" x="20" y="20" width="286" height="316" rx="14"></rect>
  <rect class="dg-panel" x="334" y="20" width="286" height="316" rx="14"></rect>
  <text class="dg-label" x="163" y="48" text-anchor="middle">LM 陡峭：財政效果小</text>
  <text class="dg-label" x="477" y="48" text-anchor="middle">LM 平坦：財政效果大</text>
  <line class="dg-axis" x1="56" y1="290" x2="284" y2="290"></line>
  <line class="dg-axis" x1="56" y1="290" x2="56" y2="70"></line>
  <line class="dg-axis" x1="370" y1="290" x2="598" y2="290"></line>
  <line class="dg-axis" x1="370" y1="290" x2="370" y2="70"></line>
  <text class="dg-label-sm" x="270" y="310">Y</text>
  <text class="dg-label-sm" x="34" y="84">i</text>
  <text class="dg-label-sm" x="584" y="310">Y</text>
  <text class="dg-label-sm" x="348" y="84">i</text>
  <line class="dg-curve" x1="60" y1="90" x2="270" y2="240"></line>
  <line class="dg-curve-alt" x1="110" y1="90" x2="284" y2="214"></line>
  <line class="dg-curve-soft" x1="70" y1="240" x2="240" y2="70"></line>
  <text class="dg-label-sm" x="248" y="262">IS₀</text>
  <text class="dg-label-sm" x="256" y="196">IS₁</text>
  <text class="dg-label-sm" x="222" y="76">LM</text>
  <line class="dg-arrow" x1="96" y1="80" x2="146" y2="80" marker-end="url(#dg-effective-arrow)"></line>
  <text class="dg-label-sm" x="152" y="84">G↑</text>
  <circle class="dg-point" cx="153.33" cy="156.67" r="4"></circle>
  <text class="dg-label-sm" x="120" y="150">E₀</text>
  <circle class="dg-point" cx="174.23" cy="135.77" r="4"></circle>
  <text class="dg-label-sm" x="181" y="132">E₁</text>
  <text class="dg-label-sm" x="142" y="310">Y₀</text>
  <text class="dg-label-sm" x="168" y="310">Y₁</text>
  <line class="dg-curve" x1="374" y1="90" x2="584" y2="240"></line>
  <line class="dg-curve-alt" x1="424" y1="90" x2="598" y2="214"></line>
  <line class="dg-curve-soft" x1="380" y1="175" x2="590" y2="168"></line>
  <text class="dg-label-sm" x="562" y="262">IS₀</text>
  <text class="dg-label-sm" x="570" y="196">IS₁</text>
  <text class="dg-label-sm" x="560" y="160">LM</text>
  <line class="dg-arrow" x1="410" y1="80" x2="460" y2="80" marker-end="url(#dg-effective-arrow)"></line>
  <text class="dg-label-sm" x="466" y="84">G↑</text>
  <circle class="dg-point" cx="487.96" cy="171.4" r="4"></circle>
  <text class="dg-label-sm" x="454" y="165">E₀</text>
  <circle class="dg-point" cx="535.98" cy="169.8" r="4"></circle>
  <text class="dg-label-sm" x="543" y="185">E₁</text>
  <text class="dg-label-sm" x="480" y="310">Y₀</text>
  <text class="dg-label-sm" x="528" y="310">Y₁</text>
</svg>`,
    variables: [
      ["Y", "所得", "政策效果的比較基準。"],
      ["i", "利率", "LM 越陡，財政擴張推升利率越多。"],
      ["LM", "貨幣市場均衡", "斜率由 h 與 k 決定；h 越小越陡。"],
      ["IS", "商品市場均衡", "G↑ 使 IS 右移。"]
    ],
    parameters: [
      ["h", "貨幣需求利率敏感度", "h 小：LM 陡，財政效果小、貨幣效果大；h 大：LM 平坦，反之。"],
      ["k", "貨幣需求所得敏感度", "k 大：LM 陡，財政效果小。"],
      ["MPC、b", "支出與投資敏感度", "b 越大，IS 越平坦，排擠效果越大、財政效果較小；MPC 越大則乘數越大，財政效果較大。兩者都會使 IS 較平坦，但對財政效果的影響方向不同，不能只看斜率。"],
      ["流動性陷阱", "h 趨近無限大", "LM 接近水平，貨幣政策失效，財政政策效果最大。"]
    ],
    note: "政策有效性沒有單一答案：必須看 IS 與 LM 的相對斜率，以及經濟是否處於流動性陷阱或投資陷阱。本圖比較 h 變動造成的 LM 斜率差異；若斜率改變來自 k，財政與貨幣效果可能同時變小，不能直接把陡峭 LM 解讀成貨幣政策一定更有效。"
  }
});
