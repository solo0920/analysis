# PDF 數學公式待核對清單

建立：2026-10-23

用途：PDF 轉文字時，數學式、上下標、表格與變數常被壓平或錯置。以下依「公式結構明顯異常」、「表格／圖形被壓成文字」、「已依上下文重建」分組，列出最值得優先對照原始 PDF 的計算／申論題。這些項目多數尚未逐題改寫，請以原始試題為準。

## 2026-10-23 批次處理結果（115 → 107）

已完成 29 次考試、3,710 題選擇題與 348 題計算／申論題的批次比對。方法是先用 PDF 文字層做全量文字與數字比對，再將公式密集、表格型、低相似度與答案異常的頁面轉成 300 dpi 影像逐題目視核對。

### 已修正

| 題目 | 修正內容 |
| --- | --- |
| `107Q4-law-20` | 官方答案為 A（2 日），原網站誤記為 C，已更正。 |
| `107Q4-macro-written-2` | 原 PDF 資本存量為 `K_0=100`，原網站誤記為 `1,000`；題幹與參考解答已同步修正。 |
| `109Q1-macro-written-2` | `Md P` 改為 `\(M^d/P\)`，`πe` 改為 `\(\pi^e\)`。 |
| `110Q1-macro-written-3` | Unicode 數學斜體改為 KaTeX，`πe` 改為 `\(\pi^e\)`，`y*` 改為 `\(y^*\)`。 |
| `111Q1-macro-written-2` | `dY` 改為 `\(Y_d\)`，`Ms`／`Md` 改為 `\(M^s\)`／`\(M^d\)`。 |
| `111Q3-macro-written-1` | 重建 `SRAS: Y=\bar Y+P-P^e`、Okun's Law 與 `\bar Y=750`、`\bar u=0.05`、`P^e=40`。 |
| `112Q1-investment-26` | 選項 A、C 的 `√12` 在 PDF 轉文字時遺失，已依原題補回。 |
| `112Q3-macro-written-1` | `Y=AK0.5N0.5` 改為 `\(Y=A K^{0.5}N^{0.5}\)`。 |
| `113Q2-macro-written-2` | `dY` 改為 `\(Y_d\)`，`Md`／`Ms` 改為 `\(M^d\)`／`\(M^s\)`。 |
| `113Q3-investment-written-2`、`-3` | `E(RA)`、`V(RA)`、`COV(RA RB)` 改為 `\(E(R_A)\)`、`\(V(R_A)\)`、`\(\operatorname{Cov}(R_A,R_B)\)` 等。 |
| `114Q1-macro-written-2` | `Y = Α𝐾0.3𝑁0.7` 改為 `\(Y=A K^{0.3}N^{0.7}\)`。 |
| `114Q2-investment-written-1` | `E(rS)`、`σS`、`E(rB)`、`σB` 改為下標，共變數矩陣補上 `%`。 |
| `111Q2-accounting-28`、`113Q1-accounting-12`、`113Q1-accounting-27` | 私人使用字元（Wingdings 圓圈數字）改為 ①–⑤。 |

### 已確認原題正確、無需修改

- `107Q2-macro-written-1` 的 `M^d=600+0.5Y-150r+P` 確實有 `+P`，不是漏字。
- `108Q1-macro-written-2` 的 `\bar M/P_0=l(r)+k(y)` 與原題一致。
- `108Q1-investment-written-2`、`108Q4-investment-written-2`、`109Q3-investment-written-2`、`109Q4-investment-written-2`、`115Q1-investment-written-1` 的表格數值與原題一致，僅版面被壓平。
- `115Q2-macro-written-3` 的梭羅生產函數確認為 `\(Y=A L^{\alpha}K^{1-\alpha}\)`。

### 答案核對

- 3,710 題選擇題逐題比對證基會公告答案；單一答案題全部一致。
- 多答案題保留原本官方可接受答案：`108Q3-law-28` C、D；`108Q3-accounting-28` B、D；`109Q1-law-30` B、D；`112Q3-investment-16` 與 `112Q3-accounting-15` A–D 均給分；`114Q1-macro-14` B、C。
- 唯一答案錯誤為 `107Q4-law-20`，已更正為 A。

### 驗證

- `validate-content.js`：114,357 項、失敗 0。
- 靜態 KaTeX 稽核：4,770 個可轉換子句、0 編譯失敗。
- Chrome CDP：33 個全域頁面狀態＋8 個修正題目 390px 狀態，0 頁面水平溢出、0 console errors、0 `.katex-error`。

## 一、公式結構明顯異常（優先看）

| 題目 ID | 目前文字（節錄） | 可能問題 |
| --- | --- | --- |
| `107Q2-investment-written-3` | `即期匯率為 1 $＝30NT` | 幣別與匯率寫法錯亂，可能是 `1 USD = 30 NTD` 或 `1 美元＝30 新臺幣`。 |
| `107Q2-macro-written-1` | `Md=600+0.5Y-150r +P` | `+P` 位置可疑；可能是 `M^d/P = 600+0.5Y-150r`，或 `M^d = P(600+0.5Y-150r)`。 |
| `109Q1-macro-written-2` | `Md P = 1,000 + 0.2y-1,000(r + πe)` | 可能是 `M^d/P = ...`；`πe` 應為 `π^e`。 |
| `111Q3-macro-written-1` | `SRAS: Y = + P - Pe`、`Okun's Law: (Y - )/ = -2(u - )` | 等號後缺項；應有 `Y_f`、`u_n` 等變數，SRAS 也缺斜率或常數。 |
| `112Q3-macro-written-1` | `Y = AK0.5N0.5` | 指數 0.5 未上標；應為 `Y=A K^{0.5}N^{0.5}`。 |
| `114Q1-macro-written-2` | `Y = Α𝐾0.3𝑁0.7` | `Α` 是希臘 Alpha，且 0.3／0.7 未上標；應為 `Y=A K^{0.3}N^{0.7}`（或依 L／K 慣例改寫）。 |
| `111Q1-macro-written-2` | `C = 200 + 0.8 dY` | `dY` 應為可支配所得 `Y_d`。 |
| `113Q2-macro-written-2` | `C = 150 + 0.8 dY`、`𝑀𝑑`、`𝑀𝑠` | `dY`、下標與 Unicode 數學字型混用；應為 `Y_d`、`M^d`、`M^s`。 |
| `113Q3-investment-written-2` | `E(R A)=10%`、`COV(RA RB)= -0.01` | 變數下標與逗號缺失；應為 `E(R_A)`、`\operatorname{Cov}(R_A,R_B)`。 |
| `114Q2-investment-written-1` | `E(rS)=20%、σS=30%` | `rS`、`σS` 應為 `r_S`、`\sigma_S`（或 `E(R_S)`、`\sigma_S`）。 |

## 二、表格／圖形被壓成文字

| 題目 ID | 目前文字（節錄） | 可能問題 |
| --- | --- | --- |
| `108Q1-investment-written-2` | `121 110 100 104.5 95 90.25`、`Cuu Cu C Cud=Cdu Cd Cdd` | 二元樹價格與選擇權價值被壓成單行，節點關係和欄位可能錯位。 |
| `109Q3-investment-written-2` | `上漲 上漲 120 元 上漲 100 元 ΔV=...` | 避險損益表被壓成文字，需確認「現貨／期貨／組合」欄位與正負號。 |
| `108Q4-investment-written-2` | `股票 E $100 8,000 1.2 股票 G $20 60,000 0.7` | 表格欄位可能錯位；需確認收盤價、股數、β 值的對應。 |
| `109Q4-investment-written-2` | `類股 市場價值 β 值 E. 電子 500 萬 0.9 ...` | 表格欄位可能錯位；`E(𝑅𝑚)`、`σ(𝑅𝑚)` 也使用 Unicode 數學字型。 |

## 三、已依上下文重建，請優先核對

| 題目 ID | 目前處理 | 需要核對 |
| --- | --- | --- |
| `107Q4-macro-written-2` | 已重建為 `\(y=5N-0.01N^2+K_0\)`、`\(N^s=100+100(W/P)\)`、`\(L_F=220\)`、`\(K_0=1000\)`。 | 這是依 104 年類似題重建；請確認 107 年原題的生產函數、勞動供給與常數是否完全相同。 |
| `108Q1-macro-written-2` | 已重建為 `\(\bar M/P_0=l(r)+k(y)\)`、`\(dy/dg\)`、`\(dy/dm\)`。 | 請確認原題是 `M/P` 還是 `M`，以及 `P_0` 的定義。 |
| `115Q2-macro-written-3` | 已改為 `\(Y=A L^{\alpha}K^{1-\alpha}\)`。 | 請確認原 PDF 的變數順序、指數順序與勞動變數是否為 L。 |

## 四、其他 Unicode 數學字型

| 題目 ID | 目前文字（節錄） | 可能問題 |
| --- | --- | --- |
| `110Q1-macro-written-3` | `𝐶 = 1,200 + 0.8𝑦 − 3,000𝑟`、`𝐼 = 500 − 2,000𝑖`、`i = r + 𝜋𝑒` | 使用 Unicode 數學斜體；`πe` 應為 `π^e`，`𝑦∗` 應為 `y^*`。 |
| `109Q4-investment-written-2` | `E(𝑅𝑚) = 11%`、`σ(𝑅𝑚) =30%`、`(𝑅𝑓) = 1%` | Unicode 數學斜體與下標混用；應為 `E(R_m)`、`\sigma(R_m)`、`R_f`。 |

## 備註

- 這份清單以計算／申論題為主，因為公式密度最高；選擇題若需要，可再用同一套規則批次掃描。
- 自動 KaTeX 轉換只處理顯示，不會自動修正 PDF 的語意錯誤；例如 `AK0.5N0.5` 即使可轉成數學，也仍需要人工確認指數與變數。
- 目前已修正的項目：`107Q4-macro-written-2`、`108Q1-macro-written-2`、`115Q2-macro-written-3` 的公式結構，以及 `109Q3-investment-written-1`、`109Q3-investment-written-2`、`114Q1-accounting-written-3`、`115Q2-macro-written-3` 的破損字元。其餘列出的項目仍建議對照原始 PDF。
