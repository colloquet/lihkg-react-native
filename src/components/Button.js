import React from 'react'
import { TouchableHighlight, StyleSheet, ActivityIndicator, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../constants'

function Button({ isLoading, text, onPress }) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={onPress}
      underlayColor={Colors.accentDarker}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableHighlight>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  text: PropTypes.string.isRequired,
}

Button.defaultProps = {
  isLoading: false,
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    margin: 8,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    height: 32,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
})

export default Button
