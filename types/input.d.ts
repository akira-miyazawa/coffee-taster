export interface Form {
  /** ショップ名 */
  shopName: string;
  /** ドリンク名 */
  drinkName: string;
  /** HOT or ICE */
  drinkStatus: DrinkStatus;
  /** 評価 */
  score: number;
  /** テイスト */
  coffeeTasteScore: CoffeeTasteScoreType;
  /** 焙煎 */
  roast: RoastType;
  /** 産地 */
  origin: string;
  /** コメント */
  comment: string;
}

export interface CoffeeTasteScoreType {
  bitterness: number;
  sourness: number;
  sweetness: number;
  richness: number;
  scent: number;
}

/** HOT or ICE */
export type DrinkStatus = 'HOT' | 'ICE';

/** 焙煎 */
export type RoastType = 'LIGHT' | 'MEDIUM' | 'DEEP' | 'NONE';