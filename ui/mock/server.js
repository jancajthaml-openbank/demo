
/* -------------------------------------------------------------------------- */

const fs = require('fs')
const path = require('path')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const loki = require('lokijs')
const { randomId } = require('./utils/random')
const { Tenants, Accounts, Transfers } = require('./resolver')
const { DateTimeScalar, BigDecimalScalar } = require('./scalar')

const {
  generateRandomTenants,
  generateRandomAccounts,
  generateBondsterAccounts,
  generateRandomTransactions,
} = require('./resources/data')

// -------------------------------------------------------------------------- //

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

async function generateData(tenants, accounts, transfers) {
  const randomTenants = generateRandomTenants(tenants, 3)
  randomTenants.forEach((tenant) => {
    const randomAccounts = generateRandomAccounts(tenant.name, accounts, 100)
    const bondsterAccounts = generateBondsterAccounts(tenant.name, accounts)
    const generatedAccounts = [...randomAccounts, ...bondsterAccounts]
    const randomTransfers = generateRandomTransactions(tenant.name, transfers, generatedAccounts, 100)
  })
}

module.exports = function(application) {
  const app = application || express()
  const db = new loki('db.json')

  const tenants = db.addCollection('tenants', {
    unique: ['name'],
  })
  const accounts = db.addCollection('accounts', {
    unique: ['id'],
  })
  const transfers = db.addCollection('transfers', {
    unique: ['id'],
  })
  const fio = db.addCollection('fio', {
    unique: ['id'],
  })
  const bondster = db.addCollection('bondster', {
    unique: ['id'],
  })

  global.setTimeout(() => generateData(tenants, accounts, transfers), 1000)

  app.use(logRequestStart)

  // ------------------------------------------------------------------------ //
  // GraphQL methods

  app.use('/api/data-warehouse/graphql', graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: fs.readFileSync(path.resolve(__dirname, "schema.graphql"), "utf8"),
      resolvers: Object.freeze({
        Query: {
          ...Tenants,
          ...Accounts,
          ...Transfers,
        },
        DateTime: DateTimeScalar,
        BigDecimal: BigDecimalScalar,
      })
    }),
    context: {
      db: {
        tenants,
        transfers,
        accounts,
      },
    },
    graphiql: true,
  }))

  // ------------------------------------------------------------------------ //
  // HTTP 1.0 methods

  // ------------------------------------------------------------------------ //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404)
      res.end()
      return
    }

    res.header('transfer-encoding', 'chunked')
    res.set('content-type', 'text/plain')
    res.status(200)

    const tokens = bondster.find({ tenant }).map((item) => JSON.stringify({
      id: item.id,
      createdAt: item.createdAt.toISOString(),
    }))

    tokens.forEach((chunk, idx) => {
      if (idx === tokens.length - 1) {
        res.write(chunk)
      } else {
        res.write(chunk + '\n')
      }
    })

    res.end()
  })

  app.delete('/api/bondster/token/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params

    if (!tenant || !id) {
      res.status(404)
      res.end()
      return
    }

    if (!bondster.chain().find({ tenant, id }).remove()) {
      res.status(404)
      res.end()
      return
    }

    res.status(200)
    res.end()
  })

  app.post('/api/bondster/token/:tenant', express.json({ type: '*/*' }), async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404)
      res.end()
      return
    }

    if (!req.body) {
      res.status(400)
      res.end()
      return
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        res.status(400)
        res.end()
        return
      }

      let id = randomId()
      while (bondster.find({ tenant, id }).length > 0) {
        id = uuid()
      }

      const createdAt = new Date()

      bondster.insert({
        id,
        tenant,
        username,
        password,
        createdAt,
      })

      res.status(200)
      res.write(id)
      res.end()

      return
    } catch (err) {
      console.log(err)
      res.status(400)
      res.end()
      return
    }
  })

  // ------------------------------------------------------------------------ //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404)
      res.end()
      return
    }

    res.header('transfer-encoding', 'chunked')
    res.set('content-type', 'text/plain')
    res.status(200)

    const tokens = fio.find({ tenant }).map((item) => JSON.stringify({
      id: item.id,
      createdAt: item.createdAt.toISOString(),
    }))

    tokens.forEach((chunk, idx) => {
      if (idx === tokens.length - 1) {
        res.write(chunk)
      } else {
        res.write(chunk + '\n')
      }
    })

    res.end()

    return
  })

  app.delete('/api/fio/token/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params

    if (!tenant || !id) {
      res.status(404)
      res.end()
      return
    }

    if (!fio.chain().find({ tenant, id }).remove()) {
      res.status(404)
      res.end()
      return
    }

    res.status(200)
    res.end()
  })

  app.post('/api/fio/token/:tenant', express.json({ type: '*/*' }), async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404)
      res.end()
      return
    }

    if (!req.body) {
      res.status(400)
      res.end()
      return
    }

    try {
      const { value } = req.body

      if (!value) {
        res.status(400)
        res.end()
        return
      }

      let id = randomId()
      while (fio.find({ tenant, id }).length > 0) {
        id = uuid()
      }

      const createdAt = new Date()

      fio.insert({
        id,
        tenant,
        value,
        createdAt,
      })

      res.status(200)
      res.write(id)
      res.end()

      return
    } catch (err) {
      res.status(400)
      res.end()
      return
    }
  })

  // ------------------------------------------------------------------------ //

  return app
}

/* -------------------------------------------------------------------------- */

