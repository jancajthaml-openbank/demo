import React from 'react'

import PropTypes from 'prop-types'

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


    return (
      <ul>
        {transactions.length > 0
          ? (
            transactions.map((transaction) => (
            <li key={transaction.transaction}>
              {`${transaction.transaction} (${transaction.status})`}
              {transaction.transfers.length > 0
                ? (
                    <ul>
                      {transaction.transfers.map((transfer) => (
                        <li key={`${transaction.transaction}/${transfer.transfer}`}>
                          {JSON.stringify(transfer)}
                        </li>
                      ))}
                    </ul>
                  )
                : null
              }
            </li>
          )))
          : 'No data'
        }
      </ul>
    )
  }
}

export default List
