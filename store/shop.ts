import { ShopState } from "../types/store";

export const state = (): ShopState => ({
  shopName: '',
});

export const getters = {
  shopName: (state: ShopState) => state.shopName,
};

export const mutations = {
  setShop(state: ShopState, shopName: string) {
    state.shopName = shopName;
  }
}