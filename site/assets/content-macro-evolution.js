/* 總體經濟學 — 學派演進圖資料
   學派分期、提出者與代表模型為教學整理。諾貝爾年份、得主與研究領域
   由 app.js 反查 NOBEL_DATA；模型名稱由 MACRO_DIAGRAMS 反查，不另存副本。 */

window.MACRO_EVOLUTION = {
  meta: {
    eyebrow: "思想演進 · 1776–2026",
    title: "總體經濟學學派演進圖",
    description: "從古典學派到新制成長與制度實證，依時間整理主要理論學派、提出者、代表模型與諾貝爾里程碑。",
    note: "學派分期、提出者與代表模型為教學整理；諾貝爾年份、得主與研究領域沿用站內年表，模型名稱沿用站內模型圖。諾貝爾里程碑只列與該節點直接相關的屆別，未列者不代表與該學派無關。不同教科書對學派界線與代表人物偶有差異，考試作答仍以教材與題目給定的定義為準。"
  },
  stages: [
    {
      id: "classical",
      year: "1776",
      period: "1776–1930s",
      era: "古典與市場機能",
      transition: "價格與工資具彈性，市場自動回到充分就業。",
      nodes: [
        {
          id: "classical-school",
          kind: "學派",
          school: "古典學派",
          english: "Classical Economics",
          period: "1776–1930s",
          founders: "Adam Smith、David Ricardo",
          summary: "以分工、資本累積與市場價格機能解釋長期成長；Say 法則、可貸資金市場與貨幣數量論構成古典總體分析的起點。",
          modelAnchors: ["model-macro-12-1"],
          nobelYears: [],
          chapterRefs: [
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        }
      ]
    },
    {
      id: "keynesian",
      year: "1936",
      period: "1936–1960s",
      era: "有效需求革命",
      transition: "需求不足與價格黏性，讓政府穩定政策取得正當性。",
      nodes: [
        {
          id: "keynesian-school",
          kind: "學派",
          school: "凱因斯學派",
          english: "Keynesian Economics",
          period: "1936–1960s",
          founders: "John Maynard Keynes",
          summary: "有效需求決定短期產出；價格與工資具黏性，政府可透過財政與貨幣政策穩定經濟。",
          modelAnchors: [
            "model-macro-02-0",
            "model-macro-06-0",
            "model-macro-07-0"
          ],
          nobelYears: [],
          chapterRefs: [
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        },
        {
          id: "neoclassical-synthesis",
          kind: "學派",
          school: "新古典綜合",
          english: "Neoclassical Synthesis",
          period: "1950s–1960s",
          founders: "John Hicks、Paul Samuelson、Franco Modigliani",
          summary: "把凱因斯理論翻譯成 IS-LM 與計量模型，形成戰後主流總體經濟學；短期需求管理與長期新古典成長並存。",
          modelAnchors: [
            "model-macro-06-0",
            "model-macro-06-1",
            "model-macro-07-0"
          ],
          nobelYears: [1970, 1972],
          chapterRefs: [
            { chapterId: "macro-06", sectionIndex: 0, label: "第六章 IS-LM" }
          ]
        }
      ]
    },
    {
      id: "monetarism",
      year: "1956",
      period: "1956–1970s",
      era: "貨幣規則",
      transition: "貨幣供給是景氣波動主因，規則優於裁量。",
      nodes: [
        {
          id: "monetarist-school",
          kind: "學派",
          school: "貨幣學派",
          english: "Monetarism",
          period: "1956–1970s",
          founders: "Milton Friedman、Anna Schwartz",
          summary: "貨幣供給是景氣波動主因；長期菲利浦曲線垂直，主張固定貨幣成長規則，反對相機抉擇。",
          modelAnchors: ["model-macro-09-2"],
          nobelYears: [1976],
          chapterRefs: [
            { chapterId: "macro-05", sectionIndex: 1, label: "第五章 貨幣需求" },
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        }
      ]
    },
    {
      id: "expectations",
      year: "1970s",
      period: "1970s–1980s",
      era: "預期、技術衝擊與供給誘因",
      transition: "預期到的政策無實質效果；技術衝擊與供給誘因成為新焦點。",
      nodes: [
        {
          id: "new-classical-rbc",
          kind: "學派",
          school: "新古典學派與實質景氣循環",
          english: "New Classical & RBC",
          period: "1970s–1980s",
          founders: "Robert E. Lucas Jr.、Thomas Sargent、Robert Barro；Finn Kydland、Edward Prescott",
          summary: "理性預期與市場結清；Lucas 批判指出政策改變會改變行為參數，預期到的政策無實質效果。RBC 以技術衝擊解釋景氣循環。",
          modelAnchors: [
            "model-macro-09-2",
            "model-macro-08-1",
            "model-macro-08-1-2",
            "model-macro-07-0"
          ],
          nobelYears: [1995, 2004, 2011],
          chapterRefs: [
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" },
            { chapterId: "macro-08", sectionIndex: 1, label: "第八章 景氣循環" }
          ]
        },
        {
          id: "supply-side",
          kind: "學派",
          school: "供給面學派",
          english: "Supply-side Economics",
          period: "1970s–1980s",
          founders: "Robert Mundell、Arthur Laffer",
          summary: "減稅、去管制與誘因改善可提升潛在供給；稅率與稅收、儲蓄與投資的關係是政策辯論核心。",
          modelAnchors: ["model-macro-07-2"],
          nobelYears: [],
          chapterRefs: [
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        }
      ]
    },
    {
      id: "new-keynesian",
      year: "1980s",
      period: "1980s–迄今",
      era: "價格黏性與開放經濟",
      transition: "菜單成本與 Taylor 規則重建凱因斯分析；開放經濟與新貿易理論同步擴張。",
      nodes: [
        {
          id: "new-keynesian-school",
          kind: "學派",
          school: "新凱因斯學派",
          english: "New Keynesian Economics",
          period: "1980s–迄今",
          founders: "Stanley Fischer、John Taylor、Gregory Mankiw",
          summary: "為價格黏性建立個體基礎；菜單成本、Calvo 定價與 Taylor 規則成為穩定政策分析工具。",
          modelAnchors: [
            "model-macro-07-0",
            "model-macro-09-2",
            "model-macro-09-2-2"
          ],
          nobelYears: [2026],
          chapterRefs: [
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        },
        {
          id: "open-economy",
          kind: "理論分支",
          school: "開放總體與新貿易",
          english: "Open Economy & New Trade",
          period: "1960s–迄今",
          founders: "Robert Mundell、Paul Krugman",
          summary: "以 Mundell-Fleming、最適貨幣區與規模經濟／壟斷競爭，解釋匯率、資本流動與產業內貿易。",
          modelAnchors: [
            "model-macro-10-1",
            "model-macro-10-1-2",
            "model-macro-10-3"
          ],
          nobelYears: [1999, 2008],
          chapterRefs: [
            { chapterId: "macro-10", sectionIndex: 1, label: "第十章 匯率之決定" }
          ]
        }
      ]
    },
    {
      id: "modern",
      year: "1990s",
      period: "1990s–2026",
      era: "成長、制度與實證",
      transition: "知識、制度與因果識別成為現代總體研究主軸。",
      nodes: [
        {
          id: "endogenous-growth",
          kind: "理論分支",
          school: "新制成長理論",
          english: "Endogenous Growth",
          period: "1980s–迄今",
          founders: "Paul Romer、Robert Lucas Jr.",
          summary: "把知識、人力資本與創新內生化，突破 Solow 模型的外生技術假設；創新與創造性破壞驅動長期成長。",
          modelAnchors: ["model-macro-08-0", "model-macro-08-0-2"],
          nobelYears: [1987, 2018, 2025],
          chapterRefs: [
            { chapterId: "macro-08", sectionIndex: 0, label: "第八章 經濟成長" }
          ]
        },
        {
          id: "institutions-finance-empirics",
          kind: "研究前沿",
          school: "制度、金融與實證",
          english: "Institutions, Finance & Empirical",
          period: "1990s–2026",
          founders: "Daron Acemoglu、Simon Johnson、James Robinson；Ben S. Bernanke、Douglas W. Diamond、Philip H. Dybvig；David Card、Joshua D. Angrist、Guido W. Imbens",
          summary: "制度品質、金融摩擦與因果識別成為長期成長與政策評估核心；從跨國制度比較延伸到自然實驗與隨機對照試驗（RCT）。",
          modelAnchors: [
            "model-macro-11-0",
            "model-macro-05-0"
          ],
          nobelYears: [2021, 2022, 2024],
          chapterRefs: [
            { chapterId: "macro-11", sectionIndex: 0, label: "第十一章 金融體系" },
            { chapterId: "macro-07", sectionIndex: 2, label: "第七章 學派說明" }
          ]
        }
      ]
    }
  ]
};
