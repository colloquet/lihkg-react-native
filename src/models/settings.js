export default {
  state: {
    darkMode: false,
    staticIcons: false,
    autoLoadImage: true,
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
