import React from "react";
import { SUNO_METATAGS } from "../data/presets";
import { X, Tag, Info } from "lucide-react";

interface MetatagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetatagModal: React.FC<MetatagModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-slate-100">
              Suno AI メタタグ（メタデータ）一覧・解説
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-amber-300 text-xs">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Suno AIでのメタタグの仕組み</p>
              <p className="text-slate-300 mt-1">
                歌詞の中に <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">[Chorus]</code> や <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300">[Guitar Solo]</code> のように角括弧で指示を入れることで、AIが曲の展開やボーカルスタイルを意識して楽曲を生成します。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUNO_METATAGS.map((item) => (
              <div
                key={item.tag}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 mt-1">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
