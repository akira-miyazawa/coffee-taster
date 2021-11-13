<template>
  <v-list class="list" style="background-color: #efebe9">
    <div v-for="(item, index) in shopList" :key="`list-item-${index}`">
      <v-list-item link :key="`list-item-${index}`" @click="selectItem(item)">
        <v-list-item-content>
          <v-list-item-title v-text="item.shopName" />
          <v-list-item-subtitle v-text="item.coffeeName" />
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-text="item.timeStamp" />
          <v-rating
            small
            dense
            :value="item.score"
            length="5"
            backgroundColor="grey darken-1"
            color="yellow darken-3"
            readonly
          />
        </v-list-item-action>
      </v-list-item>
      <v-divider :key="`divider-${index}`" />
    </div>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { ShopRequest } from "@/types/request";

export default defineComponent({
  props: {
    shopList: {
      type: Array as PropType<ShopRequest[]>,
      require: true,
    },
    selectItem: {
      type: Function as unknown as () => (item: ShopRequest) => void,
      require: true,
    },
  },
});
</script>
