import API from '../api'

const category = {
  state: {},
  effects: {
    async fetchThreadList() {
      try {
        const data = await API.fetchThreadList({ catId: 1 })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
  },
}

export default category
