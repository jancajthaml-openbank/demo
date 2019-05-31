import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'

import { ErrorBoundary } from './components/ErrorBoundary'

import { configureStore } from './setup'

import Index from './screens/Index'

module.exports = async function(initialState) {
  const store = await configureStore(initialState)
  const content = renderToString(
    <ErrorBoundary>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <Index />
        </ReduxProvider>
      </React.StrictMode>
    </ErrorBoundary>
  )

  return [ content, store.getState() ]
}
