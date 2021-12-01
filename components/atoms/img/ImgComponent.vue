<template>
  <v-img :src="src" :max-height="maxHeight" :max-width="maxWidth"></v-img>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    maxHeight: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: String,
      required: true,
    },
  },
});
</script>
