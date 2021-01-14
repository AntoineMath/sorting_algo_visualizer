<template>
  <div>
    <label>Speed</label>
    <input type="range" min="1" max="100" v-model="rangeSlider" />
    <span>{{ speed }}</span>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "speed_slider",
  store: store,
  data() {
    return {
      rangeSlider: this.speed,
    };
  },
  computed: {
    speed() {
      return store.state.speed;
    },
  },

  watch: {
    rangeSlider(range) {
      return store.commit("update_speed", range);
    },
  },
};
</script>