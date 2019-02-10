import { takeLatest, call, put, take, race } from 'redux-saga/effects'

import {
  accountsApiRequestSuccess,
  accountsApiRequestFailure,
  transactionsApiRequestSuccess,
  transactionsApiRequestFailure,
} from './actions'

import {
  APP_UNMOUNT,
  ACCOUNTS_API_REQUEST_INIT,
  TRANSACTIONS_API_REQUEST_INIT,
} from './constants'

import CoreService from './service'

export const watchLoadAccounts = function*() {
  yield takeLatest(
    ACCOUNTS_API_REQUEST_INIT,
    loadAccountsFlow,
  )
}

export const loadAccountsFlow = function*(action) {
  yield race({
    loadTokens: call(loadAccounts, action),
    cancel: take([APP_UNMOUNT])
  })
}

export const loadAccounts = function*({ payload }) {
  try {
    const data = yield call(CoreService.getAccounts, payload.tenant)
    yield put(accountsApiRequestSuccess(data))
  } catch (err) {
    if (!PRODUCTION) {
      console.error('Core.sagas.loadAccounts()', err)
    }
    yield put(accountsApiRequestFailure())
  }
}

export const watchLoadTransactions = function*() {
  yield takeLatest(
    TRANSACTIONS_API_REQUEST_INIT,
    loadTransactionsFlow,
  )
}

export const loadTransactionsFlow = function*(action) {
  yield race({
    loadTransactions: call(loadTransactions, action),
    cancel: take([APP_UNMOUNT])
  })
}

export const loadTransactions = function*({ payload }) {
  try {
    const data = yield call(CoreService.getTransactions, payload.tenant)
    yield put(transactionsApiRequestSuccess(data))
  } catch (err) {
    if (!PRODUCTION) {
      console.error('Core.sagas.loadTransactions()', err)
    }
    yield put(transactionsApiRequestFailure())
  }
}

export default [
  watchLoadAccounts,
  watchLoadTransactions,
]
