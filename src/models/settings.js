export default {
  state: {
    darkMode: false,
  },
  reducers: {
    toggleSettings(state, key) {
      return {
        ...state,
        [key]: !state[key],
      }
    },
  },
  effects: {},
}
