import { connect } from 'react-redux'

import { Tokens } from '../../components/Fio'

// https://reactjs.org/docs/code-splitting.html

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = (dispatch) => ({
  loadTokens: (tenant) => dispatch(tokensApiRequestInit(tenant))
})

const mapStateToProps = (state, props) => ({
  tokens: state.getIn(['fio', 'tokens']).toJS(),
  tokensLoading: state.getIn(['fio', 'tokensLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tokens)
