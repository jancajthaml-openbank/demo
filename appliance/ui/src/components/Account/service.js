
class AccountService {

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

}

export default new AccountService()
