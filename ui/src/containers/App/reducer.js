import { fromJS } from 'immutable'

export const initialState = fromJS({

})

export default (state = initialState, { type, payload }) => {
  return state
}
