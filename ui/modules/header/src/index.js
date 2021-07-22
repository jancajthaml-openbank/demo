import Header from './components/Header';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
}

import './styles/index.css'

registerModule.call(__SANDBOX_SCOPE__, {
	Main: Header,
});