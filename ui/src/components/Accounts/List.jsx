import React from 'react'

import Table from './Table'

import PropTypes from 'prop-types'

// FIXME convert to react hook

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

  render() {
    const { accounts, accountsLoading } = this.props

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
        loading={accountsLoading}
        columns={columns}
        data={accounts}
      />
    )
  }
}

export default List
