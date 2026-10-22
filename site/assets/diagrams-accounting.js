/* 會計學教學流程圖：掛載鍵為 chapterId#sectionIndex，與總體、投資學圖表共用渲染管線。
   目前收錄「會計循環」流程圖，圖為考試複習用的概念示意；載入順序需在 app.js 之前。 */

window.ACCOUNTING_DIAGRAMS = window.ACCOUNTING_DIAGRAMS || {};

Object.assign(window.ACCOUNTING_DIAGRAMS, {
  "accounting-14#0": {
    sectionTitle: "第1節 財務報表與一般公認會計原則",
    kicker: "教學流程圖",
    title: "會計循環流程圖：從交易、分錄到財務報表",
    caption: "企業先辨認交易與事項、取得原始憑證，依借貸法則記入日記帳，再過帳到分類帳並編製調整前試算表。期末依權責發生基礎作調整分錄，編製調整後試算表與財務報表；最後結清收入、費用等虛帳戶，編製結帳後試算表，實帳戶餘額結轉下一會計期間。",
    svg: `
<svg viewBox="0 0 640 840" role="img" aria-labelledby="dg-acc-cycle-title dg-acc-cycle-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-cycle-title">會計循環流程圖</title>
  <desc id="dg-acc-cycle-desc">交易經原始憑證、日記帳分錄、過帳與分類帳後，編製調整前試算表；期末作調整分錄、調整後試算表與財務報表，再作結帳分錄與結帳後試算表，最後進入下一會計期間。</desc>
  <defs>
    <marker id="dg-acc-cycle-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="320" y="20" text-anchor="middle">會計循環 Accounting Cycle</text>
  <text class="dg-label-xs" x="320" y="40" text-anchor="middle">從交易辨認到財務報表，結帳後進入下一期</text>
  <text class="dg-label-xs" x="150" y="58">平時帳務處理 Recording</text>

  <circle class="dg-box dg-box-accent" cx="126" cy="92" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="96" text-anchor="middle" font-size="11">1</text>
  <rect class="dg-box dg-box-accent" x="150" y="68" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="85" text-anchor="middle">交易與事項</text>
  <text class="dg-label-xs" x="320" y="102" text-anchor="middle">Transaction</text>

  <line class="dg-arrow" x1="320" y1="116" x2="320" y2="134" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="158" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="162" text-anchor="middle" font-size="11">2</text>
  <rect class="dg-box" x="150" y="134" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="151" text-anchor="middle">原始憑證</text>
  <text class="dg-label-xs" x="320" y="168" text-anchor="middle">Source documents</text>

  <line class="dg-arrow" x1="320" y1="182" x2="320" y2="200" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="224" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="228" text-anchor="middle" font-size="11">3</text>
  <rect class="dg-box" x="150" y="200" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="217" text-anchor="middle">日記帳</text>
  <text class="dg-label-xs" x="320" y="234" text-anchor="middle">Journal</text>

  <line class="dg-arrow" x1="320" y1="248" x2="320" y2="266" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="290" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="294" text-anchor="middle" font-size="11">4</text>
  <rect class="dg-box" x="150" y="266" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="283" text-anchor="middle">過帳</text>
  <text class="dg-label-xs" x="320" y="300" text-anchor="middle">Posting</text>

  <line class="dg-arrow" x1="320" y1="314" x2="320" y2="332" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="356" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="360" text-anchor="middle" font-size="11">5</text>
  <rect class="dg-box" x="150" y="332" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="349" text-anchor="middle">分類帳</text>
  <text class="dg-label-xs" x="320" y="366" text-anchor="middle">Ledger</text>

  <line class="dg-arrow" x1="320" y1="380" x2="320" y2="398" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="422" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="426" text-anchor="middle" font-size="11">6</text>
  <rect class="dg-box" x="150" y="398" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="415" text-anchor="middle">試算表（調整前）</text>
  <text class="dg-label-xs" x="320" y="432" text-anchor="middle">Unadjusted trial balance</text>

  <text class="dg-label-xs" x="150" y="466">期末處理 Reporting &amp; closing</text>
  <line class="dg-arrow" x1="320" y1="446" x2="320" y2="484" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="508" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="512" text-anchor="middle" font-size="11">7</text>
  <rect class="dg-box" x="150" y="484" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="501" text-anchor="middle">調整分錄</text>
  <text class="dg-label-xs" x="320" y="518" text-anchor="middle">Adjusting entries</text>

  <line class="dg-arrow" x1="320" y1="532" x2="320" y2="550" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="574" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="578" text-anchor="middle" font-size="11">8</text>
  <rect class="dg-box" x="150" y="550" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="567" text-anchor="middle">調整後試算表</text>
  <text class="dg-label-xs" x="320" y="584" text-anchor="middle">Adjusted trial balance</text>

  <line class="dg-arrow" x1="320" y1="598" x2="320" y2="616" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box dg-box-outcome" cx="126" cy="640" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="644" text-anchor="middle" font-size="11">9</text>
  <rect class="dg-box dg-box-outcome" x="150" y="616" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="633" text-anchor="middle">財務報表</text>
  <text class="dg-label-xs" x="320" y="650" text-anchor="middle">Financial statements</text>

  <line class="dg-arrow" x1="320" y1="664" x2="320" y2="682" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box" cx="126" cy="706" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="710" text-anchor="middle" font-size="11">10</text>
  <rect class="dg-box" x="150" y="682" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="699" text-anchor="middle">結帳分錄</text>
  <text class="dg-label-xs" x="320" y="716" text-anchor="middle">Closing entries</text>

  <line class="dg-arrow" x1="320" y1="730" x2="320" y2="748" marker-end="url(#dg-acc-cycle-arrow)"></line>

  <circle class="dg-box dg-box-accent" cx="126" cy="772" r="11"></circle>
  <text class="dg-label dg-label-strong" x="126" y="776" text-anchor="middle" font-size="11">11</text>
  <rect class="dg-box dg-box-accent" x="150" y="748" width="340" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="765" text-anchor="middle">結帳後試算表</text>
  <text class="dg-label-xs" x="320" y="782" text-anchor="middle">Post-closing trial balance</text>

  <path class="dg-arrow" d="M320 796 V820 H590 V92 H494" marker-end="url(#dg-acc-cycle-arrow)"></path>
  <text class="dg-label-xs dg-label-adjust" x="606" y="450" text-anchor="middle" transform="rotate(-90 606 450)">下一會計期間 Next period</text>
</svg>`,
    variables: [
      ["T", "交易與事項 Transaction", "企業發生的事件中，會影響財務狀況或績效、應入帳的部分。"],
      ["SD", "原始憑證 Source documents", "發票、收據、合約、銀行對帳單等支持交易存在的憑證。"],
      ["J", "日記帳 Journal", "按日期依借貸法則記錄分錄的帳簿。"],
      ["GL", "分類帳 Ledger", "將日記帳分錄過帳後，按會計科目彙總的帳戶集合。"],
      ["UTB", "調整前試算表 Unadjusted trial balance", "期末調整前列出各科目餘額，檢查借貸總額是否相等。"],
      ["AJ", "調整分錄 Adjusting entries", "期末按權責發生基礎調整應計、遞延、折舊、減損等項目。"],
      ["ATB", "調整後試算表 Adjusted trial balance", "調整後再次彙總餘額，作為編製財務報表的基礎。"],
      ["FS", "財務報表 Financial statements", "資產負債表、綜合損益表、權益變動表、現金流量表與附註。"],
      ["CE", "結帳分錄 Closing entries", "將收入、費用等虛帳戶結轉本期損益，再結轉保留盈餘。"],
      ["PCTB", "結帳後試算表 Post-closing trial balance", "結帳後僅列實帳戶，確認借貸平衡並結轉下期。"]
    ],
    parameters: [
      ["A = L + E", "會計恆等式 Accounting equation", "資產 = 負債 + 權益；每筆交易後仍須成立。"],
      ["Dr = Cr", "借貸平衡 Double-entry rule", "每筆分錄的借方總額等於貸方總額。"],
      ["Accrual", "權責發生基礎 Accrual basis", "收入於賺得、費用於發生時認列，不以現金收付時點為準。"],
      ["Going concern", "繼續經營 Going concern", "假設企業在可預見未來持續經營，不會清算或大幅縮減營運。"],
      ["Period", "會計期間 Accounting period", "將企業持續的營運劃分為固定期間，以便定期調整、編表與結帳。"],
      ["Closing", "虛實帳戶 Temporary / permanent accounts", "結帳只結虛帳戶；資產、負債、權益等實帳戶結轉下期。"]
    ],
    note: "本圖為教學示意，採常見的會計循環順序。實務上企業可能使用會計資訊系統或工作底稿，步驟名稱與順序略有差異；結帳只處理收入、費用等虛帳戶，資產、負債與權益等實帳戶不結平，而是結轉下一期。"
  },
  "accounting-15#0": {
    sectionTitle: "第1節 財務報表分析之基本觀念及方法",
    kicker: "教學流程圖",
    title: "財務分析總架構圖：從營業收入到本期淨利",
    caption: "財務分析通常從損益表的營業收入往下走：先減銷貨成本得到毛利，再減營業費用得到營業利益，加減營業外項目得到稅前淨利，最後減所得稅費用得到本期淨利。每一個結轉節點都可以連到一個比率，淨利再進一步連到 EPS、P/E、BVPS、P/B、ROA、ROE 與保留盈餘相關比率。",
    svg: `
<svg viewBox="0 0 640 900" role="img" aria-labelledby="dg-acc-fin-title dg-acc-fin-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-fin-title">財務分析總架構圖</title>
  <desc id="dg-acc-fin-desc">從營業收入開始，依序減銷貨成本、營業費用、所得稅費用並加減營業外項目，得到毛利、營業利益、稅前淨利與本期淨利；右側標示營收成長率、毛利率、營業利益率、利息保障倍數、有效稅率與淨利率，下方列出 EPS、P/E、BVPS、P/B、ROA、ROE、保留盈餘率與股利支付率。</desc>
  <defs>
    <marker id="dg-acc-fin-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="320" y="20" text-anchor="middle">財務分析總架構 Financial Analysis Framework</text>
  <text class="dg-label-xs" x="320" y="40" text-anchor="middle">從營業收入走到本期淨利，再連到獲利、效率與市場比率</text>

  <rect class="dg-box dg-box-accent" x="30" y="70" width="300" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="180" y="89" text-anchor="middle" font-size="14">營業收入</text>
  <text class="dg-label-xs" x="180" y="105" text-anchor="middle" font-size="10.5">Revenue / Sales</text>

  <line class="dg-arrow" x1="180" y1="118" x2="180" y2="168" marker-end="url(#dg-acc-fin-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="30" y="140" font-size="9.5">− 銷貨成本 COGS</text>
  <text class="dg-label-xs" x="30" y="154" font-size="9">營業收入 − 銷貨成本 = 毛利</text>

  <rect class="dg-box" x="30" y="168" width="300" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="180" y="187" text-anchor="middle" font-size="14">毛利</text>
  <text class="dg-label-xs" x="180" y="203" text-anchor="middle" font-size="10.5">Gross Profit</text>

  <line class="dg-arrow" x1="180" y1="216" x2="180" y2="286" marker-end="url(#dg-acc-fin-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="30" y="240" font-size="9.5">− 營業費用 Operating Expenses</text>
  <text class="dg-label-xs" x="30" y="254" font-size="9">銷售／管理／研發費用</text>

  <rect class="dg-box" x="30" y="286" width="300" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="180" y="305" text-anchor="middle" font-size="14">營業利益</text>
  <text class="dg-label-xs" x="180" y="321" text-anchor="middle" font-size="10.5">EBIT (Operating Income)</text>

  <line class="dg-arrow" x1="180" y1="334" x2="180" y2="404" marker-end="url(#dg-acc-fin-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="30" y="358" font-size="9.5">＋利息收入 − 利息費用</text>
  <text class="dg-label-xs" x="30" y="372" font-size="9">± 其他收益及損失</text>

  <rect class="dg-box" x="30" y="404" width="300" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="180" y="423" text-anchor="middle" font-size="14">稅前淨利</text>
  <text class="dg-label-xs" x="180" y="439" text-anchor="middle" font-size="10.5">EBT (Earnings Before Tax)</text>

  <line class="dg-arrow" x1="180" y1="452" x2="180" y2="502" marker-end="url(#dg-acc-fin-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="30" y="476" font-size="9.5">− 所得稅費用 Income Tax Expense</text>

  <rect class="dg-box dg-box-outcome" x="30" y="502" width="300" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="180" y="521" text-anchor="middle" font-size="14">本期淨利</text>
  <text class="dg-label-xs" x="180" y="537" text-anchor="middle" font-size="10.5">Net Income (NI)</text>

  <line class="dg-guide" x1="330" y1="94" x2="360" y2="94"></line>
  <rect class="dg-panel" x="360" y="70" width="250" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="485" y="89" text-anchor="middle" font-size="12">營收成長率</text>
  <text class="dg-label-xs" x="485" y="105" text-anchor="middle" font-size="9">本期營收 ÷ 去年營收 − 1</text>

  <line class="dg-guide" x1="330" y1="192" x2="360" y2="192"></line>
  <rect class="dg-panel" x="360" y="168" width="250" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="485" y="187" text-anchor="middle" font-size="12">毛利率</text>
  <text class="dg-label-xs" x="485" y="203" text-anchor="middle" font-size="9">毛利 ÷ 營業收入</text>

  <line class="dg-guide" x1="330" y1="310" x2="360" y2="310"></line>
  <rect class="dg-panel" x="360" y="286" width="250" height="68" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="485" y="303" text-anchor="middle" font-size="12">營業利益率</text>
  <text class="dg-label-xs" x="485" y="317" text-anchor="middle" font-size="9">EBIT ÷ 營業收入</text>
  <text class="dg-label dg-label-strong" x="485" y="335" text-anchor="middle" font-size="12">利息保障倍數</text>
  <text class="dg-label-xs" x="485" y="349" text-anchor="middle" font-size="9">EBIT ÷ 利息費用</text>

  <line class="dg-guide" x1="330" y1="428" x2="360" y2="428"></line>
  <rect class="dg-panel" x="360" y="404" width="250" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="485" y="423" text-anchor="middle" font-size="12">有效稅率</text>
  <text class="dg-label-xs" x="485" y="439" text-anchor="middle" font-size="9">所得稅費用 ÷ EBT</text>

  <line class="dg-guide" x1="330" y1="526" x2="360" y2="526"></line>
  <rect class="dg-panel" x="360" y="502" width="250" height="48" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="485" y="521" text-anchor="middle" font-size="12">淨利率</text>
  <text class="dg-label-xs" x="485" y="537" text-anchor="middle" font-size="9">NI ÷ 營業收入</text>

  <line class="dg-arrow" x1="180" y1="550" x2="180" y2="590" marker-end="url(#dg-acc-fin-arrow)"></line>
  <rect class="dg-panel" x="30" y="590" width="580" height="290" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="320" y="614" text-anchor="middle" font-size="12">本期淨利衍生的比率 Ratios from Net Income</text>

  <rect class="dg-box" x="40" y="632" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="130" y="651" text-anchor="middle" font-size="11.5">每股盈餘 EPS</text>
  <text class="dg-label-xs" x="130" y="669" text-anchor="middle" font-size="9">(NI − 特股股利) ÷ 平均股數</text>

  <rect class="dg-box" x="230" y="632" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="320" y="651" text-anchor="middle" font-size="11.5">本益比 P/E</text>
  <text class="dg-label-xs" x="320" y="669" text-anchor="middle" font-size="9">每股市價 ÷ EPS</text>

  <rect class="dg-box" x="420" y="632" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="510" y="651" text-anchor="middle" font-size="11.5">每股淨值 BVPS</text>
  <text class="dg-label-xs" x="510" y="669" text-anchor="middle" font-size="9">權益 ÷ 流通在外股數</text>

  <rect class="dg-box" x="40" y="702" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="130" y="721" text-anchor="middle" font-size="11.5">股價淨值比 P/B</text>
  <text class="dg-label-xs" x="130" y="739" text-anchor="middle" font-size="9">每股市價 ÷ BVPS</text>

  <rect class="dg-box" x="230" y="702" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="320" y="721" text-anchor="middle" font-size="11.5">資產報酬率 ROA</text>
  <text class="dg-label-xs" x="320" y="739" text-anchor="middle" font-size="9">NI ÷ 平均總資產</text>

  <rect class="dg-box" x="420" y="702" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="510" y="721" text-anchor="middle" font-size="11.5">權益報酬率 ROE</text>
  <text class="dg-label-xs" x="510" y="739" text-anchor="middle" font-size="9">NI ÷ 平均權益</text>

  <rect class="dg-box" x="40" y="772" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="130" y="791" text-anchor="middle" font-size="11.5">保留盈餘增加</text>
  <text class="dg-label-xs" x="130" y="809" text-anchor="middle" font-size="9">NI − 現金股利</text>

  <rect class="dg-box" x="230" y="772" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="320" y="791" text-anchor="middle" font-size="11.5">保留盈餘率</text>
  <text class="dg-label-xs" x="320" y="809" text-anchor="middle" font-size="9">(NI − 股利) ÷ NI</text>

  <rect class="dg-box" x="420" y="772" width="180" height="58" rx="8"></rect>
  <text class="dg-label dg-label-strong" x="510" y="791" text-anchor="middle" font-size="11.5">股利支付率</text>
  <text class="dg-label-xs" x="510" y="809" text-anchor="middle" font-size="9">股利 ÷ NI</text>

  <text class="dg-label-xs dg-label-adjust" x="320" y="852" text-anchor="middle" font-size="10">自由現金流、企業價值評價與杜邦分析的起點</text>
  <text class="dg-label-xs" x="320" y="868" text-anchor="middle" font-size="9">保留盈餘率 + 股利支付率 = 1（同一淨利與股利定義下）</text>
</svg>`,
    variables: [
      ["Rev", "營業收入 Revenue / Sales", "損益表的起點，也是營收成長率與各項獲利率的分母。"],
      ["COGS", "銷貨成本 Cost of Goods Sold", "與營業收入相減得到毛利；成本認列會影響毛利率。"],
      ["GP", "毛利 Gross Profit", "營業收入 − 銷貨成本；毛利率的分子。"],
      ["OpEx", "營業費用 Operating Expenses", "銷售、管理、研發等本業費用；與毛利相減得到營業利益。"],
      ["EBIT", "營業利益 EBIT", "毛利 − 營業費用；衡量本業獲利能力。"],
      ["EBT", "稅前淨利 EBT", "EBIT ＋利息收入 −利息費用 ±其他收益及損失。"],
      ["NI", "本期淨利 Net Income", "EBT − 所得稅費用；連結保留盈餘、EPS 與 ROE。"],
      ["BVPS", "每股淨值 Book Value per Share", "股東權益 ÷ 流通在外普通股股數。"],
      ["ROA / ROE", "資產報酬率／權益報酬率", "分別以平均總資產、平均股東權益為分母。"],
      ["Payout", "股利支付率 Dividend Payout Ratio", "股利 ÷ 本期淨利；與保留盈餘率互補。"]
    ],
    parameters: [
      ["A = L + E", "會計恆等式 Accounting equation", "資產 = 負債 + 權益；資產負債表與比率分析的基礎。"],
      ["Accrual", "權責發生基礎 Accrual basis", "收入與費用依認列條件入帳，不是看現金收付時點。"],
      ["Average", "平均餘額 Average balance", "ROA、ROE 與週轉率通常用期初、期末平均，避免期間不一致。"],
      ["Market price", "每股市價 Market price", "P/E 與 P/B 需要市場價格，不是純會計帳面數字。"],
      ["Shares", "股數 Shares", "EPS 分母用加權平均流通在外股數；BVPS 分母通常用期末流通在外股數。"],
      ["Same period", "同一期間 Same period", "比率的分子、分母期間與單位要一致，否則會誤導。"],
      ["Retention", "保留盈餘率 Retention ratio", "(NI − 股利) ÷ NI；與股利支付率合計為 1。"],
      ["DuPont", "杜邦分析 DuPont analysis", "把 ROE 拆成淨利率、資產週轉率與權益乘數，進一步追蹤報酬來源。"]
    ],
    note: "本圖把損益表的主要結轉路徑與常見比率放在同一張圖。比率只表示關係，必須搭配產業特性、會計政策、同期比較與附註解讀；P/E、P/B 需要市價，EPS 與 BVPS 的股數定義也不同。"
  },
  "accounting-15#1": {
    sectionTitle: "第2節 比率分析",
    kicker: "教學流程圖",
    title: "杜邦分析：三階段與五階段 ROE 拆解",
    caption: "三階段杜邦分析把權益報酬率拆成淨利率、總資產週轉率與權益乘數，分別代表獲利能力、資產使用效率與財務槓桿。五階段版本再把淨利率拆成稅務效率與利息負擔，適合比較稅負、利息與本業獲利對 ROE 的影響。",
    svg: `
<svg viewBox="0 0 640 580" role="img" aria-labelledby="dg-acc-dupont-title dg-acc-dupont-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-dupont-title">杜邦分析圖</title>
  <desc id="dg-acc-dupont-desc">上方為三階段杜邦分析，將 ROE 拆成淨利率、總資產週轉率與權益乘數；下方為五階段杜邦分析，再拆成稅務效率、利息負擔、本業獲利能力、資產使用效率與財務槓桿。</desc>
  <defs>
    <marker id="dg-acc-dupont-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="320" y="20" text-anchor="middle">杜邦分析 DuPont Analysis</text>
  <text class="dg-label-xs" x="320" y="40" text-anchor="middle">把 ROE 拆成獲利、效率與槓桿；五階段再拆分稅務與利息負擔</text>

  <text class="dg-label-xs dg-label-adjust" x="320" y="66" text-anchor="middle" font-size="11">三階段 Three-Step DuPont</text>
  <rect class="dg-box dg-box-accent" x="250" y="78" width="140" height="44" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="96" text-anchor="middle" font-size="13">權益報酬率 ROE</text>
  <text class="dg-label-xs" x="320" y="112" text-anchor="middle" font-size="9">Return on Equity</text>

  <path class="dg-arrow" d="M320 122 V144 H125 V170" marker-end="url(#dg-acc-dupont-arrow)"></path>
  <line class="dg-arrow" x1="320" y1="122" x2="320" y2="170" marker-end="url(#dg-acc-dupont-arrow)"></line>
  <path class="dg-arrow" d="M320 122 V144 H515 V170" marker-end="url(#dg-acc-dupont-arrow)"></path>

  <rect class="dg-box" x="35" y="170" width="180" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="125" y="190" text-anchor="middle" font-size="13">淨利率</text>
  <text class="dg-label-xs" x="125" y="205" text-anchor="middle" font-size="9">Net Profit Margin</text>
  <text class="dg-label-xs" x="125" y="220" text-anchor="middle" font-size="9">NI ÷ Revenue</text>

  <rect class="dg-box" x="230" y="170" width="180" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="190" text-anchor="middle" font-size="13">總資產週轉率</text>
  <text class="dg-label-xs" x="320" y="205" text-anchor="middle" font-size="9">Asset Turnover</text>
  <text class="dg-label-xs" x="320" y="220" text-anchor="middle" font-size="9">Revenue ÷ Avg. Assets</text>

  <rect class="dg-box" x="425" y="170" width="180" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="515" y="190" text-anchor="middle" font-size="13">權益乘數</text>
  <text class="dg-label-xs" x="515" y="205" text-anchor="middle" font-size="9">Equity Multiplier</text>
  <text class="dg-label-xs" x="515" y="220" text-anchor="middle" font-size="9">Avg. Assets ÷ Avg. Equity</text>

  <text class="dg-label-xs dg-label-adjust" x="320" y="272" text-anchor="middle" font-size="11">五階段 Five-Step DuPont</text>
  <rect class="dg-box dg-box-accent" x="250" y="290" width="140" height="44" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="308" text-anchor="middle" font-size="13">權益報酬率 ROE</text>
  <text class="dg-label-xs" x="320" y="324" text-anchor="middle" font-size="9">Return on Equity</text>

  <line class="dg-arrow" x1="320" y1="334" x2="320" y2="354"></line>
  <line class="dg-guide" x1="76" y1="354" x2="564" y2="354"></line>
  <line class="dg-arrow" x1="76" y1="354" x2="76" y2="388" marker-end="url(#dg-acc-dupont-arrow)"></line>
  <line class="dg-arrow" x1="198" y1="354" x2="198" y2="388" marker-end="url(#dg-acc-dupont-arrow)"></line>
  <line class="dg-arrow" x1="320" y1="354" x2="320" y2="388" marker-end="url(#dg-acc-dupont-arrow)"></line>
  <line class="dg-arrow" x1="442" y1="354" x2="442" y2="388" marker-end="url(#dg-acc-dupont-arrow)"></line>
  <line class="dg-arrow" x1="564" y1="354" x2="564" y2="388" marker-end="url(#dg-acc-dupont-arrow)"></line>

  <rect class="dg-box" x="20" y="388" width="112" height="72" rx="9"></rect>
  <text class="dg-label dg-label-strong" x="76" y="408" text-anchor="middle" font-size="12">稅務效率</text>
  <text class="dg-label-xs" x="76" y="422" text-anchor="middle" font-size="8.5">Tax Burden</text>
  <text class="dg-label-xs" x="76" y="438" text-anchor="middle" font-size="8.5">NI ÷ EBT</text>

  <rect class="dg-box" x="142" y="388" width="112" height="72" rx="9"></rect>
  <text class="dg-label dg-label-strong" x="198" y="408" text-anchor="middle" font-size="12">利息負擔</text>
  <text class="dg-label-xs" x="198" y="422" text-anchor="middle" font-size="8.5">Interest Burden</text>
  <text class="dg-label-xs" x="198" y="438" text-anchor="middle" font-size="8.5">EBT ÷ EBIT</text>

  <rect class="dg-box" x="264" y="388" width="112" height="72" rx="9"></rect>
  <text class="dg-label dg-label-strong" x="320" y="408" text-anchor="middle" font-size="12">本業獲利</text>
  <text class="dg-label-xs" x="320" y="422" text-anchor="middle" font-size="8.5">EBIT Margin</text>
  <text class="dg-label-xs" x="320" y="438" text-anchor="middle" font-size="8.5">EBIT ÷ Revenue</text>

  <rect class="dg-box" x="386" y="388" width="112" height="72" rx="9"></rect>
  <text class="dg-label dg-label-strong" x="442" y="408" text-anchor="middle" font-size="12">資產效率</text>
  <text class="dg-label-xs" x="442" y="422" text-anchor="middle" font-size="8.5">Asset Turnover</text>
  <text class="dg-label-xs" x="442" y="438" text-anchor="middle" font-size="8.5">Revenue ÷ Assets</text>

  <rect class="dg-box" x="508" y="388" width="112" height="72" rx="9"></rect>
  <text class="dg-label dg-label-strong" x="564" y="408" text-anchor="middle" font-size="12">財務槓桿</text>
  <text class="dg-label-xs" x="564" y="422" text-anchor="middle" font-size="8.5">Equity Multiplier</text>
  <text class="dg-label-xs" x="564" y="438" text-anchor="middle" font-size="8.5">Assets ÷ Equity</text>

  <rect class="dg-panel" x="30" y="490" width="580" height="70" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="512" text-anchor="middle" font-size="10.5">三階段：ROE = 淨利率 × 總資產週轉率 × 權益乘數</text>
  <text class="dg-label dg-label-strong" x="320" y="530" text-anchor="middle" font-size="10.5">五階段：ROE = 稅務效率 × 利息負擔 × 本業獲利 × 資產效率 × 財務槓桿</text>
  <text class="dg-label-xs" x="320" y="548" text-anchor="middle" font-size="9">三階段快速判斷報酬來源；五階段再拆稅務與利息負擔。</text>
</svg>`,
    variables: [
      ["ROE", "權益報酬率 Return on Equity", "本期淨利 ÷ 平均股東權益，衡量普通股股東的報酬。"],
      ["NPM", "淨利率 Net Profit Margin", "NI ÷ 營業收入，代表每一元營收留下的淨利。"],
      ["AT", "總資產週轉率 Asset Turnover", "營業收入 ÷ 平均總資產，代表資產創造營收的效率。"],
      ["EM", "權益乘數 Equity Multiplier", "平均總資產 ÷ 平均股東權益，代表財務槓桿。"],
      ["Tax", "稅務效率 Tax Burden", "NI ÷ EBT；越接近 1 表示稅負越輕。"],
      ["Int", "利息負擔 Interest Burden", "EBT ÷ EBIT；越接近 1 表示利息負擔越輕。"],
      ["EBIT margin", "本業獲利能力 EBIT Margin", "EBIT ÷ 營業收入。"],
      ["Five-step", "五階段杜邦 Five-Step DuPont", "把三階段中的淨利率再拆成稅務效率、利息負擔與本業獲利。"]
    ],
    parameters: [
      ["3-step", "三階段杜邦 Three-step DuPont", "ROE = 淨利率 × 總資產週轉率 × 權益乘數。"],
      ["5-step", "五階段杜邦 Five-step DuPont", "ROE = 稅務效率 × 利息負擔 × 本業獲利 × 資產效率 × 財務槓桿。"],
      ["Average", "平均餘額 Average balance", "AT、EM 與 ROE 的分母通常用期初、期末平均。"],
      ["Period", "同期間 Same period", "分子、分母的期間與單位要一致。"],
      ["Leverage", "槓桿效果 Leverage effect", "EM 上升可推高 ROE，但也提高財務風險。"],
      ["Quality", "報酬品質 Quality of return", "ROE 上升可能來自本業改善、效率提升或槓桿，需進一步拆解。"]
    ],
    note: "三階段杜邦是考試最常用的版本；五階段版本將稅務效率與利息負擔獨立出來。ROE 上升不一定是本業改善，也可能是資產週轉率提高或財務槓桿上升，必須搭配現金流量與風險一起解讀。"
  },
  "accounting-23#1": {
    sectionTitle: "學習重點 2：跨報表整合與考前檢查",
    kicker: "教學流程圖",
    title: "四大財務報表連結：淨利如何串起四張報表",
    caption: "本期淨利是跨報表連結的核心：淨利進入保留盈餘，保留盈餘再進入資產負債表的權益；資產負債表的現金餘額必須與現金流量表的期末現金一致。現金流量表的營業活動現金流則從淨利出發，調整非現金項目與營運資金變動。",
    svg: `
<svg viewBox="0 0 640 590" role="img" aria-labelledby="dg-acc-stmt-title dg-acc-stmt-desc" style="max-width:640px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-stmt-title">四大財務報表連結圖</title>
  <desc id="dg-acc-stmt-desc">綜合損益表的本期淨利進入保留盈餘，保留盈餘再進入資產負債表權益；資產負債表現金餘額與現金流量表期末現金一致；營業活動現金流由本期淨利調整非現金項目與營運資金變動而來。</desc>
  <defs>
    <marker id="dg-acc-stmt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="320" y="20" text-anchor="middle">四大財務報表連結 Financial Statement Linkages</text>
  <text class="dg-label-xs" x="320" y="40" text-anchor="middle">淨利把損益表、保留盈餘、資產負債表與現金流量表串起來</text>

  <rect class="dg-box dg-box-accent" x="150" y="70" width="340" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="90" text-anchor="middle" font-size="13">綜合損益表 Income Statement</text>
  <text class="dg-label-xs" x="320" y="107" text-anchor="middle" font-size="9">Revenue → Gross Profit → EBIT → EBT → NI</text>
  <text class="dg-label-xs" x="320" y="122" text-anchor="middle" font-size="9">營業收入 → 毛利 → 營業利益 → 稅前淨利 → 本期淨利</text>

  <line class="dg-arrow" x1="320" y1="134" x2="320" y2="174" marker-end="url(#dg-acc-stmt-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="340" y="154" font-size="9.5">NI 本期淨利</text>

  <rect class="dg-box" x="150" y="174" width="340" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="194" text-anchor="middle" font-size="13">保留盈餘增加 Increase in Retained Earnings</text>
  <text class="dg-label-xs" x="320" y="211" text-anchor="middle" font-size="9">期初保留盈餘 + 本期淨利 − 股利</text>
  <text class="dg-label-xs" x="320" y="226" text-anchor="middle" font-size="9">期末保留盈餘 = 期初 + NI − Dividend</text>

  <line class="dg-arrow" x1="320" y1="238" x2="320" y2="278" marker-end="url(#dg-acc-stmt-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="340" y="258" font-size="9.5">權益 Equity</text>

  <rect class="dg-box" x="150" y="278" width="340" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="298" text-anchor="middle" font-size="13">資產負債表 Balance Sheet</text>
  <text class="dg-label-xs" x="320" y="315" text-anchor="middle" font-size="9">Assets = Liabilities + Equity</text>
  <text class="dg-label-xs" x="320" y="330" text-anchor="middle" font-size="9">現金餘額 Cash balance</text>

  <line class="dg-arrow" x1="320" y1="342" x2="320" y2="382" marker-end="url(#dg-acc-stmt-arrow)"></line>
  <text class="dg-label-xs dg-label-adjust" x="340" y="362" font-size="9.5">現金 Cash</text>

  <rect class="dg-box dg-box-outcome" x="150" y="382" width="340" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="402" text-anchor="middle" font-size="13">現金流量表 Cash Flow Statement</text>
  <text class="dg-label-xs" x="320" y="419" text-anchor="middle" font-size="9">營業活動現金流 CFO ← NI 調整</text>
  <text class="dg-label-xs" x="320" y="434" text-anchor="middle" font-size="9">期末現金 = 資產負債表現金</text>

  <rect class="dg-panel" x="30" y="470" width="580" height="96" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="320" y="492" text-anchor="middle" font-size="11">連結檢查 Linkage checks</text>
  <text class="dg-label-xs" x="50" y="514" font-size="9.5">① NI 進入保留盈餘，再進入權益；股利是保留盈餘的減項。</text>
  <text class="dg-label-xs" x="50" y="532" font-size="9.5">② 資產負債表期末現金 = 現金流量表期末現金。</text>
  <text class="dg-label-xs" x="50" y="550" font-size="9.5">③ CFO 由 NI 調整非現金項目與營運資金變動而來。</text>
  <text class="dg-label-xs dg-label-adjust" x="320" y="578" text-anchor="middle" font-size="9.5">四大報表：損益表、資產負債表、權益變動表、現金流量表</text>
</svg>`,
    variables: [
      ["IS", "綜合損益表 Income Statement", "Revenue → Gross Profit → EBIT → EBT → NI；呈現本期經營績效。"],
      ["RE", "保留盈餘 Retained Earnings", "期初保留盈餘 + 本期淨利 − 股利（簡化式）。"],
      ["BS", "資產負債表 Balance Sheet", "Assets = Liabilities + Equity；列示期末現金餘額。"],
      ["CF", "現金流量表 Cash Flow Statement", "營業、投資、籌資活動現金流；期末現金應與資產負債表一致。"],
      ["CFO", "營業活動現金流 Cash from Operations", "由 NI 調整非現金項目與營運資金變動而來。"],
      ["Dividend", "股利 Dividend", "保留盈餘的減項，也是籌資活動的現金流出。"],
      ["Equity", "權益變動表 Statement of Changes in Equity", "串起股本、資本公積、保留盈餘與其他權益的變動。"]
    ],
    parameters: [
      ["A = L + E", "會計恆等式 Accounting equation", "資產 = 負債 + 權益，每一期期末都須成立。"],
      ["NI → RE", "淨利結轉 Closing to retained earnings", "本期淨利進入保留盈餘；股利減少保留盈餘。"],
      ["Cash", "現金勾稽 Cash reconciliation", "資產負債表期末現金 = 現金流量表期末現金。"],
      ["Accrual", "權責發生基礎 Accrual basis", "NI 與 CFO 不同，需調整折舊、攤銷與營運資金變動。"],
      ["Equity statement", "權益變動表 Statement of changes in equity", "連接損益表、保留盈餘與資產負債表權益。"],
      ["Disclosure", "附註揭露 Notes to financial statements", "會計政策、股利、庫藏股與其他權益變動的補充說明。"]
    ],
    note: "本圖為教學示意，採簡化式。實際報表還有其他綜合損益、前期損益調整、股票股利、庫藏股交易與非控制權益等，會讓保留盈餘與權益變動更複雜；跨報表檢查仍以期末現金、權益與淨利的勾稽為核心。"
  },
  "accounting-14#0-2": {
    sectionTitle: "第1節 財務報表與一般公認會計原則",
    kicker: "教學流程圖",
    title: "主要財務報表架構圖：四表一附註",
    caption: "財務報表是一組報表，不是只有損益表。資產負債表呈現特定期末的資產、負債與權益；綜合損益表呈現特定期間的收益、費損、本期淨利與其他綜合損益；權益變動表說明權益組成的變動；現金流量表說明營業、投資與籌資活動的現金流。附註則揭露會計政策、重大估計、科目明細與風險。圖中箭頭標出淨利、期末權益與期末現金三個主要勾稽點。",
    svg: `
<svg viewBox="0 0 920 800" role="img" aria-labelledby="dg-acc-fs-title dg-acc-fs-desc" style="max-width:920px;min-width:760px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-fs-title">主要財務報表架構圖：四表一附註</title>
  <desc id="dg-acc-fs-desc">左上為資產負債表，列示資產、負債與權益；右上為綜合損益表，從收入、費用走到本期淨利與其他綜合損益；左下為權益變動表，從期初權益走到期末權益；右下為現金流量表，列示營業、投資、籌資活動現金流與期末現金；底部為附註。箭頭標示本期淨利進入權益、期末權益與期末現金回到資產負債表。</desc>
  <defs>
    <marker id="dg-acc-fs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="460" y="24" text-anchor="middle" font-size="17">主要財務報表架構 Financial Statement Architecture</text>
  <text class="dg-label-xs" x="460" y="46" text-anchor="middle">四表一附註：時點報表、期間報表與現金流報表互相勾稽</text>

  <rect class="dg-box" x="30" y="70" width="420" height="250" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="50" y="94" font-size="14">資產負債表 Balance Sheet</text>
  <text class="dg-label-xs" x="50" y="112">特定期末的財務狀況（時點）</text>

  <text class="dg-label dg-label-strong" x="50" y="138" font-size="11.5">資產 Assets</text>
  <text class="dg-label-xs" x="50" y="158" font-size="10.5">流動資產：現金、應收帳款、存貨</text>
  <text class="dg-label-xs" x="50" y="176" font-size="10.5">預付費用、其他流動資產</text>
  <text class="dg-label-xs" x="50" y="196" font-size="10.5">非流動資產：不動產、廠房及設備</text>
  <text class="dg-label-xs" x="50" y="214" font-size="10.5">無形資產、投資性不動產</text>
  <text class="dg-label dg-label-strong" x="50" y="240" font-size="11.5">資產總額 A</text>

  <text class="dg-label dg-label-strong" x="250" y="138" font-size="11.5">負債 Liabilities</text>
  <text class="dg-label-xs" x="250" y="158" font-size="10.5">流動負債：應付帳款、短期借款</text>
  <text class="dg-label-xs" x="250" y="176" font-size="10.5">應付薪資、應付稅款</text>
  <text class="dg-label-xs" x="250" y="196" font-size="10.5">非流動負債：長期借款、公司債</text>
  <text class="dg-label dg-label-strong" x="250" y="220" font-size="11.5">權益 Equity</text>
  <text class="dg-label-xs" x="250" y="240" font-size="10.5">股本、資本公積、保留盈餘</text>
  <text class="dg-label-xs" x="250" y="258" font-size="10.5">其他權益、非控制權益</text>
  <text class="dg-label dg-label-strong" x="250" y="282" font-size="11.5">負債＋權益 L + E</text>
  <text class="dg-label dg-label-adjust" x="240" y="306" text-anchor="middle" font-size="11.5">A = L + E</text>

  <rect class="dg-box" x="470" y="70" width="420" height="250" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="490" y="94" font-size="14">綜合損益表 Statement of Comprehensive Income</text>
  <text class="dg-label-xs" x="490" y="112">特定期間的財務績效（期間）</text>
  <text class="dg-label-xs" x="490" y="140" font-size="11">營業收入 Revenue</text>
  <text class="dg-label-xs" x="490" y="160" font-size="11">− 銷貨成本 COGS</text>
  <text class="dg-label-xs" x="490" y="180" font-size="11">＝ 毛利 Gross Profit</text>
  <text class="dg-label-xs" x="490" y="200" font-size="11">− 營業費用 Operating Expenses</text>
  <text class="dg-label-xs" x="490" y="220" font-size="11">＝ 營業利益 EBIT</text>
  <text class="dg-label-xs" x="490" y="240" font-size="11">± 營業外收支、− 所得稅費用</text>
  <text class="dg-label dg-label-strong" x="490" y="260" font-size="11">＝ 本期淨利 Net Income</text>
  <text class="dg-label-xs" x="490" y="280" font-size="11">± 其他綜合損益 OCI</text>
  <text class="dg-label dg-label-strong" x="490" y="300" font-size="11">＝ 本期綜合損益 Total Comprehensive Income</text>

  <rect class="dg-box" x="30" y="390" width="420" height="230" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="50" y="414" font-size="14">權益變動表 Statement of Changes in Equity</text>
  <text class="dg-label-xs" x="50" y="432">特定期間權益組成的變動（期間）</text>
  <text class="dg-label-xs" x="50" y="462" font-size="11">期初權益 Beginning equity</text>
  <text class="dg-label-xs" x="50" y="484" font-size="11">＋ 本期綜合損益 Total comprehensive income</text>
  <text class="dg-label-xs" x="50" y="506" font-size="11">＋ 增資／發行新股 Issuance of shares</text>
  <text class="dg-label-xs" x="50" y="528" font-size="11">− 股利發放 Dividends</text>
  <text class="dg-label-xs" x="50" y="550" font-size="11">± 庫藏股、其他權益變動 Treasury / other</text>
  <text class="dg-label dg-label-strong" x="50" y="572" font-size="11">＝ 期末權益 Ending equity</text>
  <text class="dg-label-xs" x="50" y="600" font-size="10.5">與資產負債表權益總額勾稽</text>

  <rect class="dg-box" x="470" y="390" width="420" height="230" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="490" y="414" font-size="14">現金流量表 Statement of Cash Flows</text>
  <text class="dg-label-xs" x="490" y="432">特定期間現金及約當現金的變動（期間）</text>
  <text class="dg-label-xs" x="490" y="462" font-size="11">營業活動現金流量 CFO</text>
  <text class="dg-label-xs" x="490" y="484" font-size="11">± 投資活動現金流量 CFI</text>
  <text class="dg-label-xs" x="490" y="506" font-size="11">± 籌資活動現金流量 CFF</text>
  <text class="dg-label dg-label-strong" x="490" y="528" font-size="11">＝ 本期現金淨變動 Net change in cash</text>
  <text class="dg-label-xs" x="490" y="550" font-size="11">＋ 期初現金餘額 Beginning cash</text>
  <text class="dg-label dg-label-strong" x="490" y="572" font-size="11">＝ 期末現金餘額 Ending cash</text>
  <text class="dg-label-xs" x="490" y="600" font-size="10.5">與資產負債表「現金及約當現金」勾稽</text>

  <path class="dg-arrow" d="M500 320 V350 H240 V390" marker-end="url(#dg-acc-fs-arrow)"></path>
  <text class="dg-label dg-label-adjust" x="360" y="342" text-anchor="middle" font-size="10.5">本期淨利 NI</text>

  <path class="dg-arrow" d="M120 390 V320" marker-end="url(#dg-acc-fs-arrow)"></path>
  <text class="dg-label dg-label-adjust" x="132" y="360" font-size="10.5">期末權益</text>

  <path class="dg-arrow" d="M680 390 V320" marker-end="url(#dg-acc-fs-arrow)"></path>
  <text class="dg-label dg-label-adjust" x="692" y="360" font-size="10.5">期末現金</text>

  <line class="dg-guide" x1="460" y1="620" x2="460" y2="650"></line>
  <rect class="dg-panel" x="30" y="650" width="860" height="86" rx="12" stroke-dasharray="6 4"></rect>
  <text class="dg-label dg-label-strong" x="50" y="674" font-size="13">附註 Notes</text>
  <text class="dg-label-xs" x="50" y="696" font-size="10.5">會計政策、重大會計估計、科目明細、金融工具風險、關係人交易、或有事項。</text>
  <text class="dg-label-xs" x="50" y="716" font-size="10.5">四表一附註：附註是財務報表不可分割的一部分，四張表都應交叉索引附註。</text>

  <text class="dg-label-xs" x="460" y="766" text-anchor="middle" font-size="10.5">編表順序：調整後試算表 → 綜合損益表 → 權益變動表／資產負債表 → 現金流量表。</text>
  <text class="dg-label-xs" x="460" y="786" text-anchor="middle" font-size="10.5">每個箭頭都是一個勾稽點：NI → 權益；期末權益 → BS；期末現金 → BS。</text>
</svg>`,
    variables: [
      ["BS", "資產負債表 Balance Sheet", "列示特定期末的資產、負債與權益；資產總額等於負債加權益。"],
      ["IS", "綜合損益表 Statement of Comprehensive Income", "列示特定期間的收益、費損、本期淨利與其他綜合損益。"],
      ["SCE", "權益變動表 Statement of Changes in Equity", "列示期初權益、本期綜合損益、增資、股利與其他權益變動。"],
      ["CF", "現金流量表 Statement of Cash Flows", "列示營業、投資與籌資活動的現金流量及期末現金餘額。"],
      ["Notes", "附註 Notes", "揭露會計政策、重大估計、科目明細、風險與關係人交易等資訊。"],
      ["A", "資產 Assets", "企業控制的資源，預期帶來未來經濟效益。"],
      ["L", "負債 Liabilities", "企業因過去事件產生的現時義務，清償時將流出資源。"],
      ["E", "權益 Equity", "資產扣除負債後的剩餘權益，包括股本、資本公積與保留盈餘。"],
      ["NI", "本期淨利 Net Income", "收入減費用後的期間損益，進入保留盈餘與權益變動表。"],
      ["OCI", "其他綜合損益 Other Comprehensive Income", "不列入本期淨利但列入綜合損益的項目，如部分重評價利益。"]
    ],
    parameters: [
      ["A = L + E", "會計恆等式 Accounting equation", "資產 = 負債 + 權益；資產負債表每一期期末都須成立。"],
      ["NI → E", "淨利結轉 Closing to equity", "本期淨利進入保留盈餘，再進入權益變動表與資產負債表。"],
      ["Cash", "現金勾稽 Cash reconciliation", "現金流量表期末現金 = 資產負債表現金及約當現金。"],
      ["CFO / CFI / CFF", "三大活動現金流 Cash flow categories", "營業、投資、籌資活動現金流合計為本期現金淨變動。"],
      ["Period", "期間與時點 Period vs point in time", "資產負債表是時點；損益表、權益變動表與現金流量表是期間。"],
      ["Disclosure", "附註揭露 Notes disclosure", "附註補充四張表的政策、明細、估計與風險資訊。"]
    ],
    note: "本圖為教學示意，採常見格式。實際報表科目、分類與揭露會依企業、產業及 IFRS 要求調整；資產負債表是期末時點，綜合損益表、權益變動表與現金流量表則涵蓋特定期間。"
  },
  "accounting-14#0-3": {
    sectionTitle: "第1節 財務報表與一般公認會計原則",
    kicker: "教學流程圖",
    title: "借記／貸記常用項目速查圖",
    caption: "借記在左、貸記在右。資產、費用、股利增加通常記借方；負債、權益、收入增加通常記貸方。累計折舊與備抵損失是資產減項，正常餘額在貸方；庫藏股是權益減項，正常餘額在借方。下方用現金銷貨、賒購存貨、支付租金、銀行借款、提列折舊與宣告股利六個例子，示範每一筆分錄都必須維持借方總額等於貸方總額。",
    svg: `
<svg viewBox="0 0 920 880" role="img" aria-labelledby="dg-acc-dr-title dg-acc-dr-desc" style="max-width:920px;min-width:760px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-dr-title">借記／貸記常用項目速查圖</title>
  <desc id="dg-acc-dr-desc">左側 T 字帳列出借方與貸方的常用科目：借方包括資產增加、費用增加、損失增加、股利與庫藏股；貸方包括負債增加、權益增加、收入增加、利益增加與資產減項。右側列出判斷步驟，下方以六個交易示範借貸分錄與進入的財務報表。</desc>
  <defs>
    <marker id="dg-acc-dr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="460" y="24" text-anchor="middle" font-size="17">借記／貸記常用項目 Debit and Credit</text>
  <text class="dg-label-xs" x="460" y="46" text-anchor="middle">先判斷科目類別，再判斷增加或減少；每筆分錄 Dr = Cr</text>

  <rect class="dg-box" x="30" y="70" width="560" height="430" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="50" y="94" font-size="14">T 字帳：借方 Debit（左）／貸方 Credit（右）</text>
  <text class="dg-label-xs" x="50" y="114" font-size="10.5">正常餘額側就是「增加」記入的一側；減少記相反側。</text>
  <line class="dg-guide" x1="310" y1="126" x2="310" y2="480"></line>

  <text class="dg-label dg-label-strong" x="50" y="146" font-size="12.5">借方 Debit</text>
  <text class="dg-label-xs" x="50" y="164" font-size="10">正常餘額側：資產、費用、股利</text>
  <text class="dg-label dg-label-strong" x="50" y="192" font-size="11.5">資產增加</text>
  <text class="dg-label-xs" x="50" y="212" font-size="10.5">現金、應收帳款、存貨</text>
  <text class="dg-label-xs" x="50" y="230" font-size="10.5">預付費用、設備、無形資產</text>
  <text class="dg-label dg-label-strong" x="50" y="258" font-size="11.5">費用增加</text>
  <text class="dg-label-xs" x="50" y="278" font-size="10.5">銷貨成本、薪資、租金</text>
  <text class="dg-label-xs" x="50" y="296" font-size="10.5">折舊、利息、所得稅</text>
  <text class="dg-label dg-label-strong" x="50" y="324" font-size="11.5">損失增加</text>
  <text class="dg-label-xs" x="50" y="344" font-size="10.5">處分資產損失、火災損失</text>
  <text class="dg-label dg-label-strong" x="50" y="372" font-size="11.5">股利／提款</text>
  <text class="dg-label-xs" x="50" y="392" font-size="10.5">現金股利、業主提款</text>
  <text class="dg-label dg-label-strong" x="50" y="420" font-size="11.5">權益減項：庫藏股</text>
  <text class="dg-label-xs" x="50" y="440" font-size="10.5">買回庫藏股記借方</text>

  <text class="dg-label dg-label-strong" x="330" y="146" font-size="12.5">貸方 Credit</text>
  <text class="dg-label-xs" x="330" y="164" font-size="10">正常餘額側：負債、權益、收入</text>
  <text class="dg-label dg-label-strong" x="330" y="192" font-size="11.5">負債增加</text>
  <text class="dg-label-xs" x="330" y="212" font-size="10.5">應付帳款、應付薪資</text>
  <text class="dg-label-xs" x="330" y="230" font-size="10.5">短期借款、公司債</text>
  <text class="dg-label dg-label-strong" x="330" y="258" font-size="11.5">權益增加</text>
  <text class="dg-label-xs" x="330" y="278" font-size="10.5">股本、資本公積</text>
  <text class="dg-label-xs" x="330" y="296" font-size="10.5">保留盈餘（本期淨利）</text>
  <text class="dg-label dg-label-strong" x="330" y="324" font-size="11.5">收入增加</text>
  <text class="dg-label-xs" x="330" y="344" font-size="10.5">銷貨收入、利息收入</text>
  <text class="dg-label-xs" x="330" y="362" font-size="10.5">租金收入</text>
  <text class="dg-label dg-label-strong" x="330" y="390" font-size="11.5">利益增加</text>
  <text class="dg-label-xs" x="330" y="410" font-size="10.5">處分資產利益</text>
  <text class="dg-label dg-label-strong" x="330" y="438" font-size="11.5">資產減項</text>
  <text class="dg-label-xs" x="330" y="458" font-size="10.5">累計折舊、備抵損失</text>

  <text class="dg-label dg-label-adjust" x="310" y="486" text-anchor="middle" font-size="10">口訣：資產費用股利，增加記借方；負債權益收入，增加記貸方。</text>

  <rect class="dg-panel" x="610" y="70" width="280" height="430" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="630" y="94" font-size="14">快速判斷</text>
  <text class="dg-label dg-label-strong" x="630" y="126" font-size="11.5">① 看科目類別</text>
  <text class="dg-label-xs" x="630" y="146" font-size="10.5">資產／費用／股利</text>
  <text class="dg-label-xs" x="630" y="164" font-size="10.5">→ 增加記借方</text>
  <text class="dg-label dg-label-strong" x="630" y="194" font-size="11.5">② 看增加或減少</text>
  <text class="dg-label-xs" x="630" y="214" font-size="10.5">增加記正常餘額側</text>
  <text class="dg-label-xs" x="630" y="232" font-size="10.5">減少記相反側</text>
  <text class="dg-label dg-label-strong" x="630" y="262" font-size="11.5">③ 檢查平衡</text>
  <text class="dg-label-xs" x="630" y="282" font-size="10.5">借方總額 = 貸方總額</text>
  <text class="dg-label-xs" x="630" y="300" font-size="10.5">A = L + E 仍成立</text>
  <text class="dg-label dg-label-strong" x="630" y="330" font-size="11.5">④ 期末調整</text>
  <text class="dg-label-xs" x="630" y="350" font-size="10.5">應計、遞延、折舊、減損</text>
  <text class="dg-label-xs" x="630" y="368" font-size="10.5">讓收入費用歸屬期間</text>
  <text class="dg-label dg-label-strong" x="630" y="398" font-size="11.5">⑤ 寫成完整分錄</text>
  <text class="dg-label-xs" x="630" y="418" font-size="10.5">Dr 科目 金額</text>
  <text class="dg-label-xs" x="630" y="436" font-size="10.5">　Cr 科目 金額</text>

  <rect class="dg-box dg-box-outcome" x="30" y="530" width="860" height="320" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="50" y="556" font-size="14">常用分錄例示：每一列都必須 Dr = Cr</text>
  <text class="dg-label-xs" x="50" y="586" font-size="10.5">交易</text>
  <text class="dg-label-xs" x="300" y="586" font-size="10.5">借方 Dr</text>
  <text class="dg-label-xs" x="570" y="586" font-size="10.5">貸方 Cr</text>
  <text class="dg-label-xs" x="800" y="586" font-size="10.5">進入報表</text>
  <line class="dg-guide" x1="50" y1="596" x2="870" y2="596"></line>
  <line class="dg-guide" x1="290" y1="586" x2="290" y2="820"></line>
  <line class="dg-guide" x1="560" y1="586" x2="560" y2="820"></line>
  <line class="dg-guide" x1="790" y1="586" x2="790" y2="820"></line>

  <text class="dg-label dg-label-sm" x="50" y="620">現金銷貨 $10,000</text>
  <text class="dg-label-xs" x="50" y="638" font-size="9.5">收現並賺得收入</text>
  <text class="dg-label-xs" x="300" y="620" font-size="10.5">現金 10,000</text>
  <text class="dg-label-xs" x="570" y="620" font-size="10.5">銷貨收入 10,000</text>
  <text class="dg-label-xs" x="800" y="620" font-size="10.5">IS／BS</text>

  <text class="dg-label dg-label-sm" x="50" y="656">賒購存貨 $5,000</text>
  <text class="dg-label-xs" x="50" y="674" font-size="9.5">先取得存貨，之後付款</text>
  <text class="dg-label-xs" x="300" y="656" font-size="10.5">存貨 5,000</text>
  <text class="dg-label-xs" x="570" y="656" font-size="10.5">應付帳款 5,000</text>
  <text class="dg-label-xs" x="800" y="656" font-size="10.5">BS</text>

  <text class="dg-label dg-label-sm" x="50" y="692">支付租金 $2,000</text>
  <text class="dg-label-xs" x="50" y="710" font-size="9.5">本期已使用辦公空間</text>
  <text class="dg-label-xs" x="300" y="692" font-size="10.5">租金費用 2,000</text>
  <text class="dg-label-xs" x="570" y="692" font-size="10.5">現金 2,000</text>
  <text class="dg-label-xs" x="800" y="692" font-size="10.5">IS／BS</text>

  <text class="dg-label dg-label-sm" x="50" y="728">向銀行借款 $50,000</text>
  <text class="dg-label-xs" x="50" y="746" font-size="9.5">取得現金並承擔負債</text>
  <text class="dg-label-xs" x="300" y="728" font-size="10.5">現金 50,000</text>
  <text class="dg-label-xs" x="570" y="728" font-size="10.5">銀行借款 50,000</text>
  <text class="dg-label-xs" x="800" y="728" font-size="10.5">BS／CF</text>

  <text class="dg-label dg-label-sm" x="50" y="764">提列折舊 $3,000</text>
  <text class="dg-label-xs" x="50" y="782" font-size="9.5">期末調整，非現金費用</text>
  <text class="dg-label-xs" x="300" y="764" font-size="10.5">折舊費用 3,000</text>
  <text class="dg-label-xs" x="570" y="764" font-size="10.5">累計折舊 3,000</text>
  <text class="dg-label-xs" x="800" y="764" font-size="10.5">IS／BS</text>

  <text class="dg-label dg-label-sm" x="50" y="800">宣告現金股利 $8,000</text>
  <text class="dg-label-xs" x="50" y="818" font-size="9.5">董事會宣告，尚未支付</text>
  <text class="dg-label-xs" x="300" y="800" font-size="10.5">保留盈餘 8,000</text>
  <text class="dg-label-xs" x="570" y="800" font-size="10.5">應付股利 8,000</text>
  <text class="dg-label-xs" x="800" y="800" font-size="10.5">SCE／BS</text>

  <text class="dg-label-xs" x="460" y="868" text-anchor="middle" font-size="10.5">檢查：借方合計 = 貸方合計；分錄→過帳→報表，科目名稱要一致。</text>
</svg>`,
    variables: [
      ["Dr", "借方 Debit", "T 字帳左側；資產、費用、股利增加通常記借方。"],
      ["Cr", "貸方 Credit", "T 字帳右側；負債、權益、收入增加通常記貸方。"],
      ["A", "資產 Assets", "現金、應收帳款、存貨、設備等企業控制的資源。"],
      ["L", "負債 Liabilities", "應付帳款、借款、公司債等現時義務。"],
      ["E", "權益 Equity", "股本、資本公積、保留盈餘與其他權益。"],
      ["R", "收入 Revenue", "銷貨、利息、租金等本期賺得的收入。"],
      ["Ex", "費用 Expenses", "銷貨成本、薪資、租金、折舊、利息與所得稅等。"],
      ["Div", "股利 Dividends", "分配給股東的盈餘，減少保留盈餘。"],
      ["Contra", "減項 Contra account", "累計折舊、備抵損失與庫藏股等，正常餘額與主科目相反。"],
      ["TB", "試算表 Trial balance", "列出各科目餘額，檢查借方總額是否等於貸方總額。"]
    ],
    parameters: [
      ["Dr = Cr", "借貸平衡 Double-entry rule", "每筆分錄的借方總額必須等於貸方總額。"],
      ["Normal", "正常餘額 Normal balance", "資產、費用、股利在借方；負債、權益、收入在貸方。"],
      ["A = L + E", "會計恆等式 Accounting equation", "每筆交易後資產仍等於負債加權益。"],
      ["Accrual", "權責發生基礎 Accrual basis", "收入於賺得、費用於發生時認列，不以現金收付為準。"],
      ["Adjust", "調整分錄 Adjusting entries", "期末調整應計、遞延、折舊與減損，讓損益歸屬正確期間。"],
      ["Map", "報表對應 Statement mapping", "分錄科目會進入資產負債表、損益表、權益變動表或現金流量表。"]
    ],
    note: "本圖採一般公認會計原則下的常見分類。實際科目名稱與分類會依企業營運性質調整；判斷時先看科目性質與正常餘額，不要只背科目名稱。累計折舊與備抵損失是資產減項，庫藏股是權益減項，都是常見的例外考點。"
  },
  "accounting-14#0-4": {
    sectionTitle: "第1節 財務報表與一般公認會計原則",
    kicker: "教學流程圖",
    title: "從交易到財務報表：分錄、過帳、試算與編表流程",
    caption: "平時先辨認交易與事項、取得原始憑證，依借貸法則寫日記帳分錄，再過帳到分類帳並編製試算表。期末作調整分錄、編製調整後試算表，據以編製綜合損益表、權益變動表、資產負債表與現金流量表；最後結清收入與費用等虛帳戶，編製結帳後試算表。下方用現金銷貨、賒購設備、提列折舊與應計薪資四個例子，示範同一筆交易如何從分錄走到報表。",
    svg: `
<svg viewBox="0 0 920 900" role="img" aria-labelledby="dg-acc-flow-title dg-acc-flow-desc" style="max-width:920px;min-width:760px;display:block;margin-inline:auto" xmlns="http://www.w3.org/2000/svg">
  <title id="dg-acc-flow-title">從交易到財務報表流程圖</title>
  <desc id="dg-acc-flow-desc">上半部為兩列流程：平時從交易、原始憑證、日記帳分錄、過帳分類帳到試算表；期末從調整分錄、調整後試算表、財務報表、結帳分錄到結帳後試算表。下半部以現金銷貨、賒購設備、提列折舊與應計薪資四個交易，示範分錄、過帳調整與進入的財務報表。</desc>
  <defs>
    <marker id="dg-acc-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="dg-arrow-head" d="M0,0 L10,5 L0,10 z"></path>
    </marker>
  </defs>

  <text class="dg-label dg-label-strong" x="460" y="24" text-anchor="middle" font-size="17">從交易到財務報表 Transaction to Financial Statements</text>
  <text class="dg-label-xs" x="460" y="46" text-anchor="middle">交易 → 分錄 → 過帳 → 試算 → 調整 → 報表 → 結帳</text>

  <text class="dg-label dg-label-strong" x="30" y="82" font-size="12.5">① 平時帳務：從交易到試算表</text>

  <rect class="dg-box dg-box-accent" x="30" y="100" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="105" y="126" text-anchor="middle" font-size="12.5">交易與事項</text>
  <text class="dg-label-xs" x="105" y="146" text-anchor="middle" font-size="10">Transaction</text>

  <line class="dg-arrow" x1="180" y1="132" x2="200" y2="132" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="200" y="100" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="275" y="126" text-anchor="middle" font-size="12.5">原始憑證</text>
  <text class="dg-label-xs" x="275" y="146" text-anchor="middle" font-size="10">Source documents</text>

  <line class="dg-arrow" x1="350" y1="132" x2="370" y2="132" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="370" y="100" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="445" y="126" text-anchor="middle" font-size="12.5">日記帳分錄</text>
  <text class="dg-label-xs" x="445" y="146" text-anchor="middle" font-size="10">Journal entries</text>

  <line class="dg-arrow" x1="520" y1="132" x2="540" y2="132" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="540" y="100" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="615" y="126" text-anchor="middle" font-size="12.5">過帳分類帳</text>
  <text class="dg-label-xs" x="615" y="146" text-anchor="middle" font-size="10">Posting / Ledger</text>

  <line class="dg-arrow" x1="690" y1="132" x2="710" y2="132" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="710" y="100" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="785" y="126" text-anchor="middle" font-size="12.5">試算表</text>
  <text class="dg-label-xs" x="785" y="146" text-anchor="middle" font-size="10">Trial balance</text>

  <path class="dg-arrow" d="M785 164 V200 H105 V240" marker-end="url(#dg-acc-flow-arrow)"></path>
  <text class="dg-label dg-label-adjust" x="460" y="192" text-anchor="middle" font-size="10.5">期末調整</text>

  <text class="dg-label dg-label-strong" x="30" y="222" font-size="12.5">② 期末：調整、編表與結帳</text>

  <rect class="dg-box" x="30" y="240" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="105" y="266" text-anchor="middle" font-size="12.5">調整分錄</text>
  <text class="dg-label-xs" x="105" y="286" text-anchor="middle" font-size="10">Adjusting entries</text>

  <line class="dg-arrow" x1="180" y1="272" x2="200" y2="272" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="200" y="240" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="275" y="266" text-anchor="middle" font-size="12">調整後試算表</text>
  <text class="dg-label-xs" x="275" y="286" text-anchor="middle" font-size="9.5">Adjusted trial balance</text>

  <line class="dg-arrow" x1="350" y1="272" x2="370" y2="272" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box dg-box-outcome" x="370" y="240" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="445" y="266" text-anchor="middle" font-size="12.5">財務報表</text>
  <text class="dg-label-xs" x="445" y="286" text-anchor="middle" font-size="10">Financial statements</text>

  <line class="dg-arrow" x1="520" y1="272" x2="540" y2="272" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="540" y="240" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="615" y="266" text-anchor="middle" font-size="12.5">結帳分錄</text>
  <text class="dg-label-xs" x="615" y="286" text-anchor="middle" font-size="10">Closing entries</text>

  <line class="dg-arrow" x1="690" y1="272" x2="710" y2="272" marker-end="url(#dg-acc-flow-arrow)"></line>

  <rect class="dg-box" x="710" y="240" width="150" height="64" rx="10"></rect>
  <text class="dg-label dg-label-strong" x="785" y="266" text-anchor="middle" font-size="12">結帳後試算表</text>
  <text class="dg-label-xs" x="785" y="286" text-anchor="middle" font-size="9.5">Post-closing trial balance</text>

  <rect class="dg-box" x="30" y="350" width="860" height="500" rx="12"></rect>
  <text class="dg-label dg-label-strong" x="50" y="376" font-size="14">③ 例示：交易 → 分錄 → 過帳／調整 → 報表</text>
  <text class="dg-label-xs" x="50" y="398" font-size="10.5">每筆交易先寫分錄，再過帳；期末調整後，把科目餘額放進對應報表。</text>

  <text class="dg-label-xs" x="50" y="428" font-size="10.5">交易例示</text>
  <text class="dg-label-xs" x="280" y="428" font-size="10.5">日記帳分錄</text>
  <text class="dg-label-xs" x="620" y="428" font-size="10.5">過帳／調整</text>
  <text class="dg-label-xs" x="770" y="428" font-size="10.5">進入報表</text>
  <line class="dg-guide" x1="50" y1="438" x2="870" y2="438"></line>

  <text class="dg-label dg-label-sm" x="50" y="468">現金銷貨 $10,000</text>
  <text class="dg-label-xs" x="50" y="486" font-size="9.5">收現並賺得收入</text>
  <text class="dg-label-xs" x="280" y="468" font-size="10.5">Dr 現金 10,000</text>
  <text class="dg-label-xs" x="280" y="488" font-size="10.5">　Cr 銷貨收入 10,000</text>
  <text class="dg-label-xs" x="620" y="468" font-size="10.5">現金↑、收入↑</text>
  <text class="dg-label-xs" x="620" y="488" font-size="10.5">借貸平衡</text>
  <text class="dg-label-xs" x="770" y="468" font-size="10.5">BS 現金</text>
  <text class="dg-label-xs" x="770" y="488" font-size="10.5">IS 收入</text>

  <line class="dg-guide" x1="50" y1="520" x2="870" y2="520"></line>

  <text class="dg-label dg-label-sm" x="50" y="548">賒購設備 $60,000</text>
  <text class="dg-label-xs" x="50" y="566" font-size="9.5">現金 $20,000，餘款簽票</text>
  <text class="dg-label-xs" x="280" y="548" font-size="10.5">Dr 設備 60,000</text>
  <text class="dg-label-xs" x="280" y="568" font-size="10.5">　Cr 現金 20,000</text>
  <text class="dg-label-xs" x="280" y="588" font-size="10.5">　Cr 應付票據 40,000</text>
  <text class="dg-label-xs" x="620" y="548" font-size="10.5">資產↑、負債↑</text>
  <text class="dg-label-xs" x="620" y="568" font-size="10.5">現金減少</text>
  <text class="dg-label-xs" x="770" y="548" font-size="10.5">BS 設備</text>
  <text class="dg-label-xs" x="770" y="568" font-size="10.5">BS 現金</text>
  <text class="dg-label-xs" x="770" y="588" font-size="10.5">BS 應付票據</text>

  <line class="dg-guide" x1="50" y1="620" x2="870" y2="620"></line>

  <text class="dg-label dg-label-sm" x="50" y="648">期末提列折舊 $3,000</text>
  <text class="dg-label-xs" x="50" y="666" font-size="9.5">估計設備耗用</text>
  <text class="dg-label-xs" x="280" y="648" font-size="10.5">Dr 折舊費用 3,000</text>
  <text class="dg-label-xs" x="280" y="668" font-size="10.5">　Cr 累計折舊 3,000</text>
  <text class="dg-label-xs" x="620" y="648" font-size="10.5">費用↑、資產減項↑</text>
  <text class="dg-label-xs" x="620" y="668" font-size="10.5">期末調整</text>
  <text class="dg-label-xs" x="770" y="648" font-size="10.5">IS 折舊費用</text>
  <text class="dg-label-xs" x="770" y="668" font-size="10.5">BS 累計折舊</text>

  <line class="dg-guide" x1="50" y1="700" x2="870" y2="700"></line>

  <text class="dg-label dg-label-sm" x="50" y="728">期末應計薪資 $8,000</text>
  <text class="dg-label-xs" x="50" y="746" font-size="9.5">已發生尚未支付</text>
  <text class="dg-label-xs" x="280" y="728" font-size="10.5">Dr 薪資費用 8,000</text>
  <text class="dg-label-xs" x="280" y="748" font-size="10.5">　Cr 應付薪資 8,000</text>
  <text class="dg-label-xs" x="620" y="728" font-size="10.5">費用↑、負債↑</text>
  <text class="dg-label-xs" x="620" y="748" font-size="10.5">期末調整</text>
  <text class="dg-label-xs" x="770" y="728" font-size="10.5">IS 薪資費用</text>
  <text class="dg-label-xs" x="770" y="748" font-size="10.5">BS 應付薪資</text>

  <text class="dg-label-xs" x="460" y="800" text-anchor="middle" font-size="10.5">期末調整後，損益表科目結轉保留盈餘；資產負債表科目結轉下期。</text>
  <text class="dg-label-xs" x="460" y="828" text-anchor="middle" font-size="10.5">分錄 → 過帳 → 試算 → 調整 → 報表：每一步都保留借貸平衡與科目軌跡。</text>
</svg>`,
    variables: [
      ["T", "交易與事項 Transaction", "企業發生、會影響財務狀況或績效且應入帳的事件。"],
      ["SD", "原始憑證 Source documents", "發票、收據、合約、銀行對帳單等支持交易存在的文件。"],
      ["J", "日記帳 Journal", "依日期與借貸法則記錄分錄的帳簿。"],
      ["GL", "分類帳 Ledger", "將日記帳分錄過帳後，按科目彙總的帳戶集合。"],
      ["TB", "試算表 Trial balance", "列出各科目餘額，檢查借方總額是否等於貸方總額。"],
      ["AJ", "調整分錄 Adjusting entries", "期末調整應計、遞延、折舊、減損等項目。"],
      ["ATB", "調整後試算表 Adjusted trial balance", "調整後彙總餘額，作為編製財務報表的基礎。"],
      ["FS", "財務報表 Financial statements", "綜合損益表、權益變動表、資產負債表、現金流量表與附註。"],
      ["CE", "結帳分錄 Closing entries", "將收入、費用等虛帳戶結轉本期損益，再結轉保留盈餘。"],
      ["PCTB", "結帳後試算表 Post-closing trial balance", "結帳後僅列實帳戶，確認借貸平衡並結轉下期。"]
    ],
    parameters: [
      ["Dr = Cr", "借貸平衡 Double-entry rule", "每筆分錄的借方總額必須等於貸方總額。"],
      ["A = L + E", "會計恆等式 Accounting equation", "每筆交易後資產仍等於負債加權益。"],
      ["Accrual", "權責發生基礎 Accrual basis", "收入於賺得、費用於發生時認列，不以現金收付時點為準。"],
      ["Adjust", "期末調整 Adjusting entries", "讓收入與費用歸屬正確期間，並更新資產負債餘額。"],
      ["Close", "結帳 Closing", "只結收入、費用等虛帳戶；資產、負債、權益等實帳戶結轉下期。"],
      ["Map", "報表對應 Statement mapping", "分錄科目會進入損益表、權益變動表、資產負債表或現金流量表。"]
    ],
    note: "本圖為教學示意，交易例示採簡化數字。實務上分錄還需記錄日期、摘要、憑證編號與稅務處理；折舊與應計薪資屬期末調整分錄，不是平時交易。不同企業的會計資訊系統可能合併部分步驟，但借貸平衡、過帳與報表勾稽的基本邏輯不變。"
  }
});
