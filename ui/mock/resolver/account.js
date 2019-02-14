async function AccountsResolve(_, params, context) {
  const {
    tenant,
    currency,
    take,
    skip,
    sort_field,
    sort_order,
  } = params

  let orderBy = (a, b) => 0

  if (sort_field) {
    switch (sort_order) {
      case "ASC": {
        orderBy = (a, b) => {
          if (a[sort_field] === b[sort_field]) return 0
          if (a[sort_field] > b[sort_field]) return 1
          if (a[sort_field] < b[sort_field]) return -1
          return 0
        }
        break
      }
      case "DESC": {
        orderBy = (a, b) => {
          if (a[sort_field] === b[sort_field]) return 0
          if (a[sort_field] < b[sort_field]) return 1
          if (a[sort_field] > b[sort_field]) return -1
          return 0
        }
        break
      }
    }
  }

  const query = {
    tenant: params.tenant,
  }

  if (currency) {
    query.currency = currency
  }

  const actualSkip = skip || 0
  const actualTake = take ? (take + actualSkip) : undefined

  return context.db.accounts
    .find(query)
    .sort(orderBy)
    .slice(actualSkip, actualTake)
}

async function AccountResolve(_, params, context) {
  const { tenant, name } = params

  if (!tenant || !name) {
    return null
  }

  const query = {
    id: `${tenant}/${name}`
  }

  return context.db.accounts
    .findOne(query)
}

module.exports = Object.freeze({
  Accounts: AccountsResolve,
  Account: AccountResolve,
})
