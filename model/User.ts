export class User {
  /** ユーザーID */
  public readonly id: string;

  constructor(id: string) {
    if (id == null || id === '') {
      throw new Error('ユーザーIDは必須です');
    }
    this.id = id;
  }
}