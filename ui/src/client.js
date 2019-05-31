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

  ReactDOM.hydrate(App(store, globalisation), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
