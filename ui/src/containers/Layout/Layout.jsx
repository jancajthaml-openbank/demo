import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../../routes'

import { providingTenant, withTenant } from '../Tenant'

import Header from './Header'

class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div
          style={{
            padding: '2rem',
          }}
        >
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact || false}
                component={withTenant(route.component)}
              />
            ))}
          </Switch>
        </div>
      </div>
    )
  }
}

export default providingTenant(Layout)
