import Home from './screens/Home'
import Account from './screens/Account'
import Transaction from './screens/Transaction'
import Fio from './screens/Fio'
import Bondster from './screens/Bondster'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/account',
    exact: true,
    component: Account,
  },
  {
    path: '/transaction',
    exact: true,
    component: Transaction,
  },
  {
    path: '/fio',
    exact: true,
    component: Fio,
  },
  {
    path: '/bondster',
    exact: true,
    component: Bondster,
  }
]

export default routes
