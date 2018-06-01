import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../constants'

function ListSectionHeader({ name, style }) {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.sectionName}>{name}</Text>
    </View>
  )
}

ListSectionHeader.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

ListSectionHeader.defaultProps = {
  style: null,
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#2b2b2b',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.text,
  },
})

export default ListSectionHeader
