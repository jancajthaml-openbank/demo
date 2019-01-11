import 'moment/locale/en-gb'

import moment from 'moment'

moment.locale('en-gb')

if (!PRODUCTION) {
  console.log('[setup] moment')
}
