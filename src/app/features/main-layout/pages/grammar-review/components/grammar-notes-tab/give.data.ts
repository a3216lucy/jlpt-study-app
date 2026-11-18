// Models
import type { NoteSection } from '../../grammar-review.model';

/** 授受動詞：あげる・くれる・もらう（`<ruby>` 讀音已寫在字串內，只放進 `[innerHTML]`） */
export const GIVE_SECTIONS: NoteSection[] = [
  {
    "id": "basic",
    "title": "三組授受動詞：誰給誰",
    "hint": "先看「動作的方向」：給出去（あげる）、給我（くれる）、從別人得到（もらう）",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "方向",
          "說法",
          "敬語",
          "主語"
        ],
        "rows": [
          [
            "我給別人",
            "<b class=\"font-extrabold text-accent\">あげる</b>／<b class=\"font-extrabold text-accent\">やる</b>（晚輩、動植物）",
            "<b class=\"font-extrabold text-accent\"><ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げる</b>（對長輩）",
            "給的人"
          ],
          [
            "別人給我",
            "<b class=\"font-extrabold text-accent\">くれる</b>",
            "<b class=\"font-extrabold text-accent\">くださる</b>",
            "給的人"
          ],
          [
            "我得到",
            "<b class=\"font-extrabold text-accent\">もらう</b>",
            "<b class=\"font-extrabold text-accent\">いただく</b>／<ruby>頂戴<rt>ちょうだい</rt></ruby>する",
            "得到的人"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>あげる</b>：往外給（給別人）<br><b>くれる</b>：往自己這邊給（收的人是我或我方）<br><b>もらう</b>：從別人那裡收下（主語是收的人）"
      },
      {
        "kind": "table",
        "head": [
          "動詞",
          "助詞怎麼接",
          "例"
        ],
        "rows": [
          [
            "あげる",
            "給的人は　收的人<b>に</b>　物を",
            "<ruby>私<rt>わたし</rt></ruby>は<ruby>友達<rt>ともだち</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をあげた。"
          ],
          [
            "くれる",
            "給的人が　我<b>に</b>　物を",
            "<ruby>友達<rt>ともだち</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をくれた。"
          ],
          [
            "もらう",
            "收的人は　給的人<b>に／から</b>　物を",
            "<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をもらった。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "もらう的給的人可用「に」或「から」<br>公司、團體給的用「から」更自然（会社から給料をもらう）"
      },
      {
        "kind": "note",
        "text": "家人也算「我方」<br>別人給我弟弟的，也說「くれた」（友達が弟にお土産をくれた）"
      }
    ]
  },
  {
    "id": "te",
    "title": "〜て授受：行為的授受",
    "hint": "物品換成「動作」：幫別人做、別人幫我做、請別人做",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "意思",
          "說法",
          "敬語",
          "例句"
        ],
        "rows": [
          [
            "我為別人做",
            "<b class=\"font-extrabold text-accent\">〜てあげる</b>／<b class=\"font-extrabold text-accent\">〜てやる</b>",
            "〜て<ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げる",
            "<ruby>友達<rt>ともだち</rt></ruby>に<ruby>宿題<rt>しゅくだい</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてあげた。"
          ],
          [
            "別人為我做",
            "<b class=\"font-extrabold text-accent\">〜てくれる</b>",
            "<b class=\"font-extrabold text-accent\">〜てくださる</b>",
            "<ruby>友達<rt>ともだち</rt></ruby>が<ruby>手伝<rt>てつだ</rt></ruby>ってくれた。"
          ],
          [
            "請別人為我做",
            "<b class=\"font-extrabold text-accent\">〜てもらう</b>",
            "<b class=\"font-extrabold text-accent\">〜ていただく</b>",
            "<ruby>先生<rt>せんせい</rt></ruby>に<ruby>推薦状<rt>すいせんじょう</rt></ruby>を<ruby>書<rt>か</rt></ruby>いてもらった。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "〜てあげる帶「施恩」感，對長輩直接說顯得高高在上<br>〜てくれる／〜てもらう 表達感謝、承蒙"
      },
      {
        "kind": "table",
        "head": [
          "說法",
          "意思",
          "注意"
        ],
        "rows": [
          [
            "〜てくれませんか／〜てもらえませんか",
            "能不能請你幫我〜",
            "對平輩"
          ],
          [
            "〜てくださいませんか／〜ていただけませんか",
            "能不能麻煩您〜（較鄭重）",
            "對長輩、客人；「ていただけませんか」最常用"
          ],
          [
            "〜させてもらう／〜させていただく",
            "請讓我〜（得到許可）",
            "表示「得到對方許可或恩惠才做」，不要濫用"
          ],
          [
            "〜てやる",
            "（對晚輩、動物）為〜做",
            "口語，語氣較強；〜てやる 也有「我偏要做給你看」的意思"
          ]
        ]
      }
    ]
  },
  {
    "id": "keigo",
    "title": "授受的敬語：差し上げる・くださる・いただく",
    "hint": "對長輩、客人要換成敬語；主語是誰決定用哪一個",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "普通",
          "敬語",
          "誰是主語",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">あげる</b>",
            "<b class=\"font-extrabold text-accent\"><ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げる</b>（謙讓）",
            "我方（把東西送給對方）",
            "<ruby>先生<rt>せんせい</rt></ruby>にお<ruby>土産<rt>みやげ</rt></ruby>を<ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げた。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">くれる</b>",
            "<b class=\"font-extrabold text-accent\">くださる</b>（尊敬）",
            "對方（給我東西）",
            "<ruby>先生<rt>せんせい</rt></ruby>が<ruby>本<rt>ほん</rt></ruby>をくださった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">もらう</b>",
            "<b class=\"font-extrabold text-accent\">いただく</b>／<ruby>頂戴<rt>ちょうだい</rt></ruby>する（謙讓）",
            "我（從對方得到）",
            "<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をいただいた。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜てあげる</b>",
            "〜て<ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げる（不自然時改用 お〜する）",
            "我方",
            "<ruby>荷物<rt>にもつ</rt></ruby>をお<ruby>持<rt>も</rt></ruby>ちしましょうか。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜てくれる</b>",
            "<b class=\"font-extrabold text-accent\">〜てくださる</b>",
            "對方",
            "<ruby>先生<rt>せんせい</rt></ruby>が<ruby>教<rt>おし</rt></ruby>えてくださった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜てもらう</b>",
            "<b class=\"font-extrabold text-accent\">〜ていただく</b>",
            "我",
            "<ruby>先生<rt>せんせい</rt></ruby>に<ruby>教<rt>おし</rt></ruby>えていただいた。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "「先生が教えてくださった」＝「先生に教えていただいた」，意思相同<br><b>くださる</b>：主語是對方<br><b>いただく</b>：主語是我"
      }
    ]
  },
  {
    "id": "mistakes",
    "title": "常見錯誤",
    "hint": "誰給誰搞混、對長輩直接用あげる",
    "blocks": [
      {
        "kind": "dos",
        "items": [
          {
            "wrong": "<ruby>友達<rt>ともだち</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をあげた。",
            "right": "<ruby>友達<rt>ともだち</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をくれた。",
            "why": "別人給「我」，要用「くれる」；「あげる」是我往外給。"
          },
          {
            "wrong": "<ruby>私<rt>わたし</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>をあげました。",
            "right": "<ruby>私<rt>わたし</rt></ruby>は<ruby>先生<rt>せんせい</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>を<ruby>差<rt>さ</rt></ruby>し<ruby>上<rt>あ</rt></ruby>げました。",
            "why": "對長輩要用「差し上げる」；日常也常說「お渡ししました」。"
          },
          {
            "wrong": "<ruby>母<rt>はは</rt></ruby>は<ruby>私<rt>わたし</rt></ruby>にプレゼントをもらった。",
            "right": "<ruby>母<rt>はは</rt></ruby>は<ruby>私<rt>わたし</rt></ruby>にプレゼントをくれた。",
            "why": "「もらう」的主語是收的人；母親是給的人，主語是母親就要用「くれる」。"
          },
          {
            "wrong": "<ruby>先生<rt>せんせい</rt></ruby>に<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってあげましょうか。",
            "right": "<ruby>先生<rt>せんせい</rt></ruby>の<ruby>荷物<rt>にもつ</rt></ruby>をお<ruby>持<rt>も</rt></ruby>ちしましょうか。",
            "why": "對長輩說「〜てあげる」像是施恩，改用「お〜する」。"
          },
          {
            "wrong": "<ruby>犬<rt>いぬ</rt></ruby>にえさをあげる。",
            "right": "<ruby>犬<rt>いぬ</rt></ruby>にえさをやる。（現在也常說あげる）",
            "why": "對動物、植物，傳統用「やる」；現代口語常用「あげる」，考題以「やる」為標準答案時要會。"
          }
        ]
      },
      {
        "kind": "note",
        "text": "先找「誰是給的人、誰是收的人」：<br>給出去 → <b>あげる</b><br>給我（或我方）→ <b>くれる</b><br>站在收的人 → <b>もらう</b><br>對長輩 → 差し上げる・くださる・いただく"
      }
    ]
  }
];
