import Cookies from "js-cookie";
import createPersistedState from 'vuex-persistedstate';

export const plugins = [
  createPersistedState({
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: (key) => Cookies.remove(key),
    },
  })
];
