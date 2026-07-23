import React, { useState, useEffect } from "react";
import { SongResult } from "../types";
import { SUNO_METATAGS } from "../data/presets";
import {
  copyToClipboard,
  formatSunoPackage,
  truncateStylePrompt,
} from "../utils/sunoHelper";
import {
  Copy,
  Check,
  Edit3,
  Eye,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Star,
  RefreshCw,
  Send,
  Wand2,
  AlertTriangle,
  Music,
  Share2,
} from "lucide-react";

interface LyricsDisplayProps {
  song: SongResult;
  onUpdateSong: (updated: SongResult) => void;
  onToggleFavorite: (id: string) => void;
  onRefineSong: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  song,
  onUpdateSong,
  onToggleFavorite,
  onRefineSong,
  isRefining,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedPackage, setCopiedPackage] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(song.title);
  const [editedPrompt, setEditedPrompt] = useState(song.style_prompt);
  const [editedLyrics, setEditedLyrics] = useState(song.lyrics);

  const [refineInstruction, setRefineInstruction] = useState("");

  // Speech synthesis states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"female" | "male">("female");
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  useEffect(() => {
    setEditedTitle(song.title);
    setEditedPrompt(song.style_prompt);
    setEditedLyrics(song.lyrics);
    setIsEditing(false);
    // Stop audio on song change
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }, [song]);

  // Copy Handlers
  const handleCopyPrompt = async () => {
    const success = await copyToClipboard(editedPrompt);
    if (success) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleCopyLyrics = async () => {
    const success = await copyToClipboard(editedLyrics);
    if (success) {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    }
  };

  const handleCopyPackage = async () => {
    const pkg = formatSunoPackage(editedTitle, editedPrompt, editedLyrics);
    const success = await copyToClipboard(pkg);
    if (success) {
      setCopiedPackage(true);
      setTimeout(() => setCopiedPackage(false), 2000);
    }
  };

  const handleOptimizePrompt = () => {
    const opt = truncateStylePrompt(editedPrompt, 120);
    setEditedPrompt(opt);
    onUpdateSong({ ...song, style_prompt: opt });
  };

  const handleSaveEdits = () => {
    onUpdateSong({
      ...song,
      title: editedTitle,
      style_prompt: editedPrompt,
      lyrics: editedLyrics,
    });
    setIsEditing(false);
  };

  const handleInsertMetatag = (tag: string) => {
    setEditedLyrics((prev) => prev + `\n${tag}\n`);
  };

  // Web Speech API Vocal Reading Preview
  const handleToggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("お使いのブラウザは音声読み上げ（SpeechSynthesis）に対応していません。");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    // Clean lyrics by removing bracketed metatags for speech reading
    const cleanLyricsForSpeech = editedLyrics
      .replace(/\[.*?\]/g, "")
      .replace(/\n\s*\n/g, "\n");

    const utterance = new SpeechSynthesisUtterance(cleanLyricsForSpeech);
    utterance.lang = "ja-JP";
    utterance.rate = speechRate;

    // Pitch adjustment for male/female feel
    if (voiceGender === "female") {
      utterance.pitch = 1.2;
    } else {
      utterance.pitch = 0.8;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInstruction.trim()) return;
    onRefineSong(refineInstruction.trim());
    setRefineInstruction("");
  };

  // Helper to highlight metatags in formatted lyrics view
  const renderFormattedLyrics = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      const isMetatag = /^\[.*\]$/.test(trimmed) || /^\(.*\)$/.test(trimmed);

      if (isMetatag) {
        let badgeColor = "bg-amber-500/10 text-amber-300 border-amber-500/30";
        if (trimmed.includes("Chorus") || trimmed.includes("サビ")) {
          badgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold";
        } else if (trimmed.includes("Verse") || trimmed.includes("Aメロ")) {
          badgeColor = "bg-sky-500/10 text-sky-300 border-sky-500/30";
        } else if (trimmed.includes("Bridge") || trimmed.includes("Cメロ")) {
          badgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/40";
        } else if (trimmed.includes("Solo") || trimmed.includes("Drop")) {
          badgeColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
        }

        return (
          <div key={idx} className="my-2 flex items-center gap-2">
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md border tracking-wide ${badgeColor}`}
            >
              {trimmed}
            </span>
            <div className="h-[1px] flex-1 bg-slate-800/80" />
          </div>
        );
      }

      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          {line}
        </p>
      );
    });
  };

  const promptLength = editedPrompt.length;
  const isPromptTooLong = promptLength > 120;

  const isDemoMode = song.isDemo || song.title.includes("[DEMO]");

  return (
    <div className="space-y-6">
      {/* 0. DEMO Mode Guidance Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 border border-amber-500/50 rounded-2xl p-4 sm:p-5 text-amber-200 shadow-xl space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              DEMO モード
            </span>
            <span className="text-xs font-bold text-amber-300">
              ※現在はAPIキー未設定のためデモ用の構成サンプルを表示しています
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
            💡 画面最上部の <strong>「APIキー入力」</strong> 欄に無料の <strong>Gemini APIキー</strong> を入力すると、AIプロデューサーが毎回完全オリジナルの超高クオリティなフル歌詞・タイトルをリアルタイム自動生成します！
          </p>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {isDemoMode && (
                <span className="bg-rose-500/20 text-rose-300 font-bold text-xs px-2.5 py-0.5 rounded-full border border-rose-500/40">
                  DEMOサンプル
                </span>
              )}
              <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {song.requestParams.genre}
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-slate-700">
                {song.requestParams.gender}
              </span>
              {song.bpm && (
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-md font-mono">
                  {song.bpm}
                </span>
              )}
              {song.key && (
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-md font-mono">
                  Key: {song.key}
                </span>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-xl sm:text-2xl font-black text-amber-300 bg-slate-950 border border-amber-500/50 rounded-lg px-3 py-1 outline-none w-full"
              />
            ) : (
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                <span>{editedTitle}</span>
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(song.id)}
              className={`p-2.5 rounded-xl border transition-all ${
                song.isFavorite
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={song.isFavorite ? "お気に入り解除" : "お気に入り登録"}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleCopyPackage}
              className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-700 transition-all"
              title="楽曲情報・プロンプト・歌詞を一括コピー"
            >
              {copiedPackage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">コピー完了</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>一括コピー</span>
                </>
              )}
            </button>

            {isEditing ? (
              <button
                onClick={handleSaveEdits}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <Check className="w-4 h-4" />
                <span>保存する</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2.5 rounded-xl border border-slate-700 transition-all"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>直接編集</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Suno AI Style Prompt Card */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-amber-500/30 shadow-lg relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
              Suno AI 専用
            </span>
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
              <span>スタイルプロンプト（Style of Music）</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Character count & notice */}
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                isPromptTooLong
                  ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40"
                  : "bg-slate-800 text-slate-400"
              }`}
              title="Suno AIのStyle of Music推奨文字数は約120文字です"
            >
              {promptLength} / 120 文字
            </span>

            {isPromptTooLong && (
              <button
                onClick={handleOptimizePrompt}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30 transition-colors flex items-center gap-1"
                title="120文字以内に要約・最適化します"
              >
                <Wand2 className="w-3 h-3" />
                <span>120字に最適化</span>
              </button>
            )}
          </div>
        </div>

        {/* Prompt content */}
        {isEditing ? (
          <textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-3 font-mono text-xs text-amber-300 outline-none resize-none"
          />
        ) : (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-amber-300 font-mono text-xs leading-relaxed select-all">
            {editedPrompt}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            {isPromptTooLong && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
            Suno AIの「Style of Music」欄にそのまま貼り付けて使用できます。
          </span>

          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3.5 py-2 rounded-lg border border-amber-500/40 transition-all cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">コピー完了！</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>スタイルプロンプトをコピー</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Lyrics Studio Section */}
      <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              <Music className="w-5 h-5 text-amber-400" />
              <span>歌唱用歌詞（Lyrics）</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              語り・台詞なしの純粋歌唱構成（[Verse 1], [Chorus]などのSunoメタタグ含む）
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View / Edit Mode Switch */}
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  !isEditing
                    ? "bg-slate-800 text-amber-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>整形表示</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  isEditing
                    ? "bg-slate-800 text-amber-300 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>編集・メタタグ挿入</span>
              </button>
            </div>

            {/* Vocal Reading Player Button */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                isPlayingAudio
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
              }`}
              title="歌詞の流れをWeb音声でテスト試聴"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>試聴停止</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>仮歌で流し読み</span>
                </>
              )}
            </button>

            {/* Copy Lyrics Button */}
            <button
              onClick={handleCopyLyrics}
              className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg shadow-md transition-all cursor-pointer"
            >
              {copiedLyrics ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>コピー完了！</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>歌詞をコピー</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Metatag Bar in Edit Mode */}
        {isEditing && (
          <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 mb-2 block">
              ワンタップでSuno AIメタタグを挿入:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUNO_METATAGS.map((m) => (
                <button
                  key={m.tag}
                  type="button"
                  onClick={() => handleInsertMetatag(m.tag)}
                  className="text-[11px] bg-slate-900 hover:bg-slate-800 text-amber-300 px-2 py-1 rounded border border-slate-700/60 transition-colors"
                  title={m.description}
                >
                  + {m.tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Lyrics Body */}
        {isEditing ? (
          <textarea
            value={editedLyrics}
            onChange={(e) => setEditedLyrics(e.target.value)}
            rows={18}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-100 leading-relaxed outline-none focus:border-amber-500/50"
          />
        ) : (
          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/80 space-y-2 font-mono">
            {renderFormattedLyrics(editedLyrics)}
          </div>
        )}
      </div>

      {/* 4. AI Producer Refine Assistant */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-200">
              AIプロデューサーへのリライト・微調整指示
            </h4>
            <p className="text-xs text-slate-400">
              「サビをもっと情熱的にして」「Bメロに英語フレーズを入れて」「スタイルをよりヘヴィにして」など自由に指示できます
            </p>
          </div>
        </div>

        <form onSubmit={handleRefineSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={refineInstruction}
            onChange={(e) => setRefineInstruction(e.target.value)}
            placeholder="例: サビの語尾を力強く変更し、スタイルプロンプトに powerful guitar solo を追加"
            className="flex-1 bg-slate-950 border border-slate-700/80 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
            disabled={isRefining}
          />
          <button
            type="submit"
            disabled={isRefining || !refineInstruction.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isRefining ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>指示する</span>
          </button>
        </form>
      </div>
    </div>
  );
};
