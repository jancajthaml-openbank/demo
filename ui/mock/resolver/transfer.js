
/* -------------------------------------------------------------------------- */

async function TransfersResolve(_, params, context) {
  if (!params.tenant) {
    return []
  }

  const query = {
    tenant: params.tenant,
  }

  if (params.status !== undefined) {
    query.status = params.status
  }

  if (params.currency !== undefined) {
    query.currency = params.currency
  }

  if (params.amount !== undefined) {
    query.amount = params.amount
  } else if (params.minAmount !== undefined) {
    query.amount = { '$gte': params.maxAmount }
  } else if (params.maxAmount !== undefined) {
    query.amount = { '$lte': params.maxAmount }
  }

  if (params.valueDate !== undefined) {
    query.valueDate = params.amount
  } else if (params.fromValueDate !== undefined) {
    query.valueDate = { '$gte': params.fromValueDate }
  } else if (params.toValueDate !== undefined) {
    query.valueDate = { '$lte': params.toValueDate }
  }

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
  }

  const actualSkip = params.skip || 0
  const actualTake = params.take ? (params.take + actualSkip) : undefined

  return context.db.transfers
    .find(query)
    .sort(orderBy)
    .slice(actualSkip, actualTake)
    .map((transfer) => ({
      id: transfer.transfer,
      transaction: transfer.transaction,
      status: transfer.status,
      credit: context.db.accounts.findOne({
        id: transfer.credit
      }),
      debit: context.db.accounts.findOne({
        id: transfer.debit
      }),
      valueDate: transfer.valueDate,
      amount: transfer.amount,
      currency: transfer.currency,
    }))
}

async function TransferResolve(_, params, context) {
  if (!params.tenant || !params.transaction || !params.transfer) {
    return null
  }

  const query = {
    _id: `${params.tenant}/${params.transaction}/${params.transfer}`
  }

  const transfer = context.db.transfers
    .findOne(query)

  return {
    id: transfer.transfer,
    transaction: transfer.transaction,
    status: transfer.status,
    credit: context.db.accounts.findOne({
      id: transfer.credit
    }),
    debit: context.db.accounts.findOne({
      id: transfer.debit
    }),
    valueDate: transfer.valueDate,
    amount: transfer.amount,
    currency: transfer.currency,
  }
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  Transfers: TransfersResolve,
  Transfer: TransferResolve,
})
