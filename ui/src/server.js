import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary'
import { ServerStyleSheet } from 'styled-components'

import { Layout } from './containers/Layout'

import { configureStore } from './setup'
import routes from './routes'


module.exports = async function(req, initialState) {
  const store = await configureStore(initialState)
  const context = {}
  const sheet = new ServerStyleSheet()

  const dataRequirements = routes
    .filter((route) => matchPath(req.url, route))
    .map((route) => route.component)

  const jsx = (
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

  const content = renderToString(sheet.collectStyles(jsx))
  const styles = sheet.getStyleTags()

  return [ content, styles, store.getState() ]
}
