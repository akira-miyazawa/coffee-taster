<template>
  <div>
    <v-list>
      <v-list-item v-for="(item, index) in postsData.posts" :key="index" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.shop_name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox v-model="item.value"></v-checkbox>
          <v-list-item-action-text>Done</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  useStore,
} from "@nuxtjs/composition-api";
import { getShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {},
  setup(props, context) {
    const store = useStore();
    const postsData = reactive<any>({ posts: [] });
    onMounted(async () => {
      postsData.posts = await getShop(store.getters["auth/userToken"]);
    });
    return {
      postsData,
    };
  },
});
</script>