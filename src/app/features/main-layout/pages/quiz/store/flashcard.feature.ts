// Cores
import { Signal, computed } from '@angular/core';
// NgRx Signals
import { patchState, signalStoreFeature, type, withComputed, withMethods, withState } from '@ngrx/signals';
// Models
import type { PageMode, VocabEntry } from '../quiz.model';

interface FlashcardState {
  flashcardQueue: VocabEntry[];
  flashcardIndex: number;
  flipped: boolean;
  knownIds: Set<string>;
  unknownIds: Set<string>;
  /** 這一輪背完了（最後一張也已標記） */
  flashcardFinished: boolean;
}

const initialState: FlashcardState = {
  flashcardQueue: [],
  flashcardIndex: 0,
  flipped: false,
  knownIds: new Set(),
  unknownIds: new Set(),
  flashcardFinished: false,
};

/** 單詞頁：卡牌背誦 session（依賴 vocab-data 的 filteredEntries/wrongWords/markedWords、study-plan 的 todayQueue/updateSRS，以及根層的 pageMode） */
export function flashcardFeature() {
  return signalStoreFeature(
    type<{
      state: { pageMode: PageMode };
      props: {
        filteredEntries: Signal<VocabEntry[]>;
        wrongWords: Signal<VocabEntry[]>;
        markedWords: Signal<VocabEntry[]>;
        todayQueue: Signal<VocabEntry[]>;
      };
      methods: { updateSRS: (wordId: string, known: boolean) => void };
    }>(),
    withState(initialState),
    withComputed((store) => ({
      currentCard: computed(() => store.flashcardQueue()[store.flashcardIndex()] ?? null),
      flashcardIsLast: computed(() => store.flashcardIndex() >= store.flashcardQueue().length - 1),
      flashcardProgress: computed(() => {
        const total = store.flashcardQueue().length;
        const index = store.flashcardIndex() + 1;
        return {
          index,
          total,
          known: store.knownIds().size,
          unknown: store.unknownIds().size,
          remaining: Math.max(total - index, 0),
        };
      }),
    })),
    withMethods((store) => {
      const advanceCard = (): void => {
        patchState(store, { flipped: false });
        if (!store.flashcardIsLast()) {
          patchState(store, { flashcardIndex: store.flashcardIndex() + 1 });
        }
      };

      /** 最後一張標記完就進入「這一輪背完了」畫面 */
      const finishOrAdvance = (): void => {
        if (store.flashcardIsLast()) patchState(store, { flashcardFinished: true, flipped: false });
        else advanceCard();
      };

      return {
        /** 同一批重新洗牌再背一輪 */
        restartFlashcard(): void {
          patchState(store, {
            flashcardQueue: [...store.flashcardQueue()].sort(() => Math.random() - 0.5),
            flashcardIndex: 0,
            flipped: false,
            knownIds: new Set(),
            unknownIds: new Set(),
            flashcardFinished: false,
          });
        },

        /** 只再背這一輪標了「不熟」的 */
        retryUnknownFlashcard(): void {
          const unknown = store.flashcardQueue().filter((c) => store.unknownIds().has(c.id));
          if (unknown.length === 0) return;
          patchState(store, {
            flashcardQueue: unknown.sort(() => Math.random() - 0.5),
            flashcardIndex: 0,
            flipped: false,
            knownIds: new Set(),
            unknownIds: new Set(),
            flashcardFinished: false,
          });
        },

        startFlashcard(
          opts: { wrongOnly?: boolean; markedOnly?: boolean; todayOnly?: boolean; all?: boolean } = {},
        ): void {
          let pool: VocabEntry[];

          if (opts.wrongOnly) {
            pool = store.wrongWords();
          } else if (opts.markedOnly) {
            pool = store.markedWords();
          } else if (opts.todayOnly) {
            pool = store.todayQueue();
          } else {
            pool = [...store.filteredEntries()].sort(() => Math.random() - 0.5);
          }

          patchState(store, {
            flashcardQueue: pool,
            flashcardIndex: 0,
            flipped: false,
            knownIds: new Set(),
            unknownIds: new Set(),
            flashcardFinished: false,
            pageMode: 'flashcard',
          });
        },

        flipCard(): void {
          patchState(store, { flipped: !store.flipped() });
        },

        nextCard(): void {
          advanceCard();
        },

        prevCard(): void {
          patchState(store, { flipped: false, flashcardIndex: Math.max(store.flashcardIndex() - 1, 0) });
        },

        markKnown(): void {
          const card = store.currentCard();
          if (!card) return;
          const s = new Set(store.knownIds());
          s.add(card.id);
          patchState(store, { knownIds: s });
          store.updateSRS(card.id, true);
          finishOrAdvance();
        },

        markUnknown(): void {
          const card = store.currentCard();
          if (!card) return;
          const s = new Set(store.unknownIds());
          s.add(card.id);
          patchState(store, { unknownIds: s });
          store.updateSRS(card.id, false);
          finishOrAdvance();
        },

        isKnown(id: string): boolean {
          return store.knownIds().has(id);
        },

        exitFlashcard(): void {
          patchState(store, { pageMode: 'list' });
        },
      };
    }),
  );
}
