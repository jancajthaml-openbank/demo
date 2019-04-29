import React from 'react'

import VirtualList from 'react-virtualized/List'
import AutoSizer from 'react-virtualized/AutoSizer'

import PropTypes from 'prop-types'

class List extends React.Component {

  static propTypes = {
    loadAccounts: PropTypes.func.isRequired,
    tenant: PropTypes.string.isRequired,
    accounts: PropTypes.array,
    accountsLoading: PropTypes.bool,
  }

  componentDidMount() {
    this.props.loadAccounts(this.props.tenant)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tenant !== this.props.tenant) {
      this.props.loadAccounts(this.props.tenant)
    }
  }

  renderRow({ index, key, style }) {
    const item = this.props.accounts[index]

    return (
      <div key={key} style={style}>
        <div>{item.name}</div>
      </div>
    );
  }

  render() {
    const { accounts, accountsLoading } = this.props

    if (accountsLoading) {
      return "Loading"
    }
    if (accounts.length === 0) {
      return "No Data"
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
                rowCount={accounts.length}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }
}

export default List
