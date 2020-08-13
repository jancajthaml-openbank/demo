import gql from 'graphql-tag';

export const GET_ACCOUNT = gql`
  query GetAccount($tenant: String!, $name: String!) {
    account(tenant: $tenant, name: $name) {
      name
      format
      currency
      balance
    }
  }
`;

export default {


}

