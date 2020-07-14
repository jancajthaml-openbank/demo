
/* -------------------------------------------------------------------------- */

const decimalRegex = new RegExp("^[+-]?\\d{1,35}(\\.\\d{1,35})?$", "i")
const sciNotationRegex = new RegExp("\\d+\\.?\\d*E[+-]*\\d+", "i")

/**
 * converts Date value to 8601 string
 *
 * @param {Date} value
 *
 * @returns {string}
 */
function dateToString(value) {
  if (!value) {
    return null
  }
  // FIXME check instance here
  return value.toISOString()
}

/**
 * converts Decimal128 value to string
 *
 * @param {Decimal128} value
 *
 * @returns {string}
 */
function decimalToString(value) {
  if (!value) { // FIXME use isDefined
    return null
  }

  value = String(value)

  if (!decimalRegex.test(value)) {
    return null
  }

  if (!sciNotationRegex.test(value)) {
    return value
  }

  const parts = value.split("E")
  const e = Number(parts.pop())
  let l = (e > 0 ? e : -e)
  const sign = e / l
  const coeff_array = parts[0].split(".")

  if (sign === -1) {
    return "0." + new Array(l).join("0") + coeff_array.join("")
  }

  const dec = coeff_array[1]
  if (dec) {
    l = l - dec.length
  }
  return coeff_array.join("") + new Array(l + 1).join("0")
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  dateToString,
  decimalToString,
})

/* -------------------------------------------------------------------------- */
