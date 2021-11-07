import { CoffeeTasteScoreType, DrinkStatus, RoastType } from "./input";

export interface ShopRequest {
  /** ドキュメントID */
  documentId: string;
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
  /** 登録日時(YYYY/MM/DD) */
  timeStamp: string;
}