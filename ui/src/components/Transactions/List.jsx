import React from 'react'

import VirtualList from 'react-virtualized/List'
import AutoSizer from 'react-virtualized/AutoSizer'

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

  renderRow({ index, key, style }) {
    const item = this.props.transactions[index]

    return (
      <div key={key} style={style}>
      <div>
        <div>{`${item.id} (${item.status})`}</div>

        <div>
        {item.transfers.map((transfer) => (
          <div key={`${key}/${item.id}/${transfer.id}`}>
            {JSON.stringify(transfer)}
          </div>
        ))}
        </div>
        </div>

      </div>
    )
  }

  render() {
    const { transactions, transactionsLoading } = this.props

    if (transactionsLoading) {
      return (
        <div>
          Loading
        </div>
      )
    }
    if (transactions.length === 0) {
      return (
        <div>
          No Data
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', height: 200 }}>
        <div style={{ flex: '1 1 auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <VirtualList
                width={width}
                height={height}
                rowHeight={20}
                rowRenderer={this.renderRow.bind(this)}
                rowCount={transactions.length}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }
}

export default List
