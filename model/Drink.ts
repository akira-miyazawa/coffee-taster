import { CoffeeTasteScore } from "../types/CoffeeTasteScore";
import { Bean } from "./Bean";

export type DrinkStatus = 'HOT' | 'ICE';
export class Drink {
  /** ドリンク名 */
  public readonly name: string;
  /** HOT or ICE */
  public readonly status: DrinkStatus;
  /** テイスト */
  public readonly coffeeTastescore: CoffeeTasteScore;
  /** コーヒー豆の情報 */
  public readonly bean: Bean;
  /** 評価 */
  public readonly score: number = 3;

  constructor(name: string, status: DrinkStatus, score: number, coffeeTastescore: CoffeeTasteScore, bean: Bean) {
    if (name == null || name === '') {
      throw new Error('ドリンク名は必須です');
    }
    if (status == null) {
      throw new Error('ドリンクのHOT or ICEは必須です');
    }
    if (score > 0 && score <= 5) {
      throw new Error('ドリンクのお気に入り度は, 1以上５以下の値です')
    }
    if (coffeeTastescore == null) {
      throw new Error('コーヒーのスコアは必須です');
    }
    if (score == null) {
      throw new Error('ドリンクの評価は必須です');
    }
    this.name = name;
    this.status = status;
    this.coffeeTastescore = coffeeTastescore;
    this.bean = bean;
    this.score = score;
  }
}