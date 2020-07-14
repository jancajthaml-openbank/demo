import gql from 'graphql-tag'
import { ApolloCache } from 'apollo-cache'
import { Resolvers } from 'apollo-client'
import FioService from 'components/Fio/service'

import bondsterQueries from 'components/Bondster/queries'
import bondsterMutations from 'components/Bondster/mutations'

import fioQueries from 'components/Fio/queries'
import fioMutations from 'components/Fio/mutations'

import accountQueries from 'components/Account/queries'
import accountMutations from 'components/Account/mutations'

import transactionQueries from 'components/Transaction/queries'
import transactionMutations from 'components/Transaction/mutations'


export const typeDefs = gql`

  scalar DateTime

  scalar BigDecimal

  type Token {
    id: String!
    createdAt: DateTime!
  }

  extend type mutation {
    createBondsterToken(tenant: String!, username: String!, password: String!): [Token!]!
    removeBondsterToken(tenant: String!, id: String!): [Token!]!
    createFioToken(tenant: String!, value: String!): [Token!]!
    removeFioToken(tenant: String!, id: String!): [Token!]!
  }

  extend type query {
    bondsterTokens(tenant: String!): [Token!]!
    fioTokens(tenant: String!): [Token!]!
  }

  type Tenant {
    name: String!
  }

  type Transfer {
    tenant: Tenant!
    transaction: String!
    transfer: String!
    credit: Account!
    debit: Account!
    valueDate: DateTime!
    amount: BigDecimal!
    currency: String!
  }

  type Account {
    tenant: Tenant!
    name: String!
    format: String!
    currency: String!
    balance: BigDecimal!
  }

  type query {

    tenants(
      limit: Int!,
      offset: Int!
    ): [Tenant!]!

    accounts(
      tenant: String!,
      format: String,
      currency: String,
      format: String,
      limit: Int!,
      offset: Int!
    ): [Account!]!

    transfers(
      tenant: String!,
      transaction: String,
      currency: String,
      valueDateLte: DateTime,
      valueDateGte: DateTime,
      amountLte: BigDecimal,
      amountGte: BigDecimal,
      limit: Int!,
      offset: Int!
    ): [Transfer!]!

  }

`;


export const resolvers = {
  Mutation: {
    ...bondsterMutations,
    ...fioMutations,
    ...accountMutations,
    ...transactionMutations,
  },
  Query: {
    ...bondsterQueries,
    ...fioQueries,
    ...accountQueries,
    ...transactionQueries,
  },
};
