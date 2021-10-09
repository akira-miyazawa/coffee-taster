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
      <v-btn-toggle
        class="btn-toggle"
        v-model="form.drinkStatus"
        :color="stateColor(form.drinkStatus)"
        group
      >
        <toggle-button-component value="HOT" label="HOT" :isDisabled="false" />
        <toggle-button-component value="ICE" label="ICE" :isDisabled="false" />
      </v-btn-toggle>
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
      <v-btn-toggle
        v-model="form.roast"
        class="btn-toggle"
        @change="changeRoast"
        tile
        color="blue"
        group
      >
        <toggle-button-component
          value="LIGHT"
          label="浅煎り"
          :isDisabled="false"
        />
        <toggle-button-component
          value="MEDIUM"
          label="中煎り"
          :isDisabled="false"
        />
        <toggle-button-component
          value="DEEP"
          label="深煎り"
          :isDisabled="false"
        />
      </v-btn-toggle>
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
import ToggleButtonComponent from "@/components/button/ToggleButtonComponent.vue";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import TextareaComponent from "@/components/text/TextareaComponent.vue";
import { DrinkStatus, Form, RoastType } from "@/types/input";
import { postShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    TextComponent,
    ToggleButtonComponent,
    RatingComponent,
    RadarChertComponent,
    TextareaComponent,
  },
  setup(props, { refs }) {
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

    const valid = ref<Boolean>(false);

    const rules = reactive<any>({
      required: (value: string) => !!value || "必須",
      textCounter: (value: string) =>
        value.length <= 50 || "上限50文字を超えています",
      textareaCounter: (value: string) =>
        value.length <= 500 || "上限500文字を超えています",
    });

    const stateColor = (drinkStatus: DrinkStatus) => {
      return drinkStatus === "HOT" ? "red" : "blue";
    };

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
      valid,
      rules,
      stateColor,
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
.btn-toggle {
  width: 100%;
  justify-content: center;
}
.rating {
  display: block;
  margin-bottom: 5vh;
}
</style>