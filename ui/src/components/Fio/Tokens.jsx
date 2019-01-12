import React from 'react'

import PropTypes from 'prop-types'

class Tokens extends React.Component {

  static propTypes = {
    loadTokens: PropTypes.func.isRequired,
    tokens: PropTypes.array,
    tokensLoading: PropTypes.bool,
    // FIXME with tenant
    tenant: PropTypes.string,
  }

  componentDidMount() {
    this.props.loadTokens('demo')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tenant !== this.props.tenant) {
      this.props.loadTokens('demo')
    }
  }

  render() {
    const { tokens, tokensLoading } = this.props

    return (
      <div>
        <h2>
          FIO Tokens
        </h2>
        {tokensLoading && 'Loading'}
        <ul>
        {tokens.map((token) => (
          <li key={token.value}>
            {token.value}
          </li>
        ))}
        </ul>
      </div>
    )
  }
}

export default Tokens
