import React, { useState, useEffect } from "react";
import { CopyTextBox } from "./components/CopyTextBox";
import { GachaOverlay } from "./components/GachaOverlay";
import { StartCover } from "./components/StartCover";
import { SongResult } from "./types";
import { STRICT_GENRES } from "./data/presets";
import { Key, RotateCw, Sparkles, Music, ExternalLink, Copy, Check, RefreshCw, Eye, EyeOff, Save, Trash2 } from "lucide-react";
import { generateSongWithAiOrFallback } from "./utils/lyricGenerator";

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

const API_KEY_STORAGE = "user_gemini_api_key_v1";
const CURRENT_SONG_STORAGE = "amu_gacha_current_song_v2";
const CURRENT_THEME_STORAGE = "amu_gacha_current_theme_v2";
const CURRENT_GENRE_STORAGE = "amu_gacha_current_genre_v2";

const getStoredApiKey = (): string => {
  try {
    return (
      localStorage.getItem(API_KEY_STORAGE) ||
      localStorage.getItem("amu_gacha_api_key") ||
      sessionStorage.getItem(API_KEY_STORAGE) ||
      ""
    );
  } catch {
    return "";
  }
};

const saveStoredApiKey = (val: string) => {
  try {
    const clean = val.trim();
    if (clean) {
      localStorage.setItem(API_KEY_STORAGE, clean);
      localStorage.setItem("amu_gacha_api_key", clean);
      sessionStorage.setItem(API_KEY_STORAGE, clean);
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
      localStorage.removeItem("amu_gacha_api_key");
      sessionStorage.removeItem(API_KEY_STORAGE);
    }
  } catch (e) {
    console.warn("Storage save error:", e);
  }
};

export default function App() {
  // APIキーの状態管理（localStorage / sessionStorage から自動復元）
  const [apiKey, setApiKey] = useState<string>(getStoredApiKey);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [keySaveToast, setKeySaveToast] = useState<boolean>(false);

  // ガチャで決定・生成された結果データ（localStorageから復元）
  const [currentSong, setCurrentSong] = useState<SongResult | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_SONG_STORAGE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem(CURRENT_THEME_STORAGE) || "";
  });

  const [currentGenre, setCurrentGenre] = useState<string>(() => {
    return localStorage.getItem(CURRENT_GENRE_STORAGE) || "";
  });

  // 初回起動時のカバー画面表示状態（既存データがあればカバーは開かない）
  const [isStartCoverOpen, setIsStartCoverOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(CURRENT_SONG_STORAGE);
    return !saved; // 保存データがなければカバー画面を表示
  });

  // ガチャオーバーレイ状態（カバー画面をタップした後に開始）
  const [isGachaOpen, setIsGachaOpen] = useState<boolean>(false);

  // 各項目個別コピー状態
  const [copiedStyle, setCopiedStyle] = useState<boolean>(false);
  const [copiedLyrics, setCopiedLyrics] = useState<boolean>(false);
  const [copiedTitle, setCopiedTitle] = useState<boolean>(false);

  // おかわり生成ローディング状態
  const [isOkawariLoading, setIsOkawariLoading] = useState<boolean>(false);

  // 個別コピー処理ヘルパー
  const copyText = (text: string, setStatus: (val: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setStatus(true);
      setTimeout(() => setStatus(false), 2000);
    });
  };

  // APIキーのリアルタイム変更 & 永久保存
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setApiKey(val);
    saveStoredApiKey(val);
  };

  // APIキーの手動保存ボタン
  const handleSaveApiKey = () => {
    saveStoredApiKey(apiKey);
    setKeySaveToast(true);
    setTimeout(() => setKeySaveToast(false), 2500);
  };

  // APIキーの手動クリアボタン
  const handleClearApiKey = () => {
    setApiKey("");
    saveStoredApiKey("");
  };

  // カバー画面タップ時にガチャ演出画面へ遷移
  const handleStartTap = () => {
    setIsStartCoverOpen(false);
    setIsGachaOpen(true);
  };

  // ガチャ完了時の処理（localStorageに保存）
  const handleGachaComplete = (song: SongResult, theme: string, genre: string) => {
    setCurrentSong(song);
    setCurrentTheme(theme);
    setCurrentGenre(genre);
    setIsGachaOpen(false);

    try {
      localStorage.setItem(CURRENT_SONG_STORAGE, JSON.stringify(song));
      localStorage.setItem(CURRENT_THEME_STORAGE, theme);
      localStorage.setItem(CURRENT_GENRE_STORAGE, genre);
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  };

  // 再度ガチャを引く
  const handleReGacha = () => {
    setIsGachaOpen(true);
  };

  // カバー画面を再表示
  const handleShowCover = () => {
    setIsStartCoverOpen(true);
  };

  // ジャンルのおかわり（もう一つジャンルをランダム追加してクロスジャンル再生成）
  const handleOkawariGenre = async () => {
    if (!currentSong || isOkawariLoading) return;

    setIsOkawariLoading(true);

    // 1. 新しいランダム第2ジャンルを抽選
    const activeGenre = currentGenre || currentSong.requestParams?.genre || "J-Pop";
    const baseGenre = activeGenre.includes(" × ") ? activeGenre.split(" × ")[0] : activeGenre;

    const availableGenres = STRICT_GENRES.filter((g) => g !== baseGenre);
    const secondGenre = availableGenres[Math.floor(Math.random() * availableGenres.length)] || "EDM";

    const newCombinedGenre = `${baseGenre} × ${secondGenre}`;
    const theme = currentTheme || currentSong.requestParams?.theme || "日常";
    const gender = currentSong.requestParams?.gender || "女性ボーカル (Female Vocal)";
    const tempo = currentSong.requestParams?.tempo || "";
    const mood = currentSong.requestParams?.mood || "";

    try {
      const generated = await generateSongWithAiOrFallback(
        {
          theme,
          genre: newCombinedGenre,
          gender: gender as any,
          tempo,
          mood,
          language: "日本語",
        },
        apiKey
      );

      const newSong: SongResult = {
        ...generated,
        id: "song_" + Date.now(),
        requestParams: {
          ...currentSong.requestParams,
          theme,
          genre: newCombinedGenre,
          gender: gender as any,
        },
      };

      setCurrentSong(newSong);
      setCurrentGenre(newCombinedGenre);
      localStorage.setItem(CURRENT_SONG_STORAGE, JSON.stringify(newSong));
      localStorage.setItem(CURRENT_GENRE_STORAGE, newCombinedGenre);
    } catch (err) {
      console.error("Okawari generation error:", err);
    } finally {
      setIsOkawariLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-purple-500/20 selection:text-purple-900 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      {/* 背景の紫・青・ピンクグラデーションアンビエント演出 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-300/40 via-blue-200/30 to-pink-300/40 rounded-full blur-[140px]" />
      </div>

      {/* メインカードコンテナ */}
      <div className="relative z-10 w-full max-w-xl mx-auto space-y-6">
        {/* ヘッダー＆タイトル */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 bg-white border border-purple-200 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              AMU GACHA
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            ガチャ結果・AI作詞データ
          </h1>
          <p className="text-xs text-slate-500">
            全パラメーターおまかせで自動生成された作詞・タイトル・Suno用プロンプトです。
          </p>
          <div>
            <button
              type="button"
              onClick={handleShowCover}
              className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-800 font-bold underline cursor-pointer"
            >
              <span>👈 オープニング（カバー画面）に戻る</span>
            </button>
          </div>
        </div>

        {/* APIキー入力エリア（紫・青・ピンク グラデーション枠線） */}
        <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-sm">
          <div className="bg-white rounded-[14px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-1.5">
                <Key className="w-4 h-4 text-purple-600" />
                <span>Gemini APIキー (永久保存)</span>
              </label>
              <span className="text-[10px] text-slate-400">※ブラウザに自動保存されます</span>
            </div>

            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  autoComplete="off"
                  name="amu_gacha_gemini_api_key"
                  placeholder="AI Studioで取得したGemini APIキーを入力 (AIzaSy...)"
                  className="w-full p-2.5 pr-10 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showApiKey ? "キーを隠す" : "キーを表示"}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveApiKey}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
                title="ブラウザに固定保存"
              >
                <Save className="w-3.5 h-3.5" />
                <span>保存</span>
              </button>

              {apiKey && (
                <button
                  type="button"
                  onClick={handleClearApiKey}
                  className="bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 p-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                  title="保存したキーを削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {keySaveToast && (
              <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-bounce">
                <Check className="w-3.5 h-3.5" />
                <span>APIキーをブラウザに永続保存しました！次回アクセス時も自動適用されます。</span>
              </div>
            )}

            {!apiKey ? (
              <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 border border-pink-500/50 text-white text-xs space-y-2 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-black text-pink-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                    無料 Gemini API キーの設定で AI の真価を発揮！
                  </span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-md transition-transform active:scale-95 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>無料APIキーを取得 (Google AI Studio)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  現在APIキーが未入力のため【DEMOサンプル】表示中です。Google AI Studio で無料キーを取得して入力すると、AIが毎回100%オリジナルの超高クオリティ歌詞・詩的タイトルを即座に自動生成します！
                </p>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-700 font-bold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-300 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Gemini API キー設定済み（AIフルオリジナル作詞モード作動中）
                </span>
                <span className="text-[10px] text-emerald-600 font-normal">DEMOタグは付与されません</span>
              </div>
            )}
          </div>
        </div>

        {/* ガチャ結果表示カード（紫・青・ピンク グラデーション枠線） */}
        {currentSong ? (
          <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-xl">
            <div className="bg-white rounded-[14px] p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">ガチャ結果一覧</h2>
                </div>
                <button
                  type="button"
                  onClick={handleReGacha}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:opacity-90 text-white font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>もう一度ガチャを引く</span>
                </button>
              </div>

              {/* Suno AI 連携アクションバナー：Sunoの3つのテキストボックス対応 */}
              <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xl space-y-3.5 border border-purple-500/40">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-pink-400 animate-pulse" />
                    <span className="font-extrabold text-sm tracking-wide bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 bg-clip-text text-transparent">
                      Suno AI 3ステップワンタップコピー
                    </span>
                  </div>

                  <a
                    href="https://suno.com/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:opacity-90 text-white font-black text-xs px-4 py-2 rounded-lg transition-all shadow-md shadow-purple-500/30 cursor-pointer"
                  >
                    <span>Suno を別タブで開く</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Suno (suno.com/create) の <strong>Custom モード</strong> にある3つの入力欄へ、順番にタップして貼り付けてください！
                </p>

                {/* Sunoの3つの入力欄対応 1タップコピーカード */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {/* Step 1: Style of Music */}
                  <button
                    type="button"
                    onClick={() => copyText(currentSong.style_prompt, setCopiedStyle)}
                    className={`flex flex-col items-start justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      copiedStyle
                        ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-200"
                        : "bg-slate-800/80 hover:bg-slate-800 border-purple-500/40 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider">
                        1. Style of Music
                      </span>
                      {copiedStyle ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                      )}
                    </div>
                    <span className="text-xs font-bold truncate w-full">
                      {copiedStyle ? "✓ スタイルコピー完了！" : "スタイルをコピー"}
                    </span>
                  </button>

                  {/* Step 2: Lyrics */}
                  <button
                    type="button"
                    onClick={() => copyText(currentSong.lyrics, setCopiedLyrics)}
                    className={`flex flex-col items-start justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      copiedLyrics
                        ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-200"
                        : "bg-slate-800/80 hover:bg-slate-800 border-blue-500/40 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">
                        2. Lyrics (歌詞)
                      </span>
                      {copiedLyrics ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                      )}
                    </div>
                    <span className="text-xs font-bold truncate w-full">
                      {copiedLyrics ? "✓ 歌詞コピー完了！" : "歌詞をコピー"}
                    </span>
                  </button>

                  {/* Step 3: Title */}
                  <button
                    type="button"
                    onClick={() => copyText(currentSong.title, setCopiedTitle)}
                    className={`flex flex-col items-start justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      copiedTitle
                        ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-200"
                        : "bg-slate-800/80 hover:bg-slate-800 border-pink-500/40 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[10px] font-black text-pink-300 uppercase tracking-wider">
                        3. Title (タイトル)
                      </span>
                      {copiedTitle ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                      )}
                    </div>
                    <span className="text-xs font-bold truncate w-full">
                      {copiedTitle ? "✓ タイトルコピー完了！" : "タイトルをコピー"}
                    </span>
                  </button>
                </div>
              </div>

              {/* テーマ・ジャンル表示（ジャンルおかわりボタン付き） */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-[1px] rounded-xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
                  <div className="bg-slate-50 p-3 rounded-[11px] h-full flex flex-col justify-center">
                    <span className="text-xs font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block mb-0.5">
                      テーマ
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentTheme || currentSong.requestParams?.theme || "おまかせテーマ"}
                    </span>
                  </div>
                </div>

                <div className="p-[1px] rounded-xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
                  <div className="bg-slate-50 p-3 rounded-[11px] flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-extrabold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent block mb-0.5">
                        ジャンル
                      </span>
                      <span className="text-sm font-bold text-slate-800 break-words leading-tight block">
                        {currentGenre || currentSong.requestParams?.genre || "おまかせジャンル"}
                      </span>
                    </div>

                    {/* ジャンルおかわりボタン */}
                    <button
                      type="button"
                      disabled={isOkawariLoading}
                      onClick={handleOkawariGenre}
                      className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:opacity-90 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg transition-all shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                      title="ランダムでジャンルを1つ追加し（例: J-Pop × EDM）、作詞やSunoプロンプトを再生成します"
                    >
                      {isOkawariLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>生成中...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
                          <span>おかわり 🍚</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* タイトル（コピーボタン付き） */}
              <CopyTextBox
                label="タイトル (Suno: Title)"
                value={currentSong.title}
              />

              {/* 歌詞（コピーボタン付き） */}
              <CopyTextBox
                label="歌詞 (Suno: Lyrics)"
                value={currentSong.lyrics}
                isTextArea={true}
              />

              {/* Suno AI スタイルプロンプト（コピーボタン付き） */}
              <CopyTextBox
                label="スタイルプロンプト (Suno: Style of Music)"
                value={currentSong.style_prompt}
              />
            </div>
          </div>
        ) : (
          /* ガチャロード失敗または初回読み込み待機 */
          <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-md">
            <div className="bg-white rounded-[14px] p-8 text-center space-y-4">
              <p className="text-xs text-slate-500">ガチャ演出を準備中...</p>
              <button
                type="button"
                onClick={handleReGacha}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                ガチャ動画を再生して引く
              </button>
            </div>
          </div>
        )}
      </div>

      {/* スタートカバー画面 (タップしてね👆) */}
      {isStartCoverOpen && <StartCover onTap={handleStartTap} />}

      {/* 起動時＆再実行時のガチャ動画オーバーレイ */}
      <GachaOverlay
        isOpen={isGachaOpen}
        apiKey={apiKey}
        onComplete={handleGachaComplete}
        onClose={() => setIsGachaOpen(false)}
      />
    </div>
  );
}
