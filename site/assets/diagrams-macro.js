/* 總體經濟學 — 模型圖（第 1、2、5 章：循環流量、簡單凱因斯、貨幣供需）
   每個圖以 inline SVG 呈現模型曲線與移動方向，並列出變數與參數。
   圖為考試複習用的概念示意，不代表實際數值；載入順序需在 app.js 之前。 */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-01#0": {
    sectionTitle: "第1節 國民所得與GDP",
    title: "兩部門循環流量圖：生產、所得與支出的循環",
    caption: "家計提供生產要素給廠商，廠商支付要素報酬；廠商生產最終財貨與勞務，家計以消費支出購買。上半部是要素市場，下半部是商品市場。同一條循環可以從生產面、所得面與支出面衡量，理論上三面法的 GDP 會相等。",
    svg: `
<svg viewBox="0 0 640 340" role="img" aria-labelledby="dg-flow-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-flow-title">兩部門循環流量圖</title>
  <defs>
    <marker id="dg-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="40" y="122" width="164" height="84" rx="12"></rect>
  <text class="dg-label" x="122" y="156" text-anchor="middle">家計單位</text>
  <text class="dg-label-sm" x="122" y="182" text-anchor="middle">提供要素、取得所得</text>
  <rect class="dg-box" x="436" y="122" width="164" height="84" rx="12"></rect>
  <text class="dg-label" x="518" y="156" text-anchor="middle">廠商</text>
  <text class="dg-label-sm" x="518" y="182" text-anchor="middle">僱用要素、生產商品</text>
  <line class="dg-arrow" x1="206" y1="64" x2="434" y2="64" marker-end="url(#dg-flow-arrow)"></line>
  <text class="dg-label-sm" x="320" y="52" text-anchor="middle">生產要素（勞動、資本、土地）</text>
  <line class="dg-arrow" x1="434" y1="98" x2="206" y2="98" marker-end="url(#dg-flow-arrow)"></line>
  <text class="dg-label-sm" x="320" y="116" text-anchor="middle">要素報酬（工資、租金、利息、利潤）</text>
  <line class="dg-arrow" x1="206" y1="232" x2="434" y2="232" marker-end="url(#dg-flow-arrow)"></line>
  <text class="dg-label-sm" x="320" y="222" text-anchor="middle">消費支出（C）</text>
  <line class="dg-arrow" x1="434" y1="266" x2="206" y2="266" marker-end="url(#dg-flow-arrow)"></line>
  <text class="dg-label-sm" x="320" y="286" text-anchor="middle">最終財貨與勞務</text>
</svg>`,
    variables: [
      ["Y", "國民所得（GDP）", "同一條循環可用生產面、所得面與支出面衡量。"],
      ["C", "消費支出", "家計購買最終財貨與勞務的支出。"],
      ["I", "投資", "廠商購買資本財的支出；兩部門模型下 S = I。"],
      ["W", "要素報酬", "工資、租金、利息與利潤的總和，形成所得面 GDP。"],
      ["S", "儲蓄", "所得未用於消費的部分；兩部門模型下 S = I。"]
    ],
    parameters: [
      ["MPC", "邊際消費傾向", "消費增量佔所得增量的比例，0 < MPC < 1。"],
      ["s", "邊際儲蓄傾向", "s = 1 − MPC；兩部門模型中儲蓄等於投資。"]
    ],
    note: "本圖為兩部門簡化版本，只畫要素市場與商品市場，未另畫金融市場。I 與 S 是輔助變數，不是圖上的獨立箭頭；S = I 僅在無政府、無國際貿易的兩部門模型成立。加入政府與國外部門後，支出面成為 GDP = C + I + G + (X − M)。"
  },

  "macro-02#0": {
    sectionTitle: "第1節 均衡所得之決定",
    title: "簡單凱因斯模型：總支出線與45度線決定均衡所得",
    caption: "45 度線代表 AE = Y。AE₀ 與 45 度線交於 E₀，決定均衡所得 Y₀。政府支出或自發支出增加會使 AE 平行上移到 AE₁，均衡點移到 E₁，所得由 Y₀ 增加到 Y₁；增加幅度是自發支出變動量乘以乘數。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-keynes-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-keynes-title">簡單凱因斯模型均衡所得圖</title>
  <defs>
    <marker id="dg-keynes-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="566" y="326">所得 Y</text>
  <text class="dg-label" x="78" y="24">AE</text>
  <line class="dg-curve-soft" x1="70" y1="300" x2="560" y2="60"></line>
  <text class="dg-label-sm" x="452" y="84">45°：AE = Y</text>
  <line class="dg-curve" x1="70" y1="230" x2="560" y2="140"></line>
  <text class="dg-label" x="526" y="136">AE₀</text>
  <line class="dg-curve-alt" x1="70" y1="190" x2="560" y2="100"></line>
  <text class="dg-label" x="526" y="96">AE₁</text>
  <line class="dg-arrow" x1="200" y1="206" x2="200" y2="166" marker-end="url(#dg-keynes-arrow)"></line>
  <text class="dg-label-sm" x="210" y="192">自發支出↑</text>
  <line class="dg-guide" x1="298.67" y1="188" x2="298.67" y2="300"></line>
  <line class="dg-guide" x1="429.33" y1="124" x2="429.33" y2="300"></line>
  <circle class="dg-point" cx="298.67" cy="188" r="4.5"></circle>
  <text class="dg-label" x="264" y="180">E₀</text>
  <circle class="dg-point" cx="429.33" cy="124" r="4.5"></circle>
  <text class="dg-label" x="438" y="110">E₁</text>
  <text class="dg-label-sm" x="284" y="320">Y₀</text>
  <text class="dg-label-sm" x="414" y="320">Y₁</text>
</svg>`,
    variables: [
      ["Y", "實質所得（產出）", "橫軸；均衡所得由 AE 與 45 度線的交點決定。"],
      ["AE", "總支出", "縱軸；AE = C + I + G + NX。"],
      ["E", "均衡點", "AE 與 45 度線的交點，代表商品市場均衡。"]
    ],
    parameters: [
      ["MPC", "邊際消費傾向", "0 < MPC < 1。無比例稅、無進口的簡化模型中，AE 斜率為 MPC；若加入比例稅率 t 與邊際進口傾向 MPM，斜率為 MPC(1 − t) − MPM。"],
      ["A₀", "自發支出", "C₀ + I₀ + G₀ + NX₀；所得為零時仍存在的支出，決定 AE 截距。"],
      ["k", "簡單乘數", "封閉經濟下 k = 1 ÷ (1 − MPC)；所得變動 ΔY = k × ΔA₀。"],
      ["T", "租稅", "定額稅下可支配所得為 Y − T；減稅與增加自發支出效果類似。"]
    ],
    note: "簡單凱因斯模型假設價格與利率固定、產能未充分使用，因此均衡所得由總支出決定，而不是由供給面決定。"
  },

  "macro-02#2": {
    sectionTitle: "第3節 節儉的矛盾",
    title: "節儉的矛盾：自發儲蓄增加使總支出下移",
    caption: "家庭想多儲蓄會減少自發消費，使 AE 由 AE₀ 下移到 AE₁，均衡所得從 Y₀ 下降到 Y₁。所得下降後，實際儲蓄未必增加，甚至可能不變或減少，這就是節儉的矛盾。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-thrift-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-thrift-title">節儉的矛盾示意圖</title>
  <defs>
    <marker id="dg-thrift-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="566" y="326">所得 Y</text>
  <text class="dg-label" x="78" y="24">AE</text>
  <line class="dg-curve-soft" x1="70" y1="300" x2="560" y2="60"></line>
  <text class="dg-label-sm" x="452" y="84">45°：AE = Y</text>
  <line class="dg-curve" x1="70" y1="210" x2="560" y2="130"></line>
  <text class="dg-label" x="526" y="126">AE₀</text>
  <line class="dg-curve-alt" x1="70" y1="245" x2="560" y2="165"></line>
  <text class="dg-label" x="526" y="176">AE₁</text>
  <line class="dg-arrow" x1="180" y1="192" x2="180" y2="227" marker-end="url(#dg-thrift-arrow)"></line>
  <text class="dg-label-sm" x="190" y="216">自發消費↓</text>
  <line class="dg-guide" x1="345.63" y1="165" x2="345.63" y2="300"></line>
  <line class="dg-guide" x1="238.44" y1="217.5" x2="238.44" y2="300"></line>
  <circle class="dg-point" cx="345.63" cy="165" r="4.5"></circle>
  <text class="dg-label" x="352" y="152">E₀</text>
  <circle class="dg-point" cx="238.44" cy="217.5" r="4.5"></circle>
  <text class="dg-label" x="250" y="234">E₁</text>
  <text class="dg-label-sm" x="332" y="320">Y₀</text>
  <text class="dg-label-sm" x="224" y="320">Y₁</text>
</svg>`,
    variables: [
      ["Y", "實質所得", "均衡所得隨總支出移動。"],
      ["AE", "總支出", "自發消費下降會使整條 AE 線下移。"],
      ["S", "儲蓄", "S = Y − C；想增加儲蓄會先減少消費與所得。"]
    ],
    parameters: [
      ["C₀", "自發消費", "所得為零時的消費水準；C₀ 下降使 AE 截距下降。"],
      ["MPC", "邊際消費傾向", "AE 線斜率不變，因此是平行下移。"],
      ["k", "乘數", "所得減少的幅度是自發支出減少量的 k 倍。"]
    ],
    note: "節儉的矛盾成立於短期、價格固定且產能未充分使用的封閉經濟；長期或充分就業下，儲蓄增加可轉化為投資資金。"
  },

  "macro-05#0": {
    sectionTitle: "第1節 存款貨幣的創造與貨幣供給",
    title: "存款貨幣的創造：準備金與貨幣乘數",
    caption: "銀行收到原始存款後，只保留法定準備，其餘放款；放款又會成為其他銀行的存款，如此往復創造存款貨幣。準備金增加 ΔR 後，存款總增加額為 ΔR × 1 ÷ rr；rr 為法定準備率，rr 越低貨幣乘數越大。",
    svg: `
<svg viewBox="0 0 640 300" role="img" aria-labelledby="dg-money-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-money-title">存款貨幣創造流程圖</title>
  <defs>
    <marker id="dg-money-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-box" x="24" y="76" width="170" height="104" rx="12"></rect>
  <text class="dg-label" x="109" y="108" text-anchor="middle">銀行 A</text>
  <text class="dg-label-sm" x="109" y="132" text-anchor="middle">原始存款 +100</text>
  <text class="dg-label-sm" x="109" y="154" text-anchor="middle">準備 +10、放款 +90</text>
  <line class="dg-arrow" x1="198" y1="128" x2="238" y2="128" marker-end="url(#dg-money-arrow)"></line>
  <text class="dg-label-sm" x="218" y="116" text-anchor="middle">放款</text>
  <rect class="dg-box" x="242" y="76" width="170" height="104" rx="12"></rect>
  <text class="dg-label" x="327" y="108" text-anchor="middle">銀行 B</text>
  <text class="dg-label-sm" x="327" y="132" text-anchor="middle">存款 +90</text>
  <text class="dg-label-sm" x="327" y="154" text-anchor="middle">準備 +9、放款 +81</text>
  <line class="dg-arrow" x1="416" y1="128" x2="456" y2="128" marker-end="url(#dg-money-arrow)"></line>
  <text class="dg-label-sm" x="436" y="116" text-anchor="middle">放款</text>
  <rect class="dg-box" x="460" y="76" width="156" height="104" rx="12"></rect>
  <text class="dg-label" x="538" y="108" text-anchor="middle">後續銀行</text>
  <text class="dg-label-sm" x="538" y="132" text-anchor="middle">存款 +81、+72.9⋯</text>
  <text class="dg-label-sm" x="538" y="154" text-anchor="middle">準備 +8.1、+7.29⋯</text>
  <text class="dg-label" x="320" y="232" text-anchor="middle">總存款增加 ΔD = ΔR × 1 ÷ rr</text>
  <text class="dg-label-sm" x="320" y="260" text-anchor="middle">rr = 10% 且 ΔR = 100 時，ΔD = 1,000</text>
</svg>`,
    variables: [
      ["ΔR", "準備金增加", "央行釋出準備金或存款流入銀行體系的初始數量。"],
      ["ΔD", "存款增加", "銀行體系往復創造後的存款總增加額。"],
      ["D", "存款總額", "銀行體系內的存款餘額；原始存款加計後續創造的存款。"]
    ],
    parameters: [
      ["rr", "法定準備率", "rr 越高乘數越小；是央行直接控制的政策工具之一。"],
      ["e", "超額準備率", "銀行自願多保留的準備，會使實際乘數下降。"],
      ["c", "現金存款比率", "民眾持有現金佔存款的比率，會使貨幣乘數下降。"],
      ["m", "廣義貨幣乘數", "完整模型 m = (1 + c) ÷ (rr + e + c)；實際乘數通常小於簡單模型的 1 ÷ rr。"]
    ],
    note: "簡單貨幣乘數假設沒有超額準備與現金流失，因此是理論上限；實際貨幣供給還受銀行放款意願與民眾持幣行為影響。"
  }
});
