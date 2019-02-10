import { fromJS, List } from 'immutable'

import {
  ACCOUNTS_API_REQUEST_INIT,
  ACCOUNTS_API_REQUEST_SUCCESS,
  ACCOUNTS_API_REQUEST_FAILURE,

  TRANSACTIONS_API_REQUEST_INIT,
  TRANSACTIONS_API_REQUEST_SUCCESS,
  TRANSACTIONS_API_REQUEST_FAILURE,
} from './constants'

export const initialState = fromJS({
  accounts: [],
  accountsLoading: false,
  transactions: [],
  transactionsLoading: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ACCOUNTS_API_REQUEST_INIT: {
      return state
        .set('accountsLoading', true)
    }

    case ACCOUNTS_API_REQUEST_SUCCESS: {
      return state
        .set('accountsLoading', false)
        .set('accounts', List(payload.data))
    }

    case ACCOUNTS_API_REQUEST_FAILURE: {
      return state
        .set('accountsLoading', false)
        .set('accounts', List())
    }

    case TRANSACTIONS_API_REQUEST_INIT: {
      return state
        .set('transactionsLoading', true)
    }

    case TRANSACTIONS_API_REQUEST_SUCCESS: {
      return state
        .set('transactionsLoading', false)
        .set('transactions', List(payload.data))
    }

    case TRANSACTIONS_API_REQUEST_FAILURE: {
      return state
        .set('transactionsLoading', false)
        .set('transactions', List())
    }

    default: {
      return state
    }

  }
}
