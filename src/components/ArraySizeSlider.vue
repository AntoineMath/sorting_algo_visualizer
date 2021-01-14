<template>
  <div>
    <label>Array Size</label>
    <input
      :disabled="isRunning"
      type="range"
      min="10"
      max="100"
      v-model="rangeSlider"
    />
    <span>{{ array_size }}</span>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "array_size_slider",
  store: store,
  data() {
    return {
      rangeSlider: this.array_size,
    };
  },
  computed: {
    update_array(event) {
      return store.commit("create_random_array", event.target.value);
    },

    array_size() {
      return store.getters.array_size;
    },
    isRunning() {
      return store.getters.isRunning;
    },
  },
  watch: {
    rangeSlider(range) {
      return store.commit("create_random_array", range);
    },
  },
};
</script>