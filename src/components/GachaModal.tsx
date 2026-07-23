import React, { useState, useEffect } from "react";
import { SongRequest, SongResult, VocalGender } from "../types";
import {
  THEME_SUGGESTIONS,
  GENRE_OPTIONS,
  VOCAL_GENDER_OPTIONS,
  TEMPO_OPTIONS,
  MOOD_OPTIONS,
} from "../data/presets";
import { Sparkles, Disc, Music, Zap, Trophy, Flame } from "lucide-react";
import { generateSongWithAiOrFallback } from "../utils/lyricGenerator";

interface GachaModalProps {
  isOpen: boolean;
  onComplete: (song: SongResult) => void;
  onClose: () => void;
  apiKey?: string;
}

export const GachaModal: React.FC<GachaModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  apiKey = "",
}) => {
  const [phase, setPhase] = useState<"spinning" | "opening" | "revealing" | "error">("spinning");
  const [slotTheme, setSlotTheme] = useState("???");
  const [slotGenre, setSlotGenre] = useState("???");
  const [slotGender, setSlotGender] = useState("???");
  const [slotTempo, setSlotTempo] = useState("???");
  const [slotMood, setSlotMood] = useState("???");

  const [generatedSong, setGeneratedSong] = useState<SongResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPhase("spinning");
      setGeneratedSong(null);
      setErrorMsg("");
      return;
    }

    // 1. Pick Random Parameters for the song
    const randomTheme = THEME_SUGGESTIONS[Math.floor(Math.random() * THEME_SUGGESTIONS.length)];
    const randomGenre = GENRE_OPTIONS[Math.floor(Math.random() * GENRE_OPTIONS.length)];
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

    // Slot Spinning Animation effect
    const spinInterval = setInterval(() => {
      setSlotTheme(THEME_SUGGESTIONS[Math.floor(Math.random() * THEME_SUGGESTIONS.length)]);
      setSlotGenre(GENRE_OPTIONS[Math.floor(Math.random() * GENRE_OPTIONS.length)]);
      setSlotGender(VOCAL_GENDER_OPTIONS[Math.floor(Math.random() * VOCAL_GENDER_OPTIONS.length)]);
      setSlotTempo(TEMPO_OPTIONS[Math.floor(Math.random() * TEMPO_OPTIONS.length)]);
      setSlotMood(MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)]);
    }, 80);

    let isApiDone = false;
    let songResult: SongResult | null = null;
    let apiError: string | null = null;

    // AI作詞（Gemini API または 高機能AIフォールバック作詞エンジン）呼び出し
    generateSongWithAiOrFallback(request, apiKey)
      .then((res) => {
        songResult = res;
        isApiDone = true;
      })
      .catch((err) => {
        console.error("Gacha generation error:", err);
        apiError = err.message || "ガチャ生成エラーが発生しました";
        isApiDone = true;
      });

    // Sequence controller
    // Stage 1: Spin slots for 2 seconds
    const timer1 = setTimeout(() => {
      clearInterval(spinInterval);
      // Lock down parameters
      setSlotTheme(randomTheme);
      setSlotGenre(randomGenre);
      setSlotGender(randomGender);
      setSlotTempo(randomTempo);
      setSlotMood(randomMood);
      setPhase("opening");

      // Stage 2: Capsule opening animation & wait for API
      const checkInterval = setInterval(() => {
        if (isApiDone) {
          clearInterval(checkInterval);
          if (apiError) {
            setErrorMsg(apiError);
            setPhase("error");
          } else if (songResult) {
            setGeneratedSong(songResult);
            setPhase("revealing");

            // Stage 3: After short victory reveal cutscene, transition to main page with completed song
            setTimeout(() => {
              onComplete(songResult!);
            }, 1200);
          }
        }
      }, 200);
    }, 2200);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(timer1);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none overflow-hidden">
      {/* Dynamic Gacha Background Grid & Rays */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-rose-500/30 rounded-full blur-[140px] animate-pulse" />
        <div className="w-full h-full bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 text-xs text-amber-300 font-bold shadow-lg shadow-amber-500/10 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>全項目ランダム・楽曲ガチャ演出起動中</span>
        </div>

        {/* Central Capsule / Jukebox Display */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 animate-spin [animation-duration:6s] opacity-70 blur-md" />

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-slate-900 border-4 border-amber-400/80 flex flex-col items-center justify-center shadow-2xl shadow-amber-500/30 overflow-hidden">
            {phase === "spinning" && (
              <div className="space-y-2 animate-pulse">
                <Disc className="w-16 h-16 text-amber-400 animate-spin [animation-duration:1.5s] mx-auto" />
                <p className="text-xs font-black text-amber-300 tracking-widest uppercase">
                  SAMPLING...
                </p>
              </div>
            )}

            {phase === "opening" && (
              <div className="space-y-2 animate-ping [animation-duration:1s]">
                <Zap className="w-20 h-20 text-orange-400 mx-auto" />
                <p className="text-xs font-black text-amber-300">COMPOSING...</p>
              </div>
            )}

            {phase === "revealing" && (
              <div className="space-y-2 animate-bounce">
                <Trophy className="w-20 h-20 text-amber-400 mx-auto filter drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                <span className="text-xs font-black text-emerald-400 tracking-wider">
                  COMPLETE!!
                </span>
              </div>
            )}

            {phase === "error" && (
              <div className="space-y-1">
                <p className="text-xs text-rose-400 font-bold">ERROR</p>
              </div>
            )}
          </div>
        </div>

        {/* Slot Machine Parameters Display */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2.5">
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>確定パラメーター（AI作詞条件）</span>
          </p>

          <div className="grid grid-cols-2 gap-2 text-left text-xs font-mono">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 col-span-2">
              <span className="text-[10px] text-slate-500 block">THEME (テーマ)</span>
              <span className="font-bold text-amber-300 truncate block">
                {slotTheme}
              </span>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">GENRE (ジャンル)</span>
              <span className="font-semibold text-slate-200 truncate block">
                {slotGenre}
              </span>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">VOCAL (性別)</span>
              <span className="font-semibold text-slate-200 truncate block">
                {slotGender.split(" ")[0]}
              </span>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">TEMPO (速度)</span>
              <span className="font-semibold text-slate-300 truncate block">
                {slotTempo}
              </span>
            </div>

            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">MOOD (雰囲気)</span>
              <span className="font-semibold text-slate-300 truncate block">
                {slotMood.split(" ")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div>
          {phase === "spinning" && (
            <p className="text-xs text-slate-400 animate-pulse">
              🎰 パラメーターをランダム抽選中...
            </p>
          )}
          {phase === "opening" && (
            <p className="text-xs text-amber-300 font-semibold animate-pulse">
              🪄AI作詞家がタイトル・歌詞・Sunoプロンプトを構築中...
            </p>
          )}
          {phase === "revealing" && (
            <p className="text-sm font-bold text-emerald-400 animate-bounce">
              🎉 楽曲完成！ メインスタジオへ移動します...
            </p>
          )}
          {phase === "error" && (
            <div className="space-y-2">
              <p className="text-xs text-rose-400">{errorMsg}</p>
              <button
                onClick={onClose}
                className="bg-slate-800 text-slate-200 text-xs px-4 py-2 rounded-xl"
              >
                閉じる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
