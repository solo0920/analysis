# QA 分級與快速流程

更新：2026-11-28

正式規範：[`specs/004-targeted-testing/spec.md`](../specs/004-targeted-testing/spec.md)。

目標：小改動不要每次都跑完整 56 組 `check-ui.js`。先用 `verify.sh` 把內容與建置錯誤擋掉，再依變更範圍選擇瀏覽器檢查。

## 分級

| 等級 | 適用 | 指令 | 參考時間 |
| --- | --- | --- | --- |
| A：內容文字 | 解析、文案、錯字、單一題目 | `bash site/scripts/verify.sh`；必要時 `check-ui.js --only <route>` | verify 約 1.6 秒 |
| B：單一 UI 元件 | 按鈕、卡片、hero、單一頁面版面 | `verify.sh` ＋ `check-ui.js --only <route>`（390／1280、深淺主題）＋ `file://` ＋正式站 `--only` | 本機約 2–10 秒；正式站約 5–15 秒 |
| C：路由／全域版面 | router、全站 CSS、搜尋／篩選、多頁共用元件 | 完整 `check-ui.js`（本機＋正式站） | 本機約 25 秒；正式站約 92 秒 |

## 常用指令

只跑指定路由與相關互動檢查（不執行其他路由的內容、搜尋、申論題 smoke test）：

```bash
node site/scripts/check-ui.js --only past-exam
```

指定多個路由：

```bash
node site/scripts/check-ui.js --only subject,chapter
```

正式站指定路由：

```bash
node site/scripts/check-ui.js --base https://analysis.ragdemo.win --remote --only past-exam
```

完整回歸（路由／全域版面變更才需要）：

```bash
node site/scripts/check-ui.js
node site/scripts/check-ui.js --base https://analysis.ragdemo.win --remote
```

## 建議流程

1. 修改前先用 `grep` 找到實際渲染函式，不要先全域搜尋所有文件。
2. 改完先跑 `bash site/scripts/verify.sh`；失敗就先修，不要啟動 Chrome。
3. 依上表選 A／B／C；B 級先用 `--only` 本機檢查，再部署後用 `--only` 檢查正式站。
4. `file://` 只需測受影響路由；不需要每次重跑全部頁面。
5. 同一次修改的程式、測試與 changelog 放在同一個 commit，避免多觸發一次部署。
6. 部署後先跑 `bash site/scripts/check-live.sh`；需要時再跑正式站 `check-ui.js --only`。

## 注意

- `--only` 只跑指定路由；`past-exam` 會加跑練習模式「下一題」互動檢查，`written-exams`／`written-search` 會加跑計算／申論題 sidebar 互動檢查。
- `--quick` 只跑 1280px 淺色路由；需要 390px／深色時不要加 `--quick`。
- 完整 `check-ui.js` 仍是路由、全站 CSS、搜尋／篩選與多頁共用元件的必跑項目。
- 若 `check-ui.js` 出現 console error 或 selector missing，先重跑一次確認是否為網路瞬斷；`ERR_CONNECTION_RESET` 已有一次重試。
- `check-ui.js` 現在一律停用瀏覽器快取，避免本機測試讀到舊 CSS。
- 不要同時執行兩個 `check-ui.js`；它們會共用同一個 Chrome CDP page，互相導航會造成 selector missing 的假失敗。
