<template>
  <v-btn :color="color" :text="isText" @click="handleClick">
    {{ btnText }}
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isText: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    handleClick: {
      type: Function as (() => void) | (() => Promise<void>),
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
  },
});
</script>
