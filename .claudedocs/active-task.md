# N2 考古題解析＋app 同步（2026-11-10 開始）

## 目標
依 Obsidian `日文/考古題/N2 - 2015年07月 - 解析.md` 的格式，為 iCloud `日文/amazing talker 課程/初級_考題/N2/` 內其餘 21 份 N2 考題（2015.12〜2026.07）各寫一份精讀解析（漢字一律（ひらがな）、全選項含義、句子翻譯、聽解原文），並同步補進 jlpt-app：
- `src/assets/exams/past/n2-YYYY-MM-{vocab,grammar,reading}.json` ＋ `past-exam-catalog.ts`
- `src/assets/data/vocab-review-n3.json` 基本群組（`level: "N2"`、`examSource: "YYYY年M月 N2 語彙"`）
- 文法句型也要補（使用者 2026-11-10 追加）：每份在 `grammar-n2-review.json`（句型頁 N2 級別）加 `exam-YYYY-MM-highlights` 群組（title「YYYY年M月 N2 重點句型」），用 scratchpad `n2/add_patterns.py` 的格式，已收錄的 pattern 跳過
- 聽解從 2016.12 起改精簡版（原文＋選項＋答案＋一句解析）
- 2015.12〜2017.12 的句型已於 2026-11-10 補齊

## 做法
- 工具：session scratchpad `n2/n2tool.py`（一份結構化 data.py → 產 md ＋ app JSON ＋ catalog ＋ vocab）
- 每份流程：pdftoppm 轉圖 → 讀題目/答案 → 寫 `n2/data_YYYY_MM.py` → `--key` 對答案卡 → `--md --app` → `npx ng build`

## 進度
- [x] 2015.07（先前已完成，手寫）
- [x] 2015.12（Q63 答案卡印2，依本文改3並註明）
- [x] 2016.07
- [x] 2016.12（聽解改精簡版：原文＋選項＋答案＋一句解析，不逐句翻譯）
- [x] 2017.07
- [x] 2017.12
- [ ] 2018.07
- [ ] 2018.12
- [ ] 2019.07
- [ ] 2019.12
- [ ] 2020.12
- [ ] 2021.07
- [ ] 2021.12
- [ ] 2022.07
- [ ] 2022.12
- [ ] 2023.07
- [ ] 2023.12
- [ ] 2024.07
- [ ] 2024.12
- [ ] 2025.07
- [ ] 2025.12
- [ ] 2026.07
