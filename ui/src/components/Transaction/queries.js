import gql from 'graphql-tag';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($tenant: String!) {
    Transactions(tenant: $tenant) {
      id
      status
      transfers {
        id
        amount
        currency
        valueDate
        credit {
          name
          tenant
          isBalanceCheck
        }
        debit {
          name
          tenant
          isBalanceCheck
        }
      }
    }
  }
`;

export default {


}

