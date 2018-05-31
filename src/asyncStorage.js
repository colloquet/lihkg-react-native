import { AsyncStorage } from 'react-native'

const asyncStorage = {
  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      return JSON.parse(value)
    } catch (err) {
      console.log(err)
      return null
    }
  },
  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.log(err)
    }
  },
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (err) {
      console.log(err)
    }
  },
}

export default asyncStorage
