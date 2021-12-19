<template>
  <div>
    <v-form ref="formRef" v-model="valid" lazy-validation>
      <div class="input">
        <TextComponent
          :text.sync="form.shopName"
          :rules="[rules.required, rules.textCounter]"
          label="ショップ名"
          :isReadonly="false"
          hint="必須"
        />
      </div>
      <div class="input">
        <TextComponent
          :text.sync="form.coffeeName"
          :rules="[rules.required, rules.textCounter]"
          label="ドリンク名"
          :isReadonly="false"
          hint="必須"
        />
      </div>
      <v-radio-group class="radio-group" v-model="form.drinkStatus" row>
        <RadioButtonComponent
          value="HOT"
          label="HOT"
          :isReadonly="false"
          color="red"
        />
        <RadioButtonComponent
          value="ICE"
          label="ICE"
          :isReadonly="false"
          color="indigo"
        />
      </v-radio-group>
      <RadarChertComponent
        :labels="['苦味', '酸味', '甘み', 'コク', '香り']"
        :coffeeTasteScore="form.coffeeTasteScore"
        backgroundColor="rgba(141, 110, 99, 0.2)"
        borderColor="#6D4C41"
        gridLineColor="#BCAAA4"
      />
      <OperateRatingComponent
        itemName="苦味"
        :score.sync="form.coffeeTasteScore.bitterness"
        backgroundColor="brown lighten-2"
        color="brown"
      />
      <OperateRatingComponent
        itemName="酸味"
        :score.sync="form.coffeeTasteScore.sourness"
        backgroundColor="brown lighten-2"
        color="brown"
      />
      <OperateRatingComponent
        itemName="甘み"
        :score.sync="form.coffeeTasteScore.sweetness"
        backgroundColor="brown lighten-2"
        color="brown"
      />
      <OperateRatingComponent
        itemName="コク"
        :score.sync="form.coffeeTasteScore.richness"
        backgroundColor="brown lighten-2"
        color="brown"
      />
      <OperateRatingComponent
        itemName="香り"
        :score.sync="form.coffeeTasteScore.scent"
        backgroundColor="brown lighten-2"
        color="brown"
      />
      <div class="input">
        <SelectComponent
          :selectValue.sync="form.roast"
          :items="roastList"
          label="焙煎"
          :isReadonly="false"
          itemText="name"
          itemValue="id"
        />
      </div>
      <div class="input">
        <TextComponent
          :text.sync="form.origin"
          label="産地"
          :isReadonly="false"
          hint=""
        />
      </div>
      <div class="input">
        <TextareaComponent
          :text.sync="form.comment"
          :rules="[rules.required, rules.textareaCounter]"
          :maxlength="500"
          label="コメント"
          :isReadonly="false"
          hint="必須"
        />
      </div>
      <div class="rating">
        <OperateRatingComponent
          :isColumn="true"
          itemName="あなたの評価"
          :score.sync="form.score"
          backgroundColor="grey darken-1"
          color="yellow darken-3"
          :isLarge="true"
        />
      </div>
      <RoundButtonComponent
        class="btn"
        :isFixed="true"
        :isFab="true"
        :isBottom="true"
        :isRight="true"
        color="brown"
        :handleClick="postForm"
        icon="mdi-plus"
        iconColor="white"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import TextComponent from "@/components/atoms/text/TextComponent.vue";
import RadioButtonComponent from "@/components/atoms/button/RadioButtonComponent.vue";
import OperateRatingComponent from "@/components/molecules/rating/OperateRatingComponent.vue";
import RadarChertComponent from "@/components/atoms/chart/RadarChertComponent.vue";
import SelectComponent from "@/components/atoms/select/SelectComponent.vue";
import TextareaComponent from "@/components/atoms/text/TextareaComponent.vue";
import RoundButtonComponent from "@/components/atoms/button/RoundButtonComponent.vue";
import { Form, RoastType } from "@/types/input";
import { postShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    TextComponent,
    RadioButtonComponent,
    OperateRatingComponent,
    RadarChertComponent,
    SelectComponent,
    TextareaComponent,
    RoundButtonComponent,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const formRef = ref<any>(null);

    const form = reactive<Form>({
      shopName: "",
      coffeeName: "",
      drinkStatus: "HOT",
      coffeeTasteScore: {
        bitterness: 3,
        sourness: 3,
        sweetness: 3,
        scent: 3,
        richness: 3,
      },
      roast: "NONE",
      origin: "",
      comment: "",
      score: 3,
    });

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

    onMounted(() => {
      form.shopName = store.getters["shop/shopName"];
    });

    onBeforeUnmount(() => {
      store.commit("shop/setShop", "");
    });

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        form.roast = "NONE";
      }
      form.roast = value;
    };

    const postForm = async () => {
      if (formRef.value.validate()) {
        await postShop(store.getters["auth/userToken"], form);
        router.push("list");
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    return {
      formRef,
      form,
      roastList,
      valid,
      rules,
      changeRoast,
      postForm,
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
  margin-bottom: 70px;
}
.radio-group >>> .v-input--radio-group__input {
  justify-content: center;
}
.rating {
  margin-bottom: 10vh;
}
</style>