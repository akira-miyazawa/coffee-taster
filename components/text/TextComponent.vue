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
