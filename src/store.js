import { init } from '@rematch/core'

import app from './models/app'
import category from './models/category'
import thread from './models/thread'

const store = init({
  models: { app, category, thread },
})

export default store
