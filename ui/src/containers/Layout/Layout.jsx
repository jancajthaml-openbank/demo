import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'


import routes from '../../routes'

import { providingTenant, withTenant } from '../Tenant'

import Header from './Header'

// remove react router
// https://www.freecodecamp.org/news/you-might-not-need-react-router-38673620f3d/

class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={withTenant(route.component)}
            />
          ))}
          <Redirect to='/' />
        </div>
      </div>
    )
  }
}

export default providingTenant(Layout)
