import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { List } from '../../components/Accounts'

import { accountsApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadAccounts: accountsApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  accounts: state.core.accounts,
  accountsLoading: state.core.accountsLoading,
  tenant: props.tenant,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(List)
