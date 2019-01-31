import {
  TOKENS_API_REQUEST_INIT,
  TOKENS_API_REQUEST_SUCCESS,
  TOKENS_API_REQUEST_FAILURE,
} from './constants'

export const tokensApiRequestInit = (tenant) => ({
  type: TOKENS_API_REQUEST_INIT,
  payload: {
    tenant,
  }
})

export const tokensApiRequestSuccess = (data) => ({
  type: TOKENS_API_REQUEST_SUCCESS,
  payload: {
    data
  }
})

export const tokensApiRequestFailure = (err) => ({
  type: TOKENS_API_REQUEST_FAILURE,
  payload: {
    err
  }
})
