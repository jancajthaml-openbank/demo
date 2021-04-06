import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<aside className="menu is-hidden-mobile">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li>
          <Link className={'is-active'} to="/">
            Dashboard
          </Link>
        </li>
      </ul>
      <p className="menu-label">
        Integrations
      </p>
      <ul className="menu-list">
        <li>
          <a>Tokens</a>
          <ul>
            <li>
              <Link className={''} to="/integration/token/bonster">
                Bondster
              </Link>
            </li>
            <li>
              <Link className={''} to="/integration/token/fio">
                Fio
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
	);
}

export default Navigation;