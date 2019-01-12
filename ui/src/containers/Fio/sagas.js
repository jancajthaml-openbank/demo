import { takeLatest, call, put, take, race } from 'redux-saga/effects'

import {
  tokensApiRequestSuccess,
  tokensApiRequestFailure,
} from './actions'

import {
  APP_UNMOUNT,
  TOKENS_API_REQUEST_INIT,
} from './constants'

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
    if (!PRODUCTION) {
      console.error('Fio.sagas.loadTokens()', err)
    }
    yield put(tokensApiRequestFailure())
  }
}

export default [
  watchLoadTokens,
]
