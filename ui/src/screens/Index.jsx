import React from 'react'

import PropTypes from 'prop-types'

import { withTenant, TenantCtx } from '../containers/Tenant'
import { Tokens as FioTokens } from '../containers/Fio'
import { Tokens as BondsterTokens } from '../containers/Bondster'

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
              <FioTokens tenant={tenant} />
              <BondsterTokens tenant={tenant} />
            </React.Fragment>
          )}
        </TenantCtx.Consumer>
      </div>
    )
  }
}

export default withTenant(Index)
