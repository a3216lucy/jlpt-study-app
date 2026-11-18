// Models
import type { OnomatopoeiaGroup } from '../../grammar-review.model';

/**
 * 擬聲擬態語整理（N3＋N2 範圍）。`hot: true` ＝ N2／N3 考古題考過的詞（畫面用紅色粗體標出）。
 * `exampleHtml` 是已加好 `<ruby>` 讀音的例句（靜態資料，只放進 `[innerHTML]`）。
 */
export const ONOMATOPOEIA_GROUPS: OnomatopoeiaGroup[] = [
  {
    "label": "聲音（擬聲語）",
    "hint": "模仿聲音的詞：雨聲、雷聲、敲打聲、咳嗽聲",
    "clusters": [
      {
        "title": "雨・自然",
        "compare": "ざあざあ＝大雨嘩啦嘩啦；しとしと＝小雨安靜地下；ぽつぽつ＝雨點稀疏地落下",
        "entries": [
          {
            "word": "ざあざあ",
            "meaning": "（雨）嘩啦嘩啦、傾盆",
            "note": "常搭配「降る」",
            "exampleHtml": "<ruby>雨<rt>あめ</rt></ruby>が<b class=\"text-accent\">ざあざあ</b><ruby>降<rt>ふ</rt></ruby>っている。",
            "zh": "雨嘩啦嘩啦地下著。",
            "hot": false
          },
          {
            "word": "しとしと",
            "meaning": "（雨）淅淅瀝瀝、靜靜地",
            "note": "細雨",
            "exampleHtml": "<ruby>朝<rt>あさ</rt></ruby>から<ruby>雨<rt>あめ</rt></ruby>が<b class=\"text-accent\">しとしと</b><ruby>降<rt>ふ</rt></ruby>っている。",
            "zh": "從早上開始就下著細雨。",
            "hot": false
          },
          {
            "word": "ぽつぽつ",
            "meaning": "（雨點）稀稀疏疏地",
            "note": "雨剛開始下",
            "exampleHtml": "<ruby>雨<rt>あめ</rt></ruby>が<b class=\"text-accent\">ぽつぽつ</b><ruby>降<rt>ふ</rt></ruby>ってきた。",
            "zh": "開始滴滴答答地下起雨來了。",
            "hot": false
          },
          {
            "word": "ごろごろ",
            "meaning": "（雷聲）隆隆；（東西滾動、懶散躺著）",
            "note": "一個詞三種用法",
            "exampleHtml": "<ruby>遠<rt>とお</rt></ruby>くで<ruby>雷<rt>かみなり</rt></ruby>が<b class=\"text-accent\">ごろごろ</b><ruby>鳴<rt>な</rt></ruby>っている。",
            "zh": "遠處雷聲隆隆。",
            "hot": false
          }
        ]
      },
      {
        "title": "敲打・拍手",
        "compare": "どんどん＝用力敲門；とんとん＝輕輕敲；ぱちぱち＝拍手聲、火花爆裂聲",
        "entries": [
          {
            "word": "どんどん",
            "meaning": "（用力敲打）咚咚",
            "note": "也有「越來越」的意思（見狀態那一類）",
            "exampleHtml": "<ruby>誰<rt>だれ</rt></ruby>かがドアを<b class=\"text-accent\">どんどん</b><ruby>叩<rt>たた</rt></ruby>いている。",
            "zh": "有人在砰砰地敲門。",
            "hot": false
          },
          {
            "word": "とんとん",
            "meaning": "（輕敲）叩叩",
            "note": "",
            "exampleHtml": "<ruby>肩<rt>かた</rt></ruby>を<b class=\"text-accent\">とんとん</b><ruby>叩<rt>たた</rt></ruby>いて<ruby>呼<rt>よ</rt></ruby>んだ。",
            "zh": "輕輕拍肩叫了我。",
            "hot": false
          },
          {
            "word": "ぱちぱち",
            "meaning": "（拍手、火花）啪啪",
            "note": "",
            "exampleHtml": "<ruby>客<rt>きゃく</rt></ruby>は<b class=\"text-accent\">ぱちぱち</b>と<ruby>拍手<rt>はくしゅ</rt></ruby>した。",
            "zh": "觀眾啪啪地鼓掌。",
            "hot": false
          }
        ]
      },
      {
        "title": "咳嗽・肚子叫",
        "compare": "ごほごほ＝咳嗽聲；ぐうぐう＝肚子叫或打呼；くしゃん＝噴嚏聲",
        "entries": [
          {
            "word": "ごほごほ",
            "meaning": "（咳嗽聲）咳咳",
            "note": "",
            "exampleHtml": "<ruby>風邪<rt>かぜ</rt></ruby>で、<b class=\"text-accent\">ごほごほ</b><ruby>咳<rt>せき</rt></ruby>が<ruby>出<rt>で</rt></ruby>る。",
            "zh": "因為感冒，一直咳嗽。",
            "hot": false
          },
          {
            "word": "ぐうぐう",
            "meaning": "（肚子叫）咕嚕咕嚕；（熟睡打呼）呼呼",
            "note": "",
            "exampleHtml": "<ruby>朝<rt>あさ</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べなかったので、おなかが<b class=\"text-accent\">ぐうぐう</b><ruby>鳴<rt>な</rt></ruby>った。",
            "zh": "沒吃早餐，肚子咕嚕咕嚕叫。",
            "hot": false
          }
        ]
      },
      {
        "title": "撕破・摩擦・喝水",
        "compare": "びりびり＝撕紙、布的聲音，也可指電麻；ぎしぎし＝木頭、床板嘎吱聲；ごくごく＝大口喝水聲；ぶるぶる＝發抖",
        "entries": [
          {
            "word": "びりびり",
            "meaning": "（撕紙、布）嘶啦；（電）麻麻的",
            "note": "",
            "exampleHtml": "<ruby>手紙<rt>てがみ</rt></ruby>を<b class=\"text-accent\">びりびり</b>に<ruby>破<rt>やぶ</rt></ruby>いた。",
            "zh": "把信撕得粉碎。",
            "hot": false
          },
          {
            "word": "ぎしぎし",
            "meaning": "（木頭、床板）嘎吱嘎吱",
            "note": "",
            "exampleHtml": "<ruby>古<rt>ふる</rt></ruby>い<ruby>階段<rt>かいだん</rt></ruby>が<b class=\"text-accent\">ぎしぎし</b><ruby>音<rt>おと</rt></ruby>を<ruby>立<rt>た</rt></ruby>てた。",
            "zh": "舊樓梯發出嘎吱嘎吱的聲音。",
            "hot": false
          },
          {
            "word": "ごくごく",
            "meaning": "（大口）咕嘟咕嘟地喝",
            "note": "",
            "exampleHtml": "<ruby>冷<rt>つめ</rt></ruby>たい<ruby>水<rt>みず</rt></ruby>を<b class=\"text-accent\">ごくごく</b><ruby>飲<rt>の</rt></ruby>んだ。",
            "zh": "咕嘟咕嘟地喝了冷水。",
            "hot": false
          },
          {
            "word": "ぶるぶる",
            "meaning": "（寒冷、害怕）發抖",
            "note": "",
            "exampleHtml": "<ruby>寒<rt>さむ</rt></ruby>くて、<b class=\"text-accent\">ぶるぶる</b><ruby>震<rt>ふる</rt></ruby>えた。",
            "zh": "冷得發抖。",
            "hot": false
          },
          {
            "word": "ふうふう",
            "meaning": "（吹氣）呼呼；（喘氣）呼哧呼哧",
            "note": "",
            "exampleHtml": "<ruby>熱<rt>あつ</rt></ruby>いスープを<b class=\"text-accent\">ふうふう</b><ruby>吹<rt>ふ</rt></ruby>いて<ruby>飲<rt>の</rt></ruby>んだ。",
            "zh": "把熱湯吹涼了才喝。",
            "hot": false
          },
          {
            "word": "こんこん",
            "meaning": "（輕敲、咳嗽）咚咚、咳咳",
            "note": "",
            "exampleHtml": "<ruby>ドア<rt>どあ</rt></ruby>を<b class=\"text-accent\">こんこん</b>とノックした。",
            "zh": "咚咚地敲了門。",
            "hot": false
          },
          {
            "word": "ばりばり",
            "meaning": "（咬脆物）嘎吱嘎吱；（工作）幹勁十足",
            "note": "",
            "exampleHtml": "せんべいを<b class=\"text-accent\">ばりばり</b><ruby>食<rt>た</rt></ruby>べた。",
            "zh": "嘎吱嘎吱地吃著仙貝。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "說話・聲音的樣子",
    "hint": "表示說話方式、聲音大小",
    "clusters": [
      {
        "title": "說話方式",
        "compare": "ぺらぺら＝外語說得流利；べらべら＝說個不停（常帶貶意）；ぶつぶつ＝小聲嘀咕抱怨；ぼそぼそ＝含糊小聲；ひそひそ＝壓低聲音說悄悄話",
        "entries": [
          {
            "word": "ぺらぺら",
            "meaning": "（外語）流利",
            "note": "多用於外語；不帶貶意",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>英語<rt>えいご</rt></ruby>が<b class=\"text-accent\">ぺらぺら</b>だ。",
            "zh": "他英語說得很流利。",
            "hot": true
          },
          {
            "word": "べらべら",
            "meaning": "說個不停（常是不該說的）",
            "note": "常帶「多嘴」的負面語感",
            "exampleHtml": "<ruby>秘密<rt>ひみつ</rt></ruby>を<b class=\"text-accent\">べらべら</b><ruby>話<rt>はな</rt></ruby>してしまった。",
            "zh": "不小心把祕密全說出去了。",
            "hot": true
          },
          {
            "word": "ぶつぶつ",
            "meaning": "小聲嘀咕、抱怨",
            "note": "也可表示表面的小疹子、小顆粒",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>はいつも<b class=\"text-accent\">ぶつぶつ</b><ruby>文句<rt>もんく</rt></ruby>を<ruby>言<rt>い</rt></ruby>っている。",
            "zh": "他總是在小聲抱怨。",
            "hot": false
          },
          {
            "word": "ぼそぼそ",
            "meaning": "（小聲含糊地）喃喃",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<b class=\"text-accent\">ぼそぼそ</b>と<ruby>話<rt>はな</rt></ruby>すので、よく<ruby>聞<rt>き</rt></ruby>こえない。",
            "zh": "他說話含含糊糊，聽不太清楚。",
            "hot": false
          },
          {
            "word": "ひそひそ",
            "meaning": "（小聲）竊竊私語",
            "note": "不想讓人聽到",
            "exampleHtml": "<ruby>教室<rt>きょうしつ</rt></ruby>で、<b class=\"text-accent\">ひそひそ</b><ruby>話<rt>ばなし</rt></ruby>をしている<ruby>人<rt>ひと</rt></ruby>がいる。",
            "zh": "教室裡有人在竊竊私語。",
            "hot": true
          },
          {
            "word": "はきはき",
            "meaning": "（說話、回答）清楚爽快",
            "note": "形容說話、回答態度明快",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>はいつも<b class=\"text-accent\">はきはき</b><ruby>答<rt>こた</rt></ruby>える。",
            "zh": "她總是回答得很清楚明快。",
            "hot": true
          }
        ]
      },
      {
        "title": "吵雜・安靜",
        "compare": "がやがや＝許多人說話的吵雜聲；ざわざわ＝騷動、不安的嘈雜；しーんと＝安靜無聲",
        "entries": [
          {
            "word": "がやがや",
            "meaning": "（許多人）吵吵嚷嚷",
            "note": "",
            "exampleHtml": "<ruby>駅<rt>えき</rt></ruby>のホームは<b class=\"text-accent\">がやがや</b>している。",
            "zh": "車站月台吵吵嚷嚷的。",
            "hot": false
          },
          {
            "word": "ざわざわ",
            "meaning": "（人聲、樹葉）沙沙、騷動",
            "note": "也可用於心裡不安",
            "exampleHtml": "<ruby>会場<rt>かいじょう</rt></ruby>が<b class=\"text-accent\">ざわざわ</b>し<ruby>始<rt>はじ</rt></ruby>めた。",
            "zh": "會場開始騷動起來。",
            "hot": false
          },
          {
            "word": "しーんと",
            "meaning": "（突然）鴉雀無聲",
            "note": "",
            "exampleHtml": "<ruby>先生<rt>せんせい</rt></ruby>が<ruby>入<rt>はい</rt></ruby>ってくると、<ruby>教室<rt>きょうしつ</rt></ruby>が<b class=\"text-accent\">しーんと</b>なった。",
            "zh": "老師一進來，教室就安靜下來了。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "笑・哭・表情",
    "hint": "表情與笑哭的樣子",
    "clusters": [
      {
        "title": "笑",
        "compare": "にこにこ＝開朗地一直笑；にっこり＝一瞬露出微笑；にやにや＝不懷好意或自顧自地笑；くすくす＝忍著小聲笑；げらげら＝放聲大笑",
        "entries": [
          {
            "word": "にこにこ",
            "meaning": "（持續地）笑嘻嘻",
            "note": "表情一直是笑著",
            "exampleHtml": "<ruby>赤<rt>あか</rt></ruby>ちゃんが<b class=\"text-accent\">にこにこ</b><ruby>笑<rt>わら</rt></ruby>っている。",
            "zh": "嬰兒笑嘻嘻的。",
            "hot": true
          },
          {
            "word": "にっこり",
            "meaning": "（一瞬間）微微一笑",
            "note": "一次性的動作",
            "exampleHtml": "<ruby>先生<rt>せんせい</rt></ruby>は<b class=\"text-accent\">にっこり</b><ruby>笑<rt>わら</rt></ruby>って、うなずいた。",
            "zh": "老師微微一笑，點了點頭。",
            "hot": true
          },
          {
            "word": "にやにや",
            "meaning": "（意味深長、不懷好意地）傻笑",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>一人<rt>ひとり</rt></ruby>で<b class=\"text-accent\">にやにや</b>している。",
            "zh": "他一個人在那裡傻笑。",
            "hot": false
          },
          {
            "word": "くすくす",
            "meaning": "（忍住）偷偷笑",
            "note": "",
            "exampleHtml": "<ruby>授業中<rt>じゅぎょうちゅう</rt></ruby>に、<ruby>後<rt>うし</rt></ruby>ろの<ruby>席<rt>せき</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>が<b class=\"text-accent\">くすくす</b><ruby>笑<rt>わら</rt></ruby>った。",
            "zh": "上課時，後面座位的人偷偷笑了。",
            "hot": false
          },
          {
            "word": "げらげら",
            "meaning": "（放聲）哈哈大笑",
            "note": "",
            "exampleHtml": "<ruby>友達<rt>ともだち</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<b class=\"text-accent\">げらげら</b><ruby>笑<rt>わら</rt></ruby>った。",
            "zh": "聽了朋友的話，哈哈大笑。",
            "hot": false
          }
        ]
      },
      {
        "title": "哭",
        "compare": "しくしく＝小聲啜泣；わあわあ／えんえん＝放聲大哭",
        "entries": [
          {
            "word": "しくしく",
            "meaning": "（低聲）啜泣",
            "note": "",
            "exampleHtml": "<ruby>子<rt>こ</rt></ruby>どもが<b class=\"text-accent\">しくしく</b><ruby>泣<rt>な</rt></ruby>いている。",
            "zh": "小孩在啜泣。",
            "hot": false
          },
          {
            "word": "わあわあ",
            "meaning": "（放聲）哇哇大哭",
            "note": "",
            "exampleHtml": "<ruby>転<rt>ころ</rt></ruby>んだ<ruby>子<rt>こ</rt></ruby>どもが<b class=\"text-accent\">わあわあ</b><ruby>泣<rt>な</rt></ruby>き<ruby>出<rt>だ</rt></ruby>した。",
            "zh": "跌倒的小孩哇哇大哭起來。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "動作・樣子",
    "hint": "人的動作、移動的樣子",
    "clusters": [
      {
        "title": "快慢",
        "compare": "のろのろ＝動作慢（貶意）；ぐずぐず＝猶豫、拖拖拉拉；のんびり＝悠閒；さっさと＝迅速（不拖延）；てきぱき＝俐落有效率",
        "entries": [
          {
            "word": "のろのろ",
            "meaning": "慢吞吞",
            "note": "動作或車速慢，帶貶意",
            "exampleHtml": "<ruby>前<rt>まえ</rt></ruby>の<ruby>車<rt>くるま</rt></ruby>が<b class=\"text-accent\">のろのろ</b><ruby>走<rt>はし</rt></ruby>っている。",
            "zh": "前面的車慢吞吞地開著。",
            "hot": false
          },
          {
            "word": "ぐずぐず",
            "meaning": "拖拖拉拉、猶豫",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ぐずぐず</b>していると、<ruby>遅刻<rt>ちこく</rt></ruby>するよ。",
            "zh": "再拖拖拉拉就要遲到了。",
            "hot": false
          },
          {
            "word": "のんびり",
            "meaning": "悠閒、無拘無束",
            "note": "好的語感",
            "exampleHtml": "<ruby>休日<rt>きゅうじつ</rt></ruby>は<ruby>家<rt>いえ</rt></ruby>で<b class=\"text-accent\">のんびり</b><ruby>過<rt>す</rt></ruby>ごした。",
            "zh": "假日在家悠閒地度過。",
            "hot": true
          },
          {
            "word": "さっさと",
            "meaning": "（毫不拖延）趕快",
            "note": "常帶催促語氣",
            "exampleHtml": "<b class=\"text-accent\">さっさと</b><ruby>宿題<rt>しゅくだい</rt></ruby>を<ruby>終<rt>お</rt></ruby>わらせなさい。",
            "zh": "趕快把作業寫完。",
            "hot": true
          },
          {
            "word": "てきぱき",
            "meaning": "（做事）俐落、有效率",
            "note": "",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>は<ruby>仕事<rt>しごと</rt></ruby>を<b class=\"text-accent\">てきぱき</b>こなす。",
            "zh": "她做事很俐落。",
            "hot": false
          }
        ]
      },
      {
        "title": "看・找・徘徊",
        "compare": "じろじろ＝盯著看（失禮）；ちらちら＝偷偷瞄；きょろきょろ＝東張西望；ぶらぶら＝閒逛；うろうろ＝漫無目的地徘徊",
        "entries": [
          {
            "word": "じろじろ",
            "meaning": "（毫不客氣地）盯著看",
            "note": "失禮",
            "exampleHtml": "<ruby>知<rt>し</rt></ruby>らない<ruby>人<rt>ひと</rt></ruby>に<b class=\"text-accent\">じろじろ</b><ruby>見<rt>み</rt></ruby>られた。",
            "zh": "被不認識的人盯著看。",
            "hot": true
          },
          {
            "word": "ちらちら",
            "meaning": "（偷偷地）瞄、一閃一閃",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>時計<rt>とけい</rt></ruby>を<b class=\"text-accent\">ちらちら</b><ruby>見<rt>み</rt></ruby>ている。",
            "zh": "他一直偷瞄著時鐘。",
            "hot": false
          },
          {
            "word": "きょろきょろ",
            "meaning": "東張西望",
            "note": "",
            "exampleHtml": "<ruby>道<rt>みち</rt></ruby>に<ruby>迷<rt>まよ</rt></ruby>って、<b class=\"text-accent\">きょろきょろ</b>していた。",
            "zh": "迷路了，在東張西望。",
            "hot": false
          },
          {
            "word": "ぶらぶら",
            "meaning": "（沒目的地）閒晃、晃來晃去",
            "note": "",
            "exampleHtml": "<ruby>駅前<rt>えきまえ</rt></ruby>を<b class=\"text-accent\">ぶらぶら</b><ruby>歩<rt>ある</rt></ruby>いた。",
            "zh": "在車站前閒逛。",
            "hot": false
          },
          {
            "word": "うろうろ",
            "meaning": "（來回）徘徊",
            "note": "常帶可疑或迷茫的感覺",
            "exampleHtml": "<ruby>店<rt>みせ</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>を<ruby>男<rt>おとこ</rt></ruby>が<b class=\"text-accent\">うろうろ</b>している。",
            "zh": "有個男人在店前徘徊。",
            "hot": true
          }
        ]
      },
      {
        "title": "其他動作",
        "compare": "こそこそ＝偷偷摸摸；ぞろぞろ＝一個接一個；そわそわ＝坐立不安；うっかり＝不小心",
        "entries": [
          {
            "word": "こそこそ",
            "meaning": "偷偷摸摸（避人耳目）",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<b class=\"text-accent\">こそこそ</b><ruby>部屋<rt>へや</rt></ruby>を<ruby>出<rt>で</rt></ruby>ていった。",
            "zh": "他偷偷摸摸地離開了房間。",
            "hot": true
          },
          {
            "word": "ぞろぞろ",
            "meaning": "（人或東西）陸陸續續",
            "note": "",
            "exampleHtml": "<ruby>映画<rt>えいが</rt></ruby>が<ruby>終<rt>お</rt></ruby>わって、<ruby>客<rt>きゃく</rt></ruby>が<b class=\"text-accent\">ぞろぞろ</b><ruby>出<rt>で</rt></ruby>てきた。",
            "zh": "電影結束，觀眾一個接一個走了出來。",
            "hot": true
          },
          {
            "word": "そわそわ",
            "meaning": "坐立不安、心神不寧",
            "note": "",
            "exampleHtml": "<ruby>試験<rt>しけん</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>は、<b class=\"text-accent\">そわそわ</b>して<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>かない。",
            "zh": "考試前心神不寧，靜不下來。",
            "hot": false
          },
          {
            "word": "うっかり",
            "meaning": "不小心、一時疏忽",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">うっかり</b><ruby>財布<rt>さいふ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れてしまった。",
            "zh": "一不小心把錢包忘了。",
            "hot": true
          }
        ]
      },
      {
        "title": "睡眠・發呆",
        "compare": "ぐっすり＝熟睡；うとうと＝打瞌睡、迷迷糊糊；すやすや＝（嬰兒）安穩地睡；ぼうっと＝發呆、模糊",
        "entries": [
          {
            "word": "ぐっすり",
            "meaning": "睡得很熟",
            "note": "",
            "exampleHtml": "<ruby>昨夜<rt>ゆうべ</rt></ruby>は<b class=\"text-accent\">ぐっすり</b><ruby>眠<rt>ねむ</rt></ruby>れた。",
            "zh": "昨晚睡得很熟。",
            "hot": true
          },
          {
            "word": "うとうと",
            "meaning": "打瞌睡、半睡半醒",
            "note": "",
            "exampleHtml": "<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<b class=\"text-accent\">うとうと</b>してしまった。",
            "zh": "在電車裡不知不覺打起瞌睡。",
            "hot": false
          },
          {
            "word": "すやすや",
            "meaning": "（安穩地）睡得香甜",
            "note": "多用於嬰兒",
            "exampleHtml": "<ruby>赤<rt>あか</rt></ruby>ちゃんが<b class=\"text-accent\">すやすや</b><ruby>眠<rt>ねむ</rt></ruby>っている。",
            "zh": "嬰兒睡得香香甜甜。",
            "hot": false
          },
          {
            "word": "ぼうっと",
            "meaning": "發呆、模糊",
            "note": "也寫 ぼうっと／ぼんやり",
            "exampleHtml": "<ruby>疲<rt>つか</rt></ruby>れて、<b class=\"text-accent\">ぼうっと</b>していた。",
            "zh": "累得在發呆。",
            "hot": false
          }
        ]
      },
      {
        "title": "突然・偶然",
        "compare": "ばったり＝偶然遇見、突然倒下；どっと＝一下子湧來；ぞっと＝毛骨悚然；ぎょっと＝嚇一跳；どきっと＝心頭一驚",
        "entries": [
          {
            "word": "ばったり",
            "meaning": "（偶然）碰見；（突然）倒下",
            "note": "",
            "exampleHtml": "<ruby>駅<rt>えき</rt></ruby>で<ruby>友達<rt>ともだち</rt></ruby>に<b class=\"text-accent\">ばったり</b><ruby>会<rt>あ</rt></ruby>った。",
            "zh": "在車站偶然碰到了朋友。",
            "hot": false
          },
          {
            "word": "どっと",
            "meaning": "（人、笑聲）一下子湧上來",
            "note": "",
            "exampleHtml": "<ruby>客<rt>きゃく</rt></ruby>が<b class=\"text-accent\">どっと</b><ruby>入<rt>はい</rt></ruby>ってきた。",
            "zh": "客人一下子湧了進來。",
            "hot": false
          },
          {
            "word": "ぞっと",
            "meaning": "（害怕）毛骨悚然",
            "note": "",
            "exampleHtml": "その<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<b class=\"text-accent\">ぞっと</b>した。",
            "zh": "聽到那件事，毛骨悚然。",
            "hot": false
          },
          {
            "word": "ぎょっと",
            "meaning": "（被嚇到）嚇了一跳",
            "note": "",
            "exampleHtml": "<ruby>暗<rt>くら</rt></ruby>い<ruby>道<rt>みち</rt></ruby>で<ruby>人<rt>ひと</rt></ruby>に<ruby>会<rt>あ</rt></ruby>って、<b class=\"text-accent\">ぎょっと</b>した。",
            "zh": "在暗路上遇到人，嚇了一跳。",
            "hot": false
          },
          {
            "word": "どきっと",
            "meaning": "（突然）心頭一震",
            "note": "",
            "exampleHtml": "<ruby>名前<rt>なまえ</rt></ruby>を<ruby>呼<rt>よ</rt></ruby>ばれて、<b class=\"text-accent\">どきっと</b>した。",
            "zh": "被叫到名字，心頭一驚。",
            "hot": false
          }
        ]
      },
      {
        "title": "忙亂・不順暢",
        "compare": "ばたばた＝忙得團團轉、腳步聲；もたもた＝動作遲緩；ぎくしゃく＝關係或動作不順暢；ちやほや＝過度寵愛吹捧",
        "entries": [
          {
            "word": "ばたばた",
            "meaning": "（忙亂）手忙腳亂；（腳步）噠噠",
            "note": "",
            "exampleHtml": "<ruby>朝<rt>あさ</rt></ruby>はいつも<b class=\"text-accent\">ばたばた</b>している。",
            "zh": "早上總是手忙腳亂。",
            "hot": false
          },
          {
            "word": "もたもた",
            "meaning": "動作遲緩、不俐落",
            "note": "比 のろのろ 更偏「笨手笨腳」",
            "exampleHtml": "<b class=\"text-accent\">もたもた</b>していると、<ruby>置<rt>お</rt></ruby>いていくよ。",
            "zh": "再慢吞吞，我就丟下你了。",
            "hot": false
          },
          {
            "word": "ぎくしゃく",
            "meaning": "（關係、動作）不順暢、僵硬",
            "note": "",
            "exampleHtml": "けんかのあと、<ruby>二人<rt>ふたり</rt></ruby>の<ruby>関係<rt>かんけい</rt></ruby>が<b class=\"text-accent\">ぎくしゃく</b>している。",
            "zh": "吵架之後，兩個人的關係變得不自然。",
            "hot": false
          },
          {
            "word": "ちやほや",
            "meaning": "（過度）寵愛、奉承",
            "note": "",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>はみんなに<b class=\"text-accent\">ちやほや</b>されている。",
            "zh": "她被大家捧在手心。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "身體感覺・情緒",
    "hint": "疼痛、疲累、冷熱、心情等「身體或心裡的感受」",
    "clusters": [
      {
        "title": "疼痛",
        "compare": "ずきずき＝陣陣抽痛；ちくちく＝針扎般刺痛；ひりひり＝灼熱辣痛；がんがん＝頭劇痛、聲音刺耳",
        "entries": [
          {
            "word": "ずきずき",
            "meaning": "（傷口、牙齒）陣陣抽痛",
            "note": "",
            "exampleHtml": "<ruby>虫歯<rt>むしば</rt></ruby>が<b class=\"text-accent\">ずきずき</b><ruby>痛<rt>いた</rt></ruby>む。",
            "zh": "蛀牙一陣一陣地抽痛。",
            "hot": true
          },
          {
            "word": "ちくちく",
            "meaning": "（針扎）刺刺的",
            "note": "",
            "exampleHtml": "セーターが<b class=\"text-accent\">ちくちく</b>して、<ruby>着<rt>き</rt></ruby>られない。",
            "zh": "毛衣刺刺的，沒辦法穿。",
            "hot": false
          },
          {
            "word": "ひりひり",
            "meaning": "（曬傷、辣）灼熱地痛",
            "note": "",
            "exampleHtml": "<ruby>日<rt>ひ</rt></ruby>に<ruby>焼<rt>や</rt></ruby>けて、<ruby>背中<rt>せなか</rt></ruby>が<b class=\"text-accent\">ひりひり</b>する。",
            "zh": "曬傷了，背部熱辣辣地痛。",
            "hot": false
          },
          {
            "word": "がんがん",
            "meaning": "（頭）劇痛；（聲音）震耳欲聾",
            "note": "",
            "exampleHtml": "<ruby>頭<rt>あたま</rt></ruby>が<b class=\"text-accent\">がんがん</b>する。",
            "zh": "頭痛得很厲害。",
            "hot": false
          }
        ]
      },
      {
        "title": "疲累・無力",
        "compare": "くたくた＝累得渾身無力；へとへと＝精疲力盡；ぐったり＝癱軟無力；ふらふら＝頭暈站不穩",
        "entries": [
          {
            "word": "くたくた",
            "meaning": "累得全身無力；（衣物）穿舊變軟",
            "note": "",
            "exampleHtml": "<ruby>一日中<rt>いちにちじゅう</rt></ruby><ruby>歩<rt>ある</rt></ruby>いて、<b class=\"text-accent\">くたくた</b>だ。",
            "zh": "走了一整天，累癱了。",
            "hot": true
          },
          {
            "word": "へとへと",
            "meaning": "精疲力盡",
            "note": "比 くたくた 更到極限",
            "exampleHtml": "<ruby>残業<rt>ざんぎょう</rt></ruby>で、<b class=\"text-accent\">へとへと</b>になった。",
            "zh": "加班加到筋疲力盡。",
            "hot": false
          },
          {
            "word": "ぐったり",
            "meaning": "（身體）軟趴趴、無力",
            "note": "",
            "exampleHtml": "<ruby>暑<rt>あつ</rt></ruby>さで、<ruby>犬<rt>いぬ</rt></ruby>が<b class=\"text-accent\">ぐったり</b>している。",
            "zh": "天氣太熱，狗軟趴趴的。",
            "hot": true
          },
          {
            "word": "ふらふら",
            "meaning": "頭暈站不穩、搖搖晃晃",
            "note": "",
            "exampleHtml": "<ruby>熱<rt>ねつ</rt></ruby>があって、<b class=\"text-accent\">ふらふら</b>する。",
            "zh": "發燒了，頭昏昏沉沉。",
            "hot": true
          }
        ]
      },
      {
        "title": "肚子・口渴・冷熱",
        "compare": "ぺこぺこ＝肚子餓；からから＝口渴、乾燥；ぽかぽか＝暖洋洋；ぞくぞく＝發冷發抖",
        "entries": [
          {
            "word": "ぺこぺこ",
            "meaning": "（肚子）餓扁了",
            "note": "",
            "exampleHtml": "<ruby>朝<rt>あさ</rt></ruby>から<ruby>何<rt>なに</rt></ruby>も<ruby>食<rt>た</rt></ruby>べていないので、おなかが<b class=\"text-accent\">ぺこぺこ</b>だ。",
            "zh": "從早上就什麼都沒吃，肚子餓扁了。",
            "hot": true
          },
          {
            "word": "からから",
            "meaning": "（喉嚨）乾渴、乾透了",
            "note": "",
            "exampleHtml": "<ruby>喉<rt>のど</rt></ruby>が<b class=\"text-accent\">からから</b>だ。",
            "zh": "喉嚨渴得要命。",
            "hot": false
          },
          {
            "word": "ぽかぽか",
            "meaning": "暖洋洋、暖呼呼",
            "note": "",
            "exampleHtml": "<ruby>春<rt>はる</rt></ruby>は<ruby>日<rt>ひ</rt></ruby>ざしが<b class=\"text-accent\">ぽかぽか</b>して<ruby>気持<rt>きも</rt></ruby>ちいい。",
            "zh": "春天的陽光暖洋洋的很舒服。",
            "hot": false
          },
          {
            "word": "ぞくぞく",
            "meaning": "（發冷）打寒顫；（興奮）發抖",
            "note": "",
            "exampleHtml": "<ruby>風邪<rt>かぜ</rt></ruby>をひいたのか、<b class=\"text-accent\">ぞくぞく</b>する。",
            "zh": "好像感冒了，發冷起雞皮疙瘩。",
            "hot": false
          }
        ]
      },
      {
        "title": "心情",
        "compare": "どきどき＝心跳加速；わくわく＝興奮期待；はらはら＝提心吊膽；いらいら＝煩躁；むかむか＝噁心、怒氣上湧；ほっと＝鬆了一口氣；すっきり＝心情或身體清爽",
        "entries": [
          {
            "word": "どきどき",
            "meaning": "（緊張、期待）心跳加速",
            "note": "",
            "exampleHtml": "<ruby>面接<rt>めんせつ</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>で、<b class=\"text-accent\">どきどき</b>している。",
            "zh": "面試前心臟怦怦跳。",
            "hot": true
          },
          {
            "word": "わくわく",
            "meaning": "（期待）興奮雀躍",
            "note": "正面期待",
            "exampleHtml": "<ruby>明日<rt>あした</rt></ruby>の<ruby>旅行<rt>りょこう</rt></ruby>が、<b class=\"text-accent\">わくわく</b>して<ruby>眠<rt>ねむ</rt></ruby>れない。",
            "zh": "期待明天的旅行，興奮得睡不著。",
            "hot": false
          },
          {
            "word": "はらはら",
            "meaning": "（擔心）提心吊膽",
            "note": "",
            "exampleHtml": "<ruby>子<rt>こ</rt></ruby>どもが<ruby>木<rt>き</rt></ruby>に<ruby>登<rt>のぼ</rt></ruby>るのを、<b class=\"text-accent\">はらはら</b>しながら<ruby>見<rt>み</rt></ruby>ていた。",
            "zh": "提心吊膽地看著孩子爬樹。",
            "hot": false
          },
          {
            "word": "いらいら",
            "meaning": "焦躁、煩躁",
            "note": "",
            "exampleHtml": "<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れて、<b class=\"text-accent\">いらいら</b>した。",
            "zh": "電車誤點，心情煩躁。",
            "hot": false
          },
          {
            "word": "むかむか",
            "meaning": "（胃）想吐；（怒氣）冒火",
            "note": "",
            "exampleHtml": "<ruby>食<rt>た</rt></ruby>べ<ruby>過<rt>す</rt></ruby>ぎて、<ruby>胃<rt>い</rt></ruby>が<b class=\"text-accent\">むかむか</b>する。",
            "zh": "吃太多，胃裡噁心想吐。",
            "hot": false
          },
          {
            "word": "ほっと",
            "meaning": "鬆了一口氣、放心",
            "note": "",
            "exampleHtml": "<ruby>合格<rt>ごうかく</rt></ruby>を<ruby>知<rt>し</rt></ruby>って、<b class=\"text-accent\">ほっと</b>した。",
            "zh": "得知考上，鬆了一口氣。",
            "hot": true
          },
          {
            "word": "すっきり",
            "meaning": "（身心）清爽、暢快",
            "note": "",
            "exampleHtml": "<ruby>掃除<rt>そうじ</rt></ruby>をして、<ruby>気分<rt>きぶん</rt></ruby>が<b class=\"text-accent\">すっきり</b>した。",
            "zh": "打掃完，心情很暢快。",
            "hot": true
          }
        ]
      },
      {
        "title": "其他情緒・感受",
        "compare": "がっかり＝失望；くよくよ＝鬱鬱不樂；ぴりぴり＝神經緊繃；かっと＝突然發怒；うっとり＝陶醉；しみじみ＝深深地感受",
        "entries": [
          {
            "word": "がっかり",
            "meaning": "失望、沮喪",
            "note": "",
            "exampleHtml": "<ruby>試合<rt>しあい</rt></ruby>に<ruby>負<rt>ま</rt></ruby>けて、<b class=\"text-accent\">がっかり</b>した。",
            "zh": "比賽輸了，很失望。",
            "hot": false
          },
          {
            "word": "くよくよ",
            "meaning": "（為小事）鬱鬱不樂",
            "note": "",
            "exampleHtml": "<ruby>過<rt>す</rt></ruby>ぎたことを<b class=\"text-accent\">くよくよ</b><ruby>考<rt>かんが</rt></ruby>えても<ruby>仕方<rt>しかた</rt></ruby>がない。",
            "zh": "為過去的事煩惱也沒用。",
            "hot": false
          },
          {
            "word": "ぴりぴり",
            "meaning": "神經緊繃；（辣）火辣",
            "note": "",
            "exampleHtml": "<ruby>試験<rt>しけん</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>は、みんな<b class=\"text-accent\">ぴりぴり</b>している。",
            "zh": "考試前大家都很緊張。",
            "hot": false
          },
          {
            "word": "かっと",
            "meaning": "（突然）發怒、發熱",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>に<b class=\"text-accent\">かっと</b>なった。",
            "zh": "因為他的話，一下子火了。",
            "hot": false
          },
          {
            "word": "うっとり",
            "meaning": "（被吸引而）陶醉",
            "note": "",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>は<ruby>音楽<rt>おんがく</rt></ruby>に<b class=\"text-accent\">うっとり</b><ruby>聞<rt>き</rt></ruby>き<ruby>入<rt>い</rt></ruby>った。",
            "zh": "她陶醉地聽著音樂。",
            "hot": false
          },
          {
            "word": "しみじみ",
            "meaning": "深切地（感受）",
            "note": "",
            "exampleHtml": "<ruby>親<rt>おや</rt></ruby>のありがたさを<b class=\"text-accent\">しみじみ</b><ruby>感<rt>かん</rt></ruby>じた。",
            "zh": "深深體會到父母的恩情。",
            "hot": false
          },
          {
            "word": "ひんやり",
            "meaning": "涼颼颼、冰涼",
            "note": "舒適的涼",
            "exampleHtml": "<ruby>床<rt>ゆか</rt></ruby>が<b class=\"text-accent\">ひんやり</b>して<ruby>気持<rt>きも</rt></ruby>ちいい。",
            "zh": "地板涼涼的很舒服。",
            "hot": false
          },
          {
            "word": "じりじり",
            "meaning": "（太陽）灼熱炙烤；（心情）焦急、一步步逼近",
            "note": "",
            "exampleHtml": "<ruby>夏<rt>なつ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>ざしが<b class=\"text-accent\">じりじり</b><ruby>照<rt>て</rt></ruby>りつける。",
            "zh": "夏天的陽光火辣辣地曬著。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "事物的質感・狀態",
    "hint": "東西的觸感、外觀、數量、狀態",
    "clusters": [
      {
        "title": "光亮・外觀",
        "compare": "ぴかぴか＝擦得發亮；きらきら＝閃閃發光；ぼんやり＝模糊不清；くっきり＝輪廓清晰",
        "entries": [
          {
            "word": "ぴかぴか",
            "meaning": "閃亮、擦得很乾淨",
            "note": "",
            "exampleHtml": "<ruby>靴<rt>くつ</rt></ruby>を<b class=\"text-accent\">ぴかぴか</b>に<ruby>磨<rt>みが</rt></ruby>いた。",
            "zh": "把鞋擦得亮晶晶。",
            "hot": false
          },
          {
            "word": "きらきら",
            "meaning": "（光）閃閃發亮",
            "note": "",
            "exampleHtml": "<ruby>星<rt>ほし</rt></ruby>が<b class=\"text-accent\">きらきら</b><ruby>光<rt>ひか</rt></ruby>っている。",
            "zh": "星星閃閃發亮。",
            "hot": false
          },
          {
            "word": "ぼんやり",
            "meaning": "模糊；發呆",
            "note": "",
            "exampleHtml": "<ruby>山<rt>やま</rt></ruby>が<b class=\"text-accent\">ぼんやり</b><ruby>見<rt>み</rt></ruby>える。",
            "zh": "山模模糊糊地看得見。",
            "hot": false
          },
          {
            "word": "くっきり",
            "meaning": "（輪廓）清清楚楚",
            "note": "",
            "exampleHtml": "<ruby>富士山<rt>ふじさん</rt></ruby>が<b class=\"text-accent\">くっきり</b><ruby>見<rt>み</rt></ruby>えた。",
            "zh": "富士山清清楚楚地看得見。",
            "hot": false
          }
        ]
      },
      {
        "title": "觸感",
        "compare": "つるつる＝光滑；ざらざら＝粗糙；さらさら＝乾爽滑順；べたべた＝黏答答；ふわふわ＝輕軟蓬鬆；ぬるぬる＝滑溜溜；かさかさ＝乾燥粗糙",
        "entries": [
          {
            "word": "つるつる",
            "meaning": "（表面）光滑",
            "note": "",
            "exampleHtml": "<ruby>氷<rt>こおり</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>は<b class=\"text-accent\">つるつる</b>して<ruby>滑<rt>すべ</rt></ruby>りやすい。",
            "zh": "冰面很光滑，容易滑倒。",
            "hot": false
          },
          {
            "word": "ざらざら",
            "meaning": "（表面）粗糙、有顆粒感",
            "note": "",
            "exampleHtml": "<ruby>砂<rt>すな</rt></ruby>で、<ruby>手<rt>て</rt></ruby>が<b class=\"text-accent\">ざらざら</b>する。",
            "zh": "因為沙子，手摸起來粗粗的。",
            "hot": false
          },
          {
            "word": "さらさら",
            "meaning": "（頭髮、沙）乾爽滑順",
            "note": "",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>の<ruby>髪<rt>かみ</rt></ruby>は<b class=\"text-accent\">さらさら</b>だ。",
            "zh": "她的頭髮很滑順。",
            "hot": false
          },
          {
            "word": "べたべた",
            "meaning": "（手、皮膚）黏答答",
            "note": "",
            "exampleHtml": "<ruby>汗<rt>あせ</rt></ruby>で<ruby>体<rt>からだ</rt></ruby>が<b class=\"text-accent\">べたべた</b>する。",
            "zh": "因為流汗，身體黏答答的。",
            "hot": true
          },
          {
            "word": "ふわふわ",
            "meaning": "（輕柔蓬鬆）軟綿綿",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ふわふわ</b>のパンケーキが<ruby>食<rt>た</rt></ruby>べたい。",
            "zh": "好想吃軟綿綿的鬆餅。",
            "hot": false
          },
          {
            "word": "ぬるぬる",
            "meaning": "滑溜溜、黏滑",
            "note": "",
            "exampleHtml": "<ruby>魚<rt>さかな</rt></ruby>は<ruby>手<rt>て</rt></ruby>が<b class=\"text-accent\">ぬるぬる</b>して、<ruby>持<rt>も</rt></ruby>ちにくい。",
            "zh": "魚摸起來滑溜溜的，很難拿。",
            "hot": false
          },
          {
            "word": "かさかさ",
            "meaning": "（皮膚）乾燥粗糙；（落葉）沙沙作響",
            "note": "",
            "exampleHtml": "<ruby>冬<rt>ふゆ</rt></ruby>は<ruby>肌<rt>はだ</rt></ruby>が<b class=\"text-accent\">かさかさ</b>になる。",
            "zh": "冬天皮膚會變得乾巴巴的。",
            "hot": true
          }
        ]
      },
      {
        "title": "濕度",
        "compare": "びっしょり＝濕透；じめじめ＝潮濕悶熱；しっとり＝濕潤柔潤",
        "entries": [
          {
            "word": "びっしょり",
            "meaning": "全身濕透",
            "note": "",
            "exampleHtml": "<ruby>雨<rt>あめ</rt></ruby>で<ruby>服<rt>ふく</rt></ruby>が<b class=\"text-accent\">びっしょり</b>になった。",
            "zh": "衣服被雨淋得濕透。",
            "hot": true
          },
          {
            "word": "じめじめ",
            "meaning": "（天氣、場所）潮濕悶熱",
            "note": "不舒服的潮濕",
            "exampleHtml": "<ruby>梅雨<rt>つゆ</rt></ruby>は<b class=\"text-accent\">じめじめ</b>して<ruby>嫌<rt>いや</rt></ruby>だ。",
            "zh": "梅雨季節又濕又悶，真討厭。",
            "hot": true
          },
          {
            "word": "しっとり",
            "meaning": "（適度）濕潤、柔潤",
            "note": "好的語感",
            "exampleHtml": "<b class=\"text-accent\">しっとり</b>した<ruby>肌<rt>はだ</rt></ruby>になるクリームだ。",
            "zh": "這是能讓皮膚變得柔潤的乳霜。",
            "hot": false
          }
        ]
      },
      {
        "title": "數量・程度",
        "compare": "ぎっしり＝塞得滿滿的；たっぷり＝充足；ばらばら＝分散、零散；ぴったり＝剛好；ぶかぶか＝太大不合身",
        "entries": [
          {
            "word": "ぎっしり",
            "meaning": "（東西）塞得滿滿",
            "note": "常搭配「詰まる」「並ぶ」",
            "exampleHtml": "かばんに<ruby>本<rt>ほん</rt></ruby>が<b class=\"text-accent\">ぎっしり</b><ruby>詰<rt>つ</rt></ruby>まっている。",
            "zh": "包包裡塞滿了書。",
            "hot": true
          },
          {
            "word": "たっぷり",
            "meaning": "充分、滿滿",
            "note": "時間、量都可以",
            "exampleHtml": "<ruby>時間<rt>じかん</rt></ruby>は<b class=\"text-accent\">たっぷり</b>ある。",
            "zh": "時間很充裕。",
            "hot": true
          },
          {
            "word": "ばらばら",
            "meaning": "分散、零零散散；各自不同",
            "note": "",
            "exampleHtml": "<ruby>家族<rt>かぞく</rt></ruby>が<ruby>別々<rt>べつべつ</rt></ruby>に<ruby>住<rt>す</rt></ruby>んで、<b class=\"text-accent\">ばらばら</b>になった。",
            "zh": "一家人分開住，四散各地了。",
            "hot": true
          },
          {
            "word": "ぴったり",
            "meaning": "剛好、完全吻合",
            "note": "也可指衣服剛好合身",
            "exampleHtml": "この<ruby>靴<rt>くつ</rt></ruby>は<ruby>足<rt>あし</rt></ruby>に<b class=\"text-accent\">ぴったり</b>だ。",
            "zh": "這雙鞋剛好合腳。",
            "hot": true
          },
          {
            "word": "ぶかぶか",
            "meaning": "（衣服、鞋子）太大不合身",
            "note": "",
            "exampleHtml": "このコートは<ruby>大<rt>おお</rt></ruby>きくて、<b class=\"text-accent\">ぶかぶか</b>だ。",
            "zh": "這件大衣太大，穿起來鬆垮垮的。",
            "hot": true
          },
          {
            "word": "ごちゃごちゃ",
            "meaning": "雜亂、亂七八糟",
            "note": "",
            "exampleHtml": "<ruby>部屋<rt>へや</rt></ruby>が<b class=\"text-accent\">ごちゃごちゃ</b>している。",
            "zh": "房間亂七八糟。",
            "hot": true
          },
          {
            "word": "ぼろぼろ",
            "meaning": "破破爛爛；（東西）掉落",
            "note": "",
            "exampleHtml": "この<ruby>本<rt>ほん</rt></ruby>は<b class=\"text-accent\">ぼろぼろ</b>だ。",
            "zh": "這本書破爛不堪。",
            "hot": false
          }
        ]
      },
      {
        "title": "搖晃・流暢",
        "compare": "ぐらぐら＝搖搖欲墜；ゆらゆら＝輕輕搖晃；すらすら＝流暢順利",
        "entries": [
          {
            "word": "ぐらぐら",
            "meaning": "搖搖晃晃、不穩",
            "note": "地震、牙齒、桌子",
            "exampleHtml": "この<ruby>机<rt>つくえ</rt></ruby>は<b class=\"text-accent\">ぐらぐら</b>する。",
            "zh": "這張桌子搖搖晃晃的。",
            "hot": false
          },
          {
            "word": "ゆらゆら",
            "meaning": "（緩慢）輕輕搖晃",
            "note": "",
            "exampleHtml": "<ruby>船<rt>ふね</rt></ruby>が<b class=\"text-accent\">ゆらゆら</b><ruby>揺<rt>ゆ</rt></ruby>れている。",
            "zh": "船輕輕地搖晃著。",
            "hot": false
          },
          {
            "word": "すらすら",
            "meaning": "流暢、順利",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>難<rt>むずか</rt></ruby>しい<ruby>文章<rt>ぶんしょう</rt></ruby>を<b class=\"text-accent\">すらすら</b><ruby>読<rt>よ</rt></ruby>む。",
            "zh": "他很流暢地讀著難懂的文章。",
            "hot": false
          }
        ]
      },
      {
        "title": "外型・口感・熱度",
        "compare": "ふんわり＝輕軟；ふさふさ＝毛茸茸；どろどろ＝黏稠、泥濘；ぱさぱさ＝乾巴巴；ねばねば＝黏糊糊；ほかほか＝熱騰騰",
        "entries": [
          {
            "word": "ふんわり",
            "meaning": "輕軟、蓬鬆地",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ふんわり</b>したセーターを<ruby>着<rt>き</rt></ruby>ている。",
            "zh": "穿著輕軟的毛衣。",
            "hot": false
          },
          {
            "word": "ふさふさ",
            "meaning": "（毛髮）濃密、毛茸茸",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>の<ruby>髪<rt>かみ</rt></ruby>は<b class=\"text-accent\">ふさふさ</b>している。",
            "zh": "他的頭髮濃密茂盛。",
            "hot": false
          },
          {
            "word": "どろどろ",
            "meaning": "（液體）黏稠；（泥）泥濘",
            "note": "",
            "exampleHtml": "<ruby>雨<rt>あめ</rt></ruby>で<ruby>道<rt>みち</rt></ruby>が<b class=\"text-accent\">どろどろ</b>になった。",
            "zh": "下雨讓路變得泥濘不堪。",
            "hot": false
          },
          {
            "word": "ぱさぱさ",
            "meaning": "乾巴巴、沒水分",
            "note": "",
            "exampleHtml": "このパンは<b class=\"text-accent\">ぱさぱさ</b>している。",
            "zh": "這個麵包乾巴巴的。",
            "hot": false
          },
          {
            "word": "ねばねば",
            "meaning": "黏糊糊、黏稠",
            "note": "",
            "exampleHtml": "<ruby>納豆<rt>なっとう</rt></ruby>は<b class=\"text-accent\">ねばねば</b>している。",
            "zh": "納豆黏糊糊的。",
            "hot": false
          },
          {
            "word": "ほかほか",
            "meaning": "熱騰騰",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ほかほか</b>のご<ruby>飯<rt>はん</rt></ruby>が<ruby>食<rt>た</rt></ruby>べたい。",
            "zh": "好想吃熱騰騰的白飯。",
            "hot": false
          }
        ]
      },
      {
        "title": "體型・衣服・分量感",
        "compare": "だぶだぶ＝衣服太寬大；どっしり＝沉甸甸、穩重；がっしり＝結實；すらっと＝修長；ぽっちゃり＝微胖圓潤；ほっそり＝纖細；がらがら＝空蕩蕩",
        "entries": [
          {
            "word": "だぶだぶ",
            "meaning": "（衣服）寬鬆肥大",
            "note": "比 ぶかぶか 更偏「鬆垮垮」",
            "exampleHtml": "<b class=\"text-accent\">だぶだぶ</b>のズボンをはいている。",
            "zh": "穿著寬鬆肥大的褲子。",
            "hot": false
          },
          {
            "word": "どっしり",
            "meaning": "沉甸甸；沉穩厚重",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">どっしり</b>した<ruby>木<rt>き</rt></ruby>の<ruby>机<rt>つくえ</rt></ruby>を<ruby>買<rt>か</rt></ruby>った。",
            "zh": "買了一張厚重的木桌。",
            "hot": false
          },
          {
            "word": "がっしり",
            "meaning": "（體格）結實",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<b class=\"text-accent\">がっしり</b>した<ruby>体格<rt>たいかく</rt></ruby>をしている。",
            "zh": "他體格結實。",
            "hot": false
          },
          {
            "word": "すらっと",
            "meaning": "（身材）修長挺拔",
            "note": "",
            "exampleHtml": "<ruby>彼女<rt>かのじょ</rt></ruby>は<b class=\"text-accent\">すらっと</b>していて、モデルのようだ。",
            "zh": "她身材修長，像模特兒一樣。",
            "hot": false
          },
          {
            "word": "ぽっちゃり",
            "meaning": "微胖、圓潤",
            "note": "好的語感",
            "exampleHtml": "<b class=\"text-accent\">ぽっちゃり</b>した<ruby>赤<rt>あか</rt></ruby>ちゃんがかわいい。",
            "zh": "圓嘟嘟的嬰兒很可愛。",
            "hot": false
          },
          {
            "word": "ほっそり",
            "meaning": "纖細、苗條",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ほっそり</b>した<ruby>指<rt>ゆび</rt></ruby>をしている。",
            "zh": "有一雙纖細的手指。",
            "hot": false
          },
          {
            "word": "がらがら",
            "meaning": "（場所）空蕩蕩；（聲音）沙啞、碰撞聲",
            "note": "",
            "exampleHtml": "<ruby>平日<rt>へいじつ</rt></ruby>の<ruby>映画館<rt>えいがかん</rt></ruby>は<b class=\"text-accent\">がらがら</b>だった。",
            "zh": "平日的電影院空蕩蕩的。",
            "hot": false
          }
        ]
      },
      {
        "title": "光與完全相似",
        "compare": "ちかちか＝眼睛刺痛、閃爍；そっくり＝一模一樣；さっぱり＝清爽、完全（不〜）；ぐるぐる＝轉圈",
        "entries": [
          {
            "word": "ちかちか",
            "meaning": "（光）閃爍刺眼",
            "note": "",
            "exampleHtml": "<ruby>画面<rt>がめん</rt></ruby>が<b class=\"text-accent\">ちかちか</b>して、<ruby>目<rt>め</rt></ruby>が<ruby>疲<rt>つか</rt></ruby>れた。",
            "zh": "螢幕閃閃爍爍，眼睛很累。",
            "hot": false
          },
          {
            "word": "そっくり",
            "meaning": "一模一樣；全部",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>父親<rt>ちちおや</rt></ruby>に<b class=\"text-accent\">そっくり</b>だ。",
            "zh": "他跟父親長得一模一樣。",
            "hot": false
          },
          {
            "word": "さっぱり",
            "meaning": "清爽；（後接否定）完全〜不",
            "note": "",
            "exampleHtml": "シャワーを<ruby>浴<rt>あ</rt></ruby>びて、<b class=\"text-accent\">さっぱり</b>した。",
            "zh": "沖了澡，覺得很清爽。",
            "hot": false
          },
          {
            "word": "ぐるぐる",
            "meaning": "轉圈圈、一圈又一圈",
            "note": "",
            "exampleHtml": "<ruby>目<rt>め</rt></ruby>が<ruby>回<rt>まわ</rt></ruby>って、<ruby>部屋<rt>へや</rt></ruby>が<b class=\"text-accent\">ぐるぐる</b><ruby>回<rt>まわ</rt></ruby>っている。",
            "zh": "頭暈目眩，房間在轉。",
            "hot": false
          }
        ]
      }
    ]
  },
  {
    "label": "時間・程度的擬態副詞",
    "hint": "表示時間快慢、逐步變化、頻率的副詞",
    "clusters": [
      {
        "title": "逐漸・迅速",
        "compare": "だんだん＝逐漸（自然變化）；どんどん＝越來越快、接連不斷；ますます＝更加；ぐんぐん＝迅速地成長",
        "entries": [
          {
            "word": "だんだん",
            "meaning": "漸漸地",
            "note": "緩慢而自然的變化",
            "exampleHtml": "<b class=\"text-accent\">だんだん</b><ruby>暖<rt>あたた</rt></ruby>かくなってきた。",
            "zh": "天氣漸漸暖和起來了。",
            "hot": false
          },
          {
            "word": "ますます",
            "meaning": "更加、越發",
            "note": "",
            "exampleHtml": "<ruby>雨<rt>あめ</rt></ruby>は<b class=\"text-accent\">ますます</b><ruby>強<rt>つよ</rt></ruby>くなった。",
            "zh": "雨變得更大了。",
            "hot": false
          },
          {
            "word": "ぐんぐん",
            "meaning": "（成長、上升）迅速、一下子",
            "note": "",
            "exampleHtml": "<ruby>子<rt>こ</rt></ruby>どもは<b class=\"text-accent\">ぐんぐん</b><ruby>背<rt>せ</rt></ruby>が<ruby>伸<rt>の</rt></ruby>びる。",
            "zh": "孩子的個子長得很快。",
            "hot": false
          }
        ]
      },
      {
        "title": "時間・頻率",
        "compare": "ぎりぎり＝勉強趕上；そろそろ＝差不多該；しょっちゅう＝時常；ちょくちょく＝常常",
        "entries": [
          {
            "word": "ぎりぎり",
            "meaning": "勉強、剛好趕上",
            "note": "時間、數量都可",
            "exampleHtml": "<b class=\"text-accent\">ぎりぎり</b><ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>った。",
            "zh": "剛好趕上了電車。",
            "hot": true
          },
          {
            "word": "そろそろ",
            "meaning": "差不多該〜了",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">そろそろ</b><ruby>失礼<rt>しつれい</rt></ruby>します。",
            "zh": "我差不多該告辭了。",
            "hot": false
          },
          {
            "word": "しょっちゅう",
            "meaning": "時常、經常",
            "note": "多用於口語",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<b class=\"text-accent\">しょっちゅう</b><ruby>遅刻<rt>ちこく</rt></ruby>する。",
            "zh": "他常常遲到。",
            "hot": false
          },
          {
            "word": "ちょくちょく",
            "meaning": "時不時、常常",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">ちょくちょく</b>この<ruby>店<rt>みせ</rt></ruby>に<ruby>来<rt>き</rt></ruby>ている。",
            "zh": "我常常來這家店。",
            "hot": false
          }
        ]
      },
      {
        "title": "動作的方式",
        "compare": "じっくり＝仔細慢慢地；さっと＝迅速、一下子；ぱっと＝突然、一下子；しっかり＝紮實、確實；きちんと＝整齊、確實；はっきり＝清楚",
        "entries": [
          {
            "word": "じっくり",
            "meaning": "仔細地、慢慢地",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">じっくり</b><ruby>考<rt>かんが</rt></ruby>えてから、<ruby>決<rt>き</rt></ruby>めます。",
            "zh": "仔細考慮之後再決定。",
            "hot": false
          },
          {
            "word": "さっと",
            "meaning": "迅速地、一下子",
            "note": "",
            "exampleHtml": "<ruby>手<rt>て</rt></ruby>を<b class=\"text-accent\">さっと</b><ruby>洗<rt>あら</rt></ruby>った。",
            "zh": "很快洗了一下手。",
            "hot": true
          },
          {
            "word": "ぱっと",
            "meaning": "突然、一下子（變化、散開）",
            "note": "",
            "exampleHtml": "<ruby>部屋<rt>へや</rt></ruby>が<b class=\"text-accent\">ぱっと</b><ruby>明<rt>あか</rt></ruby>るくなった。",
            "zh": "房間一下子亮了起來。",
            "hot": false
          },
          {
            "word": "しっかり",
            "meaning": "紮實、確實、振作",
            "note": "",
            "exampleHtml": "<b class=\"text-accent\">しっかり</b><ruby>勉強<rt>べんきょう</rt></ruby>しなさい。",
            "zh": "要好好用功。",
            "hot": true
          },
          {
            "word": "きちんと",
            "meaning": "整齊、確實、規規矩矩",
            "note": "",
            "exampleHtml": "<ruby>服<rt>ふく</rt></ruby>を<b class=\"text-accent\">きちんと</b><ruby>畳<rt>たた</rt></ruby>んだ。",
            "zh": "把衣服摺得整整齊齊。",
            "hot": true
          },
          {
            "word": "はっきり",
            "meaning": "清楚、明確",
            "note": "",
            "exampleHtml": "<ruby>意見<rt>いけん</rt></ruby>を<b class=\"text-accent\">はっきり</b><ruby>言<rt>い</rt></ruby>ってください。",
            "zh": "請把意見說清楚。",
            "hot": true
          }
        ]
      },
      {
        "title": "其他常考副詞",
        "compare": "じっと＝凝視、一動不動；そっと＝輕輕地、悄悄地；まあまあ＝還可以；きっぱり＝斷然；ばっさり＝乾脆地砍；どしどし＝毫不客氣地不斷",
        "entries": [
          {
            "word": "じっと",
            "meaning": "凝視；一動不動地",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>は<ruby>窓<rt>まど</rt></ruby>の<ruby>外<rt>そと</rt></ruby>を<b class=\"text-accent\">じっと</b><ruby>見<rt>み</rt></ruby>ている。",
            "zh": "他一直盯著窗外。",
            "hot": false
          },
          {
            "word": "そっと",
            "meaning": "輕輕地、悄悄地",
            "note": "不想吵到別人",
            "exampleHtml": "<ruby>赤<rt>あか</rt></ruby>ちゃんを<ruby>起<rt>お</rt></ruby>こさないように、<b class=\"text-accent\">そっと</b><ruby>部屋<rt>へや</rt></ruby>を<ruby>出<rt>で</rt></ruby>た。",
            "zh": "為了不吵醒嬰兒，悄悄地離開了房間。",
            "hot": true
          },
          {
            "word": "まあまあ",
            "meaning": "還可以、普普通通",
            "note": "",
            "exampleHtml": "<ruby>試験<rt>しけん</rt></ruby>の<ruby>結果<rt>けっか</rt></ruby>は<b class=\"text-accent\">まあまあ</b>だった。",
            "zh": "考試結果還可以。",
            "hot": false
          },
          {
            "word": "きっぱり",
            "meaning": "斷然、乾脆（拒絕、斷言）",
            "note": "",
            "exampleHtml": "<ruby>彼<rt>かれ</rt></ruby>はその<ruby>誘<rt>さそ</rt></ruby>いを<b class=\"text-accent\">きっぱり</b><ruby>断<rt>ことわ</rt></ruby>った。",
            "zh": "他斷然拒絕了那個邀約。",
            "hot": true
          },
          {
            "word": "ばっさり",
            "meaning": "（一刀）乾脆地砍；毫不留情",
            "note": "",
            "exampleHtml": "<ruby>長<rt>なが</rt></ruby>かった<ruby>髪<rt>かみ</rt></ruby>を<b class=\"text-accent\">ばっさり</b><ruby>切<rt>き</rt></ruby>った。",
            "zh": "把長頭髮剪得乾乾脆脆。",
            "hot": false
          },
          {
            "word": "どしどし",
            "meaning": "毫不客氣地、接連不斷",
            "note": "",
            "exampleHtml": "<ruby>質問<rt>しつもん</rt></ruby>があれば、<b class=\"text-accent\">どしどし</b><ruby>聞<rt>き</rt></ruby>いてください。",
            "zh": "有問題請儘管問。",
            "hot": false
          },
          {
            "word": "うじゃうじゃ",
            "meaning": "（小東西）密密麻麻地蠕動",
            "note": "",
            "exampleHtml": "<ruby>池<rt>いけ</rt></ruby>に<b class=\"text-accent\">うじゃうじゃ</b><ruby>魚<rt>さかな</rt></ruby>がいる。",
            "zh": "池裡有密密麻麻的魚。",
            "hot": false
          },
          {
            "word": "ごそごそ",
            "meaning": "（翻找、動來動去）窸窸窣窣",
            "note": "",
            "exampleHtml": "<ruby>袋<rt>ふくろ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>を<b class=\"text-accent\">ごそごそ</b><ruby>探<rt>さが</rt></ruby>した。",
            "zh": "在袋子裡窸窸窣窣地翻找。",
            "hot": false
          }
        ]
      }
    ]
  }
];
