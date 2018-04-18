import React, { PureComponent, Fragment } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'

import utils from '../utils'

class ThreadListItem extends PureComponent {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.thread)
  }

  render() {
    const { thread } = this.props
    return (
      <Fragment>
        <TouchableHighlight
          underlayColor="#f5f5f5"
          style={styles.container}
          onPress={this.onPress}
        >
          <Fragment>
            <View style={styles.meta}>
              <Text
                style={[styles.data, { color: utils.getGenderColor(thread.user) }]}
              >
                {thread.user_nickname}
              </Text>
              <Text style={styles.data}>{utils.getRelativeTime(thread.last_reply_time)}</Text>
              <Text style={styles.data}><Icon name="thumbs-up" /> {thread.like_count - thread.dislike_count}</Text>
              <Text style={styles.data}><Icon name="message-square" /> {thread.no_of_reply}</Text>

              <View style={styles.category}>
                <Text style={styles.categoryName}>{thread.category.name}</Text>
              </View>
            </View>
            <Text style={styles.title}>{thread.title}</Text>
          </Fragment>
        </TouchableHighlight>
        <View style={styles.separator} />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 24,
  },
  separator: {
    marginLeft: 24,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  data: {
    marginRight: 8,
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 16,
  },
  category: {
    backgroundColor: '#f5f6f7',
    borderRadius: 10,
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryName: {
    fontSize: 10,
    color: '#aaa',
  },
})

export default ThreadListItem
