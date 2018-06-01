import React from 'react'
import { connect } from 'react-redux'
import { BottomTabBar } from 'react-navigation-tabs'
import PropTypes from 'prop-types'

import { Colors } from '../constants'

const mapState = state => ({
  darkMode: state.settings.darkMode,
})

function BottomTabBarContainer({ darkMode, ...props }) {
  const styleProps = darkMode
    ? {
      activeTintColor: Colors.accent,
      inactiveTintColor: Colors.text,
      style: {
        backgroundColor: '#1b1b1b',
      },
    }
    : {}

  return <BottomTabBar {...props} {...styleProps} />
}

BottomTabBarContainer.propTypes = {
  darkMode: PropTypes.bool.isRequired,
}

export default connect(mapState)(BottomTabBarContainer)
