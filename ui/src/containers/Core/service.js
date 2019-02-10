
class CoreService {
  async getAccounts(tenant) {
    const res = await fetch('/api/search/graphql', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `{
          Accounts(tenant: "${tenant}") {
            name
          }
        }`
      }),
    })

    if (res.status !== 200) {
      throw new Error('FETCH_ACCOUNTS_FAILED')
    }

    const result = await res.json()

    return result.data.Accounts
  }

  async getTransactions(tenant) {
    const res = await fetch('/api/search/graphql', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: `{
          Transactions(tenant: "${tenant}") {
            transaction
            status
            transfers {
              transfer
              credit {
                name
                isBalanceCheck
              }
              debit {
                name
                isBalanceCheck
              }
              amount
              currency
            }
          }
        }`
      }),
    })

    if (res.status !== 200) {
      throw new Error('FETCH_TRANSACTIONS_FAILED')
    }

    const result = await res.json()

    return result.data.Transactions
  }
}

export default new CoreService()
