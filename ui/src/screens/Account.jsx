import React from 'react'
import PropTypes from 'prop-types'

import {
  AccountsList,
  NewAccount,
} from '../containers/Core'
import { Card } from '../components/Card'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Account extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Accounts</h1>
        </header>
        <main>
          <Card>
            <h6>New Account</h6>
            <NewAccount tenant={tenant} />
          </Card>
          <Card>
            <h6>Accounts</h6>
            <AccountsList tenant={tenant} />
          </Card>
        </main>
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
