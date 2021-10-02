<template>
  <div>
    <v-list>
      <v-list-item v-for="(item, index) in shopList" :key="index" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.shopName }}</v-list-item-title>
          <v-list-item-subtitle> {{ item.timeStamp }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-divider />
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useStore,
} from "@nuxtjs/composition-api";
import { getShop } from "@/usecase/ShopService";
import { ShopResponse } from "~/types/response";

export default defineComponent({
  components: {},
  setup(props, context) {
    const store = useStore();
    const shopList = ref<ShopResponse[]>([]);
    onMounted(async () => {
      shopList.value = await getShop(store.getters["auth/userToken"]);
    });
    return {
      shopList,
    };
  },
});
</script>