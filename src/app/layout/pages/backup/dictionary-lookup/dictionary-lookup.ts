import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JishoEntry } from '@features/models/jisho.model';
import { MuzukanjiKanjiDetail } from '@features/models/muzukanji.model';
import { JishoProxyService } from '@features/services/api/jisho-proxy.service';
import { MuzukanjiService } from '@features/services/api/muzukanji.service';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dictionary-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './dictionary-lookup.html',
})
export class DictionaryLookupComponent {
  private jishoService = inject(JishoProxyService);
  private muzukanjiService = inject(MuzukanjiService);

  query = signal('');
  loading = signal(false);
  results = signal<JishoEntry[]>([]);
  error = signal<string | null>(null);
  searched = signal(false);

  kanjiLoading = signal(false);
  kanjiError = signal<string | null>(null);
  kanjiDetail = signal<MuzukanjiKanjiDetail | null>(null);

  readonly trimmedQuery = computed(() => this.query().trim());
  readonly firstKanji = computed(() => this.extractFirstKanji(this.trimmedQuery()));
  readonly jotobaWordUrl = computed(() =>
    this.trimmedQuery() ? `https://jotoba.de/search/0/${encodeURIComponent(this.trimmedQuery())}` : null,
  );
  readonly jotobaKanjiUrl = computed(() =>
    this.firstKanji() ? `https://jotoba.de/search/1/${encodeURIComponent(this.firstKanji()!)}` : null,
  );
  readonly jishoWebUrl = computed(() =>
    this.trimmedQuery() ? `https://jisho.org/search/${encodeURIComponent(this.trimmedQuery())}` : null,
  );

  search() {
    const query = this.trimmedQuery();

    if (!query) {
      this.error.set('請先輸入要查詢的單字或漢字。');
      this.results.set([]);
      this.kanjiDetail.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.searched.set(true);
    this.results.set([]);

    this.jishoService
      .searchWords(query)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.results.set(response.data ?? []);
        },
        error: () => {
          this.error.set('Jisho 查詢失敗，請稍後再試。');
        },
      });

    this.loadKanjiSupplement(query);
  }

  private loadKanjiSupplement(query: string) {
    const kanji = this.extractFirstKanji(query);

    if (!kanji) {
      this.kanjiDetail.set(null);
      this.kanjiError.set(null);
      return;
    }

    this.kanjiLoading.set(true);
    this.kanjiError.set(null);
    this.kanjiDetail.set(null);

    this.muzukanjiService
      .searchByKanji(kanji)
      .pipe(finalize(() => this.kanjiLoading.set(false)))
      .subscribe({
        next: (items) => {
          const match = items.find((item) => item.kanji === kanji) ?? items[0];

          if (!match) {
            this.kanjiError.set('找不到對應的漢字補充資料。');
            return;
          }

          this.muzukanjiService.getKanjiById(match.id).subscribe({
            next: (detail) => this.kanjiDetail.set(detail),
            error: () => this.kanjiError.set('無法載入漢字詳情。'),
          });
        },
        error: () => {
          this.kanjiError.set('漢字補充查詢失敗。');
        },
      });
  }

  private extractFirstKanji(text: string): string | null {
    const match = text.match(/[\u3400-\u9fff々]/u);
    return match?.[0] ?? null;
  }
}
