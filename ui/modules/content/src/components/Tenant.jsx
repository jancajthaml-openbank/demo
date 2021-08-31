import React from 'react';

import { Module } from '@lastui/rocker/platform';

export const TenantContext = React.createContext({
  tenant: null,
  tenants: [],
  setTenant: () => {},
})

export const BridgedTenantContextProvider = (props) => {
  const BridgeContext = props.context

  return (
  	<BridgeContext.Consumer>
  		{(ctx) => (
  			<TenantContext.Provider value={ctx}>
		      {props.children}
		    </TenantContext.Provider>
  		)}
	</BridgeContext.Consumer>
  )
}

export const TenantContextProvider = (props) => {
  const [tenant, setTenant] = React.useState(null)
  const [tenants, setTenants] = React.useState([])

  return (
  	<Module name="tenant">
	    <BridgedTenantContextProvider>
	    	{props.children}
	    </BridgedTenantContextProvider>
	</Module>
  )
}

export const useTenant = () => React.useContext(TenantContext)