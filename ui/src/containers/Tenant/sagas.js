import { takeLatest, call, put, take, race } from 'redux-saga/effects'

import {
  tenantsApiRequestSuccess,
  tenantsApiRequestFailure,
} from './actions'

import {
  TENANTS_API_REQUEST_INIT,
} from './constants'

import {
  APP_UNMOUNT
} from '../../setup/constants'

import TenantService from './service'

export const watchLoadTenants = function*() {
  yield takeLatest(
    TENANTS_API_REQUEST_INIT,
    loadTenantsFlow,
  )
}

export const loadTenantsFlow = function*(action) {
  yield race({
    loadTenants: call(loadTenants, action),
    cancel: take([APP_UNMOUNT])
  })
}

export const loadTenants = function*() {
  try {
    const data = yield call(TenantService.getTenants)
    yield put(tenantsApiRequestSuccess(data))
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Tenant.sagas.loadTenants()', err)
    }
    yield put(tenantsApiRequestFailure())
  }
}

export default [
  watchLoadTenants,
]
