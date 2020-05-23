import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router } from "react-router-dom"
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import './stylesheets'
import { configureGlobalisation, configureStore } from './setup'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './containers/Layout'
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

const App = (store, globalisation) => (
  <ErrorBoundary>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <Router>
            <Layout />
          </Router>
        </ReduxProvider>
      </ApolloProvider>
    </React.StrictMode>
  </ErrorBoundary>
)

const start = async function() {
  const [ store, globalisation ] = await Promise.all([
    configureStore({}),
    configureGlobalisation(),
  ])

  const mountNode = document.getElementById("mount")

  const render = (process.env.NODE_ENV !== 'production' && module.hot)
    ? ReactDOM.render
    : ReactDOM.hydrate

  render(App(store, globalisation), mountNode)
}

document.addEventListener("DOMContentLoaded", () => {
  start()
})
