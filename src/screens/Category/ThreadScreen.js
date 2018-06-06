import React from 'react'
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { Colors } from '../../constants'
import PostItem from '../../components/PostItem'
import LoadingOverlay from '../../components/LoadingOverlay'
import Button from '../../components/Button'

const mapState = state => ({
  thread: state.thread.thread,
})

const mapDispatch = dispatch => ({
  fetchThread: dispatch.thread.fetchThread,
  clearThread: dispatch.thread.clearThread,
})

class ThreadScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, 'state.params.thread.title', '載入中...')
    return {
      title,
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchThread: PropTypes.func.isRequired,
    clearThread: PropTypes.func.isRequired,
    thread: PropTypes.object.isRequired,
  }

  state = {
    page: get(this.props.navigation, 'state.params.page', 1),
    isLoading: false,
    storyModeUserId: -1,
  }

  componentDidMount() {
    this.fetchThread(this.state.page)
  }

  componentWillUnmount() {
    this.props.clearThread()
  }

  onLoadMore = () => {
    if (this.state.isLoading || !this.canFetchMore) {
      return
    }

    if (this.state.page < this.props.thread.total_page) {
      this.fetchThread(this.state.page + 1)
    }
    this.canFetchMore = false
  }

  fetchThread = async (page = 1) => {
    if (this.state.isLoading) {
      return
    }
    // const threadId = 672121
    const threadId = this.props.navigation.state.params.thread.thread_id
    this.setState({ isLoading: true })
    await this.props.fetchThread({ threadId, page })
    this.setState({ isLoading: false, page })
  }

  toggleStoryMode = (userId, index) => {
    this.setState(
      { storyModeUserId: this.state.storyModeUserId === -1 ? Number(userId) : -1 },
      () => {
        setTimeout(() => {
          this.list.scrollToIndex({ index })
        }, 500)
      },
    )
  }

  renderPostItem = ({ item: post, index }) => {
    const { storyModeUserId, page, isLoading } = this.state
    const msgNum = post.msg_num - 1
    const storyModeHidden =
      storyModeUserId === -1 ? false : storyModeUserId !== Number(post.user.user_id)
    const isLastReply = Number(post.msg_num) === Number(this.props.thread.no_of_reply)
    const threadEnded = post.msg_num + 1 > this.props.thread.max_reply

    return (
      <React.Fragment>
        {msgNum % 25 === 0 && (
          <View style={styles.pageNumberContainer}>
            <Text style={styles.pageNumber}>第 {(msgNum / 25) + 1} 頁</Text>
          </View>
        )}
        <PostItem
          post={post}
          isAuthor={+this.props.thread.user_id === +post.user.user_id}
          isStoryModeHidden={storyModeHidden}
          isStoryModeActive={storyModeUserId > -1}
          onStoryModePress={this.toggleStoryMode}
          index={index}
        />
        {isLastReply && (
          threadEnded ? (
            <View style={styles.threadEndedTextContainer}>
              <Text style={styles.threadEndedText}>1001</Text>
            </View>
          ) : (
            <Button
              isLoading={isLoading}
              text="F5"
              onPress={() => this.fetchThread(page)}
            />
          )
        )}
      </React.Fragment>
    )
  }

  renderListFooter = () =>
    this.state.isLoading && (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="small" />
      </View>
    )

  render() {
    const { isLoading } = this.state
    const { thread } = this.props

    return isLoading && !thread.item_data ? (
      <LoadingOverlay />
    ) : (
      <FlatList
        ref={(ref) => {
          this.list = ref
        }}
        style={{ backgroundColor: '#222' }}
        data={thread.item_data}
        renderItem={this.renderPostItem}
        extraData={this.state}
        keyExtractor={post => post.post_id}
        ListFooterComponent={this.renderListFooter}
        onEndReached={this.onLoadMore}
        onEndReachedThreshold={0.1}
        disableVirtualization
        removeClippedSubviews
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        onMomentumScrollBegin={() => {
          this.canFetchMore = true
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  pageNumberContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 16,
  },
  pageNumber: {
    color: Colors.text,
  },
  threadEndedTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  threadEndedText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default connect(
  mapState,
  mapDispatch,
)(ThreadScreen)
