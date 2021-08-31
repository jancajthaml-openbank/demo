import React from "react";

import { Module } from "@lastui/rocker/platform";

export const TenantContext = React.createContext({
  tenant: null,
  tenants: [],
  setTenant: () => {},
});

export const BridgedTenantContextProvider = (props) => React.createElement(props.context.Consumer, null, (ctx) => (
  <TenantContext.Provider value={ctx}>
    {props.children}
  </TenantContext.Provider>
));

export const TenantContextProvider = (props) => (
  <Module name="tenant">
    <BridgedTenantContextProvider>
      {props.children}
    </BridgedTenantContextProvider>
  </Module>
);

export const useTenant = () => React.useContext(TenantContext);
