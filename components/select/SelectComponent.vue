<template>
  <v-select
    :value="selectValue"
    :items="items"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    :readonly="isReadonly"
    hide-details="auto"
    @change="handleValue"
  />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    selectValue: {
      type: String,
      require: true,
    },
    items: {
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
    itemText: {
      type: String,
      require: true,
    },
    itemValue: {
      type: String,
      require: true,
    },
  },
  setup(props, context) {
    const handleValue = (value: string) => {
      context.emit("update:selectValue", value);
    };
    return {
      handleValue,
    };
  },
});
</script>
