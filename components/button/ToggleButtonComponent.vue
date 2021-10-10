<template>
  <v-btn :value="value" :aria-readonly="isDisabled">{{ label }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    isDisabled: {
      type: Boolean,
      require: true,
    },
  },
});
</script>
