<template>
  <v-text-field
    v-model="text"
    :label="label"
    :readonly="isReadonly"
    hide-details="auto"
  />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    text: {
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
  },
  setup(props, context) {},
});
</script>
