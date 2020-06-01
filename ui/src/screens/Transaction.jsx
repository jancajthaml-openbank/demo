import React from 'react'
import { List } from 'components/Transaction'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Transaction() {
  return (
    <React.Fragment>
      <header>
        <h1>Transactions</h1>
      </header>
      <main>
        <Card>
          <h6>Transactions</h6>
          <List />
        </Card>
      </main>
    </React.Fragment>
  )
}

export default Transaction
