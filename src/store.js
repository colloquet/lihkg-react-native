import { init } from '@rematch/core'

import app from './models/app'
import settings from './models/settings'
import category from './models/category'
import thread from './models/thread'

const store = init({
  models: {
    app,
    settings,
    category,
    thread,
  },
})

export default store
