import React from 'react'
import PropTypes from 'prop-types'

import {
  AccountsList,
  NewAccount,
} from '../containers/Core'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Account extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <h2>Accounts</h2>
        <NewAccount tenant={tenant} />
        <AccountsList tenant={tenant} />
      </React.Fragment>
    )
  }
}

let Exported = Account

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Account)
}

export default Exported
