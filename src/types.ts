export type VocalGender = "女性ボーカル (Female Vocal)" | "男性ボーカル (Male Vocal)" | "中性・デュエット (Neutral / Duet)";

export interface SongRequest {
  theme: string;
  genre: string;
  gender: VocalGender;
  tempo?: string;
  mood?: string;
  language?: string;
  additionalNotes?: string;
}

export interface SongResult {
  id: string;
  title: string;
  lyrics: string;
  style_prompt: string;
  bpm?: string;
  key?: string;
  createdAt: number;
  isFavorite?: boolean;
  requestParams: SongRequest;
}

export interface GenrePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  suggestedTheme: string;
  gender: VocalGender;
  styleTemplate: string;
  iconName: string;
}

export interface MetatagInfo {
  tag: string;
  label: string;
  description: string;
  category: "structure" | "instrumental" | "vocal" | "dynamic";
}
