import React from 'react'

import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader/root'

class Tokens extends React.Component {

  static propTypes = {
    loadTokens: PropTypes.func.isRequired,
    tenant: PropTypes.string.isRequired,
    tokens: PropTypes.array,
    tokensLoading: PropTypes.bool,
  }

  componentDidMount() {
    this.props.loadTokens(this.props.tenant)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tenant !== this.props.tenant) {
      this.props.loadTokens(this.props.tenant)
    }
  }

  render() {
    const { tokens, tokensLoading } = this.props

    return (
      <div>
        <h2>
          Bondster Tokens
        </h2>
        {tokensLoading && 'Loading'}
        <ul>
          {tokens.length > 0
            ? (
              tokens.map((token) => (
              <li key={token}>
                {token}
              </li>
            )))
            : 'No data'
          }
        </ul>
      </div>
    )
  }
}

export default PRODUCTION ? Tokens : hot(Tokens)
