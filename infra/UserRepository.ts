import firebase from '../plugins/firebase';
import { User } from '../model/User';
import { db } from '../plugins/firebase';

export class UserRepository {

  async getUser(token: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return await db.collection('user').doc(token).get();
  }

  async getUsers(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return await db.collection('user').get();
  }

  async post(user: User): Promise<boolean> {
    await db.collection('user').doc(user.id).set({
      user_id: user.id,
      name: user.name
    });
    return true;
  }
}