import API from '../api'

export default {
  state: {
    categoryList: [],
  },
  reducers: {
    receiveCategoryList(state, categoryList) {
      return {
        ...state,
        categoryList,
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
  },
}
