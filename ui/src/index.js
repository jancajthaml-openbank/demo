import React from 'react'
import ReactDOM from 'react-dom'

import './stylesheets'

import { Provider as ReduxProvider } from 'react-redux'

import { configureGlobalisation, configureStore } from './setup'

import Index from './screens/Index'
import { ErrorBoundary } from './components/ErrorBoundary'

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
  const { store, globalisation } = await Promise.all([

    configureStore().then((store) => ({ store })),
    configureGlobalisation().then((globalisation) => ({ globalisation })),

  ]).then((r) => Promise.resolve(r.reduce((b, a) => Object.assign({}, a, b))))

  ReactDOM.render(App(store, globalisation), document.getElementById('mount'))
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
