import { connect } from 'react-redux'

import { New } from '../../components/Bondster'

import TokenService from './service'

// https://reactjs.org/docs/code-splitting.html

import { createTokenApiRequestSuccess } from './actions'

const mapDispatchToProps = (dispatch) => ({
  onNewToken: (token) => dispatch(createTokenApiRequestSuccess(token))
})

const mapStateToProps = (state, props) => ({
  createToken: TokenService.createToken,
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
