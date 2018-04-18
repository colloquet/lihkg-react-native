import uniqBy from 'lodash/uniqBy'
import API from '../api'

export default {
  state: {
    category: {},
    threadList: [],
    page: 1,
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
      } catch (err) {
        console.log(err)
      }
    },
  },
}
