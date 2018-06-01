import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'

import { Colors } from '../constants'
import ListItem from './ListItem'

class CategoryListItem extends React.PureComponent {
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
      <ListItem style={styles.listItem} onPress={this.onPress}>
        <Text style={styles.name}>{category.name}</Text>
        <Icon name="chevron-right" size={18} color="#999" />
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: Colors.text,
  },
})

export default CategoryListItem
