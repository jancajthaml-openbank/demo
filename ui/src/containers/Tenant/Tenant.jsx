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
      this.setState({ tenant }, () => {
        console.log(`tenant is now ${tenant}`)
      })
    }

    render() {
      const { tenant, tenants } = this.state

      console.log(`with tenants ${tenants} and selected ${tenant}`)

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
            ? <React.Fragment>
                <h3>{`Current tenant is ${tenant}`}</h3>
                <ComposedComponent />
              </React.Fragment>
            : null
          }
        </TenantCtx.Provider>
      )
    }
  }
  return Wrapped
}

export default withTenant
