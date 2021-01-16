import { createStore } from 'vuex'

//const palette = { "background": "pink", "compare": "green", "selected": "red" };
//const palette = { "background": "lightsteelblue", "compare": "royalblue", "selected": "red" };
//const palette = { "background": "pink", "compare": "mediumorchid", "selected": "fuchsia" };
//const palette = { "background": "silver", "compare": "dimgray", "selected": "red" };
const palette = { "background": "gray", "compare": "limegreen", "selected": "red" };

export default createStore({
  state: {
    array: Array.from({ length: 50 }, () => Math.round(Math.random() * 100)),
    colors: Array.from({ length: 50 }, () => palette["background"]),
    speed: 50,
    calls: 0,
    palette: palette,
    isRunning: false,
  },

  mutations: {
    create_random_array(state, payload) {
      state.array = Array.from({ length: payload }, () => Math.round(Math.random() * 100));
      state.colors = Array.from({ length: payload }, () => palette["background"]);
    },

    update_array(state, payload) {
      state.array = payload;
    },

    update_colors(state, { pos, color }) {
      state.colors[pos] = color;
    },

    update_speed(state, payload) {
      state.speed = payload;
    },
    increment_calls(state) {
      state.calls = state.calls + 1;
    },
    reset_calls(state) {
      return state.calls = 0;
    },
    reset_colors(state) {
      return state.colors = Array.from({ length: state.array.length }, () => state.palette["background"]);
    },
    isRunning(state, payload) {
      return state.isRunning = payload;
    }
  },

  getters: {
    array_size: state => {
      return state.array.length;
    },
    array: state => {
      return state.array;
    },
    colors: state => {
      return state.colors;
    },
    speed: state => {
      // need to reverse the speed bc of the range slider
      return 1 / state.speed * 1000;
    },
    isRunning: state => {
      return state.isRunning;
    },

    calls: state => {
      return state.calls;
    }
  },
})