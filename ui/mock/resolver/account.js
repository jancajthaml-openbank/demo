
/* -------------------------------------------------------------------------- */

async function AccountsResolve(_, params, context) {

  let orderBy = (a, b) => 0

  if (params.sortField) {
    switch (params.sortOrder) {
      case "ASC": {
        orderBy = (a, b) => {
          if (a[params.sortField] === b[params.sortField]) return 0
          if (a[params.sortField] > b[params.sortField]) return 1
          if (a[params.sortField] < b[params.sortField]) return -1
          return 0
        }
        break
      }
      case "DESC": {
        orderBy = (a, b) => {
          if (a[params.sortField] === b[params.sortField]) return 0
          if (a[params.sortField] < b[params.sortField]) return 1
          if (a[params.sortField] > b[params.sortField]) return -1
          return 0
        }
        break
      }
    }
  } else {
    orderBy = (a, b) => {
      if (a['name'] === b['name']) return 0
      if (a['name'] > b['name']) return 1
      if (a['name'] < b['name']) return -1
      return 0
    }
  }

  const query = {
    tenant: params.tenant,
  }

  if (params.currency !== undefined) {
    query.currency = params.currency
  }

  const actualSkip = params.skip || 0
  const actualTake = params.take ? (params.take + actualSkip) : undefined

  return context.db.accounts
    .find(query)
    .sort(orderBy)
    .slice(actualSkip, actualTake)
}


async function AccountResolve(_, params, context) {

  const query = {
    tenant: params.tenant,
    name: params.name,
  }

  return context.db.accounts
    .findOne(query)
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  accounts: AccountsResolve,
  account: AccountResolve,
})

/* -------------------------------------------------------------------------- */
