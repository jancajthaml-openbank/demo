import React from 'react';

import { Module } from '@lastui/rocker/platform';

const Layout = () => {
	return (
		<React.Fragment>
			<Module name="header" />
			<div className="container">
		      <div className="columns">
		        <div className="column is-3 ">
		          <Module name="navigation" />
		        </div>
		        <div className="column is-9">
					<Module name="content" />
				</div>
			</div>
			</div>
		</React.Fragment>
	);
}

export default Layout;