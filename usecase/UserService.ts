import { UserRepository } from "@/infra/UserRepository";
import { ShopRepository } from "@/infra/ShopRepository";
import { User } from "@/model/User";
import { CoffeeTasteScore } from "@/model/CoffeeTasteScore";
import { average } from "@/util/Calc";
import { UnmatchCoffeeTasteScore } from "@/model/UnmatchCoffeeTasteScore";

export class UserService {
  private repository = new UserRepository();

  async exist(token: string): Promise<boolean> {
    const res = await this.repository.get(token);
    return res.exists;
  }

  async get(token: string): Promise<User> {
    const shopRepository = new ShopRepository(token);
    const shopResponses = await shopRepository.get();
    const coffeeStateScores = shopResponses
      .filter((res) => res.data.score <= 2) // 評価が2以下
      .map((res) => {
        return new CoffeeTasteScore(
          res.data?.coffee_state_score?.bitterness,
          res.data?.coffee_state_score?.sourness,
          res.data?.coffee_state_score?.sweetness,
          res.data?.coffee_state_score?.scent,
          res.data?.coffee_state_score?.richness,
        );
      });
    const umMatchCoffeeStateScores = this.convertUmMatchCoffeeStateScores(coffeeStateScores);
    try {
      const res = await this.repository.get(token);
      return new User(
        res?.data()?.user_id,
        res?.data()?.name,
        umMatchCoffeeStateScores
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  async post(user: User) {
    return await this.repository.post(user);
  }

  /**
   *　UnmatchCoffeeTasteScoreモデルにコンバートします
   * @param coffeeStateScores テイストスコアの配列
   * @returns 
   */
  convertUmMatchCoffeeStateScores(coffeeStateScores: CoffeeTasteScore[]): UnmatchCoffeeTasteScore | null {
    return coffeeStateScores.length === 0 ? null : new UnmatchCoffeeTasteScore(
      average(coffeeStateScores.map(coffeeStateScore => coffeeStateScore.bitterness)),
      average(coffeeStateScores.map(coffeeStateScore => coffeeStateScore.sourness)),
      average(coffeeStateScores.map(coffeeStateScore => coffeeStateScore.sweetness)),
      average(coffeeStateScores.map(coffeeStateScore => coffeeStateScore.scent)),
      average(coffeeStateScores.map(coffeeStateScore => coffeeStateScore.richness)),
    );
  }
}

/**
 * ユーザー情報が存在するか
 * @param token 
 * @returns 
 */
export const existUser = async (token: string) => {
  const service = new UserService();
  return await service.exist(token);
};

/**
 * ユーザー情報を取得します
 * @param token 
 * @returns 
 */
export const getUser = async (token: string) => {
  const service = new UserService();
  return await service.get(token);
}

/**
 * ユーザー情報を保存します
 * @param user 
 * @returns 
 */
export const postUser = async (user: User) => {
  const service = new UserService();
  return await service.post(user);
}