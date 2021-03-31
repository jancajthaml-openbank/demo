import gql from 'graphql-tag';

export const GET_ACCOUNTS = gql`
  query GetAccounts($tenant: String!, $limit: NaturalNumber!, $offset: NaturalNumber!) {
    accounts(tenant: $tenant, limit: $limit, offset: $offset) {
      name
      format
      currency
      balance
    }
  }
`;

export default {


}

