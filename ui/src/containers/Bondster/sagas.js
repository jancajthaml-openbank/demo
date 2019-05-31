import { takeLatest, call, put, take, race } from 'redux-saga/effects'

import {
  tokensApiRequestSuccess,
  tokensApiRequestFailure,
} from './actions'

import {
  TOKENS_API_REQUEST_INIT,
} from './constants'

import {
  APP_UNMOUNT
} from '../../setup/constants'

import TokenService from './service'

export const watchLoadTokens = function*() {
  yield takeLatest(
    TOKENS_API_REQUEST_INIT,
    loadTokensFlow,
  )
}

export const loadTokensFlow = function*(action) {
  yield race({
    loadTokens: call(loadTokens, action),
    cancel: take([APP_UNMOUNT])
  })
}

export const loadTokens = function*({ payload }) {
  try {
    const data = yield call(TokenService.getTokens, payload.tenant)
    yield put(tokensApiRequestSuccess(data))
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Bondster.sagas.loadTokens()', err)
    }
    yield put(tokensApiRequestFailure())
  }
}

export default [
  watchLoadTokens,
]
