import React from 'react'

const List = (props) => {

  React.useEffect(() => {
    props.loadTokens(props.tenant)
  }, [props.tenant])

  if (props.tokens.length == 0) {
    return 'No data'
  }

  return (
    <ul>
      {props.tokens.map((token) => (
        <li key={token.id}>
          {`${token.id} ${token.createdAt}`}
        </li>
      ))}
    </ul>
  )
}

export default List
