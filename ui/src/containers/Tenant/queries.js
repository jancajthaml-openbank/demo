import gql from 'graphql-tag';

export const GET_TENANTS = gql`
  query GetTenants($limit: NaturalNumber!, $offset: NaturalNumber!) {
    tenants(limit: $limit, offset: $offset) {
      name
    }
  }
`;
