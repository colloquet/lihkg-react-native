import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import placeholder from '../../assets/image-placeholder.png'

import AutoSizeImage from './AutoSizeImage'

const mapState = state => ({
  autoLoadImage: state.settings.autoLoadImage,
})

class Img extends React.PureComponent {
  static propTypes = {
    level: PropTypes.number.isRequired,
    source: PropTypes.object.isRequired,
    autoLoadImage: PropTypes.bool.isRequired,
  }

  state = {
    showImage: this.props.autoLoadImage,
  }

  render() {
    const { showImage } = this.state
    const { level, source } = this.props

    return showImage ? (
      <AutoSizeImage level={level} source={source} />
    ) : (
      <TouchableOpacity onPress={() => this.setState({ showImage: true })}>
        <Image style={{ width: 100, height: 100 }} source={placeholder} />
      </TouchableOpacity>
    )
  }
}

export default connect(mapState)(Img)
