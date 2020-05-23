import gql from 'graphql-tag';
//import { GET_CART_ITEMS } from './pages/cart';
//import * as LaunchTileTypes from './pages/__generated__/LaunchTile';
import { ApolloCache } from 'apollo-cache';
//import * as GetCartItemTypes from './pages/__generated__/GetCartItems';
import { Resolvers } from 'apollo-client'

export const typeDefs = gql`

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

  scalar Date
  scalar Money

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
  /*
  Launch: {
    isInCart: (launch) => {
      const queryResult = cache.readQuery({ query: GET_CART_ITEMS });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id)
      }
      return false;
    }
  },
  Mutation: {
    addOrRemoveFromCart: (_, { id }, { cache }) => {
      const queryResult = cache.readQuery({ query: GET_CART_ITEMS });
      if (queryResult) {
        const { cartItems } = queryResult;
        const data = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter((i) => i !== id)
            : [...cartItems, id],
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
      return [];
    },
  },
  */
};
