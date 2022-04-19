import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://f67c-158-140-164-21.ngrok.io',

  cache: new InMemoryCache(),
});

export default client;
