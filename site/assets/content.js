/* 網站共用資料：考試資訊、資料來源與四個科目 */

window.EXAM_SOURCES = [
  {
    id: "dgbas",
    name: "行政院主計總處",
    url: "https://www.dgbas.gov.tw/",
    domain: "dgbas.gov.tw",
    group: "統計與總體資料",
    note: "國民所得、物價、經濟成長與政府統計。"
  },
  {
    id: "stat",
    name: "中華民國統計資訊網",
    url: "https://www.stat.gov.tw/",
    domain: "stat.gov.tw",
    group: "統計與總體資料",
    note: "總體統計資料庫、物價指數與國民所得統計。"
  },
  {
    id: "cbc",
    name: "中央銀行",
    url: "https://www.cbc.gov.tw/",
    domain: "cbc.gov.tw",
    group: "統計與總體資料",
    note: "貨幣政策、利率、匯率、外匯存底與金融統計。"
  },
  {
    id: "cbc-knowledge",
    name: "中央銀行金融知識網",
    url: "https://knowledge.cbc.gov.tw/",
    domain: "knowledge.cbc.gov.tw",
    group: "統計與總體資料",
    note: "貨幣、銀行、利率與金融政策的入門說明。"
  },
  {
    id: "ndc",
    name: "國家發展委員會",
    url: "https://www.ndc.gov.tw/",
    domain: "ndc.gov.tw",
    group: "統計與總體資料",
    note: "景氣對策信號、景氣指標與經濟發展政策。"
  },
  {
    id: "mol",
    name: "勞動部",
    url: "https://www.mol.gov.tw/",
    domain: "mol.gov.tw",
    group: "統計與總體資料",
    note: "勞動力、失業率、就業與勞動市場統計。"
  },
  {
    id: "mof",
    name: "財政部",
    url: "https://www.mof.gov.tw/",
    domain: "mof.gov.tw",
    group: "統計與總體資料",
    note: "財政收支、租稅與政府債務相關資料。"
  },
  {
    id: "moea",
    name: "經濟部統計處",
    url: "https://www.moea.gov.tw/Mns/dos/home/Home.aspx",
    domain: "moea.gov.tw",
    group: "統計與總體資料",
    note: "產業生產、外銷訂單、批發零售與產業經濟統計。"
  },
  {
    id: "ardf",
    name: "財團法人中華民國會計研究發展基金會",
    url: "https://www.ardf.org.tw/",
    domain: "ardf.org.tw",
    group: "會計準則與監理",
    note: "臺灣 IFRS 正體中文翻譯、會計準則解釋與會計專業資源。"
  },
  {
    id: "ifrs",
    name: "IFRS Foundation",
    url: "https://www.ifrs.org/",
    domain: "ifrs.org",
    group: "會計準則與監理",
    note: "IFRS 準則原文、修訂與教育資源；用於核對國際會計準則。"
  },
  {
    id: "law-moj",
    name: "全國法規資料庫",
    url: "https://law.moj.gov.tw/",
    domain: "law.moj.gov.tw",
    group: "會計準則與監理",
    note: "商業會計法、公司法、證券交易法與所得稅法等法規。"
  },
  {
    id: "cgc",
    name: "公司治理中心",
    url: "https://cgc.twse.com.tw/",
    domain: "cgc.twse.com.tw",
    group: "會計準則與監理",
    note: "公司治理評鑑、董事會運作與永續治理資訊。"
  },
  {
    id: "dot",
    name: "財政部賦稅署",
    url: "https://www.dot.gov.tw/",
    domain: "dot.gov.tw",
    group: "會計準則與監理",
    note: "營利事業所得稅、扣繳、稅務申報與稅法解釋。"
  },
  {
    id: "fsc",
    name: "金融監督管理委員會",
    url: "https://www.fsc.gov.tw/",
    domain: "fsc.gov.tw",
    group: "金融監理與市場",
    note: "金融監理、銀行保險證券政策與消費者保護。"
  },
  {
    id: "sfb",
    name: "金融監督管理委員會證券期貨局",
    url: "https://www.sfb.gov.tw/",
    domain: "sfb.gov.tw",
    group: "金融監理與市場",
    note: "證券、期貨與投信投顧市場的監理法規。"
  },
  {
    id: "cdic",
    name: "中央存款保險公司",
    url: "https://www.cdic.gov.tw/",
    domain: "cdic.gov.tw",
    group: "金融監理與市場",
    note: "存款保險、金融穩定與存款人權益保障。"
  },
  {
    id: "twse",
    name: "臺灣證券交易所",
    url: "https://www.twse.com.tw/zh/",
    domain: "twse.com.tw",
    group: "金融監理與市場",
    note: "集中市場交易、上市證券與市場統計。"
  },
  {
    id: "mops",
    name: "公開資訊觀測站",
    url: "https://mops.twse.com.tw/",
    domain: "mops.twse.com.tw",
    group: "金融監理與市場",
    note: "上市櫃公司財務報表、重大訊息與股東會資料。"
  },
  {
    id: "twse-edu",
    name: "證交所投資人知識網",
    url: "https://investoredu.twse.com.tw/",
    domain: "investoredu.twse.com.tw",
    group: "金融監理與市場",
    note: "股票、債券、ETF 與投資風險教育。"
  },
  {
    id: "tpex",
    name: "證券櫃檯買賣中心",
    url: "https://www.tpex.org.tw/",
    domain: "tpex.org.tw",
    group: "金融監理與市場",
    note: "店頭市場、興櫃與債券市場相關資訊。"
  },
  {
    id: "taifex",
    name: "臺灣期貨交易所",
    url: "https://www.taifex.com.tw/cht/index",
    domain: "taifex.com.tw",
    group: "金融監理與市場",
    note: "期貨與選擇權商品、交易制度與保證金資訊。"
  },
  {
    id: "sitca",
    name: "中華民國證券投資信託暨顧問商業同業公會",
    url: "https://www.sitca.org.tw/index_pc.aspx",
    domain: "sitca.org.tw",
    group: "考試與教育資源",
    note: "共同基金、投信投顧業務與境內外基金資訊。"
  },
  {
    id: "sfi",
    name: "證券暨期貨市場發展基金會",
    url: "https://www.sfi.org.tw/",
    domain: "sfi.org.tw",
    group: "考試與教育資源",
    note: "證券期貨專業測驗、培訓與考試資訊。"
  },
  {
    id: "sfi-past-exams",
    name: "證基會歷屆試題下載",
    url: "https://www.sfi.org.tw/Node?id=217",
    domain: "sfi.org.tw",
    group: "考試與教育資源",
    note: "證券投資分析人員歷屆試題與選擇題解答；115 年第 1、2 次考古題練習庫連結官方檔案。"
  },
  {
    id: "past-exam-mirror",
    name: "歷屆試題公開鏡像（宸浩）",
    url: "https://lidapon.azurewebsites.net/files/E1/109Q1.pdf",
    domain: "lidapon.azurewebsites.net",
    group: "考試與教育資源",
    note: "較早年度試題 PDF 的公開鏡像；107–108 年解答連結公開文字版 PDF，本站以證基會公告的選擇題解答為準，並保留原始試題連結供對照。"
  },
  {
    id: "naer",
    name: "國家教育研究院樂詞網",
    url: "https://terms.naer.edu.tw/",
    domain: "terms.naer.edu.tw",
    group: "考試與教育資源",
    note: "中英文專業名詞對照與學術名詞查詢。"
  },
  {
    id: "ntu-ocw",
    name: "國立臺灣大學開放式課程",
    url: "https://ocw.aca.ntu.edu.tw/",
    domain: "ocw.aca.ntu.edu.tw",
    group: "考試與教育資源",
    note: "經濟學、投資學與財務相關公開課程資源。"
  },
  {
    id: "cfainstitute",
    name: "CFA Institute",
    url: "https://www.cfainstitute.org/",
    domain: "cfainstitute.org",
    group: "考試與教育資源",
    note: "投資組合理論、多因子模型、債券投資組合管理與風險管理的專業教育資源。"
  },
  {
    id: "wiki",
    name: "維基百科（繁體中文）",
    url: "https://zh.wikipedia.org/zh-tw/",
    domain: "zh.wikipedia.org",
    group: "繁體中文百科",
    note: "用於名詞初步核對；正式考試內容仍以官方與教材為準。"
  }
];

window.EXAM_CONTENT = {
  meta: {
    title: "分析師備考站",
    subtitle: "把總體經濟學、投資學、會計學與證券法規，讀成一張可以考試的地圖。",
    examName: "證券投資分析人員考試",
    subjectsLabel: "總體經濟學 × 投資學 × 會計學 × 證券法規",
    sourceDocuments: [
      "documents/gross_economics_contents.md",
      "documents/investment_contents.md",
      "documents/accounting_contents.md",
      "documents/securities_law_contents.md"
    ],
    updated: "2026-10-21",
    description: "總體經濟學依《證券投資分析人員考試概要》第 1–2 篇的章節整理；投資學依《投資學》目錄的第 1–5 篇整理；會計學依《會計學》目錄的 23 章整理；證券交易法規與實務依 documents/test.md 的測驗範圍整理。四個科目各自成篇，不混用章節。另收錄 107–115 年共 29 次、3,710 題歷屆選擇題，依年度與科目練習；每題可標示多個章節出處與考試次別，科目頁顯示各章出題次數與頻率；另收錄 114–115 年 60 題計算／申論題與近二年總經時事。內容以臺灣官方與繁體中文公開資料為主。",
    formulaNote: "公式以 KaTeX 排版，並以繁體中文教材常見定義整理，優先對照臺灣官方統計與金融監理資料。使用前仍應以原始教材確認符號定義與適用條件，也可用 ChatGPT、Gemini 或 Claude 做獨立比較。",
    disclaimer: "本站為考試複習整理，不構成投資建議。考試範圍、法規與統計數據請以主管機關與考試主辦單位最新公告為準。"
  },
  subjects: [window.MACRO_SUBJECT, window.INVESTMENT_SUBJECT, window.ACCOUNTING_SUBJECT, window.LAW_SUBJECT],
  sources: window.EXAM_SOURCES,
  sourceGroups: [
    {
      name: "統計與總體資料",
      description: "國民所得、物價、景氣、勞動、財政、貨幣與匯率。"
    },
    {
      name: "金融監理與市場",
      description: "金融體系、銀行、證券、期貨、債券與投資人教育。"
    },
    {
      name: "會計準則與監理",
      description: "會計準則、正體中文翻譯、公司法規、稅務與公司治理。"
    },
    {
      name: "考試與教育資源",
      description: "考試資訊、專業名詞、基金資料與開放式課程。"
    },
    {
      name: "繁體中文百科",
      description: "名詞初步核對與延伸閱讀；不取代官方資料。"
    }
  ],
  studySteps: [
    {
      title: "先看章節地圖",
      text: "從科目頁掌握各篇與章節的順序，先建立整體框架，再進入細節。"
    },
    {
      title: "用名詞速查補洞",
      text: "每節先讀核心概念，再用名詞卡確認定義、英文縮寫與容易混淆的地方。"
    },
    {
      title: "用考試重點收斂",
      text: "讀完一節後只看「考試重點」與「一句話記憶」，把內容壓縮成可回想的一句話。"
    },
    {
      title: "用公式與比較表複習",
      text: "把公式寫下來，確認符號與適用條件；再用相鄰章節做比較，避免只背單點。"
    },
    {
      title: "用考古題驗收",
      text: "依年度與科目挑選歷屆選擇題，先作答再看答案；把錯題回到對應章節補強，再回來重做。"
    }
  ]
};
