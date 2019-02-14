import { connect } from 'react-redux'

import { List } from '../../components/Transactions'

import { transactionsApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTransactions: transactionsApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  transactions: state.getIn(['core', 'transactions']).toJS(),
  transactionsLoading: state.getIn(['core', 'transactionsLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
