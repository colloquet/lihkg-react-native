import API from '../api'

export default {
  state: {
    thread: {},
  },
  reducers: {
    receiveThread(state, thread) {
      return {
        ...state,
        thread: {
          ...thread,
          item_data: (state.thread.item_data || []).concat(thread.item_data),
        },
      }
    },
    clearThread(state) {
      return {
        ...state,
        thread: {},
      }
    },
  },
  effects: {
    async fetchThread({ threadId, page = 1, order = 'reply_time' }) {
      try {
        const thread = await API.fetchThread({ threadId, page, order })
        this.receiveThread(thread)
        console.log(thread)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
