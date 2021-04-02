import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from '@lastui/rocker/runtime';

import 'bootstrap-dark/src/bootstrap-dark.scss';

window.addEventListener('load', (event) => {
	ReactDOM.render(<Main />, document.getElementById('mount'))
})