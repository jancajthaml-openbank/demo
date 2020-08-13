import React from 'react'
import { Link } from 'react-router-dom'
import { useTenant } from 'containers/Tenant'
import { Select } from 'components/Select'
import { Logo } from 'components/Logo'
import { HeaderWrapper, HeaderLogo, HeaderNavigation } from './styles'
import SafeLink from './SafeLink'

const Header = (props) => {
  const { tenants, setTenant } = useTenant()

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
      <HeaderLogo>
        <Logo />
      </HeaderLogo>
      <Select
        disabled={!tenants}
        options={tenants}
        valueChanged={setTenant}
      />
    </HeaderWrapper>
  )
}

export default Header
