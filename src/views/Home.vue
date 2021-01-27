<template>
  <div class="home">
    <div class="container">
      <Sorter id="sorter" />
      <ArraySizeSlider id="sorter" />
      <SpeedSlider id="sorted" />
    </div>
    <Chart />
  </div>
</template>

<script>
// @ is an alias to /src
import ArraySizeSlider from "@/components/ArraySizeSlider.vue";
import SpeedSlider from "@/components/SpeedSlider.vue";
import Sorter from "@/components/Sorter.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "Home",
  components: {
    ArraySizeSlider,
    SpeedSlider,
    Sorter,
    Chart,
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
