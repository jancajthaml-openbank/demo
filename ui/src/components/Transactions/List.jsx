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
              <pre>
                {JSON.stringify(transaction)}
              </pre>
            </li>
          )))
          : 'No data'
        }
      </ul>
    )
  }
}

export default List
