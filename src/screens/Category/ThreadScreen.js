import React, { PureComponent } from 'react'
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PostItem from '../../components/PostItem'

const mapState = state => ({
  thread: state.thread.thread,
})

const mapDispatch = dispatch => ({
  fetchThread: dispatch.thread.fetchThread,
  clearThread: dispatch.thread.clearThread,
})

class ThreadScreen extends PureComponent {
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
  }

  componentDidMount() {
    this.fetchThread(this.state.page)
  }

  componentWillUnmount() {
    this.props.clearThread()
  }

  onLoadMore = () => {
    // TODO: prevent infinite loop
    this.fetchThread(this.state.page + 1)
  }

  fetchThread = async (page = 1) => {
    if (this.state.isLoading) {
      return
    }
    // const threadId = 411931
    const threadId = this.props.navigation.state.params.thread.thread_id
    this.setState({ isLoading: true })
    await this.props.fetchThread({ threadId, page })
    this.setState({ isLoading: false, page })
  }

  renderPostItem = ({ item: post }) => {
    const index = post.msg_num - 1
    return (
      <React.Fragment>
        {index % 25 === 0 && (
          <View style={styles.pageNumber}>
            <Text>第 {(index / 25) + 1} 頁</Text>
          </View>
        )}
        <PostItem post={post} isAuthor={+this.props.thread.user_id === +post.user.user_id} />
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    ) : (
      <FlatList
        style={{ backgroundColor: '#f5f5f5' }}
        data={thread.item_data}
        renderItem={this.renderPostItem}
        keyExtractor={post => post.post_id}
        ListFooterComponent={this.renderListFooter}
        onEndReached={this.onLoadMore}
        onEndReachedThreshold={0.2}
        disableVirtualization
        removeClippedSubviews
        initialNumToRender={25}
        maxToRenderPerBatch={25}
      />
    )
  }
}

const styles = StyleSheet.create({
  pageNumber: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 16,
  },
})

export default connect(mapState, mapDispatch)(ThreadScreen)
