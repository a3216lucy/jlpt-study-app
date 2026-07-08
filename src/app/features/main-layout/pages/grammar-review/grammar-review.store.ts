// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Models
import {
  LEVEL_DATA_MAP,
  type GrammarGroup,
  type JlptLevel,
  type ReviewData,
  type ReviewTab,
  type VerbClassTable,
  type VerbConjugationData,
  type VerbFormTable,
} from './grammar-review.model';

export type { GrammarGroup, JlptLevel, ReviewTab, VerbFormTable };

@Injectable()
export class GrammarReviewStore {
  private http = inject(HttpClient);

  readonly selectedLevel = signal<JlptLevel>('N3');
  readonly activeTab = signal<ReviewTab>('general');
  readonly reviewData = signal<ReviewData | null>(null);
  readonly expandedGroups = signal<Set<string>>(new Set());
  readonly expandedPatterns = signal<Set<string>>(new Set());
  readonly loading = signal(false);

  readonly verbData = signal<VerbConjugationData | null>(null);
  readonly verbLoading = signal(false);
  readonly selectedVerbFormId = signal<string>('masuForm');

  readonly hasData = computed(() => !!LEVEL_DATA_MAP[this.selectedLevel()]);

  readonly generalGroups = computed(() =>
    (this.reviewData()?.groups ?? []).filter((g) => !g.id.startsWith('exam-')),
  );

  readonly examGroups = computed(() =>
    (this.reviewData()?.groups ?? []).filter((g) => g.id.startsWith('exam-')),
  );

  readonly displayGroups = computed(() =>
    this.activeTab() === 'general' ? this.generalGroups() : this.examGroups(),
  );

  readonly allGroupsExpanded = computed(() => {
    const groups = this.displayGroups();
    return groups.length > 0 && groups.every((g) => this.expandedGroups().has(g.id));
  });

  readonly selectedVerbClassTable = computed((): VerbClassTable | null => {
    const data = this.verbData();
    if (!data) return null;
    const id = this.selectedVerbFormId();
    if (id === 'masuForm') return data.masuForm;
    if (id === 'jishoForm') return data.jishoForm;
    return null;
  });

  readonly selectedVerbForm = computed((): VerbFormTable | null => {
    const data = this.verbData();
    if (!data) return null;
    return data.forms.find((f) => f.id === this.selectedVerbFormId()) ?? null;
  });

  init() {
    this.loadLevel('N3');
  }

  switchTab(tab: ReviewTab) {
    this.activeTab.set(tab);
    if (tab === 'verb' && !this.verbData() && !this.verbLoading()) {
      this.loadVerbData();
    }
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
    const groups = this.displayGroups();
    this.expandedGroups.set(
      this.allGroupsExpanded() ? new Set() : new Set(groups.map((g) => g.id)),
    );
  }

  selectVerbForm(id: string) {
    this.selectedVerbFormId.set(id);
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

  private loadVerbData() {
    this.verbLoading.set(true);
    this.http.get<VerbConjugationData>('assets/data/verb-conjugation.json').subscribe((data) => {
      this.verbData.set(data);
      this.verbLoading.set(false);
    });
  }
}
