import React from 'react'
import { Link } from 'react-router-dom'
//import { connect } from 'react-redux'
//import memoize from 'memoize-state'

//import { tenantsApiRequestInit, changeTenant } from '../Tenant/actions'
//import { useTenant } from './containets/Tenant/TenantContext'

import { HeaderWrapper, HeaderLogo, TenantSelect, HeaderNavigation } from './styles'
import SafeLink from './SafeLink'

const Header = (props) => {
  //const tenant = useTenant()

  return (
    <HeaderWrapper>
      <HeaderNavigation>
        <ul>
          <li>
            <SafeLink to="/">home</SafeLink>
          </li>
          <li>
            <SafeLink to="/account">account</SafeLink>
          </li>
          <li>
            <SafeLink to="/transaction">transaction</SafeLink>
          </li>
          <li>
            <SafeLink to="/fio">fio</SafeLink>
          </li>
          <li>
            <SafeLink to="/bondster">bondster</SafeLink>
          </li>
        </ul>
      </HeaderNavigation>
      <HeaderLogo />
      {/*
      <TenantSelect
        disabled={!tenants}
        options={tenants}
        valueChanged={this.tenantChanged}
      />
      */}
    </HeaderWrapper>
  )
}

/*
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
      <HeaderWrapper>
        <HeaderNavigation>
          <ul>
            <li>
              <SafeLink to="/">home</SafeLink>
            </li>
            <li>
              <SafeLink to="/account">account</SafeLink>
            </li>
            <li>
              <SafeLink to="/transaction">transaction</SafeLink>
            </li>
            <li>
              <SafeLink to="/fio">fio</SafeLink>
            </li>
            <li>
              <SafeLink to="/bondster">bondster</SafeLink>
            </li>
          </ul>
        </HeaderNavigation>
        <HeaderLogo />
        <TenantSelect
          disabled={!tenants}
          options={tenants}
          valueChanged={this.tenantChanged}
        />
      </HeaderWrapper>
    )
  }
}*/

export default Header

/*
const mapDispatchToProps = {
  //loadTenants: tenantsApiRequestInit,
  //changeTenant: changeTenant,
}

const mapStateToProps = (state, props) => ({
  //tenants: state.tenant.tenants,
  //tenant: state.tenant.tenant,
  //loading: state.tenant.loading,
})

export default  connect(
  memoize(mapStateToProps),
  mapDispatchToProps,
)(Header)
*/

//export default connect(mapStateToProps)(withTenant(Header))
