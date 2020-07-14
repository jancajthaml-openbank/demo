import gql from 'graphql-tag';

export const GET_TENANTS = gql`
  query GetTenants($limit: Int!, $offset: Int!) {
    tenants(limit: $limit, offset: $offset) {
      name
    }
  }
`;
