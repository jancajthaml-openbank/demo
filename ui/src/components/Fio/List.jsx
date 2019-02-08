import React from 'react'

import { hot } from 'react-hot-loader'


import PropTypes from 'prop-types'

class List extends React.Component {

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
    )
  }
}

export default List
