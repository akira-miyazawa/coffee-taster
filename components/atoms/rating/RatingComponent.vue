<template>
  <v-rating
    :value="score"
    :length="length"
    :readonly="isReadonly"
    :large="isLarge"
    :small="isSmall"
    :dense="isDense"
    :color="color"
    :background-color="backgroundColor"
    :half-increments="halfIncrements"
    @input="handleScore"
  />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
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
    isSmall: {
      type: Boolean,
      default: false,
    },
    isDense: {
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
    handleScore: {
      type: Function as unknown as () => (score: number) => void,
      required: true,
    },
  },
});
</script>