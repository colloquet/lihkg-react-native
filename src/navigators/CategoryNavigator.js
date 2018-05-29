import { createStackNavigator } from 'react-navigation'

import CategoryListScreen from '../screens/Category/CategoryListScreen'
import CategoryScreen from '../screens/Category/CategoryScreen'
import ThreadScreen from '../screens/Category/ThreadScreen'

const CategoryNavigator = createStackNavigator({
  CategoryList: {
    screen: CategoryListScreen,
  },
  Category: {
    screen: CategoryScreen,
  },
  Thread: {
    screen: ThreadScreen,
  },
}, {
  cardStyle: {
    backgroundColor: '#fff',
  },
  navigationOptions: {
    headerBackTitle: null,
  },
})

export default CategoryNavigator
