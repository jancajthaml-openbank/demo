const http = require('http')
const express = require('express')

// -------------------------------------------------------------------------- //

module.exports = function(application) {
  const app = application || express()
  const server = http.createServer(app)

  // -------------------------------------------------------------------------- //
  // HTTP 1.0 methods

  app.use(express.json())

  // -------------------------------------------------------------------------- //
  // Vault

  app.get('/api/vault/tenant', async (req, res) => {
    return res.json([
      'a',
      'b',
      'c',
    ])
  })

  // -------------------------------------------------------------------------- //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      return res.sendStatus(404)
    }

    return res.json([
      `bondster-a-${tenant}`,
      `bondster-b-${tenant}`,
      `bondster-c-${tenant}`,
    ])
  })

  // -------------------------------------------------------------------------- //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      return res.sendStatus(404)
    }

    return res.json([
      `fio-a-${tenant}`,
      `fio-b-${tenant}`,
      `fio-c-${tenant}`,
    ])
  })

  // -------------------------------------------------------------------------- //

  return server
}
