export class Shop {
  /** ショップ名 */
  public readonly name: string;

  constructor(name: string) {
    if (name == null || name === '') {
      throw new Error('ショップ名は必須です');
    }
    this.name = name;
  }
}