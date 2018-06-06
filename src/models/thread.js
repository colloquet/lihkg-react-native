import { dispatch } from '@rematch/core'
import unionBy from 'lodash/unionBy'
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
          item_data: unionBy((state.thread.item_data || []), thread.item_data, 'post_id'),
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
        dispatch.settings.updateHistory({
          threadId: thread.thread_id,
          replies: thread.no_of_reply,
          page,
        })
        console.log(thread)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
