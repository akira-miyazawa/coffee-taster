export class User {
  /** ユーザーID */
  public readonly id: string;
  /** ユーザー名 */
  public readonly name: string;

  constructor(id: string, name: string) {
    if (id == null || id === '') {
      throw new Error('ユーザーIDは必須です');
    }
    if (name == null || id === '') {
      throw new Error('ユーザー名は必須です');
    }
    this.id = id;
    this.name = name;
  }
}