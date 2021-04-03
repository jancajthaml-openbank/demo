import Content from './components/Content';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
	require('./styles/index.css');
} else {
	require('./styles/index.css');
}

registerModule.call(__SANDBOX_SCOPE__, {
	MainView: Content,
});