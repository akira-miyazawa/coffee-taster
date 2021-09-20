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
  isLoggedIn: (state: State) => state.status
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
  setUser(state: State, user) {
    state.status = true;
    state.user.userName = user.displayName;
    state.user.token = user.uid;
  },
  logout(state: State) {
    state.status = false;
    state.user.userName = "";
    state.user.token = "";
  }
}
