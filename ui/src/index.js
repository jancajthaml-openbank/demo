import ReactDOM from 'react-dom'

import './globalisation'

import { render } from './app'

if (!PRODUCTION && module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('mount'))
    render()
  })
}

render()
