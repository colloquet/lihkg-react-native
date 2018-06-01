import React from 'react'
import PropTypes from 'prop-types'

import Message from './Message/Message'
import Blockquote from './Message/Blockquote'

class Quote extends React.PureComponent {
  static propTypes = {
    quote: PropTypes.object.isRequired,
    level: PropTypes.number,
  }

  static defaultProps = {
    level: 1,
  }

  render() {
    const { quote, level } = this.props

    const innerQuote = quote.quote && <Quote quote={quote.quote} level={level + 1} />

    return (
      <Blockquote>
        {innerQuote}

        <Message level={level}>{quote.msg}</Message>
      </Blockquote>
    )
  }
}

export default Quote
