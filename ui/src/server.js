import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './containers/Layout'

import { configureStore } from './setup'
import routes from './routes'


module.exports = async function(req, initialState) {
  const store = await configureStore(initialState)
  const context = {}

  const dataRequirements = routes
    .filter((route) => matchPath(req.url, route))
    .map((route) => route.component)

  const content = renderToString(
    <ErrorBoundary>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <Layout />
          </StaticRouter>
        </ReduxProvider>
      </React.StrictMode>
    </ErrorBoundary>
  )

  return [ content, store.getState() ]
}
