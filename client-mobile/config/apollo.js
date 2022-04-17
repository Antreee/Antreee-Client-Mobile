import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://b4e4-202-80-212-193.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
