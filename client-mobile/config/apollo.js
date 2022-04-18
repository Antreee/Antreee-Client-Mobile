import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://53fb-180-249-11-70.ngrok.io',
  cache: new InMemoryCache(),
});

export default client;
