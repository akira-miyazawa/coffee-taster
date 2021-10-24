import { ShopRepository } from "../infra/ShopRepository";
import { Bean } from "../model/Bean";
import { Coffee } from "../model/Coffee";
import { Shop } from "../model/Shop";
import { TimeStamp } from "../model/TimeStamp";
import { Form } from "../types/input";
import { ShopRequest } from "../types/request";
import { ShopResponse } from "../types/response";

export class ShopService {
  public readonly repository: ShopRepository;

  constructor(token: string) {
    if (token == null || token === '') {
      throw new Error('ユーザートークンは必須です');
    }
    this.repository = new ShopRepository(token);
  }

  async get(): Promise<ShopResponse[]> {
    const responses = await this.repository.get();
    return responses.map((res): ShopResponse => {
      const shop = new Shop(res.data.shop_name);
      const coffee = new Coffee(
        res.data.coffee_name,
        res.data.status,
        res.data.score,
        res.data.coffee_state_score,
        new Bean(res.data.roast, res.data.origin),
        res.data.comment,
      );
      const timeStamp = new TimeStamp(res.data.timeStamp.toDate());
      return {
        documentId: res.documentId,
        shopName: shop.name,
        coffeeName: coffee.name,
        drinkStatus: coffee.status,
        score: coffee.score,
        coffeeTasteScore: coffee.coffeeTastescore,
        roast: coffee.bean.roast,
        origin: coffee.bean.origin,
        comment: coffee.comment,
        timeStamp: timeStamp.date,
      };
    });
  }

  async post(form: Form) {
    const shop = new Shop(form.shopName);
    const coffee = new Coffee(
      form.coffeeName,
      form.drinkStatus,
      form.score,
      form.coffeeTasteScore,
      new Bean(form.roast, form.origin),
      form.comment,
    );
    return await this.repository.post(shop, coffee);
  }

  async update(shopReq: ShopRequest) {
    const shop = new Shop(shopReq.shopName);
    const coffee = new Coffee(
      shopReq.coffeeName,
      shopReq.drinkStatus,
      shopReq.score,
      shopReq.coffeeTasteScore,
      new Bean(shopReq.roast, shopReq.origin),
      shopReq.comment,
    );
    return await this.repository.update(shopReq.documentId, shop, coffee);
  }

  async delete(shopReq: ShopRequest) {
    return await this.repository.delete(shopReq.documentId);
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

/**
 * ショップ情報を編集します
 * @param token ユーザートークン
 * @param shopReq
 * @returns 
 */
export const updateShop = async (token: string, shopReq: ShopRequest) => {
  const service = new ShopService(token);
  return await service.update(shopReq);
};

/**
 * ショップ情報を削除します
 * @param token ユーザートークン
 * @param shopReq
 * @returns 
 */
export const deleteShop = async (token: string, shopReq: ShopRequest) => {
  const service = new ShopService(token);
  return await service.delete(shopReq);
}