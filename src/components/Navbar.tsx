import React from "react";
import { Music, History, HelpCircle, Tag, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  onOpenMetatags: () => void;
  onOpenGacha: () => void;
  historyCount: number;
  onNewSong: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenGuide,
  onOpenMetatags,
  onOpenGacha,
  historyCount,
  onNewSong,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo & title */}
        <div
          onClick={onNewSong}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Music className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-amber-400 transition-colors">
                Suno AI Lyric & Style Studio
              </h1>
              <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400">
              AI作詞家・プロデューサー視点のSuno AI最適化ツール
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGacha}
            className="flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 px-3.5 py-2 rounded-lg shadow-md shadow-amber-500/20 transition-all cursor-pointer animate-pulse"
            title="テーマ・ジャンル・性別全おまかせの楽曲ガチャを引く"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🎰 楽曲ガチャ</span>
          </button>

          <button
            onClick={onOpenMetatags}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 px-3 py-2 rounded-lg border border-slate-700/60 transition-all"
            title="Suno AIのメタタグ（[Chorus]や[Guitar Solo]等）の解説"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">メタタグ解説</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 px-3 py-2 rounded-lg border border-slate-700/60 transition-all"
            title="Suno AIへの貼り付け手順"
          >
            <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">使いかたガイド</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-3.5 py-2 rounded-lg border border-amber-500/30 transition-all"
          >
            <History className="w-3.5 h-3.5" />
            <span>履歴</span>
            {historyCount > 0 && (
              <span className="ml-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full inline-flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
