import {
  ACCOUNTS_API_REQUEST_INIT,
  ACCOUNTS_API_REQUEST_SUCCESS,
  ACCOUNTS_API_REQUEST_FAILURE,
  CREATE_ACCOUNT_API_REQUEST_SUCCESS,
  TRANSACTIONS_API_REQUEST_INIT,
  TRANSACTIONS_API_REQUEST_SUCCESS,
  TRANSACTIONS_API_REQUEST_FAILURE,
} from './constants'

export const initialState = {
  accounts: [],
  accountsLoading: false,
  transactions: [],
  transactionsLoading: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_ACCOUNT_API_REQUEST_SUCCESS: {
      return {
        accounts: [
          ...state.accounts,
          { name: payload.accountNumber }
        ],
        accountsLoading: state.accountsLoading,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }
    }

    case ACCOUNTS_API_REQUEST_INIT: {
      return {
        accounts: state.accounts,
        accountsLoading: true,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }
    }

    case ACCOUNTS_API_REQUEST_SUCCESS: {
      return {
        accounts: payload.data,
        accountsLoading: false,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }
    }

    case ACCOUNTS_API_REQUEST_FAILURE: {
      return {
        accounts: [],
        accountsLoading: false,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }
    }

    case TRANSACTIONS_API_REQUEST_INIT: {
      return {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: state.transactions,
        transactionsLoading: true,
      }
    }

    case TRANSACTIONS_API_REQUEST_SUCCESS: {
      return {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: payload.data,
        transactionsLoading: false,
      }
    }

    case TRANSACTIONS_API_REQUEST_FAILURE: {
      return {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: [],
        transactionsLoading: true,
      }
    }

    default: {
      return state
    }

  }
}
