import React from 'react'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'

import hkgmoji from '../../hkgmoji'

function Icon({ src, staticIcons }) {
  const source = staticIcons ? src.replace('/faces/', '/faces_png/').replace('.gif', '.png') : src
  return <FastImage source={hkgmoji[source]} />
}

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  staticIcons: PropTypes.bool.isRequired,
}

export default Icon
