import React from 'react'

import ReactTable from 'react-table'
import moment from 'moment'
import PropTypes from 'prop-types'
import bigDecimal from 'js-big-decimal'

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

    const transactionColumns = [{
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
    )
  }
}

export default List
