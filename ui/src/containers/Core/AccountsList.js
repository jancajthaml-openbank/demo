import { connect } from 'react-redux'

import { List } from '../../components/Accounts'

// https://reactjs.org/docs/code-splitting.html

import { accountsApiRequestInit } from './actions'

const mapDispatchToProps = (dispatch) => ({
  loadAccounts: (tenant) => dispatch(accountsApiRequestInit(tenant))
})

const mapStateToProps = (state, props) => ({
  accounts: state.getIn(['core', 'accounts']).toJS(),
  accountsLoading: state.getIn(['core', 'accountsLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
