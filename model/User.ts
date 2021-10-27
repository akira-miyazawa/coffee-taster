import { UnmatchCoffeeTasteScore } from "./UnMatchCoffeeTasteScore";

export class User {
  /** ユーザーID */
  public readonly id: string;
  /** ユーザー名 */
  public readonly name: string;
  /** 苦手な味 */
  public readonly unmatchCoffeeTasteScore: UnmatchCoffeeTasteScore | null;

  constructor(id: string, name: string, unmatchCoffeeTasteScore: UnmatchCoffeeTasteScore | null) {
    if (id == null || id === '') {
      throw new Error('ユーザーIDは必須です');
    }
    if (name == null || id === '') {
      throw new Error('ユーザー名は必須です');
    }
    this.id = id;
    this.name = name;
    this.unmatchCoffeeTasteScore = unmatchCoffeeTasteScore;
  }
}