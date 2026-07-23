import { SongResult, GachaRequest } from "../types";

// 2026年最新トレンド感あふれる楽曲タイトル生成関数
export function generateCreativeTitle(theme: string, genre: string, isDemo: boolean = false): string {
  const modernPrefixes = [
    "深夜2時の", "アルゴリズムの", "タイムラインの", "解像度ゼロの", "概念系", "未読無視の",
    "充電2%の", "ノイズ混じりの", "アイロニーな", "サブスク型", "歪んだネオンの", "群青の",
    "真夜中の", "無重力", "ハイパー", "サイバー", "感情レスの", "最果ての", "透明な", "残響の"
  ];
  
  const modernNouns = [
    "ディストピア", "クロノスタシス", "シルエット", "エンドロール", "プロトコル", "ノスタルジー",
    "シグナル", "レゾナンス", "グラフィティ", "ディスタンス", "クロニクル", "ステラ", "プレリュード",
    "シナリオ", "シンフォニー", "残像", "アンセム", "フィナーレ", "カタルシス", "オーロラ",
    "サブスクリプション", "フィードバック", "パノラマ"
  ];

  const evocativePhrases = [
    `「${theme}」の解像度`,
    `深夜2時半の${theme}`,
    `アルゴリズムと${theme}`,
    `未読無視の${theme}`,
    `${theme}シンドローム`,
    `${theme}と君のディスタンス`,
    `概念だけの${theme}`,
    `感情のサブスク：${theme}`,
    `充電2%の${theme}`,
    `真夜中の${theme}・パレード`,
    `${theme}のノイズ`,
    `再生回数ゼロの${theme}`,
    `画面越しの${theme}`,
    `フィルター無しの${theme}`
  ];

  const englishTitles = [
    `Neon ${theme}`, `Echoes of ${theme}`, `${theme} Horizon`, `Silent ${theme}`,
    `Midnight ${theme}`, `${theme} Synergy`, `Beyond the ${theme}`, `${theme} Spectrum`,
    `Velvet ${theme}`, `Quantum ${theme}`, `${theme} Pulse`, `Fading ${theme}`,
    `Starlight ${theme}`, `Electric ${theme}`, `Hyper ${theme}`
  ];

  const rand = Math.random();
  let rawTitle = "";
  if (rand < 0.35) {
    const p = modernPrefixes[Math.floor(Math.random() * modernPrefixes.length)];
    const n = modernNouns[Math.floor(Math.random() * modernNouns.length)];
    rawTitle = `${p}${n}`;
  } else if (rand < 0.70) {
    rawTitle = evocativePhrases[Math.floor(Math.random() * evocativePhrases.length)];
  } else {
    rawTitle = englishTitles[Math.floor(Math.random() * englishTitles.length)];
  }

  return isDemo ? `[DEMO] ${rawTitle}` : rawTitle;
}

// 2026年最新トレンド対応・超多様化プロシージャル作詞エンジン
export function generateDynamicFallbackLyrics(
  theme: string,
  genre: string,
  gender: string,
  tempo: string = "",
  mood: string = ""
): { title: string; lyrics: string; style_prompt: string; bpm: string; key: string } {
  const title = generateCreativeTitle(theme, genre, true);
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // 2026年トレンド感あふれるインスト演出指示
  const introPool = [
    `(Glitchy synth intro with lo-fi vinyl crackle, sidechain compression pulsing)`,
    `(Fast tempo Vocaloid synth lead with driving hyperpop bassline)`,
    `(Chill City-Pop rhodes keyboard groove with muted electric guitar rifs)`,
    `(Aggressive 808 bass drop with distorted synth plucks and vocal chops)`,
    `(Melancholic acoustic guitar strumming layered with ambient reverb pads)`,
    `(Punchy modern J-Rock guitar riff with fast drum breakbeat)`,
    `(Sub-bass pulse with floating stereo synth leads and atmospheric soundscapes)`
  ];

  // 1番 Aメロ (Verse 1) - 2026年最新トレンド表現 8通り
  const verse1Pool = [
    [
      `深夜2時半　タイムラインの底で跳ねる ${theme}`,
      `液晶のブルーライトが　部屋の隅を青く染めてる`,
      `指先ひとつで　リセットできるような日常に`,
      `何かを期待する方が　どうかしてるのかな`
    ],
    [
      `アルゴリズムが叩き出した　解像度低めの ${theme}`,
      `スクロールの手を止めて　意味のない通知を眺めてる`,
      `誰かのバズった感情に　相槌を打つだけの夜`,
      `胸の奥のノイズだけが　ずっと鳴り止まない`
    ],
    [
      `充電残り2%　途切れたシグナルと ${theme}`,
      `都市高速のライトプール　流れてくタクシーの赤い目`,
      `感情のサブスクリプション　解約できないまま`,
      `曖昧な関係性の先を　探している`
    ],
    [
      `フィルター越しの世界で　探していた ${theme}`,
      `流行りのフレーズで飾り立てた　空っぽのメッセージ`,
      `傷つかないためのアイロニー　着こなしたフリをして`,
      `本当の言葉を　飲み込んで佇んでいた`
    ],
    [
      `心拍数140　加速していく ${theme} のビート`,
      `ノイズ混じりの思考回路　ショート寸前のリアリティ`,
      `画面の向こう側の君は　今何を見つめてる？`,
      `届かないシグナルを　暗闇に打ち上げる`
    ],
    [
      `再生回数ゼロの夜に　ひっそり咲いた ${theme}`,
      `冷めた炭酸の泡みたいに　消えてく淡い記憶`,
      `誰かの真似事みたいな人生を　脱ぎ捨てたくて`,
      `ヘッドフォンの音量を　限界まで引き上げた`
    ],
    [
      `未読無視の通知アイコン　滲んで消える ${theme}`,
      `ネオンサインの逆光で　自分の影すら見失う`,
      `言葉のナイフを研ぎ澄ます　深夜のタイムライン`,
      `愛されたいだけの本音を　隠しながら`
    ],
    [
      `概念だけのハッピーエンド　冷めた目で見つめる ${theme}`,
      `予定調和の毎日を　嘲笑うような街のざわめき`,
      `誰も私を定義できない　私ですら分からない`,
      `だからこそ今夜　新しいステップを踏み出す`
    ]
  ];

  // 1番 Bメロ (Pre-Chorus 1) - 8通り
  const preChorus1Pool = [
    [
      `ため息交じりのシニカルな態度も`,
      `衝動の導火線に　火をつけるためのフリ`
    ],
    [
      `いい子ちゃんのフリは　もう今日で終わりにしよう`,
      `本能が叫ぶシグナル　解き放つ瞬間`
    ],
    [
      `嘘と真実の境界線で　踊り明かすだけ`,
      `引き返すルートなんて　最初から消してある`
    ],
    [
      `歪んだ世界に　中指を立てるように`,
      `限界突破のスピードで　駆け抜けていく`
    ],
    [
      `「どうせ無理」なんて冷めた声　かき消して`,
      `胸の底で燃える火花を　爆発させる`
    ],
    [
      `重なるシンパシー　共鳴するこのバイブス`,
      `言葉なんて要らない　体温で確かめろ`
    ],
    [
      `解像度を上げて見つめる　理想の自分`,
      `もう誰の許可も要らない　私のステージ`
    ],
    [
      `カウントダウンは終わった　準備はいいかい？`,
      `衝動のままに　引き金を引くだけ`
    ]
  ];

  // 1番 サビ (Chorus 1) - 2026トレンド歌詞 8通り
  const chorus1Pool = [
    [
      `叫べ ${theme}！ 歪んだディストピアを打ち破れ`,
      `${genre}のビートに乗せて　リアルを刻みつけろ`,
      `画面越しじゃ伝わらない　熱量がここにある`,
      `壊れかけた世界で　僕らは輝いてみせる`
    ],
    [
      `踊れ ${theme}！ 狂った夜の真ん中で`,
      `アルゴリズムを超えて　君に届くまで`,
      `誰のルールにも縛られない　私だけのスタイル`,
      `この物語の主役は　他でもない私だ`
    ],
    [
      `響かせろ ${theme}！ ノイズだらけの街を切り裂いて`,
      `解き放たれた衝動が　明日を塗り替える`,
      `涙のフィルターなんて脱ぎ捨てて　笑い飛ばせ`,
      `一度きりの今日を　全力で暴れまわれ`
    ],
    [
      `燃え上がれ ${theme}！ 感情のバーストを引き起こせ`,
      `否定的なノイズなんて　蹴散らしていこう`,
      `繋いだこの手と手が　証明する未来`,
      `終わらない夜の果てへ　駆け抜けていけ`
    ],
    [
      `かき鳴らせ ${theme}！ 感情の音圧で世界を揺らせ`,
      `いい子なだけの毎日に　バイバイを告げて`,
      `私だけのアンセムを　この空に響かせろ`,
      `恐れるものなんて　何ひとつない`
    ],
    [
      `解き放て ${theme}！ 抑え込んだ本音のままで`,
      `評価の星の数なんて　どうでもいいから`,
      `心臓のバクバクが　導く方角へ`,
      `最高にハイな今を　駆け抜けるんだ`
    ],
    [
      `突き抜けろ ${theme}！ ネオンの海を切り開いて`,
      `君と私の波長が　シンクロする瞬間に`,
      `奇跡なんて言葉じゃ足りない　熱が生まれる`,
      `永遠の刹那を　ここに刻みつけよう`
    ],
    [
      `狂い咲け ${theme}！ 傷だらけの美しさで`,
      `綺麗事だけの世界を　塗り替えてやる`,
      `自分が自分でいるための　覚悟を決めたから`,
      `この歌に乗せて　どこまでも行こう`
    ]
  ];

  // 2番 Aメロ (Verse 2) - 8通り
  const verse2Pool = [
    [
      `タイムラインを流れていく　消費される悲しみ`,
      `「いいね」の数で価値が決まる　浅い世界で`,
      `私だけが知っている　本当の痛みを`,
      `歌詞の隙間にこっそり　忍ばせておくよ`
    ],
    [
      `深夜3時のコンビニエンスストア　白いライト`,
      `電子マネーの決済音だけが　虚しく響く`,
      `欲しいものはこんな　モノじゃないんだって`,
      `ポケットの中で固く　拳を握っていた`
    ],
    [
      `ヘッドフォンで耳を塞ぎ　世界とログアウト`,
      `重低音が脳ミソを　直接揺さぶる`,
      `嫌なこと全部　音の波に流して`,
      `私だけの空間に　引きこもるんだ`
    ],
    [
      `他人の評価を気にしすぎて　疲れた夜`,
      `鏡に映る自分が　すごく遠くに見えた`,
      `でも君が「そのままでいい」って言ってくれたから`,
      `少しだけ自分を　好きになれそうな気がした`
    ],
    [
      `都市高速を駆け抜ける　深夜のドライブ`,
      `窓を開ければ冷たい風が　頬を撫でる`,
      `過ぎ去っていく景色のスピードに`,
      `追いつけない想いを　抱きしめたまま`
    ],
    [
      `SNSの裏アカウントで　吐き出した本音`,
      `誰にも見つからないように　鍵をかけて`,
      `だけど本当は誰かに　見つけてほしかった`,
      `この孤独を救い出してくれる言葉を`
    ],
    [
      `雨上がりのアスファルトに　映る水たまり`,
      `逆さまの街並みが　なんだか綺麗で`,
      `踏みつけるように　水しぶきをあげたら`,
      `モヤモヤした気分も　パッと消えていった`
    ],
    [
      `始発列車が走り出す　まだ暗いホーム`,
      `新しい一日が　私を迎えに来る`,
      `昨日の涙は　夜の闇に置いてきた`,
      `朝焼けのほうへ　歩き出すんだ`
    ]
  ];

  // 2番 Bメロ (Pre-Chorus 2) - 8通り
  const preChorus2Pool = [
    [
      `傷つくことを恐れて　立ち止まるのは終わりにしよう`,
      `自分だけの物語を　自らの手で書き書き換える`
    ],
    [
      `迷いや不安も　スパイスに変えてしまえばいい`,
      `加速する鼓動が　未来を呼び寄せる`
    ],
    [
      `解像度を高めて見つめる　次のステージ`,
      `もう躊躇う理由なんて　どこにもない`
    ],
    [
      `誰かの真似じゃ到達できない　オリジナルの領域へ`,
      `一歩踏み出す覚悟が　世界を変える`
    ],
    [
      `言葉じゃ言い表せない　この胸の熱量`,
      `メロディに乗せて　一気に解き放つ`
    ],
    [
      `暗闇が深ければ深いほど　光は増していく`,
      `自分の可能性を　信じ抜くんだ`
    ],
    [
      `押し寄せる不安の波を　サーフィンするように`,
      `楽しんでしまえば　無敵になれる`
    ],
    [
      `準備は完璧だ　あとは飛び立つだけ`,
      `空の青さに　私の色を混ぜ合わせて`
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
              parts: [{ text: `${systemInstruction}\n\n【必須出力フォーマット】\n以下のJSONオブジェクト形式でのみ出力してください：\n{\n  "title": "（ここに詩的で洗練されたオリジナルのタイトル）",\n  "lyrics": "（ここに[Intro], [Verse 1], [Chorus]等を含む2026年トレンド感あふれる本格フル歌詞）",\n  "style_prompt": "（ここに英文カンマ区切りスタイルのプロンプト）",\n  "bpm": "128 BPM",\n  "key": "C Major"\n}\n\n${prompt}` }]
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
      const systemInstruction = `あなたはYOASOBI、Ado、米津玄師、Vaundy、ずっと真夜中でいいのに。、Creepy Nuts、Eveなどのヒット曲を手掛ける、2026年最先端の日本を代表する作詞家・音楽プロデューサーです。

【最重要：2026年最新トレンド歌詞アプローチ】
古いJ-POPの使い古されたベタな表現（「アスファルトを濡らす雨」「握りしめた拳」「冷めたコーヒー」「描いた地図」など）は【絶対に禁止】です。
デジタルな日常、都会のノイズ、SNS・タイムラインの憂鬱、解像度、アルゴリズム、口語的でエッジの効いた韻律（ライミング）、テンポ感あふれる現代的なセンスで100%オリジナルの歌詞を一から創作してください。

【重要：構成ルール】
必ず以下の「本格フル楽曲構成（11セクション）」で長大・充実した歌詞を作成してください。
1. [Intro]（前奏・現代的なインスト指示）
2. [Verse 1]（1番 Aメロ - 現代的な日常の描写）
3. [Pre-Chorus]（1番 Bメロ - 感情のビルドアップ）
4. [Chorus]（1番 サビ - キャッチーで高揚感あるメロディフレーズ）
5. [Verse 2]（2番 Aメロ - 視点を変えたストーリー展開）
6. [Pre-Chorus]（2番 Bメロ）
7. [Chorus]（2番 サビ）
8. [Bridge]（Cメロ - 感情のドラマチックな展開部）
9. [Guitar Solo] または [Synth Solo]（間奏ソロ指示）
10. [Final Chorus]（ラスサビ - クライマックス）
11. [Outro]（アウトロ - 現代的な余韻）

【ルール】
1. タイトル (title):
   - 「${theme}の${genre}」のような単調で安直な命名や「[DEMO]」などの文字を入れることは絶対に禁止です。
   - 2026年のトレンドに適合する、最高にエッジが効いていてセンス溢れるタイトル（例: 「解像度ゼロのディストピア」「深夜2時半のクロノスタシス」「未読無視のシグナル」「感情サブスクリプション」等）を考案してください。
2. 歌詞 (lyrics):
   - 語り・ナレーションは含めず、純粋な歌唱用歌詞（リズム・メロディに乗る言葉）のみで構成してください。
3. スタイルプロンプト (style_prompt):
   - Suno AIで2026年クオリティの最新ヒットサウンドを生成するための英文プロンプト（ジャンル、ボーカルタイプ、楽器、テンポ、雰囲気）を120文字程度で作成してください。`;

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

  // 3. APIキー未設定の場合の2026年最新トレンド DEMO ジェネレーター
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
