<template>
  <v-layout :column="isColumn">
    <v-flex align-self-center text-right>
      {{ itemName }}
    </v-flex>
    <v-flex align-self-center text-center>
      <RatingComponent
        :score.sync="score"
        :length="length"
        :isReadonly="isReadonly"
        :isLarge="isLarge"
        :color="color"
        :backgroundColor="backgroundColor"
        :handleScore="handleScore"
        :halfIncrements="halfIncrements"
      />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import RatingComponent from "@/components/atoms/rating/RatingComponent.vue";

export default defineComponent({
  components: { RatingComponent },
  props: {
    isColumn: {
      type: Boolean,
      default: false,
    },
    itemName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      default: 5,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    backgroundColor: {
      type: String,
      default: undefined,
    },
    halfIncrements: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const handleScore = (score: number) => {
      context.emit("update:score", score);
    };
    return {
      handleScore,
    };
  },
});
</script>