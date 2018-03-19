import React, { PureComponent } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PostItem from '../../components/PostItem'

const mapState = state => ({
  thread: state.thread.thread,
})

const mapDispatch = dispatch => ({
  fetchThread: dispatch.thread.fetchThread,
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
    thread: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
  }

  componentDidMount() {
    this.fetchThread(1)
  }

  fetchThread = async (page) => {
    const threadId = 411931
    // const threadId = this.props.navigation.state.params.thread.thread_id
    this.setState({ isLoading: true })
    await this.props.fetchThread({ threadId, page })
    this.setState({ isLoading: false })
  }

  renderPostItem = ({ item: post }) => (
    <PostItem post={post} isAuthor={+this.props.thread.user_id === +post.user.user_id} />
  )

  render() {
    const { isLoading } = this.state
    const { thread } = this.props

    return isLoading && !thread.pages ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    ) : (
      <FlatList
        data={thread.item_data}
        renderItem={this.renderPostItem}
        keyExtractor={post => post.post_id}
      />
    )
  }
}

export default connect(mapState, mapDispatch)(ThreadScreen)
