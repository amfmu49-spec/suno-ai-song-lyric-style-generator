import React from "react";
import { X, HelpCircle, ExternalLink, CheckCircle2 } from "lucide-react";

interface SunoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SunoGuideModal: React.FC<SunoGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-base text-slate-100">
              Suno AI（suno.com）での楽曲生成手順
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
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">
                  Suno AI（suno.com）へアクセス
                </h4>
                <p className="text-slate-400 text-xs">
                  ブラウザで Suno AI の公式サイトを開き、ログイン後に画面左上の「Create」ボタンをクリックします。
                </p>
                <a
                  href="https://suno.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-semibold mt-2"
                >
                  <span>suno.com を開く</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">
                  「Custom」モードをONにする
                </h4>
                <p className="text-slate-400 text-xs">
                  Suno生成画面のトグルスイッチ「Custom」をオンにします。これにより「Lyrics」「Style of Music」「Title」の入力欄が表示されます。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">
                  生成データをコピー＆ペースト
                </h4>
                <ul className="text-slate-400 text-xs space-y-1.5 mt-1 list-disc list-inside">
                  <li>
                    <strong className="text-amber-300">Style of Music 欄:</strong> 当ツールの「スタイルプロンプトをコピー」ボタンでコピーして貼り付け
                  </li>
                  <li>
                    <strong className="text-amber-300">Lyrics 欄:</strong> 当ツールの「歌詞をコピー」ボタンでコピーして貼り付け
                  </li>
                  <li>
                    <strong className="text-amber-300">Title 欄:</strong> 生成されたタイトルを入力
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">
                  「Create」ボタンを押して完成！
                </h4>
                <p className="text-slate-400 text-xs">
                  数十秒で高品質なフルボーカル楽曲が2パターン生成されます。納得がいかない場合は、当ツールの「AIプロデューサーへのリライト指示」でプロンプトを再微調整できます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition-colors"
          >
            理解しました
          </button>
        </div>
      </div>
    </div>
  );
};
