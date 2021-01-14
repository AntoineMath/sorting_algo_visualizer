<template>
  <div>
    <select id="algos" v-model="algo">
      <option>Bubble Sort</option>
      <option>Quick Sort</option>
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
      //console.log(store.getters.isRunning);
      return store.getters.isRunning;
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
          if (i > 0) {
            store.commit("update_colors", { pos: i - 1, color: "pink" });
          }
          store.commit("update_colors", { pos: i, color: "red" });
          store.commit("update_colors", { pos: i + 1, color: "red" });
          if (a[i] > a[i + 1]) {
            await this.sleep(this.speed);
            store.commit("update_colors", { pos: i, color: "green" });
            await this.sleep(this.speed);
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
            store.commit("update_colors", { pos: i + 1, color: "green" });
            store.commit("update_colors", { pos: i, color: "red" });
            await this.sleep(this.speed);
            store.commit("update_array", a);
            //console.log(a);
            sorted = false;
          }
        }
      }
      store.commit("isRunning", false);
    },
    quickSort() {
      console.log("quicksort");
    },
  },
};
</script>