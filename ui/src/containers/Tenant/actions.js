import {
  TENANTS_API_REQUEST_INIT,
  TENANTS_API_REQUEST_SUCCESS,
  TENANTS_API_REQUEST_FAILURE,
  TENANTS_CHANGE,
} from './constants'

export const tenantsApiRequestInit = (tenant) => ({
  type: TENANTS_API_REQUEST_INIT,
  payload: {}
})

export const tenantsApiRequestSuccess = (data) => ({
  type: TENANTS_API_REQUEST_SUCCESS,
  payload: {
    data
  }
})

export const tenantsApiRequestFailure = (error) => ({
  type: TENANTS_API_REQUEST_FAILURE,
  payload: {
    error
  }
})

export const changeTenant = (tenant) => ({
  type: TENANTS_CHANGE,
  payload: {
    data: tenant,
  }
})


