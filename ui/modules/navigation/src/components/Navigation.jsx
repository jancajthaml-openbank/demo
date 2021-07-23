import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

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
        Integrations
      </p>
      <ul className="menu-list">
        <li>
          <Link className={location.pathname === '/integration/token/bonster' ? 'is-active' : undefined} to="/integration/token/bonster">
            Bondster
          </Link>
        </li>
        <li>
          <Link className={location.pathname === '/integration/token/fio' ? 'is-active' : undefined} to="/integration/token/fio">
            Fio
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