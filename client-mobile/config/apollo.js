import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://f9f7-180-249-11-233.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
