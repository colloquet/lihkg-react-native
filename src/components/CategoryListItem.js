import React, { PureComponent, Fragment } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'

class CategoryListItem extends PureComponent {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    isLastItem: PropTypes.bool.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.category.cat_id)
  }

  render() {
    const { category, isLastItem } = this.props
    return (
      <Fragment>
        <TouchableHighlight
          underlayColor="#f5f5f5"
          style={styles.container}
          onPress={this.onPress}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.name}>{category.name}</Text>
            <Icon name="chevron-right" size={18} color="#999" />
          </View>
        </TouchableHighlight>
        {isLastItem || <View style={styles.separator} />}
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    marginLeft: 16,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 16,
  },
})

export default CategoryListItem
