import React from 'react'
import { TabNavigator } from 'react-navigation'

import CategoryNavigator from './navigators/CategoryNavigator'
import SettingsNavigator from './navigators/SettingsNavigator'

const AppNavigator = TabNavigator({
  Category: {
    screen: CategoryNavigator,
  },
  Settings: {
    screen: SettingsNavigator,
  },
})

function App() {
  return (
    <AppNavigator />
  )
}

export default App
