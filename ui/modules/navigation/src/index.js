import Navigation from './components/Navigation';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
	require('font-awesome/css/font-awesome.css');
}

registerModule({
	Main: Navigation,
});