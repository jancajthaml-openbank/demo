import React from 'react'

import { connect } from 'react-redux'

import memoize from 'memoize-state'

export const TenantCtx = React.createContext(null)

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => ({
  tenant: state.tenant.tenant,
})

export const withTenant = (ComposedComponent) => {
  class Wrapped extends React.Component {

    render() {
      return (
        <TenantCtx.Consumer>
          {(tenant) => tenant
            ? <ComposedComponent tenant={tenant} />
            : null
          }
        </TenantCtx.Consumer>
      )
    }
  }

  return Wrapped
}

export const providingTenant = (ComposedComponent) => {
  class Wrapped extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
      return this.props.tenant !== nextProps.tenant
    }

    render() {
      const { tenant } = this.props

      return (
        <TenantCtx.Provider value={tenant}>
          <ComposedComponent />
        </TenantCtx.Provider>
      )
    }
  }

  return connect(
    memoize(mapStateToProps),
    mapDispatchToProps,
  )(Wrapped)
}
