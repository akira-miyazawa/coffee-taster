<template>
  <v-layout>
    <v-flex align-self-center text-center>
      {{ itemName }}
    </v-flex>
    <v-flex align-self-center text-center>
      <v-rating
        :background-color="backgroundColor"
        :color="color"
        length="5"
        :value="tasteScore"
        :large="isLarge"
        @input="handleScore"
      />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    itemName: {
      type: String,
      require: true,
    },
    tasteScore: {
      type: Number,
      require: true,
    },
    backgroundColor: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    isLarge: {
      type: Boolean,
      require: true,
    },
  },
  setup(props, context) {
    const handleScore = (score: number) => {
      context.emit("event", score);
    };
    return {
      handleScore,
    };
  },
});
</script>