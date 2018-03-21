/* eslint react/no-array-index-key: 0 */

import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import htmlparser2 from 'htmlparser2'

import Blockquote from './Blockquote'
import AutoSizeImage from './AutoSizeImage'
import utils from '../../utils'
import hkgmoji from '../../hkgmoji'

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

  prepareDomArray = (dom, level) => {
    const domArray = []
    const addInline = (element) => {
      if (!domArray.length) {
        domArray.push({
          type: 'inline',
          children: [element],
        })
        return
      }

      if (domArray[domArray.length - 1].type === 'inline') {
        domArray[domArray.length - 1].children.push(element)
        return
      }

      domArray.push({
        type: 'inline',
        children: [element],
      })
    }
    const addBlock = element => domArray.push(element)

    dom.forEach((node, index) => {
      if (node.type === 'text') {
        if (node.data === '\n') {
          return
        }
        addInline((
          <Text key={index} style={[level > 0 && { color: '#888' }]}>
            {node.data.trim()}
          </Text>
        ))
      }

      switch (node.name) {
        case 'br': {
          if (node.next.type === 'text' && node.next.data.indexOf('\n') !== -1) {
            break
          }
          addInline((
            <Text key={index}>{'\n'}</Text>
          ))
          break
        }

        case 'span': {
          const colorStyle = { color: colorMap[node.attribs.style] }
          const fontSizeStyle = { fontSize: fontSizeMap[node.attribs.style] }
          addInline((
            <Text key={index} style={[colorStyle, fontSizeStyle]}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'strong': {
          const style = { fontWeight: 'bold' }
          addInline((
            <Text key={index} style={style}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'ins': {
          const style = { textDecorationLine: 'underline' }
          addInline((
            <Text key={index} style={style}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'del': {
          const style = { textDecorationLine: 'line-through' }
          addInline((
            <Text key={index} style={style}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'em': {
          const style = { fontStyle: 'italic' }
          addInline((
            <Text key={index} style={style}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'a': {
          addInline(<Text key={index}>{this.prepareDomArray(node.children, level)}</Text>)
          break
        }

        case 'div': {
          const style = { textAlign: textAlignMap[node.attribs.style] }
          addBlock((
            <Text key={index} style={style}>
              {this.prepareDomArray(node.children, level)}
            </Text>
          ))
          break
        }

        case 'img': {
          if (node.attribs.class === 'hkgmoji') {
            addInline(<Image key={index} source={hkgmoji[node.attribs.src]} />)
          }
          addInline((
            <AutoSizeImage
              key={index}
              level={level}
              source={{ uri: `https://i.lihkg.com/540/${node.attribs.src}` }}
            />
          ))
          break
        }

        case 'blockquote': {
          if (level > 2) {
            break
          }
          addBlock((
            <Blockquote key={index} level={level}>
              {this.prepareDomArray(node.children, level + 1)}
            </Blockquote>
          ))
          break
        }

        default:
          break
      }
    })
    return domArray
  }

  renderNativeElements = array => array.map((element, index) => {
    if (element.type === 'inline') {
      return <Text key={index}>{element.children}</Text>
    }
    return element
  })

  renderHTML = (html) => {
    const parser = new htmlparser2.Parser(
      new htmlparser2.DomHandler((_err, dom) => {
        const array = this.prepareDomArray(dom, 0)
        // this.renderNativeElements(array)
        this.setState({ nativeElements: this.renderNativeElements(array) })
      }),
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
