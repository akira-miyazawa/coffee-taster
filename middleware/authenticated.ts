import { auth } from '../plugins/firebase';

export default function ({ route, store, redirect }) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await store.dispatch("auth/login", user)
    } else {
      if (route.name !== "login") {
        redirect("/login")
      }
    }
  })
};
