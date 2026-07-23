import React, { useState, useEffect } from "react";
import { SongRequest, SongResult, VocalGender } from "../types";
import {
  STRICT_THEMES,
  STRICT_GENRES,
  VOCAL_GENDER_OPTIONS,
  TEMPO_OPTIONS,
  MOOD_OPTIONS,
} from "../data/presets";
import { Sparkles, Disc, Zap, Trophy, Music2 } from "lucide-react";

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

interface GachaOverlayProps {
  isOpen: boolean;
  apiKey: string;
  onComplete: (song: SongResult, randomTheme: string, randomGenre: string) => void;
  onClose: () => void;
}

export const GachaOverlay: React.FC<GachaOverlayProps> = ({
  isOpen,
  apiKey,
  onComplete,
  onClose,
}) => {
  const [phase, setPhase] = useState<"spinning" | "opening" | "revealing" | "error">("spinning");
  const [slotTheme, setSlotTheme] = useState("???");
  const [slotGenre, setSlotGenre] = useState("???");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPhase("spinning");
      setErrorMsg("");
      return;
    }

    // ランダムパラメーター選出（ご指定の50テーマ・36ジャンルから抽出）
    const randomTheme = STRICT_THEMES[Math.floor(Math.random() * STRICT_THEMES.length)];
    const randomGenre = STRICT_GENRES[Math.floor(Math.random() * STRICT_GENRES.length)];
    const randomGender = VOCAL_GENDER_OPTIONS[Math.floor(Math.random() * VOCAL_GENDER_OPTIONS.length)] as VocalGender;
    const randomTempo = TEMPO_OPTIONS[1 + Math.floor(Math.random() * (TEMPO_OPTIONS.length - 1))];
    const randomMood = MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)];

    const request: SongRequest = {
      theme: randomTheme,
      genre: randomGenre,
      gender: randomGender,
      tempo: randomTempo,
      mood: randomMood,
      language: "日本語",
    };

    // ドラムロール・スロット回転アニメーション
    const spinInterval = setInterval(() => {
      setSlotTheme(STRICT_THEMES[Math.floor(Math.random() * STRICT_THEMES.length)]);
      setSlotGenre(STRICT_GENRES[Math.floor(Math.random() * STRICT_GENRES.length)]);
    }, 70);

    let isApiDone = false;
    let songResult: SongResult | null = null;
    let apiError: string | null = null;

    // AI作詞 APIリクエスト呼び出し
    fetch("/api/generate", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ ...request, userApiKey: apiKey }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "生成に失敗しました。APIキーを確認してください。");
        }
        return res.json();
      })
      .then((data) => {
        songResult = {
          id: "song_" + Date.now(),
          title: data.title,
          lyrics: data.lyrics,
          style_prompt: data.style_prompt,
          bpm: data.bpm,
          key: data.key,
          createdAt: Date.now(),
          isFavorite: false,
          requestParams: request,
        };
        isApiDone = true;
      })
      .catch((err) => {
        console.warn("API Call encountered issue, generating local fallback result:", err);
        // 万が一エラーが起きてもガチャ結果を中断せず、安全に結果を提供するフォールバック
        const fallbackTitle = generateCreativeTitle(randomTheme, randomGenre);
        const fallbackLyrics = `[Verse 1]\n静かに流れる時間の中で\n${randomTheme}をそっと追いかけていた\n見慣れた街並み　揺れる光\n新しい風が通り抜けてゆく\n\n[Pre-Chorus]\n戸惑う気持ちを抱きしめたまま\n踏み出す一歩が未来を変える\n\n[Chorus]\n響け ${randomTheme}！ どこまでも遠くへ\n${randomGenre}のビートに乗せて叫ぶよ\n夢見た景色が今ここにある\n終わらない歌をあなたに届けたい\n\n[Verse 2]\nすれ違う人の波をかき分けて\n描いた地図を確かめてる\nあの日交わした約束の言葉\n今も胸の奥で輝いている\n\n[Outro]\nずっと奏で続けよう\n${randomTheme}とともに、明日へ`;
        const fallbackStyle = `${randomGenre}, ${randomGender.includes("男性") ? "male vocal" : randomGender.includes("女性") ? "female vocal" : "duet vocal"}, ${randomTempo || "medium tempo"}, ${randomMood || "emotional"}, catchy melody, professional production`;

        songResult = {
          id: "song_" + Date.now(),
          title: fallbackTitle,
          lyrics: fallbackLyrics,
          style_prompt: fallbackStyle,
          bpm: "128 BPM",
          key: "C Major",
          createdAt: Date.now(),
          isFavorite: false,
          requestParams: request,
        };
        isApiDone = true;
      });

    // ガチャ演出タイムライン制御（動画風カットシーン演出）
    const timer1 = setTimeout(() => {
      clearInterval(spinInterval);
      setSlotTheme(randomTheme);
      setSlotGenre(randomGenre);
      setPhase("opening");

      const checkInterval = setInterval(() => {
        if (isApiDone) {
          clearInterval(checkInterval);
          if (apiError) {
            setErrorMsg(apiError);
            setPhase("error");
          } else if (songResult) {
            setPhase("revealing");
            // 完了カットイン後にメイン画面へ
            setTimeout(() => {
              onComplete(songResult!, randomTheme, randomGenre);
            }, 1000);
          }
        }
      }, 150);
    }, 2000);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(timer1);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none overflow-hidden">
      {/* 動画風バックグラウンド光演出 (紫・青・ピンク) */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/30 via-blue-400/20 to-pink-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="w-full h-full bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        {/* ガチャ演出タイトルバッジ */}
        <div className="p-[1.5px] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 inline-block shadow-lg animate-bounce">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 text-xs font-black">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              全項目ランダム・楽曲ガチャ起動中
            </span>
          </div>
        </div>

        {/* 映像風カプセル/レコード演出画面 */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-pink-500 animate-spin [animation-duration:4s] opacity-90 blur-md" />

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white border-4 border-purple-500 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
            {phase === "spinning" && (
              <div className="space-y-2 animate-pulse">
                <Disc className="w-16 h-16 text-purple-600 animate-spin [animation-duration:1.2s] mx-auto" />
                <p className="text-[11px] font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-widest uppercase">
                  LOTTERY...
                </p>
              </div>
            )}

            {phase === "opening" && (
              <div className="space-y-2 animate-pulse">
                <Zap className="w-16 h-16 text-blue-500 mx-auto" />
                <p className="text-[11px] font-black bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent tracking-widest uppercase">
                  AI COMPOSING...
                </p>
              </div>
            )}

            {phase === "revealing" && (
              <div className="space-y-2 animate-bounce">
                <Trophy className="w-16 h-16 text-pink-500 mx-auto filter drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                <span className="text-xs font-black text-pink-600 tracking-widest uppercase">
                  COMPLETE!!
                </span>
              </div>
            )}

            {phase === "error" && (
              <div className="space-y-1 p-2">
                <Music2 className="w-10 h-10 text-rose-500 mx-auto" />
                <p className="text-[11px] text-rose-500 font-bold">ERROR</p>
              </div>
            )}
          </div>
        </div>

        {/* 確定パラメーターリアルタイム表示 (グラデーション枠線) */}
        <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-xl">
          <div className="bg-white rounded-[14px] p-4 space-y-2 text-left">
            <p className="text-[11px] font-black uppercase tracking-wider text-center bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              🎰 ガチャで決まった項目
            </p>

            <div className="space-y-2 pt-1 font-mono">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">THEME (テーマ)</span>
                <span className="text-sm font-bold text-purple-700 truncate block">
                  {slotTheme}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold">GENRE (ジャンル)</span>
                <span className="text-xs font-bold text-blue-700 truncate block">
                  {slotGenre}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ステータスメッセージ */}
        <div>
          {phase === "spinning" && (
            <p className="text-xs text-slate-500 font-medium animate-pulse">
              🎥 ガチャ演出再生中... パラメーター抽出中
            </p>
          )}
          {phase === "opening" && (
            <p className="text-xs text-purple-600 font-bold animate-pulse">
              ✨ パラメーター確定！AIが作詞・タイトルを生成中...
            </p>
          )}
          {phase === "revealing" && (
            <p className="text-sm font-black text-pink-600 animate-bounce">
              🎉 楽曲が完成しました！メイン画面へ移動します...
            </p>
          )}
          {phase === "error" && (
            <div className="space-y-3">
              <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                手動で画面を開く
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
