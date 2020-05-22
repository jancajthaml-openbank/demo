import React from 'react'

import Table from './Table'

import moment from 'moment'
import PropTypes from 'prop-types'
import bigDecimal from 'js-big-decimal'

const renderRowSubComponent = ({ row }) => {
  return (
    <pre
      style={{
        fontSize: '10px',
      }}
    >
      <code>{JSON.stringify(row.original.transfers, null, 2)}</code>
    </pre>
  )
}

class List extends React.Component {

  static propTypes = {
    loadTransactions: PropTypes.func.isRequired,
    tenant: PropTypes.string.isRequired,
    transactions: PropTypes.array,
    transactionsLoading: PropTypes.bool,
  }

  componentDidMount() {
    this.props.loadTransactions(this.props.tenant)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tenant !== this.props.tenant) {
      this.props.loadTransactions(this.props.tenant)
    }
  }

  render() {
    const { transactions, transactionsLoading } = this.props

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

    /*
      <ReactTable
        filterable
        minRows={5}
        defaultPageSize={5}
        loading={transactionsLoading}
        data={transactions}
        columns={transactionColumns}
        SubComponent={(row) => {
          return (
            <div style={{ padding: '0 0 0 35px' }}>
              <ReactTable
                data={row.original.transfers}
                columns={transferColumns}
                showPagination={false}
                defaultPageSize={row.original.transfers.length}
                minRows={row.original.transfers.length}
              />
            </div>
          )
        }}
      />
      */

    return (
      <Table
        columns={columns}
        data={transactions}
        renderRowSubComponent={renderRowSubComponent}
      />
    )
  }
}

export default List
