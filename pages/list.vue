<template>
  <div>
    <v-list>
      <template v-for="(item, index) in shopList">
        <v-list-item :key="`list-item-${index}`" link @click="selectItem(item)">
          <v-list-item-content>
            <v-list-item-title v-text="item.shopName" />
            <v-list-item-subtitle v-text="item.coffeeName" />
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text v-text="item.timeStamp" />
            <v-rating small dense :value="item.score" length="5" readonly />
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="`divider-${index}`" />
      </template>
    </v-list>
    <v-dialog v-model="isOpen" fullscreen>
      <v-card>
        <text-component
          class="input"
          :text.sync="shop.shopName"
          label="ショップ名"
          :isReadonly="!isEdit"
        />
        <text-component
          class="input"
          :text.sync="shop.coffeeName"
          label="ドリンク名"
          :isReadonly="!isEdit"
        />
        <v-btn-toggle class="btn-toggle" v-model="shop.drinkStatus" group>
          <toggle-button-component
            value="HOT"
            label="HOT"
            :isDisabled="!isEdit"
          />
          <toggle-button-component
            value="ICE"
            label="ICE"
            :isDisabled="!isEdit"
          />
        </v-btn-toggle>
        <radar-chert-component :coffeeTasteScore="shop.coffeeTasteScore" />
        <RatingComponent
          itemName="苦味"
          :tasteScore="shop.coffeeTasteScore.bitterness"
          backgroundColor="cyan lighten-2"
          color="blue"
          :isLarge="false"
          :isReadonly="!isEdit"
          @event="handleBitterness"
        />
        <RatingComponent
          itemName="酸味"
          :tasteScore="shop.coffeeTasteScore.sourness"
          backgroundColor="cyan lighten-2"
          color="blue"
          :isLarge="false"
          :isReadonly="!isEdit"
          @event="handleSourness"
        />
        <RatingComponent
          itemName="甘み"
          :tasteScore="shop.coffeeTasteScore.sweetness"
          backgroundColor="cyan lighten-2"
          color="blue"
          :isLarge="false"
          :isReadonly="!isEdit"
          @event="handleSweetness"
        />
        <RatingComponent
          itemName="コク"
          :tasteScore="shop.coffeeTasteScore.richness"
          backgroundColor="cyan lighten-2"
          color="blue"
          :isLarge="false"
          :isReadonly="!isEdit"
          @event="handleRichness"
        />
        <RatingComponent
          itemName="香り"
          :tasteScore="shop.coffeeTasteScore.scent"
          backgroundColor="cyan lighten-2"
          color="blue"
          :isLarge="false"
          :isReadonly="!isEdit"
          @event="handleScent"
        />
        <v-btn-toggle
          v-model="shop.roast"
          class="btn-toggle"
          @change="changeRoast"
          tile
          color="blue"
          group
        >
          <toggle-button-component
            value="LIGHT"
            label="浅煎り"
            :isDisabled="!isEdit"
          />
          <toggle-button-component
            value="MEDIUM"
            label="中煎り"
            :isDisabled="!isEdit"
          />
          <toggle-button-component
            value="DEEP"
            label="深煎り"
            :isDisabled="!isEdit"
          />
        </v-btn-toggle>
        <text-component
          class="input"
          :text.sync="shop.origin"
          label="産地"
          :isReadonly="!isEdit"
        />
        <textarea-component
          class="input"
          :text.sync="shop.comment"
          label="コメント"
          :isReadonly="!isEdit"
        />
        <RatingComponent
          class="score-rating"
          itemName="あなたの評価"
          :tasteScore="shop.score"
          backgroundColor="grey darken-1"
          color="yellow darken-3"
          :isLarge="true"
          :isReadonly="!isEdit"
          @event="handleScore"
        />
        <v-row class="flex-column">
          <v-col>
            <v-speed-dial
              v-model="fab"
              fab
              fixed
              bottom
              right
              style="bottom: 80px"
            >
              <template v-slot:activator>
                <v-btn v-model="fab" color="blue darken-2" dark fab>
                  <v-icon v-if="fab"> mdi-undo </v-icon>
                  <v-icon v-else> mdi-format-list-bulleted-square </v-icon>
                </v-btn>
              </template>
              <v-btn fab dark small color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn fab dark small color="green">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-col>
          <v-col>
            <v-btn fixed fab bottom right @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
import TextComponent from "@/components/text/TextComponent.vue";
import ToggleButtonComponent from "@/components/button/ToggleButtonComponent.vue";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import TextareaComponent from "@/components/text/TextareaComponent.vue";
import { getShop } from "@/usecase/ShopService";
import { ShopResponse } from "@/types/response";
import { RoastType } from "@/types/input";

export default defineComponent({
  components: {
    TextComponent,
    ToggleButtonComponent,
    RatingComponent,
    RadarChertComponent,
    TextareaComponent,
  },
  setup(props, context) {
    const store = useStore();
    const shopList = ref<ShopResponse[]>([]);
    const shop = reactive<ShopResponse>({
      shopName: "",
      coffeeName: "",
      drinkStatus: "HOT",
      score: 3,
      coffeeTasteScore: {
        bitterness: 0,
        sourness: 0,
        sweetness: 0,
        richness: 0,
        scent: 0,
      },
      roast: "NONE",
      origin: "不明",
      comment: "",
      timeStamp: "",
    });
    const isEdit = ref<boolean>(false);
    const fab = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    onMounted(async () => {
      shopList.value = await getShop(store.getters["auth/userToken"]);
    });
    const selectItem = (item: ShopResponse) => {
      shop.shopName = item.shopName;
      shop.coffeeName = item.coffeeName;
      shop.drinkStatus = item.drinkStatus;
      shop.score = item.score;
      shop.coffeeTasteScore = item.coffeeTasteScore;
      shop.roast = item.roast;
      shop.origin = item.origin;
      shop.comment = item.comment;
      shop.timeStamp = item.timeStamp;
      isOpen.value = true;
    };

    const handleBitterness = (score: number) =>
      (shop.coffeeTasteScore.bitterness = score);
    const handleSourness = (score: number) =>
      (shop.coffeeTasteScore.sourness = score);
    const handleSweetness = (score: number) =>
      (shop.coffeeTasteScore.sweetness = score);
    const handleScent = (score: number) =>
      (shop.coffeeTasteScore.scent = score);
    const handleRichness = (score: number) =>
      (shop.coffeeTasteScore.richness = score);
    const handleScore = (score: number) => (shop.score = score);

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        shop.roast = "NONE";
      }
      shop.roast = value;
    };

    const close = () => (isOpen.value = false);
    return {
      shopList,
      shop,
      isEdit,
      fab,
      isOpen,
      selectItem,
      handleBitterness,
      handleSourness,
      handleSweetness,
      handleScent,
      handleRichness,
      handleScore,
      changeRoast,
      close,
    };
  },
});
</script>

<style lang="postcss" scoped>
.input {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.btn {
  text-align: center;
}
.btn-toggle {
  width: 100%;
  justify-content: center;
}
.rating {
  display: block;
  margin-bottom: 5vh;
}
.score-rating {
  display: block;
}
.v-card {
  padding: 14px !important;
}
</style>