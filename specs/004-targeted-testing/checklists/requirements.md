# Requirements Checklist: 目標式 UI 檢查與全站 Smoke Test 邊界

**Purpose**: 確認每次修改只檢查受影響檔案／路由，且全站 smoke test 仍保留為明確的升級選項。
**Created**: 2026-11-28
**Feature**: `specs/004-targeted-testing/spec.md`

## 測試範圍

- [x] 每次修改先執行 `bash site/scripts/verify.sh`。
- [x] 依修改檔案列出直接受影響的路由與互動。
- [x] 預設使用 `check-ui.js --only <route>`，不執行無關路由。
- [x] `past-exam` 目標包含練習模式下一題檢查。
- [x] `written-exams`／`written-search` 目標包含 sidebar 互動檢查。
- [x] 多個相關路由合併成一個 `--only` 清單，或依序執行。
- [x] 不同時執行兩個 `check-ui.js`。

## 全站 Smoke Test

- [x] 修改 router、全站 CSS／design token、跨頁共用元件、搜尋索引或 `check-ui.js` 本身時，執行完整 `check-ui.js`。
- [x] 使用者明確要求全站 smoke test 時，執行完整本機與正式站檢查。
- [x] 全站 smoke test 指令仍保留在 `documents/qa-playbook.md`。
- [x] 未執行全站 smoke test 時，changelog／checklist 明確標示，不寫成「全站通過」。

## UI 驗證

- [x] 受影響路由涵蓋 390px／1280px、深淺主題。
- [x] 可直接開啟的頁面另測 `file://`。
- [x] 部署後對正式站跑同一個 `--only` 路由。
- [x] 受影響路由 0 `.katex-error`、0 水平溢出、0 console errors。
- [x] 檢查結果記錄指令、路由、viewport／theme 與正式站版本。

## 文件

- [x] `documents/qa-playbook.md` 說明 A／B／C 分級與 `--only` 用法。
- [x] `specs/003-past-exam-practice/spec.md` 的計算／申論題 sidebar 規格已同步。
- [x] `documents/content_review_checklist.md` 記錄本次測試範圍與結果。
- [x] 全站 smoke test 仍可獨立執行，不被目標式流程移除。
