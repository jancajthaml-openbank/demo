import React from 'react'

import { SplashScreen } from 'components/SplashScreen'

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
    pollInterval: 60 * 1000,
  });

  if (query.loading) {
    return <React.Fragment />
  }

  if (query.error || !query.data) {
    return (
      <SplashScreen />
    )
  }

  const tenants = query.data.tenants.map((tenant) => tenant.name)

  if (tenants.length === 0) {
    return <React.Fragment />
  }

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
