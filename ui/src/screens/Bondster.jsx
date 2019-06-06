import React from 'react'
import PropTypes from 'prop-types'

import {
  List as BondsterTokens,
  New as BondsterTokenNew,
} from '../containers/Bondster'

import { Card } from '../components/Card'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Bondster extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Bondster</h1>
        </header>
        <main>
          <Card>
            <h6>New Token</h6>
            <BondsterTokenNew tenant={tenant} />
          </Card>
          <Card>
            <h6>Tokens</h6>
            <BondsterTokens tenant={tenant} />
          </Card>
        </main>
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
