import firebase from '@/plugins/firebase';
import { db } from '@/plugins/firebase';
import { User } from '@/model/User';

export class UserRepository {

  async get(token: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return await db.collection('user').doc(token).get();
  }

  async post(user: User): Promise<boolean> {
    await db.collection('user').doc(user.id).set({
      user_id: user.id,
      name: user.name
    });
    return true;
  }
}