/* 自動產生，請勿直接編輯。
   來源：site/diagrams/mermaid/*.mmd 與 manifest.json
   產生：node site/scripts/build-mermaid-sources.js */
window.MERMAID_DIAGRAMS = {
  "macro-01#0": {
    "key": "macro-01#0",
    "file": "macro-circular-flow.mmd",
    "slug": "macro-circular-flow",
    "order": 1,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-01",
    "chapterTitle": "國民所得與經濟福祉",
    "section": 0,
    "sectionTitle": "第1節 國民所得與GDP",
    "shortTitle": "兩部門循環流量",
    "note": "家計提供要素、廠商支付報酬，家計消費、廠商取得收入，形成生產、所得與支出的循環。",
    "source": "flowchart TD\n  accTitle: 兩部門循環流量圖\n  accDescr: 家計單位提供生產要素給廠商，廠商支付要素報酬；家計以所得購買最終財貨與勞務，廠商取得銷售收入，形成生產、所得與支出的循環。\n\n  HH[\"家計單位<br/>提供要素、取得所得\"]:::accent\n  FIRM[\"廠商<br/>僱用要素、生產商品\"]:::accent\n\n  subgraph FACTOR[\"生產要素市場\"]\n    direction LR\n    F1[\"勞動、資本、土地\"]\n    F2[\"要素報酬<br/>工資、租金、利息、利潤\"]\n  end\n\n  subgraph GOODS[\"最終財貨市場\"]\n    direction LR\n    G1[\"消費支出 C\"]\n    G2[\"最終財貨與勞務\"]\n  end\n\n  HH -- \"提供生產要素\" --> F1\n  F1 --> FIRM\n  FIRM -- \"支付要素報酬\" --> F2\n  F2 --> HH\n  HH -- \"消費支出\" --> G1\n  G1 --> FIRM\n  FIRM -- \"提供商品與勞務\" --> G2\n  G2 --> HH\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n"
  },
  "macro-01#0-2": {
    "key": "macro-01#0-2",
    "file": "macro-gdp-to-gni.mmd",
    "slug": "macro-gdp-to-gni",
    "order": 2,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-01",
    "chapterTitle": "國民所得與經濟福祉",
    "section": 0,
    "sectionTitle": "第1節 國民所得與GDP",
    "shortTitle": "GDP → GNI（NFIA）",
    "note": "GDP 依屬地原則，加上 NFIA 後得到 GNI；GNI 依國籍原則衡量本國居民所得。",
    "source": "flowchart TD\n  accTitle: GDP 到 GNI：加上國外要素所得淨額\n  accDescr: GDP 依屬地原則衡量境內生產；加上本國居民在國外生產的要素所得，減去外國居民在本國生產的要素所得，得到 GNI。GNI 依國籍原則衡量本國居民的所得。\n\n  GDP[\"國內生產毛額 GDP<br/>屬地原則：在哪裡生產\"]:::accent\n  GNI[\"國民總收入 GNI<br/>GDP + NFIA（GNP ≈ GNI）\"]:::outcome\n\n  subgraph NFIA[\"國外要素所得淨額 NFIA\"]\n    direction TB\n    OUT[\"本國居民在國外生產<br/>要素所得（+）\"]\n    IN[\"外國居民在本國生產<br/>要素所得（−）\"]\n    NET[\"NFIA = 本國在國外所得<br/>− 外國在本國所得\"]\n    OUT --> NET\n    IN --> NET\n  end\n\n  GDP -- \"+ NFIA\" --> GNI\n  NET -.-> GNI\n\n  subgraph VIEW[\"看的角度\"]\n    direction LR\n    WHERE[\"GDP：在哪裡生產\"]\n    WHOSE[\"GNI：誰的所得\"]\n  end\n\n  GDP -.-> WHERE\n  GNI -.-> WHOSE\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "macro-01#2": {
    "key": "macro-01#2",
    "file": "macro-gdp-to-pdi.mmd",
    "slug": "macro-gdp-to-pdi",
    "order": 3,
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
  "macro-05#0": {
    "key": "macro-05#0",
    "file": "macro-deposit-creation.mmd",
    "slug": "macro-deposit-creation",
    "order": 4,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-05",
    "chapterTitle": "貨幣供需與貨幣政策",
    "section": 0,
    "sectionTitle": "第1節 存款貨幣的創造與貨幣供給",
    "shortTitle": "存款貨幣創造",
    "note": "原始存款經銀行保留準備、貸出超額準備，形成存款乘數。",
    "source": "flowchart TD\n  accTitle: 存款貨幣的創造與貨幣乘數\n  accDescr: 原始存款進入銀行後，銀行保留法定準備、貸出超額準備；貸款再存入其他銀行，形成一連串存款與放款，存款總額收斂到原始存款乘以貨幣乘數。\n\n  DEP[\"原始存款<br/>+100\"]:::accent\n  A[\"銀行 A<br/>準備 +10、放款 +90\"]\n  B[\"銀行 B<br/>存款 +90<br/>準備 +9、放款 +81\"]\n  C[\"銀行 C<br/>存款 +81<br/>準備 +8.1、放款 +72.9\"]\n  MORE[\"其餘銀行<br/>持續創造存款…\"]\n  TOTAL[\"存款總額<br/>100 + 90 + 81 + …<br/>= 100 × (1 ÷ rr)\"]:::outcome\n\n  DEP --> A --> B --> C --> MORE --> TOTAL\n\n  subgraph RULE[\"準備金與乘數\"]\n    direction TB\n    RR[\"法定準備率 rr<br/>準備 = 存款 × rr\"]\n    EX[\"超額準備<br/>放款 = 存款 × (1 − rr)\"]\n    MM[\"簡單貨幣乘數<br/>m = 1 ÷ rr\"]\n    RR --> MM\n    EX --> MM\n  end\n\n  MM -.-> TOTAL\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "macro-06#0-2": {
    "key": "macro-06#0-2",
    "file": "macro-model-map.mmd",
    "slug": "macro-model-map",
    "order": 5,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-06",
    "chapterTitle": "IS-LM模型",
    "section": 0,
    "sectionTitle": "第1節 IS曲線與LM曲線",
    "shortTitle": "總體模型地圖",
    "note": "此圖是模型關係地圖，不是單一模型的完整推導；各模型的假設與均衡條件仍以對應章節為準。",
    "createDiagram": true,
    "generatedSvg": true,
    "kicker": "Mermaid 推導圖",
    "title": "總體經濟模型地圖：從古典到新凱因斯",
    "caption": "把古典學派、凱因斯、IS-LM、AD-AS、Phillips 曲線、新凱因斯與 Solow 成長放在同一張地圖，標示模型之間的傳承與政策分析位置。",
    "variables": [
      [
        "Y",
        "產出／所得",
        "商品市場與勞動市場的共同結果。"
      ],
      [
        "i",
        "利率",
        "IS-LM 的貨幣市場價格。"
      ],
      [
        "π",
        "通膨率",
        "Phillips 曲線與 NKPC 的核心變數。"
      ],
      [
        "u",
        "失業率",
        "勞動市場鬆緊程度。"
      ]
    ],
    "parameters": [
      [
        "古典",
        "彈性價格",
        "充分就業與市場清算。"
      ],
      [
        "凱因斯",
        "有效需求",
        "工資與價格僵固，短期產出由需求決定。"
      ],
      [
        "NKPC",
        "新凱因斯 Phillips 曲線",
        "通膨取決於預期與產出缺口。"
      ],
      [
        "Taylor",
        "Taylor 規則",
        "央行依通膨與產出缺口調整利率。"
      ]
    ],
    "source": "flowchart TD\n  accTitle: 總體經濟模型地圖\n  accDescr: 從古典學派與凱因斯出發，經 IS-LM、AD-AS、Phillips 曲線到新凱因斯；另列 Solow 成長與政策分析。\n\n  CLASS[\"古典學派<br/>彈性價格、充分就業\"]:::accent\n  KEYNES[\"凱因斯<br/>有效需求、工資僵固\"]\n  ISLM[\"IS-LM<br/>商品與貨幣市場\"]\n  ADAS[\"AD-AS<br/>短期與長期\"]\n  PHILLIPS[\"Phillips 曲線<br/>通膨與失業\"]\n  NK[\"新凱因斯<br/>NKPC、Taylor 規則\"]\n  SOLOW[\"Solow 成長<br/>資本累積與穩態\"]\n  POLICY[\"政策分析<br/>財政、貨幣、供給面\"]:::outcome\n\n  CLASS --> ISLM\n  KEYNES --> ISLM\n  ISLM --> ADAS\n  ADAS --> PHILLIPS\n  PHILLIPS --> NK\n  CLASS --> SOLOW\n  NK --> POLICY\n  SOLOW --> POLICY\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "macro-11#0": {
    "key": "macro-11#0",
    "file": "macro-financial-flow.mmd",
    "slug": "macro-financial-flow",
    "order": 6,
    "subject": "macro",
    "subjectName": "總體經濟學",
    "chapterId": "macro-11",
    "chapterTitle": "金融體系",
    "section": 0,
    "sectionTitle": "第1節 金融體系",
    "shortTitle": "直接金融與間接金融",
    "note": "資金供給者透過金融市場直接買證券，或透過金融中介放款與投資，把資金導向需求者。",
    "source": "flowchart LR\n  accTitle: 金融體系的資金流向：直接金融與間接金融\n  accDescr: 資金供給者透過金融市場直接購買證券，或透過銀行、保險與基金等金融中介放款與投資，把資金導向資金需求者。\n\n  SAVERS[\"資金供給者<br/>家計、企業、政府\"]:::accent\n  USERS[\"資金需求者<br/>企業、政府、家計\"]:::outcome\n\n  subgraph DIRECT[\"直接金融\"]\n    direction TB\n    MARKET[\"金融市場<br/>股票、債券、票券\"]\n    SEC[\"證券發行與交易\"]\n    MARKET --> SEC\n  end\n\n  subgraph INDIRECT[\"間接金融\"]\n    direction TB\n    BANK[\"金融中介<br/>銀行、保險、基金\"]\n    LOAN[\"放款、投資與保險給付\"]\n    BANK --> LOAN\n  end\n\n  SAVERS -- \"購買證券\" --> MARKET\n  SEC -- \"資金\" --> USERS\n  SAVERS -- \"存款、保費、申購\" --> BANK\n  LOAN -- \"放款、投資\" --> USERS\n  USERS -. \"利息、股利、還本\" .-> SAVERS\n  BANK -. \"存款利息、給付\" .-> SAVERS\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-14#0": {
    "key": "accounting-14#0",
    "file": "accounting-cycle.mmd",
    "slug": "accounting-cycle",
    "order": 7,
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
  "accounting-14#0-2": {
    "key": "accounting-14#0-2",
    "file": "accounting-statements-notes.mmd",
    "slug": "accounting-statements-notes",
    "order": 8,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-14",
    "chapterTitle": "財務報表的基本觀念",
    "section": 0,
    "sectionTitle": "第1節 財務報表與一般公認會計原則",
    "shortTitle": "四表一附註",
    "note": "資產負債表、綜合損益表、權益變動表、現金流量表與附註的架構與勾稽。",
    "source": "flowchart TD\n  accTitle: 主要財務報表架構：四表一附註\n  accDescr: 財務報導由資產負債表、綜合損益表、權益變動表、現金流量表與附註組成；四張報表透過淨利、期末權益與現金餘額互相勾稽。\n\n  subgraph FRAME[\"四表一附註\"]\n    direction TB\n    NOTES[\"附註<br/>會計政策、估計、揭露\"]:::accent\n    BS[\"資產負債表<br/>資產 = 負債 + 權益\"]\n    IS[\"綜合損益表<br/>收入 − 費用 = 本期淨利\"]:::outcome\n    RE[\"權益變動表<br/>淨利、股利、其他綜合損益\"]\n    CF[\"現金流量表<br/>營業、投資、籌資\"]\n  end\n\n  NOTES -.-> BS\n  NOTES -.-> IS\n  NOTES -.-> RE\n  NOTES -.-> CF\n  IS -- \"本期淨利\" --> RE\n  RE -- \"期末權益\" --> BS\n  IS -- \"非現金調整\" --> CF\n  CF -- \"現金淨變動\" --> BS\n  BS -- \"期初餘額\" --> IS\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-14#0-4": {
    "key": "accounting-14#0-4",
    "file": "accounting-transaction-to-statements.mmd",
    "slug": "accounting-transaction-to-statements",
    "order": 9,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-14",
    "chapterTitle": "財務報表的基本觀念",
    "section": 0,
    "sectionTitle": "第1節 財務報表與一般公認會計原則",
    "shortTitle": "交易到財務報表",
    "note": "交易、分錄、過帳、試算、調整、編表與結帳的緊湊流程。",
    "source": "flowchart TD\n  accTitle: 從交易到財務報表\n  accDescr: 交易經原始憑證、日記帳分錄、過帳、試算表、調整分錄與調整後試算表，最後編製財務報表並結帳。\n\n  T[\"交易與事項\"]:::accent\n  J[\"日記帳分錄\"]\n  L[\"過帳至分類帳\"]\n  TB[\"試算表\"]\n  ADJ[\"調整分錄\"]\n  ATB[\"調整後試算表\"]\n  FS[\"財務報表\"]:::outcome\n  CL[\"結帳分錄\"]\n  PCTB[\"結帳後試算表\"]\n\n  T --> J --> L --> TB --> ADJ --> ATB --> FS --> CL --> PCTB\n  PCTB -. \"下一會計期間\" .-> T\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-15#0": {
    "key": "accounting-15#0",
    "file": "accounting-revenue-to-ratios.mmd",
    "slug": "accounting-revenue-to-ratios",
    "order": 10,
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
  "accounting-15#1": {
    "key": "accounting-15#1",
    "file": "accounting-dupont.mmd",
    "slug": "accounting-dupont",
    "order": 11,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-15",
    "chapterTitle": "財務報表分析",
    "section": 1,
    "sectionTitle": "第2節 比率分析",
    "shortTitle": "杜邦三階段／五階段",
    "note": "三階段 ROE 拆解，以及淨利率再拆成稅務效率、利息負擔與本業獲利。",
    "source": "flowchart TD\n  accTitle: 杜邦分析：三階段與五階段 ROE 拆解\n  accDescr: 三階段杜邦把 ROE 拆成淨利率、總資產週轉率與權益乘數；五階段再把淨利率拆成稅務效率、利息負擔與本業獲利。\n\n  ROE[\"權益報酬率 ROE<br/>NI ÷ 平均權益\"]:::outcome\n  NPM[\"淨利率<br/>NI ÷ 營業收入\"]\n  TAT[\"總資產週轉率<br/>營業收入 ÷ 平均總資產\"]\n  EM[\"權益乘數<br/>平均總資產 ÷ 平均權益\"]\n\n  ROE --> NPM\n  ROE --> TAT\n  ROE --> EM\n\n  subgraph FIVE[\"五階段：淨利率再拆解\"]\n    direction LR\n    TAX[\"稅務效率<br/>NI ÷ EBT\"]\n    INT[\"利息負擔<br/>EBT ÷ EBIT\"]\n    EBITM[\"本業獲利<br/>EBIT ÷ 營業收入\"]\n  end\n\n  NPM --> TAX\n  NPM --> INT\n  NPM --> EBITM\n\n  FORMULA[\"ROE = 稅務效率 × 利息負擔<br/>× 本業獲利 × 資產效率 × 財務槓桿\"]:::accent\n  TAX --> FORMULA\n  INT --> FORMULA\n  EBITM --> FORMULA\n  TAT --> FORMULA\n  EM --> FORMULA\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "accounting-23#1": {
    "key": "accounting-23#1",
    "file": "accounting-four-statements.mmd",
    "slug": "accounting-four-statements",
    "order": 12,
    "subject": "accounting",
    "subjectName": "會計學",
    "chapterId": "accounting-23",
    "chapterTitle": "其他",
    "section": 1,
    "sectionTitle": "學習重點 2：跨報表整合與考前檢查",
    "shortTitle": "四大財務報表連結",
    "note": "本期淨利、期末權益與現金淨變動如何串起四張報表與附註。",
    "source": "flowchart TD\n  accTitle: 四大財務報表的連結\n  accDescr: 本期淨利從綜合損益表流入權益變動表與現金流量表；期末權益進入資產負債表，現金淨變動調整資產負債表的現金餘額；附註說明四張報表的會計政策與估計。\n\n  NOTES[\"附註<br/>會計政策、估計、揭露\"]:::accent\n\n  IS[\"綜合損益表<br/>收入 − 費用 = 本期淨利\"]:::outcome\n  RE[\"權益變動表<br/>淨利、股利、其他綜合損益\"]\n  CF[\"現金流量表<br/>營業、投資、籌資\"]\n  BS[\"資產負債表<br/>資產 = 負債 + 權益\"]\n\n  NOTES -.-> IS\n  NOTES -.-> RE\n  NOTES -.-> CF\n  NOTES -.-> BS\n\n  IS -- \"本期淨利\" --> RE\n  IS -- \"非現金項目調整\" --> CF\n  RE -- \"期末權益\" --> BS\n  CF -- \"現金淨變動\" --> BS\n  BS -- \"期初餘額\" --> IS\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-05#1-2": {
    "key": "investment-05#1-2",
    "file": "investment-capm-sml.mmd",
    "slug": "investment-capm-sml",
    "order": 13,
    "subject": "investment",
    "subjectName": "投資學",
    "chapterId": "investment-05",
    "chapterTitle": "CAPM模型",
    "section": 1,
    "sectionTitle": "學習重點 2：證券市場線與必要報酬率",
    "shortTitle": "CAPM／SML 推導",
    "note": "CAPM 是均衡模型；實證 α 可能來自模型假設不成立、因子遺漏或交易成本。",
    "createDiagram": true,
    "generatedSvg": true,
    "kicker": "Mermaid 推導圖",
    "title": "CAPM 與證券市場線：從效率前緣到 α",
    "caption": "從效率前緣與資本配置線推到市場投資組合，再得到 CAPM、SML 與 α；β 衡量系統風險。",
    "variables": [
      [
        "E(Ri)",
        "資產 i 的預期報酬",
        "CAPM 的結果。"
      ],
      [
        "Rf",
        "無風險利率",
        "資本配置線的截距。"
      ],
      [
        "βi",
        "系統風險",
        "Cov(Ri, Rm) ÷ Var(Rm)。"
      ],
      [
        "E(Rm)",
        "市場組合預期報酬",
        "SML 的市場報酬。"
      ],
      [
        "α",
        "超額報酬",
        "實際報酬 − CAPM 必要報酬。"
      ]
    ],
    "parameters": [
      [
        "M",
        "市場投資組合",
        "CAL 與效率前緣的切點。"
      ],
      [
        "SML",
        "證券市場線",
        "β 與必要報酬的線性關係。"
      ],
      [
        "CAPM",
        "資產定價模型",
        "無套利、可無風險借貸等假設。"
      ]
    ],
    "source": "flowchart TD\n  accTitle: CAPM 與證券市場線推導地圖\n  accDescr: 從個別資產與效率前緣出發，加入無風險資產形成資本配置線，切點為市場投資組合，進而得到 CAPM、證券市場線與 α。\n\n  ASSETS[\"個別資產與投資組合\"]:::accent\n  EF[\"效率前緣<br/>最小變異數邊界\"]\n  CAL[\"資本配置線 CAL<br/>Rf + 風險溢酬\"]\n  MKT[\"市場投資組合 M<br/>切點組合\"]\n  CAPM[\"CAPM<br/>E(Ri) = Rf + βi [E(Rm) − Rf]\"]:::outcome\n  SML[\"證券市場線 SML<br/>β 與必要報酬\"]\n  BETA[\"β = Cov(Ri, Rm) ÷ Var(Rm)\"]\n  ALPHA[\"α = 實際報酬 − CAPM 必要報酬\"]\n\n  ASSETS --> EF\n  EF --> CAL\n  CAL --> MKT\n  MKT --> CAPM\n  CAPM --> SML\n  CAPM --> BETA\n  SML --> ALPHA\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-07#2-2": {
    "key": "investment-07#2-2",
    "file": "investment-bond-risk.mmd",
    "slug": "investment-bond-risk",
    "order": 14,
    "subject": "investment",
    "subjectName": "投資學",
    "chapterId": "investment-07",
    "chapterTitle": "債券價格與收益率",
    "section": 2,
    "sectionTitle": "學習重點 3：存續期間與利率風險",
    "shortTitle": "債券利率風險地圖",
    "note": "存續期間近似在小幅利率變動時較準；大幅變動要加凸性項。",
    "createDiagram": true,
    "generatedSvg": true,
    "kicker": "Mermaid 推導圖",
    "title": "債券利率風險地圖：存續期間、凸性與價格近似",
    "caption": "從債券價格與殖利率連到存續期間、凸性與價格變動近似，並標示信用價差與利率風險管理。",
    "variables": [
      [
        "P",
        "債券價格",
        "未來現金流的現值。"
      ],
      [
        "y",
        "殖利率",
        "每期折現率。"
      ],
      [
        "D*",
        "修正存續期間",
        "Macaulay D ÷ (1 + y/k)。"
      ],
      [
        "凸性",
        "二階敏感度",
        "價格對殖利率的二階導數。"
      ],
      [
        "ΔP/P",
        "價格變動率",
        "存續期間與凸性的近似。"
      ]
    ],
    "parameters": [
      [
        "k",
        "每年付息次數",
        "決定 D* 的年化。"
      ],
      [
        "信用價差",
        "違約與流動性補償",
        "加到無風險利率上的溢酬。"
      ],
      [
        "免疫",
        "Duration matching",
        "資產與負債存續期間配對。"
      ]
    ],
    "source": "flowchart TD\n  accTitle: 債券利率風險地圖\n  accDescr: 從債券價格與現金流出發，經殖利率、存續期間與凸性，得到價格變動近似，並連到信用價差與利率風險管理。\n\n  PRICE[\"債券價格<br/>現金流折現\"]:::accent\n  YTM[\"殖利率 YTM<br/>價格與殖利率反向\"]\n  DUR[\"存續期間<br/>Macaulay D、修正 D*\"]\n  CONV[\"凸性<br/>二階敏感度\"]\n  APPROX[\"價格近似<br/>ΔP/P ≈ −D* Δy + ½ × 凸性 × (Δy)²\"]:::outcome\n  CREDIT[\"信用價差、流動性\"]\n  RISK[\"利率風險管理<br/>避險、免疫\"]\n\n  PRICE --> YTM\n  YTM --> DUR\n  DUR --> CONV\n  DUR --> APPROX\n  CONV --> APPROX\n  YTM --> CREDIT\n  CREDIT --> RISK\n  APPROX --> RISK\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-09#0": {
    "key": "investment-09#0",
    "file": "investment-option-pricing-map.mmd",
    "slug": "investment-option-pricing-map",
    "order": 15,
    "subject": "investment",
    "subjectName": "投資學",
    "chapterId": "investment-09",
    "chapterTitle": "選擇權",
    "section": 0,
    "sectionTitle": "學習重點 1：選擇權基本概念",
    "shortTitle": "選擇權定價地圖",
    "note": "此圖是方法地圖；公式與推導細節見選擇權章節與 Black–Scholes 推導圖。",
    "createDiagram": true,
    "generatedSvg": true,
    "kicker": "Mermaid 推導圖",
    "title": "選擇權定價地圖：無套利、二項式與 Black–Scholes",
    "caption": "從無套利原則出發，經二項式與風險中立機率，連到 Black–Scholes、Greeks、美式提前履約與數值方法。",
    "variables": [
      [
        "S",
        "標的資產價格",
        "選擇權的基礎資產。"
      ],
      [
        "K",
        "履約價格",
        "到期執行價。"
      ],
      [
        "T",
        "到期時間",
        "以年為單位。"
      ],
      [
        "σ",
        "波動率",
        "Black–Scholes 的核心參數。"
      ],
      [
        "q",
        "風險中立機率",
        "二項式模型的機率。"
      ]
    ],
    "parameters": [
      [
        "u,d",
        "上漲／下跌倍數",
        "二項式樹的價格變動。"
      ],
      [
        "r",
        "無風險利率",
        "連續複利。"
      ],
      [
        "美式",
        "提前履約",
        "可在到期前執行。"
      ],
      [
        "Greeks",
        "敏感度",
        "Delta、Gamma、Vega、Theta、Rho。"
      ]
    ],
    "source": "flowchart TD\n  accTitle: 選擇權定價地圖\n  accDescr: 從無套利原則出發，經二項式模型與風險中立機率，連到 Black–Scholes 與 Greeks；另列美式選擇權的提前履約分支與數值方法。\n\n  NOARB[\"無套利原則<br/>同風險同報酬\"]:::accent\n  BIN[\"二項式模型<br/>u、d、q\"] --> BS[\"Black–Scholes<br/>C = S N(d1) − K e^(−rT) N(d2)\"]:::outcome\n  NOARB --> BIN\n  BIN --> RN[\"風險中立機率<br/>q = (e^(rΔt) − d) ÷ (u − d)\"]\n  RN --> BS\n  BS --> GREEKS[\"Greeks<br/>Delta、Gamma、Vega、Theta、Rho\"]\n  BIN --> AM[\"美式選擇權<br/>提前履約分支\"]\n  AM --> TREE[\"三項式／樹狀數值法\"]\n  BS --> SMILE[\"波動率微笑／偏斜\"]\n  GREEKS --> RISK[\"風險管理與避險\"]\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-09#3-2": {
    "key": "investment-09#3-2",
    "file": "investment-bs-derivation.mmd",
    "slug": "investment-bs-derivation",
    "order": 16,
    "subject": "investment",
    "subjectName": "投資學",
    "chapterId": "investment-09",
    "chapterTitle": "選擇權",
    "section": 3,
    "sectionTitle": "學習重點 4：Black–Scholes 定價與 Greeks",
    "shortTitle": "Black–Scholes 推導",
    "note": "推導假設包含無套利、連續交易、無摩擦、常數波動率與對數常態報酬；實務上需放寬。",
    "createDiagram": true,
    "generatedSvg": true,
    "kicker": "Mermaid 推導圖",
    "title": "Black–Scholes 推導流程：從 Itô 到 Greeks",
    "caption": "從無套利與連續交易假設，經 Itô 引理、Black–Scholes PDE、風險中立期望與 d1/d2，得到封閉解與 Greeks。",
    "variables": [
      [
        "C",
        "買權價格",
        "歐式買權。"
      ],
      [
        "S",
        "標的價格",
        "連續交易。"
      ],
      [
        "K",
        "履約價",
        "到期執行。"
      ],
      [
        "r",
        "無風險利率",
        "連續複利。"
      ],
      [
        "σ",
        "波動率",
        "常數假設。"
      ],
      [
        "N(·)",
        "標準常態 CDF",
        "d1、d2 的累積機率。"
      ]
    ],
    "parameters": [
      [
        "PDE",
        "偏微分方程",
        "Black–Scholes PDE。"
      ],
      [
        "Q",
        "風險中立測度",
        "以無風險利率折現。"
      ],
      [
        "Greeks",
        "敏感度",
        "Delta、Gamma、Vega、Theta、Rho。"
      ]
    ],
    "source": "flowchart TD\n  accTitle: Black–Scholes 推導流程\n  accDescr: 從無套利與連續交易假設出發，以 Itô 引理建立 Black–Scholes 偏微分方程，轉為風險中立期望，得到 d1、d2 與封閉解，最後延伸到 Greeks。\n\n  ASSUME[\"假設<br/>無套利、連續交易<br/>常數波動率、無摩擦\"]:::accent\n  ITO[\"Itô 引理<br/>dS、dC 的隨機微分\"]\n  PDE[\"Black–Scholes PDE<br/>∂C/∂t + ½σ²S² ∂²C/∂S²<br/>+ rS ∂C/∂S − rC = 0\"]\n  RISK[\"風險中立定價<br/>C = e^(−rT) E^Q[max(S_T − K, 0)]\"]\n  D1D2[\"d1、d2<br/>d1 = [ln(S/K) + (r + ½σ²)T] ÷ (σ√T)<br/>d2 = d1 − σ√T\"]\n  BS[\"Black–Scholes 公式<br/>C = S N(d1) − K e^(−rT) N(d2)\"]:::outcome\n  GREEKS[\"Greeks 與敏感度<br/>Delta、Gamma、Vega、Theta、Rho\"]\n\n  ASSUME --> ITO --> PDE --> RISK --> D1D2 --> BS --> GREEKS\n\n  classDef accent fill:#e3efeb,stroke:#0f5c5c,color:#182426,stroke-width:2px\n  classDef outcome fill:#f5ead8,stroke:#a86d27,color:#182426,stroke-width:2px\n"
  },
  "investment-14#2": {
    "key": "investment-14#2",
    "file": "investment-dupont.mmd",
    "slug": "investment-dupont",
    "order": 17,
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

window.MERMAID_RELATED = {
  "macro-06#0": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-07#0": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-09#2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "investment-04#0": [
    {
      "label": "CAPM／SML 推導地圖",
      "href": "#/lab/mermaid?diagram=investment-capm-sml"
    }
  ],
  "investment-04#1": [
    {
      "label": "CAPM／SML 推導地圖",
      "href": "#/lab/mermaid?diagram=investment-capm-sml"
    }
  ],
  "investment-05#1": [
    {
      "label": "CAPM／SML 推導地圖",
      "href": "#/lab/mermaid?diagram=investment-capm-sml"
    }
  ],
  "investment-07#2": [
    {
      "label": "債券利率風險地圖",
      "href": "#/lab/mermaid?diagram=investment-bond-risk"
    }
  ],
  "macro-12#4": [
    {
      "label": "債券利率風險地圖",
      "href": "#/lab/mermaid?diagram=investment-bond-risk"
    }
  ],
  "investment-09#1": [
    {
      "label": "選擇權定價地圖",
      "href": "#/lab/mermaid?diagram=investment-option-pricing-map"
    }
  ],
  "investment-09#3": [
    {
      "label": "Black–Scholes 推導流程",
      "href": "#/lab/mermaid?diagram=investment-bs-derivation"
    }
  ],
  "accounting-14#0-3": [
    {
      "label": "會計循環（MMD）",
      "href": "#/lab/mermaid?diagram=accounting-cycle"
    }
  ],
  "macro-02#0": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-02#2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-05#1": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-06#1": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-06#2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-07#1": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-07#2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-08#0": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-08#0-2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-08#1": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-08#1-2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-09#2-2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-10#1": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-10#1-2": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-10#3": [
    {
      "label": "總體經濟模型地圖",
      "href": "#/lab/mermaid?diagram=macro-model-map"
    }
  ],
  "macro-12#1": [
    {
      "label": "債券利率風險地圖",
      "href": "#/lab/mermaid?diagram=investment-bond-risk"
    }
  ],
  "macro-12#2": [
    {
      "label": "債券利率風險地圖",
      "href": "#/lab/mermaid?diagram=investment-bond-risk"
    }
  ],
  "macro-12#3": [
    {
      "label": "債券利率風險地圖",
      "href": "#/lab/mermaid?diagram=investment-bond-risk"
    }
  ],
  "macro-13#6": [
    {
      "label": "選擇權定價地圖",
      "href": "#/lab/mermaid?diagram=investment-option-pricing-map"
    }
  ],
  "investment-04#2": [
    {
      "label": "CAPM／SML 推導地圖",
      "href": "#/lab/mermaid?diagram=investment-capm-sml"
    }
  ],
  "investment-15#2": [
    {
      "label": "Mermaid 圖表總覽",
      "href": "#/lab/mermaid"
    }
  ]
};
