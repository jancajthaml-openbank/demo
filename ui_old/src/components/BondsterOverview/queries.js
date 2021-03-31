import gql from 'graphql-tag';

export const GET_BONDSTER_TECHNICAL_ACCOUNTS_FOR_CURRENCY = gql`
  query GetAccount($tenant: String!, $currency: String!) {
    accounts(tenant: $tenant, format: "BONDSTER_TECHNICAL", currency: $currency, limit: 1000, offset: 0) {
      name
      balance
    }
  }
`;

export default {


}

