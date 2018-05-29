import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'

import CategoryNavigator from './navigators/CategoryNavigator'
import SettingsNavigator from './navigators/SettingsNavigator'

const AppNavigator = createMaterialBottomTabNavigator({
  Home: {
    screen: CategoryNavigator,
    navigationOptions: {
      tabBarLabel: '主頁',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={24} color={tintColor} />,
      tabBarColor: '#fff',
    },
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: {
      tabBarLabel: '設定',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={24} color={tintColor} />,
      tabBarColor: '#fff',
    },
  },
}, {
  shifting: true,
  initialRouteName: 'Home',
  activeTintColor: '#000',
  inactiveTintColor: '#999',
})

export default AppNavigator
