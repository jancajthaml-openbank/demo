import tenantSagas from '../containers/Tenant/sagas'
import coreSagas from '../containers/Core/sagas'

export default [
  ...tenantSagas,
  ...coreSagas,
]
