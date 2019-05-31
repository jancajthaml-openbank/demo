import React from 'react'

import { connect } from 'react-redux'

import memoize from 'memoize-state'

import { Select } from '../../components/Select'

import { tenantsApiRequestInit, changeTenant } from './actions'

export const TenantCtx = React.createContext(null)

const mapDispatchToProps = {
  loadTenants: tenantsApiRequestInit,
  changeTenant: changeTenant,
}

const mapStateToProps = (state, props) => ({
  tenants: state.tenant.tenants,
  tenant: state.tenant.tenant,
  loading: state.tenant.loading,
})

const withTenant = (ComposedComponent) => {
  class Wrapped extends React.Component {

    componentDidMount() {
      const { tenant, tenants, loadTenants } = this.props
      if (!tenants) {
        loadTenants()
      }
    }

    tenantChanged = (tenant) => {
      this.props.changeTenant(tenant)
    }

    render() {
      const { tenant, tenants, loading } = this.props

      return(
        <TenantCtx.Provider value={tenant}>
          {loading
            ? 'loading'
            : null
          }
          {tenants
            ? <Select
                options={tenants}
                valueChanged={this.tenantChanged}
              />
            : null
          }
          {tenant
            ? <ComposedComponent />
            : null
          }
        </TenantCtx.Provider>
      )
    }
  }

  return connect(
    memoize(mapStateToProps),
    mapDispatchToProps,
  )(Wrapped)
}

export default withTenant
