
const fs = require('fs')
const path = require('path')
const express = require('express')
const graphqlHTTP = require('express-graphql')
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
  const randomTenants = generateRandomTenants(tenants, 2)
  randomTenants.forEach((tenant) => {
    const randomAccounts = generateRandomAccounts(tenant.name, accounts, 1000)
    const bondsterAccounts = generateBondsterAccounts(tenant.name, accounts)
    const generatedAccounts = [...randomAccounts, ...bondsterAccounts]
    const randomTransfers = generateRandomTransactions(tenant.name, transfers, generatedAccounts, 1000)
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
        query: {
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
    graphiql: true
  }))

  // ------------------------------------------------------------------------ //
  // HTTP 1.0 methods

  // ------------------------------------------------------------------------ //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      return
    }

    res.status(200).json(bondster.find({ tenant }).map((item) => ({
      id: item.id,
      createdAt: item.createdAt.toISOString(),
    })))
  })

  app.delete('/api/bondster/token/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params

    if (!tenant || !id) {
      res.status(404).json({})
      return
    }

    if (!bondster.chain().find({ tenant, id }).remove()) {
      return res.status(404).json({})
    }

    res.status(200).json({})
  })

  app.post('/api/bondster/token/:tenant', express.json({ type: '*/*' }), async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      return
    }

    if (!req.body) {
      res.status(400).json({})
      return
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        res.status(400).json({})
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

      res.status(200).json({
        id,
        createdAt: createdAt.toISOString(),
      })
      return
    } catch (err) {
      console.log(err)
      res.status(400).json({})
      return
    }
  })

  // ------------------------------------------------------------------------ //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      return
    }

    res.status(200).json(fio.find({ tenant }).map((item) => ({
      id: item.id,
      createdAt: item.createdAt.toISOString(),
    })))
    return
  })

  app.delete('/api/fio/token/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params

    if (!tenant || !id) {
      res.status(404).json({})
      return
    }

    if (!fio.chain().find({ tenant, id }).remove()) {
      return res.status(404).json({})
    }

    res.status(200).json({})
  })

  app.post('/api/fio/token/:tenant', express.json({ type: '*/*' }), async (req, res) => {
    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      return
    }

    if (!req.body) {
      res.status(400).json({})
      return
    }

    try {
      const { value } = req.body

      if (!value) {
        res.status(400).json({})
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

      res.status(200).json({
        id,
        createdAt: createdAt.toISOString(),
      })
      return
    } catch (err) {
      console.log(err)
      res.status(400).json({})
      return
    }
  })

  // ------------------------------------------------------------------------ //

  return app
}
