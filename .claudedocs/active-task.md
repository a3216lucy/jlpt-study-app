# 考古題改版：練習模式／實際演練＋作答紀錄（2026-11-18 開始）

完整計畫：`/Users/Kimi/.claude/plans/goofy-stargazing-ullman.md`（已核准）

## 已確認決定
- N3 實演計時照官方分段（語彙 30 分→文法＋讀解 70 分，前段鎖定）；N2 一段 105 分；聽解不在 app 內
- 練習中途離開保存進度可續做；練習開始前可選範圍（整回／語彙／文法／読解／單一大題／只練上次錯題）
- 回顧頁分頁：錯題｜單字清單｜文法清單（清單由錯題解析彙整，有對到單字頁／句型頁才給連結）
- 編號：同考卷同模式遞增（不分範圍），範圍用 scopeKey 標籤；「還沒掌握」＝每題以最近一次完成的練習為準，實演不計入；範圍 `unmastered` 取代原 `wrong`
- 新集合 `users/{uid}/examAttempts`；完成後仍寫舊 `examHistory`（首頁／個人中心／streak 相容）
- ⚠ Firestore Security Rules 不在 repo，需請使用者確認允許 `users/{uid}/examAttempts`

## 進度
- [x] Phase 0：`<u>` 顯示修正（3 處改 `[innerHTML]`）
- [x] Phase 1：exam-timing、explanation.util、attempt.util、review-lists.util＋Karma 測試（18 個通過；跑法 `npx ng test --watch=false --browsers=ChromeHeadless`）
- [x] Phase 2：練習模式（store、past-exam-question、start-dialog、ExamAttemptService）
- [x] Phase 3：實際演練（timer、navigator、交卷確認、自動交卷）
- [x] Phase 4：主畫面歷次紀錄＋回顧頁（含單字／文法清單）
- [x] Phase 5：CLAUDE.md 更新、RWD 檢查、build＋測試

## 注意
- 題庫 `explanation` 格式（N2 全部、N3 部分不同）：`💡 重點` / `正確順序：` / `【選項解析】`（○1 / ×2 …：說明）/ `【全文中譯】`；舊 N3 格式不符時 parseExplanation 退回純文字
- dev server 需 Google 登入，我無法代登；UI 走查需使用者實機確認

## 狀態（實作完成，待驗證）
- build 0 錯誤、26 個測試通過
- 錯題本第 1、2 步已完成（跨回次彙整、從錯題本練習、已學會標記），35 個測試通過
- 未做：單字／文法清單連結到單字頁／句型頁（兩頁沒有網址搜尋參數）
- 待使用者：確認 Firestore Rules 允許 examAttempts；實機走查練習／實演流程與 RWD

## 待補（使用者確認「之後補」）
- ✅ N3 読解／文章の文法／語彙／排序題／聽解已依原卷重建並補完整解析（2026-11）；待使用者在手機上確認畫面與音檔對答案（2025.07 聽解 7 題、2025.12 聽解 4 題原文與官方答案表對不上；2023.07/2024.07 問題4 圖序為推定）
- 敬語整理補完（文法頁敬語分頁）：進行中
- 排序題試排區（拖動排序）：進行中
