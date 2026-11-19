/* 總體經濟學 — 模型圖（第 12 章利率、第 13 章金融工具） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-12#1": {
    sectionTitle: "第2節 利率決定理論",
    title: "可貸資金市場：政府赤字與利率",
    kicker: "學派模型 · 古典",
    formula: String.raw`S(r)=I(r)+(G-T)`,
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
    formula: String.raw`y_{\text{公司債}}=y_{\text{公債}}+\text{信用價差}`,
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
    formula: String.raw`(1+y_n)^n=(1+y_1)(1+f_2)\cdots(1+f_n)`,
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
    formula: String.raw`\frac{\Delta P}{P}\approx-D^*\Delta y+\frac12\text{Convexity}(\Delta y)^2`,
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
    formula: String.raw`\max(S_T-K,0),\qquad \max(K-S_T,0)`,
    caption: "橫軸為到期時標的價格 S_T，縱軸為到期價值。買權到期價值為 max(S_T − K, 0)，標的價格超過履約價 K 才開始有價值；賣權為 max(K − S_T, 0)，標的價格低於 K 才有價值。買方最大損失是權利金，賣方風險可能很大。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-option-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-option-title">買權與賣權到期價值圖</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="600" y="326" text-anchor="end">標的價格 S(T)</text>
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

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-04#0": {
    sectionTitle: "第1節 中央銀行",
    kicker: "題庫導向圖解",
    title: "準備金市場：公開市場買進使供給右移、利率下降",
    formula: String.raw`B=C+R,\qquad M=m\times B`,
    caption: "縱軸為短期利率 i，橫軸為準備金數量 R。準備金需求 D 向下；央行公開市場買進債券使準備金供給由 S0 右移到 S1，均衡由 E0 移到 E1，短期利率由 i0 降到 i1。貨幣基數 B 等於通貨 C 加準備金 R。",
    svg: `
<svg viewBox="0 0 640 380" role="img" aria-labelledby="dg-cbres-title dg-cbres-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-cbres-title">準備金市場：公開市場買進使供給右移、利率下降</title>
  <desc id="dg-cbres-desc">準備金需求向下，供給由 S0 右移到 S1，均衡利率由 i0 下降到 i1；貨幣基數等於通貨加準備金。</desc>
  <defs>
    <marker id="dg-cbres-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="330" x2="610" y2="330"></line>
  <line class="dg-axis" x1="70" y1="330" x2="70" y2="40"></line>
  <text class="dg-label-sm" x="610" y="352" text-anchor="end">準備金 R</text>
  <text class="dg-label-sm" x="62" y="34" text-anchor="end">利率 i</text>
  <path class="dg-curve" d="M120 127 L560 273"></path>
  <line class="dg-curve-alt" x1="310" y1="90" x2="310" y2="320"></line>
  <line class="dg-curve-soft" x1="430" y1="90" x2="430" y2="320"></line>
  <circle class="dg-point" cx="310" cy="190" r="5"></circle>
  <circle class="dg-point" cx="430" cy="230" r="5"></circle>
  <line class="dg-guide" x1="70" y1="190" x2="310" y2="190"></line>
  <line class="dg-guide" x1="70" y1="230" x2="430" y2="230"></line>
  <line class="dg-guide" x1="310" y1="190" x2="310" y2="330"></line>
  <line class="dg-guide" x1="430" y1="230" x2="430" y2="330"></line>
  <text class="dg-label-sm" x="64" y="194" text-anchor="end">i0</text>
  <text class="dg-label-sm" x="64" y="234" text-anchor="end">i1</text>
  <text class="dg-label-sm" x="310" y="348" text-anchor="middle">R0</text>
  <text class="dg-label-sm" x="430" y="348" text-anchor="middle">R1</text>
  <text class="dg-label-sm" x="545" y="258">D</text>
  <text class="dg-label-sm" x="318" y="84">S0</text>
  <text class="dg-label-sm" x="438" y="84">S1</text>
  <text class="dg-label-sm" x="250" y="180" text-anchor="end">E0</text>
  <text class="dg-label-sm" x="442" y="246">E1</text>
  <text class="dg-label-xs" x="320" y="26" text-anchor="middle">公開市場買進 → 準備金供給增加 → 短期利率下降</text>
  <text class="dg-label-xs" x="80" y="366">貨幣基數 B = 通貨 C + 準備金 R；準備金增加使 B 增加。</text>
</svg>`,
    variables: [
      ["i", "短期利率", "縱軸；準備金市場的價格。"],
      ["R", "準備金數量", "橫軸；銀行體系的準備金餘額。"],
      ["D", "準備金需求", "與利率反向；交易、清算與法定準備需求。"],
      ["S", "準備金供給", "由央行資產買賣決定；公開市場買進使供給右移。"],
      ["B", "貨幣基數", "通貨 C 加準備金 R；央行負債的一部分。"]
    ],
    parameters: [
      ["rr", "法定準備率", "提高 rr 會增加準備金需求。"],
      ["公開市場操作", "央行買賣債券", "買進增加準備金，賣出減少準備金。"],
      ["m", "貨幣乘數", "貨幣供給 M = m × B；m 由制度與行為決定。"]
    ],
    note: "本圖為概念示意，未按實際準備金供需數值繪製；公開市場買進同時增加央行資產與負債，實際利率效果還取決於準備金需求彈性與沖銷操作。"
  },

  "macro-05#4": {
    sectionTitle: "進階專題：泰勒法則、QTM 與準備金走廊",
    kicker: "題庫導向圖解",
    title: "準備金走廊與 QT：供給左移使短期利率向 IORB 靠攏",
    formula: String.raw`i_{ONRRP}\le i_{EFFR}\le i_{IORB}`,
    caption: "縱軸為政策利率，橫軸為準備金。準備金需求 D 向下；供給原為 S0，QT 使供給左移到 S1，均衡由 E0 移到 E1，短期利率上升。ON RRP 形成下限、IORB 形成銀行準備金報酬的參考上限；準備金充裕時，利率主要由走廊引導。",
    svg: `
<svg viewBox="0 0 640 380" role="img" aria-labelledby="dg-rescorr-title dg-rescorr-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-rescorr-title">準備金走廊與 QT：供給左移使短期利率上升</title>
  <desc id="dg-rescorr-desc">準備金需求向下，供給由 S0 左移到 S1，均衡利率由 i0 上升到 i1；ON RRP 是下限，IORB 是銀行準備金報酬參考。</desc>
  <line class="dg-axis" x1="70" y1="330" x2="610" y2="330"></line>
  <line class="dg-axis" x1="70" y1="330" x2="70" y2="40"></line>
  <text class="dg-label-sm" x="610" y="352" text-anchor="end">準備金 R</text>
  <text class="dg-label-sm" x="62" y="34" text-anchor="end">政策利率 i</text>
  <path class="dg-curve" d="M130 105 L560 280"></path>
  <line class="dg-curve-alt" x1="360" y1="95" x2="360" y2="320"></line>
  <line class="dg-curve-soft" x1="250" y1="95" x2="250" y2="320"></line>
  <line class="dg-guide" x1="70" y1="300" x2="610" y2="300"></line>
  <line class="dg-guide" x1="70" y1="130" x2="610" y2="130"></line>
  <circle class="dg-point" cx="360" cy="205" r="5"></circle>
  <circle class="dg-point" cx="250" cy="174" r="5"></circle>
  <line class="dg-guide" x1="70" y1="205" x2="360" y2="205"></line>
  <line class="dg-guide" x1="70" y1="174" x2="250" y2="174"></line>
  <text class="dg-label-sm" x="360" y="222" text-anchor="middle">E0</text>
  <text class="dg-label-sm" x="238" y="166" text-anchor="end">E1</text>
  <text class="dg-label-sm" x="368" y="89">S0</text>
  <text class="dg-label-sm" x="258" y="89">S1（QT）</text>
  <text class="dg-label-sm" x="540" y="292" text-anchor="end">ON RRP 下限</text>
  <text class="dg-label-sm" x="540" y="122" text-anchor="end">IORB 參考</text>
  <text class="dg-label-sm" x="64" y="209" text-anchor="end">i0</text>
  <text class="dg-label-sm" x="64" y="178" text-anchor="end">i1</text>
  <text class="dg-label-xs" x="320" y="26" text-anchor="middle">QT：準備金供給左移 → 短期利率上升 → 向走廊上限靠攏</text>
  <text class="dg-label-xs" x="80" y="366">準備金充裕時，利率由 IORB／ON RRP 走廊引導；供給數量不是唯一指標。</text>
</svg>`,
    variables: [
      ["i", "短期政策利率", "縱軸；有效聯邦資金利率或同業拆借利率。"],
      ["R", "準備金數量", "橫軸；銀行體系準備金。"],
      ["D", "準備金需求", "向下；準備金愈多，邊際流動性價值愈低。"],
      ["S", "準備金供給", "由央行資產與 QT 決定。"],
      ["E", "均衡點", "準備金供需交點，決定短期利率。"]
    ],
    parameters: [
      ["IORB", "準備金報酬", "銀行保留準備金的機會成本參考。"],
      ["ON RRP", "隔夜逆回購利率", "貨幣市場資金的下限。"],
      ["QT", "量化緊縮", "縮減央行資產負債表，供給左移。"]
    ],
    note: "本圖為概念示意；走廊上下限的相對位置、EFFR 與 SOFR 的實際交易區間，會隨制度、準備金豐裕程度與回購市場摩擦變動。"
  },

  "macro-10#6": {
    sectionTitle: "進階專題：REER、J 曲線與三元悖論",
    kicker: "題庫導向圖解",
    title: "J 曲線：貶值後貿易餘額先惡化、後改善",
    formula: String.raw`|\varepsilon_X|+|\varepsilon_M|>1`,
    caption: "橫軸為時間，縱軸為貿易餘額。本國貨幣貶值後，短期因進口成本上升、契約與價格調整不完全，貿易餘額先惡化；若馬歇爾-勒納條件成立，出口與進口替代效果逐漸顯現，貿易餘額之後改善，形成 J 字形。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-jcurve-title dg-jcurve-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-jcurve-title">J 曲線：貶值後貿易餘額先惡化後改善</title>
  <desc id="dg-jcurve-desc">橫軸為時間，縱軸為貿易餘額；貶值後曲線先下降至短期低點，再上升並轉為順差。</desc>
  <line class="dg-axis" x1="70" y1="300" x2="610" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="40"></line>
  <line class="dg-guide" x1="70" y1="190" x2="610" y2="190"></line>
  <text class="dg-label-sm" x="610" y="324" text-anchor="end">時間 t</text>
  <text class="dg-label-sm" x="62" y="34" text-anchor="end">貿易餘額 TB</text>
  <text class="dg-label-sm" x="80" y="182">0</text>
  <path class="dg-curve" d="M100 190 C 150 205 180 270 235 278 C 310 288 390 210 470 150 C 520 116 560 105 590 100"></path>
  <circle class="dg-point" cx="235" cy="278" r="5"></circle>
  <circle class="dg-point" cx="470" cy="150" r="5"></circle>
  <line class="dg-guide" x1="235" y1="278" x2="235" y2="300"></line>
  <line class="dg-guide" x1="470" y1="150" x2="470" y2="300"></line>
  <text class="dg-label-sm" x="235" y="322" text-anchor="middle">短期低點</text>
  <text class="dg-label-sm" x="470" y="322" text-anchor="middle">長期改善</text>
  <text class="dg-label-sm" x="120" y="176">貶值</text>
  <text class="dg-label-sm" x="300" y="250">貿易餘額惡化</text>
  <text class="dg-label-sm" x="480" y="130">轉為順差</text>
  <text class="dg-label-xs" x="320" y="26" text-anchor="middle">J 曲線成立的前提：出口與進口需求彈性合計大於 1</text>
</svg>`,
    variables: [
      ["TB", "貿易餘額", "出口減進口；縱軸。"],
      ["t", "時間", "橫軸；貶值後的效果隨時間展開。"],
      ["E", "匯率", "貶值使出口競爭力上升、進口成本上升。"],
      ["εX、εM", "出口與進口需求彈性", "決定貶值能否改善貿易餘額。"]
    ],
    parameters: [
      ["馬歇爾-勒納條件", "|εX| + |εM| > 1", "彈性足夠時，貶值長期改善貿易餘額。"],
      ["調整期間", "契約與價格調整速度", "調整越慢，J 曲線的低點越深、越晚改善。"],
      ["其他條件", "所得、供給鏈、貿易政策", "會使 J 曲線路徑偏離標準形狀。"]
    ],
    note: "本圖為概念示意，未按實際時間與金額繪製；J 曲線不是每國、每次貶值都會出現，若彈性不足或供給鏈受阻，貿易餘額可能持續惡化。"
  },

  "macro-13#0": {
    sectionTitle: "第1節 貨幣市場與資本市場比較整理",
    kicker: "題庫導向圖解",
    title: "金融工具地圖：貨幣市場、資本市場與衍生品",
    formula: String.raw`\text{金融市場}=\text{貨幣市場}+\text{資本市場}+\text{衍生品市場}`,
    caption: "金融市場依期限與工具性質分成三塊：貨幣市場交易一年以下短期工具，資本市場交易一年以上或無到期日證券，衍生品市場交易價值取決於標的資產的契約。箭頭表示資金與風險的流動，不是唯一分類方式。",
    svg: `
<svg viewBox="0 0 640 400" role="img" aria-labelledby="dg-finmap-title dg-finmap-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-finmap-title">金融工具地圖：貨幣市場、資本市場與衍生品</title>
  <desc id="dg-finmap-desc">金融市場分成貨幣市場、資本市場與衍生品市場；各自列出代表性工具與主要功能。</desc>
  <defs>
    <marker id="dg-finmap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box dg-box-accent" x="190" y="24" width="260" height="58" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="50" text-anchor="middle">金融市場</text>
  <text class="dg-label-xs" x="320" y="70" text-anchor="middle">資金供給者 ↔ 資金需求者</text>
  <line class="dg-arrow" x1="250" y1="84" x2="120" y2="130" marker-end="url(#dg-finmap-arrow)"></line>
  <line class="dg-arrow" x1="320" y1="84" x2="320" y2="130" marker-end="url(#dg-finmap-arrow)"></line>
  <line class="dg-arrow" x1="390" y1="84" x2="520" y2="130" marker-end="url(#dg-finmap-arrow)"></line>
  <rect class="dg-box" x="20" y="130" width="190" height="220" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="115" y="158" text-anchor="middle">貨幣市場</text>
  <text class="dg-label-xs" x="115" y="178" text-anchor="middle">一年以下</text>
  <text class="dg-label-sm" x="36" y="208">國庫券</text>
  <text class="dg-label-sm" x="36" y="234">商業本票 CP</text>
  <text class="dg-label-sm" x="36" y="260">銀行承兌匯票 BA</text>
  <text class="dg-label-sm" x="36" y="286">可轉讓定存單 NCD</text>
  <text class="dg-label-sm" x="36" y="312">附買回交易 RP</text>
  <text class="dg-label-xs" x="36" y="338">功能：短期資金調度</text>
  <rect class="dg-box" x="225" y="130" width="190" height="220" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="158" text-anchor="middle">資本市場</text>
  <text class="dg-label-xs" x="320" y="178" text-anchor="middle">一年以上或無到期日</text>
  <text class="dg-label-sm" x="241" y="208">政府公債</text>
  <text class="dg-label-sm" x="241" y="234">公司債</text>
  <text class="dg-label-sm" x="241" y="260">股票</text>
  <text class="dg-label-sm" x="241" y="286">共同基金／ETF</text>
  <text class="dg-label-sm" x="241" y="312">可轉換公司債</text>
  <text class="dg-label-xs" x="241" y="338">功能：長期籌資與投資</text>
  <rect class="dg-box" x="430" y="130" width="190" height="220" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="525" y="158" text-anchor="middle">衍生品市場</text>
  <text class="dg-label-xs" x="525" y="178" text-anchor="middle">價值取決於標的</text>
  <text class="dg-label-sm" x="446" y="208">遠期契約</text>
  <text class="dg-label-sm" x="446" y="234">期貨契約</text>
  <text class="dg-label-sm" x="446" y="260">選擇權</text>
  <text class="dg-label-sm" x="446" y="286">交換契約</text>
  <text class="dg-label-sm" x="446" y="312">結構型商品</text>
  <text class="dg-label-xs" x="446" y="338">功能：避險、投機、套利</text>
  <text class="dg-label-xs" x="320" y="384" text-anchor="middle">初級市場：新發行；次級市場：已發行證券交易</text>
</svg>`,
    variables: [
      ["期限", "工具到期期間", "一年以下為貨幣市場，一年以上或無到期日為資本市場。"],
      ["工具", "交易標的", "短期票券、債券、股票、基金或衍生契約。"],
      ["風險", "主要風險型態", "利率、信用、權益價格、流動性與交易對手風險。"],
      ["市場", "初級或次級", "初級市場籌資，次級市場提供流動性。"]
    ],
    parameters: [
      ["市場區隔", "依期限與功能分類", "同一工具可能跨市場，分類要看主要性質。"],
      ["流動性", "變現能力", "貨幣市場流動性通常較高。"],
      ["監理", "主管機關與規則", "不同工具適用不同法規與揭露要求。"]
    ],
    note: "本圖為概念分類，不是官方統計分類；ETF、可轉債與結構型商品可能同時具有多種性質，考試時要看題目問的是期限、現金流或風險。"
  }
});
