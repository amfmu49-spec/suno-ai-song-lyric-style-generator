import { SongResult, GachaRequest } from "../types";

// エレガント・エモーショナルな楽曲タイトル生成関数
export function generateCreativeTitle(theme: string, genre: string, isDemo: boolean = false): string {
  const poeticPrefixes = [
    "群青の", "真夜中の", "残響の", "透明な", "流星の", "深海の", "螺旋の", "緋色の",
    "幻影の", "無重力の", "幾千の", "二月の", "さよなら", "微熱の", "月光の", "追憶の",
    "終末の", "淡い", "境界の", "静寂に揺れる", "星降る夜の", "解き放たれた", "歪んだ"
  ];
  
  const poeticNouns = [
    "パノラマ", "クロノスタシス", "シルエット", "エンドロール", "プロトコル", "ノスタルジー",
    "アリア", "モノローグ", "デイズ", "シグナル", "レゾナンス", "グラフィティ", "ディスタンス",
    "クロニクル", "ステラ", "プレリュード", "オデッセイ", "シナリオ", "シンフォニー", "残像"
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
    `忘却の${theme}`
  ];

  const englishTitles = [
    `Neon ${theme}`, `Echoes of ${theme}`, `${theme} Horizon`, `Silent ${theme}`,
    `Midnight ${theme}`, `${theme} Synergy`, `Beyond the ${theme}`, `${theme} Spectrum`,
    `Velvet ${theme}`, `Quantum ${theme}`, `${theme} Pulse`, `Fading ${theme}`
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

// フル構成（11セクション）対応の動的デモ用歌詞ジェネレーター
export function generateDynamicFallbackLyrics(
  theme: string,
  genre: string,
  gender: string,
  tempo: string = "",
  mood: string = ""
): { title: string; lyrics: string; style_prompt: string; bpm: string; key: string } {
  const title = generateCreativeTitle(theme, genre, true);

  const introLines = [
    `(Soft piano melody fading in)`,
    `(Synthesizer pulse with ambient reverb)`,
    `(Acoustic guitar arpeggio)`,
    `(Energetic drum roll and bass groove)`
  ];

  const verse1Lines = [
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
    ]
  ];

  const preChorus1Lines = [
    [
      `戸惑いも迷いも　すべて包み込んで`,
      `踏み出す一歩が　世界を塗り替える`
    ],
    [
      `もう振り返らないと　心に決めたから`,
      `解き放たれる衝動　解き放つシグナル`
    ]
  ];

  const chorus1Lines = [
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
    ]
  ];

  const verse2Lines = [
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
      `新しい空を仰ぎ　息を深く吸い込む`
    ]
  ];

  const preChorus2Lines = [
    [
      `途切れた夢の欠片　ひとつずつ繋ぎ合わせて`,
      `静かに熱を帯びていく　抑えきれない情熱`
    ],
    [
      `かすかな期待が　確信へと変わるとき`,
      `加速する鼓動が　限界の壁をぶち破る`
    ]
  ];

  const chorus2Lines = [
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
    ]
  ];

  const bridgeLines = [
    [
      `たとえ世界が　明日終わるとしても`,
      `この歌声だけは　消えはしない`,
      `君と出逢えた奇跡を　誇りに思うから`
    ],
    [
      `暗闇の中でこそ　見える星がある`,
      `迷い抜いた夜の数だけ　強くなれる`,
      `ここから始まる　新しい時代へ`
    ]
  ];

  const soloLines = [
    `(Powerful Guitar Solo with emotional overdrive)`,
    `(Epic Synth Solo bursting into high tempo rhythm)`,
    `(Dynamic Bass & Drum Breakdown Solo)`
  ];

  const finalChorusLines = [
    [
      `叫べ ${theme}！ 幾千の夜を超えて`,
      `響き渡る声が　奇跡を呼び覚ます`,
      `二度と離さない　この手を繋ぎしめて`,
      `新しい光のほうへ　共に走り出そう`
    ]
  ];

  const outroLines = [
    [
      `ずっと奏で続けよう`,
      `${theme}とともに、どこまでも`,
      `響き渡る声が　明日の光へ`,
      `(Fade out with ambient synth echo)`
    ]
  ];

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const lyrics = `[Intro]\n${pick(introLines)}\n\n[Verse 1]\n${pick(verse1Lines).join("\n")}\n\n[Pre-Chorus]\n${pick(preChorus1Lines).join("\n")}\n\n[Chorus]\n${pick(chorus1Lines).join("\n")}\n\n[Verse 2]\n${pick(verse2Lines).join("\n")}\n\n[Pre-Chorus]\n${pick(preChorus2Lines).join("\n")}\n\n[Chorus]\n${pick(chorus2Lines).join("\n")}\n\n[Bridge]\n${pick(bridgeLines).join("\n")}\n\n[Solo]\n${pick(soloLines)}\n\n[Final Chorus]\n${pick(finalChorusLines).join("\n")}\n\n[Outro]\n${pick(outroLines).join("\n")}`;

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
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING", description: "詩的で情緒のある印象的な楽曲タイトル" },
                lyrics: { type: "STRING", description: "[Intro], [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Pre-Chorus], [Chorus], [Bridge], [Solo], [Final Chorus], [Outro] を含む本格フル作詞" },
                style_prompt: { type: "STRING", description: "Suno AI用スタイルの英文カンマ区切り" },
                bpm: { type: "STRING", description: "推奨BPM" },
                key: { type: "STRING", description: "推奨Key" }
              },
              required: ["title", "lyrics", "style_prompt"]
            }
          }
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`Gemini REST API (${model}) failed: ${res.status}`, errorText);
        lastError = new Error(`API Error ${res.status}: ${errorText}`);
        continue;
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return JSON.parse(text);
      }
    } catch (err) {
      console.warn(`Error trying model ${model}:`, err);
      lastError = err;
    }
  }

  throw lastError || new Error("Gemini API 呼び出しに失敗しました。");
}

// メイン生成エントリポイント
export async function generateSongWithAiOrFallback(
  request: GachaRequest,
  userApiKey?: string
): Promise<SongResult> {
  const apiKey = userApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  const { theme, genre, gender, tempo = "", mood = "", additionalNotes = "" } = request;

  // 1. APIキーが提供されている場合は直接 Gemini REST API を呼び出し
  if (apiKey && apiKey.trim().length > 5) {
    try {
      console.log("Calling Gemini API directly from browser with user API key...");
      const systemInstruction = `あなたはプロの作詞家であり、日本を代表する最高峰の音楽プロデューサーです。
ユーザーから渡された「テーマ」「ジャンル」「性別」などのキーワードに基づき、Suno AI用の本格フル楽曲の「タイトル」「歌詞」「スタイルプロンプト」を作成してください。

【重要：構成ルール】
必ず以下の「本格フル楽曲構成（10〜11セクション）」で長大・充実した歌詞を作成してください。
1. [Intro]（前奏・インスト指示）
2. [Verse 1]（1番 Aメロ）
3. [Pre-Chorus]（1番 Bメロ）
4. [Chorus]（1番 サビ）
5. [Verse 2]（2番 Aメロ）
6. [Pre-Chorus]（2番 Bメロ）
7. [Chorus]（2番 サビ）
8. [Bridge]（Cメロ・展開部）
9. [Guitar Solo] または [Synth Solo]（間奏インストソロ指示）
10. [Final Chorus]（ラスサビ・クライマックス）
11. [Outro]（アウトロ・後奏）

【ルール】
1. タイトル (title):
   - 「${theme}の${genre}」のような単調で安直な命名は厳禁。
   - 楽曲の世界観やストーリーが深く感じられる、最高に詩的で洗練されたタイトル（例: 「群青に沈むクロノスタシス」「二月のエンドロール」「解き放たれたプロトコル」「さよならミッドナイト」等）を考案してください。
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
        return {
          id: "song_" + Date.now(),
          title: data.title,
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
        isDemo: false,
        requestParams: request
      };
    }
  } catch (e) {
    console.log("Static environment detected, using dynamic fallback lyric engine.");
  }

  // 3. APIなし/静的ホスティング環境向けの高品質 DEMO 歌詞・タイトル＆フル構成フォールバック
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
