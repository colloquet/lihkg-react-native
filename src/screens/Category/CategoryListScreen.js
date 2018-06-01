import React from 'react'
import { SectionList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CategoryListItem from '../../components/CategoryListItem'
import LoadingOverlay from '../../components/LoadingOverlay'
import ListSeparator from '../../components/ListSeparator'
import ListSectionHeader from '../../components/ListSectionHeader'

const mapState = state => ({
  categoryList: state.app.categoryList,
})

const mapDispatch = dispatch => ({
  fetchSystemProperty: dispatch.app.fetchSystemProperty,
})

class CategoryListScreen extends React.Component {
  static navigationOptions = {
    title: '選擇分台',
    headerBackTitle: '分台',
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchSystemProperty: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.fetchSystemProperty()
    this.props.navigation.navigate('Category', { catId: 1 })
  }

  renderCategoryListItem = ({ item: category, index }) => (
    <CategoryListItem
      key={index}
      category={category}
      onPress={() => this.props.navigation.navigate('Category', { catId: category.cat_id })}
    />
  )

  renderSectionHeader = ({ section: { name } }) => name && <ListSectionHeader name={name} />

  renderSeparator = () => <ListSeparator />

  render() {
    const { categoryList } = this.props

    return categoryList.length ? (
      <SectionList
        renderItem={this.renderCategoryListItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={categoryList}
        keyExtractor={item => item.cat_id}
        ItemSeparatorComponent={this.renderSeparator}
      />
    ) : (
      <LoadingOverlay />
    )
  }
}

export default connect(mapState, mapDispatch)(CategoryListScreen)
