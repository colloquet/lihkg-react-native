import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import PropTypes from 'prop-types'

const mapState = (state, ownProps) => ({
  getScreenDetails: (scene) => {
    const details = ownProps.getScreenDetails(scene);
    console.log(details)
    return {
      ...details,
      options: {
        headerStyle: { backgroundColor: 'yellow' },
        headerTitleStyle: { color: '#f00' },
        ...details.options,
      },
    }
  },
})

function HeaderContainer({ ...props }) {
  return (
    <Header
      {...props}
    />
  )
}

// HeaderContainer.propTypes = {
//   darkMode: PropTypes.bool.isRequired,
// }

export default connect(mapState)(HeaderContainer)
