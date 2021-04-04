import Content from './components/Content';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass').default.use();
	require('font-awesome/scss/font-awesome.scss').default.use();
}

registerModule.call(__SANDBOX_SCOPE__, {
	MainView: Content,
	styles: require('./styles/index.css').default,
});