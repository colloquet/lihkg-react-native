import { dispatch } from '@rematch/core'
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
        dispatch.app.updateHistory({
          threadId: thread.thread_id,
          replies: thread.no_of_reply,
          page,
        })
        dispatch.app.syncHistory()
        console.log(thread)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
