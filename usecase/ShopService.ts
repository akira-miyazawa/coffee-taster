import { ShopRepository } from "../infra/ShopRepository";
import { Bean } from "../model/Bean";
import { Coffee } from "../model/Coffee";
import { Shop } from "../model/Shop";
import { Form } from "../types/input";

export class ShopService {
  public readonly repository: ShopRepository;

  constructor(token: string) {
    if (token == null || token === '') {
      throw new Error('ユーザートークンは必須です');
    }
    this.repository = new ShopRepository(token);
  }

  async get() {
    return await this.repository.get();
  }

  async post(form: Form) {
    const shop = new Shop(form.shopName);
    const coffee = new Coffee(
      form.drinkName,
      form.drinkStatus,
      form.score,
      form.coffeeTasteScore,
      new Bean(form.roast, form.origin),
      form.comment,
    );
    return await this.repository.post(shop, coffee);
  }
}

/**
 * ユーザーが記録したショップ情報を取得します
 * @param token ユーザートークン
 * @returns 
 */
export const getShop = async (token: string) => {
  const service = new ShopService(token);
  return await service.get();
}

/**
 * ショップ情報を保存します
 * @param token ユーザートークン
 * @param form 入力情報
 * @returns 
 */
export const postShop = async (token: string, form: Form) => {
  const service = new ShopService(token);
  return await service.post(form);
}