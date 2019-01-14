import { createStackNavigator } from 'react-navigation'

import { Colors } from '../constants'
import CategoryListScreen from '../screens/Category/CategoryListScreen'
import CategoryScreen from '../screens/Category/CategoryScreen'
import ThreadScreen from '../screens/Category/ThreadScreen'

const CategoryNavigator = createStackNavigator(
  {
    CategoryList: {
      screen: CategoryListScreen,
    },
    Category: {
      screen: CategoryScreen,
    },
    Thread: {
      screen: ThreadScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#202020',
    },
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.text,
      headerStyle: {
        backgroundColor: '#1b1b1b',
        borderBottomWidth: 0,
      },
    },
  },
)

export default CategoryNavigator
