import React from 'react'
import ReactDOM from 'react-dom'

import './stylesheets'

import { Provider as ReduxProvider } from 'react-redux'

import { configureGlobalisation, configureStore } from './setup'

import Index from './screens/Index'

const render = async function() {
  const { store, globalisation } = await Promise.all([

    configureStore().then((store) => ({ store })),
    configureGlobalisation().then((globalisation) => ({ globalisation })),

  ]).then((r) => Promise.resolve(r.reduce((b, a) => Object.assign({}, a, b))))

  ReactDOM.render(
    (
      <ReduxProvider store={store}>
        <Index />
      </ReduxProvider>
    ),
    document.getElementById('mount')
  )
}

if (!PRODUCTION && module.hot) {
  module.hot.accept(['./screens/Index'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('mount'))
    render()
  })
}

render()
