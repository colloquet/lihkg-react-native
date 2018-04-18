/* eslint react/no-array-index-key: 0 */

import React, { PureComponent } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import PropTypes from 'prop-types'
import htmlparser2 from 'htmlparser2'

import Blockquote from './Blockquote'
import AutoSizeImage from './AutoSizeImage'
import utils from '../../utils'
import hkgmoji from '../../hkgmoji'

const BLOCK_TAGS = ['blockquote', 'div']

const TEXT_TAGS = ['span', 'strong', 'sub', 'del', 'ins', 'em', 'br', 'img', 'a']

const baseFontSize = 16

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
  'font-size: xx-large;': baseFontSize + 5,
  'font-size: x-large;': baseFontSize + 4,
  'font-size: large;': baseFontSize + 3,
  'font-size: medium;': baseFontSize + 2,
  'font-size: small;': baseFontSize - 2,
  'font-size: x-small;': baseFontSize - 3,
}

const textAlignMap = {
  'text-align: center;': 'center',
  'text-align: left;': 'left',
  'text-align: right;': 'right',
}

class Message extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
  }

  state = {
    nativeElements: null,
  }

  componentDidMount() {
    this.renderHTML(utils.parseMessage(this.props.children))
  }

  mapDomToArray = (dom, level = 0) =>
    dom.map((node, index) => {
      // console.log(node)
      if (node.type === 'text') {
        if (!node.data.trim()) {
          return null
        }

        return (
          <Text key={index}>
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
          return (
            <Text
              key={index}
              style={{ color: '#2574a9' }}
              onPress={() => Linking.openURL(node.attribs.href)}
            >
              {this.mapDomToArray(node.children, level)}
            </Text>
          )
        }

        case 'img': {
          if (node.attribs.class === 'hkgmoji') {
            return <Image key={index} source={hkgmoji[node.attribs.src]} />
          }
          return (
            <AutoSizeImage
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

        // console.log(node)
        return false
      })
      .filter(parsedNode => parsedNode !== false && parsedNode !== undefined)

    return this.associateRawTexts(RNElements)
  }

  renderHTML = (html) => {
    const parser = new htmlparser2.Parser(
      new htmlparser2.DomHandler(
        (_err, dom) => {
          // console.log(dom)
          const RNElements = this.mapDOMNodesTORNElements(dom)
          // console.log(RNElements)
          // const preparedArray = this.prepareDomArray(array)
          // console.log(preparedArray)
          // const nativeElements = this.renderNativeComponents(preparedArray)
          this.setState({ nativeElements: this.mapDomToArray(RNElements) })
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

export default Message
