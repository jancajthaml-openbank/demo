import { fromJS, List } from 'immutable'

import {
  TOKENS_API_REQUEST_INIT,
  TOKENS_API_REQUEST_SUCCESS,
  TOKENS_API_REQUEST_FAILURE,
} from './constants'

export const initialState = fromJS({
  tokens: [],
  tokensLoading: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOKENS_API_REQUEST_INIT: {
      return state
        .set('tokensLoading', true)
    }

    case TOKENS_API_REQUEST_SUCCESS: {
      return state
        .set('tokensLoading', false)
        .set('tokens', fromJS(payload.data))
    }

    default: {
      return state
        .set('tokensLoading', false)
        .set('tokens', List())
    }

  }
}
