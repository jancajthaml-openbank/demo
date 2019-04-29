import { connect } from 'react-redux'

import { New } from '../../components/Bondster'

import TokenService from './service'

import { createTokenApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewToken: createTokenApiRequestSuccess,
  createToken: TokenService.createToken,
}

const mapStateToProps = (state, props) => props

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
