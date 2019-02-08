
class FioService {
  async getTokens(tenant) {
    const res = await fetch(`/api/fio/token/${tenant}`)

    if (res.status !== 200) {
      throw new Error('FETCH_TOKENS_FAILED')
    }

    return res.json()
  }

  async deleteToken(tenant, token) {
    const res = await fetch(`/api/fio/token/${tenant}/${token}`)

    if (res.status !== 200) {
      throw new Error('DELETE_TOKEN_FAILED')
    }

    return res.json()
  }

  async createToken(tenant, token) {
    const res = await fetch(`/api/fio/token/${tenant}`)
    if (res.status !== 200) {
      throw new Error('CREATE_TOKEN_FAILED')
    }

    return res.json()
  }
}

export default new FioService()
