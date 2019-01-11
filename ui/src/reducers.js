import { combineReducers } from 'redux-immutable'

import App from './containers/App/reducer'

export default (injectedReducers) => combineReducers({
  App,
  ...injectedReducers,
})
