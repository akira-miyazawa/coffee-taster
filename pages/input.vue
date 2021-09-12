<template>
  <div>
    <v-autocomplete class="input" label="ショップ名" hide-details="auto" />
    <v-text-field class="input" label="ドリンク名" hide-details="auto" />
    <v-btn-toggle class="btn-toggle" v-model="drinkStatus" group>
      <v-btn class="hot-btn" value="HOT">HOT</v-btn>
      <v-btn class="ice-btn" value="ICE">ICE</v-btn>
    </v-btn-toggle>
    <radar-chert-component :coffeeTasteScore="coffeeTasteScore" />
    <RatingComponent
      itemName="苦味"
      :tasteScore="coffeeTasteScore.bitterness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreBitterness"
    />
    <RatingComponent
      itemName="酸味"
      :tasteScore="coffeeTasteScore.sourness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreSourness"
    />
    <RatingComponent
      itemName="甘み"
      :tasteScore="coffeeTasteScore.sweetness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreSweetness"
    />
    <RatingComponent
      itemName="コク"
      :tasteScore="coffeeTasteScore.richness"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreRichness"
    />
    <RatingComponent
      itemName="香り"
      :tasteScore="coffeeTasteScore.scent"
      backgroundColor="cyan lighten-2"
      color="blue"
      :isLarge="false"
      @event="scoreScent"
    />
    <v-btn-toggle
      class="btn-toggle"
      @change="changeRoast"
      v-model="roast"
      tile
      color="blue"
      group
    >
      <v-btn value="LIGHT">浅煎り</v-btn>
      <v-btn value="MEDIUM">中煎り</v-btn>
      <v-btn value="DEEP">深煎り</v-btn>
    </v-btn-toggle>
    <v-text-field
      class="input"
      label="産地"
      v-model="origin"
      hide-details="auto"
    />
    <v-textarea
      v-model="comment"
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
      :tasteScore="score"
      backgroundColor="grey darken-1"
      color="yellow darken-3"
      :isLarge="true"
      @event="scoreBitterness"
    />
    <v-row align="center">
      <v-col>
        <div class="btn">
          <v-btn x-large color="primary"> 記録する </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@nuxtjs/composition-api";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import { CoffeeTasteScoreType } from "@/model/CoffeeTasteScore";
import { RoastType } from "@/model/Bean";
import { DrinkStatus } from "@/model/Drink";

export default defineComponent({
  components: {
    RatingComponent,
    RadarChertComponent,
  },
  setup(props, context) {
    // ドリンク HOT or ICE
    const drinkStatus = ref<DrinkStatus>("HOT");

    // テイスト
    const coffeeTasteScore = reactive<CoffeeTasteScoreType>({
      bitterness: 3,
      sourness: 3,
      sweetness: 3,
      scent: 3,
      richness: 3,
    });
    const scoreBitterness = (score: number) =>
      (coffeeTasteScore.bitterness = score);
    const scoreSourness = (score: number) =>
      (coffeeTasteScore.sourness = score);
    const scoreSweetness = (score: number) =>
      (coffeeTasteScore.sweetness = score);
    const scoreScent = (score: number) => (coffeeTasteScore.scent = score);
    const scoreRichness = (score: number) =>
      (coffeeTasteScore.richness = score);

    // 焙煎
    const roast = ref<RoastType>("NONE");
    const changeRoast = (value: RoastType) => {
      if (value == null) {
        roast.value = "NONE";
      }
      roast.value = value;
    };

    // 産地
    const origin = ref<String>("");

    //　コメント
    const comment = ref<String>("");

    // 評価
    const score = ref<number>(3);

    return {
      drinkStatus,
      coffeeTasteScore,
      scoreBitterness,
      scoreSourness,
      scoreSweetness,
      scoreScent,
      scoreRichness,
      roast,
      changeRoast,
      origin,
      comment,
      score,
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