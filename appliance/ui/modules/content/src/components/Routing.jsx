import React from "react";

import { Module, Route } from "@lastui/rocker/platform";
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Accounts from './Accounts';
import Transactions from './Transactions';
import { TenantContextProvider } from './Tenant'

// https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/admin.html

const Routing = () => {
  const meta = useSelector((state) => state.shared.meta);

  return (
    <TenantContextProvider>
      {meta['bondster']
        ? <Route path="/integration/token/bonster" component={() => <Module name="bondster" />} />
        : null
      }
      {meta['fio']
        ? <Route path="/integration/token/fio" component={() => <Module name="fio" />} />
        : null
      }
      <Route path="/payment/transactions" component={Transactions} />
      <Route path="/payment/accounts" component={Accounts} />
      <Route exact path="/" component={Dashboard} />
    </TenantContextProvider>
  );
};

export default Routing;
