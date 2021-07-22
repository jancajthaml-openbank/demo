import Navigation from './components/Navigation';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
}

registerModule.call(__SANDBOX_SCOPE__, {
	Main: Navigation,
});