export interface JishoJapaneseWord {
  word?: string;
  reading: string;
}

export interface JishoSense {
  english_definitions: string[];
  parts_of_speech: string[];
  tags: string[];
  links: Array<{ text: string; url: string }>;
}

export interface JishoAttribution {
  jmdict: boolean;
  jmnedict: boolean;
  dbpedia?: string | false;
}

export interface JishoEntry {
  slug: string;
  is_common: boolean;
  tags: string[];
  jlpt: string[];
  japanese: JishoJapaneseWord[];
  senses: JishoSense[];
  attribution: JishoAttribution;
}

export interface JishoSearchResponse {
  data: JishoEntry[];
}
