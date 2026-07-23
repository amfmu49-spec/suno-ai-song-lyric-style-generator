import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

function generateCreativeTitle(theme: string, genre: string): string {
  const prefixes = ["夜明けの", "約束の", "忘却の", "刹那の", "蒼穹の", "さよなら", "永遠の", "境界の", "微熱の", "追憶の", "星降る", "ラスト"];
  const suffixes = ["シンフォニー", "メロディ", "グラフィティ", "の欠片", "ディスタンス", "の向こう側", "に咲く花", "レゾナンス", "シンドローム", "の理由", "クロニクル", "残像"];
  const englishTemplates = [`Neon ${theme}`, `Echoes of ${theme}`, `${theme} Horizon`, `Silent ${theme}`, `Midnight ${theme}`, `${theme} Synergy`];

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

// Initialize Google GenAI client
const getAiClient = (userApiKey?: string) => {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini APIキーが設定されていません。画面上部のAPIキー入力欄に入力してください。");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint: Generate Lyrics & Suno Style Prompt
app.post("/api/generate", async (req, res) => {
  try {
    const {
      theme,
      genre,
      gender,
      tempo = "",
      mood = "",
      language = "日本語",
      additionalNotes = "",
      userApiKey = "",
    } = req.body;

    const customKey = userApiKey || (req.headers["x-api-key"] as string);

    if (!theme || !genre || !gender) {
      return res.status(400).json({
        error: "「テーマ (theme)」「ジャンル (genre)」「性別 (gender)」は必須です。",
      });
    }

    const ai = getAiClient(customKey);

    const systemInstruction = `あなたはプロの作詞家であり、日本を代表する音楽プロデューサーです。
ユーザーから渡された「テーマ」「ジャンル」「性別」などのキーワードに基づき、Suno AI用の楽曲の「タイトル」「歌詞」「スタイルプロンプト」を作成してください。

【ルール】
1. タイトル (title):
   - 曲の世界観や情緒、物語性が深く感じられる、洗練された印象的なタイトルにしてください。
   - 【絶対禁止】「${theme}の${genre}」や「〜の〜」のような単調で安直な命名（例: 「夢のJ-Pop」「未来のロック」等）は絶対に禁止です。
   - 詩的でセンスのあるタイトル（例: 「夜明けの欠片」「Neon Horizon」「君と描いた残像」「ラスト・シンフォニー」「追憶のラストダンス」など）を考案してください。
2. 歌詞 (lyrics):
   - [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Bridge], [Outro] などのセクション名（英語の角括弧タグ）を必ず含めてください。
   - イントロでの語り（ナレーション）や、曲中のセリフ・モノローグ・朗読・かけ声のセリフは一切含めないでください。純粋な歌唱用の歌詞（リズム・メロディに乗る言葉）のみで構成すること。
   - 指定された「性別」（男性 / 女性 / 中性・デュエット）の視点や口調（一人称：僕/私/俺、語尾のニュアンスなど）を自然に反映させてください。
   - ${language}で書くこと。
3. スタイルプロンプト (style_prompt):
   - Suno AIで高クオリティな楽曲を生成するためのカンマ区切りの英単語リストを作成してください（すべて英語で出力）。
   - 指定された「ジャンル」（例: J-Pop, City Pop, Vocaloid, Heavy Metal, Lo-Fi, Synthwave等）と「性別」（例: male vocal, female vocal, duet vocal, neutral vocal）を必ず含めてください。
   - ジャンルやテンポ・雰囲気に合わせた楽器構成（例: electric guitar, synth bass, acoustic piano, punchy drums）、テンポ（例: fast tempo, 135 bpm）、雰囲気（例: emotional, energetic, nostalgic, dark）をカンマ区切りで盛り込んでください。
   - 120文字程度のコンパクトで密度の高いSuno AI推奨プロンプトにしてください。`;

    const userPrompt = `【曲のパラメータ】
- テーマ: ${theme}
- ジャンル: ${genre}
- 性別（ボーカル）: ${gender}
${tempo ? `- テンポ: ${tempo}` : ""}
${mood ? `- 雰囲気: ${mood}` : ""}
${additionalNotes ? `- 追加の補足要件: ${additionalNotes}` : ""}

上記の情報を元に、Suno AIでそのまま使える高品質な楽曲データを作成し、JSON形式で返してください。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "生成した楽曲タイトル",
            },
            lyrics: {
              type: Type.STRING,
              description: "[Verse 1]等のセクション名を含む歌唱用歌詞",
            },
            style_prompt: {
              type: Type.STRING,
              description: "Suno AI用のカンマ区切り英文スタイルプロンプト",
            },
            bpm: {
              type: Type.STRING,
              description: "推奨テンポ（例: 128 BPM, Fast, Medium, Smooth）",
            },
            key: {
              type: Type.STRING,
              description: "推奨キー（例: C Major, A Minor）",
            },
          },
          required: ["title", "lyrics", "style_prompt"],
        },
      },
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);

    return res.json({
      title: data.title,
      lyrics: data.lyrics,
      style_prompt: data.style_prompt,
      bpm: data.bpm || "120 BPM",
      key: data.key || "C Major",
    });
  } catch (error: any) {
    console.error("Error generating lyrics:", error);

    const {
      theme = "未来",
      genre = "J-Pop",
      gender = "女性",
      tempo = "medium tempo",
      mood = "emotional",
      userApiKey = "",
    } = req.body || {};

    const customKey = userApiKey || (req.headers["x-api-key"] as string);

    const errorMessage = error.message || "";
    const isQuotaError =
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("RESOURCE_EXHAUSTED") ||
      errorMessage.includes("Quota exceeded");

    // 429 API利用上限エラーまたはキー未設定の場合、体験を阻害しないためのバックアップ高品質楽曲データを自動生成
    if (isQuotaError || !customKey) {
      console.log("Using fallback template generator due to API quota or key restriction.");
      
      const fallbackTitle = generateCreativeTitle(theme, genre);
      const fallbackLyrics = `[Verse 1]\n静かに流れる時間の中で\n${theme}をそっと追いかけていた\n見慣れた街並み　揺れる光\n新しい風が通り抜けてゆく\n\n[Pre-Chorus]\n戸惑う気持ちを抱きしめたまま\n踏み出す一歩が未来を変える\n\n[Chorus]\n響け ${theme}！ どこまでも遠くへ\n${genre}のビートに乗せて叫ぶよ\n夢見た景色が今ここにある\n終わらない歌をあなたに届けたい\n\n[Verse 2]\nすれ違う人の波をかき分けて\n描いた地図を確かめてる\nあの日交わした約束の言葉\n今も胸の奥で輝いている\n\n[Outro]\nずっと奏で続けよう\n${theme}とともに、明日へ`;
      
      const fallbackStyle = `${genre}, ${gender === "male" || gender === "男性" ? "male vocal" : gender === "female" || gender === "女性" ? "female vocal" : "duet vocal"}, ${tempo || "medium tempo"}, ${mood || "emotional"}, catchy melody, professional production`;

      return res.json({
        title: fallbackTitle,
        lyrics: fallbackLyrics,
        style_prompt: fallbackStyle,
        bpm: "128 BPM",
        key: "C Major",
        isFallback: true,
        notice: isQuotaError
          ? "※無料共有APIキーの1分あたりの利用上限（429 Rate Limit）に達したため、AIテンプレートで楽曲を作成しました。独自のGemini APIキーを入力するとAIが毎回完全オリジナルの楽曲を生成します。"
          : undefined,
      });
    }

    return res.status(500).json({
      error: "AI作詞の生成中にエラーが発生しました。Gemini APIキーをご確認いただくか、時間をおいて再度お試しください。",
    });
  }
});

// API Endpoint: Refine / Modify Section of Lyrics or Style
app.post("/api/refine", async (req, res) => {
  try {
    const { currentTitle, currentLyrics, currentStyle, instruction } = req.body;
    if (!instruction) {
      return res.status(400).json({ error: "Instruction is required." });
    }

    const ai = getAiClient();

    const systemInstruction = `あなたはプロの作詞家であり、音楽プロデューサーです。
既存のタイトル・歌詞・スタイルプロンプトに対して、ユーザーの指示にしたがって修正やリライトを行ってください。
必ず純粋な歌唱用歌詞（語り・モノローグ禁止、[Verse 1], [Chorus]等のタグ必須）を維持してください。`;

    const userPrompt = `現在のタイトル: ${currentTitle}
現在のスタイル: ${currentStyle}
現在の歌詞:
${currentLyrics}

ユーザーからの修正指示:
${instruction}

指定のJSON形式で修正結果を出力してください。`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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
            key: { type: Type.STRING },
          },
          required: ["title", "lyrics", "style_prompt"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error("Error refining lyrics:", error);
    return res.status(500).json({ error: error.message || "Failed to refine lyrics." });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
