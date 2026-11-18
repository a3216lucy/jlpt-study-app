// Models
import type { NoteSection } from '../../grammar-review.model';

/** 接續詞：N3＋N2（`<ruby>` 讀音已寫在字串內，只放進 `[innerHTML]`；紅色粗體＝考古題考過） */
export const CONJUNCTION_SECTIONS: NoteSection[] = [
  {
    "id": "conj-cause",
    "title": "順接（所以・因此）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">だから</b>",
            "所以（口語）",
            "意志、命令、勧誘都可以",
            "<ruby>雨<rt>あめ</rt></ruby>だ。だから、<ruby>行<rt>い</rt></ruby>かない。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ですから</b>",
            "所以（だから的敬體）",
            "請求、命令也可",
            "<ruby>混<rt>こ</rt></ruby>みます。ですから、<ruby>早<rt>はや</rt></ruby>めに<ruby>来<rt>き</rt></ruby>てください。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それで</b>",
            "因此（接事實的因果）",
            "事實、結果；不接意志命令",
            "<ruby>財布<rt>さいふ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れた。それで、<ruby>買<rt>か</rt></ruby>えなかった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">そのため</b>",
            "因此、為此（書面）",
            "客觀的結果；不接意志命令",
            "<ruby>台風<rt>たいふう</rt></ruby>が<ruby>来<rt>き</rt></ruby>た。そのため、<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>止<rt>と</rt></ruby>まった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">したがって</b>",
            "因此（推論，較硬）",
            "由前述導出的結論",
            "A＝B、B＝C。したがって、A＝Cだ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">その結果</b>",
            "結果（強調前面的結果）",
            "變化、結局",
            "<ruby>練習<rt>れんしゅう</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けた。その結果、<ruby>合格<rt>ごうかく</rt></ruby>できた。"
          ],
          [
            "なので",
            "所以（口語，句首少用）",
            "多用在句中「～なので」",
            "<ruby>眠<rt>ねむ</rt></ruby>い。なので、<ruby>先<rt>さき</rt></ruby>に<ruby>寝<rt>ね</rt></ruby>る。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>だから／ですから</b>：說話者主觀下結論，後面可以接「～しよう」「～してください」<br><b>そのため／したがって／それで</b>：只陳述客觀因果，後面不接意志、命令<br><b>それで</b>：多用在聽完對方說明後接著說，口語；<b>したがって</b>：論文、說明文的推論，最硬<br>「ですから」是「だから」的鄭重形，語氣上用在對客人、長輩說明時<br>書面用「そのため／したがって」，口語用「だから／それで」，這組差異也是考題的判斷線索"
      }
    ]
  },
  {
    "id": "conj-develop",
    "title": "發展・結果（於是）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">すると</b>",
            "於是（做了後發現…）",
            "意外發現、變化；不接意志",
            "<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けた。すると、<ruby>鳥<rt>とり</rt></ruby>が<ruby>入<rt>はい</rt></ruby>ってきた。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">そこで</b>",
            "因此（針對問題採取行動）",
            "為了解決而做的行動",
            "<ruby>客<rt>きゃく</rt></ruby>が<ruby>減<rt>へ</rt></ruby>った。そこで、<ruby>値段<rt>ねだん</rt></ruby>を<ruby>下<rt>さ</rt></ruby>げた。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">こうして</b>",
            "就這樣（經過上述過程）",
            "一連串經過後的結果",
            "<ruby>調査<rt>ちょうさ</rt></ruby>を<ruby>重<rt>かさ</rt></ruby>ねた。こうして、<ruby>地図<rt>ちず</rt></ruby>が<ruby>完成<rt>かんせい</rt></ruby>した。"
          ],
          [
            "それなら",
            "那麼（承接對方的話）",
            "建議、判斷",
            "<ruby>疲<rt>つか</rt></ruby>れた？それなら、<ruby>休<rt>やす</rt></ruby>もう。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>すると</b>：前句是「做的動作」，後句是「當時自然發生、說話者沒預料的事」，所以後面不能接意志、命令<br><b>そこで</b>：前句是「問題、狀況」，後句是「為此採取的對策」；後面接的是人的行動<br><b>こうして</b>：把前面整段過程總結起來，帶出最後的結果，常見於敘述年代、經過的文章<br><b>そのため</b>與<b>そこで</b>差別：そのため＝自然的結果；そこで＝人為的對策<br>填空看到「問題→對策」就選そこで，看到「動作→發現」就選すると"
      }
    ]
  },
  {
    "id": "conj-contrast",
    "title": "逆接（但是）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">しかし</b>",
            "但是（最通用，書面）",
            "前面的相反或反駁",
            "<ruby>寒<rt>さむ</rt></ruby>い。しかし、<ruby>行<rt>い</rt></ruby>く。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">だが</b>",
            "但是（稍硬）",
            "同しかし，文章裡用",
            "<ruby>高<rt>たか</rt></ruby>い。だが、<ruby>品質<rt>ひんしつ</rt></ruby>はいい。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">でも</b>",
            "但是（口語）",
            "口語；N3 考過的逆接",
            "<ruby>行<rt>い</rt></ruby>きたい。でも、<ruby>時間<rt>じかん</rt></ruby>がない。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ですが／けれども</b>",
            "但是（鄭重、柔和）",
            "委婉的反對、補充",
            "<ruby>確<rt>たし</rt></ruby>かに<ruby>高<rt>たか</rt></ruby>いですが、<ruby>便利<rt>べんり</rt></ruby>です。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ところが</b>",
            "沒想到（出乎預料）",
            "預期與事實不同；不接意志命令",
            "<ruby>落語<rt>らくご</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いた。ところが、<ruby>笑<rt>わら</rt></ruby>えなかった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それなのに</b>",
            "明明如此卻…（帶不滿）",
            "不滿、意外的結果",
            "<ruby>勉強<rt>べんきょう</rt></ruby>した。それなのに、<ruby>落<rt>お</rt></ruby>ちた。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それでも</b>",
            "即使如此還是…",
            "仍然做／仍然成立",
            "<ruby>寒<rt>さむ</rt></ruby>い。それでも、<ruby>走<rt>はし</rt></ruby>る。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ただ</b>",
            "只是（輕微保留）",
            "補充一個問題點",
            "おいしい。ただ、<ruby>少<rt>すこ</rt></ruby>し<ruby>高<rt>たか</rt></ruby>い。"
          ],
          [
            "もっとも",
            "話雖如此（修正自己的話）",
            "對前面說的內容加但書",
            "<ruby>好<rt>す</rt></ruby>きだ。もっとも、<ruby>毎日<rt>まいにち</rt></ruby>は<ruby>無理<rt>むり</rt></ruby>だ。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>しかし</b>：看前面的內容，後面是「相反的主張」，是考題裡最常見的正解<br><b>ところが</b>：前面說了期待、預想，後面出現「沒想到」的事實；例：夏が過ぎたら紅葉が始まると思っていた。<b>ところが</b>～<br><b>だが／ですが</b>：正式程度不同，口語用でも、鄭重用ですが<br><b>それなのに</b>：比ところが多一層「不滿、不合理」<br><b>それでも</b>：前面是困難的狀況，後面是「仍然去做」，不是單純相反，而是「不受影響」<br><b>ただ</b>：不是完全反對，只是補充一個例外或問題；比しかし輕<br>N3 填空：「でも」作逆接要記住"
      }
    ]
  },
  {
    "id": "conj-add",
    "title": "添加（而且）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">そして</b>",
            "然後、而且（單純連接）",
            "順序、並列；中性",
            "<ruby>彼<rt>かれ</rt></ruby>は<ruby>優<rt>やさ</rt></ruby>しい。そして、<ruby>強<rt>つよ</rt></ruby>い。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">また</b>",
            "另外、也（並列的另一事）",
            "並列另一面、另一件事",
            "<ruby>雪<rt>ゆき</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い。また、<ruby>事故<rt>じこ</rt></ruby>も<ruby>多<rt>おお</rt></ruby>い。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">さらに</b>",
            "更進一步（程度升級）",
            "比前面更甚、範圍擴大",
            "<ruby>参加者<rt>さんかしゃ</rt></ruby>に、さらに<ruby>家族<rt>かぞく</rt></ruby>にも<ruby>影響<rt>えいきょう</rt></ruby>する。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それに</b>",
            "而且（口語，補充理由）",
            "再加上一個理由",
            "<ruby>安<rt>やす</rt></ruby>い。それに、<ruby>近<rt>ちか</rt></ruby>い。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">しかも</b>",
            "而且還（加重程度）",
            "更突出的好或壞的事",
            "<ruby>高<rt>たか</rt></ruby>い。しかも、まずい。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">そのうえ</b>",
            "此外還…",
            "累積性的追加",
            "<ruby>親切<rt>しんせつ</rt></ruby>で、そのうえ<ruby>丁寧<rt>ていねい</rt></ruby>だった。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それどころか</b>",
            "豈止如此，反而…",
            "否定前面，說更嚴重",
            "<ruby>眠<rt>ねむ</rt></ruby>れない。それどころか、<ruby>頭<rt>あたま</rt></ruby>が<ruby>冴<rt>さ</rt></ruby>えてきた。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>そして</b>：最中性，只是「接上去」，沒有程度差<br><b>また</b>：和前面「對等」的另一項，不一定更重要<br><b>さらに</b>：在前面基礎上「更」，有層層加深的感覺；n2-2017-07：參加者にとどまらない。<b>さらに</b>～<br><b>しかも／そのうえ／それに</b>：疊加；しかも＝重點在「更不得了」，そのうえ＝同方向累積，それに＝口語補充理由<br><b>それどころか</b>：和其他不同，後面是「比前面更極端或相反」，前面常是否定<br>看到前面已經在列舉優點／缺點，後面再加一個＝添加；看到「更…」→さらに"
      }
    ]
  },
  {
    "id": "conj-choice",
    "title": "並列・選擇",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">または</b>",
            "或者（書面、表單）",
            "名詞、句子並列選擇",
            "<ruby>鉛筆<rt>えんぴつ</rt></ruby>またはペンで<ruby>書<rt>か</rt></ruby>く。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">あるいは</b>",
            "或是／也可能（書面）",
            "另一個可能、另一種做法",
            "<ruby>電話<rt>でんわ</rt></ruby>、あるいはメールで<ruby>連絡<rt>れんらく</rt></ruby>する。"
          ],
          [
            "それとも",
            "還是（疑問句二選一）",
            "疑問句：A？それとも B？",
            "<ruby>肉<rt>にく</rt></ruby>にする？それとも<ruby>魚<rt>さかな</rt></ruby>にする？"
          ],
          [
            "もしくは",
            "或（公文，更硬）",
            "書類、規定",
            "<ruby>氏名<rt>しめい</rt></ruby>、もしくは<ruby>番号<rt>ばんごう</rt></ruby>を<ruby>記入<rt>きにゅう</rt></ruby>。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>それとも</b>：只出現在疑問句，要對方二選一；不能用在敘述句<br><b>または／あるいは／もしくは</b>：敘述句的「或」；または最通用，あるいは稍文章化，もしくは最硬，常見公文<br>あるいは也可表「或許」的另一種可能，有「換個角度想」的味道<br>看到句末是「？」→それとも；看到敘述句的選項→または"
      }
    ]
  },
  {
    "id": "conj-versus",
    "title": "對比・取捨",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">一方（で）</b>",
            "另一方面（兩面並列）",
            "對比的另一面",
            "<ruby>左脳<rt>さのう</rt></ruby>は<ruby>言語<rt>げんご</rt></ruby>。一方、<ruby>右脳<rt>うのう</rt></ruby>は<ruby>図形<rt>ずけい</rt></ruby>。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">逆に</b>",
            "反過來（方向相反）",
            "相反的情況、立場",
            "<ruby>逆<rt>ぎゃく</rt></ruby>に<ruby>言<rt>い</rt></ruby>うと、<ruby>重要<rt>じゅうよう</rt></ruby>な<ruby>仕事<rt>しごと</rt></ruby>だ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">むしろ</b>",
            "反倒、寧可（比較後取其一）",
            "與其說A不如說B",
            "<ruby>子供<rt>こども</rt></ruby>のころは<ruby>嫌<rt>きら</rt></ruby>いだったが、<ruby>今<rt>いま</rt></ruby>はむしろ<ruby>好<rt>す</rt></ruby>きだ。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>一方</b>：兩個事物並立，沒有誰對誰錯，像「這邊…那邊…」，n2-2026-07：左脳～。<b>一方</b>、漢字は意味を表す<br><b>逆に</b>：同一件事「反過來」；看到「A→B，反過來B→A」用逆に<br><b>むしろ</b>：常用在否定前面的期待，後面是更接近真相的那一邊；例：嫌いだった。<b>むしろ</b>好きだ<br><b>一方</b>≠<b>しかし</b>：一方不帶反駁，只是換一個面向敘述"
      }
    ]
  },
  {
    "id": "conj-explain",
    "title": "說明・補充",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">実は</b>",
            "其實（揭曉真相）",
            "出人意料的事實、轉入重點",
            "<ruby>温泉<rt>おんせん</rt></ruby>は、<ruby>実<rt>じつ</rt></ruby>は<ruby>入<rt>はい</rt></ruby>り<ruby>方<rt>かた</rt></ruby>が<ruby>大切<rt>たいせつ</rt></ruby>だ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">確かに</b>",
            "的確（先承認）",
            "後面常接「しかし／が」",
            "<ruby>確<rt>たし</rt></ruby>かに<ruby>便利<rt>べんり</rt></ruby>だが、<ruby>高<rt>たか</rt></ruby>い。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">なぜなら</b>",
            "因為（書面）",
            "句末接「～からだ」",
            "<ruby>中止<rt>ちゅうし</rt></ruby>する。なぜなら、<ruby>雨<rt>あめ</rt></ruby>だからだ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">というのは</b>",
            "因為（說明理由）",
            "句末接「～からだ／のだ」",
            "<ruby>漢字<rt>かんじ</rt></ruby>は<ruby>便利<rt>べんり</rt></ruby>だ。というのは、<ruby>意味<rt>いみ</rt></ruby>がわかるからだ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ただし</b>",
            "但（附加條件、例外）",
            "附帶規定、例外",
            "<ruby>入場<rt>にゅうじょう</rt></ruby><ruby>無料<rt>むりょう</rt></ruby>。ただし、<ruby>予約<rt>よやく</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">なお</b>",
            "另外（追加的資訊）",
            "通知文、補充事項",
            "<ruby>会議<rt>かいぎ</rt></ruby>は10<ruby>時<rt>じ</rt></ruby>です。なお、<ruby>資料<rt>しりょう</rt></ruby>は<ruby>当日<rt>とうじつ</rt></ruby><ruby>配<rt>くば</rt></ruby>ります。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>実は</b>：前面鋪陳了一般的想法，後面揭開「其實不是這樣」，所以常出現在文章開頭、轉入主題處；n2-2017-12：空を飛ぶ鳥は…。<b>実は</b>～<br><b>確かに</b>：先承認一般說法或對方的意見，後面通常會有しかし反轉；n2-2016-07：<b>確かに</b>～的確かもしれない<br><b>なぜなら／というのは</b>：先講結論，再補理由；なぜなら更硬、書面；句尾要接からだ<br><b>ただし／なお</b>：ただし＝針對前面的規定加例外或條件；なお＝補上另外的資訊，不一定是例外<br><b>ただ</b>（逆接段）比ただし口語，ただし多用在規定、公告"
      }
    ]
  },
  {
    "id": "conj-topic",
    "title": "轉換話題",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "ところで",
            "話說回來（突然換話題）",
            "與前面無關的新話題",
            "ところで、<ruby>明日<rt>あした</rt></ruby>の<ruby>会議<rt>かいぎ</rt></ruby>は？"
          ],
          [
            "さて",
            "那麼（進入下一階段）",
            "書信、演說、文章段落轉換",
            "さて、<ruby>本題<rt>ほんだい</rt></ruby>に<ruby>入<rt>はい</rt></ruby>りましょう。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">では</b>",
            "那麼（開始、總結）",
            "結束話題、開始行動",
            "では、<ruby>始<rt>はじ</rt></ruby>めましょう。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">ちなみに</b>",
            "順帶一提（補充小知識）",
            "與主題相關的小補充",
            "ちなみに、<ruby>私<rt>わたし</rt></ruby>は<ruby>猫<rt>ねこ</rt></ruby><ruby>派<rt>は</rt></ruby>です。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>ところで</b>：整個換話題；和前面沒有邏輯關係，所以不是填「前後有關係」的空格<br><b>ちなみに</b>：不換話題，只是補一個相關小資訊<br><b>さて／では</b>：說完一段後進入下一階段，前者較書面，後者口語也能用<br>「ところが」（逆接）和「ところで」（換話題）形很像，注意分辨"
      }
    ]
  },
  {
    "id": "conj-order",
    "title": "順序・列舉",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">まず</b>",
            "首先",
            "接著用それから、次に",
            "まず、<ruby>不要品<rt>ふようひん</rt></ruby>を<ruby>捨<rt>す</rt></ruby>てました。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">それから</b>",
            "然後、還有",
            "時間順序或追加",
            "それから、<ruby>掃除<rt>そうじ</rt></ruby>をしました。"
          ],
          [
            "次に",
            "接著",
            "列舉的下一項",
            "<ruby>次<rt>つぎ</rt></ruby>に、<ruby>水<rt>みず</rt></ruby>を<ruby>入<rt>い</rt></ruby>れます。"
          ],
          [
            "最後に",
            "最後",
            "列舉的最後一項",
            "<ruby>最後<rt>さいご</rt></ruby>に、<ruby>蓋<rt>ふた</rt></ruby>をします。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">そして</b>",
            "然後、而且",
            "順序也可",
            "<ruby>朝<rt>あさ</rt></ruby><ruby>起<rt>お</rt></ruby>きて、そして<ruby>走<rt>はし</rt></ruby>った。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">特に</b>",
            "特別是",
            "從前面舉出一項強調",
            "<ruby>特<rt>とく</rt></ruby>に<ruby>夏<rt>なつ</rt></ruby>は<ruby>暑<rt>あつ</rt></ruby>い。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>まず</b>→<b>それから／次に</b>→<b>最後に</b>：這是列舉順序的基本配套，空格若出現在第一項，多半填まず<br><b>それから</b>：除了時間順序，也能追加「還有…」，n3-2024-07：いいアドバイスをくれます。<b>それから</b>、映画の話もよくします<br><b>そして</b>：最中性；n3-2019-07：<b>そして</b>、クラブに入れば日本人の友達が…<br>N3 填空看到「（20）、家の中の不要品を全部捨てました」→ まず（有後續行動的第一步）"
      }
    ]
  },
  {
    "id": "conj-example",
    "title": "舉例・換言・總結",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "接続詞",
          "意思／功能",
          "後面接什麼",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">たとえば／例えば</b>",
            "例如",
            "列舉具體例子",
            "<ruby>例<rt>たと</rt></ruby>えば、<ruby>収穫<rt>しゅうかく</rt></ruby>のタイミングは<ruby>天気<rt>てんき</rt></ruby>で<ruby>決<rt>き</rt></ruby>まる。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">つまり</b>",
            "也就是說（換個說法）",
            "口語、書面都能用",
            "<ruby>嬉<rt>うれ</rt></ruby>しいから<ruby>笑<rt>わら</rt></ruby>う。つまり、<ruby>表情<rt>ひょうじょう</rt></ruby>は<ruby>結果<rt>けっか</rt></ruby>だ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">すなわち</b>",
            "即（嚴謹的等同，書面）",
            "定義、同一事物",
            "<ruby>日本<rt>にほん</rt></ruby><ruby>銀行<rt>ぎんこう</rt></ruby>、すなわち<ruby>中央<rt>ちゅうおう</rt></ruby><ruby>銀行<rt>ぎんこう</rt></ruby>"
          ],
          [
            "<b class=\"font-extrabold text-accent\">要するに</b>",
            "總之（歸納結論）",
            "把長篇內容收成一句",
            "<ruby>要<rt>よう</rt></ruby>するに、<ruby>時間<rt>じかん</rt></ruby>がないということだ。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">結局</b>",
            "最後還是（結果收尾）",
            "經過許多後的結論",
            "<ruby>結局<rt>けっきょく</rt></ruby>、<ruby>遅刻<rt>ちこく</rt></ruby>してしまった。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>たとえば</b>：前面是抽象說法，後面舉具體例子；n2-2024-12：<b>例えば</b>、収穫のタイミングは…<br><b>つまり</b>：把前面換個說法說一次，兩邊意思相同，等於；<b>すなわち</b>：更書面、更像定義<br><b>要するに</b>：長段落後的歸納；<b>結局</b>：說最後的結果，帶有「兜了一圈」的感覺<br>つまり＝同義換說；要するに＝歸納要點；たとえば＝舉例，三者的方向不同"
      }
    ]
  },
  {
    "id": "conj-register",
    "title": "書面 vs 口語對照",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "口語",
          "書面",
          "差異重點"
        ],
        "rows": [
          [
            "だから／なので",
            "したがって／そのため",
            "書面不接意志、命令"
          ],
          [
            "でも",
            "しかし／だが",
            "書面的逆接"
          ],
          [
            "それで",
            "そのため／その結果",
            "書面表達客觀因果"
          ],
          [
            "それに",
            "さらに／しかも／そのうえ",
            "添加的書面形"
          ],
          [
            "じゃあ",
            "では／それでは",
            "轉換話題、總結"
          ],
          [
            "だって",
            "なぜなら／というのは",
            "理由的書面形"
          ],
          [
            "つまり",
            "すなわち／要するに",
            "換說、歸納"
          ],
          [
            "または",
            "あるいは／もしくは",
            "也是由口語到公文逐漸變硬"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>N3 範圍</b>：しかし、でも、そして、また、それから、まず、すると、そこで、それに、そのうえ、ところが、実は、例えば、つまり、だから、それで、結局、ただ<br><b>N2 範圍增加</b>：さらに、しかも、したがって、そのため、すなわち、むしろ、一方、なぜなら、というのは、ただし、なお、あるいは、逆に、要するに、こうして、確かに<br>文章の文法的選項多是書面詞，N2 的閱讀文也以しかし、したがって、そのため為主<br>N3 的短文與會話題則口語詞較多，如でも、それで、じゃあ"
      }
    ]
  },
  {
    "id": "conj-solve",
    "title": "文章の文法的解法",
    "hint": "",
    "blocks": [
      {
        "kind": "note",
        "text": "<b>第1步</b>：先看空格「前一句」和「後一句」的關係，不要先看選項<br><b>第2步</b>：把關係分類：順接（前因後果）／逆接（相反）／添加（疊加）／換話題／舉例／換說<br><b>第3步</b>：看空格後面有沒有線索：「～からだ」＝なぜなら／というのは；「～ない」相反內容＝しかし／ところが<br><b>第4步</b>：同類的選項再比對細節：預料外＝ところが；程度更進＝さらに；對策＝そこで；發現＝すると<br><b>第5步</b>：句首的詞在整篇的位置：開頭鋪陳後轉重點＝実は；先承認＝確かに；列舉的第一項＝まず<br><b>第6步</b>：N2 若選項裡逆接有兩個以上，看有沒有「沒想到」的語氣來選ところが／しかし<br><b>第7步</b>：用「刪去法」：把填進去後意思矛盾的先劃掉，通常剩 1 個"
      },
      {
        "kind": "dos",
        "items": [
          {
            "wrong": "紅葉が始まると思っていました。<b>つまり</b>、そうではありませんでした。",
            "right": "…<b>しかし</b>、そうではありませんでした。",
            "why": "前後相反要填逆接；つまり是換說，意思不能反轉"
          },
          {
            "wrong": "落語はつまらないと思っていた。<b>したがって</b>、落語を聞いている間、私はよく笑った。",
            "right": "…<b>ところが</b>、落語を聞いている間、私はよく笑った。",
            "why": "前面是「不期待」，後面是出乎預料的事實；不是因果，不能填順接"
          },
          {
            "wrong": "バスケットボールが好きなので、しばらく見ていました。<b>ところが</b>、クラブに入れば友達ができると考えました。",
            "right": "…<b>そして</b>、クラブに入れば…",
            "why": "前後是順著想法接下來，沒有相反；把逆接填進順接空格"
          },
          {
            "wrong": "流れているすしを取って食べた。<b>つまり</b>、食べた量は約1.5倍になった。",
            "right": "…<b>すると</b>、食べた量は約1.5倍になった。",
            "why": "前面是實驗的動作，後面是做了之後得到的結果；不是換說"
          }
        ]
      }
    ]
  }
];
