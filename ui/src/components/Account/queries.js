import gql from 'graphql-tag';

export const GET_ACCOUNTS = gql`
  query GetAccounts($tenant: String!) {
    Accounts(tenant: $tenant) {
      name
      format
      currency
    }
  }
`;

export default {


}

