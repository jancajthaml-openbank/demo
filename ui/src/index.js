import React from 'react'
import ReactDOM from 'react-dom'

import { setConfig as hotLoadConfig } from 'react-hot-loader'

if (!PRODUCTION && module.hot) {
  hotLoadConfig({
    ignoreSFC: true,
    pureRender: true,
  })
}

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

render()
