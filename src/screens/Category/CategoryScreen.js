import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

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
      </View>
    )
  }
}

export default connect(null, mapDispatch)(CategoryScreen)
