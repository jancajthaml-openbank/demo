import gql from 'graphql-tag'
import BondsterService from './service'
import { GET_TOKENS } from './queries'



export const SYNCHRONIZE_TOKEN = gql`
  mutation synchronizeBondsterToken($tenant: String!, $id: String!) {
    synchronizeBondsterToken(tenant: $tenant, id: $id) @client
  }
`;

export const DELETE_TOKEN = gql`
  mutation removeBondsterToken($tenant: String!, $id: String!) {
    removeBondsterToken(tenant: $tenant, id: $id) @client
  }
`;

export const CREATE_TOKEN = gql`
  mutation createBondsterToken($tenant: String!, $username: String!, $password: String!) {
    createBondsterToken(tenant: $tenant, username: $username, password: $password) @client
  }
`;


export default {

  createBondsterToken: async (_, request, ctx) => {
    const result = await BondsterService.createToken(request.tenant, request.username, request.password)
    const queryResult = ctx.cache.readQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
    });
    if (queryResult) {
      const { bondsterTokens } = queryResult;
      const data = {
        bondsterTokens: bondsterTokens.find((item) => item.id == result.id)
          ? bondsterTokens
          : [...bondsterTokens, result],
      };
      ctx.cache.writeQuery({
        query: GET_TOKENS,
        variables: {
          tenant: request.tenant,
        },
        data,
      });
      return data.bondsterTokens;
    }
    return [];
  },

  removeBondsterToken: async (_, request, ctx) => {
    await BondsterService.deleteToken(request.tenant, request.id)
    const queryResult = ctx.cache.readQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
    });
    if (queryResult) {
      const { bondsterTokens } = queryResult;
      const data = {
        bondsterTokens: bondsterTokens.filter((item) => item.id !== request.id),
      };
      ctx.cache.writeQuery({
        query: GET_TOKENS,
        variables: {
          tenant: request.tenant,
        },
        data
      });
      return data.bondsterTokens;
    }
    return [];
  },

  synchronizeBondsterToken: async (_, request, ctx) => {
    await BondsterService.synchronizeToken(request.tenant, request.id)
    return [];
  },

}
