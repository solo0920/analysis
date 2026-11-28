# Feature Specification: 目標式 UI 檢查與全站 Smoke Test 邊界

**Feature Branch**: `N/A（靜態網站，直接修改 main）`

**Created**: 2026-11-28

**Updated**: 2026-11-28

**Status**: Implemented

**Input**: User description: 「將測試限制在目前編輯的檔案及相關檔案，僅在全站 smoke test 時才作全部測試，寫入 spec。」

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 只檢查本次修改的檔案與相關路由 (Priority: P1)

開發者修改單一頁面或單一元件時，只需要驗證本次改動的檔案、直接受影響的路由與必要互動；不要因為一個小改動就重跑全站 56 組路由。

**Why priority**: 全站 UI smoke test 成本高（本機約 25–31 秒、正式站約 92 秒），但多數修改只影響單一頁面。把測試縮到受影響範圍，可以保留回歸保護，同時避免無謂等待。

**Independent Test**: 修改 `#/past-exams/written` 的搜尋 sidebar 後，執行 `bash site/scripts/verify.sh` 與 `node site/scripts/check-ui.js --only written-exams`；確認只跑 `written-exams` 的 390／1280、深淺主題與 sidebar 互動，不跑首頁、章節、諾貝爾等其他路由。

**Acceptance Scenarios**:

1. **Given** 本次只修改 `site/assets/app.js` 的計算／申論題頁，**When** 執行 UI 檢查，**Then** 只跑 `written-exams` 路由與其 sidebar 互動檢查。
2. **Given** 本次只修改某章節內容檔，**When** 執行 UI 檢查，**Then** 只跑該章節路由；若內容不影響 DOM 結構，可只跑 `verify.sh`。
3. **Given** 本次修改共用 CSS 或 router，**When** 影響範圍無法縮小到單一路由，**Then** 先跑受影響的多個路由；仍無法確認時才升級為全站 smoke test。
4. **Given** 本次只修改文件或建置腳本，**When** 不需要瀏覽器驗證，**Then** 只跑 `verify.sh` 與相關語法檢查，不啟動 Chrome。

---

### User Story 2 - 全站 Smoke Test 仍是明確可用的升級選項 (Priority: P1)

全站 smoke test 不再是小改動的預設流程，但當修改 router、全站樣式、搜尋索引、共用元件或使用者明確要求時，仍必須能一次跑完整 56 組。

**Why priority**: 目標式檢查不能取代跨頁回歸；全站 smoke test 必須保留，只是改為「有需要才跑」。

**Independent Test**: 執行 `node site/scripts/check-ui.js`，確認 56 組路由／viewport／theme 全部執行；執行 `node site/scripts/check-ui.js --base https://analysis.ragdemo.win --remote` 可對正式站跑完整 smoke test。

**Acceptance Scenarios**:

1. **Given** 修改 router、全站 CSS 或跨頁共用元件，**When** 完成目標式檢查，**Then** 再跑一次完整 `check-ui.js`。
2. **Given** 使用者明確要求「全站 smoke test」，**When** 執行檢查，**Then** 跑完整本機與正式站版本。
3. **Given** 本次沒有跑全站 smoke test，**When** 記錄結果，**Then** 明確寫出「未執行全站 smoke test」與已執行的目標路由。

---

### User Story 3 - 測試結果可追溯 (Priority: P2)

每次修改都要能看出「測了哪些檔案、哪些路由、哪些 viewport／theme，以及哪些沒有測」，避免把目標式檢查誤當成完整回歸。

**Why priority**: 目標式檢查的風險是漏測；清楚記錄範圍與未測項目，才能在需要時補跑全站 smoke test。

**Independent Test**: 查看 `documents/content_review_checklist.md` 或 changelog，能看到本次執行的指令、路由、viewports、themes、`file://`／正式站結果，以及是否執行全站 smoke test。

**Acceptance Scenarios**:

1. **Given** 本次執行目標式檢查，**When** 更新 changelog／checklist，**Then** 記錄 `--only` 路由、390／1280、深淺主題、`file://` 與正式站結果。
2. **Given** 本次未跑全站 smoke test，**When** 記錄結果，**Then** 明確標示未執行，不寫成「全站通過」。
3. **Given** 本次有跑全站 smoke test，**When** 記錄結果，**Then** 記錄 56 組通過與正式站版本。

---

### Edge Cases

- 修改 `site/assets/app.js` 但只影響單一 render 函式：仍以受影響路由為範圍；若同時改到共用 helper，需把呼叫該 helper 的路由列入相關路由。
- 修改 `site/assets/styles.css`：先跑受影響頁面；若選擇器跨多頁或改到 design token，升級為全站 smoke test。
- 修改搜尋索引或 router：視為跨頁變更，直接跑全站 smoke test。
- 修改 `site/scripts/check-ui.js`：至少跑一次完整 `--only` 目標與一次完整 smoke test，確認測試本身沒有壞。
- 修改 `documents/**`、`specs/**`、根目錄 README：不需要瀏覽器檢查；跑 `verify.sh` 或相關文件檢查即可。
- 正式站檢查只跑受影響路由；不要為了小改動重跑正式站 56 組。
- 不可同時執行兩個 `check-ui.js`；它們共用同一個 Chrome CDP page，會互相導航造成假失敗。
- 目標路由沒有互動檢查時，仍需檢查該路由在 390／1280、深淺主題的 selector、`.katex-error`、水平溢出與 console errors。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 每次修改都必須先執行 `bash site/scripts/verify.sh`；建置、內容、SEO 或連結失敗時不得進入瀏覽器檢查。
- **FR-002**: 預設 UI 檢查範圍必須是「本次修改的檔案」＋「直接受影響的路由與互動」，不得預設執行全站 56 組。
- **FR-003**: 目標式檢查必須使用 `node site/scripts/check-ui.js --only <route>`；可重複指定多個相關路由，例如 `--only subject,chapter`。
- **FR-004**: `past-exam` 目標必須包含練習模式「顯示答案／下一題／上一題」互動檢查；`written-exams`／`written-search` 目標必須包含計算／申論題 sidebar 互動檢查。
- **FR-005**: 只有在以下情況才執行完整 `check-ui.js`（本機與／或正式站）：修改 router、全站 CSS／design token、跨頁共用元件、搜尋索引、`check-ui.js` 本身，或使用者明確要求全站 smoke test。
- **FR-006**: UI 變更的目標式檢查必須涵蓋 390px／1280px、深淺主題；可直接開啟的頁面另需 `file://` 檢查，部署後另需正式站同路由檢查。
- **FR-007**: changelog／checklist 必須記錄本次執行的指令、路由、viewport／theme、`file://`／正式站結果，以及是否執行全站 smoke test；未執行時不得寫成「全站通過」。
- **FR-008**: 不得同時執行兩個 `check-ui.js`；需要多個範圍時依序執行，或合併成一個 `--only` 清單。
- **FR-009**: 全站 smoke test 指令與正式站版本必須保留在文件與 `documents/qa-playbook.md`，不得因目標式流程而移除。
- **FR-010**: GitHub Actions 部署前的 `verify.sh` 不受 UI 檢查範圍影響；完整瀏覽器 smoke test 仍是部署前／後的手動檢查。

### Key Entities

- **changed file set**：本次修改的檔案清單，用來判斷受影響路由與是否需要全站 smoke test。
- **route map**：`check-ui.js` 的 `ROUTES`；每個項目包含名稱、路徑、selector 與預期數量。
- **targeted check**：`check-ui.js --only <route>`，只跑指定路由與其相關互動。
- **full smoke test**：完整 `check-ui.js` 56 組路由／viewport／theme 檢查。
- **related interaction**：`past-exam` 的下一題檢查、`written-exams` 的 sidebar 檢查等，不屬於一般路由 selector 檢查。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 單一頁面小改動的預設流程只執行受影響路由，不執行完整 56 組；本機目標式檢查通常在 10 秒內完成。
- **SC-002**: `--only written-exams` 本機約 9–10 秒、正式站約 16 秒；`--only past-exam` 本機約 2 秒。
- **SC-003**: 受影響路由在 390／1280、深淺主題、`file://` 與正式站皆通過，且 0 `.katex-error`、0 水平溢出。
- **SC-004**: 全站 smoke test 仍可在需要時執行，本機 56 組通過、正式站版本與 `version.json` 一致。
- **SC-005**: 每次修改的 changelog／checklist 都能看出測試範圍與是否執行全站 smoke test。

## Out of Scope

- 不移除全站 smoke test，也不把完整 56 組從 `check-ui.js` 刪除。
- 不以目標式檢查取代 `verify.sh`、內容驗證、SEO 或連結檢查。
- 不自動推論所有受影響路由；受影響範圍仍由修改者依檔案與功能判斷。
- 不把完整瀏覽器 smoke test 放進 GitHub Actions 的每次部署。

## Assumptions

- `check-ui.js --only` 已支援指定路由，且會在 `past-exam`／`written-exams` 時加跑對應互動檢查。
- 全站 smoke test 指令為 `node site/scripts/check-ui.js` 與 `node site/scripts/check-ui.js --base https://analysis.ragdemo.win --remote`。
- 修改者會在 changelog／checklist 留下測試範圍；沒有留下時，視為未完成驗證。
