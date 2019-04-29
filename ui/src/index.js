import React from 'react'
import ReactDOM from 'react-dom'

import { Provider as ReduxProvider } from 'react-redux'

import './stylesheets'
import { configureGlobalisation, configureStore } from './setup'
import { ErrorBoundary } from './components/ErrorBoundary'
import Index from './screens/Index'

const App = (store, globalisation) => (
  <ErrorBoundary>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Index />
      </ReduxProvider>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const [ store, globalisation ] = await Promise.all([
    configureStore(),
    configureGlobalisation(),
  ])

  const mountNode = document.getElementById("mount")

  ReactDOM.render(App(store, globalisation), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
