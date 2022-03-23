<template>
  <v-bottom-sheet v-model="disable" hide-overlay width="100%">
    <v-card class="text-center">
      <v-btn class="mt-6" color="brown" @click="toInput"> 記録する </v-btn>
      <v-card-title>{{ selectPlace.name }}</v-card-title>
      <div>
        <v-expansion-panels accordion>
          <ExpansionPalnelComponent
            header-text="住所"
            :content-texts="[selectPlace.address]"
          />
          <ExpansionPalnelComponent
            header-text="営業時間"
            :content-texts="selectPlace.week"
          />
        </v-expansion-panels>
      </div>
      <div class="img-area">
        <v-img
          v-for="photo in selectPlace.photos"
          :key="photo"
          :src="photo"
          max-height="150"
          max-width="250"
        ></v-img>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Place } from "@/types/input";
import {
  defineComponent,
  PropType,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import ExpansionPalnelComponent from "@/components/atoms/expansion-panel/ExpansionPalnelComponent.vue";
import ImgComponent from "@/components/atoms/img/ImgComponent.vue";

export default defineComponent({
  components: { ExpansionPalnelComponent, ImgComponent },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    selectPlace: {
      type: Object as PropType<Place>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const toInput = () => {
      store.commit("shop/setPlaceId", props.selectPlace.placeId);
      store.commit("shop/setShop", props.selectPlace.name);
      router.push("input");
    };
    return { toInput };
  },
});
</script>

<style scoped lang="postcss">
.text-center {
  overflow: scroll;
  height: 30vh;
  min-width: 400px;
}
.img-area {
  display: flex;
  width: 100%;
  overflow-x: scroll;
}

.tree {
  display: inline-flex;
}
</style>