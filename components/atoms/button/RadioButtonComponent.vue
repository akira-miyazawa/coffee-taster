<template>
  <v-radio
    :value="value"
    :label="label"
    :readonly="isReadonly"
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
    isReadonly: {
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
