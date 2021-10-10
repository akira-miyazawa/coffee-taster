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
        <v-form ref="formRef" v-model="valid" lazy-validation>
          <text-component
            class="input"
            :text.sync="shop.shopName"
            :rules="[rules.required, rules.textCounter]"
            label="ショップ名"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <text-component
            class="input"
            :text.sync="shop.coffeeName"
            :rules="[rules.required, rules.textCounter]"
            label="ドリンク名"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <v-btn-toggle
            class="btn-toggle"
            v-model="shop.drinkStatus"
            :color="stateColor(shop.drinkStatus)"
            group
          >
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
            :tasteScore.sync="shop.coffeeTasteScore.bitterness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="酸味"
            :tasteScore.sync="shop.coffeeTasteScore.sourness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="甘み"
            :tasteScore.sync="shop.coffeeTasteScore.sweetness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="コク"
            :tasteScore.sync="shop.coffeeTasteScore.richness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="香り"
            :tasteScore.sync="shop.coffeeTasteScore.scent"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
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
            hint=""
          />
          <textarea-component
            class="input"
            :text.sync="shop.comment"
            :rules="[rules.required, rules.textareaCounter]"
            :maxlength="500"
            label="コメント"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <RatingComponent
            class="rating"
            itemName="あなたの評価"
            :tasteScore.sync="shop.score"
            backgroundColor="grey darken-1"
            color="yellow darken-3"
            :isLarge="true"
            :isReadonly="!isEdit"
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
                <v-btn fab dark small color="green" @click="update">
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
        </v-form>
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
import { convertShopRequest } from "@/util/Convert";
import { getShop } from "@/usecase/ShopService";
import { ShopResponse } from "@/types/response";
import { DrinkStatus, RoastType } from "@/types/input";
import { ShopRequest } from "@/types/request";
import { updateShop } from "@/usecase/ShopService";

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
    const shopList = ref<ShopRequest[]>([]);
    const shop = reactive<ShopRequest>({
      documentId: "",
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
    });
    const formRef = ref<any>(null);
    const isEdit = ref<boolean>(false);
    const fab = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const valid = ref<Boolean>(false);

    const rules = reactive<any>({
      required: (value: string) => !!value || "必須",
      textCounter: (value: string) =>
        value.length <= 50 || "上限50文字を超えています",
      textareaCounter: (value: string) =>
        value.length <= 500 || "上限500文字を超えています",
    });

    onMounted(async () => {
      const responses: ShopResponse[] = await getShop(
        store.getters["auth/userToken"]
      );
      shopList.value = responses.map((res) => convertShopRequest(res));
    });

    const selectItem = (item: ShopResponse) => {
      shop.documentId = item.documentId;
      shop.shopName = item.shopName;
      shop.coffeeName = item.coffeeName;
      shop.drinkStatus = item.drinkStatus;
      shop.score = item.score;
      shop.coffeeTasteScore = item.coffeeTasteScore;
      shop.roast = item.roast;
      shop.origin = item.origin;
      shop.comment = item.comment;
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

    const stateColor = (drinkStatus: DrinkStatus) => {
      return drinkStatus === "HOT" ? "red" : "blue";
    };

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        shop.roast = "NONE";
      }
      shop.roast = value;
    };

    const close = () => (isOpen.value = false);

    const update = async () => {
      if (formRef.value.validate()) {
        // await updateShop(store.getters["auth/userToken"], shop);
        alert("バリデーションOK！！");
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    return {
      shopList,
      shop,
      formRef,
      isEdit,
      fab,
      isOpen,
      valid,
      rules,
      selectItem,
      handleBitterness,
      handleSourness,
      handleSweetness,
      handleScent,
      handleRichness,
      handleScore,
      stateColor,
      changeRoast,
      close,
      update,
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