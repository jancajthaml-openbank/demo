import gql from 'graphql-tag'
import FioService from './service'
import { GET_TOKENS } from './queries'


export const SYNCHRONIZE_TOKEN = gql`
  mutation synchronizeFioToken($tenant: String!, $id: String!) {
    synchronizeFioToken(tenant: $tenant, id: $id) @client
  }
`;

export const DELETE_TOKEN = gql`
  mutation removeFioToken($tenant: String!, $id: String!) {
    removeFioToken(tenant: $tenant, id: $id) @client
  }
`;

export const CREATE_TOKEN = gql`
  mutation createFioToken($tenant: String!, $value: String!) {
    createFioToken(tenant: $tenant, value: $value) @client
  }
`;


export default {

  createFioToken: async (_, request, ctx) => {
    const result = await FioService.createToken(request.tenant, request.value)
    const queryResult = ctx.cache.readQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
    });
    if (queryResult) {
      const { fioTokens } = queryResult;
      const data = {
        fioTokens: fioTokens.find((item) => item.id == result.id)
          ? fioTokens
          : [...fioTokens, result],
      };
      ctx.cache.writeQuery({
        query: GET_TOKENS,
        variables: {
          tenant: request.tenant,
        },
        data,
      });
      return data.fioTokens;
    }
    return [];
  },

  removeFioToken: async (_, request, ctx) => {
    await FioService.deleteToken(request.tenant, request.id)
    const queryResult = ctx.cache.readQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
    });
    if (queryResult) {
      const { fioTokens } = queryResult;
      const data = {
        fioTokens: fioTokens.filter((item) => item.id !== request.id),
      };
      ctx.cache.writeQuery({
        query: GET_TOKENS,
        variables: {
          tenant: request.tenant,
        },
        data
      });
      return data.fioTokens;
    }
    return [];
  },

  synchronizeFioToken: async (_, request, ctx) => {
    await FioService.synchronizeToken(request.tenant, request.id)
    return [];
  },

}
