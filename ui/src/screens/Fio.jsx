import React from 'react'
import PropTypes from 'prop-types'

import {
  List as FioTokens,
  New as FioTokenNew,
} from '../containers/Fio'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Fio extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <h2>Fio</h2>
        <h3>Tokens</h3>
        <FioTokens tenant={tenant} />
        <FioTokenNew tenant={tenant} />
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
