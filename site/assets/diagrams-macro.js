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

  "macro-01#2": {
    sectionTitle: "第3節 其他國民所得衡量工具",
    kicker: "教學流程圖",
    title: "國民所得會計帳流程圖：從三面法 GDP 到 PDI",
    caption: "生產面、支出面與所得面從不同角度衡量同一筆 GDP，事後帳上數值相等。從 GDP 加上國外要素所得淨額 NFIA 得到 GNI，再依序扣除折舊 D 與間接稅淨額 NIT，得到 NNP 與 NI；NI 調整公司稅、未分配盈餘、社會安全捐、移轉支付與淨利息後得到 PI，最後扣除個人直接稅 Tp，得到 PDI = C + S。",
    svg: `
<svg viewBox="0 0 640 690" role="img" aria-labelledby="dg-ni-title dg-ni-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-ni-title">國民所得會計帳流程圖</title>
  <desc id="dg-ni-desc">生產面、支出面與所得面三種算法都得到 GDP；GDP 加國外要素所得淨額得到 GNI，再依序扣除折舊與間接稅淨額，調整公司稅、未分配盈餘、社會安全捐、移轉支付與淨利息，最後扣除個人直接稅得到 PDI，並拆分為消費與儲蓄。</desc>
  <defs>
    <marker id="dg-ni-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label-sm" x="320" y="18" text-anchor="middle">三面等價：同一筆 GDP 的三種算法</text>

  <rect class="dg-box" x="20" y="32" width="190" height="60" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="115" y="55" text-anchor="middle">生產面</text>
  <text class="dg-label-xs" x="115" y="77" text-anchor="middle">各業附加價值加總</text>

  <rect class="dg-box" x="225" y="32" width="190" height="60" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="55" text-anchor="middle">支出面</text>
  <text class="dg-label-xs" x="320" y="77" text-anchor="middle">C + I + G + (X − M)</text>

  <rect class="dg-box" x="430" y="32" width="190" height="60" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="525" y="55" text-anchor="middle">所得面</text>
  <text class="dg-label-xs" x="525" y="77" text-anchor="middle">要素所得＋折舊＋間接稅淨額</text>

  <line class="dg-arrow" x1="115" y1="92" x2="245" y2="126" marker-end="url(#dg-ni-arrow)"></line>
  <line class="dg-arrow" x1="320" y1="92" x2="320" y2="126" marker-end="url(#dg-ni-arrow)"></line>
  <line class="dg-arrow" x1="525" y1="92" x2="395" y2="126" marker-end="url(#dg-ni-arrow)"></line>

  <rect class="dg-box dg-box-accent" x="155" y="126" width="330" height="54" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="149" text-anchor="middle">國內生產毛額 GDP</text>
  <text class="dg-label-xs" x="320" y="170" text-anchor="middle">三面數值相等 · 屬地原則</text>

  <line class="dg-arrow" x1="320" y1="180" x2="320" y2="208" marker-end="url(#dg-ni-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="330" y="195">+ NFIA</text>

  <rect class="dg-box" x="165" y="208" width="310" height="52" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="231" text-anchor="middle">國民總收入 GNI</text>
  <text class="dg-label-xs" x="320" y="252" text-anchor="middle">GDP + NFIA（GNP ≈ GNI）</text>

  <line class="dg-arrow" x1="320" y1="260" x2="320" y2="288" marker-end="url(#dg-ni-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="330" y="275">− 折舊 D</text>

  <rect class="dg-box" x="165" y="288" width="310" height="52" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="311" text-anchor="middle">國民生產淨額 NNP</text>
  <text class="dg-label-xs" x="320" y="332" text-anchor="middle">GNI − 折舊 D</text>

  <line class="dg-arrow" x1="320" y1="340" x2="320" y2="368" marker-end="url(#dg-ni-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="330" y="355">− 間接稅淨額 NIT</text>

  <rect class="dg-box" x="165" y="368" width="310" height="52" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="391" text-anchor="middle">國民所得 NI</text>
  <text class="dg-label-xs" x="320" y="412" text-anchor="middle">NNP − NIT（要素成本）</text>

  <line class="dg-arrow" x1="320" y1="420" x2="320" y2="456" marker-end="url(#dg-ni-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="330" y="436">− CIT − URE − SSC</text>
  <text class="dg-label-xs dg-label-adjust" x="330" y="450">+ TR + INT</text>

  <rect class="dg-box" x="115" y="456" width="410" height="56" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="479" text-anchor="middle">個人所得 PI</text>
  <text class="dg-label-xs" x="320" y="501" text-anchor="middle">NI − CIT − URE − SSC + TR + INT</text>

  <line class="dg-arrow" x1="320" y1="512" x2="320" y2="540" marker-end="url(#dg-ni-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="330" y="527">− 個人直接稅 Tp</text>

  <rect class="dg-box dg-box-outcome" x="125" y="540" width="390" height="58" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="320" y="563" text-anchor="middle">個人可支配所得 PDI</text>
  <text class="dg-label-xs" x="320" y="585" text-anchor="middle">PI − Tp = C + S</text>

  <path class="dg-arrow" d="M320 598 V614 H210 V630" marker-end="url(#dg-ni-arrow)"></path>
  <path class="dg-arrow" d="M320 614 H430 V630" marker-end="url(#dg-ni-arrow)"></path>

  <rect class="dg-box dg-box-outcome" x="110" y="630" width="200" height="50" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="210" y="653" text-anchor="middle">消費 C</text>
  <text class="dg-label-xs" x="210" y="674" text-anchor="middle">PDI 中用於消費</text>

  <rect class="dg-box dg-box-outcome" x="330" y="630" width="200" height="50" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="430" y="653" text-anchor="middle">儲蓄 S</text>
  <text class="dg-label-xs" x="430" y="674" text-anchor="middle">PDI − C</text>
</svg>`,
    variables: [
      ["GDP", "國內生產毛額", "生產面、支出面與所得面三種算法衡量的同一筆國內生產毛額；採屬地原則。"],
      ["GNI", "國民總收入", "GDP 加國外要素所得淨額 NFIA；多數教材與 GNP 同義。"],
      ["NFIA", "國外要素所得淨額", "本國居民在國外生產所得減外國居民在本國生產所得；可正可負。"],
      ["NNP", "國民生產淨額", "GNI 減固定資本消耗（折舊）D，反映資本折耗後的生產淨額。"],
      ["D", "折舊（固定資本消耗）", "生產過程中資本設備的耗損；GNI 推導 NNP 的扣項。"],
      ["NIT", "間接稅淨額", "間接稅減補貼；從市場價格的 NNP 轉為要素成本的 NI 時扣除。"],
      ["NI", "國民所得", "NNP 減間接稅淨額 NIT；衡量生產要素報酬的總和。"],
      ["PI", "個人所得", "家計單位收到個人直接稅前的所得；由 NI 調整 CIT、URE、SSC、TR 與 INT 得到。"],
      ["PDI", "個人可支配所得", "PI 減個人直接稅 Tp 後，個人真正可以自由支配的所得。"],
      ["C", "消費", "PDI 中用於購買最終財貨與勞務的支出。"],
      ["S", "儲蓄", "PDI 中未用於消費的部分，S = PDI − C。"]
    ],
    parameters: [
      ["CIT", "營利事業所得稅", "公司利潤先繳給政府的稅；計算 PI 時從 NI 扣除。"],
      ["URE", "未分配盈餘", "公司保留下來、未發給股東的利潤；計算 PI 時扣除。"],
      ["SSC", "社會安全捐", "受僱者與雇主繳交的社會安全制度費用；計算 PI 時扣除。"],
      ["TR", "移轉支付", "政府或企業無對價給付給個人的款項；不計入 GDP 與 NI，但計入 PI。"],
      ["INT", "淨利息", "家計單位收到的利息與支付的利息淨額；計算 PI 時加回。"],
      ["Tp", "個人直接稅", "個人所得稅、財產稅等直接由個人負擔的稅；從 PI 扣除後得到 PDI。"]
    ],
    note: "本圖為教學示意，數值不代表實際統計。GNP 與 GNI 在多數教材同義，臺灣官方近年多用 GNI；圖中的所得面 GDP 以要素所得、折舊與間接稅淨額的簡化架構表示。"
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
