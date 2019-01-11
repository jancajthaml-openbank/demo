import 'moment/locale/en-gb'

import moment from 'moment'

moment.locale('en-gb')

if (!PRODUCTION) {
  console.log('[setup] moment')
}

export default async function() {
  // FIXME require async

}
