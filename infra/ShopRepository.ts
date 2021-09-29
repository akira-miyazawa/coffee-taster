import firebase from '../plugins/firebase';
import { db } from '../plugins/firebase';
import { Shop } from '../model/Shop';
import { Coffee } from '../model/Coffee';

export class ShopRepository {
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  async get(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return await db.collection('user').doc(this.token).collection('shop').get();
  }

  async post(shop: Shop, coffee: Coffee): Promise<void> {
    try {
      const userDoc = db.collection('user').doc(this.token);
      const shopResponse = await userDoc.collection('shop').add({
        name: shop.name,
      });
      const shopDoc = userDoc.collection('shop').doc(shopResponse.id);
      const response = await shopDoc.collection('coffee').add({
        name: coffee.name,
        status: coffee.status,
        coffee_state_score: {
          bitterness: coffee.coffeeTastescore.bitterness,
          sourness: coffee.coffeeTastescore.sourness,
          sweetness: coffee.coffeeTastescore.sweetness,
          richness: coffee.coffeeTastescore.richness,
          scent: coffee.coffeeTastescore.scent
        },
        bean: {
          roast: coffee.bean.roast,
          origin: coffee.bean.origin
        },
        score: coffee.score,
        comment: coffee.comment
      });
    } catch (e) {
      throw new Error('ショップの保存に失敗しました')
    }
  }
}
