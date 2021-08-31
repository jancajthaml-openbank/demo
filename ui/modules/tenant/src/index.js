import { TenantContextProvider } from './components/tenant';

import { registerModule } from '@lastui/rocker/platform';

registerModule.call(__SANDBOX_SCOPE__, {
	Main: TenantContextProvider,
});