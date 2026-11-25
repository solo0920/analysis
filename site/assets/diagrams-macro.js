/* 總體經濟學 — 模型圖（第 1、2、5 章：循環流量、簡單凱因斯、貨幣供需）
   每個圖以 inline SVG 呈現模型曲線與移動方向，並列出變數與參數。
   圖為考試複習用的概念示意，不代表實際數值；載入順序需在 app.js 之前。 */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-01#0": {
    sectionTitle: "第1節 國民所得與GDP",
    title: "兩部門循環流量圖：生產、所得與支出的循環",
    formula: String.raw`Y=C+I`,
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

  "macro-01#0-2": {
    sectionTitle: "第1節 國民所得與GDP",
    kicker: "觀念釐清圖",
    title: "GDP 到 GNI：加上國外要素所得淨額 NFIA",
    formula: String.raw`GNI=GDP+NFIA=GDP+(F-F^{*})`,
    caption: "GDP 以「在哪裡生產」衡量境內產出；GNI 以「誰的所得」衡量本國居民的生產所得。把本國居民在國外的要素所得 F 加進來，再扣掉外國居民在本國的要素所得 F*，就是 NFIA。因此 GNI = GDP + NFIA；NFIA 為正時 GNI 大於 GDP，為負時 GNI 小於 GDP。",
    svg: `
<svg viewBox="0 0 640 430" role="img" aria-labelledby="dg-nfia-title dg-nfia-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-nfia-title">GDP 與 GNI 的關係：加上國外要素所得淨額 NFIA</title>
  <desc id="dg-nfia-desc">GDP 衡量境內生產；加上本國居民在國外要素所得、減去外國居民在本國要素所得，得到本國居民的 GNI。公式為 GNI 等於 GDP 加 NFIA。</desc>

  <text class="dg-label-xs" x="320" y="20" text-anchor="middle">GDP 看「在哪裡生產」；GNI 看「誰的所得」</text>

  <rect class="dg-box" x="20" y="44" width="176" height="120" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="108" y="72" text-anchor="middle">GDP</text>
  <text class="dg-label-sm" x="108" y="94" text-anchor="middle">國內生產毛額</text>
  <text class="dg-label-xs" x="108" y="122" text-anchor="middle">境內生產</text>
  <text class="dg-label-xs" x="108" y="140" text-anchor="middle">屬地原則</text>
  <text class="dg-label-xs" x="108" y="158" text-anchor="middle">外籍移工在臺產值計入</text>

  <text class="dg-label dg-operator" x="212" y="112" text-anchor="middle">+</text>

  <rect class="dg-box dg-box-accent" x="228" y="36" width="184" height="136" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="320" y="60" text-anchor="middle">NFIA</text>
  <text class="dg-label-sm" x="320" y="80" text-anchor="middle">國外要素所得淨額</text>
  <line class="dg-guide" x1="244" y1="92" x2="396" y2="92"></line>
  <text class="dg-label-sm dg-label-plus" x="320" y="114" text-anchor="middle">＋ 本國居民在國外所得</text>
  <text class="dg-label-sm dg-label-minus" x="320" y="136" text-anchor="middle">－ 外國居民在本國所得</text>
  <text class="dg-label-xs" x="320" y="158" text-anchor="middle">可正可負</text>

  <text class="dg-label dg-operator" x="428" y="112" text-anchor="middle">=</text>

  <rect class="dg-box dg-box-outcome" x="444" y="44" width="176" height="120" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="532" y="72" text-anchor="middle">GNI</text>
  <text class="dg-label-sm" x="532" y="94" text-anchor="middle">國民總收入</text>
  <text class="dg-label-xs" x="532" y="122" text-anchor="middle">本國居民所得</text>
  <text class="dg-label-xs" x="532" y="140" text-anchor="middle">屬人原則</text>
  <text class="dg-label-xs" x="532" y="158" text-anchor="middle">臺商海外所得計入</text>

  <rect class="dg-panel" x="20" y="192" width="292" height="104" rx="10"></rect>
  <text class="dg-label-sm dg-label-plus" x="36" y="216">＋ 本國居民在國外所得</text>
  <text class="dg-label-xs" x="36" y="242">例：臺商海外工廠利潤、海外投資收益</text>
  <text class="dg-label-xs" x="36" y="264">臺灣籍員工的海外薪資</text>
  <text class="dg-label-xs dg-label-plus" x="36" y="288">→ 計入 GNI，不計入 GDP</text>

  <rect class="dg-panel" x="328" y="192" width="292" height="104" rx="10"></rect>
  <text class="dg-label-sm dg-label-minus" x="344" y="216">－ 外國居民在本國所得</text>
  <text class="dg-label-xs" x="344" y="242">例：外籍移工在臺薪資、外資在臺利潤</text>
  <text class="dg-label-xs" x="344" y="264">外國居民在臺的租金、利息</text>
  <text class="dg-label-xs dg-label-minus" x="344" y="288">→ 計入 GDP，不計入 GNI</text>

  <rect class="dg-box" x="20" y="316" width="600" height="92" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="320" y="342" text-anchor="middle">GNI = GDP + NFIA</text>
  <text class="dg-label-xs" x="320" y="366" text-anchor="middle">NFIA &gt; 0 → GNI &gt; GDP；NFIA &lt; 0 → GNI &lt; GDP</text>
  <text class="dg-label-xs" x="320" y="390" text-anchor="middle">例：GDP 1,000 ＋ NFIA 20 ＝ GNI 1,020</text>
</svg>`,
    variables: [
      ["GDP", "國內生產毛額", "一國境內在一定期間生產的最終財貨與勞務市場價值；採屬地原則。"],
      ["GNI", "國民總收入", "本國居民在一定期間的生產所得；採屬人原則，多數教材與 GNP 同義。"],
      ["NFIA", "國外要素所得淨額", "本國居民在國外要素所得 F 減外國居民在本國要素所得 F*；可正可負。"],
      ["F", "本國居民在國外要素所得", "本國居民在海外提供勞動、資本、土地或企業才能所得的報酬總和；計入 GNI，不計入 GDP。"],
      ["F*", "外國居民在本國要素所得", "外國居民在本國境內提供生產要素所得的報酬總和；計入 GDP，不計入 GNI。"]
    ],
    parameters: [
      ["NFIA>0", "要素所得淨流入", "本國居民海外所得大於外國居民在本國所得，GNI 大於 GDP。"],
      ["NFIA<0", "要素所得淨流出", "外國居民在本國所得大於本國居民海外所得，GNI 小於 GDP。"]
    ],
    note: "本圖為教學示意。實務上 NFIA 包含薪資、投資收益、租金與利息等跨境要素報酬，各國統計細項與名稱略有差異；GNI 與 GNP 多數教材視為同義，臺灣官方近年多用 GNI。"
  },

  "macro-01#2": {
    sectionTitle: "第3節 其他國民所得衡量工具",
    kicker: "教學流程圖",
    title: "國民所得會計帳流程圖：從三面法 GDP 到 PDI",
    formula: String.raw`GDP=C+I+G+(X-M)`,
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

  "macro-01#4": {
    sectionTitle: "第5節 國民所得做為經濟福利指標的問題",
    kicker: "所得分配圖",
    title: "洛侖士曲線與吉尼係數：A、B 面積與分配不均",
    formula: String.raw`G=\frac{A}{A+B}=1-2B`,
    caption: "橫軸為累積家戶比例，家戶由低所得排到高所得；縱軸為累積所得比例，兩軸的 100% 長度相同。45 度線是完全平等線，實線是以 2023 年五等分位資料點做單調三次插值平滑連接的洛侖士曲線；五個資料點仍保留原始數值。45 度線與曲線之間的面積 A 越大，分配越不均；曲線下面積 B 與 A 合計為 0.5，吉尼係數 \\(G=\\dfrac{A}{A+B}=1-2B\\)。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-lorenz-title dg-lorenz-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-lorenz-title">洛侖士曲線、A/B 面積與吉尼係數</title>
  <desc id="dg-lorenz-desc">橫軸為累積家戶比例，縱軸為累積所得比例，兩軸的 100% 長度相同。45 度線為完全平等線，實線為 2023 年五等分位資料點經單調三次插值平滑連接的洛侖士曲線。45 度線與曲線之間的面積 A 越大，吉尼係數越大；曲線下面積 B 與 A 合計為 0.5，吉尼係數等於 A 除以 A 加 B。</desc>
  <line class="dg-axis" x1="90" y1="420" x2="442" y2="420"></line>
  <line class="dg-axis" x1="90" y1="420" x2="90" y2="70"></line>
  <text class="dg-label" x="260" y="470" text-anchor="middle">累積家戶比例 p（由低所得排到高所得）</text>
  <text class="dg-label" x="98" y="60">累積所得比例 L(p)</text>

  <text class="dg-label-xs" x="90" y="440" text-anchor="middle">0</text>
  <text class="dg-label-xs" x="158" y="440" text-anchor="middle">20%</text>
  <text class="dg-label-xs" x="226" y="440" text-anchor="middle">40%</text>
  <text class="dg-label-xs" x="294" y="440" text-anchor="middle">60%</text>
  <text class="dg-label-xs" x="362" y="440" text-anchor="middle">80%</text>
  <text class="dg-label-xs" x="430" y="440" text-anchor="middle">100%</text>

  <text class="dg-label-xs" x="78" y="424" text-anchor="end">0</text>
  <text class="dg-label-xs" x="78" y="356" text-anchor="end">20%</text>
  <text class="dg-label-xs" x="78" y="288" text-anchor="end">40%</text>
  <text class="dg-label-xs" x="78" y="220" text-anchor="end">60%</text>
  <text class="dg-label-xs" x="78" y="152" text-anchor="end">80%</text>
  <text class="dg-label-xs" x="78" y="84" text-anchor="end">100%</text>

  <path class="dg-area-gold" d="M90,420 C 112.67,416.85 135.33,409.37 158,400.82 C 180.67,392.27 203.33,377.40 226,362.17 C 248.67,346.94 271.33,327.79 294,306.30 C 316.67,284.81 339.33,263.83 362,230.14 C 384.67,196.45 407.33,142.38 430,80 L430,420 L90,420 Z"></path>
  <path class="dg-area-accent" d="M90,420 L430,80 C 407.33,142.38 384.67,196.45 362,230.14 C 339.33,263.83 316.67,284.81 294,306.30 C 271.33,327.79 248.67,346.94 226,362.17 C 203.33,377.40 180.67,392.27 158,400.82 C 135.33,409.37 112.67,416.85 90,420 Z"></path>

  <line class="dg-curve-soft" x1="90" y1="420" x2="430" y2="80"></line>
  <path class="dg-curve" d="M90,420 C 112.67,416.85 135.33,409.37 158,400.82 C 180.67,392.27 203.33,377.40 226,362.17 C 248.67,346.94 271.33,327.79 294,306.30 C 316.67,284.81 339.33,263.83 362,230.14 C 384.67,196.45 407.33,142.38 430,80"></path>

  <circle class="dg-point" cx="158" cy="400.82" r="3.2"></circle>
  <circle class="dg-point" cx="226" cy="362.17" r="3.2"></circle>
  <circle class="dg-point" cx="294" cy="306.30" r="3.2"></circle>
  <circle class="dg-point" cx="362" cy="230.14" r="3.2"></circle>

  <line class="dg-guide" x1="90" y1="400.82" x2="158" y2="400.82"></line>
  <line class="dg-guide" x1="158" y1="400.82" x2="158" y2="420"></line>
  <text class="dg-label-xs" x="166" y="396">5.64%</text>

  <text class="dg-label" x="260" y="300" text-anchor="middle">A</text>
  <text class="dg-label" x="320" y="370" text-anchor="middle">B</text>
  <text class="dg-label-xs" x="320" y="386" text-anchor="middle">曲線下面積</text>

  <text class="dg-label-xs" x="460" y="150">圖例</text>
  <line class="dg-curve" x1="460" y1="180" x2="490" y2="180"></line>
  <text class="dg-label-xs" x="498" y="184">洛侖士曲線（2023）</text>
  <line class="dg-curve-soft" x1="460" y1="205" x2="490" y2="205"></line>
  <text class="dg-label-xs" x="498" y="209">45° 完全平等線</text>
</svg>`,
    variables: [
      ["p", "累積家戶比例", "橫軸；家戶由低所得到高所得排序，0 到 1（或 0% 到 100%）。"],
      ["L(p)", "累積所得比例", "縱軸；所得最低 p 比例家戶的所得占全體所得的比例。"],
      ["A", "不均面積", "45 度線與洛侖士曲線之間；A 越大，分配越不均。"],
      ["B", "曲線下面積", "洛侖士曲線與橫軸之間；\\(A+B\\) 為 45 度線下三角形面積 0.5。"],
      ["G", "吉尼係數", "\\(G=\\dfrac{A}{A+B}=1-2B\\)，介於 0 與 1；0 為完全平等，1 為完全不等。"]
    ],
    parameters: [
      ["2023 年資料", "五等分位", "累積所得份額為 0、5.64、17.01、33.44、55.84、100（%）。"],
      ["插值方式", "單調三次插值", "以五等分位累積點平滑連接，保留原始資料點；不代表真實個別家戶曲線。"],
      ["所得分配", "曲線位置", "曲線越靠近 45 度線，分配越平等；越遠越不均。"],
      ["曲線交叉", "判斷限制", "兩條洛侖士曲線交叉時，不能只憑圖形判定何者較不均。"],
      ["戶內人口", "每人所得", "比較生活水準時，戶數相同不等於每人相同，需按人口調整。"]
    ],
    note: "本圖以 2023 年五等分位累積所得份額的 6 個點（含 0 與 100%）做單調三次插值，平滑連接但保留原始資料點；這是教學視覺化，不是完整個別家戶資料的實際曲線。A、B 為面積概念，實際數值以完整分戶資料計算。吉尼係數也可用五等分位梯形法近似。"
  },

  "macro-02#0": {
    sectionTitle: "第1節 均衡所得之決定",
    title: "凱因斯十字架：總支出線與 45 度線決定均衡所得",
    kicker: "學派模型 · 凱因斯",
    formula: String.raw`AE=A_a+[c(1-t)-m]Y,\qquad Y^*=\frac{A_a}{1-c(1-t)+m}`,
    caption: "凱因斯十字架以 45 度線代表 AE = Y。完整四部門模型 AE=A_a+[c(1-t)-m]Y，截距 A_a=C_a−cT_a+cTR_a+I_a+G_a+NX_a，斜率 c(1-t)-m。圖為 T_a=TR_a=0、t=m=0 的簡化情形，此時 A_a=C_a+I_a+G_a+NX_a、斜率為 c；AE₀ 與 45 度線交於 E₀，決定均衡所得 Y₀。政府支出或自發支出增加使 AE 平行上移到 AE₁，均衡點移到 E₁，所得由 Y₀ 增加到 Y₁；增加幅度是自發支出變動量乘以乘數。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-keynes-title dg-keynes-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-keynes-title">凱因斯十字架均衡所得圖</title>
  <desc id="dg-keynes-desc">橫軸為實質所得 Y，縱軸為總支出 AE。45 度線 AE=Y 與總支出線 AE0 交於 E0，決定均衡所得 Y0；自發支出增加使總支出線平行上移到 AE1，均衡點移到 E1，均衡所得增加。</desc>
  <defs>
    <marker id="dg-keynes-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="80" y1="420" x2="442" y2="420"></line>
  <line class="dg-axis" x1="80" y1="420" x2="80" y2="70"></line>
  <text class="dg-label" x="260" y="470" text-anchor="middle">實質所得 Y</text>
  <text class="dg-label" x="88" y="60">總支出 AE</text>
  <text class="dg-label-xs" x="72" y="331" text-anchor="end">A_a</text>
  <text class="dg-label-xs" x="72" y="291" text-anchor="end">A_a+ΔA_a</text>

  <line class="dg-curve-soft" x1="80" y1="420" x2="420" y2="80"></line>
  <line class="dg-curve" x1="80" y1="340" x2="420" y2="136"></line>
  <text class="dg-label" x="428" y="142">AE₀</text>
  <line class="dg-curve-alt" x1="80" y1="300" x2="420" y2="96"></line>
  <text class="dg-label" x="428" y="102">AE₁</text>
  <line class="dg-arrow" x1="180" y1="280" x2="180" y2="240" marker-end="url(#dg-keynes-arrow)"></line>

  <line class="dg-guide" x1="280" y1="220" x2="280" y2="420"></line>
  <line class="dg-guide" x1="380" y1="120" x2="380" y2="420"></line>
  <circle class="dg-point" cx="280" cy="220" r="4.5"></circle>
  <text class="dg-label" x="258" y="210">E₀</text>
  <circle class="dg-point" cx="380" cy="120" r="4.5"></circle>
  <text class="dg-label" x="388" y="110">E₁</text>
  <text class="dg-label-sm" x="266" y="440">Y₀</text>
  <text class="dg-label-sm" x="366" y="440">Y₁</text>

  <text class="dg-label-xs" x="460" y="130">參數</text>
  <text class="dg-label-xs" x="460" y="155">c：MPC（簡化斜率）</text>
  <text class="dg-label-xs" x="460" y="180">C_a：自發消費</text>
  <text class="dg-label-xs" x="460" y="205">A_a：完整自發支出</text>
  <text class="dg-label-xs" x="460" y="230">k = 1/[1−c(1−t)+m]</text>
  <text class="dg-label-xs" x="460" y="255">t、m：稅率、進口傾向</text>
  <text class="dg-label-xs" x="460" y="280">T_a、TR_a：稅與移轉</text>

  <text class="dg-label-xs" x="460" y="300">圖例</text>
  <line class="dg-curve" x1="460" y1="330" x2="490" y2="330"></line>
  <text class="dg-label-xs" x="498" y="334">總支出 AE₀</text>
  <line class="dg-curve-alt" x1="460" y1="355" x2="490" y2="355"></line>
  <text class="dg-label-xs" x="498" y="359">總支出 AE₁</text>
  <line class="dg-curve-soft" x1="460" y1="380" x2="490" y2="380"></line>
  <text class="dg-label-xs" x="498" y="384">45°：AE = Y</text>
  <text class="dg-label-xs" x="460" y="405">箭頭：A_a↑（自發支出↑）</text>
</svg>`,
    variables: [
      ["Y", "實質所得（產出）", "橫軸；均衡所得由 AE 與 45 度線的交點決定。"],
      ["AE", "總支出", "縱軸；\\(AE=C+I+G+NX\\)。"],
      ["Y_d", "可支配所得", "\\(Y_d=Y-T+TR\\)；若 \\(T=T_a+tY\\)、\\(TR=TR_a\\)，則 \\(Y_d=(1-t)Y-T_a+TR_a\\)。"],
      ["E", "均衡點", "AE 與 45 度線的交點，代表商品市場均衡。"],
      ["45° 線", "均衡條件", "線上任一點 \\(AE=Y\\)；與總支出線的交點決定均衡所得。"]
    ],
    parameters: [
      ["C_a", "自發消費", "消費函數 \\(C=C_a+cY_d\\) 的截距；所得為零時仍存在的消費。"],
      ["c", "邊際消費傾向", "\\(0<c<1\\)，又稱 MPC。完整模型 AE 斜率為 \\(c(1-t)-m\\)；t=m=0 的簡化圖中斜率為 c。"],
      ["A_a", "完整自發支出", "\\(A_a=C_a-cT_a+cTR_a+I_a+G_a+NX_a\\)；決定完整模型 AE 截距。T_a=TR_a=0 時簡化為 \\(C_a+I_a+G_a+NX_a\\)。"],
      ["t", "邊際稅率", "比例所得稅 \\(T=T_a+tY\\) 的斜率；使 AE 斜率由 c 降為 c(1-t)。"],
      ["m", "邊際進口傾向", "進口 \\(M=M_a+mY\\) 隨所得增加的比例；使 AE 斜率再減少 m。"],
      ["T_a", "定額稅", "稅制 \\(T=T_a+tY\\) 的定額部分；使可支配所得與 A_a 減少 \\(cT_a\\)。"],
      ["\\(TR_a\\)", "定額移轉", "政府移轉性支付；使可支配所得增加 TR_a、AE 截距增加 \\(cTR_a\\)。"],
      ["k", "開放經濟乘數", "\\(k=\\dfrac{1}{1-c(1-t)+m}\\)；所得變動 \\(\\Delta Y=k\\times\\Delta A_a\\)。"]
    ],
    note: "本圖為 T_a=TR_a=0、t=m=0 的簡化情形；完整模型的 AE 截距為 A_a=C_a−cT_a+cTR_a+I_a+G_a+NX_a，斜率為 c(1-t)-m，乘數為 1/[1-c(1-t)+m]。模型假設價格與利率固定、產能未充分使用，因此均衡所得由總支出決定，而不是由供給面決定。"
  },

  "macro-02#1": {
    sectionTitle: "第2節 政府收支與反景氣循環之財政政策",
    kicker: "學派模型 · 李嘉圖等價",
    title: "李嘉圖等價：減稅、公債與未來稅負",
    formula: String.raw`G_1+\frac{G_2}{1+r}=T_1+\frac{T_2}{1+r}`,
    caption: "政府第 1 期減稅 ΔT₁<0，以發行公債 B=−ΔT₁ 融通；第 2 期必須增稅 (1+r)B 償還本息。若家庭完全預見，會把減稅額儲蓄起來，持有公債並在未來繳稅，當期與未來消費 C₁、C₂ 不變。政府與家庭的跨期預算限制合併後，只有政府支出 G₁、G₂ 影響終身資源，稅負的時間點不影響消費。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-ricardian-title dg-ricardian-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-ricardian-title">李嘉圖等價：減稅、公債與未來稅負</title>
  <desc id="dg-ricardian-desc">第1期政府減稅並發行公債，家庭把減稅額儲蓄起來持有公債；第2期政府增稅償還本息，家庭用儲蓄本息繳稅。若家庭完全預見，消費路徑不變。</desc>
  <defs>
    <marker id="dg-ricardian-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label-sm" x="170" y="34" text-anchor="middle">期 1（現在）</text>
  <text class="dg-label-sm" x="470" y="34" text-anchor="middle">期 2（未來）</text>

  <rect class="dg-panel" x="40" y="54" width="260" height="118" rx="10"></rect>
  <text class="dg-label" x="170" y="82" text-anchor="middle">政府：減稅 ΔT₁ &lt; 0</text>
  <text class="dg-label-xs" x="170" y="108" text-anchor="middle">發行公債 B = −ΔT₁</text>
  <text class="dg-label-xs" x="170" y="132" text-anchor="middle">當期稅收 T₁ 下降</text>
  <text class="dg-label-xs" x="170" y="154" text-anchor="middle">政府支出 G₁ 不變</text>

  <line class="dg-arrow" x1="304" y1="113" x2="336" y2="113" marker-end="url(#dg-ricardian-arrow)"></line>
  <text class="dg-label-xs" x="320" y="100" text-anchor="middle">未來稅</text>

  <rect class="dg-panel" x="340" y="54" width="260" height="118" rx="10"></rect>
  <text class="dg-label" x="470" y="82" text-anchor="middle">政府：未來增稅</text>
  <text class="dg-label-xs" x="470" y="108" text-anchor="middle">稅收增加 (1+r)B</text>
  <text class="dg-label-xs" x="470" y="132" text-anchor="middle">償還公債本息</text>
  <text class="dg-label-xs" x="470" y="154" text-anchor="middle">政府支出 G₂ 不變</text>

  <line class="dg-arrow" x1="170" y1="176" x2="170" y2="212" marker-end="url(#dg-ricardian-arrow)"></line>
  <text class="dg-label-xs" x="180" y="198">家庭持有公債 B</text>

  <rect class="dg-panel" x="40" y="212" width="260" height="118" rx="10"></rect>
  <text class="dg-label" x="170" y="240" text-anchor="middle">家庭：儲蓄 −ΔT₁ = B</text>
  <text class="dg-label-xs" x="170" y="266" text-anchor="middle">當期消費 C₁ 不變</text>
  <text class="dg-label-xs" x="170" y="290" text-anchor="middle">把減稅存起來</text>
  <text class="dg-label-xs" x="170" y="312" text-anchor="middle">形成未來繳稅財源</text>

  <line class="dg-arrow" x1="304" y1="271" x2="336" y2="271" marker-end="url(#dg-ricardian-arrow)"></line>
  <text class="dg-label-xs" x="320" y="258" text-anchor="middle">本息</text>

  <rect class="dg-panel" x="340" y="212" width="260" height="118" rx="10"></rect>
  <text class="dg-label" x="470" y="240" text-anchor="middle">家庭：用本息繳稅</text>
  <text class="dg-label-xs" x="470" y="266" text-anchor="middle">支付 (1+r)B</text>
  <text class="dg-label-xs" x="470" y="290" text-anchor="middle">未來消費 C₂ 不變</text>
  <text class="dg-label-xs" x="470" y="312" text-anchor="middle">終身預算限制不變</text>

  <rect class="dg-box dg-box-accent" x="40" y="360" width="560" height="96" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="320" y="388" text-anchor="middle">減稅不是淨財富增加</text>
  <text class="dg-label-xs" x="320" y="414" text-anchor="middle">政府預算限制＋家庭預算限制 → 稅負時間點不影響 C₁、C₂</text>
  <text class="dg-label-xs" x="320" y="438" text-anchor="middle">只有政府支出 G₁、G₂ 的現值影響終身資源</text>
</svg>`,
    variables: [
      ["C_1", "第 1 期消費", "家庭在現在的消費；李嘉圖等價下不因減稅而增加。"],
      ["C_2", "第 2 期消費", "家庭在未來的消費；與 C_1 的跨期配置不變。"],
      ["T_1", "第 1 期定額稅", "政府現在課徵的稅；減稅時下降。"],
      ["T_2", "第 2 期定額稅", "政府未來課徵的稅；發債後上升。"],
      ["B", "第 1 期公債", "\\(B=-\\Delta T_1\\)；政府以借款替代現在稅收。"],
      ["r", "利率", "政府與家庭借貸的折現率；未來本息為 \\((1+r)B\\)。"]
    ],
    parameters: [
      ["ΔT_1", "第 1 期減稅", "\\(\\Delta T_1<0\\)；減稅造成公債 \\(B=-\\Delta T_1\\)。"],
      ["G_1、G_2", "政府支出", "給定不變；政府預算限制為 \\(G_1+\\dfrac{G_2}{1+r}=T_1+\\dfrac{T_2}{1+r}\\)。"],
      ["(1+r)B", "未來稅負", "第 2 期增稅償還公債本息。"],
      ["成立條件", "李嘉圖等價", "完全預見、無流動性限制、定額稅、跨代利他、政府與家庭利率相同。"]
    ],
    note: "李嘉圖等價是基準模型，不是無條件成立。若家庭短視、借貸受限、稅負扭曲、世代交替但沒有遺產動機，或政府借款利率與家庭不同，減稅可能刺激當期消費。"
  },

  "macro-02#2": {
    sectionTitle: "第3節 節儉的矛盾",
    kicker: "學派模型 · 凱因斯",
    title: "節儉的矛盾：自發儲蓄增加使總支出下移",
    formula: String.raw`S=Y-C=S_a+(1-c)Y,\quad S_a=-C_a,\quad I=I_a+eY,\quad S=I`,
    caption: "家庭想多儲蓄會減少自發消費 C_a、增加自發性儲蓄 S_a=-C_a，使 AE 由 AE₀ 下移到 AE₁，均衡所得從 Y₀ 下降到 Y₁。若投資具誘發性 I=I_a+eY（e>0），所得下降會使誘發性投資與儲蓄同步萎縮，最終總儲蓄反而減少；若投資固定（e=0），均衡所得下降，但總儲蓄維持不變。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-thrift-title dg-thrift-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-thrift-title">節儉的矛盾示意圖</title>
  <desc id="dg-thrift-desc">橫軸為實質所得 Y，縱軸為總支出 AE。45 度線 AE=Y 與總支出線 AE0 交於 E0，決定均衡所得 Y0；自發消費減少使總支出線下移到 AE1，均衡點移到 E1，均衡所得減少。若投資具誘發性，最終總儲蓄可能反而減少。</desc>
  <defs>
    <marker id="dg-thrift-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="80" y1="420" x2="442" y2="420"></line>
  <line class="dg-axis" x1="80" y1="420" x2="80" y2="70"></line>
  <text class="dg-label" x="260" y="470" text-anchor="middle">實質所得 Y</text>
  <text class="dg-label" x="88" y="60">總支出 AE</text>
  <text class="dg-label-xs" x="72" y="351" text-anchor="end">A_a</text>
  <text class="dg-label-xs" x="72" y="381" text-anchor="end">A_a−ΔA_a</text>

  <line class="dg-curve-soft" x1="80" y1="420" x2="420" y2="80"></line>
  <line class="dg-curve" x1="80" y1="360" x2="420" y2="156"></line>
  <text class="dg-label" x="428" y="162">AE₀</text>
  <line class="dg-curve-alt" x1="80" y1="390" x2="420" y2="186"></line>
  <text class="dg-label" x="428" y="192">AE₁</text>
  <line class="dg-arrow" x1="320" y1="216" x2="320" y2="246" marker-end="url(#dg-thrift-arrow)"></line>

  <line class="dg-guide" x1="230" y1="270" x2="230" y2="420"></line>
  <line class="dg-guide" x1="155" y1="345" x2="155" y2="420"></line>
  <circle class="dg-point" cx="230" cy="270" r="4.5"></circle>
  <text class="dg-label" x="238" y="260">E₀</text>
  <circle class="dg-point" cx="155" cy="345" r="4.5"></circle>
  <text class="dg-label" x="163" y="335">E₁</text>
  <text class="dg-label-sm" x="216" y="440">Y₀</text>
  <text class="dg-label-sm" x="141" y="440">Y₁</text>

  <text class="dg-label-xs" x="460" y="130">參數</text>
  <text class="dg-label-xs" x="460" y="155">c+e：AE 斜率</text>
  <text class="dg-label-xs" x="460" y="180">C_a：自發消費</text>
  <text class="dg-label-xs" x="460" y="205">e：邊際投資傾向</text>
  <text class="dg-label-xs" x="460" y="230">k = 1/(1−c−e)</text>
  <text class="dg-label-xs" x="460" y="255">ΔY = kΔA_a</text>
  <text class="dg-label-xs" x="460" y="280">S_a = −C_a</text>

  <text class="dg-label-xs" x="460" y="300">圖例</text>
  <line class="dg-curve" x1="460" y1="330" x2="490" y2="330"></line>
  <text class="dg-label-xs" x="498" y="334">總支出 AE₀</text>
  <line class="dg-curve-alt" x1="460" y1="355" x2="490" y2="355"></line>
  <text class="dg-label-xs" x="498" y="359">總支出 AE₁</text>
  <line class="dg-curve-soft" x1="460" y1="380" x2="490" y2="380"></line>
  <text class="dg-label-xs" x="498" y="384">45°：AE = Y</text>
  <text class="dg-label-xs" x="460" y="405">箭頭：C_a↓（S_a↑）</text>
</svg>`,
    variables: [
      ["Y", "實質所得", "橫軸；均衡所得隨總支出移動。"],
      ["AE", "總支出", "縱軸；兩部門 \\(AE=C+I\\)。自發消費下降會使整條 AE 線下移。"],
      ["S", "儲蓄", "\\(S=Y-C=S_a+(1-c)Y\\)，其中 \\(S_a=-C_a\\)。"],
      ["I", "投資", "\\(I=I_a+eY\\)；e>0 為誘發性投資，e=0 為固定投資。"],
      ["45° 線", "均衡條件", "線上任一點 \\(AE=Y\\)；與總支出線的交點決定均衡所得。"]
    ],
    parameters: [
      ["C_a", "自發消費", "消費函數 \\(C=C_a+cY\\) 的截距；\\(C_a\\) 下降使 \\(S_a=-C_a\\) 上升、AE 下移。"],
      ["c", "邊際消費傾向", "封閉兩部門 \\(0<c<1\\)；AE 斜率為 \\(c+e\\)，儲蓄線斜率為 \\(1-c\\)。"],
      ["e", "邊際投資傾向", "\\(0<e<1-c\\)；e>0 時 \\(\\Delta S^*<0\\)，e=0 時 \\(\\Delta S^*=0\\)。"],
      ["S_a", "自發性儲蓄", "\\(S_a=-C_a\\)；節儉使 \\(\\Delta S_a=-\\Delta C_a>0\\)。"],
      ["k", "乘數", "\\(k=\\dfrac{1}{1-c-e}\\)；所得變動 \\(\\Delta Y=k\\Delta A_a\\)。"],
      ["A_a", "兩部門自發支出", "\\(A_a=C_a+I_a\\)；完整四部門模型見圖 macro-02#0。"]
    ],
    note: "本圖為封閉兩部門模型（G=NX=T=TR=0），I=I_a+eY。e>0 時，節儉使均衡所得下降，且最終總儲蓄 S* 反而減少；e=0 時，所得下降但 S*=I_a 維持不變。節儉的矛盾成立於短期、價格固定且產能未充分使用的封閉經濟；長期或充分就業下，儲蓄增加可轉化為投資資金。"
  },

  "macro-02#2-1": {
    sectionTitle: "第3節 節儉的矛盾",
    kicker: "租稅比較 · 自動穩定",
    title: "定額稅與累進稅：AE 斜率與乘數",
    formula: String.raw`AE_T=A_a+cY,\qquad AE_t=A_a+c(1-t)Y`,
    caption: "定額稅下 AE 截距為 A_a=C_a−cT_a+cTR_a+I_a+G_a+NX_a，斜率為 c，乘數為 1/(1−c)；累進稅以邊際稅率 t 簡化，截距同為 A_a，斜率降為 c(1−t)，乘數為 1/[1−c(1−t)]，較定額稅小。相同自發支出下，累進稅的均衡所得較低；當自發消費下降時，累進稅會隨所得自動減少稅收，緩衝可支配所得與產出的跌幅，因此節儉的矛盾較弱。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-tax-slope-title dg-tax-slope-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-tax-slope-title">定額稅與累進稅的 AE 斜率比較</title>
  <desc id="dg-tax-slope-desc">45度線與兩條總支出線。定額稅 AE 斜率為 c，累進稅 AE 斜率為 c(1-t)，較平坦，均衡所得較低。</desc>
  <defs>
    <marker id="dg-tax-slope-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="80" y1="420" x2="442" y2="420"></line>
  <line class="dg-axis" x1="80" y1="420" x2="80" y2="70"></line>
  <text class="dg-label" x="260" y="470" text-anchor="middle">實質所得 Y</text>
  <text class="dg-label" x="88" y="60">總支出 AE</text>
  <text class="dg-label-xs" x="72" y="331" text-anchor="end">A_a</text>

  <line class="dg-curve-soft" x1="80" y1="420" x2="420" y2="80"></line>
  <line class="dg-curve" x1="80" y1="340" x2="420" y2="136"></line>
  <text class="dg-label-xs" x="428" y="142">AE_T</text>
  <line class="dg-curve-alt" x1="80" y1="340" x2="420" y2="197.2"></line>
  <text class="dg-label-xs" x="428" y="203">AE_t</text>

  <line class="dg-guide" x1="280" y1="220" x2="280" y2="420"></line>
  <line class="dg-guide" x1="218" y1="282" x2="218" y2="420"></line>
  <circle class="dg-point" cx="280" cy="220" r="4.5"></circle>
  <text class="dg-label" x="288" y="210">E_T</text>
  <circle class="dg-point" cx="218" cy="282" r="4.5"></circle>
  <text class="dg-label" x="226" y="272">E_t</text>
  <text class="dg-label-sm" x="266" y="440">Y_T</text>
  <text class="dg-label-sm" x="204" y="440">Y_t</text>

  <text class="dg-label-xs" x="460" y="130">參數</text>
  <text class="dg-label-xs" x="460" y="155">c：定額稅 AE 斜率</text>
  <text class="dg-label-xs" x="460" y="180">c(1−t)：累進稅 AE 斜率</text>
  <text class="dg-label-xs" x="460" y="205">T_a：定額稅</text>
  <text class="dg-label-xs" x="460" y="230">k_T = 1/(1−c)</text>
  <text class="dg-label-xs" x="460" y="255">k_t = 1/[1−c(1−t)]</text>

  <text class="dg-label-xs" x="460" y="300">圖例</text>
  <line class="dg-curve" x1="460" y1="330" x2="490" y2="330"></line>
  <text class="dg-label-xs" x="498" y="334">定額稅 AE_T</text>
  <line class="dg-curve-alt" x1="460" y1="355" x2="490" y2="355"></line>
  <text class="dg-label-xs" x="498" y="359">累進稅 AE_t</text>
  <line class="dg-curve-soft" x1="460" y1="380" x2="490" y2="380"></line>
  <text class="dg-label-xs" x="498" y="384">45°：AE = Y</text>
</svg>`,
    variables: [
      ["Y", "實質所得", "橫軸；兩條 AE 線與 45 度線的交點決定均衡所得。"],
      ["AE", "總支出", "縱軸；\\(AE=C+I+G+NX\\)。"],
      ["E_T", "定額稅均衡", "定額稅 AE_T 與 45 度線的交點。"],
      ["E_t", "累進稅均衡", "累進稅 AE_t 與 45 度線的交點；所得較低。"],
      ["45° 線", "均衡條件", "線上任一點 \\(AE=Y\\)。"]
    ],
    parameters: [
      ["c", "邊際消費傾向", "\\(0<c<1\\)；定額稅下 AE 斜率。"],
      ["t", "邊際稅率", "累進稅的簡化參數；AE 斜率為 \\(c(1-t)\\)。"],
      ["T_a", "定額稅", "已併入完整自發支出 \\(A_a\\) 的 \\(-cT_a\\) 項；增加 T_a 會使 AE 截距下降。"],
      ["A_a", "完整自發支出", "\\(A_a=C_a-cT_a+cTR_a+I_a+G_a+NX_a\\)；兩條 AE 線的共同截距。"],
      ["k_G^{T_a}", "定額稅制政府支出乘數", "\\(k_G^{T_a}=\\dfrac{1}{1-c}\\)。"],
      ["k_G^{t}", "累進稅制政府支出乘數", "\\(k_G^{t}=\\dfrac{1}{1-c(1-t)}\\)，較定額稅制小。"]
    ],
    note: "本圖以相同 A_a 比較兩種稅制；累進稅的邊際稅率 t 以固定值簡化，實際累進稅率隨所得級距上升。稅收自動隨所得變動，是累進稅穩定產出的重要機制。"
  },

  "macro-02#2-2": {
    sectionTitle: "第3節 節儉的矛盾",
    kicker: "教學圖 · 儲蓄與投資",
    title: "超額儲蓄：國民儲蓄與國內投資的缺口",
    formula: String.raw`ES=S-I,\qquad es=\frac{S-I}{Y}\times100\%=s-i`,
    caption: "超額儲蓄 ES 是國民儲蓄 S 超過國內投資 I 的部分。圖中以 Y=100、S=32、I=22 的示意數值呈現：ES=10，超額儲蓄率 es=10%。超額儲蓄可貸出國外，開放經濟下對應經常帳順差；也可能反映國內投資不足、預防性儲蓄或資金外流。",
    svg: `
<svg viewBox="0 0 640 480" role="img" aria-labelledby="dg-excess-title dg-excess-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-excess-title">超額儲蓄與超額儲蓄率</title>
  <desc id="dg-excess-desc">以 GDP 100 為例，國民儲蓄 32、國內投資 22，超額儲蓄為 10，超額儲蓄率為 10%。</desc>

  <line class="dg-axis" x1="100" y1="360" x2="540" y2="360"></line>
  <line class="dg-axis" x1="100" y1="360" x2="100" y2="100"></line>
  <text class="dg-label" x="320" y="398" text-anchor="middle">金額（GDP Y=100，示意）</text>

  <rect x="120" y="140" width="320" height="60" rx="6" style="fill:var(--accent);fill-opacity:.28;stroke:var(--accent);stroke-width:1.5"></rect>
  <text class="dg-label" x="132" y="176">國民儲蓄 S</text>
  <text class="dg-label-sm" x="448" y="176">S=32</text>

  <rect x="120" y="230" width="220" height="60" rx="6" style="fill:var(--gold);fill-opacity:.28;stroke:var(--gold);stroke-width:1.5"></rect>
  <text class="dg-label" x="132" y="266">國內投資 I</text>
  <text class="dg-label-sm" x="348" y="266">I=22</text>

  <text class="dg-label-xs" x="120" y="382" text-anchor="middle">0</text>
  <text class="dg-label-xs" x="220" y="382" text-anchor="middle">10</text>
  <text class="dg-label-xs" x="320" y="382" text-anchor="middle">20</text>
  <text class="dg-label-xs" x="420" y="382" text-anchor="middle">30</text>
  <text class="dg-label-xs" x="520" y="382" text-anchor="middle">40</text>

  <line class="dg-guide" x1="340" y1="210" x2="440" y2="210"></line>
  <line class="dg-guide" x1="340" y1="202" x2="340" y2="218"></line>
  <line class="dg-guide" x1="440" y1="202" x2="440" y2="218"></line>
  <text class="dg-label-sm" x="390" y="198" text-anchor="middle">ES=10</text>

  <rect class="dg-box dg-box-accent" x="40" y="414" width="560" height="56" rx="10"></rect>
  <text class="dg-label-sm" x="320" y="438" text-anchor="middle">ES = S − I = 10</text>
  <text class="dg-label-sm" x="320" y="458" text-anchor="middle">es = (S − I) ÷ Y × 100% = 10%</text>
</svg>`,
    variables: [
      ["S", "國民儲蓄", "家計、企業與政府儲蓄合計；示意值 S=32。"],
      ["I", "國內投資", "國內資本形成；示意值 I=22。"],
      ["Y", "GDP", "所得與產出的衡量基礎；示意值 Y=100。"],
      ["ES", "超額儲蓄", "\\(ES=S-I=10\\)；國民儲蓄超過國內投資的部分。"],
      ["es", "超額儲蓄率", "\\(es=(S-I)/Y\\times100\\%=10\\%\\)；超額儲蓄占 GDP 的比例。"]
    ],
    parameters: [
      ["s=S/Y", "儲蓄率", "示意值 32%。"],
      ["i=I/Y", "投資率", "示意值 22%。"],
      ["S>I", "超額儲蓄", "開放經濟下可貸出國外，對應經常帳順差。"],
      ["示意值", "教學例", "數值為教學示意，實際以主計總處國民所得統計為準。"]
    ],
    note: "超額儲蓄不是浪費的同義詞；它可能代表國內投資不足、預防性儲蓄、資金外流或經常帳順差。分析時應同時看儲蓄率、投資率與資金運用去向。"
  },

  "macro-05#0": {
    sectionTitle: "第1節 存款貨幣的創造與貨幣供給",
    title: "存款貨幣的創造：準備金與貨幣乘數",
    formula: String.raw`M=mB,\qquad m=\frac{1}{rr}`,
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
