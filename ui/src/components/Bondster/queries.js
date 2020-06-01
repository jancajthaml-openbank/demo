import gql from 'graphql-tag';
import BondsterService from './service';

export const GET_TOKENS = gql`
  query GetBonsterTokens($tenant: String!) {
    bondsterTokens(tenant: $tenant) @client
  }
`;

export default {

  bondsterTokens : async (_, request, ctx) => {
    const result = await BondsterService.getTokens(request.tenant);
    ctx.cache.writeQuery({
      query: GET_TOKENS,
      variables: {
        tenant: request.tenant,
      },
      data: {
        bondsterTokens: result,
      },
    });
    return result;
  },

}

