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
    outlined
    rows="6"
    row-height="15"
    @input="handleText"
    color="brown"
  />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
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
    hint: {
      type: String,
      required: true,
    },
    maxlength: {
      type: Number,
      required: true,
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