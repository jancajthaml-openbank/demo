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

  console.log(query)
  /*
  React.useEffect(() => {
    setTenant(props.tenants[0])
  }, [props.tenants.join(',')])

  const updateTenant = (nextTenant) => {
    if (props.tenants.includes(nextTenant)) {
      setTenant(nextTenant)
    }
  }*/

  return null

  return (
    <TenantContext.Provider
      value={{
        tenant: tenant || props.tenants[0],
        tenants: props.tenants,
        setTenant: updateTenant,
      }}
    >
      {props.children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => React.useContext(TenantContext)
