
class BondsterService {

  async getTokens(tenant) {
    const res = await fetch(`/api/bondster/token/${tenant}`)

    if (res.status !== 200) {
      throw new Error('FETCH_TOKENS_FAILED')
    }

    const tokens = []

    try {
      const reader = res.body.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const buffer = new TextDecoder("utf-8").decode(value).split('\n')
        tokens.push(...buffer.map(JSON.parse))
      }
    } catch(err) {
      console.log(err)
    }
    return tokens
  }

  async deleteToken(tenant, id) {
    const res = await fetch(`/api/bondster/token/${tenant}/${id}`, {
      method: 'DELETE',
    })
    if (res.status !== 200) {
      throw new Error('DELETE_TOKEN_FAILED')
    }
  }

  async synchronizeToken(tenant, id) {
    const res = await fetch(`/api/bondster/token/${tenant}/${id}/sync`, {
      method: 'GET',
    })
    if (res.status !== 200) {
      throw new Error('SYNCHRONIZE_TOKEN_FAILED')
    }
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
    const id = await res.text()

    return {
      id,
      createdAt: new Date().toISOString(),
    }
  }
}

export default new BondsterService()
