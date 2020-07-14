import gql from 'graphql-tag';

export const GET_ACCOUNTS = gql`
  query GetAccounts($tenant: String!) {
    accounts(tenant: $tenant, limit: 10000, offset: 0) {
      name
      format
      currency
    }
  }
`;

export default {


}

