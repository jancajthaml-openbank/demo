import React from 'react'
import TenantService from 'containers/Tenant/service'
import { TenantContextProvider } from 'containers/Tenant'
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router } from "react-router-dom"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { resolvers, typeDefs } from '../../resolvers';


const Providers = (props) => {

  const [state, setState] = React.useState({
    tenants: null,
    client: null,
    isReady: false,
  })

  const setup = async () => {
    const [
      tenants,
    ] = await Promise.all([
      TenantService.getTenants(),
    ])

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: '/api/search/graphql',
      }),
      resolvers,
      typeDefs,
    });

    setState({
      client: client,
      tenants: tenants,
      isReady: true,
    })
  }

  React.useEffect(() => {
    setup()
  }, [])

  if (!state.isReady) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <ApolloProvider client={state.client}>
      <TenantContextProvider tenants={state.tenants}>
        <Router>
          {props.children}
        </Router>
      </TenantContextProvider>
    </ApolloProvider>
  )
}


export default Providers
