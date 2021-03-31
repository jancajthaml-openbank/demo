import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useTenant } from 'containers/Tenant'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { GET_ACCOUNTS } from 'components/Account/queries'
import { GET_TRANSFERS } from 'components/Transaction/queries'

function Home() {
  const { tenant } = useTenant()

  const accounts = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: tenant,
      offset: 0,
      limit: 10000,
    },
    pollInterval: 60 * 1000,
  });

  const transfers = useQuery(GET_TRANSFERS, {
    variables: {
      tenant: tenant,
      offset: 0,
      limit: 10000,
    },
    pollInterval: 60 * 1000,
  });

  const getNumberOfAccounts = () => {
    if (accounts.loading || accounts.error) {
      return '---'
    }
    return accounts.data.accounts.length
  }

  const getNumberOfTransfers = () => {
    if (transfers.loading || transfers.error) {
      return '---'
    }
    return transfers.data.transfers.length
  }

  return (
    <React.Fragment>
      <header>
        <h1>Home</h1>
        <h6>Current tenant is <b>{tenant}</b>.</h6>
        <h6>That has <b>{getNumberOfAccounts()}</b> accounts</h6>
        <h6>and <b>{getNumberOfTransfers()}</b> transfers</h6>
      </header>
    </React.Fragment>
  )
}

export default Home
