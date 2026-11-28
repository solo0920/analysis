# Feature Specification: 考古題練習庫搜尋、篩選與無閃爍切換

**Feature Branch**: `N/A（靜態網站，直接修改 main）`

**Created**: 2026-11-28

**Updated**: 2026-11-28

**Status**: Implemented

**Input**: User description: 「把題庫模糊搜尋與年度／科目／次別整合成一個 section；按下各按鈕切換條件時螢幕會閃爍，改成不會閃爍，並寫入 spec。」

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 在同一張卡完成搜尋與篩選 (Priority: P1)

考生進入 `#/past-exams` 後，需要在同一個區塊中輸入題庫關鍵字，並用年度、科目、次別縮小範圍；搜尋結果只包含選擇題題庫，且必須套用目前篩選條件。

**Why this priority**: 搜尋與篩選若分散成兩張卡，使用者會誤以為是兩套獨立功能，也不容易理解「搜尋只作用於目前題庫範圍」。

**Independent Test**: 開啟 `#/past-exams`，確認頁面只有一個 `.past-exam-filter-shell`，其中同時包含 `#past-exam-search-input` 與 `#past-exam-filter-rows`；輸入「存續期間」後，結果列在卡片下方，切換科目或次別時結果同步縮小。

**Acceptance Scenarios**:

1. **Given** 使用者位於 `#/past-exams`, **When** 頁面載入完成, **Then** 題庫搜尋框、搜尋範圍、年度、科目、次別與精確篩選都位於同一個 `section` 內。
2. **Given** 使用者輸入題庫關鍵字, **When** 結果出現, **Then** 只顯示選擇題題庫的題目，並套用目前年度／科目／次別與「範圍內精確篩選」。
3. **Given** 使用者切換年度／科目／次別, **When** 篩選狀態改變, **Then** 搜尋字串保留，結果與摘要依新範圍更新。

---

### User Story 2 - 切換條件不閃爍 (Priority: P1)

考生連續切換年度、科目或次別時，畫面不應該整頁重繪、出現全螢幕載入遮罩、跳回頁首或短暫空白；搜尋框與篩選卡應保持在同一位置。

**Why this priority**: 篩選是考古題頁最頻繁的操作；全頁閃爍會中斷比較與練習節奏，也會讓使用者誤以為頁面重新載入。

**Independent Test**: 在 `#/past-exams` 依序點擊年度、科目、次別；確認 `#main` 的子節點、搜尋輸入框、篩選列容器與練習面板容器仍是同一個 DOM 節點，頁面沒有 `.is-routing`、`#route-loader` 不可見，`scrollY` 不變。

**Acceptance Scenarios**:

1. **Given** 使用者在 `#/past-exams` 且已載入目前年度, **When** 點擊其他年度、科目或次別, **Then** 只更新按鈕狀態、摘要、練習面板與搜尋結果，不呼叫整頁 `render()`。
2. **Given** 使用者正在某個捲動位置, **When** 切換篩選條件, **Then** 捲動位置維持不變（誤差 ≤ 1px）。
3. **Given** 使用者正在搜尋, **When** 切換年度或科目, **Then** 搜尋輸入框的值與 DOM 節點保留，結果依新範圍重新排序。
4. **Given** 切換條件, **When** 更新完成, **Then** 文件根節點沒有 `is-routing`、`#route-loader` 沒有顯示，`#main` 的直接子節點沒有被替換。

---

### User Story 3 - 年度題庫按需載入 (Priority: P2)

考生切換到尚未載入的年度時，系統應在背景載入該年度分包，並在原卡片內顯示載入狀態；載入期間仍保留目前畫面，不顯示全螢幕載入遮罩。

**Why this priority**: 年度分包是既有效能策略；若為了避免閃爍而一次載入全部 3,710 題，會失去分包效益。

**Independent Test**: 從預設 115 年切換到 113 年，觀察摘要顯示「正在載入 113 年題庫…」、年度晶片立即變為 113 年；載入完成後摘要與題數更新，過程中沒有 route loader、`#main` 不變、搜尋框節點不變。

**Acceptance Scenarios**:

1. **Given** 目標年度分包尚未載入, **When** 使用者點擊該年度, **Then** 系統透過 `window.__loadPastYear()` 載入分包，並在現有篩選卡內顯示載入文字。
2. **Given** 年度分包載入中, **When** 使用者再次點擊年度或篩選按鈕, **Then** 操作被忽略或排隊，不會同時啟動第二個年度切換。
3. **Given** 年度分包載入失敗, **When** 錯誤發生, **Then** 系統回復原本年度／科目／次別與搜尋狀態，顯示錯誤提示，不整頁重新載入。
4. **Given** 使用者在切換年度前已捲動到篩選卡, **When** 載入完成, **Then** 捲動位置維持不變。

---

### User Story 4 - 搜尋與篩選狀態可分享 (Priority: P3)

考生重新整理頁面時，目前年度應由 URL 還原；搜尋字串與科目／次別不需要寫入 URL，但切換年度後網址必須同步。

**Why this priority**: 年度是既有 deep link 參數；保持 `?year=` 可讓重新整理與外部連結維持正確年度。

**Independent Test**: 切換到 113 年後確認網址為 `#/past-exams?year=113`；重新整理後仍載入 113 年。

**Acceptance Scenarios**:

1. **Given** 使用者切換年度, **When** 狀態更新, **Then** 網址以 `history.replaceState()` 同步為 `#/past-exams?year=<year>`，且不觸發 hashchange 路由重繪。
2. **Given** 使用者重新整理 `#/past-exams?year=113`, **When** 頁面載入, **Then** 預設顯示 113 年題庫。

---

### Edge Cases

- 目標年度分包已載入時，切換必須同步完成，不顯示載入文字。
- 目標年度分包正在載入時，重複點擊不得重複載入或回到舊年度。
- 搜尋字串只在年度／科目／次別切換時保留；年度切換會清除「範圍內精確篩選」與其輸入值。
- 科目在年度切換時保留；次別因屬於年度而重設為「全部次別」。
- `history.replaceState()` 在 `file://` 或受限環境失敗時，畫面仍必須完成切換，不得退回整頁重新載入。
- 載入失敗時，搜尋結果、摘要與練習面板必須回到切換前狀態。
- 搜尋框在第一個字元輸入時只新增／移除篩選卡內的搜尋提示列，不得重建整個篩選列。
- 篩選列載入中不得使用 `opacity` 閃爍或空白遮罩；只用 `aria-busy`、游標與摘要文字表示。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `#/past-exams` 必須只有一個 `.past-exam-filter-shell`，且同時包含題庫搜尋與年度／科目／次別篩選。
- **FR-002**: 搜尋結果必須列在篩選卡之外、卡片下方；結果點選後載入練習面板。
- **FR-003**: 搜尋只索引目前已載入的選擇題題庫；全部年度時為 3,710 題。不得搜尋章節、名詞或申論題。
- **FR-004**: 搜尋必須套用年度、科目、次別與「範圍內精確篩選」。
- **FR-005**: 年度／科目／次別切換必須以原地狀態更新完成，不得呼叫 `render()`、替換 `#main` 子節點、顯示 `#route-loader` 或加上 `is-routing`。
- **FR-006**: 年度／科目／次別切換必須保留搜尋輸入框節點與搜尋字串、篩選列容器節點、練習面板容器節點與捲動位置。
- **FR-007**: 年度切換必須以 `history.replaceState()` 同步 `?year=`，不得使用會觸發 hashchange 的 `location.hash` 導覽。
- **FR-008**: 年度分包必須透過 `window.__loadPastYear()` 載入；載入期間在現有摘要顯示載入文字，並以 `aria-busy` 標記篩選列。
- **FR-009**: 年度切換不得清除科目；次別必須重設為「全部次別」；「範圍內精確篩選」與其輸入值必須清除。
- **FR-010**: 載入失敗時必須回復切換前的年度、科目、次別、精確關鍵字、索引與捲動位置，並顯示錯誤提示。
- **FR-011**: 搜尋字串在第一個字元輸入或清除時，只能更新搜尋提示列與結果，不得重建整個篩選列。
- **FR-012**: `check-ui.js` 必須包含無閃爍回歸檢查：切換年度後 `#main` 子節點、搜尋框、篩選列、面板節點不變，且沒有 route loader、`scrollY` 誤差 ≤ 1px。

### Key Entities

- **practiceState**: 目前年度、科目、次別、精確關鍵字、模式、索引與作答狀態。
- **PAST_EXAMS_YEAR_BUNDLES**: 以年度為鍵的分包資料；`__loadPastYear()` 按需載入。
- **PAST_EXAMS_FULL**: 全部年度題庫；載入後可跳過後續年度分包。
- **filter rows**: `#past-exam-filter-rows`，年度／科目／次別／精確篩選與摘要的容器。
- **search jumpbar**: 搜尋提示列，獨立於篩選列，避免搜尋字串變動時重建篩選列。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 在 390px／1280px、深淺主題、`file://` 與正式站，切換年度／科目／次別時 `#main` 直接子節點變更次數為 0。
- **SC-002**: 同上情境，route loader 顯示次數為 0、`is-routing` 出現次數為 0。
- **SC-003**: 切換前後 `scrollY` 差異 ≤ 1px；搜尋輸入框與篩選列容器 DOM 身分不變。
- **SC-004**: 從預設 115 年切換到 113 年時，年度晶片立即更新，載入完成後摘要顯示 113 年題數；整個過程沒有全頁空白。
- **SC-005**: 「存續期間」在 115 年為 3 筆、全部年度為 58 筆；搜尋字串在年度切換後保留。
- **SC-006**: `check-ui.js` 現有 52 組路由／viewport／theme 檢查與新增無閃爍檢查全數通過。

## Out of Scope

- 不改變題目內容、答案、解析或年度分包格式。
- 不把搜尋索引拆分為多檔；全站搜尋索引維持單一完整檔。
- 不新增後端 API、即時同步或跨裝置練習紀錄。
- 不把科目／次別／搜尋字串寫入 URL；只有年度維持 `?year=`。
