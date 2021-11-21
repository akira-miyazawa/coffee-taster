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
          <RatingComponent
            :score="item.score"
            :isReadonly="true"
            :isSmall="true"
            :isDense="true"
            color="yellow darken-3"
            backgroundColor="grey darken-1"
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
import RatingComponent from "@/components/atoms/rating/RatingComponent.vue";

export default defineComponent({
  components: { RatingComponent },
  props: {
    shopList: {
      type: Array as PropType<ShopRequest[]>,
      required: true,
    },
    selectItem: {
      type: Function as unknown as () => (item: ShopRequest) => void,
      required: true,
    },
  },
});
</script>
