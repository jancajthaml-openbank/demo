import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from '@lastui/rocker/platform';

const Navigation = () => {
  const location = useLocation();
  const shared = useSelector((state) => state.shared.global);

	return (
		<aside className="menu is-hidden-mobile">
      <p className="menu-label">
        Overview
      </p>
      <ul className="menu-list">
        <li>
          <Link className={location.pathname === '/' ? 'is-active' : undefined} to="/">
            Dashboard
          </Link>
        </li>
      </ul>
      <p className="menu-label">
        Integration
      </p>
      <ul className="menu-list">
        {shared['integration.bondster']
          ? (
            <li>
              <Link className={location.pathname === '/integration/token/bonster' ? 'is-active' : undefined} to="/integration/token/bonster">
                Bondster
              </Link>
            </li>
          )
          : null
        }
        {shared['integration.fio']
          ? (
            <li>
              <Link className={location.pathname === '/integration/token/fio' ? 'is-active' : undefined} to="/integration/token/fio">
                Fio
              </Link>
            </li>
          )
          : null
        }
        <li>
          <Link className={location.pathname === '/integration/new' ? 'is-active' : undefined} to="/integration/new">
            <i className="fa fa-plus"></i>
          </Link>
        </li>
      </ul>
      <p className="menu-label">
        Payments
      </p>
      <ul className="menu-list">
        <li>
          <Link className={location.pathname === '/payment/transactions' ? 'is-active' : undefined} to="/payment/transactions">
            Transactions
          </Link>
        </li>
        <li>
          <Link className={location.pathname === '/payment/accounts' ? 'is-active' : undefined} to="/payment/accounts">
            Accounts
          </Link>
        </li>
      </ul>
    </aside>
	);
}

export default Navigation;