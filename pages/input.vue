<template>
  <div>
    <text-component
      class="input"
      :text="form.shopName"
      label="ショップ名"
      :isReadonly="false"
      @event="handleShopName"
    />
    <text-component
      class="input"
      :text="form.coffeeName"
      label="ドリンク名"
      :isReadonly="false"
      @event="handleCoffeeName"
    />
    <v-btn-toggle class="btn-toggle" v-model="form.drinkStatus" group>
      <toggle-button-component value="HOT" label="HOT" :isDisabled="false" />
      <toggle-button-component value="ICE" label="ICE" :isDisabled="false" />
    </v-btn-toggle>
    <radar-chert-component :coffeeTasteScore="form.coffeeTasteScore" />
    <RatingComponent
      itemName="苦味"
      :tasteScore="form.coffeeTasteScore.bitterness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      :isReadonly="false"
      @event="handleBitterness"
    />
    <RatingComponent
      itemName="酸味"
      :tasteScore="form.coffeeTasteScore.sourness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      :isReadonly="false"
      @event="handleSourness"
    />
    <RatingComponent
      itemName="甘み"
      :tasteScore="form.coffeeTasteScore.sweetness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      :isReadonly="false"
      @event="handleSweetness"
    />
    <RatingComponent
      itemName="コク"
      :tasteScore="form.coffeeTasteScore.richness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      :isReadonly="false"
      @event="handleRichness"
    />
    <RatingComponent
      itemName="香り"
      :tasteScore="form.coffeeTasteScore.scent"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      :isReadonly="false"
      @event="handleScent"
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
      :text="form.origin"
      label="産地"
      :isReadonly="false"
      @event="handleOrigin"
    />
    <textarea-component
      class="input"
      :text="form.comment"
      label="コメント"
      :isReadonly="false"
      @event="handleComment"
    />
    <RatingComponent
      class="rating"
      itemName="あなたの評価"
      :tasteScore="form.score"
      backgroundColor="grey darken-1"
      color="yellow darken-3"
      :isLarge="true"
      :isReadonly="false"
      @event="handleScore"
    />
    <v-row align="center">
      <v-col>
        <div class="btn">
          <v-btn x-large color="primary" @click="postForm"> 記録する </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import TextComponent from "@/components/text/TextComponent.vue";
import ToggleButtonComponent from "@/components/button/ToggleButtonComponent.vue";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import TextareaComponent from "@/components/text/TextareaComponent.vue";
import { Form, RoastType } from "@/types/input";
import { postShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    TextComponent,
    ToggleButtonComponent,
    RatingComponent,
    RadarChertComponent,
    TextareaComponent,
  },
  setup(props, context) {
    const store: any = useStore();
    const router = useRouter();

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

    const handleShopName = (name: string) => (form.shopName = name);
    const handleCoffeeName = (name: string) => (form.coffeeName = name);
    const handleBitterness = (score: number) =>
      (form.coffeeTasteScore.bitterness = score);
    const handleSourness = (score: number) =>
      (form.coffeeTasteScore.sourness = score);
    const handleSweetness = (score: number) =>
      (form.coffeeTasteScore.sweetness = score);
    const handleScent = (score: number) =>
      (form.coffeeTasteScore.scent = score);
    const handleRichness = (score: number) =>
      (form.coffeeTasteScore.richness = score);
    const handleOrigin = (origin: string) => (form.origin = origin);
    const handleComment = (comment: string) => (form.comment = comment);
    const handleScore = (score: number) => (form.score = score);

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        form.roast = "NONE";
      }
      form.roast = value;
    };

    const postForm = async () => {
      await postShop(store.getters["auth/userToken"], form);
      router.push("list");
    };

    return {
      form,
      handleShopName,
      handleCoffeeName,
      handleBitterness,
      handleSourness,
      handleSweetness,
      handleScent,
      handleRichness,
      handleOrigin,
      handleComment,
      handleScore,
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