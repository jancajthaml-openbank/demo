import React from 'react'
import ReactDOM from 'react-dom'

import { Provider as ReduxProvider } from 'react-redux'

import { configureGlobalisation, configureStore } from './setup'

import App from './containers/App'

console.log(process.env.NODE_ENV)

const render = async function() {
  const { store, globalisation } = await Promise.all([

    configureStore().then((store) => ({ store })),
    configureGlobalisation().then((globalisation) => ({ globalisation })),

  ]).then((r) => Promise.resolve(r.reduce((b, a) => Object.assign({}, a, b))))

  ReactDOM.render(
    (
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    ),
    document.getElementById('mount')
  )
}

if (!PRODUCTION && module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('mount'))
    render()
  })
}

render()
