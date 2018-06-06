/* eslint react/no-array-index-key: 0 */
/* eslint no-param-reassign: 0 */

import React from 'react'
import { View, Text, Linking } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import htmlparser2 from 'htmlparser2'

import { Colors } from '../../constants'
import Blockquote from './Blockquote'
import Img from './Img'
import Icon from './Icon'
import Youtube from './Youtube'
import utils from '../../utils'

const mapState = state => ({
  staticIcons: state.settings.staticIcons,
  ytPreview: state.settings.ytPreview,
})

const BLOCK_TAGS = ['blockquote', 'div', 'pre']

const TEXT_TAGS = ['span', 'strong', 'sub', 'del', 'ins', 'em', 'br', 'img', 'a', 'code']

const BASE_FONT_SIZE = 16

const colorMap = {
  'color: black;': 'black',
  'color: red;': 'red',
  'color: green;': 'green',
  'color: blue;': 'blue',
  'color: purple;': 'purple',
  'color: violet;': 'violet',
  'color: brown;': 'brown',
  'color: pink;': 'pink',
  'color: gold;': 'gold',
  'color: maroon;': 'maroon',
  'color: teal;': 'teal',
  'color: navy;': 'navy',
  'color: limegreen;': 'limegreen',
  'color: orange;': 'orange',
}

const fontSizeMap = {
  'font-size: xx-large;': BASE_FONT_SIZE + 5,
  'font-size: x-large;': BASE_FONT_SIZE + 4,
  'font-size: large;': BASE_FONT_SIZE + 3,
  'font-size: medium;': BASE_FONT_SIZE + 2,
  'font-size: small;': BASE_FONT_SIZE - 2,
  'font-size: x-small;': BASE_FONT_SIZE - 3,
}

const textAlignMap = {
  'text-align: center;': 'center',
  'text-align: left;': 'left',
  'text-align: right;': 'right',
}

class Message extends React.PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    level: PropTypes.number,
    staticIcons: PropTypes.bool.isRequired,
    ytPreview: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    level: 0,
  }

  state = {
    nativeElements: null,
  }

  componentDidMount() {
    this.renderHTML(utils.parseMessage(this.props.children))
  }

  mapDomToArray = (dom, level = 0) =>
    dom.map((node, index) => {
      if (node.type === 'text') {
        if (!node.data.trim()) {
          return null
        }

        return (
          <Text key={index} style={{ fontSize: BASE_FONT_SIZE, color: Colors.text }}>
            {node.data.trim()}
          </Text>
        )
      }

      switch (node.name) {
        case 'br': {
          // if (node.next.type === 'text' && node.next.data.indexOf('\n') === 1) {
          //   return null
          // }
          return <Text key={index}>{'\n'}</Text>
          // return null
        }

        case 'span': {
          const colorStyle = { color: colorMap[node.attribs.style] }
          const fontSizeStyle = { fontSize: fontSizeMap[node.attribs.style] }
          return (
            <Text key={index} style={[colorStyle, fontSizeStyle]}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'pre': {
          const preStyle = { backgroundColor: '#2b2b2b', padding: 8 }
          return (
            <Text key={index} style={[preStyle]}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'code': {
          const codeStyle = { backgroundColor: '#2b2b2b', padding: 4 }
          return (
            <Text key={index} style={[codeStyle]}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'strong': {
          const style = { fontWeight: 'bold' }
          return (
            <Text key={index} style={style}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'ins': {
          const style = { textDecorationLine: 'underline' }
          return (
            <Text key={index} style={style}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'del': {
          const style = { textDecorationLine: 'line-through' }
          return (
            <Text key={index} style={style}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'em': {
          const style = { fontStyle: 'italic' }
          return (
            <Text key={index} style={style}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'a': {
          const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
          const isYoutube = node.attribs.href.match(regex) ? RegExp.$1 : false
          return (
            <View key={index}>
              {this.props.ytPreview && isYoutube && (
                <Youtube level={level} vID={isYoutube} />
              )}
              <Text
                style={{ color: '#2574a9', textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(node.attribs.href)}
              >
                <Text style={{ fontSize: BASE_FONT_SIZE }}>{node.children[0].data.trim()}</Text>
              </Text>
            </View>
          )
        }

        case 'img': {
          if (node.attribs.class === 'hkgmoji') {
            return <Icon key={index} src={node.attribs.src} staticIcons={this.props.staticIcons} />
          }
          return (
            <Img
              key={index}
              level={level}
              source={{ uri: `https://i.lihkg.com/540/${node.attribs.src}` }}
            />
          )
        }

        case 'div': {
          const style = { textAlign: textAlignMap[node.attribs.style] }
          return (
            <Text key={index} style={style}>
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'blockquote': {
          if (level > 2) {
            return null
          }
          return <Blockquote key={index}>{this.mapDomToArray(node.children, level + 1)}</Blockquote>
        }

        default:
          return null
      }
    })

  associateRawTexts = (children) => {
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]
      if (child.wrapper === 'Text' && children.length > 1) {
        const wrappedTexts = []
        for (let j = i; j < children.length; j += 1) {
          const nextSibling = children[j]
          if (nextSibling.wrapper !== 'Text') {
            break
          }
          wrappedTexts.push(nextSibling)
          children[j] = false
        }
        if (wrappedTexts.length) {
          children[i] = {
            attribs: {},
            children: wrappedTexts,
            name: 'span',
            wrapper: 'Text',
          }
        }
      }
    }
    return children.filter(parsedNode => parsedNode !== false && parsedNode !== undefined)
  }

  mapDOMNodesTORNElements = (dom) => {
    const RNElements = dom
      .map((node) => {
        if (node.type === 'text') {
          const strippedData = node.data && node.data.replace(/\s/g, '')
          if (!strippedData || !strippedData.length) {
            return false
          }
          return {
            ...node,
            wrapper: 'Text',
          }
        }

        if (node.type === 'tag') {
          if (node.children) {
            node.children = this.associateRawTexts(this.mapDOMNodesTORNElements(node.children))
          }

          if (BLOCK_TAGS.includes(node.name)) {
            return {
              ...node,
              wrapper: 'View',
            }
          } else if (TEXT_TAGS.includes(node.name)) {
            if (node.name === 'img' && node.attribs.class !== 'hkgmoji') {
              return {
                ...node,
                wrapper: 'View',
              }
            }
            return {
              ...node,
              wrapper: 'Text',
            }
          }
        }

        return false
      })
      .filter(parsedNode => parsedNode !== false && parsedNode !== undefined)

    return this.associateRawTexts(RNElements)
  }

  renderHTML = (html) => {
    const parser = new htmlparser2.Parser(
      new htmlparser2.DomHandler(
        (_err, dom) => {
          const RNElements = this.mapDOMNodesTORNElements(dom)
          this.setState({ nativeElements: this.mapDomToArray(RNElements, this.props.level) })
        },
        { normalizeWhitespace: true },
      ),
      { decodeEntities: true },
    )
    parser.write(html)
    parser.done()
  }

  render() {
    const { nativeElements } = this.state

    return <View>{nativeElements}</View>
  }
}

export default connect(mapState)(Message)
