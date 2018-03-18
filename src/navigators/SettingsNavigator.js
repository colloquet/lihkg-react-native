import { StackNavigator } from 'react-navigation'

import SettingsScreen from '../screens/Settings/SettingsScreen'

const SettingsNavigator = StackNavigator({
  Settings: {
    screen: SettingsScreen,
  },
})

export default SettingsNavigator
