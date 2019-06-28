const fs = require('fs')
const path = require('path')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const loki = require('lokijs')
const { randomId } = require('./utils/random')
const { Accounts, Transactions, Transfers } = require('./resolver')
const { DateScalar, MoneyScalar } = require('./scalar')
const { generateRandomAccounts, generateRandomTransactions } = require('./resources/data')

// -------------------------------------------------------------------------- //

module.exports = function(application) {
  const app = application || express()
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

  const randomAccounts = generateRandomAccounts('mock', accounts, 2000)
  const randomTransfers = generateRandomTransactions('mock', transfers, randomAccounts, 100)

  // ------------------------------------------------------------------------ //
  // GraphQL methods

  app.use('/api/search/graphql', graphqlHTTP({
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
    },
    graphiql: true
  }))

  // ------------------------------------------------------------------------ //
  // HTTP 1.0 methods

  // ------------------------------------------------------------------------ //
  // Vault

  app.get('/api/vault/tenant', async (req, res) => {
    console.log('GET /api/vault/tenant')

    //res.type('application/json').code(200)

    const tenants = {}
    accounts
      .find()
      .forEach((item) => {
        tenants[item.tenant] = true
      })

    res.status(200).json(Object.keys(tenants))

    //return Object.keys(tenants)
  })

  app.post('/api/vault/account/:tenant', async (req, res) => {
    console.log('POST /api/vault/account/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      //res.type('application/json').code(404)
      res.status(404).json({})
      return
    }

    if (!req.body) {
      //res.type('application/json').code(400)
      res.status(404).json({})
      return
    }

    try {
      const { accountNumber, currency, isBalanceCheck } = req.body

      if (!accountNumber || !currency || !isBalanceCheck) {
        //res.type('application/json').code(400)
        res.status(400).json({})
        return
      }

      accounts.insert({
        id: `${tenant}/${accountNumber}`,
        tenant,
        name: accountNumber,
        currency,
        isBalanceCheck,
      })

      tenants
      //res.type('application/json').code(200)
      res.status(200).json({})
      return
    } catch (err) {
      console.log(err)
      //res.type('application/json').code(409)
      res.status(409).json({})
      return
    }
  })

  // ------------------------------------------------------------------------ //
  // Bondster

  app.get('/api/bondster/token/:tenant', async (req, res) => {
    console.log('GET /api/bondster/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      //res.type('application/json').code(404)
      res.status(404).json({})
      return
    }

    //res.type('application/json').code(200)

    res.status(200).json(bondster.find({ tenant }).map((item) => ({
      value: item.id,
      createdAt: item.createdAt.toISOString(),
    })))

    //return
  })

  app.post('/api/bondster/token/:tenant', async (req, res) => {
    console.log('POST /api/bondster/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      //res.type('application/json').code(404)
      res.status(404).json({})
      return
    }

    if (!req.body) {
      //res.type('application/json').code(400)
      res.status(400).json({})
      return
    }

    try {
      const { username, password } = req.body

      if (!username || !password) {
        //res.type('application/json').code(400)
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
        value: id,
        createdAt: createdAt.toISOString(),
      })
      //res.type('application/json').code(200)
      return
    } catch (err) {
      console.log(err)
      //res.type('application/json').code(400)
      res.status(400).json({})
      return
    }
  })

  // ------------------------------------------------------------------------ //
  // Fio

  app.get('/api/fio/token/:tenant', async (req, res) => {
    console.log('GET /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      //res.type('application/json').code(404)
      return
    }

    //res.type('application/json').code(200)

    res.status(200).json(fio.find({ tenant }).map((item) => ({
      value: item.id,
      createdAt: item.createdAt.toISOString(),
    })))
    return
  })

  app.post('/api/fio/token/:tenant', async (req, res) => {
    console.log('POST /api/fio/token/:tenant')

    const { tenant } = req.params

    if (!tenant) {
      res.status(404).json({})
      //res.type('application/json').code(404)
      return
    }

    if (!req.body) {
      //res.type('application/json').code(400)
      res.status(400).json({})
      return
    }

    try {
      const { value } = req.body

      if (!value) {
        res.status(400).json({})
        //res.type('application/json').code(400)
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
        value: id,
        createdAt: createdAt.toISOString(),
      })
      //res.type('application/json').code(200)
      return
    } catch (err) {
      console.log(err)
      //res.type('application/json').code(400)
      res.status(400).json({})
      return
    }
  })

  // ------------------------------------------------------------------------ //

  return app
}
