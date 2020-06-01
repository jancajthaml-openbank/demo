import Home from './screens/Home'
import Account from './screens/Account'
import Transaction from './screens/Transaction'
import Fio from './screens/Fio'
import Bondster from './screens/Bondster'

const routes =  [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/transaction',
    component: Transaction,
  },
  {
    path: '/fio',
    component: Fio,
  },
  {
    path: '/bondster',
    component: Bondster,
  }
]

export default routes
