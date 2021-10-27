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
import { CoffeeTasteScoreType } from "@/types/input";

export default defineComponent({
  props: {
    coffeeTasteScore: {
      type: Object as PropType<CoffeeTasteScoreType>,
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
              props.coffeeTasteScore?.richness,
              props.coffeeTasteScore?.scent,
            ],
            fill: true,
            borderWidth: 2,
            backgroundColor: "rgba(141, 110, 99, 0.2)",
            borderColor: "#6D4C41",
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
        color: "#BCAAA4",
        borderDash: [2],
      },
      pointLabels: {
        fontSize: 14,
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