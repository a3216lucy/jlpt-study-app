// Cores
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, linkedSignal, signal } from '@angular/core';
// Shared
import type { ExamQuestion } from '@core/models/exam-question.model';
// Utils
import {
  emptySlots,
  firstEmptySlot,
  parseSortStem,
  placeChip,
  poolOf,
  removeChip,
  type SortSlots,
} from '../../sort-pad.util';

/** 拖動時超過這個距離（px）才算拖動，否則視為點一下 */
const DRAG_THRESHOLD = 6;

interface DragState {
  /** 被拖的選項（0 起算） */
  option: number;
  /** 原本在哪個空格；從選項區拿起則為 null */
  from: number | null;
  startX: number;
  startY: number;
  moved: boolean;
}

/**
 * 排序題「試排區」：把 4 個詞拖進空格排排看（也可以點一下自動放進第一個空格、點已放的詞退回）。
 * 只是草稿，不算作答；排好後使用者再到選項區選出★位置的詞。滑鼠與觸控都用 Pointer Events。
 */
@Component({
  selector: 'app-past-exam-sort-pad',
  templateUrl: './past-exam-sort-pad.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamSortPadComponent {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly destroyRef = inject(DestroyRef);

  // Inputs / State
  // --------------------------------------------------------------------
  readonly question = input.required<ExamQuestion>();

  readonly parsed = computed(() => parseSortStem(this.question().questionText ?? ''));
  readonly words = computed(() => this.question().options.map((o) => o.text));

  /** 換題就清空（linkedSignal 依 question 重算） */
  readonly slots = linkedSignal<SortSlots>(() => {
    this.question();
    return emptySlots();
  });
  readonly pool = computed(() => poolOf(this.slots(), this.words().length));
  readonly allPlaced = computed(() => this.slots().every((s) => s !== null));

  /** 拖動時跟著指標的殘影 */
  readonly ghost = signal<{ text: string; x: number; y: number } | null>(null);
  private drag: DragState | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.stopListening());
  }

  // Public Handlers
  // --------------------------------------------------------------------
  /** 按下選項區或空格裡的詞：開始追蹤拖動 */
  onPointerDown(event: PointerEvent, option: number, from: number | null): void {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    this.drag = { option, from, startX: event.clientX, startY: event.clientY, moved: false };
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerCancel);
  }

  /** 鍵盤：Enter／空白＝點一下 */
  onKey(event: KeyboardEvent, option: number, from: number | null): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.tap(option, from);
  }

  reset(): void {
    this.slots.set(emptySlots());
  }

  // Private
  // --------------------------------------------------------------------
  private readonly onPointerMove = (e: PointerEvent): void => {
    const d = this.drag;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_THRESHOLD) d.moved = true;
    if (d.moved) this.ghost.set({ text: this.words()[d.option], x: e.clientX, y: e.clientY });
  };

  private readonly onPointerUp = (e: PointerEvent): void => {
    const d = this.drag;
    this.stopListening();
    if (!d) return;
    if (!d.moved) {
      this.tap(d.option, d.from);
      return;
    }
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-slot]');
    if (target?.dataset['slot'] !== undefined) {
      this.slots.update((s) => placeChip(s, d.option, Number(target.dataset['slot'])));
    } else if (d.from !== null) {
      // 丟到空格外面＝退回選項區
      this.slots.update((s) => removeChip(s, d.from!));
    }
  };

  private readonly onPointerCancel = (): void => this.stopListening();

  private tap(option: number, from: number | null): void {
    if (from !== null) {
      this.slots.update((s) => removeChip(s, from));
      return;
    }
    const empty = firstEmptySlot(this.slots());
    if (empty >= 0) this.slots.update((s) => placeChip(s, option, empty));
  }

  private stopListening(): void {
    this.drag = null;
    this.ghost.set(null);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerCancel);
  }
}
