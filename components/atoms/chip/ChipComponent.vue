<template>
  <v-chip :color="color" :text-color="textColor">
    {{ chipText }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    color: {
      type: String,
      default: undefined,
    },
    textColor: {
      type: String,
      default: undefined,
    },
    chipText: {
      type: String,
      require: true,
    },
  },
});
</script>
