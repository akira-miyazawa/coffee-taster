import { Context } from '@nuxt/types';
import { auth } from '@/plugins/firebase';

export default ({ route, store, redirect }: Context) => {
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
