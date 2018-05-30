import React from 'react'
import { StatusBar } from 'react-native'
// import { createBottomTabNavigator } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Feather'

import CategoryNavigator from './navigators/CategoryNavigator'
// import SettingsNavigator from './navigators/SettingsNavigator'

// const AppNavigator = createBottomTabNavigator({
//   Home: {
//     screen: CategoryNavigator,
//     navigationOptions: {
//       tabBarLabel: '主頁',
//       tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
//     },
//   },
//   Settings: {
//     screen: SettingsNavigator,
//     navigationOptions: {
//       tabBarLabel: '設定',
//       tabBarIcon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />,
//     },
//   },
// }, {
//   tabBarOptions: {
//     activeTintColor: '#42b983',
//     inactiveTintColor: '#fffc',
//     style: {
//       backgroundColor: '#1b1b1b',
//     },
//   },
// })

class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <CategoryNavigator />
    )
  }
}

export default App
