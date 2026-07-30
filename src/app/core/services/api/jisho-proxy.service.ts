import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JishoSearchResponse } from '@core/models/api/jisho.model';
import { JISHO_PROXY_BASE_URL } from './dictionary-api.tokens';

@Injectable({ providedIn: 'root' })
export class JishoProxyService {
  private http = inject(HttpClient);
  private baseUrl = inject(JISHO_PROXY_BASE_URL);

  searchWords(keyword: string): Observable<JishoSearchResponse> {
    const params = new HttpParams().set('keyword', keyword.trim());
    return this.http.get<JishoSearchResponse>(`${this.baseUrl}/search`, { params });
  }
}
