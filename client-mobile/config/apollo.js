import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://9d77-158-140-164-50.ngrok.io',
  cache: new InMemoryCache(),
})

export default client
