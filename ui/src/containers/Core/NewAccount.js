import { connect } from 'react-redux'

import { New } from '../../components/Accounts'

import CoreService from './service'

import { createAccountApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewAccount: createAccountApiRequestSuccess,
  createAccount: CoreService.createAccount,
}

const mapStateToProps = (state, props) => props

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
