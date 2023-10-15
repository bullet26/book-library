import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_BASE_URL,
  cache: new InMemoryCache(),
})
