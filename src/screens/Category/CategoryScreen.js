import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const mapDispatch = dispatch => ({
  fetchThreadList: () => dispatch.category.fetchThreadList(),
})

class CategoryScreen extends PureComponent {
  componentDidMount() {
    this.props.fetchThreadList()
  }

  render() {
    return (
      <View>
        <Text>Category</Text>
        <Icon name="rocket" size={30} color="#900" />
      </View>
    )
  }
}

export default connect(null, mapDispatch)(CategoryScreen)
