import { connect } from 'react-redux'
import { New } from 'components/Fio'

const mapDispatchToProps = {

}

const mapStateToProps = (state, props) => ({
  tenant: props.tenant,
})

export default connect(
  mapStateToProps,
)(New)
