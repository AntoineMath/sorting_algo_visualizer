<template>
  <svg class="chart" :width="window.width" :height="window.height">
    <g class="drawBars" v-for="bar in drawBars" :key="bar.index">
      <g class="bar.index" fill="none">
        <rect
          :fill="bar.color"
          :id="bar.index"
          :key="bar.index"
          :height="bar.height"
          :width="bar.width"
          :x="bar.x"
          :y="bar.y"
        ></rect>
      </g>
    </g>
  </svg>
  <p>Calls : {{ calls }}</p>
</template>

<script>
import { scaleLinear } from "d3-scale";
import store from "@/store";
export default {
  name: "Chart",
  store: store,
  data() {
    return {
      height: 200,
      width: 500,
      space: 0.3,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  computed: {
    bars() {
      return store.getters.bars;
    },
    y() {
      let values = this.bars.map((bar) => bar.value);
      return scaleLinear()
        .range([this.window.height, 0])
        .domain([0, Math.max(...values)]);
    },
    drawBars() {
      let bars = this.bars;
      let bar_width =
        this.window.width /
        (this.space * (this.bars.length - 1) + this.bars.length);

      bars.forEach((bar, i) => {
        this.$store.commit("set_x", {
          i: i,
          x_pos: i * bar_width * (1 + this.space),
        });
        this.$store.commit("set_y", { i: i, y_pos: this.y(bar.value) });
        this.$store.commit("set_height", {
          i: i,
          height: this.window.height - this.y(bar.value),
        });
        this.$store.commit("set_width", { i: i, width: bar_width });
      });
      return bars;
    },
    calls() {
      return store.getters.calls;
    },
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth * 0.8;
      this.window.height = window.innerHeight * 0.5;
    },
  },
};
</script>