import React from "react";

import { Module, Route } from "@lastui/rocker/platform";
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Accounts from './Accounts';
import Transactions from './Transactions';

// https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/admin.html

const Routing = () => {
  const sharedState = useSelector((state) => state.shared);

  return (
    <React.Fragment>
      {sharedState.available.indexOf('bondster') !== -1
        ? <Route path="/integration/token/bonster" component={() => <Module name="bondster" />} />
        : null
      }
      {sharedState.available.indexOf('fio') !== -1 
        ? <Route path="/integration/token/fio" component={() => <Module name="fio" />} />
        : null
      }
      <Route path="/payment/transactions" component={Transactions} />
      <Route path="/payment/accounts" component={Accounts} />
      <Route exact path="/" component={Dashboard} />
    </React.Fragment>
  );
};

export default Routing;
