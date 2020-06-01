import React from 'react'
import moment from 'moment'
import bigDecimal from 'js-big-decimal'
import { useTenant } from 'containers/Tenant'
import { useQuery } from '@apollo/react-hooks'
import Table from './Table'
import { GET_TRANSACTIONS } from './queries'

const renderRowSubComponent = (data) => (
  <pre
    style={{
      fontSize: '10px',
    }}
  >
    <code>{JSON.stringify(data.row.original.transfers, null, 2)}</code>
  </pre>
)

const List = (props) => {
  const { tenant } = useTenant()

  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: {
      tenant: tenant,
    },
    pollInterval: 10000,
  });

  if (error) {
    return null
  }

  const columns = [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getExpandedToggleProps prop-getter
        // to build the expander.
        <span {...row.getExpandedToggleProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Status',
      accessor: 'status',
      maxWidth: 90,
    },
  ]

  const transactionColumns = [
  {
    Header: 'ID',
    accessor: 'id',
  }, {
    Header: 'Status',
    accessor: 'status',
    maxWidth: 90,
  }]

  const transferColumns = [{
    Header: 'ID',
    accessor: 'id',
  }, {
    Header: 'Amount',
    id: 'amount',
    accessor: (row) => `${new bigDecimal(row.amount).round(2, bigDecimal.RoundingModes.HALF_EVEN).getValue()} ${row.currency}`,
  }, {
    Header: 'Value Date',
    id: 'valueDate',
    accessor: (row) => moment(row.credit.valueDate).utc().format('DD.MM.YYYY HH:mm'),
    maxWidth: 130,
  }, {
    Header: 'Credit',
    id: 'credit',
    accessor: (row) => `${row.credit.tenant}/${row.credit.name}`,
  }, {
    Header: 'Debit',
    id: 'debit',
    accessor: (row) => `${row.debit.tenant}/${row.debit.name}`,
  }]

  return (
    <Table
      columns={columns}
      data={data.Transactions || []}
      renderRowSubComponent={renderRowSubComponent}
    />
  )
}

export default List
