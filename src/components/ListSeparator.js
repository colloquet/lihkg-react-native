import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

function ListSeparator({ style }) {
  return <View style={[styles.separator, style]} />
}

ListSeparator.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

ListSeparator.defaultProps = {
  style: null,
}

const styles = StyleSheet.create({
  separator: {
    marginLeft: 16,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default ListSeparator
