import { fromJS, List } from 'immutable'

import {
  TOKENS_API_REQUEST_INIT,
  TOKENS_API_REQUEST_SUCCESS,
  TOKENS_API_REQUEST_FAILURE,
  CREATE_TOKEN_API_REQUEST_SUCCESS,
} from './constants'

export const initialState = fromJS({
  tokens: [],
  tokensLoading: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_TOKEN_API_REQUEST_SUCCESS: {
      return state
        .set('tokens', state.get('tokens').merge(List([payload.data])))
    }

    case TOKENS_API_REQUEST_INIT: {
      return state
        .set('tokensLoading', true)
    }

    case TOKENS_API_REQUEST_SUCCESS: {
      return state
        .set('tokensLoading', false)
        .set('tokens', List(payload.data))
    }

    case TOKENS_API_REQUEST_FAILURE: {
      return state
        .set('tokensLoading', false)
        .set('tokens', List())
    }

    default: {
      return state
    }

  }
}
