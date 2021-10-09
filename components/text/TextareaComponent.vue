<template>
  <v-textarea
    v-model="text"
    :label="label"
    :readonly="isReadonly"
    auto-grow
    outlined
    rows="5"
    row-height="15"
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
      context.emit("event", text);
    };
    return {
      handleText,
    };
  },
});
</script>