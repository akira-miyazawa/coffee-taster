import firebase from 'firebase';
import "firebase/auth";
import { firebaseConfig } from './config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase

export const auth = firebase.auth();