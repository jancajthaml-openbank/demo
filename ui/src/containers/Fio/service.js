
class FioService {
  async getTokens(tenant) {
    const res = await fetch(`/api/fio/tokens/${tenant}`)

    if (res.status !== 200) {
      throw new Error('FETCH_TOKENS_FAILED')
    }

    return res.json()
  }
}

export default new FioService()
