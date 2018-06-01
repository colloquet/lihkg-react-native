import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

import { Colors } from './constants'
import CategoryNavigator from './navigators/CategoryNavigator'
import SettingsNavigator from './navigators/SettingsNavigator'

// import BottomTabBarContainer from './containers/BottomTabBarContainer'

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: CategoryNavigator,
      navigationOptions: {
        tabBarLabel: '主頁',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-paper-outline" size={25} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: '設定',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings-outline" size={25} color={tintColor} />
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
)

const mapDispatch = dispatch => ({
  applyHistory: dispatch.app.applyHistory,
})

class App extends React.Component {
  static propTypes = {
    applyHistory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
    this.props.applyHistory()
  }

  render() {
    return <AppNavigator />
  }
}

export default connect(null, mapDispatch)(App)
