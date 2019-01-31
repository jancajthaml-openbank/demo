import { combineReducers } from 'redux-immutable'

import fio from '../containers/Fio/reducer'
import bondster from '../containers/Bondster/reducer'

export default (injectedReducers) => combineReducers({
  fio,
  bondster,
  ...injectedReducers,
})
