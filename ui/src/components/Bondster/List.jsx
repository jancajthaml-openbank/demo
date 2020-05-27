import React from 'react'
import gql from 'graphql-tag';
import { useTenant } from 'containers/Tenant'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BONDSTER_TOKENS } from '../../resolvers';

export const DELETE_TOKEN = gql`
  mutation removeBondsterToken($tenant: String!, $id: String!) {
    removeBondsterToken(tenant: $tenant, id: $id) @client
  }
`;


const List = (props) => {
  const tenant = useTenant()

  if (!tenant) {
    return null
  }

  const { data, error } = useQuery(GET_BONDSTER_TOKENS, {
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
          query: GET_BONDSTER_TOKENS,
          variables: { tenant: tenant },
        },
      ]
    })
  }

  if (!data.bondsterTokens || data.bondsterTokens.length == 0) {
    return 'No data'
  }

  return (
    <ul>
      {data.bondsterTokens.map((token) => (
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
