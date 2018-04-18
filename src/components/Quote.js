import React from 'react'
import Message from './Message/Message'
import Blockquote from './Message/Blockquote'

class Quote extends React.PureComponent {
  render() {
    const { quote } = this.props

    const innerQuote = quote.quote && (
      <Quote quote={quote.quote} />
    )

    return (
      <Blockquote>
        {innerQuote}

        <Message>{quote.msg}</Message>
      </Blockquote>
    )
  }
}

export default Quote
