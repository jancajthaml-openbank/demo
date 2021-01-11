import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery } from '@apollo/react-hooks'
import { GET_BONDSTER_TECHNICAL_ACCOUNTS_FOR_CURRENCY } from './queries'

const findAccount = (name, slice) =>
  slice.find((item) => item.name == name) || {
    name,
    balance: 0
  }

const BondsterOverview = (props) => {
  const { tenant } = useTenant()

  const { data, loading, error } = useQuery(GET_BONDSTER_TECHNICAL_ACCOUNTS_FOR_CURRENCY, {
    variables: {
      tenant: tenant,
      currency: props.currency,
    },
    pollInterval: 60 * 1000,
  });


  if (loading || error || !data.accounts) {
    return null
  }

  const deposit = findAccount(`${props.currency}_TYPE_INVESTOR_DEPOSIT`, data.accounts).balance
  const withdrawal = findAccount(`${props.currency}_TYPE_INVESTOR_WITHDRAWAL`, data.accounts).balance
  const bonus = findAccount(`${props.currency}_TYPE_INVESTOR_BONUS`, data.accounts).balance
  const fee = findAccount(`${props.currency}_TYPE_INVESTOR_INVESTMENT_FEE`, data.accounts).balance

  const interestFull = findAccount(`${props.currency}_TYPE_INTEREST_PAYMENT`, data.accounts).balance
  const interestParticipation = findAccount(`${props.currency}_TYPE_INTEREST_PARTICIPATION`, data.accounts).balance
  const interest = interestFull + interestParticipation

  const sanctionFull = findAccount(`${props.currency}_TYPE_SANCTION_PAYMENT`, data.accounts).balance
  const sanctionParticipation = findAccount(`${props.currency}_TYPE_SANCTION_PAYMENT_PARTICIPATION`, data.accounts).balance
  const sanction = sanctionFull + sanctionParticipation

  const profit = bonus-fee+interest+sanction
  const balance = deposit-withdrawal+profit

  const percentage = (((profit/(deposit-withdrawal)) * 100) || 0).toFixed(1);

  return (
    <div
      style={{
        margin: '-0.5rem 0',
        padding: '0 1.5rem'
      }}
    >
      <table>
        <tbody>
          <tr>
            <td>Deposit</td><td>{deposit}</td>
          </tr>
          <tr>
            <td>Withdrawal</td><td>{withdrawal}</td>
          </tr>
          <tr>
            <td>Bonus</td><td>{bonus}</td>
          </tr>
          <tr>
            <td>Fee</td><td>{fee}</td>
          </tr>
          <tr>
            <td>Interest</td><td>{interest}</td>
          </tr>
          <tr>
            <td>Sanction</td><td>{sanction}</td>
          </tr>
          <tr>
          <td colSpan={2}>
            <hr />
          </td>
          </tr>
          <tr>
            <td>Profit</td><td>{`${profit} (${percentage}%)`}</td>
          </tr>
          <tr>
            <td>Balance</td><td>{balance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BondsterOverview
