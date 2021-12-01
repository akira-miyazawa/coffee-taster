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
    color="brown"
    item-color="brown"
  />
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    selectValue: {
      type: String,
      required: true,
    },
    items: {
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
    itemText: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
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
