/* 投資學 — 技術分析指標資料
   整理 50 種常見技術分析指標，依趨勢、動能、波動率、成交量與價格結構分類。
   公式以一般股票日線資料為基礎；不同軟體的參數、平滑方式或價格調整可能不同。
   每筆指標共用同一份資料，投資學公式總表頁與技術分析章節可引用。 */

window.INVESTMENT_TECHNICAL_INDICATORS = {
  meta: {
    title: "技術分析指標總表",
    note: "優先級 A 為核心必學，B 為進階常用，C 為策略補充；這是學習建議，不是官方命題排名。"
  },
  categories: [
    {
      id: "trend",
      order: 1,
      title: "01 趨勢指標",
      description: "回答市場往哪個方向走、趨勢強度如何；SMA、EMA、MACD、ADX 與 Parabolic SAR。",
      entries: [
        {
          id: "technical.sma",
          name: "簡單移動平均（SMA）",
          latex: String.raw`SMA_n=\frac{1}{n}\sum_{i=0}^{n-1}C_{t-i}`,
          note: "最近 n 期收盤價平均，常用 5、20、60 日。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=5、20、60",
          limitations: "落後指標；參數不同會改變訊號。",
          chapterId: "investment-15",
          variables: [["SMA_n", "n 期簡單移動平均"], ["C_t", "第 t 期收盤價"], ["n", "期數"]]
        },
        {
          id: "technical.ema",
          name: "指數移動平均（EMA）",
          latex: String.raw`EMA_t=\alpha C_t+(1-\alpha)EMA_{t-1},\quad \alpha=\frac{2}{n+1}`,
          note: "越重視近期價格，反應通常比 SMA 快。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=12、26",
          limitations: "平滑係數不同，短線敏感度也不同。",
          chapterId: "investment-15",
          variables: [["EMA_t", "第 t 期指數移動平均"], ["C_t", "第 t 期收盤價"], ["\\alpha", "平滑係數"], ["n", "期數"]]
        },
        {
          id: "technical.wma",
          name: "加權移動平均（WMA）",
          latex: String.raw`WMA_n=\frac{\sum_{i=1}^{n}iC_i}{\sum_{i=1}^{n}i}`,
          note: "近期價格給較高權重；此式以 i=n 為最新一期。",
          priority: "A",
          examSkill: "計算",
          parameters: "權重線性遞增",
          limitations: "權重設計不同，結果會不同。",
          chapterId: "investment-15",
          variables: [["WMA_n", "n 期加權移動平均"], ["C_i", "第 i 期收盤價"], ["n", "期數"]]
        },
        {
          id: "technical.macd",
          name: "MACD",
          latex: String.raw`MACD=EMA_{12}-EMA_{26}`,
          note: "衡量兩條 EMA 的差距，常用於判斷趨勢轉折。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 12、26",
          limitations: "盤整時訊號容易反覆。",
          chapterId: "investment-15",
          variables: [["EMA_{12}", "12 期 EMA"], ["EMA_{26}", "26 期 EMA"]]
        },
        {
          id: "technical.macd-signal",
          name: "MACD 訊號線",
          latex: String.raw`Signal=EMA_9(MACD)`,
          note: "MACD 的平滑線；兩線交叉是常見訊號。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 9 期",
          limitations: "交叉訊號可能落後。",
          chapterId: "investment-15",
          variables: [["MACD", "MACD 值"], ["EMA_9", "9 期 EMA"]]
        },
        {
          id: "technical.macd-histogram",
          name: "MACD 柱狀圖",
          latex: String.raw`Hist=MACD-Signal`,
          note: "觀察 MACD 與訊號線的距離及動能變化。",
          priority: "A",
          examSkill: "解讀",
          parameters: "無額外參數",
          limitations: "柱狀圖方向只代表差距變化。",
          chapterId: "investment-15",
          variables: [["MACD", "MACD 值"], ["Signal", "訊號線"]]
        },
        {
          id: "technical.adx",
          name: "ADX 平均趨向指標",
          latex: String.raw`ADX=MA_n(DX)`,
          note: "衡量趨勢強度，不直接判斷漲跌方向。",
          priority: "B",
          examSkill: "解讀",
          parameters: "常用 n=14",
          limitations: "平滑方式不同，數值會不同。",
          chapterId: "investment-15",
          variables: [["DX", "趨向指標"], ["MA_n", "n 期移動平均"]]
        },
        {
          id: "technical.plus-di",
          name: "+DI 正向指標",
          latex: String.raw`+DI=100\frac{\text{Smoothed}(+DM)}{ATR_n}`,
          note: "衡量向上趨勢移動的強度。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=14",
          limitations: "需與 -DI、ADX 合併解讀。",
          chapterId: "investment-15",
          variables: [["+DM", "正向移動"], ["ATR_n", "n 期平均真實波幅"]]
        },
        {
          id: "technical.minus-di",
          name: "-DI 負向指標",
          latex: String.raw`-DI=100\frac{\text{Smoothed}(-DM)}{ATR_n}`,
          note: "衡量向下趨勢移動的強度。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=14",
          limitations: "單獨看容易誤判，需搭配 ADX。",
          chapterId: "investment-15",
          variables: [["-DM", "負向移動"], ["ATR_n", "n 期平均真實波幅"]]
        },
        {
          id: "technical.parabolic-sar",
          name: "Parabolic SAR",
          latex: String.raw`SAR_{t+1}=SAR_t+AF(EP-SAR_t)`,
          note: "追蹤停損與趨勢反轉；AF 為加速因子，EP 為極值價格。",
          priority: "B",
          examSkill: "解讀與交易規劃",
          parameters: "AF 初始 0.02、每次加 0.02、上限 0.2",
          limitations: "震盪市場容易出現假反轉。",
          chapterId: "investment-15",
          variables: [["SAR_t", "第 t 期 SAR"], ["AF", "加速因子"], ["EP", "極值價格"]]
        }
      ]
    },
    {
      id: "momentum",
      order: 2,
      title: "02 動能指標",
      description: "回答上漲或下跌的速度，以及是否可能超買、超賣或動能轉弱。",
      entries: [
        {
          id: "technical.rsi",
          name: "RSI 相對強弱指標",
          latex: String.raw`RSI=100-\frac{100}{1+RS},\quad RS=\frac{\text{AvgGain}}{\text{AvgLoss}}`,
          note: "常用 14 期；70 以上常視為超買、30 以下常視為超賣，並非必然反轉。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=14；超買 70、超賣 30",
          limitations: "強勢趨勢中可能長期維持極端值。",
          chapterId: "investment-15",
          variables: [["RS", "平均漲幅／平均跌幅"], ["AvgGain", "平均上漲幅度"], ["AvgLoss", "平均下跌幅度"]]
        },
        {
          id: "technical.stochastic-k",
          name: "隨機指標 %K",
          latex: String.raw`\%K=100\frac{C-L_n}{H_n-L_n}`,
          note: "衡量收盤價在近期最高與最低價區間的位置。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=14",
          limitations: "H_n=L_n 時需處理除以零。",
          chapterId: "investment-15",
          variables: [["C", "收盤價"], ["H_n", "n 期最高價"], ["L_n", "n 期最低價"]]
        },
        {
          id: "technical.stochastic-d",
          name: "隨機指標 %D",
          latex: String.raw`\%D=SMA_3(\%K)`,
          note: "%K 的平滑線，常用於交叉訊號。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 3 期平滑",
          limitations: "平滑會增加落後性。",
          chapterId: "investment-15",
          variables: [["\\%K", "%K 值"], ["SMA_3", "3 期簡單移動平均"]]
        },
        {
          id: "technical.williams-r",
          name: "Williams %R",
          latex: String.raw`\%R=-100\frac{H_n-C}{H_n-L_n}`,
          note: "範圍通常為 -100 至 0；接近 0 表示收盤價靠近區間高點。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=14",
          limitations: "與 %K 高度重疊。",
          chapterId: "investment-15",
          variables: [["H_n", "n 期最高價"], ["L_n", "n 期最低價"], ["C", "收盤價"]]
        },
        {
          id: "technical.roc",
          name: "ROC 變動率",
          latex: String.raw`ROC_n=100\left(\frac{C_t}{C_{t-n}}-1\right)`,
          note: "衡量相對於 n 期前的價格變動百分比。",
          priority: "B",
          examSkill: "計算",
          parameters: "常用 n=12",
          limitations: "基準期不同，數值差異大。",
          chapterId: "investment-15",
          variables: [["C_t", "第 t 期收盤價"], ["C_{t-n}", "n 期前收盤價"]]
        },
        {
          id: "technical.momentum",
          name: "Momentum 動能",
          latex: String.raw`MOM_n=C_t-C_{t-n}`,
          note: "衡量價格的絕對變動幅度。",
          priority: "B",
          examSkill: "計算",
          parameters: "常用 n=10",
          limitations: "未標準化，難以跨標的比較。",
          chapterId: "investment-15",
          variables: [["C_t", "第 t 期收盤價"], ["C_{t-n}", "n 期前收盤價"]]
        },
        {
          id: "technical.cci",
          name: "CCI 順勢指標",
          latex: String.raw`CCI=\frac{TP-SMA_n(TP)}{0.015\,MD}`,
          note: "衡量典型價格偏離平均值的程度；MD 為平均絕對偏差。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=20；±100 為常用門檻",
          limitations: "MD 為 0 時需處理除以零。",
          chapterId: "investment-15",
          variables: [["TP", "典型價格"], ["SMA_n", "n 期簡單移動平均"], ["MD", "平均絕對偏差"]]
        },
        {
          id: "technical.trix",
          name: "TRIX 三重指數平滑指標",
          latex: String.raw`TRIX=100\left(\frac{EMA^{(3)}_t}{EMA^{(3)}_{t-1}}-1\right)`,
          note: "對價格連續做三次 EMA 平滑，再計算變動率，減少部分雜訊。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=15",
          limitations: "平滑次數多，訊號較慢。",
          chapterId: "investment-15",
          variables: [["EMA^{(3)}_t", "三次平滑後的 EMA"], ["EMA^{(3)}_{t-1}", "前一期三次平滑 EMA"]]
        },
        {
          id: "technical.ppo",
          name: "PPO 百分比價格震盪指標",
          latex: String.raw`PPO=100\frac{EMA_{12}-EMA_{26}}{EMA_{26}}`,
          note: "與 MACD 類似，但以百分比表示，較便於比較不同價格水準的標的。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 12、26、9",
          limitations: "與 MACD 資訊重疊。",
          chapterId: "investment-15",
          variables: [["EMA_{12}", "12 期 EMA"], ["EMA_{26}", "26 期 EMA"]]
        },
        {
          id: "technical.ultimate-oscillator",
          name: "Ultimate Oscillator 終極震盪指標",
          latex: String.raw`UO=100\frac{4A_7+2A_{14}+A_{28}}{7}`,
          note: "A_n 為 n 期平均 BP/TR；整合短、中、長期買壓。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 7、14、28",
          limitations: "計算較複雜，需先算 BP 與 TR。",
          chapterId: "investment-15",
          variables: [["A_n", "n 期平均 BP/TR"], ["BP", "買壓"], ["TR", "真實波幅"]]
        }
      ]
    },
    {
      id: "volatility",
      order: 3,
      title: "03 波動率與通道指標",
      description: "回答價格波動有多大、目前價格相對於近期波動範圍位於何處。",
      entries: [
        {
          id: "technical.bollinger-upper",
          name: "布林通道上軌",
          latex: String.raw`Upper=SMA_n(C)+k\sigma_n`,
          note: "常用 n=20、k=2，衡量相對高位。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=20、k=2",
          limitations: "觸及上軌不代表必然反轉。",
          chapterId: "investment-15",
          variables: [["SMA_n", "n 期簡單移動平均"], ["k", "標準差倍數"], ["\\sigma_n", "n 期標準差"]]
        },
        {
          id: "technical.bollinger-middle",
          name: "布林通道中軌",
          latex: String.raw`Middle=SMA_n(C)`,
          note: "通常為 20 期簡單移動平均。",
          priority: "A",
          examSkill: "計算",
          parameters: "常用 n=20",
          limitations: "與 SMA 相同，屬落後指標。",
          chapterId: "investment-15",
          variables: [["SMA_n", "n 期簡單移動平均"], ["C", "收盤價"]]
        },
        {
          id: "technical.bollinger-lower",
          name: "布林通道下軌",
          latex: String.raw`Lower=SMA_n(C)-k\sigma_n`,
          note: "衡量相對低位；觸及不代表必然反轉。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=20、k=2",
          limitations: "波動結構改變時通道會失真。",
          chapterId: "investment-15",
          variables: [["SMA_n", "n 期簡單移動平均"], ["k", "標準差倍數"], ["\\sigma_n", "n 期標準差"]]
        },
        {
          id: "technical.bollinger-bandwidth",
          name: "布林帶寬（Bandwidth）",
          latex: String.raw`\text{Bandwidth}=\frac{Upper-Lower}{Middle}\times100\%`,
          note: "帶寬收窄表示近期波動較低，可能進入盤整。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=20、k=2",
          limitations: "帶寬低不代表突破方向。",
          chapterId: "investment-15",
          variables: [["Upper", "上軌"], ["Lower", "下軌"], ["Middle", "中軌"]]
        },
        {
          id: "technical.atr",
          name: "ATR 平均真實波幅",
          latex: String.raw`ATR_n=MA_n(TR)`,
          note: "衡量波動幅度，不代表漲跌方向；實務常用 Wilder 平滑。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=14",
          limitations: "平滑方式不同，數值會不同。",
          chapterId: "investment-15",
          variables: [["TR", "真實波幅"], ["MA_n", "n 期移動平均"]]
        },
        {
          id: "technical.stdev-volatility",
          name: "標準差波動率",
          latex: String.raw`\sigma=\sqrt{\frac{\sum(R_i-\bar R)^2}{n-1}}`,
          note: "衡量報酬離散程度；若要年化，須依資料頻率換算。",
          priority: "B",
          examSkill: "計算與解釋",
          parameters: "樣本標準差分母 n-1",
          limitations: "母體與樣本標準差定義不同。",
          chapterId: "investment-15",
          variables: [["R_i", "第 i 期報酬率"], ["\\bar R", "平均報酬率"], ["n", "期數"]]
        },
        {
          id: "technical.keltner",
          name: "Keltner Channel 肯特納通道",
          latex: String.raw`Upper=EMA_n(C)+kATR_n,\quad Lower=EMA_n(C)-kATR_n`,
          note: "以 ATR 建立通道，結合趨勢與波動幅度。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=20、k=2",
          limitations: "ATR 與 EMA 參數需一致。",
          chapterId: "investment-15",
          variables: [["EMA_n", "n 期 EMA"], ["ATR_n", "n 期平均真實波幅"], ["k", "倍數"]]
        },
        {
          id: "technical.donchian",
          name: "Donchian Channel 唐奇安通道",
          latex: String.raw`Upper=HH_n,\quad Lower=LL_n`,
          note: "取最近 n 期最高價與最低價，常用於突破交易。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=20",
          limitations: "突破後可能出現假突破。",
          chapterId: "investment-15",
          variables: [["HH_n", "n 期最高價"], ["LL_n", "n 期最低價"]]
        }
      ]
    },
    {
      id: "volume",
      order: 4,
      title: "04 成交量與資金流指標",
      description: "回答價格變動是否有成交量支持、資金流向與買賣壓力如何。",
      entries: [
        {
          id: "technical.volume-ma",
          name: "成交量均線（Volume MA）",
          latex: String.raw`VMA_n=\frac{1}{n}\sum_{i=0}^{n-1}V_{t-i}`,
          note: "判斷目前成交量是否高於近期平均。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=5、20",
          limitations: "除權息與盤後交易可能影響量能。",
          chapterId: "investment-15",
          variables: [["V_t", "第 t 期成交量"], ["n", "期數"]]
        },
        {
          id: "technical.obv",
          name: "OBV 能量潮",
          latex: String.raw`OBV_t=OBV_{t-1}+\begin{cases}V_t,&C_t>C_{t-1}\\-V_t,&C_t<C_{t-1}\\0,&C_t=C_{t-1}\end{cases}`,
          note: "依收盤漲跌累加成交量，觀察量價趨勢。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "依收盤價比較",
          limitations: "累積型指標，絕對值不具可比性。",
          chapterId: "investment-15",
          variables: [["OBV_t", "第 t 期 OBV"], ["V_t", "成交量"], ["C_t", "收盤價"]]
        },
        {
          id: "technical.vwap",
          name: "VWAP 成交量加權平均價",
          latex: String.raw`VWAP=\frac{\sum_i P_iV_i}{\sum_iV_i}`,
          note: "以成交量加權的平均成交價格，常用於日內交易。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用當日累計",
          limitations: "跨日使用需重新設定起點。",
          chapterId: "investment-15",
          variables: [["P_i", "第 i 筆成交價"], ["V_i", "第 i 筆成交量"]]
        },
        {
          id: "technical.mfi",
          name: "MFI 資金流量指標",
          latex: String.raw`MFI=100-\frac{100}{1+MR}`,
          note: "MR 為正資金流與負資金流的比值；融合價格與成交量。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "常用 n=14；超買 80、超賣 20",
          limitations: "資料期間與典型價格定義需一致。",
          chapterId: "investment-15",
          variables: [["MR", "正資金流／負資金流"], ["TP", "典型價格"], ["V", "成交量"]]
        },
        {
          id: "technical.ad-line",
          name: "A/D Line 累積／派發線",
          latex: String.raw`CLV=\frac{(C-L)-(H-C)}{H-L},\quad AD_t=AD_{t-1}+CLV_tV_t`,
          note: "依收盤價在當日高低區間的位置加權成交量。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "依每日高低收與成交量",
          limitations: "H=L 時需處理除以零。",
          chapterId: "investment-15",
          variables: [["CLV_t", "收盤位置係數"], ["V_t", "成交量"], ["H", "最高價"], ["L", "最低價"], ["C", "收盤價"]]
        },
        {
          id: "technical.cmf",
          name: "Chaikin Money Flow 資金流量指標",
          latex: String.raw`CMF_n=\frac{\sum CLV_tV_t}{\sum V_t}`,
          note: "衡量一段期間內的量價買賣壓力。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=20",
          limitations: "與 A/D Line 資訊重疊。",
          chapterId: "investment-15",
          variables: [["CLV_t", "收盤位置係數"], ["V_t", "成交量"], ["n", "期數"]]
        },
        {
          id: "technical.force-index",
          name: "Force Index 強力指標",
          latex: String.raw`FI_t=(C_t-C_{t-1})V_t`,
          note: "將價格變動幅度與成交量結合；常再做 EMA 平滑。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 13 期 EMA 平滑",
          limitations: "原始值波動大，需平滑。",
          chapterId: "investment-15",
          variables: [["C_t", "第 t 期收盤價"], ["V_t", "成交量"]]
        },
        {
          id: "technical.volume-roc",
          name: "Volume ROC 成交量變動率",
          latex: String.raw`VROC_n=100\left(\frac{V_t}{V_{t-n}}-1\right)`,
          note: "衡量成交量相較於 n 期前的變化。",
          priority: "B",
          examSkill: "計算",
          parameters: "常用 n=12",
          limitations: "基準期不同，數值差異大。",
          chapterId: "investment-15",
          variables: [["V_t", "第 t 期成交量"], ["V_{t-n}", "n 期前成交量"]]
        },
        {
          id: "technical.pvt",
          name: "PVT 價量趨勢指標",
          latex: String.raw`PVT_t=PVT_{t-1}+V_t\frac{C_t-C_{t-1}}{C_{t-1}}`,
          note: "依價格百分比變動加權成交量。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "累積型",
          limitations: "絕對值不具可比性。",
          chapterId: "investment-15",
          variables: [["PVT_t", "第 t 期 PVT"], ["V_t", "成交量"], ["C_t", "收盤價"]]
        },
        {
          id: "technical.nvi",
          name: "NVI 負量指標",
          latex: String.raw`NVI_t=NVI_{t-1}\left(1+\frac{C_t-C_{t-1}}{C_{t-1}}\right)`,
          note: "只在成交量下降時更新，用來觀察低成交量期間的價格趨勢。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "當 V_t<V_{t-1} 時更新",
          limitations: "只看低量期間，可能漏掉大量資訊。",
          chapterId: "investment-15",
          variables: [["NVI_t", "第 t 期 NVI"], ["V_t", "成交量"], ["C_t", "收盤價"]]
        }
      ]
    },
    {
      id: "structure",
      order: 5,
      title: "05 支撐壓力、價格結構與複合指標",
      description: "回答可能支撐壓力在哪裡、價格是否突破，以及交易的風險報酬是否合理。",
      entries: [
        {
          id: "technical.pivot-point",
          name: "樞紐點（Pivot Point）",
          latex: String.raw`PP=\frac{H_{-1}+L_{-1}+C_{-1}}{3}`,
          note: "以前一交易日高、低、收盤價估算樞紐位置。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "依前一交易日",
          limitations: "傳統公式不是必然反轉點。",
          chapterId: "investment-15",
          variables: [["H_{-1}", "前一日最高價"], ["L_{-1}", "前一日最低價"], ["C_{-1}", "前一日收盤價"]]
        },
        {
          id: "technical.pivot-r1",
          name: "第一阻力位",
          latex: String.raw`R_1=2PP-L_{-1}`,
          note: "樞紐點上方的第一個傳統阻力參考位。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "依 PP 與前一日低點",
          limitations: "僅為參考位，不是保證反轉。",
          chapterId: "investment-15",
          variables: [["PP", "樞紐點"], ["L_{-1}", "前一日最低價"]]
        },
        {
          id: "technical.pivot-s1",
          name: "第一支撐位",
          latex: String.raw`S_1=2PP-H_{-1}`,
          note: "樞紐點下方的第一個傳統支撐參考位。",
          priority: "A",
          examSkill: "計算與解讀",
          parameters: "依 PP 與前一日高點",
          limitations: "僅為參考位，不是保證反轉。",
          chapterId: "investment-15",
          variables: [["PP", "樞紐點"], ["H_{-1}", "前一日最高價"]]
        },
        {
          id: "technical.fibonacci-retracement",
          name: "Fibonacci 回撤",
          latex: String.raw`P_r=H-r(H-L)`,
          note: "r 常取 23.6%、38.2%、50%、61.8%；由高點向下回撤的常見算法。",
          priority: "C",
          examSkill: "解讀與交易規劃",
          parameters: "常用 23.6%、38.2%、50%、61.8%",
          limitations: "錨點慣例不同，畫法需固定。",
          chapterId: "investment-15",
          variables: [["H", "波段高點"], ["L", "波段低點"], ["r", "回撤比例"]]
        },
        {
          id: "technical.fibonacci-extension",
          name: "Fibonacci 延伸",
          latex: String.raw`P_{\text{ext}}=L+r(H-L)`,
          note: "以低點及前一段漲幅估算延伸目標；實際錨點依趨勢方向設定。",
          priority: "C",
          examSkill: "解讀與交易規劃",
          parameters: "常用 127.2%、161.8%",
          limitations: "不同軟體錨點可能不同。",
          chapterId: "investment-15",
          variables: [["H", "波段高點"], ["L", "波段低點"], ["r", "延伸比例"]]
        },
        {
          id: "technical.ichimoku-tenkan",
          name: "一目均衡表轉換線",
          latex: String.raw`Tenkan=\frac{HH_9+LL_9}{2}`,
          note: "9 期最高與最低價的中點，反映短期價格區間。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "9 期",
          limitations: "需與基準線、雲帶合併解讀。",
          chapterId: "investment-15",
          variables: [["HH_9", "9 期最高價"], ["LL_9", "9 期最低價"]]
        },
        {
          id: "technical.ichimoku-kijun",
          name: "一目均衡表基準線",
          latex: String.raw`Kijun=\frac{HH_{26}+LL_{26}}{2}`,
          note: "26 期價格區間中點，常用來觀察中期趨勢。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "26 期",
          limitations: "參數依市場與週期調整。",
          chapterId: "investment-15",
          variables: [["HH_{26}", "26 期最高價"], ["LL_{26}", "26 期最低價"]]
        },
        {
          id: "technical.ichimoku-span-a",
          name: "一目均衡表先行帶 A",
          latex: String.raw`SpanA_t=\frac{Tenkan+Kijun}{2}`,
          note: "通常向前位移 26 期繪製。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "位移 26 期",
          limitations: "計算時點與圖表位移不同。",
          chapterId: "investment-15",
          variables: [["Tenkan", "轉換線"], ["Kijun", "基準線"]]
        },
        {
          id: "technical.ichimoku-span-b",
          name: "一目均衡表先行帶 B",
          latex: String.raw`SpanB_t=\frac{HH_{52}+LL_{52}}{2}`,
          note: "通常向前位移 26 期繪製；與 Span A 共同構成雲帶。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "52 期、位移 26 期",
          limitations: "日期位移容易錯置。",
          chapterId: "investment-15",
          variables: [["HH_{52}", "52 期最高價"], ["LL_{52}", "52 期最低價"]]
        },
        {
          id: "technical.z-score",
          name: "標準化價格 Z-score",
          latex: String.raw`Z_t=\frac{C_t-SMA_n(C)}{\sigma_n(C)}`,
          note: "衡量價格距離均值幾個標準差；不等於報酬的標準化分數。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "常用 n=20",
          limitations: "價格非定態時，Z 值可能失真。",
          chapterId: "investment-15",
          variables: [["C_t", "第 t 期收盤價"], ["SMA_n", "n 期簡單移動平均"], ["\\sigma_n", "n 期標準差"]]
        },
        {
          id: "technical.relative-strength",
          name: "相對強弱比較（RS）",
          latex: String.raw`RS_t=\frac{P_{A,t}}{P_{B,t}}`,
          note: "比較標的 A 相對標的 B 的價格表現；上升代表 A 相對走強。",
          priority: "B",
          examSkill: "計算與解讀",
          parameters: "可搭配移動平均",
          limitations: "價格基準不同時需先正規化。",
          chapterId: "investment-15",
          variables: [["P_{A,t}", "標的 A 價格"], ["P_{B,t}", "標的 B 價格"]]
        },
        {
          id: "technical.risk-reward",
          name: "風險報酬比（R/R）",
          latex: String.raw`R/R=\frac{\text{預期獲利}}{\text{預期損失}}`,
          note: "以目標價、進場價與停損價估算交易的潛在報酬與風險。",
          priority: "C",
          examSkill: "交易規劃",
          parameters: "依目標價與停損價",
          limitations: "不是預測勝率，也不保證實際損益。",
          chapterId: "investment-15",
          variables: [["預期獲利", "目標價－進場價"], ["預期損失", "進場價－停損價"]]
        }
      ]
    }
  ]
};
