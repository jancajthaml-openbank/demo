import Layout from './components/Layout';

import { registerModule } from '@lastui/rocker/platform';

if (process.env.NODE_ENV === 'development') {
	require('bulma/bulma.sass');
}

registerModule({
	Main: Layout,
});