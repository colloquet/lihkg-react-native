import React from 'react'
import { View, Text, SectionList, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CategoryListItem from '../../components/CategoryListItem'

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

  renderSectionHeader = ({ section: { name } }) =>
    name && (
      <View style={styles.section}>
        <Text style={styles.sectionName}>{name}</Text>
      </View>
    )

  renderSeparator = () => (
    <View style={styles.separator} />
  )

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#2b2b2b',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fffc',
  },
  separator: {
    marginLeft: 16,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default connect(mapState, mapDispatch)(CategoryListScreen)
