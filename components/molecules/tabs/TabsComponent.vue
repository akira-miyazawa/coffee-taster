<template>
  <v-tabs
    :value="selectedValue"
    :fixed-tabs="isFixedTabs"
    :vertical="isVertical"
    :color="color"
    @input="handleSelectedValue"
    :height="height"
  >
    <v-tab
      v-for="(tabValue, index) in tabValues"
      :key="`${tabValue.href}-${index}`"
      :href="tabValue.href"
      @click.prevent="tabValue.clickFunction()"
      :style="handleStyle(isTabLeft)"
    >
      <v-icon :left="isTabLeft">{{ tabValue.iconText }}</v-icon>
      {{ tabValue.text }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export type Tabs = {
  href: string;
  clickFunction: () => void;
  iconText: string;
  text?: string;
};

export default defineComponent({
  props: {
    selectedValue: {
      type: String,
      default: "",
    },
    isFixedTabs: {
      type: Boolean,
      default: false,
    },
    isVertical: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      require: true,
    },
    height: {
      type: Number,
    },
    tabValues: {
      type: Array as PropType<Tabs[]>,
      required: true,
    },
    isTabLeft: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const handleSelectedValue = (value: string) => {
      context.emit("update:selectedValue", value);
    };
    const handleStyle = (isLeft: boolean) => {
      if (isLeft) {
        return {
          "justify-content": "left",
        };
      }
    };
    return {
      handleSelectedValue,
      handleStyle,
    };
  },
});
</script>

<style lang="postcss" scoped>
.v-tab {
  min-width: 40px;
}
</style>