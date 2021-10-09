<template>
  <v-textarea
    :value="text"
    :label="label"
    :rules="rules"
    :readonly="isReadonly"
    :hint="hint"
    :maxlength="maxlength"
    counter
    persistent-hint
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
    hint: {
      type: String,
      require: true,
    },
    maxlength: {
      type: Number,
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