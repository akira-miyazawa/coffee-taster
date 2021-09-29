import { UserRepository } from "../infra/UserRepository";
import { User } from "../model/User";

export class UserService {
  private repository = new UserRepository();

  /**
   * ユーザー情報を取得します
   * @param token 
   * @returns 
   */
  async get(token: string) {
    return await this.repository.get(token);
  }

  /**
   * ユーザー情報を保存します
   * @param user 
   * @returns 
   */
  async post(user: User) {
    return await this.repository.post(user);
  }
}