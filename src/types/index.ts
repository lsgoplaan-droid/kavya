export type InputMethod = 'type' | 'camera' | 'voice' | 'paste';

export interface TranslationLine {
  original: string;
  literal: string;
}

export interface PoemContext {
  identified: boolean;
  workTitle?: string | null;
  author?: string | null;
  chapterOrSection?: string | null;
  period?: string | null;
  tradition?: string | null;
  notes?: string | null;
}

export interface TranslationResult {
  originalText: string;
  lines: TranslationLine[];
  poeticMeaning: string;
  tamilMeaning: string;
  hindiMeaning: string;
  context: PoemContext;
  detectedLanguage: string;
  parseError?: boolean;
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  inputMethod: InputMethod;
  originalText: string;
  result: TranslationResult;
  imageUri?: string;
}
