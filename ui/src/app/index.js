import React from 'react'
import ReactDOM from 'react-dom'

import App from '../containers/App'

export const render = function() {
  ReactDOM.render(
    <App />,
    document.getElementById('mount')
  )
}
