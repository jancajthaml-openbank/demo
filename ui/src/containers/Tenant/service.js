
class TenantService {
  async getTenants() {
    const res = await fetch('/api/vault/tenant')

    if (res.status !== 200) {
      throw new Error('FETCH_TENANTS_FAILED')
    }

    return res.json()
  }
}

export default new TenantService()
