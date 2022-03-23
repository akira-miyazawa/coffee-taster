export interface Form {
  /** place_id */
  placeId: string;
  /** ショップ名 */
  shopName: string;
  /** ドリンク名 */
  coffeeName: string;
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

export interface Place {
  placeId: string;
  position: google.maps.LatLng | undefined;
  name: string;
  address: string;
  photos: string[];
  week: string[];
}