import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  MuzukanjiKanjiDetail,
  MuzukanjiKanjiSummary,
  MuzukanjiListResponse,
} from '@features/models/muzukanji.model';
import { MUZUKANJI_API_BASE_URL } from './dictionary-api.tokens';

@Injectable({ providedIn: 'root' })
export class MuzukanjiService {
  private http = inject(HttpClient);
  private baseUrl = inject(MUZUKANJI_API_BASE_URL);

  searchByKanji(kanji: string): Observable<MuzukanjiKanjiSummary[]> {
    const params = new HttpParams().set('kanji', kanji.trim());
    return this.http
      .get<MuzukanjiListResponse<MuzukanjiKanjiSummary>>(`${this.baseUrl}/kanji`, { params })
      .pipe(map((response) => response.data ?? []));
  }

  getKanjiById(id: number): Observable<MuzukanjiKanjiDetail> {
    return this.http.get<MuzukanjiKanjiDetail>(`${this.baseUrl}/kanji/${id}`);
  }
}
