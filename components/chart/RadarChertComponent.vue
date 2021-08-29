<template>
  <v-app>
    <v-row class="ma-auto">
      <v-col md="6">
        <div class="rader">
          <rader-chart :chart-data="chartData()" :options="{ scale, legend }" />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import { CoffeeTaste } from "@/types/CoffeeTaste";

export default defineComponent({
  props: {
    coffeeTaste: {
      type: Object as PropType<CoffeeTaste>,
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
              props.coffeeTaste?.bitterness,
              props.coffeeTaste?.sourness,
              props.coffeeTaste?.sweetness,
              props.coffeeTaste?.scent,
              props.coffeeTaste?.richness,
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
      legend: {
        display: false,
      },
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
.rader {
  width: 400px;
  max-height: 300px;
}
</style>