import { connect } from 'react-redux'

import { List } from '../../components/Fio'

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = {
  loadTokens: tokensApiRequestInit,
}

const mapStateToProps = (state, props) => ({
  tokens: state.getIn(['fio', 'tokens']).toJS(),
  tokensLoading: state.getIn(['fio', 'tokensLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
