import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { List } from '../../components/Bondster'

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTokens: tokensApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  tokens: state.bondster.tokens,
  tokensLoading: state.bondster.tokensLoading,
  tenant: props.tenant,
})

export default connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(List)
