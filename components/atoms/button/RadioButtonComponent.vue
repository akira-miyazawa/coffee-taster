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
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isReadonly: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
});
</script>
