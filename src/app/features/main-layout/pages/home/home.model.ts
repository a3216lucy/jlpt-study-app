/** 今日學習計畫的單一任務項目 */
export interface TodayTask {
  /** 任務 id */
  id: string;
  /** Font Awesome icon class */
  icon: string;
  /** icon 顏色 class */
  iconColor: string;
  /** 任務顯示文字 */
  label: string;
  /** 任務標籤文字（如「單詞計畫」） */
  chipLabel: string;
  /** 任務標籤配色 */
  chipColor: 'matcha' | 'accent' | 'amber';
  /** 點擊後導向的路由 */
  routerLink: string;
  /** 任務是否已完成（今日）。目前只有單字新學/複習有真實資料來源 */
  done: boolean;
}

/** 快速入口單一項目 */
export interface QuickEntry {
  /** 項目 id */
  id: string;
  /** Font Awesome icon class */
  icon: string;
  /** icon 顏色 class */
  iconColor: string;
  /** icon 底色 class */
  iconBg: string;
  /** 項目顯示文字 */
  label: string;
  /** 點擊後導向的路由，尚未支援時為 null */
  routerLink: string | null;
  /** 尚未有對應頁面時為 true，點擊只顯示提示 */
  comingSoon: boolean;
}
