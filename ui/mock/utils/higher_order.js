/**
 * repartition given items by key
 *
 * @param {Array} items
 * @param {string} key
 */
const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
)

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  groupBy,
})
