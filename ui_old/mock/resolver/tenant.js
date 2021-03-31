
/* -------------------------------------------------------------------------- */

async function TenantsResolve(_, params, context) {

  const actualSkip = params.offset || 0
  const actualTake = params.limit ? (params.limit + actualSkip) : undefined

  const orderBy = (a, b) => {
    if (a['name'] === b['name']) return 0
    if (a['name'] > b['name']) return 1
    if (a['name'] < b['name']) return -1
    return 0
  }

  return context.db.tenants
    .find()
    .sort(orderBy)
    .slice(actualSkip, actualTake)
    .map((item) => ({
      name: item.name,
    }))
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  tenants: TenantsResolve,
})

/* -------------------------------------------------------------------------- */
