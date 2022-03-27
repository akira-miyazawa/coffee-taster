<template>
  <v-bottom-sheet
    class="bottom-sheet"
    v-model="isDisable"
    hide-overlay
    width="100%"
  >
    <v-card class="text-center">
      <v-btn class="mt-6" color="brown" @click="toInput"> 記録する </v-btn>
      <v-card-title class="title">{{ selectPlace.name }}</v-card-title>
      <div>
        <v-expansion-panels accordion>
          <ExpansionPalnelComponent
            v-if="selectPlace.address"
            header-text="住所"
            :content-texts="[selectPlace.address]"
            header-color="#efebe9"
            content-color="#efebe9"
          />
          <ExpansionPalnelComponent
            v-if="selectPlace.week.length !== 0"
            header-text="営業時間"
            :content-texts="selectPlace.week"
            header-color="#efebe9"
            content-color="#efebe9"
          />
        </v-expansion-panels>
      </div>
      <div v-if="selectPlace.photos.length !== 0" class="img-area">
        <v-img
          v-for="photo in selectPlace.photos"
          :key="photo"
          :src="photo"
          :lazy-src="photo"
          max-height="150"
          max-width="250"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5">
              </v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { Place } from "@/types/input";
import {
  defineComponent,
  PropType,
  ref,
  useRouter,
  useStore,
  watch,
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
    const isDisable = ref<boolean>(false);
    watch(props, () => {
      isDisable.value = props.disable;
    });
    const toInput = () => {
      store.commit("shop/setPlaceId", props.selectPlace.placeId);
      store.commit("shop/setShop", props.selectPlace.name);
      router.push("input");
    };
    return { toInput, isDisable };
  },
});
</script>

<style scoped lang="postcss">
.title {
  margin-right: 24px;
}
.text-center {
  overflow: scroll;
  height: 30vh;
  min-width: 400px;
  background-color: #efebe9;
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