import { init } from '@rematch/core'

import app from './models/app'
import ui from './models/ui'
import category from './models/category'
import thread from './models/thread'

const store = init({
  models: {
    app,
    ui,
    category,
    thread,
  },
})

export default store
