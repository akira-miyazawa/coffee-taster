import { UserRepository } from "../infra/UserRepository";
import { User } from "../model/User";

export class UserService {
  private repository = new UserRepository();

  async getUser(token: string) {
    return await this.repository.getUser(token);
  }

  async getUsers() {
    return await this.repository.getUsers();
  }

  async post(user: User) {
    return await this.repository.post(user);
  }
}