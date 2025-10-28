
export interface GrammarExample {
  source: 'TKA' | 'Baru';
  japanese: string;
  translation: string;
}

export interface GrammarPoint {
  part: string;
  title: string;
  hiragana?: string;
  reading?: string;
  function: string;
  examples: GrammarExample[];
}

export interface VocabularyWord {
  romaji: string;
  japanese:string;
  indonesian: string;
  category: string;
}
