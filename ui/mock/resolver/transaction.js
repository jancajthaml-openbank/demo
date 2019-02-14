const { Transfers } = require('./transfer')

async function TransactionsResolve(scope, params, context) {
  const result = await Transfers(scope, params, context)

  if (result.length === 0) {
    return []
  }

  console.log('result', result)

  const partition = result
    .reduce((result, item) => ({
      ...result,
      [item["transaction"]]: [
        ...(result[item["transaction"]] || []),
        item,
      ],
    }),
    {})

  return Object.keys(partition).map((transaction) => ({
    transaction,
    status: partition[transaction][0]["status"],
    transfers: partition[transaction]
  }))
}

async function TransactionResolve(scope, params, context) {
  const result = await TransactionsResolve(scope, params, context)

  if (result.length === 0) {
    return null
  }

  return result[0]
}

module.exports = Object.freeze({
  Transactions: TransactionsResolve,
  Transaction: TransactionResolve,
})
