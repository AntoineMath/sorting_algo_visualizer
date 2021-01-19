import { createStore } from 'vuex'

//const palette = { "background": "pink", "compare": "green", "selected": "red" };
//const palette = { "background": "lightsteelblue", "compare": "royalblue", "selected": "red" };
//const palette = { "background": "pink", "compare": "mediumorchid", "selected": "fuchsia" };
//const palette = { "background": "silver", "compare": "dimgray", "selected": "red" };
const palette = { "background": "gray", "compare": "limegreen", "selected": "red" };


export default createStore({
  state: {
    bars: Array.from({ length: 50 }, () => Math.round(Math.random() * 100)).map((x, i) => {
      return {
        value: x,
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        color: palette["background"],
        index: i
      }
    }
    ),
    speed: 50,
    calls: 0,
    palette: palette,
    isRunning: false,
  },

  mutations: {
    create_random_array(state, payload) {
      state.bars = Array.from({ length: payload }, () => Math.round(Math.random() * 100)).map((x, i) => {
        return {
          value: x,
          x: 0,
          y: 0,
          height: 0,
          width: 0,
          color: palette["background"],
          index: i
        }
      })
    },
    set_bars: (state, payload) => {
      state.bars = payload
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
      state.bars.forEach(bar => {
        bar.color = palette["background"]
      })
    },
    isRunning(state, payload) {
      return state.isRunning = payload;
    },
    set_height: (state, payload) => {
      const { i, height } = payload
      state.bars[i].height = height
    },
    set_width: (state, payload) => {
      const { i, width } = payload
      state.bars[i].width = width
    },
    set_x: (state, payload) => {
      const { i, x_pos } = payload
      state.bars[i].x = x_pos
    },
    set_y: (state, payload) => {
      const { i, y_pos } = payload
      state.bars[i].y = y_pos
    },
    set_color: (state, payload) => {
      const { i, color } = payload
      state.bars[i].color = color
    },
    set_index: (state, payload) => {
      const { i, index } = payload
      state.bars[i].index = index
    },
    set_value: (state, payload) => {
      const { i, value } = payload
      state.bars[i].value = value
    },
  },

  getters: {
    bars: state => {
      return state.bars;
    },
    bars_size: state => {
      return state.bars.length;
    },
    bars_values: state => {
      return state.bars.map(bar => bar.value);
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