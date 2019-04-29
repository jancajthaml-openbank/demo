import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { List } from '../../components/Transactions'

import { transactionsApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTransactions: transactionsApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  transactions: state.core.transactions,
  transactionsLoading: state.core.transactionsLoading,
  tenant: props.tenant,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(List)
