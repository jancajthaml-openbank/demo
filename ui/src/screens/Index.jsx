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
import {
  AccountsList,
  NewAccount,
  TransactionsList,
} from '../containers/Core'
import { ErrorBoundary } from '../components/ErrorBoundary'

export class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <TenantCtx.Consumer>
          {(tenant) => (
            <React.Fragment>
              <div>
                <h2>Core</h2>
                <h3>Accounts</h3>
                <NewAccount tenant={tenant} />
                <AccountsList tenant={tenant} />
                {/*
                <h3>Transactions</h3>
                <TransactionsList tenant={tenant} />*/}
              </div>
              <div>
                <h2>Tokens</h2>
                <h3>Fio</h3>
                <FioTokens tenant={tenant} />
                <FioTokenNew tenant={tenant} />
                <h3>Bondster</h3>
                <BondsterTokens tenant={tenant} />
                <BondsterTokenNew tenant={tenant} />
              </div>
            </React.Fragment>
          )}
        </TenantCtx.Consumer>
      </React.Fragment>
    )
  }
}

let Exported = Index

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Index)
}

export default withTenant(Exported)
