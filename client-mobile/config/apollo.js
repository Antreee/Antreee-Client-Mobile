import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://0bbc-158-140-164-51.ngrok.io',
  cache: new InMemoryCache(),
});

export default client;
