import React from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

function ListItem({ children, onPress, style }) {
  const listStyle = [styles.container, style]
  const item = <View style={listStyle}>{children}</View>

  return onPress ? (
    <TouchableHighlight underlayColor="#1d1d1d" onPress={onPress}>
      {item}
    </TouchableHighlight>
  ) : (
    item
  )
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

ListItem.defaultProps = {
  onPress: null,
  style: null,
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})

export default ListItem
