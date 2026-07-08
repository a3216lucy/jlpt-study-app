import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  KanjiAliveKanjiDetail,
  KanjiAliveSearchResult,
} from '@shared/models/kanji-alive.model';
import { KANJI_ALIVE_API_CONFIG } from './dictionary-api.tokens';

@Injectable({ providedIn: 'root' })
export class KanjiAliveService {
  private http = inject(HttpClient);
  private config = inject(KANJI_ALIVE_API_CONFIG);

  search(query: string): Observable<KanjiAliveSearchResult[]> {
    return this.http.get<KanjiAliveSearchResult[]>(
      `${this.config.baseUrl}${this.config.searchPath.replace('{query}', encodeURIComponent(query.trim()))}`,
      {
        headers: this.buildHeaders(),
      },
    );
  }

  getKanji(character: string): Observable<KanjiAliveKanjiDetail> {
    return this.http.get<KanjiAliveKanjiDetail>(
      `${this.config.baseUrl}${this.config.detailPath.replace('{character}', encodeURIComponent(character))}`,
      {
        headers: this.buildHeaders(),
      },
    );
  }

  private buildHeaders(): HttpHeaders | undefined {
    if (!this.config.apiKey) {
      return undefined;
    }

    return new HttpHeaders({
      [this.config.apiKeyHeader]: this.config.apiKey,
    });
  }
}
