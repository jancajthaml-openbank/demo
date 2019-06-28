import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"

import './stylesheets'
import { configureGlobalisation, configureStore } from './setup'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './containers/Layout'

const App = (store, globalisation) => (
  <ErrorBoundary>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Router>
          <Layout />
        </Router>
      </ReduxProvider>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const serverState = document.getElementById("__STATE__")
  let initialState = {}
  if (serverState) {
    try {
      initialState = JSON.parse(serverState.innerText)
    } catch (err) {
      // pass
    } finally {
      serverState.remove()
    }
  }

  const [ store, globalisation ] = await Promise.all([
    configureStore(initialState),
    configureGlobalisation(),
  ])

  const mountNode = document.getElementById("mount")

  const render = (process.env.NODE_ENV !== 'production' && module.hot)
    ? ReactDOM.render
    : ReactDOM.hydrate

  render(App(store, globalisation), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
