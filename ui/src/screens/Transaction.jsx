import React from 'react'
import { List } from 'components/Transactions'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Transaction() {
  return (
    <React.Fragment>
      <header>
        <h1>Transactions</h1>
      </header>
      <main>
        <Card>
          <h6>Transactions</h6>
          <List />
        </Card>
      </main>
    </React.Fragment>
  )
}
/*
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
*/
export default Transaction
