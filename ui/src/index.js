import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"

import './stylesheets'
import { configureGlobalisation, configureStore } from './setup'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './containers/Layout'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = (store, globalisation) => (
  <ErrorBoundary>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <Router history={history}>
          <Layout />
        </Router>
      </ReduxProvider>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const [ store, globalisation ] = await Promise.all([
    configureStore({}),
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
