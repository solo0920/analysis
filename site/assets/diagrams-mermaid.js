/* 自動產生，請勿直接編輯。
   來源：site/diagrams/mermaid/*.mmd 與 manifest.json
   產生：node site/scripts/build-mermaid-sources.js */
window.MERMAID_DIAGRAMS = {
  "macro-01#2": {
    "key": "macro-01#2",
    "file": "macro-gdp-to-pdi.mmd",
    "slug": "macro-gdp-to-pdi",
    "order": 1,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-01",
    "chapterTitle": "國民所得與經濟福祉",
    "section": 2,
    "sectionTitle": "第3節 其他國民所得衡量工具",
    "shortTitle": "GDP → PDI",
    "note": "三面法等價，再依序調整 NFIA、折舊、間接稅、公司稅與移轉收支，最後得到 PDI。",
    "source": "flowchart TD\n  accTitle: 國民所得會計帳流程圖\n  accDescr: 生產面、支出面與所得面三種算法都得到 GDP；GDP 加國外要素所得淨額得到 GNI，再依序扣除折舊與間接稅淨額，調整公司稅、未分配盈餘、社會安全捐、移轉支付與淨利息，最後扣除個人直接稅得到 PDI，並拆分為消費與儲蓄。\n\n  subgraph S[\"三面等價：同一筆 GDP\"]\n    direction LR\n    P[\"生產面<br/>各業附加價值加總\"]\n    E[\"支出面<br/>C + I + G + (X − M)\"]\n    I[\"所得面<br/>要素所得＋折舊＋間接稅淨額\"]\n  end\n\n  P --> GDP\n  E --> GDP\n  I --> GDP\n  GDP[\"國內生產毛額 GDP<br/>三面數值相等 · 屬地原則\"]:::accent\n  GDP -- \"+ NFIA\" --> GNI[\"國民總收入 GNI<br/>GDP + NFIA（GNP ≈ GNI）\"]\n  GNI -- \"− 折舊 D\" --> NNP[\"國民生產淨額 NNP<br/>GNI − 折舊 D\"]\n  NNP -- \"− 間接稅淨額 NIT\" --> NI[\"國民所得 NI<br/>NNP − NIT（要素成本）\"]\n  NI -- \"− CIT − URE − SSC<br/>+ TR + INT\" --> PI[\"個人所得 PI<br/>NI − CIT − URE − SSC + TR + INT\"]\n  PI -- \"− 個人直接稅 Tp\" --> PDI[\"個人可支配所得 PDI<br/>PI − Tp = C + S\"]:::outcome\n  PDI --> C[\"消費 C<br/>PDI 中用於消費\"]\n  PDI --> SAVE[\"儲蓄 S<br/>PDI − C\"]\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-14#0": {
    "key": "accounting-14#0",
    "file": "accounting-cycle.mmd",
    "slug": "accounting-cycle",
    "order": 2,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-14",
    "chapterTitle": "財務報表的基本觀念",
    "section": 0,
    "sectionTitle": "第1節 財務報表與一般公認會計原則",
    "shortTitle": "會計循環",
    "note": "從交易、分錄、過帳到調整、結帳與下一會計期間的 11 個步驟。",
    "source": "flowchart LR\n  accTitle: 會計循環流程圖\n  accDescr: 從交易與原始憑證開始，依序完成日記帳、過帳、分類帳與調整前試算表；期末作調整分錄、調整後試算表與財務報表，再作結帳分錄與結帳後試算表，最後進入下一會計期間。\n\n  subgraph R[\"平時帳務處理\"]\n    direction TB\n    A[\"① 交易與事項<br/>Transaction\"] --> B[\"② 原始憑證<br/>Source documents\"]\n    B --> C[\"③ 日記帳<br/>Journal\"]\n    C --> D[\"④ 過帳<br/>Posting\"]\n    D --> E[\"⑤ 分類帳<br/>Ledger\"]\n    E --> F[\"⑥ 試算表（調整前）<br/>Unadjusted trial balance\"]\n  end\n\n  subgraph C2[\"期末處理與結帳\"]\n    direction TB\n    G[\"⑦ 調整分錄<br/>Adjusting entries\"] --> H[\"⑧ 調整後試算表<br/>Adjusted trial balance\"]\n    H --> I[\"⑨ 財務報表<br/>Financial statements\"]:::outcome\n    I --> J[\"⑩ 結帳分錄<br/>Closing entries\"]\n    J --> K[\"⑪ 結帳後試算表<br/>Post-closing trial balance\"]\n  end\n\n  F --> G\n  K -. \"下一會計期間\" .-> A\n\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-15#0": {
    "key": "accounting-15#0",
    "file": "accounting-revenue-to-ratios.mmd",
    "slug": "accounting-revenue-to-ratios",
    "order": 3,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-15",
    "chapterTitle": "財務報表分析",
    "section": 0,
    "sectionTitle": "第1節 財務報表分析之基本觀念及方法",
    "shortTitle": "營業收入 → 淨利 → 比率",
    "note": "損益表主要結轉路徑，以及本期淨利連到的三項報酬率。",
    "source": "flowchart TD\n  accTitle: 從營業收入到本期淨利與財務比率\n  accDescr: 營業收入依序減銷貨成本、營業費用、營業外收支與所得稅，得到毛利、營業利益、稅前淨利與本期淨利；本期淨利再連到淨利率、總資產報酬率與權益報酬率。\n\n  R[\"營業收入<br/>Revenue\"]:::accent --> GP[\"毛利<br/>Gross Profit\"]\n  COGS[\"− 銷貨成本<br/>COGS\"] -.-> GP\n  GP --> OI[\"營業利益<br/>Operating Income\"]\n  OPEX[\"− 營業費用<br/>Operating Expenses\"] -.-> OI\n  OI --> EBT[\"稅前淨利<br/>EBT\"]\n  NONOP[\"± 營業外收支<br/>Non-operating\"] -.-> EBT\n  EBT --> NI[\"本期淨利<br/>Net Income\"]:::outcome\n  TAX[\"− 所得稅<br/>Income Tax\"] -.-> NI\n  NI --> PM[\"淨利率<br/>NI ÷ Revenue\"]\n  NI --> ROA[\"總資產報酬率<br/>NI ÷ Total Assets\"]\n  NI --> ROE[\"權益報酬率<br/>NI ÷ Equity\"]\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-14#2": {
    "key": "investment-14#2",
    "file": "investment-dupont.mmd",
    "slug": "investment-dupont",
    "order": 4,
    "subject": "investment",
    "subjectName": "投資學",
    "chapterId": "investment-14",
    "chapterTitle": "財務分析",
    "section": 2,
    "sectionTitle": "學習重點 3：杜邦分析與盈餘品質",
    "shortTitle": "杜邦分析",
    "note": "把 ROE 拆成淨利率、總資產週轉率與權益乘數三個來源。",
    "source": "flowchart TD\n  accTitle: 杜邦分析：ROE 的三因子分解\n  accDescr: 權益報酬率拆成淨利率、總資產週轉率與權益乘數，分別代表獲利能力、資產效率與財務槓桿；再往下列出三項比率的計算方式。\n\n  ROE[\"權益報酬率 ROE<br/>NI ÷ 平均權益\"]:::outcome\n  ROE --> NPM[\"淨利率<br/>NI ÷ 營業收入\"]\n  ROE --> TAT[\"總資產週轉率<br/>營業收入 ÷ 平均總資產\"]\n  ROE --> EM[\"權益乘數<br/>平均總資產 ÷ 平均權益\"]\n  NPM --> P1[\"獲利能力\"]\n  TAT --> P2[\"資產效率\"]\n  EM --> P3[\"財務槓桿\"]\n  P1 --> D1[\"稅後淨利<br/>÷ 營業收入\"]\n  P2 --> D2[\"營業收入<br/>÷ 平均總資產\"]\n  P3 --> D3[\"平均總資產<br/>÷ 平均權益\"]\n\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  }
};
