import 'moment/locale/en-gb'

import moment from 'moment'

moment.locale('en-gb')

export default async function() {

  if (process.env.NODE_ENV !== 'production') {
    console.log('[setup] moment')
  }

  // FIXME require async

}
