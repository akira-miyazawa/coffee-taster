<template>
  <v-icon :left="isLeft" :right="isRight" :color="color" :size="size">
    {{ iconText }}
  </v-icon>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isLeft: {
      type: Boolean,
      default: false,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    size: {
      type: Number,
      default: undefined,
    },
    iconText: {
      type: String,
      requiure: true,
    },
  },
});
</script>
