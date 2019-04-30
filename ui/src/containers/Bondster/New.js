import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { New } from '../../components/Bondster'

import TokenService from './service'

import { createTokenApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewToken: createTokenApiRequestSuccess,
}

const mapStateToProps = (state, props) => ({
  createToken: TokenService.createToken,
  tenant: props.tenant,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(New)
