
/* -------------------------------------------------------------------------- */

async function TransfersResolve(_, params, context) {
  if (!params.tenant) {
    return []
  }

  const query = {
    tenant: params.tenant,
  }

  let orderBy = (a, b) => {
    if (a[params.id] === b[params.id]) return 0
    if (a[params.id] < b[params.id]) return 1
    if (a[params.id] > b[params.id]) return -1
    return 0
  }

  const actualSkip = params.skip || 0
  const actualTake = params.take ? (params.take + actualSkip) : undefined

  let getAccount = (id) => {
    const account = context.db.accounts.findOne({ id })
    return {
      name: account.name,
      currency: account.currency,
      format: account.format,
      balance: account.balance,
      tenant: {
        name: account.tenant,
      }
    }
  }

  return context.db.transfers
    .find(query)
    .sort(orderBy)
    .slice(actualSkip, actualTake)
    .map((transfer) => ({
      transfer: transfer.transfer,
      transaction: transfer.transaction,
      debit: getAccount(transfer.debit),
      credit: getAccount(transfer.credit),
      valueDate: transfer.valueDate,
      amount: transfer.amount,
      currency: transfer.currency,
    }))
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  transfers: TransfersResolve,
})

/* -------------------------------------------------------------------------- */
