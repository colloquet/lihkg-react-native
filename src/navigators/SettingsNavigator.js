import { createStackNavigator } from 'react-navigation'

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
    navigationOptions: {
      headerTintColor: '#fffc',
      headerStyle: {
        backgroundColor: '#1b1b1b',
        borderBottomWidth: 0,
      },
    },
  },
)

export default SettingsNavigator
