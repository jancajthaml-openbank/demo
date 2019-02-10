import React from 'react'

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

  render() {
    const { accounts, accountsLoading } = this.props

    return (
      <ul>
        {accounts.length > 0
          ? (
            accounts.map((account) => (
            <li key={account.name}>
              {account.name}
            </li>
          )))
          : 'No data'
        }
      </ul>
    )
  }
}

export default List
