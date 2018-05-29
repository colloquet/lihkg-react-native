import { createStackNavigator } from 'react-navigation'

import SettingsScreen from '../screens/Settings/SettingsScreen'

const SettingsNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
  },
})

export default SettingsNavigator
