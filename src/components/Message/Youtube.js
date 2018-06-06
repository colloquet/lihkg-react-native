import React from 'react'
import { View, WebView, Dimensions, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

const window = Dimensions.get('window')

function Youtube({ vID, level }) {
  const sidePaddings = 16 * 2
  const quotePaddings = (12 + 1) * level
  const playerWidth = window.width - sidePaddings - quotePaddings
  const playerHeight = playerWidth * 0.56

  return (
    <View style={{ height: playerHeight, width: playerWidth, marginTop: 10 }}>
      <WebView
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size="small"
          />
        )}
        source={{ uri: `https://www.youtube.com/embed/${vID}?autoplay=1` }}
      />
    </View>
  )
}

Youtube.propTypes = {
  level: PropTypes.number.isRequired,
  vID: PropTypes.string.isRequired,
}

export default Youtube
