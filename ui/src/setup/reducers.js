import { combineReducers } from 'redux-immutable'

import fio from '../containers/Fio/reducer'

export default (injectedReducers) => combineReducers({
  fio,
  ...injectedReducers,
})
