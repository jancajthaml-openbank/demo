const fs = require('fs')
const path = require('path')
const fastify = require('fastify')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const loki = require('lokijs')
const { randomId } = require('./utils/random')
const { Accounts, Transactions, Transfers } = require('./resolver')
const { DateScalar, MoneyScalar } = require('./scalar')

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

  const randomAccount = () => {
    const tenant = 'random'

    const ktnr = (Math.round(Math.random() * 8999999) + 1000000)
    const pruef = 98 - (((ktnr * 1000000) + 43) % 97)
    const name = `${(pruef > 9 ? 'DE' : 'DE0')}${pruef}70050000000${ktnr}`

    return {
      id: `${tenant}/${name}`,
      tenant,
      name,
      currency: "EUR",
      isBalanceCheck: false,
    }
  }

  [...Array(20000)].map(randomAccount).forEach((item) => {
    try {
      accounts.insert(item)
    } catch(err) {

    }
  })

  accounts.insert({
    "id": "test/A",
    "tenant": "test",
    "name": "A",
    "currency": "CZK",
    "isBalanceCheck": false,
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
    "tenant": "demo",
    "status": "committed",
    "transfer": "T_1",
    "transaction": "TRS",
    "amount": "1.0",
    "currency": "EUR",
    "credit": "demo/B",
    "debit": "demo/A",
    "valueDate": new Date(),
  })

  transfers.insert({
    "id": "demo/TRS/T_2",
    "tenant": "demo",
    "status": "committed",
    "transfer": "T_2",
    "transaction": "TRS",
    "amount": "2.0",
    "currency": "EUR",
    "credit": "demo/C",
    "debit": "demo/B",
    "valueDate": new Date(),
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
    return fio.find({ tenant }).map((item) => item.id)
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

  // ------------------------------------------------------------------------ //

  return app
}
