import React from 'react'

const TenantContext = React.createContext(null)

export const TenantContextProvider = (props) => (
  <TenantContext.Provider value={props.tenant}>
    {props.children}
  </TenantContext.Provider>
)

export const useTenant = () => React.useContext(TenantContext)
