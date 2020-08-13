import gql from 'graphql-tag';

export const GET_TRANSFERS = gql`
  query GetTransfers($tenant: String!, $limit: Int!, $offset: Int!) {
    transfers(tenant: $tenant, limit: $limit, offset: $offset) {
      transaction
      transfer
      amount
      currency
      valueDate
      credit {
        name
        tenant {
          name
        }
      }
      debit {
        name
        tenant {
          name
        }
      }
    }
  }
`;

export default {


}
