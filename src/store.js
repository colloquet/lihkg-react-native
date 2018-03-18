import { init } from '@rematch/core'

import app from './models/app'
import category from './models/category'

const store = init({
  models: { app, category },
})

export default store
