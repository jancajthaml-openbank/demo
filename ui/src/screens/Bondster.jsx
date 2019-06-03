import React from 'react'
import PropTypes from 'prop-types'

import {
  List as BondsterTokens,
  New as BondsterTokenNew,
} from '../containers/Bondster'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Bondster extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <h2>Bondster</h2>
        <h3>Tokens</h3>
        <BondsterTokens tenant={tenant} />
        <BondsterTokenNew tenant={tenant} />
      </React.Fragment>
    )
  }
}

let Exported = Bondster

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Bondster)
}

export default Exported
