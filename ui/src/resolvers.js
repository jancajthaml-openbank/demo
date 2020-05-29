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


export const typeDefs = gql`

  scalar Date
  scalar Money

  type Token {
    id: String!
    createdAt: Date!
  }

  extend type Mutation {
    createBondsterToken(tenant: String!, username: String!, password: String!): [Token!]!
    removeBondsterToken(tenant: String!, id: String!): [Token!]!
    createFioToken(tenant: String!, value: String!): [Token!]!
    removeFioToken(tenant: String!, id: String!): [Token!]!
  }

  extend type Query {
    bondsterTokens(tenant: String!): [Token!]!
    fioTokens(tenant: String!): [Token!]!
  }

  type Transaction {
    tenant: String!
    id: String
    status: String
    transfers: [Transfer]!
  }

  type Transfer {
    tenant: String!
    transaction: String
    id: String
    status: String
    credit: Account
    debit: Account
    valueDate: Date
    amount: Money
    currency: String
  }

  type Account {
    tenant: String!
    name: String!
    format: String
    currency: String
    isBalanceCheck: Boolean
  }


  enum SortOrder {
    ASC
    DESC
  }

  type Query {

    Account(
      tenant: String!,
      name: String!
    ): Account

    Accounts(
      tenant: String!,
      format: String,
      currency: String,
      isBalanceCheck: Boolean,
      take: Int,
      skip: Int,
      sortField: String,
      sortOrder: SortOrder
    ): [Account]

    Transaction(
      tenant: String!,
      transaction: String!
    ): Transaction

    Transactions(
      tenant: String!,
      credit: String,
      debit: String,
      status: String,
      currency: String,
      amount: Money,
      minAmount: Money,
      maxAmount: Money,
      valueDate: Date,
      toValueDate: Date,
      fromValueDate: Date,
      take: Int,
      skip: Int,
      sortField: String,
      sortOrder: SortOrder
    ): [Transaction]

    Transfer(
      tenant: String!,
      transaction: String!,
      transfer: String!
    ): Transfer

    Transfers(
      tenant: String!,
      transaction: String,
      credit: String,  # FIXME account
      debit: String,   # FIXME account
      status: String,  # FIXME enum
      currency: String,
      amount: Money,
      minAmount: Money,
      maxAmount: Money,
      valueDate: Date,
      toValueDate: Date,
      fromValueDate: Date,
      take: Int,
      skip: Int,
      sortField: String,
      sortOrder: SortOrder
    ): [Transfer]

  }
`;


export const resolvers = {
  Mutation: {
    ...bondsterMutations,
    ...fioMutations,
    ...accountMutations,
  },
  Query: {
    ...bondsterQueries,
    ...fioQueries,
    ...accountQueries,
  },
};
