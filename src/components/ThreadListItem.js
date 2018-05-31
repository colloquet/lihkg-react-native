import React, { PureComponent, Fragment } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import utils from '../utils'

class ThreadListItem extends PureComponent {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    isRead: PropTypes.bool.isRequired,
    hasNewReply: PropTypes.bool.isRequired,
  }

  render() {
    const {
      thread, isRead, hasNewReply, onPress,
    } = this.props

    return (
      <TouchableHighlight underlayColor="#1d1d1d" style={styles.container} onPress={onPress}>
        <Fragment>
          {thread.is_hot && (
            <Ionicons style={styles.hotIndicator} name="ios-flash" color="#f6b701" size={18} />
          )}
          {isRead && (
            <View style={[styles.readIndicator, hasNewReply && styles.newReplyIndicator]} />
          )}

          <View style={styles.meta}>
            <Text style={[styles.data, { color: utils.getGenderColor(thread.user) }]}>
              {thread.user_nickname}
            </Text>
            <Text style={styles.data}>{utils.getRelativeTime(thread.last_reply_time)}</Text>
            <Text style={styles.data}>
              <Icon name="thumbs-up" /> {thread.like_count - thread.dislike_count}
            </Text>
            <Text style={styles.data}>
              <Icon name="message-square" /> {thread.no_of_reply}
            </Text>

            <View style={styles.category}>
              <Text style={styles.categoryName}>{thread.category.name}</Text>
            </View>
          </View>
          <Text style={styles.title}>{thread.title}</Text>
        </Fragment>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 24,
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
    lineHeight: 16 * 1.2,
    color: '#fffc',
  },
  category: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryName: {
    fontSize: 10,
    color: '#aaa',
  },
  hotIndicator: {
    position: 'absolute',
    left: 8,
    top: 16,
  },
  readIndicator: {
    position: 'absolute',
    left: 8,
    top: 44,
    backgroundColor: '#aaa',
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  newReplyIndicator: {
    backgroundColor: '#e74c3c',
  },
})

export default ThreadListItem
