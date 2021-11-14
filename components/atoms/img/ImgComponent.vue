<template>
  <v-img :src="src" :max-height="maxHeight" :max-width="maxWidth"></v-img>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    src: {
      type: String,
      require: true,
    },
    maxHeight: {
      type: String,
      require: true,
    },
    maxWidth: {
      type: String,
      require: true,
    },
  },
});
</script>
