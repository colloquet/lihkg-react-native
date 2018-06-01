export default {
  state: {
    darkMode: false,
    staticIcons: false,
    autoLoadImage: true,
    history: {},
  },
  reducers: {
    toggleSettings(state, key) {
      return {
        ...state,
        [key]: !state[key],
      }
    },
    updateHistory(state, data) {
      return {
        ...state,
        history: {
          ...state.history,
          [data.threadId]: {
            ...data,
          },
        },
      }
    },
    replaceHistory(state, history) {
      return {
        ...state,
        history,
      }
    },
  },
  effects: {},
}
