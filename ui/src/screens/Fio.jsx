import React from 'react'
import PropTypes from 'prop-types'

import {
  List as FioTokens,
  New as FioTokenNew,
} from '../containers/Fio'
import { Card } from '../components/Card'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Fio extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Fio</h1>
        </header>
        <main>
          <Card>
            <h6>New Token</h6>
            <FioTokenNew tenant={tenant} />
          </Card>
          <Card>
            <h6>Tokens</h6>
            <FioTokens tenant={tenant} />
          </Card>
        </main>
      </React.Fragment>
    )
  }
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
