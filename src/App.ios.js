import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import CategoryNavigator from './navigators/CategoryNavigator'
import SettingsNavigator from './navigators/SettingsNavigator'

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: CategoryNavigator,
    navigationOptions: {
      tabBarLabel: '主頁',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
    },
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: {
      tabBarLabel: '設定',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />,
    },
  },
})

export default AppNavigator
