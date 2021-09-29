<template>
  <div>
    <v-text-field
      v-model="form.shopName"
      class="input"
      label="ショップ名"
      hide-details="auto"
    />
    <v-text-field
      v-model="form.drinkName"
      class="input"
      label="ドリンク名"
      hide-details="auto"
    />
    <v-btn-toggle class="btn-toggle" v-model="form.drinkStatus" group>
      <v-btn class="hot-btn" value="HOT">HOT</v-btn>
      <v-btn class="ice-btn" value="ICE">ICE</v-btn>
    </v-btn-toggle>
    <radar-chert-component :coffeeTasteScore="form.coffeeTasteScore" />
    <RatingComponent
      itemName="苦味"
      :tasteScore="form.coffeeTasteScore.bitterness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreBitterness"
    />
    <RatingComponent
      itemName="酸味"
      :tasteScore="form.coffeeTasteScore.sourness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreSourness"
    />
    <RatingComponent
      itemName="甘み"
      :tasteScore="form.coffeeTasteScore.sweetness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreSweetness"
    />
    <RatingComponent
      itemName="コク"
      :tasteScore="form.coffeeTasteScore.richness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreRichness"
    />
    <RatingComponent
      itemName="香り"
      :tasteScore="form.coffeeTasteScore.scent"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreScent"
    />
    <v-btn-toggle
      v-model="form.roast"
      class="btn-toggle"
      @change="changeRoast"
      tile
      color="blue"
      group
    >
      <v-btn value="LIGHT">浅煎り</v-btn>
      <v-btn value="MEDIUM">中煎り</v-btn>
      <v-btn value="DEEP">深煎り</v-btn>
    </v-btn-toggle>
    <v-text-field
      v-model="form.origin"
      class="input"
      label="産地"
      hide-details="auto"
    />
    <v-textarea
      v-model="form.comment"
      class="input"
      label="コメント"
      auto-grow
      outlined
      rows="5"
      row-height="15"
    />
    <RatingComponent
      class="rating"
      itemName="あなたの評価"
      :tasteScore="form.score"
      backgroundColor="grey darken-1"
      color="yellow darken-3"
      :isLarge="true"
      @event="score"
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
import { defineComponent, reactive, useStore } from "@nuxtjs/composition-api";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import { Form, RoastType } from "@/types/input";
import { postShop } from "@/usecase/ShopService";

export default defineComponent({
  components: {
    RatingComponent,
    RadarChertComponent,
  },
  setup(props, context) {
    const store: any = useStore();

    const form = reactive<Form>({
      shopName: "",
      drinkName: "",
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

    const scoreBitterness = (score: number) =>
      (form.coffeeTasteScore.bitterness = score);
    const scoreSourness = (score: number) =>
      (form.coffeeTasteScore.sourness = score);
    const scoreSweetness = (score: number) =>
      (form.coffeeTasteScore.sweetness = score);
    const scoreScent = (score: number) => (form.coffeeTasteScore.scent = score);
    const scoreRichness = (score: number) =>
      (form.coffeeTasteScore.richness = score);

    const changeRoast = (value: RoastType) => {
      if (value == null) {
        form.roast = "NONE";
      }
      form.roast = value;
    };

    const score = (score: number) => (form.score = score);

    const postForm = async () =>
      await postShop(store.getters["auth/userToken"], form);

    return {
      form,
      scoreBitterness,
      scoreSourness,
      scoreSweetness,
      scoreScent,
      scoreRichness,
      changeRoast,
      score,
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