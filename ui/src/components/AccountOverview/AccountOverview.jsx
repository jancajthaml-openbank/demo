import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT } from './queries'


const AccountOverview = (props) => {
  const { tenant } = useTenant()

  const { data, loading, error } = useQuery(GET_ACCOUNT, {
    variables: {
      tenant: tenant,
      name: props.account,
    },
    pollInterval: 5 * 1000,
  });

  if (loading || error || data.account == null) {
    return (
      <div>
        <strong>
          {props.name}
        </strong>
        <span>
          {" ---"}
        </span>
      </div>
    )
  } else {
    return (
      <div>
        <strong>
          {props.name}
        </strong>
        <span>
          {` ${data.account.balance} ${data.account.currency}`}
        </span>
      </div>
    )
  }
}

export default AccountOverview
