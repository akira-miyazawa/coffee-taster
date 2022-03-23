export class Shop {
  /** place_id */
  public readonly placeId: string;
  /** ショップ名 */
  public readonly name: string;

  constructor(placeId: string, name: string) {
    if (name == null || name === '') {
      throw new Error('ショップ名は必須です');
    }
    this.placeId = placeId
    this.name = name;
  }
}