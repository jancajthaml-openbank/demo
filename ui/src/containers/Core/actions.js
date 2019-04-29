import {
  ACCOUNTS_API_REQUEST_INIT,
  ACCOUNTS_API_REQUEST_SUCCESS,
  ACCOUNTS_API_REQUEST_FAILURE,

  CREATE_ACCOUNT_API_REQUEST_SUCCESS,

  TRANSACTIONS_API_REQUEST_INIT,
  TRANSACTIONS_API_REQUEST_SUCCESS,
  TRANSACTIONS_API_REQUEST_FAILURE,
} from './constants'

export const createAccountApiRequestSuccess = (accountNumber) => ({
  type: CREATE_ACCOUNT_API_REQUEST_SUCCESS,
  payload: {
    accountNumber,
  }
})

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

export const accountsApiRequestFailure = (error) => ({
  type: ACCOUNTS_API_REQUEST_FAILURE,
  payload: {
    error
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

export const transactionsApiRequestFailure = (error) => ({
  type: TRANSACTIONS_API_REQUEST_FAILURE,
  payload: {
    error
  }
})
