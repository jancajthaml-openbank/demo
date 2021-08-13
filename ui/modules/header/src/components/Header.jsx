import React from 'react';
import { Module, Link } from '@lastui/rocker/platform';

const Header = () => {
	return (
		<nav className="navbar is-white">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item brand-text" to="/">
            Openbank Demo
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
          </div>
        </div>
      </div>
    </nav>
	);
}

export default Header;