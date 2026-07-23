// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Shared
import { BookmarkService } from '@shared/services/bookmark.service';
// Models
import {
  LEVEL_DATA_MAP,
  type JlptLevel,
  type SentencePatternGroup,
  type SentencePattern,
  type SentenceReviewData,
  type SentenceReviewTab,
} from './sentence-review.model';

const BOOKMARK_KEY = 'sentencePatterns';

@Injectable()
export class SentenceReviewStore {
  // Dependencies
  // --------------------------------------------------------------------
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private bookmarkService = inject(BookmarkService);

  // Signals
  // --------------------------------------------------------------------
  readonly selectedLevel = signal<JlptLevel>('N3');
  readonly activeTab = signal<SentenceReviewTab>('common');
  readonly reviewData = signal<SentenceReviewData | null>(null);
  readonly loading = signal(false);
  readonly selectedGroupId = signal<string | null>(null);
  readonly bookmarkedIds = signal<Set<string>>(new Set());

  // Computed
  // --------------------------------------------------------------------
  readonly hasData = computed(() => !!LEVEL_DATA_MAP[this.selectedLevel()]);

  readonly commonGroups = computed<SentencePatternGroup[]>(() =>
    (this.reviewData()?.groups ?? []).filter((g) => !g.id.startsWith('exam-') && g.id !== 'compound-verbs'),
  );

  readonly examGroups = computed<SentencePatternGroup[]>(() =>
    (this.reviewData()?.groups ?? []).filter((g) => g.id.startsWith('exam-')),
  );

  readonly displayGroups = computed(() =>
    this.activeTab() === 'common' ? this.commonGroups() : this.examGroups(),
  );

  readonly selectedGroup = computed<SentencePatternGroup | null>(() => {
    const groups = this.displayGroups();
    const id = this.selectedGroupId();
    return groups.find((g) => g.id === id) ?? groups[0] ?? null;
  });

  readonly displayPatterns = computed<SentencePattern[]>(() => this.selectedGroup()?.patterns ?? []);

  readonly totalPatternCount = computed(() =>
    this.displayGroups().reduce((sum, g) => sum + g.patterns.length, 0),
  );

  readonly bookmarkedCount = computed(() => this.bookmarkedIds().size);

  // Lifecycle
  // --------------------------------------------------------------------
  init(): void {
    this.loadLevel('N3');
    this.loadBookmarks();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  selectLevel(level: JlptLevel): void {
    this.selectedLevel.set(level);
    this.selectedGroupId.set(null);
    if (LEVEL_DATA_MAP[level]) {
      this.loadLevel(level);
    } else {
      this.reviewData.set(null);
    }
  }

  switchTab(tab: SentenceReviewTab): void {
    this.activeTab.set(tab);
    this.selectedGroupId.set(null);
  }

  selectGroup(id: string): void {
    this.selectedGroupId.set(id);
  }

  isBookmarked(patternId: string): boolean {
    return this.bookmarkedIds().has(patternId);
  }

  async toggleBookmark(patternId: string): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    const current = new Set(this.bookmarkedIds());
    if (current.has(patternId)) {
      current.delete(patternId);
    } else {
      current.add(patternId);
    }
    this.bookmarkedIds.set(current);

    try {
      await this.bookmarkService.setBookmarks(uid, BOOKMARK_KEY, Array.from(current));
    } catch (e) {
      console.error('save bookmark failed', e);
    }
  }

  // Private
  // --------------------------------------------------------------------
  private loadLevel(level: JlptLevel): void {
    const path = LEVEL_DATA_MAP[level];
    if (!path) return;

    this.loading.set(true);
    this.reviewData.set(null);
    this.http.get<SentenceReviewData>(path).subscribe((data) => {
      this.reviewData.set(data);
      this.selectedGroupId.set(data.groups.find((g) => !g.id.startsWith('exam-'))?.id ?? null);
      this.loading.set(false);
    });
  }

  private async loadBookmarks(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    try {
      const ids = await this.bookmarkService.getBookmarks(uid, BOOKMARK_KEY);
      this.bookmarkedIds.set(new Set(ids));
    } catch (e) {
      console.error('load bookmarks failed', e);
    }
  }
}
