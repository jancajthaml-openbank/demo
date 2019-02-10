const fs = require('fs')
const path = require('path')
const fastify = require('fastify')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const loki = require('lokijs')

const { Accounts, Transactions, Transfers } = require('./resolver')
const { DateScalar, MoneyScalar } = require('./scalar')

// -------------------------------------------------------------------------- //

function randId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 20)
}
// -------------------------------------------------------------------------- //

module.exports = function(application) {
  const app = application || fastify()
  const db = new loki('db.json')

  const tenants = db.addCollection('tenants', {
    unique: ['tenant'],
  })
  const accounts = db.addCollection('accounts', {
    unique: ['id'],
  })
  const transfers = db.addCollection('transfers', {
  })
  const fio = db.addCollection('fio', {
    unique: ['id'],
  })
  const bondster = db.addCollection('bondster', {
    unique: ['id'],
  })

  accounts.insert({
    "id": "demo/A",
    "tenant": "demo",
    "name": "A",
    "currency": "EUR",
    "isBalanceCheck": false,
  })

  accounts.insert({
    "id": "demo/B",
    "tenant": "demo",
    "name": "B",
    "currency": "EUR",
    "isBalanceCheck": false,
  })

  accounts.insert({
    "id": "demo/C",
    "tenant": "demo",
    "name": "C",
    "currency": "EUR",
    "isBalanceCheck": false,
  })

  transfers.insert({
    "id": "demo/TRS/T_1",
    "transfer": "T_1",
    "transaction": "TRS",
    "amount": "1.0",
    "currency": "EUR",
    "credit": "B",
    "debit": "A"
  })

  transfers.insert({
    "id": "demo/TRS/T_2",
    "transfer": "T_2",
    "transaction": "TRS",
    "amount": "2.0",
    "currency": "EUR",
    "credit": "C",
    "debit": "B"
  })

  // -------------------------------------------------------------------------- //
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

  // -------------------------------------------------------------------------- //
  // HTTP 1.0 methods

  // -------------------------------------------------------------------------- //
  // Vault

  app.get('/api/vault/tenant', async (req, res) => {
    console.log('GET /api/vault/tenant')

    res.type('application/json').code(200)

    return [
      'demo',
      'test',
    ]
  })

  // -------------------------------------------------------------------------- //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    console.log('GET /api/bondster/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    res.type('application/json').code(200)
    return bondster.find({ tenant }).map((item) => item.id)
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

      let id = randId()
      while (bondster.find({ tenant, id }).length > 0) {
        id = uuid()
      }

      bondster.insert({
        id,
        tenant,
        username,
        password,
      })

      res.type('application/json').code(200)
      return { value: id }
    } catch (err) {
      console.log(err)
      res.type('application/json').code(400)
      return {}
    }
  })

  // -------------------------------------------------------------------------- //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    console.log('GET /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    res.type('application/json').code(200)
    return fio.find({ tenant }).map((item) => item.id)

  })

  app.post('/api/fio/token/:tenant', async (req, res) => {
    console.log('POST /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.type('application/json').code(404)
      return {}
    }

    if (!FIO[tenant]) {
      FIO[tenant] = {}
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

      let id = randId()
      while (fio.find({ tenant, id }).length > 0) {
        id = uuid()
      }

      fio.insert({
        id,
        tenant,
        value,
      })

      res.type('application/json').code(200)
      return { value: id }
    } catch (err) {
      console.log(err)
      res.type('application/json').code(400)
      return {}
    }
  })

  // -------------------------------------------------------------------------- //

  return app
}
