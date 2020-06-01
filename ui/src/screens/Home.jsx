import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useTenant } from 'containers/Tenant'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { GET_ACCOUNTS } from 'components/Account/queries'
import { GET_TRANSACTIONS } from 'components/Transaction/queries'

function Home() {
  const { tenant } = useTenant()

  const accounts = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: tenant,
    },
    pollInterval: 10000,
  });

  const transactions = useQuery(GET_TRANSACTIONS, {
    variables: {
      tenant: tenant,
    },
    pollInterval: 10000,
  });

  const getNumberOfAccounts = () => {
    if (accounts.loading || accounts.error) {
      return '---'
    }
    return accounts.data.Accounts.length
  }

  const getNumberOfTransactions = () => {
    if (transactions.loading || transactions.error) {
      return '---'
    }
    return transactions.data.Transactions.length
  }

  return (
    <React.Fragment>
      <header>
        <h1>Home</h1>
        <h6>Current tenant is <b>{tenant}</b>.</h6>
        <h6>That has <b>{getNumberOfAccounts()}</b> accounts</h6>
        <h6>and <b>{getNumberOfTransactions()}</b> transactions</h6>
      </header>
    </React.Fragment>
  )
}

export default Home
