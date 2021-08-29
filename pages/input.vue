<template>
  <div>
    <v-autocomplete class="input" label="ショップ名" hide-details="auto" />
    <v-text-field class="input" label="ドリンク名" hide-details="auto" />
    <radar-chert-component :coffeeTasteScore="coffeeTasteScore" />
    <RatingComponent
      itemName="苦味"
      :tasteScore="coffeeTasteScore.bitterness"
      @event="scoreBitterness"
    />
    <RatingComponent
      itemName="酸味"
      :tasteScore="coffeeTasteScore.sourness"
      @event="scoreSourness"
    />
    <RatingComponent
      itemName="甘み"
      :tasteScore="coffeeTasteScore.sweetness"
      @event="scoreSweetness"
    />
    <RatingComponent
      itemName="コク"
      :tasteScore="coffeeTasteScore.richness"
      @event="scoreRichness"
    />
    <RatingComponent
      itemName="香り"
      :tasteScore="coffeeTasteScore.scent"
      @event="scoreScent"
    />
    <v-text-field class="input" label="フード名" hide-details="auto" />
    <v-textarea
      class="input"
      label="コメント"
      auto-grow
      outlined
      rows="5"
      row-height="15"
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
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import { CoffeeTasteScore } from "@/types/coffeeTasteScore";

export default defineComponent({
  components: {
    RatingComponent,
    RadarChertComponent,
  },
  setup(props, context) {
    const coffeeTasteScore = reactive<CoffeeTasteScore>({
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

    return {
      coffeeTasteScore,
      scoreBitterness,
      scoreSourness,
      scoreSweetness,
      scoreScent,
      scoreRichness,
    };
  },
});
</script>

<style scoped>
.input {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.btn {
  text-align: center;
}
</style>