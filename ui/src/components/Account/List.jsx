import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery } from '@apollo/react-hooks'
import Table from './Table'
import { GET_ACCOUNTS } from './queries'

const List = (props) => {
  const { tenant } = useTenant()

  const { data, loading, error } = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: tenant,
    },
    pollInterval: 10000,
  });

  if (error) {
    return null
  }

  const columns = [{
    Header: 'Name',
    list: 'name',
    Cell: ({ row }) => {

      switch (row.original.format) {

        case 'IBAN': {
          // FIXME component
          return (
            <span>
              {row.original.name.match(/.{1,4}/g).join(' ')}
            </span>
          )
        }

        case 'BONDSTER_TECHNICAL': {
          // FIXME component
          return (
            <span>
              {row.original.name.replace(`${row.original.currency}_TYPE_`, '').replace('_FINANCIAL', '')}
            </span>
          )
        }

        case 'BONDSTER_ORIGINATOR': {
        // FIXME component
          return (
            <span>
              {row.original.name.replace(`${row.original.currency}_ORIGINATOR_`, '')}
            </span>
          )
        }

        default: {
          return row.original.name
        }
      }
    },
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
