import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GrammarExample {
  jp: string;
  zh: string;
}

export interface GrammarPattern {
  id: string;
  pattern: string;
  formation: string;
  meaning: string;
  notes: string;
  examples: GrammarExample[];
}

export interface GrammarGroup {
  id: string;
  title: string;
  description: string;
  color: string;
  patterns: GrammarPattern[];
}

export interface ReviewData {
  title: string;
  groups: GrammarGroup[];
}

export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export const LEVEL_DATA_MAP: Partial<Record<JlptLevel, string>> = {
  N3: 'assets/data/grammar-n3-review.json',
};

@Injectable()
export class GrammarReviewStore {
  private http = inject(HttpClient);

  readonly selectedLevel = signal<JlptLevel>('N3');
  readonly reviewData = signal<ReviewData | null>(null);
  readonly expandedGroups = signal<Set<string>>(new Set());
  readonly expandedPatterns = signal<Set<string>>(new Set());
  readonly loading = signal(false);

  readonly hasData = computed(() => !!LEVEL_DATA_MAP[this.selectedLevel()]);

  readonly allGroupsExpanded = computed(() => {
    const groups = this.reviewData()?.groups ?? [];
    return groups.length > 0 && groups.every((g) => this.expandedGroups().has(g.id));
  });

  init() {
    this.loadLevel('N3');
  }

  selectLevel(level: JlptLevel) {
    this.selectedLevel.set(level);
    this.expandedGroups.set(new Set());
    this.expandedPatterns.set(new Set());
    if (LEVEL_DATA_MAP[level]) {
      this.loadLevel(level);
    } else {
      this.reviewData.set(null);
    }
  }

  toggleGroup(id: string) {
    const current = new Set(this.expandedGroups());
    current.has(id) ? current.delete(id) : current.add(id);
    this.expandedGroups.set(current);
  }

  togglePattern(id: string) {
    const current = new Set(this.expandedPatterns());
    current.has(id) ? current.delete(id) : current.add(id);
    this.expandedPatterns.set(current);
  }

  toggleAllGroups() {
    const groups = this.reviewData()?.groups ?? [];
    this.expandedGroups.set(
      this.allGroupsExpanded() ? new Set() : new Set(groups.map((g) => g.id)),
    );
  }

  private loadLevel(level: JlptLevel) {
    const path = LEVEL_DATA_MAP[level];
    if (!path) return;
    this.loading.set(true);
    this.reviewData.set(null);
    this.http.get<ReviewData>(path).subscribe((data) => {
      this.reviewData.set(data);
      this.loading.set(false);
    });
  }
}
