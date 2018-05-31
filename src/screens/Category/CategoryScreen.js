import React, { PureComponent } from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import ThreadListItemContainer from '../../containers/ThreadListItemContainer'

const mapState = state => ({
  category: state.category.category,
  threadList: state.category.threadList,
  page: state.category.page,
  hasMore: state.category.hasMore,
})

const mapDispatch = dispatch => ({
  fetchThreadList: dispatch.category.fetchThreadList,
  clearThreadList: dispatch.category.clearThreadList,
})

class CategoryScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, 'state.params.title', '載入中...')
    return {
      title,
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchThreadList: PropTypes.func.isRequired,
    clearThreadList: PropTypes.func.isRequired,
    threadList: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    hasMore: PropTypes.bool.isRequired,
  }

  state = {
    isLoading: false,
    isRefreshing: false,
  }

  componentDidMount() {
    this.props.clearThreadList()
    this.fetchThreadList(1)
  }

  onRefresh = () => {
    this.fetchThreadList(1)
  }

  onLoadMore = () => {
    if (this.props.hasMore) {
      this.fetchThreadList(this.props.page + 1)
    }
  }

  fetchThreadList = async (page) => {
    if (this.state.isLoading) {
      return
    }

    const catId = get(this.props.navigation, 'state.params.catId', 1)
    this.setState({ isLoading: true, isRefreshing: page === 1 })
    await this.props.fetchThreadList({ catId, page })
    this.props.navigation.setParams({ title: this.props.category.name })
    this.setState({ isLoading: false, isRefreshing: false })
  }

  renderThreadListItem = ({ item: thread }) => (
    <ThreadListItemContainer thread={thread} />
  )

  renderListFooter = () =>
    this.state.isLoading &&
    !this.state.isRefreshing && (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="small" />
      </View>
    )

  renderSeparator = () => (
    <View style={styles.separator} />
  )

  render() {
    const { isLoading, isRefreshing } = this.state
    const { threadList } = this.props

    return isLoading && !threadList.length ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    ) : (
      <FlatList
        data={threadList}
        renderItem={this.renderThreadListItem}
        keyExtractor={thread => thread.thread_id}
        onRefresh={this.onRefresh}
        refreshing={isRefreshing}
        extraData={this.state}
        ListFooterComponent={this.renderListFooter}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReached={this.onLoadMore}
        onEndReachedThreshold={0.2}
      />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    marginLeft: 24,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default connect(mapState, mapDispatch)(CategoryScreen)
