/* 總體經濟學 — 模型圖（第 12 章利率、第 13 章金融工具） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-12#1": {
    sectionTitle: "第2節 利率決定理論",
    title: "可貸資金市場：政府赤字與利率",
    caption: "可貸資金供給 S 向上、需求 D 向下，交點決定均衡利率 r₀。本圖採「民間儲蓄與國外資金流入為供給、投資與政府借款為需求」的畫法；政府赤字增加使需求由 D₀ 右移到 D₁，利率上升到 r₁，民間投資可能被排擠。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-loanable-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-loanable-title">可貸資金市場均衡圖</title>
  <defs>
    <marker id="dg-loanable-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="530" y="326">可貸資金數量 Q</text>
  <text class="dg-label" x="78" y="24">利率 r</text>
  <line class="dg-curve" x1="110" y1="90" x2="560" y2="260"></line>
  <text class="dg-label" x="470" y="282">D₀</text>
  <line class="dg-curve-alt" x1="110" y1="60" x2="560" y2="230"></line>
  <text class="dg-label" x="470" y="226">D₁</text>
  <line class="dg-curve-soft" x1="110" y1="260" x2="560" y2="90"></line>
  <text class="dg-label" x="470" y="82">S</text>
  <line class="dg-arrow" x1="189" y1="120" x2="269" y2="120" marker-end="url(#dg-loanable-arrow)"></line>
  <text class="dg-label-sm" x="186" y="110">政府赤字↑</text>
  <line class="dg-guide" x1="70" y1="175" x2="335" y2="175"></line>
  <line class="dg-guide" x1="70" y1="160" x2="374.71" y2="160"></line>
  <line class="dg-guide" x1="374.71" y1="160" x2="374.71" y2="300"></line>
  <circle class="dg-point" cx="335" cy="175" r="4.5"></circle>
  <text class="dg-label" x="306" y="170">E₀</text>
  <circle class="dg-point" cx="374.71" cy="160" r="4.5"></circle>
  <text class="dg-label" x="383" y="156">E₁</text>
  <text class="dg-label-sm" x="42" y="181">r₀</text>
  <text class="dg-label-sm" x="42" y="166">r₁</text>
</svg>`,
    variables: [
      ["r", "利率", "縱軸；可貸資金的價格。"],
      ["Q", "可貸資金數量", "橫軸；資金借貸總量。"],
      ["S", "可貸資金供給", "民間儲蓄與國外資金流入；不包括貨幣供給。"],
      ["D", "可貸資金需求", "投資、政府借款與消費借貸。"]
    ],
    parameters: [
      ["G − T", "政府赤字", "在本圖的需求面畫法下，赤字增加使需求右移、利率上升。"],
      ["儲蓄意願", "供給移動", "儲蓄增加使供給右移、利率下降。"],
      ["投資利率敏感度", "需求彈性", "越敏感，利率上升時投資減少越多。"],
      ["開放程度", "國際資金", "資金越自由移動，排擠效果越不明顯。"]
    ],
    note: "可貸資金理論與流動性偏好理論都決定利率，但前者強調儲蓄與投資的流量，後者強調貨幣存量供需。若改以國民儲蓄為供給，政府赤字會使供給左移，均衡利率同樣上升；兩種畫法的曲線移動方向不同，不可混用。"
  },

  "macro-12#2": {
    sectionTitle: "第3節 利率之風險結構",
    title: "風險結構：信用價差與殖利率",
    caption: "相同到期日下，不同債券因違約風險、流動性與稅負而有不同殖利率。公司債殖利率高於同期限政府公債，差額就是信用價差。信用評等越差、流動性越低，投資人要求的風險溢酬越高，殖利率也越高。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-risk-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-risk-title">利率風險結構與信用價差圖</title>
  <defs>
    <marker id="dg-risk-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="540" y="326">到期期間</text>
  <text class="dg-label" x="78" y="24">殖利率</text>
  <line class="dg-curve" x1="110" y1="220" x2="560" y2="110"></line>
  <text class="dg-label-sm" x="474" y="104">政府公債（無風險）</text>
  <line class="dg-curve-alt" x1="110" y1="150" x2="560" y2="66"></line>
  <text class="dg-label-sm" x="474" y="60">公司債（含風險溢酬）</text>
  <line class="dg-guide" x1="70" y1="103" x2="360" y2="103"></line>
  <line class="dg-guide" x1="70" y1="159" x2="360" y2="159"></line>
  <line class="dg-arrow" x1="360" y1="103" x2="360" y2="159" marker-end="url(#dg-risk-arrow)"></line>
  <text class="dg-label-sm" x="370" y="135">信用價差</text>
  <text class="dg-label-sm" x="42" y="109">公司債</text>
  <text class="dg-label-sm" x="42" y="165">公債</text>
</svg>`,
    variables: [
      ["風險溢酬", "違約與流動性補償", "風險越高，投資人要求的額外報酬越大。"],
      ["信用價差", "公司債減公債殖利率", "反映市場對信用風險的評價。"],
      ["信用評等", "違約風險評分", "評等越差，殖利率通常越高。"]
    ],
    parameters: [
      ["違約機率", "信用風險", "預期違約損失越大，價差越大。"],
      ["流動性", "變現能力", "流動性越差，殖利率越高。"],
      ["租稅", "稅後報酬", "利息稅負不同會造成殖利率差異。"],
      ["景氣", "風險偏好", "景氣惡化時信用價差通常擴大。"]
    ],
    note: "本圖為相同到期日下的比較；若到期日不同，還要區分期限結構（收益率曲線）的效果。「政府公債（無風險）」是考試慣例；政府公債仍有通膨、流動性與再投資風險，並非完全無風險。"
  },

  "macro-12#3": {
    sectionTitle: "第4節 利率之期限結構理論",
    title: "收益率曲線：正常、平坦與倒掛",
    caption: "收益率曲線描述相同信用風險下，不同到期日的殖利率關係。正常曲線向上，反映預期短期利率上升或期限溢酬；平坦曲線代表長短期利率接近；倒掛曲線則短期利率高於長期利率，常被視為景氣衰退的領先訊號。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-yieldcurve-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-yieldcurve-title">收益率曲線形狀圖</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="540" y="326">到期期間 n</text>
  <text class="dg-label" x="78" y="24">殖利率 y</text>
  <line class="dg-curve" x1="90" y1="240" x2="560" y2="90"></line>
  <text class="dg-label-sm" x="474" y="84">正常（上升）</text>
  <line class="dg-curve-alt" x1="90" y1="176" x2="560" y2="164"></line>
  <text class="dg-label-sm" x="474" y="158">平坦</text>
  <line class="dg-curve-soft" x1="90" y1="96" x2="560" y2="240"></line>
  <text class="dg-label-sm" x="474" y="258">倒掛（下降）</text>
  <text class="dg-label-sm" x="96" y="316">短期</text>
  <text class="dg-label-sm" x="536" y="316">長期</text>
</svg>`,
    variables: [
      ["y_n", "n 年期殖利率", "縱軸；不同到期日的市場殖利率。"],
      ["n", "到期期間", "橫軸；通常以年表示。"],
      ["f", "遠期利率", "由即期利率推導出的未來短期利率。"]
    ],
    parameters: [
      ["預期短期利率", "預期理論", "未來短期利率預期上升，曲線傾向向上。"],
      ["期限溢酬", "流動性溢酬理論", "長債需額外補償，使曲線偏向上。"],
      ["供需與偏好", "市場區隔理論", "各期限市場的資金供需與投資人偏好不同。"],
      ["景氣循環", "倒掛訊號", "倒掛常出現在緊縮後期，但不等於立即衰退。"]
    ],
    note: "預期理論、流動性溢酬理論、市場區隔理論與偏好棲息地理論，對曲線形狀有不同解釋，考試常比較其差異。"
  },

  "macro-12#4": {
    sectionTitle: "第5節 利率風險管理",
    title: "存續期間與凸性：價格對利率的敏感度",
    caption: "債券價格與殖利率反向且呈凸性。修正存續期間 D* 衡量價格對殖利率的線性敏感度；在 y₀ 的切線斜率為 −D* × P。用切線近似利率小幅變動的價格變化，利率變動越大，實際價格曲線與切線的差距越大，需要凸性項修正。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-duration-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-duration-title">存續期間與凸性示意圖</title>
  <defs>
    <marker id="dg-duration-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="540" y="326">殖利率 y</text>
  <text class="dg-label" x="78" y="24">債券價格 P</text>
  <path class="dg-curve" d="M100,80 C180,120 420,260 560,270"></path>
  <text class="dg-label-sm" x="470" y="286">實際價格曲線（凸性）</text>
  <line class="dg-curve-alt" x1="180" y1="126" x2="520" y2="286" stroke-dasharray="7 6"></line>
  <text class="dg-label-sm" x="130" y="86">切線：存續期間近似</text>
  <line class="dg-guide" x1="307" y1="186" x2="307" y2="300"></line>
  <line class="dg-guide" x1="70" y1="186" x2="307" y2="186"></line>
  <circle class="dg-point" cx="307" cy="186" r="4.5"></circle>
  <text class="dg-label-sm" x="284" y="180">y₀</text>
  <text class="dg-label-sm" x="42" y="192">P₀</text>
  <text class="dg-label-sm" x="404" y="316">利率上升 Δy</text>
  <text class="dg-label-sm" x="228" y="316">利率下降</text>
</svg>`,
    variables: [
      ["P", "債券價格", "縱軸；與殖利率反向。"],
      ["y", "殖利率", "橫軸；市場要求的報酬率。"],
      ["D*", "修正存續期間", "D* = D ÷ (1 + y/k)；衡量價格對利率的線性敏感度。"],
      ["凸性", "價格曲線曲度", "修正存續期間在較大利率變動下的誤差。"]
    ],
    parameters: [
      ["票息", "現金流大小", "票息越高，存續期間越短。"],
      ["到期期間", "現金流時間", "到期越長，存續期間越長、利率風險越大。"],
      ["Δy", "殖利率變動", "以小數表示；1 個百分點 = 0.01。"],
      ["凸性大小", "價格曲線彎曲程度", "凸性越大，對投資人越有利。"],
      ["k", "每年計息次數", "每期殖利率為 y ÷ k，期間單位須一致。"]
    ],
    note: "價格變動率近似為 ΔP/P ≈ −D* × Δy + ½ × 凸性 × (Δy)²。存續期間適合小幅利率變動，大幅變動要加入凸性。"
  },

  "macro-13#6": {
    sectionTitle: "第7節 衍生性金融商品",
    title: "選擇權到期價值：買權與賣權",
    caption: "橫軸為到期時標的價格 S_T，縱軸為到期價值。買權到期價值為 max(S_T − K, 0)，標的價格超過履約價 K 才開始有價值；賣權為 max(K − S_T, 0)，標的價格低於 K 才有價值。買方最大損失是權利金，賣方風險可能很大。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-option-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-option-title">買權與賣權到期價值圖</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="600" y="326" text-anchor="end">標的價格 S_T</text>
  <text class="dg-label" x="78" y="24">到期價值</text>
  <line class="dg-guide" x1="70" y1="250" x2="608" y2="250"></line>
  <text class="dg-label-sm" x="580" y="244">0</text>
  <line class="dg-guide" x1="330" y1="250" x2="330" y2="300"></line>
  <text class="dg-label-sm" x="324" y="318">K</text>
  <path class="dg-curve" d="M90,250 L330,250 L560,110"></path>
  <text class="dg-label-sm" x="440" y="166">買權價值</text>
  <path class="dg-curve-alt" d="M90,110 L330,250 L560,250"></path>
  <text class="dg-label-sm" x="150" y="138">賣權價值</text>
  <text class="dg-label-sm" x="120" y="238">標的價格低於 K</text>
  <text class="dg-label-sm" x="400" y="238">標的價格高於 K</text>
</svg>`,
    variables: [
      ["S_T", "到期標的價格", "橫軸；到期時現貨或指數的價格。"],
      ["到期價值", "內含價值", "買權 max(S_T − K, 0)、賣權 max(K − S_T, 0)。"],
      ["價內程度", "S_T 與 K 的關係", "買權：S_T > K 為價內；賣權：S_T < K 為價內；相等為價平。"]
    ],
    parameters: [
      ["K", "履約價", "決定價內、價平、價外。"],
      ["權利金", "買方支付的成本", "不影響到期價值，但影響損益；買方最大損失是權利金。"]
    ],
    note: "本圖為到期價值，不是損益；買方損益還須扣除權利金，賣方則收取權利金但承擔較大風險。波動率與到期時間影響的是到期前的選擇權價格，不是到期價值。"
  }
});
