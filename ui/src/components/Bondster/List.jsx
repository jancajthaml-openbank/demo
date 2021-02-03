import React from 'react'
import { useTenant } from 'containers/Tenant'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TOKENS } from './queries'
import { DELETE_TOKEN, SYNCHRONIZE_TOKEN} from './mutations'


const List = (props) => {
  const { tenant } = useTenant()

  const query = useQuery(GET_TOKENS, {
    variables: {
      tenant: tenant,
    },
  });

  const [deleteTokenMutation, _a] = useMutation(DELETE_TOKEN);
  const [synchronizeTokenMutation, _b] = useMutation(SYNCHRONIZE_TOKEN);
  
  if (query.error || !tenant) {
    return null
  }

  const deleteToken = (id) => {
    deleteTokenMutation({
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

  const synchronizeToken = (id) => {
    synchronizeTokenMutation({
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

  if (query.loading && !query.data) {
    return null
  }

  if (!query.data || !query.data.bondsterTokens || query.data.bondsterTokens.length == 0) {
    return 'No data'
  }

  return (
    <ul>
      {query.data.bondsterTokens.map((token) => (
        <li key={token.id}>
          {`${token.id} ${token.createdAt}`}
          <button
            onClick={() => deleteToken(token.id)}
          >
            delete
          </button>
          <button
            onClick={() => synchronizeToken(token.id)}
          >
            synchronize
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List
