import { InjectionToken } from '@angular/core';

export interface KanjiAliveApiConfig {
  baseUrl: string;
  apiKey: string | null;
  apiKeyHeader: string;
  searchPath: string;
  detailPath: string;
}

export const JISHO_PROXY_BASE_URL = new InjectionToken<string>('JISHO_PROXY_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api/jisho',
});

export const KANJI_ALIVE_API_CONFIG = new InjectionToken<KanjiAliveApiConfig>(
  'KANJI_ALIVE_API_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      baseUrl: 'https://app.kanjialive.com/api/public',
      apiKey: null,
      apiKeyHeader: 'X-API-KEY',
      searchPath: '/search/{query}',
      detailPath: '/kanji/{character}',
    }),
  },
);

export const MUZUKANJI_API_BASE_URL = new InjectionToken<string>('MUZUKANJI_API_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api/muzukanji/api/v1',
});
