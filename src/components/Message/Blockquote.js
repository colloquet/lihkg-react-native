import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

function Blockquote({ children }) {
  return (
    <View style={{ paddingBottom: 16 }}>
      <View
        style={{
          borderLeftColor: '#444',
          borderLeftWidth: 1,
          paddingLeft: 12,
        }}
      >
        {children}
      </View>
    </View>
  )
}

Blockquote.propTypes = {
  children: PropTypes.array.isRequired,
}

export default Blockquote
