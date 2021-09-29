import { auth } from '../plugins/firebase';
import { State } from '../types/store';
import { User } from '../model/User';
import { UserService } from '../usecase/UserService';

export const state = (): State => ({
  status: false,
  user: {
    userName: '',
    token: ''
  },
});

export const getters = {
  isLoggedIn: (state: State) => state.status
}

export const actions = {
  async login({ commit }, userInfo: any) {
    const user: User = new User(userInfo.uid, userInfo.displayName);
    const service = new UserService();
    try {
      const response = await service.getUser(userInfo.uid);
      if (response.exists) {
        commit('setUser', userInfo);
      } else {
        await service.post(user);
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
  setUser(state: State, userInfo: any) {
    state.status = true;
    state.user.userName = userInfo.displayName;
    state.user.token = userInfo.uid;
  },
  logout(state: State) {
    state.status = false;
    state.user.userName = "";
    state.user.token = "";
  }
}
