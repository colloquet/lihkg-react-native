export default {
  state: {
    darkMode: false,
    staticIcons: false,
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
