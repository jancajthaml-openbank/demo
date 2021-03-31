import React from 'react'
import { List, New } from 'components/Account'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Account() {
  return (
    <React.Fragment>
      <header>
        <h1>Accounts</h1>
      </header>
      <main>
        <Card>
          <h6>New Account</h6>
          <New />
        </Card>
        <Card>
          <h6>Accounts</h6>
          <List />
        </Card>
      </main>
    </React.Fragment>
  )
}

export default Account
