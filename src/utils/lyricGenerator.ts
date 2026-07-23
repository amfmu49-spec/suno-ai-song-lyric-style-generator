import { GoogleGenAI, Type } from "@google/genai";
import { SongResult, GachaRequest } from "../types";

// クリエイティブなタイトル自動生成関数
export function generateCreativeTitle(theme: string, genre: string): string {
  const prefixes = [
    "夜明けの", "約束の", "忘却の", "刹那の", "蒼穹の", "さよなら", "永遠の", "境界の",
    "微熱の", "追憶の", "星降る", "ラスト", "透明な", "流星の", "深海の", "真夜中の",
    "螺旋の", "緋色の", "残響の", "幻影の", "無重力の", "孤独の", "輝く"
  ];
  const suffixes = [
    "シンフォニー", "メロディ", "グラフィティ", "の欠片", "ディスタンス", "の向こう側",
    "に咲く花", "レゾナンス", "シンドローム", "の理由", "クロニクル", "残像", "デイズ",
    "ライン", "モノローグ", "の鼓動", "パレード", "メモリー", "シグナル", "ノクターン"
  ];
  const englishTemplates = [
    `Neon ${theme}`, `Echoes of ${theme}`, `${theme} Horizon`, `Silent ${theme}`,
    `Midnight ${theme}`, `${theme} Synergy`, `Beyond the ${theme}`, `${theme} Spectrum`,
    `Velvet ${theme}`, `Quantum ${theme}`, `${theme} Pulse`, `Fading ${theme}`
  ];

  const rand = Math.random();
  if (rand < 0.35) {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${p}${theme}`;
  } else if (rand < 0.70) {
    const s = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${theme}${s}`;
  } else {
    return englishTemplates[Math.floor(Math.random() * englishTemplates.length)];
  }
}

// 多様な歌詞パターンを動的に自動生成するリッチフォールバックジェネレーター
export function generateDynamicFallbackLyrics(
  theme: string,
  genre: string,
  gender: string,
  tempo: string = "",
  mood: string = ""
): { title: string; lyrics: string; style_prompt: string; bpm: string; key: string } {
  const title = generateCreativeTitle(theme, genre);

  // テーマと言語感に応じた多彩なフレーズライブラリ
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
    ]
  ];

  const preChorusLines = [
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
    ]
  ];

  const chorusLines = [
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
    ]
  ];

  const verse2Lines = [
    [
      `すれ違う人波を　かき分けて進む`,
      `重ねた失敗も　足跡に変わっていく`,
      `握りしめた拳の　ぬくもりを信じて`,
      `自分だけの答えを　描き続けている`
    ],
    [
      `ビル風が吹き抜ける　交差点の真ん中で`,
      `描いた地図の続きを　確かめ合っていた`,
      `傷つくことを恐れた　昨日の僕にバイバイ`,
      `新しい空を仰ぎ　息を深く吸い込む`
    ],
    [
      `遠ざかる過去のノイズを　振り払うように`,
      `まっすぐな眼差しで　明日を見つめる`,
      `小さな光でも　集まれば輝きになる`,
      `僕らの歩幅で　一歩ずつ前へ`
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
    ],
    [
      `言葉を超えて　心に直接語りかける`,
      `溢れ出すメロディが　奇跡を呼び覚ます`,
      `さあ、解き放とう　解き放たれた未来へ`
    ]
  ];

  const outroLines = [
    [
      `ずっと奏で続けよう`,
      `${theme}とともに、どこまでも`,
      `響き渡る声が　明日の光へ`
    ],
    [
      `消えない想いを抱きしめて`,
      `僕らの ${theme} は終わらない`,
      `輝く未来へ、踏み出そう`
    ],
    [
      `La La La... 風に乗せて`,
      `${theme}の歌を未来へ届けて`,
      `ありがとう、この場所で`
    ]
  ];

  // ランダム選択
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const v1 = pick(verse1Lines).join("\n");
  const pre = pick(preChorusLines).join("\n");
  const chorus = pick(chorusLines).join("\n");
  const v2 = pick(verse2Lines).join("\n");
  const bridge = pick(bridgeLines).join("\n");
  const outro = pick(outroLines).join("\n");

  const lyrics = `[Verse 1]\n${v1}\n\n[Pre-Chorus]\n${pre}\n\n[Chorus]\n${chorus}\n\n[Verse 2]\n${v2}\n\n[Bridge]\n${bridge}\n\n[Outro]\n${outro}`;

  // ボーカル表記の英訳
  const vocalTag = gender.includes("男性")
    ? "male vocal"
    : gender.includes("女性")
    ? "female vocal"
    : "duet vocal";

  const style_prompt = `${genre}, ${vocalTag}, ${tempo || "fast tempo"}, ${mood || "energetic, emotional"}, catchy melody, punchy drums, synth bass, professional production`;

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

// メイン生成エントリポイント
export async function generateSongWithAiOrFallback(
  request: GachaRequest,
  userApiKey?: string
): Promise<SongResult> {
  const apiKey = userApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  const { theme, genre, gender, tempo = "", mood = "", additionalNotes = "" } = request;

  // 1. APIキーがある場合はクライアントサイドで直接 Google GenAI を呼び出し
  if (apiKey && apiKey.trim().length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `あなたはプロの作詞家であり、日本を代表する音楽プロデューサーです。
ユーザーから渡された「テーマ」「ジャンル」「性別」などのキーワードに基づき、Suno AI用の楽曲の「タイトル」「歌詞」「スタイルプロンプト」を作成してください。

【ルール】
1. タイトル (title):
   - 曲の世界観や情緒、物語性が深く感じられる、洗練された印象的なタイトルにしてください。
   - 単調で安直な命名は避け、詩的でセンスのあるタイトル（例: 「夜明けの欠片」「Neon Horizon」「君と描いた残像」等）にしてください。
2. 歌詞 (lyrics):
   - [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Bridge], [Outro] などのセクション名（英語の角括弧タグ）を必ず含めてください。
   - 語り・ナレーション・セリフは含めず、純粋な歌唱用歌詞のみで構成してください。
   - 指定された視点や口調（一人称・ニュアンス）を反映し、日本語で書いてください。
3. スタイルプロンプト (style_prompt):
   - Suno AIで高クオリティな楽曲を生成するためのカンマ区切りの英文プロンプト（ジャンル、ボーカル、楽器構成、テンポ、雰囲気）を120文字程度で作成してください。`;

      const userPrompt = `【曲のパラメータ】
- テーマ: ${theme}
- ジャンル: ${genre}
- 性別（ボーカル）: ${gender}
${tempo ? `- テンポ: ${tempo}` : ""}
${mood ? `- 雰囲気: ${mood}` : ""}
${additionalNotes ? `- 追加の要件: ${additionalNotes}` : ""}

指定のJSON形式で出力してください。`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              lyrics: { type: Type.STRING },
              style_prompt: { type: Type.STRING },
              bpm: { type: Type.STRING },
              key: { type: Type.STRING }
            },
            required: ["title", "lyrics", "style_prompt"]
          }
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText);

      return {
        id: "song_" + Date.now(),
        title: data.title || generateCreativeTitle(theme, genre),
        lyrics: data.lyrics,
        style_prompt: data.style_prompt,
        bpm: data.bpm || "128 BPM",
        key: data.key || "C Major",
        createdAt: Date.now(),
        isFavorite: false,
        requestParams: request
      };
    } catch (err) {
      console.warn("Client-side Gemini API call failed or fallback triggered:", err);
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
        requestParams: request
      };
    }
  } catch (e) {
    console.log("Static environment detected, using dynamic fallback lyric engine.");
  }

  // 3. APIなし/静的ホスティング環境向けの高品質・多様化ダイナミックAIフォールバック
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
    requestParams: request
  };
}
