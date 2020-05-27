import React from 'react'
import { List, New } from 'components/Accounts'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Account() {
  return (
    <React.Fragment>
      <header>
        <h1>Accounts</h1>
      </header>
      <main>
        <Card>
          <h6>New Account</h6>
          <New />
        </Card>
        <Card>
          <h6>Accounts</h6>
          <List />
        </Card>
      </main>
    </React.Fragment>
  )
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
