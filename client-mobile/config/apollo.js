import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://b1a1-158-140-164-51.ngrok.io',
  cache: new InMemoryCache(),
})

export default client
