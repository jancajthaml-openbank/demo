import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router } from "react-router-dom"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import './stylesheets'
import { configureGlobalisation } from './setup'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './containers/Layout'
import { TenantContextProvider } from './containers/Tenant'

import { resolvers, typeDefs } from './resolvers';


const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: '/api/search/graphql',
  }),
  resolvers,
  typeDefs,
});

const App = (globalisation) => (
  <ErrorBoundary>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <TenantContextProvider tenant={'mock'} >
          <Router>
            <Layout />
          </Router>
        </TenantContextProvider>
      </ApolloProvider>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const [ globalisation ] = await Promise.all([
    configureGlobalisation(),
  ])

  const mountNode = document.getElementById("mount")

  const render = (process.env.NODE_ENV !== 'production' && module.hot)
    ? ReactDOM.render
    : ReactDOM.hydrate

  render(App(globalisation), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
