export class Shop {
  /** ショップ名 */
  public readonly name: string;
  /** コメント */
  public readonly comment: string;

  constructor(name: string, comment: string) {
    if (name == null || name === '') {
      throw new Error('ショップ名は必須です');
    }
    this.name = name;
    this.comment = comment == null ? '' : comment;
  }
}