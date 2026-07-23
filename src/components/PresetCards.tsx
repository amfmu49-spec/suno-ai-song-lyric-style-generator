import React from "react";
import { GENRE_PRESETS } from "../data/presets";
import { GenrePreset } from "../types";
import { Zap, Sparkles, Cpu, Flame, Moon, Radio, Heart, Volume2 } from "lucide-react";

interface PresetCardsProps {
  onSelectPreset: (preset: GenrePreset) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-4 h-4 text-amber-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-orange-400" />,
  Cpu: <Cpu className="w-4 h-4 text-cyan-400" />,
  Flame: <Flame className="w-4 h-4 text-rose-400" />,
  Moon: <Moon className="w-4 h-4 text-indigo-400" />,
  Radio: <Radio className="w-4 h-4 text-purple-400" />,
  Heart: <Heart className="w-4 h-4 text-pink-400" />,
  Volume2: <Volume2 className="w-4 h-4 text-emerald-400" />,
};

export const PresetCards: React.FC<PresetCardsProps> = ({ onSelectPreset }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          クイック発想プリセット（ワンタップで入力セット）
        </h2>
        <span className="text-xs text-slate-500">クリックしてテーマ・ジャンルを自動入力</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GENRE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset)}
            className="group relative p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 text-left transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-slate-700/80 transition-colors">
                  {ICON_MAP[preset.iconName] || <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                  {preset.category}
                </span>
              </div>
              <h3 className="font-semibold text-xs text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                {preset.name}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                {preset.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
              <span className="truncate max-w-[80%]">Theme: {preset.suggestedTheme}</span>
              <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform font-bold">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
