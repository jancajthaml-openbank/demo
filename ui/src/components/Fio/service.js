
class FioService {
  async getTokens(tenant) {
    const res = await fetch(`/api/fio/token/${tenant}`)

    if (res.status !== 200) {
      throw new Error('FETCH_TOKENS_FAILED')
    }

    const data = await res.text()
    return data.split('\n').map((line) => JSON.parse(line))
  }

  async deleteToken(tenant, id) {
    const res = await fetch(`/api/fio/token/${tenant}/${id}`, {
      method: 'DELETE',
    })
    if (res.status !== 200) {
      throw new Error('DELETE_TOKEN_FAILED')
    }
  }

  async createToken(tenant, value) {
    const req = {
      value,
    }
    const res = await fetch(`/api/fio/token/${tenant}`, {
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

export default new FioService()
