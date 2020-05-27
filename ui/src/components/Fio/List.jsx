import React from 'react'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useTenant } from 'containers/Tenant'
import { GET_FIO_TOKENS } from '../../resolvers';

export const DELETE_TOKEN = gql`
  mutation removeFioToken($tenant: String!, $id: String!) {
    removeFioToken(tenant: $tenant, id: $id) @client
  }
`;

const List = (props) => {
  const tenant = useTenant()

  if (!tenant) {
    return null
  }

  const { data, error } = useQuery(GET_FIO_TOKENS, {
    variables: {
      tenant: tenant,
    },
  });

  const [mutate, { idDeleting }] = useMutation(DELETE_TOKEN);

  const deleteToken = (id) => {
    mutate({
      variables: {
        tenant: tenant,
        id: id,
      },
      refetchQueries: [
        {
          query: GET_FIO_TOKENS,
          variables: { tenant: tenant },
        },
      ]
    })
  }

  if (!data.fioTokens || data.fioTokens.length == 0) {
    return 'No data'
  }

  return (
    <ul>
      {data.fioTokens.map((token) => (
        <li key={token.id}>
          {`${token.id} ${token.createdAt}`}
          <button
            onClick={() => deleteToken(token.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List
