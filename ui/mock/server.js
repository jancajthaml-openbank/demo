const fs = require('fs')
const path = require('path')
const fastify = require('fastify')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const loki = require('lokijs')
const { randomId } = require('./utils/random')
const { Accounts, Transactions, Transfers } = require('./resolver')
const { DateScalar, MoneyScalar } = require('./scalar')
const { generateRandomAccounts, generateRandomTransactions } = require('./resources/data')

// -------------------------------------------------------------------------- //

module.exports = function(application) {
  const app = application || fastify()
  const db = new loki('db.json')

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

  const randomAccounts = generateRandomAccounts('random', accounts, 2000)
  const randomTransfers = generateRandomTransactions('random', transfers, randomAccounts, 100)

  accounts.insert({
    "id": "test/A",
    "tenant": "test",
    "name": "A",
    "currency": "CZK",
    "isBalanceCheck": false,
  })

  // ------------------------------------------------------------------------ //
  // GraphQL methods

  app.register(graphqlFastify, {
    prefix: '/api/search/graphql',
    graphql: {
      schema: makeExecutableSchema({
        typeDefs: fs.readFileSync(path.resolve(__dirname, "schema.graphql"), "utf8"),
        resolvers: Object.freeze({
          Query: {
            ...Accounts,
            ...Transactions,
            ...Transfers,
          },
          Date: DateScalar,
          Money: MoneyScalar
        })
      }),
      context: {
        db: {
          transfers,
          accounts,
        },
      }
    },
  })

  // ------------------------------------------------------------------------ //
  // HTTP 1.0 methods

  // ------------------------------------------------------------------------ //
  // Vault

  app.get('/api/vault/tenant', async (req, res) => {
    console.log('GET /api/vault/tenant')

    res.type('application/json').code(200)

    const tenants = {}
    accounts
      .find()
      .forEach((item) => {
        tenants[item.tenant] = true
      })
    return Object.keys(tenants)
  })

  app.post('/api/vault/account/:tenant', async (req, res) => {
    console.log('POST /api/vault/account/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    if (!req.body) {
      res.type('application/json').code(400)
      return {}
    }

    try {
      const { accountNumber, currency, isBalanceCheck } = req.body

      if (!accountNumber || !currency || !isBalanceCheck) {
        res.type('application/json').code(400)
        return {}
      }

      accounts.insert({
        id: `${tenant}/${accountNumber}`,
        tenant,
        name: accountNumber,
        currency,
        isBalanceCheck,
      })

      tenants
      res.type('application/json').code(200)
      return {}
    } catch (err) {
      console.log(err)
      res.type('application/json').code(409)
      return {}
    }
  })

  // ------------------------------------------------------------------------ //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    console.log('GET /api/bondster/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    res.type('application/json').code(200)
    return bondster.find({ tenant }).map((item) => ({
      value: item.id,
      createdAt: item.createdAt.toISOString(),
    }))
  })

  app.post('/api/bondster/token/:tenant', async (req, res) => {
    console.log('POST /api/bondster/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    if (!req.body) {
      res.type('application/json').code(400)
      return {}
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        res.type('application/json').code(400)
        return {}
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

      res.type('application/json').code(200)
      return {
        value: id,
        createdAt: createdAt.toISOString(),
      }
    } catch (err) {
      console.log(err)
      res.type('application/json').code(400)
      return {}
    }
  })

  // ------------------------------------------------------------------------ //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    console.log('GET /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    res.type('application/json').code(200)
    return fio.find({ tenant }).map((item) => ({
      value: item.id,
      createdAt: item.createdAt.toISOString(),
    }))
  })

  app.post('/api/fio/token/:tenant', async (req, res) => {
    console.log('POST /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    if (!req.body) {
      res.type('application/json').code(400)
      return {}
    }

    try {
      const { value } = req.body

      if (!value) {
        res.type('application/json').code(400)
        return {}
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

      res.type('application/json').code(200)
      return {
        value: id,
        createdAt: createdAt.toISOString(),
      }
    } catch (err) {
      console.log(err)
      res.type('application/json').code(400)
      return {}
    }
  })

  // ------------------------------------------------------------------------ //

  return app
}
