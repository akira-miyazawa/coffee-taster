<template>
  <rader-chart :chart-data="chartData()" :options="{ scale, legend }" />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  watch,
} from "@nuxtjs/composition-api";
import { CoffeeTasteScore } from "@/types/coffeeTasteScore";

export default defineComponent({
  props: {
    coffeeTasteScore: {
      type: Object as PropType<CoffeeTasteScore>,
      require: true,
    },
  },
  setup(props) {
    watch(
      () => props,
      () => chartData
    );
    const chartData = () => {
      return {
        labels: ["苦味", "酸味", "甘み", "コク", "香り"],
        datasets: [
          {
            data: [
              props.coffeeTasteScore?.bitterness,
              props.coffeeTasteScore?.sourness,
              props.coffeeTasteScore?.sweetness,
              props.coffeeTasteScore?.scent,
              props.coffeeTasteScore?.richness,
            ],
            fill: true,
            borderWidth: 2,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
          },
        ],
      };
    };
    const scale = reactive<any>({
      ticks: {
        suggestedMin: 0,
        suggestedMax: 5,
        stepSize: 1,
        display: false,
      },
      gridLines: {
        color: "#fff",
        borderDash: [2],
      },
    });
    const legend = reactive<any>({
      display: false,
    });
    return {
      chartData,
      scale,
      legend,
    };
  },
});
</script>

<style scoped>
</style>