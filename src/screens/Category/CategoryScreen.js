import React from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import ThreadListItemContainer from '../../containers/ThreadListItemContainer'
import LoadingOverlay from '../../components/LoadingOverlay'
import ListSeparator from '../../components/ListSeparator'

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

class CategoryScreen extends React.PureComponent {
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
    this.fetchThreadList()
  }

  onRefresh = () => {
    this.fetchThreadList()
  }

  onLoadMore = () => {
    if (this.state.isLoading || !this.props.hasMore || !this.canFetchMore) {
      return
    }

    this.fetchThreadList(this.props.page + 1)
    this.canFetchMore = false
  }

  fetchThreadList = async (page = 1) => {
    if (this.state.isLoading) {
      return
    }

    const catId = get(this.props.navigation, 'state.params.catId', 1)
    this.setState({ isLoading: true, isRefreshing: page === 1 })
    await this.props.fetchThreadList({ catId, page })
    this.props.navigation.setParams({ title: this.props.category.name })
    this.setState({ isLoading: false, isRefreshing: false })
  }

  renderThreadListItem = ({ item: thread }) => <ThreadListItemContainer thread={thread} />

  renderListFooter = () =>
    this.state.isLoading &&
    !this.state.isRefreshing && (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="small" />
      </View>
    )

  renderSeparator = () => <ListSeparator style={{ marginLeft: 24 }} />

  render() {
    const { isLoading, isRefreshing } = this.state
    const { threadList } = this.props

    return isLoading && !threadList.length ? (
      <LoadingOverlay />
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
        onMomentumScrollBegin={() => {
          this.canFetchMore = true
        }}
      />
    )
  }
}

export default connect(mapState, mapDispatch)(CategoryScreen)
