import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://8d28-180-249-11-70.ngrok.io',
  cache: new InMemoryCache(),
})

export default client
