/** 今日學習計畫的單一任務項目 */
export interface TodayTask {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  chipLabel: string;
  chipColor: 'matcha' | 'accent' | 'amber';
  routerLink: string;
  /** 任務是否已完成（今日）。目前只有單字新學/複習有真實資料來源 */
  done: boolean;
}

/** 快速入口單一項目 */
export interface QuickEntry {
  id: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  routerLink: string | null;
  /** 尚未有對應頁面時為 true，點擊只顯示提示 */
  comingSoon: boolean;
}
