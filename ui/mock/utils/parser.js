const moment = require("moment")

/* -------------------------------------------------------------------------- */

const decimalRegex = new RegExp("^[+-]?\\d{1,35}(\\.\\d{1,35})?$", "i")

/**
 * Converts 8601 string value to Date
 *
 * @param {string} value
 *
 * @returns {Date}
 */
function dateFromString(value) {
  const expected = moment(value, moment.ISO_8601)
  if (!expected.isValid()) {
    return null
  }
  return expected.toDate()
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
