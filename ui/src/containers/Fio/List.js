import { connect } from 'react-redux'
import { List } from 'components/Fio'

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => ({
  tenant: props.tenant,
})

export default connect(
  mapStateToProps,
)(List)
