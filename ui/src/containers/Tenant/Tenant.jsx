import React from 'react'

import { Select } from '../../components/Select'

export const TenantCtx = React.createContext(null)

import TenantService from './service'

const withTenant = (ComposedComponent) => {
  class Wrapped extends React.Component {
    state = {
      tenant: null,
      tenants: null,
    }

    async componentDidMount() {
      const tenants = await TenantService.getTenants()
      this.setState({ tenants })
    }

    tenantChanged = (tenant) => {
      this.setState({ tenant })
    }

    render() {
      const { tenant, tenants } = this.state

      return(
        <TenantCtx.Provider value={tenant}>
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
  return Wrapped
}

export default withTenant
