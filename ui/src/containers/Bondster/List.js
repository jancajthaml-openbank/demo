import { connect } from 'react-redux'

import { List } from '../../components/Bondster'

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTokens: tokensApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  tokens: state.getIn(['bondster', 'tokens']).toJS(),
  tokensLoading: state.getIn(['bondster', 'tokensLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
