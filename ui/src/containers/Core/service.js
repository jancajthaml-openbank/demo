
class CoreService {
  async getAccounts(tenant) {
    const req = {
      query: `
        query {
          Accounts(tenant: "${tenant}") {
            name
          }
        }
      `
    }
    console.time("getAccounts-fetch")

    const res = await fetch('/api/search/graphql', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(req),
    })

    console.timeEnd("getAccounts-fetch")

    console.time("getAccounts-parse")

    if (res.status !== 200) {
      throw new Error('FETCH_ACCOUNTS_FAILED')
    }

    const result = await res.json()

    if (result.errors) {
      throw new Error(JSON.stringify(result.errors))
    }

    console.timeEnd("getAccounts-parse")

    return result.data.Accounts
  }

  async createAccount(tenant, accountNumber, currency, isBalanceCheck) {
    const req = {
      accountNumber,
      currency,
      isBalanceCheck,
    }

    const res = await fetch(`/api/vault/account/${tenant}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(req),
    })

    if (res.status !== 200) {
      throw new Error('CREATE_ACCOUNT_FAILED')
    }

    return req
  }

  async getTransactions(tenant) {
    const req = {
      query: `
        fragment accountFields on Account {
          name
          tenant
          isBalanceCheck
        }

        fragment transferFields on Transfer {
          id
          amount
          currency
          valueDate
          credit {
            ...accountFields
          }
          debit {
            ...accountFields
          }
        }

        fragment transactionFields on Transaction {
          id
          status
          transfers {
            ...transferFields
          }
        }

        query {
          Transactions(tenant: "${tenant}") {
            ...transactionFields
          }
        }
      `
    }

    const res = await fetch('/api/search/graphql', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(req),
    })

    if (res.status !== 200) {
      throw new Error('FETCH_TRANSACTIONS_FAILED')
    }

    const result = await res.json()

    if (result.errors) {
      throw new Error(JSON.stringify(result.errors))
    }

    return result.data.Transactions
  }
}

export default new CoreService()
