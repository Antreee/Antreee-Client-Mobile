import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://0fa0-180-251-159-141.ngrok.io',
  cache: new InMemoryCache(),
})

export default client
