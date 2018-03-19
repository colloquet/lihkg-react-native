import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import htmlparser2 from 'htmlparser2'

import Blockquote from './Blockquote'
import AutoSizeImage from './AutoSizeImage'
import utils from '../../utils'
import hkgmoji from '../../hkgmoji'

class Message extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
  }

  state = {
    nativeElements: null,
  }

  componentDidMount() {
    this.parseHTML(utils.parseMessage(this.props.children))
  }

  mapDomToNativeElements = (dom, level) =>
    dom.map((node, index) => {
      console.log(node)
      if (node.type === 'text') {
        if (node.data === '\n') return null
        return <Text key={index}>{node.data}</Text>
      }

      switch (node.name) {
        case 'br':
          return <Text key={index}>{'\n'}</Text>

        case 'span':
          return <Text key={index}>{this.mapDomToNativeElements(node.children, level)}</Text>

        case 'a':
          return <Text key={index}>{this.mapDomToNativeElements(node.children, level)}</Text>

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

        case 'blockquote': {
          console.log(node)
          return (
            <Blockquote key={index} level={level}>
              {this.mapDomToNativeElements(node.children, level + 1)}
            </Blockquote>
          )
        }

        default:
          return null
      }
    })

  parseHTML = (html) => {
    const parser = new htmlparser2.Parser(
      new htmlparser2.DomHandler((_err, dom) => {
        this.setState({ nativeElements: this.mapDomToNativeElements(dom, 0) })
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
