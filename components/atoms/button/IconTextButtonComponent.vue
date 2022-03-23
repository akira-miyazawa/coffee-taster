<template>
  <v-btn
    :color="color"
    :rounded="isRounded"
    :text="isText"
    :large="isLarge"
    @click="handleClick"
  >
    <v-icon :color="iconColor" left> {{ icon }} </v-icon>
    <div :style="{ color: textColor }">{{ btnText }}</div>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isText: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    handleClick: {
      type: Function as (() => void) | (() => Promise<void>),
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      required: true,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
