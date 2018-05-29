import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import API from '../api'

export default {
  state: {
    category: {},
    threadList: [],
    page: 1,
    hasMore: true,
  },
  reducers: {
    receiveCategory(state, category) {
      return {
        ...state,
        category,
      }
    },
    receiveThreadList(state, threadList) {
      return {
        ...state,
        threadList,
      }
    },
    appendThreadList(state, threadList) {
      return {
        ...state,
        threadList: uniqBy(state.threadList.concat(threadList), 'thread_id'),
      }
    },
    updatePage(state, page) {
      return {
        ...state,
        page,
      }
    },
    updateHasMore(state, hasMore) {
      return {
        ...state,
        hasMore,
      }
    },
    clearThreadList(state) {
      return {
        ...state,
        threadList: [],
      }
    },
  },
  effects: {
    async fetchThreadList({ catId = 1, page = 1 }) {
      const append = page !== 1
      try {
        const { category, items } = await API.fetchThreadList({ catId, page })
        if (append) {
          this.appendThreadList(items)
        } else {
          this.receiveThreadList(items)
        }
        this.receiveCategory(category)
        this.updatePage(page)
        this.updateHasMore(true)
      } catch (err) {
        if (Number(get(err, 'error_code')) === 100) {
          this.updateHasMore(false)
        }
        console.log(err)
      }
    },
  },
}
