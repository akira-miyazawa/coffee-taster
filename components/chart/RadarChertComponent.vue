<template>
  <v-app>
    <v-row class="ma-auto">
      <v-col md="6">
        <div class="rader">
          <rader-chart
            :chart-data="chartData"
            :options="{ scale, legend }"
          ></rader-chart>
          <div>
            <v-row>
              <v-col md="6" v-for="(n, idx) in 5" :key="n">
                <v-subheader class="pl-0">{{
                  sliderHeaderTexts[idx]
                }}</v-subheader>
                <v-slider
                  v-model="data[idx]"
                  thumb-label="always"
                  step="1"
                  :max="5"
                  :min="1"
                ></v-slider>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        labels: ["苦味", "酸味", "甘み", "コク", "香り"],
        datasets: [
          {
            data: [1, 1, 1, 1, 1],
            fill: true,
            borderWidth: 2,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      data: [1, 1, 1, 1, 1],
      sliderHeaderTexts: ["苦味", "酸味", "甘み", "コク", "香り"],
      backgroundColor: "#fff",
      scale: {
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
      },
      legend: {
        display: false,
      },
    };
  },
  watch: {
    data() {
      this.updateChartData();
    },
  },

  methods: {
    updateChartData() {
      const newChartData = Object.assign({}, this.chartData);
      newChartData.datasets[0].data.forEach((value, idx) => {
        // 変更がある場合
        if (value !== this.data[idx])
          newChartData.datasets[0].data[idx] = this.data[idx];
      });

      this.chartData = newChartData;
    },
  },
};
</script>

<style scoped>
.rader {
  width: 400px;
  max-height: 300px;
}
</style>