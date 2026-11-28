# Requirements Checklist: 考古題練習庫搜尋、篩選與無閃爍切換

**Purpose**: 確認 `#/past-exams` 的搜尋、篩選與原地更新符合規格，且沒有以整頁重繪換取功能。
**Created**: 2026-11-28
**Feature**: `specs/003-past-exam-practice/spec.md`

## 結構

- [x] 頁面只有一個 `.past-exam-filter-shell`，同時包含 `#past-exam-search-input` 與 `#past-exam-filter-rows`。
- [x] 搜尋結果列在篩選卡下方，不插入搜尋框與篩選列之間。
- [x] 搜尋提示列獨立於 `#past-exam-filter-rows`，輸入或清除搜尋字串不重建篩選列。

## 無閃爍切換

- [x] 年度／科目／次別切換不呼叫 `render()`。
- [x] 切換時 `#main` 直接子節點不變。
- [x] 切換時 `#past-exam-search-input`、`#past-exam-filter-rows`、`#past-exam-panel` 的 DOM 身分不變。
- [x] 切換時不出現 `#route-loader` 或 `documentElement.is-routing`。
- [x] 切換前後 `scrollY` 差異 ≤ 1px。
- [x] 年度／科目／次別只更新現有按鈕的 `is-active`／`aria-pressed` 與選單選項。

## 年度分包

- [x] 尚未載入的年度透過 `window.__loadPastYear()` 載入。
- [x] 載入期間摘要在原位顯示「正在載入…題庫…」。
- [x] 載入期間篩選列有 `aria-busy` 與 `is-loading`，不使用全螢幕遮罩。
- [x] 載入完成後才 `hydrateData()` 並更新摘要、面板與搜尋結果。
- [x] 載入失敗會回復切換前狀態並顯示錯誤提示。

## 狀態與 URL

- [x] 年度切換以 `history.replaceState()` 同步 `?year=`。
- [x] 年度切換不觸發 hashchange 路由重繪。
- [x] 年度切換保留科目，次別重設為「全部次別」。
- [x] 年度切換清除「範圍內精確篩選」與其輸入值。
- [x] 年度切換保留搜尋字串與搜尋結果查詢。
- [x] 重新整理年度 deep link 可載入對應年度。

## 計算／申論題 Sidebar

- [x] 未搜尋時左側 `#written-search-results-panel` 顯示目前篩選的 348 題，右側 `#written-search-detail` 顯示第一題題卡。
- [x] 搜尋後 sidebar 改顯示搜尋結果；清除搜尋後恢復目前的完整題目清單。
- [x] 不再有 `#written-list` 長列表；題目與題卡固定使用 sidebar／detail 版面。
- [x] 預設選取第一筆；點選其他題目會更新右側題卡、`is-active` 與 `aria-current`。
- [x] 點選題目會展開該題參考解答；搜尋字串保留。
- [x] 1280px sidebar 在左、390px 上下堆疊且 sidebar 可捲動；390px 點選後捲到題卡。
- [x] sidebar 與右側題卡不會同時產生重複的 `written-<id>`。

## 驗證

- [x] 390px／1280px、深淺主題與 `file://` 實測通過。
- [x] 0 `.katex-error`、0 水平溢出。
- [x] 目標式檢查 `check-ui.js --only written-exams` 通過（含 sidebar 互動）。
- [x] 完整 `check-ui.js` 56 組路由／viewport／theme 檢查通過。
- [x] 完整檢查只在需要全站 smoke test 時執行；本次 sidebar 變更的預設範圍為 `--only written-exams`。
- [x] 規格與 `documents/architecture.md` 已同步。
- [x] 測試範圍規範見 `specs/004-targeted-testing/spec.md`。
