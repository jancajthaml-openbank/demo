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

      console.time("CREATE_ACCOUNT_API_REQUEST_SUCCESS")

      const nextState = {
        accounts: [
          ...state.accounts,
          { name: payload.accountNumber }
        ],
        accountsLoading: state.accountsLoading,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }

      console.timeEnd("CREATE_ACCOUNT_API_REQUEST_SUCCESS")

      return nextState
    }

    case ACCOUNTS_API_REQUEST_INIT: {

      console.time("ACCOUNTS_API_REQUEST_INIT")

      const nextState = {
        accounts: state.accounts,
        accountsLoading: true,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }

      console.timeEnd("ACCOUNTS_API_REQUEST_INIT")

      return nextState
    }

    case ACCOUNTS_API_REQUEST_SUCCESS: {

      console.time("ACCOUNTS_API_REQUEST_SUCCESS")

      const nextState = {
        accounts: payload.data,
        accountsLoading: false,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }

      console.timeEnd("ACCOUNTS_API_REQUEST_SUCCESS")

      return nextState
    }

    case ACCOUNTS_API_REQUEST_FAILURE: {

      console.time("ACCOUNTS_API_REQUEST_FAILURE")

      const nextState = {
        accounts: [],
        accountsLoading: false,
        transactions: state.transactions,
        transactionsLoading: state.transactionsLoading,
      }

      console.timeEnd("ACCOUNTS_API_REQUEST_FAILURE")

      return nextState
    }

    case TRANSACTIONS_API_REQUEST_INIT: {

      console.time("TRANSACTIONS_API_REQUEST_INIT")

      const nextState = {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: state.transactions,
        transactionsLoading: true,
      }

      console.timeEnd("TRANSACTIONS_API_REQUEST_INIT")

      return nextState
    }

    case TRANSACTIONS_API_REQUEST_SUCCESS: {

      console.time("TRANSACTIONS_API_REQUEST_SUCCESS")

      const nextState = {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: payload.data,
        transactionsLoading: false,
      }

      console.timeEnd("TRANSACTIONS_API_REQUEST_SUCCESS")

      return nextState
    }

    case TRANSACTIONS_API_REQUEST_FAILURE: {
      console.time("TRANSACTIONS_API_REQUEST_FAILURE")

      const nextState = {
        accounts: state.accounts,
        accountsLoading: state.accountsLoading,
        transactions: [],
        transactionsLoading: true,
      }

      console.timeEnd("TRANSACTIONS_API_REQUEST_FAILURE")

      return nextState
    }

    default: {
      return state
    }

  }
}
