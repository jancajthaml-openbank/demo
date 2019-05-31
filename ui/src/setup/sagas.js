import tenantSagas from '../containers/Tenant/sagas'
import fioSagas from '../containers/Fio/sagas'
import bondsterSagas from '../containers/Bondster/sagas'
import coreSagas from '../containers/Core/sagas'

export default [
  ...tenantSagas,
  ...coreSagas,
  ...fioSagas,
  ...bondsterSagas,
]
