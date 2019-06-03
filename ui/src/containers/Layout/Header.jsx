import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import memoize from 'memoize-state'

import { Select } from '../../components/Select'
import { tenantsApiRequestInit, changeTenant } from '../Tenant/actions'

import SafeLink from './SafeLink'

class Header extends React.Component {

  componentDidMount() {
    const { tenant, tenants, loadTenants } = this.props
    if (!tenants) {
      loadTenants()
    }
  }

  tenantChanged = (tenant) => {
    this.props.changeTenant(tenant)
  }

  render() {
    const { tenants } = this.props
    return (
      <div
        style={{
          border: '1px solid red',
          padding: '10px',
        }}
      >
        <Select
          disabled={!tenants}
          options={tenants}
          valueChanged={this.tenantChanged}
        />
        <ul>
          <li>
            <SafeLink to="/">Home</SafeLink>
          </li>
          <li>
            <SafeLink to="/account">Account</SafeLink>
          </li>
          <li>
            <SafeLink to="/transaction">Transaction</SafeLink>
          </li>
          <li>
            <SafeLink to="/fio">Fio</SafeLink>
          </li>
          <li>
            <SafeLink to="/bondster">Bondster</SafeLink>
          </li>
        </ul>
        </div>
      )
  }
}

const mapDispatchToProps = {
  loadTenants: tenantsApiRequestInit,
  changeTenant: changeTenant,
}

const mapStateToProps = (state, props) => ({
  tenants: state.tenant.tenants,
  tenant: state.tenant.tenant,
  loading: state.tenant.loading,
})

export default  connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(Header)

//export default connect(mapStateToProps)(withTenant(Header))
