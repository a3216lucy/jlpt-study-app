# JLPT App

JLPT 單字練習 App，使用 Angular 20、PrimeNG、Tailwind CSS 4。

目前功能重點：

- 單字測驗頁
- 句型測驗頁
- 本地 JSON 題庫
- 句型測驗獨立 JSON 骨架
- Tailwind 驅動的 quiz UI
- Jisho proxy 骨架
- muzukanji 漢字補充資料
- 字典查詢頁
- JMdict XML 轉題庫 JSON 腳本

## Product Direction

目前產品方向已收斂成三條主線：

1. 單字測驗
- 看單字選意思
- 句中單字填空

2. 句型測驗
- 句型填空四選一
- 用法判斷
- 句子重組

3. 閱讀測驗
- 短文空格
- 短文理解

設計原則：

- 單字測驗與句型測驗都採用「先選題型與等級，再進入作答」的流程
- 單字資料與句型測驗資料分離
- 句型測驗與之後的閱讀測驗，優先用獨立 `exam JSON` 承接
- 介面會盡量統一成同一種 quiz shell，避免每個測驗像不同產品

## Current Status

目前已完成：

- 主 layout 與導覽整理
- Tailwind CSS 串接完成
- 單字測驗入口改成可先選題型與等級
- 單字測驗已支援：
  - 看單字選意思
  - 句中單字填空
- 句型測驗頁已建立，採用獨立 exam JSON
- 句型測驗目前已有：
  - `N5` 句型填空
  - `N4` 句型填空
- 單字測驗與句型測驗結果頁都可：
  - 下載錯題 JSON
  - 用這次錯題再練一次
- 字典查詢頁已可接 Jisho proxy 與 muzukanji
- JMdict 轉本地題庫 JSON 的腳本已建立

目前尚未完成：

- `N3 / N2 / N1` 的句型測驗題組
- 句型測驗的 `用法判斷`
- 句型測驗的 `句子重組`
- 閱讀測驗頁與資料格式
- 單字測驗更完整的題型分層與專屬 JSON 流程
- 句型測驗題庫的人工精修與品質控管流程
- 音檔播放目前仍有問題，需要檢查路徑、檔案存在性與播放體驗
- 錯題匯出格式再擴充，例如 CSV、可回匯的複習清單
- 錯題複習模式：直接把下載或暫存的錯題重新組成測驗
- Google 登入、個人資料綁定、雲端答題紀錄
- 部署規劃與平台選型（GitHub Pages / Vercel / Zeabur）

## Environment

建議使用：

- Node `24.14.0`
- npm `10+`

專案根目錄已包含 [.nvmrc](/Users/Kimi/jlpt-app/.nvmrc)，可用：

```bash
nvm use
```

## Install

```bash
npm install
```

## Local Development

啟動 Angular 開發伺服器：

```bash
npm start
```

啟動後瀏覽：

- `http://localhost:4200/`

注意：

- `npm start` 目前已自動帶入 [proxy.conf.json](/Users/Kimi/jlpt-app/proxy.conf.json)
- 如果你要使用 Jisho proxy，還需要另外開一個 terminal 跑 proxy server

## Jisho Proxy

本地 proxy 檔案：

- [tools/jisho-proxy.mjs](/Users/Kimi/jlpt-app/tools/jisho-proxy.mjs)
- [proxy.conf.json](/Users/Kimi/jlpt-app/proxy.conf.json)
- [jisho-proxy.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/api/jisho-proxy.service.ts)

啟動方式：

Terminal 1:

```bash
npm run proxy:jisho
```

Terminal 2:

```bash
npm start
```

Angular 端會打：

- `/api/jisho/search?keyword=学校`

Proxy 會轉發到：

- `https://jisho.org/api/v1/search/words`

說明：

- 這是開發用 proxy 模式
- Jisho 不建議直接從前端瀏覽器打
- 正式部署時建議搬到你自己的 backend

## Muzukanji

目前漢字補充資料使用：

- [muzukanji.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/api/muzukanji.service.ts)
- [muzukanji.model.ts](/Users/Kimi/jlpt-app/src/app/features/models/muzukanji.model.ts)
- [dictionary-api.tokens.ts](/Users/Kimi/jlpt-app/src/app/features/services/api/dictionary-api.tokens.ts)

開發模式下會透過 [proxy.conf.json](/Users/Kimi/jlpt-app/proxy.conf.json) 代理：

- `/api/muzukanji/*` -> `https://ec2-13-60-36-124.eu-north-1.compute.amazonaws.com/*`

目前用途：

- quiz 答題後顯示漢字補充資訊
- 字典查詢頁顯示漢字詳情

## Quiz Data

目前本地題庫放在：

- [src/assets/data](/Users/Kimi/jlpt-app/src/assets/data)

目前主要對應：

- [n5.json](/Users/Kimi/jlpt-app/src/assets/data/n5.json)
- [n4.json](/Users/Kimi/jlpt-app/src/assets/data/n4.json)
- [n3.json](/Users/Kimi/jlpt-app/src/assets/data/n3.json)
- [n2.json](/Users/Kimi/jlpt-app/src/assets/data/n2.json)
- [n1.json](/Users/Kimi/jlpt-app/src/assets/data/n1.json)
- [gen.json](/Users/Kimi/jlpt-app/src/assets/data/gen.json)

單字測驗目前依舊以這些 `VocabWord` 資料組題，句中填空則會從 `sentences` 內的例句挖空。

題庫格式對應 [VocabWord](/Users/Kimi/jlpt-app/src/app/features/models/vocab.model.ts)：

```json
{
  "id": "word-1",
  "kanji": "学校",
  "furigana": "がっこう",
  "meaning": "學校",
  "level": "N5",
  "type": "noun",
  "sentences": [
    {
      "jp": "学校へ行きます。",
      "zh": "我去學校。"
    }
  ]
}
```

## Sentence Quiz Data

句型測驗不要和單字題庫共用同一份 JSON。

建議分成：

- `src/assets/data/*.json`：單字資料
- `src/assets/exams/**/*.json`：真正可直接出題的測驗資料

目前已加入：

- [n5-sentence-fill.json](/Users/Kimi/jlpt-app/src/assets/exams/grammar/n5-sentence-fill.json)
- [n4-sentence-fill.json](/Users/Kimi/jlpt-app/src/assets/exams/grammar/n4-sentence-fill.json)

對應 model 與 service：

- [exam-question.model.ts](/Users/Kimi/jlpt-app/src/app/features/models/exam-question.model.ts)
- [exam.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/exam.service.ts)

這份格式是給「句型測驗」直接使用，不需要再從單字資料即時組題。

目前頁面入口：

- `/large-quiz`

建議後續延伸：

- `src/assets/exams/grammar/n3-sentence-fill.json`
- `src/assets/exams/grammar/n5-usage-check.json`
- `src/assets/exams/grammar/n5-sentence-order.json`
- `src/assets/exams/reading/n5-short-passage.json`

## Generate Quiz JSON From JMdict

腳本：

- [tools/generate-jmdict-quiz-json.mjs](/Users/Kimi/jlpt-app/tools/generate-jmdict-quiz-json.mjs)

指令：

```bash
npm run build:jmdict -- \
  --input downloads/JMdict_e.xml \
  --assignments data/jlpt-assignments.tsv \
  --level N5 \
  --output src/assets/data/n5.json
```

你需要自己準備：

1. `JMdict_e.xml`
2. JLPT 分級對照 TSV

TSV 格式：

```tsv
食べる	N5
学校	N5
新聞	N4
```

說明：

- 腳本會抽取第一個主要寫法、第一個讀音、第一個 gloss
- 目前不自動帶例句
- 這是「生成題庫」流程，不是執行期 API

## Tailwind CSS

全域 Tailwind 入口：

- [src/styles.css](/Users/Kimi/jlpt-app/src/styles.css)

Tailwind 相關設定：

- [postcss.config.json](/Users/Kimi/jlpt-app/postcss.config.json)
- [tailwind.config.js](/Users/Kimi/jlpt-app/tailwind.config.js)

目前 `quiz` 頁已經是 Tailwind-first：

- [quiz.html](/Users/Kimi/jlpt-app/src/app/features/pages/quiz/quiz.html)
- [quiz.scss](/Users/Kimi/jlpt-app/src/app/features/pages/quiz/quiz.scss)

## Available Scripts

```bash
npm start
npm run build
npm run test
npm run proxy:jisho
npm run build:jmdict -- --input ... --output ...
```

## Project Structure

重點路徑：

- [src/app/app.routes.ts](/Users/Kimi/jlpt-app/src/app/app.routes.ts)
- [src/app/layout/main-layout/main-layout.routes.ts](/Users/Kimi/jlpt-app/src/app/layout/main-layout/main-layout.routes.ts)
- [src/app/features/pages/quiz/quiz.ts](/Users/Kimi/jlpt-app/src/app/features/pages/quiz/quiz.ts)
- [src/app/features/pages/large-quiz/large-quiz.ts](/Users/Kimi/jlpt-app/src/app/features/pages/large-quiz/large-quiz.ts)
- [src/app/features/pages/dictionary-lookup/dictionary-lookup.ts](/Users/Kimi/jlpt-app/src/app/features/pages/dictionary-lookup/dictionary-lookup.ts)
- [src/app/features/services/vocab.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/vocab.service.ts)
- [src/app/features/services/quiz.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/quiz.service.ts)
- [src/app/features/services/exam.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/exam.service.ts)
- [src/app/features/services/api/jisho-proxy.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/api/jisho-proxy.service.ts)
- [src/app/features/services/api/muzukanji.service.ts](/Users/Kimi/jlpt-app/src/app/features/services/api/muzukanji.service.ts)

## Roadmap / TODO

建議按照這個順序推進：

1. 句型測驗擴充
- 補 `N3`
- 補 `N2`
- 補 `N1`
- 新增 `用法判斷`
- 新增 `句子重組`

2. 單字測驗強化
- 檢查各級別 `sentences` 品質，提升句中填空可用率
- 規劃是否讓單字測驗也逐步改成獨立 exam JSON
- 補更多單字題型，例如「看中文選日文」
- 將錯題下載資料轉成可直接回放的複習題組
- 評估錯題匯出格式：
  - JSON：給系統回放、複習模式、未來同步
  - CSV：給人工整理與外部工具
  - PDF / 圖片：給列印或分享，不作為主資料格式
- 修正音檔播放：
  - 確認 `audio` 欄位與實體檔名一致
  - 確認 `assets/audio` 是否完整
  - 補錯誤處理與播放失敗提示

3. 閱讀測驗建立
- 新增 `reading` 專用 model / page / JSON schema
- 先做 `短文空格`
- 再做 `短文理解`

4. 字典與資料流整理
- 評估是否將 Jisho 僅保留於查詢頁，不進入測驗主資料流
- 繼續使用 JMdict 腳本生成本地題庫
- 規劃句型測驗資料的整理流程，避免長期手寫 JSON

5. 帳號與個人化
- 補 Google 登入
- 建立使用者 profile 資料
- 將答題紀錄、錯題、複習紀錄綁到個人帳號
- 規劃匿名使用者升級為登入使用者時的資料合併策略

6. UI / UX 統一
- 讓單字測驗、句型測驗、未來閱讀測驗使用同一套開始畫面骨架
- 統一結果頁、錯題回顧、進度條與按鈕樣式
- 規劃手機版的操作節奏與留白
- 規劃錯題匯出按鈕、複習模式入口與下載格式說明

7. 部署規劃
- 部署平台先定為 `Vercel`
- 前置步驟：
  - 先將專案整理並推上 GitHub repository
  - 再由 Vercel 直接連 GitHub 做自動部署
- 後續要確認：
  - Angular SPA 路由設定
  - 環境變數管理
  - 開發用 proxy API 在正式環境的替代方案

## Known Issues

- 這個工作環境裡 `ng build` 偶爾會撞到 Node/Angular 的 `malloc: Double free`，看起來是本機環境問題，不是目前 TypeScript 程式碼本身的型別錯誤
- 單字測驗的句中填空品質高度依賴 `VocabWord.sentences`，如果例句沒有直接包含該詞，該詞就不適合拿來挖空
- 句型測驗目前仍以手工整理 JSON 為主，後續最好建立更穩定的資料產生流程

## References

- Angular CLI: https://angular.dev/tools/cli
- JMdict: https://www.edrdg.org/jmdict/j_jmdict.html
- muzukanji: https://github.com/baqterya/muzukanji
- unofficial Jisho API docs: https://mistval.github.io/unofficial-jisho-api/API.html
