/* 總體經濟學 — 模型圖（第 7 章總供需、第 8 章成長與景氣循環） */

window.MACRO_DIAGRAMS = window.MACRO_DIAGRAMS || {};

Object.assign(window.MACRO_DIAGRAMS, {
  "macro-07#0": {
    sectionTitle: "第1節 總供需曲線",
    title: "AD-AS 模型：短期均衡與長期調整",
    caption: "AD 為總需求，SRAS₀ 為初始短期總供給，LRAS 為長期總供給（垂直於自然產出 Yn）。AD 右移後，短期均衡由 E₀ 移到 E₁，物價與產出同時上升；隨著名目工資與價格調整，SRAS 左移到 SRAS₁，產出回到 Yn，物價停在更高的水準（E_LR）。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-adas-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-adas-title">AD-AS模型短期均衡與長期調整圖</title>
  <defs>
    <marker id="dg-adas-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="566" y="326">產出 Y</text>
  <text class="dg-label" x="78" y="24">物價 P</text>
  <line class="dg-curve" x1="110" y1="64" x2="580" y2="248"></line>
  <text class="dg-label" x="536" y="244">AD₀</text>
  <line class="dg-curve-alt" x1="110" y1="34" x2="580" y2="218"></line>
  <text class="dg-label" x="536" y="214">AD₁</text>
  <line class="dg-curve" x1="120" y1="270" x2="580" y2="92.55"></line>
  <text class="dg-label" x="470" y="122">SRAS₀</text>
  <line class="dg-curve-alt" x1="120" y1="240" x2="580" y2="62.55" stroke-dasharray="7 6"></line>
  <text class="dg-label-sm" x="486" y="88">SRAS₁</text>
  <line class="dg-curve-soft" x1="380" y1="50" x2="380" y2="296"></line>
  <text class="dg-label-sm" x="388" y="62">LRAS</text>
  <line class="dg-guide" x1="380" y1="169.7" x2="70" y2="169.7"></line>
  <line class="dg-guide" x1="380" y1="139.7" x2="70" y2="139.7"></line>
  <line class="dg-guide" x1="418.6" y1="154.81" x2="418.6" y2="300"></line>
  <circle class="dg-point" cx="380" cy="169.7" r="4.5"></circle>
  <text class="dg-label" x="352" y="164">E₀</text>
  <circle class="dg-point" cx="418.6" cy="154.81" r="4.5"></circle>
  <text class="dg-label" x="427" y="149">E₁</text>
  <circle class="dg-point" cx="380" cy="139.7" r="4.5"></circle>
  <text class="dg-label" x="352" y="134">E_LR</text>
  <path class="dg-arrow" d="M413,158 Q397,147 385,142" marker-end="url(#dg-adas-arrow)"></path>
  <text class="dg-label-sm" x="380" y="318" text-anchor="middle">Yn</text>
  <text class="dg-label-sm" x="418.6" y="318" text-anchor="middle">Y₁</text>
  <text class="dg-label-sm" x="42" y="176">P₀</text>
  <text class="dg-label-sm" x="42" y="146">P₁</text>
</svg>`,
    variables: [
      ["Y", "實質產出", "橫軸；短期可能偏離自然產出 Yn。"],
      ["P", "物價水準", "縱軸；由 AD 與 SRAS 共同決定。"],
      ["AD", "總需求", "物價越低、實質財富與利率效果使需求越大，斜率向下。"],
      ["SRAS", "短期總供給", "預期物價固定下，物價越高、供給越多，斜率向上。"],
      ["LRAS", "長期總供給", "垂直於自然產出 Yn；長期產出由技術與要素決定。"]
    ],
    parameters: [
      ["Yn", "自然產出", "充分就業下的產出水準，由生產函數與勞動市場決定。"],
      ["SRAS 斜率", "供給僵固程度", "名目工資與價格僵固越強，SRAS 越平坦。"],
      ["AD 移動", "需求衝擊", "G↑、M↑、消費與投資信心上升都會使 AD 右移。"],
      ["工資與價格調整", "長期調整機制", "名目工資與價格調整使 SRAS 左移，經濟回到 Yn；預期物價是背後因素之一。"]
    ],
    note: "短期均衡不一定在 Yn；長期調整靠預期、工資與價格的調整完成。需求管理政策只影響短期產出，長期主要影響物價。"
  },

  "macro-07#1": {
    sectionTitle: "第2節 總供需均衡分析",
    title: "需求衝擊與供給衝擊的比較",
    caption: "左圖：AD 右移的需求拉動，短期物價與產出同升。右圖：SRAS 左移的供給衝擊（如油價上漲），物價上升但產出下降，形成停滯性通膨。兩者的政策含意不同：需求衝擊可用緊縮政策降溫，供給衝擊則面臨通膨與失業的兩難。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-shock-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-shock-title">需求衝擊與供給衝擊比較圖</title>
  <defs>
    <marker id="dg-shock-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <rect class="dg-panel" x="20" y="20" width="286" height="316" rx="14"></rect>
  <rect class="dg-panel" x="334" y="20" width="286" height="316" rx="14"></rect>
  <text class="dg-label" x="163" y="48" text-anchor="middle">需求衝擊：AD 右移</text>
  <text class="dg-label" x="477" y="48" text-anchor="middle">供給衝擊：SRAS 左移</text>
  <line class="dg-axis" x1="56" y1="290" x2="284" y2="290"></line>
  <line class="dg-axis" x1="56" y1="290" x2="56" y2="70"></line>
  <line class="dg-axis" x1="370" y1="290" x2="598" y2="290"></line>
  <line class="dg-axis" x1="370" y1="290" x2="370" y2="70"></line>
  <text class="dg-label-sm" x="270" y="310">Y</text>
  <text class="dg-label-sm" x="34" y="84">P</text>
  <text class="dg-label-sm" x="584" y="310">Y</text>
  <text class="dg-label-sm" x="348" y="84">P</text>
  <line class="dg-curve" x1="66" y1="110" x2="286" y2="256"></line>
  <line class="dg-curve-alt" x1="66" y1="78" x2="286" y2="224"></line>
  <line class="dg-curve-soft" x1="66" y1="240" x2="290" y2="122"></line>
  <text class="dg-label-sm" x="252" y="262">AD₀</text>
  <text class="dg-label-sm" x="252" y="230">AD₁</text>
  <text class="dg-label-sm" x="258" y="128">SRAS</text>
  <line class="dg-arrow" x1="100" y1="86" x2="150" y2="86" marker-end="url(#dg-shock-arrow)"></line>
  <text class="dg-label-sm" x="156" y="90">AD↑</text>
  <circle class="dg-point" cx="175.2" cy="182.47" r="4"></circle>
  <text class="dg-label-sm" x="140" y="180">E₀</text>
  <circle class="dg-point" cx="202.09" cy="168.31" r="4"></circle>
  <text class="dg-label-sm" x="214" y="164">E₁</text>
  <text class="dg-label-sm" x="166" y="310">Y₀</text>
  <text class="dg-label-sm" x="200" y="310">Y₁</text>
  <line class="dg-curve" x1="376" y1="140" x2="596" y2="262"></line>
  <line class="dg-curve-soft" x1="376" y1="240" x2="596" y2="130"></line>
  <line class="dg-curve-alt" x1="376" y1="206" x2="596" y2="96"></line>
  <text class="dg-label-sm" x="562" y="268">AD</text>
  <text class="dg-label-sm" x="560" y="130">SRAS₀</text>
  <text class="dg-label-sm" x="566" y="96">SRAS₁</text>
  <line class="dg-arrow" x1="410" y1="86" x2="460" y2="86" marker-end="url(#dg-shock-arrow)"></line>
  <text class="dg-label-sm" x="466" y="90">油價↑</text>
  <circle class="dg-point" cx="470.83" cy="192.59" r="4"></circle>
  <text class="dg-label-sm" x="448" y="188">E₀</text>
  <circle class="dg-point" cx="438.59" cy="174.71" r="4"></circle>
  <text class="dg-label-sm" x="406" y="170">E₁</text>
  <text class="dg-label-sm" x="472" y="310">Y₀</text>
  <text class="dg-label-sm" x="434" y="310">Y₁</text>
</svg>`,
    variables: [
      ["Y", "產出", "需求衝擊使 Y 上升；供給衝擊使 Y 下降。"],
      ["P", "物價", "兩種衝擊都會推升物價。"],
      ["AD", "總需求", "需求拉動型通膨的來源。"],
      ["SRAS", "短期總供給", "成本推動型通膨的來源。"]
    ],
    parameters: [
      ["AD 衝擊", "需求面變動", "G↑、M↑、投資信心上升。"],
      ["供給衝擊", "成本面變動", "油價、工資、原物料上漲或供給鏈中斷。"],
      ["SRAS 斜率", "調整速度", "供給衝擊下，SRAS 越平坦，產出下降越多；越陡則物價上升較多、產出下降較少。"]
    ],
    note: "供給衝擊造成的物價上升與產出下降同時出現，稱為停滯性通膨（stagflation）。"
  },

  "macro-08#0": {
    sectionTitle: "第1節 經濟成長理論",
    title: "Solow 成長模型：儲蓄、資本累積與穩態",
    caption: "f(k) 是每人產出，sf(k) 是每人儲蓄（也等於每人投資），(n + δ)k 是維持資本勞動比不變所需的投資；此圖為不含技術進步的簡化版，有技術進步時損益兩平投資為 (n + δ + g)k。兩者交點決定穩態資本 k*。儲蓄率上升使 sf(k) 上移，穩態資本與每人產出增加，但長期每人產出成長率仍由技術進步決定。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-solow-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-solow-title">Solow成長模型穩態圖</title>
  <defs>
    <marker id="dg-solow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="540" y="326">每人資本 k</text>
  <text class="dg-label" x="78" y="24">每人產出 y</text>
  <path class="dg-curve-soft" d="M70,300 C150,180 280,110 590,70"></path>
  <text class="dg-label-sm" x="470" y="78">y = f(k)</text>
  <line class="dg-curve-alt" x1="70" y1="300" x2="590" y2="120"></line>
  <text class="dg-label-sm" x="470" y="150">(n + δ)k</text>
  <path class="dg-curve" d="M70,300 C150,235 300,205 590,185"></path>
  <text class="dg-label-sm" x="474" y="206">sf(k)</text>
  <path class="dg-curve-alt" d="M70,300 C150,215 300,185 590,165" stroke-dasharray="7 6"></path>
  <text class="dg-label-sm" x="474" y="184">s↑ 後的 sf(k)</text>
  <line class="dg-guide" x1="322.99" y1="212.43" x2="322.99" y2="300"></line>
  <line class="dg-guide" x1="415.34" y1="180.46" x2="415.34" y2="300"></line>
  <circle class="dg-point" cx="322.99" cy="212.43" r="4.5"></circle>
  <text class="dg-label-sm" x="300" y="202">k*</text>
  <circle class="dg-point" cx="415.34" cy="180.46" r="4.5"></circle>
  <text class="dg-label-sm" x="398" y="174">k**</text>
  <line class="dg-arrow" x1="330" y1="322" x2="412" y2="322" marker-end="url(#dg-solow-arrow)"></line>
  <text class="dg-label-sm" x="336" y="342">儲蓄率上升</text>
</svg>`,
    variables: [
      ["k", "每人資本", "橫軸；k = K ÷ L。"],
      ["y", "每人產出", "縱軸；y = f(k)，隨 k 增加但邊際報酬遞減。"],
      ["sf(k)", "每人儲蓄與投資", "儲蓄率 s 乘以每人產出。"],
      ["(n + δ)k", "損益兩平投資", "維持 k 不變所需投資；n 為人口成長率、δ 為折舊率。"],
      ["k*", "穩態資本", "sf(k*) = (n + δ)k* 的交點。"]
    ],
    parameters: [
      ["s", "儲蓄率", "s 上升使穩態 k* 與 y* 上升，但長期成長率不變。"],
      ["δ", "折舊率", "δ 越大，損益兩平投資線越陡，k* 越小。"],
      ["n", "人口成長率", "n 越大，k* 越小；無技術進步時，每人產出成長率在穩態為 0。"],
      ["g", "技術進步率", "有技術進步時，每人產出長期成長率等於 g。"]
    ],
    note: "Solow 模型的長期成長來自技術進步，儲蓄率只影響穩態水準，不影響長期成長率；這是與內生成長理論的關鍵差異。"
  },

  "macro-08#1": {
    sectionTitle: "第2節 景氣循環",
    title: "景氣循環：圍繞長期趨勢的波動",
    caption: "實質 GDP 長期向上成長，短期則圍繞趨勢線波動，依序經過擴張、高峰、衰退、谷底與復甦。波動的期間與幅度不規則，因此實務上以領先、同時與落後指標綜合判斷，而不是只看單一數據。",
    svg: `
<svg viewBox="0 0 640 360" role="img" aria-labelledby="dg-cycle-title" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-cycle-title">景氣循環階段圖</title>
  <line class="dg-axis" x1="70" y1="300" x2="608" y2="300"></line>
  <line class="dg-axis" x1="70" y1="300" x2="70" y2="32"></line>
  <text class="dg-label" x="560" y="326">時間 t</text>
  <text class="dg-label" x="78" y="24">實質 GDP</text>
  <line class="dg-curve-soft" x1="70" y1="260" x2="600" y2="120"></line>
  <text class="dg-label-sm" x="530" y="108">長期趨勢</text>
  <path class="dg-curve" d="M70,240 C130,150 190,140 250,200 C310,260 370,270 430,190 C480,120 540,110 600,170"></path>
  <circle class="dg-point" cx="175.08" cy="162.18" r="4.5"></circle>
  <text class="dg-label-sm" x="156" y="146">高峰</text>
  <circle class="dg-point" cx="340" cy="247.5" r="4.5"></circle>
  <text class="dg-label-sm" x="348" y="270">谷底</text>
  <text class="dg-label-sm" x="104" y="196">擴張</text>
  <text class="dg-label-sm" x="288" y="236">衰退</text>
  <text class="dg-label-sm" x="462" y="196">復甦</text>
  <text class="dg-label-sm" x="526" y="130">高峰</text>
</svg>`,
    variables: [
      ["Y_t", "實質 GDP", "衡量景氣水準的主要總量指標。"],
      ["t", "時間", "橫軸；景氣循環沒有固定週期。"],
      ["產出缺口", "實際減潛在產出", "正值代表過熱、負值代表低迷。"]
    ],
    parameters: [
      ["趨勢成長率", "長期平均成長", "由技術、資本與勞動成長決定。"],
      ["衝擊持續性", "波動幅度", "需求與供給衝擊的規模與延續時間。"],
      ["指標組合", "領先、同時、落後", "臺灣以國發會景氣對策信號與景氣指標綜合判定。"]
    ],
    note: "景氣循環是總體經濟活動的波動，不是單一產業或單一公司的股價波動；高峰與谷底通常要事後確認。"
  }
});
