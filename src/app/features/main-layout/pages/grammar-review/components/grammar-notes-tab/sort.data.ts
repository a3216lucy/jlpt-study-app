// Models
import type { NoteSection } from '../../grammar-review.model';

/** 排序題：解法與常考固定組合（`<ruby>` 讀音已寫在字串內，只放進 `[innerHTML]`；紅色粗體＝考古題考過） */
export const SORT_SECTIONS: NoteSection[] = [
  {
    "id": "sort-howto",
    "title": "排序題解法",
    "hint": "",
    "blocks": [
      {
        "kind": "note",
        "text": "<b>① 先找固定搭配／文法組合</b><br>選項裡一定黏在一起的先湊成一塊<br>例：〜ために、〜ば〜ほど、疑問詞＋か、〜のは〜からだ<br>先湊組合，剩下的片段就變少了"
      },
      {
        "kind": "note",
        "text": "<b>② 再用詞性與助詞接續把片段連起來</b><br>看每個片段的結尾是名詞、辭書形、て形還是ない形<br>助詞（が・を・に・で・の）會告訴你前後接的是哪種詞"
      },
      {
        "kind": "note",
        "text": "<b>③ 最後才確認 ★ 的位置</b><br>整句排好後，數第幾格才是 ★，★ 不一定在句尾<br>再把答案代入整句唸一遍，意思通順、接續自然才算對"
      },
      {
        "kind": "note",
        "text": "<b>範例演示</b>"
      },
      {
        "kind": "table",
        "head": [
          "步驟",
          "做法",
          "此題"
        ],
        "rows": [
          [
            "題目",
            "かびを<ruby>防<rt>ふせ</rt></ruby>ぐ ＿ ＿ ★ ＿ <ruby>重要<rt>じゅうよう</rt></ruby>らしい",
            "ことが／<ruby>使<rt>つか</rt></ruby>った<ruby>後<rt>あと</rt></ruby>／ぬれたままにしない／ためには"
          ],
          [
            "① 固定搭配",
            "<ruby>防<rt>ふせ</rt></ruby>ぐ→ためには（目的）",
            "〜ことが<ruby>重要<rt>じゅうよう</rt></ruby>（句尾）"
          ],
          [
            "② 接續",
            "<ruby>使<rt>つか</rt></ruby>った<ruby>後<rt>あと</rt></ruby>＝<ruby>時間<rt>じかん</rt></ruby>，修飾後面的動詞",
            "ぬれたままにしない＋ことが"
          ],
          [
            "③ ★ 位置",
            "ためには→<ruby>使<rt>つか</rt></ruby>った<ruby>後<rt>あと</rt></ruby>→ぬれたままにしない→ことが",
            "★＝第3格"
          ],
          [
            "代入檢查",
            "かびを<ruby>防<rt>ふせ</rt></ruby>ぐためには、<ruby>使<rt>つか</rt></ruby>った<ruby>後<rt>あと</rt></ruby><b class=\"font-extrabold text-accent\">ぬれたままにしない</b>ことが<ruby>重要<rt>じゅうよう</rt></ruby>らしい",
            "意思通順"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "★ 的片段單看沒意義，要靠組合才知道位置<br>以下是題庫考過的固定組合，看到選項裡有這些就先湊起來"
      }
    ]
  },
  {
    "id": "sort-noun-1",
    "title": "名詞＋助詞（對象・原因）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜に<ruby>対<rt>たい</rt></ruby>する＋N",
            "對於〜的N；修飾後面名詞",
            "<ruby>学生<rt>がくせい</rt></ruby>の<ruby>働<rt>はたら</rt></ruby>くこと<b class=\"font-extrabold text-accent\">に対する</b><ruby>考<rt>かんが</rt></ruby>え<ruby>方<rt>かた</rt></ruby>"
          ],
          [
            "〜に<ruby>対<rt>たい</rt></ruby>して〜<ruby>持<rt>も</rt></ruby>つ",
            "對〜所抱持的；に対して＋V＋N",
            "<ruby>大学生活<rt>だいがくせいかつ</rt></ruby>に<ruby>対<rt>たい</rt></ruby>して<b class=\"font-extrabold text-accent\"><ruby>持<rt>も</rt></ruby>っている</b>イメージ"
          ],
          [
            "〜に<ruby>対<rt>たい</rt></ruby>して（比例）",
            "相對於〜，A比B的量",
            "<ruby>米<rt>こめ</rt></ruby>1に<ruby>対<rt>たい</rt></ruby>して10<ruby>倍<rt>ばい</rt></ruby>の<b class=\"font-extrabold text-accent\"><ruby>水<rt>みず</rt></ruby>で</b><ruby>作<rt>つく</rt></ruby>った"
          ],
          [
            "〜についての＋N",
            "關於〜的N；について＋の",
            "レポートの<ruby>書<rt>か</rt></ruby>き<ruby>方<rt>かた</rt></ruby><b class=\"font-extrabold text-accent\">について</b>の<ruby>本<rt>ほん</rt></ruby>"
          ],
          [
            "N1による＋N2",
            "由N1造成的N2",
            "<ruby>携帯電話<rt>けいたいでんわ</rt></ruby>の<ruby>見<rt>み</rt></ruby>すぎ<b class=\"font-extrabold text-accent\">による</b><ruby>目<rt>め</rt></ruby>の<ruby>疲<rt>つか</rt></ruby>れ"
          ],
          [
            "〜による〜のため",
            "因〜造成的〜的緣故",
            "<ruby>大雨<rt>おおあめ</rt></ruby>による<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>遅<rt>おく</rt></ruby>れ<b class=\"font-extrabold text-accent\">のため</b>"
          ],
          [
            "〜かによって〜",
            "依〜而不同",
            "<ruby>順番<rt>じゅんばん</rt></ruby>で<ruby>提示<rt>ていじ</rt></ruby>するか<b class=\"font-extrabold text-accent\">によって</b><ruby>相手<rt>あいて</rt></ruby>の<ruby>受<rt>う</rt></ruby>け<ruby>止<rt>と</rt></ruby>め<ruby>方<rt>かた</rt></ruby>"
          ],
          [
            "〜によって（被動）",
            "被〜（動作者・手段）",
            "<ruby>血液<rt>けつえき</rt></ruby><b class=\"font-extrabold text-accent\">によって</b><ruby>運<rt>はこ</rt></ruby>ばれる"
          ],
          [
            "〜<ruby>次第<rt>しだい</rt></ruby>で",
            "取決於〜；N＋次第",
            "<ruby>工夫<rt>くふう</rt></ruby><ruby>次第<rt>しだい</rt></ruby>で<b class=\"font-extrabold text-accent\"><ruby>豪華<rt>ごうか</rt></ruby>な</b>ごちそう"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-give",
    "title": "授受・請求（〜てくれる／もらう）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜てくれる＋N",
            "別人為我做〜的N",
            "<ruby>部長<rt>ぶちょう</rt></ruby>が<ruby>出張<rt>しゅっちょう</rt></ruby>に<ruby>行<rt>い</rt></ruby>くたびに<b class=\"font-extrabold text-accent\"><ruby>買<rt>か</rt></ruby>ってきてくれる</b>お<ruby>土産<rt>みやげ</rt></ruby>"
          ],
          [
            "〜てくれていたことが",
            "一直為我做〜這件事",
            "<ruby>食事<rt>しょくじ</rt></ruby>の<ruby>準備<rt>じゅんび</rt></ruby>や<ruby>洗濯<rt>せんたく</rt></ruby>を<b class=\"font-extrabold text-accent\">してくれていたことが</b>どれだけ〜"
          ],
          [
            "〜てもらえない？",
            "能不能請你幫我〜（口語）",
            "<ruby>一度<rt>いちど</rt></ruby><b class=\"font-extrabold text-accent\">チェックして</b>もらえない？"
          ],
          [
            "〜ていただけると",
            "若您能〜就太好了（敬語）",
            "4<ruby>時<rt>じ</rt></ruby><ruby>以降<rt>いこう</rt></ruby>に<b class=\"font-extrabold text-accent\"><ruby>変更<rt>へんこう</rt></ruby>していただけると</b>ありがたい"
          ],
          [
            "Nに〜ていただく",
            "請N做〜（謙讓）",
            "<ruby>専門家<rt>せんもんか</rt></ruby>でいらっしゃる<b class=\"font-extrabold text-accent\"><ruby>山下花子<rt>やましたはなこ</rt></ruby><ruby>先生<rt>せんせい</rt></ruby>に</b>、お<ruby>話<rt>はなし</rt></ruby>をしていただきます"
          ],
          [
            "〜(さ)せてほしい",
            "希望對方讓我〜",
            "<ruby>車<rt>くるま</rt></ruby>を<b class=\"font-extrabold text-accent\"><ruby>使<rt>つか</rt></ruby>わせてほしい</b>と<ruby>頼<rt>たの</rt></ruby>んだ"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-aux",
    "title": "補助動詞・習慣の言い方",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜てしまう",
            "〜でも〜てしまわないと＝非得做完",
            "<ruby>徹夜<rt>てつや</rt></ruby>してでも<b class=\"font-extrabold text-accent\"><ruby>終<rt>お</rt></ruby>わらせて</b>しまわないと"
          ],
          [
            "〜てくる",
            "〜てきて＝做了〜才來／出來",
            "<ruby>電気<rt>でんき</rt></ruby>を<ruby>消<rt>け</rt></ruby>すのを<ruby>忘<rt>わす</rt></ruby>れて<b class=\"font-extrabold text-accent\"><ruby>家<rt>いえ</rt></ruby>を<ruby>出<rt>で</rt></ruby>て</b>きて"
          ],
          [
            "〜ていく",
            "逐漸變成〜",
            "<ruby>弾<rt>ひ</rt></ruby>けば<ruby>弾<rt>ひ</rt></ruby>くほど<ruby>上手<rt>じょうず</rt></ruby>に<b class=\"font-extrabold text-accent\"><ruby>弾<rt>ひ</rt></ruby>けるように</b>なっていく"
          ],
          [
            "〜ようになる",
            "變得能〜",
            "〜ようにするだけで<b class=\"font-extrabold text-accent\"><ruby>広<rt>ひろ</rt></ruby>く<ruby>感<rt>かん</rt></ruby>じられる</b>ようになる"
          ],
          [
            "〜くなる",
            "形容詞＋くなる",
            "コーラで<ruby>煮<rt>に</rt></ruby>ることで<b class=\"font-extrabold text-accent\"><ruby>柔<rt>やわ</rt></ruby>らかく</b>なる"
          ],
          [
            "〜ずにいる",
            "一直沒做〜；V未然＋ず",
            "<b class=\"font-extrabold text-accent\"><ruby>捨<rt>す</rt></ruby>てられずにいる</b><ruby>古<rt>ふる</rt></ruby>い<ruby>服<rt>ふく</rt></ruby>"
          ],
          [
            "〜ずに",
            "不〜就〜（＝ないで）",
            "レシピを<ruby>見<rt>み</rt></ruby>ずに<b class=\"font-extrabold text-accent\"><ruby>作<rt>つく</rt></ruby>れる</b><ruby>料理<rt>りょうり</rt></ruby>"
          ],
          [
            "〜ずにはいられない",
            "忍不住〜",
            "<ruby>買<rt>か</rt></ruby>わずにはいられなく<b class=\"font-extrabold text-accent\">なって</b>すぐ<ruby>買<rt>か</rt></ruby>って"
          ],
          [
            "〜てみる",
            "試著〜",
            "〜だけ<b class=\"font-extrabold text-accent\">して</b>みたら"
          ],
          [
            "〜ているところだ",
            "正在〜",
            "<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>今<rt>いま</rt></ruby><b class=\"font-extrabold text-accent\"><ruby>選<rt>えら</rt></ruby>んでいる</b>ところだ"
          ],
          [
            "〜ようにしている",
            "設法（習慣）做〜",
            "<ruby>健康<rt>けんこう</rt></ruby>のために<ruby>毎日<rt>まいにち</rt></ruby>8<ruby>時間以上<rt>じかんいじょう</rt></ruby><ruby>寝<rt>ね</rt></ruby>る<b class=\"font-extrabold text-accent\">ように</b>している"
          ],
          [
            "〜ことにしている",
            "自己決定（習慣）〜",
            "<ruby>忘<rt>わす</rt></ruby>れないように<b class=\"font-extrabold text-accent\"><ruby>必<rt>かなら</rt></ruby>ずノートに<ruby>記憶<rt>きおく</rt></ruby>する</b>ことにしている"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-guess",
    "title": "推量・傳聞・感嘆・列舉",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜そうな＋N",
            "看起來要〜（樣態）",
            "<ruby>今<rt>いま</rt></ruby>にも<ruby>動<rt>うご</rt></ruby>き<ruby>出<rt>だ</rt></ruby>し<b class=\"font-extrabold text-accent\">そうな</b>"
          ],
          [
            "<ruby>今<rt>いま</rt></ruby>にも〜そう",
            "眼看就要〜",
            "<ruby>知<rt>し</rt></ruby>らせを<b class=\"font-extrabold text-accent\"><ruby>聞<rt>き</rt></ruby>いて</b><ruby>今<rt>いま</rt></ruby>にも<ruby>泣<rt>な</rt></ruby>きそうな<ruby>顔<rt>かお</rt></ruby>"
          ],
          [
            "〜はずの＋N",
            "本來應該〜的",
            "<b class=\"font-extrabold text-accent\"><ruby>悔<rt>くや</rt></ruby>しいはずの</b><ruby>選手<rt>せんしゅ</rt></ruby>たちが"
          ],
          [
            "〜かねない",
            "有可能（壞事）",
            "〜<ruby>起<rt>お</rt></ruby>きかねない<ruby>危険<rt>きけん</rt></ruby>な<b class=\"font-extrabold text-accent\"><ruby>状態<rt>じょうたい</rt></ruby>が</b><ruby>続<rt>つづ</rt></ruby>いていた"
          ],
          [
            "〜みたいだ",
            "好像〜（推測）",
            "<ruby>大学生<rt>だいがくせい</rt></ruby>のとき〜<b class=\"font-extrabold text-accent\">アルバイトしていた</b>みたいなのよ"
          ],
          [
            "〜んだって",
            "聽說〜（口語）",
            "<ruby>受付<rt>うけつけ</rt></ruby>の<ruby>林<rt>はやし</rt></ruby>さんと<b class=\"font-extrabold text-accent\"><ruby>結婚<rt>けっこん</rt></ruby>するんだ</b>って"
          ],
          [
            "なんて〜なんだろう",
            "多麼〜啊（感嘆）",
            "なんてきれいな<b class=\"font-extrabold text-accent\"><ruby>眺<rt>なが</rt></ruby>め</b>なんだろう"
          ],
          [
            "AとかBとか",
            "〜之類的（列舉）",
            "<ruby>階段<rt>かいだん</rt></ruby>を<ruby>使<rt>つか</rt></ruby>うとか、<b class=\"font-extrabold text-accent\"><ruby>歩<rt>ある</rt></ruby>く</b>スピードを<ruby>速<rt>はや</rt></ruby>くするとか"
          ],
          [
            "Nとか〜んじゃない？",
            "N之類的不錯吧（提議）",
            "タオル<b class=\"font-extrabold text-accent\">とか</b>いいんじゃない？"
          ],
          [
            "Nか<ruby>何<rt>なん</rt></ruby>か(で)",
            "N之類的（地方）",
            "<ruby>雑誌<rt>ざっし</rt></ruby>か<ruby>何<rt>なに</rt></ruby>かで<b class=\"font-extrabold text-accent\"><ruby>誰<rt>だれ</rt></ruby>かが</b>"
          ],
          [
            "Nで<ruby>見<rt>み</rt></ruby>たことがある",
            "在N看過",
            "テレビか<ruby>何<rt>なに</rt></ruby>か<b class=\"font-extrabold text-accent\">で</b><ruby>見<rt>み</rt></ruby>たことがある"
          ],
          [
            "〜んだったら",
            "如果是要〜的話",
            "<ruby>車<rt>くるま</rt></ruby>で<ruby>行<rt>い</rt></ruby>くつもりだから、もし<b class=\"font-extrabold text-accent\"><ruby>行<rt>い</rt></ruby>くんだったら</b>"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-focus",
    "title": "強調・分裂句（〜のは）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜のは〜からだ",
            "之所以〜是因為〜",
            "<ruby>会社<rt>かいしゃ</rt></ruby>から<ruby>遠<rt>とお</rt></ruby>いのに<ruby>北町<rt>きたまち</rt></ruby>を<ruby>選<rt>えら</rt></ruby>んだ<b class=\"font-extrabold text-accent\">のは</b>〜からだ"
          ],
          [
            "〜のは〜からだ（名字）",
            "名前を〜にした＋のは",
            "<ruby>娘<rt>むすめ</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>を<ruby>優子<rt>ゆうこ</rt></ruby>に<b class=\"font-extrabold text-accent\">したのは</b>〜<ruby>願<rt>ねが</rt></ruby>いを<ruby>込<rt>こ</rt></ruby>めたからだ"
          ],
          [
            "〜と<ruby>思<rt>おも</rt></ruby>ったのは〜",
            "〜是從…開始的",
            "<ruby>私<rt>わたし</rt></ruby>が<b class=\"font-extrabold text-accent\"><ruby>教師<rt>きょうし</rt></ruby>になりたいと<ruby>思<rt>おも</rt></ruby>ったのは</b>ある<ruby>先生<rt>せんせい</rt></ruby>との<ruby>出会<rt>であ</rt></ruby>いが〜"
          ],
          [
            "〜<ruby>欠<rt>か</rt></ruby>かせないのは〜",
            "〜不可缺的是〜",
            "<ruby>上達<rt>じょうたつ</rt></ruby>に<b class=\"font-extrabold text-accent\"><ruby>欠<rt>か</rt></ruby>かせないのは</b>もちろんだが〜"
          ],
          [
            "〜<ruby>中<rt>なか</rt></ruby>で<ruby>私<rt>わたし</rt></ruby>が<ruby>選<rt>えら</rt></ruby>んだのは",
            "〜之中我選的是〜",
            "〜<ruby>中<rt>なか</rt></ruby>で<b class=\"font-extrabold text-accent\"><ruby>私<rt>わたし</rt></ruby>が<ruby>選<rt>えら</rt></ruby>んだのは</b><ruby>夏<rt>なつ</rt></ruby>の<ruby>野菜<rt>やさい</rt></ruby>がたっぷり〜"
          ],
          [
            "〜<ruby>続<rt>つづ</rt></ruby>けているのは〜",
            "一直持續的是〜",
            "それでもやめずに<b class=\"font-extrabold text-accent\"><ruby>続<rt>つづ</rt></ruby>けているのは</b>やっぱりサッカーが〜"
          ],
          [
            "〜<ruby>済<rt>す</rt></ruby>んだのは〜",
            "得以〜是因為〜",
            "<ruby>遅刻<rt>ちこく</rt></ruby>をせずに<ruby>済<rt>す</rt></ruby>んだのは<b class=\"font-extrabold text-accent\">たまたまかかってきた</b><ruby>電話<rt>でんわ</rt></ruby>に〜"
          ],
          [
            "〜のは<ruby>今年<rt>ことし</rt></ruby>が<ruby>初<rt>はじ</rt></ruby>めて",
            "〜是今年第一次",
            "<ruby>夏休<rt>なつやす</rt></ruby>みを<ruby>過<rt>す</rt></ruby>ごすのは<b class=\"font-extrabold text-accent\"><ruby>今年<rt>ことし</rt></ruby>が</b><ruby>初<rt>はじ</rt></ruby>めて"
          ],
          [
            "〜につれて〜のはなぜ",
            "隨著〜，為什麼〜",
            "〜につれて<ruby>短<rt>みじか</rt></ruby>く<ruby>感<rt>かん</rt></ruby>じるようになる<b class=\"font-extrabold text-accent\">のは</b>なぜ"
          ],
          [
            "〜わけでもないのに〜のは",
            "明明不是〜，為什麼〜",
            "〜わけでもないのに<b class=\"font-extrabold text-accent\">おなかが<ruby>鳴<rt>な</rt></ruby>るのは</b>どうして"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-nom",
    "title": "名詞化（〜のを・〜のも・〜のと）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜のを<ruby>覚<rt>おぼ</rt></ruby>えている",
            "記得〜（的事）",
            "〜と<ruby>思<rt>おも</rt></ruby>った<b class=\"font-extrabold text-accent\">のを</b>よく<ruby>覚<rt>おぼ</rt></ruby>えている"
          ],
          [
            "〜のも〜（理由）",
            "〜也是因為〜",
            "<ruby>体温<rt>たいおん</rt></ruby>が<ruby>下<rt>さ</rt></ruby>がる<b class=\"font-extrabold text-accent\">のも</b>その<ruby>性質<rt>せいしつ</rt></ruby>による"
          ],
          [
            "〜のも〜と<ruby>思<rt>おも</rt></ruby>うと",
            "一想到〜就〜",
            "〜のも<b class=\"font-extrabold text-accent\">あと<ruby>数週間<rt>すうしゅうかん</rt></ruby></b>と<ruby>思<rt>おも</rt></ruby>うと<ruby>寂<rt>さび</rt></ruby>しさが<ruby>増<rt>ま</rt></ruby>してくる"
          ],
          [
            "〜のと〜のとでは",
            "做〜與不做〜的差別",
            "<ruby>今<rt>いま</rt></ruby>どこを<ruby>鍛<rt>きた</rt></ruby>えているのか<b class=\"font-extrabold text-accent\"><ruby>意識<rt>いしき</rt></ruby>するのと</b>しないのでは〜"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-wh",
    "title": "疑問詞＋か／〜かどうか",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "<ruby>何<rt>なに</rt></ruby>を〜いいのか",
            "該〜什麼",
            "<ruby>何<rt>なに</rt></ruby>に<ruby>注目<rt>ちゅうもく</rt></ruby>して<ruby>鑑賞<rt>かんしょう</rt></ruby>したら<b class=\"font-extrabold text-accent\">いいのかが</b>わかると"
          ],
          [
            "どんな〜か",
            "多麼〜（的環境）",
            "どんなに<ruby>恵<rt>めぐ</rt></ruby>まれた<b class=\"font-extrabold text-accent\"><ruby>環境<rt>かんきょう</rt></ruby>にいたか</b>と<ruby>感<rt>かん</rt></ruby>じさせられる"
          ],
          [
            "どの〜(ば)〜のか",
            "搭哪班車最快到",
            "どの<ruby>電車<rt>でんしゃ</rt></ruby>で<ruby>行<rt>い</rt></ruby>けば<b class=\"font-extrabold text-accent\"><ruby>一番早<rt>いちばんはや</rt></ruby>く<ruby>着<rt>つ</rt></ruby>くのか</b>"
          ],
          [
            "<ruby>大切<rt>たいせつ</rt></ruby>なのは〜のか<ruby>考<rt>かんが</rt></ruby>えて",
            "重要的是想為什麼〜",
            "どうして<b class=\"font-extrabold text-accent\"><ruby>失敗<rt>しっぱい</rt></ruby>をしてしまった</b>のか<ruby>考<rt>かんが</rt></ruby>えて"
          ],
          [
            "どれだけ〜ことか",
            "有多麼〜啊（感嘆）",
            "<ruby>お金<rt>おかね</rt></ruby>を<ruby>稼<rt>かせ</rt></ruby>ぐことがどれだけ<b class=\"font-extrabold text-accent\"><ruby>大変<rt>たいへん</rt></ruby>な</b>ことか"
          ],
          [
            "<ruby>何<rt>なん</rt></ruby>という〜か",
            "叫什麼名字的〜",
            "<ruby>何<rt>なん</rt></ruby>という<b class=\"font-extrabold text-accent\"><ruby>魚<rt>さかな</rt></ruby></b>かわかりませんが"
          ],
          [
            "〜かどうかにある",
            "成敗在於是否〜",
            "<ruby>最後<rt>さいご</rt></ruby>まで<ruby>取<rt>と</rt></ruby>り<ruby>組<rt>く</rt></ruby>めるかどうか<b class=\"font-extrabold text-accent\">にある</b>"
          ],
          [
            "〜かどうかは<ruby>別<rt>べつ</rt></ruby>として",
            "先不論是否〜",
            "ためになるかどうかは<ruby>別<rt>べつ</rt></ruby>として<b class=\"font-extrabold text-accent\">そんなことを</b><ruby>言<rt>い</rt></ruby>ってくれた"
          ],
          [
            "〜たらいいか",
            "該怎麼〜才好",
            "<b class=\"font-extrabold text-accent\">そのときにどうしたらいいか</b>もう<ruby>一度<rt>いちど</rt></ruby><ruby>考<rt>かんが</rt></ruby>えればいい"
          ],
          [
            "〜のか（こんなに〜）",
            "為什麼會這麼〜",
            "<ruby>彼女<rt>かのじょ</rt></ruby>のことが<b class=\"font-extrabold text-accent\">こんなに<ruby>気<rt>き</rt></ruby>になる</b>のか"
          ],
          [
            "Nというと",
            "一說到N",
            "<b class=\"font-extrabold text-accent\"><ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>というと</b><ruby>肉<rt>にく</rt></ruby>や<ruby>魚<rt>さかな</rt></ruby>や<ruby>卵<rt>たまご</rt></ruby>といった〜"
          ],
          [
            "〜といえば",
            "說到〜",
            "〜うえで<ruby>何<rt>なに</rt></ruby>が<b class=\"font-extrabold text-accent\"><ruby>大切<rt>たいせつ</rt></ruby>か</b>といえば"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-deg",
    "title": "程度・比較（ほど・ぐらい・わりに）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "Nほど〜ない",
            "沒有比N更〜",
            "<ruby>彼女<rt>かのじょ</rt></ruby><b class=\"font-extrabold text-accent\">ほど</b><ruby>声<rt>こえ</rt></ruby>がきれいな<ruby>歌手<rt>かしゅ</rt></ruby>はいない"
          ],
          [
            "Nほど〜<ruby>先生<rt>せんせい</rt></ruby>はいない",
            "沒有像N那樣〜的人",
            "あの<b class=\"font-extrabold text-accent\"><ruby>先生<rt>せんせい</rt></ruby>ほど</b>わかりやすく<ruby>教<rt>おし</rt></ruby>えてくれる<ruby>先生<rt>せんせい</rt></ruby>は〜"
          ],
          [
            "〜ていたほど〜ない",
            "沒有想像中那麼〜",
            "<ruby>思<rt>おも</rt></ruby>っていた<b class=\"font-extrabold text-accent\">ほど</b><ruby>込<rt>こ</rt></ruby>んで〜"
          ],
          [
            "〜ないほど",
            "〜到不能停的程度",
            "<ruby>食<rt>た</rt></ruby>べ<ruby>出<rt>だ</rt></ruby>すと<b class=\"font-extrabold text-accent\"><ruby>止<rt>と</rt></ruby>まらないほど</b>みかんが<ruby>好<rt>す</rt></ruby>き"
          ],
          [
            "〜というほど",
            "說〜也不為過",
            "<ruby>日本<rt>にほん</rt></ruby>のジャズは<ruby>抜<rt>ぬ</rt></ruby>きには<b class=\"font-extrabold text-accent\"><ruby>語<rt>かた</rt></ruby>れない</b>というほど"
          ],
          [
            "〜ぐらい（程度）",
            "〜到連…的程度",
            "<ruby>褒<rt>ほ</rt></ruby>めることがない<ruby>部長<rt>ぶちょう</rt></ruby>が<b class=\"font-extrabold text-accent\"><ruby>褒<rt>ほ</rt></ruby>める</b>ぐらい"
          ],
          [
            "〜ぐらい（數量）",
            "多到不知道有多少",
            "どれだけあるかわからないぐらい<b class=\"font-extrabold text-accent\">たくさんの<ruby>種類<rt>しゅるい</rt></ruby>の</b><ruby>定食<rt>ていしょく</rt></ruby>が"
          ],
          [
            "〜ないくらい",
            "〜到沒人不知道",
            "<ruby>住<rt>す</rt></ruby>んでいる<ruby>人<rt>ひと</rt></ruby>なら<ruby>知<rt>し</rt></ruby>らない<ruby>人<rt>ひと</rt></ruby>はいないくらい<b class=\"font-extrabold text-accent\"><ruby>有名<rt>ゆうめい</rt></ruby>な</b>お<ruby>菓子屋<rt>かしや</rt></ruby>さん"
          ],
          [
            "〜わりに",
            "與〜不相稱",
            "〜のわりにそんなに<b class=\"font-extrabold text-accent\"><ruby>寒<rt>さむ</rt></ruby>く<ruby>感<rt>かん</rt></ruby>じない</b>のは"
          ],
          [
            "〜にしては",
            "就〜而言算是",
            "この<ruby>時期<rt>じき</rt></ruby>にしては<b class=\"font-extrabold text-accent\"><ruby>珍<rt>めずら</rt></ruby>しく</b>いい<ruby>天気<rt>てんき</rt></ruby>で"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-limit",
    "title": "限定・累加（〜だけ・〜ばかり）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜だけだから",
            "只是〜而已，所以〜",
            "<ruby>材料<rt>ざいりょう</rt></ruby>を<ruby>混<rt>ま</rt></ruby>ぜて<ruby>冷<rt>ひ</rt></ruby>やす<b class=\"font-extrabold text-accent\">だけ</b>だから"
          ],
          [
            "〜だけの＋N",
            "只是〜的",
            "<ruby>見<rt>み</rt></ruby>る<b class=\"font-extrabold text-accent\">だけの</b>つもりで<ruby>服屋<rt>ふくや</rt></ruby>に<ruby>入<rt>はい</rt></ruby>った"
          ],
          [
            "AだけでなくB",
            "不只A，B也",
            "<ruby>燃料<rt>ねんりょう</rt></ruby>として<b class=\"font-extrabold text-accent\"><ruby>使<rt>つか</rt></ruby>われる</b>だけでなく〜"
          ],
          [
            "〜ないだけでなく",
            "不只沒〜而且〜",
            "<ruby>得<rt>え</rt></ruby>られるはずの<b class=\"font-extrabold text-accent\"><ruby>効果<rt>こうか</rt></ruby>が</b><ruby>得<rt>え</rt></ruby>られないだけでなく"
          ],
          [
            "〜だけでなく〜も",
            "不只〜，還能〜",
            "<ruby>数<rt>かず</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いだけでなく、〜<b class=\"font-extrabold text-accent\"><ruby>景色<rt>けしき</rt></ruby>を<ruby>楽<rt>たの</rt></ruby>しみながら</b><ruby>読書<rt>どくしょ</rt></ruby>ができる"
          ],
          [
            "〜ばかり",
            "盡是〜",
            "<ruby>旅行<rt>りょこう</rt></ruby>していた２<ruby>週間<rt>しゅうかん</rt></ruby>は<b class=\"font-extrabold text-accent\"><ruby>楽<rt>たの</rt></ruby>しいこと</b>ばかり"
          ],
          [
            "〜たばかりの＋N",
            "剛〜的N",
            "<ruby>買<rt>か</rt></ruby>った<b class=\"font-extrabold text-accent\">ばかりの</b><ruby>白<rt>しろ</rt></ruby>いTシャツ"
          ],
          [
            "〜たばかりなので",
            "因為剛開始〜",
            "<ruby>始<rt>はじ</rt></ruby>めたばかりなので<ruby>覚<rt>おぼ</rt></ruby>えなければいけない<b class=\"font-extrabold text-accent\">ことが</b><ruby>多<rt>おお</rt></ruby>くて"
          ],
          [
            "〜といっても〜ばかりで",
            "雖說〜但盡是〜",
            "〜といってもわからないこと<b class=\"font-extrabold text-accent\">ばかりで</b>"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-emph",
    "title": "強調（〜すら・〜まで・〜でも・〜どころか）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜こと すら",
            "連〜都（極端例）",
            "すれ<ruby>違<rt>ちが</rt></ruby>っても<ruby>目<rt>め</rt></ruby>を<ruby>合<rt>あ</rt></ruby>わせる<b class=\"font-extrabold text-accent\">こと</b>すら"
          ],
          [
            "Nにまで",
            "連N都（範圍擴大）",
            "<ruby>小麦粉<rt>こむぎこ</rt></ruby>はもちろん<b class=\"font-extrabold text-accent\"><ruby>水<rt>みず</rt></ruby>にまで</b>こだわって"
          ],
          [
            "Nにでも",
            "隨便N之類的",
            "<ruby>出<rt>で</rt></ruby>てくる<b class=\"font-extrabold text-accent\">お<ruby>姫様<rt>ひめさま</rt></ruby>にでも</b>なったような"
          ],
          [
            "N でも",
            "連N都〜",
            "<ruby>大人<rt>おとな</rt></ruby><b class=\"font-extrabold text-accent\">でも</b><ruby>解<rt>と</rt></ruby>けないような"
          ],
          [
            "〜でも（一人でも）",
            "即使一個人也〜",
            "<ruby>重<rt>おも</rt></ruby>さはないため<b class=\"font-extrabold text-accent\"><ruby>一人<rt>ひとり</rt></ruby></b>でも"
          ],
          [
            "〜どころか",
            "不但沒〜反而〜",
            "<ruby>思<rt>おも</rt></ruby>い<ruby>込<rt>こ</rt></ruby>みだけで<ruby>品物<rt>しなもの</rt></ruby>を<ruby>選<rt>えら</rt></ruby>ぶと<b class=\"font-extrabold text-accent\"><ruby>喜<rt>よろこ</rt></ruby>ばれるどころか</b><ruby>迷惑<rt>めいわく</rt></ruby>を〜"
          ],
          [
            "Nなどの＋N",
            "〜等的N",
            "だけでなくスパゲッティ<b class=\"font-extrabold text-accent\">などの</b><ruby>料理<rt>りょうり</rt></ruby>も"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-adv1",
    "title": "否定呼應の副詞（<ruby>決<rt>けっ</rt></ruby>して・なかなか・まず）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "<ruby>決<rt>けっ</rt></ruby>して〜ではなく",
            "絕不是〜",
            "<ruby>決<rt>けっ</rt></ruby>して<b class=\"font-extrabold text-accent\"><ruby>性格<rt>せいかく</rt></ruby>や<ruby>能力<rt>のうりょく</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby></b>ではなく"
          ],
          [
            "<ruby>決<rt>けっ</rt></ruby>して〜が",
            "〜絕不算〜，但是〜",
            "<ruby>商社<rt>しょうしゃ</rt></ruby>に<ruby>比<rt>くら</rt></ruby>べると<ruby>決<rt>けっ</rt></ruby>して<b class=\"font-extrabold text-accent\"><ruby>規模<rt>きぼ</rt></ruby>は<ruby>大<rt>おお</rt></ruby>きくないが</b>"
          ],
          [
            "なかなか〜ない（動作）",
            "怎麼也沒辦法〜",
            "<ruby>戻<rt>もど</rt></ruby>そうとしても<b class=\"font-extrabold text-accent\">なかなか<ruby>戻<rt>もど</rt></ruby>せないので</b>"
          ],
          [
            "なかなか〜ない（難得）",
            "很難得有〜",
            "〜<ruby>見<rt>み</rt></ruby>られる<b class=\"font-extrabold text-accent\"><ruby>動物園<rt>どうぶつえん</rt></ruby>は</b>なかなかないだろう"
          ],
          [
            "なかなか〜<ruby>曲<rt>きょく</rt></ruby>",
            "怎麼也彈不好的曲子",
            "<ruby>何回<rt>なんかい</rt></ruby><ruby>練習<rt>れんしゅう</rt></ruby>しても、なかなか<b class=\"font-extrabold text-accent\"><ruby>上手<rt>じょうず</rt></ruby>に<ruby>弾<rt>ひ</rt></ruby>けない</b><ruby>曲<rt>きょく</rt></ruby>"
          ],
          [
            "まず〜ない",
            "幾乎不會〜",
            "〜ことは<b class=\"font-extrabold text-accent\">まず</b>ないという"
          ],
          [
            "あと〜しかない",
            "只剩〜",
            "<ruby>始<rt>はじ</rt></ruby>まるまで<b class=\"font-extrabold text-accent\">あと3<ruby>分<rt>ぷん</rt></ruby></b>しかない"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-adv2",
    "title": "副詞・語感の呼應",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "つい〜てしまう",
            "不小心〜",
            "<ruby>寝<rt>ね</rt></ruby>ようと<ruby>思<rt>おも</rt></ruby>いつつ<b class=\"font-extrabold text-accent\">つい</b>テレビを<ruby>見続<rt>みつづ</rt></ruby>けてしまい"
          ],
          [
            "どうしても〜",
            "無論如何也〜",
            "<ruby>悩<rt>なや</rt></ruby>んだのだが<b class=\"font-extrabold text-accent\">どうしても</b>と<ruby>言<rt>い</rt></ruby>われて"
          ],
          [
            "もう＋N（意外）",
            "已經是〜了",
            "<ruby>息子<rt>むすこ</rt></ruby>さんも<b class=\"font-extrabold text-accent\">もう</b><ruby>高校生<rt>こうこうせい</rt></ruby>ですか"
          ],
          [
            "〜とはずいぶん〜",
            "居然〜真是〜",
            "<ruby>農家<rt>のうか</rt></ruby>になるとは<b class=\"font-extrabold text-accent\">ずいぶん</b><ruby>勇気<rt>ゆうき</rt></ruby>があるんだね"
          ],
          [
            "<ruby>決<rt>き</rt></ruby>めた<ruby>以上<rt>いじょう</rt></ruby>は",
            "既然決定了就〜",
            "<ruby>決<rt>き</rt></ruby>めた<b class=\"font-extrabold text-accent\"><ruby>以上<rt>いじょう</rt></ruby>は</b>、どんなに<ruby>誘<rt>さそ</rt></ruby>われても"
          ],
          [
            "どんなに〜ても",
            "無論多麼〜",
            "<ruby>彼女<rt>かのじょ</rt></ruby>のことなら、どんなに<b class=\"font-extrabold text-accent\"><ruby>小<rt>ちい</rt></ruby>さな</b>ことでも"
          ],
          [
            "<ruby>何分<rt>なんぷん</rt></ruby>〜ても",
            "無論等多久〜",
            "メッセージが<ruby>出<rt>で</rt></ruby>たまま<ruby>何分<rt>なんぷん</rt></ruby><b class=\"font-extrabold text-accent\"><ruby>待<rt>ま</rt></ruby>っても</b><ruby>先<rt>さき</rt></ruby>に<ruby>進<rt>すす</rt></ruby>まない"
          ],
          [
            "<ruby>一度<rt>いちど</rt></ruby>〜と",
            "一旦〜就〜",
            "<ruby>夫<rt>おっと</rt></ruby>は<b class=\"font-extrabold text-accent\"><ruby>一度<rt>いちど</rt></ruby></b><ruby>買<rt>か</rt></ruby>ってしまうと"
          ],
          [
            "<ruby>一度<rt>いちど</rt></ruby>でいいから",
            "只要一次就好",
            "<ruby>一度<rt>いちど</rt></ruby>で<b class=\"font-extrabold text-accent\">いい</b>から<ruby>会<rt>あ</rt></ruby>ってみたい"
          ],
          [
            "〜といいのだが",
            "要是〜就好了",
            "<ruby>晴<rt>は</rt></ruby>れると<b class=\"font-extrabold text-accent\">いい</b>のだが"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-mod",
    "title": "名詞を修飾する長い連体修飾",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜(て)いた＋N",
            "修飾名詞的長句",
            "<ruby>予約<rt>よやく</rt></ruby>が<ruby>取<rt>と</rt></ruby>れなくて<ruby>行<rt>い</rt></ruby>けなかった<b class=\"font-extrabold text-accent\">レストランに</b>ようやく"
          ],
          [
            "〜ている＋Nを",
            "最近想要的N",
            "<ruby>最近<rt>さいきん</rt></ruby><ruby>欲<rt>ほ</rt></ruby>しがっている<b class=\"font-extrabold text-accent\">かばんを</b>プレゼントする"
          ],
          [
            "こういう〜N",
            "像這樣的N",
            "こういう<ruby>色<rt>いろ</rt></ruby>のかばんが<b class=\"font-extrabold text-accent\"><ruby>欲<rt>ほ</rt></ruby>しい</b>と<ruby>思<rt>おも</rt></ruby>っていた"
          ],
          [
            "N1のN2が〜",
            "主語用の＋修飾",
            "パンの<ruby>焼<rt>や</rt></ruby>ける<b class=\"font-extrabold text-accent\">いいにおい</b>がする"
          ],
          [
            "〜ものもいる",
            "也有〜的（生物）",
            "<ruby>魚<rt>さかな</rt></ruby>の<ruby>中<rt>なか</rt></ruby>には<b class=\"font-extrabold text-accent\">100<ruby>年<rt>ねん</rt></ruby><ruby>以上<rt>いじょう</rt></ruby><ruby>生<rt>い</rt></ruby>きる</b>ものもいる"
          ],
          [
            "〜<ruby>傾向<rt>けいこう</rt></ruby>がある",
            "有〜的傾向",
            "<ruby>我<rt>わ</rt></ruby>が<ruby>国<rt>くに</rt></ruby>に<ruby>限<rt>かぎ</rt></ruby>らず<b class=\"font-extrabold text-accent\"><ruby>相対的<rt>そうたいてき</rt></ruby>に<ruby>低<rt>ひく</rt></ruby>い</b><ruby>傾向<rt>けいこう</rt></ruby>がある"
          ],
          [
            "〜<ruby>経験<rt>けいけん</rt></ruby>は〜となって",
            "〜的經驗成為〜",
            "<ruby>目標<rt>もくひょう</rt></ruby>を<ruby>達成<rt>たっせい</rt></ruby>した<b class=\"font-extrabold text-accent\"><ruby>経験<rt>けいけん</rt></ruby>は</b><ruby>自信<rt>じしん</rt></ruby>となって"
          ],
          [
            "〜に<ruby>出会<rt>であ</rt></ruby>えない〜と",
            "遇不到的〜的人",
            "<ruby>国<rt>くに</rt></ruby>にいては<ruby>出会<rt>であ</rt></ruby>えない<b class=\"font-extrabold text-accent\"><ruby>様々<rt>さまざま</rt></ruby>な<ruby>文化<rt>ぶんか</rt></ruby>や<ruby>価値観<rt>かちかん</rt></ruby>を<ruby>持<rt>も</rt></ruby>つ<ruby>人<rt>ひと</rt></ruby>と</b>"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-to",
    "title": "〜という（內容・傳聞・觀點）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜という＋N（人）",
            "〜這樣的人",
            "<ruby>好<rt>す</rt></ruby>きでたまらないという<b class=\"font-extrabold text-accent\"><ruby>学生<rt>がくせい</rt></ruby>が</b><ruby>集<rt>あつ</rt></ruby>まって"
          ],
          [
            "〜という＋N（人に）",
            "對〜這樣的人",
            "<ruby>好<rt>す</rt></ruby>きでたまらないという<b class=\"font-extrabold text-accent\"><ruby>人<rt>ひと</rt></ruby>に</b>ぜひおすすめしたい"
          ],
          [
            "〜という＋N（気持ち）",
            "〜這樣的心情",
            "ありがとうという<b class=\"font-extrabold text-accent\"><ruby>感謝<rt>かんしゃ</rt></ruby>の</b><ruby>気持<rt>きも</rt></ruby>ちを<ruby>込<rt>こ</rt></ruby>めて"
          ],
          [
            "〜ということを",
            "〜這件事",
            "インターネットで<ruby>買<rt>か</rt></ruby>う<ruby>人<rt>ひと</rt></ruby>が<b class=\"font-extrabold text-accent\"><ruby>増<rt>ふ</rt></ruby>えてきている</b>ということを"
          ],
          [
            "〜というが",
            "雖說〜（但）",
            "<ruby>誰<rt>だれ</rt></ruby>にでもその<ruby>人<rt>ひと</rt></ruby>にしかない<b class=\"font-extrabold text-accent\"><ruby>良<rt>よ</rt></ruby>さがあるというが</b><ruby>自分<rt>じぶん</rt></ruby>でそれに〜"
          ],
          [
            "〜という<ruby>点<rt>てん</rt></ruby>で",
            "就〜這點而言",
            "<ruby>生活<rt>せいかつ</rt></ruby>しているという<ruby>点<rt>てん</rt></ruby>で<b class=\"font-extrabold text-accent\"><ruby>違<rt>ちが</rt></ruby>いは</b>ない"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-noun-2",
    "title": "名詞＋助詞（資格・比較・立場）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜として",
            "作為〜",
            "<ruby>生活<rt>せいかつ</rt></ruby>に<ruby>欠<rt>か</rt></ruby>かせない<b class=\"font-extrabold text-accent\"><ruby>道具<rt>どうぐ</rt></ruby></b>として"
          ],
          [
            "〜として＋Nの",
            "以〜身分的N",
            "〜として<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>岩本<rt>いわもと</rt></ruby>まさき<ruby>氏<rt>し</rt></ruby><b class=\"font-extrabold text-accent\">の</b>〜"
          ],
          [
            "〜をはじめとした",
            "以〜為首的",
            "<b class=\"font-extrabold text-accent\"><ruby>音楽<rt>おんがく</rt></ruby>コンサートを</b>はじめとしたさまざまな<ruby>催<rt>もよお</rt></ruby>しを"
          ],
          [
            "〜に<ruby>先立<rt>さきだ</rt></ruby>って",
            "在〜之前",
            "〜に<ruby>先立<rt>さきだ</rt></ruby>って、さくら<ruby>市<rt>し</rt></ruby>は<b class=\"font-extrabold text-accent\"><ruby>関係者<rt>かんけいしゃ</rt></ruby>に<ruby>対<rt>たい</rt></ruby>する</b><ruby>説明会<rt>せつめいかい</rt></ruby>を<ruby>開催<rt>かいさい</rt></ruby>する"
          ],
          [
            "〜を<ruby>中心<rt>ちゅうしん</rt></ruby>に",
            "以〜為中心",
            "<ruby>飲食店<rt>いんしょくてん</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>に<b class=\"font-extrabold text-accent\"><ruby>本屋<rt>ほんや</rt></ruby>や<ruby>美容院<rt>びよういん</rt></ruby>など</b>いろいろな<ruby>店<rt>みせ</rt></ruby>が"
          ],
          [
            "〜に<ruby>比<rt>くら</rt></ruby>べると",
            "與〜相比",
            "<ruby>異常<rt>いじょう</rt></ruby>な<ruby>暑<rt>あつ</rt></ruby>さだった<b class=\"font-extrabold text-accent\"><ruby>去年<rt>きょねん</rt></ruby>の<ruby>夏<rt>なつ</rt></ruby>に</b><ruby>比<rt>くら</rt></ruby>べると"
          ],
          [
            "〜と<ruby>比<rt>くら</rt></ruby>べて",
            "與〜相比（程度）",
            "〜の<ruby>場合<rt>ばあい</rt></ruby>と<ruby>比<rt>くら</rt></ruby>べて<b class=\"font-extrabold text-accent\"><ruby>半分程度<rt>はんぶんていど</rt></ruby>の</b><ruby>家賃<rt>やちん</rt></ruby>で"
          ],
          [
            "〜からすると",
            "從〜的立場來看",
            "<ruby>新人<rt>しんじん</rt></ruby>で〜ばかりの<b class=\"font-extrabold text-accent\"><ruby>私<rt>わたし</rt></ruby>からすると</b><ruby>何<rt>なん</rt></ruby>でも<ruby>完璧<rt>かんぺき</rt></ruby>に〜"
          ],
          [
            "〜を<ruby>考<rt>かんが</rt></ruby>えると",
            "考慮到〜",
            "かかる<ruby>費用<rt>ひよう</rt></ruby>を<b class=\"font-extrabold text-accent\"><ruby>考<rt>かんが</rt></ruby>えると</b>、もう〜"
          ],
          [
            "〜ことを<ruby>考<rt>かんが</rt></ruby>えると",
            "考慮到〜這件事",
            "<ruby>集<rt>あつ</rt></ruby>まりにくい<ruby>平日<rt>へいじつ</rt></ruby>だった<b class=\"font-extrabold text-accent\">ことを<ruby>考<rt>かんが</rt></ruby>えると</b>200<ruby>名<rt>めい</rt></ruby>もの〜"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-cause",
    "title": "原因・理由",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜せいか",
            "或許是因為〜",
            "<ruby>帰<rt>かえ</rt></ruby>ったせいか、<b class=\"font-extrabold text-accent\"><ruby>風邪<rt>かぜ</rt></ruby>が</b>またひどくなって"
          ],
          [
            "〜せいで（かえって）",
            "都是因為〜，反而〜",
            "<b class=\"font-extrabold text-accent\"><ruby>道<rt>みち</rt></ruby>が<ruby>渋滞<rt>じゅうたい</rt></ruby>していたせいで</b>かえって<ruby>時間<rt>じかん</rt></ruby>がかかり"
          ],
          [
            "〜ので",
            "因為〜（所以…）",
            "いつのまにか<ruby>外<rt>そと</rt></ruby>が<ruby>暗<rt>くら</rt></ruby>くなっていた<b class=\"font-extrabold text-accent\">ので</b><ruby>驚<rt>おどろ</rt></ruby>いた"
          ],
          [
            "〜から（<ruby>理由<rt>りゆう</rt></ruby>）",
            "因為〜，所以去問",
            "<ruby>友達<rt>ともだち</rt></ruby>が<ruby>北森町<rt>きたもりちょう</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでいる<b class=\"font-extrabold text-accent\">から</b><ruby>聞<rt>き</rt></ruby>いてみたら"
          ],
          [
            "〜ことから（<ruby>由来<rt>ゆらい</rt></ruby>）",
            "由於〜（根據）",
            "<ruby>空<rt>そら</rt></ruby>から<ruby>見<rt>み</rt></ruby>ると〜<b class=\"font-extrabold text-accent\"><ruby>形<rt>かたち</rt></ruby>に</b><ruby>見<rt>み</rt></ruby>えることから"
          ],
          [
            "〜ことから（<ruby>字<rt>じ</rt></ruby>）",
            "由於〜這點",
            "「<ruby>白<rt>しろ</rt></ruby>」という<b class=\"font-extrabold text-accent\"><ruby>字<rt>じ</rt></ruby>になる</b>ことから"
          ],
          [
            "〜ことで",
            "因為〜（原因）",
            "<ruby>隣<rt>となり</rt></ruby>に<ruby>建<rt>た</rt></ruby>ったことで<b class=\"font-extrabold text-accent\"><ruby>私<rt>わたし</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>に</b><ruby>日<rt>ひ</rt></ruby>が<ruby>当<rt>あ</rt></ruby>たらなくなって"
          ],
          [
            "Nで（<ruby>原因<rt>げんいん</rt></ruby>）",
            "因N而〜",
            "<b class=\"font-extrabold text-accent\"><ruby>多<rt>おお</rt></ruby>くのボランティアの<ruby>方<rt>かた</rt></ruby>の<ruby>協力<rt>きょうりょく</rt></ruby>で</b><ruby>一日<rt>いちにち</rt></ruby>で<ruby>終<rt>お</rt></ruby>わった"
          ],
          [
            "〜て（<ruby>原因<rt>げんいん</rt></ruby>）",
            "因為〜而〜",
            "<ruby>食<rt>た</rt></ruby>べるようにしているが<b class=\"font-extrabold text-accent\"><ruby>時間<rt>じかん</rt></ruby>がなくて</b><ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>だけで"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-purpose",
    "title": "目的（〜ために・〜には・〜のに）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜ためには〜ことが<ruby>重要<rt>じゅうよう</rt></ruby>",
            "為了〜，〜很重要",
            "かびを<ruby>防<rt>ふせ</rt></ruby>ぐためには、<ruby>使<rt>つか</rt></ruby>った<ruby>後<rt>あと</rt></ruby><b class=\"font-extrabold text-accent\">ぬれたままにしない</b>ことが<ruby>重要<rt>じゅうよう</rt></ruby>"
          ],
          [
            "〜どおりに〜には",
            "要照〜做的話",
            "〜どおりに<ruby>仕事<rt>しごと</rt></ruby>を<ruby>進<rt>すす</rt></ruby>める<b class=\"font-extrabold text-accent\">には</b>どうすればいいか"
          ],
          [
            "〜には＋それなりの",
            "要〜就需要相應的〜",
            "<ruby>理解<rt>りかい</rt></ruby>するには<b class=\"font-extrabold text-accent\">それなりの</b><ruby>知識<rt>ちしき</rt></ruby>が<ruby>求<rt>もと</rt></ruby>められる"
          ],
          [
            "〜のに〜<ruby>末<rt>すえ</rt></ruby>に",
            "用來〜；經過〜之後（V＋のに＝為了）",
            "〜<b class=\"font-extrabold text-accent\">のに</b>いい<ruby>方法<rt>ほうほう</rt></ruby>はないかと〜"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-cond",
    "title": "條件・逆接",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜ば（<ruby>場所<rt>ばしょ</rt></ruby>）",
            "去〜就〜",
            "<b class=\"font-extrabold text-accent\"><ruby>隣町<rt>となりまち</rt></ruby>のABC<ruby>書店<rt>しょてん</rt></ruby>に<ruby>行<rt>い</rt></ruby>けば</b>まだ<ruby>買<rt>か</rt></ruby>えるらしい"
          ],
          [
            "〜ば（<ruby>手段<rt>しゅだん</rt></ruby>）",
            "若是〜就〜",
            "<b class=\"font-extrabold text-accent\"><ruby>自転車<rt>じてんしゃ</rt></ruby>で<ruby>行<rt>い</rt></ruby>けば</b>よい<ruby>運動<rt>うんどう</rt></ruby>になる"
          ],
          [
            "〜ばいいのに",
            "要是〜就好了（卻沒做）",
            "<ruby>痛<rt>いた</rt></ruby>いんだったら<b class=\"font-extrabold text-accent\"><ruby>早<rt>はや</rt></ruby>く<ruby>行<rt>い</rt></ruby>けばいい</b>のに"
          ],
          [
            "〜ば〜ほど",
            "越〜越〜",
            "<b class=\"font-extrabold text-accent\"><ruby>弾<rt>ひ</rt></ruby>けば</b><ruby>弾<rt>ひ</rt></ruby>くほど<ruby>上手<rt>じょうず</rt></ruby>に"
          ],
          [
            "〜たら",
            "若〜（已經〜的話）",
            "あしたになって<b class=\"font-extrabold text-accent\"><ruby>熱<rt>ねつ</rt></ruby>が<ruby>下<rt>さ</rt></ruby>がって</b>いたら"
          ],
          [
            "〜てみると",
            "一做就〜",
            "<ruby>理解<rt>りかい</rt></ruby>したつもりでも<b class=\"font-extrabold text-accent\"><ruby>問題<rt>もんだい</rt></ruby>を<ruby>解<rt>と</rt></ruby>いてみると</b>できない"
          ],
          [
            "〜なければ",
            "若沒有〜就〜",
            "〜であっても<b class=\"font-extrabold text-accent\">その<ruby>良<rt>よ</rt></ruby>さが</b><ruby>客<rt>きゃく</rt></ruby>に<ruby>伝<rt>つた</rt></ruby>わらなければ"
          ],
          [
            "〜でないと",
            "不〜就〜",
            "<ruby>検討<rt>けんとう</rt></ruby>してから<b class=\"font-extrabold text-accent\">でないと</b><ruby>回答<rt>かいとう</rt></ruby>できない"
          ],
          [
            "〜のに（<ruby>逆接<rt>ぎゃくせつ</rt></ruby>）",
            "明明〜卻〜",
            "<ruby>山<rt>やま</rt></ruby>を<ruby>下<rt>お</rt></ruby>りて<ruby>何日<rt>なんにち</rt></ruby>かすると…<ruby>二度<rt>にど</rt></ruby>としたくないと<b class=\"font-extrabold text-accent\"><ruby>思<rt>おも</rt></ruby>うのに</b>"
          ],
          [
            "〜どおりに〜のに",
            "明明照〜做了卻〜",
            "レシピに<ruby>書<rt>か</rt></ruby>いてある<b class=\"font-extrabold text-accent\">とおりに</b><ruby>作<rt>つく</rt></ruby>ったのに"
          ],
          [
            "〜ながらも",
            "雖然〜",
            "しなければと<ruby>思<rt>おも</rt></ruby>いながらも<b class=\"font-extrabold text-accent\"><ruby>仕事<rt>しごと</rt></ruby>の<ruby>予定<rt>よてい</rt></ruby>が</b><ruby>決<rt>き</rt></ruby>まっていなくて"
          ],
          [
            "〜<ruby>以上<rt>いじょう</rt></ruby>は",
            "既然〜就〜",
            "<ruby>決<rt>き</rt></ruby>めた<b class=\"font-extrabold text-accent\"><ruby>以上<rt>いじょう</rt></ruby>は</b>、どんなに<ruby>誘<rt>さそ</rt></ruby>われても"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-time",
    "title": "時間・前後關係（〜たびに・〜うちに・〜うえで）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜たびに",
            "每次〜",
            "<ruby>出張<rt>しゅっちょう</rt></ruby>に<ruby>行<rt>い</rt></ruby>くたびに<b class=\"font-extrabold text-accent\"><ruby>泊<rt>と</rt></ruby>まっている</b>Yホテルが"
          ],
          [
            "〜のうちに",
            "在〜的同時／之間",
            "<ruby>言<rt>い</rt></ruby>い<ruby>終<rt>お</rt></ruby>わるか<ruby>終<rt>お</rt></ruby>わらないか<b class=\"font-extrabold text-accent\">のうちに</b><ruby>玄関<rt>げんかん</rt></ruby>を〜"
          ],
          [
            "〜ているうちに",
            "〜著〜著就〜",
            "<ruby>商品<rt>しょうひん</rt></ruby>なのに<b class=\"font-extrabold text-accent\">CMなどで<ruby>何度<rt>なんど</rt></ruby>か<ruby>見<rt>み</rt></ruby>ている</b>うちに"
          ],
          [
            "〜<ruby>間<rt>あいだ</rt></ruby>に",
            "趁〜期間",
            "<ruby>友達<rt>ともだち</rt></ruby>がいるので<b class=\"font-extrabold text-accent\"><ruby>東京<rt>とうきょう</rt></ruby>に</b>いる<ruby>間<rt>あいだ</rt></ruby>に"
          ],
          [
            "〜ときには",
            "到了〜的時候",
            "〜<b class=\"font-extrabold text-accent\"><ruby>高校<rt>こうこう</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ったときには</b><ruby>将来<rt>しょうらい</rt></ruby>〜"
          ],
          [
            "〜<ruby>以来<rt>いらい</rt></ruby>",
            "自從〜以來",
            "<ruby>買<rt>か</rt></ruby>って<ruby>以来<rt>いらい</rt></ruby>ずっと<b class=\"font-extrabold text-accent\"><ruby>使<rt>つか</rt></ruby>っていた</b>かばんが"
          ],
          [
            "〜きり／〜まま",
            "〜之後就一直〜",
            "<ruby>入<rt>はい</rt></ruby>っていったきり<b class=\"font-extrabold text-accent\"><ruby>一度<rt>いちど</rt></ruby>も<ruby>出<rt>で</rt></ruby>てこないまま</b>2<ruby>時間<rt>じかん</rt></ruby>が〜"
          ],
          [
            "〜きり（<ruby>一度<rt>いちど</rt></ruby>）",
            "只〜一次就沒再〜",
            "<ruby>海外<rt>かいがい</rt></ruby>に<ruby>引<rt>ひ</rt></ruby>っ<ruby>越<rt>こ</rt></ruby>した<b class=\"font-extrabold text-accent\"><ruby>友達<rt>ともだち</rt></ruby>からもらったもので</b>、<ruby>一度<rt>いちど</rt></ruby><ruby>弾<rt>ひ</rt></ruby>いたきり"
          ],
          [
            "〜ついでに",
            "順便〜",
            "<b class=\"font-extrabold text-accent\"><ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>するついでに</b><ruby>預<rt>あず</rt></ruby>けた<ruby>服<rt>ふく</rt></ruby>を<ruby>取<rt>と</rt></ruby>りに<ruby>行<rt>い</rt></ruby>ける"
          ],
          [
            "〜てから",
            "先〜再〜",
            "<b class=\"font-extrabold text-accent\"><ruby>事前<rt>じぜん</rt></ruby>に<ruby>確認<rt>かくにん</rt></ruby>してから</b><ruby>行<rt>い</rt></ruby>ったから"
          ],
          [
            "〜うえで",
            "在〜之後／在〜方面",
            "<ruby>自分<rt>じぶん</rt></ruby>の<ruby>立場<rt>たちば</rt></ruby>をよく<ruby>考<rt>かんが</rt></ruby>えた<b class=\"font-extrabold text-accent\">うえで</b><ruby>発言<rt>はつげん</rt></ruby>しなければ〜"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-time2",
    "title": "前後關係・動機（〜うえに・〜あまり・〜つもりで）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "組合",
          "意思／接法",
          "完整正解句"
        ],
        "rows": [
          [
            "〜うえに",
            "而且〜（累加）",
            "<ruby>客<rt>きゃく</rt></ruby>の<ruby>注文<rt>ちゅうもん</rt></ruby>を<ruby>間違<rt>まちが</rt></ruby>えた<b class=\"font-extrabold text-accent\">うえに</b><ruby>皿<rt>さら</rt></ruby>を<ruby>割<rt>わ</rt></ruby>るという〜"
          ],
          [
            "〜あまり",
            "過於〜以致〜",
            "<ruby>気<rt>き</rt></ruby>にするあまり<b class=\"font-extrabold text-accent\"><ruby>自分<rt>じぶん</rt></ruby>の<ruby>本当<rt>ほんとう</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ちを</b><ruby>言<rt>い</rt></ruby>えずに"
          ],
          [
            "〜つもりで",
            "打算〜／抱著〜的心態",
            "<ruby>見<rt>み</rt></ruby>るだけの<b class=\"font-extrabold text-accent\">つもりで</b><ruby>服屋<rt>ふくや</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ったら"
          ]
        ]
      }
    ]
  },
  {
    "id": "sort-traps",
    "title": "常見陷阱",
    "hint": "",
    "blocks": [
      {
        "kind": "dos",
        "items": [
          {
            "wrong": "排完就把最後一格當成 ★",
            "right": "★ 是第 3 格，常落在中間",
            "why": "題庫的答案常是「のは」「には」「のを」「で」這類助詞或形式名詞，或夾在組合中間的內容。先排整句，再數格子"
          },
          {
            "wrong": "<ruby>大学生活<rt>だいがくせいかつ</rt></ruby>に<ruby>対<rt>たい</rt></ruby>する<ruby>持<rt>も</rt></ruby>っているイメージ",
            "right": "<ruby>大学生活<rt>だいがくせいかつ</rt></ruby>に<ruby>対<rt>たい</rt></ruby>して<ruby>持<rt>も</rt></ruby>っているイメージ",
            "why": "「に対する」後面接名詞，「に対して」後面接動詞。看後面的片段是名詞還是動詞，就知道用哪個，也就決定了 ★ 的位置"
          },
          {
            "wrong": "<ruby>買<rt>か</rt></ruby>ってくれてきてくれる／<ruby>終<rt>お</rt></ruby>わらせしまって",
            "right": "<ruby>買<rt>か</rt></ruby>ってきてくれる／<ruby>終<rt>お</rt></ruby>わらせてしまわないと",
            "why": "補助動詞順序是「動作→來去方向（くる・いく）→授受（くれる・もらう）」，「てしまう」緊貼在動作後面。接反了讀起來就不自然"
          },
          {
            "wrong": "<ruby>弾<rt>ひ</rt></ruby>くほど<ruby>弾<rt>ひ</rt></ruby>けば",
            "right": "<ruby>弾<rt>ひ</rt></ruby>けば<ruby>弾<rt>ひ</rt></ruby>くほど",
            "why": "「V-ば＋V辭書形＋ほど」「疑問詞＋か」這類固定組合內部順序不能換。先把組合湊好當成一塊，再排進整句"
          }
        ]
      }
    ]
  }
];
