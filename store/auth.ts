import { auth } from '../plugins/firebase';
import { State } from '../types/store';

export const state = (): State => ({
  status: false,
  user: {
    userName: '',
    token: ''
  },
})

export const getters = {
  isLoggedIn: (state: State) => state.status = true
}

export const actions = {
  gotUser({ commit }, user) {
      commit("setUser", user)
  },
  logout({ commit }) {
      auth.signOut().then(() => {
          commit("logout")
      })
  }
}

export const mutations = {
  setUser(state, user) {
    state.status = true;
    state.username = user.displayName
  },
  logout(state) {
    state.status = false;
    state.username = ""
  }
}
