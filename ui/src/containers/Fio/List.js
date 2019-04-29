import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { List } from '../../components/Fio'

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTokens: tokensApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  tokens: state.fio.tokens,
  tokensLoading: state.fio.tokensLoading,
  tenant: props.tenant,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(List)
