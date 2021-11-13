<template>
  <v-btn
    :value="value"
    :fixed="isFixed"
    :fab="isFab"
    :bottom="isBottom"
    :right="isRight"
    :small="isSmall"
    :dark="isDark"
    :color="color"
    @click="handleClick"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: undefined,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
    isFab: {
      type: Boolean,
      default: false,
    },
    isBottom: {
      type: Boolean,
      default: false,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      defalut: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    handleClick: {
      type: Function,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
  },
});
</script>
