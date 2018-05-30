export default {
  state: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode(state) {
      return {
        ...state,
        darkMode: !state.darkMode,
      }
    },
  },
  effects: {},
}
