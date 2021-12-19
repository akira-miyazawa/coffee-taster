<template>
  <div>
    <RaitingListComponent :shopList="shopList" :selectItem.sync="selectItem" />
    <v-dialog v-model="isOpen" fullscreen>
      <v-card>
        <div class="switch-area">
          <v-switch
            v-model="isEdit"
            class="switch"
            label="編集"
            color="brown"
            @change="editDisplay"
          />
        </div>
        <div class="input">
          <TextComponent
            :text.sync="displayShop.shopName"
            :rules="[rules.required, rules.textCounter]"
            label="ショップ名"
            :isReadonly="!isEdit"
            hint="必須"
          />
        </div>
        <v-form ref="formRef" v-model="valid" lazy-validation>
          <div class="input">
            <TextComponent
              :text.sync="displayShop.coffeeName"
              :rules="[rules.required, rules.textCounter]"
              label="ドリンク名"
              :isReadonly="!isEdit"
              hint="必須"
            />
          </div>
          <v-radio-group
            class="radio-group"
            v-model="displayShop.drinkStatus"
            row
          >
            <RadioButtonComponent
              value="HOT"
              label="HOT"
              :isReadonly="!isEdit"
              color="red"
            />
            <RadioButtonComponent
              value="ICE"
              label="ICE"
              :isReadonly="!isEdit"
              color="indigo"
            />
          </v-radio-group>
          <v-row>
            <v-col :cols="8" class="taste-rating" align-self="end">
              <OperateRatingComponent
                itemName="苦味"
                :score.sync="displayShop.coffeeTasteScore.bitterness"
                backgroundColor="brown lighten-2"
                color="brown"
                :isReadonly="!isEdit"
              />
              <OperateRatingComponent
                itemName="酸味"
                :score.sync="displayShop.coffeeTasteScore.sourness"
                backgroundColor="brown lighten-2"
                color="brown"
                :isReadonly="!isEdit"
              />
              <OperateRatingComponent
                itemName="甘み"
                :score.sync="displayShop.coffeeTasteScore.sweetness"
                backgroundColor="brown lighten-2"
                color="brown"
                :isReadonly="!isEdit"
              />
              <OperateRatingComponent
                itemName="コク"
                :score.sync="displayShop.coffeeTasteScore.richness"
                backgroundColor="brown lighten-2"
                color="brown"
                :isReadonly="!isEdit"
              />
              <OperateRatingComponent
                itemName="香り"
                :score.sync="displayShop.coffeeTasteScore.scent"
                backgroundColor="brown lighten-2"
                color="brown"
                :isReadonly="!isEdit"
              />
            </v-col>
            <v-col :cols="4" class="chart-rating">
              <RadarChertComponent
                :labels="['苦味', '酸味', '甘み', 'コク', '香り']"
                :coffeeTasteScore="displayShop.coffeeTasteScore"
                backgroundColor="rgba(141, 110, 99, 0.2)"
                borderColor="#6D4C41"
                gridLineColor="#BCAAA4"
              />
            </v-col>
          </v-row>
          <div class="input">
            <SelectComponent
              :selectValue.sync="displayShop.roast"
              :items="roastList"
              label="焙煎"
              :isReadonly="!isEdit"
              itemText="name"
              itemValue="id"
            />
          </div>
          <div class="input">
            <TextComponent
              :text.sync="displayShop.origin"
              label="産地"
              :isReadonly="!isEdit"
              hint=""
            />
          </div>
          <div class="input">
            <TextareaComponent
              :text.sync="displayShop.comment"
              :rules="[rules.required, rules.textareaCounter]"
              :maxlength="500"
              label="コメント"
              :isReadonly="!isEdit"
              hint="必須"
            />
          </div>
          <div class="rating">
            <OperateRatingComponent
              :isColumn="true"
              itemName="あなたの評価"
              :score.sync="displayShop.score"
              backgroundColor="grey darken-1"
              color="yellow darken-3"
              :isLarge="true"
              :isReadonly="!isEdit"
            />
          </div>
          <FloatingButtonComponent
            :indicateConfirmDelete="indicateConfirmDelete"
            :indicateConfirmEdit="indicateConfirmEdit"
            :close="close"
          />
        </v-form>
      </v-card>
      <DialogComponent
        :isOpen.sync="isConfirmBrowsing"
        text="編集内容は破棄されますがよろしいですか？"
        :exec="toBrose"
        execBtnText="変更を破棄"
        execBtnColor="error"
        :cancel="toEdit"
        cancelBtnText="編集を続ける"
        canselBtnColor="primary"
      />
      <DialogComponent
        :isOpen.sync="isConfirmEdit"
        text="上書きしますがよろしいですか？"
        :exec="handleUpdate"
        execBtnText="変更"
        execBtnColor="success"
        :cancel="cancelEdit"
        cancelBtnText="キャンセル"
        canselBtnColor="primary"
      />
      <DialogComponent
        :isOpen.sync="isConfirmDelete"
        text="削除しますがよろしいですか？"
        :exec="handleDelete"
        execBtnText="削除"
        execBtnColor="error"
        :cancel="cancelDelete"
        cancelBtnText="キャンセル"
        canselBtnColor="primary"
      />
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
import RaitingListComponent from "@/components/molecules/list/RaitingListComponent.vue";
import TextComponent from "@/components/atoms/text/TextComponent.vue";
import RadioButtonComponent from "@/components/atoms/button/RadioButtonComponent.vue";
import OperateRatingComponent from "@/components/molecules/rating/OperateRatingComponent.vue";
import RadarChertComponent from "@/components/atoms/chart/RadarChertComponent.vue";
import SelectComponent from "@/components/atoms/select/SelectComponent.vue";
import TextareaComponent from "@/components/atoms/text/TextareaComponent.vue";
import FloatingButtonComponent from "@/components/molecules/buttons/FloatingButtonComponent.vue";
import DialogComponent from "@/components/molecules/dialog/DialogComponent.vue";
import { convertShopRequest } from "@/util/Convert";
import { deleteShop, getShop } from "@/usecase/ShopService";
import { ShopResponse } from "@/types/response";
import { DrinkStatus, RoastType } from "@/types/input";
import { ShopRequest } from "@/types/request";
import { updateShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    RaitingListComponent,
    TextComponent,
    RadioButtonComponent,
    OperateRatingComponent,
    RadarChertComponent,
    SelectComponent,
    TextareaComponent,
    FloatingButtonComponent,
    DialogComponent,
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
      timeStamp: "",
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
      timeStamp: "",
    });
    const formRef = ref<any>(null);

    const isEdit = ref<boolean>(false);
    const isConfirmBrowsing = ref<boolean>(false);
    const isConfirmEdit = ref<boolean>(false);
    const isConfirmDelete = ref<boolean>(false);

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
      shop.timeStamp = item.timeStamp;

      displayShop.documentId = item.documentId;
      displayShop.shopName = item.shopName;
      displayShop.coffeeName = item.coffeeName;
      displayShop.drinkStatus = item.drinkStatus;
      displayShop.score = item.score;
      displayShop.coffeeTasteScore = item.coffeeTasteScore;
      displayShop.roast = item.roast;
      displayShop.origin = item.origin;
      displayShop.comment = item.comment;
      displayShop.timeStamp = item.timeStamp;
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
      isEdit.value = false;
      const responses: ShopResponse[] = await getShop(
        store.getters["auth/userToken"]
      );
      shopList.value = responses.map((res) => convertShopRequest(res));
    };

    const indicateConfirmEdit = () => {
      isConfirmEdit.value = true;
    };

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
    const cancelEdit = () => {
      isConfirmEdit.value = false;
    };
    const indicateConfirmDelete = () => {
      isConfirmDelete.value = true;
    };
    const handleDelete = async () => {
      await deleteShop(store.getters["auth/userToken"], shop);
      // 再取得の処理
      const responses: ShopResponse[] = await getShop(
        store.getters["auth/userToken"]
      );
      shopList.value = responses.map((res) => convertShopRequest(res));
      isConfirmDelete.value = false;
      isOpen.value = false;
    };
    const cancelDelete = () => {
      isConfirmDelete.value = false;
    };

    return {
      shopList,
      shop,
      displayShop,
      formRef,
      isEdit,
      isConfirmBrowsing,
      isConfirmEdit,
      isConfirmDelete,
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
  display: inline-block;
}
.switch-area {
  text-align: right;
}
.rating {
  margin-bottom: 10vh;
}
.score-rating {
  display: block;
}
.v-card {
  padding: 14px !important;
  background-color: #efebe9;
}
.radio-group >>> .v-input--radio-group__input {
  justify-content: center;
}
</style>