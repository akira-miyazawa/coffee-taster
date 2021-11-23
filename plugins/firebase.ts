import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore"
import { firebaseConfig } from '@/firebase/config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase

export const auth = firebase.auth();

export const db = firebase.firestore();