import React from 'react'
import PropTypes from 'prop-types'

import {
  TransactionsList,
} from '../containers/Core'

import { ErrorBoundary } from '../components/ErrorBoundary'

export class Transaction extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <h2>Transactions</h2>
        <TransactionsList tenant={tenant} />
      </React.Fragment>
    )
  }
}

let Exported = Transaction

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Transaction)
}

export default Exported
