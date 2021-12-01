<template>
  <v-text-field
    :value="text"
    :rules="rules"
    :label="label"
    :readonly="isReadonly"
    hide-details="auto"
    :hint="hint"
    persistent-hint
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
