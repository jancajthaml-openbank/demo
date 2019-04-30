import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { New } from '../../components/Fio'

import TokenService from './service'

import { createTokenApiRequestSuccess } from './actions'

const mapDispatchToProps = {
  onNewToken: createTokenApiRequestSuccess,
}

const mapStateToProps = (state, props) => ({
  tenant: props.tenant,
  createToken: TokenService.createToken,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(New)
