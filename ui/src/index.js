import 'moment/locale/en-gb'

import moment from 'moment'

moment.locale('en-gb')

import ReactDOM from 'react-dom'

import { render } from './app'

if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('mount'))
    render()
  })
}

render()
