/** 使用者的應試目標設定（users/{uid}/settings/general） */
export interface UserSettings {
  /** 目標報考級別，例如 'N3' */
  targetLevel: string;
  /** 目標考試日期 YYYY-MM-DD */
  examDate: string;
}
