// Models
import type { AffixGroup } from '../../grammar-review.model';

/**
 * 接頭詞・接尾詞整理（N3＋N2 範圍）。`hot: true` 的是 N2／N3 考古題考過、必須會的詞（畫面用紅色粗體標出）。
 */
export const AFFIX_GROUPS: AffixGroup[] = [
  {
    "label": "否定・缺少",
    "kind": "prefix",
    "items": [
      {
        "mark": "不〜",
        "reading": "ふ",
        "meaning": "不〜、沒有〜",
        "note": "多接漢語名詞、な形容詞，表示否定的狀態",
        "hot": true,
        "words": [
          {
            "word": "不安定",
            "reading": "ふあんてい",
            "gloss": "不穩定",
            "hot": true
          },
          {
            "word": "不正確",
            "reading": "ふせいかく",
            "gloss": "不正確",
            "hot": true
          },
          {
            "word": "不平",
            "reading": "ふへい",
            "gloss": "不滿、牢騷",
            "hot": true
          },
          {
            "word": "不公平",
            "reading": "ふこうへい",
            "gloss": "不公平",
            "hot": false
          },
          {
            "word": "不自由",
            "reading": "ふじゆう",
            "gloss": "不自由、不便",
            "hot": false
          },
          {
            "word": "不運",
            "reading": "ふうん",
            "gloss": "不幸、倒楣",
            "hot": false
          },
          {
            "word": "不安",
            "reading": "ふあん",
            "gloss": "不安",
            "hot": false
          }
        ]
      },
      {
        "mark": "無〜",
        "reading": "む",
        "meaning": "無〜、沒有〜",
        "note": "表示「沒有」那個東西或狀態；讀 む（也有 ぶ，如 無事）",
        "hot": true,
        "words": [
          {
            "word": "無責任",
            "reading": "むせきにん",
            "gloss": "不負責任",
            "hot": true
          },
          {
            "word": "無計画",
            "reading": "むけいかく",
            "gloss": "沒有計畫",
            "hot": true
          },
          {
            "word": "無口",
            "reading": "むくち",
            "gloss": "沉默寡言",
            "hot": true
          },
          {
            "word": "無駄",
            "reading": "むだ",
            "gloss": "白費、浪費",
            "hot": true
          },
          {
            "word": "無関心",
            "reading": "むかんしん",
            "gloss": "漠不關心",
            "hot": false
          },
          {
            "word": "無意味",
            "reading": "むいみ",
            "gloss": "沒有意義",
            "hot": false
          },
          {
            "word": "無料",
            "reading": "むりょう",
            "gloss": "免費",
            "hot": false
          }
        ]
      },
      {
        "mark": "未〜",
        "reading": "み",
        "meaning": "未〜、尚未〜",
        "note": "表示「還沒有」，多接動作性名詞",
        "hot": true,
        "words": [
          {
            "word": "未使用",
            "reading": "みしよう",
            "gloss": "未使用",
            "hot": true
          },
          {
            "word": "未成年",
            "reading": "みせいねん",
            "gloss": "未成年",
            "hot": false
          },
          {
            "word": "未経験",
            "reading": "みけいけん",
            "gloss": "沒有經驗",
            "hot": false
          },
          {
            "word": "未提出",
            "reading": "みていしゅつ",
            "gloss": "尚未提出",
            "hot": false
          },
          {
            "word": "未完成",
            "reading": "みかんせい",
            "gloss": "未完成",
            "hot": false
          }
        ]
      },
      {
        "mark": "非〜",
        "reading": "ひ",
        "meaning": "非〜、不是〜",
        "note": "表示「不屬於」，語氣比「不〜」客觀",
        "hot": false,
        "words": [
          {
            "word": "非常識",
            "reading": "ひじょうしき",
            "gloss": "缺乏常識",
            "hot": false
          },
          {
            "word": "非公式",
            "reading": "ひこうしき",
            "gloss": "非正式",
            "hot": false
          },
          {
            "word": "非常口",
            "reading": "ひじょうぐち",
            "gloss": "緊急出口",
            "hot": false
          },
          {
            "word": "非現実的",
            "reading": "ひげんじつてき",
            "gloss": "不切實際的",
            "hot": false
          }
        ]
      },
      {
        "mark": "反〜",
        "reading": "はん",
        "meaning": "反〜、反對〜",
        "note": "表示「與〜相反、反對〜」，接漢語名詞；常見於反對立場的說法",
        "hot": false,
        "words": [
          {
            "word": "反比例",
            "reading": "はんひれい",
            "gloss": "反比例",
            "hot": false
          },
          {
            "word": "反作用",
            "reading": "はんさよう",
            "gloss": "反作用",
            "hot": false
          },
          {
            "word": "反政府",
            "reading": "はんせいふ",
            "gloss": "反政府",
            "hot": false
          },
          {
            "word": "反社会的",
            "reading": "はんしゃかいてき",
            "gloss": "反社會的",
            "hot": false
          },
          {
            "word": "反体制",
            "reading": "はんたいせい",
            "gloss": "反體制",
            "hot": false
          }
        ]
      },
      {
        "mark": "逆〜",
        "reading": "ぎゃく",
        "meaning": "逆〜、相反的〜",
        "note": "表示方向或順序「相反」；多用在結果與預期相反（逆効果）",
        "hot": false,
        "words": [
          {
            "word": "逆効果",
            "reading": "ぎゃくこうか",
            "gloss": "反效果",
            "hot": false
          },
          {
            "word": "逆方向",
            "reading": "ぎゃくほうこう",
            "gloss": "反方向",
            "hot": false
          },
          {
            "word": "逆転",
            "reading": "ぎゃくてん",
            "gloss": "逆轉",
            "hot": false
          },
          {
            "word": "逆戻り",
            "reading": "ぎゃくもどり",
            "gloss": "倒退、回到原狀",
            "hot": false
          },
          {
            "word": "逆輸入",
            "reading": "ぎゃくゆにゅう",
            "gloss": "逆輸入、外銷轉內銷",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "再・新舊・前後",
    "kind": "prefix",
    "items": [
      {
        "mark": "再〜",
        "reading": "さい",
        "meaning": "再次〜、重新〜",
        "note": "「再」讀 さい；再来週・再来月・再来年 讀 さらい〜",
        "hot": true,
        "words": [
          {
            "word": "再開発",
            "reading": "さいかいはつ",
            "gloss": "再開發",
            "hot": true
          },
          {
            "word": "再提出",
            "reading": "さいていしゅつ",
            "gloss": "重新提出",
            "hot": true
          },
          {
            "word": "再三",
            "reading": "さいさん",
            "gloss": "再三、一再",
            "hot": true
          },
          {
            "word": "再度",
            "reading": "さいど",
            "gloss": "再次、重新",
            "hot": true
          },
          {
            "word": "再確認",
            "reading": "さいかくにん",
            "gloss": "再確認",
            "hot": false
          },
          {
            "word": "再利用",
            "reading": "さいりよう",
            "gloss": "再利用",
            "hot": false
          },
          {
            "word": "再来週",
            "reading": "さらいしゅう",
            "gloss": "下下週",
            "hot": false
          }
        ]
      },
      {
        "mark": "新〜",
        "reading": "しん",
        "meaning": "新的〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "新社長",
            "reading": "しんしゃちょう",
            "gloss": "新社長",
            "hot": false
          },
          {
            "word": "新製品",
            "reading": "しんせいひん",
            "gloss": "新產品",
            "hot": false
          },
          {
            "word": "新入生",
            "reading": "しんにゅうせい",
            "gloss": "新生",
            "hot": false
          },
          {
            "word": "新年度",
            "reading": "しんねんど",
            "gloss": "新年度",
            "hot": false
          },
          {
            "word": "新記録",
            "reading": "しんきろく",
            "gloss": "新紀錄",
            "hot": false
          }
        ]
      },
      {
        "mark": "旧〜",
        "reading": "きゅう",
        "meaning": "舊的〜、以前的〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "旧制度",
            "reading": "きゅうせいど",
            "gloss": "舊制度",
            "hot": false
          },
          {
            "word": "旧住所",
            "reading": "きゅうじゅうしょ",
            "gloss": "舊地址",
            "hot": false
          },
          {
            "word": "旧友",
            "reading": "きゅうゆう",
            "gloss": "舊友",
            "hot": false
          }
        ]
      },
      {
        "mark": "前〜",
        "reading": "ぜん",
        "meaning": "前任的〜、之前的〜",
        "note": "指時間上在「現在」之前的；對比 現〜",
        "hot": true,
        "words": [
          {
            "word": "前社長",
            "reading": "ぜんしゃちょう",
            "gloss": "前社長",
            "hot": true
          },
          {
            "word": "前年度",
            "reading": "ぜんねんど",
            "gloss": "前一年度",
            "hot": false
          },
          {
            "word": "前回",
            "reading": "ぜんかい",
            "gloss": "上一次",
            "hot": false
          },
          {
            "word": "前期",
            "reading": "ぜんき",
            "gloss": "前期",
            "hot": false
          }
        ]
      },
      {
        "mark": "現〜",
        "reading": "げん",
        "meaning": "現在的〜、目前的〜",
        "note": "對比 前〜（前任）與 元〜（以前的）",
        "hot": false,
        "words": [
          {
            "word": "現社長",
            "reading": "げんしゃちょう",
            "gloss": "現任社長",
            "hot": false
          },
          {
            "word": "現住所",
            "reading": "げんじゅうしょ",
            "gloss": "現居地址",
            "hot": false
          },
          {
            "word": "現段階",
            "reading": "げんだんかい",
            "gloss": "現階段",
            "hot": false
          },
          {
            "word": "現時点",
            "reading": "げんじてん",
            "gloss": "目前這個時間點",
            "hot": false
          }
        ]
      },
      {
        "mark": "元〜",
        "reading": "もと",
        "meaning": "原本的〜、前〜（已離職、離任）",
        "note": "讀 もと，指「過去擔任過、現在不是」",
        "hot": false,
        "words": [
          {
            "word": "元社員",
            "reading": "もとしゃいん",
            "gloss": "前員工",
            "hot": false
          },
          {
            "word": "元首相",
            "reading": "もとしゅしょう",
            "gloss": "前首相",
            "hot": false
          },
          {
            "word": "元会員",
            "reading": "もとかいいん",
            "gloss": "前會員",
            "hot": false
          }
        ]
      },
      {
        "mark": "次〜",
        "reading": "じ",
        "meaning": "下一個〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "次回",
            "reading": "じかい",
            "gloss": "下次",
            "hot": false
          },
          {
            "word": "次期",
            "reading": "じき",
            "gloss": "下一期",
            "hot": false
          },
          {
            "word": "次世代",
            "reading": "じせだい",
            "gloss": "下一代",
            "hot": false
          },
          {
            "word": "次年度",
            "reading": "じねんど",
            "gloss": "下一年度",
            "hot": false
          }
        ]
      },
      {
        "mark": "初〜",
        "reading": "しょ／はつ",
        "meaning": "初次〜、第一次〜",
        "note": "讀 しょ（初対面）或 はつ（初恋・初雪），訓讀 はつ 多半是和語的詞",
        "hot": false,
        "words": [
          {
            "word": "初対面",
            "reading": "しょたいめん",
            "gloss": "初次見面",
            "hot": false
          },
          {
            "word": "初心者",
            "reading": "しょしんしゃ",
            "gloss": "初學者",
            "hot": false
          },
          {
            "word": "初日",
            "reading": "しょにち",
            "gloss": "第一天",
            "hot": false
          },
          {
            "word": "初恋",
            "reading": "はつこい",
            "gloss": "初戀",
            "hot": false
          },
          {
            "word": "初雪",
            "reading": "はつゆき",
            "gloss": "初雪",
            "hot": false
          }
        ]
      },
      {
        "mark": "来〜",
        "reading": "らい",
        "meaning": "下一個〜",
        "note": "表示「下（個）〜」；來週・來月・來年 讀 らい〜，對比 再来〜（下下〜）",
        "hot": false,
        "words": [
          {
            "word": "来月",
            "reading": "らいげつ",
            "gloss": "下個月",
            "hot": false
          },
          {
            "word": "来週",
            "reading": "らいしゅう",
            "gloss": "下週",
            "hot": false
          },
          {
            "word": "来年",
            "reading": "らいねん",
            "gloss": "明年",
            "hot": false
          },
          {
            "word": "来学期",
            "reading": "らいがっき",
            "gloss": "下學期",
            "hot": false
          },
          {
            "word": "来春",
            "reading": "らいしゅん",
            "gloss": "明年春天",
            "hot": false
          }
        ]
      },
      {
        "mark": "毎〜",
        "reading": "まい",
        "meaning": "每〜",
        "note": "表示「每一個〜」，接表示時間的名詞",
        "hot": false,
        "words": [
          {
            "word": "毎日",
            "reading": "まいにち",
            "gloss": "每天",
            "hot": false
          },
          {
            "word": "毎週",
            "reading": "まいしゅう",
            "gloss": "每週",
            "hot": false
          },
          {
            "word": "毎月",
            "reading": "まいつき",
            "gloss": "每個月",
            "hot": false
          },
          {
            "word": "毎年",
            "reading": "まいとし／まいねん",
            "gloss": "每年",
            "hot": false
          },
          {
            "word": "毎回",
            "reading": "まいかい",
            "gloss": "每次",
            "hot": false
          },
          {
            "word": "毎朝",
            "reading": "まいあさ",
            "gloss": "每天早上",
            "hot": false
          }
        ]
      },
      {
        "mark": "事前〜",
        "reading": "じぜん",
        "meaning": "事前〜、預先〜",
        "note": "表示「事情發生之前先做」，後面接動作性名詞",
        "hot": false,
        "words": [
          {
            "word": "事前準備",
            "reading": "じぜんじゅんび",
            "gloss": "事前準備",
            "hot": false
          },
          {
            "word": "事前予約",
            "reading": "じぜんよやく",
            "gloss": "事先預約",
            "hot": false
          },
          {
            "word": "事前連絡",
            "reading": "じぜんれんらく",
            "gloss": "事先聯絡",
            "hot": false
          },
          {
            "word": "事前調査",
            "reading": "じぜんちょうさ",
            "gloss": "事前調查",
            "hot": false
          },
          {
            "word": "事前通知",
            "reading": "じぜんつうち",
            "gloss": "事前通知",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "程度・規模・範圍",
    "kind": "prefix",
    "items": [
      {
        "mark": "超〜",
        "reading": "ちょう",
        "meaning": "超〜、非常〜",
        "note": "口語常用，表示程度遠超一般",
        "hot": false,
        "words": [
          {
            "word": "超満員",
            "reading": "ちょうまんいん",
            "gloss": "客滿、爆滿",
            "hot": false
          },
          {
            "word": "超特急",
            "reading": "ちょうとっきゅう",
            "gloss": "超特快",
            "hot": false
          },
          {
            "word": "超大国",
            "reading": "ちょうたいこく",
            "gloss": "超級大國",
            "hot": false
          }
        ]
      },
      {
        "mark": "最〜",
        "reading": "さい",
        "meaning": "最〜",
        "note": "接在形容詞性漢語前面，表示「最」",
        "hot": true,
        "words": [
          {
            "word": "最寄り",
            "reading": "もより",
            "gloss": "最近的",
            "hot": true
          },
          {
            "word": "最新",
            "reading": "さいしん",
            "gloss": "最新",
            "hot": false
          },
          {
            "word": "最高",
            "reading": "さいこう",
            "gloss": "最高",
            "hot": false
          },
          {
            "word": "最終",
            "reading": "さいしゅう",
            "gloss": "最終",
            "hot": false
          },
          {
            "word": "最先端",
            "reading": "さいせんたん",
            "gloss": "最尖端",
            "hot": false
          }
        ]
      },
      {
        "mark": "大〜",
        "reading": "だい",
        "meaning": "大〜、非常〜",
        "note": "讀 だい；訓讀 おお（大雨 おおあめ）",
        "hot": true,
        "words": [
          {
            "word": "大げさ",
            "reading": "おおげさ",
            "gloss": "誇張",
            "hot": true
          },
          {
            "word": "大まか",
            "reading": "おおまか",
            "gloss": "大致、粗略",
            "hot": true
          },
          {
            "word": "大統領制",
            "reading": "だいとうりょうせい",
            "gloss": "總統制",
            "hot": true
          },
          {
            "word": "大都市",
            "reading": "だいとし",
            "gloss": "大都市",
            "hot": false
          },
          {
            "word": "大成功",
            "reading": "だいせいこう",
            "gloss": "大成功",
            "hot": false
          },
          {
            "word": "大人気",
            "reading": "だいにんき",
            "gloss": "大受歡迎",
            "hot": false
          },
          {
            "word": "大反対",
            "reading": "だいはんたい",
            "gloss": "強烈反對",
            "hot": false
          },
          {
            "word": "大雨",
            "reading": "おおあめ",
            "gloss": "大雨",
            "hot": false
          }
        ]
      },
      {
        "mark": "小〜",
        "reading": "しょう",
        "meaning": "小〜、少量的〜",
        "note": "讀 しょう；訓讀 こ（小雨 こさめ）",
        "hot": true,
        "words": [
          {
            "word": "小柄",
            "reading": "こがら",
            "gloss": "身材嬌小",
            "hot": true
          },
          {
            "word": "小規模",
            "reading": "しょうきぼ",
            "gloss": "小規模",
            "hot": false
          },
          {
            "word": "小人数",
            "reading": "しょうにんずう",
            "gloss": "少數人",
            "hot": false
          },
          {
            "word": "小雨",
            "reading": "こさめ",
            "gloss": "小雨",
            "hot": false
          },
          {
            "word": "小声",
            "reading": "こごえ",
            "gloss": "小聲",
            "hot": false
          }
        ]
      },
      {
        "mark": "準〜",
        "reading": "じゅん",
        "meaning": "準〜、次一級的〜",
        "note": "表示「差一點就是」",
        "hot": false,
        "words": [
          {
            "word": "準優勝",
            "reading": "じゅんゆうしょう",
            "gloss": "亞軍",
            "hot": false
          },
          {
            "word": "準決勝",
            "reading": "じゅんけっしょう",
            "gloss": "準決賽",
            "hot": false
          },
          {
            "word": "準会員",
            "reading": "じゅんかいいん",
            "gloss": "準會員",
            "hot": false
          }
        ]
      },
      {
        "mark": "総〜",
        "reading": "そう",
        "meaning": "總〜、全部的〜",
        "note": "表示合計、全體",
        "hot": true,
        "words": [
          {
            "word": "総額",
            "reading": "そうがく",
            "gloss": "總額",
            "hot": true
          },
          {
            "word": "総人口",
            "reading": "そうじんこう",
            "gloss": "總人口",
            "hot": false
          },
          {
            "word": "総売上",
            "reading": "そううりあげ",
            "gloss": "總營業額",
            "hot": false
          },
          {
            "word": "総合",
            "reading": "そうごう",
            "gloss": "綜合",
            "hot": false
          }
        ]
      },
      {
        "mark": "全〜",
        "reading": "ぜん",
        "meaning": "全〜、整個〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "全国",
            "reading": "ぜんこく",
            "gloss": "全國",
            "hot": false
          },
          {
            "word": "全社員",
            "reading": "ぜんしゃいん",
            "gloss": "全體員工",
            "hot": false
          },
          {
            "word": "全世界",
            "reading": "ぜんせかい",
            "gloss": "全世界",
            "hot": false
          },
          {
            "word": "全員",
            "reading": "ぜんいん",
            "gloss": "全員",
            "hot": false
          }
        ]
      },
      {
        "mark": "各〜",
        "reading": "かく",
        "meaning": "各〜、每個〜",
        "note": "一個一個分開來看",
        "hot": true,
        "words": [
          {
            "word": "各自",
            "reading": "かくじ",
            "gloss": "各自",
            "hot": true
          },
          {
            "word": "各駅",
            "reading": "かくえき",
            "gloss": "每一站",
            "hot": true
          },
          {
            "word": "各国",
            "reading": "かっこく",
            "gloss": "各國",
            "hot": false
          },
          {
            "word": "各地",
            "reading": "かくち",
            "gloss": "各地",
            "hot": false
          },
          {
            "word": "各種",
            "reading": "かくしゅ",
            "gloss": "各種",
            "hot": false
          }
        ]
      },
      {
        "mark": "副〜",
        "reading": "ふく",
        "meaning": "副〜、次要的〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "副社長",
            "reading": "ふくしゃちょう",
            "gloss": "副社長",
            "hot": true
          },
          {
            "word": "副作用",
            "reading": "ふくさよう",
            "gloss": "副作用",
            "hot": false
          },
          {
            "word": "副題",
            "reading": "ふくだい",
            "gloss": "副標題",
            "hot": false
          }
        ]
      },
      {
        "mark": "主〜",
        "reading": "しゅ",
        "meaning": "主要的〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "主成分",
            "reading": "しゅせいぶん",
            "gloss": "主要成分",
            "hot": true
          },
          {
            "word": "主要",
            "reading": "しゅよう",
            "gloss": "主要",
            "hot": true
          },
          {
            "word": "主原料",
            "reading": "しゅげんりょう",
            "gloss": "主要原料",
            "hot": false
          },
          {
            "word": "主食",
            "reading": "しゅしょく",
            "gloss": "主食",
            "hot": false
          },
          {
            "word": "主人公",
            "reading": "しゅじんこう",
            "gloss": "主角",
            "hot": false
          }
        ]
      },
      {
        "mark": "本〜",
        "reading": "ほん",
        "meaning": "本〜、這個〜",
        "note": "指「這個」「主要的」，常見於公文與告示",
        "hot": true,
        "words": [
          {
            "word": "本物",
            "reading": "ほんもの",
            "gloss": "真品、真的",
            "hot": true
          },
          {
            "word": "本日",
            "reading": "ほんじつ",
            "gloss": "本日、今天",
            "hot": false
          },
          {
            "word": "本社",
            "reading": "ほんしゃ",
            "gloss": "總公司",
            "hot": false
          },
          {
            "word": "本店",
            "reading": "ほんてん",
            "gloss": "總店",
            "hot": false
          },
          {
            "word": "本年度",
            "reading": "ほんねんど",
            "gloss": "本年度",
            "hot": false
          }
        ]
      },
      {
        "mark": "同〜",
        "reading": "どう",
        "meaning": "同〜、相同的〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "同僚",
            "reading": "どうりょう",
            "gloss": "同事",
            "hot": true
          },
          {
            "word": "同情",
            "reading": "どうじょう",
            "gloss": "同情",
            "hot": true
          },
          {
            "word": "同時",
            "reading": "どうじ",
            "gloss": "同時",
            "hot": false
          },
          {
            "word": "同期",
            "reading": "どうき",
            "gloss": "同期",
            "hot": false
          },
          {
            "word": "同世代",
            "reading": "どうせだい",
            "gloss": "同世代",
            "hot": false
          }
        ]
      },
      {
        "mark": "異〜",
        "reading": "い",
        "meaning": "不同的〜、別的〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "異文化",
            "reading": "いぶんか",
            "gloss": "異文化",
            "hot": true
          },
          {
            "word": "異分野",
            "reading": "いぶんや",
            "gloss": "不同領域",
            "hot": true
          },
          {
            "word": "異色",
            "reading": "いしょく",
            "gloss": "特別、獨樹一格",
            "hot": true
          },
          {
            "word": "異業種",
            "reading": "いぎょうしゅ",
            "gloss": "不同行業",
            "hot": false
          },
          {
            "word": "異性",
            "reading": "いせい",
            "gloss": "異性",
            "hot": false
          }
        ]
      },
      {
        "mark": "他〜",
        "reading": "た",
        "meaning": "其他的〜、別的〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "他人",
            "reading": "たにん",
            "gloss": "他人",
            "hot": true
          },
          {
            "word": "他社",
            "reading": "たしゃ",
            "gloss": "其他公司",
            "hot": false
          },
          {
            "word": "他国",
            "reading": "たこく",
            "gloss": "他國",
            "hot": false
          },
          {
            "word": "他県",
            "reading": "たけん",
            "gloss": "其他縣",
            "hot": false
          }
        ]
      },
      {
        "mark": "両〜",
        "reading": "りょう",
        "meaning": "兩〜、雙〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "両国",
            "reading": "りょうこく",
            "gloss": "兩國",
            "hot": false
          },
          {
            "word": "両親",
            "reading": "りょうしん",
            "gloss": "雙親",
            "hot": false
          },
          {
            "word": "両手",
            "reading": "りょうて",
            "gloss": "雙手",
            "hot": false
          },
          {
            "word": "両側",
            "reading": "りょうがわ",
            "gloss": "兩側",
            "hot": false
          }
        ]
      },
      {
        "mark": "高〜",
        "reading": "こう",
        "meaning": "高〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "高価",
            "reading": "こうか",
            "gloss": "高價",
            "hot": true
          },
          {
            "word": "高収入",
            "reading": "こうしゅうにゅう",
            "gloss": "高收入",
            "hot": false
          },
          {
            "word": "高性能",
            "reading": "こうせいのう",
            "gloss": "高性能",
            "hot": false
          },
          {
            "word": "高品質",
            "reading": "こうひんしつ",
            "gloss": "高品質",
            "hot": false
          },
          {
            "word": "高カロリー",
            "reading": "こうかろりー",
            "gloss": "高熱量",
            "hot": false
          }
        ]
      },
      {
        "mark": "低〜",
        "reading": "てい",
        "meaning": "低〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "低価格",
            "reading": "ていかかく",
            "gloss": "低價",
            "hot": true
          },
          {
            "word": "低収入",
            "reading": "ていしゅうにゅう",
            "gloss": "低收入",
            "hot": false
          },
          {
            "word": "低カロリー",
            "reading": "ていかろりー",
            "gloss": "低熱量",
            "hot": false
          }
        ]
      },
      {
        "mark": "半〜",
        "reading": "はん",
        "meaning": "半〜、一半的〜",
        "note": "表示「一半」；半年 讀 はんとし，半日 讀 はんにち",
        "hot": false,
        "words": [
          {
            "word": "半額",
            "reading": "はんがく",
            "gloss": "半價",
            "hot": false
          },
          {
            "word": "半日",
            "reading": "はんにち",
            "gloss": "半天",
            "hot": false
          },
          {
            "word": "半年",
            "reading": "はんとし",
            "gloss": "半年",
            "hot": false
          },
          {
            "word": "半数",
            "reading": "はんすう",
            "gloss": "半數",
            "hot": false
          },
          {
            "word": "半袖",
            "reading": "はんそで",
            "gloss": "短袖",
            "hot": false
          }
        ]
      },
      {
        "mark": "約〜",
        "reading": "やく",
        "meaning": "大約〜",
        "note": "接數量詞，表示概數；比「〜ぐらい」書面、正式",
        "hot": false,
        "words": [
          {
            "word": "約一時間",
            "reading": "やくいちじかん",
            "gloss": "大約一小時",
            "hot": false
          },
          {
            "word": "約十年",
            "reading": "やくじゅうねん",
            "gloss": "大約十年",
            "hot": false
          },
          {
            "word": "約半数",
            "reading": "やくはんすう",
            "gloss": "大約一半",
            "hot": false
          },
          {
            "word": "約三割",
            "reading": "やくさんわり",
            "gloss": "大約三成",
            "hot": false
          }
        ]
      },
      {
        "mark": "諸〜",
        "reading": "しょ",
        "meaning": "諸〜、各種〜",
        "note": "表示「許多不同的〜」，接漢語名詞，多為書面語",
        "hot": true,
        "words": [
          {
            "word": "諸外国",
            "reading": "しょがいこく",
            "gloss": "各國",
            "hot": true
          },
          {
            "word": "諸問題",
            "reading": "しょもんだい",
            "gloss": "各種問題",
            "hot": false
          },
          {
            "word": "諸条件",
            "reading": "しょじょうけん",
            "gloss": "各種條件",
            "hot": false
          },
          {
            "word": "諸費用",
            "reading": "しょひよう",
            "gloss": "各項費用",
            "hot": false
          }
        ]
      },
      {
        "mark": "多〜",
        "reading": "た",
        "meaning": "多〜、多種〜",
        "note": "表示「多個、多樣」；與 少〜 相對",
        "hot": false,
        "words": [
          {
            "word": "多目的",
            "reading": "たもくてき",
            "gloss": "多目的",
            "hot": false
          },
          {
            "word": "多機能",
            "reading": "たきのう",
            "gloss": "多功能",
            "hot": false
          },
          {
            "word": "多民族",
            "reading": "たみんぞく",
            "gloss": "多民族",
            "hot": false
          },
          {
            "word": "多数",
            "reading": "たすう",
            "gloss": "多數",
            "hot": false
          },
          {
            "word": "多様",
            "reading": "たよう",
            "gloss": "多樣",
            "hot": false
          }
        ]
      },
      {
        "mark": "少〜",
        "reading": "しょう",
        "meaning": "少〜、少量的〜",
        "note": "表示數量少；與 多〜 相對。「少々」讀 しょうしょう",
        "hot": false,
        "words": [
          {
            "word": "少数",
            "reading": "しょうすう",
            "gloss": "少數",
            "hot": false
          },
          {
            "word": "少量",
            "reading": "しょうりょう",
            "gloss": "少量",
            "hot": false
          },
          {
            "word": "少額",
            "reading": "しょうがく",
            "gloss": "小額",
            "hot": false
          },
          {
            "word": "少子化",
            "reading": "しょうしか",
            "gloss": "少子化",
            "hot": false
          }
        ]
      },
      {
        "mark": "長〜",
        "reading": "ちょう",
        "meaning": "長〜（時間或距離長）",
        "note": "多表示「時間、距離長」；與 短〜 相對",
        "hot": false,
        "words": [
          {
            "word": "長期",
            "reading": "ちょうき",
            "gloss": "長期",
            "hot": false
          },
          {
            "word": "長時間",
            "reading": "ちょうじかん",
            "gloss": "長時間",
            "hot": false
          },
          {
            "word": "長距離",
            "reading": "ちょうきょり",
            "gloss": "長距離",
            "hot": false
          },
          {
            "word": "長所",
            "reading": "ちょうしょ",
            "gloss": "優點",
            "hot": false
          }
        ]
      },
      {
        "mark": "短〜",
        "reading": "たん",
        "meaning": "短〜",
        "note": "與 長〜 相對",
        "hot": false,
        "words": [
          {
            "word": "短期",
            "reading": "たんき",
            "gloss": "短期",
            "hot": false
          },
          {
            "word": "短時間",
            "reading": "たんじかん",
            "gloss": "短時間",
            "hot": false
          },
          {
            "word": "短距離",
            "reading": "たんきょり",
            "gloss": "短距離",
            "hot": false
          },
          {
            "word": "短所",
            "reading": "たんしょ",
            "gloss": "缺點",
            "hot": false
          },
          {
            "word": "短縮",
            "reading": "たんしゅく",
            "gloss": "縮短",
            "hot": false
          }
        ]
      },
      {
        "mark": "急〜",
        "reading": "きゅう",
        "meaning": "突然〜、急速〜",
        "note": "表示「突然」或「急速」，後面多接變化性的詞",
        "hot": false,
        "words": [
          {
            "word": "急上昇",
            "reading": "きゅうじょうしょう",
            "gloss": "急速上升",
            "hot": false
          },
          {
            "word": "急成長",
            "reading": "きゅうせいちょう",
            "gloss": "急速成長",
            "hot": false
          },
          {
            "word": "急停車",
            "reading": "きゅうていしゃ",
            "gloss": "緊急煞車",
            "hot": false
          },
          {
            "word": "急増",
            "reading": "きゅうぞう",
            "gloss": "激增",
            "hot": false
          },
          {
            "word": "急ブレーキ",
            "reading": "きゅうぶれーき",
            "gloss": "緊急煞車",
            "hot": false
          }
        ]
      },
      {
        "mark": "激〜",
        "reading": "げき",
        "meaning": "激〜、劇烈〜",
        "note": "表示變化或程度很劇烈；口語的「激安」也用來指極便宜",
        "hot": false,
        "words": [
          {
            "word": "激安",
            "reading": "げきやす",
            "gloss": "超便宜",
            "hot": false
          },
          {
            "word": "激増",
            "reading": "げきぞう",
            "gloss": "暴增",
            "hot": false
          },
          {
            "word": "激減",
            "reading": "げきげん",
            "gloss": "驟減",
            "hot": false
          },
          {
            "word": "激変",
            "reading": "げきへん",
            "gloss": "劇變",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "敬語・公文用語",
    "kind": "prefix",
    "items": [
      {
        "mark": "貴〜",
        "reading": "き",
        "meaning": "貴〜（對方的〜）",
        "note": "書信、公文中用來尊稱對方所屬的人事物；口語說「御社」",
        "hot": false,
        "words": [
          {
            "word": "貴社",
            "reading": "きしゃ",
            "gloss": "貴公司",
            "hot": false
          },
          {
            "word": "貴校",
            "reading": "きこう",
            "gloss": "貴校",
            "hot": false
          },
          {
            "word": "貴殿",
            "reading": "きでん",
            "gloss": "閣下",
            "hot": false
          },
          {
            "word": "貴店",
            "reading": "きてん",
            "gloss": "貴店",
            "hot": false
          }
        ]
      },
      {
        "mark": "御〜",
        "reading": "おん",
        "meaning": "御〜（對方的〜）",
        "note": "御社・御中 讀 おん，是對對方公司的尊稱；御礼 也可讀 おれい；御飯 讀 ごはん",
        "hot": false,
        "words": [
          {
            "word": "御社",
            "reading": "おんしゃ",
            "gloss": "貴公司（口語用）",
            "hot": false
          },
          {
            "word": "御中",
            "reading": "おんちゅう",
            "gloss": "（寫給公司、團體的）啟",
            "hot": false
          },
          {
            "word": "御礼",
            "reading": "おんれい",
            "gloss": "謝禮、致謝",
            "hot": false
          },
          {
            "word": "御飯",
            "reading": "ごはん",
            "gloss": "飯",
            "hot": false
          }
        ]
      },
      {
        "mark": "当〜",
        "reading": "とう",
        "meaning": "本〜、這個〜",
        "note": "表示「我方、這個」，用於公告與商業文書",
        "hot": false,
        "words": [
          {
            "word": "当社",
            "reading": "とうしゃ",
            "gloss": "本公司",
            "hot": false
          },
          {
            "word": "当店",
            "reading": "とうてん",
            "gloss": "本店",
            "hot": false
          },
          {
            "word": "当日",
            "reading": "とうじつ",
            "gloss": "當天",
            "hot": false
          },
          {
            "word": "当時",
            "reading": "とうじ",
            "gloss": "當時",
            "hot": false
          },
          {
            "word": "当校",
            "reading": "とうこう",
            "gloss": "本校",
            "hot": false
          }
        ]
      },
      {
        "mark": "お〜・ご〜",
        "reading": "お／ご",
        "meaning": "（美化語、尊敬語、謙讓語）",
        "note": "一般和語接 お（お金・お茶），漢語接 ご（ご家族・ご連絡）；也有例外（お電話・お食事）",
        "hot": true,
        "words": [
          {
            "word": "お金",
            "reading": "おかね",
            "gloss": "錢",
            "hot": true
          },
          {
            "word": "お茶",
            "reading": "おちゃ",
            "gloss": "茶",
            "hot": false
          },
          {
            "word": "お祝い",
            "reading": "おいわい",
            "gloss": "祝賀",
            "hot": false
          },
          {
            "word": "ご家族",
            "reading": "ごかぞく",
            "gloss": "您的家人",
            "hot": false
          },
          {
            "word": "ご連絡",
            "reading": "ごれんらく",
            "gloss": "聯絡",
            "hot": false
          },
          {
            "word": "ご注文",
            "reading": "ごちゅうもん",
            "gloss": "訂購",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "強調・評價・其他",
    "kind": "prefix",
    "items": [
      {
        "mark": "真っ〜",
        "reading": "ま／まっ",
        "meaning": "正〜、純〜",
        "note": "接色彩或位置詞，強調「純、正」；後面為 か、さ、し、く 等音時促音化",
        "hot": false,
        "words": [
          {
            "word": "真っ赤",
            "reading": "まっか",
            "gloss": "通紅",
            "hot": false
          },
          {
            "word": "真っ白",
            "reading": "まっしろ",
            "gloss": "純白",
            "hot": false
          },
          {
            "word": "真っ青",
            "reading": "まっさお",
            "gloss": "鐵青、湛藍",
            "hot": false
          },
          {
            "word": "真っ黒",
            "reading": "まっくろ",
            "gloss": "漆黑",
            "hot": false
          },
          {
            "word": "真っ先",
            "reading": "まっさき",
            "gloss": "最先",
            "hot": false
          },
          {
            "word": "真ん中",
            "reading": "まんなか",
            "gloss": "正中間",
            "hot": false
          },
          {
            "word": "真夏",
            "reading": "まなつ",
            "gloss": "盛夏",
            "hot": false
          }
        ]
      },
      {
        "mark": "ど〜",
        "reading": "ど",
        "meaning": "極度〜、徹底〜",
        "note": "口語，用來強調程度，多帶粗俗或誇張語感",
        "hot": false,
        "words": [
          {
            "word": "ど真ん中",
            "reading": "どまんなか",
            "gloss": "正中央",
            "hot": false
          },
          {
            "word": "ど素人",
            "reading": "どしろうと",
            "gloss": "完全外行",
            "hot": false
          },
          {
            "word": "ど根性",
            "reading": "どこんじょう",
            "gloss": "頑強的毅力",
            "hot": false
          },
          {
            "word": "ど忘れ",
            "reading": "どわすれ",
            "gloss": "突然想不起來",
            "hot": false
          }
        ]
      },
      {
        "mark": "好〜",
        "reading": "こう",
        "meaning": "好的〜、良好的〜",
        "note": "表示「良好、有利」；與 悪〜 相對",
        "hot": false,
        "words": [
          {
            "word": "好条件",
            "reading": "こうじょうけん",
            "gloss": "好條件",
            "hot": false
          },
          {
            "word": "好成績",
            "reading": "こうせいせき",
            "gloss": "好成績",
            "hot": false
          },
          {
            "word": "好印象",
            "reading": "こういんしょう",
            "gloss": "好印象",
            "hot": false
          },
          {
            "word": "好都合",
            "reading": "こうつごう",
            "gloss": "正方便、正好",
            "hot": false
          },
          {
            "word": "好景気",
            "reading": "こうけいき",
            "gloss": "景氣好",
            "hot": false
          }
        ]
      },
      {
        "mark": "悪〜",
        "reading": "あく",
        "meaning": "壞的〜、不良的〜",
        "note": "表示「不好、不利」；與 好〜 相對。悪口・悪者 則讀 わる〜",
        "hot": true,
        "words": [
          {
            "word": "悪条件",
            "reading": "あくじょうけん",
            "gloss": "惡劣條件",
            "hot": true
          },
          {
            "word": "悪影響",
            "reading": "あくえいきょう",
            "gloss": "不良影響",
            "hot": true
          },
          {
            "word": "悪循環",
            "reading": "あくじゅんかん",
            "gloss": "惡性循環",
            "hot": false
          },
          {
            "word": "悪天候",
            "reading": "あくてんこう",
            "gloss": "惡劣天氣",
            "hot": false
          },
          {
            "word": "悪趣味",
            "reading": "あくしゅみ",
            "gloss": "低級趣味",
            "hot": false
          }
        ]
      },
      {
        "mark": "名〜",
        "reading": "めい",
        "meaning": "有名的〜、出色的〜",
        "note": "表示「出名的、傑出的」",
        "hot": false,
        "words": [
          {
            "word": "名選手",
            "reading": "めいせんしゅ",
            "gloss": "名選手",
            "hot": false
          },
          {
            "word": "名曲",
            "reading": "めいきょく",
            "gloss": "名曲",
            "hot": false
          },
          {
            "word": "名作",
            "reading": "めいさく",
            "gloss": "名作",
            "hot": false
          },
          {
            "word": "名場面",
            "reading": "めいばめん",
            "gloss": "經典場面",
            "hot": false
          },
          {
            "word": "名医",
            "reading": "めいい",
            "gloss": "名醫",
            "hot": false
          }
        ]
      },
      {
        "mark": "生〜",
        "reading": "なま／せい",
        "meaning": "生的〜、現場的〜",
        "note": "なま＝沒加工的、現場的；せい＝生命、學生等",
        "hot": false,
        "words": [
          {
            "word": "生放送",
            "reading": "なまほうそう",
            "gloss": "現場直播",
            "hot": false
          },
          {
            "word": "生ビール",
            "reading": "なまびーる",
            "gloss": "生啤酒",
            "hot": false
          },
          {
            "word": "生ごみ",
            "reading": "なまごみ",
            "gloss": "廚餘",
            "hot": false
          },
          {
            "word": "生卵",
            "reading": "なまたまご",
            "gloss": "生雞蛋",
            "hot": false
          },
          {
            "word": "生中継",
            "reading": "なまちゅうけい",
            "gloss": "現場轉播",
            "hot": false
          }
        ]
      },
      {
        "mark": "素〜",
        "reading": "す",
        "meaning": "不加修飾的〜、光著的〜",
        "note": "讀 す，表示「沒有附加物、原本的」；素人 是特殊讀法（しろうと）",
        "hot": false,
        "words": [
          {
            "word": "素顔",
            "reading": "すがお",
            "gloss": "素顏",
            "hot": false
          },
          {
            "word": "素足",
            "reading": "すあし",
            "gloss": "赤腳",
            "hot": false
          },
          {
            "word": "素手",
            "reading": "すで",
            "gloss": "空手",
            "hot": false
          },
          {
            "word": "素直",
            "reading": "すなお",
            "gloss": "坦率、老實",
            "hot": false
          }
        ]
      },
      {
        "mark": "薄〜",
        "reading": "うす",
        "meaning": "稍微〜、淡淡的〜",
        "note": "接動詞、形容詞或名詞，表示「淡、薄、稍微」",
        "hot": false,
        "words": [
          {
            "word": "薄暗い",
            "reading": "うすぐらい",
            "gloss": "昏暗",
            "hot": false
          },
          {
            "word": "薄着",
            "reading": "うすぎ",
            "gloss": "穿得單薄",
            "hot": false
          },
          {
            "word": "薄味",
            "reading": "うすあじ",
            "gloss": "口味清淡",
            "hot": false
          },
          {
            "word": "薄笑い",
            "reading": "うすわらい",
            "gloss": "冷笑、淺笑",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "性質・狀態",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜的",
        "reading": "てき",
        "meaning": "〜的、〜性質的",
        "note": "接在名詞後變成な形容詞（具体的な、効果的な），也可直接加「に」變副詞",
        "hot": true,
        "words": [
          {
            "word": "効果的",
            "reading": "こうかてき",
            "gloss": "有效的",
            "hot": true
          },
          {
            "word": "消極的",
            "reading": "しょうきょくてき",
            "gloss": "消極的",
            "hot": true
          },
          {
            "word": "比較的",
            "reading": "ひかくてき",
            "gloss": "比較地",
            "hot": true
          },
          {
            "word": "自動的",
            "reading": "じどうてき",
            "gloss": "自動的",
            "hot": true
          },
          {
            "word": "人工的",
            "reading": "じんこうてき",
            "gloss": "人工的",
            "hot": true
          },
          {
            "word": "圧倒的",
            "reading": "あっとうてき",
            "gloss": "壓倒性的",
            "hot": true
          },
          {
            "word": "典型的",
            "reading": "てんけいてき",
            "gloss": "典型的",
            "hot": true
          },
          {
            "word": "劇的",
            "reading": "げきてき",
            "gloss": "戲劇性的",
            "hot": true
          },
          {
            "word": "感情的",
            "reading": "かんじょうてき",
            "gloss": "情緒化的",
            "hot": true
          },
          {
            "word": "一般的",
            "reading": "いっぱんてき",
            "gloss": "一般的",
            "hot": true
          },
          {
            "word": "具体的",
            "reading": "ぐたいてき",
            "gloss": "具體的",
            "hot": false
          },
          {
            "word": "積極的",
            "reading": "せっきょくてき",
            "gloss": "積極的",
            "hot": false
          },
          {
            "word": "一時的",
            "reading": "いちじてき",
            "gloss": "暫時的",
            "hot": false
          },
          {
            "word": "基本的",
            "reading": "きほんてき",
            "gloss": "基本的",
            "hot": false
          },
          {
            "word": "日常的",
            "reading": "にちじょうてき",
            "gloss": "日常的",
            "hot": false
          },
          {
            "word": "経済的",
            "reading": "けいざいてき",
            "gloss": "經濟的",
            "hot": false
          },
          {
            "word": "精神的",
            "reading": "せいしんてき",
            "gloss": "精神上的",
            "hot": false
          },
          {
            "word": "国際的",
            "reading": "こくさいてき",
            "gloss": "國際性的",
            "hot": false
          },
          {
            "word": "個人的",
            "reading": "こじんてき",
            "gloss": "個人的",
            "hot": false
          },
          {
            "word": "社会的",
            "reading": "しゃかいてき",
            "gloss": "社會的",
            "hot": false
          },
          {
            "word": "現実的",
            "reading": "げんじつてき",
            "gloss": "現實的",
            "hot": false
          },
          {
            "word": "理想的",
            "reading": "りそうてき",
            "gloss": "理想的",
            "hot": false
          },
          {
            "word": "魅力的",
            "reading": "みりょくてき",
            "gloss": "有魅力的",
            "hot": false
          },
          {
            "word": "合理的",
            "reading": "ごうりてき",
            "gloss": "合理的",
            "hot": false
          },
          {
            "word": "健康的",
            "reading": "けんこうてき",
            "gloss": "健康的",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜性",
        "reading": "せい",
        "meaning": "〜性",
        "note": "表示性質、可能性；讀 せい（男性・女性 也讀 せい，但意思是「性別」）",
        "hot": false,
        "words": [
          {
            "word": "必要性",
            "reading": "ひつようせい",
            "gloss": "必要性",
            "hot": false
          },
          {
            "word": "可能性",
            "reading": "かのうせい",
            "gloss": "可能性",
            "hot": false
          },
          {
            "word": "重要性",
            "reading": "じゅうようせい",
            "gloss": "重要性",
            "hot": false
          },
          {
            "word": "安全性",
            "reading": "あんぜんせい",
            "gloss": "安全性",
            "hot": false
          },
          {
            "word": "積極性",
            "reading": "せっきょくせい",
            "gloss": "積極性",
            "hot": false
          },
          {
            "word": "危険性",
            "reading": "きけんせい",
            "gloss": "危險性",
            "hot": false
          },
          {
            "word": "将来性",
            "reading": "しょうらいせい",
            "gloss": "發展潛力",
            "hot": false
          },
          {
            "word": "柔軟性",
            "reading": "じゅうなんせい",
            "gloss": "靈活性",
            "hot": false
          },
          {
            "word": "独創性",
            "reading": "どくそうせい",
            "gloss": "獨創性",
            "hot": false
          },
          {
            "word": "個性",
            "reading": "こせい",
            "gloss": "個性",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜化",
        "reading": "か",
        "meaning": "〜化、變成〜",
        "note": "動作性：表示「變成〜」，常搭配 する／される",
        "hot": false,
        "words": [
          {
            "word": "都市化",
            "reading": "としか",
            "gloss": "都市化",
            "hot": false
          },
          {
            "word": "一般化",
            "reading": "いっぱんか",
            "gloss": "普遍化",
            "hot": false
          },
          {
            "word": "国際化",
            "reading": "こくさいか",
            "gloss": "國際化",
            "hot": false
          },
          {
            "word": "電子化",
            "reading": "でんしか",
            "gloss": "電子化",
            "hot": false
          },
          {
            "word": "自動化",
            "reading": "じどうか",
            "gloss": "自動化",
            "hot": false
          },
          {
            "word": "少子化",
            "reading": "しょうしか",
            "gloss": "少子化",
            "hot": false
          },
          {
            "word": "高齢化",
            "reading": "こうれいか",
            "gloss": "高齡化",
            "hot": false
          },
          {
            "word": "温暖化",
            "reading": "おんだんか",
            "gloss": "暖化",
            "hot": false
          },
          {
            "word": "機械化",
            "reading": "きかいか",
            "gloss": "機械化",
            "hot": false
          },
          {
            "word": "情報化",
            "reading": "じょうほうか",
            "gloss": "資訊化",
            "hot": false
          },
          {
            "word": "具体化",
            "reading": "ぐたいか",
            "gloss": "具體化",
            "hot": false
          },
          {
            "word": "悪化",
            "reading": "あっか",
            "gloss": "惡化",
            "hot": false
          },
          {
            "word": "強化",
            "reading": "きょうか",
            "gloss": "強化",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜感",
        "reading": "かん",
        "meaning": "〜感、〜的感覺",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "敏感",
            "reading": "びんかん",
            "gloss": "敏感",
            "hot": true
          },
          {
            "word": "鈍感",
            "reading": "どんかん",
            "gloss": "遲鈍",
            "hot": true
          },
          {
            "word": "満足感",
            "reading": "まんぞくかん",
            "gloss": "滿足感",
            "hot": false
          },
          {
            "word": "安心感",
            "reading": "あんしんかん",
            "gloss": "安心感",
            "hot": false
          },
          {
            "word": "達成感",
            "reading": "たっせいかん",
            "gloss": "成就感",
            "hot": false
          },
          {
            "word": "季節感",
            "reading": "きせつかん",
            "gloss": "季節感",
            "hot": false
          },
          {
            "word": "責任感",
            "reading": "せきにんかん",
            "gloss": "責任感",
            "hot": false
          },
          {
            "word": "孤独感",
            "reading": "こどくかん",
            "gloss": "孤獨感",
            "hot": false
          },
          {
            "word": "不安感",
            "reading": "ふあんかん",
            "gloss": "不安感",
            "hot": false
          },
          {
            "word": "開放感",
            "reading": "かいほうかん",
            "gloss": "開放感",
            "hot": false
          },
          {
            "word": "緊張感",
            "reading": "きんちょうかん",
            "gloss": "緊張感",
            "hot": false
          },
          {
            "word": "実感",
            "reading": "じっかん",
            "gloss": "實際感受",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜力",
        "reading": "りょく",
        "meaning": "〜力、〜能力",
        "note": "讀 りょく（體力 たいりょく、記憶力 きおくりょく）",
        "hot": false,
        "words": [
          {
            "word": "体力",
            "reading": "たいりょく",
            "gloss": "體力",
            "hot": false
          },
          {
            "word": "記憶力",
            "reading": "きおくりょく",
            "gloss": "記憶力",
            "hot": false
          },
          {
            "word": "集中力",
            "reading": "しゅうちゅうりょく",
            "gloss": "專注力",
            "hot": false
          },
          {
            "word": "想像力",
            "reading": "そうぞうりょく",
            "gloss": "想像力",
            "hot": false
          },
          {
            "word": "説得力",
            "reading": "せっとくりょく",
            "gloss": "說服力",
            "hot": false
          },
          {
            "word": "能力",
            "reading": "のうりょく",
            "gloss": "能力",
            "hot": false
          },
          {
            "word": "影響力",
            "reading": "えいきょうりょく",
            "gloss": "影響力",
            "hot": false
          },
          {
            "word": "理解力",
            "reading": "りかいりょく",
            "gloss": "理解力",
            "hot": false
          },
          {
            "word": "判断力",
            "reading": "はんだんりょく",
            "gloss": "判斷力",
            "hot": false
          },
          {
            "word": "語学力",
            "reading": "ごがくりょく",
            "gloss": "語言能力",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜風",
        "reading": "ふう",
        "meaning": "〜風格、〜式",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "和風",
            "reading": "わふう",
            "gloss": "日式風格",
            "hot": false
          },
          {
            "word": "洋風",
            "reading": "ようふう",
            "gloss": "西式風格",
            "hot": false
          },
          {
            "word": "今風",
            "reading": "いまふう",
            "gloss": "現代風",
            "hot": false
          },
          {
            "word": "現代風",
            "reading": "げんだいふう",
            "gloss": "現代風格",
            "hot": false
          },
          {
            "word": "中華風",
            "reading": "ちゅうかふう",
            "gloss": "中式風格",
            "hot": false
          },
          {
            "word": "北欧風",
            "reading": "ほくおうふう",
            "gloss": "北歐風格",
            "hot": false
          },
          {
            "word": "日本風",
            "reading": "にほんふう",
            "gloss": "日本風格",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜気味",
        "reading": "ぎみ",
        "meaning": "有點〜、略帶〜的傾向",
        "note": "接名詞或動詞ます形；多用於不好的狀態",
        "hot": false,
        "words": [
          {
            "word": "風邪気味",
            "reading": "かぜぎみ",
            "gloss": "有點感冒",
            "hot": false
          },
          {
            "word": "疲れ気味",
            "reading": "つかれぎみ",
            "gloss": "有點累",
            "hot": false
          },
          {
            "word": "太り気味",
            "reading": "ふとりぎみ",
            "gloss": "有點胖",
            "hot": false
          },
          {
            "word": "緊張気味",
            "reading": "きんちょうぎみ",
            "gloss": "有點緊張",
            "hot": false
          },
          {
            "word": "増加気味",
            "reading": "ぞうかぎみ",
            "gloss": "有增加的傾向",
            "hot": false
          },
          {
            "word": "焦り気味",
            "reading": "あせりぎみ",
            "gloss": "有點焦急",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜がち",
        "reading": "がち",
        "meaning": "容易〜、常常〜",
        "note": "接動詞ます形或名詞；多用於不好的傾向",
        "hot": false,
        "words": [
          {
            "word": "遅れがち",
            "reading": "おくれがち",
            "gloss": "容易遲到",
            "hot": false
          },
          {
            "word": "忘れがち",
            "reading": "わすれがち",
            "gloss": "容易忘記",
            "hot": false
          },
          {
            "word": "病気がち",
            "reading": "びょうきがち",
            "gloss": "常常生病",
            "hot": false
          },
          {
            "word": "ありがち",
            "reading": "ありがち",
            "gloss": "常有的、常見的",
            "hot": false
          },
          {
            "word": "遠慮がち",
            "reading": "えんりょがち",
            "gloss": "有點客氣、拘謹",
            "hot": false
          },
          {
            "word": "留守がち",
            "reading": "るすがち",
            "gloss": "常不在家",
            "hot": false
          },
          {
            "word": "曇りがち",
            "reading": "くもりがち",
            "gloss": "常常陰天",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜っぽい",
        "reading": "っぽい",
        "meaning": "像〜、帶有〜的傾向",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "子どもっぽい",
            "reading": "こどもっぽい",
            "gloss": "孩子氣的",
            "hot": false
          },
          {
            "word": "怒りっぽい",
            "reading": "おこりっぽい",
            "gloss": "愛生氣的",
            "hot": false
          },
          {
            "word": "忘れっぽい",
            "reading": "わすれっぽい",
            "gloss": "健忘的",
            "hot": false
          },
          {
            "word": "水っぽい",
            "reading": "みずっぽい",
            "gloss": "水水的、太稀",
            "hot": false
          },
          {
            "word": "黒っぽい",
            "reading": "くろっぽい",
            "gloss": "偏黑的",
            "hot": false
          },
          {
            "word": "白っぽい",
            "reading": "しろっぽい",
            "gloss": "偏白的",
            "hot": false
          },
          {
            "word": "飽きっぽい",
            "reading": "あきっぽい",
            "gloss": "容易厭倦的",
            "hot": false
          },
          {
            "word": "理屈っぽい",
            "reading": "りくつっぽい",
            "gloss": "愛講道理的",
            "hot": false
          },
          {
            "word": "安っぽい",
            "reading": "やすっぽい",
            "gloss": "廉價感的",
            "hot": false
          },
          {
            "word": "湿っぽい",
            "reading": "しめっぽい",
            "gloss": "潮濕的",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜らしい",
        "reading": "らしい",
        "meaning": "像〜樣子的",
        "note": "表示「有〜應有的樣子」（不同於「推測」的らしい）",
        "hot": false,
        "words": [
          {
            "word": "男らしい",
            "reading": "おとこらしい",
            "gloss": "有男子氣概",
            "hot": false
          },
          {
            "word": "春らしい",
            "reading": "はるらしい",
            "gloss": "有春天的感覺",
            "hot": false
          },
          {
            "word": "学生らしい",
            "reading": "がくせいらしい",
            "gloss": "像個學生",
            "hot": false
          },
          {
            "word": "自分らしい",
            "reading": "じぶんらしい",
            "gloss": "像自己的樣子",
            "hot": false
          },
          {
            "word": "日本人らしい",
            "reading": "にほんじんらしい",
            "gloss": "像日本人",
            "hot": false
          },
          {
            "word": "女らしい",
            "reading": "おんならしい",
            "gloss": "有女人味",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜さ／〜み",
        "reading": "さ／み",
        "meaning": "（形容詞）名詞化",
        "note": "〜さ＝程度（大きさ・暑さ）；〜み＝帶有感覺的部分（悲しみ・痛み・楽しみ）",
        "hot": true,
        "words": [
          {
            "word": "大きさ",
            "reading": "おおきさ",
            "gloss": "大小",
            "hot": true
          },
          {
            "word": "重さ",
            "reading": "おもさ",
            "gloss": "重量",
            "hot": true
          },
          {
            "word": "速さ",
            "reading": "はやさ",
            "gloss": "速度",
            "hot": true
          },
          {
            "word": "暑さ",
            "reading": "あつさ",
            "gloss": "熱的程度",
            "hot": false
          },
          {
            "word": "便利さ",
            "reading": "べんりさ",
            "gloss": "便利程度",
            "hot": false
          },
          {
            "word": "楽しみ",
            "reading": "たのしみ",
            "gloss": "期待",
            "hot": false
          },
          {
            "word": "痛み",
            "reading": "いたみ",
            "gloss": "疼痛",
            "hot": false
          },
          {
            "word": "強み",
            "reading": "つよみ",
            "gloss": "強項",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜離れ",
        "reading": "ばなれ",
        "meaning": "脫離〜、不再〜",
        "note": "接名詞：表示「脫離、疏遠」",
        "hot": true,
        "words": [
          {
            "word": "現実離れ",
            "reading": "げんじつばなれ",
            "gloss": "不切實際",
            "hot": true
          },
          {
            "word": "子ども離れ",
            "reading": "こどもばなれ",
            "gloss": "孩子不再依賴父母",
            "hot": false
          },
          {
            "word": "若者離れ",
            "reading": "わかものばなれ",
            "gloss": "年輕人疏遠（不再接觸）",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜だらけ",
        "reading": "だらけ",
        "meaning": "滿是〜、全是〜",
        "note": "接名詞，表示到處都是（多為不好的東西）；用於好事要用「〜ずくめ」",
        "hot": false,
        "words": [
          {
            "word": "泥だらけ",
            "reading": "どろだらけ",
            "gloss": "滿身泥巴",
            "hot": false
          },
          {
            "word": "傷だらけ",
            "reading": "きずだらけ",
            "gloss": "滿身是傷",
            "hot": false
          },
          {
            "word": "間違いだらけ",
            "reading": "まちがいだらけ",
            "gloss": "錯誤百出",
            "hot": false
          },
          {
            "word": "ごみだらけ",
            "reading": "ごみだらけ",
            "gloss": "滿是垃圾",
            "hot": false
          },
          {
            "word": "借金だらけ",
            "reading": "しゃっきんだらけ",
            "gloss": "負債累累",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜まみれ",
        "reading": "まみれ",
        "meaning": "沾滿〜",
        "note": "接汗、泥、血、油等液體或粉狀的東西，表示表面整個沾滿；不用於「傷」「間違い」",
        "hot": false,
        "words": [
          {
            "word": "汗まみれ",
            "reading": "あせまみれ",
            "gloss": "滿身大汗",
            "hot": false
          },
          {
            "word": "泥まみれ",
            "reading": "どろまみれ",
            "gloss": "滿身泥",
            "hot": false
          },
          {
            "word": "血まみれ",
            "reading": "ちまみれ",
            "gloss": "滿身是血",
            "hot": false
          },
          {
            "word": "油まみれ",
            "reading": "あぶらまみれ",
            "gloss": "滿是油污",
            "hot": false
          },
          {
            "word": "ほこりまみれ",
            "reading": "ほこりまみれ",
            "gloss": "滿是灰塵",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ずくめ",
        "reading": "ずくめ",
        "meaning": "全是〜、清一色〜",
        "note": "接名詞，表示「全部都是同一種」，多用於顏色與好事（黒ずくめ、いいことずくめ）",
        "hot": false,
        "words": [
          {
            "word": "黒ずくめ",
            "reading": "くろずくめ",
            "gloss": "一身黑",
            "hot": false
          },
          {
            "word": "いいことずくめ",
            "reading": "いいことずくめ",
            "gloss": "盡是好事",
            "hot": false
          },
          {
            "word": "ごちそうずくめ",
            "reading": "ごちそうずくめ",
            "gloss": "滿桌佳餚",
            "hot": false
          },
          {
            "word": "規則ずくめ",
            "reading": "きそくずくめ",
            "gloss": "規定多得不得了",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜がる",
        "reading": "がる",
        "meaning": "覺得〜、表現出〜的樣子",
        "note": "接形容詞詞幹，表示「第三人稱」的感情、感覺（嫌がる、欲しがる）；第一人稱用「〜い」",
        "hot": false,
        "words": [
          {
            "word": "嫌がる",
            "reading": "いやがる",
            "gloss": "討厭、不願意",
            "hot": false
          },
          {
            "word": "欲しがる",
            "reading": "ほしがる",
            "gloss": "想要",
            "hot": false
          },
          {
            "word": "怖がる",
            "reading": "こわがる",
            "gloss": "害怕",
            "hot": false
          },
          {
            "word": "恥ずかしがる",
            "reading": "はずかしがる",
            "gloss": "害羞",
            "hot": false
          },
          {
            "word": "寂しがる",
            "reading": "さみしがる",
            "gloss": "覺得寂寞",
            "hot": false
          },
          {
            "word": "残念がる",
            "reading": "ざんねんがる",
            "gloss": "覺得遺憾",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜げ",
        "reading": "げ",
        "meaning": "似乎〜、看起來〜的樣子",
        "note": "接形容詞詞幹或名詞，表示外觀上給人的感覺，後面多接「な」「に」",
        "hot": false,
        "words": [
          {
            "word": "悲しげ",
            "reading": "かなしげ",
            "gloss": "悲傷的樣子",
            "hot": false
          },
          {
            "word": "不安げ",
            "reading": "ふあんげ",
            "gloss": "不安的樣子",
            "hot": false
          },
          {
            "word": "自慢げ",
            "reading": "じまんげ",
            "gloss": "得意的樣子",
            "hot": false
          },
          {
            "word": "楽しげ",
            "reading": "たのしげ",
            "gloss": "愉快的樣子",
            "hot": false
          },
          {
            "word": "得意げ",
            "reading": "とくいげ",
            "gloss": "洋洋得意",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜めく",
        "reading": "めく",
        "meaning": "帶有〜的氣息、呈現〜的樣子",
        "note": "接名詞，變成五段動詞；常用過去形「〜めいた」修飾名詞",
        "hot": false,
        "words": [
          {
            "word": "春めく",
            "reading": "はるめく",
            "gloss": "有春天的氣息",
            "hot": false
          },
          {
            "word": "秋めく",
            "reading": "あきめく",
            "gloss": "有秋天的氣息",
            "hot": false
          },
          {
            "word": "謎めく",
            "reading": "なぞめく",
            "gloss": "神祕兮兮",
            "hot": false
          },
          {
            "word": "冗談めく",
            "reading": "じょうだんめく",
            "gloss": "像開玩笑",
            "hot": false
          },
          {
            "word": "皮肉めく",
            "reading": "ひにくめく",
            "gloss": "帶諷刺意味",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ぶる",
        "reading": "ぶる",
        "meaning": "裝出〜的樣子、自以為〜",
        "note": "接名詞或形容詞詞幹，表示「裝模作樣」，帶貶意；注意與「〜ぶり」不同",
        "hot": false,
        "words": [
          {
            "word": "偉ぶる",
            "reading": "えらぶる",
            "gloss": "擺架子",
            "hot": false
          },
          {
            "word": "上品ぶる",
            "reading": "じょうひんぶる",
            "gloss": "裝高雅",
            "hot": false
          },
          {
            "word": "もったいぶる",
            "reading": "もったいぶる",
            "gloss": "故作姿態",
            "hot": false
          },
          {
            "word": "学者ぶる",
            "reading": "がくしゃぶる",
            "gloss": "裝作學者",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜くさい",
        "reading": "くさい",
        "meaning": "有〜的氣味／帶〜的感覺",
        "note": "表示「有臭味」，也可比喻「有那種讓人不喜歡的感覺」（面倒くさい・古くさい）；汗臭い 的「臭い」也可寫平假名",
        "hot": false,
        "words": [
          {
            "word": "古臭い",
            "reading": "ふるくさい",
            "gloss": "老舊的、陳腐的",
            "hot": false
          },
          {
            "word": "面倒くさい",
            "reading": "めんどうくさい",
            "gloss": "麻煩的",
            "hot": false
          },
          {
            "word": "照れくさい",
            "reading": "てれくさい",
            "gloss": "難為情的",
            "hot": false
          },
          {
            "word": "汗臭い",
            "reading": "あせくさい",
            "gloss": "有汗臭味的",
            "hot": false
          },
          {
            "word": "うさんくさい",
            "reading": "うさんくさい",
            "gloss": "可疑的",
            "hot": false
          },
          {
            "word": "焦げ臭い",
            "reading": "こげくさい",
            "gloss": "有燒焦味的",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜観",
        "reading": "かん",
        "meaning": "〜觀、〜看法",
        "note": "表示對事物的看法、想法（〜感＝感覺，〜観＝觀念，容易混淆）",
        "hot": false,
        "words": [
          {
            "word": "人生観",
            "reading": "じんせいかん",
            "gloss": "人生觀",
            "hot": false
          },
          {
            "word": "価値観",
            "reading": "かちかん",
            "gloss": "價值觀",
            "hot": false
          },
          {
            "word": "世界観",
            "reading": "せかいかん",
            "gloss": "世界觀",
            "hot": false
          },
          {
            "word": "先入観",
            "reading": "せんにゅうかん",
            "gloss": "先入為主的觀念",
            "hot": false
          },
          {
            "word": "職業観",
            "reading": "しょくぎょうかん",
            "gloss": "職業觀",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "人",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜者",
        "reading": "しゃ",
        "meaning": "〜的人",
        "note": "讀 しゃ，帶有「做這件事的人」的意思",
        "hot": false,
        "words": [
          {
            "word": "愛用者",
            "reading": "あいようしゃ",
            "gloss": "愛用者",
            "hot": false
          },
          {
            "word": "参加者",
            "reading": "さんかしゃ",
            "gloss": "參加者",
            "hot": false
          },
          {
            "word": "利用者",
            "reading": "りようしゃ",
            "gloss": "使用者",
            "hot": false
          },
          {
            "word": "責任者",
            "reading": "せきにんしゃ",
            "gloss": "負責人",
            "hot": false
          },
          {
            "word": "研究者",
            "reading": "けんきゅうしゃ",
            "gloss": "研究者",
            "hot": false
          },
          {
            "word": "経験者",
            "reading": "けいけんしゃ",
            "gloss": "有經驗者",
            "hot": false
          },
          {
            "word": "経営者",
            "reading": "けいえいしゃ",
            "gloss": "經營者",
            "hot": false
          },
          {
            "word": "担当者",
            "reading": "たんとうしゃ",
            "gloss": "負責人",
            "hot": false
          },
          {
            "word": "関係者",
            "reading": "かんけいしゃ",
            "gloss": "相關人員",
            "hot": false
          },
          {
            "word": "初心者",
            "reading": "しょしんしゃ",
            "gloss": "初學者",
            "hot": false
          },
          {
            "word": "代表者",
            "reading": "だいひょうしゃ",
            "gloss": "代表",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜家",
        "reading": "か",
        "meaning": "〜家（專家）",
        "note": "表示專門從事的人",
        "hot": false,
        "words": [
          {
            "word": "作曲家",
            "reading": "さっきょくか",
            "gloss": "作曲家",
            "hot": false
          },
          {
            "word": "専門家",
            "reading": "せんもんか",
            "gloss": "專家",
            "hot": false
          },
          {
            "word": "評論家",
            "reading": "ひょうろんか",
            "gloss": "評論家",
            "hot": false
          },
          {
            "word": "努力家",
            "reading": "どりょくか",
            "gloss": "努力的人",
            "hot": false
          },
          {
            "word": "政治家",
            "reading": "せいじか",
            "gloss": "政治家",
            "hot": false
          },
          {
            "word": "画家",
            "reading": "がか",
            "gloss": "畫家",
            "hot": false
          },
          {
            "word": "音楽家",
            "reading": "おんがくか",
            "gloss": "音樂家",
            "hot": false
          },
          {
            "word": "実業家",
            "reading": "じつぎょうか",
            "gloss": "實業家",
            "hot": false
          },
          {
            "word": "愛妻家",
            "reading": "あいさいか",
            "gloss": "愛妻者",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜員",
        "reading": "いん",
        "meaning": "〜員",
        "note": "屬於某組織的人",
        "hot": false,
        "words": [
          {
            "word": "会社員",
            "reading": "かいしゃいん",
            "gloss": "公司職員",
            "hot": false
          },
          {
            "word": "店員",
            "reading": "てんいん",
            "gloss": "店員",
            "hot": false
          },
          {
            "word": "駅員",
            "reading": "えきいん",
            "gloss": "站務員",
            "hot": false
          },
          {
            "word": "係員",
            "reading": "かかりいん",
            "gloss": "承辦人員",
            "hot": false
          },
          {
            "word": "公務員",
            "reading": "こうむいん",
            "gloss": "公務員",
            "hot": false
          },
          {
            "word": "銀行員",
            "reading": "ぎんこういん",
            "gloss": "銀行員",
            "hot": false
          },
          {
            "word": "会員",
            "reading": "かいいん",
            "gloss": "會員",
            "hot": false
          },
          {
            "word": "委員",
            "reading": "いいん",
            "gloss": "委員",
            "hot": false
          },
          {
            "word": "職員",
            "reading": "しょくいん",
            "gloss": "職員",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜士・〜師",
        "reading": "し",
        "meaning": "〜士／〜師（有資格的專業人士）",
        "note": "〜士＝國家資格（弁護士）；〜師＝技術或教導（教師・看護師）",
        "hot": true,
        "words": [
          {
            "word": "講師",
            "reading": "こうし",
            "gloss": "講師",
            "hot": true
          },
          {
            "word": "弁護士",
            "reading": "べんごし",
            "gloss": "律師",
            "hot": false
          },
          {
            "word": "栄養士",
            "reading": "えいようし",
            "gloss": "營養師",
            "hot": false
          },
          {
            "word": "教師",
            "reading": "きょうし",
            "gloss": "教師",
            "hot": false
          },
          {
            "word": "看護師",
            "reading": "かんごし",
            "gloss": "護理師",
            "hot": false
          },
          {
            "word": "美容師",
            "reading": "びようし",
            "gloss": "美髮師",
            "hot": false
          },
          {
            "word": "会計士",
            "reading": "かいけいし",
            "gloss": "會計師",
            "hot": false
          },
          {
            "word": "税理士",
            "reading": "ぜいりし",
            "gloss": "稅務師",
            "hot": false
          },
          {
            "word": "保育士",
            "reading": "ほいくし",
            "gloss": "保育員",
            "hot": false
          },
          {
            "word": "薬剤師",
            "reading": "やくざいし",
            "gloss": "藥劑師",
            "hot": false
          },
          {
            "word": "医師",
            "reading": "いし",
            "gloss": "醫師",
            "hot": false
          },
          {
            "word": "漁師",
            "reading": "りょうし",
            "gloss": "漁夫",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜長",
        "reading": "ちょう",
        "meaning": "〜長（負責人）",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "社長",
            "reading": "しゃちょう",
            "gloss": "社長",
            "hot": false
          },
          {
            "word": "部長",
            "reading": "ぶちょう",
            "gloss": "部長",
            "hot": false
          },
          {
            "word": "課長",
            "reading": "かちょう",
            "gloss": "課長",
            "hot": false
          },
          {
            "word": "校長",
            "reading": "こうちょう",
            "gloss": "校長",
            "hot": false
          },
          {
            "word": "店長",
            "reading": "てんちょう",
            "gloss": "店長",
            "hot": false
          },
          {
            "word": "委員長",
            "reading": "いいんちょう",
            "gloss": "委員長",
            "hot": false
          },
          {
            "word": "市長",
            "reading": "しちょう",
            "gloss": "市長",
            "hot": false
          },
          {
            "word": "館長",
            "reading": "かんちょう",
            "gloss": "館長",
            "hot": false
          },
          {
            "word": "所長",
            "reading": "しょちょう",
            "gloss": "所長",
            "hot": false
          },
          {
            "word": "局長",
            "reading": "きょくちょう",
            "gloss": "局長",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜生",
        "reading": "せい",
        "meaning": "〜生（學生）",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "小学生",
            "reading": "しょうがくせい",
            "gloss": "小學生",
            "hot": false
          },
          {
            "word": "留学生",
            "reading": "りゅうがくせい",
            "gloss": "留學生",
            "hot": false
          },
          {
            "word": "新入生",
            "reading": "しんにゅうせい",
            "gloss": "新生",
            "hot": false
          },
          {
            "word": "卒業生",
            "reading": "そつぎょうせい",
            "gloss": "畢業生",
            "hot": false
          },
          {
            "word": "高校生",
            "reading": "こうこうせい",
            "gloss": "高中生",
            "hot": false
          },
          {
            "word": "大学生",
            "reading": "だいがくせい",
            "gloss": "大學生",
            "hot": false
          },
          {
            "word": "研修生",
            "reading": "けんしゅうせい",
            "gloss": "實習生",
            "hot": false
          },
          {
            "word": "受験生",
            "reading": "じゅけんせい",
            "gloss": "考生",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜手",
        "reading": "しゅ／て",
        "meaning": "〜手（做某事的人）",
        "note": "〜手 讀 しゅ（歌手・運転手）或 て（相手・買い手）",
        "hot": true,
        "words": [
          {
            "word": "選手",
            "reading": "せんしゅ",
            "gloss": "選手",
            "hot": true
          },
          {
            "word": "握手",
            "reading": "あくしゅ",
            "gloss": "握手",
            "hot": true
          },
          {
            "word": "拍手",
            "reading": "はくしゅ",
            "gloss": "拍手",
            "hot": true
          },
          {
            "word": "働き手",
            "reading": "はたらきて",
            "gloss": "勞動力",
            "hot": true
          },
          {
            "word": "勝手",
            "reading": "かって",
            "gloss": "任意、隨便",
            "hot": true
          },
          {
            "word": "運転手",
            "reading": "うんてんしゅ",
            "gloss": "司機",
            "hot": false
          },
          {
            "word": "歌手",
            "reading": "かしゅ",
            "gloss": "歌手",
            "hot": false
          },
          {
            "word": "相手",
            "reading": "あいて",
            "gloss": "對方",
            "hot": false
          },
          {
            "word": "買い手",
            "reading": "かいて",
            "gloss": "買方",
            "hot": false
          },
          {
            "word": "話し手",
            "reading": "はなして",
            "gloss": "說話者",
            "hot": false
          },
          {
            "word": "聞き手",
            "reading": "ききて",
            "gloss": "聽者",
            "hot": false
          },
          {
            "word": "送り手",
            "reading": "おくりて",
            "gloss": "寄件者、傳達者",
            "hot": false
          },
          {
            "word": "担い手",
            "reading": "にないて",
            "gloss": "承擔者",
            "hot": false
          },
          {
            "word": "助手",
            "reading": "じょしゅ",
            "gloss": "助手",
            "hot": false
          },
          {
            "word": "苦手",
            "reading": "にがて",
            "gloss": "不擅長",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜屋",
        "reading": "や",
        "meaning": "〜店、〜行業的人、有〜特質的人",
        "note": "表示店家或從事某種行業的人；也可指某種個性的人（恥ずかしがり屋）",
        "hot": false,
        "words": [
          {
            "word": "本屋",
            "reading": "ほんや",
            "gloss": "書店",
            "hot": false
          },
          {
            "word": "花屋",
            "reading": "はなや",
            "gloss": "花店",
            "hot": false
          },
          {
            "word": "八百屋",
            "reading": "やおや",
            "gloss": "蔬果店",
            "hot": false
          },
          {
            "word": "魚屋",
            "reading": "さかなや",
            "gloss": "魚店",
            "hot": false
          },
          {
            "word": "頑張り屋",
            "reading": "がんばりや",
            "gloss": "努力的人",
            "hot": false
          },
          {
            "word": "恥ずかしがり屋",
            "reading": "はずかしがりや",
            "gloss": "容易害羞的人",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "順序・範圍・位置",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜順",
        "reading": "じゅん",
        "meaning": "按〜順序",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "年代順",
            "reading": "ねんだいじゅん",
            "gloss": "按年代順序",
            "hot": true
          },
          {
            "word": "先着順",
            "reading": "せんちゃくじゅん",
            "gloss": "依先後順序",
            "hot": true
          },
          {
            "word": "五十音順",
            "reading": "ごじゅうおんじゅん",
            "gloss": "五十音順序",
            "hot": false
          },
          {
            "word": "番号順",
            "reading": "ばんごうじゅん",
            "gloss": "按號碼順序",
            "hot": false
          },
          {
            "word": "成績順",
            "reading": "せいせきじゅん",
            "gloss": "按成績順序",
            "hot": false
          },
          {
            "word": "到着順",
            "reading": "とうちゃくじゅん",
            "gloss": "按抵達順序",
            "hot": false
          },
          {
            "word": "申し込み順",
            "reading": "もうしこみじゅん",
            "gloss": "按申請順序",
            "hot": false
          },
          {
            "word": "アルファベット順",
            "reading": "あるふぁべっとじゅん",
            "gloss": "按字母順序",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜下",
        "reading": "か",
        "meaning": "在〜之下、〜的影響下",
        "note": "讀 か；表示「在某種條件或支配下」",
        "hot": true,
        "words": [
          {
            "word": "管理下",
            "reading": "かんりか",
            "gloss": "管理之下",
            "hot": true
          },
          {
            "word": "影響下",
            "reading": "えいきょうか",
            "gloss": "影響之下",
            "hot": false
          },
          {
            "word": "支配下",
            "reading": "しはいか",
            "gloss": "支配之下",
            "hot": false
          },
          {
            "word": "条件下",
            "reading": "じょうけんか",
            "gloss": "條件下",
            "hot": false
          },
          {
            "word": "指導下",
            "reading": "しどうか",
            "gloss": "指導之下",
            "hot": false
          },
          {
            "word": "統治下",
            "reading": "とうちか",
            "gloss": "統治之下",
            "hot": false
          },
          {
            "word": "監視下",
            "reading": "かんしか",
            "gloss": "監視之下",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜中",
        "reading": "ちゅう／じゅう",
        "meaning": "〜期間、〜之中／整個〜",
        "note": "〜ちゅう＝正在〜、〜期間（勉強中）；〜じゅう＝整個〜（一日中・世界中）",
        "hot": true,
        "words": [
          {
            "word": "一日中",
            "reading": "いちにちじゅう",
            "gloss": "一整天",
            "hot": true
          },
          {
            "word": "夢中",
            "reading": "むちゅう",
            "gloss": "著迷、專心",
            "hot": true
          },
          {
            "word": "勉強中",
            "reading": "べんきょうちゅう",
            "gloss": "正在讀書",
            "hot": false
          },
          {
            "word": "工事中",
            "reading": "こうじちゅう",
            "gloss": "施工中",
            "hot": false
          },
          {
            "word": "午前中",
            "reading": "ごぜんちゅう",
            "gloss": "上午之內",
            "hot": false
          },
          {
            "word": "今週中",
            "reading": "こんしゅうちゅう",
            "gloss": "這週之內",
            "hot": false
          },
          {
            "word": "世界中",
            "reading": "せかいじゅう",
            "gloss": "全世界",
            "hot": false
          },
          {
            "word": "営業中",
            "reading": "えいぎょうちゅう",
            "gloss": "營業中",
            "hot": false
          },
          {
            "word": "食事中",
            "reading": "しょくじちゅう",
            "gloss": "用餐中",
            "hot": false
          },
          {
            "word": "会議中",
            "reading": "かいぎちゅう",
            "gloss": "會議中",
            "hot": false
          },
          {
            "word": "使用中",
            "reading": "しようちゅう",
            "gloss": "使用中",
            "hot": false
          },
          {
            "word": "準備中",
            "reading": "じゅんびちゅう",
            "gloss": "準備中",
            "hot": false
          },
          {
            "word": "一年中",
            "reading": "いちねんじゅう",
            "gloss": "一整年",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜内／〜外",
        "reading": "ない／がい",
        "meaning": "〜之內／〜之外",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "案外",
            "reading": "あんがい",
            "gloss": "意外地",
            "hot": true
          },
          {
            "word": "室内",
            "reading": "しつない",
            "gloss": "室內",
            "hot": false
          },
          {
            "word": "社内",
            "reading": "しゃない",
            "gloss": "公司內",
            "hot": false
          },
          {
            "word": "予算内",
            "reading": "よさんない",
            "gloss": "預算內",
            "hot": false
          },
          {
            "word": "時間外",
            "reading": "じかんがい",
            "gloss": "時間外",
            "hot": false
          },
          {
            "word": "予想外",
            "reading": "よそうがい",
            "gloss": "出乎意料",
            "hot": false
          },
          {
            "word": "圏外",
            "reading": "けんがい",
            "gloss": "範圍之外",
            "hot": false
          },
          {
            "word": "国内",
            "reading": "こくない",
            "gloss": "國內",
            "hot": false
          },
          {
            "word": "校内",
            "reading": "こうない",
            "gloss": "校內",
            "hot": false
          },
          {
            "word": "圏内",
            "reading": "けんない",
            "gloss": "範圍內",
            "hot": false
          },
          {
            "word": "範囲内",
            "reading": "はんいない",
            "gloss": "範圍內",
            "hot": false
          },
          {
            "word": "対象外",
            "reading": "たいしょうがい",
            "gloss": "對象之外",
            "hot": false
          },
          {
            "word": "規格外",
            "reading": "きかくがい",
            "gloss": "規格外",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜上",
        "reading": "じょう",
        "meaning": "在〜方面、從〜來看",
        "note": "表示「就〜這個角度」",
        "hot": false,
        "words": [
          {
            "word": "教育上",
            "reading": "きょういくじょう",
            "gloss": "教育上",
            "hot": false
          },
          {
            "word": "仕事上",
            "reading": "しごとじょう",
            "gloss": "工作上",
            "hot": false
          },
          {
            "word": "法律上",
            "reading": "ほうりつじょう",
            "gloss": "法律上",
            "hot": false
          },
          {
            "word": "安全上",
            "reading": "あんぜんじょう",
            "gloss": "安全上",
            "hot": false
          },
          {
            "word": "歴史上",
            "reading": "れきしじょう",
            "gloss": "歷史上",
            "hot": false
          },
          {
            "word": "健康上",
            "reading": "けんこうじょう",
            "gloss": "健康上",
            "hot": false
          },
          {
            "word": "経営上",
            "reading": "けいえいじょう",
            "gloss": "經營上",
            "hot": false
          },
          {
            "word": "立場上",
            "reading": "たちばじょう",
            "gloss": "立場上",
            "hot": false
          },
          {
            "word": "事実上",
            "reading": "じじつじょう",
            "gloss": "事實上",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜付き",
        "reading": "つき",
        "meaning": "附帶〜、有〜的",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "食事付き",
            "reading": "しょくじつき",
            "gloss": "附餐",
            "hot": false
          },
          {
            "word": "保証付き",
            "reading": "ほしょうつき",
            "gloss": "附保證",
            "hot": false
          },
          {
            "word": "家具付き",
            "reading": "かぐつき",
            "gloss": "附家具",
            "hot": false
          },
          {
            "word": "条件付き",
            "reading": "じょうけんつき",
            "gloss": "有附帶條件",
            "hot": false
          },
          {
            "word": "朝食付き",
            "reading": "ちょうしょくつき",
            "gloss": "附早餐",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜済み",
        "reading": "ずみ",
        "meaning": "已經〜、〜完畢",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "使用済み",
            "reading": "しようずみ",
            "gloss": "已使用",
            "hot": false
          },
          {
            "word": "確認済み",
            "reading": "かくにんずみ",
            "gloss": "已確認",
            "hot": false
          },
          {
            "word": "予約済み",
            "reading": "よやくずみ",
            "gloss": "已預約",
            "hot": false
          },
          {
            "word": "支払い済み",
            "reading": "しはらいずみ",
            "gloss": "已付款",
            "hot": false
          },
          {
            "word": "処理済み",
            "reading": "しょりずみ",
            "gloss": "已處理",
            "hot": false
          },
          {
            "word": "提出済み",
            "reading": "ていしゅつずみ",
            "gloss": "已提出",
            "hot": false
          },
          {
            "word": "検査済み",
            "reading": "けんさずみ",
            "gloss": "已檢查",
            "hot": false
          },
          {
            "word": "登録済み",
            "reading": "とうろくずみ",
            "gloss": "已登錄",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜以上／〜以下",
        "reading": "いじょう／いか",
        "meaning": "〜以上／〜以下",
        "note": "兩者都包含基準本身（20歳以上＝20歲也算）；不含基準本身要用「〜を超える」「〜未満」",
        "hot": false,
        "words": [
          {
            "word": "二十歳以上",
            "reading": "にじゅっさいいじょう",
            "gloss": "二十歲以上",
            "hot": false
          },
          {
            "word": "三人以上",
            "reading": "さんにんいじょう",
            "gloss": "三人以上",
            "hot": false
          },
          {
            "word": "予想以上",
            "reading": "よそういじょう",
            "gloss": "超出預期",
            "hot": false
          },
          {
            "word": "五千円以下",
            "reading": "ごせんえんいか",
            "gloss": "五千日圓以下",
            "hot": false
          },
          {
            "word": "平均以下",
            "reading": "へいきんいか",
            "gloss": "平均以下",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜以内／〜以外",
        "reading": "いない／いがい",
        "meaning": "〜之內／〜之外",
        "note": "〜以内 含基準本身；〜以外 表示「除了〜以外」",
        "hot": false,
        "words": [
          {
            "word": "三日以内",
            "reading": "みっかいない",
            "gloss": "三天以內",
            "hot": false
          },
          {
            "word": "一時間以内",
            "reading": "いちじかんいない",
            "gloss": "一小時以內",
            "hot": false
          },
          {
            "word": "日曜日以外",
            "reading": "にちようびいがい",
            "gloss": "週日以外",
            "hot": false
          },
          {
            "word": "関係者以外",
            "reading": "かんけいしゃいがい",
            "gloss": "相關人員以外",
            "hot": false
          },
          {
            "word": "それ以外",
            "reading": "それいがい",
            "gloss": "除此之外",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜以前／〜以後／〜以降",
        "reading": "いぜん／いご／いこう",
        "meaning": "〜以前／〜以後／〜以降",
        "note": "〜以前＝在〜之前；〜以後・〜以降＝從〜起之後（以降 較書面、含起點）",
        "hot": false,
        "words": [
          {
            "word": "入社以前",
            "reading": "にゅうしゃいぜん",
            "gloss": "進公司以前",
            "hot": false
          },
          {
            "word": "卒業以後",
            "reading": "そつぎょういご",
            "gloss": "畢業以後",
            "hot": false
          },
          {
            "word": "来月以降",
            "reading": "らいげついこう",
            "gloss": "下個月以後",
            "hot": false
          },
          {
            "word": "三月以降",
            "reading": "さんがついこう",
            "gloss": "三月以後",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜未満",
        "reading": "みまん",
        "meaning": "未滿〜",
        "note": "不包含基準本身（18歳未満＝17歲以下）；與「〜以下」包含基準不同",
        "hot": false,
        "words": [
          {
            "word": "十八歳未満",
            "reading": "じゅうはっさいみまん",
            "gloss": "未滿十八歲",
            "hot": false
          },
          {
            "word": "千円未満",
            "reading": "せんえんみまん",
            "gloss": "未滿千圓",
            "hot": false
          },
          {
            "word": "十人未満",
            "reading": "じゅうにんみまん",
            "gloss": "未滿十人",
            "hot": false
          },
          {
            "word": "五分未満",
            "reading": "ごふんみまん",
            "gloss": "未滿五分鐘",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜際",
        "reading": "さい／ぎわ",
        "meaning": "〜的時候",
        "note": "〜際（さい）為書面語，表「在〜之際」；〜ぎわ＝正要〜的時候、邊緣（窓際）",
        "hot": false,
        "words": [
          {
            "word": "国際",
            "reading": "こくさい",
            "gloss": "國際",
            "hot": false
          },
          {
            "word": "実際",
            "reading": "じっさい",
            "gloss": "實際",
            "hot": false
          },
          {
            "word": "交際",
            "reading": "こうさい",
            "gloss": "交往",
            "hot": false
          },
          {
            "word": "別れ際",
            "reading": "わかれぎわ",
            "gloss": "臨別之際",
            "hot": false
          },
          {
            "word": "窓際",
            "reading": "まどぎわ",
            "gloss": "窗邊",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜年度",
        "reading": "ねんど",
        "meaning": "〜年度",
        "note": "日本的年度通常是 4月到次年3月（會計、學校）；與曆年不同",
        "hot": false,
        "words": [
          {
            "word": "今年度",
            "reading": "こんねんど",
            "gloss": "本年度",
            "hot": false
          },
          {
            "word": "来年度",
            "reading": "らいねんど",
            "gloss": "下一年度",
            "hot": false
          },
          {
            "word": "会計年度",
            "reading": "かいけいねんど",
            "gloss": "會計年度",
            "hot": false
          },
          {
            "word": "二〇二六年度",
            "reading": "にせんにじゅうろくねんど",
            "gloss": "2026 年度",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜間",
        "reading": "かん",
        "meaning": "〜期間",
        "note": "接時間詞，表示持續的長度（三日間＝三天），不同於「〜中」",
        "hot": false,
        "words": [
          {
            "word": "三日間",
            "reading": "みっかかん",
            "gloss": "三天期間",
            "hot": false
          },
          {
            "word": "二週間",
            "reading": "にしゅうかん",
            "gloss": "兩週",
            "hot": false
          },
          {
            "word": "一時間",
            "reading": "いちじかん",
            "gloss": "一小時",
            "hot": false
          },
          {
            "word": "五年間",
            "reading": "ごねんかん",
            "gloss": "五年期間",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜目",
        "reading": "め",
        "meaning": "第〜、〜的部分",
        "note": "接數詞表示順序（三日目）；也可指事物的交界或部分（境目）；與 〜め（稍微）不同",
        "hot": false,
        "words": [
          {
            "word": "一番目",
            "reading": "いちばんめ",
            "gloss": "第一個",
            "hot": false
          },
          {
            "word": "二日目",
            "reading": "ふつかめ",
            "gloss": "第二天",
            "hot": false
          },
          {
            "word": "二回目",
            "reading": "にかいめ",
            "gloss": "第二次",
            "hot": false
          },
          {
            "word": "境目",
            "reading": "さかいめ",
            "gloss": "分界",
            "hot": false
          },
          {
            "word": "節目",
            "reading": "ふしめ",
            "gloss": "節點、關卡",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜沿い",
        "reading": "ぞい",
        "meaning": "沿著〜",
        "note": "接道路、河川等延伸的事物",
        "hot": false,
        "words": [
          {
            "word": "川沿い",
            "reading": "かわぞい",
            "gloss": "沿河",
            "hot": false
          },
          {
            "word": "海沿い",
            "reading": "うみぞい",
            "gloss": "沿海",
            "hot": false
          },
          {
            "word": "道沿い",
            "reading": "みちぞい",
            "gloss": "沿路",
            "hot": false
          },
          {
            "word": "線路沿い",
            "reading": "せんろぞい",
            "gloss": "沿著鐵軌",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜寄り",
        "reading": "より",
        "meaning": "偏〜、靠〜",
        "note": "接方向、場所或立場，表示「偏向」",
        "hot": false,
        "words": [
          {
            "word": "右寄り",
            "reading": "みぎより",
            "gloss": "偏右",
            "hot": false
          },
          {
            "word": "左寄り",
            "reading": "ひだりより",
            "gloss": "偏左",
            "hot": false
          },
          {
            "word": "駅寄り",
            "reading": "えきより",
            "gloss": "靠近車站",
            "hot": false
          },
          {
            "word": "北寄り",
            "reading": "きたより",
            "gloss": "偏北",
            "hot": false
          },
          {
            "word": "年寄り",
            "reading": "としより",
            "gloss": "老人",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜側",
        "reading": "がわ",
        "meaning": "〜側、〜方",
        "note": "表示位置或立場的一邊",
        "hot": true,
        "words": [
          {
            "word": "内側",
            "reading": "うちがわ",
            "gloss": "內側",
            "hot": true
          },
          {
            "word": "右側",
            "reading": "みぎがわ",
            "gloss": "右側",
            "hot": false
          },
          {
            "word": "反対側",
            "reading": "はんたいがわ",
            "gloss": "對面、反方向",
            "hot": false
          },
          {
            "word": "会社側",
            "reading": "かいしゃがわ",
            "gloss": "公司方面",
            "hot": false
          },
          {
            "word": "北側",
            "reading": "きたがわ",
            "gloss": "北側",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ごろ",
        "reading": "ごろ／ころ",
        "meaning": "大約〜時候、正好的時機",
        "note": "〜ごろ＝大約（三時ごろ）；〜ごろ 接動詞ます形＝正好的時機（食べごろ）",
        "hot": false,
        "words": [
          {
            "word": "三時ごろ",
            "reading": "さんじごろ",
            "gloss": "三點左右",
            "hot": false
          },
          {
            "word": "今ごろ",
            "reading": "いまごろ",
            "gloss": "這個時候",
            "hot": false
          },
          {
            "word": "食べごろ",
            "reading": "たべごろ",
            "gloss": "正好吃的時候",
            "hot": false
          },
          {
            "word": "見ごろ",
            "reading": "みごろ",
            "gloss": "最佳觀賞時機",
            "hot": false
          },
          {
            "word": "年ごろ",
            "reading": "としごろ",
            "gloss": "適婚年齡",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜おき",
        "reading": "おき",
        "meaning": "每隔〜",
        "note": "接數量詞，表示間隔；一日おき＝隔一天（每兩天一次），與「毎日」不同",
        "hot": false,
        "words": [
          {
            "word": "一日おき",
            "reading": "いちにちおき",
            "gloss": "隔一天",
            "hot": false
          },
          {
            "word": "一年おき",
            "reading": "いちねんおき",
            "gloss": "隔一年",
            "hot": false
          },
          {
            "word": "二メートルおき",
            "reading": "にめーとるおき",
            "gloss": "每隔兩公尺",
            "hot": false
          },
          {
            "word": "一行おき",
            "reading": "いちぎょうおき",
            "gloss": "隔一行",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜期",
        "reading": "き",
        "meaning": "〜期、〜時期",
        "note": "表示一段時期",
        "hot": false,
        "words": [
          {
            "word": "学期",
            "reading": "がっき",
            "gloss": "學期",
            "hot": false
          },
          {
            "word": "思春期",
            "reading": "ししゅんき",
            "gloss": "青春期",
            "hot": false
          },
          {
            "word": "成長期",
            "reading": "せいちょうき",
            "gloss": "成長期",
            "hot": false
          },
          {
            "word": "幼児期",
            "reading": "ようじき",
            "gloss": "幼兒期",
            "hot": false
          },
          {
            "word": "繁忙期",
            "reading": "はんぼうき",
            "gloss": "旺季",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "種類・用途・形式",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜式",
        "reading": "しき",
        "meaning": "〜式、〜儀式",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "洋式",
            "reading": "ようしき",
            "gloss": "西式",
            "hot": false
          },
          {
            "word": "和式",
            "reading": "わしき",
            "gloss": "日式",
            "hot": false
          },
          {
            "word": "入学式",
            "reading": "にゅうがくしき",
            "gloss": "開學典禮",
            "hot": false
          },
          {
            "word": "卒業式",
            "reading": "そつぎょうしき",
            "gloss": "畢業典禮",
            "hot": false
          },
          {
            "word": "電動式",
            "reading": "でんどうしき",
            "gloss": "電動式",
            "hot": false
          },
          {
            "word": "日本式",
            "reading": "にほんしき",
            "gloss": "日式",
            "hot": false
          },
          {
            "word": "結婚式",
            "reading": "けっこんしき",
            "gloss": "婚禮",
            "hot": false
          },
          {
            "word": "開会式",
            "reading": "かいかいしき",
            "gloss": "開幕式",
            "hot": false
          },
          {
            "word": "手動式",
            "reading": "しゅどうしき",
            "gloss": "手動式",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜型",
        "reading": "がた",
        "meaning": "〜型",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "小型",
            "reading": "こがた",
            "gloss": "小型",
            "hot": true
          },
          {
            "word": "大型",
            "reading": "おおがた",
            "gloss": "大型",
            "hot": false
          },
          {
            "word": "新型",
            "reading": "しんがた",
            "gloss": "新型",
            "hot": false
          },
          {
            "word": "血液型",
            "reading": "けつえきがた",
            "gloss": "血型",
            "hot": false
          },
          {
            "word": "中型",
            "reading": "ちゅうがた",
            "gloss": "中型",
            "hot": false
          },
          {
            "word": "最新型",
            "reading": "さいしんがた",
            "gloss": "最新型",
            "hot": false
          },
          {
            "word": "旧型",
            "reading": "きゅうがた",
            "gloss": "舊型",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜用",
        "reading": "よう",
        "meaning": "〜用的",
        "note": "表示用途、對象",
        "hot": false,
        "words": [
          {
            "word": "子ども用",
            "reading": "こどもよう",
            "gloss": "兒童用",
            "hot": false
          },
          {
            "word": "家庭用",
            "reading": "かていよう",
            "gloss": "家庭用",
            "hot": false
          },
          {
            "word": "業務用",
            "reading": "ぎょうむよう",
            "gloss": "業務用",
            "hot": false
          },
          {
            "word": "自分用",
            "reading": "じぶんよう",
            "gloss": "自己用",
            "hot": false
          },
          {
            "word": "女性用",
            "reading": "じょせいよう",
            "gloss": "女性用",
            "hot": false
          },
          {
            "word": "専用",
            "reading": "せんよう",
            "gloss": "專用",
            "hot": false
          },
          {
            "word": "旅行用",
            "reading": "りょこうよう",
            "gloss": "旅行用",
            "hot": false
          },
          {
            "word": "通勤用",
            "reading": "つうきんよう",
            "gloss": "通勤用",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜向け／〜向き",
        "reading": "むけ／むき",
        "meaning": "為〜設計／適合〜",
        "note": "〜向け＝以〜為對象而做的；〜向き＝性質適合〜",
        "hot": false,
        "words": [
          {
            "word": "子ども向け",
            "reading": "こどもむけ",
            "gloss": "以兒童為對象",
            "hot": false
          },
          {
            "word": "外国人向け",
            "reading": "がいこくじんむけ",
            "gloss": "以外國人為對象",
            "hot": false
          },
          {
            "word": "初心者向き",
            "reading": "しょしんしゃむき",
            "gloss": "適合初學者",
            "hot": false
          },
          {
            "word": "家族向き",
            "reading": "かぞくむき",
            "gloss": "適合家庭",
            "hot": false
          },
          {
            "word": "大人向け",
            "reading": "おとなむけ",
            "gloss": "以成人為對象",
            "hot": false
          },
          {
            "word": "若者向け",
            "reading": "わかものむけ",
            "gloss": "以年輕人為對象",
            "hot": false
          },
          {
            "word": "女性向け",
            "reading": "じょせいむけ",
            "gloss": "以女性為對象",
            "hot": false
          },
          {
            "word": "初心者向け",
            "reading": "しょしんしゃむけ",
            "gloss": "以初學者為對象",
            "hot": false
          },
          {
            "word": "南向き",
            "reading": "みなみむき",
            "gloss": "朝南",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜別",
        "reading": "べつ",
        "meaning": "依〜分類、各〜",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "格別",
            "reading": "かくべつ",
            "gloss": "特別、格外",
            "hot": true
          },
          {
            "word": "国別",
            "reading": "くにべつ",
            "gloss": "依國家分",
            "hot": false
          },
          {
            "word": "男女別",
            "reading": "だんじょべつ",
            "gloss": "依男女分",
            "hot": false
          },
          {
            "word": "年齢別",
            "reading": "ねんれいべつ",
            "gloss": "依年齡分",
            "hot": false
          },
          {
            "word": "地域別",
            "reading": "ちいきべつ",
            "gloss": "依地區分",
            "hot": false
          },
          {
            "word": "性別",
            "reading": "せいべつ",
            "gloss": "性別",
            "hot": false
          },
          {
            "word": "部門別",
            "reading": "ぶもんべつ",
            "gloss": "依部門分",
            "hot": false
          },
          {
            "word": "種類別",
            "reading": "しゅるいべつ",
            "gloss": "依種類分",
            "hot": false
          },
          {
            "word": "用途別",
            "reading": "ようとべつ",
            "gloss": "依用途分",
            "hot": false
          },
          {
            "word": "学年別",
            "reading": "がくねんべつ",
            "gloss": "依年級分",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜製",
        "reading": "せい",
        "meaning": "〜製",
        "note": "表示製造的地點或材質",
        "hot": false,
        "words": [
          {
            "word": "日本製",
            "reading": "にほんせい",
            "gloss": "日本製",
            "hot": false
          },
          {
            "word": "外国製",
            "reading": "がいこくせい",
            "gloss": "外國製",
            "hot": false
          },
          {
            "word": "木製",
            "reading": "もくせい",
            "gloss": "木製",
            "hot": false
          },
          {
            "word": "金属製",
            "reading": "きんぞくせい",
            "gloss": "金屬製",
            "hot": false
          },
          {
            "word": "米国製",
            "reading": "べいこくせい",
            "gloss": "美國製",
            "hot": false
          },
          {
            "word": "プラスチック製",
            "reading": "ぷらすちっくせい",
            "gloss": "塑膠製",
            "hot": false
          },
          {
            "word": "鉄製",
            "reading": "てつせい",
            "gloss": "鐵製",
            "hot": false
          },
          {
            "word": "手製",
            "reading": "てせい",
            "gloss": "手工製作",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜版",
        "reading": "ばん",
        "meaning": "〜版",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "日本語版",
            "reading": "にほんごばん",
            "gloss": "日語版",
            "hot": false
          },
          {
            "word": "携帯版",
            "reading": "けいたいばん",
            "gloss": "手機版",
            "hot": false
          },
          {
            "word": "改訂版",
            "reading": "かいていばん",
            "gloss": "修訂版",
            "hot": false
          },
          {
            "word": "英語版",
            "reading": "えいごばん",
            "gloss": "英語版",
            "hot": false
          },
          {
            "word": "最新版",
            "reading": "さいしんばん",
            "gloss": "最新版",
            "hot": false
          },
          {
            "word": "初版",
            "reading": "しょはん",
            "gloss": "初版",
            "hot": false
          },
          {
            "word": "電子版",
            "reading": "でんしばん",
            "gloss": "電子版",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜品",
        "reading": "ひん",
        "meaning": "〜品",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "返品",
            "reading": "へんぴん",
            "gloss": "退貨",
            "hot": true
          },
          {
            "word": "製品",
            "reading": "せいひん",
            "gloss": "產品",
            "hot": false
          },
          {
            "word": "食品",
            "reading": "しょくひん",
            "gloss": "食品",
            "hot": false
          },
          {
            "word": "商品",
            "reading": "しょうひん",
            "gloss": "商品",
            "hot": false
          },
          {
            "word": "化粧品",
            "reading": "けしょうひん",
            "gloss": "化妝品",
            "hot": false
          },
          {
            "word": "日用品",
            "reading": "にちようひん",
            "gloss": "日用品",
            "hot": false
          },
          {
            "word": "贈答品",
            "reading": "ぞうとうひん",
            "gloss": "禮品",
            "hot": false
          },
          {
            "word": "作品",
            "reading": "さくひん",
            "gloss": "作品",
            "hot": false
          },
          {
            "word": "備品",
            "reading": "びひん",
            "gloss": "備品",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜類",
        "reading": "るい",
        "meaning": "〜類",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "書類",
            "reading": "しょるい",
            "gloss": "文件",
            "hot": false
          },
          {
            "word": "衣類",
            "reading": "いるい",
            "gloss": "衣物",
            "hot": false
          },
          {
            "word": "魚類",
            "reading": "ぎょるい",
            "gloss": "魚類",
            "hot": false
          },
          {
            "word": "種類",
            "reading": "しゅるい",
            "gloss": "種類",
            "hot": false
          },
          {
            "word": "分類",
            "reading": "ぶんるい",
            "gloss": "分類",
            "hot": false
          },
          {
            "word": "人類",
            "reading": "じんるい",
            "gloss": "人類",
            "hot": false
          },
          {
            "word": "貝類",
            "reading": "かいるい",
            "gloss": "貝類",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "費用・數量・其他",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜費",
        "reading": "ひ",
        "meaning": "〜費",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "会費",
            "reading": "かいひ",
            "gloss": "會費",
            "hot": true
          },
          {
            "word": "食費",
            "reading": "しょくひ",
            "gloss": "伙食費",
            "hot": false
          },
          {
            "word": "交通費",
            "reading": "こうつうひ",
            "gloss": "交通費",
            "hot": false
          },
          {
            "word": "学費",
            "reading": "がくひ",
            "gloss": "學費",
            "hot": false
          },
          {
            "word": "生活費",
            "reading": "せいかつひ",
            "gloss": "生活費",
            "hot": false
          },
          {
            "word": "光熱費",
            "reading": "こうねつひ",
            "gloss": "水電瓦斯費",
            "hot": false
          },
          {
            "word": "人件費",
            "reading": "じんけんひ",
            "gloss": "人事費",
            "hot": false
          },
          {
            "word": "医療費",
            "reading": "いりょうひ",
            "gloss": "醫療費",
            "hot": false
          },
          {
            "word": "教育費",
            "reading": "きょういくひ",
            "gloss": "教育費",
            "hot": false
          },
          {
            "word": "宿泊費",
            "reading": "しゅくはくひ",
            "gloss": "住宿費",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜料",
        "reading": "りょう",
        "meaning": "〜費（服務、使用的代價）／材料",
        "note": "〜料＝使用服務或物品所付的錢；〜費＝花費的支出",
        "hot": true,
        "words": [
          {
            "word": "材料",
            "reading": "ざいりょう",
            "gloss": "材料",
            "hot": true
          },
          {
            "word": "入場料",
            "reading": "にゅうじょうりょう",
            "gloss": "入場費",
            "hot": false
          },
          {
            "word": "授業料",
            "reading": "じゅぎょうりょう",
            "gloss": "學費",
            "hot": false
          },
          {
            "word": "送料",
            "reading": "そうりょう",
            "gloss": "運費",
            "hot": false
          },
          {
            "word": "手数料",
            "reading": "てすうりょう",
            "gloss": "手續費",
            "hot": false
          },
          {
            "word": "使用料",
            "reading": "しようりょう",
            "gloss": "使用費",
            "hot": false
          },
          {
            "word": "保険料",
            "reading": "ほけんりょう",
            "gloss": "保險費",
            "hot": false
          },
          {
            "word": "入館料",
            "reading": "にゅうかんりょう",
            "gloss": "入館費",
            "hot": false
          },
          {
            "word": "観覧料",
            "reading": "かんらんりょう",
            "gloss": "觀覽費",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜代",
        "reading": "だい",
        "meaning": "〜費（具體的錢）",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "世代",
            "reading": "せだい",
            "gloss": "世代",
            "hot": true
          },
          {
            "word": "電気代",
            "reading": "でんきだい",
            "gloss": "電費",
            "hot": false
          },
          {
            "word": "食事代",
            "reading": "しょくじだい",
            "gloss": "餐費",
            "hot": false
          },
          {
            "word": "ガス代",
            "reading": "がすだい",
            "gloss": "瓦斯費",
            "hot": false
          },
          {
            "word": "本代",
            "reading": "ほんだい",
            "gloss": "書錢",
            "hot": false
          },
          {
            "word": "洋服代",
            "reading": "ようふくだい",
            "gloss": "服裝費",
            "hot": false
          },
          {
            "word": "タクシー代",
            "reading": "たくしーだい",
            "gloss": "計程車費",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜額",
        "reading": "がく",
        "meaning": "〜額",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "総額",
            "reading": "そうがく",
            "gloss": "總額",
            "hot": true
          },
          {
            "word": "金額",
            "reading": "きんがく",
            "gloss": "金額",
            "hot": false
          },
          {
            "word": "全額",
            "reading": "ぜんがく",
            "gloss": "全額",
            "hot": false
          },
          {
            "word": "予算額",
            "reading": "よさんがく",
            "gloss": "預算額",
            "hot": false
          },
          {
            "word": "合計額",
            "reading": "ごうけいがく",
            "gloss": "合計金額",
            "hot": false
          },
          {
            "word": "被害額",
            "reading": "ひがいがく",
            "gloss": "受害金額",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜率",
        "reading": "りつ",
        "meaning": "〜率",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "成功率",
            "reading": "せいこうりつ",
            "gloss": "成功率",
            "hot": true
          },
          {
            "word": "進学率",
            "reading": "しんがくりつ",
            "gloss": "升學率",
            "hot": true
          },
          {
            "word": "合格率",
            "reading": "ごうかくりつ",
            "gloss": "合格率",
            "hot": false
          },
          {
            "word": "出生率",
            "reading": "しゅっしょうりつ",
            "gloss": "出生率",
            "hot": false
          },
          {
            "word": "失業率",
            "reading": "しつぎょうりつ",
            "gloss": "失業率",
            "hot": false
          },
          {
            "word": "利用率",
            "reading": "りようりつ",
            "gloss": "使用率",
            "hot": false
          },
          {
            "word": "視聴率",
            "reading": "しちょうりつ",
            "gloss": "收視率",
            "hot": false
          },
          {
            "word": "出席率",
            "reading": "しゅっせきりつ",
            "gloss": "出席率",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜分",
        "reading": "ぶん",
        "meaning": "〜份、〜的量",
        "note": "",
        "hot": true,
        "words": [
          {
            "word": "十分",
            "reading": "じゅうぶん",
            "gloss": "充分",
            "hot": true
          },
          {
            "word": "当分",
            "reading": "とうぶん",
            "gloss": "暫時",
            "hot": true
          },
          {
            "word": "三人分",
            "reading": "さんにんぶん",
            "gloss": "三人份",
            "hot": false
          },
          {
            "word": "一年分",
            "reading": "いちねんぶん",
            "gloss": "一年份",
            "hot": false
          },
          {
            "word": "二日分",
            "reading": "ふつかぶん",
            "gloss": "兩天份",
            "hot": false
          },
          {
            "word": "半年分",
            "reading": "はんとしぶん",
            "gloss": "半年份",
            "hot": false
          },
          {
            "word": "十日分",
            "reading": "とおかぶん",
            "gloss": "十天份",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜過ぎ",
        "reading": "すぎ",
        "meaning": "〜過頭、太〜",
        "note": "接動詞ます形或形容詞詞幹",
        "hot": true,
        "words": [
          {
            "word": "早すぎる",
            "reading": "はやすぎる",
            "gloss": "太早",
            "hot": true
          },
          {
            "word": "少なすぎる",
            "reading": "すくなすぎる",
            "gloss": "太少",
            "hot": true
          },
          {
            "word": "遅すぎる",
            "reading": "おそすぎる",
            "gloss": "太遲",
            "hot": true
          },
          {
            "word": "多すぎる",
            "reading": "おおすぎる",
            "gloss": "太多",
            "hot": true
          },
          {
            "word": "派手すぎる",
            "reading": "はですぎる",
            "gloss": "太花俏",
            "hot": true
          },
          {
            "word": "地味すぎる",
            "reading": "じみすぎる",
            "gloss": "太樸素",
            "hot": true
          },
          {
            "word": "小さすぎる",
            "reading": "ちいさすぎる",
            "gloss": "太小",
            "hot": true
          },
          {
            "word": "大きすぎる",
            "reading": "おおきすぎる",
            "gloss": "太大",
            "hot": true
          },
          {
            "word": "通り過ぎる",
            "reading": "とおりすぎる",
            "gloss": "經過、走過",
            "hot": true
          },
          {
            "word": "食べ過ぎ",
            "reading": "たべすぎ",
            "gloss": "吃太多",
            "hot": false
          },
          {
            "word": "飲み過ぎ",
            "reading": "のみすぎ",
            "gloss": "喝太多",
            "hot": false
          },
          {
            "word": "働き過ぎ",
            "reading": "はたらきすぎ",
            "gloss": "工作過度",
            "hot": false
          },
          {
            "word": "高過ぎ",
            "reading": "たかすぎ",
            "gloss": "太貴",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ぶり",
        "reading": "ぶり",
        "meaning": "隔了〜、〜的樣子",
        "note": "〜ぶり（隔了）：久しぶり／一年ぶり；也可指做事的樣子（働きぶり）",
        "hot": false,
        "words": [
          {
            "word": "久しぶり",
            "reading": "ひさしぶり",
            "gloss": "好久不見",
            "hot": false
          },
          {
            "word": "一年ぶり",
            "reading": "いちねんぶり",
            "gloss": "隔了一年",
            "hot": false
          },
          {
            "word": "五年ぶり",
            "reading": "ごねんぶり",
            "gloss": "隔了五年",
            "hot": false
          },
          {
            "word": "働きぶり",
            "reading": "はたらきぶり",
            "gloss": "工作表現",
            "hot": false
          },
          {
            "word": "活躍ぶり",
            "reading": "かつやくぶり",
            "gloss": "活躍的樣子",
            "hot": false
          },
          {
            "word": "仕事ぶり",
            "reading": "しごとぶり",
            "gloss": "工作表現",
            "hot": false
          },
          {
            "word": "暮らしぶり",
            "reading": "くらしぶり",
            "gloss": "生活狀況",
            "hot": false
          },
          {
            "word": "十年ぶり",
            "reading": "じゅうねんぶり",
            "gloss": "隔了十年",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜め",
        "reading": "め",
        "meaning": "稍微〜一點",
        "note": "接形容詞詞幹，表示程度「略〜」",
        "hot": false,
        "words": [
          {
            "word": "長め",
            "reading": "ながめ",
            "gloss": "稍長",
            "hot": false
          },
          {
            "word": "濃いめ",
            "reading": "こいめ",
            "gloss": "稍濃",
            "hot": false
          },
          {
            "word": "多め",
            "reading": "おおめ",
            "gloss": "稍多",
            "hot": false
          },
          {
            "word": "早め",
            "reading": "はやめ",
            "gloss": "稍早",
            "hot": false
          },
          {
            "word": "細め",
            "reading": "ほそめ",
            "gloss": "稍細",
            "hot": false
          },
          {
            "word": "厚め",
            "reading": "あつめ",
            "gloss": "稍厚",
            "hot": false
          },
          {
            "word": "少なめ",
            "reading": "すくなめ",
            "gloss": "稍少",
            "hot": false
          },
          {
            "word": "薄め",
            "reading": "うすめ",
            "gloss": "稍淡",
            "hot": false
          },
          {
            "word": "控えめ",
            "reading": "ひかえめ",
            "gloss": "節制、客氣",
            "hot": false
          },
          {
            "word": "大きめ",
            "reading": "おおきめ",
            "gloss": "稍大",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜っぱなし",
        "reading": "っぱなし",
        "meaning": "一直〜著、放著不管",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "つけっぱなし",
            "reading": "つけっぱなし",
            "gloss": "一直開著",
            "hot": false
          },
          {
            "word": "開けっぱなし",
            "reading": "あけっぱなし",
            "gloss": "一直開著（門窗）",
            "hot": false
          },
          {
            "word": "置きっぱなし",
            "reading": "おきっぱなし",
            "gloss": "放著不收",
            "hot": false
          },
          {
            "word": "出しっぱなし",
            "reading": "だしっぱなし",
            "gloss": "拿出來放著不收",
            "hot": false
          },
          {
            "word": "立ちっぱなし",
            "reading": "たちっぱなし",
            "gloss": "一直站著",
            "hot": false
          },
          {
            "word": "脱ぎっぱなし",
            "reading": "ぬぎっぱなし",
            "gloss": "脫了就丟著",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜通り",
        "reading": "どおり",
        "meaning": "照〜、按〜",
        "note": "",
        "hot": false,
        "words": [
          {
            "word": "予定通り",
            "reading": "よていどおり",
            "gloss": "照預定",
            "hot": false
          },
          {
            "word": "思い通り",
            "reading": "おもいどおり",
            "gloss": "如所想",
            "hot": false
          },
          {
            "word": "説明通り",
            "reading": "せつめいどおり",
            "gloss": "照說明",
            "hot": false
          },
          {
            "word": "予想通り",
            "reading": "よそうどおり",
            "gloss": "如預期",
            "hot": false
          },
          {
            "word": "計画通り",
            "reading": "けいかくどおり",
            "gloss": "按計畫",
            "hot": false
          },
          {
            "word": "いつも通り",
            "reading": "いつもどおり",
            "gloss": "和平常一樣",
            "hot": false
          },
          {
            "word": "指示通り",
            "reading": "しじどおり",
            "gloss": "照指示",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ずつ",
        "reading": "ずつ",
        "meaning": "各〜、每次〜",
        "note": "接數量詞或程度副詞，表示「平均分配、每次的量」",
        "hot": false,
        "words": [
          {
            "word": "一つずつ",
            "reading": "ひとつずつ",
            "gloss": "一個一個",
            "hot": false
          },
          {
            "word": "一人ずつ",
            "reading": "ひとりずつ",
            "gloss": "一人一人",
            "hot": false
          },
          {
            "word": "少しずつ",
            "reading": "すこしずつ",
            "gloss": "一點一點",
            "hot": false
          },
          {
            "word": "三枚ずつ",
            "reading": "さんまいずつ",
            "gloss": "每次三張",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜込み",
        "reading": "こみ",
        "meaning": "含〜在內",
        "note": "接名詞，表示費用已含在內；與 〜抜き 相對",
        "hot": false,
        "words": [
          {
            "word": "税込み",
            "reading": "ぜいこみ",
            "gloss": "含稅",
            "hot": false
          },
          {
            "word": "送料込み",
            "reading": "そうりょうこみ",
            "gloss": "含運費",
            "hot": false
          },
          {
            "word": "朝食込み",
            "reading": "ちょうしょくこみ",
            "gloss": "含早餐",
            "hot": false
          },
          {
            "word": "消費税込み",
            "reading": "しょうひぜいこみ",
            "gloss": "含消費稅",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "動作・狀態・附帶",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜かた",
        "reading": "かた",
        "meaning": "〜的方法、〜的作法",
        "note": "接動詞ます形，表示「怎麼做」（〜方＝方法），重音在前一個音節",
        "hot": false,
        "words": [
          {
            "word": "作り方",
            "reading": "つくりかた",
            "gloss": "做法",
            "hot": false
          },
          {
            "word": "読み方",
            "reading": "よみかた",
            "gloss": "讀法",
            "hot": false
          },
          {
            "word": "考え方",
            "reading": "かんがえかた",
            "gloss": "想法、思考方式",
            "hot": false
          },
          {
            "word": "使い方",
            "reading": "つかいかた",
            "gloss": "用法",
            "hot": false
          },
          {
            "word": "生き方",
            "reading": "いきかた",
            "gloss": "生活方式",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜たて",
        "reading": "たて",
        "meaning": "剛〜好、〜剛完成",
        "note": "接動詞ます形，表示剛做好的新鮮狀態（焼きたて）；多用於正面、新鮮的事物",
        "hot": false,
        "words": [
          {
            "word": "焼きたて",
            "reading": "やきたて",
            "gloss": "剛烤好",
            "hot": false
          },
          {
            "word": "出来たて",
            "reading": "できたて",
            "gloss": "剛做好",
            "hot": false
          },
          {
            "word": "炊きたて",
            "reading": "たきたて",
            "gloss": "剛煮好",
            "hot": false
          },
          {
            "word": "揚げたて",
            "reading": "あげたて",
            "gloss": "剛炸好",
            "hot": false
          },
          {
            "word": "採れたて",
            "reading": "とれたて",
            "gloss": "剛採收",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜かけ",
        "reading": "かけ",
        "meaning": "做到一半、正在〜",
        "note": "接動詞ます形，表示動作進行到一半就中斷（食べかけ）；常見說法「〜かけの＋名詞」",
        "hot": false,
        "words": [
          {
            "word": "食べかけ",
            "reading": "たべかけ",
            "gloss": "吃到一半",
            "hot": false
          },
          {
            "word": "読みかけ",
            "reading": "よみかけ",
            "gloss": "讀到一半",
            "hot": false
          },
          {
            "word": "書きかけ",
            "reading": "かきかけ",
            "gloss": "寫到一半",
            "hot": false
          },
          {
            "word": "飲みかけ",
            "reading": "のみかけ",
            "gloss": "喝到一半",
            "hot": false
          },
          {
            "word": "作りかけ",
            "reading": "つくりかけ",
            "gloss": "做到一半",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜放題",
        "reading": "ほうだい",
        "meaning": "隨意〜、〜到飽",
        "note": "接動詞ます形，表示「不受限制，想〜多少就〜多少」，也可指放任不管（荒れ放題）",
        "hot": false,
        "words": [
          {
            "word": "食べ放題",
            "reading": "たべほうだい",
            "gloss": "吃到飽",
            "hot": false
          },
          {
            "word": "飲み放題",
            "reading": "のみほうだい",
            "gloss": "無限暢飲",
            "hot": false
          },
          {
            "word": "使い放題",
            "reading": "つかいほうだい",
            "gloss": "無限使用",
            "hot": false
          },
          {
            "word": "乗り放題",
            "reading": "のりほうだい",
            "gloss": "無限搭乘",
            "hot": false
          },
          {
            "word": "伸び放題",
            "reading": "のびほうだい",
            "gloss": "任意生長",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜がかり",
        "reading": "がかり",
        "meaning": "花費〜（人力、時間）",
        "note": "接人數或時間，表示「需要花〜才能完成」；也可作「大がかり」（規模大）",
        "hot": false,
        "words": [
          {
            "word": "三人がかり",
            "reading": "さんにんがかり",
            "gloss": "三個人合力",
            "hot": false
          },
          {
            "word": "一日がかり",
            "reading": "いちにちがかり",
            "gloss": "花了一整天",
            "hot": false
          },
          {
            "word": "一年がかり",
            "reading": "いちねんがかり",
            "gloss": "花了一年",
            "hot": false
          },
          {
            "word": "大がかり",
            "reading": "おおがかり",
            "gloss": "大規模",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ぐるみ",
        "reading": "ぐるみ",
        "meaning": "連同〜一起、整個〜",
        "note": "接名詞，表示「全體一起、整個〜」（家族ぐるみ）",
        "hot": false,
        "words": [
          {
            "word": "家族ぐるみ",
            "reading": "かぞくぐるみ",
            "gloss": "全家一起",
            "hot": false
          },
          {
            "word": "会社ぐるみ",
            "reading": "かいしゃぐるみ",
            "gloss": "整個公司（共同）",
            "hot": false
          },
          {
            "word": "町ぐるみ",
            "reading": "まちぐるみ",
            "gloss": "全鎮一起",
            "hot": false
          },
          {
            "word": "着ぐるみ",
            "reading": "きぐるみ",
            "gloss": "玩偶裝",
            "hot": false
          },
          {
            "word": "縫いぐるみ",
            "reading": "ぬいぐるみ",
            "gloss": "布偶",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜ごと",
        "reading": "ごと",
        "meaning": "連〜都、連同〜",
        "note": "接名詞，表示「連同〜一起」（皮ごと食べる）；與「〜ごとに」（每〜）不同",
        "hot": false,
        "words": [
          {
            "word": "皮ごと",
            "reading": "かわごと",
            "gloss": "連皮",
            "hot": false
          },
          {
            "word": "骨ごと",
            "reading": "ほねごと",
            "gloss": "連骨",
            "hot": false
          },
          {
            "word": "箱ごと",
            "reading": "はこごと",
            "gloss": "連箱子",
            "hot": false
          },
          {
            "word": "丸ごと",
            "reading": "まるごと",
            "gloss": "整個",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜がい",
        "reading": "がい",
        "meaning": "值得〜、〜的價值",
        "note": "接動詞ます形，表示「做這件事有價值、有成就感」（生きがい）",
        "hot": false,
        "words": [
          {
            "word": "生きがい",
            "reading": "いきがい",
            "gloss": "生存的意義",
            "hot": false
          },
          {
            "word": "やりがい",
            "reading": "やりがい",
            "gloss": "做的價值",
            "hot": false
          },
          {
            "word": "働きがい",
            "reading": "はたらきがい",
            "gloss": "工作的價值",
            "hot": false
          },
          {
            "word": "頼りがい",
            "reading": "たよりがい",
            "gloss": "可靠的程度",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜付け",
        "reading": "づけ／つけ",
        "meaning": "日期是〜、使成為〜、加上〜",
        "note": "〜づけ＝標明日期（4月1日付け）或使其成為某種狀態（位置づけ）；味付け 讀 つけ",
        "hot": false,
        "words": [
          {
            "word": "四月一日付け",
            "reading": "しがつついたちづけ",
            "gloss": "四月一日起生效",
            "hot": false
          },
          {
            "word": "位置づけ",
            "reading": "いちづけ",
            "gloss": "定位",
            "hot": false
          },
          {
            "word": "義務づけ",
            "reading": "ぎむづけ",
            "gloss": "規定為義務",
            "hot": false
          },
          {
            "word": "習慣づけ",
            "reading": "しゅうかんづけ",
            "gloss": "養成習慣",
            "hot": false
          },
          {
            "word": "味付け",
            "reading": "あじつけ",
            "gloss": "調味",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜明け",
        "reading": "あけ",
        "meaning": "〜結束後、〜之後",
        "note": "接表示期間的名詞，指那段期間剛結束",
        "hot": false,
        "words": [
          {
            "word": "夜明け",
            "reading": "よあけ",
            "gloss": "黎明",
            "hot": false
          },
          {
            "word": "梅雨明け",
            "reading": "つゆあけ",
            "gloss": "梅雨結束",
            "hot": false
          },
          {
            "word": "年明け",
            "reading": "としあけ",
            "gloss": "新年伊始",
            "hot": false
          },
          {
            "word": "休み明け",
            "reading": "やすみあけ",
            "gloss": "休假結束後",
            "hot": false
          },
          {
            "word": "連休明け",
            "reading": "れんきゅうあけ",
            "gloss": "連假結束後",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜上がり",
        "reading": "あがり",
        "meaning": "剛〜結束、〜之後",
        "note": "接名詞或動詞ます形，表示「剛結束」或「完成的狀態」",
        "hot": false,
        "words": [
          {
            "word": "病み上がり",
            "reading": "やみあがり",
            "gloss": "剛病癒",
            "hot": false
          },
          {
            "word": "雨上がり",
            "reading": "あめあがり",
            "gloss": "雨剛停",
            "hot": false
          },
          {
            "word": "湯上がり",
            "reading": "ゆあがり",
            "gloss": "剛泡完澡",
            "hot": false
          },
          {
            "word": "風呂上がり",
            "reading": "ふろあがり",
            "gloss": "剛洗完澡",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜抜き",
        "reading": "ぬき",
        "meaning": "省略〜、沒有〜",
        "note": "接名詞，表示「省去、不含」；「〜抜きで」＝撇開〜",
        "hot": false,
        "words": [
          {
            "word": "朝食抜き",
            "reading": "ちょうしょくぬき",
            "gloss": "不吃早餐",
            "hot": false
          },
          {
            "word": "砂糖抜き",
            "reading": "さとうぬき",
            "gloss": "不加糖",
            "hot": false
          },
          {
            "word": "ネギ抜き",
            "reading": "ねぎぬき",
            "gloss": "不加蔥",
            "hot": false
          },
          {
            "word": "冗談抜き",
            "reading": "じょうだんぬき",
            "gloss": "開玩笑撇開不談",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜入り",
        "reading": "いり",
        "meaning": "有〜在內、附〜",
        "note": "接名詞，表示「裡面含有〜」",
        "hot": false,
        "words": [
          {
            "word": "写真入り",
            "reading": "しゃしんいり",
            "gloss": "附照片",
            "hot": false
          },
          {
            "word": "砂糖入り",
            "reading": "さとういり",
            "gloss": "加了糖",
            "hot": false
          },
          {
            "word": "箱入り",
            "reading": "はこいり",
            "gloss": "盒裝",
            "hot": false
          },
          {
            "word": "大入り",
            "reading": "おおいり",
            "gloss": "客滿",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "學問・文書・名詞化",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜歴",
        "reading": "れき",
        "meaning": "〜經歷",
        "note": "表示過去的經歷或履歷",
        "hot": false,
        "words": [
          {
            "word": "学歴",
            "reading": "がくれき",
            "gloss": "學歷",
            "hot": false
          },
          {
            "word": "職歴",
            "reading": "しょくれき",
            "gloss": "工作經歷",
            "hot": false
          },
          {
            "word": "経歴",
            "reading": "けいれき",
            "gloss": "經歷",
            "hot": false
          },
          {
            "word": "病歴",
            "reading": "びょうれき",
            "gloss": "病歷",
            "hot": false
          },
          {
            "word": "履歴",
            "reading": "りれき",
            "gloss": "履歷",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜法",
        "reading": "ほう／ぽう",
        "meaning": "〜法、〜方法／法律",
        "note": "表示方法或法律；有連濁（文法＝ぶんぽう、憲法＝けんぽう）",
        "hot": false,
        "words": [
          {
            "word": "方法",
            "reading": "ほうほう",
            "gloss": "方法",
            "hot": false
          },
          {
            "word": "文法",
            "reading": "ぶんぽう",
            "gloss": "文法",
            "hot": false
          },
          {
            "word": "憲法",
            "reading": "けんぽう",
            "gloss": "憲法",
            "hot": false
          },
          {
            "word": "治療法",
            "reading": "ちりょうほう",
            "gloss": "治療法",
            "hot": false
          },
          {
            "word": "解決法",
            "reading": "かいけつほう",
            "gloss": "解決方法",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜論",
        "reading": "ろん",
        "meaning": "〜論、〜理論",
        "note": "表示議論、理論",
        "hot": true,
        "words": [
          {
            "word": "反論",
            "reading": "はんろん",
            "gloss": "反駁",
            "hot": true
          },
          {
            "word": "結論",
            "reading": "けつろん",
            "gloss": "結論",
            "hot": false
          },
          {
            "word": "議論",
            "reading": "ぎろん",
            "gloss": "討論",
            "hot": false
          },
          {
            "word": "理論",
            "reading": "りろん",
            "gloss": "理論",
            "hot": false
          },
          {
            "word": "評論",
            "reading": "ひょうろん",
            "gloss": "評論",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜学",
        "reading": "がく",
        "meaning": "〜學",
        "note": "表示學問領域",
        "hot": false,
        "words": [
          {
            "word": "経済学",
            "reading": "けいざいがく",
            "gloss": "經濟學",
            "hot": false
          },
          {
            "word": "心理学",
            "reading": "しんりがく",
            "gloss": "心理學",
            "hot": false
          },
          {
            "word": "言語学",
            "reading": "げんごがく",
            "gloss": "語言學",
            "hot": false
          },
          {
            "word": "法学",
            "reading": "ほうがく",
            "gloss": "法學",
            "hot": false
          },
          {
            "word": "医学",
            "reading": "いがく",
            "gloss": "醫學",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜点",
        "reading": "てん",
        "meaning": "〜點、〜分",
        "note": "表示地點、論點或分數",
        "hot": true,
        "words": [
          {
            "word": "得点",
            "reading": "とくてん",
            "gloss": "得分",
            "hot": true
          },
          {
            "word": "合格点",
            "reading": "ごうかくてん",
            "gloss": "及格分數",
            "hot": false
          },
          {
            "word": "問題点",
            "reading": "もんだいてん",
            "gloss": "問題點",
            "hot": false
          },
          {
            "word": "共通点",
            "reading": "きょうつうてん",
            "gloss": "共同點",
            "hot": false
          },
          {
            "word": "出発点",
            "reading": "しゅっぱつてん",
            "gloss": "出發點",
            "hot": false
          },
          {
            "word": "改善点",
            "reading": "かいぜんてん",
            "gloss": "需改善之處",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜級",
        "reading": "きゅう",
        "meaning": "〜級、〜等級",
        "note": "表示等級；也用於「〜級（程度相當）」",
        "hot": false,
        "words": [
          {
            "word": "高級",
            "reading": "こうきゅう",
            "gloss": "高級",
            "hot": false
          },
          {
            "word": "上級",
            "reading": "じょうきゅう",
            "gloss": "高級班",
            "hot": false
          },
          {
            "word": "初級",
            "reading": "しょきゅう",
            "gloss": "初級",
            "hot": false
          },
          {
            "word": "中級",
            "reading": "ちゅうきゅう",
            "gloss": "中級",
            "hot": false
          },
          {
            "word": "階級",
            "reading": "かいきゅう",
            "gloss": "階級",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜物",
        "reading": "もの／ぶつ",
        "meaning": "〜的東西",
        "note": "訓讀 もの 接動詞ます形（食べ物）；音讀 ぶつ・もつ 多接漢語（動物・荷物）",
        "hot": false,
        "words": [
          {
            "word": "食べ物",
            "reading": "たべもの",
            "gloss": "食物",
            "hot": false
          },
          {
            "word": "忘れ物",
            "reading": "わすれもの",
            "gloss": "遺失物",
            "hot": false
          },
          {
            "word": "買い物",
            "reading": "かいもの",
            "gloss": "購物",
            "hot": false
          },
          {
            "word": "生き物",
            "reading": "いきもの",
            "gloss": "生物",
            "hot": false
          },
          {
            "word": "建築物",
            "reading": "けんちくぶつ",
            "gloss": "建築物",
            "hot": false
          },
          {
            "word": "荷物",
            "reading": "にもつ",
            "gloss": "行李、貨物",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜件",
        "reading": "けん",
        "meaning": "〜件、〜案",
        "note": "表示事件、事項；也是計算案件的助數詞",
        "hot": false,
        "words": [
          {
            "word": "事件",
            "reading": "じけん",
            "gloss": "事件",
            "hot": false
          },
          {
            "word": "条件",
            "reading": "じょうけん",
            "gloss": "條件",
            "hot": false
          },
          {
            "word": "用件",
            "reading": "ようけん",
            "gloss": "事情、要事",
            "hot": false
          },
          {
            "word": "案件",
            "reading": "あんけん",
            "gloss": "案件",
            "hot": false
          },
          {
            "word": "物件",
            "reading": "ぶっけん",
            "gloss": "物件（房地產）",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜状",
        "reading": "じょう",
        "meaning": "〜信、〜狀態",
        "note": "表示書信、證書，或狀態、形狀",
        "hot": true,
        "words": [
          {
            "word": "招待状",
            "reading": "しょうたいじょう",
            "gloss": "邀請函",
            "hot": true
          },
          {
            "word": "年賀状",
            "reading": "ねんがじょう",
            "gloss": "賀年卡",
            "hot": false
          },
          {
            "word": "案内状",
            "reading": "あんないじょう",
            "gloss": "通知函",
            "hot": false
          },
          {
            "word": "礼状",
            "reading": "れいじょう",
            "gloss": "感謝信",
            "hot": false
          },
          {
            "word": "液状",
            "reading": "えきじょう",
            "gloss": "液狀",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜産",
        "reading": "さん",
        "meaning": "〜產",
        "note": "表示產地；與 〜製（製造地或材質）不同",
        "hot": false,
        "words": [
          {
            "word": "国産",
            "reading": "こくさん",
            "gloss": "國產",
            "hot": false
          },
          {
            "word": "日本産",
            "reading": "にほんさん",
            "gloss": "日本產",
            "hot": false
          },
          {
            "word": "外国産",
            "reading": "がいこくさん",
            "gloss": "外國產",
            "hot": false
          },
          {
            "word": "北海道産",
            "reading": "ほっかいどうさん",
            "gloss": "北海道產",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "組織・場所",
    "kind": "suffix",
    "items": [
      {
        "mark": "〜部・〜課・〜局・〜省",
        "reading": "ぶ／か／きょく／しょう",
        "meaning": "〜部／〜課／〜局／〜省",
        "note": "部、課為公司組織（部比課大）；局為官署或電視台；省為日本中央政府的部會",
        "hot": false,
        "words": [
          {
            "word": "営業部",
            "reading": "えいぎょうぶ",
            "gloss": "業務部",
            "hot": false
          },
          {
            "word": "人事課",
            "reading": "じんじか",
            "gloss": "人事課",
            "hot": false
          },
          {
            "word": "郵便局",
            "reading": "ゆうびんきょく",
            "gloss": "郵局",
            "hot": false
          },
          {
            "word": "放送局",
            "reading": "ほうそうきょく",
            "gloss": "電視台、電台",
            "hot": false
          },
          {
            "word": "財務省",
            "reading": "ざいむしょう",
            "gloss": "財務省",
            "hot": false
          },
          {
            "word": "外務省",
            "reading": "がいむしょう",
            "gloss": "外務省",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜所",
        "reading": "しょ／じょ",
        "meaning": "〜所、〜處",
        "note": "讀 しょ（事務所），有連濁讀 じょ（研究所・停留所）",
        "hot": false,
        "words": [
          {
            "word": "事務所",
            "reading": "じむしょ",
            "gloss": "辦公室",
            "hot": false
          },
          {
            "word": "研究所",
            "reading": "けんきゅうじょ",
            "gloss": "研究所",
            "hot": false
          },
          {
            "word": "停留所",
            "reading": "ていりゅうじょ",
            "gloss": "站牌",
            "hot": false
          },
          {
            "word": "営業所",
            "reading": "えいぎょうしょ",
            "gloss": "營業處",
            "hot": false
          },
          {
            "word": "裁判所",
            "reading": "さいばんしょ",
            "gloss": "法院",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜場",
        "reading": "じょう／ば",
        "meaning": "〜場（場所）",
        "note": "〜じょう＝設施（駐車場）；〜ば＝空間、地點（売り場）",
        "hot": true,
        "words": [
          {
            "word": "広場",
            "reading": "ひろば",
            "gloss": "廣場",
            "hot": true
          },
          {
            "word": "駐車場",
            "reading": "ちゅうしゃじょう",
            "gloss": "停車場",
            "hot": false
          },
          {
            "word": "会場",
            "reading": "かいじょう",
            "gloss": "會場",
            "hot": false
          },
          {
            "word": "工場",
            "reading": "こうじょう",
            "gloss": "工廠",
            "hot": false
          },
          {
            "word": "売り場",
            "reading": "うりば",
            "gloss": "賣場",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜館",
        "reading": "かん",
        "meaning": "〜館",
        "note": "表示公共設施",
        "hot": false,
        "words": [
          {
            "word": "図書館",
            "reading": "としょかん",
            "gloss": "圖書館",
            "hot": false
          },
          {
            "word": "美術館",
            "reading": "びじゅつかん",
            "gloss": "美術館",
            "hot": false
          },
          {
            "word": "体育館",
            "reading": "たいいくかん",
            "gloss": "體育館",
            "hot": false
          },
          {
            "word": "博物館",
            "reading": "はくぶつかん",
            "gloss": "博物館",
            "hot": false
          },
          {
            "word": "映画館",
            "reading": "えいがかん",
            "gloss": "電影院",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜室",
        "reading": "しつ",
        "meaning": "〜室、〜間",
        "note": "表示房間",
        "hot": false,
        "words": [
          {
            "word": "会議室",
            "reading": "かいぎしつ",
            "gloss": "會議室",
            "hot": false
          },
          {
            "word": "教室",
            "reading": "きょうしつ",
            "gloss": "教室",
            "hot": false
          },
          {
            "word": "研究室",
            "reading": "けんきゅうしつ",
            "gloss": "研究室",
            "hot": false
          },
          {
            "word": "待合室",
            "reading": "まちあいしつ",
            "gloss": "候診（候車）室",
            "hot": false
          },
          {
            "word": "更衣室",
            "reading": "こういしつ",
            "gloss": "更衣室",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜会",
        "reading": "かい",
        "meaning": "〜會",
        "note": "表示集會或團體",
        "hot": false,
        "words": [
          {
            "word": "説明会",
            "reading": "せつめいかい",
            "gloss": "說明會",
            "hot": false
          },
          {
            "word": "展覧会",
            "reading": "てんらんかい",
            "gloss": "展覽會",
            "hot": false
          },
          {
            "word": "歓迎会",
            "reading": "かんげいかい",
            "gloss": "歡迎會",
            "hot": false
          },
          {
            "word": "同窓会",
            "reading": "どうそうかい",
            "gloss": "同學會",
            "hot": false
          },
          {
            "word": "委員会",
            "reading": "いいんかい",
            "gloss": "委員會",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜団",
        "reading": "だん",
        "meaning": "〜團",
        "note": "表示團體、集團",
        "hot": true,
        "words": [
          {
            "word": "応援団",
            "reading": "おうえんだん",
            "gloss": "啦啦隊",
            "hot": true
          },
          {
            "word": "劇団",
            "reading": "げきだん",
            "gloss": "劇團",
            "hot": false
          },
          {
            "word": "集団",
            "reading": "しゅうだん",
            "gloss": "集團",
            "hot": false
          },
          {
            "word": "財団",
            "reading": "ざいだん",
            "gloss": "基金會",
            "hot": false
          },
          {
            "word": "消防団",
            "reading": "しょうぼうだん",
            "gloss": "義消團",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜組",
        "reading": "ぐみ／くみ",
        "meaning": "〜組、〜班",
        "note": "表示分組；連濁時讀 ぐみ（番組）",
        "hot": false,
        "words": [
          {
            "word": "番組",
            "reading": "ばんぐみ",
            "gloss": "節目",
            "hot": false
          },
          {
            "word": "二人組",
            "reading": "ふたりぐみ",
            "gloss": "兩人一組",
            "hot": false
          },
          {
            "word": "三人組",
            "reading": "さんにんぐみ",
            "gloss": "三人組",
            "hot": false
          },
          {
            "word": "赤組",
            "reading": "あかぐみ",
            "gloss": "紅組",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜地",
        "reading": "ち",
        "meaning": "〜地、〜處",
        "note": "表示場所、土地",
        "hot": false,
        "words": [
          {
            "word": "観光地",
            "reading": "かんこうち",
            "gloss": "觀光地",
            "hot": false
          },
          {
            "word": "住宅地",
            "reading": "じゅうたくち",
            "gloss": "住宅區",
            "hot": false
          },
          {
            "word": "目的地",
            "reading": "もくてきち",
            "gloss": "目的地",
            "hot": false
          },
          {
            "word": "出身地",
            "reading": "しゅっしんち",
            "gloss": "出生地",
            "hot": false
          },
          {
            "word": "被災地",
            "reading": "ひさいち",
            "gloss": "災區",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜界",
        "reading": "かい",
        "meaning": "〜界",
        "note": "表示某個領域、圈子",
        "hot": false,
        "words": [
          {
            "word": "業界",
            "reading": "ぎょうかい",
            "gloss": "業界",
            "hot": false
          },
          {
            "word": "政界",
            "reading": "せいかい",
            "gloss": "政界",
            "hot": false
          },
          {
            "word": "芸能界",
            "reading": "げいのうかい",
            "gloss": "演藝圈",
            "hot": false
          },
          {
            "word": "財界",
            "reading": "ざいかい",
            "gloss": "財經界",
            "hot": false
          }
        ]
      },
      {
        "mark": "〜圏",
        "reading": "けん",
        "meaning": "〜圈",
        "note": "表示範圍、地區",
        "hot": false,
        "words": [
          {
            "word": "首都圏",
            "reading": "しゅとけん",
            "gloss": "首都圈",
            "hot": false
          },
          {
            "word": "英語圏",
            "reading": "えいごけん",
            "gloss": "英語圈",
            "hot": false
          },
          {
            "word": "通勤圏",
            "reading": "つうきんけん",
            "gloss": "通勤範圍",
            "hot": false
          },
          {
            "word": "関西圏",
            "reading": "かんさいけん",
            "gloss": "關西圈",
            "hot": false
          }
        ]
      }
    ]
  }
];
