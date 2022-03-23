import { ShopRequest } from "@/types/request";
import { ShopResponse } from "@/types/response";

export const convertShopRequest = (shop: ShopResponse):ShopRequest => {
  return {
    documentId: shop.documentId,
    placeId: shop.placeId,
    shopName: shop.shopName,
    coffeeName: shop.coffeeName,
    drinkStatus: shop.drinkStatus,
    score: shop.score,
    coffeeTasteScore: shop.coffeeTasteScore,
    roast: shop.roast,
    origin: shop.origin,
    comment: shop.comment,
    timeStamp: shop.timeStamp
  };
}