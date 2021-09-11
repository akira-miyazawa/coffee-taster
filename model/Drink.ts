import { CoffeeTasteScore } from "../types/CoffeeTasteScore";
import { Bean } from "./Bean";

export type DrinkStatus = 'HOT' | 'ICE';
export class Drink {
  /** ドリンク名 */
  public readonly name: string;
  /** HOT or ICE */
  public readonly status: DrinkStatus;
  /** テイスト */
  public readonly score: CoffeeTasteScore;
  /** コーヒー豆の情報 */
  public readonly bean: Bean;

  constructor(name: string, status: DrinkStatus, score: CoffeeTasteScore, bean: Bean) {
    if (name == null || name === '') {
      throw new Error('ドリンク名は必須です');
    }
    if (status == null) {
      throw new Error('ドリンクのHOT or ICEは必須です');
    }
    if (score == null) {
      throw new Error('ドリンクのスコアは必須です');
    }
    this.name = name;
    this.status = status;
    this.score = score;
    this.bean = bean;
  }
}