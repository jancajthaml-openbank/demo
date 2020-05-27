import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import routes from '../../routes'
import Header from './Header'


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
              component={route.component}
            />
          ))}
          <Redirect to='/' />
        </div>
      </div>
    )
  }
}

export default Layout
