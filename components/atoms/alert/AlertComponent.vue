<template>
  <v-alert
    :type="type"
    :dense="isDence"
    :dismissible="isDismissible"
    :color="color"
  >
    {{ text }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

type AlertType = "success" | "info" | "warning" | "error";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<AlertType>,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isDence: {
      type: Boolean,
      default: true,
    },
    isDismissible: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
  },
});
</script>