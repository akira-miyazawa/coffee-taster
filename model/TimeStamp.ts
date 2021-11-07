import { formatDate } from '@/util/Date';

export class TimeStamp {
  /** 登録日時(YYYY/MM/DD) */
  public readonly date: string;

  constructor(dt: Date) {
    if (dt == null) {
      throw new Error('TimeStampを生成できません');
    }
    const date = formatDate(dt);
    this.date = date;
  }
} 