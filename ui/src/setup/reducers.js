import { combineReducers } from 'redux'

import tenant from '../containers/Tenant/reducer'
import core from '../containers/Core/reducer'

export default (injectedReducers) => combineReducers({
  tenant,
  core,
  ...injectedReducers,
})
