
class CoreService {
  async getAccounts(tenant) {
    const req = {
      query: `{
        Accounts(tenant: "${tenant}") {
          name
        }
      }`
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
      throw new Error('FETCH_ACCOUNTS_FAILED')
    }

    const result = await res.json()

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

    return result.data.Transactions
  }
}

export default new CoreService()
