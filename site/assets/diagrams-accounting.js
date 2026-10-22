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
  }
});
