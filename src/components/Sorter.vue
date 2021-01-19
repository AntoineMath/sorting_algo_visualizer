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
    };
  },
  computed: {
    bars() {
      return store.state.bars;
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
      let bars = this.bars;
      if (algo == "Bubble Sort") {
        this.bubbleSort(bars);
      }
      if (algo == "Merge Sort") {
        store.commit("set_bars", this.mergeSort(bars));
      }
    },
    async bubbleSort(bars) {
      store.commit("reset_calls");
      let sorted = false;

      while (!sorted) {
        sorted = true;
        for (let i = 0; i < bars.length - 1; i++) {
          store.commit("increment_calls");

          // compare
          store.commit("set_color", {
            i: i,
            color: this.palette["compare"],
          });
          store.commit("set_color", {
            i: i + 1,
            color: this.palette["compare"],
          });
          await this.sleep(this.speed);

          if (bars[i].value > bars[i + 1].value) {
            store.commit("set_color", {
              i: i,
              color: this.palette["selected"],
            });
            await this.sleep(this.speed);

            // swap
            [bars[i].value, bars[i + 1].value] = [
              bars[i + 1].value,
              bars[i].value,
            ];
            store.commit("set_color", {
              i: i + 1,
              color: this.palette["selected"],
            });
            store.commit("set_color", {
              i: i,
              color: this.palette["compare"],
            });
            await this.sleep(this.speed);
            sorted = false;
          }
          store.commit("set_color", {
            i: i,
            color: this.palette["background"],
          });
        }
        // reset color after a full array path
        store.commit("reset_colors");
      }
      store.commit("isRunning", false);
    },

    //mergeSort(bars) {
    //  let arr = [...bars];
    //  if (arr.length == 1) {
    //    return arr;
    //  }
    //  let array_one = arr.slice(0, Math.floor(arr.length / 2));
    //  let array_two = arr.slice(array_one.length);

    //  array_one = this.mergeSort(array_one);
    //  array_two = this.mergeSort(array_two);

    //  return this.merge(array_one, array_two);
    //},
    //merge(array_a, array_b) {
    //  let array_c = [];

    //  while (array_a.length && array_b.length) {
    //    if (array_a[0].value > array_b[0].value) {
    //      array_c.push(array_b[0]);
    //      array_b.shift();
    //    } else {
    //      array_c.push(array_a[0]);
    //      array_a.shift();
    //    }
    //  }
    //  while (array_a.length) {
    //    array_c.push(array_a[0]);
    //    array_a.shift();
    //  }
    //  while (array_b.length) {
    //    array_c.push(array_b[0]);
    //    array_b.shift();
    //  }
    //  return array_c;
    //},
  },
};
</script>