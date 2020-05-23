import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Table from './Table'

export const GET_ACCOUNTS = gql`
  query GetAccounts($tenant: String!) {
    Accounts(tenant: $tenant) {
      name
      format
      currency
    }
  }
`;

const List = (props) => {
  const { data, loading, error } = useQuery(GET_ACCOUNTS, {
    variables: {
      tenant: props.tenant,
    },
    pollInterval: 1000,
  });

  const columns = [{
    Header: 'Name',
    accessor: 'name'
  }, {
    Header: 'Currency',
    accessor: 'currency'
  }, {
    Header: 'Format',
    accessor: 'format'
  }]

  return (
    <Table
      loading={loading}
      columns={columns}
      data={data.Accounts || []}
    />
  )
}

export default List
