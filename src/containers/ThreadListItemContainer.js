import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

import ThreadListItem from '../components/ThreadListItem'

const mapState = state => ({
  history: state.app.history,
})

class ThreadListItemContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,
  }

  onPress = () => {
    const { history, thread } = this.props
    const isRead = thread.thread_id in history
    const page = isRead ? history[thread.thread_id].page : 1
    this.props.navigation.navigate('Thread', { thread, page })
  }

  render() {
    const { history, thread } = this.props
    const isRead = thread.thread_id in history
    const hasNewReply = isRead && thread.no_of_reply > history[thread.thread_id].replies

    return (
      <ThreadListItem
        thread={thread}
        isRead={isRead}
        hasNewReply={hasNewReply}
        onPress={this.onPress}
      />
    )
  }
}

export default withNavigation(connect(mapState)(ThreadListItemContainer))
