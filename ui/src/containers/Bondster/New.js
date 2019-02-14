import { connect } from 'react-redux'

import { New } from '../../components/Bondster'

import TokenService from './service'

import { createTokenApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewToken: createTokenApiRequestSuccess,
}

const mapStateToProps = (state, props) => ({
  createToken: TokenService.createToken,
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
