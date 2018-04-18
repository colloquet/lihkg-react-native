import React, { PureComponent } from 'react'
import { View, ActivityIndicator, Image, Dimensions, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const window = Dimensions.get('window')

class AutoSizeImage extends PureComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
  }

  state = {
    isLoading: true,
    height: null,
    width: null,
    error: false,
  }

  componentDidMount() {
    this.mounted = true
    Image.getSize(
      this.props.source.uri,
      (width, height) => {
        if (this.mounted) {
          this.setState({ width, height, isLoading: false })
        }
      },
      () => {
        this.setState({ isLoading: false, error: true })
      },
    )
  }

  componentWillUnmount() {
    this.mounted = false
  }

  renderImage = () => {
    const { width, height, error } = this.state
    if (error) {
      return (
        <View style={styles.error} />
      )
    }

    const sidePaddings = 16 * 2
    const quotePaddings = (16 + 1) * this.props.level
    const imageWidth = window.width - sidePaddings - quotePaddings
    const ratio = imageWidth / width
    const imageHeight = ratio * height
    return (
      <Image
        style={{ height: imageHeight, width: imageWidth }}
        source={this.props.source}
      />
    )
  }

  render() {
    const { isLoading } = this.state
    return isLoading ? (
      <View>
        <ActivityIndicator size="small" />
      </View>
    ) : (
      this.renderImage()
    )
  }
}

const styles = StyleSheet.create({
  error: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },
})

export default AutoSizeImage
