import { createStackNavigator } from 'react-navigation'

import { Colors } from '../constants'
import SettingsScreen from '../screens/Settings/SettingsScreen'

const SettingsNavigator = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#202020',
    },
    defaultNavigationOptions: {
      headerTintColor: Colors.text,
      headerStyle: {
        backgroundColor: '#1b1b1b',
        borderBottomWidth: 0,
      },
    },
  },
)

export default SettingsNavigator
