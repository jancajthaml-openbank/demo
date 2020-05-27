import React from 'react'
import { List, New } from 'components/Fio'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Fio(props) {
  return (
    <React.Fragment>
      <header>
        <h1>Fio</h1>
      </header>
      <main>
        <Card>
          <h6>New Token</h6>
          <New tenant={props.tenant} />
        </Card>
        <Card>
          <h6>Tokens</h6>
          <List tenant={props.tenant} />
        </Card>
      </main>
    </React.Fragment>
  )
}

let Exported = Fio

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Fio)
}

export default Exported
