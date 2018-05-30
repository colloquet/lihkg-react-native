import React from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'

const mapState = state => ({
  darkMode: state.ui.darkMode,
})

const mapDispatch = dispatch => ({
  toggleDarkMode: dispatch.ui.toggleDarkMode,
})

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '設定',
  }

  render() {
    const { darkMode } = this.props
    return (
      <View>
        <Text>Settings</Text>
        <Switch
          tintColor="#42b983"
          value={darkMode}
          onValueChange={this.props.toggleDarkMode}
        />
      </View>
    )
  }
}

export default connect(mapState, mapDispatch)(SettingsScreen)
