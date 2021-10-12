<template>
  <v-radio
    :value="value"
    :label="label"
    :disabled="isDisabled"
    :color="color"
  ></v-radio>
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
    color: {
      type: String,
      require: true,
    },
  },
});
</script>
