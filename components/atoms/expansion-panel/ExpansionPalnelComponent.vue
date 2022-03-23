<template>
  <v-expansion-panel>
    <v-expansion-panel-header :color="headerColor">
      {{ headerText }}
    </v-expansion-panel-header>
    <v-expansion-panel-content :color="contentColor">
      <div v-for="content in contentTexts" :key="content">
        {{ content }}
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    headerText: {
      type: String,
      required: true,
    },
    contentTexts: {
      type: Array as PropType<String[]>,
      required: true,
    },
    headerColor: {
      type: String,
      default: undefined,
    },
    contentColor: {
      type: String,
      default: undefined,
    },
  },
});
</script>