import fioSagas from '../containers/Fio/sagas'
import bondsterSagas from '../containers/Bondster/sagas'
import coreSagas from '../containers/Core/sagas'

export default [
  ...coreSagas,
  ...fioSagas,
  ...bondsterSagas,
]
