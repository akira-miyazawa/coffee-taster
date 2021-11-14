<template>
  <v-layout>
    <v-flex align-self-center text-center>
      {{ itemName }}
    </v-flex>
    <v-flex align-self-center text-center>
      <RatingComponent
        :score="score"
        :length="length"
        :isReadonly="isReadonly"
        :isLarge="isLarge"
        :color="color"
        :backgroundColor="backgroundColor"
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
    itemName: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
    length: {
      type: Number,
      defalut: 5,
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
  },
});
</script>