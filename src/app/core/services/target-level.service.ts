// Cores
import { Injectable, inject, signal } from '@angular/core';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Config
import { DEFAULT_TARGET_LEVEL } from '@core/config/jlpt-schedule';
// Services
import { UserSettingsService } from '@core/services/user-settings.service';

/**
 * 使用者的「應考目標級別」（個人中心設定）。各頁的級別切換預設值依這個決定：
 * 目標是 N2，單詞、句型、考古題、句型測驗就預設切到 N2。
 */
@Injectable({ providedIn: 'root' })
export class TargetLevelService {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly auth = inject(Auth);
  private readonly settings = inject(UserSettingsService);

  // State
  // --------------------------------------------------------------------
  readonly level = signal<string>(DEFAULT_TARGET_LEVEL);
  private loaded: Promise<string> | null = null;

  // Public Handlers
  // --------------------------------------------------------------------
  /** 讀一次使用者設定；讀不到（未登入、錯誤）回預設，且不快取，下次再試 */
  load(): Promise<string> {
    if (this.loaded) return this.loaded;
    const uid = this.auth.currentUser?.uid;
    if (!uid) return Promise.resolve(this.level());

    const promise = this.settings
      .get(uid)
      .then((s) => {
        const level = s?.targetLevel ?? DEFAULT_TARGET_LEVEL;
        this.level.set(level);
        return level;
      })
      .catch(() => {
        this.loaded = null;
        return this.level();
      });
    this.loaded = promise;
    return promise;
  }

  /** 個人中心儲存新目標後呼叫，之後新開的頁面就用新級別 */
  set(level: string): void {
    this.level.set(level);
    this.loaded = Promise.resolve(level);
  }
}
