import { connect } from 'react-redux'

import { List } from '../../components/Transactions'

// https://reactjs.org/docs/code-splitting.html

import { transactionsApiRequestInit } from './actions'

const mapDispatchToProps = (dispatch) => ({
  loadTransactions: (tenant) => dispatch(transactionsApiRequestInit(tenant))
})

const mapStateToProps = (state, props) => ({
  transactions: state.getIn(['core', 'transactions']).toJS(),
  transactionsLoading: state.getIn(['core', 'transactionsLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
