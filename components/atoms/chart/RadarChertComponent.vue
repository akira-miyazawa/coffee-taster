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
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
    coffeeTasteScore: {
      type: Object as PropType<CoffeeTasteScoreType>,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    borderColor: {
      type: String,
      required: true,
    },
    gridLineColor: {
      type: String,
      requried: true,
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
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
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
        color: props.gridLineColor,
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