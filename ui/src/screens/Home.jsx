import React from 'react'
import PropTypes from 'prop-types'

import { ErrorBoundary } from '../components/ErrorBoundary'

export class Home extends React.Component {

  render() {
    const { tenant } = this.props

    return (
      <React.Fragment>
        <h2>Home</h2>
        <blockquote>
          Current tenant is <b>{tenant}</b>.
        </blockquote>
      </React.Fragment>
    )
  }
}

let Exported = Home

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Home)
}

export default Exported
