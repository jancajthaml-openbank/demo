import React from 'react'
import { List, New } from 'components/Bondster'
import { Card } from 'components/Card'
//import { AccountOverview } from 'components/AccountOverview'
import { BondsterOverview } from 'components/BondsterOverview'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Bondster() {
  return (
    <React.Fragment>
      <header>
        <h1>Bondster</h1>
      </header>
      <main>
        <Card>
          <h6>Overview CZK</h6>
          <BondsterOverview currency="CZK" />
        </Card>
        <Card>
          <h6>Overview EUR</h6>
          <BondsterOverview currency="EUR" />
        </Card>
        <Card>
          <h6>New Token</h6>
          <New />
        </Card>
        <Card>
          <h6>Tokens</h6>
          <List />
        </Card>
      </main>
    </React.Fragment>
  )
}

export default Bondster
