import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TOKENS } from './queries'
import { DELETE_TOKEN } from './mutations'


const List = (props) => {
  const { tenant } = useTenant()

  const query = useQuery(GET_TOKENS, {
    variables: {
      tenant: tenant,
    },
  });

  const [mutate, mutation] = useMutation(DELETE_TOKEN);

  if (query.error || !tenant) {
    return null
  }

  const deleteToken = (id) => {
    mutate({
      variables: {
        tenant: tenant,
        id: id,
      },
      refetchQueries: [
        {
          query: GET_TOKENS,
          variables: { tenant: tenant },
        },
      ]
    })
  }

  if (!query.data || !query.data.fioTokens || query.data.fioTokens.length == 0) {
    return 'No data'
  }

  return (
    <ul>
      {query.data.fioTokens.map((token) => (
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
