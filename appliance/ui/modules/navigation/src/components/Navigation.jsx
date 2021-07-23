import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navigation = () => {
  const location = useLocation();
  const sharedState = useSelector((state) => state.shared);

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
        {sharedState.available.indexOf('bondster') !== -1
          ? (
            <li>
              <Link className={location.pathname === '/integration/token/bonster' ? 'is-active' : undefined} to="/integration/token/bonster">
                Bondster
              </Link>
            </li>
          )
          : null
        }
        {sharedState.available.indexOf('fio') !== -1
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