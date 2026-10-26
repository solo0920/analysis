# 財務分析總架構圖
```text
營業收入 Revenue / Sales
        │
        ├──► 營收成長率 = 本期營業收入/去年營業收入-1
        ├─ 減：銷貨成本 (Cost of Goods Sold, COGS)
        ▼
毛利 Gross Profit
        │
        ├──► 毛利率 (Gross Margin) = 毛利 ÷ 營業收入
        │
        ├─ 減：營業費用 (Operating Expenses)
        │      ├─ 銷售費用 (Selling Expenses)
        │      ├─ 管理費用 (General & Administrative Expenses)
        │      └─ 研發費用 (Research & Development Expenses)
        ▼
營業利益 EBIT (Operating Income)
        │
        ├──► 營業利益率 (Operating Margin) = EBIT ÷ 營業收入
        ├──► 利息保障倍數 (Interest Coverage) = EBIT ÷ Interest Expense
        │
        ├─ ＋ 利息收入 (Interest Income)
        ├─ － 利息費用 (Interest Expense)
        ├─ ± 其他收益及損失 (Other Gains/Losses)
        ▼
稅前淨利 EBT (Earnings Before Tax)
        │
        ├──► 有效稅率 Effective Tax Rate = Income Tax ÷ EBT
        ├─ － 所得稅費用 (Income Tax Expense)
        ▼
本期淨利 Net Income (NI)
        │
        ├──► 淨利率 (Net Profit Margin) = NI ÷ Revenue
        │
        ├──► EPS (Earnings Per Share) = (NI − Preferred Dividend) ÷ Weighted Average Common Shares
        ├──► P/E Ratio = Market Price Per Share ÷ EPS
        ├──► Book Value Per Share = Shareholders' Equity ÷ Common Shares Outstanding
        ├──► P/B Ratio = Market Price Per Share ÷ Book Value Per Share
        │
        ├──► ROA (Return on Assets) = NI ÷ Average Total Assets
        ├──► ROE (Return on Equity) = NI ÷ Average Shareholders' Equity
        │
        ├──► 保留盈餘增加 = NI − 現金股利
        ├──► 保留盈餘率 Retention Ratio = (NI − Dividend) ÷ NI
        ├──► 股利支付率 Dividend Payout Ratio = Dividend ÷ NI
        ├──► 股東權益增加(若未全部配息)
        └──► 自由現金流分析、企業價值評價、杜邦分析的起點
```


# DuPont Analysis

杜邦分析（DuPont Analysis）是將股東權益報酬率（ROE）拆解成不同的財務指標，藉此判斷企業獲利能力來自淨利率、資產運用效率，還是財務槓桿。

## 一、三階段杜邦分析（Three-Step DuPont）

將 ROE 拆解為三個因素：

\[
\boxed{
ROE=
\underbrace{\frac{稅後淨利}{營業收入}}_{\text{淨利率}}
\times
\underbrace{\frac{營業收入}{平均總資產}}_{\text{總資產週轉率}}
\times
\underbrace{\frac{平均總資產}{平均股東權益}}_{\text{權益乘數}}
}
\]

- 淨利率（Net Profit Margin）：\(\frac{稅後淨利}{營業收入}\)，衡量企業的獲利能力與成本控制。
- 總資產週轉率（Total Asset Turnover）：\(\frac{營業收入}{平均總資產}\)，衡量企業運用資產創造營收的效率。
- 權益乘數（Equity Multiplier）：\(\frac{平均總資產}{平均股東權益}\)，衡量財務槓桿程度；數值愈高，通常財務風險也愈高。

三者相乘 = ROE。

### 三階段分析重點

| 指標變化 | 可能代表的意義 |
| --- | --- |
| 淨利率上升 | 成本降低、產品售價提高或獲利能力改善 |
| 總資產週轉率上升 | 資產使用效率提高 |
| 權益乘數上升 | 財務槓桿提高，可能增加 ROE，也會增加風險 |

## 二、五階段杜邦分析（Five-Step DuPont）

五階段杜邦分析進一步把淨利率拆開，分析企業的營業獲利、利息負擔、所得稅負擔，並保留資產效率及財務槓桿兩項因素。

\[
\boxed{
ROE=
\frac{稅後淨利}{稅前淨利}
\times
\frac{稅前淨利}{EBIT}
\times
\frac{EBIT}{營業收入}
\times
\frac{營業收入}{平均總資產}
\times
\frac{平均總資產}{平均股東權益}
}
\]

其中，EBIT 為息稅前利益（Earnings Before Interest and Taxes）。

1. 稅負負擔（Tax Burden）：\(\frac{稅後淨利}{稅前淨利}\)，反映所得稅對企業稅後獲利的影響。
2. 利息負擔（Interest Burden）：\(\frac{稅前淨利}{EBIT}\)，反映利息等非營業項目對獲利的影響；在一般情況下，利息費用愈高，此比率愈低。
3. EBIT 利潤率（EBIT Margin）：\(\frac{EBIT}{營業收入}\)，衡量企業在扣除營業成本與營業費用後、扣除利息與所得稅前的獲利能力。
4. 總資產週轉率（Asset Turnover）：\(\frac{營業收入}{平均總資產}\)，衡量資產創造營收的效率。
5. 權益乘數（Equity Multiplier）：\(\frac{平均總資產}{平均股東權益}\)，衡量財務槓桿對股東權益報酬率的影響。

五者相乘 = ROE。

## 三、三階段與五階段比較

| 比較項目 | 三階段杜邦 | 五階段杜邦 |
| --- | --- | --- |
| 第一項 | 淨利率 | 稅負負擔 |
| 第二項 | 總資產週轉率 | 利息負擔 |
| 第三項 | 權益乘數 | EBIT 利潤率 |
| 第四項 | — | 總資產週轉率 |
| 第五項 | — | 權益乘數 |
| 分析重點 | 獲利、效率、槓桿 | 稅負、利息、營業獲利、效率、槓桿 |
| 優點 | 簡單、容易比較 | 能更深入找出 ROE 變動原因 |

## 四、考試記憶口訣

- 三階段：利、轉、槓。淨利率 × 資產週轉率 × 權益乘數。
- 五階段：稅、息、營、轉、槓。稅負負擔 × 利息負擔 × EBIT 利潤率 × 資產週轉率 × 權益乘數。

核心觀念：三階段適合快速判斷 ROE 的來源；五階段則能進一步區分稅負、利息及營業獲利對 ROE 的影響。考試作答時，應注意使用一致的會計口徑，資產與股東權益通常採用平均餘額。

# 四大財務報表連結
##
```text
Income Statement
Revenue → Gross Profit → EBIT → EBT → NI
                     │
                     ▼
              保留盈餘增加
                     │
                     ▼
Balance Sheet
Assets / Liabilities / Equity

                     │
                     ▼

Cash Flow Statement
NI → CFO (營業活動現金流)
```
