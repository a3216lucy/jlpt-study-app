import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { PAST_EXAM_CATALOG } from '@core/config/past-exam-catalog';
import type { ExamAttempt } from '@core/models/exam-attempt.model';
import type { ExamQuestion } from '@core/models/exam-question.model';
import { BookmarkService } from '@core/services/bookmark.service';
import { ExamAttemptService } from '@core/services/exam-attempt.service';
import { ExamHistoryService } from '@core/services/exam-history.service';
import { LearningRecordService } from '@core/services/learning-record.service';
import { TargetLevelService } from '@core/services/target-level.service';
import { PastExamStore } from './past-exam.store';

function makeQuestions(path: string, category: ExamQuestion['category']): ExamQuestion[] {
  return [1, 2, 3].map((n) => {
    const id = `${path.split('/').pop()!.replace('.json', '')}-${n}`;
    return {
      id,
      level: 'N3',
      category,
      type: 'sentence-fill',
      prompt: 'p',
      questionText: `q${n}`,
      questionTranslation: `中文${n}`,
      options: ['a', 'b', 'c', 'd'].map((k) => ({ id: `${id}-${k}`, text: k, isCorrect: k === 'a' })),
      correctAnswer: `${id}-a`,
      explanation: '💡 重點\n【選項解析】\n○1 a：對',
      problemNumber: 1,
      problemLabel: 'x',
    };
  });
}

describe('PastExamStore', () => {
  let attemptService: jasmine.SpyObj<ExamAttemptService>;
  let learningRecord: jasmine.SpyObj<LearningRecordService>;
  let bookmarks: jasmine.SpyObj<BookmarkService>;
  const n3 = PAST_EXAM_CATALOG.find((e) => e.id === 'n3-2020-12')!;
  const n2 = PAST_EXAM_CATALOG.find((e) => e.id === 'n2-2019-07')!;

  function setup() {
    attemptService = jasmine.createSpyObj('ExamAttemptService', ['listAll', 'create', 'saveProgress', 'complete']);
    attemptService.listAll.and.resolveTo([]);
    attemptService.create.and.resolveTo('att1');
    attemptService.saveProgress.and.resolveTo();
    attemptService.complete.and.resolveTo();
    learningRecord = jasmine.createSpyObj('LearningRecordService', ['saveExamResult']);
    learningRecord.saveExamResult.and.resolveTo();
    bookmarks = jasmine.createSpyObj('BookmarkService', ['getBookmarks', 'setBookmarks']);
    bookmarks.getBookmarks.and.resolveTo([]);
    bookmarks.setBookmarks.and.resolveTo();
    const history = jasmine.createSpyObj('ExamHistoryService', ['getRecent']);
    history.getRecent.and.resolveTo([]);
    const http = {
      get: (path: string) => {
        const category = path.includes('vocab')
          ? 'vocabulary'
          : path.includes('grammar')
            ? 'grammar'
            : path.includes('listening')
              ? 'listening'
              : 'reading';
        return of({ questions: makeQuestions(path, category) });
      },
    };
    TestBed.configureTestingModule({
      providers: [
        PastExamStore,
        { provide: HttpClient, useValue: http },
        { provide: Auth, useValue: { currentUser: { uid: 'u1' } } },
        { provide: ExamAttemptService, useValue: attemptService },
        { provide: LearningRecordService, useValue: learningRecord },
        { provide: ExamHistoryService, useValue: history },
        { provide: BookmarkService, useValue: bookmarks },
        { provide: TargetLevelService, useValue: { load: () => Promise.resolve('N3') } },
      ],
    });
    return TestBed.inject(PastExamStore);
  }

  afterEach(() => jasmine.clock().uninstall());

  it('練習模式：作答前不公布，作答後公布並鎖定不可改答', async () => {
    const store = setup();
    await store.startPractice(n3, { type: 'all' });
    expect(store.phase()).toBe('taking');
    expect(store.mode()).toBe('practice');
    expect(store.attempt()?.attemptNo).toBe(1);
    expect(store.revealed()).toBeFalse();

    const q = store.currentQuestion()!;
    store.selectOption(q.options[1]);
    expect(store.revealed()).toBeTrue();
    expect(store.selectedOptionId()).toBe(q.options[1].id);

    store.selectOption(q.options[0]);
    expect(store.selectedOptionId()).toBe(q.options[1].id);
  });

  it('練習模式：只練某一科時只載入該科題目', async () => {
    const store = setup();
    await store.startPractice(n3, { type: 'section', sectionId: n3.sections[1].id });
    expect(store.flatItems().length).toBe(3);
    expect(store.flatItems().every((it) => it.section.id === n3.sections[1].id)).toBeTrue();
  });

  it('練習模式：完成時未作答算錯題，並寫入 attempt 與舊版紀錄', async () => {
    const store = setup();
    await store.startPractice(n3, { type: 'section', sectionId: n3.sections[0].id });
    store.selectOption(store.currentQuestion()!.options[0]); // 答對 1 題
    await store.confirmSubmitNow();
    // 讓 finishPractice 內的 await 跑完
    await new Promise((r) => setTimeout(r, 0));

    expect(store.phase()).toBe('result');
    expect(store.score()).toBe(1);
    expect(store.wrongItems().length).toBe(2);
    expect(store.unansweredTotal()).toBe(2);
    expect(attemptService.create).toHaveBeenCalledTimes(1);
    expect(attemptService.complete).toHaveBeenCalledTimes(1);
    expect(attemptService.complete.calls.mostRecent().args[2].wrongQuestionIds.length).toBe(2);
    expect(learningRecord.saveExamResult).toHaveBeenCalledWith(jasmine.objectContaining({ mode: 'practice' }));
  });

  it('練習模式：沒作答就離開不會建立空紀錄', async () => {
    const store = setup();
    await store.startPractice(n3, { type: 'all' });
    await store.requestLeave();
    expect(attemptService.create).not.toHaveBeenCalled();
    expect(store.phase()).toBe('overview');
  });

  it('實際演練：作答中不公布，N3 分三段（語彙／文法讀解／聴解）且上一段鎖定', async () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(0));
    const store = setup();
    await store.startMock(n3);

    expect(store.mode()).toBe('mock');
    expect(store.stages().map((st) => st.minutes)).toEqual([30, 70, 40]);
    expect(store.remainingSec()).toBe(30 * 60);
    expect(store.stageIndices().length).toBe(3); // 第一段只有語彙 3 題
    expect(store.revealed()).toBeFalse();

    store.selectOption(store.currentQuestion()!.options[1]);
    expect(store.revealed()).toBeFalse(); // 實演不公布
    store.selectOption(store.currentQuestion()!.options[0]); // 實演可改答
    expect(store.selectedOptionId()).toBe(store.currentQuestion()!.options[0].id);

    store.requestSubmit(); // 還有 2 題沒作答 → 先確認
    expect(store.confirmSubmit()).toBeTrue();
    await store.confirmSubmitNow();
    expect(store.stageBreak()).toBeTrue();

    store.beginNextStage();
    expect(store.stageIndex()).toBe(1);
    expect(store.remainingSec()).toBe(70 * 60);
    expect(store.stageIndices().length).toBe(6); // 文法 3＋読解 3
    expect(store.stageIndices().every((i) => store.flatItems()[i].section.category !== 'vocabulary')).toBeTrue();
  });

  it('實際演練：時間到自動交卷並進入結果', async () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(0));
    const store = setup();
    await store.startMock(n2); // N2：言語知識・読解 105 分 → 聴解 50 分
    expect(store.stages().length).toBe(2);

    jasmine.clock().tick(105 * 60 * 1000 + 1000);
    // 假時鐘下 setTimeout 不會觸發，改用 microtask 讓 finishMock 內的 await 跑完
    for (let i = 0; i < 20; i++) await Promise.resolve();

    expect(store.stageBreak()).toBeTrue(); // 第一段時間到，等按「開始下一段」才開始聴解倒數
    expect(store.timedOut()).toBeTrue();

    store.beginNextStage();
    expect(store.remainingSec()).toBe(50 * 60);
    expect(store.stageIndices().every((i) => store.flatItems()[i].section.category === 'listening')).toBeTrue();
  });

  it('還沒掌握的範圍沒有錯題時應該顯示錯誤並留在主畫面', async () => {
    const store = setup();
    await store.startPractice(n3, { type: 'unmastered' });
    expect(store.phase()).toBe('overview');
    expect(store.loadError()).toContain('沒有題目');
  });

  describe('錯題本', () => {
    function attempt(partial: Partial<ExamAttempt>): ExamAttempt {
      return {
        id: 'a', examId: 'n3-2020-12', mode: 'practice', scopeKey: 'all', attemptNo: 1, status: 'completed',
        questionIds: [], answers: {}, markedIds: [], currentIndex: 0, startedAt: null, updatedAt: null,
        completedAt: null, score: 0, total: 0, wrongQuestionIds: [], mock: null, ...partial,
      };
    }

    it('應該只載入有錯題或標記的考卷，並分出還沒掌握與標記', async () => {
      const store = setup();
      attemptService.listAll.and.resolveTo([
        attempt({
          questionIds: ['n3-2020-12-vocab-1', 'n3-2020-12-vocab-2', 'n3-2020-12-vocab-3'],
          wrongQuestionIds: ['n3-2020-12-vocab-1'],
          markedIds: ['n3-2020-12-vocab-2'],
        }),
      ]);
      await store.openNotebook();

      expect(store.phase()).toBe('notebook');
      expect(store.notebookItems().length).toBe(2); // 第 3 題既沒錯也沒標記，不載入
      expect(store.notebookWrong().map((e) => e.question.id)).toEqual(['n3-2020-12-vocab-1']);
      expect(store.notebookMarked().map((e) => e.question.id)).toEqual(['n3-2020-12-vocab-2']);
      expect(store.notebookSummary()).toEqual({ unmastered: 1, marked: 1 });
    });

    it('篩選科目後應該只剩該科的題', async () => {
      const store = setup();
      attemptService.listAll.and.resolveTo([
        attempt({ questionIds: ['n3-2020-12-vocab-1'], wrongQuestionIds: ['n3-2020-12-vocab-1'] }),
      ]);
      await store.openNotebook();
      expect(store.notebookWrong().length).toBe(1);
      store.setNotebookCategory('grammar');
      expect(store.notebookWrong().length).toBe(0);
      store.setNotebookCategory('vocabulary');
      expect(store.notebookWrong().length).toBe(1);
    });

    it('實演的錯題預設不計入，打開「含實際演練」後才出現', async () => {
      const store = setup();
      attemptService.listAll.and.resolveTo([
        attempt({ mode: 'mock', questionIds: ['n3-2020-12-vocab-1'], wrongQuestionIds: ['n3-2020-12-vocab-1'] }),
      ]);
      await store.openNotebook();
      expect(store.notebookWrong().length).toBe(0);
      await store.setNotebookIncludeMock(true);
      expect(store.notebookWrong().length).toBe(1);
    });

    it('從錯題本練習：題目來自已篩選的錯題，完成後回到錯題本並寫入各考卷成績', async () => {
      const store = setup();
      attemptService.listAll.and.resolveTo([
        attempt({
          questionIds: ['n3-2020-12-vocab-1', 'n3-2020-12-grammar-1'],
          wrongQuestionIds: ['n3-2020-12-vocab-1', 'n3-2020-12-grammar-1'],
        }),
      ]);
      await store.openNotebook();
      store.startNotebookPractice('wrong', null);

      expect(store.phase()).toBe('taking');
      expect(store.isNotebookAttempt()).toBeTrue();
      expect(store.examTitle()).toBe('錯題本練習');
      expect(store.flatItems().length).toBe(2);
      expect(store.attempt()?.attemptNo).toBe(1);

      store.selectOption(store.currentQuestion()!.options[0]);
      await store.confirmSubmitNow();
      await new Promise((r) => setTimeout(r, 0));

      expect(attemptService.create).toHaveBeenCalledWith('u1', jasmine.objectContaining({ examId: 'notebook', scopeKey: 'notebook' }));
      expect(learningRecord.saveExamResult).toHaveBeenCalledWith(jasmine.objectContaining({ examId: 'n3-2020-12', mode: 'practice' }));
      expect(store.sectionScores().length).toBe(2);

      store.backFromAttempt();
      await new Promise((r) => setTimeout(r, 0));
      expect(store.phase()).toBe('notebook');
    });

    it('練習錯題本的題目答對後，它就不再是還沒掌握', async () => {
      const store = setup();
      const first = attempt({ questionIds: ['n3-2020-12-vocab-1'], wrongQuestionIds: ['n3-2020-12-vocab-1'] });
      attemptService.listAll.and.resolveTo([first]);
      await store.openNotebook();
      expect(store.notebookWrong().length).toBe(1);

      // 模擬從錯題本練習並答對
      attemptService.listAll.and.resolveTo([
        first,
        attempt({ id: 'b', examId: 'notebook', attemptNo: 1, questionIds: ['n3-2020-12-vocab-1'], wrongQuestionIds: [] }),
      ]);
      await store.openNotebook();
      expect(store.notebookWrong().length).toBe(0);
    });

    it('已學會的單字應該從清單收起來，並存到收藏；勾選顯示後又出現', async () => {
      const store = setup();
      attemptService.listAll.and.resolveTo([
        attempt({ questionIds: ['n3-2020-12-vocab-1'], wrongQuestionIds: ['n3-2020-12-vocab-1'] }),
      ]);
      await store.openNotebook();
      expect(store.notebookLists().vocab.map((v) => v.word)).toEqual(['a']);

      await store.toggleLearnedVocab('a');
      expect(store.notebookLists().vocab.length).toBe(0);
      expect(bookmarks.setBookmarks).toHaveBeenCalledWith('u1', 'examNotebookLearnedVocab', ['a']);

      store.setNotebookShowLearned(true);
      expect(store.notebookLists().vocab.length).toBe(1);
    });
  });
});
