<template>
  <div>
    <select id="algos" v-model="algo">
      <option>Bubble Sort</option>
      <!-- <option>Merge Sort</option> -->
    </select>
    <button :disabled="isRunning" @click="sort(algo)">Sort !</button>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "sorter",
  store: store,
  data() {
    return {
      algo: "Bubble Sort",
      isRunning: false,
    };
  },
  computed: {
    bars() {
      return store.state.bars;
    },
    speed() {
      return store.getters.speed;
    },
    palette() {
      return store.state.palette;
    },
    colors() {
      return store.getters.colors;
    },
  },

  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    sort(algo) {
      this.isRunning = true;
      if (algo == "Bubble Sort") {
        // store the sequences of animations
        var animations = this.bubbleSort();
      }
      // animate
      this.animate(animations);
    },

    bubbleSort() {
      let array = [...this.bars].map((bar) => bar.value);
      let animations = [];
      let sorted = false;

      while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length - 1; i++) {
          if (array[i] > array[i + 1]) {
            animations.push({
              type: "swap",
              pos: [i, i + 1],
            });

            // swap
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            sorted = false;
          } else {
            animations.push({ type: "compare", pos: [i, i + 1] });
          }
        }
      }
      return animations;
    },

    async animate(animations) {
      let bars = this.bars;
      store.commit("reset_calls");
      for (let i = 0; i < animations.length; i++) {
        let a = animations[i];
        let [pos1, pos2] = a.pos;
        store.commit("increment_calls");
        store.commit("reset_colors");

        if (a.type == "swap") {
          bars[pos1].color = this.colors["selected"];
          bars[pos2].color = this.colors["selected"];
          await this.sleep(this.speed);
          [bars[pos1], bars[pos2]] = [bars[pos2], bars[pos1]];
          bars[pos1].color = this.colors["compare"];
          bars[pos2].color = this.colors["compare"];
          store.commit("set_bars", bars);
          await this.sleep(this.speed);
        } else if (a.type == "compare") {
          bars[pos1].color = this.colors["compare"];
          bars[pos2].color = this.colors["compare"];
          await this.sleep(this.speed);
        }
      }
      store.commit("reset_colors");
      this.isRunning = false;
    },
  },
};
</script>