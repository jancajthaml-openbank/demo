import React from 'react'
import { List, New } from 'components/Fio'
import { Card } from 'components/Card'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Fio() {
  return (
    <React.Fragment>
      <header>
        <h1>Fio</h1>
      </header>
      <main>
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

export default Fio
