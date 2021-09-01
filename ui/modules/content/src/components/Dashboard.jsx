import React from "react";

import * as S from './account/service'
import { useTenant } from './Tenant'

// https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/admin.html

const Dashboard = () => {
  const { tenant } = useTenant()

  const [accounts, setAccounts] = React.useState([])

  React.useEffect(() => {
    if (!tenant) {
      return
    }
    S.getAccounts(tenant).then((data) => {
      setAccounts(data)
    }).catch((err) => {
      console.error('unable to get accounts', err)
    })
  }, [tenant, setAccounts])

  console.log('tenant is', tenant)

  return (
    <React.Fragment>
      <section className="hero is-info welcome is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Dashboard</h1>
          </div>
        </div>
      </section>
      <section className="info-tiles">
        <div className="tile is-ancestor has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">{accounts.length}</p>
              <p className="subtitle">Accounts</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">2</p>
              <p className="subtitle">Transfers</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">3</p>
              <p className="subtitle">Integrations</p>
            </article>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
