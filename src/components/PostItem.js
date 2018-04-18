import React, { PureComponent, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'

import Message from './Message/Message'
import Quote from './Quote'
import utils from '../utils'

class PostItem extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isAuthor: PropTypes.bool.isRequired,
  }

  render() {
    const { post, isAuthor } = this.props
    const icon = +post.msg_num === 1 ? 'thumbs' : 'arrow'

    return (
      <View style={styles.container}>
        <Fragment>
          <View style={styles.meta}>
            <Text style={[styles.data, isAuthor && styles.author]}>#{post.msg_num}</Text>
            <Text style={[styles.data, styles.name, { color: utils.getGenderColor(post.user) }]}>
              {post.user_nickname}
            </Text>
            <Text style={styles.data}>{utils.getRelativeTime(post.reply_time)}</Text>
          </View>

          { post.quote && <Quote quote={post.quote} /> }
          <Message>{post.msg}</Message>

          <View style={styles.scoresContainer}>
            <View style={styles.scores}>
              <Icon name={`${icon}-up`} color="#aaa" />
              <Text
                style={[
                  styles.score,
                  {
                    marginRight: 8,
                  },
                ]}
              >
                {post.like_count}
              </Text>
              <Icon name={`${icon}-down`} color="#aaa" />
              <Text style={styles.score}>{post.dislike_count}</Text>
            </View>
          </View>
        </Fragment>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginVertical: 4,
    // borderBottomColor: '#e6e6e6',
    // borderBottomWidth: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  data: {
    marginRight: 8,
    fontSize: 12,
    color: '#aaa',
  },
  name: {
    fontSize: 14,
  },
  author: {
    color: '#f1c40f',
  },
  scoresContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  scores: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  score: {
    fontSize: 12,
    marginLeft: 4,
    color: '#aaa',
  },
})

export default PostItem
