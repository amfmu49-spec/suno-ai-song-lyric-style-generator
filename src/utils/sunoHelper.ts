export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Fallback copy failed", err);
    return false;
  }
}

export function formatSunoPackage(title: string, stylePrompt: string, lyrics: string): string {
  return `=== SUNO AI SONG PACKAGE ===
【Title / 楽曲名】
${title}

【Style of Music / スタイルプロンプト】
${stylePrompt}

【Lyrics / 歌詞】
${lyrics}
===========================`;
}

export function truncateStylePrompt(prompt: string, maxLen = 120): string {
  if (prompt.length <= maxLen) return prompt;
  const parts = prompt.split(",").map(p => p.trim());
  let result = "";
  for (const part of parts) {
    if ((result ? result + ", " + part : part).length <= maxLen) {
      result = result ? result + ", " + part : part;
    } else {
      break;
    }
  }
  return result || prompt.slice(0, maxLen);
}
