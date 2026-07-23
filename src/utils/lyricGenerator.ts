import { SongResult, GachaRequest } from "../types";

// エレガント・エモーショナルな楽曲タイトル生成関数
export function generateCreativeTitle(theme: string, genre: string, isDemo: boolean = false): string {
  const poeticPrefixes = [
    "群青の", "真夜中の", "残響の", "透明な", "流星の", "深海の", "螺旋の", "緋色の",
    "幻影の", "無重力の", "幾千の", "二月の", "さよなら", "微熱の", "月光の", "追憶の",
    "終末の", "淡い", "境界の", "静寂に揺れる", "星降る夜の", "解き放たれた", "歪んだ",
    "ネオンの", "虚構の", "最果ての", "泡沫の", "残照の", "白夜の", "硝子の"
  ];
  
  const poeticNouns = [
    "パノラマ", "クロノスタシス", "シルエット", "エンドロール", "プロトコル", "ノスタルジー",
    "アリア", "モノローグ", "デイズ", "シグナル", "レゾナンス", "グラフィティ", "ディスタンス",
    "クロニクル", "ステラ", "プレリュード", "オデッセイ", "シナリオ", "シンフォニー", "残像",
    "アンセム", "フィナーレ", "ファンタジア", "ディレイ", "カタルシス", "オーロラ"
  ];

  const evocativePhrases = [
    `「${theme}」の向こう側`,
    `君と探した${theme}`,
    `さよなら${theme}`,
    `ラスト・${theme}`,
    `${theme}に咲く花`,
    `${theme}と君のディスタンス`,
    `零れ落ちた${theme}の証明`,
    `夜が明ける前の${theme}`,
    `幾千の${theme}の果てに`,
    `真夜中の${theme}・パレード`,
    `${theme}の残響`,
    `忘却の${theme}`,
    `${theme}に沈む空`,
    `君がくれた${theme}`
  ];

  const englishTitles = [
    `Neon ${theme}`, `Echoes of ${theme}`, `${theme} Horizon`, `Silent ${theme}`,
    `Midnight ${theme}`, `${theme} Synergy`, `Beyond the ${theme}`, `${theme} Spectrum`,
    `Velvet ${theme}`, `Quantum ${theme}`, `${theme} Pulse`, `Fading ${theme}`,
    `Starlight ${theme}`, `Electric ${theme}`
  ];

  const rand = Math.random();
  let rawTitle = "";
  if (rand < 0.35) {
    const p = poeticPrefixes[Math.floor(Math.random() * poeticPrefixes.length)];
    const n = poeticNouns[Math.floor(Math.random() * poeticNouns.length)];
    rawTitle = `${p}${n}`;
  } else if (rand < 0.70) {
    rawTitle = evocativePhrases[Math.floor(Math.random() * evocativePhrases.length)];
  } else {
    rawTitle = englishTitles[Math.floor(Math.random() * englishTitles.length)];
  }

  return isDemo ? `[DEMO] ${rawTitle}` : rawTitle;
}

// フル構成（11セクション）対応・超多様化ダイナミック作詞エンジン
export function generateDynamicFallbackLyrics(
  theme: string,
  genre: string,
  gender: string,
  tempo: string = "",
  mood: string = ""
): { title: string; lyrics: string; style_prompt: string; bpm: string; key: string } {
  const title = generateCreativeTitle(theme, genre, true);
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // ジャンル感に応じたインスト演奏指示
  const introPool = [
    `(Soft piano arpeggio fading in, ambient synth pads)`,
    `(Heavy distorted guitar riff with driving 4-on-the-floor drums)`,
    `(Retro 80s synthwave bassline pulsing in the dark)`,
    `(Muted acoustic guitar chord strumming with vinyl crackle noise)`,
    `(Vocaloid synth lead melody playing a fast melancholic phrase)`,
    `(Punchy EDM sidechain bass drop with soaring melody prelude)`,
    `(Lo-fi chill beat with gentle electric piano keys)`,
    `(Orchestral strings building up to a dramatic crescendo)`
  ];

  // 1番 Aメロ (Verse 1) - 多様なシチュエーション 8通り
  const verse1Pool = [
    [
      `静寂を切り裂く　${theme}の気配`,
      `アスファルトを濡らす　かすかな雨音に`,
      `伸ばした手のひら　すり抜ける光`,
      `交差する街並みの中で　一人佇んでいた`
    ],
    [
      `時計の針が刻む　${theme}の律動`,
      `ネオンの海に浮かんでは消える影`,
      `誰も知らない秘密のフレーズ`,
      `胸の奥でひっそりと息を潜めている`
    ],
    [
      `風が運んできた　${theme}の予感`,
      `見上げた空　滲む星の輝き`,
      `言葉にできない感情の渦が`,
      `静かに色を変えて広がっていく`
    ],
    [
      `ガラス越しに映る　${theme}の残像`,
      `冷めたコーヒーを握りしめたまま`,
      `途切れた記憶の先を探している`,
      `あの日選ばなかった選択肢の答えを`
    ],
    [
      `サイレンの音に溶ける　${theme}の歌`,
      `摩天楼の影で　光を求める鼓動`,
      `すれ違う人々の足音が早くなり`,
      `私だけが取り残された世界で`
    ],
    [
      `教科書の隅に描いた　${theme}のグラフィティ`,
      `チャイムの音が聞こえないフリをして`,
      `窓の外を流れる雲を追いかけた`,
      `退屈な日常を飛び出す準備はできている`
    ],
    [
      `デジタルな世界に漂う　${theme}の信号`,
      `ノイズ混じりのメッセージを拾い集めて`,
      `画面の向こう側の君に届くように`,
      `キーボードの上に言葉を叩きつける`
    ],
    [
      `波打ち際で消えた　${theme}の足跡`,
      `潮風が髪を揺らし　記憶を呼び覚ます`,
      `遠い日の約束は今も色褪せず`,
      `水平線の彼方へ心を運んでゆく`
    ]
  ];

  // 1番 Bメロ (Pre-Chorus 1) - 8通り
  const preChorus1Pool = [
    [
      `戸惑いも迷いも　すべて包み込んで`,
      `踏み出す一歩が　世界を塗り替える`
    ],
    [
      `もう振り返らないと　心に決めたから`,
      `解き放たれる衝動　解き放つシグナル`
    ],
    [
      `かすかな期待が　熱を帯びていく`,
      `始まる物語のページをめくるように`
    ],
    [
      `加速する鼓動　引き止められない`,
      `限界の向こう側へ　手を伸ばす`
    ],
    [
      `押し殺した声が　叫びたがっている`,
      `偽りの仮面を脱ぎ捨てる瞬間`
    ],
    [
      `重なり合う視線が　火花を散らす`,
      `運命のギアが静かに動き始める`
    ],
    [
      `引き返せない境界線を踏み越えて`,
      `未知なる場所へと感情が走り出す`
    ],
    [
      `ため息を吹き消して　前を見つめる`,
      `準備はいいかい？　カウントダウンが響く`
    ]
  ];

  // 1番 サビ (Chorus 1) - 8通り
  const chorus1Pool = [
    [
      `響け ${theme}！ どこまでも高く`,
      `${genre}のビートに乗せて未来を叫ぶよ`,
      `解き放たれた光が　闇を切り裂いて`,
      `僕らの明日を　鮮やかに照らし出す`
    ],
    [
      `求めていたのは　${theme}の証明`,
      `重なるシンパシー　共鳴するこの声で`,
      `誰にも奪えない　真実を刻みつけろ`,
      `二度と来ない今を　全力で走り抜けたい`
    ],
    [
      `舞い上がれ ${theme}！ 風を追い越して`,
      `信じたメロディ　世界中に届くまで`,
      `涙の数だけ　強く輝けるから`,
      `終わりなき夢を　君とともに叶えよう`
    ],
    [
      `燃え上がる ${theme}！ 溢れる情熱で`,
      `${genre}のアンセムを胸に刻み込め`,
      `途切れない絆が　僕らを繋いでいる`,
      `この夜の果てへ　解き放てストーリー`
    ],
    [
      `解き放て ${theme}！ 叫びの渦へ`,
      `世界が変わる瞬間を　見逃すな`,
      `震える胸の鼓動が　導く方角へ`,
      `恐れを捨てて　飛び込んでいけ`
    ],
    [
      `叫べ ${theme}！ 夜空を突き破り`,
      `輝く星よりも　強く眩しく`,
      `君の笑顔が　僕の勇気になるから`,
      `奇跡の向こうへ　駆け抜けて行こう`
    ],
    [
      `溢れ出す ${theme}！ 抑えきれないメロディ`,
      `この旋律が世界を塗り替えてゆく`,
      `繋いだ手と手を　強く握りしめて`,
      `終わらない歌を　奏で続けよう`
    ],
    [
      `貫け ${theme}！ 嵐の中で`,
      `倒れても何度でも立ち上がるんだ`,
      `信じた道が　正解に変わるまで`,
      `胸の中の火を　絶対に絶やすな`
    ]
  ];

  // 2番 Aメロ (Verse 2) - 8通り
  const verse2Pool = [
    [
      `すれ違う人波を　かき分けて進む`,
      `重ねた失敗も　足跡に変わっていく`,
      `握りしめた拳のぬくもりを信じて`,
      `自分だけの答えを　描き続けている`
    ],
    [
      `ビル風が吹き抜ける　交差点の真ん中で`,
      `描いた地図の続きを　確かめ合っていた`,
      `傷つくことを恐れた　昨日の僕にバイバイ`,
      `新しい空を仰ぎ息を深く吸い込む`
    ],
    [
      `遠ざかる過去のノイズを　振り払うように`,
      `まっすぐな眼差しで　明日を見つめる`,
      `小さな光でも　集まれば輝きになる`,
      `僕らの歩幅で　一歩ずつ前へ`
    ],
    [
      `濡れた路地に揺れる　街灯の明かり`,
      `影が長く伸びて　夜の深さを教える`,
      `言葉に出さなくても　通じ合える気がした`,
      `沈黙の中に響く　確かな信頼`
    ],
    [
      `スマートフォンの画面を　何度もスクロール`,
      `情報に埋もれそうな　真実を探す`,
      `君からの短くて温かいメッセージ`,
      `それだけで胸が　すっと軽くなった`
    ],
    [
      `擦り切れたレコードが　奏でるノスタルジー`,
      `過ぎ去った思い出が　セピア色に染まる`,
      `あの日泣いた理由も　今は愛おしくて`,
      `優しく目を閉じ　微笑みを浮かべる`
    ],
    [
      `ヘッドフォンから流れる　アップテンポなリズム`,
      `雑音だらけの街を　僕のステージに変える`,
      `ステップを踏み鳴らし　軽やかに進もう`,
      `誰も邪魔できない　秘密のランウェイ`
    ],
    [
      `深夜二時の静寂　世界が眠る時間に`,
      `キャンバスの上に描く　色とりどりの想い`,
      `朝焼けが差し込むまで　描く手を止めない`,
      `僕だけの世界が　形になってゆく`
    ]
  ];

  // 2番 Bメロ (Pre-Chorus 2) - 8通り
  const preChorus2Pool = [
    [
      `途切れた夢の欠片　ひとつずつ繋ぎ合わせて`,
      `静かに熱を帯びていく　抑えきれない情熱`
    ],
    [
      `かすかな期待が　確信へと変わるとき`,
      `加速する鼓動が　限界の壁をぶち破る`
    ],
    [
      `迷いや躊躇いを　すべて風に吹き飛ばして`,
      `瞳に宿る炎が　闇を打ち払う`
    ],
    [
      `誰かの期待に応えるためじゃない`,
      `自分が自分らしくあるために生きていく`
    ],
    [
      `背中を押してくれる　君の声が聞こえる`,
      `もう何も怖くない　飛び立つ時が来た`
    ],
    [
      `抑えつけていた感情が　溢れ出しそう`,
      `爆発する限界突破の瞬間に向かって`
    ],
    [
      `暗闇を切り裂いて差し込む　一筋の光`,
      `希望のルートを　見つけ出したんだ`
    ],
    [
      `世界が僕らを否定したとしても`,
      `この熱量だけは　誰にも消せやしない`
    ]
  ];

  // 2番 サビ (Chorus 2) - 8通り
  const chorus2Pool = [
    [
      `舞い上がれ ${theme}！ 風を追い越して`,
      `信じたメロディ　世界中に届くまで`,
      `涙の数だけ　強く輝けるから`,
      `終わりなき夢を　君とともに叶えよう`
    ],
    [
      `燃え上がる ${theme}！ 溢れる情熱で`,
      `${genre}のアンセムを胸に刻み込め`,
      `途切れない絆が　僕らを繋いでいる`,
      `この夜の果てへ　解き放てストーリー`
    ],
    [
      `輝け ${theme}！ 満天の星の下で`,
      `二度とない奇跡を　この手に引き寄せて`,
      `笑い合えた時間が　宝物になるから`,
      `どこまでも高く　羽ばたいて行こう`
    ],
    [
      `轟け ${theme}！ 大地を揺らして`,
      `押し寄せる波を　飲み込むほどのパワーで`,
      `自分の生き様を　世界に見せつけるんだ`,
      `立ち止まるヒマなんて　1秒もない`
    ],
    [
      `奏でろ ${theme}！ 至高のハーモニー`,
      `心と心が重なり合うこの場所で`,
      `最高の時間を　君と共有したい`,
      `歓喜の歌声が　空へと解き放たれる`
    ],
    [
      `走り出せ ${theme}！ 未知なる地平線へ`,
      `描いた理想を　現実へと変えていく`,
      `どんな壁だって　壊してみせるから`,
      `手を繋いで　どこまでも行こう`
    ],
    [
      `煌めけ ${theme}！ 虹色の光で`,
      `憂鬱な気分も　吹き飛ばしてしまうくらい`,
      `弾けるような笑顔が　世界を救うんだ`,
      `ハッピーな予感が　止まらない`
    ],
    [
      `届いて ${theme}！ 遥かな君の元へ`,
      `離れていても　同じ空を見上げている`,
      `想いの強さが　距離をゼロにするから`,
      `歌い続けるよ　君のためにずっと`
    ]
  ];

  // Cメロ (Bridge) - 8通り
  const bridgePool = [
    [
      `たとえ世界が　明日終わるとしても`,
      `この歌声だけは　消えはしない`,
      `君と出逢えた奇跡を　誇りに思うから`
    ],
    [
      `暗闇の中でこそ　見える星がある`,
      `迷い抜いた夜の数だけ　強くなれる`,
      `ここから始まる　新しい時代へ`
    ],
    [
      `言葉を超えて　心に直接語りかける`,
      `溢れ出すメロディが　奇跡を呼び覚ます`,
      `さあ、解き放とう　解き放たれた未来へ`
    ],
    [
      `時に傷つき立ち止まることもあったけれど`,
      `孤独な夜を乗り越えて　僕らは強くなった`,
      `さあ目を開けて　光の差す方へ`
    ],
    [
      `忘れないで　君は一人じゃない`,
      `いつでもこの歌が　君のそばにいる`,
      `信じた道を進めばいい`
    ],
    [
      `時間が止まったかのような　静寂の中で`,
      `互いの胸の鼓動だけが　確かに聞こえる`,
      `息をのんで　次の瞬間へ`
    ],
    [
      `砕け散ったガラス細工のような夢でも`,
      `光を反射して　美しく輝く`,
      `何度も作り直せばいい`
    ],
    [
      `過去を悔やむより　未来を恐れるより`,
      `「今」この瞬間を　愛し抜くんだ`,
      `僕らの生きる意味が　ここにある`
    ]
  ];

  // ソロ演奏指示 (Solo) - 8通り
  const soloPool = [
    `(Powerful Electric Guitar Solo screaming with overdrive and wah-wah)`,
    `(Epic Synthesizer Solo with fast arpeggios and high octave pitch bends)`,
    `(Slap Bass Breakdown Solo followed by aggressive drum fill)`,
    `(Emotional Saxophone Solo blending with lush rhodes chords)`,
    `(Vocaloid Fast Lead Synth Solo tearing through the beat)`,
    `(Violin & Strings Fast Solo with dramatic classical influence)`,
    `(Acoustic Guitar Fingerpicking Solo with subtle percussion)`,
    `(Heavy Industrial Distortion Drop & Drums Breakdown)`
  ];

  // ラスサビ (Final Chorus) - 8通り
  const finalChorusPool = [
    [
      `叫べ ${theme}！ 幾千の夜を超えて`,
      `響き渡る声が　奇跡を呼び覚ます`,
      `二度と離さない　この手を繋ぎしめて`,
      `新しい光のほうへ　共に走り出そう`
    ],
    [
      `解き放て ${theme}！ 限界を超えた先へ`,
      `僕らの情熱が　新しい時代を作る`,
      `最高の笑顔で　この瞬間を刻もう`,
      `終わらないストーリーを　どこまでも`
    ],
    [
      `歌い踊れ ${theme}！ 歓喜の渦の中で`,
      `すべての悲しみを　光へと変えてゆく`,
      `巡り会えた幸せを　噛み締めながら`,
      `最高のフィナーレを　迎えよう`
    ],
    [
      `勝ち取れ ${theme}！ 諦めなかった証`,
      `困難を乗り越えて　辿り着いた頂上`,
      `見下ろす景色は　こんなにも美しい`,
      `僕らの勝利の歌を　轟かせろ`
    ],
    [
      `繋がれ ${theme}！ 世界中の心へ`,
      `国境も言葉も　飛び越えて届いていく`,
      `一つの大きな　光の輪になって`,
      `愛と平和の歌を　解き放とう`
    ],
    [
      `燃やし尽くせ ${theme}！ 命の輝きを`,
      `全開のエネルギーで　駆け抜ける今`,
      `悔いは何もない　全力を出し切った`,
      `眩しいほどの光となって`
    ],
    [
      `永遠に ${theme}！ 僕らの心の中で`,
      `時間が過ぎ去っても　色褪せないメロディ`,
      `いつでもここに戻ってくればいい`,
      `愛するこの場所で　待っているから`
    ],
    [
      `愛を込めて ${theme}！ 君に贈るアンセム`,
      `出逢ってくれて　本当にありがとう`,
      `これから始まる　新しい毎日へ`,
      `希望の光を抱いて　進もう`
    ]
  ];

  // アウトロ (Outro) - 8通り
  const outroPool = [
    [
      `ずっと奏で続けよう`,
      `${theme}とともに、どこまでも`,
      `響き渡る声が　明日の光へ`,
      `(Fade out with ambient synth echo)`
    ],
    [
      `La La La... 心を込めて`,
      `${theme}の歌を未来へ届けて`,
      `ありがとう、この場所で`,
      `(End with heavy final drum hit)`
    ],
    [
      `さよならは言わないよ`,
      `またここで逢えるから`,
      `${theme}を抱きしめて`,
      `(Gentle acoustic guitar chord fading out)`
    ],
    [
      `明日へ踏み出そう`,
      `輝く未来が待っている`,
      `${theme}の光とともに`,
      `(Piano melody fading slowly into silence)`
    ],
    [
      `Yeah... 終わらない旅へ`,
      `僕らの ${theme} は続いていく`,
      `Keep on singing forever`,
      `(Distorted guitar feedback ringing out)`
    ],
    [
      `風に乗って遠くへ`,
      `どこまでも響け`,
      `Thank you for the music`,
      `(Vocal chop fade out with delay effect)`
    ],
    [
      `夜が明けてゆく`,
      `新しい朝が始まる`,
      `${theme}の光の中で`,
      `(Strings swelling and resolving to C Major)`
    ],
    [
      `ずっと忘れないよ`,
      `君と過ごしたこの瞬間`,
      `また逢う日まで`,
      `(Single synth chime ringing into absolute silence)`
    ]
  ];

  const intro = pick(introPool);
  const v1 = pick(verse1Pool).join("\n");
  const pre1 = pick(preChorus1Pool).join("\n");
  const c1 = pick(chorus1Pool).join("\n");
  const v2 = pick(verse2Pool).join("\n");
  const pre2 = pick(preChorus2Pool).join("\n");
  const c2 = pick(chorus2Pool).join("\n");
  const bridge = pick(bridgePool).join("\n");
  const solo = pick(soloPool);
  const fc = pick(finalChorusPool).join("\n");
  const outro = pick(outroPool).join("\n");

  const lyrics = `[Intro]\n${intro}\n\n[Verse 1]\n${v1}\n\n[Pre-Chorus]\n${pre1}\n\n[Chorus]\n${c1}\n\n[Verse 2]\n${v2}\n\n[Pre-Chorus]\n${pre2}\n\n[Chorus]\n${c2}\n\n[Bridge]\n${bridge}\n\n[Solo]\n${solo}\n\n[Final Chorus]\n${fc}\n\n[Outro]\n${outro}`;

  const vocalTag = gender.includes("男性")
    ? "male vocal"
    : gender.includes("女性")
    ? "female vocal"
    : "duet vocal";

  const style_prompt = `${genre}, ${vocalTag}, ${tempo || "fast tempo"}, ${mood || "energetic, emotional"}, full arrangement, catchy melody, punchy drums, synth bass, professional production`;

  const bpms = ["120 BPM", "128 BPM", "135 BPM", "140 BPM", "115 BPM", "125 BPM"];
  const keys = ["C Major", "A Minor", "G Major", "E Minor", "F Major", "D Minor"];

  return {
    title,
    lyrics,
    style_prompt,
    bpm: pick(bpms),
    key: pick(keys)
  };
}

// 直接 REST API で Gemini API を呼び出す信頼性の高い非同期関数
async function callGeminiDirectRest(apiKey: string, prompt: string, systemInstruction: string): Promise<any> {
  const cleanKey = apiKey.replace(/["'\s]/g, "");
  if (!cleanKey || cleanKey.length < 10) {
    throw new Error("無効なAPIキーフォーマットです。AI Studioのキー(AIzaSy...)を入力してください。");
  }

  const models = ["gemini-1.5-flash", "gemini-2.0-flash-exp", "gemini-1.5-pro"];
  let lastErrorText = "";

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemInstruction}\n\n【必須出力フォーマット】\n以下のJSONオブジェクト形式でのみ出力してください：\n{\n  "title": "（ここに詩的で洗練されたオリジナルのタイトル）",\n  "lyrics": "（ここに[Intro], [Verse 1], [Chorus]等を含む本格フル歌詞）",\n  "style_prompt": "（ここに英文カンマ区切りスタイルのプロンプト）",\n  "bpm": "128 BPM",\n  "key": "C Major"\n}\n\n${prompt}` }]
            }
          ]
        })
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const errMsg = errorJson.error?.message || res.statusText || `HTTP ${res.status}`;
        console.warn(`Gemini API (${model}) failed: ${errMsg}`);
        lastErrorText = errMsg;
        continue;
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const cleanedText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanedText);
        if (parsed && parsed.title && parsed.lyrics) {
          return parsed;
        }
      }
    } catch (err: any) {
      console.warn(`Error invoking Gemini model ${model}:`, err);
      lastErrorText = err.message || "通信エラー";
    }
  }

  throw new Error(lastErrorText || "Gemini APIキーが無効か上限に達しています。");
}

// メイン生成エントリポイント
export async function generateSongWithAiOrFallback(
  request: GachaRequest,
  userApiKey?: string
): Promise<SongResult> {
  const apiKey = (userApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || "").trim();
  const { theme, genre, gender, tempo = "", mood = "", additionalNotes = "" } = request;

  // 1. APIキーが提供されている場合は直接 Gemini REST API を呼び出し
  if (apiKey && apiKey.length > 5) {
    try {
      console.log("Calling Gemini API directly from browser with user API key...");
      const systemInstruction = `あなたはプロの作詞家であり、日本を代表する最高峰の音楽プロデューサーです。
ユーザーから渡された「テーマ」「ジャンル」「性別」などのキーワードに基づき、Suno AI用の本格フル楽曲の「タイトル」「歌詞」「スタイルプロンプト」を作成してください。

【最重要：歌詞の重複防止とオリジナル表現】
過去の定型フレーズ（「静かに流れる時間の中で」「すれ違う人波」など）は絶対に使用せず、テーマに応じた100%完全オリジナルの印象的で情緒豊かなフレーズを一から生み出してください。

【重要：構成ルール】
必ず以下の「本格フル楽曲構成（11セクション）」で長大・充実した歌詞を作成してください。
1. [Intro]（前奏・インスト指示）
2. [Verse 1]（1番 Aメロ）
3. [Pre-Chorus]（1番 Bメロ）
4. [Chorus]（1番 サビ）
5. [Verse 2]（2番 Aメロ）
6. [Pre-Chorus]（2番 Bメロ）
7. [Chorus]（2番 サビ）
8. [Bridge]（Cメロ・展開部）
9. [Guitar Solo] または [Synth Solo]（間奏インストソロ指示）
10. [Final Chorus]（ラスサビ・大サビ）
11. [Outro]（アウトロ・後奏）

【ルール】
1. タイトル (title):
   - 「${theme}の${genre}」のような単調で安直な命名や「[DEMO]」などの文字を入れることは絶対に禁止です。
   - 楽曲の世界観やストーリーが深く感じられる、最高に詩的で洗練されたオリジナルのタイトルを考案してください。
2. 歌詞 (lyrics):
   - 語り・ナレーションは含めず、純粋な歌唱用歌詞（メロディに乗るフレーズ）のみで構成してください。
   - 日本語で情緒豊かに深く書き込んでください。
3. スタイルプロンプト (style_prompt):
   - Suno AIで高クオリティなフル楽曲を生成するためのカンマ区切りの英文プロンプトを120文字程度で作成してください。`;

      const userPrompt = `【曲のパラメータ】
- テーマ: ${theme}
- ジャンル: ${genre}
- 性別（ボーカル）: ${gender}
${tempo ? `- テンポ: ${tempo}` : ""}
${mood ? `- 雰囲気: ${mood}` : ""}
${additionalNotes ? `- 追加の要件: ${additionalNotes}` : ""}

指定のJSONフォーマットで出力してください。`;

      const data = await callGeminiDirectRest(apiKey, userPrompt, systemInstruction);

      if (data && data.lyrics && data.title) {
        console.log("Gemini API call succeeded!", data);
        const cleanTitle = data.title.replace(/\[DEMO\]/gi, "").trim();
        return {
          id: "song_" + Date.now(),
          title: cleanTitle,
          lyrics: data.lyrics,
          style_prompt: data.style_prompt,
          bpm: data.bpm || "128 BPM",
          key: data.key || "C Major",
          createdAt: Date.now(),
          isFavorite: false,
          isDemo: false,
          requestParams: request
        };
      }
    } catch (err: any) {
      console.error("Gemini Direct API call failed:", err);
      // 通信エラー時のみわかりやすい通知を画面に出し、DEMO表示に切り替え
      const apiNotice = `⚠️ APIキー通信エラー: ${err.message || 'キーをご確認ください'}。一時的にDEMOモードで動作しています。`;
      const fallbackData = generateDynamicFallbackLyrics(theme, genre, gender, tempo, mood);
      return {
        id: "song_" + Date.now(),
        title: generateCreativeTitle(theme, genre, true),
        lyrics: fallbackData.lyrics,
        style_prompt: fallbackData.style_prompt,
        bpm: fallbackData.bpm,
        key: fallbackData.key,
        createdAt: Date.now(),
        isFavorite: false,
        isDemo: true,
        notice: apiNotice,
        requestParams: request
      };
    }
  }

  // 2. サーバーAPI (/api/generate) にリクエストを試行 (ローカル開発/フルスタック環境)
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ ...request, userApiKey: apiKey })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        id: "song_" + Date.now(),
        title: data.title,
        lyrics: data.lyrics,
        style_prompt: data.style_prompt,
        bpm: data.bpm || "128 BPM",
        key: data.key || "C Major",
        createdAt: Date.now(),
        isFavorite: false,
        isDemo: !apiKey,
        requestParams: request
      };
    }
  } catch (e) {
    console.log("Static environment detected, using dynamic fallback lyric engine.");
  }

  // 3. APIキー未設定の場合のDEMOジェネレーター
  const fallbackData = generateDynamicFallbackLyrics(theme, genre, gender, tempo, mood);
  return {
    id: "song_" + Date.now(),
    title: fallbackData.title,
    lyrics: fallbackData.lyrics,
    style_prompt: fallbackData.style_prompt,
    bpm: fallbackData.bpm,
    key: fallbackData.key,
    createdAt: Date.now(),
    isFavorite: false,
    isDemo: true,
    notice: "※現在はDEMO（サンプル）形式です。画面上部にGemini APIキーを設定すると、AIが毎回完全オリジナルの高クオリティなフル歌詞を即座に生成します。",
    requestParams: request
  };
}
