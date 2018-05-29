import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/store'
import App from './src/App'

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null

const reduxApp = () => (
  <Provider store={store}>
    <App persistenceKey={navigationPersistenceKey} />
  </Provider>
)

AppRegistry.registerComponent('lihkgRN', () => reduxApp)
