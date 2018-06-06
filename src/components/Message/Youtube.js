import React from 'react'
import { View, WebView, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const window = Dimensions.get('window')

const mapState = state => ({
    ytPreview: state.settings.ytPreview
})

class Youtube extends React.PureComponent {
    static propTypes = {
        level: PropTypes.number.isRequired,
        vID: PropTypes.string.isRequired,
        ytPreview: PropTypes.bool.isRequired,
    }

    state = {
        showYtPreview: this.props.ytPreview
    }

    renderPlayer = () => {
        const sidePaddings = 16 * 2
        const quotePaddings = (12 + 1) * this.props.level
        const playerWidth = window.width - sidePaddings - quotePaddings
        const playerHeight = playerWidth * 0.56
        return (
            <View style={{ height: playerHeight, width: playerWidth, marginTop: 10 }}>
                <WebView
                    startInLoadingState={true}
                    renderLoading={() => <ActivityIndicator style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} size="small" />}
                    source={{ uri: `https://www.youtube.com/embed/${this.props.vID}` }}
                />
            </View>
        )
    }

    render() {
        const { showYtPreview } = this.state
        return showYtPreview ? this.renderPlayer() : <View />
    }
}

export default connect(mapState)(Youtube)