import { Context } from "@nuxt/types";
import createPersistedState from 'vuex-persistedstate';

export default ({ store }: Context) => {
  createPersistedState({
    key: 'cafe_taster_user_token'
  })(store)
}