import React, { PureComponent, Fragment } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'

class CategoryListItem extends PureComponent {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.category.cat_id)
  }

  render() {
    const { category } = this.props
    return (
      <TouchableHighlight
        underlayColor="#1d1d1d"
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.name}>{category.name}</Text>
          <Icon name="chevron-right" size={18} color="#999" />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    color: '#fffc',
  },
})

export default CategoryListItem
