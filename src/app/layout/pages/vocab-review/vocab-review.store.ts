import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type AppMode = 'browse' | 'flashcard';

export interface VocabExample {
  jp: string;
  zh: string;
}

export interface VocabEntry {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  pos: string;
  examSource?: string;
  examples: VocabExample[];
  confusionNote?: string;
}

export interface VocabGroup {
  id: string;
  label: string;
  color: string;
  entries: VocabEntry[];
}

export interface VocabReviewData {
  title: string;
  level: string;
  groups: VocabGroup[];
}

const DATA_PATH = 'assets/data/vocab-review-n3.json';

@Injectable()
export class VocabReviewStore {
  private http = inject(HttpClient);

  readonly data = signal<VocabReviewData | null>(null);
  readonly loading = signal(false);
  readonly selectedGroupId = signal<string | null>(null);
  readonly expandedEntries = signal<Set<string>>(new Set());
  readonly showExamOnly = signal(false);

  readonly groups = computed(() => this.data()?.groups ?? []);

  readonly filteredGroups = computed(() => {
    const groups = this.groups();
    const groupId = this.selectedGroupId();
    const examOnly = this.showExamOnly();

    return groups
      .filter((g) => !groupId || g.id === groupId)
      .map((g) => ({
        ...g,
        entries: examOnly ? g.entries.filter((e) => !!e.examSource) : g.entries,
      }))
      .filter((g) => g.entries.length > 0);
  });

  readonly totalVisible = computed(() =>
    this.filteredGroups().reduce((sum, g) => sum + g.entries.length, 0),
  );

  // ── Flashcard mode ──────────────────────────────────────────────────────
  readonly mode = signal<AppMode>('browse');
  readonly flashcardIndex = signal(0);
  readonly flipped = signal(false);
  readonly knownIds = signal<Set<string>>(new Set());
  private readonly _shuffledQueue = signal<VocabEntry[]>([]);
  private readonly _isShuffled = signal(false);

  readonly flashcardQueue = computed<VocabEntry[]>(() => {
    const base = this.filteredGroups().flatMap((g) => g.entries);
    return this._isShuffled() ? this._shuffledQueue() : base;
  });

  readonly currentCard = computed(() => this.flashcardQueue()[this.flashcardIndex()] ?? null);

  readonly isLastCard = computed(
    () => this.flashcardIndex() >= this.flashcardQueue().length - 1,
  );

  readonly flashcardProgress = computed(() => ({
    index: this.flashcardIndex(),
    total: this.flashcardQueue().length,
    known: this.knownIds().size,
  }));

  startFlashcard(shuffle = false) {
    const entries = this.filteredGroups().flatMap((g) => g.entries);
    this._isShuffled.set(shuffle);
    if (shuffle) {
      this._shuffledQueue.set([...entries].sort(() => Math.random() - 0.5));
    }
    this.flashcardIndex.set(0);
    this.flipped.set(false);
    this.knownIds.set(new Set());
    this.mode.set('flashcard');
  }

  exitFlashcard() {
    this.mode.set('browse');
  }

  flipCard() {
    this.flipped.update((v) => !v);
  }

  nextCard() {
    this.flipped.set(false);
    if (!this.isLastCard()) {
      this.flashcardIndex.update((i) => i + 1);
    }
  }

  prevCard() {
    this.flipped.set(false);
    this.flashcardIndex.update((i) => Math.max(i - 1, 0));
  }

  markKnown() {
    const card = this.currentCard();
    if (!card) return;
    const s = new Set(this.knownIds());
    s.add(card.id);
    this.knownIds.set(s);
    this.nextCard();
  }

  isKnown(id: string) {
    return this.knownIds().has(id);
  }

  init() {
    this.loading.set(true);
    this.http.get<VocabReviewData>(DATA_PATH).subscribe((data) => {
      this.data.set(data);
      this.loading.set(false);
    });
  }

  selectGroup(id: string | null) {
    this.selectedGroupId.set(id);
  }

  toggleEntry(id: string) {
    const current = new Set(this.expandedEntries());
    current.has(id) ? current.delete(id) : current.add(id);
    this.expandedEntries.set(current);
  }

  isExpanded(id: string): boolean {
    return this.expandedEntries().has(id);
  }

  toggleExamOnly() {
    this.showExamOnly.update((v) => !v);
  }
}
