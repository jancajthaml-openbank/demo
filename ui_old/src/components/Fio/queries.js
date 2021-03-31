import gql from 'graphql-tag';
import FioService from './service';

export const GET_TOKENS = gql`
  query GetFioTokens($tenant: String!) {
    fioTokens(tenant: $tenant) @client
  }
`;

export default {

  fioTokens : async (_, request, ctx) => {
    const result = await FioService.getTokens(request.tenant);
    ctx.cache.writeQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
      data: {
        fioTokens: result,
      },
    });
    return result;
  },

}

