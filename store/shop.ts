import { ShopState } from "@/types/store";

export const state = (): ShopState => ({
  placeId: '',
  shopName: '',
});

export const getters = {
  placeId: (state: ShopState) => state.placeId,
  shopName: (state: ShopState) => state.shopName,
};

export const mutations = {
  setPlaceId(state: ShopState, placeId: string) {
    state.placeId = placeId;
  },
  setShop(state: ShopState, shopName: string) {
    state.shopName = shopName;
  }
}