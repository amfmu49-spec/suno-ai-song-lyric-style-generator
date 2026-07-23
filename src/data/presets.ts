import { MetatagInfo, GenrePreset } from "../types";

export const STRICT_THEMES = [
  "恋愛",
  "不倫",
  "卒業",
  "親子",
  "友情",
  "片思い",
  "失恋",
  "再会",
  "青春",
  "旅立ち",
  "応援",
  "受験",
  "誕生日",
  "お祝い",
  "別れ",
  "後悔",
  "希望",
  "夢",
  "挫折",
  "挑戦",
  "感謝",
  "日常",
  "疲労",
  "休日",
  "運命",
  "秘密",
  "嘘",
  "郷愁",
  "絆",
  "裏切り",
  "決意",
  "絶望",
  "孤独",
  "嫉妬",
  "執着",
  "復讐",
  "葛藤",
  "狂気",
  "破滅",
  "束縛",
  "覚醒",
  "奇跡",
  "平和",
  "焦燥",
  "記憶",
  "祈り",
  "迷い",
  "衝動",
  "幻影",
  "自由"
];

export const STRICT_GENRES = [
  "邦ロック",
  "V系 (ヴィジュアル系)",
  "ゴシックメタル",
  "オルタナティヴ・ロック",
  "パンクロック",
  "EDM",
  "シンセウェーブ",
  "アニソン風ポップス",
  "シティポップ",
  "フューチャーベース",
  "メロディックハードコア",
  "エレクトロ・ポップ",
  "ピアノバラード",
  "ローファイ・ヒップホップ",
  "ジャズ・フュージョン",
  "メタルコア",
  "ケルティック・ファンタジー",
  "R&B",
  "ファンク",
  "チップチューン (8bit)",
  "ボカロ風ロック",
  "スカパンク",
  "エピック・オーケストラ",
  "シューゲイザー",
  "アンビエント",
  "トランス",
  "グランジ",
  "ボサノヴァ",
  "テクノ",
  "フォークロック",
  "Jazz",
  "jazz rock",
  "numetal",
  "phonk",
  "デスコア",
  "サイバー演歌"
];

export const THEME_SUGGESTIONS = STRICT_THEMES;
export const GENRE_OPTIONS = STRICT_GENRES;

export const VOCAL_GENDER_OPTIONS = [
  "女性ボーカル (Female Vocal)",
  "男性ボーカル (Male Vocal)",
  "中性・デュエット (Neutral / Duet)"
];

export const TEMPO_OPTIONS = [
  "Auto (AIにおまかせ)",
  "Fast Tempo (150-180 BPM)",
  "Medium Tempo (110-135 BPM)",
  "Slow Tempo (70-95 BPM)"
];

export const MOOD_OPTIONS = [
  "Emotional & Nostalgic",
  "Energetic & Powerful",
  "Dark & Mysterious",
  "Chill & Relaxed",
  "Dramatic & Epic"
];

export const SUNO_METATAGS: MetatagInfo[] = [
  { tag: "[Verse]", label: "Aメロ/Bメロ", description: "物語が展開する主旋律ブロック", category: "structure" },
  { tag: "[Chorus]", label: "サビ", description: "曲の最高潮・一番の盛り上がり部分", category: "structure" },
  { tag: "[Intro]", label: "イントロ", description: "前奏パート", category: "structure" },
  { tag: "[Outro]", label: "アウトロ", description: "後奏・エンディング", category: "structure" },
  { tag: "[Bridge]", label: "Cメロ/大サビ", description: "展開が変わるブリッジパート", category: "structure" },
  { tag: "[Guitar Solo]", label: "ギターソロ", description: "間奏ギターパート", category: "instrumental" },
  { tag: "[Drop]", label: "ドロップ", description: "EDM等の爆発的なサビ展開", category: "dynamic" },
];

export const GENRE_PRESETS: GenrePreset[] = [
  {
    id: "J-Rock",
    name: "エモ系邦ロック",
    category: "Rock",
    description: "疾走感と切なさが交差する現代風ロック",
    suggestedTheme: "青春",
    gender: "男性ボーカル (Male Vocal)",
    styleTemplate: "Japanese Rock, emotional, driving drums",
    iconName: "Flame"
  },
  {
    id: "CityPop",
    name: "レトロ・シティポップ",
    category: "Pop",
    description: "80年代都会的でおしゃれなチルサウンド",
    suggestedTheme: "日常",
    gender: "女性ボーカル (Female Vocal)",
    styleTemplate: "City Pop, retro 80s, groovy bass, saxophone",
    iconName: "Disc"
  },
];
