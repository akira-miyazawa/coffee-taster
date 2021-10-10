import firebase from '../plugins/firebase';
import { db } from '../plugins/firebase';
import { Shop } from '../model/Shop';
import { Coffee } from '../model/Coffee';

export class ShopRepository {
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  async get(): Promise<firebase.firestore.DocumentData[]> {
    const snapshot = await db.collection('user').doc(this.token).collection('shop').orderBy("timeStamp", "desc").get();
    return snapshot.docs.map(doc => {
      return {
        documentId: doc.id,
        data: doc.data()
      };
    });
  }

  async post(shop: Shop, coffee: Coffee): Promise<void> {
    try {
      const userDoc = db.collection('user').doc(this.token);
      await userDoc.collection('shop').add({
        shop_name: shop.name,
        coffee_name: coffee.name,
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
        comment: coffee.comment,
        timeStamp: firebase.firestore.Timestamp.now().toDate(),
      });
    } catch (e) {
      throw new Error('ショップの保存に失敗しました')
    }
  }

  async update(documentId: string, shop: Shop, coffee: Coffee) {
    const userDoc = db.collection('user').doc(this.token);
    await userDoc.collection('shop').doc(documentId).update({
        shop_name: shop.name,
        coffee_name: coffee.name,
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
        comment: coffee.comment,
    })
  }
}
