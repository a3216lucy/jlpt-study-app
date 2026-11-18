// Models
import type { NoteSection } from '../../grammar-review.model';

/** 文體：丁寧体・普通体・論說体（`<ruby>` 讀音已寫在字串內，只放進 `[innerHTML]`） */
export const STYLE_SECTIONS: NoteSection[] = [
  {
    "id": "overview",
    "title": "三種文體總覽",
    "hint": "",
    "blocks": [
      {
        "kind": "cards",
        "items": [
          {
            "name": "丁寧体（です・ます体）",
            "tag": "禮貌",
            "use": "對話（初次見面、上司、客人）、書信、郵件、簡報、廣播、說明書",
            "feel": "有禮貌、有距離感；對聽的人說話",
            "ex": [
              [
                "<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。",
                "我是學生。"
              ],
              [
                "<ruby>毎日<rt>まいにち</rt></ruby>、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。",
                "我每天讀書。"
              ]
            ]
          },
          {
            "name": "普通体（だ体・常体）",
            "tag": "口語",
            "use": "朋友與家人的對話、日記、筆記、小說的敘述、句型接續（〜と思う、〜ので 前面的形）",
            "feel": "親近、隨意；也用來「引用」別人的話",
            "ex": [
              [
                "<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>だ。",
                "我是學生。"
              ],
              [
                "<ruby>毎日<rt>まいにち</rt></ruby>、<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>む。",
                "我每天讀書。"
              ]
            ]
          },
          {
            "name": "論說体（である体）",
            "tag": "書面",
            "use": "論文、報告、新聞評論、說明文、演講稿",
            "feel": "客觀、嚴肅；只用在書面，口語不會說",
            "ex": [
              [
                "<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>である。",
                "我是學生。"
              ],
              [
                "<ruby>彼<rt>かれ</rt></ruby>の<ruby>意見<rt>いけん</rt></ruby>は<ruby>正<rt>ただ</rt></ruby>しいと<ruby>言<rt>い</rt></ruby>える。",
                "可以說他的意見是正確的。"
              ]
            ]
          },
          {
            "name": "であります体",
            "tag": "古風・演說",
            "use": "非常正式的演說、致詞、舊式文書",
            "feel": "比「です」更鄭重而生硬，現代日常幾乎不用",
            "ex": [
              [
                "<ruby>本日<rt>ほんじつ</rt></ruby>はここに<ruby>集<rt>あつ</rt></ruby>まれたことを<ruby>光栄<rt>こうえい</rt></ruby>に<ruby>思<rt>おも</rt></ruby>うのであります。",
                "能聚集在這裡，我深感榮幸。"
              ]
            ]
          }
        ]
      },
      {
        "kind": "note",
        "text": "動詞的普通体和論說体寫法相同（読む、読んだ）<br>差別只在名詞、な形容詞的句尾：<br>普通体 → <b>だ</b><br>論說体 → <b>である</b>"
      }
    ]
  },
  {
    "id": "forms",
    "title": "三種文體完整對照",
    "hint": "選詞性（動詞・い形容詞・な形容詞・名詞），看丁寧体／普通体／論說体",
    "blocks": [
      {
        "kind": "tabs",
        "tabs": [
          {
            "label": "動詞",
            "head": [
              "時態・語氣",
              "丁寧体",
              "普通体",
              "論說体"
            ],
            "rows": [
              [
                "現在・未來（肯定）",
                "<ruby>読<rt>よ</rt></ruby>みます",
                "<ruby>読<rt>よ</rt></ruby>む",
                "<ruby>読<rt>よ</rt></ruby>む"
              ],
              [
                "現在・未來（否定）",
                "<ruby>読<rt>よ</rt></ruby>みません",
                "<ruby>読<rt>よ</rt></ruby>まない",
                "<ruby>読<rt>よ</rt></ruby>まない"
              ],
              [
                "過去（肯定）",
                "<ruby>読<rt>よ</rt></ruby>みました",
                "<ruby>読<rt>よ</rt></ruby>んだ",
                "<ruby>読<rt>よ</rt></ruby>んだ"
              ],
              [
                "過去（否定）",
                "<ruby>読<rt>よ</rt></ruby>みませんでした",
                "<ruby>読<rt>よ</rt></ruby>まなかった",
                "<ruby>読<rt>よ</rt></ruby>まなかった"
              ],
              [
                "進行・狀態（肯定）",
                "<ruby>読<rt>よ</rt></ruby>んでいます",
                "<ruby>読<rt>よ</rt></ruby>んでいる（口語：<ruby>読<rt>よ</rt></ruby>んでる）",
                "<ruby>読<rt>よ</rt></ruby>んでいる"
              ],
              [
                "進行・狀態（否定）",
                "<ruby>読<rt>よ</rt></ruby>んでいません",
                "<ruby>読<rt>よ</rt></ruby>んでいない",
                "<ruby>読<rt>よ</rt></ruby>んでいない"
              ],
              [
                "過去進行（肯定）",
                "<ruby>読<rt>よ</rt></ruby>んでいました",
                "<ruby>読<rt>よ</rt></ruby>んでいた",
                "<ruby>読<rt>よ</rt></ruby>んでいた"
              ],
              [
                "意向、邀請",
                "<ruby>読<rt>よ</rt></ruby>みましょう",
                "<ruby>読<rt>よ</rt></ruby>もう",
                "<ruby>読<rt>よ</rt></ruby>もう"
              ],
              [
                "推量",
                "<ruby>読<rt>よ</rt></ruby>むでしょう",
                "<ruby>読<rt>よ</rt></ruby>むだろう",
                "<ruby>読<rt>よ</rt></ruby>むだろう（<ruby>読<rt>よ</rt></ruby>むであろう）"
              ],
              [
                "疑問",
                "<ruby>読<rt>よ</rt></ruby>みますか",
                "<ruby>読<rt>よ</rt></ruby>む？（口語）／<ruby>読<rt>よ</rt></ruby>むか",
                "<ruby>読<rt>よ</rt></ruby>むか／<ruby>読<rt>よ</rt></ruby>むだろうか"
              ]
            ],
            "note": "",
            "hint": "動詞：普通体與論說体相同"
          },
          {
            "label": "い形容詞",
            "head": [
              "時態・語氣",
              "丁寧体",
              "普通体",
              "論說体"
            ],
            "rows": [
              [
                "現在（肯定）",
                "<ruby>高<rt>たか</rt></ruby>いです",
                "<ruby>高<rt>たか</rt></ruby>い",
                "<ruby>高<rt>たか</rt></ruby>い"
              ],
              [
                "現在（否定）",
                "<ruby>高<rt>たか</rt></ruby>くないです／<ruby>高<rt>たか</rt></ruby>くありません",
                "<ruby>高<rt>たか</rt></ruby>くない",
                "<ruby>高<rt>たか</rt></ruby>くない"
              ],
              [
                "過去（肯定）",
                "<ruby>高<rt>たか</rt></ruby>かったです",
                "<ruby>高<rt>たか</rt></ruby>かった",
                "<ruby>高<rt>たか</rt></ruby>かった"
              ],
              [
                "過去（否定）",
                "<ruby>高<rt>たか</rt></ruby>くなかったです／<ruby>高<rt>たか</rt></ruby>くありませんでした",
                "<ruby>高<rt>たか</rt></ruby>くなかった",
                "<ruby>高<rt>たか</rt></ruby>くなかった"
              ],
              [
                "推量",
                "<ruby>高<rt>たか</rt></ruby>いでしょう",
                "<ruby>高<rt>たか</rt></ruby>いだろう",
                "<ruby>高<rt>たか</rt></ruby>いだろう（<ruby>高<rt>たか</rt></ruby>いであろう）"
              ],
              [
                "連接（理由）",
                "<ruby>高<rt>たか</rt></ruby>いですから／<ruby>高<rt>たか</rt></ruby>いので",
                "<ruby>高<rt>たか</rt></ruby>いから／<ruby>高<rt>たか</rt></ruby>いので",
                "<ruby>高<rt>たか</rt></ruby>いため／<ruby>高<rt>たか</rt></ruby>いので"
              ]
            ],
            "note": "い形容詞後面不加「だ」（✗高いだ）<br>丁寧体只要在後面加「です」",
            "hint": "い形容詞：普通体與論說体相同"
          },
          {
            "label": "な形容詞",
            "head": [
              "時態・語氣",
              "丁寧体",
              "普通体",
              "論說体"
            ],
            "rows": [
              [
                "現在（肯定）",
                "<ruby>静<rt>しず</rt></ruby>かです",
                "<ruby>静<rt>しず</rt></ruby>かだ",
                "<ruby>静<rt>しず</rt></ruby>かである"
              ],
              [
                "現在（否定）",
                "<ruby>静<rt>しず</rt></ruby>かではありません／<ruby>静<rt>しず</rt></ruby>かじゃありません",
                "<ruby>静<rt>しず</rt></ruby>かではない／<ruby>静<rt>しず</rt></ruby>かじゃない",
                "<ruby>静<rt>しず</rt></ruby>かではない"
              ],
              [
                "過去（肯定）",
                "<ruby>静<rt>しず</rt></ruby>かでした",
                "<ruby>静<rt>しず</rt></ruby>かだった",
                "<ruby>静<rt>しず</rt></ruby>かであった"
              ],
              [
                "過去（否定）",
                "<ruby>静<rt>しず</rt></ruby>かではありませんでした／<ruby>静<rt>しず</rt></ruby>かじゃありませんでした",
                "<ruby>静<rt>しず</rt></ruby>かではなかった／<ruby>静<rt>しず</rt></ruby>かじゃなかった",
                "<ruby>静<rt>しず</rt></ruby>かではなかった"
              ],
              [
                "推量",
                "<ruby>静<rt>しず</rt></ruby>かでしょう",
                "<ruby>静<rt>しず</rt></ruby>かだろう",
                "<ruby>静<rt>しず</rt></ruby>かであろう"
              ],
              [
                "連接（理由）",
                "<ruby>静<rt>しず</rt></ruby>かですから／<ruby>静<rt>しず</rt></ruby>かなので",
                "<ruby>静<rt>しず</rt></ruby>かだから／<ruby>静<rt>しず</rt></ruby>かなので",
                "<ruby>静<rt>しず</rt></ruby>かであるため／<ruby>静<rt>しず</rt></ruby>かなので"
              ]
            ],
            "note": "",
            "hint": "な形容詞：丁寧体です／普通体だ／論說体である"
          },
          {
            "label": "名詞",
            "head": [
              "時態・語氣",
              "丁寧体",
              "普通体",
              "論說体"
            ],
            "rows": [
              [
                "現在（肯定）",
                "<ruby>学生<rt>がくせい</rt></ruby>です",
                "<ruby>学生<rt>がくせい</rt></ruby>だ",
                "<ruby>学生<rt>がくせい</rt></ruby>である"
              ],
              [
                "現在（否定）",
                "<ruby>学生<rt>がくせい</rt></ruby>ではありません／<ruby>学生<rt>がくせい</rt></ruby>じゃありません",
                "<ruby>学生<rt>がくせい</rt></ruby>ではない／<ruby>学生<rt>がくせい</rt></ruby>じゃない",
                "<ruby>学生<rt>がくせい</rt></ruby>ではない"
              ],
              [
                "過去（肯定）",
                "<ruby>学生<rt>がくせい</rt></ruby>でした",
                "<ruby>学生<rt>がくせい</rt></ruby>だった",
                "<ruby>学生<rt>がくせい</rt></ruby>であった"
              ],
              [
                "過去（否定）",
                "<ruby>学生<rt>がくせい</rt></ruby>ではありませんでした／<ruby>学生<rt>がくせい</rt></ruby>じゃありませんでした",
                "<ruby>学生<rt>がくせい</rt></ruby>ではなかった／<ruby>学生<rt>がくせい</rt></ruby>じゃなかった",
                "<ruby>学生<rt>がくせい</rt></ruby>ではなかった"
              ],
              [
                "推量",
                "<ruby>学生<rt>がくせい</rt></ruby>でしょう",
                "<ruby>学生<rt>がくせい</rt></ruby>だろう",
                "<ruby>学生<rt>がくせい</rt></ruby>であろう"
              ],
              [
                "敬語（最鄭重）",
                "<ruby>学生<rt>がくせい</rt></ruby>でございます",
                "—",
                "—"
              ]
            ],
            "note": "<b>ではありません／ではない</b>：書面、正式場合<br><b>じゃありません／じゃない</b>：口語縮寫（では→じゃ）<br>論文、報告裡不要寫「じゃない」",
            "hint": "名詞句：和な形容詞一樣，句尾用 です／だ／である"
          }
        ]
      }
    ]
  },
  {
    "id": "endings",
    "title": "句尾與接續詞的口語・書面對照",
    "hint": "同一個意思，說話和寫文章用的詞不一樣；N3／N2 的閱讀、作文常考",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "意思",
          "口語（話し言葉）",
          "書面（書き言葉）"
        ],
        "rows": [
          [
            "所以",
            "<b class=\"font-extrabold text-accent\">だから</b>／<b class=\"font-extrabold text-accent\">ですから</b>",
            "<b class=\"font-extrabold text-accent\">したがって</b>／<b class=\"font-extrabold text-accent\">そのため</b>／<b class=\"font-extrabold text-accent\">よって</b>"
          ],
          [
            "但是",
            "でも／<b class=\"font-extrabold text-accent\">けど</b>／<b class=\"font-extrabold text-accent\">だけど</b>",
            "<b class=\"font-extrabold text-accent\">しかし</b>／<b class=\"font-extrabold text-accent\">ところが</b>／<b class=\"font-extrabold text-accent\">だが</b>"
          ],
          [
            "而且",
            "<b class=\"font-extrabold text-accent\">それに</b>／<b class=\"font-extrabold text-accent\">しかも</b>",
            "<b class=\"font-extrabold text-accent\">また</b>／<b class=\"font-extrabold text-accent\">さらに</b>／<b class=\"font-extrabold text-accent\">しかも</b>"
          ],
          [
            "因為（句尾補充）",
            "<b class=\"font-extrabold text-accent\">〜だから</b>／<b class=\"font-extrabold text-accent\">〜んです</b>",
            "<b class=\"font-extrabold text-accent\">〜ためである</b>／<b class=\"font-extrabold text-accent\">〜のである</b>"
          ],
          [
            "那麼、那就",
            "じゃ／<b class=\"font-extrabold text-accent\">じゃあ</b>",
            "では"
          ],
          [
            "因為（說明理由）",
            "だって〜",
            "なぜなら〜"
          ],
          [
            "很多",
            "<b class=\"font-extrabold text-accent\">たくさん</b>／<b class=\"font-extrabold text-accent\">いっぱい</b>",
            "<b class=\"font-extrabold text-accent\">多く</b>／<b class=\"font-extrabold text-accent\">数多く</b>"
          ],
          [
            "一點點",
            "<b class=\"font-extrabold text-accent\">ちょっと</b>",
            "<b class=\"font-extrabold text-accent\">少し</b>／<b class=\"font-extrabold text-accent\">わずかに</b>"
          ],
          [
            "果然",
            "<b class=\"font-extrabold text-accent\">やっぱり</b>",
            "<b class=\"font-extrabold text-accent\">やはり</b>"
          ],
          [
            "但是（逆接助詞）",
            "<b class=\"font-extrabold text-accent\">〜けど</b>／<b class=\"font-extrabold text-accent\">〜けれど</b>",
            "〜が／<b class=\"font-extrabold text-accent\">〜けれども</b>／<b class=\"font-extrabold text-accent\">〜ものの</b>"
          ],
          [
            "〜了（完成）",
            "<b class=\"font-extrabold text-accent\">〜ちゃう</b>／<b class=\"font-extrabold text-accent\">〜ちゃった</b>",
            "<b class=\"font-extrabold text-accent\">〜てしまう</b>／<b class=\"font-extrabold text-accent\">〜てしまった</b>"
          ],
          [
            "正在〜",
            "<b class=\"font-extrabold text-accent\">〜てる</b>",
            "<b class=\"font-extrabold text-accent\">〜ている</b>"
          ],
          [
            "必須〜",
            "<b class=\"font-extrabold text-accent\">〜なきゃ</b>／<b class=\"font-extrabold text-accent\">〜なくちゃ</b>",
            "<b class=\"font-extrabold text-accent\">〜なければならない</b>"
          ],
          [
            "這個、那個",
            "これ・それ・あれ",
            "この・その・あの＋名詞"
          ],
          [
            "疑問",
            "<b class=\"font-extrabold text-accent\">〜の？</b>／〜かな",
            "〜か／<b class=\"font-extrabold text-accent\">〜だろうか</b>"
          ]
        ]
      }
    ]
  },
  {
    "id": "connect",
    "title": "句型前面接普通形",
    "hint": "〜と思う、〜ので、〜そうだ 等句型前面接的是「普通形」，不是「です・ます」",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "句型",
          "動詞",
          "い形容詞",
          "な形容詞",
          "名詞"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">〜と思う</b>／<b class=\"font-extrabold text-accent\">〜と言う</b>",
            "<ruby>行<rt>い</rt></ruby>く／<ruby>行<rt>い</rt></ruby>った",
            "<ruby>高<rt>たか</rt></ruby>い／<ruby>高<rt>たか</rt></ruby>かった",
            "<ruby>静<rt>しず</rt></ruby>かだ／<ruby>静<rt>しず</rt></ruby>かだった",
            "<ruby>学生<rt>がくせい</rt></ruby>だ／<ruby>学生<rt>がくせい</rt></ruby>だった"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜かもしれない</b>",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>か（だ省略）",
            "<ruby>学生<rt>がくせい</rt></ruby>（だ省略）"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜はずだ</b>",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>かな",
            "<ruby>学生<rt>がくせい</rt></ruby>の"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜ようだ</b>／<b class=\"font-extrabold text-accent\">〜みたいだ</b>",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>かな",
            "<ruby>学生<rt>がくせい</rt></ruby>の"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜らしい</b>（推測）",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>か（だ省略）",
            "<ruby>学生<rt>がくせい</rt></ruby>（だ省略）"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜そうだ</b>（傳聞）",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>かだ",
            "<ruby>学生<rt>がくせい</rt></ruby>だ"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜ということだ</b>",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>かだ",
            "<ruby>学生<rt>がくせい</rt></ruby>だ"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜ので</b>／<b class=\"font-extrabold text-accent\">〜のに</b>",
            "<ruby>行<rt>い</rt></ruby>く",
            "<ruby>高<rt>たか</rt></ruby>い",
            "<ruby>静<rt>しず</rt></ruby>かな",
            "<ruby>学生<rt>がくせい</rt></ruby>な"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜ために</b>（目的）",
            "<ruby>行<rt>い</rt></ruby>く",
            "—",
            "—",
            "<ruby>学生<rt>がくせい</rt></ruby>の"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "名詞・な形容詞的接續各不相同：<br>〜ので、〜のに → <b>な</b>（学生な、静かな）<br>〜はずだ、〜ようだ → <b>の</b>（学生の）／<b>な</b>（静かな）<br>〜と思う、〜そうだ → <b>だ</b>（学生だ、静かだ）"
      }
    ]
  },
  {
    "id": "scene",
    "title": "什麼場合用哪一種",
    "hint": "依對象與文章種類選文體",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "場合",
          "文體"
        ],
        "rows": [
          [
            "對上司、客人、初次見面的人說話",
            "丁寧体（再加敬語）"
          ],
          [
            "面試、商務郵件、公文",
            "丁寧体（です・ます、正式用 でございます）"
          ],
          [
            "簡報、廣播、教學影片",
            "丁寧体"
          ],
          [
            "朋友、家人、同學的對話",
            "普通体（口語：〜じゃない、〜ちゃう）"
          ],
          [
            "日記、筆記",
            "普通体"
          ],
          [
            "小說（敘述部分）",
            "普通体（對話部分依人物）"
          ],
          [
            "論文、報告書、研究計畫",
            "論說体（である体）"
          ],
          [
            "新聞社論、評論文",
            "論說体（だ体・である体）"
          ],
          [
            "說明文、商品說明書",
            "丁寧体或論說体，全文要統一"
          ],
          [
            "致詞、演說（正式）",
            "丁寧体；非常正式時用 であります"
          ]
        ]
      }
    ]
  },
  {
    "id": "mistakes",
    "title": "常見錯誤與易混",
    "hint": "文體不統一、接續錯誤、口語寫進書面",
    "blocks": [
      {
        "kind": "dos",
        "items": [
          {
            "wrong": "<ruby>雨<rt>あめ</rt></ruby>だので、<ruby>行<rt>い</rt></ruby>かない。",
            "right": "<ruby>雨<rt>あめ</rt></ruby>なので、<ruby>行<rt>い</rt></ruby>かない。",
            "why": "名詞與な形容詞接「ので」要用「な」（雨なので），不能用「だ」；丁寧體可以說「雨ですので」。"
          },
          {
            "wrong": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>だです。",
            "right": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。／<ruby>彼<rt>かれ</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>だ。",
            "why": "「だ」和「です」二選一，不能疊在一起。"
          },
          {
            "wrong": "<ruby>高<rt>たか</rt></ruby>いだ。／<ruby>高<rt>たか</rt></ruby>いだった。",
            "right": "<ruby>高<rt>たか</rt></ruby>い。／<ruby>高<rt>たか</rt></ruby>かった。",
            "why": "い形容詞後面不接「だ」；過去是「〜かった」。"
          },
          {
            "wrong": "<ruby>論文<rt>ろんぶん</rt></ruby>で「〜じゃない」「〜ちゃう」",
            "right": "「〜ではない」「〜てしまう」",
            "why": "口語縮寫不用在書面；論文用書面形（では、てしまう、ている）。"
          },
          {
            "wrong": "「です・ます」和「だ・である」混著寫",
            "right": "全文統一一種文體",
            "why": "同一篇文章不要混用；例外是引用別人的話、感嘆句、對話。"
          },
          {
            "wrong": "<ruby>日常<rt>にちじょう</rt></ruby><ruby>会話<rt>かいわ</rt></ruby>で「〜であります」",
            "right": "「〜です」",
            "why": "「であります」只用在非常正式的演說，日常說話會顯得很怪。"
          },
          {
            "wrong": "「〜と<ruby>思<rt>おも</rt></ruby>います」の<ruby>前<rt>まえ</rt></ruby>に「〜です」",
            "right": "「〜と<ruby>思<rt>おも</rt></ruby>います」前面接普通形（<ruby>高<rt>たか</rt></ruby>いと<ruby>思<rt>おも</rt></ruby>います）",
            "why": "丁寧体的句子中，引用的內容還是用普通形。"
          }
        ]
      },
      {
        "kind": "note",
        "text": "否定的三種說法：<br>〜ではありません → 正式<br>〜じゃありません → 口語丁寧<br>〜ではないです → 也可，稍口語<br>考試選項意思對時，以「ではありません」為標準"
      },
      {
        "kind": "note",
        "text": "推量的三種說法：<br>〜でしょう → 丁寧<br>〜だろう → 普通・口語<br>〜であろう → 書面、論說"
      }
    ]
  }
];
