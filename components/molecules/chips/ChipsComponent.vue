<template>
  <div>
    <div v-for="chip in chips" :key="chip">
      <ChipComponent :chipText="chip" :color="color" :textColor="textColor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import ChipComponent from "@/components/atoms/chip/ChipComponent.vue";

export default defineComponent({
  components: { ChipComponent },
  props: {
    chips: {
      type: Array as PropType<string[]>,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
    textColor: {
      type: String,
      default: undefined,
    },
  },
});
</script>
