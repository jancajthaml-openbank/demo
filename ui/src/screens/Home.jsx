import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useTenant } from 'containers/Tenant'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { GET_ACCOUNTS } from 'components/Account/queries'

function Home() {
  const { tenant } = useTenant()

  const { data, loading, error } = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: tenant,
    },
    pollInterval: 1000,
  });

  const getNumberOfAccounts = () => {
    if (loading || error) {
      return '---'
    }
    return data.Accounts.length
  }

  return (
    <React.Fragment>
      <header>
        <h1>Home</h1>
        <h6>Current tenant is <b>{tenant}</b>.</h6>
        <h6>That has <b>{getNumberOfAccounts()}</b> accounts</h6>
      </header>
    </React.Fragment>
  )
}

export default Home
