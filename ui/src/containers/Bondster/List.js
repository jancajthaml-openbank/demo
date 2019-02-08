import { connect } from 'react-redux'

import { List } from '../../components/Bondster'

// https://reactjs.org/docs/code-splitting.html

import { tokensApiRequestInit } from './actions'

const mapDispatchToProps = (dispatch) => ({
  loadTokens: (tenant) => dispatch(tokensApiRequestInit(tenant))
})

const mapStateToProps = (state, props) => ({
  tokens: state.getIn(['bondster', 'tokens']).toJS(),
  tokensLoading: state.getIn(['bondster', 'tokensLoading']),
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
