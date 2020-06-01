import React from 'react'
import ReactDOM from 'react-dom'
//import { ApolloClient } from 'apollo-client';
//import { BrowserRouter as Router } from "react-router-dom"
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import { HttpLink } from 'apollo-link-http';
//import { ApolloProvider } from '@apollo/react-hooks';
import './stylesheets'
//import { configureGlobalisation } from './setup'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Layout } from 'containers/Layout'
import { Providers } from 'containers/Providers'

//import { TenantContextProvider } from './containers/Tenant'

//import { resolvers, typeDefs } from './resolvers';

//import { createBrowserHistory } from 'history'

//const cache = new InMemoryCache()
//const history = createBrowserHistory({})
/*
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: '/api/search/graphql',
  }),
  resolvers,
  typeDefs,
});
*/

// FIXME Providers in a module and also implement tenants not literal "mock"
const App = () => (
  <ErrorBoundary>
    <React.StrictMode>
      <Providers>
        <Layout />
      </Providers>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const mountNode = document.getElementById("mount")
  ReactDOM.render(App(), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
