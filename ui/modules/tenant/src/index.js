import { TenantContextProvider } from './components/tenant';

import { registerModule } from '@lastui/rocker/platform';

registerModule({
	Main: TenantContextProvider,
});