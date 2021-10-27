import { auth } from '../plugins/firebase';
import { AuthState } from '../types/store';
import { User } from '../model/User';
import { existUser, postUser } from '../usecase/UserService';

export const state = (): AuthState => ({
  status: false,
  user: {
    userName: '',
    token: '',
  },
});

export const getters = {
  isLoggedIn: (state: AuthState) => state.status,
  userName: (state: AuthState) => state.user.userName,
  userToken: (state: AuthState) => state.user.token,
}

export const actions = {
  async login({ commit }, userInfo: any) {
    const user: User = new User(userInfo.uid, userInfo.displayName, null);
    try {
      if (await existUser(userInfo.uid)) {
        commit('setUser', userInfo);
      } else {
        await postUser(user);
        commit('setUser', userInfo);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  async logout({ commit }) {
    await auth.signOut();
    commit("logout");
  },
}

export const mutations = {
  setUser(state: AuthState, userInfo: any) {
    state.status = true;
    state.user.userName = userInfo.displayName;
    state.user.token = userInfo.uid;
  },
  logout(state: AuthState) {
    state.status = false;
    state.user.userName = "";
    state.user.token = "";
  }
}
