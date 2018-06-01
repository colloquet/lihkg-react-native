import React from 'react'
import { Text, Switch, StyleSheet, SectionList, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Colors } from '../../constants'
import ListItem from '../../components/ListItem'
import ListSeparator from '../../components/ListSeparator'
import ListSectionHeader from '../../components/ListSectionHeader'
import Button from '../../components/Button'

const mapState = state => ({
  settings: state.settings,
})

const mapDispatch = dispatch => ({
  toggleSettings: dispatch.settings.toggleSettings,
  replaceHistory: dispatch.settings.replaceHistory,
})

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '設定',
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    replaceHistory: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  }

  clearHistory = () => {
    this.props.replaceHistory({})
    Alert.alert('成功清除記錄')
  }

  renderSettingsItem = ({ item, index }) => (
    <ListItem key={index} style={styles.listItem}>
      <Text style={styles.settingName}>{item.name}</Text>
      <Switch
        onTintColor={Colors.accent}
        value={this.props.settings[item.key]}
        onValueChange={() => this.props.toggleSettings(item.key)}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    </ListItem>
  )

  renderSectionHeader = ({ section: { name } }) => name && <ListSectionHeader name={name} />

  renderSeparator = () => <ListSeparator />

  render() {
    return (
      <SectionList
        style={{ flex: 1 }}
        renderItem={this.renderSettingsItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={[
          // {
          //   name: '外觀',
          //   data: [
          //     { name: '夜間模式', key: 'darkMode' },
          //   ],
          // },
          {
            name: '內文',
            data: [
              { name: '自動載入圖片', key: 'autoLoadImage' },
              // { name: 'Youtube 預覽', key: 'ytPreview' },
              { name: '靜態表情', key: 'staticIcons' },
            ],
          },
        ]}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={() => (
          <Button text="清除記錄" onPress={this.clearHistory} />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingName: {
    fontSize: 16,
    color: '#fffc',
  },
})

export default connect(mapState, mapDispatch)(SettingsScreen)
