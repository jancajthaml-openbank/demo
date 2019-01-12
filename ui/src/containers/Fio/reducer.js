import { fromJS } from 'immutable'

import { TOKENS_API_REQUEST_SUCCESS } from './constants'

export const initialState = fromJS({
  tokens: []
})

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOKENS_API_REQUEST_SUCCESS: {
      return state.set('tokens', fromJS(payload.data))
    }

    default: {
      return state
    }

  }
}
