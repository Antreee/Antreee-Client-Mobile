import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://e4e7-158-140-164-58.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
