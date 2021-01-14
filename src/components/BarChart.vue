<template>
  <svg class="barchart" :width="window.width" :height="window.height">
    <g class="bars" fill="none">
      <rect
        v-for="(bar, index) in bars"
        v-bind:fill="colors[index]"
        id="index"
        :key="index"
        :height="bar.height"
        :width="bar.width"
        :x="bar.x"
        :y="bar.y"
      ></rect>
    </g>
  </svg>
  <p>Calls : {{ calls }}</p>
</template>

<script>
import { scaleLinear } from "d3-scale";
import store from "@/store";
export default {
  name: "BarChart",
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
    array() {
      return store.getters.array;
    },
    array_size() {
      return store.getters.array_size;
    },
    colors() {
      return store.getters.colors;
    },

    y() {
      let values = this.array;
      return scaleLinear()
        .range([this.window.height, 0])
        .domain([0, Math.max(...values)]);
    },
    bars() {
      let bar_width =
        this.window.width /
        (this.space * (this.array_size - 1) + this.array_size);
      let bars = this.array.map((d, i) => {
        return {
          x: i * bar_width * (1 + this.space),
          y: this.y(d),
          width: bar_width,
          height: this.window.height - this.y(d),
          //color: store.state.colors[i],
        };
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
    update_bar(id) {
      this.bar[id].height = this.window.height - this.y(this.array[id]);
      this.bar[id].color = this.colors[id];
    },
    handleResize() {
      this.window.width = window.innerWidth * 0.8;
      this.window.height = window.innerHeight * 0.5;
    },
  },
};
</script>
