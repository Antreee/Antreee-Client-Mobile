import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://c15b-202-80-212-159.ngrok.io",

  cache: new InMemoryCache(),
});

export default client;
