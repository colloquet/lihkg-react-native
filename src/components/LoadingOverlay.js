import React from 'react'
import { View, ActivityIndicator } from 'react-native'

function LoadingOverlay() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="small" />
    </View>
  )
}

export default LoadingOverlay
