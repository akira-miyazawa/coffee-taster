<template>
  <div>
    <v-autocomplete label="ショップ名" hide-details="auto"> </v-autocomplete>
    <v-text-field label="ドリンク名" hide-details="auto"></v-text-field>
    <radar-chert-component :coffeeTaste="coffeeTaste" />
    <RatingComponent
      itemName="苦味"
      :tasteScore="coffeeTaste.bitterness"
      @event="scoreBitterness"
    />
    <RatingComponent
      itemName="酸味"
      :tasteScore="coffeeTaste.sourness"
      @event="scoreSourness"
    />
    <RatingComponent
      itemName="甘み"
      :tasteScore="coffeeTaste.sweetness"
      @event="scoreSweetness"
    />
    <RatingComponent
      itemName="香り"
      :tasteScore="coffeeTaste.scent"
      @event="scoreScent"
    />
    <RatingComponent
      itemName="コク"
      :tasteScore="coffeeTaste.richness"
      @event="scoreRichness"
    />
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
import { CoffeeTaste } from "@/types/CoffeeTaste";

export default defineComponent({
  components: {
    RatingComponent,
    RadarChertComponent,
  },
  setup(props, context) {
    const coffeeTaste = reactive<CoffeeTaste>({
      bitterness: 3,
      sourness: 3,
      sweetness: 3,
      scent: 3,
      richness: 3,
    });
    const scoreBitterness = (score: number) => (coffeeTaste.bitterness = score);
    const scoreSourness = (score: number) => (coffeeTaste.sourness = score);
    const scoreSweetness = (score: number) => (coffeeTaste.sweetness = score);
    const scoreScent = (score: number) => (coffeeTaste.scent = score);
    const scoreRichness = (score: number) => (coffeeTaste.richness = score);

    return {
      coffeeTaste,
      scoreBitterness,
      scoreSourness,
      scoreSweetness,
      scoreScent,
      scoreRichness,
    };
  },
});
</script>