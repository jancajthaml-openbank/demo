import React from "react";

import * as S from "./service";

const TenantContext = React.createContext({
  tenant: null,
  tenants: [],
  setTenant: () => {},
});

export const TenantContextProvider = (props) => {
  const [tenant, setTenant] = React.useState(null);
  const [tenants, setTenants] = React.useState([]);

  React.useEffect(() => {
    S.getTenants()
      .then((data) => {
        setTenants(data);
      })
      .catch((err) => {
        console.error("unable to get tenants", err);
      });
  }, [setTenants]);

  return (
    <TenantContext.Provider
      value={{
        tenant: tenant || tenants[0] || null,
        tenants,
        setTenant,
      }}
    >
      {React.Children.map(props.children, (child) =>
        React.cloneElement(
          child,
          { ...child.props, context: TenantContext },
          child.props.children
        )
      )}
    </TenantContext.Provider>
  );
};

export default TenantContextProvider;
