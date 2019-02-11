async function TransfersResolve(_, params, context) {
  const {
    tenant,
    credit,
    debit,
    status,
    currency,
    take,
    skip,
    sort_field,
    sort_order,
  } = params

  if (!tenant) {
    return []
  }

  const query = {
    tenant,
  }

  if (status) {
    query.status = status
  }

  if (currency) {
    query.currency = currency
  }

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

  const actualSkip = skip || 0
  const actualTake = take ? (take + actualSkip) : undefined

  return context.db.transfers
    .find(query)
    .sort(orderBy)
    .slice(actualSkip, actualTake)
    .map((transfer) => ({
      ...transfer,
      credit: context.db.accounts.findOne({
        id: `${tenant}/${transfer.credit}`
      }),
      debit: context.db.accounts.findOne({
        id: `${tenant}/${transfer.debit}`
    })}))
}

async function TransferResolve(_, params, context) {
  const { transaction, transfer, tenant } = params

  if (!transaction || !transfer || !tenant) {
    return null
  }

  const query = {
    _id: `${tenant}/${transaction}/${transfer}`
  }

  const transfer = context.db.transfers
    .findOne(query)

  return {
    ...transfer,
    credit: context.db.accounts.findOne({
      id: `${tenant}/${transfer.credit}`
    }),
    debit: context.db.accounts.findOne({
      id: `${tenant}/${transfer.debit}`
    }),
  }
}

module.exports = Object.freeze({
  Transfers: TransfersResolve,
  Transfer: TransferResolve,
})
