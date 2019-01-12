import React from 'react'

import PropTypes from 'prop-types'

class Tokens extends React.Component {

  static propTypes = {
    loadTokens: PropTypes.func.isRequired,
    tokens: PropTypes.array,
    // FIXME with tenant
  }

  componentDidMount() {
    this.props.loadTokens('demo')
  }

  render() {
    const { tokens } = this.props

    return (
      <div>
        <h2>
          Tokens
        </h2>
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
