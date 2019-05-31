import {
  TENANTS_API_REQUEST_INIT,
  TENANTS_API_REQUEST_SUCCESS,
  TENANTS_API_REQUEST_FAILURE,
  TENANTS_CHANGE,
} from './constants'

export const initialState = {
  tenants: null,
  tenant: null,
  loading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TENANTS_CHANGE: {
      return {
        tenants: state.tenants,
        tenant: payload.data,
        loading: state.loading,
      }
    }

    case TENANTS_API_REQUEST_INIT: {
      return {
        tenants: state.tenants,
        tenant: state.tenant,
        loading: true,
      }
    }

    case TENANTS_API_REQUEST_SUCCESS: {
      return {
        tenants: payload.data,
        tenant: payload.data.indexOf(state.tenant) !== -1 ? state.tenant : payload.data[0],
        loading: false,
      }
    }

    case TENANTS_API_REQUEST_FAILURE: {
      return {
        tenants: [],
        tenant: null,
        loading: false
      }
    }

    default: {
      return state
    }

  }
}
