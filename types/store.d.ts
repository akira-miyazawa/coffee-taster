export interface AuthState {
  status: boolean;
  user: {
    userName: string;
    token: string;
  }
}

export interface ShopState {
  placeId: string;
  shopName: string;
}