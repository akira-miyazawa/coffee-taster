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
        <v-switch
          v-model="isEdit"
          class="switch"
          label="編集"
          @change="editDisplay"
        />
        <v-form ref="formRef" v-model="valid" lazy-validation>
          <text-component
            class="input"
            :text.sync="displayShop.shopName"
            :rules="[rules.required, rules.textCounter]"
            label="ショップ名"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <text-component
            class="input"
            :text.sync="displayShop.coffeeName"
            :rules="[rules.required, rules.textCounter]"
            label="ドリンク名"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <v-radio-group
            class="radio-group"
            v-model="displayShop.drinkStatus"
            row
          >
            <radio-button-component
              value="HOT"
              label="HOT"
              :isReadonly="!isEdit"
              color="red"
            />
            <radio-button-component
              value="ICE"
              label="ICE"
              :isReadonly="!isEdit"
              color="indigo"
            />
          </v-radio-group>
          <radar-chert-component
            :coffeeTasteScore="displayShop.coffeeTasteScore"
          />
          <RatingComponent
            itemName="苦味"
            :tasteScore.sync="displayShop.coffeeTasteScore.bitterness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="酸味"
            :tasteScore.sync="displayShop.coffeeTasteScore.sourness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="甘み"
            :tasteScore.sync="displayShop.coffeeTasteScore.sweetness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="コク"
            :tasteScore.sync="displayShop.coffeeTasteScore.richness"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <RatingComponent
            itemName="香り"
            :tasteScore.sync="displayShop.coffeeTasteScore.scent"
            backgroundColor="cyan lighten-2"
            color="blue"
            :isLarge="false"
            :isReadonly="!isEdit"
          />
          <select-component
            class="input"
            :selectValue.sync="displayShop.roast"
            :items="roastList"
            label="焙煎"
            :isReadonly="!isEdit"
            itemText="name"
            itemValue="id"
          />
          <text-component
            class="input"
            :text.sync="displayShop.origin"
            label="産地"
            :isReadonly="!isEdit"
            hint=""
          />
          <textarea-component
            class="input"
            :text.sync="displayShop.comment"
            :rules="[rules.required, rules.textareaCounter]"
            :maxlength="500"
            label="コメント"
            :isReadonly="!isEdit"
            hint="必須"
          />
          <RatingComponent
            class="rating"
            itemName="あなたの評価"
            :tasteScore.sync="displayShop.score"
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
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  @click="indicateConfirmDelete"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="green"
                  @click="indicateConfirmEdit"
                >
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
      <v-dialog v-model="isConfirmBrowsing">
        <v-card>
          <v-card-text> 編集内容は破棄されますがよろしいですか？ </v-card-text>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toBrose">変更を破棄</v-btn>
          <v-btn color="primary" text @click="toEdit">編集を続ける</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="isConfirmEdit">
        <v-card>
          <v-card-text> 上書きしますがよろしいですか？ </v-card-text>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleUpdate">変更</v-btn>
          <v-btn color="primary" text @click="cancelEdit">キャンセル</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="isConfirmDelete">
        <v-card>
          <v-card-text> 削除しますがよろしいですか？ </v-card-text>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleDelete">削除</v-btn>
          <v-btn color="primary" text @click="cancelDelete">キャンセル</v-btn>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import TextComponent from "@/components/text/TextComponent.vue";
import RadioButtonComponent from "@/components/button/RadioButtonComponent.vue";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import SelectComponent from "@/components/select/SelectComponent.vue";
import TextareaComponent from "@/components/text/TextareaComponent.vue";
import { convertShopRequest } from "@/util/Convert";
import { deleteShop, getShop } from "@/usecase/ShopService";
import { ShopResponse } from "@/types/response";
import { DrinkStatus, RoastType } from "@/types/input";
import { ShopRequest } from "@/types/request";
import { updateShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    TextComponent,
    RadioButtonComponent,
    RatingComponent,
    RadarChertComponent,
    SelectComponent,
    TextareaComponent,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
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
    const displayShop = reactive<ShopRequest>({
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
    const isConfirmBrowsing = ref<boolean>(false);
    const isConfirmEdit = ref<boolean>(false);
    const isConfirmDelete = ref<boolean>(false);

    const fab = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const valid = ref<Boolean>(false);

    const roastList = [
      { id: "LIGHT", name: "浅煎り" },
      { id: "MEDIUM", name: "中煎り" },
      { id: "DEEP", name: "深煎り" },
      { id: "NONE", name: "不明" },
    ];

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

      displayShop.documentId = item.documentId;
      displayShop.shopName = item.shopName;
      displayShop.coffeeName = item.coffeeName;
      displayShop.drinkStatus = item.drinkStatus;
      displayShop.score = item.score;
      displayShop.coffeeTasteScore = item.coffeeTasteScore;
      displayShop.roast = item.roast;
      displayShop.origin = item.origin;
      displayShop.comment = item.comment;
      isOpen.value = true;
    };

    const editDisplay = () => {
      if (!isEdit.value) {
        isConfirmBrowsing.value = true;
      }
    };

    const toBrose = () => {
      displayShop.documentId = shop.documentId;
      displayShop.shopName = shop.shopName;
      displayShop.coffeeName = shop.coffeeName;
      displayShop.drinkStatus = shop.drinkStatus;
      displayShop.score = shop.score;
      displayShop.coffeeTasteScore = shop.coffeeTasteScore;
      displayShop.roast = shop.roast;
      displayShop.origin = shop.origin;
      displayShop.comment = shop.comment;
      isConfirmBrowsing.value = false;
    };

    const toEdit = () => {
      isEdit.value = true;
      isConfirmBrowsing.value = false;
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

    const close = async () => {
      isOpen.value = false;
      router.push("list");
      const responses: ShopResponse[] = await getShop(
        store.getters["auth/userToken"]
      );
      shopList.value = responses.map((res) => convertShopRequest(res));
    };

    const indicateConfirmEdit = () => (isConfirmEdit.value = true);

    const handleUpdate = async () => {
      if (formRef.value.validate()) {
        await updateShop(store.getters["auth/userToken"], displayShop);
      } else {
        const elements = document.getElementsByClassName("v-dialog--active");
        if (!elements || !elements.length) {
          // 要素が取得できなかった場合は終了
          return;
        }
        elements[0].scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      isConfirmEdit.value = false;
      isEdit.value = false;
    };
    const cancelEdit = () => (isConfirmEdit.value = false);

    const indicateConfirmDelete = () => (isConfirmDelete.value = true);
    const handleDelete = async () => {
      await deleteShop(store.getters["auth/userToken"], shop);
      location.reload();
    };
    const cancelDelete = () => (isConfirmDelete.value = false);

    return {
      shopList,
      shop,
      displayShop,
      formRef,
      isEdit,
      isConfirmBrowsing,
      isConfirmEdit,
      isConfirmDelete,
      fab,
      isOpen,
      valid,
      roastList,
      rules,
      selectItem,
      editDisplay,
      toBrose,
      toEdit,
      handleBitterness,
      handleSourness,
      handleSweetness,
      handleScent,
      handleRichness,
      handleScore,
      stateColor,
      changeRoast,
      close,
      indicateConfirmEdit,
      cancelEdit,
      handleUpdate,
      indicateConfirmDelete,
      handleDelete,
      cancelDelete,
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
.switch {
  margin-right: 1vw;
}
.switch >>> .v-input__slot {
  text-align: right;
  display: block;
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
.radio-group >>> .v-input--radio-group__input {
  justify-content: center;
}
</style>