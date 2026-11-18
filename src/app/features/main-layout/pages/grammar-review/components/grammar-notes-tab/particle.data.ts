// Models
import type { NoteSection } from '../../grammar-review.model';

/** 助詞：N3＋N2（`<ruby>` 讀音已寫在字串內，只放進 `[innerHTML]`；紅色粗體＝考古題考過） */
export const PARTICLE_SECTIONS: NoteSection[] = [
  {
    "id": "p-ni-he-de",
    "title": "に／へ／で",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">に（對象）</b>",
            "動作的對象「給誰、向誰」",
            "N＋に＋<ruby>食<rt>た</rt></ruby>べてほしい・<ruby>頼<rt>たの</rt></ruby>む・あげる",
            "<ruby>自分<rt>じぶん</rt></ruby>の<ruby>作<rt>つく</rt></ruby>ったパンをたくさんの<ruby>人<rt>ひと</rt></ruby>に<ruby>食<rt>た</rt></ruby>べてほしい。<br>希望很多人吃到自己做的麵包。"
          ],
          [
            "に（存在・到達點）",
            "東西存在、抵達、放置的「點」",
            "N＋に＋ある・いる・<ruby>着<rt>つ</rt></ruby>く・<ruby>置<rt>お</rt></ruby>く",
            "<ruby>駅<rt>えき</rt></ruby>に<ruby>着<rt>つ</rt></ruby>いたら<ruby>電話<rt>でんわ</rt></ruby>します。<br>到車站再打電話。"
          ],
          [
            "に（時間點）",
            "動作發生的時刻",
            "<ruby>時刻<rt>じこく</rt></ruby>・<ruby>日付<rt>ひづけ</rt></ruby>＋に",
            "<ruby>毎朝<rt>まいあさ</rt></ruby>７<ruby>時<rt>じ</rt></ruby>に<ruby>起<rt>お</rt></ruby>きます。<br>每天早上七點起床。"
          ],
          [
            "に（目的）",
            "「為了做…而去／來」",
            "Vます形／N＋に＋<ruby>行<rt>い</rt></ruby>く・<ruby>来<rt>く</rt></ruby>る",
            "<ruby>友達<rt>ともだち</rt></ruby>と<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>く。<br>和朋友去買東西。"
          ],
          [
            "に（變化的結果）",
            "變成什麼",
            "N・な形＋に＋なる・する",
            "<ruby>弟<rt>おとうと</rt></ruby>は<ruby>医者<rt>いしゃ</rt></ruby>になった。<br>弟弟成了醫生。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">には（站在誰的感受）</b>",
            "對「某人」而言覺得如何（感受的主體）",
            "N＋には＋形容詞・可能",
            "<ruby>友達<rt>ともだち</rt></ruby>と<ruby>同<rt>おな</rt></ruby>じものを<ruby>頼<rt>たの</rt></ruby>んだが、<ruby>私<rt>わたし</rt></ruby>には<ruby>辛<rt>から</rt></ruby>すぎた。<br>點了和朋友一樣的東西，但對我來說太辣了。"
          ],
          [
            "へ（方向）",
            "朝向某方向，重點在「前往」",
            "N＋へ＋<ruby>行<rt>い</rt></ruby>く・<ruby>向<rt>む</rt></ruby>かう",
            "<ruby>来月<rt>らいげつ</rt></ruby>、<ruby>北海道<rt>ほっかいどう</rt></ruby>へ<ruby>旅行<rt>りょこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。<br>下個月要去北海道旅行。"
          ],
          [
            "で（場所）",
            "動作進行的場所",
            "N＋で＋動作動詞",
            "<ruby>図書館<rt>としょかん</rt></ruby>で<ruby>勉強<rt>べんきょう</rt></ruby>する。<br>在圖書館讀書。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">で（狀態・手段）</b>",
            "以什麼狀態、工具、材料來做",
            "N＋で",
            "<ruby>両親<rt>りょうしん</rt></ruby>に<ruby>買<rt>か</rt></ruby>ってもらった<ruby>着物<rt>きもの</rt></ruby>で<ruby>大学<rt>だいがく</rt></ruby>の<ruby>卒業式<rt>そつぎょうしき</rt></ruby>に<ruby>出席<rt>しゅっせき</rt></ruby>した。<br>穿著父母買給我的和服出席大學畢業典禮。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">で（以此為範圍）</b>",
            "「以這樣就…」的界線、基準",
            "N＋で＋大丈夫・いい",
            "ここの<ruby>書<rt>か</rt></ruby>き<ruby>方<rt>かた</rt></ruby>はこれで<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>でしょうか。<br>這裡的寫法這樣可以嗎？"
          ],
          [
            "で（原因）",
            "因為某事（多為不可控的事）",
            "N＋で",
            "<ruby>風邪<rt>かぜ</rt></ruby>で<ruby>会社<rt>かいしゃ</rt></ruby>を<ruby>休<rt>やす</rt></ruby>んだ。<br>因感冒向公司請假。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Aで Aで たまらない</b>",
            "重複強調到無法忍受的程度",
            "<ruby>好<rt>す</rt></ruby>き・<ruby>心配<rt>しんぱい</rt></ruby>などな形＋で＋同詞＋で＋たまらない",
            "<ruby>私<rt>わたし</rt></ruby>はピアノを<ruby>弾<rt>ひ</rt></ruby>くことが<ruby>好<rt>す</rt></ruby>きで<ruby>好<rt>す</rt></ruby>きでたまらない。<br>我喜歡彈鋼琴喜歡得不得了。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>に vs で</b>：看「動作」還是「點」<br>動作在那個地方「進行」→「で」（勉強する、会議をする）<br>人或物「存在、抵達、留在」那個點→「に」（住む・ある・<ruby>着<rt>つ</rt></ruby>く・<ruby>座<rt>すわ</rt></ruby>る）<br>「ある」表存在用「に」，但表「舉行活動」時是事件發生的場所，用「で」<br><b>に vs へ</b>：「に」是終點的一個點，「へ」是朝那個方向<br>「行く・来る・帰る」兩者都可以<br>「着く・入る・置く」要有明確的點，只能用「に」<br><b>對象「に」vs「と」</b>：單方向的動作（あげる・頼む）用「に」，雙方一起做（結婚する・けんかする）用「と」<br><b>で（範圍）</b>：「これでいい」是把範圍劃在「這個」，所以後面常接「大丈夫」「いい」「十分」"
      }
    ]
  },
  {
    "id": "p-wo-ga",
    "title": "を／が",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "を（對象）",
            "動作直接作用的對象",
            "N＋を＋他動詞",
            "<ruby>手紙<rt>てがみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>く。<br>寫信。"
          ],
          [
            "を（離開點）",
            "從哪裡離開、畢業",
            "N＋を＋<ruby>出<rt>で</rt></ruby>る・<ruby>卒業<rt>そつぎょう</rt></ruby>する",
            "<ruby>朝<rt>あさ</rt></ruby>８<ruby>時<rt>じ</rt></ruby>に<ruby>家<rt>いえ</rt></ruby>を<ruby>出<rt>で</rt></ruby>る。<br>早上八點出門。"
          ],
          [
            "を（經過的場所）",
            "移動經過的路線、空間",
            "N＋を＋<ruby>歩<rt>ある</rt></ruby>く・<ruby>渡<rt>わた</rt></ruby>る",
            "<ruby>公園<rt>こうえん</rt></ruby>を<ruby>散歩<rt>さんぽ</rt></ruby>する。<br>在公園散步。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">を（度過時間）</b>",
            "「度過」某段時間",
            "<ruby>時間<rt>じかん</rt></ruby>＋を＋<ruby>過<rt>す</rt></ruby>ごす",
            "<ruby>楽<rt>たの</rt></ruby>しい<ruby>時間<rt>じかん</rt></ruby>を<ruby>過<rt>す</rt></ruby>ごした。<br>度過了愉快的時光。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nを中心に</b>",
            "以…為中心",
            "N＋を<ruby>中心<rt>ちゅうしん</rt></ruby>に",
            "このファッション<ruby>雑誌<rt>ざっし</rt></ruby>は、２０<ruby>代<rt>だい</rt></ruby><ruby>前半<rt>ぜんはん</rt></ruby>の<ruby>女性<rt>じょせい</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>に<ruby>人気<rt>にんき</rt></ruby>がある。<br>這本時尚雜誌以二十歲出頭的女性為中心很受歡迎。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nをしている</b>",
            "表情、外觀、髮型的狀態",
            "<ruby>顔<rt>かお</rt></ruby>・<ruby>目<rt>め</rt></ruby>・<ruby>色<rt>いろ</rt></ruby>＋を＋する",
            "とてもうれしそうな<ruby>顔<rt>かお</rt></ruby>をしていた。<br>露出了非常開心的表情。"
          ],
          [
            "が（好惡・能力）",
            "感情、能力、需要的對象",
            "N＋が＋<ruby>好<rt>す</rt></ruby>き・できる・ほしい",
            "<ruby>私<rt>わたし</rt></ruby>は<ruby>英語<rt>えいご</rt></ruby>が<ruby>話<rt>はな</rt></ruby>せる。<br>我會說英語。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">が（新資訊的主語）</b>",
            "第一次提到，或「發現」的事",
            "N＋が＋ない・ある",
            "<ruby>腕時計<rt>うでどけい</rt></ruby>がないことに<ruby>気<rt>き</rt></ruby>がつきました。<br>我發現手錶不見了。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>を</b>：動作「碰到」的東西，所以後面是他動詞<br>「を中心に」「を過ごす」「をしている」都是「を」＋固定的後面，先看固定搭配再選<br>「顔をする」的「を」是把「表情」當成做出來的對象<br><b>が</b>：「好き・できる・ほしい・分かる」等狀態詞，對象用「が」不是「を」<br>「が」的主語常是「新資訊」，聽者還不知道的東西<br>「腕時計が」是「發現了這個新事實」，用「は」就變成說明「手錶」這個舊話題，語氣不對"
      }
    ]
  },
  {
    "id": "p-wa-mo",
    "title": "は／も",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "は（主題）",
            "「關於…」，後面說明主題",
            "N＋は",
            "<ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。<br>我是學生。"
          ],
          [
            "は（對比）",
            "「A是…，（B就不是）」",
            "N＋は…が、N＋は…",
            "ビールは<ruby>飲<rt>の</rt></ruby>むが、ワインは<ruby>飲<rt>の</rt></ruby>まない。<br>啤酒會喝，但葡萄酒不喝。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">數量＋も</b>",
            "強調「多達」",
            "<ruby>数量<rt>すうりょう</rt></ruby>＋も",
            "<ruby>高校<rt>こうこう</rt></ruby><ruby>時代<rt>じだい</rt></ruby>の<ruby>友達<rt>ともだち</rt></ruby>と<ruby>会<rt>あ</rt></ruby>うと、いつも<ruby>何時間<rt>なんじかん</rt></ruby>もおしゃべりしてしまう。<br>和高中時代的朋友見面，總是聊上好幾個小時。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">数量＋も（時間）</b>",
            "多達…（超乎預期）",
            "<ruby>分<rt>ふん</rt></ruby>・<ruby>回<rt>かい</rt></ruby>＋も",
            "このカレーは１５<ruby>分<rt>ふん</rt></ruby>もあればできるので、よく<ruby>作<rt>つく</rt></ruby>る。<br>這道咖哩只要十五分鐘就能做好，所以常做。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Vもしない</b>",
            "「連…都不」強烈否定",
            "Vます形＋も＋しない",
            "あの<ruby>人<rt>ひと</rt></ruby>は、<ruby>人<rt>ひと</rt></ruby>の<ruby>意見<rt>いけん</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きもしないで、<ruby>自分<rt>じぶん</rt></ruby>の<ruby>主張<rt>しゅちょう</rt></ruby>ばかりする。<br>那個人連別人的意見都不聽，只一味堅持自己的主張。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Aも Bも（並列追加）</b>",
            "除了A，還有B",
            "N＋も、N＋も",
            "<ruby>体力<rt>たいりょく</rt></ruby>も<ruby>必要<rt>ひつよう</rt></ruby>で、<ruby>農業<rt>のうぎょう</rt></ruby>は<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>大変<rt>たいへん</rt></ruby>な<ruby>仕事<rt>しごと</rt></ruby>だ。<br>不但需要體力，農業也真的是很辛苦的工作。"
          ],
          [
            "疑問詞＋も＋否定",
            "完全否定",
            "だれ・なに・どこ＋も…ない",
            "<ruby>教室<rt>きょうしつ</rt></ruby>にはだれもいなかった。<br>教室裡誰都不在。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>は vs が</b>：看句子的重點在哪<br>「は」：已知的主題，重點在後面的說明（私は学生です）<br>「が」：新資訊或強調主語，重點在「主語」本身（だれが来ましたか→山田さんが来ました）<br><b>數量＋も</b>：後面的數量比說話者預期的多<br>「何時間も」「何度も」「１５分も」的「も」不能換成「は」或「ぐらい」，因為是在強調「多」<br>用「は」變成「至少…」，「ぐらい」只是大概，兩者都沒有「很多」的意思<br><b>も vs さえ</b>：「Vもしない」是連基本動作都不做，「さえ」是連最基本的程度都沒有，下一段比較"
      }
    ]
  },
  {
    "id": "p-to-ya-no",
    "title": "と／や／の",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "と（共同對象）",
            "一起做的對象",
            "N＋と＋<ruby>会<rt>あ</rt></ruby>う・<ruby>結婚<rt>けっこん</rt></ruby>する",
            "<ruby>友達<rt>ともだち</rt></ruby>と<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>く。<br>和朋友去看電影。"
          ],
          [
            "と（引用）",
            "引用說的話、想的內容",
            "普通形＋と＋<ruby>言<rt>い</rt></ruby>う・<ruby>思<rt>おも</rt></ruby>う",
            "<ruby>彼<rt>かれ</rt></ruby>は<ruby>明日<rt>あした</rt></ruby><ruby>来<rt>く</rt></ruby>ると<ruby>言<rt>い</rt></ruby>った。<br>他說明天會來。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nとは（定義）</b>",
            "「所謂…就是…」說明詞義",
            "N＋とは…のことだ",
            "<ruby>年賀状<rt>ねんがじょう</rt></ruby>とは、<ruby>新年<rt>しんねん</rt></ruby>を<ruby>祝<rt>いわ</rt></ruby>う<ruby>言葉<rt>ことば</rt></ruby>を<ruby>書<rt>か</rt></ruby>いて<ruby>送<rt>おく</rt></ruby>るはがきや<ruby>手紙<rt>てがみ</rt></ruby>のことだ。<br>所謂賀年卡，就是寫下新年祝福送出的明信片或信件。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜とか（例示）</b>",
            "「…之類的」舉例",
            "N・普通形＋とか",
            "スポーツが<ruby>好<rt>す</rt></ruby>きだと<ruby>言<rt>い</rt></ruby>っていたから、タオルとかいいんじゃない？<br>她說喜歡運動，送毛巾之類的不錯吧？"
          ],
          [
            "や（並列例示）",
            "列舉幾個代表，後面還有",
            "N＋や＋N（など）",
            "<ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>に<ruby>本<rt>ほん</rt></ruby>やノートがある。<br>桌上有書和筆記本之類的東西。"
          ],
          [
            "の（修飾）",
            "表示所屬、內容",
            "N＋の＋N",
            "これは<ruby>私<rt>わたし</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>です。<br>這是我的書。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">の（修飾子句裡的主語）</b>",
            "修飾名詞的子句中，主語「が」可換成「の」",
            "N＋の＋V（連體形）＋N",
            "<ruby>子<rt>こ</rt></ruby>どものころ、<ruby>母<rt>はは</rt></ruby>の<ruby>作<rt>つく</rt></ruby>ったハンバーグが<ruby>大好<rt>だいす</rt></ruby>きだった。<br>小時候最喜歡媽媽做的漢堡排。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Vのは〜からだ</b>",
            "把子句名詞化當主題，說明原因",
            "普通形＋のは…からだ",
            "<ruby>会社<rt>かいしゃ</rt></ruby>から<ruby>遠<rt>とお</rt></ruby>い<ruby>北町<rt>きたまち</rt></ruby>を<ruby>選<rt>えら</rt></ruby>んだのは、ずっと<ruby>北町<rt>きたまち</rt></ruby>に<ruby>住<rt>す</rt></ruby>んでみたかったからだ。<br>選了離公司很遠的北町，是因為一直很想住住看。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>と vs や</b>：「と」是全部列出，「や」是舉幾個代表（後面還有）<br><b>と vs とか</b>：「とか」比「や」更口語，舉例時帶有「之類的」語氣<br><b>の（主語）</b>：只能用在「修飾名詞」的子句裡，主句不能把「が」換成「の」<br>換成「の」後，句子更像一個名詞片語，所以書面語更常見<br><b>とは</b>：是「と」引用＋「は」主題，所以用來下定義，後面接「のことだ・という意味だ」"
      }
    ]
  },
  {
    "id": "p-kara-made",
    "title": "から／まで／より／ほど",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "から（時間的起點）",
            "從何時開始",
            "<ruby>時間<rt>じかん</rt></ruby>＋から",
            "<ruby>会議<rt>かいぎ</rt></ruby>は<ruby>午後<rt>ごご</rt></ruby>３<ruby>時<rt>じ</rt></ruby>から<ruby>始<rt>はじ</rt></ruby>まる。<br>會議從下午三點開始。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">から（來源・出發地）</b>",
            "從哪裡來",
            "N＋から＋<ruby>来<rt>く</rt></ruby>る・<ruby>集<rt>あつ</rt></ruby>まる",
            "<ruby>先月<rt>せんげつ</rt></ruby><ruby>東京<rt>とうきょう</rt></ruby>で<ruby>行<rt>おこな</rt></ruby>われたサッカーの<ruby>国際大会<rt>こくさいたいかい</rt></ruby>には、<ruby>世界中<rt>せかいじゅう</rt></ruby>から<ruby>多<rt>おお</rt></ruby>くのサッカーファンが<ruby>集<rt>あつ</rt></ruby>まった。<br>上個月在東京舉行的足球國際賽，有來自世界各地的許多球迷聚集。"
          ],
          [
            "から（原因）",
            "因為…所以",
            "普通形＋から",
            "<ruby>寒<rt>さむ</rt></ruby>いから、<ruby>窓<rt>まど</rt></ruby>を<ruby>閉<rt>し</rt></ruby>めてください。<br>因為冷，請關上窗戶。"
          ],
          [
            "から（材料）",
            "由…製成（看不出原料）",
            "N＋から＋<ruby>作<rt>つく</rt></ruby>る",
            "<ruby>酒<rt>さけ</rt></ruby>は<ruby>米<rt>こめ</rt></ruby>から<ruby>作<rt>つく</rt></ruby>られる。<br>酒是用米釀成的。"
          ],
          [
            "まで（終點）",
            "持續到何時、何處",
            "N＋まで",
            "<ruby>夜<rt>よる</rt></ruby>１０<ruby>時<rt>じ</rt></ruby>まで<ruby>働<rt>はたら</rt></ruby>いた。<br>工作到晚上十點。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nまで（連…都）</b>",
            "「甚至連…」程度到了極端",
            "N＋まで",
            "<ruby>換気扇<rt>かんきせん</rt></ruby>まで<ruby>掃除<rt>そうじ</rt></ruby>したのは<ruby>初<rt>はじ</rt></ruby>めてでした。<br>連換氣扇都打掃，這是第一次。"
          ],
          [
            "までに（期限）",
            "最晚在…之前（完成）",
            "<ruby>時間<rt>じかん</rt></ruby>＋までに＋<ruby>瞬間動詞<rt>しゅんかんどうし</rt></ruby>",
            "<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>金曜日<rt>きんようび</rt></ruby>までにレポートを<ruby>出<rt>だ</rt></ruby>してください。<br>請在下週五之前交報告。"
          ],
          [
            "より（比較）",
            "比…",
            "AはBより〜",
            "<ruby>今年<rt>ことし</rt></ruby>は<ruby>去年<rt>きょねん</rt></ruby>より<ruby>暑<rt>あつ</rt></ruby>い。<br>今年比去年熱。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Bほど〜ない</b>",
            "沒有到B那種程度",
            "AはBほど＋否定",
            "<ruby>今年<rt>ことし</rt></ruby>の<ruby>夏<rt>なつ</rt></ruby>は<ruby>去年<rt>きょねん</rt></ruby>ほど<ruby>暑<rt>あつ</rt></ruby>くない。<br>今年夏天沒有去年那麼熱。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">數量＋ほど</b>",
            "大約",
            "<ruby>数量<rt>すうりょう</rt></ruby>＋ほど",
            "<ruby>森川動物園<rt>もりかわどうぶつえん</rt></ruby>は、<ruby>森川駅<rt>もりかわえき</rt></ruby>からバスで３０<ruby>分<rt>ぷん</rt></ruby>ほど<ruby>行<rt>い</rt></ruby>ったところにある。<br>森川動物園在從森川站搭巴士約三十分鐘的地方。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>から vs ので</b>：「から」是說話者主觀的理由，可接命令、請求（寒いから閉めてください）<br>「ので」是客觀的因果，語氣柔和，後面不能接命令<br><b>まで vs までに</b>：看後面動詞<br>持續到某時刻（働く・待つ・いる）→「まで」<br>在某時刻前一次做完（出す・終わる・帰る）→「までに」<br><b>より vs ほど</b>：「より」肯定、否定都可用<br>「ほど〜ない」是否定專用：「去年より暑くない」＝比去年涼，「去年ほど暑くない」＝沒到去年那麼熱<br><b>から（來源）</b>：「世界中から」是「從世界各地來」，所以後面用「集まる・来る」這類移動動詞"
      }
    ]
  },
  {
    "id": "p-dake-shika",
    "title": "だけ／しか／ばかり／さえ／こそ",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">Vるだけ</b>",
            "只要…就好（限定）",
            "V辭書形＋だけ",
            "このチーズケーキの<ruby>作<rt>つく</rt></ruby>り<ruby>方<rt>かた</rt></ruby>は、<ruby>材料<rt>ざいりょう</rt></ruby>を<ruby>混<rt>ま</rt></ruby>ぜて<ruby>冷<rt>ひ</rt></ruby>やすだけだから、<ruby>誰<rt>だれ</rt></ruby>でも<ruby>簡単<rt>かんたん</rt></ruby>に<ruby>作<rt>つく</rt></ruby>れると<ruby>思<rt>おも</rt></ruby>う。<br>這個起司蛋糕的做法只要把材料混合冷卻就好，我想誰都能輕鬆做出來。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">〜だけなら</b>",
            "「光是…的話」限定條件",
            "N・V＋だけなら",
            "<ruby>夢<rt>ゆめ</rt></ruby>を<ruby>語<rt>かた</rt></ruby>るだけなら<ruby>誰<rt>だれ</rt></ruby>でもできるが、<ruby>実現<rt>じつげん</rt></ruby>させるのは<ruby>簡単<rt>かんたん</rt></ruby>なことではない。<br>光是談夢想誰都辦得到，但要實現可不簡單。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nしか＋否定</b>",
            "只有…（其他都不）",
            "N＋しか＋否定形",
            "<ruby>私<rt>わたし</rt></ruby>は<ruby>自分<rt>じぶん</rt></ruby>でガソリンを<ruby>入<rt>い</rt></ruby>れる<ruby>店<rt>みせ</rt></ruby>しか<ruby>知<rt>し</rt></ruby>りませんでした。<br>我只知道自己加油的加油站。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Vしかない</b>",
            "只能…，沒有其他辦法",
            "V辭書形＋しかない",
            "<ruby>会議<rt>かいぎ</rt></ruby>が<ruby>終<rt>お</rt></ruby>わるのを<ruby>待<rt>ま</rt></ruby>つしかないね。<br>只能等會議結束了。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Vたばかり</b>",
            "剛剛做完",
            "Vた＋ばかり",
            "<ruby>少<rt>すこ</rt></ruby>し<ruby>前<rt>まえ</rt></ruby>にご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べたばかりなのに、もうおなかがすいてきた。<br>不久前才剛吃過飯，肚子又餓了。"
          ],
          [
            "Nばかり（偏重）",
            "總是…、淨是…",
            "N＋ばかり",
            "<ruby>弟<rt>おとうと</rt></ruby>は<ruby>肉<rt>にく</rt></ruby>ばかり<ruby>食<rt>た</rt></ruby>べている。<br>弟弟淨吃肉。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nさえ</b>",
            "連…都（舉極端的例）",
            "N＋さえ＋否定／可能",
            "<ruby>水泳教室<rt>すいえいきょうしつ</rt></ruby>に<ruby>通<rt>かよ</rt></ruby>い<ruby>始<rt>はじ</rt></ruby>めたときは、<ruby>怖<rt>こわ</rt></ruby>くて<ruby>水<rt>みず</rt></ruby>に<ruby>顔<rt>かお</rt></ruby>をつけることさえできなかった。<br>剛開始上游泳課時，害怕得連把臉放進水裡都做不到。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nこそ</b>",
            "正是…，強調特別的一次",
            "N＋こそ",
            "１２<ruby>年間<rt>ねんかん</rt></ruby><ruby>付<rt>つ</rt></ruby>き<ruby>合<rt>あ</rt></ruby>っている<ruby>彼女<rt>かのじょ</rt></ruby>に、<ruby>今年<rt>ことし</rt></ruby>こそ<ruby>結婚<rt>けっこん</rt></ruby>を<ruby>申<rt>もう</rt></ruby>し<ruby>込<rt>こ</rt></ruby>もうと<ruby>思<rt>おも</rt></ruby>っている。<br>打算今年一定要向交往了十二年的女友求婚。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nなんか</b>",
            "「像…這種」，自謙或輕視、舉例",
            "N＋なんか",
            "<ruby>卓球<rt>たっきゅう</rt></ruby>クラブの<ruby>山谷<rt>やまたに</rt></ruby>さんは、「<ruby>私<rt>わたし</rt></ruby>なんかまだまだですよ。」といつも<ruby>言<rt>い</rt></ruby>っている。<br>桌球社的山谷先生總是說「像我還差得遠呢」。"
          ],
          [
            "Nでも（例示）",
            "「…之類的也行」",
            "N＋でも",
            "お<ruby>茶<rt>ちゃ</rt></ruby>でも<ruby>飲<rt>の</rt></ruby>みませんか。<br>要不要喝杯茶之類的？"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>だけ vs しか</b>：「だけ」後面肯定，「しか」後面一定要否定<br>「しか」本身有「其他都沒有」的負面語氣，所以後面一定要否定<br>譯成中文都是「只有」，但「しか」帶有不夠、可惜的感覺<br><b>だけ vs ばかり</b>：「だけ」是限定，沒有其他<br>「ばかり」是數量大部分是…，還可能有其他（肉ばかり食べる＝淨吃肉，不一定只有肉）<br><b>さえ vs こそ</b>：「さえ」舉最基本、最低的例子，後面接否定或可能，意思是「連這都…」<br>「こそ」強調「正是這個」，用來下決心、表達強調，不是極端例子<br><b>だけなら</b>：「光是…的話」，後面常接「できる」，暗示其他條件不夠"
      }
    ]
  },
  {
    "id": "p-compound-1",
    "title": "複合助詞①（話題・立場・原因）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">について</b>",
            "關於…（談論的內容）",
            "N＋について＋<ruby>話<rt>はな</rt></ruby>す・<ruby>調<rt>しら</rt></ruby>べる",
            "<ruby>昨日<rt>きのう</rt></ruby>、<ruby>本屋<rt>ほんや</rt></ruby>で<ruby>小説<rt>しょうせつ</rt></ruby>２<ruby>冊<rt>さつ</rt></ruby>と、レポートの<ruby>書<rt>か</rt></ruby>き<ruby>方<rt>かた</rt></ruby>についての<ruby>本<rt>ほん</rt></ruby>を１<ruby>冊<rt>さつ</rt></ruby><ruby>買<rt>か</rt></ruby>った。<br>昨天在書店買了兩本小說，和一本關於如何寫報告的書。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">として</b>",
            "以…的身分、資格",
            "N＋として",
            "バスの<ruby>運転手<rt>うんてんしゅ</rt></ruby>として<ruby>働<rt>はたら</rt></ruby>いている。<br>擔任公車司機的工作。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">としては</b>",
            "站在…立場來說（對比）",
            "N＋としては",
            "<ruby>鈴木選手<rt>すずきせんしゅ</rt></ruby>は、プロの<ruby>選手<rt>せんしゅ</rt></ruby>としては<ruby>今回<rt>こんかい</rt></ruby>が<ruby>初<rt>はじ</rt></ruby>めての<ruby>出場<rt>しゅつじょう</rt></ruby>だ。<br>鈴木選手以職業選手的身分來說，這次是第一次出賽。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">としてなら／としてではなく</b>",
            "「若是以…身分的話」「不是以…身分」",
            "N＋としてなら／ではなく",
            "<ruby>私<rt>わたし</rt></ruby>は<ruby>演奏家<rt>えんそうか</rt></ruby>としてではなく、<ruby>子供<rt>こども</rt></ruby>たちに<ruby>教<rt>おし</rt></ruby>える<ruby>形<rt>かたち</rt></ruby>でバイオリンに<ruby>関<rt>かか</rt></ruby>わりたい。<br>我不是以演奏家的身分，而是想以教導孩子的方式與小提琴結緣。"
          ],
          [
            "にとって",
            "對…而言（評價的立場）",
            "N＋にとって＋<ruby>大切<rt>たいせつ</rt></ruby>だ・<ruby>難<rt>むずか</rt></ruby>しい",
            "<ruby>私<rt>わたし</rt></ruby>にとって<ruby>家族<rt>かぞく</rt></ruby>は<ruby>一番<rt>いちばん</rt></ruby><ruby>大切<rt>たいせつ</rt></ruby>です。<br>對我而言家人最重要。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">に対して</b>",
            "對於…（對象、對比比例）",
            "N＋に<ruby>対<rt>たい</rt></ruby>して",
            "<ruby>母<rt>はは</rt></ruby>はいちごジャム<ruby>作<rt>づく</rt></ruby>りで、いちご１００グラムに<ruby>対<rt>たい</rt></ruby>して８０グラムの<ruby>砂糖<rt>さとう</rt></ruby>を<ruby>使<rt>つか</rt></ruby>う。<br>媽媽做草莓果醬時，每一百公克草莓用八十公克砂糖。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">に対してだけは</b>",
            "只有對…才（特別）",
            "N＋に<ruby>対<rt>たい</rt></ruby>してだけは",
            "<ruby>森先輩<rt>もりせんぱい</rt></ruby>はどんな<ruby>人<rt>ひと</rt></ruby>にも<ruby>厳<rt>きび</rt></ruby>しいが、<ruby>私<rt>わたし</rt></ruby>に<ruby>対<rt>たい</rt></ruby>してだけはそうではない。<br>森學長對任何人都很嚴格，唯獨對我不是這樣。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">によって</b>",
            "依…而不同、藉由…、因為…",
            "N＋によって＋<ruby>違<rt>ちが</rt></ruby>う",
            "<ruby>食事<rt>しょくじ</rt></ruby>のマナーは<ruby>国<rt>くに</rt></ruby>によって<ruby>違<rt>ちが</rt></ruby>う。<br>用餐禮儀因國家而異。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">による</b>",
            "由…造成、根據…的（修飾名詞）",
            "N＋による＋N",
            "パソコンや<ruby>携帯電話<rt>けいたいでんわ</rt></ruby>の<ruby>見<rt>み</rt></ruby>すぎによる<ruby>目<rt>め</rt></ruby>の<ruby>疲<rt>つか</rt></ruby>れが<ruby>原因<rt>げんいん</rt></ruby>で<ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>くなることもある。<br>也有人因為電腦或手機看太多造成眼睛疲勞而頭痛。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">において</b>",
            "在…（場所、場合，書面）",
            "N＋において",
            "<ruby>音楽会<rt>おんがくかい</rt></ruby>は、あすの１１<ruby>時<rt>じ</rt></ruby>からさくら<ruby>広場<rt>ひろば</rt></ruby>において<ruby>開<rt>ひら</rt></ruby>かれます。<br>音樂會將於明天十一點起在櫻花廣場舉行。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">のことで</b>",
            "為了…的事（找人商量）",
            "N＋のことで＋<ruby>相談<rt>そうだん</rt></ruby>する",
            "<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>発表<rt>はっぴょう</rt></ruby>のことで、ちょっとご<ruby>相談<rt>そうだん</rt></ruby>したいのですが。<br>關於下週的報告，我想請教您一下。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">のほかに</b>",
            "除了…還有",
            "N＋のほかに",
            "<ruby>奨学金<rt>しょうがくきん</rt></ruby>の<ruby>申<rt>もう</rt></ruby>し<ruby>込<rt>こ</rt></ruby>みには、<ruby>申込書<rt>もうしこみしょ</rt></ruby>のほかに<ruby>成績証明書<rt>せいせきしょうめいしょ</rt></ruby>などの<ruby>書類<rt>しょるい</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。<br>申請獎學金，除了申請書還需要成績證明書等文件。"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>について vs に対して vs のことで</b>：看「後面要做什麼」<br>談話、調查的「內容」→「について」（日本の経済について調べる）<br>動作「朝向」某人、某事物→「に対して」（客に対して丁寧に話す）<br>找人商量一件「事情」→「のことで」，後面常是「相談」「お願い」「話」<br><b>として vs にとって</b>：「として」是身分（做為），後面接動作；「にとって」是評價的立場，後面接形容詞或判斷<br>所以「運転手として働く」，不能說「運転手にとって働く」<br><b>によって</b>：前面的名詞（國家、天氣、人）一換，結果就跟著變，所以是「依…而不同」<br>也可表手段、原因（調べることによって分かる）<br><b>において</b>：專用在場所、場合，比「で」書面、正式<br>所以「北山公園において夏祭りが…」不選「にとって」「に対して」「について」，這三個都不表示場所"
      }
    ]
  },
  {
    "id": "p-compound-2",
    "title": "複合助詞②（助詞＋助詞）",
    "hint": "",
    "blocks": [
      {
        "kind": "table",
        "head": [
          "用法",
          "意思",
          "接續／搭配",
          "例句"
        ],
        "rows": [
          [
            "<b class=\"font-extrabold text-accent\">にしか＋否定</b>",
            "只有對…（動作的對象）",
            "N＋にしか＋否定",
            "<ruby>山下課長<rt>やましたかちょう</rt></ruby>にしかお<ruby>目<rt>め</rt></ruby>にかかったことがございません。<br>我只見過山下課長。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">でしか＋否定</b>",
            "只能用…（手段、狀態）",
            "N＋でしか＋否定",
            "<ruby>今<rt>いま</rt></ruby>まできゅうりは<ruby>生<rt>なま</rt></ruby>でしか<ruby>食<rt>た</rt></ruby>べたことがなかった。<br>到現在為止黃瓜都只吃過生的。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">としか＋否定</b>",
            "只和…（一起做的對象）",
            "N＋としか＋否定",
            "<ruby>海外旅行<rt>かいがいりょこう</rt></ruby>は<ruby>今<rt>いま</rt></ruby>まで<ruby>家族<rt>かぞく</rt></ruby>としか<ruby>行<rt>い</rt></ruby>ったことがない。<br>到現在為止國外旅行只和家人去過。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">までしか＋否定</b>",
            "只到…（範圍）",
            "N＋までしか＋否定",
            "このバスは<ruby>次<rt>つぎ</rt></ruby>のバス<ruby>停<rt>てい</rt></ruby>までしか<ruby>行<rt>い</rt></ruby>きませんよ。<br>這班公車只到下一站。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">からしか＋否定</b>",
            "只能從…（選擇、來源）",
            "N＋からしか＋否定",
            "レストランハヤマのランチは、AランチかBランチの２<ruby>種類<rt>しゅるい</rt></ruby>からしか<ruby>選<rt>えら</rt></ruby>べない。<br>哈亞馬餐廳的午餐只能從A套餐或B套餐兩種中選。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nからの＋N</b>",
            "來自…的（來源的連體修飾）",
            "N＋からの＋N",
            "この<ruby>辺<rt>あた</rt></ruby>りは<ruby>古<rt>ふる</rt></ruby>いお<ruby>寺<rt>てら</rt></ruby>や<ruby>神社<rt>じんじゃ</rt></ruby>が<ruby>多<rt>おお</rt></ruby>く、<ruby>外国<rt>がいこく</rt></ruby>からの<ruby>観光客<rt>かんこうきゃく</rt></ruby>にも<ruby>人気<rt>にんき</rt></ruby>がある。<br>這一帶有許多古寺和神社，也受到來自外國的觀光客歡迎。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nにまで</b>",
            "甚至到…的程度",
            "N＋にまで＋V",
            "<ruby>会社<rt>かいしゃ</rt></ruby>は<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>大<rt>おお</rt></ruby>きくなり、<ruby>社員<rt>しゃいん</rt></ruby>の<ruby>数<rt>かず</rt></ruby>は１００<ruby>人<rt>にん</rt></ruby>にまで<ruby>増<rt>ふ</rt></ruby>えた。<br>公司逐漸壯大，員工人數增加到一百人之多。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nにでも</b>",
            "「連…也」、「…之類的也可以」",
            "だれ・N＋にでも",
            "<ruby>誰<rt>だれ</rt></ruby>にでも<ruby>親切<rt>しんせつ</rt></ruby>で<ruby>優<rt>やさ</rt></ruby>しい<ruby>兄<rt>あに</rt></ruby>をとても<ruby>尊敬<rt>そんけい</rt></ruby>している。<br>我非常尊敬對誰都親切溫柔的哥哥。"
          ],
          [
            "<b class=\"font-extrabold text-accent\">Nからなら</b>",
            "「如果從…開始的話」限定條件",
            "<ruby>時間<rt>じかん</rt></ruby>＋からなら",
            "<ruby>午後<rt>ごご</rt></ruby>からなら<ruby>行<rt>い</rt></ruby>けますが、それでも<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですか。<br>下午以後的話可以去，這樣也可以嗎？"
          ]
        ]
      },
      {
        "kind": "note",
        "text": "<b>為什麼「にしか」「でしか」這樣接</b><br>「しか」是副助詞，後面一定要否定<br>「が」「を」會被「しか」取代（野菜を→野菜しか）<br>其他格助詞（に・で・と・から・まで）要留下，因為它們決定名詞跟動詞的關係，「しか」疊在後面<br>所以對象「に」→「にしか」，手段「で」→「でしか」，共同「と」→「としか」，起點「から」→「からしか」，終點「まで」→「までしか」<br><b>為什麼不選「にだけ」「からだけ」</b>：後面是否定（行きません、ございません），「だけ」不搭否定，所以要選「しか」<br><b>からの vs の</b>：「から」表示來源，要修飾後面名詞就加「の」變「からの」<br>「外国の観光客」只說國籍，「外国からの観光客」強調「從外國來」<br>同理「で→での」「と→との」「へ→への」，但「を」「が」不能加「の」<br><b>までに vs にまで</b>：順序不同意思不同<br>「までに」是期限（來週までに）<br>「にまで」是程度極端（100人にまで増えた），不能互換<br><b>にでも</b>：「誰にでも」是「對誰都」，「に」是對象，「でも」是全面肯定"
      }
    ]
  },
  {
    "id": "p-solve",
    "title": "助詞題的解法",
    "hint": "",
    "blocks": [
      {
        "kind": "note",
        "text": "<b>1.</b> 先看前面名詞與後面動詞的關係<br>是動作的場所（で）、到達點（に）、對象（に・と）、還是受詞（を）<br><b>2.</b> 再看有沒有固定搭配<br>「を中心に」「をしている」「のことで」「について」「としか」「からの」等，後面或前面的詞會直接決定答案<br><b>3.</b> 看後面是否為否定<br>否定→「しか」「にしか」「でしか」「までしか」，而不是「だけ」<br><b>4.</b> 最後看語意<br>強調「多」→「も」，強調「連…都」→「さえ」「まで」，強調「正是」→「こそ」<br><b>5.</b> 代入整句確認<br>修飾名詞時要想到「から→からの」「で→での」，句首的「〜は」常是主題，確認後面有沒有對比"
      },
      {
        "kind": "dos",
        "items": [
          {
            "wrong": "<ruby>山下課長<rt>やましたかちょう</rt></ruby>にだけお<ruby>目<rt>め</rt></ruby>にかかったことがございません",
            "right": "<ruby>山下課長<rt>やましたかちょう</rt></ruby>にしかお<ruby>目<rt>め</rt></ruby>にかかったことがございません",
            "why": "後面是否定，一定要用「しか」，不能用「だけ」"
          },
          {
            "wrong": "<ruby>北山公園<rt>きたやまこうえん</rt></ruby>に<ruby>夏祭<rt>なつまつ</rt></ruby>りが<ruby>行<rt>おこな</rt></ruby>われました",
            "right": "<ruby>北山公園<rt>きたやまこうえん</rt></ruby>において<ruby>夏祭<rt>なつまつ</rt></ruby>りが<ruby>行<rt>おこな</rt></ruby>われました",
            "why": "「行われる」是活動舉行的場所，用「で／において」，不用「に」"
          },
          {
            "wrong": "バスの<ruby>運転手<rt>うんてんしゅ</rt></ruby>にとって<ruby>働<rt>はたら</rt></ruby>いている",
            "right": "バスの<ruby>運転手<rt>うんてんしゅ</rt></ruby>として<ruby>働<rt>はたら</rt></ruby>いている",
            "why": "身分、資格用「として」；「にとって」是評價的立場，後面接形容詞或判斷"
          },
          {
            "wrong": "<ruby>外国<rt>がいこく</rt></ruby>から<ruby>観光客<rt>かんこうきゃく</rt></ruby>にも<ruby>人気<rt>にんき</rt></ruby>がある",
            "right": "<ruby>外国<rt>がいこく</rt></ruby>からの<ruby>観光客<rt>かんこうきゃく</rt></ruby>",
            "why": "名詞前要加「の」才能修飾名詞，單用「から」「で」接不到名詞"
          }
        ]
      }
    ]
  }
];
