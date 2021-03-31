
/* -------------------------------------------------------------------------- */

const decimalRegex = new RegExp("^[+-]?\\d{1,35}(\\.\\d{1,35})?$", "i")
const dateTimeRegex = new RegExp("(^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)$)|(^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z)$)|(^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z)$)")

/**
 * Converts 8601 string value to Date
 *
 * @param {string} value
 *
 * @returns {Date}
 */
function dateFromString(value) {
  if (!dateTimeRegex.test(value)) {
    return null
  }
  return new Date(value)
}

/**
 * Converts string value to Decimal128
 *
 * @param {string} value
 *
 * @returns {Decimal128}
 */
function decimalFromString(value) {
  if (!decimalRegex.test(value)) {
    return null
  }
  return value
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  dateFromString,
  decimalFromString,
})

/* -------------------------------------------------------------------------- */
