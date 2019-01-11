import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import configureStore from '../store'
import App from '../containers/App'

export const render = async function() {
  const store = await configureStore()

  ReactDOM.render(
    (
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    ),
    document.getElementById('mount')
  )
}
