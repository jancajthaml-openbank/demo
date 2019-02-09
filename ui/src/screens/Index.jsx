import React from 'react'

import PropTypes from 'prop-types'

import { withTenant, TenantCtx } from '../containers/Tenant'
import {
  List as FioTokens,
  New as FioTokenNew,
} from '../containers/Fio'
import {
  List as BondsterTokens,
  New as BondsterTokenNew,
} from '../containers/Bondster'
import { ErrorBoundary } from '../components/ErrorBoundary'

class Index extends React.Component {

  render() {
    return (
      <div>
        <pre>
          I am a react component running in {PRODUCTION ? 'production' : 'development'}
        </pre>
        <TenantCtx.Consumer>
          {(tenant) => (
            <React.Fragment>
              <h2>Fio</h2>
              <FioTokens tenant={tenant} />
              <FioTokenNew tenant={tenant} />
              <h2>Bondster</h2>
              <BondsterTokens tenant={tenant} />
              <BondsterTokenNew tenant={tenant} />
            </React.Fragment>
          )}
        </TenantCtx.Consumer>
      </div>
    )
  }
}

let Exported = Index

if (!PRODUCTION && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Index)
}

export default withTenant(Exported)
