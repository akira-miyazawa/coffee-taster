<template>
  <div>
    <v-form ref="formRef" v-model="valid" lazy-validation>
      <text-component
        class="input"
        :text.sync="form.shopName"
        :rules="[rules.required, rules.textCounter]"
        label="ショップ名"
        :isReadonly="false"
        hint="必須"
      />
      <text-component
        class="input"
        :text.sync="form.coffeeName"
        :rules="[rules.required, rules.textCounter]"
        label="ドリンク名"
        :isReadonly="false"
        hint="必須"
      />
      <v-radio-group class="radio-group" v-model="form.drinkStatus" row>
        <radio-button-component
          value="HOT"
          label="HOT"
          :isDisabled="false"
          color="red"
        />
        <radio-button-component
          value="ICE"
          label="ICE"
          :isDisabled="false"
          color="indigo"
        />
      </v-radio-group>
      <radar-chert-component :coffeeTasteScore="form.coffeeTasteScore" />
      <RatingComponent
        itemName="苦味"
        :tasteScore.sync="form.coffeeTasteScore.bitterness"
        backgroundColor="cyan lighten-2"
        color="blue"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="酸味"
        :tasteScore.sync="form.coffeeTasteScore.sourness"
        backgroundColor="cyan lighten-2"
        color="blue"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="甘み"
        :tasteScore.sync="form.coffeeTasteScore.sweetness"
        backgroundColor="cyan lighten-2"
        color="blue"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="コク"
        :tasteScore.sync="form.coffeeTasteScore.richness"
        backgroundColor="cyan lighten-2"
        color="blue"
        :isLarge="false"
        :isReadonly="false"
      />
      <RatingComponent
        itemName="香り"
        :tasteScore.sync="form.coffeeTasteScore.scent"
        backgroundColor="cyan lighten-2"
        color="blue"
        :isLarge="false"
        :isReadonly="false"
      />
      <select-component
        class="input"
        :selectValue.sync="form.roast"
        :items="roastList"
        label="焙煎"
        :isReadonly="false"
        itemText="name"
        itemValue="id"
      />
      <text-component
        class="input"
        :text.sync="form.origin"
        label="産地"
        :isReadonly="false"
        hint=""
      />
      <textarea-component
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
      <v-row align="center">
        <v-col>
          <div class="btn">
            <v-btn x-large color="primary" @click="postForm"> 記録する </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
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
import { DrinkStatus, Form, RoastType } from "@/types/input";
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
    const store: any = useStore();
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

    const roastList = [
      { id: "LIGHT", name: "浅煎り" },
      { id: "MEDIUM", name: "中煎り" },
      { id: "DEEP", name: "深煎り" },
      { id: "NONE", name: "不明" },
    ];

    const valid = ref<Boolean>(false);

    const rules = reactive<any>({
      required: (value: string) => !!value || "必須",
      textCounter: (value: string) =>
        value.length <= 50 || "上限50文字を超えています",
      textareaCounter: (value: string) =>
        value.length <= 500 || "上限500文字を超えています",
    });

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        form.roast = "NONE";
      }
      form.roast = value;
    };

    const postForm = async () => {
      if (formRef.value.validate()) {
        // await postShop(store.getters["auth/userToken"], form);
        // router.push("list");
        alert("バリデーションOK！！");
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
  text-align: center;
}
.radio-group >>> .v-input--radio-group__input {
  justify-content: center;
}
.rating {
  display: block;
  margin-bottom: 5vh;
}
</style>