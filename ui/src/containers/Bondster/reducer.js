//import { fromJS, List } from 'immutable'

import {
  TOKENS_API_REQUEST_INIT,
  TOKENS_API_REQUEST_SUCCESS,
  TOKENS_API_REQUEST_FAILURE,
  CREATE_TOKEN_API_REQUEST_SUCCESS,
} from './constants'

export const initialState = {
  tokens: [],
  tokensLoading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_TOKEN_API_REQUEST_SUCCESS: {
      return {
        tokens: [
          ...state.tokens,
          payload.data
        ],
        tokensLoading: state.tokensLoading
      }
    }

    case TOKENS_API_REQUEST_INIT: {
      return {
        tokens: state.tokens,
        tokensLoading: true,
      }
    }

    case TOKENS_API_REQUEST_SUCCESS: {
      return {
        tokens: payload.data,
        tokensLoading: false,
      }
    }

    case TOKENS_API_REQUEST_FAILURE: {
      return {
        tokens: [],
        tokensLoading: false,
      }
    }

    default: {
      return state
    }

  }
}
