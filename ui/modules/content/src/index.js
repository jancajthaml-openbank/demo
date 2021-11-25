import Routing from './components/Routing';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
}

import './styles/index.css'

registerModule({
	Main: Routing,
});