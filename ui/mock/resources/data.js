
/* -------------------------------------------------------------------------- */

function generateBondsterAccounts(tenant, collection) {
  const result = []

  const currencies = ['CZK', 'EUR']
  const types = [
    'TYPE_BUYBACK_FINANCIAL',
    'TYPE_INTEREST_PAYMENT_PARTICIPATION',
    'TYPE_BUYBACK_PARTICIPATION_FINANCIAL',
    'TYPE_SANCTION_PAYMENT_PARTICIPATION',
    'TYPE_PRIMARY_MARKET_FINANCIAL',
    'TYPE_INTEREST_PAYMENT',
    'TYPE_SANCTION_PAYMENT',
    'TYPE_PRINCIPAL_PAYMENT_FINANCIAL',
    'TYPE_SECESSION_FINANCIAL',
  ]

  currencies.forEach((currency) => {
    types.forEach((type) => {
      const name = `${currency}_${type}`
      const item = {
        id: `${tenant}/${name}`,
        tenant,
        name,
        format: "BONDSTER_TECHNICAL",
        currency,
        isBalanceCheck: false,
      }
      collection.insert(item)
      result.push(item)
    })
  })

  return result
}

function generateRandomAccounts(tenant, collection, howMany) {
  const result = []

  let remaining = howMany

  while (remaining) {
    const ktnr = (Math.round(Math.random() * 8999999) + 1000000)
    const pruef = 98 - (((ktnr * 1000000) + 43) % 97)
    const name = `${(pruef > 9 ? 'DE' : 'DE0')}${pruef}70050000000${ktnr}`

    const item = {
      id: `${tenant}/${name}`,
      tenant,
      name,
      format: "IBAN",
      currency: "EUR",
      isBalanceCheck: false,
    }

    try {
      collection.insert(item)
      remaining--
      result.push(item)
    } catch(err) {

    }
  }

  return result
}

function generateRandomTransactions(tenant, collection, accounts, howMany) {
  let currentIndex = accounts.length
  let temporaryValue
  let randomIndex

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    temporaryValue = accounts[currentIndex]
    accounts[currentIndex] = accounts[randomIndex]
    accounts[randomIndex] = temporaryValue
  }

  const halfIndex = Math.ceil(accounts.length / 2)
  const first = accounts.slice(0, halfIndex)
  const second = accounts.slice(halfIndex + 1)

  let remaining = howMany

  const result = []

  while (remaining) {
    const transfers = []
    const transaction = Array(21).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 20)
    const howManyTransfers = (Math.floor(Math.random() * 2) == 0)
      ? (((Math.random() * 32768) >>> 0) % (39)) + 1
      : (((Math.random() * 32768) >>> 0) % (9)) + 1

    const transactionStatus = (Math.floor(Math.random() * 2) == 0) ? 'committed' : 'rollbacked'

    for (let i = 0; i < howManyTransfers; i++) {
      const account_to = first[Math.floor(Math.random() * first.length)]
      const account_from = second[Math.floor(Math.random() * second.length)]

      const item = {
        id: `${tenant}/${transaction}/${transaction}_${i+1}`,
        tenant: tenant,
        transfer: `${transaction}_${i+1}`,
        transaction: transaction,
        status: transactionStatus,
        amount: (Math.random() * (9999 - 0.0009) + 0.0009).toFixed(35),
        currency: account_to.currency,
        credit: account_to.id,
        debit: account_from.id,
        valueDate: new Date()
      }

      transfers.push(item)
    }

    try {
      transfers.forEach((transfer) => {
        collection.insert(transfer)
      })
      remaining--
      result.push(item)
    } catch(err) {

    }
  }
  return result
}

/* -------------------------------------------------------------------------- */

module.exports = Object.freeze({
  generateRandomAccounts,
  generateBondsterAccounts,
  generateRandomTransactions,
})
