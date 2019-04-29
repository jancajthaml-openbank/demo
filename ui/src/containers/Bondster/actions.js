import {
  TOKENS_API_REQUEST_INIT,
  TOKENS_API_REQUEST_SUCCESS,
  TOKENS_API_REQUEST_FAILURE,
  CREATE_TOKEN_API_REQUEST_SUCCESS,
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

export const tokensApiRequestFailure = (error) => ({
  type: TOKENS_API_REQUEST_FAILURE,
  payload: {
    error
  }
})

export const createTokenApiRequestSuccess = (data) => ({
  type: CREATE_TOKEN_API_REQUEST_SUCCESS,
  payload: {
    data
  }
})
