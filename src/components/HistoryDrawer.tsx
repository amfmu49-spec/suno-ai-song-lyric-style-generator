import React, { useState } from "react";
import { SongResult } from "../types";
import { formatSunoPackage } from "../utils/sunoHelper";
import {
  X,
  History,
  Star,
  Trash2,
  Download,
  Search,
  Music,
  Calendar,
} from "lucide-react";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SongResult[];
  onSelectSong: (song: SongResult) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteSong: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectSong,
  onToggleFavorite,
  onDeleteSong,
  onClearAll,
}) => {
  const [search, setSearch] = useState("");
  const [showOnlyFav, setShowOnlyFav] = useState(false);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (showOnlyFav && !item.isFavorite) return false;
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.requestParams.theme.toLowerCase().includes(query) ||
      item.requestParams.genre.toLowerCase().includes(query)
    );
  });

  const handleDownloadTxt = (e: React.MouseEvent, item: SongResult) => {
    e.stopPropagation();
    const pkg = formatSunoPackage(item.title, item.style_prompt, item.lyrics);
    const blob = new Blob([pkg], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Suno_${item.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-slate-100">生成履歴・保存ライブラリ</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="タイトル・テーマで検索..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setShowOnlyFav(!showOnlyFav)}
              className={`flex items-center gap-1 font-medium px-2.5 py-1 rounded-lg border transition-all ${
                showOnlyFav
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showOnlyFav ? "fill-current" : ""}`} />
              <span>お気に入りのみ</span>
            </button>

            {history.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-slate-500 hover:text-rose-400 text-xs transition-colors"
              >
                全消去
              </button>
            )}
          </div>
        </div>

        {/* List Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <Music className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p>保存された楽曲履歴はありません。</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectSong(item);
                  onClose();
                }}
                className="group relative p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer transition-all text-left"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className={`p-1 rounded hover:bg-slate-700 transition-colors ${
                        item.isFavorite
                          ? "text-amber-400"
                          : "text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.isFavorite ? "fill-current" : ""}`} />
                    </button>

                    <button
                      onClick={(e) => handleDownloadTxt(e, item)}
                      className="p-1 rounded text-slate-500 hover:text-amber-300 hover:bg-slate-700 transition-colors"
                      title=".txtファイルで保存"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSong(item.id);
                      }}
                      className="p-1 rounded text-slate-600 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1 mb-2">
                  テーマ: {item.requestParams.theme}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                      {item.requestParams.genre}
                    </span>
                    <span className="bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                      {item.requestParams.gender.split(" ")[0]}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-600" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
