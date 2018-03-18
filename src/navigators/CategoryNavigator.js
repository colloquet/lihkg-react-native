import { StackNavigator } from 'react-navigation'

import CategoryScreen from '../screens/Category/CategoryScreen'
import ThreadScreen from '../screens/Category/ThreadScreen'

const CategoryNavigator = StackNavigator({
  Category: {
    screen: CategoryScreen,
  },
  Thread: {
    screen: ThreadScreen,
  },
})

export default CategoryNavigator
