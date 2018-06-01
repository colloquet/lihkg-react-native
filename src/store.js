import { AsyncStorage } from 'react-native'
import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'

import app from './models/app'
import settings from './models/settings'
import category from './models/category'
import thread from './models/thread'

const persistPlugin = createRematchPersist({
  storage: AsyncStorage,
  whitelist: ['settings'],
  throttle: 500,
  version: 1,
})

const store = init({
  plugins: [persistPlugin],
  models: {
    app,
    settings,
    category,
    thread,
  },
})

export default store
