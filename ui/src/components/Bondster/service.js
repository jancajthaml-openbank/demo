
class BondsterService {
  async getTokens(tenant) {
    const res = await fetch(`/api/bondster/token/${tenant}`)

    if (res.status !== 200) {
      throw new Error('FETCH_TOKENS_FAILED')
    }

    return res.json()
  }

  async deleteToken(tenant, id) {
    const res = await fetch(`/api/bondster/token/${tenant}/${id}`, {
      method: 'DELETE',
    })

    if (res.status !== 200) {
      throw new Error('DELETE_TOKEN_FAILED')
    }

    return res.json()
  }

  async createToken(tenant, username, password) {
    const req = {
      username,
      password,
    }
    const res = await fetch(`/api/bondster/token/${tenant}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(req),
    })

    if (res.status !== 200) {
      throw new Error('CREATE_TOKEN_FAILED')
    }

    return res.json()
  }
}

export default new BondsterService()
