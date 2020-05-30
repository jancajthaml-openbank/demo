import React from 'react'

const TenantContext = React.createContext([null, () => {}])


export const TenantContextProvider = (props) => {
  const [tenant, setTenant] = React.useState()

  React.useEffect(() => {
    setTenant(props.tenants[0])
  }, [props.tenants.join(',')])

  const updateTenant = (nextTenant) => {
    if (props.tenants.includes(nextTenant)) {
      setTenant(nextTenant)
    }
  }

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
