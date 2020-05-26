import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client'
import BondsterService from 'containers/Bondster/service';
import FioService from 'containers/Fio/service';


export const GET_ACCOUNTS = gql`
  query GetAccounts($tenant: String!) {
    Accounts(tenant: $tenant) {
      name
      format
      currency
    }
  }
`;


export const GET_BONDSTER_TOKENS = gql`
  query GetBonsterTokens($tenant: String!) {
    bondsterTokens(tenant: $tenant) @client
  }
`;

export const GET_FIO_TOKENS = gql`
  query GetFioTokens($tenant: String!) {
    fioTokens(tenant: $tenant) @client
  }
`;

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
    createBondsterToken: async (_, request, { cache }) => {
      const result = await BondsterService.createToken(request.tenant, request.username, request.password)
      const queryResult = cache.readQuery({ query: GET_BONDSTER_TOKENS });
      if (queryResult) {
        const { bondsterTokens } = queryResult;
        const data = {
          bondsterTokens: bondsterTokens.find((item) => item.id == result.id)
            ? bondsterTokens
            : [...bondsterTokens, result],
        };
        cache.writeQuery({ query: GET_BONDSTER_TOKENS, data });
        return data.bondsterTokens;
      }
      return [];
    },
    removeBondsterToken: async (_, request, { cache }) => {
      await BondsterService.deleteToken(request.tenant, request.id)
      const queryResult = cache.readQuery({ query: GET_BONDSTER_TOKENS });
      if (queryResult) {
        const { bondsterTokens } = queryResult;
        const data = {
          bondsterTokens: bondsterTokens.filter((item) => item.id !== request.id),
        };
        cache.writeQuery({ query: GET_BONDSTER_TOKENS, data });
        return data.bondsterTokens;
      }
      return [];
    },
    createFioToken: async (_, request, { cache }) => {
      const result = await FioService.createToken(request.tenant, request.value)
      const queryResult = cache.readQuery({ query: GET_FIO_TOKENS });
      if (queryResult) {
        const { fioTokens } = queryResult;
        const data = {
          fioTokens: fioTokens.find((item) => item.id == result.id)
            ? fioTokens
            : [...fioTokens, result],
        };
        cache.writeQuery({ query: GET_FIO_TOKENS, data });
        return data.fioTokens;
      }
      return [];
    },
    removeFioToken: async (_, request, { cache }) => {
      await FioService.deleteToken(request.tenant, request.id)
      const queryResult = cache.readQuery({ query: GET_FIO_TOKENS });
      if (queryResult) {
        const { fioTokens } = queryResult;
        const data = {
          fioTokens: fioTokens.filter((item) => item.id !== request.id),
        };
        cache.writeQuery({ query: GET_FIO_TOKENS, data });
        return data.fioTokens;
      }
      return [];
    },
  },
  Query: {
    bondsterTokens: async (_, request, { cache }) => {
      const result = await BondsterService.getTokens(request.tenant);
      const data = { bondsterTokens: result }
      cache.writeQuery({ query: GET_BONDSTER_TOKENS, data });
      return data.bondsterTokens;
    },
    fioTokens: async (_, request, { cache }) => {
      const result = await FioService.getTokens(request.tenant);
      const data = { fioTokens: result }
      cache.writeQuery({ query: GET_FIO_TOKENS, data });
      return data.fioTokens;
    }
  },
};
