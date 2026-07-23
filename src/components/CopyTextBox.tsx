import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CopyTextBoxProps {
  label: string;
  value: string;
  isTextArea?: boolean;
}

export const CopyTextBox: React.FC<CopyTextBoxProps> = ({ label, value, isTextArea = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('コピーに失敗しました', err);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full my-2">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
          {label}
        </label>
        {copied && (
          <span className="text-[11px] text-pink-600 font-bold animate-pulse">
            コピーしました！
          </span>
        )}
      </div>

      {/* グラデーション枠線ラッパー */}
      <div className="relative group p-[1.5px] rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-sm hover:shadow-md transition-shadow">
        {isTextArea ? (
          <textarea
            readOnly
            value={value}
            className="w-full p-3 pr-12 text-xs sm:text-sm text-slate-800 bg-white rounded-[10px] focus:outline-none resize-none h-64 font-mono leading-relaxed select-all"
          />
        ) : (
          <input
            type="text"
            readOnly
            value={value}
            className="w-full p-3 pr-12 text-xs sm:text-sm text-slate-800 bg-white rounded-[10px] focus:outline-none font-medium select-all"
          />
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 p-2 text-slate-600 bg-slate-100 hover:bg-gradient-to-r hover:from-purple-50 hover:via-blue-50 hover:to-pink-50 border border-slate-200 rounded-lg shadow-sm hover:text-purple-600 transition-all cursor-pointer"
          title="コピーする"
        >
          {copied ? (
            <Check className="w-4 h-4 text-purple-600" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
