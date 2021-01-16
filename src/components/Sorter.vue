<template>
  <div>
    <select id="algos" v-model="algo">
      <option>Bubble Sort</option>
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
    };
  },
  computed: {
    array() {
      return store.state.array;
    },

    speed() {
      return store.getters.speed;
    },
    isRunning() {
      return store.getters.isRunning;
    },
    palette() {
      return store.state.palette;
    },
  },

  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    sort(algo) {
      store.commit("isRunning", true);
      if (algo == "Bubble Sort") {
        this.bubbleSort();
      }
      if (algo == "Quick Sort") {
        this.quickSort();
      }
    },
    async bubbleSort() {
      store.commit("reset_calls");
      let a = this.array;
      let sorted = false;

      while (!sorted) {
        sorted = true;
        for (let i = 0; i < a.length - 1; i++) {
          store.commit("increment_calls");

          // compare
          store.commit("update_colors", {
            pos: i,
            color: this.palette["compare"],
          });
          store.commit("update_colors", {
            pos: i + 1,
            color: this.palette["compare"],
          });
          await this.sleep(this.speed);

          if (a[i] > a[i + 1]) {
            store.commit("update_colors", {
              pos: i,
              color: this.palette["selected"],
            });
            await this.sleep(this.speed);

            // swap
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
            store.commit("update_colors", {
              pos: i + 1,
              color: this.palette["selected"],
            });
            store.commit("update_colors", {
              pos: i,
              color: this.palette["compare"],
            });
            await this.sleep(this.speed);
            sorted = false;
          }
          store.commit("update_colors", {
            pos: i,
            color: this.palette["background"],
          });
        }
        // reset colors after a full array path
        store.commit("reset_colors");
      }
      store.commit("isRunning", false);
    },

    quickSort() {
      console.log("quicksort");
    },
  },
};
</script>