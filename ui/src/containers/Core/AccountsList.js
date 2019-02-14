import { connect } from 'react-redux'

import { List } from '../../components/Accounts'

import { accountsApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadAccounts: accountsApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  accounts: state.getIn(['core', 'accounts']).toJS(),
  accountsLoading: state.getIn(['core', 'accountsLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
