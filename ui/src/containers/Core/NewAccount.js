import { connect } from 'react-redux'

import { New } from '../../components/Accounts'

import CoreService from './service'

import { createAccountApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewAccount: createAccountApiRequestSuccess,
}

const mapStateToProps = (state, props) => ({
  createAccount: CoreService.createAccount,
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
