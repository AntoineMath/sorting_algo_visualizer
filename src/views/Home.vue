<template>
  <div class="home">
    <div class="container">
      <Sorter id="sorter" />
      <ArraySizeSlider id="sorter" />
      <SpeedSlider id="sorted" />
    </div>
    <BarChart />
  </div>
</template>

<script>
// @ is an alias to /src
import ArraySizeSlider from "@/components/ArraySizeSlider.vue";
import SpeedSlider from "@/components/SpeedSlider.vue";
import Sorter from "@/components/Sorter.vue";
import BarChart from "@/components/BarChart.vue";

export default {
  name: "Home",
  components: {
    ArraySizeSlider,
    SpeedSlider,
    Sorter,
    BarChart,
  },
};
</script>

<style lang="scss" scoped>
.chart {
  margin: 120px auto;
  display: block;
}

.container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
