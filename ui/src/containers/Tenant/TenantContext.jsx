import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { GET_TENANTS } from './queries'

const TenantContext = React.createContext([null, () => {}])


export const TenantContextProvider = (props) => {
  const [tenant, setTenant] = React.useState()

  const query = useQuery(GET_TENANTS, {
    variables: {
      limit: 100,
      offset: 0,
    },
  });

  if (query.error || !query.data) {
    return null
  }

  const tenants = query.data.tenants.map((tenant) => tenant.name)

  return (
    <TenantContext.Provider
      value={{
        tenant: tenant || tenants[0],
        tenants: tenants,
        setTenant: setTenant,
      }}
    >
      {props.children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => React.useContext(TenantContext)
