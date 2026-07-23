import React, { useState } from "react";
import { SongRequest, VocalGender } from "../types";
import {
  THEME_SUGGESTIONS,
  GENRE_OPTIONS,
  VOCAL_GENDER_OPTIONS,
  TEMPO_OPTIONS,
  MOOD_OPTIONS,
} from "../data/presets";
import { Music2, Dice5, Sliders, Wand2, Sparkles, AlertCircle } from "lucide-react";

interface SongFormProps {
  onSubmit: (data: SongRequest) => void;
  onOpenGacha?: () => void;
  isLoading: boolean;
  initialValues?: Partial<SongRequest>;
}

export const SongForm: React.FC<SongFormProps> = ({
  onSubmit,
  onOpenGacha,
  isLoading,
  initialValues,
}) => {
  const [theme, setTheme] = useState(initialValues?.theme || "");
  const [genre, setGenre] = useState(initialValues?.genre || "J-Pop");
  const [gender, setGender] = useState<VocalGender>(
    initialValues?.gender || "女性ボーカル (Female Vocal)"
  );
  const [tempo, setTempo] = useState(initialValues?.tempo || "Auto (AIにおまかせ)");
  const [mood, setMood] = useState(initialValues?.mood || "Emotional & Nostalgic (エモーショナル・切ない)");
  const [language, setLanguage] = useState(initialValues?.language || "日本語");
  const [additionalNotes, setAdditionalNotes] = useState(initialValues?.additionalNotes || "");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRandomTheme = () => {
    const random = THEME_SUGGESTIONS[Math.floor(Math.random() * THEME_SUGGESTIONS.length)];
    setTheme(random);
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      setErrorMsg("「テーマ」を入力するか、ダイスボタンでランダム指定してください。");
      return;
    }
    setErrorMsg("");
    onSubmit({
      theme: theme.trim(),
      genre,
      gender,
      tempo: tempo === "Auto (AIにおまかせ)" ? "" : tempo,
      mood,
      language,
      additionalNotes: additionalNotes.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800/90 shadow-xl relative overflow-hidden"
    >
      {/* Decorative accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      {/* Top Banner for Gacha */}
      {onOpenGacha && (
        <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-bounce">🎰</span>
            <div>
              <p className="text-xs font-bold text-amber-300">
                条件完全おまかせ！ランダム楽曲ガチャ
              </p>
              <p className="text-[11px] text-slate-400">
                演出動画が流れる間にAIが自動で作詞からスタイルまで全完成させます
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenGacha}
            className="shrink-0 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 text-xs font-black px-4 py-2 rounded-lg shadow-md transition-all cursor-pointer"
          >
            ガチャを引く
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Music2 className="w-5 h-5 text-amber-400" />
            楽曲パラメーター指定
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            テーマ・ジャンル・ボーカル性別を指定してAIに作詞＆プロンプト生成を依頼
          </p>
        </div>
        <button
          type="button"
          onClick={handleRandomTheme}
          className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-colors"
          title="ランダムなテーマを発想"
        >
          <Dice5 className="w-3.5 h-3.5 text-amber-400" />
          <span>テーマおまかせ</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* 1. Theme (テーマ) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>
              1. テーマ <span className="text-amber-400">*</span>
            </span>
            <span className="text-[11px] font-normal text-slate-500">
              楽曲の世界観・ストーリー・キーワード
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="例: 真夏の夜のドライブと消えない恋心、未来の自分への手紙"
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all outline-none"
            />
          </div>
          {/* Quick theme pills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[10px] text-slate-500 self-center">人気テーマ例:</span>
            {THEME_SUGGESTIONS.slice(0, 3).map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTheme(sug)}
                className="text-[10px] bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded border border-slate-700/50 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Genre (ジャンル) & 3. Vocal Gender (性別) in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Genre */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. 音楽ジャンル <span className="text-amber-400">*</span>
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 transition-all outline-none"
            >
              {GENRE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Vocal Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              3. ボーカルの性別 <span className="text-amber-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {VOCAL_GENDER_OPTIONS.map((v) => {
                const isSelected = gender === v;
                const shortName = v.split(" ")[0];
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setGender(v)}
                    className={`py-2 px-1 text-xs font-medium rounded-lg border text-center transition-all ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 font-semibold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Advanced Accordion Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 font-medium transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>{showAdvanced ? "詳細オプションを隠す" : "詳細オプション（テンポ・雰囲気・特記事項）"}</span>
            <span className="text-[10px] text-slate-500">
              {showAdvanced ? "▲" : "▼"}
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tempo */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    テンポ・スピード
                  </label>
                  <select
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/70 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                  >
                    {TEMPO_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mood */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    楽曲のムード
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/70 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                  >
                    {MOOD_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    歌詞の言語
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/70 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                  >
                    <option value="日本語">日本語 (Japanese)</option>
                    <option value="日本語メイン (一部英語フレーズ混ざり)">日本語＋英語ミックス</option>
                    <option value="英語">English (英語)</option>
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  追加リクエスト・キーワード補足（自由記述）
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="例: サビで転調したい、サックスのソロを入れてほしい、大サビで盛り上がる構成"
                  className="w-full bg-slate-900 border border-slate-700/70 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-slate-950 font-bold py-3.5 px-6 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">プロデューサーAIが楽曲を制作中...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span className="text-sm tracking-wide">
                  楽曲タイトル・歌詞・Sunoプロンプトを生成する
                </span>
                <Sparkles className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};
