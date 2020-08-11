import React from 'react'
import { List, New } from 'components/Bondster'
import { Card } from 'components/Card'
import { AccountOverview } from 'components/AccountOverview'
import { ErrorBoundary } from 'components/ErrorBoundary'

function Bondster(props) {
  return (
    <React.Fragment>
      <header>
        <h1>Bondster</h1>
      </header>
      <main>
        <Card>
          <h6>Overview CZK</h6>
          <AccountOverview account="CZK_TYPE_NOSTRO" name="Nostro" />
          <hr />
          <AccountOverview account="CZK_TYPE_INVESTOR_DEPOSIT" name="Deposit" />
          <AccountOverview account="CZK_TYPE_INVESTOR_WITHDRAWAL" name="Withdrawal" />
          <AccountOverview account="CZK_TYPE_INVESTOR_BONUS" name="Investor Bonus" />
          <AccountOverview account="CZK_TYPE_INTEREST_PAYMENT" name="Interest Direct" />
          <AccountOverview account="CZK_TYPE_INTEREST_PAYMENT_PARTICIPATION" name="Interest Participation" />
          <AccountOverview account="CZK_TYPE_SANCTION_PAYMENT" name="Sanction Direct" />
          <AccountOverview account="CZK_TYPE_SANCTION_PAYMENT_PARTICIPATION" name="Sanction Participation" />
          <AccountOverview account="CZK_TYPE_INVESTOR_INVESTMENT_FEE" name="Fee" />
        </Card>
        <Card>
          <h6>Overview EUR</h6>
          <AccountOverview account="EUR_TYPE_NOSTRO" name="Nostro" />
          <hr />
          <AccountOverview account="EUR_TYPE_INVESTOR_DEPOSIT" name="Deposit" />
          <AccountOverview account="EUR_TYPE_INVESTOR_WITHDRAWAL" name="Withdrawal" />
          <AccountOverview account="EUR_TYPE_INVESTOR_BONUS" name="Investor Bonus" />
          <AccountOverview account="EUR_TYPE_INTEREST_PAYMENT" name="Interest Direct" />
          <AccountOverview account="EUR_TYPE_INTEREST_PAYMENT_PARTICIPATION" name="Interest Participation" />
          <AccountOverview account="EUR_TYPE_SANCTION_PAYMENT" name="Sanction Direct" />
          <AccountOverview account="EUR_TYPE_SANCTION_PAYMENT_PARTICIPATION" name="Sanction Participation" />
          <AccountOverview account="EUR_TYPE_INVESTOR_INVESTMENT_FEE" name="Fee" />
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
