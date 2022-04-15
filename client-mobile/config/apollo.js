import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://bddb-158-140-164-27.ngrok.io',
  cache: new InMemoryCache(),
})

export default client
