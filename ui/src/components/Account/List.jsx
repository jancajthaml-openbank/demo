import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery } from '@apollo/react-hooks'
import Table from './Table'
import { GET_ACCOUNTS } from './queries'

const List = (props) => {
  const tenant = useTenant()

  const { data, loading, error } = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: tenant,
    },
    //pollInterval: 1000,
  });

  const columns = [{
    Header: 'Name',
    accessor: 'name'
  }, {
    Header: 'Currency',
    accessor: 'currency'
  }, {
    Header: 'Format',
    accessor: 'format'
  }]

  return (
    <Table
      loading={loading}
      columns={columns}
      data={data.Accounts || []}
    />
  )
}

export default List
