import { connect } from 'react-redux'

import { New } from '../../components/Fio'

// https://reactjs.org/docs/code-splitting.html

const mapDispatchToProps = (dispatch) => ({
})

const mapStateToProps = (state, props) => ({
  ...props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(New)
