import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { EXAM_CATALOG, ExamSetCatalogItem } from '../config/exam-catalog';
import { ExamSet } from '../models/exam-question.model';
import { JlptLevel } from '../models/vocab.model';

export interface ExamSetGroupItem {
  id: string;
  category: string;
  type: string;
  label: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ExamService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<ExamSet>>();

  listExamSets(category?: string, type?: string): ExamSetCatalogItem[] {
    return EXAM_CATALOG.filter(
      (item) => (!category || item.category === category) && (!type || item.type === type),
    );
  }

  listExamGroups(category?: string, type?: string): ExamSetGroupItem[] {
    const groups = new Map<string, ExamSetGroupItem>();

    for (const item of this.listExamSets(category, type)) {
      if (groups.has(item.groupId)) {
        continue;
      }

      groups.set(item.groupId, {
        id: item.groupId,
        category: item.category,
        type: item.type,
        label: item.groupLabel,
        description: item.groupDescription,
      });
    }

    return [...groups.values()];
  }

  hasExamSet(category: string, type: string, level: JlptLevel): boolean {
    return EXAM_CATALOG.some(
      (item) => item.category === category && item.type === type && item.level === level,
    );
  }

  hasExamSetById(id: string, level?: JlptLevel): boolean {
    return EXAM_CATALOG.some((item) => item.id === id && (!level || item.level === level));
  }

  hasExamSetForGroup(groupId: string, level: JlptLevel): boolean {
    return EXAM_CATALOG.some((item) => item.groupId === groupId && item.level === level);
  }

  getAvailableLevelsForGroup(groupId: string): JlptLevel[] {
    const levels = new Set<JlptLevel>();

    for (const item of EXAM_CATALOG) {
      if (item.groupId === groupId) {
        levels.add(item.level);
      }
    }

    return [...levels];
  }

  findExamSetForGroup(groupId: string, level: JlptLevel): ExamSetCatalogItem | undefined {
    return EXAM_CATALOG.find((item) => item.groupId === groupId && item.level === level);
  }

  getExamSetById(id: string): Observable<ExamSet> {
    const item = EXAM_CATALOG.find((entry) => entry.id === id);

    if (!item) {
      throw new Error(`Unknown exam set id: ${id}`);
    }

    if (!this.cache.has(item.id)) {
      const examSet$ = this.http.get<ExamSet>(item.path).pipe(shareReplay(1));
      this.cache.set(item.id, examSet$);
    }

    return this.cache.get(item.id)!;
  }

  getExamSet(category: string, type: string, level: JlptLevel): Observable<ExamSet> {
    const item = EXAM_CATALOG.find(
      (entry) => entry.category === category && entry.type === type && entry.level === level,
    );

    if (!item) {
      throw new Error(`Unknown exam set: ${category}/${type}/${level}`);
    }

    if (!this.cache.has(item.id)) {
      const examSet$ = this.http.get<ExamSet>(item.path).pipe(shareReplay(1));
      this.cache.set(item.id, examSet$);
    }

    return this.cache.get(item.id)!;
  }

  getExamSetForGroup(groupId: string, level: JlptLevel): Observable<ExamSet> {
    const item = this.findExamSetForGroup(groupId, level);

    if (!item) {
      throw new Error(`Unknown exam set group: ${groupId}/${level}`);
    }

    return this.getExamSetById(item.id);
  }
}
