<template>
  <v-text-field
    :value="text"
    :roles="rules"
    :label="label"
    :readonly="isReadonly"
    hide-details="auto"
    @input="handleText"
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
    rules: {
      type: Array,
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
  setup(props, context) {
    const handleText = (text: string) => {
      context.emit("update:text", text);
    };
    return {
      handleText,
    };
  },
});
</script>
