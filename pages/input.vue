<template>
  <div>
    <v-form ref="formRef" v-model="valid" lazy-validation>
      <TextComponent
        class="input"
        :text.sync="form.shopName"
        :rules="[rules.required, rules.textCounter]"
        label="ショップ名"
        :isReadonly="false"
        hint="必須"
      />
      <TextComponent
        class="input"
        :text.sync="form.coffeeName"
        :rules="[rules.required, rules.textCounter]"
        label="ドリンク名"
        :isReadonly="false"
        hint="必須"
      />
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
      <RadarChertComponent :coffeeTasteScore="form.coffeeTasteScore" />
      <RatingComponent
        itemName="苦味"
        :tasteScore.sync="form.coffeeTasteScore.bitterness"
        backgroundColor="brown lighten-2"
        color="brown"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="酸味"
        :tasteScore.sync="form.coffeeTasteScore.sourness"
        backgroundColor="brown lighten-2"
        color="brown"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="甘み"
        :tasteScore.sync="form.coffeeTasteScore.sweetness"
        backgroundColor="brown lighten-2"
        color="brown"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="コク"
        :tasteScore.sync="form.coffeeTasteScore.richness"
        backgroundColor="brown lighten-2"
        color="brown"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="香り"
        :tasteScore.sync="form.coffeeTasteScore.scent"
        backgroundColor="brown lighten-2"
        color="brown"
        :isLarge="false"
        :isReadonly="false"
      />
      <SelectComponent
        class="input"
        :selectValue.sync="form.roast"
        :items="roastList"
        label="焙煎"
        :isReadonly="false"
        itemText="name"
        itemValue="id"
      />
      <TextComponent
        class="input"
        :text.sync="form.origin"
        label="産地"
        :isReadonly="false"
        hint=""
      />
      <TextareaComponent
        class="input"
        :text.sync="form.comment"
        :rules="[rules.required, rules.textareaCounter]"
        :maxlength="500"
        label="コメント"
        :isReadonly="false"
        hint="必須"
      />
      <RatingComponent
        class="rating"
        itemName="あなたの評価"
        :tasteScore.sync="form.score"
        backgroundColor="grey darken-1"
        color="yellow darken-3"
        :isLarge="true"
        :isReadonly="false"
      />
      <v-btn class="btn" fixed fab bottom right @click="postForm" color="brown">
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
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
import RatingComponent from "@/components/atoms/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/atoms/chart/RadarChertComponent.vue";
import SelectComponent from "@/components/atoms/select/SelectComponent.vue";
import TextareaComponent from "@/components/atoms/text/TextareaComponent.vue";
import { Form, RoastType } from "@/types/input";
import { postShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    TextComponent,
    RadioButtonComponent,
    RatingComponent,
    RadarChertComponent,
    SelectComponent,
    TextareaComponent,
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
  display: block;
  margin-bottom: 10vh;
}
</style>