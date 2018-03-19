import React from 'react'
import { View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')

function Blockquote({ children, level }) {
  console.log('block')
  return (
    <View
      style={{
        borderLeftColor: '#ddd',
        borderLeftWidth: 1,
        paddingLeft: 16,
        width: width - (16 * 2) - (level * 16),
      }}
    >
      {children}
    </View>
  )
}

Blockquote.propTypes = {
  children: PropTypes.array.isRequired,
  level: PropTypes.number.isRequired,
}

export default Blockquote
