// Models
import type {
  KeigoFormCard,
  KeigoGiveReceiveRow,
  KeigoHumbleRow,
  KeigoMistake,
  KeigoQuickRow,
  KeigoStep,
} from '../../grammar-review.model';

/** 判斷步驟：考敬語題的解法 */
export const KEIGO_STEPS: KeigoStep[] = [
  { no: 1, title: '先找「誰做的動作」', body: '先看動作的人，不要先看動詞長相。' },
  { no: 2, title: '對方 → 尊敬語；自己 → 謙讓語', body: '對方做的動作抬高他；自己這一方做的動作壓低自己。' },
  { no: 3, title: '只想客氣 → 丁寧語・丁重語', body: '與對方無關：用です・ます；鄭重說自己的事：参る・申す・いたす・おる。' },
];

/** 同一個動作、不同人做 → 要用哪一種（考題最常見的判斷） */
export const KEIGO_QUICK_ROWS: KeigoQuickRow[] = [
  { situation: '客人（對方）來', answer: 'いらっしゃる／お越しになる／お見えになる', kind: 'sonkei' },
  { situation: '我去對方那裡拜訪', answer: '伺う', kind: 'kenjou' },
  { situation: '客人說', answer: 'おっしゃる', kind: 'sonkei' },
  { situation: '我說（對客人）', answer: '申し上げる', kind: 'kenjou' },
  { situation: '客人吃、喝', answer: '召し上がる', kind: 'sonkei' },
  { situation: '我吃、喝（收下）', answer: 'いただく', kind: 'kenjou' },
  { situation: '老師看', answer: 'ご覧になる', kind: 'sonkei' },
  { situation: '我看（對方的東西）', answer: '拝見する', kind: 'kenjou' },
  { situation: '社長在（對方問我公司的人）', answer: 'おります', kind: 'kenjou' },
];

/** 謙讓語Ⅰ（向動作對象）／謙讓語Ⅱ（丁重語，向聽者） */
export const KEIGO_HUMBLE_ROWS: KeigoHumbleRow[] = [
  { plain: '行く・来る', type1: '伺う（拜訪的對象是對方）', type2: '参る' },
  { plain: '言う', type1: '申し上げる（對象是對方）', type2: '申す' },
  { plain: 'する', type1: 'お／ご〜する', type2: 'いたす' },
  { plain: 'いる', type1: '—', type2: 'おる' },
  { plain: '知る', type1: '存じ上げる（認識某人）', type2: '存じる（知道某事）' },
  { plain: '聞く', type1: '伺う・承る', type2: '—' },
  { plain: '見る', type1: '拝見する', type2: '—' },
  { plain: '会う', type1: 'お目にかかる', type2: '—' },
  { plain: 'あげる', type1: '差し上げる', type2: '—' },
  { plain: 'もらう', type1: 'いただく・頂戴する', type2: '—' },
];

/** 授受表現的敬語 */
export const KEIGO_GIVE_RECEIVE_ROWS: KeigoGiveReceiveRow[] = [
  {
    direction: '對方給我',
    plain: 'くれる',
    keigo: 'くださる',
    kind: 'sonkei',
    subject: '主語是對方',
    withTe: '〜てくれる → 〜てくださる／お・ご〜くださる',
    example: '先生が資料を送ってくださいました。',
  },
  {
    direction: '我給對方',
    plain: 'あげる',
    keigo: '差し上げる',
    kind: 'kenjou',
    subject: '主語是我',
    withTe: '〜てあげる → お・ご〜する（自然）／〜て差し上げる（恩惠感強）',
    example: 'お客様に資料をお送りしました。',
  },
  {
    direction: '我從對方得到',
    plain: 'もらう',
    keigo: 'いただく・頂戴する',
    kind: 'kenjou',
    subject: '主語是我',
    withTe: '〜てもらう → 〜ていただく／お・ご〜いただく',
    example: '先生に資料を送っていただきました。',
  },
];

/** 判斷授受敬語的口訣 */
export const KEIGO_GIVE_RECEIVE_TIP =
  '看主語：\n「くださる」→ 對方做的動作\n「いただく」「差し上げる」→ 我做的動作\n「先生が教えてくださった」＝「先生に教えていただいた」，意思相同，只是主語不同';

/** お／ご〜 各種形式 */
export const KEIGO_FORM_CARDS: KeigoFormCard[] = [
  {
    form: 'お／ご＋ます形・漢語＋です',
    kind: '尊敬語',
    meaning: '表示對方「正在做／處於某狀態」，常用在接待、通報。',
    examples: ['山下様がお待ちです。', '社長はお出かけです。', '課長はご存じです。', 'お客様がお見えです。'],
    note: '「お待ちです」是「正在等」的狀態；「お待ちになる」是一般的尊敬動詞形。主語一定是對方。',
  },
  {
    form: 'お／ご＋ます形・漢語＋ください',
    kind: '尊敬語（請求）',
    meaning: '請對方做某事，比「〜てください」鄭重。',
    examples: ['こちらでお待ちください。', 'ご確認ください。', 'お越しくださいませ。'],
    note: '「〜てくださる」的名詞化形是「お／ご〜くださる」（お越しくださる）。',
  },
  {
    form: 'お／ご＋ます形・漢語＋になる',
    kind: '尊敬語',
    meaning: '對方的動作。和動詞的尊敬形「〜れる・られる」相比，更鄭重。',
    examples: ['部長が新聞をお読みになる。', 'ご利用になる。'],
    note: '一音節的動詞（見る・いる・着る・寝る）不套這個形式\n要用特殊形：ご覧になる、いらっしゃる、お召しになる、お休みになる',
  },
  {
    form: 'お／ご＋ます形・漢語＋する（いたす）',
    kind: '謙讓語Ⅰ',
    meaning: '我為對方做的動作；「いたす」比「する」更鄭重。',
    examples: ['お荷物をお持ちします。', 'ご案内いたします。', 'お届けします。'],
    note: '動作要有「對方」這個對象才成立；和對方無關的動作用丁重語（参る・申す…）。',
  },
];

/** 丁寧語・丁重語（對聽者鄭重） */
export const KEIGO_POLITE_CARDS: KeigoFormCard[] = [
  {
    form: 'ございます／でございます',
    kind: '丁寧語（比です・ます更鄭重）',
    meaning: '「ございます」＝あります；「でございます」＝です。',
    examples: ['こちらが受付でございます。', '資料はこちらにございます。', '申し訳ございません。'],
    note: '「ございます」只能用在物品、事情、場所，不能用在對方的動作（對方「在」要說いらっしゃいます）。',
  },
  {
    form: 'おります／〜ております',
    kind: '丁重語（謙讓語Ⅱ）',
    meaning: '「おる」＝いる，「〜ておる」＝〜ている，只用在自己或自己人。',
    examples: ['ただいま席を外しております。', '山田は外出しております。', '今、部屋におります。'],
    note: '對方的狀態不能用おります：×部長がおります → ○部長がいらっしゃいます。',
  },
  {
    form: '参ります・申します・いたします',
    kind: '丁重語（謙讓語Ⅱ）',
    meaning: '不需要動作的對象，直接向聽者鄭重地說自己的事。',
    examples: ['明日、東京に参ります。', '私は田中と申します。', 'すぐに確認いたします。'],
    note: '「先生の家に伺います」（對象是老師，抬高老師）與「明日、東京に参ります」（只是鄭重）不同。',
  },
];

/** 「〜させていただく」 */
export const KEIGO_SASETE_CARD: KeigoFormCard = {
  form: '動詞ない形＋(さ)せていただく',
  kind: '謙讓語',
  meaning: '「請讓我做〜」：自己做某件事，而且事前取得對方的許可，或是受到對方恩惠才得以做。',
  examples: ['写真を撮らせていただけませんか。', '資料を使わせていただきます。', '本日はお休みをいただきます。'],
  note:
    '條件：（1）動作是自己做的　（2）有取得許可或受到恩惠的語意\n自己能決定、不需許可的事，用「〜いたします」更自然\n　例：私が説明させていただきます → 私がご説明いたします\n到處用「〜させていただく」會顯得過度低姿態\n請求許可：〜させていただけませんか／〜させてください',
};

/** 二重敬語・常見錯誤 */
export const KEIGO_MISTAKES: KeigoMistake[] = [
  { wrong: 'お読みになられる', right: 'お読みになる／読まれる', reason: '「お〜になる」已是尊敬語，再加「れる」是二重敬語，只用其中一種。' },
  { wrong: 'おっしゃられる', right: 'おっしゃる', reason: '「おっしゃる」已是尊敬語，不用再加「られる」。' },
  { wrong: '召し上がられる', right: '召し上がる', reason: '特殊動詞本身就是敬語，不再疊加。' },
  { wrong: 'ご覧になられる', right: 'ご覧になる', reason: '同上，「ご覧になる」已是尊敬語。' },
  { wrong: '部長が参ります／申しました', right: '部長がいらっしゃいます／おっしゃいました', reason: '對方的動作要用尊敬語，参る・申す 是謙讓語，只能用在自己這一方。' },
  { wrong: 'お客様が申しました', right: 'お客様がおっしゃいました', reason: '「申す」是謙讓語，不能用在客人身上。' },
  { wrong: '（對外人）社長がいらっしゃいます', right: '社長の山田は外出しております', reason: '對公司外的人提到自己公司的人，要視為自己這一方，用謙讓語（ウチ・ソト）。' },
  { wrong: '私が先生にお電話をおかけになりました', right: '私が先生にお電話をかけました／お電話いたしました', reason: '「お〜になる」是尊敬語，只能用在對方的動作，不能用在自己的動作。' },
];
