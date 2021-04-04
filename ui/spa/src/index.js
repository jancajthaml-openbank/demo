import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from '@lastui/rocker/runtime';

import 'bulma/bulma.sass';
import 'font-awesome/scss/font-awesome.scss';

window.addEventListener('load', (event) => {
	ReactDOM.render(<Main />, document.getElementById('mount'))
})