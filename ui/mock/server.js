const http = require('http')
const express = require('express')

// -------------------------------------------------------------------------- //

function randId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 20);
}

const FIO = {}
const BONDSTER = {}

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
    return res.status(200).json([
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

    return res.status(200).json(BONDSTER[tenant] ? Object.keys(BONDSTER[tenant]) : [])
  })

  app.post('/api/bondster/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      return res.sendStatus(404)
    }

    if (!BONDSTER[tenant]) {
      BONDSTER[tenant] = {}
    }

    if (!req.body) {
      return res.sendStatus(400)
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.sendStatus(400)
      }

      let value = randId()
      while (BONDSTER[tenant][value]) {
        id = uuid()
      }

      BONDSTER[tenant][value] = {
        username,
        password,
      }

      return res.status(200).json({ value })
    } catch (err) {
      return res.sendStatus(400)
    }
  })

  // -------------------------------------------------------------------------- //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      return res.sendStatus(404)
    }

    return res.status(200).json(FIO[tenant] ? Object.keys(FIO[tenant]) : [])
  })

  app.post('/api/fio/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      return res.sendStatus(404)
    }

    if (!FIO[tenant]) {
      FIO[tenant] = {}
    }

    if (!req.body) {
      return res.sendStatus(400)
    }

    try {
      const { value } = req.body

      if (!value || FIO[tenant][value]) {
        return res.sendStatus(400)
      }

      FIO[tenant][value] = {
        value,
      }

      return res.status(200).json({ value })
    } catch (err) {
      return res.sendStatus(400)
    }
  })

  // -------------------------------------------------------------------------- //

  return server
}
