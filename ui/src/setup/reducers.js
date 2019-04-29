import { combineReducers } from 'redux'

import fio from '../containers/Fio/reducer'
import core from '../containers/Core/reducer'
import bondster from '../containers/Bondster/reducer'

export default (injectedReducers) => combineReducers({
  fio,
  bondster,
  core,
  ...injectedReducers,
})
