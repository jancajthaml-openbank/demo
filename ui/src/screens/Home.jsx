import React from 'react'

import { ErrorBoundary } from '../components/ErrorBoundary'
import { useTenant } from '../containers/Tenant'

function Home() {
  const tenant = useTenant()

  return (
    <React.Fragment>
      <header>
        <h1>Home</h1>
        <h6>Current tenant is {tenant}.</h6>
      </header>
    </React.Fragment>
  )
}
/*
let Exported = Home

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const { hot } = require('react-hot-loader/root')
  const { setConfig } = require('react-hot-loader')
  setConfig({
    logLevel: 'debug',
    errorReporter: ErrorBoundary,
  })
  Exported = hot(Home)
}
*/
export default Home
