import {
  ACCOUNTS_API_REQUEST_INIT,
  ACCOUNTS_API_REQUEST_SUCCESS,
  ACCOUNTS_API_REQUEST_FAILURE,

  TRANSACTIONS_API_REQUEST_INIT,
  TRANSACTIONS_API_REQUEST_SUCCESS,
  TRANSACTIONS_API_REQUEST_FAILURE,
} from './constants'

export const accountsApiRequestInit = (tenant) => ({
  type: ACCOUNTS_API_REQUEST_INIT,
  payload: {
    tenant,
  }
})

export const accountsApiRequestSuccess = (data) => ({
  type: ACCOUNTS_API_REQUEST_SUCCESS,
  payload: {
    data
  }
})

export const accountsApiRequestFailure = (err) => ({
  type: ACCOUNTS_API_REQUEST_FAILURE,
  payload: {
    err
  }
})

export const transactionsApiRequestInit = (tenant) => ({
  type: TRANSACTIONS_API_REQUEST_INIT,
  payload: {
    tenant,
  }
})

export const transactionsApiRequestSuccess = (data) => ({
  type: TRANSACTIONS_API_REQUEST_SUCCESS,
  payload: {
    data
  }
})

export const transactionsApiRequestFailure = (err) => ({
  type: TRANSACTIONS_API_REQUEST_FAILURE,
  payload: {
    err
  }
})
