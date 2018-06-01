import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { getPersistor } from '@rematch/persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import store from './src/store'
import App from './src/App'

const persistor = getPersistor()

const reduxApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent('lihkgRN', () => reduxApp)
