import React from 'react'
import { StatusBar } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import { Colors } from './constants'
import CategoryNavigator from './navigators/CategoryNavigator'
import SettingsNavigator from './navigators/SettingsNavigator'

// import BottomTabBarContainer from './containers/BottomTabBarContainer'

const AppNavigator = createAppContainer(createBottomTabNavigator(
  {
    Home: {
      screen: CategoryNavigator,
      navigationOptions: {
        tabBarLabel: '主頁',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-paper" size={25} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: '設定',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accent,
      inactiveTintColor: Colors.text,
      style: {
        backgroundColor: '#1b1b1b',
      },
    },
  },
))

class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return <AppNavigator />
  }
}

export default App
