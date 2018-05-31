import API from '../api'
import asyncStorage from '../asyncStorage'

export default {
  state: {
    categoryList: [],
    history: {},
  },
  reducers: {
    receiveCategoryList(state, categoryList) {
      return {
        ...state,
        categoryList,
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
  effects: {
    async fetchSystemProperty() {
      try {
        const { fixed_category_list } = await API.fetchSystemProperty()
        this.receiveCategoryList(fixed_category_list.map(({ name, cat_list }) => ({
          name: name || '一般',
          data: cat_list.filter(cat => Number(cat.cat_id) !== 999),
        })))
      } catch (err) {
        console.log(err)
      }
    },
    syncHistory(payload, rootState) {
      asyncStorage.set('history', rootState.app.history)
    },
    async applyHistory() {
      const history = await asyncStorage.get('history')
      if (history) {
        this.replaceHistory(history)
      }
    },
    async clearHistory() {
      this.replaceHistory({})
      await asyncStorage.set('history', {})
    },
  },
}
